import React from 'react';
import { AboutSection } from '../components/AboutSection';
import { ContactSection } from '../components/ContactSection';
import { developerProfile } from '../data/portfolioData';

export const AboutPage: React.FC = () => {
  return (
    <div className="w-full">

      {/* Complete About Section with photo collage and narratives */}
      <AboutSection profile={developerProfile} />

      {/* Reachout Section */}
      <ContactSection profile={developerProfile} />
    </div>
  );
};

export default AboutPage;
