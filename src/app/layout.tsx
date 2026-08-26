import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

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
    <html lang="en" className={poppins.variable}>
      <body className="antialiased bg-[#f8f9fa] text-zinc-900 selection:bg-zinc-900 selection:text-white min-h-screen w-full">
        {children}
      </body>
    </html>
  );
}
