interface RateLimitRecord {
  key: string;
  ip: string;
  endpoint: string;
  tier: string;
  hits: number;
  blocked: boolean;
  timestamp: number;
}

class RateMetricsCollector {
  private records: RateLimitRecord[] = [];
  private maxRecords = 1000;

  record(record: Omit<RateLimitRecord, 'timestamp'>) {
    this.records.push({
      ...record,
      timestamp: Date.now(),
    });
    if (this.records.length > this.maxRecords) {
      this.records.shift();
    }
  }

  getMetrics(limit = 100) {
    const sorted = [...this.records].sort((a, b) => b.timestamp - a.timestamp);
    const totalHits = this.records.reduce((sum, r) => sum + r.hits, 0);
    const totalBlocked = this.records.filter((r) => r.blocked).length;

    const ipCounts: Record<string, number> = {};
    for (const r of this.records) {
      ipCounts[r.ip] = (ipCounts[r.ip] || 0) + 1;
    }

    const topAbuseIps = Object.entries(ipCounts)
      .map(([ip, count]) => ({ ip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalHits,
      totalBlocked,
      topAbuseIps,
      recentRecords: sorted.slice(0, limit),
    };
  }

  reset() {
    this.records = [];
  }
}

export const rateMetricsCollector = new RateMetricsCollector();
