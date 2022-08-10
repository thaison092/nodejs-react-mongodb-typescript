import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import goldPnjService from '@services/gold-pnj/gold-pnj-service';
import { ParamMissingError } from '@shared/errors';



// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;

/**
 * Get all users.
 */
 router.get(p.get, async (_: Request, res: Response) => {
    return await goldPnjService.getAll(res);
});

// Export default
export default router;
