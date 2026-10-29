import { Router, Request, Response } from 'express';
import { rateMetricsCollector } from '../../../monitoring/rateMetrics';
import { requireAdmin } from '../../../middleware/adminAuth';

export const adminRateMetricsRouter = Router();

adminRateMetricsRouter.get('/rate-metrics', requireAdmin, (_req: Request, res: Response) => {
  try {
    const metrics = rateMetricsCollector.getMetrics();
    return res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message || 'Failed to fetch rate metrics',
      },
    });
  }
});
