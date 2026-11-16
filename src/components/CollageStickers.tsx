import React from 'react';

/**
 * 1. 3D Faceted Crystal Polyhedron (Spline / 3D Isometric Crystal)
 * Matches the top-left sticker in the reference design.
 */
export const FacetedCrystalIcon: React.FC<{ className?: string }> = ({ className = 'w-9 h-9' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Facets */}
    <path d="M24 6L40 16L24 23L8 16L24 6Z" fill="#FFFFFF" fillOpacity="0.95" />
    <path d="M8 16L24 23V42L8 32V16Z" fill="#B0B0B8" />
    <path d="M24 23L40 16V32L24 42V23Z" fill="#757582" />
    {/* Inner Cut Facets with Specular Contrast */}
    <path d="M24 10L36 16.5L24 21.5L12 16.5L24 10Z" fill="#FFFFFF" />
    <path d="M24 21.5L36 16.5V28.5L24 37V21.5Z" fill="#D2D2DA" />
    <path d="M24 21.5V37L12 28.5V16.5L24 21.5Z" fill="#90909E" />
    {/* Specular Edge Highlights */}
    <line x1="24" y1="6" x2="24" y2="42" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
    <line x1="8" y1="16" x2="40" y2="16" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
  </svg>
);

/**
 * 2. 3D Organic Waving India Flag
 * Realistic cloth wave curve, ripples, Saffron/White/Green bands, and 24-spoke Ashoka Chakra.
 */
export const WavingIndiaFlagIcon: React.FC<{ className?: string }> = ({ className = 'w-14 h-10' }) => (
  <svg
    viewBox="0 0 68 46"
    fill="none"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.22))' }}
  >
    <defs>
      {/* Dynamic S-curve wave boundary */}
      <clipPath id="india-wave-path">
        <path d="M2 6C12 2 24 10 36 6C48 2 58 7 66 6V36C58 37 48 32 36 36C24 40 12 32 2 36V6Z" />
      </clipPath>
      {/* 3D Cloth Ripple Lighting */}
      <linearGradient id="flag-3d-lighting" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#000000" stopOpacity="0.18" />
        <stop offset="22%" stopColor="#FFFFFF" stopOpacity="0.32" />
        <stop offset="48%" stopColor="#000000" stopOpacity="0.22" />
        <stop offset="74%" stopColor="#FFFFFF" stopOpacity="0.28" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
      </linearGradient>
    </defs>

    <g clipPath="url(#india-wave-path)">
      {/* Saffron Top Band */}
      <rect x="0" y="0" width="68" height="16" fill="#FF9933" />
      {/* White Center Band */}
      <rect x="0" y="15" width="68" height="13" fill="#FFFFFF" />
      {/* Green Bottom Band */}
      <rect x="0" y="27" width="68" height="19" fill="#138808" />
      
      {/* Ashoka Chakra */}
      <circle cx="34" cy="21.5" r="4.3" stroke="#000080" strokeWidth="0.9" fill="none" />
      <circle cx="34" cy="21.5" r="1" fill="#000080" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="34"
          y1="17.8"
          x2="34"
          y2="25.2"
          stroke="#000080"
          strokeWidth="0.4"
          transform={`rotate(${deg} 34 21.5)`}
        />
      ))}

      {/* 3D Cloth Ripple Overlay */}
      <rect
        x="0"
        y="0"
        width="68"
        height="46"
        fill="url(#flag-3d-lighting)"
        style={{ mixBlendMode: 'multiply' }}
      />
    </g>

    {/* Subtle edge sheen */}
    <path
      d="M2 6V36"
      stroke="rgba(255,255,255,0.7)"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 3. 3D Figma Glossy Pills
 * Matches the bottom-right sticker in the reference design.
 */
