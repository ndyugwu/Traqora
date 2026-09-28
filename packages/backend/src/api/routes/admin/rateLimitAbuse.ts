import { Router, Request, Response } from 'express';
import { rateLimitAbuseService } from '../../../services/rateLimitAbuseService';
import { requireAdmin } from '../../../middleware/adminAuth';

const router = Router();

router.get('/metrics', requireAdmin, (_req: Request, res: Response) => {
  try {
    const summary = rateLimitAbuseService.getSummary();
    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: err.message || 'Failed to retrieve rate limit abuse metrics',
      },
    });
  }
});

export { router as rateLimitAbuseRoutes };
