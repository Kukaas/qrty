import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'qrty — Engineered 3D QR Codes',
  description: 'Transform raw links into interactive 3D tactical dioramas. Level H redundancy, hardware WebGL pipeline, and sub-millisecond camera lock.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-300 min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