export const Figma3DIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-10' }) => (
  <svg
    viewBox="0 0 40 56"
    fill="none"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="figma-red" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FF7A50" />
        <stop offset="100%" stopColor="#E03808" />
      </linearGradient>
      <linearGradient id="figma-orange" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFA194" />
        <stop offset="100%" stopColor="#F24E1E" />
      </linearGradient>
      <linearGradient id="figma-purple" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#BF7DFF" />
        <stop offset="100%" stopColor="#8A38F5" />
      </linearGradient>
      <linearGradient id="figma-blue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#48D1FF" />
        <stop offset="100%" stopColor="#009EDB" />
      </linearGradient>
      <linearGradient id="figma-green" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#34E89E" />
        <stop offset="100%" stopColor="#05B36E" />
      </linearGradient>
    </defs>

    {/* Top Left: Red Pill */}
    <path d="M10 0H20V14H10C4.477 14 0 9.523 0 4C0 1.79 1.79 0 4 0H10Z" fill="url(#figma-red)" />
    {/* Top Right: Orange Pill */}
    <path d="M20 0H30C35.523 0 40 4.477 40 10C40 15.523 35.523 20 30 20H20V0Z" fill="url(#figma-orange)" />
    {/* Middle Left: Purple Pill */}
    <path d="M10 14H20V28H10C4.477 28 0 23.523 0 18C0 15.79 1.79 14 4 14H10Z" fill="url(#figma-purple)" />
    {/* Middle Right: Blue Circle */}
    <circle cx="30" cy="28" r="10" fill="url(#figma-blue)" />
    {/* Bottom Left: Green Pill */}
    <path d="M10 28H20V38C20 43.523 15.523 48 10 48C4.477 48 0 43.523 0 38C0 32.477 4.477 28 10 28Z" fill="url(#figma-green)" />
    
    {/* Specular pill gloss highlights */}
    <ellipse cx="8" cy="4" rx="4" ry="2" fill="white" fillOpacity="0.45" />
    <ellipse cx="30" cy="4" rx="4" ry="2" fill="white" fillOpacity="0.45" />
    <ellipse cx="8" cy="18" rx="4" ry="2" fill="white" fillOpacity="0.45" />
    <ellipse cx="30" cy="24" rx="4" ry="2" fill="white" fillOpacity="0.45" />
    <ellipse cx="8" cy="32" rx="4" ry="2" fill="white" fillOpacity="0.45" />
  </svg>
);

/**
 * 4. Official Claude (Anthropic) Spark Mark
 */
export const ClaudeIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M256 0c14.7 0 26.7 12 26.7 26.7v162.9l115.1-66.5c12.7-7.4 29 3 26.5 17.6l-29.2 168.7 146 51.6c13.7 4.9 13.7 24.3 0 29.2l-146 51.6 29.2 168.7c2.5 14.6-13.8 25-26.5 17.6L282.7 322.4v162.9c0 14.7-12 26.7-26.7 26.7s-26.7-12-26.7-26.7V322.4l-115.1 66.5c-12.7 7.4-29-3-26.5-17.6l29.2-168.7-146-51.6c-13.7-4.9-13.7-24.3 0-29.2l146-51.6L99.2 77.7c-2.5-14.6 13.8-25 26.5-17.6l115.1 66.5V26.7C229.3 12 241.3 0 256 0z" />
  </svg>
);

/**
 * 5. Official GitHub Invertocat Mark
 */
export const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export const renderStickerIcon = (id: string) => {
  switch (id) {
    case 'crystal-3d':
      return <FacetedCrystalIcon className="w-[62%] h-[62%]" />;
    case 'india-flag-3d':
      return <WavingIndiaFlagIcon className="w-[84%] h-[78%]" />;
    case 'figma-3d':
      return <Figma3DIcon className="w-[52%] h-[68%]" />;
    case 'claude':
      return <ClaudeIcon className="w-[62%] h-[62%] text-[#D97757]" />;
    case 'github':
      return <GitHubIcon className="w-[62%] h-[62%] text-white" />;
    default:
      return <FacetedCrystalIcon className="w-[62%] h-[62%]" />;
  }
};
