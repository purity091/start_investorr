"use client";

import React, { useState, useEffect } from 'react';
import { ProvenProjectsTable } from '@/components/features/business/ProvenProjectsTable';
import { CompanyViewPage } from '@/components/company/CompanyViewPage';
import { fetchPublicJson, prefetchPublicJson } from '@/lib/publicData';
import { Company } from '@/types';
import { Loader2 } from 'lucide-react';

interface ProvenProjectsGalleryProps {
  setSubTabLabel?: (label: string | null) => void;
  initialProjects?: any[];
}

/**
 * Maps raw proven-project JSON (legacy shape) → Company interface
 * for the new company profile UI.
 */
export function mapProjectToCompany(raw: any): Company {
  if (Array.isArray(raw)) raw = raw[0];
  if (!raw) return {} as Company;

  const c = raw?.company || {};
  const fin = raw?.financials || {};
  const snap = raw?.directory_snapshot || {};

  return {
    id:                     String(raw.id || raw.slug || ''),
    name:                   raw.name || raw.title || c.name || '',
    permalink:              raw.permalink || raw.slug || raw.id || '',
    shortDescription:       raw.shortDescription || raw.headline || raw.short_description || '',
    aboutDescription:       raw.aboutDescription || raw.overview?.solution?.text || raw.overview?.problem?.text || raw.description || '',
    logoUrl:                raw.logoUrl || raw.logo_url || c.logo_url || '',
    revenueModel:           raw.revenueModel || (typeof c.business_model === 'string' ? c.business_model : (raw.category || '')),
    marketPosition:         raw.marketPosition || raw.market_data?.target_audience || '',
    topCompetitors:         Array.isArray(raw.topCompetitors) ? raw.topCompetitors : (Array.isArray(raw.competitors) ? raw.competitors.map((x: any) => typeof x === 'string' ? x : x?.name || '') : []),
    competitiveAdvantage:   raw.competitiveAdvantage || raw.competitive_advantage || '',
    foundedDate:            String(raw.foundedDate || c.started || c.founded || ''),
    ipoStatus:              raw.ipoStatus || fin.ipo_status || '',
    fundingStatus:          raw.fundingStatus || fin.funding_stage || fin.funding_status || '',
    hqLocation:             raw.hqLocation || (typeof c.location === 'string' ? c.location : (c.location?.city || c.location?.country || '')),
    employeeRange:          String(raw.employeeRange || c.employees || ''),
    website:                raw.website || c.website || '',
    websiteUrl:             raw.websiteUrl || raw.website || c.website || '',
    facebook:               raw.facebook || raw.social?.facebook || '',
    linkedin:               raw.linkedin || raw.social?.linkedin || '',
    twitter:                raw.twitter || raw.social?.twitter || '',
    instagram:              raw.instagram || raw.social?.instagram || '',
    categories:             Array.isArray(raw.categories) ? raw.categories : (raw.category ? raw.category.split(/[/,]/).map((s: string) => s.trim()).filter(Boolean) : []),
    totalFundingAmount:     raw.totalFundingAmount || (typeof fin.total_raised === 'string' ? fin.total_raised : String(fin.total_raised || '')),
    fundingRoundsCount:     raw.fundingRoundsCount || (Array.isArray(raw.fundingRounds) ? raw.fundingRounds.length : (Array.isArray(fin.rounds) ? fin.rounds.length : 0)),
    legalName:              raw.legalName || c.legal_name || raw.name || '',
    alsoKnownAs:            raw.alsoKnownAs || raw.also_known_as || '',
    operatingStatus:        raw.operatingStatus || c.status || 'نشط',
    exitsCount:             raw.exitsCount || raw.exits_count || 0,
    stockSymbol:            raw.stockSymbol || fin.stock_symbol || '',
    companyType:            raw.companyType || c.type || '',
    founders:               Array.isArray(raw.founders) ? raw.founders.map((f: any) => typeof f === 'string' ? f : f?.name || '') : [],
    phoneNumber:            raw.phoneNumber || c.phone || '',
    contactEmail:           raw.contactEmail || c.email || '',
    monthlyWebVisits:       String(raw.monthlyWebVisits || snap.monthly_traffic || ''),
    visitsMomChange:        String(raw.visitsMomChange || snap.traffic_growth || ''),
    itSpend:                String(raw.itSpend || snap.it_spend || ''),
    activeTechProductsCount: raw.activeTechProductsCount || (Array.isArray(raw.sampleTechs) ? raw.sampleTechs.length : (Array.isArray(raw.tools) ? raw.tools.length : 0)),
    sampleTechs:            Array.isArray(raw.sampleTechs) ? raw.sampleTechs : (Array.isArray(raw.tools) ? raw.tools.map((t: any) => typeof t === 'string' ? t : t?.name || '').filter(Boolean) : []),
    patentsCount:           raw.patentsCount || raw.patents_count || 0,
    trademarksCount:        raw.trademarksCount || raw.trademarks_count || 0,
    fundingRounds:          Array.isArray(raw.fundingRounds) ? raw.fundingRounds : (Array.isArray(fin.rounds) ? fin.rounds.map((r: any, i: number) => ({
      id:              String(r.id || i),
      announcedDate:   r.date || r.announced_date || '',
      transactionName: r.name || r.round_name || '',
      investorsCount:  r.investors_count || (Array.isArray(r.investors) ? r.investors.length : 0),
      moneyRaised:     String(r.amount || r.money_raised || ''),
      leadInvestor:    r.lead_investor || '',
      fundingType:     r.type || r.funding_type || '',
    })) : []),
    investments:            Array.isArray(raw.investments) ? raw.investments : [],
    keyPeople:              Array.isArray(raw.keyPeople) ? raw.keyPeople : [],
    subOrganizations:       Array.isArray(raw.subOrganizations) ? raw.subOrganizations : [],
    swotAnalysis:           raw.swotAnalysis || (raw.swot_analysis ? {
      strengths:    raw.swot_analysis.strengths || [],
      weaknesses:   raw.swot_analysis.weaknesses || [],
      opportunities:raw.swot_analysis.opportunities || [],
      threats:      raw.swot_analysis.threats || [],
    } : undefined),
    techSolutionDetails:    raw.techSolutionDetails || undefined,
    expansionStrategy:      raw.expansionStrategy || undefined,
    founderStory:           raw.founderStory || undefined,
    lessonAndEvidence:      raw.lessonAndEvidence || (raw.lessons?.length ? {
      lessonsLearned: raw.lessons.map((l: any) => typeof l === 'string' ? l : (l.description || l.text || '')),
      verifiedDocuments: [],
    } : undefined),
    similarCompaniesList:   Array.isArray(raw.similarCompaniesList) ? raw.similarCompaniesList : [],
    relatedSectorsList:     Array.isArray(raw.relatedSectorsList) ? raw.relatedSectorsList : [],
    targetAudienceProfile:  raw.targetAudienceProfile || undefined,
  };
}

