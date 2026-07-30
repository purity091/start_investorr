import React, { useMemo, useState } from 'react';
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
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { EmptyState, NoResultsState } from '@/components/ui/PageStates';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
type ProjectType = 'easy' | 'pro' | 'mit24' | 'bmc';
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
}

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
];

const STATUS_OPTIONS: Array<{ id: StatusFilter; label: string }> = [
  { id: 'all', label: 'كل الحالات' },
  { id: 'ready', label: STATUS_META.ready.label },
  { id: 'review', label: STATUS_META.review.label },
  { id: 'draft', label: STATUS_META.draft.label },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'أكاديمية الذكاء الاصطناعي (مثال)',
    sector: 'EdTech',
    type: 'pro',
    status: 'ready',
    progress: { market: 100, product: 90, financial: 95 },
    aiScore: 94,
    lastEdited: 'منذ ساعتين',
    marketCap: '$1.4M',
    isFavorite: true,
  },
  {
    id: 'example-easy',
    name: 'منصة الحصاد الذكي (مثال)',
    sector: 'AgriTech',
    type: 'easy',
    status: 'review',
    progress: { market: 85, product: 70, financial: 40 },
    aiScore: 78,
    lastEdited: 'منذ 5 ساعات',
    marketCap: '$800K',
    isFavorite: false,
  },
  {
    id: 'p3',
    name: 'بوابة الدفع الإقليمية (مثال)',
    sector: 'FinTech',
    type: 'mit24',
    status: 'draft',
    progress: { market: 40, product: 20, financial: 10 },
    aiScore: 45,
    lastEdited: 'أمس',
    marketCap: '$5.2M',
    isFavorite: false,
  },
  {
    id: 'example-bmc',
    name: 'عقارات افتراضية (مثال)',
    sector: 'Property',
    type: 'bmc',
    status: 'ready',
    progress: { market: 100, product: 100, financial: 90 },
    aiScore: 91,
    lastEdited: 'منذ يومين',
    marketCap: '$12M',
    isFavorite: true,
  },
  {
    id: 'p5',
    name: 'استوديو محتوى عربي (مثال)',
    sector: 'Media',
    type: 'easy',
    status: 'draft',
    progress: { market: 55, product: 45, financial: 25 },
    aiScore: 59,
    lastEdited: 'قبل 3 أيام',
    marketCap: '$420K',
    isFavorite: false,
  }
];

interface MyProjectsProps {
  setActiveTab?: (tab: string) => void;
}

