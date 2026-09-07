import "./globals.css";
import SiteLayout from "@/components/layout/SiteLayout";
import SmoothScroll from "@/components/ui/SmoothScroll";

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
  icons: {
    icon: [
      { url: "/logos/favicon_logo.png", type: "image/png" },
    ],
    shortcut: "/logos/favicon_logo.png",
    apple: "/logos/favicon_logo.png",
  },
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col bg-[var(--background)] text-[#1b1b1b] antialiased"
        suppressHydrationWarning
      >
        <SmoothScroll>
          <SiteLayout>{children}</SiteLayout>
        </SmoothScroll>
      </body>
    </html>
  );
}
