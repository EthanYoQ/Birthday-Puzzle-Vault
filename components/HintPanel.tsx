"use client";

import { useState } from "react";
import { Lightbulb, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HintPanel({ hint }: { hint: string }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <Button type="button" variant="ghost" onClick={() => setOpen(true)}>
        <Lightbulb className="h-4 w-4" aria-hidden />
        Hint
      </Button>
    );
  }

  return (
    <div className="flex items-start justify-between gap-3 rounded-md border border-amber-200/22 bg-amber-200/10 p-4 text-sm text-amber-50">
      <p>{hint}</p>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Close hint"
        onClick={() => setOpen(false)}
        className="h-8 w-8 shrink-0"
      >
        <X className="h-4 w-4" aria-hidden />
      </Button>
    </div>
  );
}
