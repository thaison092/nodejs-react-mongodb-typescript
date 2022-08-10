import goldPnj, { IGoldPnj } from "@models/gold-pnj-model";
import { CrawlWebCatchError, CrawlWebFetchError } from "@shared/errors-crawl-web";
import { Response } from 'express';
import axios from "axios";
import Moment from "moment";
import StatusCodes from "http-status-codes";

const cheerio = require("cheerio");
const { OK, BAD_REQUEST } = StatusCodes;

// async function crawlWebData(url: string, location: string, zone: string, resp: Response): Promise<IGoldPnj[] | any> {
async function crawlWebData(url: string, location: string, zone: string, resp: Response): Promise<Response | any> {
    console.log("Crawler data excute....by url:", url);
    // make http call to url
    // var response: Response = ;

    var goldPnjList: IGoldPnj[] = [];
    const todayDate = Moment().format('DDMMYYYY');

    try {
        var crawlResp = await axios(url);
        if (crawlResp.status !== 200) {
            console.log("Error occurred while fetching data...");
            throw new CrawlWebFetchError;
            return;
        }

        const html = crawlResp.data;
        const $ = cheerio.load(html);
        const statsTable = $('#content-price > tr');

        statsTable.each(async function (i: number, element: Element) {

            let goldType = $(element).find('td:nth(0)').text();
            let priceBuy = $(element).find('td:nth(1) > span').text();
            let priceSell = $(element).find('td:nth(2) > span').text();
            console.log("name:", goldType);

            goldPnjList.push(goldPnj.new(todayDate, goldType, priceBuy, priceSell, location, zone));
            
            // var goldPnjEntity = new goldPnj.GoldPnjEntity({
            //     date: todayDate,
            //     goldType: name,
            //     priceBuy: priceBuy,
            //     priceSell: priceSell,
            //     location: location,
            //     zone: zone
            // });
            // await goldPnjEntity.save();
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
        // save to mongodb
        goldPnj.GoldPnjEntity.collection.insertMany(goldPnjList, {ordered: false},
            function (err, docs) {
                if (err) {
                    console.error("Has Error:", err);
                    return resp.status(BAD_REQUEST).json({
                        success: false,
                        message: 'Multiple documents insert to Collection failure',
                    });

                } else {
                    return resp.status(OK).json({
                        success: true,
                        message: 'Multiple documents insert to Collection successfully',
                    });
                }
            });

    } catch (error) {
        console.log(error);
        throw new CrawlWebCatchError();
    }
}

// Export default
export default {
    crawlWebData,
} as const;
