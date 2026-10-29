import { rateLimitBlockedCounter } from '../monitoring/rateLimitMetrics';

export interface AbuseRecord {
  ip: string;
  endpoint: string;
  tier: string;
  blockedCount: number;
  lastBlockedAt: string;
  reason: string;
}

export interface RateLimitAbuseSummary {
  totalBlocked: number;
  topAbusers: AbuseRecord[];
  activeThrottlesCount: number;
  timestamp: string;
}

class RateLimitAbuseService {
  private abuseMap: Map<string, AbuseRecord> = new Map();

  recordBlock(ip: string, endpoint: string, tier: string, reason: string = 'RATE_LIMIT_EXCEEDED') {
    const key = `${ip}:${endpoint}:${tier}`;
    const existing = this.abuseMap.get(key);
    const now = new Date().toISOString();

    if (existing) {
      existing.blockedCount += 1;
      existing.lastBlockedAt = now;
    } else {
      this.abuseMap.set(key, {
        ip,
        endpoint,
        tier,
        blockedCount: 1,
        lastBlockedAt: now,
        reason,
      });
    }

    rateLimitBlockedCounter.inc({ endpoint, tier, ip, reason });
  }

  getSummary(): RateLimitAbuseSummary {
    let totalBlocked = 0;

    const abusers = Array.from(this.abuseMap.values()).sort(
      (a, b) => b.blockedCount - a.blockedCount
    );

    for (const item of abusers) {
      totalBlocked += item.blockedCount;
    }

    return {
      totalBlocked,
      topAbusers: abusers.slice(0, 50),
      activeThrottlesCount: abusers.length,
      timestamp: new Date().toISOString(),
    };
  }

  clear() {
    this.abuseMap.clear();
  }
}

export const rateLimitAbuseService = new RateLimitAbuseService();
