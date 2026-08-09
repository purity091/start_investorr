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
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { EmptyState, ErrorState, NoResultsState } from '@/components/ui/PageStates';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import { getProjectEditPath } from '@/features/workspace/workspaceNavigation';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
  { label: string; className: string; icon: React.ComponentType<{ className?: string }> }
> = {
  ready: {
    label: 'جاهز',
    className: 'bg-emerald-100 text-emerald-800',
    icon: CheckCircle2,
  },
  review: {
    label: 'قيد المراجعة',
    className: 'bg-amber-100 text-amber-800',
    icon: Clock,
  },
  draft: {
    label: 'مسودة',
    className: 'bg-muted text-muted-foreground',
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
            lastEdited: new Date(row.updated_at).toLocaleDateString('ar-SA'),
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
    <main dir="rtl" className="min-h-screen w-full max-w-full min-w-0 overflow-x-hidden bg-background px-3 pb-16 pt-4 sm:px-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-[1500px] min-w-0 flex-col gap-4">
        <Card className="shadow-none">
          <CardHeader className="gap-3 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1 text-right">
              <CardTitle className="text-xl">مشاريعي</CardTitle>
              <CardDescription>
                {projectsList.length} مشروع خاص
              </CardDescription>
            </div>

            <Button size="lg" onClick={() => setActiveTab?.('new-plan')}>
              <Plus className="size-4" />
              مشروع جديد
            </Button>
          </CardHeader>

          <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-5 pt-0 sm:pt-0">
            <div className="grid gap-2 lg:grid-cols-[minmax(280px,1fr)_190px_170px_auto] lg:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="ابحث باسم المشروع أو القطاع"
                  className="h-10 pr-9"
                />
              </div>

              <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as TypeFilter)}>
                <SelectTrigger className="h-10 text-right">
                  <SelectValue placeholder="النموذج" />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                <SelectTrigger className="h-10 text-right">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="ghost" size="lg" onClick={resetFilters} disabled={!hasActiveFilters}>
                <RefreshCcw className="size-4" />
                تصفير
              </Button>
            </div>

            {filteredProjects.length === 0 ? (
              <NoResultsState description="لا يوجد مشروع يطابق البحث أو الفلاتر الحالية." onReset={resetFilters} />
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
                  <div className="mt-4 border-t border-border pt-4">
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
      </div>

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
    <div className="hidden overflow-x-auto rounded-xl border border-border bg-card shadow-sm lg:block">
      <Table dir="rtl">
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent">
            <TableHead className="min-w-[260px]">
              <div className="flex cursor-pointer items-center gap-2 font-bold text-foreground transition-colors hover:text-primary">
                المشروع
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead className="w-[140px] font-bold text-foreground">إجراءات</TableHead>
            <TableHead className="min-w-[140px]">
              <div className="flex cursor-pointer items-center gap-2 font-bold text-foreground transition-colors hover:text-primary">
                النموذج
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead className="min-w-[160px] font-bold text-foreground">التقدم</TableHead>
            <TableHead className="min-w-[100px]">
              <div className="flex cursor-pointer items-center gap-2 font-bold text-foreground transition-colors hover:text-primary">
                التقييم
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead className="min-w-[120px] font-bold text-foreground">الحالة</TableHead>
            <TableHead className="min-w-[120px]">
              <div className="flex cursor-pointer items-center gap-2 font-bold text-foreground transition-colors hover:text-primary">
                آخر تعديل
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
              </div>
            </TableHead>
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

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareId = project.share_token || project.id;
    const shareUrl = `${window.location.origin}/share/${shareId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
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
    <TableRow className="group transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <TableCell className="py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
            <ProjectIcon className="size-5 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1 text-right">
            {editHref ? (
              <a
                href={editHref}
                className="block max-w-[260px] truncate text-sm font-bold leading-5 text-foreground hover:text-primary hover:underline"
              >
                {project.name}
              </a>
            ) : (
              <button
                type="button"
                onClick={onOpen}
                className="block max-w-[260px] truncate text-sm font-bold leading-5 text-foreground hover:text-primary hover:underline"
              >
                {project.name}
              </button>
            )}
            <p className="mt-0.5 truncate text-[13px] font-medium leading-5 text-muted-foreground">
              {project.sector} <span className="mx-1 text-muted-foreground/40">•</span> {project.marketCap}
            </p>
          </div>
          {project.isFavorite ? <Star className="size-4 shrink-0 text-amber-500" fill="currentColor" /> : null}
        </div>
      </TableCell>

      <TableCell className="py-4">
        <div className="flex items-center gap-1 opacity-100">
          {editHref ? (
            <Button asChild variant="ghost" size="icon-sm" className="size-8 text-muted-foreground hover:bg-muted hover:text-primary">
              <a href={editHref} title="تعديل المشروع">
                <Pencil className="size-4" />
              </a>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onOpen}
              title="تعديل المشروع"
              className="size-8 text-muted-foreground hover:bg-muted hover:text-primary"
            >
              <Pencil className="size-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onShare(project)}
            title="إعدادات إتاحة ومشاركة المشروع"
            className="size-8 text-muted-foreground hover:bg-muted hover:text-primary"
          >
            <Share2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopyLink}
            title={isCopied ? "تم نسخ الرابط!" : "نسخ رابط المشروع مباشر"}
            className={cn(
              "size-8 transition-colors",
              isCopied
                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                : "text-muted-foreground hover:bg-muted hover:text-primary"
            )}
          >
            {isCopied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(project.id, project.name)}
            title="حذف"
            className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>

      <TableCell>
        <ProjectTypeBadge type={project.type} />
      </TableCell>

      <TableCell>
        <ProgressSummary project={project} />
      </TableCell>

      <TableCell>
        <Badge variant={project.aiScore >= 80 ? 'success' : 'secondary'} className="tabular-nums">
          {project.aiScore}%
        </Badge>
      </TableCell>

      <TableCell>
        <ProjectStatusBadge status={project.status} />
      </TableCell>

      <TableCell>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground whitespace-nowrap">
          <Clock className="size-4 text-muted-foreground/70" />
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
    <div className="grid gap-3 lg:hidden">
      {projects.map((project) => (
        <Card key={project.id} className="p-3 sm:p-4 shadow-sm sm:shadow-none border border-border">
          <div className="flex items-start justify-between gap-3">
            <ProjectStatusBadge status={project.status} />
            <div className="flex items-center gap-1">
              {!project.id.startsWith('p') && !project.id.startsWith('example') ? (
                <Button asChild variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-primary">
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
                  className="text-muted-foreground hover:text-primary"
                >
                  <Pencil className="size-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onShare(project)}
                title="مشاركة"
                className="text-muted-foreground hover:text-primary"
              >
                <Share2 className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onDelete(project.id, project.name)}
                title="حذف"
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <div className="min-w-0 flex-1 text-right">
              <h3 className="truncate text-sm font-medium text-foreground">{project.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {project.sector} · {project.marketCap}
              </p>
            </div>
            {project.isFavorite ? <Star className="size-4 shrink-0 text-amber-600" fill="currentColor" /> : null}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <ProjectTypeBadge type={project.type} />
            <Badge variant={project.aiScore >= 80 ? 'success' : 'secondary'} className="tabular-nums">
              {project.aiScore}%
            </Badge>
          </div>

          <div className="mt-3">
            <ProgressSummary project={project} />
          </div>

          {!project.id.startsWith('p') && !project.id.startsWith('example') ? (
            <Button asChild className="mt-4 w-full">
              <a href={getProjectEditPath(project.id)}>فتح المشروع</a>
            </Button>
          ) : (
            <Button className="mt-4 w-full" onClick={() => handleOpenProject(project)}>
              فتح المشروع
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
}

function ProjectTypeBadge({ type }: { type: ProjectType }) {
  const meta = PROJECT_TYPE_META[type];
  const Icon = meta.icon;

  return (
    <Badge variant="outline" className="gap-1.5 bg-background">
      <Icon className="size-3.5" />
      {meta.shortLabel}
    </Badge>
  );
}

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;

  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium', meta.className)}>
      <Icon className="size-3.5" />
      {meta.label}
    </span>
  );
}

function ProgressSummary({ project }: { project: Project }) {
  const averageProgress = getAverageProgress(project);

  return (
    <div className="min-w-[160px] space-y-2">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="font-medium tabular-nums text-foreground">{averageProgress}%</span>
        <span className="text-muted-foreground">الإنجاز</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${averageProgress}%` }} />
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
        const response = await fetch('/api/projects/publish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectId: project.id, isPublic: checked }),
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
      await navigator.clipboard.writeText(shareUrl);
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
