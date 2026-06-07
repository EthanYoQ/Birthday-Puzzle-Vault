import { expect, test } from "@playwright/test";

const gateAnswer = process.env.VAULT_GATE_ANSWER ?? "";
const levelOneAnswer = process.env.VAULT_LEVEL1_ANSWER ?? "";
const levelTwoAnswer = process.env.VAULT_LEVEL2_ANSWER ?? "";
const finalAnswer = process.env.VAULT_FINAL_ANSWER ?? "";

test("desktop puzzle flow reaches controlled missing-secret reveal", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Birthday Puzzle Vault/i })).toBeVisible();

  await page.getByRole("button", { name: /Start the puzzle/i }).click();
  await page.getByPlaceholder("Enter name").fill(gateAnswer);
  await page.getByRole("button", { name: /Confirm/i }).click();

  await expect(page.getByRole("heading", { name: /Level 1/i })).toBeVisible();
  await page.getByPlaceholder("Enter puzzle answer").fill(levelOneAnswer);
  await page.getByRole("button", { name: /Unlock/i }).click();

  await expect(page.getByRole("heading", { name: /Level 2/i })).toBeVisible();
  await page.getByPlaceholder("Enter puzzle answer").fill(levelTwoAnswer);
  await page.getByRole("button", { name: /Unlock/i }).click();

  await expect(page.getByRole("heading", { name: /Level 3/i })).toBeVisible();
  await page.getByPlaceholder("Enter puzzle answer").fill(finalAnswer);
  await page.getByRole("button", { name: /Unlock/i }).click();

  await expect(page.getByRole("heading", { name: /Vault opening sequence/i })).toBeVisible();
  await expect(page.getByAltText("Open treasure chest glowing with gold light and blue crystals")).toBeVisible();
  await expect(page.getByText("Vault configured, but payload not loaded yet.")).toBeVisible();
});

test("puzzle screens do not reveal answers before solving", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText(finalAnswer)).toHaveCount(0);

  await page.getByRole("button", { name: /Start the puzzle/i }).click();
  await page.getByPlaceholder("Enter name").fill(gateAnswer);
  await page.getByRole("button", { name: /Confirm/i }).click();

  await expect(page.getByRole("heading", { name: /Level 1/i })).toBeVisible();
  await expect(page.getByText(levelOneAnswer)).toHaveCount(0);
  await page.getByPlaceholder("Enter puzzle answer").fill(levelOneAnswer);
  await page.getByRole("button", { name: /Unlock/i }).click();

  await expect(page.getByRole("heading", { name: /Level 2/i })).toBeVisible();
  await expect(page.getByText("Random noise")).toHaveCount(0);
  await page.getByPlaceholder("Enter puzzle answer").fill(levelTwoAnswer);
  await page.getByRole("button", { name: /Unlock/i }).click();

  await expect(page.getByRole("heading", { name: /Level 3/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Private Protocol/i })).toHaveCount(1);
  await expect(page.getByText(finalAnswer)).toHaveCount(0);

  await page.getByPlaceholder("Enter puzzle answer").fill(`${finalAnswer}-wrong`);
  await page.getByRole("button", { name: /Unlock/i }).click();
  await expect(page.getByRole("heading", { name: /Level 3/i })).toBeVisible();
});

test("copy for AI writes puzzle prompt to clipboard", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  await page.getByRole("button", { name: /Start the puzzle/i }).click();
  await page.getByPlaceholder("Enter name").fill(gateAnswer);
  await page.getByRole("button", { name: /Confirm/i }).click();
  await expect(page.getByRole("heading", { name: /Level 1/i })).toBeVisible();

  await page.getByRole("button", { name: /Copy for AI/i }).click();

  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toContain("Solve this birthday puzzle");
  expect(copied).toContain("hidden first clue");
});
