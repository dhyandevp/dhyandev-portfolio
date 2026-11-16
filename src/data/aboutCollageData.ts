/**
 * Off The Clock - Floating Photo Collage Configuration
 *
 * Single typed config file for all collage photos, captions, focal points,
 * and decorative/brand sticker tiles.
 */

export interface CollagePhoto {
  readonly id: string;
  readonly src: string;
  readonly avif480?: string;
  readonly avif960?: string;
  readonly webp480?: string;
  readonly webp960?: string;
  readonly alt: string;
  readonly caption: string;
  readonly focal: string;
  readonly slot: 1 | 2 | 3 | 4 | 5 | 6;
  readonly aspect: '16:9' | '4:5' | '3:4';
  readonly width: number;
  readonly height: number;
}

export interface CollageSticker {
  readonly id: string;
  readonly label: string;
  readonly toolName?: string;
  readonly isBrand?: boolean;
  readonly rotate: number;
  readonly theme: 'dark' | 'light';
  readonly slot: 1 | 2 | 3 | 4;
}

export interface CollageSlotLayout {
  readonly left: number; // percentage of stage width
  readonly top: number;  // percentage of stage width (stage is 4:3)
  readonly width: number; // percentage of stage width
  readonly aspect: '16:9' | '4:5' | '3:4';
  readonly rotation: number; // degrees
  readonly zIndex: number;
}

export interface StickerSlotLayout {
  readonly left: number;
  readonly top: number;
  readonly rotation: number;
}

/**
 * Stage geometry: 4:3 aspect ratio.
 * Positions are percentages of stage width.
 */
export const PHOTO_SLOT_LAYOUTS: Record<number, CollageSlotLayout> = {
  1: { left: 29, top: 33, width: 50, aspect: '16:9', rotation: 0, zIndex: 5 },  // Hero landscape
  2: { left: 7,  top: 20, width: 30, aspect: '4:5',  rotation: -3, zIndex: 2 }, // Left tall
  3: { left: 40, top: 3,  width: 24, aspect: '3:4',  rotation: 2,  zIndex: 3 }, // Top center
  4: { left: 66, top: 22, width: 30, aspect: '4:5',  rotation: 3,  zIndex: 2 }, // Right tall
  5: { left: 20, top: 62, width: 22, aspect: '3:4',  rotation: -8, zIndex: 4 }, // Bottom left
  6: { left: 43, top: 61, width: 22, aspect: '3:4',  rotation: 1,  zIndex: 4 }, // Bottom center
};

export const STICKER_SLOT_LAYOUTS: Record<number, StickerSlotLayout> = {
  1: { left: 22, top: 14, rotation: -8 },
  2: { left: 63, top: 17, rotation: 10 },
  3: { left: 66, top: 74, rotation: 6 },
  4: { left: 8,  top: 60, rotation: -6 },
};

export const aboutCollageConfig = {
  sectionTitle: 'Off the clock',
  sectionSubtitle: 'Bikes, rivers, late-night laps',
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
      caption: 'Afternoon sun & river bridge with Bajaj V15',
      focal: '48% 52%',
      aspect: '16:9',
      width: 1024,
      height: 768,
    },
    {
      id: 'bridge-motorcycle-silhouette',
      slot: 2,
      src: '/images/about/bridge_motorcycle.webp',
      webp960: '/images/about/export/bridge_motorcycle-960w.webp',
      webp480: '/images/about/export/bridge_motorcycle-480w.webp',
      avif960: '/images/about/export/bridge_motorcycle-960w.avif',
      avif480: '/images/about/export/bridge_motorcycle-480w.avif',
      alt: 'Silhouette of Dhyandev standing with his motorcycle on a bridge at dusk',
      caption: 'River crossing silhouette at dusk',
      focal: '50% 45%',
      aspect: '4:5',
      width: 1127,
      height: 1456,
    },
    {
      id: 'campus-selfie',
      slot: 3,
      src: '/images/about/selfie_school.webp',
      webp960: '/images/about/export/selfie_school-960w.webp',
      webp480: '/images/about/export/selfie_school-480w.webp',
      avif960: '/images/about/export/selfie_school-960w.avif',
      avif480: '/images/about/export/selfie_school-480w.avif',
      alt: 'Selfie of Dhyandev on the school campus steps in Kerala',
      caption: 'Campus steps & sunny afternoons, Kerala',
      focal: '50% 35%',
      aspect: '3:4',
      width: 4160,
      height: 3120,
    },
    {
      id: 'racing-helmet',
      slot: 4,
      src: '/images/about/redbull_f1_helmet.webp',
      webp960: '/images/about/export/redbull_f1_helmet-960w.webp',
      webp480: '/images/about/export/redbull_f1_helmet-480w.webp',
      avif960: '/images/about/export/redbull_f1_helmet-960w.avif',
      avif480: '/images/about/export/redbull_f1_helmet-480w.avif',
      alt: 'Formula 1 driver championship helmet with reflective visor',
      caption: 'Visor down: telemetry & relentless pace',
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
      caption: 'Zidane 10 by the riverbank under storm clouds',
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
      alt: '[ADD ALT]',
      caption: '[ADD CAPTION]',
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
      toolName: 'Claude',
      isBrand: true,
      rotate: -8,
      theme: 'dark',
    },
    {
      id: 'github',
      slot: 2,
      label: 'GitHub',
      toolName: 'GitHub',
      isBrand: true,
      rotate: 10,
      theme: 'dark',
    },
    {
      id: 'steering-wheel',
      slot: 3,
      label: 'Sim Racing Steering Wheel',
      isBrand: false,
      rotate: 6,
      theme: 'light',
    },
    {
      id: 'india-flag',
      slot: 4,
      label: 'India Flag',
      isBrand: false,
      rotate: -6,
      theme: 'light',
    },
  ] as const,
} as const;
