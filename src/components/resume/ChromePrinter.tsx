import React from 'react';
import { m } from 'motion/react';

interface ChromePrinterProps {
  isPrinting: boolean;
  onTriggerPrint: () => void;
}

export const ChromePrinter: React.FC<ChromePrinterProps> = ({
  isPrinting,
  onTriggerPrint,
}) => {
  return (
    <div className="w-full flex flex-col items-center select-none print:hidden">
      {/* THE 3D CHROME PRINTER HARDWARE APPARATUS */}
      <div className="relative w-full max-w-[840px] px-4 flex flex-col items-center">
        {/* Wall Mounting Depth / Ambient Shadow */}
        <div
          className="absolute -top-3 w-[92%] h-24 rounded-[36px] bg-black/40 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Outer Metallic Chrome Capsule Body with subtle motor vibration during print */}
        <m.div
          animate={
            isPrinting
              ? { y: [0, -0.6, 0.6, -0.4, 0.4, 0] }
              : { y: 0 }
          }
          transition={
            isPrinting
              ? { repeat: Infinity, duration: 0.12, ease: 'linear' }
              : { duration: 0.2 }
          }
          className="relative z-20 w-full h-24 sm:h-28 rounded-[42px] p-[2.5px] shadow-[0_20px_50px_rgba(0,0,0,0.45),0_4px_12px_rgba(0,0,0,0.3)]"
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #b8bec7 18%, #ffffff 32%, #4a505b 52%, #b5bac4 72%, #ffffff 88%, #69707e 100%)'
          }}
        >
          {/* Inner Chrome Cylinder with Specular Liquid Metal Reflection */}
          <div
            className="w-full h-full rounded-[40px] flex items-center justify-between px-6 sm:px-10 relative overflow-hidden"
            style={{
              background: `
                linear-gradient(180deg,
                  rgba(255, 255, 255, 0.95) 0%,
                  rgba(225, 230, 236, 0.85) 15%,
                  rgba(180, 186, 196, 0.7) 35%,
                  rgba(70, 75, 85, 0.95) 48%,
                  rgba(35, 38, 44, 0.98) 52%,
                  rgba(140, 147, 158, 0.8) 65%,
                  rgba(240, 244, 248, 0.9) 82%,
                  rgba(120, 126, 136, 0.95) 100%
                )
              `,
              boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.8), inset 0 -3px 6px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Specular Horizontal Chrome Reflection Streak */}
            <div
              className="absolute top-2 left-6 right-6 h-3 rounded-full opacity-70 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.9) 20%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.9) 80%, transparent 100%)',
                filter: 'blur(1px)'
              }}
            />

            {/* Left End: 3D Embossed Red Asterisk / Cross Emblem */}
            <div className="relative z-10 flex items-center">
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center p-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_2px_4px_rgba(255,255,255,0.4)]"
                style={{
                  background: 'linear-gradient(145deg, #2a2e35 0%, #505663 100%)'
                }}
              >
                <button
                  type="button"
                  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center relative cursor-pointer group focus:outline-none"
                  onClick={onTriggerPrint}
                  disabled={isPrinting}
                  title="Click red emblem to print resume again"
                  aria-label="Print resume again"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110 active:scale-95"
                  >
                    <defs>
                      <linearGradient id="redEnamel" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ff4d42" />
                        <stop offset="45%" stopColor="#e52b20" />
                        <stop offset="100%" stopColor="#9e120a" />
                      </linearGradient>
                      <filter id="badgeBevel">
                        <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#ffffff" floodOpacity="0.4" />
                      </filter>
                    </defs>
                    <g fill="url(#redEnamel)" filter="url(#badgeBevel)">
                      <rect x="38" y="10" width="24" height="80" rx="12" />
                      <rect x="10" y="38" width="80" height="24" rx="12" />
                      <rect x="38" y="10" width="24" height="80" rx="12" transform="rotate(45 50 50)" />
                      <rect x="38" y="10" width="24" height="80" rx="12" transform="rotate(-45 50 50)" />
                    </g>
                  </svg>
                </button>
              </div>
            </div>

            {/* Center Area: Engraved Brushed Plate with Dynamic Status */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 pointer-events-none">
              <div className="flex items-center gap-1.5">
                {isPrinting && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                )}
                <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] uppercase drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] transition-colors duration-200 ${
                  isPrinting ? 'text-emerald-300' : 'text-neutral-400'
                }`}>
                  {isPrinting ? 'EXTRUDING RESUME // 300 DPI' : 'PRECISION FEED // 300 DPI'}
                </span>
              </div>
            </div>

            {/* Right End: Glossy Convex Status LED Light Bead */}
            <div className="relative z-10 flex items-center">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.7),0_1px_3px_rgba(255,255,255,0.4)]"
                style={{
                  background: 'linear-gradient(145deg, #1f2329 0%, #3a3f49 100%)'
                }}
              >
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full relative transition-all duration-300 ${
                    isPrinting
                      ? 'bg-emerald-400 shadow-[0_0_16px_5px_rgba(52,211,153,0.95),inset_0_1px_3px_#ffffff] animate-pulse'
                      : 'bg-rose-600 shadow-[0_0_10px_3px_rgba(225,29,72,0.8),inset_0_1px_2px_#ffffff]'
                  }`}
                >
                  <span className="absolute top-0.5 left-1 w-1.5 h-1.5 rounded-full bg-white/90" />
                </div>
              </div>
            </div>
          </div>
        </m.div>

        {/* CENTER EXIT SLOT CAVITY */}
        <div
          className="relative z-10 -mt-3 w-[92%] sm:w-[88%] h-6 rounded-b-xl flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #090a0c 0%, #17191d 60%, #22262d 100%)',
            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.95), 0 8px 16px rgba(0, 0, 0, 0.35)'
          }}
        >
          <div
            className={`w-4/5 h-[2.5px] transition-all duration-300 ${
              isPrinting
                ? 'bg-emerald-400 shadow-[0_0_16px_4px_rgba(52,211,153,1),0_0_28px_8px_rgba(16,185,129,0.7)] opacity-100 scale-x-105'
                : 'bg-rose-500 shadow-[0_0_8px_2px_rgba(244,63,94,0.75)] opacity-80 scale-x-95'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ChromePrinter;

