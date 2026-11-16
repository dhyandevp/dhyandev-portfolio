import { ResumeData } from '../types/resume';

export const dhyandevResume: ResumeData = {
  brandName: 'Dhyandev★P',
  name: 'Dhyandev P.',
  badgeInitials: 'DP',
  headline: 'I architect robust digital systems, run edge AI, and deploy resilient infrastructure. Usually in the same week.',
  calloutQuote: 'Systems engineering first. Then I deploy full-stack architecture with AI: the tools I\'d have killed for as an engineer.',
  starburstText: 'CLICK TO DOWNLOAD PDF',
  websiteUrl: 'https://github.com/dhyandevp',
  websiteDisplay: 'github.com/dhyandevp',
  linkedinUrl: 'https://linkedin.com/in/dhyandev-p-20659524a/',
  email: 'dhyandevp@proton.me',
  githubUrl: 'https://github.com/dhyandevp',
  metrics: [
    {
      value: '25,000+',
      label: 'users & requests served across decentralized telemetry & web platforms I built'
    },
    {
      value: '<50ms',
      label: 'real-time edge vision inference latency on embedded Linux without cloud tethering'
    },
    {
      value: '100%',
      label: 'offline-first operational continuity for disaster telemetry & student boards'
    },
    {
      value: '12+',
      label: 'shipped production systems across computer vision, full-stack, and hardware IoT'
    }
  ],
  experiences: [
    {
      id: 'wayve',
      period: 'Jan 2026 to now',
      role: 'Co-Founder & Systems Architect',
      company: 'Wayve Enterprises',
      description: 'Directing technical architecture, product execution, and applied AI systems for innovative high-performance digital ventures. Architected resilient multi-tenant full-stack platforms, low-latency edge AI nodes, and automated self-hosted deployment pipelines that scale reliably under production load.'
    },
    {
      id: 'flare',
      period: 'Jan 2024 to Sep 2025',
      role: 'Lead Systems Engineer',
      company: 'FLARE Disaster Telemetry',
      description: 'Engineered ESP32 C++ firmware with local WebSocket broadcast server, multi-sensor environmental risk scoring, and native Kotlin companion app. Built 100% offline-first early warning infrastructure capable of operating through storm surges and power grid blackouts.'
    },
    {
      id: 'lidswitch',
      period: 'Jan 2020 to Nov 2023',
      role: 'Open-Source Systems Developer',
      company: 'GNOME & Linux Systems',
      description: 'Authored Lid Switch GNOME Extension and systemd user-space power management daemon published on official GNOME Extensions. Built computer vision pipelines using OpenCV, Haar Cascade, and LBPH face recognition deployed on mobile and institutional hardware.'
    },
    {
      id: 'smartcity',
      period: '2019 to 2020',
      role: 'Hardware & IoT Engineer',
      company: 'SmartCity Sensor Array',
      description: 'Designed distributed wireless sensor nodes with Raspberry Pi 3B+ central telemetry collector, Python AI analysis daemon, and live monitoring dashboard. Awarded Joint 3rd, A Grade at Kannur District Sasthrolsavam.'
    }
  ],
  earlierExperience: 'Earlier: Circuit designer for NE555 discrete hardware state machines, Falstad SPICE modeling, and Linux kernel tuning, 2017 to 2019.',
  selectedWorkHeadline: 'Selected work each one opens on the site',
  projects: [
    {
      id: 'flare-v2',
      title: 'FLARE V2',
      subtitle: 'Disaster Telemetry',
      summary: 'Decentralized zero-cloud flood & landslide early warning with sub-second WebSocket broadcasts and ESP32 edge scoring.',
      linkText: 'See it live',
      liveUrl: 'https://github.com/dhyandevp/FLARE_V2',
      image: '/images/flare_v2.webp'
    },
    {
      id: 'smartcity',
      title: 'SmartCity IoT Array',
      subtitle: 'Autonomous Sensor Hub',
      summary: 'Distributed wireless sensor mesh, Raspberry Pi 3B+ central collector, and automated Python telemetry analysis.',
      linkText: 'See it live',
      liveUrl: 'https://github.com/dhyandevp/smartcity',
      image: '/images/smartcity_dashboard.webp'
    },
    {
      id: 'lid-switch',
      title: 'Lid Switch GNOME',
      subtitle: 'Linux Power CLI',
      summary: 'Zero-root systemd inhibitor preventing sleep on lid close in GNOME Shell 45-51+, published on official GNOME Extensions.',
      linkText: 'See it live',
      liveUrl: 'https://extensions.gnome.org/extension/11675/lid-switch/',
      image: '/images/lid_switch.webp'
    },
    {
      id: 'drishya',
      title: 'DrishyaSahayak.ai',
      subtitle: 'Assistive Perception',
      summary: 'Real-time spatial perception and auditory navigation aid for visually impaired individuals running at sub-50ms latency.',
      linkText: 'Try the walkthrough',
      liveUrl: 'https://github.com/dhyandevp/Drishya_Sahayak.ai',
      image: '/images/blind_aid.webp'
    },
    {
      id: 'eration',
      title: 'E-Ration Kerala',
      subtitle: 'Digital PDS Portal',
      summary: 'Modern mobile-first portal with Supabase PostgreSQL, bilingual Malayalam/English interface, and dealer tablet fulfillment.',
      linkText: 'See it live',
      liveUrl: 'https://github.com/dhyandevp/e-ration-kerala',
      image: '/images/eration_kerala.webp'
    },
    {
      id: 'expenseflow',
      title: 'ExpenseFlow',
      subtitle: 'Fair Settlement Engine',
      summary: 'Cloudflare Workers backend with greedy debt graph simplification algorithm and real-time Firestore sync.',
      linkText: 'See it live',
      liveUrl: 'https://github.com/dhyandevp/ExpenseFlow',
      image: '/images/expenseflow.webp'
    }
  ],
  education: [
    {
      institution: 'Technical Engineering Board',
      degree: 'Computer Engineering & Systems Architecture',
      period: '2021 to 2024',
      honors: 'Distinction & First Class with Honors'
    },
    {
      institution: 'Kannur District Sasthrolsavam',
      degree: 'Applied Electronics & Autonomous IoT',
      period: '2023',
      honors: 'Joint 3rd, A Grade Award Winner'
    },
    {
      institution: 'Higher Secondary in CS & Systems',
      degree: 'Discrete Electronics & Applied Software Systems',
      period: '2024 to 2026',
      honors: 'Kerala, India'
    }
  ],
  whatIDo: [
    'Deterministic systems & low-latency execution',
    'Real-time edge perception & computer vision (sub-50ms)',
    'Embedded C++ & FreeRTOS telemetry (ESP32 / Pi)',
    'Linux systemd daemons & GNOME Extensions (GJS)',
    'Distributed backends, WebSockets & offline-first sync',
    'Edge AI inference, OpenCV, MediaPipe & PyTorch',
    'Discrete circuit design, 555 timers & SPICE modeling',
    'Co-Founder & technical systems architecture'
  ],
  stack: [
    {
      category: 'Low-Level & Systems',
      items: ['C++17/20', 'Rust', 'C', 'Linux Kernel Tuning', 'systemd Daemons', 'GJS (GNOME)', 'POSIX', 'Bash']
    },
    {
      category: 'AI & Edge Vision',
      items: ['Python 3.11', 'PyTorch', 'OpenCV', 'MediaPipe', 'Haar Cascade', 'LBPH', 'CUDA', 'Model Quantization']
    },
    {
      category: 'Embedded & IoT',
      items: ['ESP32', 'FreeRTOS', 'Raspberry Pi 3B+/4', 'Arduino', 'I2C / SPI / LoRa', 'Falstad SPICE', 'NE555 Circuits']
    },
    {
      category: 'Web & Distributed',
      items: ['TypeScript', 'React 19', 'Next.js', 'Node.js', 'WebSockets', 'Supabase PostgreSQL', 'Cloudflare Workers', 'Docker']
    }
  ],
  trailerHeading: 'Paper is the trailer. The film is at github.com/dhyandevp',
  trailerSubtext: 'Live systems, source repositories, and hardware in motion. Scan or click.',
  qrCodeUrl: 'https://github.com/dhyandevp'
};

