import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100",
        className,
      )}
    >
      {children}
    </span>
  );
}
