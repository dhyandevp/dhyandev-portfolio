import { DeveloperProfile, Capability, TechnicalNote, Project } from '../types/portfolio';

export const developerProfile: DeveloperProfile = {
  name: "Dhyandev P.",
  handle: "dhyandevp",
  title: "Co-Founder @ Wayve Enterprises · Systems & ML Engineer",
  company: "Wayve Enterprises",
  role: "Co-Founder",
  location: "Kerala, India",
  timezone: "IST (UTC+05:30)",
  coordinates: "11.8745° N, 75.3704° E",
  bioSummary: "Co-Founder of Wayve Enterprises. I architect and build robust digital systems, turning complex technical workflows into scalable, high-performance software. Focused on resilient full-stack architecture, applied computer vision, edge AI, and self-hosted infrastructure.",
  email: "dhyandevp@proton.me",
  protonEmail: "dhyandevp@proton.me",
  secondaryEmail: "dhyandevp@proton.me",
  githubUrl: "https://github.com/dhyandevp",
  linkedinUrl: "https://linkedin.com/in/dhyandev-p-20659524a/",
  instagramUrl: "https://instagram.com/_.dhyandev._",
  linktreeUrl: "https://links.dhyandev.sbs",
  statusIndicator: "CO-FOUNDER @ WAYVE ENTERPRISES // ACCEPTING SELECTED CONTRACTS"
};

export const heroValueStatement = "Co-Founder at Wayve Enterprises. I architect and build robust digital systems, turning complex engineering workflows into measurable technical performance.";

