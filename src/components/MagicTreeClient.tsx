'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import FloatingViewToggle from '@/components/FloatingViewToggle';
import ExportModal from '@/components/ExportModal';
import InfoModal from '@/components/InfoModal';
import { generateQRMatrix } from '@/lib/qr';
import { SEASONS } from '@/lib/constants';
import { Season, ColorOption, ViewMode, QRMatrixData } from '@/types';
import { sound } from '@/lib/audio';
import MagicTreeScene from '@/components/MagicTreeScene';

interface MagicTreeClientProps {
  initialUrl: string;
  initialSeason: Season;
  initialQRData: QRMatrixData;
}

export default function MagicTreeClient({
  initialUrl,
  initialSeason,
  initialQRData,
}: MagicTreeClientProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [url, setUrl] = useState<string>(initialUrl);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const [debouncedUrl, setDebouncedUrl] = useState<string>(initialUrl);
  const [selectedSeason, setSelectedSeason] = useState<Season>(initialSeason);
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('3d');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const captureRef = useRef<(() => string) | null>(null);

  // Debounce input to smoothly regenerate QR code
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUrl(url);
      // Sync URL to browser history seamlessly
      if (typeof window !== 'undefined') {
        const newUrl = new URL(window.location.href);
        if (url && url !== 'https://tree.icqr.com/') {
          newUrl.searchParams.set('q', url);
        } else {
          newUrl.searchParams.delete('q');
        }
        window.history.replaceState({}, '', newUrl.toString());
      }
    }, 280);
    return () => clearTimeout(timer);
  }, [url]);

  // Compute QR Matrix Data (uses initial server data when url matches)
  const qrData: QRMatrixData = useMemo(() => {
    if (debouncedUrl === initialUrl) {
      return initialQRData;
    }
    return generateQRMatrix(debouncedUrl);
  }, [debouncedUrl, initialUrl, initialQRData]);

  const currentSeason = SEASONS[selectedSeason];

  // Screenshot callback from Three.js scene
  const handleRegisterCapture = useCallback((fn: () => string) => {
    captureRef.current = fn;
  }, []);

  const handleCapture3D = useCallback((): string => {
    if (captureRef.current) {
      return captureRef.current();
    }
    return '';
  }, []);

  const handleToggleViewMode = () => {
    setViewMode((prev) => (prev === '3d' ? 'qr' : '3d'));
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleSelectSeason = (season: Season) => {
    setSelectedSeason(season);
    // Reset custom color override when switching seasons
    setSelectedColor(null);
  };

  const handleSelectColor = (color: ColorOption) => {
    setSelectedColor(color);
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: currentSeason.palette.background }}
    >
      {/* Top Header with Breadcrumbs */}
      <Header
        onOpenInfo={() => setIsInfoOpen(true)}
        scannableText={debouncedUrl}
        activePresetName={currentSeason.name}
        activePresetIcon={currentSeason.icon}
      />

      {/* 3D WebGL Canvas Stage */}
      <div className="absolute inset-0 z-0">
        {isMounted ? (
          <MagicTreeScene
            qrData={qrData}
            season={currentSeason}
            customColorHex={selectedColor?.hex}
            customFoliageColors={selectedColor?.foliageColors}
            viewMode={viewMode}
            onToggleViewMode={handleToggleViewMode}
            onRegisterCapture={handleRegisterCapture}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F3F4F6]" />
        )}
      </div>

      {/* Floating Prompt Pill: "Tap the tree to see QR code" / "Tap to see the tree" */}
      <FloatingViewToggle
        viewMode={viewMode}
        onToggle={handleToggleViewMode}
      />

      {/* Bottom Control Bar */}
      <ControlPanel
        url={url}
        onChangeUrl={setUrl}
        selectedSeason={selectedSeason}
        onSelectSeason={handleSelectSeason}
        selectedColorId={selectedColor?.id || null}
        onSelectColor={handleSelectColor}
        onOpenExport={() => setIsExportOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        viewMode={viewMode}
        onToggleViewMode={handleToggleViewMode}
      />

      {/* Export & Download Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        qrData={qrData}
        season={currentSeason}
        customColorHex={selectedColor?.hex}
        onCapture3D={handleCapture3D}
      />

      {/* Info Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
}
