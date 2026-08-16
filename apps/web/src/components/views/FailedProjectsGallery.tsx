"use client";

import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/Badge';
import { CompanyViewPage } from '@/components/company/CompanyViewPage';
import { mapProjectToCompany } from '@/components/views/ProvenProjectsGallery';
import { ProvenProjectsTable } from '@/components/features/business/ProvenProjectsTable';
import { fetchPublicJson, prefetchPublicJson } from '@/lib/publicData';
import { Loader2 } from 'lucide-react';

interface FailedProjectsGalleryProps {
  setSubTabLabel?: (label: string | null) => void;
  initialProjects?: any[];
}

export const FailedProjectsGallery: React.FC<FailedProjectsGalleryProps> = ({ setSubTabLabel, initialProjects }) => {
  const [projectsList, setProjectsList] = useState<any[]>(initialProjects || []);
  const [isLoading, setIsLoading] = useState(!initialProjects);
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
        const list = initialProjects || await fetchPublicJson<any[]>('/api/public-data/failed-projects');
        setProjectsList(list);

        // Check if there is a specific project in the URL
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project');
        
        if (projectId) {
          const projectDetails = await fetchPublicJson<any>(`/data/failed-projects/${projectId}.json`);
          setSelectedProject(projectDetails);
        }
      } catch (err) {
        console.error("Failed to load failed projects", err);
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
      const fullProject = await fetchPublicJson<any>(`/data/failed-projects/${projectId}.json`);
      setSelectedProject(fullProject);
      prefetchPublicJson('/api/public-data/proven-projects');

      const url = new URL(window.location.href);
      url.searchParams.set('project', projectId);
      window.history.pushState({}, '', url.toString());
    } catch (err) {
      console.error("Failed to fetch failed project details", err);
    }
  };

  if (selectedProject) {
    const company = mapProjectToCompany(selectedProject);
    return <CompanyViewPage company={company} onBack={() => handleProjectSelect(null)} />;
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-8 px-3 py-3 sm:px-6 sm:py-8 lg:px-8 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-3 mb-2">
        <Badge variant="secondary" className="w-fit bg-red-500/10 text-red-600 hover:bg-red-500/20 border-0 font-bold px-3 py-1">
          تجارب ودروس مستفادة
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">شركات فشلت (Post-Mortem)</h1>
        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
          التعلم من أخطاء الآخرين يختصر عليك الكثير من الوقت والمال. نستعرض هنا دراسات حالة لمشاريع تقنية لم يكتب لها النجاح، مع تحليل أسباب الفشل والدروس المستفادة منها حتى لا تكررها.
        </p>
      </div>

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
