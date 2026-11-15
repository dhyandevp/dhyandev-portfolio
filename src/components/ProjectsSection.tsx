import React, { useState } from 'react';
import { Project } from '../types/portfolio';
import { ArrowUpRight, Github, ExternalLink, SlidersHorizontal } from 'lucide-react';

interface ProjectsSectionProps {
  readonly projects: readonly Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Computer Vision & AI',
    'Infrastructure & Systems',
    'Hardware & Firmware',
    'Full-Stack Systems'
  ];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="w-full py-16 md:py-24 border-b border-hairline bg-white content-visibility-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Marker */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-ink-faint mb-8 pb-3 border-b border-hairline">
          <div className="flex items-center gap-3">
            <span className="text-black font-semibold">[02]</span>
            <span>VERIFIED SYSTEMS & REPOSITORIES</span>
            <span className="text-hairline">/</span>
            <span>REAL-WORLD ENGINEERING</span>
          </div>

          <a
            href="https://linktr.ee/DhyandevRTX"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-black hover:text-neutral-600 transition-colors font-medium lowercase"
          >
            <span>linktr.ee/DhyandevRTX</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Section Heading & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-black tracking-tight mb-3">
              Production systems, edge pipelines, and hardware instruments.
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
              Real-world engineering executed across computer vision, automated SDR satellite tracking,
              zero-trust architecture, and custom micro-controller firmware.
            </p>
          </div>

          {/* Filter Badges */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
            <span className="text-ink-faint mr-1 flex items-center gap-1 text-[11px]">
              <SlidersHorizontal className="w-3 h-3" /> FILTER:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-[#F4F4F4] text-black hover:bg-[#EAEAEA]'
                }`}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid adhering to modern-web-guidance (semantic article cards, aspect-ratio, elevated actions) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="card group flex flex-col justify-between border border-hairline bg-white hover:border-black transition-all duration-300 relative"
            >
              {/* Region 1: Media (aspect-ratio 16/10, object-fit cover, lazy loaded WebP) */}
              <div className="aspect-[16/10] overflow-hidden bg-[#F7F7F7] border-b border-hairline relative">
                <img
                  src={project.image || '/images/blind_aid.webp'}
                  alt={`Screenshot of ${project.title}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-white/95 backdrop-blur-sm border border-hairline text-black font-mono text-[10px] font-bold tracking-wider">
                  [{project.code}]
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/90 backdrop-blur-sm text-white font-mono text-[10px] tracking-wider uppercase">
                  {project.status} // {project.year}
                </div>
              </div>

              {/* Region 2: Header */}
              <header className="p-6 pb-2">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-ink-muted mb-1">
                  {project.category}
                </span>

                <h3 className="font-sans font-bold text-xl text-black tracking-tight leading-snug">
                  <a
                    href={project.githubUrl || project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link hover:underline underline-offset-4 flex items-center justify-between gap-2"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-ink-faint group-hover:text-black shrink-0 transition-colors" />
                  </a>
                </h3>

                <p className="font-sans text-xs text-ink-faint mt-1 line-clamp-1">
                  {project.subtitle}
                </p>
              </header>

              {/* Region 3: Content (Summary, Technical Specs, Stack) */}
              <div className="px-6 py-2 flex-1 space-y-4">
                <p className="font-sans text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {project.summary}
                </p>

                {/* Technical Specs Metric Strip */}
                {project.metricsOrSpec && project.metricsOrSpec.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 p-3 bg-[#FAFAFA] border border-hairline/80 font-mono text-[10px]">
                    {project.metricsOrSpec.map((m, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="block text-ink-faint uppercase text-[9px]">{m.label}</span>
                        <span className="font-bold text-black truncate block">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div>
                  <span className="block font-mono text-[10px] text-ink-faint uppercase tracking-wider mb-2">
                    TECHNOLOGIES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 bg-[#F4F4F4] text-[10px] font-mono text-black font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Region 4: Footer (Direct interactive actions elevated above card link overlay) */}
              <footer className="p-6 pt-4 border-t border-hairline/80 flex items-center justify-between font-mono text-xs relative z-10 bg-white">
                <span className="text-[11px] text-ink-muted uppercase">
                  VERIFIED DEPLOYMENT
                </span>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-mono font-medium transition-colors"
                      aria-label={`Inspect source code for ${project.title}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>CODE</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
