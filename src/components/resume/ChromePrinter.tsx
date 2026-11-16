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
      {/* VINTAGE RETRO DOT-MATRIX / OFFICE PRINTER CHASSIS */}
      <div className="relative w-full max-w-[820px] px-4 flex flex-col items-center">
        {/* Desk Ambient Drop Shadow */}
        <div
          className="absolute -top-1 w-[94%] h-32 rounded-2xl bg-neutral-950/25 blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Outer Retro Beige Plastic Body with Mechanical Stepping Vibration */}
        <m.div
          animate={
            isPrinting
              ? { y: [0, -0.7, 0.7, -0.4, 0.4, 0] }
              : { y: 0 }
          }
          transition={
            isPrinting
              ? { repeat: Infinity, duration: 0.1, ease: 'linear' }
              : { duration: 0.2 }
          }
          className="relative z-20 w-full rounded-2xl sm:rounded-3xl shadow-[0_20px_45px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.1)] border border-[#C5BDAA]"
          style={{
            background: 'linear-gradient(180deg, #F3EFE6 0%, #E7E1D3 20%, #D8D2C2 75%, #C7C0B0 100%)',
          }}
        >
          {/* Top Panel Section: Louver Cooling Vents & Smoked Acrylic Window */}
          <div className="w-full px-5 sm:px-8 pt-4 pb-3 flex flex-col gap-2.5">
            {/* Top Vent Louvers and Alignment Marks */}
            <div className="w-full flex items-center justify-between">
              {/* Left: Molded Cooling Vents */}
              <div className="flex flex-col gap-1 w-32 sm:w-44">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-full h-[2.5px] rounded-full bg-[#A8A190]/60 shadow-[inset_0_1px_1px_rgba(0,0,0,0.2),0_1px_0_rgba(255,255,255,0.6)]"
                  />
                ))}
              </div>

              {/* Center: Subtle Embossed Column Ruler */}
              <div className="hidden sm:flex items-center gap-4 font-mono text-[9px] text-[#7A7466] uppercase tracking-widest font-semibold select-none">
                <span>10</span>
                <span>•</span>
                <span>40</span>
                <span>•</span>
                <span>80 COL</span>
              </div>

              {/* Right: Voltage / Safety Decal */}
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#7A7466] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A8A190]" />
                <span className="font-semibold tracking-wider">AC 220-240V</span>
              </div>
            </div>

            {/* Middle: Smoked Acrylic Inspection Window & Moving 9-Pin Printhead Carriage */}
            <div
              className="relative w-full h-11 sm:h-14 rounded-lg overflow-hidden border border-[#A69F8E]/80 shadow-[inset_0_3px_8px_rgba(0,0,0,0.4)]"
              style={{
                background: 'linear-gradient(180deg, #1C1E22 0%, #111214 60%, #1A1C20 100%)',
              }}
            >
              {/* Specular glare reflection across the acrylic cover */}
              <div
                className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Dual Chrome Printhead Carriage Guide Rails */}
              <div className="absolute inset-x-4 top-3 h-[2px] bg-gradient-to-r from-neutral-600 via-neutral-300 to-neutral-600 shadow-sm" />
              <div className="absolute inset-x-4 bottom-3 h-[2px] bg-gradient-to-r from-neutral-700 via-neutral-400 to-neutral-700 shadow-sm" />

              {/* Moving 9-Pin Impact Printhead Carriage */}
              <m.div
                animate={
                  isPrinting
                    ? {
                        x: [
                          -180, -100, -20, 80, 160, 200, 140, 40, -40, -140, -200, -180,
                        ],
                      }
                    : { x: -160 }
                }
                transition={
                  isPrinting
                    ? {
                        repeat: Infinity,
                        duration: 1.4,
                        ease: 'easeInOut',
                      }
                    : { duration: 0.3 }
                }
                className="absolute top-1 bottom-1 w-12 sm:w-16 left-1/2 -ml-6 sm:-ml-8 rounded bg-gradient-to-b from-[#3E4249] to-[#25272B] border border-neutral-600 shadow-[0_2px_6px_rgba(0,0,0,0.6)] flex items-center justify-center z-10"
              >
                {/* Printhead needle plate */}
                <div className="w-5 h-5 rounded-xs bg-[#1A1B1D] border border-neutral-700 flex items-center justify-center">
                  <div
                    className={`w-2 h-2 rounded-full transition-colors ${
                      isPrinting
                        ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping'
                        : 'bg-neutral-600'
                    }`}
                  />
                </div>
              </m.div>

              {/* Internal Paper Bed with continuous tractor perforations hint */}
              <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none opacity-20">
                <div className="flex flex-col gap-1">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="w-1.5 h-1.5 rounded-full bg-white" />
                  ))}
                </div>
                <div className="flex flex-col gap-1">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="w-1.5 h-1.5 rounded-full bg-white" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lower Section: Front Face with Metal Nameplate and Retro Control Panel */}
          <div className="w-full px-5 sm:px-8 py-3.5 bg-[#DDD7C9] border-t border-[#FFFDF8] rounded-b-2xl sm:rounded-b-3xl flex flex-wrap items-center justify-between gap-3 relative">
            {/* Left: Classic Stamped Brushed Metal Brand Plate */}
            <div className="flex items-center gap-3">
              <div
                className="px-3.5 py-1.5 rounded-sm border border-[#A49C8B] shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_1px_3px_rgba(0,0,0,0.15)] flex flex-col select-none"
                style={{
                  background: 'linear-gradient(135deg, #F0ECE1 0%, #D8D2C2 50%, #C4BCAB 100%)',
                }}
              >
                <div className="font-mono font-black text-xs sm:text-sm tracking-widest text-[#24211D]">
                  WAYVE • MODEL-80
                </div>
                <div className="font-mono text-[8.5px] sm:text-[9px] tracking-wider text-[#635E54] uppercase font-semibold">
                  9-Pin Continuous Matrix Printer
                </div>
              </div>

              {/* DIP Switch cover plate screw detail */}
              <div className="hidden sm:flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#A8A190] border border-[#7A7466] flex items-center justify-center shadow-inner">
                  <div className="w-1.5 h-[1px] bg-[#4D483D]" />
                </div>
              </div>
            </div>

            {/* Right: Authentic Vintage Dark Bezel Control Panel */}
            <div
              className="flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 rounded-lg border border-[#3E4044] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_1px_2px_rgba(255,255,255,0.4)]"
              style={{
                background: 'linear-gradient(180deg, #2A2C30 0%, #1E2024 100%)',
              }}
            >
              {/* Vintage Status LEDs */}
              <div className="flex items-center gap-3 font-mono text-[9px] font-bold tracking-wider text-neutral-300">
                {/* POWER LED */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b] border border-amber-300" />
                  <span className="text-[8px] text-neutral-400 uppercase">PWR</span>
                </div>

                {/* READY / PRINT LED */}
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`w-2.5 h-2.5 rounded-full border transition-all ${
                      isPrinting
                        ? 'bg-amber-400 shadow-[0_0_10px_#f59e0b] border-amber-300 animate-pulse'
                        : 'bg-neutral-300 shadow-[0_0_6px_#e5e5e5] border-neutral-200'
                    }`}
                  />
                  <span className={`text-[8px] uppercase transition-colors ${
                    isPrinting ? 'text-amber-300' : 'text-neutral-400'
                  }`}>
                    {isPrinting ? 'PRINT' : 'READY'}
                  </span>
                </div>

                {/* PAPER OUT LED */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700 border border-neutral-600" />
                  <span className="text-[8px] text-neutral-500 uppercase">PAPER</span>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-[1px] h-6 bg-neutral-700" />

              {/* Tactile Push Buttons */}
              <div className="flex items-center gap-2">
                {/* FORM FEED / RE-FEED BUTTON */}
                <button
                  type="button"
                  onClick={onTriggerPrint}
                  disabled={isPrinting}
                  className="px-2.5 sm:px-3 py-1 rounded bg-gradient-to-b from-[#4C5057] to-[#34373C] hover:from-[#5A5F67] hover:to-[#3E4248] active:translate-y-0.5 text-neutral-200 border border-neutral-600 shadow-[0_2px_3px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] font-mono text-[9px] sm:text-[10px] font-bold tracking-wider cursor-pointer disabled:opacity-50 transition-all"
                  title="Press to feed resume again"
                >
                  FEED
                </button>

                {/* LINE FEED BUTTON */}
                <button
                  type="button"
                  onClick={onTriggerPrint}
                  disabled={isPrinting}
                  className="hidden sm:inline-block px-2.5 py-1 rounded bg-gradient-to-b from-[#3E4147] to-[#2B2D31] hover:from-[#4C5057] hover:to-[#34373C] active:translate-y-0.5 text-neutral-300 border border-neutral-600 shadow-[0_2px_3px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] font-mono text-[9px] font-bold tracking-wider cursor-pointer disabled:opacity-50 transition-all"
                  title="Line Feed"
                >
                  LINE
                </button>
              </div>
            </div>

            {/* Right-Side Protruding Platen Roller Wheel (Continuous Tractor Feed Knob) */}
            <div className="absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 hidden md:flex items-center">
              <m.div
                animate={
                  isPrinting
                    ? { rotate: [0, 1080] }
                    : { rotate: 0 }
                }
                transition={
                  isPrinting
                    ? { duration: 2.5, ease: 'easeInOut' }
                    : { duration: 0.2 }
                }
                className="w-7 h-16 rounded-r-lg bg-gradient-to-r from-[#202226] to-[#121315] border-t border-r border-b border-[#3E4249] shadow-[4px_4px_12px_rgba(0,0,0,0.4)] flex flex-col justify-between py-1.5 px-0.5 cursor-pointer"
                onClick={onTriggerPrint}
                title="Platen roller manual feed knob"
              >
                {/* Ribbed rubber grip ridges */}
                {[...Array(9)].map((_, idx) => (
                  <div
                    key={idx}
                    className="w-full h-[1.5px] bg-[#3B3E45] shadow-[0_1px_0_rgba(0,0,0,0.8)]"
                  />
                ))}
              </m.div>
            </div>
          </div>
        </m.div>

        {/* RECESSED MECHANICAL PAPER EXIT PLATEN SLOT */}
        <div
          className="relative z-10 -mt-2 w-[92%] sm:w-[88%] h-5 rounded-b-lg flex items-center justify-between px-6 overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #0D0E10 0%, #181A1E 80%, #202328 100%)',
            boxShadow: 'inset 0 4px 8px rgba(0, 0, 0, 0.95), 0 6px 12px rgba(0, 0, 0, 0.25)',
          }}
        >
          {/* Dual Rubber Feed Pinch Rollers */}
          <div className="w-8 h-2 rounded-xs bg-[#2B2D31] shadow-inner" />
          <div className="w-8 h-2 rounded-xs bg-[#2B2D31] shadow-inner" />
        </div>
      </div>
    </div>
  );
};

export default ChromePrinter;
