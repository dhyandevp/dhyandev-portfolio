export type ProjectCategory =
  | 'Computer Vision & AI'
  | 'Full-Stack Systems'
  | 'Offline & Local-First'
  | 'Infrastructure & Systems'
  | 'Hardware & Firmware';

export type ProjectStatus = 'ACTIVE' | 'DEPLOYED' | 'STABLE' | 'EXPERIMENT';

export interface Project {
  readonly id: string;
  readonly code: string; // e.g. "PRJ-01"
  readonly title: string;
  readonly subtitle: string;
  readonly category: ProjectCategory;
  readonly summary: string;
  readonly problemStatement: string;
  readonly contribution: string;
  readonly stack: readonly string[];
  readonly status: ProjectStatus;
  readonly year: string;
  readonly image?: string;
  readonly githubUrl?: string;
  readonly liveUrl?: string;
  readonly featured: boolean;
  readonly metricsOrSpec: readonly { label: string; value: string }[];
}

export interface Capability {
  readonly id: string;
  readonly index: string; // e.g. "01"
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly image?: string;
  readonly regularTech: readonly string[];
  readonly exploringTech: readonly string[];
}

export interface TechnicalNote {
  readonly id: string;
  readonly code: string; // e.g. "NOTE_402"
  readonly date: string;
  readonly title: string;
  readonly topic: string;
  readonly description: string;
  readonly keyTakeaway: string;
  readonly tags: readonly string[];
}

export interface DeveloperProfile {
  readonly name: string;
  readonly handle: string;
  readonly title: string;
  readonly role?: string;
  readonly company?: string;
  readonly location: string;
  readonly timezone: string;
  readonly coordinates: string;
  readonly bioSummary: string;
  readonly email: string;
  readonly githubUrl: string;
  readonly linkedinUrl: string;
  readonly instagramUrl: string;
  readonly linktreeUrl: string;
  readonly statusIndicator: string;
}
