import React from 'react';
import { m } from 'motion/react';
import { ProjectsSection } from '../components/ProjectsSection';
import { ContactSection } from '../components/ContactSection';
import { featuredProjects, developerProfile } from '../data/portfolioData';
import { revealVariant } from '../lib/motion';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Page Hero Header Banner */}
      <section className="w-full pt-16 sm:pt-24 pb-8 sm:pb-12 border-b border-hairline bg-transparent">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <m.div
            initial="hidden"
            animate="visible"
            variants={revealVariant}
            className="max-w-4xl"
          >
            <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl text-[#121211] tracking-tight leading-[1.1] mb-4">
              Verified Repositories & Engineering Artifacts
            </h1>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-sans">
              All 12 production builds across IoT disaster telemetry, GNOME desktop extensions, on-premise biometric attendance,
              offline public distribution platforms, and discrete electronic hardware. Every card links to a verifiable source repository.
            </p>
          </m.div>
        </div>
      </section>

      {/* Complete Projects Showcase */}
      <ProjectsSection projects={featuredProjects} />

      {/* Reachout Section */}
      <ContactSection profile={developerProfile} />
    </div>
  );
};

export default ProjectsPage;
