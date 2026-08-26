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
    <div className="absolute bottom-40 sm:bottom-36 left-0 right-0 z-20 flex justify-center pointer-events-none">
      <button
        onClick={() => {
          sound.playWoodClick();
          onToggle();
        }}
        className="pointer-events-auto group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-zinc-800 hover:text-zinc-950 border border-zinc-300 shadow-lg shadow-zinc-300/40 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer font-mono text-xs"
      >
        {is3D ? (
          <>
            <QrCode className="w-4 h-4 text-zinc-900 transition-transform group-hover:rotate-12" />
            <span className="font-semibold tracking-tight">Tap diorama to flatten QR code</span>
          </>
        ) : (
          <>
            <Trees className="w-4 h-4 text-zinc-900 transition-transform group-hover:-translate-y-0.5" />
            <span className="font-semibold tracking-tight">Tap to view 3D diorama</span>
          </>
        )}
      </button>
    </div>
  );
}
