"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

const DEFAULT_INFO = {
  name: "Zubyte Solution",
  legalName: "Zubyte IT Solutions Inc.",
  shortName: "Zubyte",
  tagline: "Where Ideas Evolve Into Products",
  description: "",
  email: "hello@zubyte.org",
  phone: "+1 (800) 555-0199",
  foundedYear: "2025",
  copyrightYear: new Date().getFullYear(),
};

const DEFAULT_LEADERSHIP = {
  name: "",
  role: "",
  initials: "DM",
  quote: "",
};

const CompanyContext = createContext({
  companyInfo: DEFAULT_INFO,
  leadership: DEFAULT_LEADERSHIP,
  stats: [],
  clientLogos: [],
  coreValues: [],
  storyMilestones: [],
  offices: [],
  faqs: [],
  processSteps: [],
  isLoading: true,
  refreshCompany: async () => {},
});

export function CompanyProvider({ children }) {
  const [companyInfo, setCompanyInfo] = useState(DEFAULT_INFO);
  const [leadership, setLeadership] = useState(DEFAULT_LEADERSHIP);
  const [stats, setStats] = useState([]);
  const [clientLogos, setClientLogos] = useState([]);
  const [coreValues, setCoreValues] = useState([]);
  const [storyMilestones, setStoryMilestones] = useState([]);
  const [offices, setOffices] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanyData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.company.getInfo();
      if (res && res.data) {
        const d = res.data;

        setCompanyInfo({
          name: d.name || DEFAULT_INFO.name,
          legalName: d.legalName || DEFAULT_INFO.legalName,
          shortName: d.shortName || DEFAULT_INFO.shortName,
          tagline: d.tagline || DEFAULT_INFO.tagline,
          description: d.description || "",
          email: d.email || DEFAULT_INFO.email,
          phone: d.phone || DEFAULT_INFO.phone,
          foundedYear: d.foundedYear || DEFAULT_INFO.foundedYear,
          copyrightYear: new Date().getFullYear(),
        });

        if (d.leadership) {
          setLeadership({
            name: d.leadership.name || "",
            role: d.leadership.role || "",
            initials: d.leadership.initials || "DM",
            quote: d.leadership.quote || "",
          });
        }

        if (Array.isArray(d.stats)) {
          setStats(d.stats);
        }

        if (Array.isArray(d.clientLogos)) {
          setClientLogos(d.clientLogos);
        }

        if (Array.isArray(d.coreValues)) {
          setCoreValues(d.coreValues);
        }

        if (Array.isArray(d.storyMilestones)) {
          setStoryMilestones(d.storyMilestones);
        }

        if (Array.isArray(d.offices)) {
          setOffices(d.offices);
        }

        if (Array.isArray(d.faqs)) {
          setFaqs(d.faqs);
        }

        if (Array.isArray(d.processSteps)) {
          setProcessSteps(d.processSteps);
        }
      }
    } catch (err) {
      console.error("Failed to fetch live company data from DB:", err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanyData();
  }, [fetchCompanyData]);

  return (
    <CompanyContext.Provider
      value={{
        companyInfo,
        leadership,
        stats,
        clientLogos,
        coreValues,
        storyMilestones,
        offices,
        faqs,
        processSteps,
        isLoading,
        refreshCompany: fetchCompanyData,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
}
