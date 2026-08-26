import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, ShieldCheck, Zap, QrCode } from 'lucide-react';
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
      desc: '30% Reed-Solomon mathematical redundancy. Fully scan-resistant against 3D perspective occlusion, surface shadows, and low-light environments.',
    },
    {
      icon: Zap,
      title: 'Sub-Millisecond Scan Lock',
      tag: '< 40MS',
      desc: 'High-elevation parallel orthographic camera projection guarantees immediate detection across iOS Camera, Google Lens, and Android scanners.',
    },
    {
      icon: Cpu,
      title: 'Hardware-Accelerated WebGL',
      tag: '60-120 FPS',
      desc: 'Instanced geometry rendering thousands of micro-tiles on the GPU with zero CPU bottleneck and silky-smooth orbital rotation.',
    },
    {
      icon: Layers,
      title: 'Engineered Visual Profiles',
      tag: '4 PROFILES',
      desc: 'Tactical profiles: Ronin Pine, Cyber Grid, Obsidian Ember, and Stealth Titanium. Zero pastel fluff; pure masculine precision.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Top Navbar */}
      <nav className="w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="font-bold text-2xl tracking-tight text-zinc-900 font-sans group-hover:text-zinc-700 transition-colors">
              qrty
            </span>
            <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200 uppercase">
              v2.4
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#specs" className="hover:text-zinc-900 transition-colors">Specifications</a>
            <a href="#themes" className="hover:text-zinc-900 transition-colors">Profiles</a>
            <a href="#pipeline" className="hover:text-zinc-900 transition-colors">Pipeline</a>
          </div>

          <Link
            href="/create"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white font-semibold text-xs sm:text-sm tracking-tight transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center gap-8">
        {/* Top Spec Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-xs text-xs font-mono font-semibold text-zinc-700">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>MIL-SPEC LEVEL H REDUNDANCY (30%) • THREE.JS GPU ENGINE</span>
        </div>

        {/* Hero Title */}
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 uppercase leading-[1.08] max-w-4xl">
            ENGINEERED <span className="underline decoration-zinc-900 decoration-4 underline-offset-8">3D QR CODES</span>.
            <br />
            BUILT FOR PRECISION.
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl font-normal leading-relaxed pt-3">
            Transform raw links into interactive 3D tactical dioramas. Procedural black pine and cyber bonsai architecture, zero perspective distortion, and instant camera lock-on.
          </p>
        </div>

        {/* Hero Client Component (Input Bar + Interactive 3D Teaser Card) */}
        <LandingHeroClient />
      </section>

      {/* Engineering Specs Grid */}
      <section id="specs" className="py-20 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              HARDWARE SPECIFICATIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              Tactical QR Matrix Engineering
            </h2>
            <p className="text-sm text-zinc-500 max-w-lg">
              Engineered from the ground up to solve camera parallax, shadow occlusion, and aesthetic degradation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {specs.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-zinc-50/70 border border-zinc-200/90 hover:border-zinc-300 hover:bg-white transition-all flex flex-col justify-between gap-5 group shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 shadow-xs group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-zinc-600 bg-white px-2 py-0.5 rounded border border-zinc-200">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-zinc-900 tracking-tight">{item.title}</h3>
                    <p className="text-xs text-zinc-600 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Profiles Showcase Section */}
      <section id="themes" className="py-20 px-6 border-t border-zinc-200 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="flex flex-col items-center text-center gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              TACTICAL PROFILES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              Precision-Crafted Themes
            </h2>
            <p className="text-sm text-zinc-500 max-w-lg">
              Four masculine profiles with bespoke 3D tree geometry, material shaders, and particle dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col gap-3 shadow-xs">
              <div className="text-3xl">🌲</div>
              <h4 className="text-base font-bold text-zinc-900">Ronin Pine</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Japanese Kuromatsu black pine with deep evergreen needle clouds, weathered stone base, and midnight moss hedge corners.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col gap-3 shadow-xs">
              <div className="text-3xl">⚡</div>
              <h4 className="text-base font-bold text-zinc-900">Cyber Grid</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Electric cobalt matrix on titanium white slab with circuit tree branches and digital pulse particles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col gap-3 shadow-xs">
              <div className="text-3xl">🌋</div>
              <h4 className="text-base font-bold text-zinc-900">Obsidian Ember</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Forged volcanic steel pedestal with molten crimson magma modules and furnace spark particles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col gap-3 shadow-xs">
              <div className="text-3xl">🛡️</div>
              <h4 className="text-base font-bold text-zinc-900">Stealth Titanium</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Matte aluminum slab with pure graphite black modules and brushed steel canopy for maximum stealth aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-zinc-50 border border-zinc-200 text-center flex flex-col items-center gap-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 shadow-xs">
            <QrCode className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
              Ready to deploy your 3D QR diorama?
            </h2>
            <p className="text-sm text-zinc-600 max-w-md mx-auto">
              Zero accounts required. Input your link, customize your tactical profile, and export 4K prints or 3D wallpapers in seconds.
            </p>
          </div>
          <Link
            href="/create"
            className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-zinc-900 hover:bg-black text-white font-semibold text-sm sm:text-base tracking-tight transition-all hover:scale-105 active:scale-95 shadow-md"
          >
            <span>Launch Generator Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 py-8 px-6 text-center text-xs font-mono text-zinc-500 bg-[#f8f9fa]">
        <p>qrty // TACTICAL 3D QR ARCHITECTURE • BUILT WITH NEXT.JS SSR & THREE.JS WEBGL</p>
      </footer>
    </div>
  );
}
