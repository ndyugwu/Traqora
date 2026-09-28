export interface RateLimitSnapshotItem {
  endpoint: string;
  tier: string;
  allowed: number;
  blocked: number;
  lastBlockedAt: string | null;
}

const store: Map<string, RateLimitSnapshotItem> = new Map();

export const recordRateLimitHit = (endpoint: string, tier: string, allowed: boolean) => {
  const key = `${endpoint}:${tier}`;
  let entry = store.get(key);
  if (!entry) {
    entry = {
      endpoint,
      tier,
      allowed: 0,
      blocked: 0,
      lastBlockedAt: null,
    };
    store.set(key, entry);
  }
  if (allowed) {
    entry.allowed += 1;
  } else {
    entry.blocked += 1;
    entry.lastBlockedAt = new Date().toISOString();
  }
};

export const getRateLimitSnapshot = (): RateLimitSnapshotItem[] => {
  if (store.size === 0) {
    return [
      {
        endpoint: '/api/v1/flights/search',
        tier: 'public',
        allowed: 0,
        blocked: 0,
        lastBlockedAt: null,
      },
    ];
  }
  return Array.from(store.values());
};
