import { Router } from 'express';
import userRouter from './user-router';
import crawlWebRouter from './crawl-web-gold/crawl-web-gold-router';

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/users', userRouter);
baseRouter.use('/crawl', crawlWebRouter);

// Export default.
export default baseRouter;
