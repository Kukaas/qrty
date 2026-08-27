'use client';

import React from 'react';
import Link from 'next/link';
import { Info, CheckCircle2, ChevronRight } from 'lucide-react';
import { sound } from '@/lib/audio';
import { LogoMark } from '@/components/Logo';

interface HeaderProps {
  onOpenInfo: () => void;
  scannableText?: string;
  activePresetName?: string;
  activePresetIcon?: string;
}

export default function Header({
  onOpenInfo,
  activePresetName,
  activePresetIcon,
}: HeaderProps) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-2.5 sm:px-5 py-2.5 sm:py-4 pointer-events-none">
      {/* Visual Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1 sm:gap-1.5 pointer-events-auto bg-white/95 hover:bg-white backdrop-blur-md border border-zinc-200/90 shadow-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl font-mono text-xs text-zinc-600 transition-all min-w-0 max-w-[calc(100%-44px)]"
      >
        <Link
          href="/"
          onClick={() => sound.playWoodClick()}
          className="flex items-center gap-1.5 hover:text-zinc-950 transition-colors font-bold text-zinc-900 shrink-0"
          title="Return to qrty Home"
        >
          <LogoMark size={16} />
          <span>qrty</span>
        </Link>

        <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />

        <Link
          href="/create"
          onClick={() => sound.playWoodClick()}
          className="hover:text-zinc-950 transition-colors font-medium text-zinc-600 shrink-0"
          title="3D Generator Studio"
        >
          Studio
        </Link>

        {activePresetName && (
          <>
            <ChevronRight className="w-3 h-3 text-zinc-400 shrink-0" />
            <span className="font-bold text-zinc-900 flex items-center gap-1 truncate max-w-[65px] xs:max-w-[100px] sm:max-w-none">
              <span className="shrink-0">{activePresetIcon}</span>
              <span className="truncate">{activePresetName}</span>
            </span>
          </>
        )}
      </nav>

      {/* Center Error Correction Status */}
      <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-xs pointer-events-auto text-zinc-700 font-mono text-xs">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Level H (30% Redundancy)</span>
      </div>

      {/* Right Action: Info Modal */}
      <div className="flex items-center gap-2 pointer-events-auto shrink-0">
        <button
          onClick={() => {
            sound.playWoodClick();
            onOpenInfo();
          }}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-xs flex items-center justify-center text-zinc-600 hover:text-zinc-950 hover:bg-white transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="About qrty Studio"
          aria-label="About qrty"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
