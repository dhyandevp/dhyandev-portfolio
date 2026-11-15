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
  email: "dhyandev027@gmail.com",
  githubUrl: "https://github.com/dhyandevp",
  linkedinUrl: "https://linkedin.com/in/dhyandev-p-20659524a/",
  instagramUrl: "https://instagram.com/_.dhyandev._",
  linktreeUrl: "https://linktr.ee/DhyandevRTX",
  statusIndicator: "CO-FOUNDER @ WAYVE ENTERPRISES // ACCEPTING SELECTED CONTRACTS"
};

export const heroValueStatement = "Co-Founder at Wayve Enterprises. I architect and build robust digital systems, turning complex engineering workflows into measurable technical performance.";

export const featuredProjects: readonly Project[] = [
  {
    id: "drishya-sahayak",
    code: "PRJ-01",
    title: "DrishyaSahayak.ai",
    subtitle: "Assistive AI Perception for the Visually Impaired",
    category: "Computer Vision & AI",
    summary: "Real-time spatial perception and auditory navigation aid for visually impaired individuals, processing edge video streams at sub-50ms latency using OpenCV and lightweight neural nets.",
    problemStatement: "Navigating unfamiliar spaces independently requires continuous obstacle awareness without requiring constant internet connectivity or cumbersome cloud latency.",
    contribution: "Engineered real-time edge obstacle detection, spatial depth calculation, and local text-to-speech audio queuing running on portable embedded Linux hardware.",
    stack: ["Python", "OpenCV", "YOLOv8", "Edge AI", "pyttsx3", "Linux"],
    status: "ACTIVE",
    year: "2025",
    image: "/images/blind_aid.webp",
    githubUrl: "https://github.com/dhyandevp/DrishyaSahayak.ai",
    liveUrl: "https://github.com/dhyandevp/DrishyaSahayak.ai",
    featured: true,
    metricsOrSpec: [
      { label: "Latency", value: "<45ms" },
      { label: "Inference", value: "Local Edge" },
      { label: "Architecture", value: "YOLOv8 + OpenCV" }
    ]
  },
  {
    id: "faceattend-ai",
    code: "PRJ-02",
    title: "FaceAttend.ai",
    subtitle: "Real-Time Biometric On-Device Attendance Pipeline",
    category: "Computer Vision & AI",
    summary: "High-accuracy real-time facial recognition and anti-spoofing attendance system operating completely on-premise without cloud latency or third-party exposure.",
    problemStatement: "Traditional biometric hardware creates physical bottlenecks and SaaS facial attendance providers risk sensitive biometric data exposure.",
    contribution: "Built 128-d face embedding generation, vector distance matching, and local SQLite audit trails with automated daily attendance reporting.",
    stack: ["Python", "MediaPipe", "Face Recognition", "FastAPI", "SQLite", "OpenCV"],
    status: "DEPLOYED",
    year: "2025",
    image: "/images/faceattend_ai.webp",
    githubUrl: "https://github.com/dhyandevp/FaceAttend.ai",
    liveUrl: "https://github.com/dhyandevp/FaceAttend.ai",
    featured: true,
    metricsOrSpec: [
      { label: "Accuracy", value: "99.2%" },
      { label: "Matching", value: "Sub-100ms" },
      { label: "Storage", value: "Local Encrypted" }
    ]
  },
  {
    id: "smartcity-iot",
    code: "PRJ-03",
    title: "SmartCity IoT",
    subtitle: "Autonomous Urban Environmental & Traffic Telemetry",
    category: "Infrastructure & Systems",
    summary: "Distributed IoT sensor network architecture streaming ambient telemetry, air quality metrics, and municipal load data to centralized real-time monitoring dashboards.",
    problemStatement: "Urban municipal infrastructure requires low-power telemetry sensors capable of surviving power cuts and intermittent packet loss.",
    contribution: "Designed multi-node ESP32 telemetry arrays communicating over MQTT/LoRa with automated Grafana visualization and emergency threshold alerts.",
    stack: ["ESP32", "MQTT", "Node.js", "Grafana", "InfluxDB", "C++"],
    status: "STABLE",
    year: "2025",
    image: "/images/iot_project.webp",
    githubUrl: "https://github.com/dhyandevp/smartcity",
    liveUrl: "https://github.com/dhyandevp/smartcity",
    featured: true,
    metricsOrSpec: [
      { label: "Sensors", value: "Multi-Node" },
      { label: "Protocol", value: "MQTT / LoRa" },
      { label: "Uptime", value: "99.9%" }
    ]
  },
  {
    id: "noaa-satellite-ground-station",
    code: "PRJ-04",
    title: "NOAA Satellite SDR Station",
    subtitle: "Autonomous Weather Satellite RF Reception & Decoding",
    category: "Infrastructure & Systems",
    summary: "Automated software-defined radio ground tracking station decoding high-resolution APT/HRPT meteorological imagery directly from NOAA-15, 18, and 19 polar-orbiting satellites.",
    problemStatement: "Accessing raw meteorological telemetry during severe weather events without relying on commercial internet infrastructure.",
    contribution: "Constructed double cross-dipole antenna, tuned low-noise amplifiers, and scripted automated Doppler shift frequency tracking via RTL-SDR and WXtoImg.",
    stack: ["RTL-SDR", "Python", "WXtoImg", "Signal Processing", "Linux CLI"],
    status: "EXPERIMENT",
    year: "2025",
    image: "/images/noaa_satellite.webp",
    githubUrl: "https://github.com/dhyandevp",
    liveUrl: "https://github.com/dhyandevp",
    featured: true,
    metricsOrSpec: [
      { label: "Frequency", value: "137.1 MHz" },
      { label: "Telemetry", value: "Direct APT" },
      { label: "Antenna", value: "V-Dipole / QFH" }
    ]
  },
  {
    id: "force-feedback-wheel",
    code: "PRJ-05",
    title: "Force-Feedback Racing Simulator",
    subtitle: "Custom Engineered 900° Sim Controller & Firmware",
    category: "Hardware & Firmware",
    summary: "Custom engineered 900-degree rotation sim racing steering system with tactile force-feedback actuators, calibrated optical encoders, and responsive HID microcontroller firmware.",
    problemStatement: "Commercial direct-drive simulation equipment is prohibitively expensive while entry-level hardware lacks precision feedback and durability.",
    contribution: "Built custom PCB, authored C++ DirectInput HID firmware with PID control loop running at 1000Hz USB polling rate, and designed rigid structural mounts.",
    stack: ["Arduino / ATmega32U4", "C++", "PID Control", "DirectInput", "SolidWorks"],
    status: "STABLE",
    year: "2024",
    image: "/images/gaming_wheel.webp",
    githubUrl: "https://github.com/dhyandevp",
    liveUrl: "https://github.com/dhyandevp",
    featured: true,
    metricsOrSpec: [
      { label: "Rotation", value: "900°" },
      { label: "Poll Rate", value: "1000 Hz" },
      { label: "Interface", value: "USB HID" }
    ]
  },
  {
    id: "flare-v2",
    code: "PRJ-06",
    title: "FLARE_V2",
    subtitle: "Decentralized Zero-Trust Architecture",
    category: "Full-Stack Systems",
    summary: "Distributed zero-trust infrastructure model with end-to-end encrypted packet relays, automated mesh networking, and client-side cryptographic key verification.",
    problemStatement: "Centralized VPN concentration points create single points of failure and surveillance bottlenecks in multi-region deployments.",
    contribution: "Implemented decentralized WireGuard peer handshake protocols and automated NAT hole-punching for seamless peer-to-peer tunnels.",
    stack: ["TypeScript", "Rust", "WireGuard", "Cryptography", "Docker"],
    status: "ACTIVE",
    year: "2026",
    image: "/images/sass_security.webp",
    githubUrl: "https://github.com/dhyandevp/FLARE_V2",
    liveUrl: "https://github.com/dhyandevp/FLARE_V2",
    featured: true,
    metricsOrSpec: [
      { label: "Architecture", value: "Zero-Trust" },
      { label: "Encryption", value: "ChaCha20" },
      { label: "Relay", value: "Mesh P2P" }
    ]
  },
  {
    id: "vision-robotics",
    code: "PRJ-07",
    title: "Autonomous Vision Robotics",
    subtitle: "Mobile Robot Platform with Spatial Obstacle Mapping",
    category: "Computer Vision & AI",
    summary: "Compact autonomous mobile robotic platform utilizing onboard stereo vision, spatial depth mapping, and obstacle avoidance algorithms for unassisted indoor navigation.",
    problemStatement: "Indoor mobile robots often depend on expensive LiDAR units which add weight, high power draw, and mechanical failure risks.",
    contribution: "Programmed stereo disparity depth map calculation and differential drive kinematics in ROS and Python on low-power edge compute boards.",
    stack: ["ROS", "Python", "OpenCV", "Raspberry Pi", "Motor Control"],
    status: "EXPERIMENT",
    year: "2025",
    image: "/images/ai_robot.webp",
    githubUrl: "https://github.com/dhyandevp",
    liveUrl: "https://github.com/dhyandevp",
    featured: true,
    metricsOrSpec: [
      { label: "Mapping", value: "Stereo Vision" },
      { label: "Controller", value: "Differential Drive" },
      { label: "Power", value: "12V Li-Ion" }
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
