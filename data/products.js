/**
 * Products and Enterprise Suites data structure
 */

export const PRODUCT_CATEGORIES = [
  {
    id: "edu",
    label: "Education Technology",
    suite: "Zubyte Edu",
    color: "#6366f1",
    tagline: "End-to-end digital infrastructure for institutions, learners, and talent ecosystems.",
    desc: "Zubyte Edu powers the full education lifecycle on a single connected platform — from admissions and campus administration through to learning delivery, skills assessment, and graduate placement. Designed for institutions that demand operational excellence and measurable learner outcomes.",
    products: [
      {
        name: "One Digital Campus",
        type: "Education ERP / Campus Management",
        desc: "A unified ERP that digitises every administrative and academic process — admissions, fee management, timetabling, examinations, and alumni engagement — under one operational layer.",
        status: "Live",
      },
      {
        name: "Zubyte LMS",
        type: "Learning, Skills & Talent Platform",
        desc: "An adaptive learning management system that delivers personalised learning paths, tracks competency progression, and bridges skill development with industry placement pipelines.",
        status: "Live",
      },
    ],
    subcategories: [
      "Education ERP",
      "LMS",
      "Digital Assessment",
      "Student Lifecycle Management",
      "Skill Development",
      "Placement & Talent",
    ],
    img: "photo-1523050854058-8df90110c9f1",
  },
  {
    id: "biz",
    label: "Business Management",
    suite: "Zubyte Business",
    color: "#10b981",
    tagline: "A unified operational layer for billing, inventory, sales, and business intelligence.",
    desc: "Zubyte Business consolidates the day-to-day operational tools that growing enterprises rely on — replacing fragmented point solutions with a single source of truth for transactions, stock, procurement, and financial reporting.",
    products: [
      {
        name: "Zubyte Billing & Inventory",
        type: "Business Operations Platform",
        desc: "An integrated platform covering invoicing, inventory tracking, purchase management, sales operations, and real-time financial reporting — built to scale with businesses of any size.",
        status: "Live",
      },
    ],
    subcategories: [
      "Billing",
      "Inventory",
      "Sales",
      "Purchase",
      "Business Operations",
      "Reporting & Analytics",
    ],
    img: "photo-1664575599736-c5197c684b36",
  },
  {
    id: "work",
    label: "Workforce & Productivity",
    suite: "Zubyte Work",
    color: "#0ea5e9",
    tagline: "Unified project, team, and employee management for modern organisations.",
    desc: "Zubyte Work brings project planning, task execution, team collaboration, and employee management into a single productivity layer. From agile sprint tracking to workforce analytics, it ensures every team operates with clarity, accountability, and measurable output.",
    products: [
      {
        name: "Zubyte Workforce Management",
        type: "Team & Project Management Platform",
        desc: "A comprehensive management suite covering project delivery, task workflows, sprint planning, employee records, and productivity analytics — engineered for distributed and hybrid teams.",
        status: "Live",
      },
    ],
    subcategories: [
      "Project Management",
      "Task Management",
      "Team Management",
      "Employee Management",
      "Agile & Sprint",
      "Productivity",
      "Work Analytics",
    ],
    img: "photo-1600880292203-757bb62b4baf",
  },
  {
    id: "staff",
    label: "Workforce Marketplace",
    suite: "Zubyte Staff",
    color: "#F1681D",
    tagline: "Verified workforce on demand — sourced, deployed, and managed through one platform.",
    desc: "Zubyte Staff connects enterprises with a pre-screened pool of temporary, contract, and blue-collar workers. The platform manages the full deployment lifecycle — from requisition and compliance verification through deployment scheduling and payment — eliminating the operational overhead of traditional staffing.",
    products: [
      {
        name: "Zubyte Get Staff",
        type: "Workforce Marketplace & Deployment Platform",
        desc: "A structured marketplace that matches businesses with qualified temporary and contract workers, handling sourcing, compliance checks, deployment coordination, and worker lifecycle management end-to-end.",
        status: "Beta",
      },
    ],
    subcategories: [
      "Temporary Staffing",
      "Blue-Collar Workforce",
      "Contractor Hiring",
      "On-demand Workforce",
      "Workforce Deployment",
      "Worker Management",
    ],
    img: "photo-1504307651254-35680f356dfd",
  },
];

