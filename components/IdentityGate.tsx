"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { AnswerInput } from "@/components/AnswerInput";
import { Badge } from "@/components/ui/badge";

export function IdentityGate({ onSuccess }: { onSuccess: () => void }) {
  async function submit(value: string) {
    const response = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ step: "gate", answer: value }),
    });
    const data = (await response.json()) as { ok?: boolean };

    if (!data.ok) {
      toast.error("Identity mismatch. Try the name this vault was trained for.");
      return;
    }

    toast.success("Identity confirmed. Opening the puzzle room.");
    window.setTimeout(onSuccess, 520);
  }

  return (
    <section className="flex flex-1 items-center justify-center py-8">
      <motion.div
        className="vault-card w-full max-w-3xl rounded-lg p-6 sm:p-9"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <Badge>Identity gate</Badge>
        <div className="mt-6 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-cyan-200/25 bg-cyan-200/10">
            <ShieldCheck className="h-7 w-7 text-cyan-100" aria-hidden />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-50">This vault was trained for one person only.</h2>
            <p className="mt-3 text-lg leading-8 text-slate-300">
              Input the demo name configured for this vault.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <AnswerInput
            label="identity-answer"
            placeholder="Enter name"
            buttonText="Confirm"
            onSubmit={submit}
          />
        </div>
      </motion.div>
    </section>
  );
}
