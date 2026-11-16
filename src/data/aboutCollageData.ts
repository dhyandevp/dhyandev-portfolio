/**
 * Off The Clock - Hyperrealistic Curvy Photo Collage Configuration
 * Matching the exact organic composition of the reference design.
 */

export interface CollagePhoto {
  readonly id: string;
  readonly src: string;
  readonly avif480?: string;
  readonly avif960?: string;
  readonly webp480?: string;
  readonly webp960?: string;
  readonly alt: string;
  readonly focal: string;
  readonly slot: 1 | 2 | 3 | 4 | 5 | 6;
  readonly aspect: '16:9' | '4:5' | '3:4';
  readonly width: number;
  readonly height: number;
}

export interface CollageSticker {
  readonly id: string;
  readonly label: string;
  readonly rotate: number;
  readonly slot: 1 | 2 | 3 | 4;
}

export interface CollageSlotLayout {
  readonly left: number; // percentage of stage width
  readonly top: number;  // percentage of stage height
  readonly width: number; // percentage of stage width
  readonly aspect: '16:9' | '4:5' | '3:4';
  readonly rotation: number; // degrees
  readonly zIndex: number;
}

export interface StickerSlotLayout {
  readonly left: number;
  readonly top: number;
  readonly rotation: number;
  readonly zIndex: number;
}

/**
 * 6-Photo Stage Layout Coordinates matching Lucas Lima's composition
 */
export const PHOTO_SLOT_LAYOUTS: Record<number, CollageSlotLayout> = {
  1: { left: 20, top: 34, width: 58, aspect: '16:9', rotation: 0,  zIndex: 25 }, // Centerpiece Landscape
  2: { left: 36, top: 4,  width: 27, aspect: '3:4',  rotation: 2,  zIndex: 10 }, // Top Center
  3: { left: 8,  top: 15, width: 30, aspect: '4:5',  rotation: -7, zIndex: 6  }, // Top Left
  4: { left: 56, top: 17, width: 32, aspect: '4:5',  rotation: 8,  zIndex: 5  }, // Top Right
  5: { left: 17, top: 56, width: 27, aspect: '3:4',  rotation: 6,  zIndex: 28 }, // Bottom Left
  6: { left: 42, top: 56, width: 26, aspect: '3:4',  rotation: -2, zIndex: 30 }, // Bottom Center
};

/**
 * 4-Sticker Layout Coordinates (Claude, India Flag, Formula 1, Google)
 */
export const STICKER_SLOT_LAYOUTS: Record<number, StickerSlotLayout> = {
  1: { left: 25, top: 16, rotation: -8, zIndex: 35 }, // Top-Left: Claude AI
  2: { left: 58, top: 17, rotation: 8,  zIndex: 35 }, // Top-Right: Realistic 3D Waving India Flag
  3: { left: 63, top: 62, rotation: 7,  zIndex: 35 }, // Bottom-Right: Formula 1
  4: { left: 13, top: 46, rotation: -6, zIndex: 35 }, // Mid-Left: Google
};

export const aboutCollageConfig = {
  photos: [
    {
      id: 'bridge-motorcycle-wide',
      slot: 1,
      src: '/images/about/bridge_motorcycle_wide.webp',
      webp960: '/images/about/export/bridge_motorcycle_wide-960w.webp',
      webp480: '/images/about/export/bridge_motorcycle_wide-480w.webp',
      avif960: '/images/about/export/bridge_motorcycle_wide-960w.avif',
      avif480: '/images/about/export/bridge_motorcycle_wide-480w.avif',
      alt: 'Dhyandev standing with his motorcycle on a bridge over the river under the afternoon sun in Kerala',
      focal: '48% 52%',
      aspect: '16:9',
      width: 1024,
      height: 768,
    },
    {
      id: 'campus-selfie',
      slot: 2,
      src: '/images/about/selfie_school.webp',
      webp960: '/images/about/export/selfie_school-960w.webp',
      webp480: '/images/about/export/selfie_school-480w.webp',
      avif960: '/images/about/export/selfie_school-960w.avif',
      avif480: '/images/about/export/selfie_school-480w.avif',
      alt: 'Selfie of Dhyandev on the school campus steps in Kerala',
      focal: '50% 35%',
      aspect: '3:4',
      width: 4160,
      height: 3120,
    },
    {
      id: 'bridge-motorcycle-silhouette',
      slot: 3,
      src: '/images/about/bridge_motorcycle.webp',
      webp960: '/images/about/export/bridge_motorcycle-960w.webp',
      webp480: '/images/about/export/bridge_motorcycle-480w.webp',
      avif960: '/images/about/export/bridge_motorcycle-960w.avif',
      avif480: '/images/about/export/bridge_motorcycle-480w.avif',
      alt: 'Silhouette of Dhyandev standing with his motorcycle on a bridge at dusk',
      focal: '50% 45%',
      aspect: '4:5',
      width: 1127,
      height: 1456,
    },
    {
      id: 'racing-helmet',
      slot: 4,
      src: '/images/about/redbull_f1_helmet.webp',
      webp960: '/images/about/export/redbull_f1_helmet-960w.webp',
      webp480: '/images/about/export/redbull_f1_helmet-480w.webp',
      avif960: '/images/about/export/redbull_f1_helmet-960w.avif',
      avif480: '/images/about/export/redbull_f1_helmet-480w.avif',
      alt: 'Championship racing helmet with reflective visor',
      focal: '50% 50%',
      aspect: '4:5',
      width: 640,
      height: 743,
    },
    {
      id: 'zidane-river',
      slot: 5,
      src: '/images/about/zidane_river.webp',
      webp960: '/images/about/export/zidane_river-960w.webp',
      webp480: '/images/about/export/zidane_river-480w.webp',
      avif960: '/images/about/export/zidane_river-960w.avif',
      avif480: '/images/about/export/zidane_river-480w.avif',
      alt: 'Dhyandev wearing a blue Zidane 10 shirt seated on a grassy riverbank under cloudy skies',
      focal: '52% 48%',
      aspect: '3:4',
      width: 768,
      height: 1024,
    },
    {
      id: 'desk-sim-night',
      slot: 6,
      src: '/images/about/wa0044_desk_sim.webp',
      webp960: '/images/about/export/wa0044_desk_sim-960w.webp',
      webp480: '/images/about/export/wa0044_desk_sim-480w.webp',
      avif960: '/images/about/export/wa0044_desk_sim-960w.avif',
      avif480: '/images/about/export/wa0044_desk_sim-480w.avif',
      alt: 'Dhyandev at his late-night desk and sim racing simulator setup in Kerala',
      focal: '50% 50%',
      aspect: '3:4',
      width: 4160,
      height: 3119,
    },
  ] as const,
  stickers: [
    {
      id: 'claude',
      slot: 1,
      label: 'Claude AI',
      rotate: -8,
    },
    {
      id: 'india-flag-3d',
      slot: 2,
      label: 'Flag of India',
      rotate: 8,
    },
    {
      id: 'formula-1',
      slot: 3,
      label: 'Formula 1',
      rotate: 7,
    },
    {
      id: 'google',
      slot: 4,
      label: 'Google',
      rotate: -6,
    },
  ] as const,
};
