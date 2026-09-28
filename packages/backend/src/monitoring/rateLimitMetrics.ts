import { Counter, Histogram, Gauge, register } from 'prom-client';

export const rateLimitViolationsTotal = new Counter({
  name: 'traqora_rate_limit_violations_total',
  help: 'Total number of rate limit violations and blocked requests',
  labelNames: ['tier', 'endpoint', 'client_ip', 'action'],
});

export const rateLimitBlockDurationSeconds = new Histogram({
  name: 'traqora_rate_limit_block_duration_seconds',
  help: 'Duration of blocks applied due to rate limit abuse',
  labelNames: ['tier'],
  buckets: [30, 60, 120, 300, 600, 1800],
});

export const rateLimitActiveBlocks = new Gauge({
  name: 'traqora_rate_limit_active_blocks',
  help: 'Current number of actively blocked IP addresses or users',
  labelNames: ['tier'],
});

export interface RateLimitAbuseEvent {
  tier: string;
  endpoint: string;
  clientIp: string;
  action: string;
  timestamp: string;
}

const recentAbuseEvents: RateLimitAbuseEvent[] = [];
const MAX_EVENTS = 100;

export const recordRateLimitAbuse = (tier: string, endpoint: string, clientIp: string, action: string) => {
  rateLimitViolationsTotal.inc({ tier, endpoint, client_ip: clientIp, action });
  recentAbuseEvents.unshift({
    tier,
    endpoint,
    clientIp,
    action,
    timestamp: new Date().toISOString(),
  });
  if (recentAbuseEvents.length > MAX_EVENTS) {
    recentAbuseEvents.pop();
  }
};

export const getRateLimitAbuseSummary = () => {
  return {
    totalViolations: recentAbuseEvents.length,
    recentEvents: recentAbuseEvents,
  };
};

export const __resetRateLimitAbuseMetrics = () => {
  recentAbuseEvents.length = 0;
  rateLimitViolationsTotal.reset();
};
