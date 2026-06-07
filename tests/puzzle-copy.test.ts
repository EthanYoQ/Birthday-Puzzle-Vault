import { describe, expect, test } from "vitest";

import { puzzles } from "@/lib/puzzle";

describe("puzzle copy", () => {
  test("keeps the final phrase deployment-specific in public copy", () => {
    const finalPuzzle = puzzles.find((puzzle) => puzzle.id === "level3");

    expect(finalPuzzle?.copyForAI).toContain("deployment-specific");
    expect(finalPuzzle?.modules.map((module) => module.body).join(" ")).toContain("configured outside");
    expect(finalPuzzle?.copyForAI).not.toContain("Keep building the weird thing.");
  });
});
