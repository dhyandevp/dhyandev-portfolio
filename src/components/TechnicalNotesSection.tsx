import React from 'react';
import { m } from 'motion/react';
import { technicalNotes } from '../data/portfolioData';
import { Beaker } from 'lucide-react';
import { revealVariant, standardViewport, tapScale } from '../lib/motion';

export const TechnicalNotesSection: React.FC = () => {
  return (
    <section id="notes" className="w-full py-16 md:py-24 border-b border-hairline bg-transparent content-visibility-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint mb-8 pb-3 border-b border-hairline"
        >
          <span className="text-black font-semibold">[04]</span>
          <span>LABORATORY LOGS</span>
          <span className="text-hairline">/</span>
          <span>TECHNICAL THINKING</span>
        </m.div>

        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="max-w-2xl mb-12"
        >
          <h2 className="font-sans font-bold text-3xl sm:text-4xl text-black tracking-tight mb-3">
            Empirical insights & system architectures.
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
            Notes from hands-on testing: optimizing inference loops, ensuring offline data integrity,
            and managing bare-metal network topologies.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {technicalNotes.map((note) => (
            <m.div
              key={note.id}
              initial="hidden"
              whileInView="visible"
              viewport={standardViewport}
              variants={revealVariant}
              whileTap={tapScale}
              className="p-6 md:p-8 border border-hairline bg-[#FAFAFA] flex flex-col justify-between hover:border-black transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline/80 font-mono text-xs text-ink-muted">
                  <span className="font-bold text-black">{note.code}</span>
                  <span>{note.topic}</span>
                </div>

                <h3 className="font-sans font-bold text-lg sm:text-xl text-black tracking-tight mb-3">
                  {note.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans mb-4">
                  {note.description}
                </p>

                <div className="p-3 bg-white border border-hairline text-xs font-mono text-black leading-relaxed">
                  <strong>Takeaway:</strong> {note.keyTakeaway}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-hairline/60 flex items-center justify-between text-xs font-mono">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-white border border-hairline text-[10px] text-ink-muted">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-ink-faint flex items-center gap-1 text-[11px]">
                  <Beaker className="w-3 h-3 text-black" />
                  LOGGED
                </span>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnicalNotesSection;
