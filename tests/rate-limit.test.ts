import { afterEach, describe, expect, test } from "vitest";

import { checkRateLimit, clearRateLimitsForTest } from "@/lib/rate-limit";

describe("rate limit", () => {
  afterEach(() => clearRateLimitsForTest());

  test("allows 20 attempts per 10 minute window", () => {
    const now = 1_000;

    for (let index = 0; index < 20; index += 1) {
      expect(checkRateLimit("ip-a", now + index).limited).toBe(false);
    }

    expect(checkRateLimit("ip-a", now + 21).limited).toBe(true);
  });

  test("resets after the window expires", () => {
    const first = checkRateLimit("ip-b", 1_000);
    const afterWindow = checkRateLimit("ip-b", first.resetAt + 1);

    expect(afterWindow.limited).toBe(false);
    expect(afterWindow.remaining).toBe(19);
  });
});
