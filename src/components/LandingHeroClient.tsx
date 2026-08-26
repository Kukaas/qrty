'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, QrCode, Trees, ShieldCheck, Zap, Sparkles, Layers, Cpu, Radio } from 'lucide-react';
import dynamic from 'next/dynamic';
import { generateQRMatrix } from '@/lib/qr';
import { SEASONS } from '@/lib/constants';

// Light dynamic scene for hero card
const MagicTreeScene = dynamic(() => import('@/components/MagicTreeScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#121415] text-zinc-500">
      <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      <span className="text-xs font-mono tracking-wide uppercase">Initializing WebGL Engine...</span>
    </div>
  ),
});

export default function LandingHeroClient() {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState('https://github.com');
  const [activeSeason, setActiveSeason] = useState<'ronin' | 'cyber' | 'ember' | 'stealth'>('ronin');
  const [viewMode, setViewMode] = useState<'3d' | 'qr'>('3d');

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
    { label: 'X.com', url: 'https://x.com' },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-12">
      {/* Quick Launch Input Form */}
      <div className="w-full max-w-xl flex flex-col items-center gap-3">
        <form
          onSubmit={handleSubmit}
          className="w-full relative flex items-center p-1.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 focus-within:border-emerald-500/60 focus-within:ring-1 focus-within:ring-emerald-500/30 transition-all shadow-2xl shadow-black/60"
        >
          <div className="pl-3 pr-2 text-zinc-500 font-mono text-sm">
            <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
          </div>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Enter destination URL (e.g. https://github.com)..."
            className="flex-1 bg-transparent py-2.5 px-2 text-sm sm:text-base text-zinc-100 placeholder-zinc-500 focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs sm:text-sm tracking-tight transition-all hover:scale-[1.02] active:scale-98 shadow-md cursor-pointer shrink-0"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Preset Chips & Direct Generator Link */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span>TRY:</span>
          {quickPresets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setInputUrl(p.url)}
              className={`px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                inputUrl === p.url
                  ? 'bg-zinc-800 text-emerald-400 border-emerald-500/40'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 3D Teaser Card */}
      <div className="w-full max-w-4xl relative rounded-3xl bg-zinc-950/80 border border-zinc-800 shadow-2xl shadow-black/90 overflow-hidden backdrop-blur-xl">
        {/* Card Top Telemetry Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800/80 bg-zinc-900/40 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-200 font-semibold uppercase tracking-wider">LIVE 3D DIORAMA PREVIEW</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-500 hidden sm:inline">WebGL 2.0 • 60 FPS</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode(viewMode === '3d' ? 'qr' : '3d')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-zinc-700/60 transition-colors text-[11px] cursor-pointer"
            >
              {viewMode === '3d' ? (
                <>
                  <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Flatten QR</span>
                </>
              ) : (
                <>
                  <Trees className="w-3.5 h-3.5 text-emerald-400" />
                  <span>View 3D</span>
                </>
              )}
            </button>

            <Link
              href={`/create?q=${encodeURIComponent(inputUrl)}&season=${activeSeason}`}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold transition-all text-[11px]"
            >
              <span>Open Studio</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 3D WebGL Canvas Viewport */}
        <div className="relative w-full h-[360px] sm:h-[460px] bg-[#121415] overflow-hidden">
          <MagicTreeScene
            qrData={demoQR}
            season={SEASONS[activeSeason]}
            viewMode={viewMode}
            onToggleViewMode={() => setViewMode(viewMode === '3d' ? 'qr' : '3d')}
            onRegisterCapture={() => {}}
          />

          {/* Floating Instructions Overlay */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <div className="px-3 py-1.5 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-[11px] font-mono text-zinc-400 shadow-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Drag to orbit • Tap diorama to toggle 2D/3D</span>
            </div>
          </div>

          {/* Theme Quick Switcher in Teaser */}
          <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 p-1 rounded-xl shadow-lg">
            {(['ronin', 'cyber', 'ember', 'stealth'] as const).map((sKey) => {
              const s = SEASONS[sKey];
              const isSelected = activeSeason === sKey;
              return (
                <button
                  key={sKey}
                  type="button"
                  onClick={() => setActiveSeason(sKey)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800 text-white font-bold border border-zinc-700'
                      : 'text-zinc-400 hover:text-zinc-200'
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
