import React, { useState, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import { withSupabaseRetry } from '@/lib/supabaseRetry';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  FileText, Search, Filter, Edit2, Trash2, Eye, 
  MoreVertical, Clock, CheckCircle2, AlertCircle, PlayCircle,
  Briefcase, Building2, Cpu, HeadphonesIcon, Building, 
  ChevronLeft, ChevronRight, Activity, SearchX
} from 'lucide-react';

type ProjectStatus = 'active' | 'completed' | 'postponed' | 'review';
type ProjectSector = 'tech' | 'commerce' | 'services' | 'realestate' | 'other';

interface AdminProject {
  id: string;
  name: string;
  owner: string;
  ownerAvatar: string;
  sector: ProjectSector;
  createdAt: string;
  progress: number;
  status: ProjectStatus;
}

type AdminCanvasRow = {
  id: string;
  user_id: string;
  project_title: string | null;
  sector_label: string | null;
  current_stage: string | null;
  journey_progress: number | null;
  created_at: string;
  canvas_data?: {
    execution?: {
      kpis?: unknown;
    };
  } | null;
};

type AdminProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
};

// Mock Data
const SECTORS: Record<ProjectSector, { label: string, icon: React.ElementType }> = {
  tech: { label: 'تقنية ومعلومات', icon: Cpu },
  commerce: { label: 'تجارة تجزئة', icon: Briefcase },
  services: { label: 'خدمات استشارية', icon: HeadphonesIcon },
  realestate: { label: 'عقارات وبناء', icon: Building2 },
  other: { label: 'قطاعات أخرى', icon: Building }
};

