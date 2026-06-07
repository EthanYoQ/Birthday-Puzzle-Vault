"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-md border border-white/14 bg-slate-950/70 px-4 py-3 font-mono text-base text-slate-50 shadow-inner shadow-black/30 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/20",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export { Input };
