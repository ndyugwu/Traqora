import { Counter, Gauge, Histogram } from 'prom-client';

export const rateLimitBlockedCounter = new Counter({
  name: 'traqora_rate_limit_blocked_total',
  help: 'Total number of rate-limited / blocked requests',
  labelNames: ['endpoint', 'tier', 'ip', 'reason'],
});

export const rateLimitActiveThrottlesGauge = new Gauge({
  name: 'traqora_rate_limit_active_throttles',
  help: 'Number of currently active IP or user throttles/blocks',
  labelNames: ['tier'],
});

export const rateLimitLatencyHistogram = new Histogram({
  name: 'traqora_rate_limit_check_duration_seconds',
  help: 'Duration of rate limiter checks in seconds',
  labelNames: ['tier'],
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5],
});
