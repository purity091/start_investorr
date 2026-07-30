import React, { useState, useEffect, useMemo } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { ProvenProjectProfile } from '@/components/features/business/ProvenProjectProfile';
import { ProvenProjectsTable } from '@/components/features/business/ProvenProjectsTable';
import { Settings2, Sparkles, TrendingDown, Loader2, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MicroSaaSIdeasGallery: React.FC = () => {
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'proven' | 'failed'>('all');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Load both proven and failed projects
        const [provenRes, failedRes] = await Promise.all([
          fetch('/data/proven-projects/index.json').catch(() => null),
          fetch('/data/failed-projects/index.json').catch(() => null),
        ]);

        let provenList: any[] = [];
        let failedList: any[] = [];

        if (provenRes && provenRes.ok) {
          provenList = await provenRes.json();
          provenList = provenList.map((item) => ({ ...item, sourceStatus: 'proven' }));
        }

        if (failedRes && failedRes.ok) {
          failedList = await failedRes.json();
          failedList = failedList.map((item) => ({ ...item, sourceStatus: 'failed' }));
        }

        const combined = [...provenList, ...failedList];

        // Filter companies that fit Micro-SaaS / Developer tools / Niche AI products
        const microSaasOnly = combined.filter((item) => {
          const cat = (item.category || '').toLowerCase();
          const bm = (item.company?.business_model || '').toLowerCase();
          const name = (item.name || '').toLowerCase();
          const headline = (item.headline || '').toLowerCase();
          const isSaas = cat.includes('saas') || bm.includes('saas') || cat.includes('برمجيات');
          
          return isSaas || 
            cat.includes('developer') || 
            cat.includes('open source') || 
            cat.includes('ai') || 
            cat.includes('إنتاجية') || 
            cat.includes('تحليلات') ||
            headline.includes('أداة') ||
            headline.includes('واجهة برمجة');
        });

        setProjectsList(microSaasOnly);

        // Check if there is a specific project in the URL
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('project');
        
        if (projectId) {
          const matchedItem = microSaasOnly.find((p) => (p.slug || p.id) === projectId);
          const folder = matchedItem?.sourceStatus === 'failed' ? 'failed-projects' : 'proven-projects';
          const detailRes = await fetch(`/data/${folder}/${projectId}.json`);
          if (detailRes.ok) {
            const projectDetails = await detailRes.json();
            setSelectedProject(projectDetails);
          }
        }
      } catch (err) {
        console.error("Failed to load Micro-SaaS projects", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const filteredProjects = useMemo(() => {
    if (statusFilter === 'proven') {
      return projectsList.filter((p) => p.sourceStatus === 'proven');
    }
    if (statusFilter === 'failed') {
      return projectsList.filter((p) => p.sourceStatus === 'failed');
    }
    return projectsList;
  }, [projectsList, statusFilter]);

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
      const detailRes = await fetch(`/data/${folder}/${projectId}.json`);
      if (detailRes.ok) {
        const fullProject = await detailRes.json();
        setSelectedProject(fullProject);
        
        const url = new URL(window.location.href);
        url.searchParams.set('project', projectId);
        window.history.pushState({}, '', url.toString());
      }
    } catch (err) {
      console.error("Failed to fetch project details", err);
    }
  };

  if (selectedProject) {
    return <ProvenProjectProfile project={selectedProject} onBack={() => handleProjectSelect(null)} />;
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="w-fit bg-purple-500/10 text-purple-600 hover:bg-purple-500/20 border-0 font-bold px-3 py-1">
            <Settings2 className="size-3.5 me-1.5 inline-block" />
            فلترة البرمجيات المصغرة (Micro-SaaS)
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">أفكار مشاريع Micro-SaaS</h1>
        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
          المشاريع البرمجية المصغرة (Micro-SaaS) هي الحل الأمثل للمطورين الأفراد ورواد الأعمال الذين يبحثون عن حل مشكلة دقيقة (Niche) لجمهور محدد. تصفح أفكاراً سهلة البناء سريعة الإطلاق.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-purple-50/50 to-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">إجمالي أدوات Micro-SaaS</p>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{isLoading ? '...' : projectsList.length}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-purple-100 text-purple-600">
              <Layers className="size-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-amber-50/50 to-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">أفكار ناجحة ومستقرة</p>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-600">{isLoading ? '...' : provenCount}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
              <Sparkles className="size-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-gradient-to-br from-red-50/50 to-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">شركات فشلت (دروس مستفادة)</p>
              <h3 className="text-2xl sm:text-3xl font-black text-red-600">{isLoading ? '...' : failedCount}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-red-100 text-red-600">
              <TrendingDown className="size-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
          <button
            onClick={() => setStatusFilter('all')}
            className={cn(
              "px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all",
              statusFilter === 'all'
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            جميع الأدوات ({projectsList.length})
          </button>
          <button
            onClick={() => setStatusFilter('proven')}
            className={cn(
              "px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5",
              statusFilter === 'proven'
                ? "bg-amber-500 text-white shadow-sm"
                : "text-slate-600 hover:text-amber-600"
            )}
          >
            <CheckCircle2 className="size-3.5" />
            ناجحة ({provenCount})
          </button>
          <button
            onClick={() => setStatusFilter('failed')}
            className={cn(
              "px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center gap-1.5",
              statusFilter === 'failed'
                ? "bg-red-500 text-white shadow-sm"
                : "text-slate-600 hover:text-red-600"
            )}
          >
            <AlertTriangle className="size-3.5" />
            شركات فشلت ({failedCount})
          </button>
        </div>
      </div>

      {/* Table section */}
      <div className="w-full">
        {isLoading ? (
          <div className="w-full flex justify-center py-20">
            <Loader2 className="size-8 animate-spin text-slate-300" />
          </div>
        ) : (
          <ProvenProjectsTable data={filteredProjects} onRowClick={handleProjectSelect} />
        )}
      </div>
    </div>
  );
};
