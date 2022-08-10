import { Schema, model, Document } from "mongoose";
// 1. Create an interface representing a documun in MongoDb
export interface IGoldPnj {
    date: string;
    goldType: string;
    priceBuy: string;
    priceSell: string;
    location: string;
    zone: string;
}

// 2. Create schema corresponding to the document interface
const goldPnjSchema = new Schema<IGoldPnj>({
    date: { type: String, required: true },
    goldType: { type: String, required: true, index: true },
    priceBuy: { type: String, required: true },
    priceSell: { type: String, required: true },
    location: { type: String, required: true },
    zone: String
});
goldPnjSchema.index({ date: 1, goldType: 1 }, { unique: true });
// 3. Create a model
const GoldPnjEntity = model<IGoldPnj>('gold_pnj', goldPnjSchema, 'gold_pnj')

/**
 * Get a new gold pnj object.
 * 
 * @returns 
 */
function getNew(date: string, goldType: string, priceBuy: string, priceSell: string
    , location: string, zone: string): IGoldPnj {
    return {
        date,
        goldType,
        priceBuy,
        priceSell,
        location,
        zone,
    };
}

// Export default
export default {
    new: getNew,
    GoldPnjEntity,
    // GoldPnjSchema,
}