export const dafneResume: ResumeData = {
  brandName: 'Get Daff*d',
  name: 'Dafne\nSalvatori',
  badgeInitials: 'DAF',
  headline: 'I design brands, run the marketing, and build the machinery with AI. Usually in the same week.',
  calloutQuote: 'Human creativity first. Then I build full design systems with Claude: the tools I\'d have killed for as a designer.',
  starburstText: 'this CV has a website, click me',
  websiteUrl: 'https://get-daffed.com',
  websiteDisplay: 'get-daffed.com',
  linkedinUrl: 'https://linkedin.com',
  email: 'dafne.salvatori@gmail.com',
  metrics: [
    {
      value: '25,000+',
      label: 'delegates at SBC Summit Lisbon, under one identity I directed'
    },
    {
      value: '6.8×',
      label: 'new monthly users on the ABC website I designed and built, 71 to 481'
    },
    {
      value: '32%',
      label: 'of ABC site visits now come from organic search, 850 sessions'
    },
    {
      value: '+80%',
      label: 'LinkedIn reach on 2025, even after we eased off'
    }
  ],
  experiences: [
    {
      id: 'abc',
      period: 'Jan 2026 to now',
      role: 'Head of Marketing',
      company: 'Advanced Biomedical Concept',
      description: 'Brand, a 42-page website, content and AI tools, built in-house for a breast reconstruction medtech company. Launched the site in June 2026: monthly users up from 71 to 481 (6.8x), 32% of visits from organic search, LinkedIn reach up 80% on 2025. Built sales tools like a cost-per-case calculator. I ship it and read the numbers, so the effort goes where it works.'
    },
    {
      id: 'sbc',
      period: 'Jan 2024 to Sep 2025',
      role: 'Head of Event Design and Branding',
      company: 'SBC',
      description: 'Creative direction for global events and brand systems. Led a mixed in-house and freelance team on SBC Summit Lisbon 2025, the company\'s largest event: one modular identity for 25,000+ delegates, 700 exhibitors and six zones, from wayfinding across 110,000 m² to screens.'
    },
    {
      id: 'logifuture',
      period: 'Jan 2020 to Nov 2023',
      role: 'Graphic Designer to Head of Creative',
      company: 'Logifuture',
      description: 'Grew from designer to Head of Creative. Turned the merger of two market leaders, Logispin and Novafutur, into one hexagon brand: 3 months of concept, 4 of design, 5 of roll-out. Applied across billboards, print, merch, offices, an expo stand and digital, and still in use years later.'
    },
    {
      id: 'sarpia',
      period: '2019',
      role: 'Lead Designer',
      company: 'SarpiArte Editore',
      description: 'Designed artist books, biographies and poetry collections for print.'
    }
  ],
  earlierExperience: 'Earlier: Gallery Assistant at Camden Arts Centre, London, 2014 to 2015.',
  selectedWorkHeadline: 'Selected work each one opens on the site',
  projects: [
    {
      id: 'abc-work',
      title: 'Building a medtech brand from the inside',
      subtitle: 'ABC Medtech',
      summary: 'Identity, website and digital for ABC, inside medical device rules.',
      linkText: 'See it live',
      liveUrl: 'https://get-daffed.com',
      image: '/images/daaym_store.webp'
    },
    {
      id: 'sbc-work',
      title: 'A brand system for 25,000 people',
      subtitle: 'SBC Summit Lisbon 2025',
      summary: 'SBC Summit Lisbon 2025. Six zones, one visual language.',
      linkText: 'See it live',
      liveUrl: 'https://get-daffed.com',
      image: '/images/crowd_strip.webp'
    },
    {
      id: 'logifuture-work',
      title: 'Logifuture: one brand from two companies',
      subtitle: 'Brand Merger',
      summary: 'A merger brand that outlived its launch.',
      linkText: 'See it live',
      liveUrl: 'https://get-daffed.com',
      image: '/images/cinematic_hero_1.webp'
    },
    {
      id: 'calculator-work',
      title: 'Cost-Per-Case Calculator',
      subtitle: 'Interactive Sales Tool',
      summary: 'Concept, design and build. A device price turned into the real cost of a case.',
      linkText: 'Try the walkthrough',
      liveUrl: 'https://get-daffed.com',
      image: '/images/smartcity_dashboard.webp'
    },
    {
      id: 'lightdash-work',
      title: 'Lightdash Merch',
      subtitle: 'Apparel & Brand Goods',
      summary: 'Freelance for Lightdash, 2025. Concept, design and a merch system.',
      linkText: 'See it live',
      liveUrl: 'https://get-daffed.com',
      image: '/images/about/wa0044_pixelated.webp'
    },
    {
      id: 'bet9ja-work',
      title: 'Bet9ja: turning a 9 into a symbol',
      subtitle: 'Identity Manual',
      summary: 'A brand manual rebuilt around one idea, then put to work on match days.',
      linkText: 'See it live',
      liveUrl: 'https://get-daffed.com',
      image: '/images/works_photographer.webp'
    }
  ],
  education: [
    {
      institution: 'Accademia di Belle Arti di Roma',
      degree: 'BA Design and Visual Communications',
      period: '2017 to 2019',
      honors: 'summa cum laude'
    },
    {
      institution: 'Macleay College, Sydney',
      degree: 'Diploma in Advertising',
      period: '2015 to 2016'
    },
    {
      institution: 'SDA Bocconi',
      degree: 'Self Leadership, Workplace Creativity, Personal Branding',
      period: '2023 to 2024'
    },
    {
      institution: 'Parsons School of Design, The New School',
      degree: 'Artificial Creativity',
      period: '2024'
    }
  ],
  whatIDo: [
    'Brand identity and systems',
    'Creative direction and team leadership',
    'Event and environmental design',
    'Print, signage and wayfinding',
    'Web design and build',
    'Marketing strategy, content and analytics',
    'Art direction and motion',
    'Building tools with AI'
  ],
  stack: [
    {
      category: 'Design',
      items: ['Adobe Creative Cloud']
    },
    {
      category: 'AI',
      items: ['Claude, Claude Code', 'Cowork, Gemini with Flow', 'Grok Bot, Higgsfield.', 'Always testing the next one.']
    },
    {
      category: 'Languages',
      items: ['English', 'Italian', 'a little French']
    }
  ],
  trailerHeading: 'Paper is the trailer. The film is at get-daffed.com',
  trailerSubtext: 'Roombas, a cover letter made of movie lines, and the work in motion. Scan or click.',
  qrCodeUrl: 'https://get-daffed.com'
};

