import { describe, expect, test } from "vitest";

import { isConfiguredAnswer, normalizeLoose, normalizeToken } from "@/lib/normalize";

describe("answer normalization", () => {
  test("normalizes whitespace, case, and punctuation", () => {
    expect(normalizeLoose("  Sample,   phrase here! ")).toBe("SAMPLE PHRASE HERE");
    expect(normalizeToken(" SAMPLE, PHRASE HERE ")).toBe("SAMPLEPHRASEHERE");
  });

  test("accepts a configured answer without case or spacing sensitivity", () => {
    const expected = ["configured", "phrase"].join(" ");

    expect(isConfiguredAnswer("CONFIGURED PHRASE", expected)).toBe(true);
    expect(isConfiguredAnswer("configuredphrase", expected)).toBe(true);
    expect(isConfiguredAnswer("different phrase", expected)).toBe(false);
    expect(isConfiguredAnswer("anything", null)).toBe(false);
  });
});
