'use client';

import React, { useState, useEffect } from 'react';
import { X, Download, Copy, Check, QrCode, Image as ImageIcon, CheckCircle2, ShieldCheck } from 'lucide-react';
import { generateCleanQRPNG, verifyQRMatrix } from '@/lib/qr';
import { QRMatrixData, SeasonTheme } from '@/types';
import { sound } from '@/lib/audio';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrData: QRMatrixData;
  season: SeasonTheme;
  customColorHex?: string;
  onCapture3D: () => string;
}

export default function ExportModal({
  isOpen,
  onClose,
  qrData,
  season,
  customColorHex,
  onCapture3D,
}: ExportModalProps) {
  const [activeTab, setActiveTab] = useState<'qr' | '3d'>('qr');
  const [cleanQRUrl, setCleanQRUrl] = useState<string>('');
  const [dioramaUrl, setDioramaUrl] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [scanVerified, setScanVerified] = useState<boolean | null>(null);

  useEffect(() => {
    if (isOpen) {
      sound.playExportSound();

      // Generate clean QR PNG with high-contrast tactical styling
      const qrPng = generateCleanQRPNG(qrData.text, {
        darkColor: customColorHex || season.palette.groundDark,
        lightColor: '#FFFFFF',
        finderColor: season.palette.hedges[0] || '#14532D',
        scale: 18,
      });
      setCleanQRUrl(qrPng);

      // Verify QR Code
      const verification = verifyQRMatrix(qrData.modules);
      setScanVerified(verification.valid);

      // Capture 3D Snapshot
      try {
        const snap = onCapture3D();
        if (snap) setDioramaUrl(snap);
      } catch (err) {
        console.error('Failed to capture 3D snapshot', err);
      }
    }
  }, [isOpen, qrData, season, customColorHex, onCapture3D]);

  if (!isOpen) return null;

  const downloadImage = (dataUrl: string, filename: string) => {
    sound.playWoodClick();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrData.text);
    sound.playWoodClick();
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-zinc-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 bg-zinc-50/70">
          <div className="flex items-center gap-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-zinc-900 tracking-tight uppercase">Export 3D QR Matrix</h2>
          </div>
          <button
            onClick={() => {
              sound.playWoodClick();
              onClose();
            }}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2 px-6 pt-4">
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Scannable 2D QR</span>
          </button>
          <button
            onClick={() => setActiveTab('3d')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === '3d'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>3D Diorama Artwork</span>
          </button>
        </div>

        {/* Image Preview */}
        <div className="px-6 py-4 flex flex-col items-center justify-center flex-1 overflow-y-auto">
          {activeTab === 'qr' ? (
            <div className="flex flex-col items-center gap-3">
              <div className="relative p-3 bg-white rounded-2xl border border-zinc-200 shadow-sm max-w-[280px]">
                {cleanQRUrl ? (
                  <img
                    src={cleanQRUrl}
                    alt="Scannable QR Code"
                    className="w-full h-auto rounded-lg object-contain"
                  />
                ) : (
                  <div className="w-64 h-64 flex items-center justify-center text-zinc-400 text-xs font-mono">
                    Generating matrix...
                  </div>
                )}
              </div>

              {scanVerified && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Camera-Scannable (Level H)</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="relative bg-zinc-100 rounded-2xl border border-zinc-200 shadow-sm overflow-hidden max-w-[320px]">
                {dioramaUrl ? (
                  <img
                    src={dioramaUrl}
                    alt="3D Diorama Snapshot"
                    className="w-full h-auto rounded-xl object-contain"
                  />
                ) : (
                  <div className="w-72 h-72 flex items-center justify-center text-zinc-400 text-xs font-mono">
                    Capturing 3D scene...
                  </div>
                )}
              </div>
              <p className="text-xs font-mono text-zinc-500 text-center">
                High-resolution hardware render of your 3D diorama
              </p>
            </div>
          )}

          {/* Current URL Label */}
          <div className="w-full mt-3 p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs font-mono">
            <span className="truncate text-zinc-700 pr-2">{qrData.text}</span>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 text-zinc-900 hover:text-black font-bold shrink-0 cursor-pointer"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-zinc-200 flex items-center gap-3 bg-zinc-50/80">
          {activeTab === 'qr' ? (
            <button
              onClick={() => downloadImage(cleanQRUrl, 'qrty-scannable-qr.png')}
              disabled={!cleanQRUrl}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 hover:bg-black text-white font-mono font-bold text-xs sm:text-sm shadow-xs transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Scannable QR (PNG)</span>
            </button>
          ) : (
            <button
              onClick={() => downloadImage(dioramaUrl, 'qrty-3d-tree.png')}
              disabled={!dioramaUrl}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-900 hover:bg-black text-white font-mono font-bold text-xs sm:text-sm shadow-xs transition-all hover:scale-[1.02] active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download 3D Artwork (PNG)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
