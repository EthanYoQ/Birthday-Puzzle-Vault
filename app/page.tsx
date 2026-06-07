"use client";

import { useState } from "react";

import { HeroCover } from "@/components/HeroCover";
import { IdentityGate } from "@/components/IdentityGate";
import { ProgressRail } from "@/components/ProgressRail";
import { PuzzleCard } from "@/components/PuzzleCard";
import { TreasureChestReveal } from "@/components/TreasureChestReveal";
import { VaultShell } from "@/components/VaultShell";
import { puzzles, type Step } from "@/lib/puzzle";

const storageKey = "birthday-puzzle-vault-step";

function nextStep(step: Step): Step {
  switch (step) {
    case "cover":
      return "gate";
    case "gate":
      return "level1";
    case "level1":
      return "level2";
    case "level2":
      return "level3";
    case "level3":
    case "reveal":
      return "reveal";
  }
}

export default function Home() {
  const [step, setStep] = useState<Step>("cover");
  const [finalAnswer, setFinalAnswer] = useState("");

  function advance(from: Step, answer = "") {
    const next = nextStep(from);
    setStep(next);
    window.localStorage.setItem(storageKey, next);
    if (from === "level3") {
      setFinalAnswer(answer);
    }
  }

  const level = puzzles.find((item) => item.id === step);

  return (
    <VaultShell>
      <ProgressRail current={step} />
      {step === "cover" ? <HeroCover onStart={() => advance("cover")} /> : null}
      {step === "gate" ? <IdentityGate onSuccess={() => advance("gate")} /> : null}
      {level ? <PuzzleCard puzzle={level} onSuccess={(answer) => advance(level.id, answer)} /> : null}
      {step === "reveal" ? <TreasureChestReveal finalAnswer={finalAnswer} /> : null}
    </VaultShell>
  );
}
