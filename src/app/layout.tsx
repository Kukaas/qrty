import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'qrty — 3D QR Code Generator',
  description: 'Turn any link into a stunning 3D tree diorama that doubles as a scannable QR code.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#f7f3e8] text-stone-800 selection:bg-amber-200 selection:text-amber-900 overflow-hidden h-screen w-screen">
        {children}
      </body>
    </html>
  );
}
