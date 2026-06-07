export function normalizeLoose(value: string) {
  return value
    .trim()
    .toUpperCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeToken(value: string) {
  return normalizeLoose(value).replace(/\s/g, "");
}

export function isConfiguredAnswer(value: string, expected: string | null) {
  return Boolean(expected) && normalizeToken(value) === normalizeToken(expected ?? "");
}
