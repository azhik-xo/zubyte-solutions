"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  COMPANY_INFO as FALLBACK_INFO,
  LEADERSHIP as FALLBACK_LEADERSHIP,
  SOCIAL_PROOF_STATS as FALLBACK_STATS,
  CLIENT_LOGOS as FALLBACK_CLIENTS,
  CORE_VALUES as FALLBACK_VALUES,
  STORY_MILESTONES as FALLBACK_MILESTONES,
  GLOBAL_OFFICES as FALLBACK_OFFICES,
} from "@/data/company";
import { api } from "@/lib/api";

const CompanyContext = createContext({
  companyInfo: FALLBACK_INFO,
  leadership: FALLBACK_LEADERSHIP.founder,
  stats: FALLBACK_STATS,
  clientLogos: [],
  coreValues: FALLBACK_VALUES,
  storyMilestones: FALLBACK_MILESTONES,
  offices: FALLBACK_OFFICES,
  faqs: [],
  isLoading: true,
  refreshCompany: async () => {},
});

export function CompanyProvider({ children }) {
  const [companyInfo, setCompanyInfo] = useState(FALLBACK_INFO);
  const [leadership, setLeadership] = useState(FALLBACK_LEADERSHIP.founder);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [clientLogos, setClientLogos] = useState([]);
  const [coreValues, setCoreValues] = useState(FALLBACK_VALUES);
  const [storyMilestones, setStoryMilestones] = useState(FALLBACK_MILESTONES);
  const [offices, setOffices] = useState(FALLBACK_OFFICES);
  const [faqs, setFaqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCompanyData = useCallback(async () => {
    try {
      const res = await api.company.getInfo();
      if (res && res.data) {
        const d = res.data;

        setCompanyInfo({
          name: d.name || FALLBACK_INFO.name,
          legalName: d.legalName || FALLBACK_INFO.legalName,
          shortName: d.shortName || FALLBACK_INFO.shortName,
          tagline: d.tagline || FALLBACK_INFO.tagline,
          description: d.description || FALLBACK_INFO.description,
          email: d.email || FALLBACK_INFO.email,
          phone: d.phone || FALLBACK_INFO.phone,
          foundedYear: d.foundedYear || FALLBACK_INFO.foundedYear,
          copyrightYear: new Date().getFullYear(),
        });

        if (d.leadership && d.leadership.name) {
          setLeadership({
            name: d.leadership.name || FALLBACK_LEADERSHIP.founder.name,
            role: d.leadership.role || FALLBACK_LEADERSHIP.founder.role,
            initials: d.leadership.initials || FALLBACK_LEADERSHIP.founder.initials,
            quote: d.leadership.quote || FALLBACK_LEADERSHIP.founder.quote,
          });
        }

        if (Array.isArray(d.stats) && d.stats.length > 0) {
          setStats(d.stats);
        }

        if (Array.isArray(d.clientLogos) && d.clientLogos.length > 0) {
          setClientLogos(d.clientLogos);
        }

        if (Array.isArray(d.coreValues) && d.coreValues.length > 0) {
          setCoreValues(d.coreValues);
        }

        if (Array.isArray(d.storyMilestones) && d.storyMilestones.length > 0) {
          setStoryMilestones(d.storyMilestones);
        }

        if (Array.isArray(d.offices) && d.offices.length > 0) {
          setOffices(d.offices);
        }

        if (Array.isArray(d.faqs) && d.faqs.length > 0) {
          setFaqs(d.faqs);
        }
      }
    } catch (err) {
      console.warn("Could not fetch live company data from DB, using cache:", err.message);
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
