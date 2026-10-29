import { Router, Request, Response } from 'express';
import { requireAdmin } from '../../../middleware/adminAuth';
import { rateMetricsService } from '../../../services/rateMetricsService';

const router = Router();

router.get('/rate-metrics', requireAdmin, async (_req: Request, res: Response): Promise<void> => {
  try {
    const metrics = await rateMetricsService.getMetricsSummary();
    res.status(200).json({
      success: true,
      data: {
        metrics,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message || 'Failed to fetch rate limit metrics',
      },
    });
  }
});

export const adminRateMetricsRoutes = router;
