'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Season, ColorOption, ViewMode } from '@/types';
import { SEASONS, COLOR_OPTIONS } from '@/lib/constants';
import { Share2, Volume2, VolumeX, Check, Copy, QrCode, Trees, ChevronLeft, ChevronRight } from 'lucide-react';
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

const PRESET_LIST: Season[] = [
  'cyber',
  'ronin',
  'ember',
  'stealth',
  'tron',
  'ufo',
  'chopper',
  'blade',
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
  const presetsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Mouse drag-to-scroll states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const checkScroll = () => {
    if (!presetsRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = presetsRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = presetsRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatRedirectUrl(url));
    sound.playWoodClick();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const scrollPresets = (direction: 'left' | 'right') => {
    if (!presetsRef.current) return;
    const amount = direction === 'left' ? -160 : 160;
    presetsRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    sound.playWoodClick();
    setTimeout(checkScroll, 200);
  };

  // Convert mouse wheel to horizontal scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!presetsRef.current) return;
    if (e.deltaY !== 0) {
      presetsRef.current.scrollLeft += e.deltaY;
      checkScroll();
    }
  };

  // Mouse drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!presetsRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - presetsRef.current.offsetLeft);
    setScrollLeftState(presetsRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !presetsRef.current) return;
    e.preventDefault();
    const x = e.pageX - presetsRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    presetsRef.current.scrollLeft = scrollLeftState - walk;
    checkScroll();
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const formattedUrl = formatRedirectUrl(url);

  return (
    <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 z-20 flex justify-center px-2.5 sm:px-4 pointer-events-none pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="pointer-events-auto w-full max-w-xl bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-xl shadow-zinc-300/40 rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 flex flex-col gap-2 transition-all">
        {/* Row 1: URL Input & Export Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center min-w-0">
            <input
              type="text"
              value={url}
              onChange={(e) => onChangeUrl(e.target.value)}
              placeholder="Enter destination link (e.g. https://github.com)..."
              className="w-full bg-zinc-50 border border-zinc-200 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all font-mono truncate"
            />
            {url && (
              <button
                type="button"
                onClick={handleCopy}
                className="absolute right-2.5 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
                title={copied ? 'Copied!' : 'Copy link'}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

          {/* Export / Share Button */}
          <button
            type="button"
            onClick={() => {
              sound.playWoodClick();
              onOpenExport();
            }}
            className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-zinc-900 hover:bg-black text-white font-bold shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title="Export / Download QR"
            aria-label="Export QR Code"
          >
            <Share2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </div>

        {/* Row 2: Quick Destination Chips & View Mode Toggle */}
        <div className="flex items-center justify-between gap-1.5 text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            <span className="font-semibold text-zinc-400 text-[10px] hidden sm:inline">TRY:</span>
            {QUICK_LINKS.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  sound.playWoodClick();
                  onChangeUrl(link.url);
                }}
                className={`px-2 py-0.5 rounded-md border text-[10px] sm:text-[11px] font-medium transition-colors cursor-pointer shrink-0 ${
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
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 font-bold text-[10px] sm:text-xs cursor-pointer shrink-0 transition-colors"
          >
            {viewMode === '3d' ? (
              <>
                <QrCode className="w-3 h-3 text-zinc-900" />
                <span>Scan Mode</span>
              </>
            ) : (
              <>
                <Trees className="w-3 h-3 text-zinc-900" />
                <span>3D View</span>
              </>
            )}
          </button>
        </div>

        {/* Row 3: Presets Carousel with Arrow Controls & Wheel/Drag Scroll */}
        <div className="flex items-center gap-1 sm:gap-1.5 pt-0.5">
          {/* Scroll Left Button */}
          <button
            type="button"
            onClick={() => scrollPresets('left')}
            disabled={!canScrollLeft}
            className={`p-1.5 rounded-lg border transition-all shrink-0 ${
              canScrollLeft
                ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800 cursor-pointer shadow-2xs'
                : 'bg-zinc-50 border-zinc-150 text-zinc-300 cursor-not-allowed opacity-40'
            }`}
            title="Scroll Presets Left"
            aria-label="Previous Presets"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Horizontally-Scrollable 8 Presets Strip */}
          <div
            ref={presetsRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className="flex-1 flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-0.5 touch-pan-x cursor-grab active:cursor-grabbing select-none"
          >
            {PRESET_LIST.map((seasonKey, idx) => {
              const s = SEASONS[seasonKey];
              const isSelected = selectedSeason === seasonKey;

              return (
                <button
                  key={seasonKey}
                  type="button"
                  onClick={() => {
                    sound.playSeasonChime(idx);
                    onSelectSeason(seasonKey);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-mono font-medium transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap ${
                    isSelected
                      ? 'bg-zinc-900 text-white font-bold shadow-xs scale-102 ring-2 ring-zinc-900/20'
                      : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200/80 hover:text-zinc-900'
                  }`}
                >
                  <span className="text-sm sm:text-base">{s.icon}</span>
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            type="button"
            onClick={() => scrollPresets('right')}
            disabled={!canScrollRight}
            className={`p-1.5 rounded-lg border transition-all shrink-0 ${
              canScrollRight
                ? 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-800 cursor-pointer shadow-2xs'
                : 'bg-zinc-50 border-zinc-150 text-zinc-300 cursor-not-allowed opacity-40'
            }`}
            title="Scroll Presets Right"
            aria-label="Next Presets"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Audio Mute/Unmute Toggle */}
          <button
            type="button"
            onClick={() => {
              sound.playWoodClick();
              onToggleMute();
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 border border-zinc-200 transition-all hover:scale-105 active:scale-95 cursor-pointer shrink-0"
            title={isMuted ? 'Unmute Sounds' : 'Mute Sounds'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-zinc-900" />}
          </button>
        </div>

        {/* Row 4: Color Palette Dots */}
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 pt-0.5">
          {COLOR_OPTIONS.map((color) => {
            const isSelected = selectedColorId === color.id;

            return (
              <button
                key={color.id}
                type="button"
                onClick={() => {
                  sound.playWoodClick();
                  onSelectColor(color);
                }}
                className={`relative w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full transition-all duration-200 hover:scale-115 active:scale-95 cursor-pointer ${
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
