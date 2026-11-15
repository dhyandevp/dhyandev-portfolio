import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SpecializationsSection } from './components/SpecializationsSection';
import { TechnicalNotesSection } from './components/TechnicalNotesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { developerProfile } from './data/portfolioData';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-black selection:text-white">
      {/* 1. Minimal Header & Side Badges */}
      <Navigation />

      {/* 2. Main Page Content */}
      <main className="flex-1 w-full" id="main-content">
        {/* Hero Section matching Image 8 */}
        <Hero profile={developerProfile} />

        {/* Section 01: About & Development Specialist Ethos */}
        <AboutSection profile={developerProfile} />

        {/* Section 02: Specializations & Deliverables */}
        <SpecializationsSection />

        {/* Section 03: Laboratory Notes & Technical Thinking */}
        <TechnicalNotesSection />

        {/* Section 04: Professional Reachout & Contact */}
        <ContactSection profile={developerProfile} />
      </main>

      {/* 3. Minimal Footer */}
      <Footer profile={developerProfile} />
    </div>
  );
};

export default App;
