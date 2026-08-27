import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const SITE_URL = 'https://qrty.kukaass.app';

export const viewport: Viewport = {
  themeColor: '#09090B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'qrty — Free 3D QR Code Generator | Aesthetic & Scannable QR Maker',
    template: '%s | qrty',
  },
  description:
    'Free high-precision 3D QR code generator. Transform links into interactive 3D WebGL dioramas and high-contrast scannable QR codes with Level H (30%) error correction. Built by qrty (qwerty qr).',
  keywords: [
    'qr generator',
    'qrty',
    'qwerty qr',
    '3d qr generator',
    '3d qr code generator',
    'free qr code generator',
    'qr code maker',
    'custom qr code',
    'aesthetic qr code',
    'minimalist qr generator',
    'interactive qr diorama',
    'scannable qr code',
    'high redundancy qr',
    'qr code creator',
    'webgl qr code',
  ],
  authors: [{ name: 'Kukaass', url: SITE_URL }],
  creator: 'Kukaass',
  publisher: 'qrty',
  applicationName: 'qrty',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'qrty — 3D QR Code Generator (Free & Minimalist)',
    description:
      'Transform links into interactive 3D tactical dioramas. Level H redundancy, hardware WebGL pipeline, and sub-millisecond camera lock.',
    url: SITE_URL,
    siteName: 'qrty',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'qrty — 3D QR Code Generator',
    description:
      'Engineered 3D QR Codes with Level H redundancy. Fast, free, and minimalist generator.',
    creator: '@kukaass',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'qrty',
  alternateName: ['qwerty qr', 'qrty generator', '3D QR Generator', 'qrty.kukaass.app'],
  url: SITE_URL,
  isPartOf: {
    '@type': 'WebSite',
    '@id': 'https://kukaass.app/#website',
    name: 'Kukaass',
    url: 'https://kukaass.app',
  },
  author: {
    '@type': 'Person',
    '@id': 'https://kukaass.app/#person',
    name: 'Chester Luke A. Maligaso',
    alternateName: ['Kukaass'],
    url: 'https://kukaass.app',
  },
  creator: {
    '@type': 'Person',
    '@id': 'https://kukaass.app/#person',
    name: 'Chester Luke A. Maligaso',
    url: 'https://kukaass.app',
  },
  description:
    'Free high-precision 3D QR code generator. Transform links into interactive 3D WebGL dioramas and high-contrast scannable QR codes with Level H error correction. Built under the Kukaass ecosystem.',
  applicationCategory: 'DesignApplication, UtilityApplication',
  operatingSystem: 'All',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Interactive 3D WebGL QR Dioramas',
    'Instant Flat 2D QR Scan Mode with Zero Distortion',
    'Mil-Spec Level H (30%) Error Correction Redundancy',
    '8 Masculine Designer Centerpieces (Hypercar, Mecha, Starship, Stealth Jet, Cyber Tank, etc.)',
    'High-Resolution 4K PNG & SVG Export',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Kukaass',
      item: 'https://kukaass.app',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'qrty',
      item: SITE_URL,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className="antialiased bg-[#f8f9fa] text-zinc-900 selection:bg-zinc-900 selection:text-white min-h-screen w-full font-sans">
        {children}
      </body>
    </html>
  );
}