export const MyProjects: React.FC<MyProjectsProps> = ({ setActiveTab }) => {
  const { user } = useAuth();
  const [projectsList, setProjectsList] = useState<Project[]>(MOCK_PROJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  React.useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('business_canvas')
          .select('id, project_title, canvas_data, updated_at')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const realProjects: Project[] = data.map((row) => ({
            id: row.id,
            name: row.project_title || 'مشروع بدون اسم',
            sector: row.canvas_data?.profile?.sectorLabel || 'غير محدد',
            type: 'pro', // Defaulting for now
            status: row.canvas_data?.currentStage === 'execution' ? 'ready' : 'review',
            progress: {
              market: row.canvas_data?.metrics?.validationScore || 0,
              product: row.canvas_data?.metrics?.readinessScore || 0,
              financial: row.canvas_data?.metrics?.executionScore || 0,
            },
            aiScore: row.canvas_data?.metrics?.readinessScore || 0,
            lastEdited: new Date(row.updated_at).toLocaleDateString('ar-SA'),
            marketCap: '-',
            isFavorite: false,
          }));

          setProjectsList([...realProjects, ...MOCK_PROJECTS]);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [user]);

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
    setCurrentPage(1);
  }, [searchTerm, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const paginatedProjects = useMemo(() => {
    return filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  }, [filteredProjects, currentPage]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف مشروع "${name}"؟`)) {
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
      // Adjust page if deleting the last item on the current page
      if (paginatedProjects.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  const handleShare = async (id: string, name: string) => {
    try {
      // Opt-in public sharing
      const makePublic = window.confirm(`هل ترغب في إنشاء رابط عام (Public Link) لمشروع "${name}" لتمكين الآخرين من مشاهدته؟`);
      if (makePublic) {
        await supabase.from('business_canvas').update({ is_public: true }).eq('id', id);
        
        const shareUrl = `${window.location.origin}/share/${id}`;
        if (navigator.share) {
          navigator.share({
            title: name,
            text: `مشاهدة مشروع: ${name}`,
            url: shareUrl,
          }).catch(console.error);
        } else {
          navigator.clipboard.writeText(shareUrl);
          alert(`تم تفعيل المشاركة بنجاح! رابط المشروع متاح الآن في الحافظة.`);
        }
      }
    } catch (err) {
      console.error('Error sharing:', err);
      alert('حدث خطأ أثناء إعداد رابط المشاركة.');
    }
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
    <main dir="rtl" className="min-h-screen bg-background px-3 pb-16 pt-4 sm:px-4 lg:px-6">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-4">
        <Card className="shadow-none">
          <CardHeader className="gap-3 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1 text-right">
              <CardTitle className="text-xl">مشاريعي</CardTitle>
              <CardDescription>
                {filteredProjects.length} من {MOCK_PROJECTS.length} مشاريع
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
    </main>
  );
};

function ProjectsTable({
  projects,
  setActiveTab,
  onDelete,
  onShare,
}: {
  projects: Project[];
  setActiveTab?: (tab: string) => void;
  onDelete: (id: string, name: string) => void;
  onShare: (id: string, name: string) => void;
}) {
  const { loadProject } = useProjectWorkspace();

  const handleOpenProject = async (project: Project) => {
    if (!project.id.startsWith('p') && !project.id.startsWith('example')) {
      await loadProject(project.id);
    }
    setActiveTab?.('editor');
  };

  return (
    <div className="hidden rounded-xl border border-border bg-card shadow-sm lg:block">
      <Table dir="rtl">
        <TableHeader className="bg-muted/30">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[45px] px-2 text-center"></TableHead>
            <TableHead className="w-[50px] px-4">
              <Checkbox className="translate-y-0.5" />
            </TableHead>
            <TableHead className="min-w-[280px]">
              <div className="flex cursor-pointer items-center gap-2 font-bold text-foreground transition-colors hover:text-primary">
                المشروع
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead className="w-[130px] font-bold text-foreground">إجراءات</TableHead>
            <TableHead className="min-w-[150px]">
              <div className="flex cursor-pointer items-center gap-2 font-bold text-foreground transition-colors hover:text-primary">
                النموذج
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead className="min-w-[180px] font-bold text-foreground">التقدم</TableHead>
            <TableHead className="min-w-[110px]">
              <div className="flex cursor-pointer items-center gap-2 font-bold text-foreground transition-colors hover:text-primary">
                التقييم
                <ArrowUpDown className="size-3.5 text-muted-foreground" />
              </div>
            </TableHead>
            <TableHead className="min-w-[130px] font-bold text-foreground">الحالة</TableHead>
            <TableHead className="min-w-[130px]">
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
  onShare: (id: string, name: string) => void;
  onOpen: () => void;
}) {
  const [isFav, setIsFav] = useState(project.isFavorite);
  const ProjectIcon = PROJECT_TYPE_META[project.type].icon;

  return (
    <TableRow className="group transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <TableCell className="px-2 py-4 text-center">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={(e) => {
            e.stopPropagation();
            setIsFav(!isFav);
          }}
          className={cn(
            "size-7 rounded-lg transition-colors",
            isFav
              ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
              : "text-muted-foreground hover:text-amber-600 hover:bg-muted"
          )}
          title={isFav ? "إلغاء حفظ المشروع" : "حفظ المشروع"}
        >
          {isFav ? (
            <BookmarkCheck className="size-3.5 text-amber-600 fill-amber-600/20" />
          ) : (
            <Bookmark className="size-3.5" />
          )}
        </Button>
      </TableCell>
      <TableCell className="px-4 py-4">
        <Checkbox className="translate-y-0.5 transition-opacity group-hover:opacity-100 opacity-40 data-[state=checked]:opacity-100" />
      </TableCell>
      <TableCell className="py-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background shadow-sm">
            <ProjectIcon className="size-5 text-muted-foreground" />
          </div>
          <div className="min-w-0 flex-1 text-right">
            <button
              type="button"
              onClick={onOpen}
              className="block max-w-[260px] truncate text-sm font-bold leading-5 text-foreground hover:text-primary hover:underline"
            >
              {project.name}
            </button>
            <p className="mt-0.5 truncate text-[13px] font-medium leading-5 text-muted-foreground">
              {project.sector} <span className="mx-1 text-muted-foreground/40">•</span> {project.marketCap}
            </p>
          </div>
          {project.isFavorite ? <Star className="size-4 shrink-0 text-amber-500" fill="currentColor" /> : null}
        </div>
      </TableCell>

      <TableCell className="py-4">
        <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onOpen}
            title="تعديل"
            className="size-8 text-muted-foreground hover:text-primary"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onShare(project.id, project.name)}
            title="مشاركة"
            className="size-8 text-muted-foreground hover:text-primary"
          >
            <Share2 className="size-4" />
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
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-4" />
          {project.lastEdited}
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
  onShare: (id: string, name: string) => void;
}) {
  const { loadProject } = useProjectWorkspace();

  const handleOpenProject = async (project: Project) => {
    if (!project.id.startsWith('p') && !project.id.startsWith('example')) {
      await loadProject(project.id);
    }
    setActiveTab?.('editor');
  };

  return (
    <div className="grid gap-3 lg:hidden">
      {projects.map((project) => (
        <Card key={project.id} className="p-3 sm:p-4 shadow-sm sm:shadow-none border border-border">
          <div className="flex items-start justify-between gap-3">
            <ProjectStatusBadge status={project.status} />
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleOpenProject(project)}
                title="تعديل"
                className="text-muted-foreground hover:text-primary"
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onShare(project.id, project.name)}
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

          <Button className="mt-4 w-full" onClick={() => handleOpenProject(project)}>
            فتح المشروع
          </Button>
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
