import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

describe("treasure chest reveal animation", () => {
  test("does not loop the opening animation forever", () => {
    const source = readFileSync(join(process.cwd(), "components", "TreasureChestReveal.tsx"), "utf8");

    expect(source).not.toContain("Infinity");
    expect(source).not.toContain("repeatDelay");
  });
});
