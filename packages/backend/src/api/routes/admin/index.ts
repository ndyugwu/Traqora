import { Router } from 'express';
import { adminRateMetricsRouter } from './rateMetrics';

export const adminRouter = Router();

adminRouter.use('/admin', adminRateMetricsRouter);
