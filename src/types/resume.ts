export interface StatMetric {
  value: string;
  label: string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  image?: string;
  linkText?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  honors?: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface ResumeData {
  // Brand & Identity
  brandName: string; // e.g. "Get Daff*d" or "Dhyandev*P"
  name: string; // e.g. "Dafne Salvatori" or "Dhyandev P."
  badgeInitials: string; // e.g. "DAF" or "DP"
  headline: string; // e.g. "I design brands, run the marketing, and build the machinery with AI..."
  calloutQuote: string; // e.g. "Human creativity first. Then I build..."
  starburstText: string; // e.g. "THIS CV HAS A LIVE SITE CLICK ME"

  // Contact & Links
  websiteUrl: string;
  websiteDisplay: string;
  linkedinUrl: string;
  email: string;
  githubUrl?: string;

  // Four Big Key Metrics
  metrics: [StatMetric, StatMetric, StatMetric, StatMetric];

  // Experience
  experiences: ExperienceItem[];
  earlierExperience?: string;

  // Selected Work (Page 2)
  selectedWorkHeadline?: string;
  projects: ProjectItem[];

  // 3-Column Footer Sections (Page 2)
  education: EducationItem[];
  whatIDo: string[];
  stack: {
    category: string;
    items: string[];
  }[];

  // Bottom Trailer Callout
  trailerHeading: string; // e.g. "Paper is the trailer. The film is at get-daffed.com"
  trailerSubtext: string;
  qrCodeUrl: string;
}

export type ResumePreset = 'dhyandev' | 'dafne' | 'custom';
export type PageMode = 'page1' | 'page2' | 'both' | 'continuous';