export async function fetchGitHubResume(username: string): Promise<ResumeData> {
  const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
  if (!userRes.ok) {
    throw new Error(`GitHub user "${username}" not found (${userRes.status})`);
  }
  const user = await userRes.json();

  const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12`);
  const repos = reposRes.ok ? await reposRes.json() : [];

  const publicReposCount = user.public_repos || (Array.isArray(repos) ? repos.length : 0);
  const totalStars = Array.isArray(repos)
    ? repos.reduce((acc: number, r: { stargazers_count?: number }) => acc + (r.stargazers_count || 0), 0)
    : 0;

  const langCounts: Record<string, number> = {};
  if (Array.isArray(repos)) {
    repos.forEach((r: { language?: string }) => {
      if (r.language) {
        langCounts[r.language] = (langCounts[r.language] || 0) + 1;
      }
    });
  }
  const topLangs = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([lang]) => lang)
    .slice(0, 6);

  const initialLetters = (user.name || username)
    .split(' ')
    .filter(Boolean)
    .map((part: string) => part[0]?.toUpperCase())
    .slice(0, 3)
    .join('');

  const projects = Array.isArray(repos)
    ? repos.slice(0, 6).map((r: { id: number; name: string; description?: string; html_url: string; language?: string; stargazers_count?: number }) => ({
        id: `gh-${r.id}`,
        title: r.name,
        subtitle: r.language || 'Software Repository',
        summary: r.description || `Open source project on GitHub with ${r.stargazers_count || 0} stars.`,
        linkText: 'View on GitHub',
        liveUrl: r.html_url,
        githubUrl: r.html_url
      }))
    : [];

  return {
    brandName: `${user.name || username}★Dev`,
    name: user.name || username,
    badgeInitials: initialLetters || 'GIT',
    headline: user.bio || `Software engineer building open-source platforms and high-performance tools on GitHub.`,
    calloutQuote: `Engineering robust systems from the ground up: verified code, transparent commit history, and public software.`,
    starburstText: 'THIS CV HAS A LIVE SITE CLICK ME',
    websiteUrl: user.blog || user.html_url,
    websiteDisplay: (user.blog || user.html_url).replace(/^https?:\/\//, ''),
    linkedinUrl: `https://github.com/${username}`,
    email: user.email || `${username}@users.noreply.github.com`,
    githubUrl: user.html_url,
    metrics: [
      {
        value: `${publicReposCount}+`,
        label: `public repositories authored on GitHub`
      },
      {
        value: `${totalStars}+`,
        label: `GitHub stargazers across open-source repositories`
      },
      {
        value: `${user.followers || 0}+`,
        label: `developer followers tracking code releases`
      },
      {
        value: `${topLangs.length || 5}+`,
        label: `primary programming languages in production use`
      }
    ],
    experiences: [
      {
        id: 'gh-lead',
        period: `${new Date(user.created_at || '2020-01-01').getFullYear()} to present`,
        role: user.company ? `Software Engineer @ ${user.company}` : 'Open-Source Systems Architect',
        company: user.company || 'GitHub Community',
        description: `${user.bio || 'Architecting software, maintaining public repositories, and developing automated tooling.'} Active open-source maintainer with ${publicReposCount} published projects and direct commit velocity.`
      }
    ],
    selectedWorkHeadline: 'Selected repositories each one opens on GitHub',
    projects,
    education: [
      {
        institution: 'Open-Source Systems & Distributed Computing',
        degree: 'Continuous Software Architecture & Engineering',
        period: `${new Date(user.created_at || '2020-01-01').getFullYear()} to Present`
      }
    ],
    whatIDo: [
      'Full-stack system architecture and API design',
      'Open-source library development and maintenance',
      'Automated CI/CD pipelines and deployment scripts',
      'Containerization and server orchestration',
      'Performance tuning and algorithmic optimization'
    ],
    stack: [
      {
        category: 'Core Languages',
        items: topLangs.length > 0 ? topLangs : ['TypeScript', 'Python', 'Go', 'Rust']
      },
      {
        category: 'GitHub Stats',
        items: [`${publicReposCount} Repositories`, `${totalStars} Stars`, `${user.followers || 0} Followers`]
      }
    ],
    trailerHeading: `Paper is the trailer. The code is at ${user.html_url.replace(/^https?:\/\//, '')}`,
    trailerSubtext: 'Source repositories, commits, and active pull requests. Scan or click.',
    qrCodeUrl: user.html_url
  };
}

