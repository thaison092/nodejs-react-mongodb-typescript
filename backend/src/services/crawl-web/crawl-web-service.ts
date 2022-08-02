import goldPnj, { IGoldPnj } from "@models/gold-pnj-model";
import { CrawlWebCatchError, CrawlWebFetchError } from "@shared/errors-crawl-web";
import axios from "axios";
import Moment from "moment";
const cheerio = require("cheerio");

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

        statsTable.each(function (i: number, element: Element) {

            let name = $(element).find('td:nth(0)').text();
            let priceBuy = $(element).find('td:nth(1) > span').text();
            let priceSell = $(element).find('td:nth(2) > span').text();
            console.log("name:", name);

            goldPnjList.push(goldPnj.new(todayDate, name, priceBuy, priceSell, location, zone));
            console.log("goldPnj:", goldPnj);
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