export const ProvenProjectsGallery: React.FC<ProvenProjectsGalleryProps> = ({ setSubTabLabel, initialProjects }) => {
  const [projectsList, setProjectsList] = useState<any[]>(initialProjects || []);
  const [isLoading, setIsLoading]       = useState(!initialProjects);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    if (selectedProject) {
      setSubTabLabel?.(selectedProject.name || selectedProject.title || selectedProject.company?.name || null);
    } else {
      setSubTabLabel?.(null);
    }
  }, [selectedProject, setSubTabLabel]);

  useEffect(() => {
    const handleNavigation = () => {
      const params = new URLSearchParams(window.location.search);
      if (!params.get('project')) setSelectedProject(null);
    };
    window.addEventListener('khotta:navigate', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('khotta:navigate', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(!initialProjects);
        const list = initialProjects || await fetchPublicJson<any[]>('/api/public-data/proven-projects');
        setProjectsList(list);

        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project');
        if (projectId) {
          const projectDetails = await fetchPublicJson<any>(`/data/proven-projects/${projectId}.json`);
          setSelectedProject(projectDetails);
        }
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [initialProjects]);

  const handleProjectSelect = async (project: any | null) => {
    if (!project) {
      setSelectedProject(null);
      const url = new URL(window.location.href);
      url.searchParams.delete('project');
      window.history.pushState({}, '', url.toString());
      return;
    }

    try {
      const projectId = project.slug || project.id;
      const fullProject = await fetchPublicJson<any>(`/data/proven-projects/${projectId}.json`);
      setSelectedProject(fullProject);
      prefetchPublicJson('/api/public-data/failed-projects');

      const url = new URL(window.location.href);
      url.searchParams.set('project', projectId);
      window.history.pushState({}, '', url.toString());
    } catch (err) {
      console.error("Failed to fetch project details", err);
    }
  };

  // Show new company profile UI when a project is selected
  if (selectedProject) {
    const company: Company = mapProjectToCompany(selectedProject);
    return (
      <CompanyViewPage
        company={company}
        onBack={() => handleProjectSelect(null)}
      />
    );
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-8 px-3 py-3 sm:px-6 sm:py-8 lg:px-8 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-3 mb-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">أفكار شركات ناجحة</h1>
        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
          قاعدة بيانات تفاعلية لشركات ناشئة ومشاريع SaaS أثبتت نجاحها. استكشف الإيرادات، الزيارات، نماذج العمل، والتقنيات المستخدمة لاستلهام أفكار قابلة للتطبيق في مشروعك القادم.
        </p>
      </div>

      <div className="w-full">
        {isLoading ? (
          <div className="w-full flex justify-center py-20">
            <Loader2 className="size-8 animate-spin text-muted-foreground/40" />
          </div>
        ) : (
          <ProvenProjectsTable data={projectsList} onRowClick={handleProjectSelect} />
        )}
      </div>
    </div>
  );
};
