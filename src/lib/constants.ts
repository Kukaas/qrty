import { SeasonTheme, ColorOption, Season } from '@/types';

export const SEASONS: Record<Season, SeasonTheme> = {
  cyber: {
    id: 'cyber',
    name: 'Hypercar',
    icon: '🏎️',
    description: 'Low-poly concept supercar with glowing neon light bars, aerodynamic spoiler, and alloy wheels',
    palette: {
      foliage: ['#0284C7', '#0EA5E9', '#38BDF8', '#0369A1', '#075985'],
      trunk: '#1E293B',
      hedges: ['#0369A1', '#0284C7', '#075985'],
      accent: '#0284C7',
      groundLight: '#FFFFFF',
      groundDark: '#0284C7',
      petals: ['#38BDF8', '#0EA5E9', '#7DD3FC', '#0284C7'],
      background: '#F0F4F8',
      finderColor: '#041C2C',
    },
  },
  ronin: {
    id: 'ronin',
    name: 'Mecha Ronin',
    icon: '🤖',
    description: 'Tactical cybernetic samurai warrior with angular armor plates and twin glowing katanas',
    palette: {
      foliage: ['#166534', '#15803D', '#22C55E', '#14532D', '#2E7D32'],
      trunk: '#3E2723',
      hedges: ['#14532D', '#166534', '#15803D'],
      accent: '#15803D',
      groundLight: '#FFFFFF',
      groundDark: '#15803D',
      petals: ['#15803D', '#22C55E', '#166534', '#4ADE80'],
      background: '#F3F4F6',
      finderColor: '#03200E',
    },
  },
  ember: {
    id: 'ember',
    name: 'Starship',
    icon: '🚀',
    description: 'Orbital exploration rocket with aerodynamic grid fins and glowing fiery engine thruster',
    palette: {
      foliage: ['#DC2626', '#EA580C', '#F97316', '#B91C1C', '#991B1B'],
      trunk: '#27272A',
      hedges: ['#B91C1C', '#C2410C', '#991B1B'],
      accent: '#DC2626',
      groundLight: '#FFFFFF',
      groundDark: '#DC2626',
      petals: ['#F97316', '#EF4444', '#FBBF24', '#EA580C'],
      background: '#FDF6F0',
      finderColor: '#280B02',
    },
  },
  stealth: {
    id: 'stealth',
    name: 'Stealth Jet',
    icon: '✈️',
    description: 'Supersonic stealth fighter jet with faceted delta wings, canted V-tails, and afterburners',
    palette: {
      foliage: ['#27272A', '#3F3F46', '#52525B', '#71717A', '#18181B'],
      trunk: '#18181B',
      hedges: ['#18181B', '#27272A', '#3F3F46'],
      accent: '#18181B',
      groundLight: '#FFFFFF',
      groundDark: '#18181B',
      petals: ['#71717A', '#A1A1AA', '#52525B', '#3F3F46'],
      background: '#F4F4F6',
      finderColor: '#09090B',
    },
  },
  tank: {
    id: 'tank',
    name: 'Cyber Tank',
    icon: '🛡️',
    description: 'Heavy tactical railgun tank with 4 all-terrain tread pods, scanning turret, and dual plasma cannons',
    palette: {
      foliage: ['#06B6D4', '#22D3EE', '#0891B2', '#0E7490', '#67E8F9'],
      trunk: '#1E293B',
      hedges: ['#0891B2', '#06B6D4', '#0E7490'],
      accent: '#06B6D4',
      groundLight: '#FFFFFF',
      groundDark: '#0891B2',
      petals: ['#22D3EE', '#06B6D4', '#67E8F9', '#38BDF8'],
      background: '#F0FDFA',
      finderColor: '#111F03',
    },
  },
  tron: {
    id: 'tron',
    name: 'Cyber Tank',
    icon: '🛡️',
    description: 'Heavy tactical railgun tank with 4 all-terrain tread pods, scanning turret, and dual plasma cannons',
    palette: {
      foliage: ['#06B6D4', '#22D3EE', '#0891B2', '#0E7490', '#67E8F9'],
      trunk: '#1E293B',
      hedges: ['#0891B2', '#06B6D4', '#0E7490'],
      accent: '#06B6D4',
      groundLight: '#FFFFFF',
      groundDark: '#0891B2',
      petals: ['#22D3EE', '#06B6D4', '#67E8F9', '#38BDF8'],
      background: '#F0FDFA',
      finderColor: '#04222B',
    },
  },
  ufo: {
    id: 'ufo',
    name: 'Mothership',
    icon: '🛸',
    description: 'Anti-gravity cosmic flying saucer with rotating plasma nodes and glowing tractor beam',
    palette: {
      foliage: ['#7C3AED', '#8B5CF6', '#A78BFA', '#6D28D9', '#C4B5FD'],
      trunk: '#334155',
      hedges: ['#6D28D9', '#7C3AED', '#5B21B6'],
      accent: '#7C3AED',
      groundLight: '#FFFFFF',
      groundDark: '#7C3AED',
      petals: ['#A78BFA', '#8B5CF6', '#DDD6FE', '#C4B5FD'],
      background: '#FAF5FF',
      finderColor: '#1B0638',
    },
  },
  chopper: {
    id: 'chopper',
    name: 'Gunship',
    icon: '🚁',
    description: 'Low-poly combat attack helicopter with spinning main rotor, stub wings, and sensor turret',
    palette: {
      foliage: ['#D97706', '#F59E0B', '#B45309', '#92400E', '#FBBF24'],
      trunk: '#475569',
      hedges: ['#B45309', '#D97706', '#92400E'],
      accent: '#D97706',
      groundLight: '#FFFFFF',
      groundDark: '#D97706',
      petals: ['#F59E0B', '#FBBF24', '#FCD34D', '#D97706'],
      background: '#FFFBEB',
      finderColor: '#261502',
    },
  },
  blade: {
    id: 'blade',
    name: 'Cyber Katana',
    icon: '⚔️',
    description: 'Floating energy cyber blade plunged into an ancient monument with swirling plasma rings',
    palette: {
      foliage: ['#E11D48', '#F43F5E', '#BE123C', '#9F1239', '#FB7185'],
      trunk: '#334155',
      hedges: ['#BE123C', '#E11D48', '#9F1239'],
      accent: '#E11D48',
      groundLight: '#FFFFFF',
      groundDark: '#E11D48',
      petals: ['#F43F5E', '#FB7185', '#FDA4AF', '#E11D48'],
      background: '#FFF1F2',
      finderColor: '#2D0408',
    },
  },
  // Fallbacks for backwards compatibility
  spring: {
    id: 'spring',
    name: 'Mecha Ronin',
    icon: '🤖',
    description: 'Tactical cybernetic samurai',
    palette: {
      foliage: ['#166534', '#15803D'],
      trunk: '#3E2723',
      hedges: ['#14532D', '#166534'],
      accent: '#15803D',
      groundLight: '#FFFFFF',
      groundDark: '#15803D',
      petals: ['#15803D'],
      background: '#F3F4F6',
      finderColor: '#03200E',
    },
  },
  summer: {
    id: 'summer',
    name: 'Hypercar',
    icon: '🏎️',
    description: 'Low-poly concept supercar',
    palette: {
      foliage: ['#0284C7', '#0EA5E9'],
      trunk: '#1E293B',
      hedges: ['#0369A1', '#0284C7'],
      accent: '#0284C7',
      groundLight: '#FFFFFF',
      groundDark: '#0284C7',
      petals: ['#38BDF8'],
      background: '#F0F4F8',
      finderColor: '#041C2C',
    },
  },
  autumn: {
    id: 'autumn',
    name: 'Starship',
    icon: '🚀',
    description: 'Orbital exploration rocket',
    palette: {
      foliage: ['#DC2626', '#EA580C'],
      trunk: '#27272A',
      hedges: ['#B91C1C', '#C2410C'],
      accent: '#DC2626',
      groundLight: '#FFFFFF',
      groundDark: '#DC2626',
      petals: ['#F97316'],
      background: '#FDF6F0',
      finderColor: '#280B02',
    },
  },
  winter: {
    id: 'winter',
    name: 'Stealth Jet',
    icon: '✈️',
    description: 'Supersonic stealth fighter',
    palette: {
      foliage: ['#27272A', '#3F3F46'],
      trunk: '#18181B',
      hedges: ['#18181B', '#27272A'],
      accent: '#18181B',
      groundLight: '#FFFFFF',
      groundDark: '#18181B',
      petals: ['#71717A'],
      background: '#F4F4F6',
      finderColor: '#09090B',
    },
  },
};