export const featuredProjects: readonly Project[] = [
  {
    id: "flare-v2",
    code: "PRJ-01",
    title: "FLARE V2",
    subtitle: "Decentralized Disaster Telemetry & Early Warning System",
    category: "IoT & Embedded Systems",
    summary: "Decentralized, zero-cloud flood and landslide early warning system powered by ESP32 edge computing, sub-second WebSocket broadcasts, multi-sensor risk scoring, and native Android companion with hardware sirens.",
    problemStatement: "Traditional early warning systems depend on centralized cloud infrastructure that fails during severe storm surges, fiber cuts, and grid outages.",
    contribution: "Engineered ESP32 C++ firmware with local WebSocket broadcast server, multi-sensor environmental scoring, and native Kotlin Android companion app.",
    stack: ["ESP32", "C++", "WebSockets", "Kotlin", "Android", "Sensors"],
    status: "ACTIVE",
    year: "2026",
    image: "/images/flare_v2.webp",
    githubUrl: "https://github.com/dhyandevp/FLARE_V2",
    liveUrl: "https://github.com/dhyandevp/FLARE_V2",
    featured: true,
    metricsOrSpec: [
      { label: "Latency", value: "Sub-Second" },
      { label: "Architecture", value: "100% Offline-First" },
      { label: "Hardware", value: "ESP32 + Android" }
    ]
  },
  {
    id: "smartcity",
    code: "PRJ-02",
    title: "SmartCity IoT",
    subtitle: "Autonomous Urban Sensor Array & AI Analysis Hub",
    category: "IoT & Embedded Systems",
    summary: "Working smart city model with distributed wireless sensor nodes, Raspberry Pi 3B+ hub, automated AI analysis, and real-time live telemetry dashboard. Awarded Joint 3rd, A Grade at Kannur District Sasthrolsavam.",
    problemStatement: "Municipal sensor deployments require low-power mesh nodes capable of surviving intermittent packet loss and providing actionable city telemetry.",
    contribution: "Built distributed wireless sensor nodes, Raspberry Pi 3B+ central telemetry collector, Python AI analysis daemon, and live monitoring dashboard.",
    stack: ["Raspberry Pi 3B+", "Python 3", "Arduino", "ESP8266", "C++", "IoT"],
    status: "AWARDED",
    year: "2026",
    image: "/images/smartcity_dashboard.webp",
    githubUrl: "https://github.com/dhyandevp/smartcity",
    liveUrl: "https://github.com/dhyandevp/smartcity",
    featured: true,
    metricsOrSpec: [
      { label: "Hub", value: "Raspberry Pi 3B+" },
      { label: "Nodes", value: "Multi-Sensor" },
      { label: "Award", value: "Sasthrolsavam A Grade" }
    ]
  },
  {
    id: "lid-switch",
    code: "PRJ-03",
    title: "Lid Switch",
    subtitle: "GNOME Extension & Systemd Laptop Power Management CLI",
    category: "Systems & Open Source",
    summary: "Instant control over laptop lid-close behavior in GNOME 45–51+ and systemd Linux. Keeps compilation, downloads, audio, and docked setups running when laptop lid is closed without requiring root privileges.",
    problemStatement: "Closing a laptop lid on modern Linux distributions triggers an automatic system suspend, interrupting long running builds, servers, and downloads.",
    contribution: "Authored GNOME Shell JavaScript extension (GJS) and zero-root user space systemd inhibitor wrapper published on official GNOME Extensions.",
    stack: ["GNOME Shell (GJS)", "JavaScript", "Bash", "systemd", "Linux"],
    status: "PUBLISHED",
    year: "2026",
    image: "/images/lid_switch.webp",
    githubUrl: "https://github.com/dhyandevp/lid-switch",
    liveUrl: "https://extensions.gnome.org/extension/11675/lid-switch/",
    featured: true,
    metricsOrSpec: [
      { label: "GNOME Shell", value: "45 to 51+" },
      { label: "Security", value: "Zero-Root" },
      { label: "Distros", value: "Fedora / Arch / Ubuntu" }
    ]
  },
  {
    id: "drishya-sahayak",
    code: "PRJ-04",
    title: "DrishyaSahayak.ai",
    subtitle: "Assistive AI Perception for the Visually Impaired",
    category: "Computer Vision & AI",
    summary: "Real-time spatial perception and auditory navigation aid for visually impaired individuals, processing edge video streams at sub-50ms latency using OpenCV, Haar Cascade, and Python.",
    problemStatement: "Navigating unfamiliar spaces independently requires continuous obstacle awareness without requiring constant internet connectivity or cloud latency.",
    contribution: "Engineered real-time edge obstacle detection, spatial depth calculation, and local text-to-speech audio queuing running on portable embedded Linux hardware.",
    stack: ["Python", "OpenCV", "Edge AI", "pyttsx3", "Linux", "Computer Vision"],
    status: "ACTIVE",
    year: "2025",
    image: "/images/blind_aid.webp",
    githubUrl: "https://github.com/dhyandevp/Drishya_Sahayak.ai",
    liveUrl: "https://github.com/dhyandevp/Drishya_Sahayak.ai",
    featured: true,
    metricsOrSpec: [
      { label: "Latency", value: "<50ms" },
      { label: "Inference", value: "On-Device Edge" },
      { label: "Feedback", value: "Real-Time Audio" }
    ]
  },
  {
    id: "faceattend-ai",
    code: "PRJ-05",
    title: "FaceAttend.ai",
    subtitle: "Real-Time Face Recognition Attendance System",
    category: "Computer Vision & AI",
    summary: "Real-time face recognition-based attendance system built using Python and OpenCV. Uses Haar Cascade for face detection and LBPH for identification, providing a fast, contactless, and lightweight solution with automatic CSV attendance logging.",
    problemStatement: "Manual roll calls and biometric fingerprint scanners cause physical queues and sanitary concerns in academic and institutional settings.",
    contribution: "Built face embedding generation, vector distance matching, and local CSV audit trails with automated daily attendance reporting.",
    stack: ["Python", "OpenCV", "LBPH", "Haar Cascade", "CSV Logging", "Tkinter"],
    status: "DEPLOYED",
    year: "2026",
    image: "/images/faceattend_ai.webp",
    githubUrl: "https://github.com/dhyandevp/FaceAttend.ai",
    liveUrl: "https://github.com/dhyandevp/FaceAttend.ai",
    featured: true,
    metricsOrSpec: [
      { label: "Detection", value: "Haar Cascade" },
      { label: "Recognition", value: "LBPH" },
      { label: "Audit", value: "Automated CSV" }
    ]
  },
  {
    id: "e-ration-kerala",
    code: "PRJ-06",
    title: "E-Ration Kerala (ഇ-റേഷൻ)",
    subtitle: "Digital PDS Portal & Fair Price Shop Telemetry",
    category: "Full-Stack Systems",
    summary: "A modern, mobile-first digital platform for the Public Distribution System (PDS) in Kerala. Enables ration cardholders to verify monthly quota entitlements, check local stock at Fair Price Shops, order doorstep delivery or schedule 30-minute pickup slot tokens, with dealer fulfillment dashboard.",
    problemStatement: "Beneficiaries face long queues and uncertainty about ration item availability at local fair price shops.",
    contribution: "Architected Next.js 14 App Router portal with Supabase PostgreSQL, bilingual Malayalam/English interface, Leaflet shop discovery, and dealer tablet fulfillment dashboard.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "Zustand", "Leaflet"],
    status: "PROTOTYPE",
    year: "2026",
    image: "/images/eration_kerala.webp",
    githubUrl: "https://github.com/dhyandevp/e-ration-kerala",
    liveUrl: "https://github.com/dhyandevp/e-ration-kerala",
    featured: true,
    metricsOrSpec: [
      { label: "Compliance", value: "WCAG AA" },
      { label: "i18n", value: "Malayalam & English" },
      { label: "Database", value: "Supabase PostgreSQL" }
    ]
  },
  {
    id: "lock-555-timer",
    code: "PRJ-07",
    title: "NE555 Hardware Combination Lock",
    subtitle: "Pure Hardware Electronic Security State Machine",
    category: "IoT & Embedded Systems",
    summary: "Pure hardware, non-programmable electronic combination lock built on a breadboard using an NE555 timer IC in monostable mode with sequential transistor logic gates, trap reset circuits, and zero microcontrollers.",
    problemStatement: "Digital microcontroller locks are vulnerable to firmware glitches, side-channel attacks, and power brownouts.",
    contribution: "Designed discrete analog timing circuit, sequential transistor latching, flyback diode solenoid driver, and published comprehensive Falstad SPICE simulations.",
    stack: ["NE555 Timer IC", "Circuit Design", "BJT Transistors", "SPICE Simulation", "Discrete Hardware"],
    status: "VERIFIED",
    year: "2026",
    image: "/images/lock_555_timer.webp",
    githubUrl: "https://github.com/dhyandevp/Lock-Using-555-Timer",
    liveUrl: "https://github.com/dhyandevp/Lock-Using-555-Timer",
    featured: true,
    metricsOrSpec: [
      { label: "Architecture", value: "Non-Programmable" },
      { label: "Timing", value: "NE555 Monostable" },
      { label: "Security", value: "Trap Reset Circuit" }
    ]
  },
  {
    id: "zenith",
    code: "PRJ-08",
    title: "Zenith",
    subtitle: "Public Digital Museum & Universal AI Content Curation Engine",
    category: "Full-Stack Systems",
    summary: "A public digital museum for the internet. Discover, explore, and share curated artifacts — movies, games, books, software, music, and articles. Features universal AI search that classifies any search query or URL with metadata and bento grid layout.",
    problemStatement: "Curating digital media across fragmented services leaves personal libraries scattered and unarchived.",
    contribution: "Built universal search classifier, dynamic bento grid UI with keyboard navigation, and responsive Aurora Forest design system.",
    stack: ["Next.js 16", "TypeScript 5", "Tailwind CSS", "AI Curation", "Bento Grid"],
    status: "ACTIVE",
    year: "2026",
    image: "/images/cinematic_hero_1.webp",
    githubUrl: "https://github.com/dhyandevp/Zenith",
    liveUrl: "https://github.com/dhyandevp/Zenith",
    featured: true,
    metricsOrSpec: [
      { label: "Framework", value: "Next.js 16" },
      { label: "Design", value: "Bento Grid" },
      { label: "Search", value: "Universal AI" }
    ]
  },
  {
    id: "expenseflow",
    code: "PRJ-09",
    title: "ExpenseFlow",
    subtitle: "Shared Group Expense & Fair Settlement Engine",
    category: "Full-Stack Systems",
    summary: "Shared expense tracking and fairness scoring for groups, roommates, and teams. Built on Cloudflare Workers, React 18, and Firebase Firestore, using a greedy debt simplification algorithm to calculate net balances and settlement recommendations.",
    problemStatement: "Splitting group bills and tracking IOUs manually leads to awkward debt chasing and math errors.",
    contribution: "Implemented greedy debt graph simplification algorithm, Cloudflare Workers API with RS256 token minting, and hybrid Clerk auth with group code guest access.",
    stack: ["React 18", "TypeScript", "Cloudflare Workers", "Firebase Firestore", "Clerk", "Tailwind CSS"],
    status: "ACTIVE",
    year: "2026",
    image: "/images/expenseflow.webp",
    githubUrl: "https://github.com/dhyandevp/ExpenseFlow",
    liveUrl: "https://github.com/dhyandevp/ExpenseFlow",
    featured: true,
    metricsOrSpec: [
      { label: "Backend", value: "Cloudflare Workers" },
      { label: "Algorithm", value: "Greedy Debt Graph" },
      { label: "Sync", value: "Firestore Realtime" }
    ]
  },
  {
    id: "daaym-store",
    code: "PRJ-10",
    title: "daaym.store",
    subtitle: "High-End Minimalist E-Commerce Flagship",
    category: "Full-Stack Systems",
    summary: "High-contrast minimalist e-commerce flagship store with Next.js App Router, Firebase Firestore pinned to Mumbai (asia-south1), Cloudinary image optimization, and custom Telegram Bot integration for live inventory management.",
    problemStatement: "Traditional e-commerce templates are bulky and require complicated backend dashboards for simple stock updates.",
    contribution: "Engineered anti-boxy editorial design system, automated product description generation, and two-way Telegram Bot for mobile inventory updates.",
    stack: ["Next.js", "TypeScript", "Firebase Firestore", "Tailwind CSS", "Telegram Bot API"],
    status: "PRODUCTION",
    year: "2026",
    image: "/images/daaym_store.webp",
    githubUrl: "https://github.com/dhyandevp/daaym.store",
    liveUrl: "https://github.com/dhyandevp/daaym.store",
    featured: true,
    metricsOrSpec: [
      { label: "Server", value: "Mumbai (asia-south1)" },
      { label: "Inventory", value: "Telegram Bot Sync" },
      { label: "Delivery", value: "Cloudinary CDN" }
    ]
  },
  {
    id: "leewoods",
    code: "PRJ-11",
    title: "Lee Wood Interior",
    subtitle: "Architectural Interior Practice & Bespoke Joinery Platform",
    category: "Full-Stack Systems",
    summary: "Digital architectural showroom and bespoke joinery studio platform for Kannur practice. Features warm architectural minimalism, tropical modernism styling, WCAG 2.2 AA accessibility standards, and responsive portfolio catalog.",
    problemStatement: "High-end architectural studios require portfolio sites that convey physical material quality and proportion without generic template aesthetics.",
    contribution: "Crafted custom editorial design system with Playfair Display and Plus Jakarta Sans, high-contrast dark grounds (>15:1 ratio), and fluid project showcase routes.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Playfair Display", "WCAG 2.2"],
    status: "DEPLOYED",
    year: "2026",
    image: "/images/leewoods.webp",
    githubUrl: "https://github.com/dhyandevp/leewoods",
    liveUrl: "https://github.com/dhyandevp/leewoods",
    featured: true,
    metricsOrSpec: [
      { label: "Contrast", value: ">15:1 Ratio" },
      { label: "Aesthetic", value: "Tropical Modernism" },
      { label: "Accessibility", value: "WCAG 2.2 AAA" }
    ]
  },
  {
    id: "pk-reminder",
    code: "PRJ-12",
    title: "PK Reminder",
    subtitle: "Frictionless Student Academic Deadlines Board",
    category: "Full-Stack Systems",
    summary: "Frictionless student homework and exam reminder board built with React, Vite, Tailwind CSS, Google Cloud Firestore, and serverless admin API for instant class deadline tracking.",
    problemStatement: "Students miss assignment submissions when reminders are buried inside chat groups.",
    contribution: "Built zero-auth public student dashboard, password-protected admin portal for class representatives, and real-time Firestore synchronization.",
    stack: ["React", "Vite", "TypeScript", "Cloud Firestore", "Tailwind CSS"],
    status: "ACTIVE",
    year: "2026",
    image: "/images/pk_reminder.webp",
    githubUrl: "https://github.com/dhyandevp/PK-Reminder",
    liveUrl: "https://github.com/dhyandevp/PK-Reminder",
    featured: true,
    metricsOrSpec: [
      { label: "Latency", value: "Realtime Sync" },
      { label: "Auth", value: "Frictionless Public" },
      { label: "Database", value: "Cloud Firestore" }
    ]
  }
];

