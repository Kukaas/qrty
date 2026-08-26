import { SeasonTheme, ColorOption, Season } from '@/types';

export const SEASONS: Record<Season, SeasonTheme> = {
  spring: {
    id: 'spring',
    name: 'Spring',
    icon: '🌸',
    description: 'Blossoming pink sakura tree with fluttering petals and fresh garden hedges',
    palette: {
      foliage: ['#FFB7C5', '#FFAEC9', '#FF85A2', '#FBCFE8', '#F472B6'],
      trunk: '#4A3728',
      hedges: ['#558B2F', '#689F38', '#7CB342', '#8BC34A'],
      accent: '#DB2777',
      groundLight: '#FAF6EE',
      groundDark: '#D44A74',
      petals: ['#FFB7C5', '#FFAEC9', '#FF85A2', '#F472B6', '#FCE7F3'],
      background: '#F7F3E8',
    },
  },
  summer: {
    id: 'summer',
    name: 'Summer',
    icon: '☀️',
    description: 'Lush green canopy with golden sunlight, dandelion specks and emerald hedges',
    palette: {
      foliage: ['#15803D', '#16A34A', '#22C55E', '#4ADE80', '#86EFAC'],
      trunk: '#38291F',
      hedges: ['#14532D', '#166534', '#15803D', '#22C55E'],
      accent: '#16A34A',
      groundLight: '#FDFBF7',
      groundDark: '#1E7145',
      petals: ['#86EFAC', '#FDE047', '#4ADE80', '#A3E635', '#FEF08A'],
      background: '#F5F5EE',
    },
  },
  autumn: {
    id: 'autumn',
    name: 'Autumn',
    icon: '🍁',
    description: 'Golden maple and crimson foliage with falling autumn leaves and warm stone',
    palette: {
      foliage: ['#B91C1C', '#C2410C', '#EA580C', '#D97706', '#F59E0B'],
      trunk: '#3E2723',
      hedges: ['#854D0E', '#A16207', '#CA8A04', '#65A30D'],
      accent: '#EA580C',
      groundLight: '#FAF3EA',
      groundDark: '#B91C1C',
      petals: ['#EF4444', '#F97316', '#FBBF24', '#DC2626', '#FED7AA'],
      background: '#F8F3EC',
    },
  },
  winter: {
    id: 'winter',
    name: 'Winter',
    icon: '❄️',
    description: 'Frosted crystalline canopy with soft falling snow and cool slate paths',
    palette: {
      foliage: ['#93C5FD', '#A5B4FC', '#C4B5FD', '#E0F2FE', '#F1F5F9'],
      trunk: '#475569',
      hedges: ['#334155', '#475569', '#64748B', '#0284C7'],
      accent: '#3B82F6',
      groundLight: '#F8FAFC',
      groundDark: '#2563EB',
      petals: ['#E2E8F0', '#BAE6FD', '#DDD6FE', '#FFFFFF', '#93C5FD'],
      background: '#F1F5F9',
    },
  },
};

export const COLOR_OPTIONS: ColorOption[] = [
  {
    id: 'sakura',
    name: 'Sakura Pink',
    hex: '#EC4899',
    foliageColors: ['#FFB7C5', '#FFAEC9', '#FF85A2', '#FBCFE8', '#EC4899'],
    moduleColor: '#DB2777',
  },
  {
    id: 'ruby',
    name: 'Ruby Crimson',
    hex: '#E11D48',
    foliageColors: ['#F43F5E', '#E11D48', '#BE123C', '#9F1239', '#FDA4AF'],
    moduleColor: '#BE123C',
  },
  {
    id: 'violet',
    name: 'Wisteria Violet',
    hex: '#8B5CF6',
    foliageColors: ['#A78BFA', '#8B5CF6', '#7C3AED', '#6D28D9', '#DDD6FE'],
    moduleColor: '#7C3AED',
  },
  {
    id: 'amber',
    name: 'Sunset Amber',
    hex: '#F59E0B',
    foliageColors: ['#FBBF24', '#F59E0B', '#D97706', '#B45309', '#FEF08A'],
    moduleColor: '#D97706',
  },
  {
    id: 'azure',
    name: 'Sky Azure',
    hex: '#0EA5E9',
    foliageColors: ['#38BDF8', '#0EA5E9', '#0284C7', '#0369A1', '#BAE6FD'],
    moduleColor: '#0284C7',
  },
  {
    id: 'emerald',
    name: 'Fresh Mint',
    hex: '#10B981',
    foliageColors: ['#34D399', '#10B981', '#059669', '#047857', '#A7F3D0'],
    moduleColor: '#059669',
  },
];

export const DEFAULT_URL = 'https://github.com';
