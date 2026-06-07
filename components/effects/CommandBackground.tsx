export function CommandBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050712]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.08)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_48%_78%,rgba(251,191,36,0.1),transparent_28%)]" />
      <div className="absolute left-[-20%] top-1/4 h-px w-[140%] rotate-[-10deg] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent animate-beam-scan" />
      <div className="absolute left-[-20%] top-2/3 h-px w-[140%] rotate-[7deg] bg-gradient-to-r from-transparent via-violet-300/45 to-transparent animate-beam-scan [animation-delay:1.8s]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,18,0)_0%,rgba(5,7,18,0.72)_78%,rgba(5,7,18,0.96)_100%)]" />
    </div>
  );
}
