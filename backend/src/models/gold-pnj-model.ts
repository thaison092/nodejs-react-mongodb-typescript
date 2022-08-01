// Gold schema
export interface IGoldPnj {
    id: number;
    goldType: string;
    priceBuy: string;
    priceSell: string;
    location: string;
    zone: string;
}

/**
 * Get a new gold pnj object.
 * 
 * @returns 
 */
function getNew(goldType: string, priceBuy: string, priceSell: string, location: string, zone: string): IGoldPnj {
    return {
        id: -1,
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
}