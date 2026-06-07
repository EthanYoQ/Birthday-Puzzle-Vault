"use client";

import { useEffect, useState } from "react";

const glyphs = "AIVALUESTORYSIGNALDECK0123456789";

export function ScrambleText({
  text,
  className,
  speed = 28,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      return;
    }

    let frame = 0;
    const interval = window.setInterval(() => {
      frame += 1;
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " " || index < frame / 2) return char;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join(""),
      );

      if (frame / 2 >= text.length) {
        setDisplay(text);
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [speed, text]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
