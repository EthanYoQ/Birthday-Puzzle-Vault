"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-300 text-slate-950 shadow-glow hover:bg-cyan-200",
        ghost:
          "border border-white/15 bg-white/[0.04] text-slate-100 hover:border-cyan-300/50 hover:bg-cyan-300/10",
        gold:
          "bg-amber-300 text-stone-950 shadow-gold hover:bg-amber-200",
        danger:
          "border border-red-400/40 bg-red-500/10 text-red-100 hover:bg-red-500/20",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-3 text-xs",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
