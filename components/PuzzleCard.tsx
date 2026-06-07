"use client";

import { motion } from "framer-motion";
import { Dna, RadioReceiver, ScanLine } from "lucide-react";
import { toast } from "sonner";

import { AnswerInput } from "@/components/AnswerInput";
import { CopyForAIButton } from "@/components/CopyForAIButton";
import { HintPanel } from "@/components/HintPanel";
import { Badge } from "@/components/ui/badge";
import type { PuzzleLevel } from "@/lib/puzzle";
import { cn } from "@/lib/utils";

export function PuzzleCard({
  puzzle,
  onSuccess,
}: {
  puzzle: PuzzleLevel;
  onSuccess: (answer: string) => void;
}) {
  async function submit(value: string) {
    const response = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: puzzle.id, answer: value }),
    });
    const data = (await response.json()) as { ok?: boolean };

    if (!data.ok) {
      toast.error("Not quite. Re-check the signal and ask AI if needed.");
      return;
    }

    toast.success(puzzle.success, {
      duration: puzzle.id === "level3" ? 900 : 2200,
    });
    window.setTimeout(() => onSuccess(value), puzzle.id === "level3" ? 1050 : 720);
  }

  const icon =
    puzzle.id === "level1" ? (
      <ScanLine className="h-5 w-5" aria-hidden />
    ) : puzzle.id === "level2" ? (
      <Dna className="h-5 w-5" aria-hidden />
    ) : (
      <RadioReceiver className="h-5 w-5" aria-hidden />
    );

  return (
    <section className="grid flex-1 items-center gap-7 py-7 lg:grid-cols-[0.88fr_1.12fr]">
      <motion.aside
        className="vault-card rounded-lg p-6 sm:p-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Badge>{puzzle.kicker}</Badge>
        <h2 className="mt-5 text-4xl font-black leading-tight text-slate-50 sm:text-5xl">
          {puzzle.title}
        </h2>
        <p className="mt-5 whitespace-pre-line text-lg leading-8 text-slate-300">
          {puzzle.prompt}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <CopyForAIButton text={puzzle.copyForAI} />
          <HintPanel hint={puzzle.hint} />
        </div>
        <div className="mt-7">
          <AnswerInput
            label={`${puzzle.id}-answer`}
            placeholder="Enter puzzle answer"
            onSubmit={submit}
          />
        </div>
      </motion.aside>

      <motion.div
        className="grid gap-3"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
      >
        {puzzle.modules.map((module, index) => (
          <motion.div
            key={`${module.label ?? module.body}-${index}`}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0 },
            }}
            className={cn(
              "relative overflow-hidden rounded-lg border p-4 transition",
              module.kind === "noise"
                ? "border-slate-500/15 bg-slate-900/30 text-slate-500"
                : module.kind === "warm"
                  ? "border-amber-200/18 bg-amber-200/[0.055] text-amber-50"
                  : "border-cyan-200/22 bg-cyan-200/[0.06] text-slate-100 shadow-glow",
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border",
                  module.kind === "noise"
                    ? "border-slate-500/20 bg-slate-500/5"
                    : module.kind === "warm"
                      ? "border-amber-200/25 bg-amber-200/10 text-amber-100"
                      : "border-cyan-200/25 bg-cyan-200/10 text-cyan-100",
                )}
              >
                {module.kind === "noise" ? index + 1 : icon}
              </div>
              <div className="min-w-0">
                {module.label ? (
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-400">
                    [{module.label}]
                  </p>
                ) : null}
                <p className="mt-1 break-words text-base leading-7">{module.body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
