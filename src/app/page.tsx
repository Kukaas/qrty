import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, ShieldCheck, Zap, Terminal, Code2, QrCode, Sparkles } from 'lucide-react';
import LandingHeroClient from '@/components/LandingHeroClient';

export const metadata: Metadata = {
  title: 'qrty — Engineered 3D QR Codes',
  description: 'Transform raw links into interactive 3D tactical dioramas. Zero distortion, Level H redundancy, and hardware-accelerated WebGL.',
  openGraph: {
    title: 'qrty — Engineered 3D QR Codes',
    description: 'Transform raw links into interactive 3D tactical dioramas. Zero distortion, Level H redundancy, and hardware-accelerated WebGL.',
    type: 'website',
  },
};

export default function LandingPage() {
  const specs = [
    {
      icon: ShieldCheck,
      title: 'Level H Error Correction',
      tag: 'MIL-SPEC',
      desc: '30% Reed-Solomon mathematical redundancy. Fully scan-resistant against 3D perspective occlusion, shadows, and low-light environments.',
    },
    {
      icon: Zap,
      title: 'Sub-Millisecond Scan Lock',
      tag: '< 40MS',
      desc: 'High-elevation parallel orthographic camera projection guarantees immediate detection across iOS Camera, Google Lens, and WeChat.',
    },
    {
      icon: Cpu,
      title: 'Hardware-Accelerated WebGL',
      tag: '60-120 FPS',
      desc: 'Instanced geometry rendering thousands of micro-tiles on the GPU with zero CPU overhead and silky-smooth orbital rotation.',
    },
    {
      icon: Layers,
      title: 'Tactical Obsidian Themes',
      tag: '4 PROFILES',
      desc: 'Engineered profiles: Ronin Pine, Cyber Noir, Obsidian Ember, and Stealth Titanium. Zero pastel fluff; pure masculine precision.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300 font-sans antialiased overflow-x-hidden">
      {/* Top Navbar */}
      <nav className="w-full border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="font-bold text-xl tracking-tight text-white font-sans group-hover:text-emerald-400 transition-colors">
              qrty
            </span>
            <span className="text-[10px] font-mono font-semibold tracking-wider text-zinc-400 bg-zinc-900 px-2 py-0.5 rounded-full border border-zinc-800 uppercase">
              v2.4
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-mono text-zinc-400">
            <a href="#architecture" className="hover:text-zinc-100 transition-colors">Architecture</a>
            <a href="#specs" className="hover:text-zinc-100 transition-colors">Specs</a>
            <a href="#themes" className="hover:text-zinc-100 transition-colors">Themes</a>
          </div>

          <Link
            href="/create"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs sm:text-sm tracking-tight transition-all hover:scale-105 active:scale-95 shadow-md shadow-black/40"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Top Spec Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-inner text-xs font-mono text-zinc-300">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>MIL-SPEC LEVEL H REDUNDANCY (30%) • THREE.JS GPU ENGINE</span>
        </div>

        {/* Hero Title */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-white uppercase leading-[1.05] max-w-4xl">
            ENGINEERED <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">3D QR CODES</span>.
            <br />
            BUILT FOR PRECISION.
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed pt-2">
            Transform raw links into interactive 3D tactical dioramas. Procedural black pine and cyber bonsai architecture, zero perspective distortion, and instant camera lock-on.
          </p>
        </div>

        {/* Hero Client Component (Input Bar + Interactive 3D Teaser Card) */}
        <LandingHeroClient />
      </section>

      {/* Engineering Specs Grid */}
      <section id="specs" className="py-20 px-6 border-t border-zinc-800/80 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              HARDWARE SPECIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Tactical QR Matrix Engineering
            </h2>
            <p className="text-sm text-zinc-400 max-w-lg">
              Designed from the ground up to solve camera parallax, shadow occlusion, and aesthetic degradation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specs.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/90 border border-zinc-700/60 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-zinc-100 tracking-tight">{item.title}</h3>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Themes Showcase Section */}
      <section id="themes" className="py-20 px-6 border-t border-zinc-800/80">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              TACTICAL PROFILES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Forged for Engineers & Creators
            </h2>
            <p className="text-sm text-zinc-400 max-w-lg">
              Four masculine visual profiles with bespoke 3D tree geometry, material shaders, and particle dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-3">
              <div className="text-2xl">🌲</div>
              <h4 className="text-base font-bold text-zinc-100">Ronin Pine</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Japanese Kuromatsu black pine with deep evergreen needle clouds, weathered slate base, and midnight moss hedge corners.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-3">
              <div className="text-2xl">⚡</div>
              <h4 className="text-base font-bold text-zinc-100">Cyber Noir</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Electric neon grid on obsidian basalt with holographic data tree branches and drifting digital pulse particles.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-3">
              <div className="text-2xl">🌋</div>
              <h4 className="text-base font-bold text-zinc-100">Obsidian Ember</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Volcanic basalt slab with glowing magma modules, charred ironwood trunk, and drifting furnace spark particles.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col gap-3">
              <div className="text-2xl">🛡️</div>
              <h4 className="text-base font-bold text-zinc-100">Stealth Carbon</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Matte gunmetal pedestal with aerospace graphite modules and brushed steel canopy for maximum stealth aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-6 border-t border-zinc-800/80 bg-zinc-950">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 text-center flex flex-col items-center gap-6 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <QrCode className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to deploy your 3D QR diorama?
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              Zero accounts required. Input your link, customize your tactical profile, and export 4K prints or 3D wallpapers in seconds.
            </p>
          </div>
          <Link
            href="/create"
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-sm sm:text-base tracking-tight transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/60"
          >
            <span>Launch Generator Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-8 px-6 text-center text-xs font-mono text-zinc-600">
        <p>qrty // TACTICAL 3D QR ARCHITECTURE • BUILT WITH NEXT.JS SSR & THREE.JS WEBGL</p>
      </footer>
    </div>
  );
}
