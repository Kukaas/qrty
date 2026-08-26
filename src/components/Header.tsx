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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-md border border-zinc-200 text-zinc-700 hover:text-zinc-950 transition-all text-xs font-mono shadow-xs cursor-pointer"
          title="Back to Landing Page"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Landing</span>
        </Link>

        <Link
          href="/"
          onClick={() => sound.playWoodClick()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white backdrop-blur-md border border-zinc-200 transition-all shadow-xs cursor-pointer"
        >
          <span className="font-bold text-lg tracking-tight text-zinc-900 font-sans select-none">
            qrty
          </span>
          <span className="text-[10px] font-mono font-bold tracking-wide uppercase text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
            STUDIO
          </span>
        </Link>
      </div>

      {/* Center Error Correction Status */}
      <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-xs pointer-events-auto text-zinc-700 font-mono text-xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Level H (30% Redundancy)</span>
      </div>

      {/* Right Action: Info Modal */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => {
            sound.playWoodClick();
            onOpenInfo();
          }}
          className="w-9 h-9 rounded-xl bg-white/90 backdrop-blur-md border border-zinc-200 shadow-xs flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="About qrty Studio"
          aria-label="About qrty"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
