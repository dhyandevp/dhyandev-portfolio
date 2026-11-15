import React from 'react';
import { m } from 'motion/react';
import { specializations } from '../data/portfolioData';
import { revealVariant, standardViewport } from '../lib/motion';

export const SpecializationsSection: React.FC = () => {
  return (
    <section id="specializations" className="w-full py-16 md:py-24 border-b border-hairline bg-transparent content-visibility-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint mb-8 pb-3 border-b border-hairline"
        >
          <span className="text-black font-semibold">[03]</span>
          <span>SPECIALIZATIONS</span>
          <span className="text-hairline">/</span>
          <span>CAPABILITIES & STACK</span>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="max-w-3xl mb-12"
        >
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-black tracking-tight mb-3">
            Engineered for performance, resilience, and operational clarity.
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
            Specializing in end-to-end technical execution across full-stack systems, edge artificial
            intelligence pipelines, and self-hosted server deployments.
          </p>
        </m.div>

        {/* 3-Column Detailed Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-hairline divide-y md:divide-y-0 md:divide-x divide-hairline bg-white/90 backdrop-blur-sm">
          {specializations.map((spec) => (
            <m.div
              key={spec.id}
              initial="hidden"
              whileInView="visible"
              viewport={standardViewport}
              variants={revealVariant}
              className="p-8 flex flex-col justify-between hover:bg-[#FDFDFD] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-6 border-b border-hairline font-mono text-xs text-ink-muted">
                  <span className="font-bold text-black">[{spec.index}]</span>
                  <span className="uppercase tracking-wider">{spec.category}</span>
                </div>

                <h3 className="font-sans font-bold text-xl text-black tracking-tight mb-3">
                  {spec.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans mb-6">
                  {spec.description}
                </p>

                {/* Production Tooling Stack */}
                <div className="mb-6">
                  <span className="block font-mono text-[11px] font-semibold text-black uppercase mb-2.5">
                    PRODUCTION STACK:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {spec.regularTech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#F4F4F4] text-[11px] font-mono text-black font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Delivery Focus */}
              <div className="pt-4 border-t border-hairline/60">
                <span className="block font-mono text-[10px] text-ink-faint uppercase mb-2">
                  EXPLORING & RESEARCH:
                </span>
                <div className="flex flex-wrap gap-1 text-[11px] font-mono text-ink-muted">
                  {spec.exploringTech.join(' · ')}
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