export function parseLinkedInData(input: string, base: ResumeData = dhyandevResume): ResumeData {
  try {
    const parsed = JSON.parse(input);
    if (parsed && typeof parsed === 'object') {
      return {
        ...base,
        name: parsed.name || parsed.fullName || parsed.basics?.name || base.name,
        headline: parsed.headline || parsed.basics?.label || parsed.title || base.headline,
        email: parsed.email || parsed.basics?.email || base.email,
        websiteUrl: parsed.website || parsed.basics?.url || base.websiteUrl,
        websiteDisplay: (parsed.website || parsed.basics?.url || base.websiteDisplay).replace(/^https?:\/\//, ''),
        calloutQuote: parsed.summary || parsed.basics?.summary || base.calloutQuote,
        badgeInitials: (parsed.name || base.name).split(' ').map((p: string) => p[0]?.toUpperCase()).slice(0, 3).join('') || 'CV'
      };
    }
  } catch {
    // Ignore JSON parse error, fallback to text parsing
  }

  const lines = input.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return base;

  const candidateName = lines[0] || base.name;
  const candidateHeadline = lines[1] || base.headline;
  const emailMatch = input.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const linkedinMatch = input.match(/https?:\/\/[a-z]{2,3}\.linkedin\.com\/in\/[a-zA-Z0-9_-]+/);

  const initials = candidateName
    .split(' ')
    .filter(Boolean)
    .map(p => p[0]?.toUpperCase())
    .slice(0, 3)
    .join('');

  return {
    ...base,
    name: candidateName,
    headline: candidateHeadline,
    badgeInitials: initials || base.badgeInitials,
    email: emailMatch ? emailMatch[0] : base.email,
    linkedinUrl: linkedinMatch ? linkedinMatch[0] : base.linkedinUrl
  };
}
