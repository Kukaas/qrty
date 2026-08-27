'use client';

import React from 'react';
import { ViewMode } from '@/types';
import { QrCode, Trees } from 'lucide-react';
import { sound } from '@/lib/audio';

interface FloatingViewToggleProps {
  viewMode: ViewMode;
  onToggle: () => void;
}

export default function FloatingViewToggle({ viewMode, onToggle }: FloatingViewToggleProps) {
  const is3D = viewMode === '3d';

  return (
    <div className="absolute bottom-[195px] sm:bottom-44 left-0 right-0 z-20 flex justify-center pointer-events-none px-3">
      <button
        onClick={() => {
          sound.playWoodClick();
          onToggle();
        }}
        className="pointer-events-auto group flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/95 hover:bg-white text-zinc-800 hover:text-zinc-950 border border-zinc-300 shadow-lg shadow-zinc-300/40 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-mono text-[11px] sm:text-xs"
      >
        {is3D ? (
          <>
            <QrCode className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-900 transition-transform group-hover:rotate-12 shrink-0" />
            <span className="font-semibold tracking-tight">
              <span className="hidden sm:inline">Tap diorama to flatten QR code</span>
              <span className="inline sm:hidden">Tap to flatten QR</span>
            </span>
          </>
        ) : (
          <>
            <Trees className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-900 transition-transform group-hover:-translate-y-0.5 shrink-0" />
            <span className="font-semibold tracking-tight">
              <span className="hidden sm:inline">Tap to view 3D diorama</span>
              <span className="inline sm:hidden">Tap to view 3D</span>
            </span>
          </>
        )}
      </button>
    </div>
  );
}
