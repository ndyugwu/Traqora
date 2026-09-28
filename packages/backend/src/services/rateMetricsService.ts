import { getRateLimitSnapshot } from './metrics';

export interface RateLimitMetricSummary {
  endpoint: string;
  tier: string;
  allowed: number;
  blocked: number;
  lastBlockedAt: string | null;
}

export interface RateLimitMetricsOverview {
  totals: {
    allowed: number;
    blocked: number;
  };
  items: RateLimitMetricSummary[];
  generatedAt: string;
}

export class RateMetricsService {
  public static getMetrics(): RateLimitMetricsOverview {
    const snapshot = getRateLimitSnapshot();
    let totalAllowed = 0;
    let totalBlocked = 0;

    for (const item of snapshot) {
      totalAllowed += item.allowed;
      totalBlocked += item.blocked;
    }

    return {
      totals: {
        allowed: totalAllowed,
        blocked: totalBlocked,
      },
      items: snapshot.map((item) => ({
        endpoint: item.endpoint,
        tier: item.tier,
        allowed: item.allowed,
        blocked: item.blocked,
        lastBlockedAt: item.lastBlockedAt,
      })),
      generatedAt: new Date().toISOString(),
    };
  }
}
