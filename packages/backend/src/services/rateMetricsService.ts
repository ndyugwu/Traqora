import { register } from 'prom-client';

export interface RateLimitMetricSummary {
  endpoint: string;
  tier: string;
  allowedCount: number;
  blockedCount: number;
  lastBlockedTimestamp?: string | null;
}

export class RateMetricsService {
  /**
   * Retrieve rate limit metrics and abuse indicators
   */
  async getMetricsSummary(): Promise<RateLimitMetricSummary[]> {
    const metrics = await register.getMetricsAsJSON();
    const summaries: RateLimitMetricSummary[] = [];

    for (const metric of metrics) {
      if (metric.name && metric.name.includes('rate_limit')) {
        for (const val of (metric.values || []) as any[]) {
          summaries.push({
            endpoint: val.labels?.route || val.labels?.endpoint || 'unknown',
            tier: val.labels?.tier || 'public',
            allowedCount: val.labels?.status === 'allowed' ? Number(val.value) || 0 : 0,
            blockedCount: val.labels?.status === 'blocked' ? Number(val.value) || 0 : (metric.name.includes('blocked') ? Number(val.value) || 0 : 0),
            lastBlockedTimestamp: null,
          });
        }
      }
    }

    if (summaries.length === 0) {
      summaries.push({
        endpoint: '/api/v1/flights/search',
        tier: 'public',
        allowedCount: 0,
        blockedCount: 0,
        lastBlockedTimestamp: null,
      });
    }

    return summaries;
  }
}

export const rateMetricsService = new RateMetricsService();
