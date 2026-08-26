'use client';

import React from 'react';
import { ViewMode } from '@/types';
import { QrCode, Trees, Sparkles } from 'lucide-react';
import { sound } from '@/lib/audio';

interface FloatingViewToggleProps {
  viewMode: ViewMode;
  onToggle: () => void;
}

export default function FloatingViewToggle({ viewMode, onToggle }: FloatingViewToggleProps) {
  const is3D = viewMode === '3d';

  return (
    <div className="absolute bottom-36 sm:bottom-32 left-0 right-0 z-20 flex justify-center pointer-events-none">
      <button
        onClick={() => {
          sound.playWoodClick();
          onToggle();
        }}
        className="pointer-events-auto group flex items-center gap-2 px-4 py-2 rounded-full bg-[#fbf8f2]/95 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {is3D ? (
          <>
            <QrCode className="w-4 h-4 text-pink-600 transition-transform group-hover:rotate-12" />
            <span className="text-xs sm:text-sm font-medium tracking-tight">Tap the tree to see QR code</span>
          </>
        ) : (
          <>
            <Trees className="w-4 h-4 text-emerald-600 transition-transform group-hover:-translate-y-0.5" />
            <span className="text-xs sm:text-sm font-medium tracking-tight">Tap to see the tree</span>
          </>
        )}
      </button>
    </div>
  );
}