const STATUSES: Record<ProjectStatus, { label: string, color: string, bg: string, border: string }> = {
  active: { label: 'نشط', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  completed: { label: 'مكتمل', color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200' },
  postponed: { label: 'مؤجل', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  review: { label: 'قيد المراجعة', color: 'text-slate-600', bg: 'bg-slate-100', border: 'border-slate-200' },
};

const MOCK_PROJECTS: AdminProject[] = Array.from({ length: 36 }).map((_, i) => ({
  id: `PROJ-${2000 + i}`,
  name: ['تطبيق توصيل ذكي', 'منصة تعليم إلكتروني', 'سلسلة مقاهي مختصة', 'عيادة أسنان تجميلية', 'مجمع سكني ذكي', 'شركة تسويق رقمي', 'متجر إلكتروني للملابس'][i % 7] + (i > 6 ? ` ${i + 1}` : ''),
  owner: ['أحمد محمد', 'سارة خالد', 'خالد عبد الله', 'نورة العتيبي', 'عمر الفاروق', 'فهد الدوسري', 'ريم السالم'][i % 7],
  ownerAvatar: `https://api.dicebear.com/7.x/notionists/svg?seed=user${i}&backgroundColor=f1f5f9`,
  sector: (['tech', 'commerce', 'services', 'realestate', 'other'][i % 5]) as ProjectSector,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
  progress: Math.floor(Math.random() * 100),
  status: (['active', 'completed', 'active', 'postponed', 'review', 'active'][i % 6]) as ProjectStatus,
}));

const normalizeProjectSector = (sector: string | null | undefined): ProjectSector => {
  if (sector && Object.prototype.hasOwnProperty.call(SECTORS, sector)) {
    return sector as ProjectSector;
  }

  return 'other';
};

export const AdminProjectsManagement: React.FC = () => {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<ProjectSector | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [pendingDeleteProject, setPendingDeleteProject] = useState<AdminProject | null>(null);
  const [notice, setNotice] = useState<{ title: string; description: string } | null>(null);
  const itemsPerPage = 9;

  React.useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const from = (currentPage - 1) * itemsPerPage;
        const to = from + itemsPerPage - 1;

        const { data: canvasData, error: canvasError, count } = await withSupabaseRetry(() =>
          supabase
            .from('business_canvas')
            .select('id, user_id, project_title, sector_label, current_stage, journey_progress, created_at, canvas_data->execution', { count: 'exact' })
            .is('deleted_at', null)
            .order('created_at', { ascending: false })
            .range(from, to)
        );

        if (canvasError) throw canvasError;

        setTotalProjects(count ?? 0);

        if (canvasData && canvasData.length > 0) {
          const userIds = [...new Set(canvasData.map((p) => p.user_id))];
          
          const { data: profilesData } = await withSupabaseRetry(() =>
            supabase
              .from('profiles')
              .select('id, full_name, email')
              .in('id', userIds)
          );

          const profilesMap = new Map((profilesData as AdminProfileRow[] | null)?.map((p) => [p.id, p]) || []);

          const mappedProjects: AdminProject[] = (canvasData as AdminCanvasRow[]).map((p) => {
            const profile = profilesMap.get(p.user_id);
            const ownerName = profile?.full_name || profile?.email?.split('@')[0] || 'مستخدم مجهول';
            const canvasPayload = p.canvas_data || {};
            // Try to infer status and progress from the saved canvas data (or default)
            const progress = p.journey_progress ?? (canvasPayload.execution?.kpis ? 50 : 20); 
            
            return {
              id: p.id,
              name: p.project_title || 'مشروع بدون عنوان',
              owner: ownerName,
              ownerAvatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${p.user_id}&backgroundColor=f1f5f9`,
              sector: normalizeProjectSector(p.sector_label),
              createdAt: new Date(p.created_at).toISOString().split('T')[0],
              progress: progress,
              status: p.current_stage === 'execution' ? 'active' : 'review',
            };
          });
          setProjects(mappedProjects);
        } else {
          setProjects([]);
        }
      } catch (err) {
        console.error('Error fetching admin projects:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [currentPage]);

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchSearch = project.name.includes(searchQuery) || project.owner.includes(searchQuery);
      const matchSector = sectorFilter === 'all' || project.sector === sectorFilter;
      const matchStatus = statusFilter === 'all' || project.status === statusFilter;
      return matchSearch && matchSector && matchStatus;
    });
  }, [projects, searchQuery, sectorFilter, statusFilter]);

  // Pagination Logic
  const hasLocalFilters = searchQuery.trim().length > 0 || sectorFilter !== 'all' || statusFilter !== 'all';
  const totalPages = Math.max(1, Math.ceil((hasLocalFilters ? filteredProjects.length : totalProjects) / itemsPerPage));
  const paginatedProjects = filteredProjects;

  // Actions
  const handleDelete = async () => {
    if (!pendingDeleteProject) return;

    try {
      const { data, error } = await supabase
        .from('business_canvas')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', pendingDeleteProject.id)
        .select('id')
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('PROJECT_DELETE_NOT_APPLIED');
      setProjects(projects.filter(p => p.id !== pendingDeleteProject.id));
      setPendingDeleteProject(null);
    } catch (err) {
      console.error('Error deleting project', err);
      setNotice({
        title: 'تعذر حذف المشروع',
        description: 'حدث خطأ أثناء محاولة الحذف. حاول مرة أخرى بعد لحظات.',
      });
    }
  };

  const handlePreview = (project: AdminProject) => {
    setNotice({
      title: 'معاينة المشروع',
      description: `المعاينة التفصيلية لمشروع "${project.name}" غير متصلة بعد. يمكن فتحها لاحقاً من نفس الإجراء عند ربط شاشة التفاصيل.`,
    });
  };

  return (
    <div className="font-['IBM_Plex_Sans_Arabic'] space-y-8 animate-in fade-in duration-700 pb-24">
      
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-blue-100 mb-3">
            <FileText size={12} />
            إدارة المحتوى وخطط الأعمال
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">إدارة مشاريع المنصة</h1>
          <p className="text-slate-500 font-normal text-sm mt-2">راقب وأدِر كافة ومحتوى مشاريع وخطط المستخدمين في مكان واحد.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'إجمالي المشاريع', value: projects.length, icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100' },
          { label: 'مشاريع نشطة', value: projects.filter(p => p.status === 'active').length, icon: PlayCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'مشاريع مكتملة', value: projects.filter(p => p.status === 'completed').length, icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'قيد المراجعة والمؤجلة', value: projects.filter(p => p.status === 'review' || p.status === 'postponed').length, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-[20px] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between">
             <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-2xl font-black text-slate-800">{stat.value}</h4>
             </div>
             <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={22} strokeWidth={2.5} />
             </div>
          </div>
        ))}
      </div>

      {/* Filters Bar */}
      <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[24px] p-4 flex flex-col lg:flex-row items-center gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
        <div className="relative flex-1 w-full">
           <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
           <input 
             type="text" 
             placeholder="ابحث باسم المشروع، أو صاحبه..." 
             value={searchQuery}
             onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
             className="w-full bg-white border border-slate-200 rounded-[16px] pr-12 pl-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-800 font-medium shadow-sm"
           />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
           <div className="relative w-full sm:w-48 flex-shrink-0">
             <Filter size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
             <select 
                value={sectorFilter}
                onChange={(e) => { setSectorFilter(e.target.value as ProjectSector | 'all'); setCurrentPage(1); }}
                className="w-full bg-white border border-slate-200 rounded-[16px] pr-10 pl-4 py-3.5 text-xs font-bold text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 appearance-none cursor-pointer shadow-sm transition-all"
             >
                <option value="all">جميع القطاعات</option>
                {Object.entries(SECTORS).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
             </select>
           </div>
           
           <div className="relative w-full sm:w-48 flex-shrink-0">
             <Filter size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
             <select 
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value as ProjectStatus | 'all'); setCurrentPage(1); }}
                className="w-full bg-white border border-slate-200 rounded-[16px] pr-10 pl-4 py-3.5 text-xs font-bold text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 appearance-none cursor-pointer shadow-sm transition-all"
             >
                <option value="all">جميع الحالات</option>
                {Object.entries(STATUSES).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
             </select>
           </div>
        </div>
      </div>

      {/* Projects Grid */}
      {paginatedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedProjects.map((project) => {
            const SectorIcon = SECTORS[project.sector].icon;
            const statusConfig = STATUSES[project.status];
            
            return (
              <div key={project.id} className="bg-white border text-right border-slate-100 rounded-[24px] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex flex-col overflow-hidden relative">
                
                {/* Top: Status & Date */}
                <div className="flex items-start justify-between mb-5 relative z-10">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-[10px] text-[10px] font-bold border ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
                     <div className={`w-1.5 h-1.5 rounded-full bg-current ml-1.5 ${project.status === 'active' ? 'animate-pulse' : ''}`}></div>
                     {statusConfig.label}
                  </span>
                  
                  <div className="flex items-center gap-1.5 text-slate-400">
                     <Clock size={12} />
                     <span className="text-[10px] font-bold tracking-wider">{project.createdAt}</span>
                  </div>
                </div>

                {/* Main Content: Title & Sector */}
                <div className="mb-6 relative z-10">
                   <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors" title={project.name}>{project.name}</h3>
                   <div className="flex items-center gap-1.5 text-slate-500">
                     <SectorIcon size={14} className="text-slate-400" />
                     <span className="text-[11px] font-bold">{SECTORS[project.sector].label}</span>
                   </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6 relative z-10 space-y-2">
                   <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-500">نسبة التقدم</span>
                      <span className={project.progress === 100 ? 'text-blue-600' : 'text-slate-700'}>{project.progress}%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          project.progress === 100 ? 'bg-blue-500' : 
                          project.status === 'postponed' ? 'bg-amber-400' : 
                          project.status === 'review' ? 'bg-slate-400' : 
                          'bg-emerald-500'
                        }`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                   </div>
                </div>

                {/* Footer: User Info & Actions */}
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between relative z-10">
                   <div className="flex items-center gap-3">
                      <img src={project.ownerAvatar} alt={project.owner} className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200" />
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">صاحب المشروع</p>
                         <p className="text-sm font-bold text-slate-800 leading-none">{project.owner}</p>
                      </div>
                   </div>

                   {/* Action Buttons Always Visible */}
                   <div className="flex items-center gap-2">
                      <button 
                         onClick={() => handlePreview(project)}
                         className="w-8 h-8 rounded-[10px] bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors border border-slate-100 hover:border-blue-200" 
                         title="معاينة الخطة"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                         className="w-8 h-8 rounded-[10px] bg-slate-50 text-slate-500 hover:bg-amber-50 hover:text-amber-600 flex items-center justify-center transition-colors border border-slate-100 hover:border-amber-200" 
                         title="تعديل المشروع"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                         onClick={() => setPendingDeleteProject(project)}
                         className="w-8 h-8 rounded-[10px] bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-colors border border-slate-100 hover:border-rose-200" 
                         title="حذف المشروع"
                      >
                        <Trash2 size={14} />
                      </button>
                   </div>
                </div>

                {/* Decorative Background Glow based on status */}
                <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-[0.15] pointer-events-none transition-transform duration-700 group-hover:scale-150 ${
                   project.status === 'active' ? 'bg-emerald-500' :
                   project.status === 'completed' ? 'bg-blue-500' :
                   project.status === 'postponed' ? 'bg-amber-500' :
                   'bg-slate-500'
                }`}></div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border text-center border-slate-100 rounded-[24px] py-32 flex flex-col items-center justify-center shadow-sm">
           <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <SearchX size={32} className="text-slate-400" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 mb-2">تعذر العثور على أية مشاريع!</h3>
           <p className="text-slate-500 font-normal text-sm max-w-sm">لم يتم العثور على أي مشاريع تطابق الفلاتر المحددة، جرب تغيير إعدادات البحث أو تصفية القطاعات.</p>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200/50 pt-8 mt-4">
           <p className="text-sm font-bold text-slate-500">
             عرض <span className="text-slate-900 mx-1">{paginatedProjects.length}</span> من <span className="text-slate-900 mx-1">{hasLocalFilters ? filteredProjects.length : totalProjects}</span> مشروع
           </p>
           <div className="flex items-center gap-2">
             <button 
               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
               disabled={currentPage === 1}
               className="w-10 h-10 border border-slate-200 rounded-[12px] bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
             >
               <ChevronRight size={18} />
             </button>
             
             {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5 && currentPage > 3) pageNum = currentPage - 2 + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <button 
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-[12px] text-sm font-bold transition-all shadow-sm ${
                      currentPage === pageNum 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
             })}

             <button 
               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
               disabled={currentPage === totalPages}
               className="w-10 h-10 border border-slate-200 rounded-[12px] bg-white text-slate-600 flex items-center justify-center hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
             >
               <ChevronLeft size={18} />
             </button>
           </div>
        </div>
      )}

      <Dialog open={Boolean(pendingDeleteProject)} onOpenChange={(open) => !open && setPendingDeleteProject(null)}>
        <DialogContent className="sm:max-w-[440px]" dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle>حذف المشروع</DialogTitle>
            <DialogDescription>
              سيتم حذف مشروع &quot;{pendingDeleteProject?.name}&quot; من المنصة. هذا الإجراء لا يمكن التراجع عنه من الواجهة.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={handleDelete}>
              حذف المشروع
            </Button>
            <Button variant="outline" onClick={() => setPendingDeleteProject(null)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(notice)} onOpenChange={(open) => !open && setNotice(null)}>
        <DialogContent className="sm:max-w-[420px]" dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle>{notice?.title}</DialogTitle>
            <DialogDescription>{notice?.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setNotice(null)}>حسناً</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};
