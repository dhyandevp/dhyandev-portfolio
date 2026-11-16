import React from 'react';

/**
 * 1. Official Anthropic Claude AI Logo
 * Authentic starburst mark with 16 dynamic sunburst rays.
 */
export const ClaudeLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="#D97757"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" />
  </svg>
);

/**
 * 2. Official Formula 1 (F1) Logo
 * Authentic racing speed mark with angled aerodynamic forward slash and speed lines.
 */
export const Formula1LogoIcon: React.FC<{ className?: string }> = ({ className = 'w-11 h-6' }) => (
  <svg
    viewBox="0 0 120 30"
    fill="none"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M101.087 30h.625V27.107h.011L102.762 30h.54l1.04-2.893h.01V30h.625v-3.749h-.914l-1.008 2.935h-.01L102.01 26.25h-.924V30zM97.627 26.818h1.187V30h.656v-3.182h1.192v-.567h-3.035v.567zM90 30l30-30h-18.056L71.944 30H90zM85.699 13.065H49.382c-11.068 0-13.005.587-17.746 5.328-4.433 4.433-11.635 11.607-11.635 11.607h15.732l3.753-3.753c2.468-2.468 3.74-2.723 8.921-2.723h26.834L85.699 13.065zM31.152 16.253C27.877 19.343 20.753 26.263 16.913 30H0s13.552-13.513 21.085-20.928C28.846 1.685 32.714 0 46.949 0h51.815L87.545 11.219H48.001c-10.002 0-12.25.693-16.85 5.034z"
      fill="#E10600"
    />
  </svg>
);

/**
 * 3. Official Google 4-Color "G" Logo
 * Authentic Google G vector mark: Blue, Green, Yellow, Red.
 */
export const GoogleLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

/**
 * 4. Hyperrealistic 3D Waving Indian Flag
 * - Curvilinear S-curve wave geometry matching real wind physics
 * - India Saffron (#FF6820), Pure White (#FFFFFF), India Green (#046A38)
 * - Authentic 24-spoke Navy Blue Ashoka Chakra (#07038D) with outer perimeter nodes
 * - Photorealistic 3D cloth ripple lighting, specular highlights & deep valley shadows
 * - Fine fabric hem line and edge sheen
 */
export const WavingIndiaFlagIcon: React.FC<{ className?: string }> = ({ className = 'w-18 h-12' }) => {
  // Generate 24 spokes at 15-degree increments
  const spokes = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg
      viewBox="0 0 80 52"
      fill="none"
      aria-hidden="true"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: 'drop-shadow(0 14px 28px rgba(0,0,0,0.28)) drop-shadow(0 4px 10px rgba(0,0,0,0.16))',
      }}
    >
      <defs>
        {/* Dynamic Double S-curve Cloth Boundary */}
        <clipPath id="realistic-india-wave">
          <path d="M 3 8 C 14 2, 27 13, 40 7 C 53 1, 66 8, 77 5 L 77 44 C 66 47, 53 40, 40 46 C 27 52, 14 41, 3 47 Z" />
        </clipPath>

        {/* 3D Cylindrical Cloth Ripple Lighting (Highlights & Deep Folds) */}
        <linearGradient id="cloth-fold-shading" x1="0%" y1="0%" x2="100%" y2="0%">
          {/* Hoist edge shadow */}
          <stop offset="0%" stopColor="#000000" stopOpacity="0.25" />
          <stop offset="5%" stopColor="#000000" stopOpacity="0.08" />
          {/* Wave 1: Crest specular highlight */}
          <stop offset="18%" stopColor="#FFFFFF" stopOpacity="0.45" />
          {/* Wave 1: Trough ambient occlusion shadow */}
          <stop offset="34%" stopColor="#000000" stopOpacity="0.38" />
          {/* Wave 2: Crest specular highlight */}
          <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.48" />
          {/* Wave 2: Trough shadow */}
          <stop offset="70%" stopColor="#000000" stopOpacity="0.32" />
          {/* Flutter edge specular lift */}
          <stop offset="88%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
        </linearGradient>

        {/* Subtle cloth weave texture gradient */}
        <linearGradient id="cloth-vertical-sheen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.20" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Main Flag Body with Wave Clipping */}
      <g clipPath="url(#realistic-india-wave)">
        {/* Band 1: India Saffron (Kesar) */}
        <rect x="0" y="0" width="80" height="19" fill="#FF6820" />

        {/* Band 2: Pure White */}
        <rect x="0" y="17" width="80" height="17" fill="#FFFFFF" />

        {/* Band 3: India Green */}
        <rect x="0" y="33" width="80" height="20" fill="#046A38" />

        {/* Ashoka Chakra: Perfectly centered in the white band */}
        <g transform="translate(40, 25.5)">
          {/* Outer circle */}
          <circle cx="0" cy="0" r="5.6" stroke="#07038D" strokeWidth="0.95" fill="none" />
          {/* Inner hub */}
          <circle cx="0" cy="0" r="1.3" fill="#07038D" />

          {/* 24 Spoke Radiants with Sharpened Tips */}
          {spokes.map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <line
                x1="0"
                y1="1.3"
                x2="0"
                y2="5.5"
                stroke="#07038D"
                strokeWidth="0.45"
                strokeLinecap="round"
              />
              {/* Outer perimeter decorative node */}
              <circle cx="0" cy="5.2" r="0.22" fill="#07038D" />
            </g>
          ))}
        </g>

        {/* Photorealistic 3D Cloth Ripple Multiply Layer */}
        <rect
          x="0"
          y="0"
          width="80"
          height="52"
          fill="url(#cloth-fold-shading)"
          style={{ mixBlendMode: 'multiply' }}
        />

        {/* Specular Ambient Light Overlay Layer */}
        <rect
          x="0"
          y="0"
          width="80"
          height="52"
          fill="url(#cloth-fold-shading)"
          style={{ mixBlendMode: 'overlay', opacity: 0.65 }}
        />

        {/* Subtle vertical depth gradient */}
        <rect
          x="0"
          y="0"
          width="80"
          height="52"
          fill="url(#cloth-vertical-sheen)"
          style={{ mixBlendMode: 'overlay' }}
        />
      </g>

      {/* Top Wave Specular Edge Sheen (Silky hem shine) */}
      <path
        d="M 3 8 C 14 2, 27 13, 40 7 C 53 1, 66 8, 77 5"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bottom Wave Depth Rim */}
      <path
        d="M 3 47 C 14 41, 27 52, 40 46 C 53 40, 66 47, 77 44"
        stroke="rgba(0,0,0,0.22)"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left Hoist Edge Reinforcement */}
      <path
        d="M 3 8 L 3 47"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

/**
 * Dispatcher to render the appropriate logo or sticker icon
 */
export const renderStickerIcon = (id: string) => {
  switch (id) {
    case 'claude':
      return <ClaudeLogoIcon className="w-[64%] h-[64%]" />;
    case 'formula-1':
      return <Formula1LogoIcon className="w-[82%] h-[56%]" />;
    case 'google':
      return <GoogleLogoIcon className="w-[60%] h-[60%]" />;
    case 'india-flag-3d':
      return <WavingIndiaFlagIcon className="w-[94%] h-[88%]" />;
    default:
      return <ClaudeLogoIcon className="w-[64%] h-[64%]" />;
  }
};
