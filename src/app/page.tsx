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

/**
 * Server-Side Rendered dynamic OpenGraph & page metadata
 */
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
    title: `qrty — 3D QR Code (${targetUrl})`,
    description: `Interactive 3D tree diorama for ${targetUrl}. Scannable, customizable, and seasonal.`,
    openGraph: {
      title: 'qrty — 3D QR Code Generator',
      description: `Turn ${targetUrl} into a stunning 3D tree diorama that doubles as a scannable QR code.`,
      type: 'website',
    },
  };
}

/**
 * Server-Side Rendered (SSR) Page Component
 * Evaluates searchParams on every server request, computes the QR matrix on the server,
 * and passes the initial hydration payload to the client.
 */
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawTarget = params.q || params.url;

  let initialUrl = DEFAULT_URL;
  if (rawTarget) {
    try {
      // Support base64 encoded URLs (like tree.icqr.com/?q=MDBodHRwczovL2ljcXIuY29tLw)
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

  // Parse season with fallback
  let initialSeason: Season = 'spring';
  if (params.season && ['spring', 'summer', 'autumn', 'winter'].includes(params.season)) {
    initialSeason = params.season as Season;
  }

  // Pre-calculate QR Matrix on the server (Server-Side Rendering)
  const initialQRData = generateQRMatrix(initialUrl);

  return (
    <main className="relative w-full h-full overflow-hidden">
      <MagicTreeClient
        initialUrl={initialUrl}
        initialSeason={initialSeason}
        initialQRData={initialQRData}
      />
    </main>
  );
}
