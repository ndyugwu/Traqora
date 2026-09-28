import request from 'supertest';
import express, { Express } from 'express';
import { adminRateMetricsRoutes } from '../../src/api/routes/admin/rateMetrics';
import { rateMetricsService } from '../../src/services/rateMetricsService';

jest.mock('../../src/middleware/adminAuth', () => ({
  requireAdmin: (req: any, res: any, next: any) => {
    if (req.headers['x-admin-key'] === 'valid-admin-key') {
      return next();
    }
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Admin authentication required' },
    });
  },
}));

describe('Rate Limit Metrics API (Abuse Dashboard)', () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/v1/admin', adminRateMetricsRoutes);
    jest.clearAllMocks();
  });

  it('returns rate limit metrics summary successfully on happy path', async () => {
    jest.spyOn(rateMetricsService, 'getMetricsSummary').mockResolvedValueOnce([
      {
        endpoint: '/api/v1/flights/search',
        tier: 'public',
        allowedCount: 10,
        blockedCount: 2,
        lastBlockedTimestamp: new Date().toISOString(),
      },
    ]);

    const res = await request(app)
      .get('/api/v1/admin/rate-metrics')
      .set('x-admin-key', 'valid-admin-key');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.metrics).toHaveLength(1);
    expect(res.body.data.metrics[0].endpoint).toBe('/api/v1/flights/search');
    expect(res.body.data.metrics[0].blockedCount).toBe(2);
  });

  it('rejects requests without valid admin authentication (failure mode)', async () => {
    const res = await request(app).get('/api/v1/admin/rate-metrics');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('handles service errors gracefully and returns 500 (failure mode)', async () => {
    jest.spyOn(rateMetricsService, 'getMetricsSummary').mockRejectedValueOnce(new Error('Prometheus connection failed'));

    const res = await request(app)
      .get('/api/v1/admin/rate-metrics')
      .set('x-admin-key', 'valid-admin-key');

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('INTERNAL_SERVER_ERROR');
    expect(res.body.error.message).toContain('Prometheus connection failed');
  });
});
