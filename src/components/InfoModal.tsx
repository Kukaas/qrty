'use client';

import React from 'react';
import { X, Sparkles, QrCode, Trees, ShieldCheck, Palette } from 'lucide-react';
import { sound } from '@/lib/audio';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#fbf8f2] border border-stone-200/90 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 leading-none">qrty</h2>
              <span className="text-xs text-stone-500 font-medium">3D QR Generator</span>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playWoodClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto text-sm text-stone-600 leading-relaxed">
          <p>
            <strong className="text-stone-900 font-semibold">qrty</strong> turns any link into an interactive 3D garden diorama that doubles as a scannable QR code.
          </p>

          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 rounded-2xl bg-white border border-stone-200/80 flex items-start gap-3">
              <Trees className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">3D Tree Diorama</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Drag and rotate the floating bonsai island in full 3D with natural wind sway and drifting seasonal petals.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-stone-200/80 flex items-start gap-3">
              <QrCode className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Instant Camera Scannability</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Tap the tree to fly into top-down view. The garden hedges and petal tiles align into a clean, verified scannable QR code.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-stone-200/80 flex items-start gap-3">
              <Palette className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Four Seasons & Colors</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Switch between Spring Sakura, Summer Canopy, Autumn Maple, and Winter Frost with custom color swatches.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-stone-200/80 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Level H Error Correction</h4>
                <p className="text-xs text-stone-500 mt-0.5">
                  Built with 30% Reed-Solomon data redundancy to ensure effortless reading across iOS and Android cameras.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-stone-200/70 bg-[#f6f2e9] flex justify-end">
          <button
            onClick={() => {
              sound.playWoodClick();
              onClose();
            }}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold cursor-pointer transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
