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
function mapProjectToCompany(raw: any): Company {
  const c = raw?.company || {};
  const fin = raw?.financials || {};
  const snap = raw?.directory_snapshot || {};

  return {
    id:                     String(raw.id || raw.slug || ''),
    name:                   raw.name || raw.title || c.name || '',
    permalink:              raw.slug || raw.id || '',
    shortDescription:       raw.headline || raw.short_description || '',
    aboutDescription:       raw.overview?.solution?.text || raw.overview?.problem?.text || raw.description || '',
    logoUrl:                raw.logo_url || c.logo_url || '',
    revenueModel:           typeof c.business_model === 'string' ? c.business_model : (raw.category || ''),
    marketPosition:         raw.market_data?.target_audience || '',
    topCompetitors:         Array.isArray(raw.competitors) ? raw.competitors.map((x: any) => typeof x === 'string' ? x : x?.name || '') : [],
    competitiveAdvantage:   raw.competitive_advantage || '',
    foundedDate:            String(c.started || c.founded || ''),
    ipoStatus:              fin.ipo_status || '',
    fundingStatus:          fin.funding_stage || fin.funding_status || '',
    hqLocation:             typeof c.location === 'string' ? c.location : (c.location?.city || c.location?.country || ''),
    employeeRange:          String(c.employees || ''),
    website:                raw.website || c.website || '',
    websiteUrl:             raw.website || c.website || '',
    facebook:               raw.social?.facebook || '',
    linkedin:               raw.social?.linkedin || '',
    twitter:                raw.social?.twitter || '',
    instagram:              raw.social?.instagram || '',
    categories:             raw.category ? raw.category.split(/[/,]/).map((s: string) => s.trim()).filter(Boolean) : [],
    totalFundingAmount:     typeof fin.total_raised === 'string' ? fin.total_raised : String(fin.total_raised || ''),
    fundingRoundsCount:     Array.isArray(fin.rounds) ? fin.rounds.length : 0,
    legalName:              c.legal_name || raw.name || '',
    alsoKnownAs:            raw.also_known_as || '',
    operatingStatus:        c.status || 'نشط',
    exitsCount:             raw.exits_count || 0,
    stockSymbol:            fin.stock_symbol || '',
    companyType:            c.type || '',
    founders:               Array.isArray(raw.founders) ? raw.founders.map((f: any) => typeof f === 'string' ? f : f?.name || '') : [],
    phoneNumber:            c.phone || '',
    contactEmail:           c.email || '',
    monthlyWebVisits:       String(snap.monthly_traffic || ''),
    visitsMomChange:        String(snap.traffic_growth || ''),
    itSpend:                String(snap.it_spend || ''),
    activeTechProductsCount: Array.isArray(raw.tools) ? raw.tools.length : 0,
    sampleTechs:            Array.isArray(raw.tools) ? raw.tools.map((t: any) => typeof t === 'string' ? t : t?.name || '').filter(Boolean) : [],
    patentsCount:           raw.patents_count || 0,
    trademarksCount:        raw.trademarks_count || 0,
    fundingRounds:          Array.isArray(fin.rounds) ? fin.rounds.map((r: any, i: number) => ({
      id:              String(r.id || i),
      announcedDate:   r.date || r.announced_date || '',
      transactionName: r.name || r.round_name || '',
      investorsCount:  r.investors_count || (Array.isArray(r.investors) ? r.investors.length : 0),
      moneyRaised:     String(r.amount || r.money_raised || ''),
      leadInvestor:    r.lead_investor || '',
      fundingType:     r.type || r.funding_type || '',
    })) : [],
    investments:            [],
    keyPeople:              [],
    subOrganizations:       [],
    swotAnalysis:           raw.swot_analysis ? {
      strengths:    raw.swot_analysis.strengths || [],
      weaknesses:   raw.swot_analysis.weaknesses || [],
      opportunities:raw.swot_analysis.opportunities || [],
      threats:      raw.swot_analysis.threats || [],
    } : undefined,
    techSolutionDetails:    undefined,
    expansionStrategy:      undefined,
    founderStory:           undefined,
    lessonAndEvidence:      raw.lessons?.length ? {
      lessonsLearned: raw.lessons.map((l: any) => typeof l === 'string' ? l : (l.description || l.text || '')),
      verifiedDocuments: [],
    } : undefined,
    similarCompaniesList:   [],
    relatedSectorsList:     [],
    targetAudienceProfile:  undefined,
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
        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">أفكار شركات ناجحة</h1>
        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-muted-foreground font-medium">
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
