import React, { useState } from 'react';
import { m } from 'motion/react';
import { Project } from '../types/portfolio';
import { ArrowUpRight, Github, ExternalLink, SlidersHorizontal } from 'lucide-react';
import { revealVariant, standardViewport, tapScale } from '../lib/motion';

interface ProjectsSectionProps {
  readonly projects: readonly Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'IoT & Embedded Systems',
    'Systems & Open Source',
    'Computer Vision & AI',
    'Full-Stack Systems'
  ];

  const filteredProjects = selectedCategory === 'ALL'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="w-full py-16 md:py-24 border-b border-hairline bg-transparent content-visibility-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Marker */}
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
          variants={revealVariant}
          className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-ink-faint mb-8 pb-3 border-b border-hairline"
        >
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
        </m.div>

        {/* Section Heading & Category Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
            variants={revealVariant}
            className="max-w-2xl"
          >
            <h2 className="font-sans font-bold text-3xl sm:text-4xl text-black tracking-tight mb-3">
              Production systems, edge pipelines, and hardware instruments.
            </h2>
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
              Real-world engineering executed across computer vision, decentralized disaster telemetry,
              GNOME desktop extensions, hardware state machines, and high-performance full-stack web platforms.
            </p>
          </m.div>

          {/* Filter Badges with whileTap */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
            variants={revealVariant}
            className="flex flex-wrap items-center gap-1.5 font-mono text-xs"
          >
            <span className="text-ink-faint mr-1 flex items-center gap-1 text-[11px]">
              <SlidersHorizontal className="w-3 h-3" /> FILTER:
            </span>
            {categories.map((cat) => (
              <m.button
                key={cat}
                type="button"
                whileTap={tapScale}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-[11px] font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-[#F4F4F4] text-black hover:bg-[#EAEAEA]'
                }`}
                aria-pressed={selectedCategory === cat}
              >
                {cat}
              </m.button>
            ))}
          </m.div>
        </div>

        {/* Responsive Grid: 1 col (<640px), 2 cols (640-1024px tablet), 3 cols (>1024px desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {filteredProjects.map((project) => (
            <m.article
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={standardViewport}
              variants={revealVariant}
              whileTap={tapScale}
              className="card group flex flex-col justify-between border border-hairline bg-white hover:border-black transition-colors duration-200 relative"
            >
              {/* Region 1: Media (explicit aspect-ratio 16/10, width/height to eliminate layout shift) */}
              <div
                className="overflow-hidden bg-[#F7F7F7] border-b border-hairline relative"
                style={{ aspectRatio: '16 / 10' }}
              >
                <img
                  src={project.image || '/images/blind_aid.webp'}
                  alt={`Screenshot of ${project.title}`}
                  width={640}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: '16 / 10' }}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-500 ease-out will-change-transform"
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
                    {project.metricsOrSpec.map((mSpec, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="block text-ink-faint uppercase text-[9px]">{mSpec.label}</span>
                        <span className="font-bold text-black truncate block">{mSpec.value}</span>
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
                    <m.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      whileTap={tapScale}
                      whileHover={{ scale: 1.03 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-neutral-800 text-xs font-mono font-medium transition-colors"
                      aria-label={`Inspect source code for ${project.title}`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>CODE</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </m.a>
                  )}
                </div>
              </footer>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
