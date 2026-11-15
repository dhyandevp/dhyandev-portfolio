import React from 'react';
import { m } from 'motion/react';
import { ArrowRight, ArrowUpRight, Building2 } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ContactSection } from '../components/ContactSection';
import { developerProfile, featuredProjects, technicalNotes } from '../data/portfolioData';
import { revealVariant, standardViewport } from '../lib/motion';
import { Link } from '../lib/router';

export const HomePage: React.FC = () => {
  // Highlight top 4 curated projects on the home page
  const homeProjects = featuredProjects.slice(0, 4);

  return (
    <div className="w-full">
      {/* 1. Hero Section with Colossal Pixel Wordmark and Value Statement */}
      <Hero profile={developerProfile} />

      {/* 2. Featured Projects Preview */}
      <section className="w-full py-16 md:py-24 border-b border-hairline bg-transparent content-visibility-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Section Marker */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
            variants={revealVariant}
            className="flex items-center justify-between gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint mb-8 pb-3 border-b border-hairline"
          >
            <div className="flex items-center gap-2">
              <span className="text-black font-semibold">[02]</span>
              <span>FEATURED REPOSITORIES</span>
              <span className="text-hairline">/</span>
              <span>CURATED BUILDS</span>
            </div>
            <Link
              to="/projects"
              className="text-black hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <span>ALL 12 PROJECTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
            variants={revealVariant}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div className="max-w-2xl">
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-black tracking-tight mb-3">
                Verified systems, real-time perception & embedded hardware.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
                Curated production repositories engineered for sub-50ms inference, resilient disaster telemetry,
                and bare-metal stability.
              </p>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#121211] text-[#F4F4F2] text-xs font-mono font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors shrink-0 shadow-xs rounded-sm self-start md:self-auto"
            >
              <span>VIEW ALL 12 PROJECTS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </m.div>

          {/* 4-Project Grid Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            {homeProjects.map((project) => (
              <m.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={standardViewport}
                variants={revealVariant}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="group border border-hairline bg-white/80 backdrop-blur-sm overflow-hidden flex flex-col justify-between hover:border-black transition-colors"
              >
                <div>
                  {/* Screenshot Thumbnail */}
                  <div className="w-full aspect-[16/9] bg-[#EAEAEA] overflow-hidden border-b border-hairline relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      width={640}
                      height={360}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#121211]/90 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider font-semibold">
                      {project.status}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs font-mono text-ink-muted mb-2">
                      <span className="font-bold text-black">{project.code}</span>
                      <span>{project.category}</span>
                    </div>

                    <h3 className="font-sans font-bold text-xl text-black tracking-tight mb-2 group-hover:underline">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans mb-4 line-clamp-3">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-[#F4F4F4] text-[10px] font-mono text-black font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-mono text-ink-faint">
                          +{project.stack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Links */}
                <div className="p-6 pt-0 border-t border-hairline/60 flex items-center justify-between mt-4 text-xs font-mono">
                  <span className="text-ink-muted">{project.year}</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-black font-semibold hover:underline"
                    >
                      <span>REPO</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </m.div>
            ))}
          </div>

          {/* Bottom Banner Linking to Full Catalog */}
          <div className="w-full p-6 bg-[#E5E5E1]/60 border border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm font-sans text-ink-muted">
              Looking for our GNOME desktop extensions, 555-timer discrete hardware, or enterprise expense analytics?
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white text-xs font-mono font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors whitespace-nowrap"
            >
              <span>EXPLORE ALL 12 REPOSITORIES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. About & Leadership Teaser Banner */}
      <section className="w-full py-16 md:py-24 border-b border-hairline bg-transparent content-visibility-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
            variants={revealVariant}
            className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint mb-8 pb-3 border-b border-hairline"
          >
            <span className="text-black font-semibold">[01]</span>
            <span>ABOUT & LEADERSHIP</span>
            <span className="text-hairline">/</span>
            <span>WAYVE ENTERPRISES</span>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={standardViewport}
              variants={revealVariant}
              className="lg:col-span-8 space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F4F4F4] border border-hairline text-xs font-mono text-black font-semibold">
                <Building2 className="w-3.5 h-3.5 text-black" />
                <span>CO-FOUNDER, WAYVE ENTERPRISES</span>
              </div>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-black tracking-tight leading-tight">
                Architecting zero-bloat systems with verifiable operational performance.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed font-sans">
                At Wayve Enterprises, I direct our software systems and hardware ventures. We build deterministic,
                real-time technologies designed to withstand network dropouts, physical constraints, and real-world loads.
              </p>
            </m.div>

            <m.div
              initial="hidden"
              whileInView="visible"
              viewport={standardViewport}
              variants={revealVariant}
              className="lg:col-span-4 flex flex-col gap-3 justify-center"
            >
              <Link
                to="/about"
                className="inline-flex items-center justify-between gap-2 px-5 py-4 bg-[#121211] text-[#F4F4F2] text-xs font-mono font-medium uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow-xs rounded-sm"
              >
                <span>FULL BACKGROUND & BIO</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/specializations"
                className="inline-flex items-center justify-between gap-2 px-5 py-4 border border-hairline bg-white text-black text-xs font-mono font-medium uppercase tracking-wider hover:border-black transition-colors rounded-sm"
              >
                <span>CAPABILITIES MATRIX</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </m.div>
          </div>
        </div>
      </section>

      {/* 4. Laboratory Logs Teaser */}
      <section className="w-full py-16 md:py-24 border-b border-hairline bg-transparent content-visibility-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
            variants={revealVariant}
            className="flex items-center justify-between gap-3 text-xs font-mono uppercase tracking-widest text-ink-faint mb-8 pb-3 border-b border-hairline"
          >
            <div className="flex items-center gap-2">
              <span className="text-black font-semibold">[04]</span>
              <span>LABORATORY LOGS</span>
              <span className="text-hairline">/</span>
              <span>TECHNICAL THINKING</span>
            </div>
            <Link
              to="/notes"
              className="text-black hover:underline inline-flex items-center gap-1 font-semibold"
            >
              <span>EXPLORE ALL LOGS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </m.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {technicalNotes.slice(0, 2).map((note) => (
              <div
                key={note.id}
                className="p-6 md:p-8 border border-hairline bg-white/80 backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline/80 font-mono text-xs text-ink-muted">
                    <span className="font-bold text-black">{note.code}</span>
                    <span>{note.topic}</span>
                  </div>
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-black tracking-tight mb-2">
                    {note.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed font-sans mb-4">
                    {note.description}
                  </p>
                  <div className="p-3 bg-[#F9F9F8] border border-hairline text-xs font-mono text-black leading-relaxed">
                    <strong>Takeaway:</strong> {note.keyTakeaway}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Link
              to="/notes"
              className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-black hover:underline"
            >
              <span>READ ALL LABORATORY NOTES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <ContactSection profile={developerProfile} />
    </div>
  );
};

export default HomePage;
