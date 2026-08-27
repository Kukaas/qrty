import type { Metadata } from 'next';
import MagicTreeClient from '@/components/MagicTreeClient';
import { generateQRMatrix } from '@/lib/qr';
import { DEFAULT_URL } from '@/lib/constants';
import { Season } from '@/types';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    url?: string;
    season?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const rawTarget = params.q || params.url || DEFAULT_URL;

  let targetUrl = DEFAULT_URL;
  try {
    if (rawTarget.startsWith('MDB') || (rawTarget.length > 20 && !rawTarget.includes('://'))) {
      const decoded = Buffer.from(rawTarget, 'base64').toString('utf-8');
      targetUrl = decoded.replace(/^\d+/, '') || targetUrl;
    } else {
      targetUrl = decodeURIComponent(rawTarget);
    }
  } catch {
    targetUrl = rawTarget;
  }

  return {
    title: `qrty Studio — 3D QR Code (${targetUrl})`,
    description: `Tactical 3D QR diorama for ${targetUrl}. Scannable, customizable, and engineered by Chester Luke Maligaso.`,
    alternates: {
      canonical: 'https://qrty.kukaass.app/create',
    },
    authors: [
      { name: 'Chester Luke A. Maligaso', url: 'https://kukaass.app' },
      { name: 'Kukaass', url: 'https://kukaass.app' },
    ],
    creator: 'Chester Luke A. Maligaso (Chester Maligaso)',
    openGraph: {
      title: 'qrty Studio — 3D QR Code Generator',
      description: `Turn ${targetUrl} into a 3D tactical diorama that doubles as an instant scannable QR code. Built by Chester Luke Maligaso.`,
      type: 'website',
      url: 'https://qrty.kukaass.app/create',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'qrty Studio — 3D QR Code Generator',
        },
        {
          url: '/icon-512.png',
          width: 512,
          height: 512,
          alt: 'qrty Logo',
        },
      ],
    },
  };
}

export default async function CreatePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawTarget = params.q || params.url;

  let initialUrl = DEFAULT_URL;
  if (rawTarget) {
    try {
      if (rawTarget.startsWith('MDB') || (rawTarget.length > 20 && !rawTarget.includes('://'))) {
        const decoded = Buffer.from(rawTarget, 'base64').toString('utf-8');
        const cleanDecoded = decoded.replace(/^\d+/, '');
        if (cleanDecoded.startsWith('http') || cleanDecoded.length > 0) {
          initialUrl = cleanDecoded;
        }
      } else {
        initialUrl = decodeURIComponent(rawTarget);
      }
    } catch {
      initialUrl = rawTarget;
    }
  }

  let initialSeason: Season = 'cyber';
  const validSeasons = [
    'cyber',
    'ronin',
    'ember',
    'stealth',
    'tank',
    'tron',
    'ufo',
    'chopper',
    'blade',
    'spring',
    'summer',
    'autumn',
    'winter',
  ];
  if (params.season && validSeasons.includes(params.season)) {
    initialSeason = params.season as Season;
  }

  const initialQRData = generateQRMatrix(initialUrl);

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'qrty',
        item: 'https://qrty.kukaass.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Studio',
        item: 'https://qrty.kukaass.app/create',
      },
    ],
  };

  return (
    <main className="relative w-full h-full overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <MagicTreeClient
        initialUrl={initialUrl}
        initialSeason={initialSeason}
        initialQRData={initialQRData}
      />
    </main>
  );
}
