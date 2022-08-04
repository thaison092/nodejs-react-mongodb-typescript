import goldPnj, { IGoldPnj } from "@models/gold-pnj-model";
import { CrawlWebCatchError, CrawlWebFetchError } from "@shared/errors-crawl-web";
import axios from "axios";
import Moment from "moment";
import { Schema, model, connect } from 'mongoose';
const cheerio = require("cheerio");
// const dbURL = require("../config/properties").DB;
// const dbURL = require('./config/properties').DB;
// import { env } from 'process';
const dotenv = require('dotenv');
dotenv.config();

const dbURL = process.env.DB || 'localhost';
// console.log(dbURL);
// crawlWebData(url).then((resp) => {
//     console.log("Crawling data excute....")
//     const html = resp;
//     console.log("resp:", resp)
//     const $ = cheerio.load(html);
//     const statsTable = $('.content > tbody > tr');
//     console.log("statsTable:", statsTable)

//     statsTable.forEach(function (element: any) {
//         let title = $(element).find('td').text();
//         console.log("title:", title)
//     });
//     // statsTable.each(function(){
//     //     let title = $(this).find('td').text();
//     //     console.log("title:", title)
//     // });

// });

async function crawlWebData(url: string, location: string, zone: string): Promise<IGoldPnj[] | any> {
    console.log("Crawler data excute....by url:", url);
    // make http call to url
    var response = null;
    var goldPnjList: IGoldPnj[] = [];
    const todayDate = Moment().format('DDMMYYYY');

    try {
        response = await axios(url);
        if (response.status !== 200) {
            console.log("Error occurred while fetching data...");
            throw new CrawlWebFetchError;
            return;
        }

        const html = response.data;
        const $ = cheerio.load(html);
        const statsTable = $('#content-price > tr');

        statsTable.each(async function (i: number, element: Element) {

            let name = $(element).find('td:nth(0)').text();
            let priceBuy = $(element).find('td:nth(1) > span').text();
            let priceSell = $(element).find('td:nth(2) > span').text();
            console.log("name:", name);

            goldPnjList.push(goldPnj.new(todayDate, name, priceBuy, priceSell, location, zone));
            // console.log("goldPnj:", goldPnj);
            // 3. Create a model
            const GoldPnj = model<IGoldPnj>('gold_pnj_sonpt', goldPnj.goldPnjSchema,'gold_pnj_sonpt');
            // 4. Connect to MongoDB
            await connect(dbURL);
            var goldPnjEntity = new GoldPnj({
                id: todayDate,
                goldType: name,
                priceBuy: priceBuy,
                priceSell: priceSell,
                location: location,
                zone: zone
            });
            await goldPnjEntity.save();
            // .then((newCourse) => {
            //     return response.status(201).json({
            //         success: true,
            //         message: 'New cause created successfully',
            //         Course: newCourse,
            //     });
            // })
            // .catch((error) => {
            //     console.log(error);
            //     response.status(500).json({
            //         success: false,
            //         message: 'Server error. Please try again.',
            //         error: error.message,
            //     });
            // });
        });

    } catch (error) {
        console.log(error);
        throw new CrawlWebCatchError();
    }
    // console.log("response:", response);
    return goldPnjList;
}

// Export default
export default {
    crawlWebData,
} as const;