export const specializations: readonly Capability[] = [
  {
    id: "fullstack-systems",
    index: "01",
    category: "ENGINEERING",
    title: "Full-Stack & Systems",
    description: "I engineer scalable, type-safe digital platforms from database schema design to client state machines that stay resilient under pressure.",
    regularTech: ["TypeScript", "React", "Next.js", "Python", "FastAPI", "PostgreSQL", "Tailwind CSS"],
    exploringTech: ["Rust", "Go", "WebAssembly"]
  },
  {
    id: "ai-vision",
    index: "02",
    category: "APPLIED AI",
    title: "Computer Vision & Edge AI",
    description: "I build real-time visual perception and inference pipelines optimized for low-latency execution on edge and bare-metal hardware.",
    regularTech: ["Python", "OpenCV", "PyTorch", "YOLOv8", "TensorFlow Lite", "MediaPipe"],
    exploringTech: ["TensorRT", "ONNX Runtime", "Vision Transformers"]
  },
  {
    id: "infrastructure-linux",
    index: "03",
    category: "INFRASTRUCTURE",
    title: "Infrastructure & Security",
    description: "I deploy and manage bare-metal Linux servers, encrypted WireGuard mesh networks, and containerized zero-downtime environments.",
    regularTech: ["Linux (Fedora/Debian)", "Docker Compose", "WireGuard", "Nginx", "Pi-Hole", "Bash Scripting"],
    exploringTech: ["Kubernetes", "Ansible", "Terraform"]
  }
];

