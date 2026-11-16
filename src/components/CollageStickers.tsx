import React from 'react';

/**
 * Tooltip pill for brand stickers
 * Spec: "Tools I use", tool name, no wording implying endorsement or partnership.
 */
export const StickerTooltip: React.FC<{ toolName: string; isVisible: boolean }> = ({
  toolName,
  isVisible,
}) => {
  if (!isVisible) return null;
  return (
    <div
      role="tooltip"
      className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md bg-[#121211] text-white text-[11px] font-sans font-medium tracking-tight shadow-lg pointer-events-none z-50 animate-in fade-in zoom-in-95 duration-150"
    >
      <span>Tools I use: </span>
      <span className="font-semibold text-[#F4F4F2]">{toolName}</span>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#121211]" />
    </div>
  );
};

/**
 * 1. Claude (Anthropic) Spark Mark
 * Source: Anthropic Brand Kit & Simple Icons (anthropic.svg)
 * Usage: Single-color white or Anthropic official orange on dark tile.
 */
export const ClaudeIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
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
 * 2. GitHub Invertocat Mark
 * Source: GitHub Brand Guidelines & Simple Icons (github.svg)
 * Usage: Solid white on near-black tile.
 */
export const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
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

/**
 * 3. Cloudflare Mark
 * Source: Cloudflare Brand Guidelines & Simple Icons (cloudflare.svg)
 */
export const CloudflareIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.78 12.06c-.05-.44-.2-.86-.44-1.22-.64-.98-1.74-1.57-2.92-1.57-.45 0-.89.09-1.3.26-.64-1.63-2.22-2.78-4.07-2.78-1.92 0-3.56 1.23-4.14 2.96-.4-.2-.84-.31-1.31-.31-1.6 0-2.93 1.15-3.19 2.68-.04.22-.05.45-.05.68 0 .19.01.37.04.55C1.04 13.9 0 15.06 0 16.48 0 18.42 1.58 20 3.52 20h16.03c2.45 0 4.45-2 4.45-4.45 0-2.02-1.38-3.79-3.22-4.29-.02-.4-.11-.8-.28-1.2z" />
  </svg>
);

/**
 * 4. Next.js Mark
 * Source: Vercel Brand Assets & Simple Icons (nextdotjs.svg)
 */
export const NextJsIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 180 180"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask height="180" id="next-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
      <circle cx="90" cy="90" fill="black" r="90" />
    </mask>
    <g mask="url(#next-mask)">
      <circle cx="90" cy="90" fill="currentColor" r="90" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="white"
      />
      <rect fill="white" height="72" width="12" x="115" y="54" />
    </g>
  </svg>
);

/**
 * 5. Original Generic Sim Racing Steering Wheel
 * Zero third-party trademarks: generic D-cut sim racing rim with rotary dials, buttons, and paddle shifters.
 */
export const SteeringWheelIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Wheel Rim */}
    <path
      d="M24 6C14.059 6 6 14.059 6 24C6 29.5 8.5 34.5 12.5 38C15.5 40.5 20 41.5 24 41.5C28 41.5 32.5 40.5 35.5 38C39.5 34.5 42 29.5 42 24C42 14.059 33.941 6 24 6Z"
      stroke="#121211"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Paddle Shifters */}
    <path d="M4 18V28" stroke="#73736C" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M44 18V28" stroke="#73736C" strokeWidth="2.5" strokeLinecap="round" />
    {/* Center Hub */}
    <circle cx="24" cy="24" r="7" fill="#121211" />
    <circle cx="24" cy="24" r="3.5" fill="#383836" />
    {/* Horizontal & Vertical Spokes */}
    <path d="M6 24H17" stroke="#121211" strokeWidth="3" strokeLinecap="round" />
    <path d="M31 24H42" stroke="#121211" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 31V41" stroke="#121211" strokeWidth="3" strokeLinecap="round" />
    {/* Colorful Sim Dials / Buttons */}
    <circle cx="19" cy="19" r="1.5" fill="#E10600" />
    <circle cx="29" cy="19" r="1.5" fill="#0080FF" />
    <circle cx="18" cy="28" r="1.2" fill="#FFB703" />
    <circle cx="30" cy="28" r="1.2" fill="#2E7D32" />
  </svg>
);

/**
 * 6. Original Motorsport Checkered Flag
 * Clean waving checkered flag vector.
 */
export const CheckeredFlagIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6 5V27" stroke="#121211" strokeWidth="2.5" strokeLinecap="round" />
    {/* Checkered pattern */}
    <path d="M7 6C11 5 15 7.5 19 6C23 4.5 25 5.5 27 6V18C25 17.5 23 16.5 19 18C15 19.5 11 17 7 18V6Z" fill="#FFFFFF" stroke="#121211" strokeWidth="1.5" />
    <path d="M7 6H12V9H7V6ZM17 6.5H22V9.5H17V6.5ZM12 9H17V12H12V9ZM22 9.5H27V12.5H22V9.5ZM7 12H12V15H7V12ZM17 12.5H22V15.5H17V12.5ZM12 15H17V18H12V15ZM22 15.5H27V18H22V15.5Z" fill="#121211" />
  </svg>
);

/**
 * 7. India Flag Sticker
 * Specification: Standard 3-color flag (Saffron, White, Green) with 24-spoke Ashoka Chakra.
 */
export const IndiaFlagIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-6' }) => (
  <svg
    viewBox="0 0 45 30"
    fill="none"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="45" height="30" rx="4" fill="#FFFFFF" />
    {/* Saffron Top */}
    <path d="M0 4C0 1.79 1.79 0 4 0H41C43.21 0 45 1.79 45 4V10H0V4Z" fill="#FF9933" />
    {/* White Center */}
    <rect y="10" width="45" height="10" fill="#FFFFFF" />
    {/* Green Bottom */}
    <path d="M0 20H45V26C45 28.21 43.21 30 41 30H4C1.79 30 0 28.21 0 26V20Z" fill="#138808" />
    {/* Ashoka Chakra */}
    <circle cx="22.5" cy="15" r="3.6" stroke="#000080" strokeWidth="0.8" fill="none" />
    <circle cx="22.5" cy="15" r="0.8" fill="#000080" />
    {/* Spokes */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
      <line
        key={deg}
        x1="22.5"
        y1="11.8"
        x2="22.5"
        y2="18.2"
        stroke="#000080"
        strokeWidth="0.35"
        transform={`rotate(${deg} 22.5 15)`}
      />
    ))}
  </svg>
);

export const renderStickerIcon = (id: string, theme: 'dark' | 'light') => {
  const iconColor = theme === 'dark' ? 'text-white' : 'text-[#121211]';
  switch (id) {
    case 'claude':
      return <ClaudeIcon className="w-[60%] h-[60%] text-[#D97757]" />;
    case 'github':
      return <GitHubIcon className={`w-[60%] h-[60%] ${iconColor}`} />;
    case 'cloudflare':
      return <CloudflareIcon className="w-[60%] h-[60%] text-[#F38020]" />;
    case 'nextjs':
      return <NextJsIcon className={`w-[60%] h-[60%] ${iconColor}`} />;
    case 'steering-wheel':
      return <SteeringWheelIcon className="w-[64%] h-[64%]" />;
    case 'checkered-flag':
      return <CheckeredFlagIcon className="w-[64%] h-[64%]" />;
    case 'india-flag':
      return <IndiaFlagIcon className="w-[72%] h-[56%]" />;
    default:
      return <ClaudeIcon className="w-[60%] h-[60%] text-[#D97757]" />;
  }
};
