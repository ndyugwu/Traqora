import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { requireAdmin } from '../../../middleware/adminAuth';
import { getRateLimitAbuseSummary, __resetRateLimitAbuseMetrics } from '../../../monitoring/rateLimitMetrics';
import { getRateLimitSnapshot } from '../../../services/metrics';
import { logger } from '../../../utils/logger';

export const rateLimitDashboardRouter = Router();

const querySchema = z.object({
  tier: z.string().optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});

rateLimitDashboardRouter.get('/metrics', requireAdmin, async (req: Request, res: Response) => {
  try {
    const queryResult = querySchema.safeParse(req.query);
    if (!queryResult.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid query parameters',
          details: queryResult.error.errors,
        },
      });
    }

    const abuseSummary = getRateLimitAbuseSummary();
    const snapshot = getRateLimitSnapshot();

    let filteredSnapshot = snapshot;
    if (queryResult.data.tier) {
      filteredSnapshot = snapshot.filter((item) => item.tier === queryResult.data.tier);
    }

    if (queryResult.data.limit) {
      filteredSnapshot = filteredSnapshot.slice(0, queryResult.data.limit);
    }

    const totals = filteredSnapshot.reduce(
      (acc, curr) => {
        acc.allowed += curr.allowed;
        acc.blocked += curr.blocked;
        return acc;
      },
      { allowed: 0, blocked: 0 }
    );

    return res.status(200).json({
      success: true,
      data: {
        totals,
        snapshot: filteredSnapshot,
        abuseSummary,
      },
    });
  } catch (error: any) {
    logger.error('Failed to fetch rate limit dashboard metrics', { error: error.message });
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to retrieve rate limit metrics',
      },
    });
  }
});

rateLimitDashboardRouter.post('/reset', requireAdmin, async (_req: Request, res: Response) => {
  try {
    __resetRateLimitAbuseMetrics();
    return res.status(200).json({
      success: true,
      message: 'Rate limit abuse metrics reset successfully',
    });
  } catch (error: any) {
    logger.error('Failed to reset rate limit abuse metrics', { error: error.message });
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to reset rate limit metrics',
      },
    });
  }
});
