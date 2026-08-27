import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, ShieldCheck, Zap, QrCode, ExternalLink, MessageSquare, Globe } from 'lucide-react';
import LandingHeroClient from '@/components/LandingHeroClient';
import Logo from '@/components/Logo';

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

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is qrty (qwerty qr) and how does this 3D QR generator work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'qrty (also known as qwerty qr or qr generator) is a next-generation 3D QR code maker hosted on qrty.kukaass.app. It renders your URL payload as an interactive 3D WebGL diorama with customizable centerpieces and a dedicated instant Scan Mode.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can standard smartphone cameras scan these 3D QR codes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Every QR code is generated with Mil-Spec Level H (30%) Reed-Solomon error correction redundancy and a flat zero-perspective scan mode, allowing any iPhone or Android camera to decode the URL in milliseconds.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is qrty free to use for personal and commercial projects?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'qrty is 100% free with zero accounts, no sign-ups, and no paywalls. You can generate unlimited custom QR codes and export 4K high-resolution PNGs or wallpapers.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I export and download my 3D QR code?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Click Launch Studio, enter your website link, customize your preferred centerpiece and color theme, and tap the Share / Export button to download high-resolution images ready for printing, merchandise, business cards, or online sharing.',
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'qrty',
        item: 'https://qrty.kukaass.app',
      },
    ],
  };

  return (
    <div className="min-h-screen w-full bg-[#f8f9fa] text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans antialiased overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo badge="v1.0.5" size={32} />

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
            <a href="#specs" className="hover:text-zinc-900 transition-colors">Specifications</a>
            <a href="#themes" className="hover:text-zinc-900 transition-colors">Profiles</a>
            <a href="#pipeline" className="hover:text-zinc-900 transition-colors">Pipeline</a>
          </div>

          <Link
            href="/create"
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white font-semibold text-xs sm:text-sm tracking-tight transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <span>Launch Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-10 sm:pt-16 pb-14 sm:pb-20 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-8">
        {/* Top Spec Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-zinc-200 shadow-xs text-[11px] sm:text-xs font-mono font-semibold text-zinc-700 max-w-full">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
          <span className="hidden sm:inline">MIL-SPEC LEVEL H REDUNDANCY (30%) • THREE.JS GPU ENGINE</span>
          <span className="inline sm:hidden">LEVEL H (30% REDUNDANCY) • WEBGL 2.0</span>
        </div>

        {/* Hero Title */}
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 uppercase leading-[1.12] sm:leading-[1.08] max-w-4xl px-1">
            ENGINEERED <span className="underline decoration-zinc-900 decoration-3 sm:decoration-4 underline-offset-4 sm:underline-offset-8">3D QR CODES</span>.
            <br />
            BUILT FOR PRECISION.
          </h1>
          <p className="text-sm sm:text-lg text-zinc-600 max-w-2xl font-normal leading-relaxed pt-2 sm:pt-3 px-2">
            Transform raw links into interactive 3D tactical dioramas. Procedural black pine and cyber bonsai architecture, zero perspective distortion, and instant camera lock-on.
          </p>
        </div>

        {/* Hero Client Component (Input Bar + Interactive 3D Teaser Card) */}
        <LandingHeroClient />
      </section>

      {/* Engineering Specs Grid */}
      <section id="specs" className="py-14 sm:py-20 px-4 sm:px-6 border-t border-zinc-200 bg-white">
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
      <section id="themes" className="py-14 sm:py-20 px-4 sm:px-6 border-t border-zinc-200 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">
          <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              TACTICAL PROFILES
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              Precision-Crafted Themes
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-lg px-2">
              Four iconic masculine 3D centerpieces: Hypercar, Mecha Ronin, Starship, and Stealth Jet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col gap-3 shadow-xs">
              <div className="text-3xl">🏎️</div>
              <h4 className="text-base font-bold text-zinc-900">Hypercar</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Low-poly concept supercar with glowing neon light bars, aerodynamic spoiler, spinning alloy wheels, and magnetic suspension.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col gap-3 shadow-xs">
              <div className="text-3xl">🤖</div>
              <h4 className="text-base font-bold text-zinc-900">Mecha Ronin</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Tactical cybernetic samurai warrior with angular chest armor, glowing power reactor, visor slit, and dual plasma energy katanas.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col gap-3 shadow-xs">
              <div className="text-3xl">🚀</div>
              <h4 className="text-base font-bold text-zinc-900">Starship</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Orbital exploration rocket with faceted heat shield, titanium grid fins, landing struts, and glowing fiery engine exhaust.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200 flex flex-col gap-3 shadow-xs">
              <div className="text-3xl">✈️</div>
              <h4 className="text-base font-bold text-zinc-900">Stealth Jet</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Supersonic stealth fighter jet with faceted delta wings, canted V-tails, radar-deflecting chines, and twin afterburner flames.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section with Schema.org FAQPage */}
      <section id="faq" className="py-14 sm:py-20 px-4 sm:px-6 border-t border-zinc-200 bg-[#f8f9fa]">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
              SEARCH & COMPATIBILITY FAQ
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
              Frequently Asked Questions About qrty
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-lg px-2">
              Everything you need to know about generating scannable 3D QR code dioramas.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs flex flex-col gap-2">
              <h3 className="text-base font-bold text-zinc-900">
                What is qrty (qwerty qr) and how does this 3D QR generator work?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                qrty (also searched as qwerty qr or qr generator) is a next-generation 3D QR code maker hosted on <strong className="text-zinc-900">qrty.kukaass.app</strong>. Unlike flat, boring black-and-white barcodes, qrty renders your URL payload as an interactive 3D WebGL diorama with customizable centerpieces (Hypercar, Mecha Ronin, Starship, Cyber Tank, etc.) and a dedicated instant Scan Mode.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs flex flex-col gap-2">
              <h3 className="text-base font-bold text-zinc-900">
                Can standard smartphone cameras scan these 3D QR codes?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Yes! Every QR code is generated with Mil-Spec Level H (30%) Reed-Solomon error correction redundancy. In Scan Mode, the camera automatically locks into an orthographic zero-perspective plane with solid finder patterns, allowing iOS Camera, Android Google Lens, and barcode scanners to decode your URL in milliseconds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs flex flex-col gap-2">
              <h3 className="text-base font-bold text-zinc-900">
                Is qrty free to use for personal and commercial projects?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                qrty is 100% free with zero accounts, no sign-ups, and no paywalls. You can generate unlimited custom QR codes and export 4K high-resolution PNGs or wallpapers directly to your device.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs flex flex-col gap-2">
              <h3 className="text-base font-bold text-zinc-900">
                How do I export and download my 3D QR code?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Click "Launch Studio", enter your website link, customize your preferred centerpiece and color theme, and tap the Share / Export button to download high-resolution images ready for printing, merchandise, business cards, or online sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-t border-zinc-200 bg-white">
        <div className="max-w-4xl mx-auto rounded-2xl sm:rounded-3xl p-6 sm:p-12 bg-zinc-50 border border-zinc-200 text-center flex flex-col items-center gap-5 sm:gap-6 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 shadow-xs">
            <QrCode className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
              Ready to deploy your 3D QR diorama?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-md mx-auto">
              Zero accounts required. Input your link, customize your tactical profile, and export 4K prints or 3D wallpapers in seconds.
            </p>
          </div>
          <Link
            href="/create"
            className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl bg-zinc-900 hover:bg-black text-white font-semibold text-xs sm:text-base tracking-tight transition-all hover:scale-105 active:scale-95 shadow-md w-full sm:w-auto"
          >
            <span>Launch Generator Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Comprehensive Architectural Footer with Creator Info & Suggestions Contact */}
      <footer className="w-full border-t border-zinc-200 bg-white text-zinc-900 pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">
          {/* Top Row: Suggestion Banner / Contact Card */}
          <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 shadow-xs">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-bold text-zinc-900">
                    Have suggestions or custom feature ideas?
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    Feedback
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-xl">
                  Want new 3D figures, custom export dimensions, or API integrations? Send your suggestions directly to Chester Luke Maligaso.
                </p>
              </div>
            </div>

            <a
              href="https://kukaass.app/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs sm:text-sm font-semibold tracking-tight transition-all hover:scale-105 active:scale-95 shadow-sm shrink-0 font-mono w-full sm:w-auto"
            >
              <span>Submit Suggestion</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Middle Row: Links Columns */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
            {/* Col 1: Brand & Creator Info */}
            <div className="flex flex-col gap-3 md:col-span-2">
              <Logo badge="v1.0.5" size={28} />
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-md">
                Engineered by <strong className="text-zinc-900">Chester Luke Maligaso</strong> (<a href="https://kukaass.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-black font-semibold">kukaass.app</a>). A high-precision 3D QR diorama generator combining hardware WebGL rendering with Mil-Spec error correction.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://kukaass.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono transition-colors"
                  title="Chester Luke's Website"
                >
                  <Globe className="w-3.5 h-3.5 text-zinc-700" />
                  <span>kukaass.app</span>
                </a>
                <a
                  href="https://github.com/kukaass"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono transition-colors"
                  title="GitHub Profile"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-zinc-700" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>kukaass</span>
                </a>
              </div>
            </div>

            {/* Col 2: Creator Information */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                Creator
              </h4>
              <ul className="flex flex-col gap-2 text-xs font-mono text-zinc-600">
                <li>
                  <a
                    href="https://kukaass.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-900 transition-colors flex items-center gap-1"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://kukaass.app/#about"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-900 transition-colors flex items-center gap-1"
                  >
                    <span>About Chester</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://kukaass.app/#projects"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-900 transition-colors flex items-center gap-1"
                  >
                    <span>Selected Works</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://kukaass.app/#contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-zinc-900 transition-colors flex items-center gap-1 text-zinc-900 font-bold"
                  >
                    <span>Contact & Suggestions</span>
                    <ExternalLink className="w-3 h-3 text-zinc-600" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Architecture & Specs */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase">
                Architecture
              </h4>
              <ul className="flex flex-col gap-2 text-xs font-mono text-zinc-600">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>Next.js 16.3 (Turbopack)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                  <span>Three.js WebGL 2.0</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />
                  <span>Level H Reed-Solomon</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  <span>Hosted on Vercel Edge</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="border-t border-zinc-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <p>
              © 2026 <a href="https://kukaass.app" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 font-semibold underline">Chester Luke Maligaso</a>. All rights reserved.
            </p>
            <p>
              qrty.kukaass.app // PRECISION 3D QR ARCHITECTURE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
