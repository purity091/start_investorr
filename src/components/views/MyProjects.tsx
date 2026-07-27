import React, { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileDown,
  Grid3X3,
  LayoutGrid,
  List,
  Plus,
  Rocket,
  Search,
  Share2,
  Sparkles,
  Star,
  TrendingUp,
  Workflow,
  Zap,
} from 'lucide-react';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import {
  EmptyState,
  ErrorState,
  FirstUseState,
  InlineStatusBanner,
  NoResultsState,
  PageSectionSkeleton,
} from '../ui/PageStates';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

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
    accent: string;
    actionTab: string;
  }
> = {
  easy: {
    label: 'النموذج السهل',
    shortLabel: 'السهل',
    icon: Sparkles,
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    actionTab: 'new-plan-family',
  },
  pro: {
    label: 'النموذج الاحترافي',
    shortLabel: 'الاحترافي',
    icon: Zap,
    accent: 'bg-blue-50 text-blue-700 border-blue-200',
    actionTab: 'new-plan-pro',
  },
  mit24: {
    label: 'MIT 24 Steps',
    shortLabel: 'MIT 24',
    icon: Rocket,
    accent: 'bg-amber-50 text-amber-700 border-amber-200',
    actionTab: 'new-plan-mit24',
  },
  bmc: {
    label: 'بناء نموذج العمل BMC',
    shortLabel: 'BMC',
    icon: Workflow,
    accent: 'bg-violet-50 text-violet-700 border-violet-200',
    actionTab: 'new-plan-bmc',
  },
};

const STATUS_OPTIONS: Array<{ id: StatusFilter; label: string }> = [
  { id: 'all', label: 'كل الحالات' },
  { id: 'ready', label: 'جاهز' },
  { id: 'review', label: 'مراجعة' },
  { id: 'draft', label: 'مسودة' },
];

const TYPE_OPTIONS: Array<{ id: TypeFilter; label: string }> = [
  { id: 'all', label: 'كل النماذج' },
  { id: 'easy', label: 'النموذج السهل' },
  { id: 'pro', label: 'النموذج الاحترافي' },
  { id: 'mit24', label: 'MIT 24 Steps' },
  { id: 'bmc', label: 'BMC' },
];

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'أكاديمية الذكاء الاصطناعي',
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
    id: 'p2',
    name: 'منصة الحصاد الذكي',
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
    name: 'بوابة الدفع الإقليمية',
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
    id: 'p4',
    name: 'عقارات فيرتشوال',
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
    name: 'استوديو محتوى عربي',
    sector: 'Media',
    type: 'easy',
    status: 'draft',
    progress: { market: 55, product: 45, financial: 25 },
    aiScore: 59,
    lastEdited: 'قبل 3 أيام',
    marketCap: '$420K',
    isFavorite: false,
  },
  {
    id: 'p6',
    name: 'حل لوجستي للصيدليات',
    sector: 'Health Logistics',
    type: 'pro',
    status: 'review',
    progress: { market: 88, product: 76, financial: 61 },
    aiScore: 82,
    lastEdited: 'قبل 4 أيام',
    marketCap: '$2.1M',
    isFavorite: true,
  },
];

interface MyProjectsProps {
  setActiveTab?: (tab: string) => void;
}

type ProjectsPreviewState =
  | 'live'
  | 'loading'
  | 'first-use'
  | 'empty'
  | 'no-results'
  | 'success'
  | 'error';

const PROJECT_PAGE_STATES: Array<{ id: ProjectsPreviewState; label: string }> = [
  { id: 'live', label: 'الحية' },
  { id: 'loading', label: 'تحميل' },
  { id: 'first-use', label: 'أول استخدام' },
  { id: 'empty', label: 'فارغة' },
  { id: 'no-results', label: 'بدون نتائج' },
  { id: 'success', label: 'نجاح' },
  { id: 'error', label: 'خطأ' },
];