export const COLOR_OPTIONS: ColorOption[] = [
  {
    id: 'cyan',
    name: 'Cobalt Cyan',
    hex: '#0284C7',
    foliageColors: ['#075985', '#0369A1', '#0284C7', '#0EA5E9', '#38BDF8'],
    moduleColor: '#0284C7',
    finderColor: '#041C2C',
  },
  {
    id: 'emerald',
    name: 'Racing Green',
    hex: '#15803D',
    foliageColors: ['#14532D', '#166534', '#15803D', '#22C55E', '#4ADE80'],
    moduleColor: '#15803D',
    finderColor: '#03200E',
  },
  {
    id: 'crimson',
    name: 'Apex Crimson',
    hex: '#DC2626',
    foliageColors: ['#991B1B', '#B91C1C', '#DC2626', '#EF4444', '#F87171'],
    moduleColor: '#DC2626',
    finderColor: '#2D0404',
  },
  {
    id: 'amber',
    name: 'Tach Orange',
    hex: '#EA580C',
    foliageColors: ['#9A3412', '#C2410C', '#EA580C', '#F97316', '#FB923C'],
    moduleColor: '#EA580C',
    finderColor: '#280B02',
  },
  {
    id: 'violet',
    name: 'Nightshade Violet',
    hex: '#7C3AED',
    foliageColors: ['#5B21B6', '#6D28D9', '#7C3AED', '#8B5CF6', '#A78BFA'],
    moduleColor: '#7C3AED',
    finderColor: '#1B0638',
  },
  {
    id: 'stealth',
    name: 'Stealth Graphite',
    hex: '#18181B',
    foliageColors: ['#18181B', '#27272A', '#3F3F46', '#52525B', '#71717A'],
    moduleColor: '#18181B',
    finderColor: '#09090B',
  },
];


