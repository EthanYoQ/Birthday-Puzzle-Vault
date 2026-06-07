"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Gift, Loader2, LockKeyhole, Mail } from "lucide-react";
import { toast } from "sonner";

import { BirthdayLetter } from "@/components/BirthdayLetter";
import { VaultPayloadVisual } from "@/components/VaultPayloadVisual";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const chestImageSrc = `${basePath}/assets/vault-chest-open.png`;

type RevealResponse =
  | {
      ok: true;
      letter: string;
      letterEn?: string;
      panelTitle: string;
      panelSubtitle: string;
      vaultPayload: string;
    }
  | {
      ok: false;
      error: string;
    };

export function TreasureChestReveal({ finalAnswer }: { finalAnswer: string }) {
  const [status, setStatus] = useState<"opening" | "ready" | "error">("opening");
  const [payload, setPayload] = useState<Extract<RevealResponse, { ok: true }> | null>(null);
  const [error, setError] = useState("");
  const reduceMotion = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index,
        x: Math.cos(index * 1.65) * (54 + (index % 6) * 15),
        y: Math.sin(index * 1.65) * 34 - 76 - (index % 5) * 18,
        delay: (index % 10) * 0.055,
      })),
    [],
  );

  const runeBeams = useMemo(
    () =>
      Array.from({ length: 8 }, (_, index) => ({
        id: index,
        rotate: index * 45,
        delay: index * 0.07,
      })),
    [],
  );

  useEffect(() => {
    let cancelled = false;

    async function reveal() {
      try {
        const response = await fetch(`${basePath}/api/reveal`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ finalAnswer }),
        });
        const data = (await response.json()) as RevealResponse;

        if (cancelled) return;

        if (!data.ok) {
          setError(data.error);
          setStatus("error");
          return;
        }

        window.setTimeout(
          () => {
            setPayload(data);
            setStatus("ready");
          },
          reduceMotion ? 0 : 2500,
        );
      } catch {
        if (!cancelled) {
          setError("The vault signal was interrupted. Try again.");
          setStatus("error");
        }
      }
    }

    reveal();

    return () => {
      cancelled = true;
    };
  }, [finalAnswer, reduceMotion]);

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-7 py-7">
      <div className="text-center">
        <Badge>Final reveal</Badge>
        <h2 className="mt-4 text-4xl font-black text-slate-50 sm:text-6xl">
          Vault opening sequence
        </h2>
        <p className="mt-4 text-slate-300">Golden channel unlocked. Birthday payload loading.</p>
      </div>

      <div className="relative flex min-h-[420px] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border border-amber-200/10 bg-black/45">
        <motion.div
          className="absolute h-80 w-80 rounded-full bg-amber-300/25 blur-3xl"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: status === "error" ? 0.18 : status === "opening" ? [0.1, 0.82, 0.24] : 0.95,
            scale: status === "opening" ? [0.5, 1.42, 1] : 1.35,
          }}
          transition={{ duration: reduceMotion ? 0 : 2.2 }}
        />
        {runeBeams.map((beam) => (
          <motion.span
            key={beam.id}
            className="absolute left-1/2 top-1/2 h-28 w-1 origin-bottom rounded-full bg-gradient-to-t from-amber-100/0 via-amber-100/70 to-cyan-100/0 blur-[1px]"
            style={{ rotate: beam.rotate, transformOrigin: "50% 100%" }}
            initial={{ opacity: 0, scaleY: 0.2 }}
            animate={{
              opacity: status === "error" ? 0 : status === "opening" ? [0, 0.9, 0.2] : 0.55,
              scaleY: status === "opening" ? [0.25, 1, 0.55] : 0.75,
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.4,
              delay: reduceMotion ? 0 : beam.delay,
            }}
          />
        ))}
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.9)]"
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{
              x: status === "error" ? 0 : particle.x,
              y: status === "error" ? 0 : particle.y,
              opacity: status === "error" ? 0 : [0, 1, 0.45],
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.9,
              delay: reduceMotion ? 0 : particle.delay,
            }}
          />
        ))}

        <motion.div
          className="absolute bottom-12 h-20 w-[36rem] rounded-full bg-black/65 blur-2xl"
          animate={{ scale: status === "opening" ? [0.85, 1.08, 0.92] : 1.1 }}
          transition={{ duration: reduceMotion ? 0 : 1.2 }}
        />

        <div className="relative aspect-square w-full max-w-[620px]">
          <motion.div
            className="absolute left-1/2 top-[31%] z-0 h-36 w-64 -translate-x-1/2 rounded-full bg-amber-200/75 blur-3xl"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{
              opacity: status === "error" ? 0 : status === "opening" ? [0.05, 0.75, 0.24] : 0.88,
              scale: status === "opening" ? [0.45, 1.1, 0.82] : 1.15,
            }}
            transition={{ duration: reduceMotion ? 0 : 1.6 }}
          />
          <motion.img
            src={chestImageSrc}
            alt="Open treasure chest glowing with gold light and blue crystals"
            className="absolute inset-0 z-10 h-full w-full object-contain drop-shadow-[0_30px_55px_rgba(0,0,0,0.72)]"
            initial={{ opacity: 0, scale: 0.88, y: reduceMotion ? 0 : 24 }}
            animate={{
              opacity: 1,
              scale: status === "opening" ? [0.96, 1.025, 1] : 1,
              y: 0,
              filter:
                status === "error"
                  ? "brightness(0.72) saturate(0.8)"
                  : status === "opening"
                    ? [
                        "brightness(0.92) saturate(1)",
                        "brightness(1.25) saturate(1.25)",
                        "brightness(1.05) saturate(1.08)",
                      ]
                    : "brightness(1.12) saturate(1.12)",
            }}
            transition={{
              duration: reduceMotion ? 0 : 1.2,
            }}
          />
          {payload ? (
            <>
              <motion.div
                className="absolute left-[28%] top-[20%] z-20 flex h-24 w-32 rotate-[-10deg] items-center justify-center rounded-md border border-amber-200/60 bg-[#fff8e7] text-slate-950 shadow-gold"
                initial={{ opacity: 0, y: 96, rotate: -2, scale: 0.72 }}
                animate={{ opacity: 1, y: 0, rotate: -10, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.8, type: "spring", bounce: 0.34 }}
              >
                <Mail className="h-10 w-10 text-amber-700" aria-hidden />
              </motion.div>
              <motion.div
                className="absolute right-[25%] top-[22%] z-20 flex h-20 w-32 rotate-[8deg] flex-col justify-between rounded-lg border border-white/55 bg-gradient-to-br from-white via-slate-100 to-amber-100 p-3 text-slate-950 shadow-gold"
                initial={{ opacity: 0, y: 104, rotate: 2, scale: 0.72 }}
                animate={{ opacity: 1, y: 0, rotate: 8, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.86, delay: reduceMotion ? 0 : 0.08, type: "spring", bounce: 0.32 }}
              >
                <Gift className="h-6 w-6" aria-hidden />
                <span className="text-[10px] font-black uppercase tracking-[0.18em]">
                  Vault Payload
                </span>
              </motion.div>
            </>
          ) : null}
          {status === "ready" ? null : (
            <div className="absolute left-1/2 top-[61%] z-30 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-md border border-cyan-100/60 bg-slate-950/85 text-amber-100 shadow-glow">
              {status === "opening" ? (
                <Loader2 className="h-7 w-7 animate-spin" aria-hidden />
              ) : (
                <LockKeyhole className="h-7 w-7" aria-hidden />
              )}
            </div>
          )}
        </div>
      </div>

      {status === "error" ? (
        <div className="vault-card max-w-xl rounded-lg p-5 text-center">
          <p className="text-amber-50">{error}</p>
          <Button type="button" variant="ghost" className="mt-4" onClick={() => window.location.reload()}>
            Re-run vault sequence
          </Button>
        </div>
      ) : null}

      {payload ? (
        <motion.div
          className="grid w-full max-w-5xl gap-5 lg:grid-cols-[1.05fr_0.95fr]"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.7 }}
        >
          <BirthdayLetter letter={payload.letter} letterEn={payload.letterEn} />
          <VaultPayloadVisual
            payload={payload.vaultPayload}
            title={payload.panelTitle}
            subtitle={payload.panelSubtitle}
          />
        </motion.div>
      ) : null}
    </section>
  );
}
