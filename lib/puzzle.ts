export type Step = "cover" | "gate" | "level1" | "level2" | "level3" | "reveal";

export type PuzzleLevel = {
  id: "level1" | "level2" | "level3";
  kicker: string;
  title: string;
  prompt: string;
  hint: string;
  copyForAI: string;
  success: string;
  modules: Array<{
    label?: string;
    body: string;
    kind?: "signal" | "noise" | "warm";
  }>;
};

export const steps: Step[] = ["cover", "gate", "level1", "level2", "level3", "reveal"];

export const progressLabels: Record<Step, string> = {
  cover: "Entry",
  gate: "Identity",
  level1: "Brief",
  level2: "Joy",
  level3: "Private",
  reveal: "Vault",
};

export const puzzles: PuzzleLevel[] = [
  {
    id: "level1",
    kicker: "Evidence chamber 01",
    title: "Level 1 — Brand Brief",
    prompt:
      "A good puzzle is never just a lock.\nIt is the art of turning clues into delight.",
    hint: "Read the labels before the sentences.",
    success:
      "Correct. The first chamber opens.",
    copyForAI:
      "Solve this birthday puzzle. Look at the section labels and find the hidden first clue:\n\nClue:\nLook for the word that names what a puzzle gives you.\n\nLight:\nEvery chamber needs a small signal.\n\nUnlock:\nEvery answer moves the story forward.\n\nEcho:\nRepeat the useful pattern.",
    modules: [
      {
        label: "Clue",
        body: "Look for the word that names what a puzzle gives you.",
        kind: "signal",
      },
      {
        label: "Light",
        body: "Every chamber needs a small signal.",
        kind: "signal",
      },
      {
        label: "Unlock",
        body: "Every answer moves the story forward.",
        kind: "signal",
      },
      {
        label: "Echo",
        body: "Repeat the useful pattern.",
        kind: "signal",
      },
      {
        label: "Next step",
        body: "Ask your AI what the labels spell.",
        kind: "signal",
      },
    ],
  },
  {
    id: "level2",
    kicker: "Strategy chamber 02",
    title: "Level 2 — Joy Pattern",
    prompt: "The second chamber is a pattern check.\nKeep only the three lines that feel celebratory.",
    hint: "Take the first letters of the useful lines.",
    success: "Correct. The second chamber opens.",
    copyForAI:
      "Solve this birthday puzzle. Inspect the three useful lines and their first letters:\n\n[J]\nJoy is the right signal.\n\n[O]\nOpen the next chamber.\n\n[Y]\nYes, the pattern matters.",
    modules: [
      {
        label: "J",
        body: "Joy is the right signal.",
        kind: "signal",
      },
      {
        label: "O",
        body: "Open the next chamber.",
        kind: "signal",
      },
      {
        label: "Y",
        body: "Yes, the pattern matters.",
        kind: "signal",
      },
    ],
  },
  {
    id: "level3",
    kicker: "Private channel 03",
    title: "Level 3 — Private Protocol",
    prompt:
      "The final signal is encoded for this demo vault.",
    hint: "Ask AI what the final line format looks like.",
    success:
      "Correct. The vault opens.",
    copyForAI:
      "Solve this birthday puzzle. The final phrase is deployment-specific and should be configured outside the public source tree.",
    modules: [
      {
        body: "Build the fantastic ideas.",
        kind: "warm",
      },
      {
        body: "Run every challenge through AI.",
        kind: "warm",
      },
      {
        body: "Open the next world together.",
        kind: "warm",
      },
      {
        label: "Deployment note",
        body: "The final phrase is configured outside the public source tree.",
        kind: "signal",
      },
    ],
  },
];
