import React, { useState, useEffect, useMemo } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { ProvenProjectProfile } from '@/components/features/business/ProvenProjectProfile';
import { ProvenProjectsTable } from '@/components/features/business/ProvenProjectsTable';
import { Settings2, Sparkles, TrendingDown, Loader2, CheckCircle2, AlertTriangle, UserCheck, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

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

        // Precise Micro-SaaS filtering logic
        const microSaasOnly = combined.filter((item) => {
          const id = item.slug || item.id;
          if (MICRO_SAAS_SLUGS.has(id)) return true;

          const cat = (item.category || '').toLowerCase();
          const bm = (item.company?.business_model || '').toLowerCase();

          // Check if category or business model explicitly specifies Micro-SaaS
          if (cat.includes('micro-saas') || bm.includes('micro-saas') || cat.includes('micro saas')) {
            return true;
          }

          return false;
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
            فلترة دقيقة لشركات Micro-SaaS
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">أفكار مشاريع Micro-SaaS الحقيقية</h1>
        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
          المشاريع البرمجية المصغرة (Micro-SaaS) هي تطبيقات مخصصة تعتمد على مؤسس فردي (Solo Founder) أو فريق صغير جداً لتلبية احتياج موجه لشريحة نيش (Niche Market). تتميز بتكلفة تشغيلية ضئيلة وسرعة إطلاق عالية بدون تمويل خارجي ضخم.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-purple-100 shadow-sm bg-gradient-to-br from-purple-50/50 to-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">إجمالي مشاريع Micro-SaaS</p>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">{isLoading ? '...' : projectsList.length}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-purple-100 text-purple-600">
              <Target className="size-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-100 shadow-sm bg-gradient-to-br from-amber-50/50 to-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">مشاريع ناجحة ومستقرة</p>
              <h3 className="text-2xl sm:text-3xl font-black text-amber-600">{isLoading ? '...' : provenCount}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-amber-100 text-amber-600">
              <Sparkles className="size-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-100 shadow-sm bg-gradient-to-br from-red-50/50 to-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-1">تجارب فشلت (Post-Mortem)</p>
              <h3 className="text-2xl sm:text-3xl font-black text-red-600">{isLoading ? '...' : failedCount}</h3>
            </div>
            <div className="p-3 rounded-2xl bg-red-100 text-red-600">
              <TrendingDown className="size-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Criteria Info Banner */}
      <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-purple-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-purple-100 text-purple-600 shrink-0">
            <UserCheck className="size-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-900 mb-1">معايير اختيار مشاريع الـ Micro-SaaS الدقيقة:</h4>
            <div className="text-xs text-slate-600 leading-relaxed space-y-1">
              <p>• **مؤسس فردي (Solo Founder) أو فريق صغير جداً (1-3 أشخاص)** لتقليل التعقيد الإداري.</p>
              <p>• **سوق موجه بدقة (Niche Focus)**: مثل أداة معادلات Excel، حزمت أتمتة، واجهة برمجة API صور، قالب إطلاق سريع.</p>
              <p>• **تكلفة تشغيل منخفضة (Bootstrapped)** بدون الحاجة لرأس مال جولات استثمارية ضخمة.</p>
            </div>
          </div>
        </div>
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
            جميع مشاريع Micro-SaaS ({projectsList.length})
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
            مشاريع ناجحة ({provenCount})
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
