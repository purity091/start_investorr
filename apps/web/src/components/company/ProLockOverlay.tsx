"use client";

import { Lock } from "lucide-react";

interface Props {
  title?: string;
  subtitle?: string;
  onUnlock?: () => void;
}

export function ProLockOverlay({ onUnlock }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUnlock) {
      onUnlock();
    } else if (typeof window !== "undefined") {
      window.location.href = "/pricing";
    }
  };

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-background/35 backdrop-blur-md rounded-3xl transition-all duration-300">
      <button
        type="button"
        onClick={handleClick}
        className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#38bdf8] hover:bg-[#0284c7] text-slate-950 hover:text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border border-white/30"
      >
        <span>فك قفل باقة مؤسس وقائد</span>
        <Lock className="h-4 w-4 shrink-0 transition-transform group-hover:rotate-12" />
      </button>
    </div>
  );
}
