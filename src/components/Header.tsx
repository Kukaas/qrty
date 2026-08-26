'use client';

import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import { sound } from '@/lib/audio';

interface HeaderProps {
  onOpenInfo: () => void;
  scannableText?: string;
}

export default function Header({ onOpenInfo }: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 pointer-events-none">
      {/* qrty Minimalist Logo */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#fbf8f2]/90 backdrop-blur-md border border-stone-200/80 shadow-xs">
          <span className="font-bold text-lg tracking-tight text-stone-900 font-sans select-none">
            qrty
          </span>
          <span className="text-[10px] font-medium tracking-wide uppercase text-stone-500 bg-stone-100/90 px-2 py-0.5 rounded-full border border-stone-200/60">
            3D
          </span>
        </div>
      </div>

      {/* Center Scannable Badge */}
      <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fbf8f2]/80 backdrop-blur-md border border-stone-200/60 shadow-xs pointer-events-auto text-stone-600">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span className="text-xs font-medium tracking-tight">Level H (30% Error Correction)</span>
      </div>

      {/* Right Action: Info */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={() => {
            sound.playWoodClick();
            onOpenInfo();
          }}
          className="w-9 h-9 rounded-full bg-[#fbf8f2]/90 backdrop-blur-md border border-stone-200/80 shadow-xs flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="About qrty"
          aria-label="About qrty"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
