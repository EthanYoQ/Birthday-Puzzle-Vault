import { Toaster } from "sonner";

import { CommandBackground } from "@/components/effects/CommandBackground";

export function VaultShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden text-slate-50">
      <CommandBackground />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        {children}
      </div>
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          classNames: {
            toast: "border-white/15 bg-slate-950/95 text-slate-100",
          },
        }}
      />
    </main>
  );
}
