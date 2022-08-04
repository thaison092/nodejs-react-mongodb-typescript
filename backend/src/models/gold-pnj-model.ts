import { Schema, model, Document } from "mongoose";
// 1. Create an interface representing a documun in MongoDb
export interface IGoldPnj {
    id: string;
    goldType: string;
    priceBuy: string;
    priceSell: string;
    location: string;
    zone: string;
}

// 2. Create schema corresponding to the document interface
const goldPnjSchema = new Schema<IGoldPnj>({
    id: { type: String, required: true },
    goldType: { type: String, required: true },
    priceBuy: { type: String, required: true },
    priceSell: { type: String, required: true },
    location: { type: String, required: true },
    zone: String
});

// 3. Create a model
const GoldPnjEntity = model<IGoldPnj>('gold_pnj', goldPnjSchema);

/**
 * Get a new gold pnj object.
 * 
 * @returns 
 */
function getNew(id: string, goldType: string, priceBuy: string, priceSell: string
    , location: string, zone: string): IGoldPnj {
    return {
        id,
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
    goldPnjSchema,
}