export const MyProjects: React.FC<MyProjectsProps> = ({ setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [previewState, setPreviewState] = useState<ProjectsPreviewState>('live');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim();

    return MOCK_PROJECTS.filter((project) => {
      const matchesSearch =
        !query || project.name.includes(query) || project.sector.includes(query) || PROJECT_TYPE_META[project.type].label.includes(query);
      const matchesType = typeFilter === 'all' || project.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, typeFilter, statusFilter]);

  const readyCount = MOCK_PROJECTS.filter((project) => project.status === 'ready').length;
  const favoriteCount = MOCK_PROJECTS.filter((project) => project.isFavorite).length;
  const typeCounts = useMemo(() => {
    return {
      easy: MOCK_PROJECTS.filter((project) => project.type === 'easy').length,
      pro: MOCK_PROJECTS.filter((project) => project.type === 'pro').length,
      mit24: MOCK_PROJECTS.filter((project) => project.type === 'mit24').length,
      bmc: MOCK_PROJECTS.filter((project) => project.type === 'bmc').length,
    };
  }, []);

  const activeFilterCount = Number(typeFilter !== 'all') + Number(statusFilter !== 'all') + Number(searchTerm.trim().length > 0);
  const showNoResults =
    previewState === 'no-results' ||
    (previewState === 'live' && filteredProjects.length === 0 && (searchTerm.trim().length > 0 || typeFilter !== 'all' || statusFilter !== 'all'));
  const showEmpty = previewState === 'empty';
  const showFirstUse = previewState === 'first-use';
  const showLoading = previewState === 'loading';
  const showError = previewState === 'error';
  const showSuccess = previewState === 'success';
  const shouldShowCollection = previewState === 'live' || previewState === 'success';

  const resetDiscovery = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
    setPreviewState('live');
  };

  return (
    <div dir="rtl" className="min-h-screen w-full bg-background px-3 pb-16 pt-4 sm:px-4 lg:px-5 2xl:px-6">
      <div className="mx-auto flex w-full max-w-[1840px] flex-col gap-4">
        <section className="rounded-lg border border-border bg-background">
          <div className="flex flex-col gap-3 border-b border-border px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 text-right">
              <div className="flex flex-wrap items-center justify-start gap-2">
                <h1 className="text-xl font-semibold text-foreground">مشاريعي</h1>
                <Badge variant="secondary">مساحة المشاريع</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                تنظيم أوضح للمشاريع حسب نوع النموذج والحالة، مع العودة السريعة إلى آخر نقطة عمل.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:min-w-[320px]">
              <CompactStat label="المشاريع" value={MOCK_PROJECTS.length} />
              <CompactStat label="جاهزة" value={readyCount} />
              <CompactStat label="المفضلة" value={favoriteCount} />
            </div>
          </div>

          <div className="grid gap-3 border-b border-border px-4 py-4">
            <div className="grid gap-3 xl:grid-cols-[minmax(280px,1.3fr)_220px_220px_auto] xl:items-center">
              <div className="relative min-w-0">
                <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="ابحث عن مشروع أو قطاع أو نوع نموذج"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  className="h-10 pr-9"
                />
              </div>

              <FilterField label="نوع النموذج">
                <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as TypeFilter)}>
                  <SelectTrigger className="h-10 text-right">
                    <SelectValue placeholder="اختر النموذج" />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_OPTIONS.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FilterField>

              <FilterField label="الحالة">
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
                  <SelectTrigger className="h-10 text-right">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FilterField>

              <div className="flex items-center gap-2 xl:justify-end">
                <div className="inline-flex h-10 shrink-0 items-center rounded-lg border border-border bg-muted p-0.5">
                  <Button
                    aria-pressed={viewMode === 'table'}
                    variant={viewMode === 'table' ? 'secondary' : 'ghost'}
                    size="icon-sm"
                    onClick={() => setViewMode('table')}
                    title="عرض جدول"
                  >
                    <List className="size-4" />
                  </Button>
                  <Button
                    aria-pressed={viewMode === 'grid'}
                    variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                    size="icon-sm"
                    onClick={() => setViewMode('grid')}
                    title="عرض بطاقات"
                  >
                    <Grid3X3 className="size-4" />
                  </Button>
                </div>

                <Button onClick={() => setActiveTab?.('new-plan')} size="sm" className="h-10">
                  <Plus className="size-4" />
                  <span>مشروع جديد</span>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {(Object.keys(PROJECT_TYPE_META) as ProjectType[]).map((type) => {
                  const meta = PROJECT_TYPE_META[type];
                  const Icon = meta.icon;
                  const isActive = typeFilter === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTypeFilter((current) => (current === type ? 'all' : type))}
                      className={`rounded-xl border px-4 py-3 text-right transition-colors ${
                        isActive ? 'border-primary bg-primary/5' : 'border-border bg-muted/25 hover:bg-muted/45'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant={isActive ? 'secondary' : 'outline'}>{typeCounts[type]}</Badge>
                        <span className={`flex size-9 items-center justify-center rounded-lg border ${meta.accent}`}>
                          <Icon className="size-4" />
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-foreground">{meta.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {typeCounts[type]} مشروع داخل هذا المسار
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                {activeFilterCount > 0 ? (
                  <Button variant="outline" size="sm" onClick={resetDiscovery}>
                    تصفير الفلاتر
                  </Button>
                ) : null}
                <span className="text-xs font-medium text-muted-foreground">حالات الواجهة</span>
                {PROJECT_PAGE_STATES.map((stateOption) => (
                  <Button
                    key={stateOption.id}
                    variant={previewState === stateOption.id ? 'secondary' : 'ghost'}
                    size="xs"
                    onClick={() => setPreviewState(stateOption.id)}
                  >
                    {stateOption.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {showSuccess ? (
          <InlineStatusBanner
            tone="success"
            title="تم حفظ تغييرات المشروع بنجاح"
            description="حالة مرجعية بعد تحديث المشروع أو تثبيت خطة العمل."
          />
        ) : null}

        {showLoading ? (
          <div className="space-y-3">
            <PageSectionSkeleton blocks={4} />
            <PageSectionSkeleton blocks={3} compact />
          </div>
        ) : showFirstUse ? (
          <FirstUseState
            description="هذه الحالة تظهر قبل إنشاء أول مشروع، مع إجراء مباشر لبدء المشروع."
            actionLabel="إنشاء أول مشروع"
            onAction={() => setActiveTab?.('new-plan')}
          />
        ) : showEmpty ? (
          <EmptyState
            title="لا توجد مشاريع محفوظة حالياً"
            description="الحالة الفارغة للصفحة عندما لا توجد مشاريع قابلة للعرض."
            actionLabel="إنشاء مشروع جديد"
            onAction={() => setActiveTab?.('new-plan')}
          />
        ) : showError ? (
          <ErrorState
            description="حالة الخطأ عند تعذر تحميل المشاريع أو مزامنة البيانات."
            onRetry={() => setPreviewState('loading')}
          />
        ) : showNoResults ? (
          <NoResultsState
            description="لا يوجد مشروع يطابق الفلاتر أو كلمات البحث الحالية."
            onReset={resetDiscovery}
          />
        ) : viewMode === 'table' && shouldShowCollection ? (
          <ProjectsTable projects={filteredProjects} setActiveTab={setActiveTab} />
        ) : shouldShowCollection ? (
          <ProjectsGrid projects={filteredProjects} setActiveTab={setActiveTab} />
        ) : null}
      </div>
    </div>
  );
};

function ProjectsTable({
  projects,
  setActiveTab,
}: {
  projects: Project[];
  setActiveTab?: (tab: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-background">
      <Table dir="rtl">
        <TableHeader>
          <TableRow className="bg-muted/60 hover:bg-muted/60">
            <TableHead className="h-10 min-w-[320px]">المشروع</TableHead>
            <TableHead className="h-10 min-w-[160px]">نوع النموذج</TableHead>
            <TableHead className="h-10 min-w-[190px]">التقدم</TableHead>
            <TableHead className="h-10 min-w-[120px]">التقييم</TableHead>
            <TableHead className="h-10 min-w-[120px]">الحالة</TableHead>
            <TableHead className="h-10 min-w-[140px]">آخر تعديل</TableHead>
            <TableHead className="h-10 min-w-[148px] text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <ProjectTableRow key={project.id} project={project} setActiveTab={setActiveTab} />
          ))}
          <TableRow className="hover:bg-muted/30">
            <TableCell colSpan={7} className="p-3">
              <Button variant="ghost" size="sm" className="w-full" onClick={() => setActiveTab?.('new-plan')}>
                <Plus className="size-4" />
                <span>إضافة مشروع جديد</span>
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </section>
  );
}

function ProjectTableRow({
  project,
  setActiveTab,
}: {
  project: Project;
  setActiveTab?: (tab: string) => void;
}) {
  const averageProgress = getAverageProgress(project);
  const typeMeta = PROJECT_TYPE_META[project.type];

  return (
    <TableRow className="group">
      <TableCell className="py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
            <LayoutGrid className="size-4" />
          </div>

          <div className="min-w-0 flex-1 text-right">
            <button
              className="block max-w-[260px] truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
              onClick={() => setActiveTab?.('editor')}
            >
              {project.name}
            </button>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>{project.sector}</span>
              <span>{project.marketCap}</span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon-xs"
            className={project.isFavorite ? 'text-amber-600' : 'text-muted-foreground'}
            title={project.isFavorite ? 'مفضل' : 'إضافة للمفضلة'}
          >
            <Star className="size-4" fill={project.isFavorite ? 'currentColor' : 'none'} />
          </Button>
        </div>
      </TableCell>

      <TableCell className="py-3">
        <ProjectTypeBadge type={project.type} />
        <p className="mt-1 text-[11px] text-muted-foreground">{typeMeta.shortLabel}</p>
      </TableCell>

      <TableCell className="py-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-foreground">{averageProgress}%</span>
            <span className="text-muted-foreground">الإجمالي</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${averageProgress}%` }} />
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-muted-foreground">
            <span>سوق {project.progress.market}%</span>
            <span>منتج {project.progress.product}%</span>
            <span>مالي {project.progress.financial}%</span>
          </div>
        </div>
      </TableCell>

      <TableCell className="py-3">
        <Badge variant={project.aiScore >= 80 ? 'success' : 'secondary'} className="gap-1">
          <Activity className="size-3.5" />
          {project.aiScore}%
        </Badge>
      </TableCell>

      <TableCell className="py-3">
        <ProjectStatusBadge status={project.status} />
      </TableCell>

      <TableCell className="py-3">
        <div className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-4" />
          <span>{project.lastEdited}</span>
        </div>
      </TableCell>

      <TableCell className="py-3">
        <div className="flex items-center justify-end gap-1">
          <Button variant="ghost" size="icon-sm" title="مشاركة">
            <Share2 className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" title="تحميل">
            <FileDown className="size-4" />
          </Button>
          <Button size="sm" onClick={() => setActiveTab?.('editor')}>
            <span>فتح</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function ProjectsGrid({
  projects,
  setActiveTab,
}: {
  projects: Project[];
  setActiveTab?: (tab: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {projects.map((project) => (
        <ProjectGridCard key={project.id} project={project} setActiveTab={setActiveTab} />
      ))}
      <button
        onClick={() => setActiveTab?.('new-plan')}
        className="flex min-h-[190px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-background p-4 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
      >
        <Plus className="size-5" />
        <span className="text-sm font-semibold">إضافة مشروع</span>
      </button>
    </div>
  );
}

function ProjectGridCard({
  project,
  setActiveTab,
}: {
  project: Project;
  setActiveTab?: (tab: string) => void;
}) {
  const averageProgress = getAverageProgress(project);

  return (
    <Card className="rounded-lg p-4 shadow-none">
      <div className="flex items-start justify-between gap-3">
        <ProjectStatusBadge status={project.status} />
        <Button
          variant="ghost"
          size="icon-xs"
          className={project.isFavorite ? 'text-amber-600' : 'text-muted-foreground'}
          title={project.isFavorite ? 'مفضل' : 'إضافة للمفضلة'}
        >
          <Star className="size-4" fill={project.isFavorite ? 'currentColor' : 'none'} />
        </Button>
      </div>

      <div className="mt-4 flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">
          <LayoutGrid className="size-4" />
        </div>
        <div className="min-w-0 text-right">
          <h3 className="truncate text-sm font-semibold text-foreground">{project.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {project.sector} · {project.marketCap}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <ProjectTypeBadge type={project.type} />
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-foreground">{averageProgress}%</span>
          <span className="text-muted-foreground">جاهزية المشروع</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${averageProgress}%` }} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <SmallMetric label="تقييم AI" value={`${project.aiScore}%`} icon={<Activity className="size-3.5" />} />
        <SmallMetric label="آخر تعديل" value={project.lastEdited} icon={<Clock className="size-3.5" />} />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button variant="outline" size="icon-sm" title="مشاركة">
          <Share2 className="size-4" />
        </Button>
        <Button variant="outline" size="icon-sm" title="تحميل">
          <FileDown className="size-4" />
        </Button>
        <Button size="sm" className="flex-1" onClick={() => setActiveTab?.('editor')}>
          <span>فتح</span>
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </Card>
  );
}

function ProjectTypeBadge({ type }: { type: ProjectType }) {
  const meta = PROJECT_TYPE_META[type];
  const Icon = meta.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium ${meta.accent}`}>
      <Icon className="size-3.5" />
      {meta.shortLabel}
    </span>
  );
}

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  if (status === 'ready') {
    return (
      <Badge variant="success" className="gap-1">
        <CheckCircle2 className="size-3.5" />
        جاهز
      </Badge>
    );
  }

  if (status === 'review') {
    return (
      <Badge variant="outline" className="gap-1 border-amber-200 bg-amber-50 text-amber-800">
        <Clock className="size-3.5" />
        مراجعة
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="gap-1">
      <TrendingUp className="size-3.5" />
      مسودة
    </Badge>
  );
}

function CompactStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-border bg-muted/40 px-3 py-2 text-right">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-0.5 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

function SmallMetric({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-border bg-muted/30 p-2 text-right">
      <div className="mb-1 flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[11px]">{label}</span>
      </div>
      <p className="truncate text-xs font-semibold text-foreground">{value}</p>
    </div>
  );
}

function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-right">
      <p className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</p>
      {children}
    </div>
  );
}

function getAverageProgress(project: Project) {
  return Math.round((project.progress.market + project.progress.product + project.progress.financial) / 3);
}
