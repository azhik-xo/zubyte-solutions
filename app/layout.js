import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY_INFO } from "@/data/company";

export const metadata = {
  title: {
    default: "Zubyte Solution — Next-Gen IT Solutions for Modern Enterprises",
    template: "%s | Zubyte Solution",
  },
  description:
    "Zubyte Solution is an end-to-end technology partner engineering bespoke software, scalable cloud architecture, AI workflows, and enterprise product suites.",
  keywords: [
    "Zubyte",
    "Zubyte Solution",
    "IT Solutions",
    "Software Development",
    "Cloud Architecture",
    "DevOps",
    "UI UX Design",
    "AI Automation",
    "Next.js Enterprise",
  ],
  authors: [{ name: "Zubyte IT Solutions Inc." }],
  creator: "Zubyte IT Solutions Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://zubyte.com",
    siteName: "Zubyte Solution",
    title: "Zubyte Solution — Next-Gen IT Solutions for Modern Enterprises",
    description:
      "End-to-end technology partner for companies that want to build, grow and operate with confidence.",
  },
};

export const viewport = {
  themeColor: "#1b1b1b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[var(--background)] text-[#1b1b1b] antialiased">
        <Header />
        <div className="flex-1 flex flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

