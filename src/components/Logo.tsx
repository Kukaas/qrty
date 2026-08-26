'use client';

import React from 'react';
import Link from 'next/link';
import { sound } from '@/lib/audio';

interface LogoProps {
  size?: number;
  showText?: boolean;
  badge?: string;
  asLink?: boolean;
  href?: string;
  className?: string;
}

export function LogoMark({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Tactical Dark Obsidian Squircle with Subtle Rim Light */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="11"
        fill="#09090B"
        stroke="#27272A"
        strokeWidth="1.5"
      />

      {/* Top Isometric Plane: QR Finder Core */}
      <path d="M24 9 L38 17 L24 25 L10 17 Z" fill="#FFFFFF" />
      <path d="M24 12.8 L33.5 18.2 L24 23.6 L14.5 18.2 Z" fill="#09090B" />
      <path d="M24 15.2 L29.5 18.3 L24 21.4 L18.5 18.3 Z" fill="#06B6D4" />

      {/* Left Isometric Plane: Titanium QR Data Modules */}
      <path d="M10 17 L24 25 L24 38 L10 30 Z" fill="#E4E4E7" />
      <path d="M12.5 20.2 L17.5 23.1 L17.5 26.5 L12.5 23.6 Z" fill="#09090B" />
      <path d="M19 24 L22 25.7 L22 29.1 L19 27.4 Z" fill="#09090B" />
      <path d="M12.5 25.5 L17.5 28.4 L17.5 31.8 L12.5 28.9 Z" fill="#06B6D4" />
      <path d="M19 29.8 L22 31.5 L22 34.9 L19 33.2 Z" fill="#09090B" />

      {/* Right Isometric Plane: Steel QR Data Modules */}
      <path d="M24 25 L38 17 L38 30 L24 38 Z" fill="#94A3B8" />
      <path d="M26 26.2 L31 23.3 L31 26.7 L26 29.6 Z" fill="#09090B" />
      <path d="M33 22.2 L36 20.5 L36 23.9 L33 25.6 Z" fill="#06B6D4" />
      <path d="M26 31.5 L29 29.8 L29 33.2 L26 34.9 Z" fill="#09090B" />
      <path d="M31 28.5 L36 25.6 L36 29 L31 31.9 Z" fill="#09090B" />

      {/* Terminal 'Q' Isometric Thrust */}
      <path d="M28 35.5 L40 40 L41 37.5 L29.5 33.5 Z" fill="#06B6D4" />
    </svg>
  );
}

export default function Logo({
  size = 32,
  showText = true,
  badge,
  asLink = true,
  href = '/',
  className = '',
}: LogoProps) {
  const content = (
    <div className={`inline-flex items-center gap-2.5 group cursor-pointer ${className}`}>
      <div className="transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
        <LogoMark size={size} />
      </div>

      {showText && (
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl sm:text-2xl tracking-tight text-zinc-900 font-sans group-hover:text-zinc-700 transition-colors select-none">
            qrty
          </span>
          {badge && (
            <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded-full border border-zinc-200 uppercase select-none">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (asLink) {
    return (
      <Link
        href={href}
        onClick={() => sound.playWoodClick()}
        className="focus:outline-none"
        title="qrty — 3D QR Code Generator"
      >
        {content}
      </Link>
    );
  }

  return content;
}
