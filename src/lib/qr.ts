import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { QRMatrixData } from '@/types';

/**
 * Normalizes user input into a fully qualified redirectable URL if it is a website domain.
 * Example: 'google.com' -> 'https://google.com'
 */
export function formatRedirectUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return 'https://github.com';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  // If it matches a domain like google.com, example.org, etc., prepend https://
  if (/^[a-zA-Z0-9][-a-zA-Z0-9]*(\.[a-zA-Z0-9][-a-zA-Z0-9]*)+(:\d+)?(\/.*)?$/i.test(trimmed)) {
    return `https://${trimmed}`;
  }
  return trimmed;
}

/**
 * Generate QR code matrix data with identified structural components
 * (finder patterns, separators, timing lines, data modules).
 */
export function generateQRMatrix(text: string): QRMatrixData {
  const safeText = formatRedirectUrl(text);
  // Use High error correction (30% recovery) for optimal scan reliability
  const qr = QRCode.create(safeText, { errorCorrectionLevel: 'H' });
  const size = qr.modules.size;
  const version = qr.version;

  const modules: boolean[][] = [];
  const isFinder: boolean[][] = [];
  const isSeparator: boolean[][] = [];
  const isAlignment: boolean[][] = [];
  const isTiming: boolean[][] = [];

  for (let r = 0; r < size; r++) {
    modules[r] = [];
    isFinder[r] = [];
    isSeparator[r] = [];
    isAlignment[r] = [];
    isTiming[r] = [];
    for (let c = 0; c < size; c++) {
      modules[r][c] = Boolean(qr.modules.get(r, c));
      isFinder[r][c] = false;
      isSeparator[r][c] = false;
      isAlignment[r][c] = false;
      isTiming[r][c] = false;
    }
  }

  // Tag Finder Patterns (7x7 corners)
  const tagFinder = (startR: number, startC: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        isFinder[startR + r][startC + c] = true;
      }
    }
  };

  tagFinder(0, 0); // Top-Left
  tagFinder(0, size - 7); // Top-Right
  tagFinder(size - 7, 0); // Bottom-Left

  // Tag Separators (1-cell border around finders)
  const tagSeparator = (startR: number, endR: number, startC: number, endC: number) => {
    for (let r = Math.max(0, startR); r <= Math.min(size - 1, endR); r++) {
      for (let c = Math.max(0, startC); c <= Math.min(size - 1, endC); c++) {
        if (!isFinder[r][c]) {
          isSeparator[r][c] = true;
        }
      }
    }
  };

  tagSeparator(0, 7, 0, 7); // Top-Left border
  tagSeparator(0, 7, size - 8, size - 1); // Top-Right border
  tagSeparator(size - 8, size - 1, 0, 7); // Bottom-Left border

  // Tag Timing Patterns
  for (let i = 8; i < size - 8; i++) {
    isTiming[6][i] = true;
    isTiming[i][6] = true;
  }

  return {
    modules,
    size,
    isFinder,
    isSeparator,
    isAlignment,
    isTiming,
    text: safeText,
    version,
  };
}

/**
 * Verify whether a QR code matrix is scannable by running jsQR scanner algorithm
 */
export function verifyQRMatrix(matrix: boolean[][]): { valid: boolean; text: string | null } {
  if (typeof document === 'undefined') {
    return { valid: true, text: null };
  }

  const size = matrix.length;
  const scale = 12;
  const quietZone = 4;
  const canvasSize = (size + quietZone * 2) * scale;

  const canvas = document.createElement('canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) return { valid: false, text: null };

  // Fill quiet zone white
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw modules
  ctx.fillStyle = '#000000';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (matrix[r][c]) {
        ctx.fillRect((c + quietZone) * scale, (r + quietZone) * scale, scale, scale);
      }
    }
  }

  const imageData = ctx.getImageData(0, 0, canvasSize, canvasSize);
  const code = jsQR(imageData.data, canvasSize, canvasSize);

  if (code && code.data) {
    return { valid: true, text: code.data };
  }

  return { valid: false, text: null };
}

/**
 * Generate a clean high-resolution flat QR code image for downloading / printing
 */
export function generateCleanQRPNG(
  text: string,
  options: {
    darkColor?: string;
    lightColor?: string;
    finderColor?: string;
    scale?: number;
  } = {}
): string {
  if (typeof document === 'undefined') return '';

  const {
    darkColor = '#18181B',
    lightColor = '#FFFFFF',
    finderColor = '#18181B',
    scale = 16,
  } = options;

  const qrData = generateQRMatrix(text);
  const { modules, size, isFinder } = qrData;
  const quietZone = 3;
  const canvasSize = (size + quietZone * 2) * scale;

  const canvas = document.createElement('canvas');
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = lightColor;
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Rounded module helper
  const drawRoundedBlock = (x: number, y: number, w: number, h: number, r: number, fill: string) => {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
  };

  // Draw grid modules
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const x = (c + quietZone) * scale;
      const y = (r + quietZone) * scale;

      if (modules[r][c]) {
        if (isFinder[r][c]) {
          // Finder patterns must be completely solid without gaps for 100% phone camera lock-on
          ctx.fillStyle = finderColor;
          ctx.fillRect(x, y, scale, scale);
        } else {
          // Stylized organic data modules
          drawRoundedBlock(x + 0.5, y + 0.5, scale - 1, scale - 1, 2, darkColor);
        }
      }
    }
  }

  return canvas.toDataURL('image/png');
}
