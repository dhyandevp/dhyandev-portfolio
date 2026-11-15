import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SpecializationsSection } from './components/SpecializationsSection';
import { TechnicalNotesSection } from './components/TechnicalNotesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { developerProfile, featuredProjects } from './data/portfolioData';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white bg-dot-grid text-black flex flex-col font-sans selection:bg-black selection:text-white">
      {/* 1. Minimal Header & Side Badges */}
      <Navigation />

      {/* 2. Main Page Content */}
      <main className="flex-1 w-full" id="main-content">
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

      {/* 3. Minimal Footer */}
      <Footer profile={developerProfile} />
    </div>
  );
};

export default App;
