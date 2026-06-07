import { getPanelCopy, getRevealLetters } from "@/lib/env";

export function createRevealPayload(vaultPayload: string) {
  const letters = getRevealLetters();
  const panel = getPanelCopy();

  return {
    ok: true as const,
    letter: letters.letter,
    letterEn: letters.letterEn,
    panelTitle: panel.panelTitle,
    panelSubtitle: panel.panelSubtitle,
    vaultPayload,
  };
}
