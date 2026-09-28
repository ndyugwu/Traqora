import request from 'supertest';
import express from 'express';
import { rateMetricsRoutes } from '../../src/api/routes/admin/rateMetrics';
import { RateMetricsService } from '../../src/services/rateMetricsService';

const ADMIN_KEY = { 'X-Admin-Api-Key': 'dev-admin-key' };

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use('/api/v1/admin/rate-metrics', rateMetricsRoutes);
  return app;
};

describe('Rate-Limit Abuse Dashboard API (/api/v1/admin/rate-metrics)', () => {
  it('rejects requests without admin API key (401 Unauthorized)', async () => {
    const app = createApp();
    const res = await request(app).get('/api/v1/admin/rate-metrics');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBeDefined();
  });

  it('returns rate limit metrics successfully with valid admin key (Happy Path)', async () => {
    const app = createApp();
    const res = await request(app)
      .get('/api/v1/admin/rate-metrics')
      .set(ADMIN_KEY);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('totals');
    expect(res.body.data).toHaveProperty('items');
    expect(res.body.data).toHaveProperty('generatedAt');
    expect(res.body.data.totals).toHaveProperty('allowed');
    expect(res.body.data.totals).toHaveProperty('blocked');
    expect(Array.isArray(res.body.data.items)).toBe(true);
  });

  it('handles internal errors gracefully (Failure Mode)', async () => {
    jest.spyOn(RateMetricsService, 'getMetrics').mockImplementationOnce(() => {
      throw new Error('Database failure');
    });

    const app = createApp();
    const res = await request(app)
      .get('/api/v1/admin/rate-metrics')
      .set(ADMIN_KEY);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('INTERNAL_SERVER_ERROR');
    expect(res.body.error.message).toContain('Database failure');

    jest.restoreAllMocks();
  });
});
