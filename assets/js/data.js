// All site content lives here. Edit this file to update the portfolio – no layout code changes needed.
window.PORTFOLIO = {
  profile: {
    name: "Ragul Jayaraj",
    role: "GenAI Backend Engineer",
    company: "UST",
    location: "Tamil Nadu, India",
    email: "j.ragul315@gmail.com",
    links: {
      github: "https://github.com/ragul315",
      linkedin: "https://www.linkedin.com/in/ragul315",
    },
  },

  experience: [
    {
      company: "UST",
      title: "Software Engineer",
      type: "Full-time",
      period: "Dec 2025 – Present",
      location: "Trivandrum, Kerala · On-site",
      logo: null,
      highlights: [
        "Built responsible-AI (AI governance) guardrails for LLM pipelines: real-time PII protection with Microsoft `Presidio`, and a content-moderation layer designed with the Factory pattern so new content-safety providers plug in without changing callers. It currently runs on `Azure AI Content Safety`.",
        "Engineered distributed workflow orchestration on `Temporal` with customized retry mechanisms, giving fault-tolerant, deterministic execution for async backend processes and AI agents.",
        "Implemented circuit breaker and retry mechanisms to improve fault tolerance, protecting workflows from downstream service failures.",
        "Built deterministic LLM response structuring and validation layers with `Pydantic`, turning unpredictable model output into type-safe data.",
        "Refactored a legacy data layer from hardcoded SQL to a modular, multi-database `SQLAlchemy` ORM architecture, removing `MSSQL` vendor lock-in.",
        "Implemented `Redis` caching for high-frequency reads such as system prompts, cutting database cost and speeding up prompt retrieval.",
        "Diagnosed and resolved high-priority production bottlenecks through debugging and performance tuning.",
      ],
      tags: ["Python", "FastAPI", "Temporal", "Pydantic", "Presidio", "Azure AI Content Safety", "SQLAlchemy", "Redis", "MCP"],
    },
    {
      company: "Onwords Smart Solution",
      title: "Embedded Software Engineer",
      type: "Internship",
      period: "Jun 2023",
      location: "Pollachi, Tamil Nadu · On-site",
      logo: "assets/img/onwords.webp",
      highlights: [
        "Worked in R&D on IoT-based embedded solutions.",
        "Programmed `ESP32`/`ESP8266` microcontrollers in `Embedded C` with `MQTT` for real-time communication.",
        "Helped build home-automation systems improving hardware–software efficiency.",
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
    { group: "GenAI & Agents", items: ["AI Agents", "Model Context Protocol (MCP)", "LLM response validation", "RAG", "Gemini API"] },
    { group: "Responsible AI", items: ["AI governance", "PII protection (Presidio)", "Content moderation", "Azure AI Content Safety", "Factory pattern"] },
    { group: "Backend", items: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "REST APIs", "Temporal", "Spring Boot"] },
    { group: "Data", items: ["PostgreSQL", "MSSQL", "MongoDB", "MySQL", "Redis"] },
    { group: "Reliability", items: ["Circuit breakers", "Retries & backoff", "Caching", "Performance tuning"] },
    { group: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML & CSS"] },
    { group: "Tooling", items: ["Docker", "Git", "Linux", "Pytest", "Postman"] },
  ],

  writing: [
    {
      title: "How to Stop Cascading Failures: Circuit Breakers vs. Retries",
      blurb: "When to retry, when to fail fast, and why the two belong together.",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7479874304495779840/",
    },
    {
      title: "Latency vs. Throughput vs. Bandwidth",
      blurb: "Three different network metrics, one animated explainer.",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7485317801855852544/",
    },
    {
      title: "Understanding Throughput",
      blurb: "How throughput is measured across APIs, databases, distributed systems and LLMs.",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7482418667234983936/",
    },
  ],

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
