type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 20;

export function checkRateLimit(key: string, now = Date.now()) {
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS,
    });

    return {
      limited: false,
      remaining: MAX_ATTEMPTS - 1,
      resetAt: now + WINDOW_MS,
    };
  }

  current.count += 1;
  buckets.set(key, current);

  return {
    limited: current.count > MAX_ATTEMPTS,
    remaining: Math.max(MAX_ATTEMPTS - current.count, 0),
    resetAt: current.resetAt,
  };
}

export function clearRateLimitsForTest() {
  buckets.clear();
}
