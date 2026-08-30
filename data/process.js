/**
 * Delivery process methodology data
 */

export const PROCESS_STEPS = [
  {
    step: "01",
    name: "Discovery",
    desc: "Map goals, users and constraints before writing a line of code.",
    detail:
      "We run structured stakeholder interviews, audit your existing systems, map user journeys and define success metrics. The output is a shared brief that everyone can hold each other to.",
  },
  {
    step: "02",
    name: "Architecture",
    desc: "System design and prototyping to validate every decision early.",
    detail:
      "Before any production code is written, we produce wireframes, technical architecture diagrams and a working prototype. This catches misalignments when they are cheap to fix.",
  },
  {
    step: "03",
    name: "Execution",
    desc: "Agile development sprints with continuous integration.",
    detail:
      "Two-week sprints with fortnightly demos. Every sprint produces working, tested software. You see progress constantly — no black box, no surprises.",
  },
  {
    step: "04",
    name: "Deployment",
    desc: "Seamless launch, monitoring and quality assurance.",
    detail:
      "CI/CD pipelines, blue-green deployment, automated testing and rollback procedures. Launch day is uneventful by design. Post-launch monitoring is included in every engagement.",
    extras: [
      { label: "CI/CD Pipelines", desc: "Fully automated build, test and deploy pipelines on every commit." },
      { label: "Blue-Green Deploy", desc: "Zero-downtime releases with instant rollback capability." },
      { label: "Monitoring & Alerts", desc: "Real-time observability with Datadog, Sentry and PagerDuty." },
      { label: "Post-Launch Support", desc: "30-day hypercare period included in every engagement." },
    ],
  },
];

