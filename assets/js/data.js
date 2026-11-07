// All site content lives here. Edit this file to update the portfolio – no layout code changes needed.
window.PORTFOLIO = {
  profile: {
    name: "Ragul Jayaraj",
    status: "Software Engineer at UST · Trivandrum, Kerala",
    headline: ["GenAI Backend", "Engineer"],
    tagline: "Building scalable AI agents & backend systems",
    stack: ["FastAPI", "Temporal", "Redis", "SQLAlchemy"],
    intro:
      "I'm Ragul Jayaraj. At UST I work on agent orchestration, responsible-AI guardrails that keep personal data and harmful content away from models, and services that keep running when the systems around them fail.",
    // skills that orbit the profile photo (inner ring first)
    orbit: [
      { label: "FastAPI", color: "#22d3ee" },
      { label: "Temporal", color: "#818cf8" },
      { label: "RAG", color: "#93c5fd" },
    ],
    email: "j.ragul315@gmail.com",
    links: {
      github: "https://github.com/ragul315",
      linkedin: "https://www.linkedin.com/in/ragul315",
    },
  },

  about: {
    heading: "I like knowing why a system works, not just that it does.",
    paragraphs: [
      "I'm a software engineer at UST, working on the backend side of generative AI. A big part of my work is responsible AI: PII protection with Microsoft `Presidio`, and a content-moderation layer built so different content-safety providers can be swapped in (it runs on `Azure AI Content Safety` today). I also build task-oriented AI agents orchestrated with `Temporal`.",
      "I spend a lot of time on the failure cases: retries that don't turn into retry storms, circuit breakers, and caching that takes pressure off the database. Outside work I'm digging deeper into RAG and the Model Context Protocol, and I post short explainers about what I learn on LinkedIn.",
    ],
    facts: [
      ["Role", "Software Engineer, UST"],
      ["Works on", "Responsible AI, AI agents, backend reliability"],
      ["Main stack", "Python, FastAPI, Temporal, SQLAlchemy, Redis"],
      ["Studied", "B.E. Computer Science, Dr. Mahalingam College"],
      ["Based in", "Trivandrum, Kerala"],
    ],
  },

  architecture: {
    subtitle: "A typical agent backend I work on. Select a component to see its role.",
    width: 1000,
    height: 390,
    groups: [{ label: "Governance", nodes: ["pii", "safety"] }],
    // x/y are positions on a 1000 x 390 canvas; arrows and the group box are computed from them
    nodes: [
      { id: "user", label: "User", icon: "user", x: 50, y: 200, color: "#60a5fa",
        detail: "Requests come in from a client app or another service." },
      { id: "fastapi", label: "FastAPI", icon: "zap", x: 160, y: 200, color: "#22d3ee",
        detail: "Typed FastAPI endpoints. Pydantic models reject bad input at the edge." },
      { id: "pii", label: "PII masking", icon: "shield", x: 270, y: 200, color: "#fbbf24",
        detail: "Microsoft Presidio detects and masks personal data before any text reaches a model. Callers choose the entity types, and custom recognizers cover Aadhaar, PAN and GSTIN." },
      { id: "safety", label: "Content safety", icon: "flag", x: 380, y: 200, color: "#fb923c",
        detail: "Content moderation built on a provider factory, so content-safety providers are selected by configuration. It runs on Azure AI Content Safety today." },
      { id: "temporal", label: "Temporal", icon: "branch", x: 500, y: 200, color: "#818cf8", hub: true,
        detail: "Temporal orchestrates long-running work with retry policies, so a failed activity is retried instead of the whole workflow starting over." },
      { id: "agent", label: "AI Agent", icon: "cpu", x: 640, y: 70, color: "#a78bfa",
        detail: "Task-oriented AI agents that plan the work and decide which steps and tools to run." },
      { id: "llm", label: "LLM", icon: "sparkle", x: 790, y: 70, color: "#93c5fd",
        detail: "The agent calls the LLM to reason over the task and generate a response." },
      { id: "output", label: "Validated output", icon: "check", x: 920, y: 70, color: "#38bdf8",
        detail: "Model output is parsed into Pydantic schemas before anything downstream uses it." },
      { id: "tools", label: "Tools", icon: "wrench", x: 640, y: 200, color: "#cbd5e1",
        detail: "The agent calls external tools as part of a task." },
      { id: "redis", label: "Redis", icon: "grid", x: 640, y: 330, color: "#f87171",
        detail: "Redis caches agent system prompts with a TTL, so repeated reads skip the source." },
      { id: "database", label: "Database", icon: "database", x: 790, y: 330, color: "#4ade80",
        detail: "SQLAlchemy ORM with the database chosen by configuration. Tested on PostgreSQL and MSSQL." },
    ],
    edges: [
      ["user", "fastapi"], ["fastapi", "pii"], ["pii", "safety"], ["safety", "temporal"],
      ["temporal", "agent"], ["temporal", "tools"], ["temporal", "redis"],
      ["agent", "llm"], ["llm", "output"], ["redis", "database"],
    ],
  },

  contact: {
    heading: "Say hello",
    text: "Got a question, an idea, or something you'd like to build? I'd love to hear from you. Email is the quickest way to reach me, and I usually reply within a day or two.",
  },

  experience: [
    {
      company: "UST",
      title: "Software Engineer",
      type: "Full-time",
      period: "Dec 2025 – Present",
      location: "Trivandrum, Kerala · On-site",
      logo: "assets/img/ust.webp",
      highlights: [
        "Sole implementer of a centralized responsible-AI governance service: `Presidio` Analyzer and Anonymizer running as Docker services, caller-selected entity types, and custom recognizers for Aadhaar, PAN and GSTIN.",
        "Designed the service to fail closed: `Presidio` calls are retried three times behind a circuit breaker, and the API returns an error instead of unredacted text when the provider stays unavailable.",
        "Integrated `Azure AI Content Safety` moderation through provider and response-handler factories and a DecisionEngine that returns ALLOW or BLOCK from configurable thresholds. Five backend services use the PII protection and three use moderation.",
        "Enhanced a document-processing pipeline as a primary contributor in a two-person team: configurable 80-chunk windows, externalized workflow payloads, `asyncio` concurrency limits, and PostgreSQL + `pgvector` hybrid retrieval. On a 500 MB test document, observed memory fell from about 8 GB to about 3 GB (62.5%) in a development Kubernetes environment.",
        "Added `Temporal` RetryPolicy to failed activities in an existing AI agent backend, and integrated `LiteLLM` with `Pydantic` validation of LLM JSON output.",
        "Implemented `Redis` cache-aside with TTL expiry for agent system prompts, and converted raw SQL to `SQLAlchemy` ORM with the database chosen by environment configuration, tested on PostgreSQL and MSSQL.",
      ],
      tags: ["Python", "FastAPI", "Temporal", "Pydantic", "Presidio", "Azure AI Content Safety", "SQLAlchemy", "Redis", "PostgreSQL", "pgvector"],
    },
    {
      company: "Onwords Smart Solution",
      title: "Embedded Software Engineer",
      type: "Internship",
      period: "Jun 2023 – Jul 2023",
      location: "Pollachi, Tamil Nadu · On-site",
      logo: "assets/img/onwords.webp",
      highlights: [
        "Developed embedded software that reads water-level sensor measurements and publishes telemetry over `MQTT`.",
        "Implemented automatic pump ON/OFF control from water-level readings, coded and tested on `ESP32` and FireBeetle boards.",
      ],
      tags: ["Embedded C", "ESP32", "MQTT", "IoT"],
    },
  ],

  // category values drive the project filter chips
  projects: [
    {
      name: "Finovo",
      category: "backend",
      featured: true,
      period: "Jan 2026",
      summary:
        "Loan management system for microfinance. Async `FastAPI` backend and a `React` app covering loan origination, EMI schedules, ledger accounting, audits and payments.",
      highlights: [
        "Hash-chain audit log for tamper-evident admin operations",
        "Double-entry ledger with strict accounting invariants",
        "`Stripe` payment integration for repayments",
        "`Gemini`-powered assistant with scoped access to loan profiles",
      ],
      tech: ["FastAPI", "MongoDB", "Beanie", "React", "TypeScript", "Stripe", "Gemini"],
      repo: "https://github.com/ragul315/Finovo",
      note: "Team project",
    },
    {
      name: "Student Task Management System",
      category: "fullstack",
      period: "2026",
      summary:
        "Teacher/student task platform with role-based access, `OAuth2` + `JWT` auth and real-time status tracking.",
      highlights: ["RBAC for teachers vs. students", "`Pytest` backend tests, `Jest` + RTL frontend tests"],
      tech: ["FastAPI", "Pydantic", "Pytest", "React", "TypeScript", "Vite"],
      repo: "https://github.com/ragul315/Student-Task-Management-System",
    },
    {
      name: "Food Ordering App",
      category: "fullstack",
      period: "2026",
      summary:
        "Food ordering with separate customer and admin flows, `JWT` sessions, debounced live search and server-side pagination.",
      highlights: ["`Pydantic` validation at the API boundary", "Dual-role UI: cart/orders vs. inventory/fulfilment"],
      tech: ["FastAPI", "Pydantic", "JWT", "React", "TypeScript"],
      repo: "https://github.com/ragul315/Food-Ordering-App",
    },
    {
      name: "AI Voice Assistant for PC",
      category: "ai",
      period: "Feb 2024 – Apr 2024",
      summary:
        "Hands-free PC assistant: speech recognition, NLP intent handling, system control, live API data and text-to-speech replies.",
      highlights: ["Accessibility-focused voice control", "Team project with college peers"],
      tech: ["Python", "NLTK", "TensorFlow", "Speech Recognition", "gTTS"],
      repo: "https://github.com/ragul315/voice-assistant",
    },
    {
      name: "Tamil Text-to-Speech",
      category: "ai",
      period: "Dec 2024 – Apr 2025",
      summary: "Research project experimenting with the `Tacotron` deep-learning model to convert Tamil text directly into speech.",
      highlights: [],
      tech: ["Python", "Tacotron", "Deep Learning"],
      repo: null,
      note: "Research project",
    },
    {
      name: "Invoice Generator",
      category: "fullstack",
      period: "Oct 2023 – Nov 2023",
      summary: "Desktop app for item management and invoice generation with database storage and document export.",
      highlights: [],
      tech: ["Python", "MySQL", "Tkinter"],
      repo: "https://github.com/ragul315/invoice-generator",
    },
    {
      name: "Water Tank Automation",
      category: "iot",
      period: "Jun 2023 – Jul 2023",
      summary:
        "IoT tank monitor with remote monitoring, auto-calibration of tank size, automated pump control and overflow protection.",
      highlights: [],
      tech: ["ESP8266", "MQTT", "C++", "Pressure sensor"],
      repo: "https://github.com/ragul315/Water-Tank-Automation-PressureSensor",
    },
    {
      name: "Hall Automation",
      category: "iot",
      period: "Jan 2023 – Mar 2023",
      summary:
        "Meeting-hall system that switches lights, fans, AC and projectors on schedule, with a web booking interface and real-time notifications.",
      highlights: [],
      tech: ["ESP8266", "Firebase", "JavaScript", "Embedded C"],
      repo: "https://github.com/ragul315/hall-automation",
    },
  ],

  projectFilters: [
    { id: "all", label: "All" },
    { id: "backend", label: "Backend & GenAI" },
    { id: "fullstack", label: "Full-stack" },
    { id: "ai", label: "AI / ML" },
    { id: "iot", label: "IoT & Embedded" },
  ],

  skills: [
    { group: "GenAI & Agents", items: ["AI Agents", "Model Context Protocol (MCP)", "LLM response validation", "RAG", "LiteLLM"] },
    { group: "Responsible AI", items: ["AI governance", "PII protection (Presidio)", "Content moderation", "Azure AI Content Safety"] },
    { group: "Backend", items: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "REST APIs", "Temporal"] },
    { group: "Data", items: ["PostgreSQL", "MSSQL", "MongoDB", "MySQL", "Redis"] },
    { group: "Reliability", items: ["Circuit breakers", "Retries & backoff", "Caching", "Performance tuning"] },
    { group: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML & CSS"] },
    { group: "Tooling", items: ["Docker", "Git", "Linux", "Pytest", "Postman"] },
  ],

  writing: {
    subtitle: "Short technical explainers I've published on LinkedIn.",
    posts: [
      { title: "Latency vs. Throughput vs. Bandwidth",
        blurb: "Three network metrics that get mixed up, and the bottleneck each one points to.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7485317801855852544/" },
      { title: "Understanding Throughput",
        blurb: "How throughput is measured across APIs, databases, distributed systems and LLMs.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7482418667234983936/" },
      { title: "How to Stop Cascading Failures: Circuit Breakers vs. Retries",
        blurb: "When to retry, when to fail fast, and why the two belong together.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7479874304495779840/" },
    ],
  },

  education: [
    {
      school: "Dr. Mahalingam College of Engineering and Technology",
      degree: "B.E. Computer Science and Engineering",
      period: "2021 – 2025",
      detail: "CGPA 8.0",
    },
  ],

  leadership: [
    { role: "Joint Secretary", org: "DigiFlash, the CSE department club", period: "Jul 2023 – Jun 2024" },
    { role: "Class Representative", org: "Dr. Mahalingam College of Engineering and Technology", period: "Jun 2022 – Jun 2023" },
  ],

  certifications: [
    { name: "Database and SQL", issuer: "Infosys Springboard", year: "2024" },
    { name: "MySQL (Basic)", issuer: "HackerRank", year: "2024" },
    { name: "The Joy of Computing Using Python (Elite + Silver)", issuer: "NPTEL", year: "2023" },
    { name: "Python (Basic)", issuer: "HackerRank", year: "2023" },
    { name: "Introduction to Programming in C", issuer: "NPTEL", year: "2022" },
  ],
};