export const experienceHighlights = [
  {
    title: "Co-Founder @ Wayve Enterprises",
    detail: "Directing technical architecture, product execution, and applied AI systems for innovative high-performance digital ventures."
  },
  {
    title: "Real-Time Perception & Edge Optimization",
    detail: "Designing lightweight computer vision systems achieving sub-50ms inference latency without cloud-tethered dependency."
  },
  {
    title: "Offline-First & Local Data Sovereignty",
    detail: "Building client applications with IndexedDB synchronization that continue operating seamlessly through network dead zones."
  },
  {
    title: "Self-Hosted Infrastructure Architecture",
    detail: "Automating containerized private cloud workloads, encrypted split-tunnel VPN meshes, and DNS ad-blocking."
  }
];

export const technicalNotes: readonly TechnicalNote[] = [
  {
    id: "note-01",
    code: "NOTE_01",
    date: "2026",
    title: "Sub-50ms Edge Vision Pipeline Architecture",
    topic: "Computer Vision",
    description: "Optimizing frame ingestion buffers and luminance normalization for real-time edge hardware.",
    keyTakeaway: "Pre-equalizing histogram channels ensures high true-positive detection under extreme lighting shifts.",
    tags: ["OpenCV", "Python", "Edge Computing"]
  },
  {
    id: "note-02",
    code: "NOTE_02",
    date: "2026",
    title: "Zero-Latency Client State Machines & Offline Storage",
    topic: "Frontend Systems",
    description: "Utilizing deterministic state transitions and write-ahead IndexedDB logs for offline reliability.",
    keyTakeaway: "Decoupling event dispatch from state resolution prevents race conditions during reconnection.",
    tags: ["State Machines", "React", "IndexedDB"]
  }
];
