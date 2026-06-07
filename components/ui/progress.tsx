import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-white/10",
        className,
      )}
      aria-label="Vault progress"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-violet-300 to-amber-300 transition-all duration-700"
        style={{ width: `${Math.max(0, Math.min(value, 100))}%` }}
      />
    </div>
  );
}
