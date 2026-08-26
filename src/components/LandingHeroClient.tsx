'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, QrCode, Trees, Radio } from 'lucide-react';
import MagicTreeScene from '@/components/MagicTreeScene';
import { generateQRMatrix } from '@/lib/qr';
import { SEASONS } from '@/lib/constants';

export default function LandingHeroClient() {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState('https://github.com');
  const [activeSeason, setActiveSeason] = useState<'ronin' | 'cyber' | 'ember' | 'stealth'>('ronin');
  const [viewMode, setViewMode] = useState<'3d' | 'qr'>('3d');
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const demoQR = React.useMemo(() => {
    return generateQRMatrix(inputUrl);
  }, [inputUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = inputUrl.trim() || 'https://github.com';
    router.push(`/create?q=${encodeURIComponent(target)}&season=${activeSeason}`);
  };

  const quickPresets = [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'Google', url: 'https://google.com' },
    { label: 'YouTube', url: 'https://youtube.com' },
    { label: 'Next.js', url: 'https://nextjs.org' },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-10">
      {/* Quick Launch Input Form */}
      <div className="w-full max-w-xl flex flex-col items-center gap-3">
        <form
          onSubmit={handleSubmit}
          className="w-full relative flex items-center p-1.5 rounded-2xl bg-white border border-zinc-300 focus-within:border-zinc-900 focus-within:ring-2 focus-within:ring-zinc-900/10 transition-all shadow-md shadow-zinc-200/50"
        >
          <div className="pl-3 pr-2 text-zinc-400">
            <Radio className="w-4 h-4 text-zinc-900 animate-pulse" />
          </div>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter destination link (e.g. https://github.com)..."
            className="flex-1 bg-transparent py-2.5 px-2 text-sm sm:text-base text-zinc-900 placeholder-zinc-400 focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-black text-white font-semibold text-xs sm:text-sm tracking-tight transition-all hover:scale-[1.02] active:scale-98 shadow-sm cursor-pointer shrink-0"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Preset Chips */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span className="font-semibold text-zinc-400">PRESETS:</span>
          {quickPresets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setInputUrl(p.url)}
              className={`px-2.5 py-0.5 rounded-md border text-xs font-medium transition-colors cursor-pointer ${
                inputUrl === p.url
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 3D Teaser Card */}
      <div className="w-full max-w-4xl relative rounded-3xl bg-white border border-zinc-200/90 shadow-xl shadow-zinc-200/60 overflow-hidden">
        {/* Card Top Telemetry Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 bg-zinc-50/80 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-600">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-zinc-900 font-bold uppercase tracking-wider">LIVE 3D DIORAMA PREVIEW</span>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-500 hidden sm:inline">WebGL 2.0 • 60 FPS</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === '3d' ? 'qr' : '3d')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-200 transition-colors text-xs font-medium cursor-pointer shadow-xs"
            >
              {viewMode === '3d' ? (
                <>
                  <QrCode className="w-3.5 h-3.5 text-zinc-900" />
                  <span>Flatten QR</span>
                </>
              ) : (
                <>
                  <Trees className="w-3.5 h-3.5 text-zinc-900" />
                  <span>View 3D</span>
                </>
              )}
            </button>

            <Link
              href={`/create?q=${encodeURIComponent(inputUrl)}&season=${activeSeason}`}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 hover:bg-black text-white font-semibold transition-all text-xs shadow-xs"
            >
              <span>Open Studio</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 3D WebGL Canvas Viewport */}
        <div className="relative w-full h-[360px] sm:h-[460px] bg-[#F3F4F6] overflow-hidden">
          {isMounted ? (
            <MagicTreeScene
              qrData={demoQR}
              season={SEASONS[activeSeason]}
              viewMode={viewMode}
              onToggleViewMode={() => setViewMode(viewMode === '3d' ? 'qr' : '3d')}
              onRegisterCapture={() => {}}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#F3F4F6] text-zinc-500 font-sans">
              <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-mono tracking-wide uppercase">Initializing WebGL Engine...</span>
            </div>
          )}

          {/* Floating Instructions Overlay */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-zinc-200 text-xs font-mono text-zinc-600 shadow-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Drag to orbit • Tap diorama to toggle 2D/3D</span>
            </div>
          </div>

          {/* Theme Quick Switcher in Teaser */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 bg-white/95 backdrop-blur-md border border-zinc-200 p-1 rounded-xl shadow-md">
            {(['ronin', 'cyber', 'ember', 'stealth'] as const).map((sKey) => {
              const s = SEASONS[sKey];
              const isSelected = activeSeason === sKey;
              return (
                <button
                  key={sKey}
                  type="button"
                  onClick={() => setActiveSeason(sKey)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-900 text-white font-bold'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span className="hidden sm:inline">{s.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
