import React, { useEffect, Suspense, lazy } from 'react';
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SpecializationsSection } from './components/SpecializationsSection';
import { TechnicalNotesSection } from './components/TechnicalNotesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { developerProfile, featuredProjects } from './data/portfolioData';
import { initSmoothScroll } from './lib/scroll';

// Dynamically import custom cursor so it only mounts if pointer: fine and hover: hover
const CustomCursor = lazy(() => import('./components/CustomCursor'));

export const App: React.FC = () => {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    return () => cleanup?.();
  }, []);

  return (
    <LazyMotion features={domAnimation} strict={false}>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-[#F4F4F2] bg-dot-grid text-[#121211] flex flex-col font-sans selection:bg-[#121211] selection:text-[#F4F4F2] relative">
          {/* Custom Cursor for fine desktop pointers only */}
          <Suspense fallback={null}>
            <CustomCursor />
          </Suspense>

          {/* 1. Floating Pill Navigation Bar */}
          <Navigation />

          {/* 2. Main Page Content */}
          <main className="flex-1 w-full pt-16 sm:pt-20" id="main-content">
            {/* Hero Section */}
            <Hero profile={developerProfile} />

            {/* Section 01: About & Leadership (Co-Founder @ Wayve Enterprises) */}
            <AboutSection profile={developerProfile} />

            {/* Section 02: Verified Repositories & Systems (Projects Showcase) */}
            <ProjectsSection projects={featuredProjects} />

            {/* Section 03: Specializations & Capabilities */}
            <SpecializationsSection />

            {/* Section 04: Laboratory Notes & Technical Thinking */}
            <TechnicalNotesSection />

            {/* Section 05: Professional Reachout & Contact */}
            <ContactSection profile={developerProfile} />
          </main>

          {/* 3. Footer with Monumental Dhyandev P Wordmark */}
          <Footer profile={developerProfile} />
        </div>
      </MotionConfig>
    </LazyMotion>
  );
};

export default App;
