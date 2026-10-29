import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { rateLimitAbuseRoutes } from '../../src/api/routes/admin/rateLimitAbuse';
import { rateLimitAbuseService } from '../../src/services/rateLimitAbuseService';

const ADMIN_KEY = { 'X-Admin-Api-Key': 'dev-admin-key' };

function createApp() {
  const app = express();
  app.use(express.json());
  app.use('/api/v1/admin/security/rate-limits', rateLimitAbuseRoutes);
  return app;
}

describe('Rate Limit Abuse Dashboard API', () => {
  beforeEach(() => {
    rateLimitAbuseService.clear();
  });

  it('rejects access without admin API key (UNAUTHORIZED failure mode)', async () => {
    const app = createApp();
    const res = await request(app).get('/api/v1/admin/security/rate-limits/metrics');

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('returns successful summary on happy path with recorded blocks', async () => {
    rateLimitAbuseService.recordBlock('192.168.1.50', '/api/v1/flights/search', 'public', 'RATE_LIMIT_EXCEEDED');
    
    const app = createApp();
    const res = await request(app)
      .get('/api/v1/admin/security/rate-limits/metrics')
      .set(ADMIN_KEY);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('topAbusers');
    expect(res.body.data.topAbusers).toHaveLength(1);
    expect(res.body.data.topAbusers[0].ip).toBe('192.168.1.50');
    expect(res.body.data.topAbusers[0].endpoint).toBe('/api/v1/flights/search');
    expect(res.body.data.topAbusers[0].blockedCount).toBe(1);
  });

  it('handles unexpected errors gracefully (INTERNAL_SERVER_ERROR failure mode)', async () => {
    const spy = jest.spyOn(rateLimitAbuseService, 'getSummary').mockImplementation(() => {
      throw new Error('Database connection failed');
    });

    const app = createApp();
    const res = await request(app)
      .get('/api/v1/admin/security/rate-limits/metrics')
      .set(ADMIN_KEY);

    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('INTERNAL_SERVER_ERROR');
    expect(res.body.error.message).toBe('Database connection failed');

    spy.mockRestore();
  });
});
