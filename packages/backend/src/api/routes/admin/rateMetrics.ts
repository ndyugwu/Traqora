import { Router, Request, Response } from 'express';
import { RateMetricsService } from '../../../services/rateMetricsService';
import { requireAdmin } from '../../../middleware/adminAuth';

const router = Router();

router.get('/', requireAdmin, (_req: Request, res: Response) => {
  try {
    const metrics = RateMetricsService.getMetrics();
    return res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message || 'Failed to retrieve rate limit metrics',
      },
    });
  }
});

export { router as rateMetricsRoutes };
