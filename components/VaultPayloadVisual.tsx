"use client";

import { Copy, Gift } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function VaultPayloadVisual({
  payload,
  title,
  subtitle,
}: {
  payload: string;
  title: string;
  subtitle: string;
}) {
  async function copy() {
    await navigator.clipboard.writeText(payload);
    toast.success("Vault payload copied.");
  }

  return (
    <section className="rounded-lg border border-white/20 bg-gradient-to-br from-white via-slate-100 to-amber-100 p-5 text-slate-950 shadow-gold">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold">{title}</p>
          <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-slate-950 text-amber-100">
          <Gift className="h-6 w-6" aria-hidden />
        </div>
      </div>
      <div className="mt-7 rounded-md border border-slate-950/10 bg-white/80 p-4">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Vault payload</p>
        <p className="mt-2 break-all font-mono text-lg font-bold text-slate-950">
          {payload}
        </p>
      </div>
      <Button type="button" variant="gold" className="mt-5 w-full" onClick={copy}>
        <Copy className="h-4 w-4" aria-hidden />
        Copy payload
      </Button>
    </section>
  );
}
