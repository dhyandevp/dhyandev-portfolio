import { DeveloperProfile, Capability, TechnicalNote } from '../types/portfolio';

export const developerProfile: DeveloperProfile = {
  name: "Dhyandev P.",
  handle: "dhyandevp",
  title: "Development Specialist",
  location: "Kerala, India",
  timezone: "IST (UTC+05:30)",
  coordinates: "11.8745° N, 75.3704° E",
  bioSummary: "I architect and build robust digital systems, turning complex technical workflows into scalable, high-performance software. Focused on resilient full-stack architecture, applied computer vision, and self-hosted infrastructure.",
  email: "dhyandev027@gmail.com",
  githubUrl: "https://github.com/dhyandevp",
  linkedinUrl: "https://linkedin.com/in/dhyandev-p-20659524a/",
  instagramUrl: "https://instagram.com/_.dhyandev._",
  linktreeUrl: "https://linktr.ee/DhyandevRTX",
  statusIndicator: "AVAILABLE // ACCEPTING SELECTED CLIENTS & CONTRACTS"
};

export const heroValueStatement = "I architect and build robust digital systems, turning complex engineering workflows into measurable technical performance.";

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
