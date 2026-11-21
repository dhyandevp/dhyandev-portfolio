import React from 'react';
import { ContactSection } from '../components/ContactSection';
import { developerProfile } from '../data/portfolioData';

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full">
      {/* Complete Contact Hero Section with intake console & verified endpoints */}
      <ContactSection profile={developerProfile} isStandalonePage={true} />
    </div>
  );
};

export default ContactPage;
