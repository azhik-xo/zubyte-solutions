import React from "react";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import MapLocationSection from "@/components/sections/contact/MapLocationSection";

export const metadata = {
  title: "Contact Us | Start Your Project with Zubyte",
  description:
    "Get in touch with Zubyte Solution. Reach out for project scoping, direct consultation, RFP submissions, and global headquarters information.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <ContactFormSection />
      <MapLocationSection />
    </main>
  );
}

