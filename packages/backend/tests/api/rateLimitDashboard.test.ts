import request from 'supertest';
import { createApp } from '../../src/app';
import { __resetRateLimitAbuseMetrics, recordRateLimitAbuse } from '../../src/monitoring/rateLimitMetrics';
import { __resetRateLimitSnapshot } from '../../src/services/metrics';

const ADMIN_KEY = { 'X-Admin-Api-Key': 'dev-admin-key' };

describe('Rate Limit Abuse Dashboard API', () => {
  beforeEach(() => {
    __resetRateLimitAbuseMetrics();
    __resetRateLimitSnapshot();
  });

  it('requires admin API key for metrics and reset endpoints', async () => {
    const app = await createApp();

    const resMetrics = await request(app).get('/api/v1/admin/security/rate-limits/metrics');
    expect(resMetrics.status).toBe(401);
    expect(resMetrics.body.error.code).toBe('UNAUTHORIZED');

    const resReset = await request(app).post('/api/v1/admin/security/rate-limits/reset');
    expect(resReset.status).toBe(401);
    expect(resReset.body.error.code).toBe('UNAUTHORIZED');
  });

  it('returns rate limit abuse metrics successfully on happy path', async () => {
    const app = await createApp();

    recordRateLimitAbuse('public', '/api/v1/flights/search', '192.168.1.50', 'block');

    const res = await request(app)
      .get('/api/v1/admin/security/rate-limits/metrics')
      .set(ADMIN_KEY);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.abuseSummary.totalViolations).toBe(1);
    expect(res.body.data.abuseSummary.recentEvents[0]).toMatchObject({
      tier: 'public',
      endpoint: '/api/v1/flights/search',
      clientIp: '192.168.1.50',
      action: 'block',
    });
    expect(res.body.data.totals).toBeDefined();
    expect(res.body.data.snapshot).toBeInstanceOf(Array);
  });

  it('handles query parameter validation errors gracefully', async () => {
    const app = await createApp();

    const res = await request(app)
      .get('/api/v1/admin/security/rate-limits/metrics?limit=not-a-number')
      .set(ADMIN_KEY);

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('allows resetting rate limit abuse metrics', async () => {
    const app = await createApp();

    recordRateLimitAbuse('user', '/api/v1/bookings', '10.0.0.1', 'throttle');

    const resReset = await request(app)
      .post('/api/v1/admin/security/rate-limits/reset')
      .set(ADMIN_KEY);

    expect(resReset.status).toBe(200);
    expect(resReset.body.success).toBe(true);

    const resMetrics = await request(app)
      .get('/api/v1/admin/security/rate-limits/metrics')
      .set(ADMIN_KEY);

    expect(resMetrics.status).toBe(200);
    expect(resMetrics.body.data.abuseSummary.totalViolations).toBe(0);
    expect(resMetrics.body.data.abuseSummary.recentEvents).toHaveLength(0);
  });
});
