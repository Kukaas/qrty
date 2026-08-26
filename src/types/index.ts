export type Season = 'spring' | 'summer' | 'autumn' | 'winter';
export type ViewMode = '3d' | 'qr';

export interface SeasonTheme {
  id: Season;
  name: string;
  icon: string;
  description: string;
  palette: {
    foliage: string[];
    trunk: string;
    hedges: string[];
    accent: string;
    groundLight: string;
    groundDark: string;
    petals: string[];
    background: string;
  };
}

export interface ColorOption {
  id: string;
  name: string;
  hex: string;
  foliageColors: string[];
  moduleColor: string;
}

export interface QRMatrixData {
  modules: boolean[][];
  size: number;
  isFinder: boolean[][];
  isSeparator: boolean[][];
  isAlignment: boolean[][];
  isTiming: boolean[][];
  text: string;
  version: number;
}
