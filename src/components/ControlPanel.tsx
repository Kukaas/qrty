'use client';

import React, { useState } from 'react';
import { Season, ColorOption, ViewMode } from '@/types';
import { SEASONS, COLOR_OPTIONS } from '@/lib/constants';
import { Share2, Volume2, VolumeX, Check, Copy, QrCode, Trees } from 'lucide-react';
import { sound } from '@/lib/audio';
import { formatRedirectUrl } from '@/lib/qr';

interface ControlPanelProps {
  url: string;
  onChangeUrl: (url: string) => void;
  selectedSeason: Season;
  onSelectSeason: (season: Season) => void;
  selectedColorId: string | null;
  onSelectColor: (color: ColorOption) => void;
  onOpenExport: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  viewMode: ViewMode;
  onToggleViewMode: () => void;
}

const QUICK_LINKS = [
  { label: 'GitHub', url: 'https://github.com' },
  { label: 'Google', url: 'https://google.com' },
  { label: 'YouTube', url: 'https://youtube.com' },
  { label: 'Next.js', url: 'https://nextjs.org' },
];

export default function ControlPanel({
  url,
  onChangeUrl,
  selectedSeason,
  onSelectSeason,
  selectedColorId,
  onSelectColor,
  onOpenExport,
  isMuted,
  onToggleMute,
  viewMode,
  onToggleViewMode,
}: ControlPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatRedirectUrl(url));
    sound.playWoodClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const seasonList: Season[] = ['ronin', 'cyber', 'ember', 'stealth'];
  const formattedUrl = formatRedirectUrl(url);

  return (
    <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-xl bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-xl shadow-zinc-300/40 rounded-3xl p-3 sm:p-4 flex flex-col gap-2.5 transition-all">
        {/* Row 1: URL Input & Export Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={url}
              onChange={(e) => onChangeUrl(e.target.value)}
              placeholder="Enter destination link (e.g. https://github.com)..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-2.5 text-sm sm:text-base text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all font-mono"
            />
            {url && (
              <button
                type="button"
                onClick={handleCopy}
                className="absolute right-3 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
                title={copied ? 'Copied!' : 'Copy link'}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Export / Share Button (High contrast solid black) */}
          <button
            type="button"
            onClick={() => {
              sound.playWoodClick();
              onOpenExport();
            }}
            className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900 hover:bg-black text-white font-bold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title="Export / Download QR"
            aria-label="Export QR Code"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Destination Chips + Mode Toggle */}
        <div className="flex items-center justify-between text-xs text-zinc-500 px-1 font-mono">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="font-semibold text-zinc-400">PRESETS:</span>
            {QUICK_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  sound.playWoodClick();
                  onChangeUrl(link.url);
                }}
                className={`px-2 py-0.5 rounded-md border text-[11px] font-medium transition-colors cursor-pointer ${
                  formattedUrl === link.url
                    ? 'bg-zinc-900 border-zinc-900 text-white'
                    : 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle Pill */}
          <button
            type="button"
            onClick={() => {
              sound.playWoodClick();
              onToggleViewMode();
            }}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 font-bold cursor-pointer shrink-0 transition-colors"
          >
            {viewMode === '3d' ? (
              <>
                <QrCode className="w-3 h-3 text-zinc-900" />
                <span>Scan Mode</span>
              </>
            ) : (
              <>
                <Trees className="w-3 h-3 text-zinc-900" />
                <span>3D Diorama</span>
              </>
            )}
          </button>
        </div>

        {/* Row 2: Profiles Selector Tabs + Mute Button */}
        <div className="flex items-center justify-between gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {seasonList.map((seasonKey, idx) => {
              const s = SEASONS[seasonKey];
              const isSelected = selectedSeason === seasonKey;

              return (
                <button
                  key={seasonKey}
                  onClick={() => {
                    sound.playSeasonChime(idx);
                    onSelectSeason(seasonKey);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 text-white font-bold shadow-xs'
                      : 'bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 border border-zinc-200/80 hover:text-zinc-900'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span>{s.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Audio Mute/Unmute Toggle Button */}
          <button
            onClick={() => {
              sound.playWoodClick();
              onToggleMute();
            }}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 border border-zinc-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title={isMuted ? 'Unmute Zen Sounds' : 'Mute Zen Sounds'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-400" /> : <Volume2 className="w-4 h-4 text-zinc-900" />}
          </button>
        </div>

        {/* Row 3: Color Palette Dots */}
        <div className="flex items-center justify-center gap-2.5 pt-0.5">
          {COLOR_OPTIONS.map((color) => {
            const isSelected = selectedColorId === color.id;

            return (
              <button
                key={color.id}
                onClick={() => {
                  sound.playWoodClick();
                  onSelectColor(color);
                }}
                className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-200 hover:scale-115 active:scale-95 cursor-pointer ${
                  isSelected ? 'ring-2 ring-offset-2 ring-zinc-900 scale-110 shadow-xs' : 'opacity-80 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              >
                {isSelected && (
                  <span className="absolute inset-0 flex items-center justify-center text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
