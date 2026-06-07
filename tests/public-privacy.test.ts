import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";

describe("public privacy hygiene", () => {
  test("keeps final reveal copy outside public puzzle source", () => {
    const source = readFileSync(join(process.cwd(), "lib", "puzzle.ts"), "utf8");

    expect(source).not.toContain("finalLetterCn");
    expect(source).not.toContain("finalLetterEn");
    expect(source).not.toContain("export const finalLetter");
  });
});
