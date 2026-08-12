"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ProvenProjectProfile } from '@/components/features/business/ProvenProjectProfile';
import { ProvenProjectsTable } from '@/components/features/business/ProvenProjectsTable';
import { fetchPublicJson } from '@/lib/publicData';
import { Settings2, Sparkles, TrendingDown, Loader2, Target } from 'lucide-react';

// Explicit list of verified Micro-SaaS projects from the JSON dataset
const MICRO_SAAS_SLUGS = new Set([
  'dashp',
  'supademo',
  'formula-bot',
  'outseta',
  'bannerbear',
  'shipfast',
  'carrd',
  'plausible',
  'cal-com',
  'resend',
  'scalefactor'
]);

interface MicroSaaSIdeasGalleryProps {
  setSubTabLabel?: (label: string | null) => void;
  initialProjects?: any[];
}

export const MicroSaaSIdeasGallery: React.FC<MicroSaaSIdeasGalleryProps> = ({ setSubTabLabel, initialProjects }) => {
  const [projectsList, setProjectsList] = useState<any[]>(initialProjects || []);
  const [isLoading, setIsLoading] = useState(!initialProjects);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [selectedProjectSource, setSelectedProjectSource] = useState<'proven-projects' | 'failed-projects'>('proven-projects');

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
      const projectId = params.get('project');
      if (!projectId) {
        setSelectedProject(null);
      }
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
        let microSaasOnly = initialProjects;

        if (!microSaasOnly) {
          const [provenListResult, failedListResult] = await Promise.allSettled([
            fetchPublicJson<any[]>('/api/public-data/proven-projects'),
            fetchPublicJson<any[]>('/api/public-data/failed-projects'),
          ]);

          let provenList: any[] = [];
          let failedList: any[] = [];

          if (provenListResult.status === 'fulfilled') {
            provenList = provenListResult.value.map((item) => ({ ...item, sourceStatus: 'proven' }));
          }

          if (failedListResult.status === 'fulfilled') {
            failedList = failedListResult.value.map((item) => ({ ...item, sourceStatus: 'failed' }));
          }

          const combined = [...provenList, ...failedList];
          microSaasOnly = combined.filter((item) => {
            const id = item.slug || item.id;
            if (MICRO_SAAS_SLUGS.has(id)) return true;

            const cat = (item.category || '').toLowerCase();
            const bm = (item.company?.business_model || '').toLowerCase();

            return cat.includes('micro-saas') || bm.includes('micro-saas') || cat.includes('micro saas');
          });
        }

        setProjectsList(microSaasOnly);

        // Check if there is a specific project in the URL
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project');

        if (projectId) {
          const matchedItem = microSaasOnly.find((p) => (p.slug || p.id) === projectId);
          const folder = matchedItem?.sourceStatus === 'failed' ? 'failed-projects' : 'proven-projects';
          const projectDetails = await fetchPublicJson<any>(`/data/${folder}/${projectId}.json`);
          setSelectedProject(projectDetails);
          setSelectedProjectSource(folder);
        }
      } catch (err) {
        console.error("Failed to load Micro-SaaS projects", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [initialProjects]);

  const provenCount = useMemo(() => projectsList.filter((p) => p.sourceStatus === 'proven').length, [projectsList]);
  const failedCount = useMemo(() => projectsList.filter((p) => p.sourceStatus === 'failed').length, [projectsList]);

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
      const folder = project.sourceStatus === 'failed' ? 'failed-projects' : 'proven-projects';
      const fullProject = await fetchPublicJson<any>(`/data/${folder}/${projectId}.json`);
      setSelectedProject(fullProject);
      setSelectedProjectSource(folder);

      const url = new URL(window.location.href);
      url.searchParams.set('project', projectId);
      window.history.pushState({}, '', url.toString());
    } catch (err) {
      console.error("Failed to fetch project details", err);
    }
  };

  if (selectedProject) {
    return <ProvenProjectProfile project={selectedProject} onBack={() => handleProjectSelect(null)} bookmarkSource={selectedProjectSource} />;
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-3 sm:gap-6 px-2 sm:px-6 py-2 sm:py-8 lg:px-8 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Sleek Integrated Header with Compact Summary Pills */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 bg-purple-50/50 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-purple-100 shadow-2xs">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="w-fit bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-0 font-bold text-[10px] sm:text-xs px-2.5 py-0.5 sm:px-3 sm:py-1">
              <Settings2 className="size-3 sm:size-3.5 me-1 inline-block" />
              فلترة دقيقة لشركات Micro-SaaS
            </Badge>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">أفكار مشاريع Micro-SaaS الحقيقية</h1>
          <p className="max-w-2xl text-[11px] sm:text-sm leading-relaxed text-slate-600 font-medium">
            تطبيقات مخصصة تعتمد على مؤسس فردي (Solo Founder) أو فريق صغير جداً لتلبية احتياج موجه لشريحة niche. تصفح النتائج مباشرةً أدناه.
          </p>
        </div>

        {/* Compact Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 shrink-0 pt-1 lg:pt-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-white border border-purple-100 shadow-2xs">
            <Target className="size-3.5 sm:size-4 text-purple-600" />
            <span className="text-[11px] sm:text-xs font-bold text-slate-600">إجمالي Micro-SaaS:</span>
            <span className="text-xs sm:text-sm font-black text-slate-900">{isLoading ? '...' : projectsList.length}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-amber-50/90 border border-amber-200/70">
            <Sparkles className="size-3.5 sm:size-4 text-amber-600" />
            <span className="text-[11px] sm:text-xs font-bold text-amber-800">مشاريع ناجحة:</span>
            <span className="text-xs sm:text-sm font-black text-amber-700">{isLoading ? '...' : provenCount}</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-lg sm:rounded-xl bg-red-50/90 border border-red-200/70">
            <TrendingDown className="size-3.5 sm:size-4 text-red-600" />
            <span className="text-[11px] sm:text-xs font-bold text-red-800">تجارب فشلت:</span>
            <span className="text-xs sm:text-sm font-black text-red-700">{isLoading ? '...' : failedCount}</span>
          </div>
        </div>
      </div>

      {/* Main Table section */}
      <div className="w-full">
        {isLoading ? (
          <div className="w-full flex justify-center py-20">
            <Loader2 className="size-8 animate-spin text-slate-300" />
          </div>
        ) : (
          <ProvenProjectsTable data={projectsList} onRowClick={handleProjectSelect} />
        )}
      </div>
    </div>
  );
};
