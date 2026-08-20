import React, { useMemo, useState, useEffect } from 'react';
import {
  Activity,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Pencil,
  Plus,
  RefreshCcw,
  Rocket,
  Search,
  Share2,
  Sparkles,
  Star,
  Trash2,
  Workflow,
  Zap,
  ArrowUpDown,
  Copy,
  Check,
  Globe,
  Layers,
  Lock,
  ExternalLink,
  MoreHorizontal,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { EmptyState, ErrorState, NoResultsState } from '@/components/ui/PageStates';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import { invalidateProjectCountCache } from '@/lib/projectCache';
import { copyShareUrl, publishProject } from '@/lib/projectSharing';
import { getProjectEditPath } from '@/features/workspace/workspaceNavigation';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

type ProjectStatus = 'ready' | 'review' | 'draft';
type ProjectType = 'easy' | 'pro' | 'mit24' | 'bmc' | 'lean' | 'other';
type TypeFilter = 'all' | ProjectType;
type StatusFilter = 'all' | ProjectStatus;

interface Project {
  id: string;
  name: string;
  sector: string;
  type: ProjectType;
  status: ProjectStatus;
  progress: {
    market: number;
    product: number;
    financial: number;
  };
  aiScore: number;
  lastEdited: string;
  marketCap: string;
  isFavorite: boolean;
  isMockExample?: boolean;
  modelType?: string | null;
  is_public?: boolean;
  share_token?: string | null;
}

type BusinessCanvasProjectRow = {
  id: string;
  project_title: string | null;
  sector_label: string | null;
  current_stage: string | null;
  readiness_score: number | null;
  validation_score: number | null;
  execution_score: number | null;
  feasibilityModelType?: string | null;
  feasibilityModels?: Record<string, unknown> | null;
  profile?: { sectorLabel?: string | null } | null;
  currentStage?: string | null;
  metrics?: {
    readinessScore?: number | null;
    validationScore?: number | null;
    executionScore?: number | null;
  } | null;
  canvas_data?: {
    feasibilityModelType?: string | null;
    feasibilityModels?: Record<string, unknown> | null;
    profile?: { sectorLabel?: string | null } | null;
    currentStage?: string | null;
    metrics?: {
      readinessScore?: number | null;
      validationScore?: number | null;
      executionScore?: number | null;
    } | null;
  } | null;
  updated_at: string;
  is_public?: boolean | null;
  share_token?: string | null;
};

const PROJECT_TYPE_META: Record<
  ProjectType,
  {
    label: string;
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  easy: {
    label: 'النموذج السهل',
    shortLabel: 'السهل',
    icon: Sparkles,
  },
  pro: {
    label: 'النموذج الاحترافي',
    shortLabel: 'الاحترافي',
    icon: Zap,
  },
  mit24: {
    label: 'MIT 24 Steps',
    shortLabel: 'MIT 24',
    icon: Rocket,
  },
  bmc: {
    label: 'نموذج بناء نموذج العمل',
    shortLabel: 'BMC',
    icon: Workflow,
  },
  lean: {
    label: 'منهجية Lean Startup',
    shortLabel: 'Lean',
    icon: RefreshCcw,
  },
  other: {
    label: 'خطة أعمال عامة',
    shortLabel: 'عام',
    icon: Layers,
  },
};

const STATUS_META: Record<
  ProjectStatus,
  { label: string; className: string; dotClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  ready: {
    label: 'جاهز ومكتمل',
    className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-0',
    dotClass: 'bg-emerald-500',
    icon: CheckCircle2,
  },
  review: {
    label: 'قيد التطوير',
    className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-0',
    dotClass: 'bg-amber-500 animate-pulse',
    icon: Clock,
  },
  draft: {
    label: 'مسودة أولية',
    className: 'bg-muted text-muted-foreground border-0',
    dotClass: 'bg-slate-400',
    icon: Activity,
  },
};

const TYPE_OPTIONS: Array<{ id: TypeFilter; label: string }> = [
  { id: 'all', label: 'كل النماذج' },
  { id: 'easy', label: PROJECT_TYPE_META.easy.label },
  { id: 'pro', label: PROJECT_TYPE_META.pro.label },
  { id: 'mit24', label: PROJECT_TYPE_META.mit24.label },
  { id: 'bmc', label: PROJECT_TYPE_META.bmc.label },
  { id: 'lean', label: PROJECT_TYPE_META.lean.label },
  { id: 'other', label: PROJECT_TYPE_META.other.label },
];

const STATUS_OPTIONS: Array<{ id: StatusFilter; label: string }> = [
  { id: 'all', label: 'كل الحالات' },
  { id: 'ready', label: STATUS_META.ready.label },
  { id: 'review', label: STATUS_META.review.label },
  { id: 'draft', label: STATUS_META.draft.label },
];

const MOCK_PROJECTS: Project[] = [];

const PROJECTS_CACHE_TTL_MS = 60 * 1000;

const getProjectType = (modelType: string | null): ProjectType => {
  switch (modelType) {
    case 'family':
      return 'easy';
    case 'easy':
      return 'pro';
    case 'mit24':
      return 'mit24';
    case 'bmc':
      return 'bmc';
    case 'lean':
      return 'lean';
    default:
      return 'other';
  }
};

const getProjectEditTab = (project: Project) => {
  switch (project.modelType) {
    case 'family':
      return 'new-plan-family';
    case 'easy':
      return 'new-plan-pro';
    case 'bmc':
      return 'new-plan-bmc';
    case 'mit24':
      return 'new-plan-mit24';
    case 'lean':
      return 'new-plan-lean';
    default:
      return 'editor';
  }
};

const getProjectsCacheKey = (userId: string) => `khotta_projects_cache_${userId}`;

function readProjectsCache(userId: string): Project[] | null {
  try {
    const raw = sessionStorage.getItem(getProjectsCacheKey(userId));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as { expiresAt: number; projects: Project[] };
    if (!parsed.expiresAt || parsed.expiresAt <= Date.now()) return null;

    return parsed.projects;
  } catch {
    return null;
  }
}

function writeProjectsCache(userId: string, projects: Project[]) {
  try {
    sessionStorage.setItem(
      getProjectsCacheKey(userId),
      JSON.stringify({
        expiresAt: Date.now() + PROJECTS_CACHE_TTL_MS,
        projects,
      }),
    );
  } catch {
    // Browser storage can be unavailable or full; Supabase remains the source of truth.
  }
}

interface MyProjectsProps {
  setActiveTab?: (tab: string) => void;
}

export const MyProjects: React.FC<MyProjectsProps> = ({ setActiveTab }) => {
  const { user } = useAuth();
  const { clearActiveProject } = useProjectWorkspace();
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingDeleteProject, setPendingDeleteProject] = useState<Project | null>(null);
  const [notice, setNotice] = useState<{ title: string; description: string } | null>(null);
  const itemsPerPage = 5;

  const fetchProjects = React.useCallback(async () => {
    if (!user) {
      setProjectsList([]);
      setLoadError(null);
      setIsLoading(false);
      return;
    }

    const cachedProjects = readProjectsCache(user.id);
    if (cachedProjects) {
      setProjectsList(cachedProjects);
      setLoadError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setLoadError(null);
    try {
      const { data, error } = await supabase
        .from('business_canvas')
        .select('id, project_title, sector_label, current_stage, readiness_score, validation_score, execution_score, canvas_data->>feasibilityModelType, canvas_data->feasibilityModels, canvas_data->profile, canvas_data->currentStage, canvas_data->metrics, updated_at, is_public, share_token')
        .eq('user_id', user.id)
        .is('deleted_at', null)
        .order('updated_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      if (data && data.length > 0) {
        const realProjects: Project[] = (data as BusinessCanvasProjectRow[]).map((row) => {
          const profile = row.profile || row.canvas_data?.profile;
          const currentStage = row.currentStage || row.canvas_data?.currentStage;
          const metrics = row.metrics || row.canvas_data?.metrics;
          const modelType = row.feasibilityModelType
            ?? Object.keys(row.feasibilityModels || {})[0]
            ?? row.canvas_data?.feasibilityModelType
            ?? Object.keys(row.canvas_data?.feasibilityModels || {})[0]
            ?? null;
          const hasProgress = Boolean(
            (row.readiness_score ?? metrics?.readinessScore ?? 0)
            || (row.validation_score ?? metrics?.validationScore ?? 0)
            || (row.execution_score ?? metrics?.executionScore ?? 0)
          );
          return {
            id: row.id,
            name: row.project_title || 'مشروع بدون اسم',
            sector: row.sector_label || profile?.sectorLabel || 'غير محدد',
            type: getProjectType(modelType),
            status: (row.current_stage || currentStage) === 'execution'
              ? 'ready'
              : hasProgress
                ? 'review'
                : 'draft',
            progress: {
              market: row.validation_score ?? metrics?.validationScore ?? 0,
              product: row.readiness_score ?? metrics?.readinessScore ?? 0,
              financial: row.execution_score ?? metrics?.executionScore ?? 0,
            },
            aiScore: row.readiness_score ?? metrics?.readinessScore ?? 0,
            lastEdited: new Date(row.updated_at).toLocaleDateString('ar-SA-u-nu-latn'),
            marketCap: '-',
            isFavorite: false,
            isMockExample: false,
            modelType,
            is_public: row.is_public,
            share_token: row.share_token,
          };
        });
        const nextProjects = realProjects;
        setProjectsList(nextProjects);
        writeProjectsCache(user.id, nextProjects);
      } else {
        setProjectsList([]);
        writeProjectsCache(user.id, []);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setProjectsList([]);
      setLoadError('تعذر تحميل مشاريعك من قاعدة البيانات. تحقق من الاتصال أو حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchProjects();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchProjects]);

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return projectsList.filter((project) => {
      const typeLabel = PROJECT_TYPE_META[project.type].label.toLowerCase();
      const matchesSearch =
        !query ||
        project.name.toLowerCase().includes(query) ||
        project.sector.toLowerCase().includes(query) ||
        typeLabel.includes(query);
      const matchesType = typeFilter === 'all' || project.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter, projectsList]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => setCurrentPage(1), 0);
    return () => window.clearTimeout(timer);
  }, [searchTerm, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredProjects, currentPage]);

  const handleDelete = async (id: string, name: string) => {
    const project = projectsList.find((item) => item.id === id);
    if (!project) return;
    setPendingDeleteProject(project);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteProject) return;

    try {
      const { data, error } = await supabase
        .from('business_canvas')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', pendingDeleteProject.id)
        .eq('user_id', user?.id ?? '')
        .select('id')
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('PROJECT_DELETE_NOT_APPLIED');
      clearActiveProject(pendingDeleteProject.id);
      setProjectsList((prev) => {
        const nextProjects = prev.filter((p) => p.id !== pendingDeleteProject.id);
        if (user?.id) writeProjectsCache(user.id, nextProjects);
        return nextProjects;
      });
      if (user?.id) invalidateProjectCountCache(user.id);
      if (paginatedProjects.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
      setPendingDeleteProject(null);
    } catch (err) {
      console.error('Error deleting project:', err);
      setNotice({
        title: 'تعذر حذف المشروع',
        description: 'حدث خطأ أثناء حذف المشروع. حاول مرة أخرى بعد لحظات.',
      });
    }
  };

  const [selectedShareProject, setSelectedShareProject] = useState<Project | null>(null);

  const handleShare = (project: Project) => {
    setSelectedShareProject(project);
  };

  const handleUpdatePublicStatus = (id: string, isPublic: boolean, shareToken?: string | null) => {
    setSelectedShareProject((current) =>
      current?.id === id ? { ...current, is_public: isPublic, share_token: shareToken ?? null } : current
    );
    setProjectsList((prev) => {
      const nextProjects = prev.map((p) =>
        p.id === id ? { ...p, is_public: isPublic, share_token: shareToken ?? null } : p
      );
      if (user?.id) writeProjectsCache(user.id, nextProjects);
      return nextProjects;
    });
  };

  const hasActiveFilters = searchTerm.trim().length > 0 || typeFilter !== 'all' || statusFilter !== 'all';

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
  };

  if (isLoading) {
    return (
      <main dir="rtl" className="min-h-screen bg-background px-4 py-10 flex justify-center items-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground">
          <Activity className="size-8 animate-spin" />
          <p>جاري تحميل المشاريع...</p>
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main dir="rtl" className="min-h-screen bg-background px-4 py-4 sm:py-5">
        <ErrorState
          description={loadError}
          retryLabel="إعادة تحميل المشاريع"
          onRetry={fetchProjects}
        />
      </main>
    );
  }

  if (projectsList.length === 0) {
    return (
      <main dir="rtl" className="min-h-screen bg-background px-4 py-4 sm:py-5">
        <EmptyState
          title="لا توجد مشاريع محفوظة حالياً"
          description="ابدأ بإنشاء مشروع جديد ثم ستظهر المشاريع هنا."
          actionLabel="إنشاء مشروع جديد"
          onAction={() => setActiveTab?.('new-plan')}
        />
      </main>
    );
  }

  return (
    <main dir="rtl" className="app-page-shell-wide space-y-6 text-right">
      {/* Header Section */}
      <section className="rounded-xl bg-card p-4 sm:p-5 shadow-2xs border-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-right">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">مشاريعي</h1>
              <Badge variant="secondary" className="bg-muted text-foreground font-semibold text-xs border-0">
                {projectsList.filter((p) => !p.isMockExample && !p.id.startsWith('example')).length} مشروع
              </Badge>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              جميع دراسات الجدوى ونماذج الأعمال المحفوظة في حسابك.
            </p>
          </div>

          <Button type="button" onClick={() => setActiveTab?.('new-plan')} className="w-full sm:w-auto shadow-2xs border-0">
            <Plus className="size-4" />
            <span>مشروع جديد</span>
          </Button>
        </div>
      </section>

      {/* Main Table & Filters Card */}
      <Card className="shadow-2xs border-0">
        <CardHeader className="p-3 sm:p-4 pb-2 sm:pb-2 border-0">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[minmax(240px,1fr)_150px_140px_auto] lg:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="ابحث بالاسم أو القطاع..."
                className="h-8 pr-8 text-[11px] border-0 bg-muted/50 rounded-lg"
              />
            </div>

            <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as TypeFilter)}>
              <SelectTrigger className="h-8 text-[11px] text-right border-0 bg-muted/50 rounded-lg">
                <SelectValue placeholder="نوع النموذج" />
              </SelectTrigger>
              <SelectContent>
                {TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.id} value={option.id} className="text-xs">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
              <SelectTrigger className="h-8 text-[11px] text-right border-0 bg-muted/50 rounded-lg">
                <SelectValue placeholder="حالة المشروع" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.id} value={option.id} className="text-xs">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="ghost" size="sm" onClick={resetFilters} disabled={!hasActiveFilters} className="h-8 px-2.5 text-[11px] font-medium text-muted-foreground hover:text-foreground">
              <RefreshCcw className="size-3" />
              تصفير
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 sm:p-0 border-0">
          {filteredProjects.length === 0 ? (
            <div className="p-6">
              <NoResultsState description="لا يوجد مشروع يطابق البحث أو الفلاتر الحالية." onReset={resetFilters} />
            </div>
          ) : (
            <>
              <ProjectsTable 
                projects={paginatedProjects} 
                setActiveTab={setActiveTab} 
                onDelete={handleDelete}
                onShare={handleShare}
              />
              <ProjectsMobileList 
                projects={paginatedProjects} 
                setActiveTab={setActiveTab} 
                onDelete={handleDelete}
                onShare={handleShare}
              />
              
              {totalPages > 1 && (
                <div className="p-4 border-0">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          aria-disabled={currentPage === 1}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            isActive={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className="cursor-pointer"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          aria-disabled={currentPage === totalPages}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <ProjectShareModal
        project={selectedShareProject}
        onClose={() => setSelectedShareProject(null)}
        onUpdatePublicStatus={handleUpdatePublicStatus}
      />
      <DeleteProjectDialog
        project={pendingDeleteProject}
        onClose={() => setPendingDeleteProject(null)}
        onConfirm={confirmDelete}
      />
      <NoticeDialog notice={notice} onClose={() => setNotice(null)} />
    </main>
  );
};

function DeleteProjectDialog({
  project,
  onClose,
  onConfirm,
}: {
  project: Project | null;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[440px]" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>حذف المشروع</DialogTitle>
          <DialogDescription>
            سيتم نقل مشروع &quot;{project?.name}&quot; إلى المحذوفات. لا تنفذ هذه العملية إلا إذا كنت متأكداً.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="destructive" onClick={onConfirm}>
            حذف المشروع
          </Button>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NoticeDialog({
  notice,
  onClose,
}: {
  notice: { title: string; description: string } | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={Boolean(notice)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px]" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>{notice?.title}</DialogTitle>
          <DialogDescription>{notice?.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>حسناً</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProjectsTable({
  projects,
  setActiveTab,
  onDelete,
  onShare,
}: {
  projects: Project[];
  setActiveTab?: (tab: string) => void;
  onDelete: (id: string, name: string) => void;
  onShare: (project: Project) => void;
}) {
  const handleOpenProject = (project: Project) => {
    if (project.isMockExample) {
      setActiveTab?.(getProjectEditTab(project));
      return;
    }

    window.location.assign(getProjectEditPath(project.id));
  };

  return (
    <div className="hidden lg:block overflow-x-auto">
      <Table dir="rtl" containerClassName="border-0 shadow-none rounded-none bg-transparent">
        <TableHeader className="bg-muted/40">
          <TableRow className="border-0">
            <TableHead className="h-9 w-[100px] text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground">إجراءات</TableHead>
            <TableHead className="h-9 min-w-[260px] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">المشروع</TableHead>
            <TableHead className="h-9 min-w-[130px] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">النموذج</TableHead>
            <TableHead className="h-9 min-w-[140px] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">التقدم</TableHead>
            <TableHead className="h-9 min-w-[90px] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">التقييم</TableHead>
            <TableHead className="h-9 min-w-[120px] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">الحالة</TableHead>
            <TableHead className="h-9 min-w-[110px] text-[11px] font-bold uppercase tracking-wider text-muted-foreground">آخر تعديل</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <ProjectTableRow 
              key={project.id} 
              project={project} 
              setActiveTab={setActiveTab} 
              onDelete={onDelete}
              onShare={onShare}
              onOpen={() => handleOpenProject(project)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function ProjectTableRow({
  project,
  setActiveTab,
  onDelete,
  onShare,
  onOpen,
}: {
  project: Project;
  setActiveTab?: (tab: string) => void;
  onDelete: (id: string, name: string) => void;
  onShare: (project: Project) => void;
  onOpen: () => void;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const ProjectIcon = PROJECT_TYPE_META[project.type].icon;
  const editHref = project.isMockExample ? null : getProjectEditPath(project.id);

  const handleCopyLink = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const shareId = project.share_token || project.id;
    const shareUrl = `${window.location.origin}/share/${shareId}`;
    try {
      await copyShareUrl(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      onShare(project);
    }
  };

  const formattedDate = project.lastEdited === 'مثال' || !project.lastEdited
    ? 'منذ يومين'
    : project.lastEdited;

  return (
    <TableRow key={project.id} className="border-0 hover:bg-muted/50 transition-colors group cursor-pointer" onClick={onOpen}>
      <TableCell className="py-2.5 px-2 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-1">
          {editHref ? (
            <Button asChild variant="ghost" size="icon-sm" className="h-7 w-7 text-muted-foreground hover:text-primary rounded-lg" title="تعديل">
              <a href={editHref}>
                <Pencil className="size-3.5" />
              </a>
            </Button>
          ) : (
            <Button variant="ghost" size="icon-sm" onClick={onOpen} className="h-7 w-7 text-muted-foreground hover:text-primary rounded-lg" title="تعديل">
              <Pencil className="size-3.5" />
            </Button>
          )}
          <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); onShare(project); }} className="h-7 w-7 text-muted-foreground hover:text-primary rounded-lg" title="مشاركة">
            <Share2 className="size-3.5" />
          </Button>
          <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); onDelete(project.id, project.name); }} className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg" title="حذف">
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </TableCell>

      <TableCell className="py-2.5 px-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-xs">
            <ProjectIcon className="size-4" />
          </div>
          <div className="min-w-0 flex-1 text-right">
            {editHref ? (
              <a
                href={editHref}
                onClick={(e) => e.stopPropagation()}
                className="block max-w-[260px] truncate font-bold text-foreground hover:text-primary hover:underline text-xs"
              >
                {project.name}
              </a>
            ) : (
              <span className="block max-w-[260px] truncate font-bold text-foreground hover:text-primary text-xs text-right">
                {project.name}
              </span>
            )}
            <p className="mt-0.5 truncate text-[11px] font-medium text-muted-foreground">
              {project.sector}
            </p>
          </div>
          {project.isFavorite ? <Star className="size-3.5 shrink-0 text-amber-500" fill="currentColor" /> : null}
        </div>
      </TableCell>

      <TableCell>
        <ProjectTypeBadge type={project.type} />
      </TableCell>

      <TableCell>
        <ProgressSummary project={project} />
      </TableCell>

      <TableCell>
        <Badge variant={project.aiScore >= 80 ? 'success' : 'secondary'} className="tabular-nums font-bold text-xs">
          {project.aiScore}%
        </Badge>
      </TableCell>

      <TableCell>
        <ProjectStatusBadge status={project.status} />
      </TableCell>

      <TableCell className="whitespace-nowrap text-muted-foreground text-xs font-normal">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5 opacity-70" />
          {formattedDate}
        </span>
      </TableCell>
    </TableRow>
  );
}

function ProjectsMobileList({
  projects,
  setActiveTab,
  onDelete,
  onShare,
}: {
  projects: Project[];
  setActiveTab?: (tab: string) => void;
  onDelete: (id: string, name: string) => void;
  onShare: (project: Project) => void;
}) {
  const handleOpenProject = (project: Project) => {
    if (project.id.startsWith('p') || project.id.startsWith('example')) {
      setActiveTab?.(getProjectEditTab(project));
      return;
    }

    window.location.assign(getProjectEditPath(project.id));
  };

  return (
    <div className="grid gap-2.5 lg:hidden">
      {projects.map((project) => (
        <div key={project.id} className="p-3.5 sm:p-4 rounded-xl bg-card shadow-2xs space-y-3">
          <div className="flex items-center justify-between gap-3">
            <ProjectStatusBadge status={project.status} />
            <div className="flex items-center gap-1">
              {!project.id.startsWith('p') && !project.id.startsWith('example') ? (
                <Button asChild variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-primary rounded-lg">
                  <a href={getProjectEditPath(project.id)} title="تعديل">
                    <Pencil className="size-4" />
                  </a>
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => handleOpenProject(project)}
                  title="تعديل"
                  className="text-muted-foreground hover:text-primary rounded-lg"
                >
                  <Pencil className="size-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onShare(project)}
                title="مشاركة"
                className="text-muted-foreground hover:text-primary rounded-lg"
              >
                <Share2 className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onDelete(project.id, project.name)}
                title="حذف"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1 text-right">
              <h3 className="truncate text-sm font-extrabold text-foreground">{project.name}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {project.sector}
              </p>
            </div>
            {project.isFavorite ? <Star className="size-4 shrink-0 text-amber-500" fill="currentColor" /> : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ProjectTypeBadge type={project.type} />
            <Badge variant={project.aiScore >= 80 ? 'success' : 'secondary'} className="tabular-nums font-bold text-xs">
              {project.aiScore}%
            </Badge>
          </div>

          <ProgressSummary project={project} />

          {!project.id.startsWith('p') && !project.id.startsWith('example') ? (
            <Button asChild className="w-full font-bold text-xs shadow-2xs rounded-lg h-9">
              <a href={getProjectEditPath(project.id)}>فتح المشروع</a>
            </Button>
          ) : (
            <Button className="w-full font-bold text-xs shadow-2xs rounded-lg h-9" onClick={() => handleOpenProject(project)}>
              فتح المشروع
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

function ProjectTypeBadge({ type }: { type: ProjectType }) {
  const meta = PROJECT_TYPE_META[type];
  const Icon = meta.icon;

  return (
    <Badge variant="secondary" className="gap-1.5 bg-muted/60 text-muted-foreground border-0 font-medium text-[11px]">
      <Icon className="size-3.5" />
      {meta.shortLabel}
    </Badge>
  );
}

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status] || STATUS_META.draft;
  const Icon = meta.icon;

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold shrink-0', meta.className)}>
      <span className={cn('size-1.5 rounded-full shrink-0', meta.dotClass)} />
      <Icon className="size-3.5 shrink-0" />
      <span>{meta.label}</span>
    </span>
  );
}

function ProgressSummary({ project }: { project: Project }) {
  const averageProgress = getAverageProgress(project);

  return (
    <div className="min-w-[130px] space-y-1.5">
      <div className="flex items-center justify-between text-xs font-bold tabular-nums">
        <span className="text-[11px] text-muted-foreground font-medium">نسبة التقدم</span>
        <span className={cn(
          averageProgress >= 100 ? "text-emerald-600 dark:text-emerald-400" : averageProgress >= 50 ? "text-primary" : "text-amber-600 dark:text-amber-400"
        )}>
          {averageProgress}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            averageProgress >= 100 ? "bg-emerald-500" : averageProgress >= 50 ? "bg-primary" : "bg-amber-500"
          )}
          style={{ width: `${averageProgress}%` }}
        />
      </div>
    </div>
  );
}

// Removed unused ProjectActions dropdown component

function getAverageProgress(project: Project) {
  return Math.round((project.progress.market + project.progress.product + project.progress.financial) / 3);
}

function ProjectShareModal({
  project,
  onClose,
  onUpdatePublicStatus,
}: {
  project: Project | null;
  onClose: () => void;
  onUpdatePublicStatus?: (id: string, isPublic: boolean, shareToken?: string | null) => void;
}) {
  const [isPublic, setIsPublic] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [shareError, setShareError] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      const timer = window.setTimeout(() => {
        setIsPublic(Boolean(project.is_public));
        setCopied(false);
        setShareError(null);
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, [project]);

  if (!project) return null;

  const shareId = project.share_token || project.id;
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/share/${shareId}` : '';

  const handleTogglePublic = async (checked: boolean) => {
    const previousValue = isPublic;
    setIsUpdating(true);
    setShareError(null);
    try {
      if (!project.isMockExample) {
        const response = checked
          ? await publishProject(project.id).then((result) => ({ ok: true, json: async () => ({ shareToken: result.shareToken }) }))
          : await fetch('/api/projects/publish', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId: project.id, isPublic: false }),
          });

        if (!response.ok) {
          throw new Error('Failed to update public status');
        }

        const result = (await response.json()) as { shareToken?: string | null };
        onUpdatePublicStatus?.(project.id, checked, result.shareToken ?? null);
      } else {
        onUpdatePublicStatus?.(project.id, checked);
      }
      setIsPublic(checked);
    } catch (err) {
      console.error('Failed to update public status:', err);
      setIsPublic(previousValue);
      setShareError('تعذر تحديث خصوصية المشروع. لم يتم تغيير حالته في قاعدة البيانات.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCopy = async () => {
    try {
      setShareError(null);
      await copyShareUrl(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Copy failed:', err);
      setShareError('تعذر نسخ الرابط تلقائيًا. حدده من الحقل وانسخه يدويًا.');
    }
  };

  return (
    <Dialog open={Boolean(project)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[480px]" dir="rtl">
        <DialogHeader className="space-y-1 text-right">
          <div className="flex items-center gap-2 text-primary">
            <Share2 className="size-5" />
            <DialogTitle className="text-lg font-bold">مشاركة المشروع</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            تحديد إعدادات الخصوصية وإنشاء رابط عام لمشاركة هذا المشروع.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Project Details */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background shadow-2xs">
                <Globe className="size-4 text-muted-foreground" />
              </div>
              <div className="min-w-0 text-right">
                <p className="truncate text-sm font-bold text-foreground">{project.name}</p>
                <p className="text-xs text-muted-foreground">{project.sector}</p>
              </div>
            </div>
            <Badge variant={isPublic ? 'success' : 'secondary'} className="shrink-0 text-xs font-semibold">
              {isPublic ? 'عام' : 'خاص'}
            </Badge>
          </div>

          {/* Privacy Status Switch Box */}
          <div className="flex items-center justify-between rounded-xl border border-border p-4 bg-card shadow-2xs">
            <div className="space-y-0.5 text-right pl-3">
              <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                {isPublic ? (
                  <>
                    <Globe className="size-4 text-emerald-600" />
                    <span>وضع عام (متاح بالرابط)</span>
                  </>
                ) : (
                  <>
                    <Lock className="size-4 text-amber-600" />
                    <span>وضع خاص (لك فقط)</span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {isPublic
                  ? 'يمكن لأي شخص لديه الرابط استعراض وقراءة بيانات المشروع.'
                  : 'المشروع محمي ولا يمكن استعراضه إلا من خلال حسابك الخاص.'}
              </p>
            </div>
            <Switch
              checked={isPublic}
              disabled={isUpdating}
              onCheckedChange={handleTogglePublic}
            />
          </div>

          {/* Public Link Copy Section */}
          {isPublic ? (
            <div className="space-y-2 rounded-xl border border-emerald-500/25 bg-emerald-50/50 p-4 dark:bg-emerald-950/20">
              <label className="block text-xs font-bold text-foreground text-right">رابط المشاركة العام</label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={shareUrl}
                  className="h-10 text-xs dir-ltr font-mono bg-background select-all border-emerald-300 dark:border-emerald-800"
                />
                <Button
                  type="button"
                  onClick={handleCopy}
                  className={cn(
                    "h-10 shrink-0 gap-1.5 px-4 font-semibold transition-colors",
                    copied ? "bg-emerald-600 text-white hover:bg-emerald-700" : ""
                  )}
                  variant={copied ? "secondary" : "default"}
                >
                  {copied ? (
                    <>
                      <Check className="size-4" />
                      <span>تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      <span>نسخ الرابط</span>
                    </>
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                  ✓ الرابط جاهز للمشاركة بشكل آمن
                </span>
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                >
                  معاينة الرابط
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-4 text-center text-xs text-muted-foreground">
              قم بتفعيل الوضع <strong>العام</strong> لإظهار وتوليد رابط المشاركة القابل للنسخ.
            </div>
          )}
          {shareError ? (
            <p role="alert" className="text-sm leading-6 text-destructive">
              {shareError}
            </p>
          ) : null}
        </div>

        <DialogFooter className="sm:justify-start">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto font-medium">
            إغلاق
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
