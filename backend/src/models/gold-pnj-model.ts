// Gold schema
export interface IGoldPnj {
    id: number;
    goldType: string;
    priceBuy: string;
    priceSell: string;
    location: String;
}

/**
 * Get a new User object.
 * 
 * @returns 
 */
 function getNew(goldType: string, priceBuy: string, priceSell: string, location: String): IGoldPnj {
    return {
        id: -1,
        goldType,
        priceBuy,
        priceSell,
        location,
    };
}

// Export default
export default {
    new: getNew,
}