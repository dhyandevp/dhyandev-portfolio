import React from 'react';
import { Capability } from '../types/portfolio';

interface CapabilitiesSectionProps {
  readonly capabilities: readonly Capability[];
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ capabilities }) => {
  return (
    <section id="services" className="w-full bg-canvas editorial-border-b">
      {/* 1. Header: '03 / services.' */}
      <div className="w-full px-6 md:px-12 pt-14 md:pt-20 pb-6 editorial-border-b">
        <span className="block font-mono text-[10px] text-burgundy font-bold tracking-widest uppercase mb-1">
          BY
        </span>
        <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-burgundy tracking-tighter lowercase leading-none">
          services.
        </h2>
      </div>

      {/* 2. Structured 3-Row Service Rows with Thin Rules and Real Images (Exact Image 7 Layout) */}
      <div className="w-full divide-y divide-burgundy/20">
        {capabilities.map((cap) => (
          <div
            key={cap.id}
            className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch hover:bg-canvas-subtle/30 transition-colors"
          >
            {/* Column 1: Index Number (1 col) */}
            <div className="lg:col-span-1 px-6 py-6 md:py-8 font-mono text-xs text-burgundy font-bold editorial-border-r flex items-start">
              {cap.index}
            </div>

            {/* Column 2: Service Title & Core Description (6 cols) */}
            <div className="lg:col-span-6 px-6 md:px-10 py-6 md:py-8 editorial-border-r flex flex-col justify-center">
              <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-burgundy lowercase tracking-tight mb-2">
                {cap.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans max-w-lg">
                {cap.description}
              </p>
            </div>

            {/* Column 3: Stack Badges / Editorial Details (2 cols) */}
            <div className="lg:col-span-2 px-6 py-6 md:py-8 editorial-border-r flex flex-col justify-center font-mono text-[10px] text-ink-muted uppercase space-y-1">
              <span className="font-bold text-burgundy mb-1 block">TOOLING:</span>
              {cap.regularTech.slice(0, 4).map((tech) => (
                <span key={tech} className="block truncate">
                  {tech}
                </span>
              ))}
            </div>

            {/* Column 4: High-Quality Real Hardware/Screen Preview Thumbnail (3 cols) */}
            <div className="lg:col-span-3 overflow-hidden bg-black aspect-[16/9] lg:aspect-auto flex items-center justify-center">
              {cap.image ? (
                <img
                  src={cap.image}
                  alt={cap.title}
                  className="w-full h-full object-cover grayscale contrast-115 hover:grayscale-0 hover:scale-105 transition-all duration-500 ease-out"
                />
              ) : (
                <div className="p-4 font-mono text-xs text-canvas/50">PREVIEW_IMG</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
