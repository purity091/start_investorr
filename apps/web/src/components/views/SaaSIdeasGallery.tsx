"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ProvenProjectProfile } from '@/components/features/business/ProvenProjectProfile';
import { ProvenProjectsTable } from '@/components/features/business/ProvenProjectsTable';
import { fetchPublicJson } from '@/lib/publicData';
import { Sparkles, TrendingDown, Loader2, Layers } from 'lucide-react';

interface SaaSIdeasGalleryProps {
  setSubTabLabel?: (label: string | null) => void;
  initialProjects?: any[];
}

export const SaaSIdeasGallery: React.FC<SaaSIdeasGalleryProps> = ({ setSubTabLabel, initialProjects }) => {
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
        let saasOnly = initialProjects;

        if (!saasOnly) {
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
          saasOnly = combined.filter((item) => {
            const cat = (item.category || '').toLowerCase();
            const bm = (item.company?.business_model || '').toLowerCase();
            const name = (item.name || '').toLowerCase();
            const headline = (item.headline || '').toLowerCase();
            return (
              cat.includes('saas') ||
              bm.includes('saas') ||
              name.includes('saas') ||
              headline.includes('saas') ||
              cat.includes('برمجيات') ||
              cat.includes('اشتراك')
            );
          });
        }

        setProjectsList(saasOnly);

        // Check if there is a specific project in the URL
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project');
        
        if (projectId) {
          const matchedItem = saasOnly.find((p) => (p.slug || p.id) === projectId);
          const folder = matchedItem?.sourceStatus === 'failed' ? 'failed-projects' : 'proven-projects';
          const projectDetails = await fetchPublicJson<any>(`/data/${folder}/${projectId}.json`);
          setSelectedProject(projectDetails);
          setSelectedProjectSource(folder);
        }
      } catch (err) {
        console.error("Failed to load SaaS projects", err);
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
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6 px-3 py-3 sm:px-6 sm:py-8 lg:px-8 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sleek Integrated Header with Compact Summary Pills */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">أفكار مشاريع SaaS (البرمجيات كخدمة)</h1>
          <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
            تصفح نماذج البرمجيات كخدمة الناجحة وتلك التي فشلت مباشرة في الجدول أدناه، مع إمكانية الفلترة حسب الإيرادات، الدولة، ونموذج العمل.
          </p>
        </div>

        {/* Compact Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
            <Layers className="size-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-600">إجمالي شركات SaaS:</span>
            <span className="text-sm font-black text-slate-900">{isLoading ? '...' : projectsList.length}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50/90 border border-emerald-200/70">
            <Sparkles className="size-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-800">أفكار شركات ناجحة:</span>
            <span className="text-sm font-black text-emerald-700">{isLoading ? '...' : provenCount}</span>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-50/90 border border-red-200/70">
            <TrendingDown className="size-4 text-red-600" />
            <span className="text-xs font-bold text-red-800">شركات فشلت:</span>
            <span className="text-sm font-black text-red-700">{isLoading ? '...' : failedCount}</span>
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