export function ensureDarkContrastColor(hex: string): string {
  let color = hex.replace(/^#/, '');
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const r = parseInt(color.substring(0, 2), 16) / 255;
  const g = parseInt(color.substring(2, 4), 16) / 255;
  const b = parseInt(color.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  l = Math.max(0.08, Math.min(l, 0.11));

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r2, g2, b2;
  if (s === 0) {
    r2 = g2 = b2 = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r2 = hue2rgb(p, q, h + 1 / 3);
    g2 = hue2rgb(p, q, h);
    b2 = hue2rgb(p, q, h - 1 / 3);
  }

  const toHex = (x: number) => {
    const hexStr = Math.round(x * 255).toString(16);
    return hexStr.length === 1 ? '0' + hexStr : hexStr;
  };

  return "#" + toHex(r2) + toHex(g2) + toHex(b2);
}

export function getComplimentaryFinderColor(
  colorHex?: string,
  seasonFinderColor?: string,
  seasonHedge?: string
): string {
  if (colorHex) {
    const normalized = colorHex.toLowerCase().trim();
    const matched = COLOR_OPTIONS.find(
      (opt) =>
        opt.hex.toLowerCase() === normalized ||
        opt.id.toLowerCase() === normalized ||
        opt.moduleColor.toLowerCase() === normalized
    );
    if (matched) {
      return ensureDarkContrastColor(matched.finderColor);
    }
    return ensureDarkContrastColor(colorHex);
  }

  if (seasonFinderColor) {
    return ensureDarkContrastColor(seasonFinderColor);
  }

  if (seasonHedge) {
    return ensureDarkContrastColor(seasonHedge);
  }

  return ensureDarkContrastColor('#09090B');
}

export const DEFAULT_URL = 'https://github.com';
