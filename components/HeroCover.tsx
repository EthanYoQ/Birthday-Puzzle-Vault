"use client";

import { motion } from "framer-motion";
import { ArrowRight, LockKeyhole, RadioTower } from "lucide-react";

import { ScrambleText } from "@/components/effects/ScrambleText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const siteHost = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")
  : "example.com";

export function HeroCover({ onStart }: { onStart: () => void }) {
  return (
    <section className="grid flex-1 items-center gap-8 py-8 lg:grid-cols-[1fr_0.86fr]">
      <div className="max-w-3xl">
        <Badge>Private birthday room</Badge>
        <h1 className="mt-5 max-w-4xl text-5xl font-black leading-none text-slate-50 sm:text-7xl">
          <ScrambleText text="Birthday Puzzle Vault" className="shine-text animate-shimmer" />
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-300">
          A private birthday puzzle room for one special guest.
        </p>
        <p className="mt-4 font-mono text-sm uppercase tracking-[0.2em] text-cyan-100">
          Clues. Celebration. A tiny vault.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button type="button" variant="gold" onClick={onStart}>
            Start the puzzle
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <RadioTower className="h-4 w-4 text-cyan-200" aria-hidden />
            {siteHost}
          </div>
        </div>
      </div>

      <motion.div
        className="relative mx-auto aspect-square w-full max-w-[520px]"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        <div className="absolute inset-[7%] rounded-full border border-cyan-200/35 bg-cyan-200/[0.07] shadow-glow" />
        <div className="absolute inset-[17%] rounded-full border border-violet-200/30 bg-violet-300/[0.035]" />
        <div className="absolute inset-[28%] rounded-full border border-amber-200/36 bg-amber-200/[0.04]" />
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-amber-200/55 bg-slate-900/95 shadow-gold"
          animate={{ boxShadow: ["0 0 30px rgba(251,191,36,.18)", "0 0 90px rgba(251,191,36,.35)", "0 0 30px rgba(251,191,36,.18)"] }}
          transition={{ repeat: Infinity, duration: 3.2 }}
        >
          <LockKeyhole className="h-16 w-16 text-amber-100 drop-shadow-[0_0_18px_rgba(252,211,77,0.75)]" aria-hidden />
        </motion.div>
        {Array.from({ length: 12 }).map((_, index) => (
          <span
            key={index}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-cyan-200/70"
            style={{
              transform: `rotate(${index * 30}deg) translateY(-205px)`,
              transformOrigin: "0 0",
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
