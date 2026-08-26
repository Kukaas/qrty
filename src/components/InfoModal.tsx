'use client';

import React from 'react';
import { X, QrCode, Trees, ShieldCheck, Cpu, ExternalLink } from 'lucide-react';
import { sound } from '@/lib/audio';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-zinc-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 leading-none font-mono">qrty // Architecture</h2>
              <span className="text-xs text-zinc-500 font-mono">Tactical 3D QR System • v1.0.0</span>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playWoodClick();
              onClose();
            }}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto text-xs sm:text-sm text-zinc-700 font-mono leading-relaxed">
          <p className="text-zinc-600">
            <strong className="text-zinc-900 font-bold">qrty</strong> turns any URL or payload into an interactive 3D tactical diorama that doubles as an instant scannable barcode.
          </p>

          <div className="grid grid-cols-1 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
              <Trees className="w-5 h-5 text-zinc-900 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">3D Tactical Diorama</h4>
                <p className="text-xs text-zinc-600 mt-1">
                  Drag and inspect the floating diorama in full 3D with procedural Japanese black pine / cyber bonsai geometry and physical lighting.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
              <QrCode className="w-5 h-5 text-zinc-900 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Sub-Millisecond Scan Lock</h4>
                <p className="text-xs text-zinc-600 mt-1">
                  Tap the diorama to fly into top-down orthographic view. Finder patterns flatten seamlessly for instant camera detection.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">Level H Error Correction</h4>
                <p className="text-xs text-zinc-600 mt-1">
                  Engineered with 30% Reed-Solomon mathematical redundancy to survive perspective distortion and physical occlusion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with Suggestions Contact Link */}
        <div className="px-6 py-3.5 border-t border-zinc-200 bg-zinc-50/80 flex items-center justify-between gap-3 text-xs font-mono">
          <a
            href="https://kukaass.app/#contact"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-950 font-semibold underline flex items-center gap-1 text-[11px]"
          >
            <span>Suggestions? Contact Chester</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={() => {
              sound.playWoodClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold font-mono cursor-pointer transition-colors shrink-0"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
