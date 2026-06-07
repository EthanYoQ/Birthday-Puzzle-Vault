const placeholderValues = new Set([
  "",
  "REPLACE_AT_RUNTIME_ONLY_DO_NOT_COMMIT_REAL_CODE",
  "REPLACE_WITH_REAL_CODE",
]);

const defaultLetterCn =
  "生日快乐。\n\n这是一份为你准备的私人奖励。愿这个小小的解谜页面，记录下一个值得庆祝的时刻。\n\n继续创造，继续探索。";

const defaultLetterEn =
  "Happy birthday.\n\nThis is a private reward prepared for you. May this little puzzle page mark a moment worth celebrating.\n\nKeep creating, keep exploring.";

const defaultPanelTitle = "Vault Payload";
const defaultPanelSubtitle = "A private reveal payload";

function readTextEnv(key: string, fallback: string) {
  const value = process.env[key]?.trim();
  return value ? value.replace(/\\n/g, "\n") : fallback;
}

function readBase64TextEnv(key: string) {
  const value = process.env[key]?.trim();
  if (!value) {
    return null;
  }

  try {
    return Buffer.from(value, "base64").toString("utf8");
  } catch {
    return null;
  }
}

export function getVaultPayload() {
  const value = process.env.VAULT_PAYLOAD?.trim() ?? "";
  if (placeholderValues.has(value)) {
    return null;
  }

  return value;
}

export function getConfiguredAnswer(step: string) {
  const key =
    step === "gate"
      ? "VAULT_GATE_ANSWER"
      : step === "level1"
        ? "VAULT_LEVEL1_ANSWER"
        : step === "level2"
          ? "VAULT_LEVEL2_ANSWER"
          : step === "level3"
            ? "VAULT_FINAL_ANSWER"
            : "";

  return key ? process.env[key]?.trim() || null : null;
}

export function getRevealLetters() {
  return {
    letter: readBase64TextEnv("FINAL_LETTER_CN_B64") ?? readTextEnv("FINAL_LETTER_CN", defaultLetterCn),
    letterEn: readBase64TextEnv("FINAL_LETTER_EN_B64") ?? readTextEnv("FINAL_LETTER_EN", defaultLetterEn),
  };
}

export function getPanelCopy() {
  return {
    panelTitle: process.env.PANEL_TITLE?.trim() || process.env.REWARD_TITLE?.trim() || defaultPanelTitle,
    panelSubtitle: process.env.PANEL_SUBTITLE?.trim() || process.env.REWARD_SUBTITLE?.trim() || defaultPanelSubtitle,
  };
}

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
}
