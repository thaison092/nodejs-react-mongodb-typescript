import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import crawlWebService from '@services/crawl-web/crawl-web-service';
import { ParamMissingError } from '@shared/errors';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    crawl: '/web-gold',
} as const;

/**
 * Get all type Gold PNJ.
 */
 router.get(p.crawl, async (_: Request, res: Response) => {
    const url = "https://www.pnj.com.vn/blog/gia-vang/?zone=01";
    const location = "hcm";
    const zone = "01";
    return await crawlWebService.crawlWebData(url, location, zone, res);
    // return res.status(OK).json({goldPnjs});
});

// Export default
export default router;
