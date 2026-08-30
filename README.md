# Zubyte Website — Frontend Documentation

Welcome to the **Zubyte Website** frontend codebase. This project is a modern, responsive, and scalable corporate website for **Zubyte Solution**, engineered with **Next.js (App Router)**, **JavaScript (JSX)**, and **Tailwind CSS**.

---

## 1. Project Overview

* **Brand Name**: Zubyte Solution
* **Tagline**: *"Where Ideas Evolve Into Products"*
* **Primary Objective**: Present Zubyte's end-to-end capabilities across software development, UI/UX design, digital marketing, cloud DevOps, system architecture, and proprietary enterprise product suites.

---

## 2. Technology Stack

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router architecture)
* **Language**: JavaScript (ES2022+ / JSX)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS
* **Typography**: Google Fonts (`Syne`, `Bricolage Grotesque`, `Inter`)
* **Utilities**: `clsx` and `tailwind-merge` for clean conditional class merging

---

## 3. Project Directory Structure

```text
zubyte_website/frontend/
├── app/                          # Next.js App Router routes & layouts
│   ├── layout.js                 # Global Root layout with fonts, header, footer & SEO metadata
│   ├── page.js                   # Homepage (/)
│   ├── globals.css               # Tailwind CSS v4, custom theme tokens & animations
│   ├── about/
│   │   └── page.js               # About Zubyte (/about)
│   ├── services/
│   │   └── page.js               # Services & Capabilities (/services)
│   ├── products/
│   │   └── page.js               # Enterprise Product Suites (/products)
│   ├── portfolio/
│   │   └── page.js               # Case Studies & Proof of Work (/portfolio)
│   └── contact/
│       └── page.js               # Inquiry & Contact (/contact)
│
├── components/
│   ├── layout/                   # Global structural layout components
│   │   ├── Header.jsx            # Floating dark pill navigation bar
│   │   └── Footer.jsx            # Multi-column footer with brand info & links
│   ├── navigation/               # Navigation menus and links
│   │   ├── Navbar.jsx            # Desktop nav links with active state detection
│   │   └── MobileMenu.jsx        # Mobile animated hamburger drawer
│   ├── sections/                 # Modular page sections grouped by page
│   │   ├── home/                 # Hero, SocialProof, Bento, Banner, Testimonial, FAQ
│   │   ├── about/                # AboutHero, OurStory, Principles, MissionVision
│   │   ├── services/             # ServicesHero, ServicesNavigator, ProcessSection
│   │   ├── products/             # ProductsHero, ProductExplorer
│   │   ├── portfolio/            # PortfolioHero, PortfolioExplorer
│   │   ├── contact/              # ContactForm, MapLocation
│   │   └── common/               # Reusable CtaSection
│   ├── ui/                       # Primitive reusable UI design system elements
│   │   ├── Button.jsx            # Multi-variant button (primary, orange, dark, outline)
│   │   ├── Badge.jsx             # Category badges & status tags
│   │   ├── Card.jsx              # Surface cards (dark, light, secondary, glass)
│   │   ├── SectionHeading.jsx    # Standardized section headings
│   │   └── Container.jsx         # Responsive max-width wrapper
│   └── common/                   # Shared brand components
│       ├── Logo.jsx              # Zubyte logo component
│       └── ZZMark.jsx            # Scalable vector double-Z brand mark
│
├── data/                         # Decoupled static data files (Single Source of Truth)
│   ├── navigation.js             # Nav links, footer links, social media
│   ├── company.js                # Company profile, stats, values, leadership, offices
│   ├── services.js               # 5 discipline groups & 21 service definitions
│   ├── products.js               # 4 enterprise product suites & product cards
│   ├── portfolio.js              # 16+ STAR case studies with repo/live links
│   ├── process.js                # 4-stage delivery methodology & details
│   └── faqs.js                   # Client FAQs & answers
│
├── lib/
│   └── utils.js                  # Classnames helper (`cn`) & brand constants
│
├── hooks/
│   └── useScrollLock.js          # Custom hook to lock body scrolling on mobile menu open
│
├── public/                       # Static public assets
│   ├── images/                   # Brand and UI preview images
│   ├── logos/                    # Brand SVG logos and marks
│   └── docs/                     # Project PDFs & documentation
│
├── jsconfig.json                 # Path aliases (`@/*` -> `./*`)
├── next.config.mjs               # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

---

## 4. Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) v18.18.0 or higher
* `npm` or your preferred package manager

### 1. Install Dependencies
Navigate into the `zubyte_website/frontend` folder:

```bash
cd frontend
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the running website.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 5. Content Management Guide

All content is structured into clean JavaScript data files inside `data/`. You **never** need to touch complex JSX layout files to update copy, services, or products.

### How to Add a New Service
1. Open `data/services.js`.
2. Locate the discipline group (`Build`, `Design`, `Grow`, `Deploy`, or `Engineering`).
3. Add a new object to the `items` array:
   ```javascript
   {
     name: "Quantum Computing Solutions",
     desc: "Next-gen cryptographic engineering and quantum algorithms.",
   }
   ```
4. The service will automatically appear in the Homepage Bento grid and the `/services` interactive tab navigator.

### How to Add a New Product
1. Open `data/products.js`.
2. Locate the appropriate category (e.g., `Zubyte Edu`, `Zubyte Business`, etc.) or add a new suite.
3. Add a product item:
   ```javascript
   {
     name: "Zubyte AI Assistant",
     type: "Enterprise Automation Platform",
     desc: "Autonomous workflow execution for distributed enterprise teams.",
     status: "Beta", // "Live" or "Beta"
   }
   ```
4. The product will immediately render inside the `/products` 20/80 category explorer.

### How to Add a New Case Study / Portfolio Item
1. Open `data/portfolio.js`.
2. Add an item with the STAR framework structure:
   ```javascript
   {
     service: "Web Development",
     subcategory: "FinTech",
     title: "Real-Time Payment Gateway",
     img: "photo-1555066931-4365d14bab8c",
     shortDesc: "High-throughput payment processing engine handling 100k TPS.",
     stars: [
       { label: "Situation", text: "Legacy system suffered from latency spikes." },
       { label: "Task", text: "Architect a sub-50ms transaction pipeline." },
       { label: "Action", text: "Built a distributed Go microservice with Next.js dashboard." },
       { label: "Result", text: "Reduced latency by 85% and achieved 99.999% uptime." }
     ],
     github: "https://github.com/zubyte",
     live: "https://zubyte.com"
   }
   ```

### How to Add a New Page
1. Create a new directory under `app/`, for example `app/careers/`.
2. Add a `page.js` file:
   ```javascript
   export const metadata = {
     title: "Careers at Zubyte",
     description: "Join our team of visionary engineers and designers.",
   };

   export default function CareersPage() {
     return (
       <main className="flex-1 pt-36 pb-20">
         {/* Your section components here */}
       </main>
     );
   }
   ```
3. Add the link to `data/navigation.js` so it appears in the Header and Footer.

---

## 6. Design System & Styling Conventions

* **Primary Dark**: `#1b1b1b` / `#171717` (Used for headers, dark cards, footers)
* **Warm Light**: `#faf9f5` (Default background)
* **Secondary Surface**: `#f0efe9` (Pills, badges, light cards)
* **Subtle Border**: `#e2e0d9`
* **Brand Accent Orange**: `#F1681D` (CTAs, active highlights, badges)
* **Component Class Merging**: Always use `cn(...)` from `@/lib/utils` when applying conditional classes.

---

## 7. Performance & SEO Checklist

* **Zero Unnecessary Client Components**: `"use client"` is only used in interactive components (`Header`, `FaqSection`, `ProcessSection`, `ServicesNavigatorSection`, `ProductExplorerSection`, `PortfolioExplorerSection`, `ContactFormSection`).
* **Semantic HTML**: Proper `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<button>`, `<a>`, and heading hierarchies (`h1` through `h4`).
* **Dynamic OpenGraph & Metadata**: Pre-configured in `app/layout.js` and overridden on individual pages.

