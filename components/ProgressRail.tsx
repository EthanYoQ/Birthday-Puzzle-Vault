"use client";

import { Check, Circle, LockKeyhole } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { progressLabels, steps, type Step } from "@/lib/puzzle";
import { cn } from "@/lib/utils";

export function ProgressRail({ current }: { current: Step }) {
  const currentIndex = steps.indexOf(current);
  const value = (currentIndex / (steps.length - 1)) * 100;

  return (
    <nav className="w-full py-3" aria-label="Puzzle progress">
      <div className="mb-3 flex items-center justify-between gap-2 text-[11px] uppercase tracking-[0.16em] text-slate-400">
        {steps.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          const Icon = done ? Check : active ? LockKeyhole : Circle;

          return (
            <div
              className={cn(
                "flex min-w-0 items-center gap-1.5",
                active && "text-cyan-100",
                done && "text-amber-100",
              )}
              key={step}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="hidden sm:inline">{progressLabels[step]}</span>
            </div>
          );
        })}
      </div>
      <Progress value={value} />
    </nav>
  );
}
