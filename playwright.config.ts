import { defineConfig, devices } from "@playwright/test";

process.env.VAULT_GATE_ANSWER ??= `gate-${Date.now()}`;
process.env.VAULT_LEVEL1_ANSWER ??= `level-one-${Date.now()}`;
process.env.VAULT_LEVEL2_ANSWER ??= `level-two-${Date.now()}`;
process.env.VAULT_FINAL_ANSWER ??= `final-${Date.now()}`;

const webServerEnv = Object.fromEntries(
  Object.entries(process.env).filter((entry): entry is [string, string] => typeof entry[1] === "string"),
);

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: {
    timeout: 8_000,
  },
  use: {
    baseURL: "http://localhost:3026",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3026",
    reuseExistingServer: true,
    timeout: 120_000,
    env: webServerEnv,
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
});
