import goldPnj, { IGoldPnj } from "@models/gold-pnj-model";
import { CrawlWebCatchError, CrawlWebFetchError } from "@shared/errors-crawl-web";
import { Response } from 'express';
// import axios from "axios";
// import Moment from "moment";
import StatusCodes from "http-status-codes";

// const cheerio = require("cheerio");
const { OK, BAD_REQUEST } = StatusCodes;

async function get(resp: Response): Promise<Response | any> {
    console.log("Get gold from mongo db....");

    try {
        goldPnj.GoldPnjEntity.collection.find().toArray().then((goldPnjs) => {
            console.log("Result return :", goldPnjs);
            return resp.status(OK).json({
                success: true,
                goldPnjList: goldPnjs,
            });
        });
    
    } catch (error) {
        console.log(error);
        throw new CrawlWebCatchError();
    }
}

// Export default
export default {
    getAll: get,
} as const;
