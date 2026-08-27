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
    'Chester Maligaso',
    'Chester Luke Maligaso',
    'Chester Luke A. Maligaso',
    'Maligaso',
    'Kukaass',
  ],
  authors: [
    { name: 'Chester Luke A. Maligaso', url: 'https://kukaass.app' },
    { name: 'Kukaass', url: 'https://kukaass.app' },
  ],
  creator: 'Chester Luke A. Maligaso (Chester Maligaso)',
  publisher: 'qrty',
  applicationName: 'qrty',
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-48.png', type: 'image/png', sizes: '48x48' },
      { url: '/icon-96.png', type: 'image/png', sizes: '96x96' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', type: 'image/png', sizes: '48x48', url: '/icon-48.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', url: '/icon-192.png' },
      { rel: 'icon', type: 'image/png', sizes: '512x512', url: '/icon-512.png' },
    ],
  },
  openGraph: {
    title: 'qrty — 3D QR Code Generator (Free & Minimalist)',
    description:
      'Transform links into interactive 3D tactical dioramas. Level H redundancy, hardware WebGL pipeline, and sub-millisecond camera lock.',
    url: SITE_URL,
    siteName: 'qrty',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'qrty — 3D QR Code Generator by Chester Luke Maligaso',
      },
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'qrty Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'qrty — 3D QR Code Generator',
    description:
      'Engineered 3D QR Codes with Level H redundancy. Fast, free, and minimalist generator by Chester Luke Maligaso.',
    creator: '@kukaass',
    images: ['/og-image.png'],
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
  image: `${SITE_URL}/icon-512.png`,
  logo: `${SITE_URL}/icon-512.png`,
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
    givenName: 'Chester Luke',
    familyName: 'Maligaso',
    alternateName: ['Chester Maligaso', 'Chester Luke Maligaso', 'Chester Luke', 'Maligaso', 'Kukaass'],
    url: 'https://kukaass.app',
    jobTitle: 'Full-Stack Software Developer',
    sameAs: [
      'https://github.com/Kukaas',
      'https://www.linkedin.com/in/chester-luke-maligaso-812732359',
      'https://www.facebook.com/kukaass.dev/',
      'https://www.instagram.com/itsmechester_/',
    ],
  },
  creator: {
    '@type': 'Person',
    '@id': 'https://kukaass.app/#person',
    name: 'Chester Luke A. Maligaso',
    givenName: 'Chester Luke',
    familyName: 'Maligaso',
    alternateName: ['Chester Maligaso', 'Chester Luke Maligaso', 'Chester Luke', 'Maligaso', 'Kukaass'],
    url: 'https://kukaass.app',
  },
  publisher: {
    '@type': 'Organization',
    name: 'qrty',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
  },
  description:
    'Free high-precision 3D QR code generator. Transform links into interactive 3D WebGL dioramas and high-contrast scannable QR codes with Level H error correction. Built by Chester Luke Maligaso (Chester Maligaso, Kukaass).',
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

        {/* High-resolution favicon and touch icon links for Google Search & browsers */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      </head>
      <body className="antialiased bg-[#f8f9fa] text-zinc-900 selection:bg-zinc-900 selection:text-white min-h-screen w-full font-sans">
        {children}
      </body>
    </html>
  );
}
