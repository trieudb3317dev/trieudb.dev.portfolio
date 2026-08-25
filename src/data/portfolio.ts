export const profile = {
  name: "Dang Binh Trieu",
  title: "Full-Stack Developer - Strong about Backend",
  tagline: "Building systems that scale — from pixel to production.",
  bio: "I'm a full-stack developer with 2+ years of experience crafting end-to-end web applications. I specialize in React, Node.js, and distributed systems, with a deep appreciation for clean architecture and developer experience. Currently building developer tooling at a Series B startup in Da Nang City.",
  objective: "Seeking challenging roles where I can design and build products that solve real problems at scale, while mentoring junior engineers and contributing to engineering culture.",
  location: "Danang City, Vietnam",
  email: "dangbinhtrieu@example.com",
  github: "https://github.com/dangbinhtrieu",
  linkedin: "https://linkedin.com/in/dangbinhtrieu",
  avatar: "https://res.cloudinary.com/dmdzyoslx/image/upload/v1777775640/my_images/cj8zjhwiqixvaiw5mjkm.png",
  resumeUrl: "#",
};

export const experiences = [
  {
    id: 1,
    company: "Ascend Analytics",
    position: "Senior Full-Stack Engineer",
    period: "Jan 2022 – Present",
    location: "Remote (Singapore HQ)",
    description: "Led the architecture and delivery of a real-time data pipeline dashboard serving 40k+ active users.",
    responsibilities: [
      "Designed microservices architecture using NestJS and event-driven messaging with Kafka",
      "Reduced API response times by 60% through Redis caching and query optimization",
      "Mentored a team of 4 junior engineers across frontend and backend tracks",
      "Introduced CI/CD pipelines and improved deployment frequency from weekly to daily",
    ],
    achievements: [
      "Shipped the analytics core product, generating $2M in ARR within 12 months",
      "Reduced infrastructure costs by 35% through Cloudflare + Neon migration",
    ],
    technologies: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Kafka", "TypeScript", "Docker"],
  },
  {
    id: 2,
    company: "Tiki Corporation",
    position: "Frontend Engineer",
    period: "Mar 2020 – Dec 2021",
    location: "Danang City, Vietnam",
    description: "Built and maintained consumer-facing features for Vietnam's leading e-commerce platform.",
    responsibilities: [
      "Developed reusable component library used across 5 product teams",
      "Implemented A/B testing infrastructure integrated with internal experimentation platform",
      "Improved Core Web Vitals scores, increasing LCP by 40% across product pages",
    ],
    achievements: [
      "Component library adopted by all frontend teams, reducing duplicate code by ~30%",
      "Received quarterly performance award for shipping checkout redesign on schedule",
    ],
    technologies: ["React", "TypeScript", "GraphQL", "Storybook", "Jest"],
  },
  {
    id: 3,
    company: "Freelance",
    position: "Web Developer",
    period: "Jun 2019 – Feb 2020",
    location: "Remote",
    description: "Delivered custom web solutions for SMBs across Southeast Asia.",
    responsibilities: [
      "Built client dashboards, landing pages, and admin panels from scratch",
      "Managed full project lifecycle from requirements gathering to deployment",
    ],
    achievements: [
      "Completed 12 projects with 100% client satisfaction rating on Upwork",
    ],
    technologies: ["Vue.js", "Laravel", "MySQL", "Tailwind CSS"],
  },
];

