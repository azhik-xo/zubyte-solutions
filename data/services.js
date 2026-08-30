/**
 * Services data structure across 5 disciplines
 */

export const SERVICES = [
  {
    group: "Build",
    slug: "build",
    portfolioKey: "Web Development",
    icon: "⬡",
    color: "#1b1b1b",
    tagline: "Web, mobile & bespoke software built to your specification.",
    img: "photo-1555066931-4365d14bab8c",
    items: [
      {
        name: "Web Development",
        desc: "Performant, scalable web applications built to your exact specification with modern frameworks.",
      },
      {
        name: "Web Apps",
        desc: "Full-stack SaaS platforms and custom business tools engineered for reliability at scale.",
      },
      {
        name: "Mobile App Development",
        desc: "Native and cross-platform apps for iOS and Android with seamless user experiences.",
      },
      {
        name: "Software Development",
        desc: "Bespoke software engineered around your workflows — from MVP to enterprise grade.",
      },
    ],
  },
  {
    group: "Design",
    slug: "design",
    portfolioKey: "UI/UX Design",
    icon: "◇",
    color: "#F1681D",
    tagline: "Research-led interfaces that convert and delight users.",
    img: "photo-1561070791-2526d30994b5",
    items: [
      {
        name: "UI/UX Design",
        desc: "Research-led interfaces that convert and retain users through clarity and delight.",
      },
      {
        name: "Web Design",
        desc: "Visually refined, fast-loading websites that communicate authority and trust.",
      },
      {
        name: "Mobile App Design",
        desc: "Intuitive mobile experiences from concept to handoff — every tap considered.",
      },
      {
        name: "Product Design",
        desc: "End-to-end product thinking from discovery to launch and beyond.",
      },
    ],
  },
  {
    group: "Grow",
    slug: "grow",
    portfolioKey: "Digital Marketing",
    icon: "△",
    color: "#0ea5e9",
    tagline: "Data-driven organic visibility and modern AI search presence.",
    img: "photo-1460925895917-afdab827c52f",
    items: [
      {
        name: "SEO",
        desc: "Technical and content SEO that builds lasting organic visibility across competitive markets.",
      },
      {
        name: "AEO",
        desc: "Answer Engine Optimization for the AI-search era — visibility where it matters most.",
      },
      {
        name: "Google Business Profile",
        desc: "Local visibility and reputation management to drive footfall and trust.",
      },
      {
        name: "Digital Marketing",
        desc: "Data-driven campaigns across search, social and display that move the needle.",
      },
    ],
  },
  {
    group: "Deploy",
    slug: "deploy",
    portfolioKey: "Cloud & DevOps",
    icon: "◈",
    color: "#6366f1",
    tagline: "Automated pipelines, cloud architecture, and zero-downtime releases.",
    img: "photo-1558494949-ef010cbdcc31",
    items: [
      {
        name: "Deployment",
        desc: "Reliable, repeatable deployment pipelines for any stack — zero surprises at launch.",
      },
      {
        name: "Cloud Solutions",
        desc: "Architecture, migration and optimization across AWS, GCP and Azure.",
      },
      {
        name: "CI/CD",
        desc: "Automated pipelines that ship code faster with confidence and full audit trails.",
      },
      {
        name: "DevOps",
        desc: "Infrastructure as code, monitoring and on-call support so you sleep soundly.",
      },
    ],
  },
  {
    group: "Engineering",
    slug: "engineering",
    portfolioKey: "AI & Automation",
    icon: "⬢",
    color: "#10b981",
    tagline: "System design, testing, structured observability, and repository hygiene.",
    img: "photo-1504384308090-c894fdcc538d",
    items: [
      {
        name: "Architecture",
        desc: "Scalable system design and technical blueprints engineered for growth and resilience.",
      },
      {
        name: "Testing",
        desc: "End-to-end test strategies — unit, integration, and E2E — that ship confidence, not bugs.",
      },
      {
        name: "Logging",
        desc: "Structured logging pipelines that surface insight and accelerate root-cause analysis.",
      },
      {
        name: "Monitoring",
        desc: "Real-time observability with alerts and dashboards so issues are caught before users are.",
      },
      {
        name: "Git & Version Control",
        desc: "Branch strategies, code review workflows, and repository hygiene that keep teams moving fast.",
      },
    ],
  },
];

/**
 * All individual service names (21 services across 5 groups)
 */
export const ALL_SERVICE_NAMES = SERVICES.flatMap((g) =>
  g.items.map((item) => item.name)
);

/**
 * All 5 high-level discipline groups
 */
export const ALL_DISCIPLINE_GROUPS = SERVICES.map((g) => g.group);
