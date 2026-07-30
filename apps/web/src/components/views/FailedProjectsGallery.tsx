import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ProvenProjectProfile } from '@/components/features/business/ProvenProjectProfile';
import { ProvenProjectsTable } from '@/components/features/business/ProvenProjectsTable';
import { Loader2 } from 'lucide-react';

export const FailedProjectsGallery: React.FC = () => {
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Load the index of all failed projects
        const res = await fetch('/data/failed-projects/index.json');
        const list = await res.json();
        setProjectsList(list);

        // Check if there is a specific project in the URL
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project');
        
        if (projectId) {
          const detailRes = await fetch(`/data/failed-projects/${projectId}.json`);
          if (detailRes.ok) {
            const projectDetails = await detailRes.json();
            setSelectedProject(projectDetails);
          }
        }
      } catch (err) {
        console.error("Failed to load failed projects", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

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
      const detailRes = await fetch(`/data/failed-projects/${projectId}.json`);
      if (detailRes.ok) {
        const fullProject = await detailRes.json();
        setSelectedProject(fullProject);
        
        const url = new URL(window.location.href);
        url.searchParams.set('project', projectId);
        window.history.pushState({}, '', url.toString());
      }
    } catch (err) {
      console.error("Failed to fetch failed project details", err);
    }
  };

  if (selectedProject) {
    return <ProvenProjectProfile project={selectedProject} onBack={() => handleProjectSelect(null)} />;
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
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
