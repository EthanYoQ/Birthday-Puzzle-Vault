import { afterEach, describe, expect, test, vi } from "vitest";

describe("vault payload env", () => {
  afterEach(() => {
    vi.resetModules();
    delete process.env.VAULT_PAYLOAD;
  });

  test("treats missing or placeholder payload as not configured", async () => {
    const { getVaultPayload } = await import("@/lib/env");

    expect(getVaultPayload()).toBeNull();

    process.env.VAULT_PAYLOAD = "REPLACE_AT_RUNTIME_ONLY_DO_NOT_COMMIT_REAL_CODE";
    expect(getVaultPayload()).toBeNull();
  });

  test("returns runtime payload when configured", async () => {
    process.env.VAULT_PAYLOAD = "DEMO-RUNTIME-PAYLOAD";
    const { getVaultPayload } = await import("@/lib/env");

    expect(getVaultPayload()).toBe("DEMO-RUNTIME-PAYLOAD");
  });
});
