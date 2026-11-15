import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface ProjectsSectionProps {
  readonly projects: readonly Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProject = projects[currentIndex] || projects[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="works" className="w-full bg-canvas editorial-border-b">
      {/* 1. Header: 'SELECTED works.' */}
      <div className="w-full px-6 md:px-12 pt-12 md:pt-16 pb-4">
        <span className="block font-mono text-[10px] text-burgundy font-bold tracking-widest uppercase mb-1">
          SELECTED
        </span>
        <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl text-burgundy tracking-tighter lowercase leading-none">
          works.
        </h2>
      </div>

      {/* 2. Main Selected Work Showcase with Standing Photographer Figure (Image 7 Layout) */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[580px]">
        {/* Left Column: Deep Burgundy Case Study Box (7 cols) */}
        <div className="lg:col-span-8 p-6 md:p-12 flex flex-col justify-center">
          <div className="bg-burgundy text-white p-6 sm:p-8 md:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between min-h-[420px]">
            {/* Top Row: Title + Category */}
            <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-white/20">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-canvas/80 block mb-1">
                  PROJECT [{currentProject.code} / {projects.length.toString().padStart(2, '0')}]
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                  {currentProject.title}
                </h3>
              </div>

              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-canvas hover:text-white underline underline-offset-4"
                >
                  <span>LEARN MORE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Middle Section: Screen Preview & Problem Summary */}
            <div className="my-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Actual Project Screenshot from dhyandev.sbs */}
              <div className="md:col-span-7 aspect-[16/10] bg-black/40 overflow-hidden border border-white/20 shadow-md">
                <img
                  src={currentProject.image || '/images/entri_proctor.webp'}
                  alt={currentProject.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Technical Overview */}
              <div className="md:col-span-5 space-y-3 font-sans text-xs sm:text-sm text-canvas/90 leading-relaxed">
                <p className="font-mono text-[11px] text-canvas/70 uppercase">
                  {currentProject.category}
                </p>
                <p>{currentProject.summary}</p>
                <div className="pt-2">
                  <span className="block font-mono text-[10px] text-white/70 uppercase mb-1">
                    KEY TECHNOLOGIES:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {currentProject.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 border border-white/30 text-[10px] font-mono text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Carousel Arrow Buttons */}
            <div className="pt-4 border-t border-white/20 flex items-center justify-between font-mono text-xs text-canvas/80">
              <span className="tracking-widest uppercase">
                {currentProject.status} // {currentProject.year}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2 border border-white/30 hover:bg-white hover:text-burgundy transition-colors text-white"
                  aria-label="Previous project"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="tabular font-bold text-white">
                  {currentIndex + 1} / {projects.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2 border border-white/30 hover:bg-white hover:text-burgundy transition-colors text-white"
                  aria-label="Next project"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Standing Photographer Full-Height Figure (Directly from Image 7) */}
        <div className="lg:col-span-4 hidden lg:flex items-center justify-center p-6 bg-canvas editorial-border-l">
          <div className="w-full max-w-[280px] h-[460px] overflow-hidden bg-black/10 shadow-sm">
            <img
              src="/images/works_photographer.webp"
              alt="Photographer holding camera in silhouette"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top grayscale contrast-125 hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>

      {/* 3. Infinite Running Text Ticker: 'VIEW ALL WORKS · VIEW ALL WORKS' (Image 7 Ticker) */}
      <div className="w-full editorial-border-t py-2 bg-canvas overflow-hidden flex items-center whitespace-nowrap text-[10px] font-mono uppercase tracking-widest text-burgundy/80 select-none">
        <div className="animate-marquee flex items-center gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8">
              <span>VIEW ALL WORKS</span>
              <span className="opacity-40">/</span>
              <span>COMPUTER VISION</span>
              <span className="opacity-40">/</span>
              <span>LINUX INFRASTRUCTURE</span>
              <span className="opacity-40">/</span>
              <span>OFFLINE FIRST</span>
              <span className="opacity-40">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
