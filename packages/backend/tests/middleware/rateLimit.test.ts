import { recordRateLimitAbuse, getRateLimitAbuseSummary, __resetRateLimitAbuseMetrics } from '../../src/monitoring/rateLimitMetrics';

describe('Rate Limit Abuse Metrics Collector', () => {
  beforeEach(() => {
    __resetRateLimitAbuseMetrics();
  });

  it('records violations and maintains max event limits', () => {
    for (let i = 0; i < 110; i++) {
      recordRateLimitAbuse('public', `/api/v1/test-${i}`, `127.0.0.${i % 255}`, 'block');
    }

    const summary = getRateLimitAbuseSummary();
    expect(summary.totalViolations).toBe(100);
    expect(summary.recentEvents).toHaveLength(100);
    expect(summary.recentEvents[0].endpoint).toBe('/api/v1/test-109');
  });
});
