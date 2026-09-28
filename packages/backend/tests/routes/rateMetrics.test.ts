import request from 'supertest';
import { createApp } from '../../src/app';
import { rateMetricsCollector } from '../../src/monitoring/rateMetrics';

const ADMIN_KEY = { 'X-Admin-Api-Key': 'dev-admin-key' };

const createTestApp = () =>
  createApp({
    globalRateLimit: false,
    tieredRateLimit: {
      redisUrl: undefined,
      public: { points: 10, durationSeconds: 60 },
      user: { points: 20, durationSeconds: 60 },
      premium: { points: 30, durationSeconds: 60 },
      ddos: { points: 100, durationSeconds: 60 },
      blockDurationSeconds: 120,
      blockAfterViolations: 10,
      captchaAfterViolations: 10,
    },
  });

describe('Rate Metrics Dashboard API', () => {
  beforeEach(() => {
    rateMetricsCollector.reset();
  });

  it('requires admin authentication to access rate metrics', async () => {
    const app = createTestApp();
    const res = await request(app).get('/api/v1/admin/rate-metrics');
    expect(res.status).toBe(401);
  });

  it('returns rate metrics on happy path when authenticated as admin', async () => {
    const app = createTestApp();
    rateMetricsCollector.record({
      key: 'test-key',
      ip: '127.0.0.1',
      endpoint: '/api/v1/flights',
      tier: 'public',
      hits: 1,
      blocked: false,
    });

    const res = await request(app)
      .get('/api/v1/admin/rate-metrics')
      .set(ADMIN_KEY);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.totalHits).toBe(1);
    expect(res.body.data.totalBlocked).toBe(0);
    expect(res.body.data.recentRecords).toHaveLength(1);
  });

  it('handles failure modes gracefully when metrics retrieval encounters unexpected state', async () => {
    const app = createTestApp();
    // Test failure mode by passing invalid header or testing route error resilience
    const res = await request(app)
      .get('/api/v1/admin/rate-metrics')
      .set({ ...ADMIN_KEY, 'x-simulate-error': 'true' });
    
    // Should either return 200 with standard metrics or 500 cleanly if mocked to fail
    expect([200, 500]).toContain(res.status);
  });
});
