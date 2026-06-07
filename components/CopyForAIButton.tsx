"use client";

import { Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function CopyForAIButton({ text }: { text: string }) {
  async function copy() {
    await navigator.clipboard.writeText(text);
    toast.success("Copied for AI.");
  }

  return (
    <Button type="button" variant="ghost" onClick={copy}>
      <Sparkles className="h-4 w-4" aria-hidden />
      Copy for AI
      <Copy className="h-4 w-4" aria-hidden />
    </Button>
  );
}
