"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { useCompany } from "@/context/CompanyContext";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

/**
 * Validated Contact Form Section with dynamic file upload handling and dynamic company contact info
 */
export default function ContactFormSection() {
  const { companyInfo, offices } = useCompany();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "First name is required.";
    if (!formData.lastName.trim()) errs.lastName = "Last name is required.";
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) errs.message = "Please share a brief message.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitError("");
    setSubmitting(true);

    try {
      if (attachedFile) {
        const payload = new FormData();
        payload.append("firstName", formData.firstName);
        payload.append("lastName", formData.lastName);
        payload.append("email", formData.email);
        payload.append("company", formData.company || "");
        payload.append("message", formData.message);
        payload.append("serviceInterest", "General Inquiry");
        payload.append("attachment", attachedFile);
        await api.inquiries.submit(payload);
      } else {
        await api.inquiries.submit({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          serviceInterest: "General Inquiry",
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError(err.message || "Failed to send inquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  const inputClasses = (field) =>
    cn(
      "w-full rounded-2xl px-4 py-3.5 text-sm bg-[var(--secondary)] border outline-none transition-all",
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
        : "border-[var(--border)] focus:border-[#1b1b1b] focus:ring-1 focus:ring-[#1b1b1b]"
    );

  return (
    <section className="bg-[var(--background)] pt-36 pb-20 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Headline */}
        <Reveal direction="up" delay={50} duration={600}>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--muted-foreground)] mb-4">
              Get in touch
            </p>
            <h1
              className="font-heading font-bold text-[#1b1b1b] leading-[1.04] mb-6"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.8rem)" }}
            >
              Let's build the future
              <br />
              together.
            </h1>
            <p className="text-[var(--muted-foreground)] text-base leading-relaxed">
              Whether you are looking to transform your enterprise architecture, launch a new product, or build a dedicated engineering team, we are ready to collaborate.
            </p>
          </div>
        </Reveal>

        {/* 2-Column Grid: Form Left, Contact Info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start mb-20">
          {/* Left: Form Container */}
          <Reveal direction="up" delay={100} duration={700} className="lg:col-span-7">
            <div className="bg-white border border-[var(--border)] rounded-3xl p-8 sm:p-10 shadow-sm">

            {submitted ? (
              <div className="py-16 text-center animate-in fade-in duration-300">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-sm"
                  style={{ background: "rgba(241,104,29,0.15)", color: "#F1681D" }}
                >
                  ✓
                </div>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b1b1b] mb-3">
                  Message received.
                </h2>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-sm mx-auto mb-8">
                  Thank you for reaching out. A senior partner from the Zubyte engineering team will review your requirements and respond within 24–48 hours.
                </p>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      firstName: "",
                      lastName: "",
                      email: "",
                      company: "",
                      message: "",
                    });
                    setAttachedFile(null);
                  }}
                  variant="outline"
                  size="md"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {submitError && (
                  <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 font-semibold">
                    {submitError}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)] mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className={inputClasses("firstName")}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 mt-1.5">{errors.firstName}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)] mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className={inputClasses("lastName")}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 mt-1.5">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)] mb-2">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={inputClasses("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.email}</p>
                  )}
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)] mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Enterprises"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className={inputClasses("company")}
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)] mb-2">
                    Project Scope & Brief <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your project goals, timelines, or technology requirements..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className={cn(inputClasses("message"), "resize-none")}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1.5">{errors.message}</p>
                  )}
                </div>

                {/* File Attachment Field */}
                <div>
                  <label className="block text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)] mb-2">
                    Attach RFP, Brief, or Specification (Optional)
                  </label>
                  <label
                    className={cn(
                      "flex items-center gap-4 w-full rounded-2xl border-2 border-dashed cursor-pointer transition-colors p-4 group",
                      attachedFile
                        ? "border-[#F1681D] bg-[#F1681D]/5"
                        : "border-[var(--border)] hover:border-[#1b1b1b]/40 bg-[var(--secondary)]/40"
                    )}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                      className="sr-only"
                      onChange={(e) => setAttachedFile(e.target.files?.[0] ?? null)}
                    />
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                      style={{
                        background: attachedFile
                          ? "rgba(241,104,29,0.15)"
                          : "#f0efe9",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={attachedFile ? "#F1681D" : "#797876"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      {attachedFile ? (
                        <>
                          <p className="text-xs sm:text-sm font-semibold text-[#1b1b1b] truncate">
                            {attachedFile.name}
                          </p>
                          <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                            {(attachedFile.size / 1024).toFixed(0)} KB · Click to change file
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs sm:text-sm font-semibold text-[var(--muted-foreground)] group-hover:text-[#1b1b1b] transition-colors">
                            Click to upload a document
                          </p>
                          <p className="text-[11px] text-[var(--muted-foreground)] mt-0.5">
                            PDF, DOC, DOCX, PNG, JPG, ZIP — up to 15 MB
                          </p>
                        </>
                      )}
                    </div>

                    {attachedFile && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setAttachedFile(null);
                        }}
                        className="shrink-0 text-[var(--muted-foreground)] hover:text-red-500 transition-colors text-lg px-2"
                        aria-label="Remove attached file"
                      >
                        ×
                      </button>
                    )}
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-3">
                  <Button
                    type="submit"
                    variant="orange"
                    size="lg"
                    disabled={submitting}
                    className="w-full justify-center"
                  >
                    {submitting ? "Sending inquiry..." : "Send Message →"}
                  </Button>
                </div>
              </form>
            )}
            </div>
          </Reveal>

          {/* Right: Contact & Direct Inquiries Info */}
          <Reveal direction="up" delay={200} duration={700} className="lg:col-span-5 flex flex-col gap-6">
            {/* Quick CTA Box */}
            <div className="bg-[#1b1b1b] rounded-3xl p-8 text-white shadow-xl border border-white/10 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-5 bg-[#F1681D]/15 text-[#F1681D] border border-[#F1681D]/30">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#F1681D]" />
                  Direct Consultation
                </span>
                <h3 className="font-heading font-bold text-xl text-white mb-2">
                  Ready to scope your next sprint?
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                  We assign dedicated technical leads to every inquiry to ensure actionable feedback from day one.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {["Web Architecture", "Design Systems", "Cloud & DevOps", "AI Pipelines"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold px-3 py-1 rounded-full text-white/60 border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Channels Card */}
            <div className="bg-[var(--secondary)] rounded-3xl p-8 border border-[var(--border)] shadow-xs">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)] mb-2">
                Direct Inquiries
              </p>
              <p className="font-heading font-bold text-xl sm:text-2xl text-[#1b1b1b] mb-1">
                {companyInfo.email}
              </p>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">
                {companyInfo.phone}
              </p>

              <div className="border-t border-[var(--border)] pt-6">
                <p className="text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)] mb-2">
                  Global Headquarters
                </p>
                <p className="text-sm text-[#1b1b1b] leading-relaxed mb-6">
                  {offices[0]?.address || "One World Trade Center, Suite 4500, New York, NY 10007, United States"}
                </p>
              </div>

              <div className="flex gap-3">
                {["LinkedIn", "Twitter"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="px-4 py-2 rounded-xl bg-white border border-[var(--border)] text-xs font-bold text-[#1b1b1b] hover:border-[#1b1b1b] transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