export const skillCategories = [
  {
    category: "Frontend",
    icon: "⬡",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Vue.js", level: 75 },
      { name: "GraphQL Client", level: 82 },
    ],
  },
  {
    category: "Backend",
    icon: "⬢",
    skills: [
      { name: "NestJS / Node.js", level: 90 },
      { name: "REST API Design", level: 93 },
      { name: "WebSocket / Socket.IO", level: 80 },
      { name: "Laravel / PHP", level: 70 },
      { name: "GraphQL Server", level: 78 },
    ],
  },
  {
    category: "Database",
    icon: "◈",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "Redis", level: 82 },
      { name: "TypeORM / Prisma", level: 85 },
      { name: "MySQL", level: 75 },
      { name: "MongoDB", level: 65 },
    ],
  },
  {
    category: "DevOps & Cloud",
    icon: "◎",
    skills: [
      { name: "Docker / Docker Compose", level: 85 },
      { name: "GitHub Actions / CI/CD", level: 88 },
      { name: "Vercel / Cloudflare", level: 90 },
      { name: "AWS (EC2, S3, RDS)", level: 72 },
      { name: "Kafka / Event-driven", level: 75 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "DevFolio CMS",
    slug: "devfolio-cms",
    category: "Full-Stack",
    status: "Live",
    featured: true,
    description: "A full-stack portfolio content management system with a public viewer mode and admin dashboard. Built with Next.js, NestJS, PostgreSQL, and JWT authentication. Powers personal developer portfolios as a self-hosted, cloud-friendly platform.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&auto=format",
    technologies: ["Next.js", "NestJS", "PostgreSQL", "TypeORM", "JWT", "Tailwind CSS", "Docker"],
    // Next.js, NestJS, PostgreSQL, TypeORM, JWT, Tailwind CSS, Docker
    features: [
      "Dual-mode architecture: public viewer + admin CMS",
      "JWT auth with HTTP-only cookies and refresh token rotation",
      "Real-time notifications via Socket.IO",
      "CRUD for projects, experience, skills, and contact messages",
      "Cloudinary integration for image upload and optimization",
    ],
    github: "https://github.com/dangbinhtrieu/devfolio-cms",
    demo: "https://devfolio.io",
    tags: ["Portfolio", "CMS", "Authentication", "Full-Stack"],
  },
  {
    id: 2,
    title: "StreamPulse",
    slug: "streampulse",
    category: "Data Engineering",
    status: "Live",
    featured: true,
    description: "Real-time analytics dashboard for streaming event data. Processes 50k+ events per second using Kafka, stores aggregated metrics in TimescaleDB, and visualizes live data through a React dashboard with WebSocket updates.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
    technologies: ["React", "NestJS", "Kafka", "TimescaleDB", "Socket.IO", "Redis", "Recharts"],
    features: [
      "50k+ events/sec processing with Kafka consumer groups",
      "Live dashboard with sub-second WebSocket updates",
      "Customizable time-window aggregations (1m, 5m, 1h, 1d)",
      "Alert rules engine with email and Slack notifications",
      "Multi-tenant architecture with workspace isolation",
    ],
    github: "https://github.com/dangbinhtrieu/streampulse",
    demo: "https://streampulse.app",
    tags: ["Analytics", "Kafka", "Real-time", "Dashboard"],
  },
  {
    id: 3,
    title: "CodeSandbox Clone",
    slug: "codesandbox-clone",
    category: "Developer Tools",
    status: "Beta",
    featured: false,
    description: "Browser-based code editor and execution environment supporting Node.js and React sandboxes. Features live preview, package installation via esm.sh CDN, and collaborative editing with Y.js CRDT.",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop&auto=format",
    technologies: ["React", "Monaco Editor", "Y.js", "WebRTC", "Node.js", "WebContainers"],
    features: [
      "Monaco editor with TypeScript IntelliSense",
      "Live React preview in sandboxed iframe",
      "Collaborative editing with operational transforms",
      "npm package resolution via esm.sh CDN",
      "Shareable sandbox URLs with embed support",
    ],
    github: "https://github.com/dangbinhtrieu/browser-ide",
    demo: "https://ide.dangbinhtrieu.dev",
    tags: ["IDE", "Collaboration", "React", "Developer Tools"],
  },
  {
    id: 4,
    title: "AuthKit",
    slug: "authkit",
    category: "Open Source",
    status: "Live",
    featured: false,
    description: "Production-ready NestJS authentication library with JWT access/refresh token rotation, RBAC, OAuth2, and rate limiting. Used by 200+ developers on npm. Includes CLI scaffolding for instant auth setup.",
    thumbnail: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=500&fit=crop&auto=format",
    technologies: ["NestJS", "TypeScript", "JWT", "Passport.js", "Redis", "PostgreSQL"],
    features: [
      "JWT with automatic refresh token rotation",
      "RBAC with fine-grained permission guards",
      "OAuth2 providers (Google, GitHub, Facebook)",
      "Redis-backed session invalidation",
      "CLI tool: `npx authkit init` for instant setup",
    ],
    github: "https://github.com/dangbinhtrieu/authkit",
    demo: "https://authkit.dev/docs",
    tags: ["Open Source", "Auth", "NestJS", "Security"],
  },
];

export const education = [
  {
    institution: "Donga University - Danang City, Vietnam",
    degree: "Information Technology — Software Engineering",
    period: "2021 – 2025",
    gpa: "3.7 / 4.0",
  },
];

export const certifications = [
  { name: "TOEIC", issuer: "At English Center", year: "2025" }
];
