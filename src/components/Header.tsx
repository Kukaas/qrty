'use client';

import React from 'react';
import Link from 'next/link';
import { Info, CheckCircle2, ArrowLeft } from 'lucide-react';
import { sound } from '@/lib/audio';

interface HeaderProps {
  onOpenInfo: () => void;
  scannableText?: string;
}

export default function Header({ onOpenInfo }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4 pointer-events-none">
      {/* Back to Landing + qrty Logo */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <Link
          href="/"
          onClick={() => sound.playWoodClick()}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white transition-all text-xs font-mono shadow-md cursor-pointer"
          title="Back to Landing Page"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Landing</span>
        </Link>

        <Link
          href="/"
          onClick={() => sound.playWoodClick()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 backdrop-blur-md border border-zinc-800 transition-all shadow-md cursor-pointer"
        >
          <span className="font-bold text-base tracking-tight text-white font-sans select-none">
            qrty
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wide uppercase text-emerald-400 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
            STUDIO
          </span>
        </Link>
      </div>

      {/* Center Error Correction Status */}
      <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800/80 shadow-md pointer-events-auto text-zinc-300 font-mono text-xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>Level H (30% Redundancy)</span>
      </div>

      {/* Right Action: Info Modal */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => {
            sound.playWoodClick();
            onOpenInfo();
          }}
          className="w-9 h-9 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 shadow-md flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="About qrty Studio"
          aria-label="About qrty"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
