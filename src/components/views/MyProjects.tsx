import React, { useMemo, useState } from 'react';
import {
  Activity,
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
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { EmptyState, NoResultsState } from '@/components/ui/PageStates';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
    name: 'عقارات افتراضية',
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

export const MyProjects: React.FC<MyProjectsProps> = ({ setActiveTab }) => {
  const [projectsList, setProjectsList] = useState<Project[]>(MOCK_PROJECTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

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

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف مشروع "${name}"؟`)) {
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleShare = (name: string) => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `مشروع: ${name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${window.location.href}?project=${encodeURIComponent(name)}`);
      alert(`تم نسخ رابط المشاركة لمشروع "${name}" إلى الحافظة!`);
    }
  };

  const hasActiveFilters = searchTerm.trim().length > 0 || typeFilter !== 'all' || statusFilter !== 'all';

  const resetFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    setStatusFilter('all');
  };

  if (projectsList.length === 0) {
    return (
      <main dir="rtl" className="min-h-screen bg-background px-4 py-5">
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

          <CardContent className="space-y-4 p-4 pt-0 sm:p-5 sm:pt-0">
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
                  projects={filteredProjects} 
                  setActiveTab={setActiveTab} 
                  onDelete={handleDelete}
                  onShare={handleShare}
                />
                <ProjectsMobileList 
                  projects={filteredProjects} 
                  setActiveTab={setActiveTab} 
                  onDelete={handleDelete}
                  onShare={handleShare}
                />
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
  onShare: (name: string) => void;
}) {
  return (
    <div className="hidden overflow-hidden rounded-md lg:block">
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[280px]">المشروع</TableHead>
            <TableHead className="w-[125px]">إجراءات</TableHead>
            <TableHead className="min-w-[150px]">النموذج</TableHead>
            <TableHead className="min-w-[180px]">التقدم</TableHead>
            <TableHead className="min-w-[110px]">التقييم</TableHead>
            <TableHead className="min-w-[130px]">الحالة</TableHead>
            <TableHead className="min-w-[130px]">آخر تعديل</TableHead>
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
}: {
  project: Project;
  setActiveTab?: (tab: string) => void;
  onDelete: (id: string, name: string) => void;
  onShare: (name: string) => void;
}) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex min-w-0 items-center gap-2">
          <div className="min-w-0 flex-1 text-right">
            <button
              type="button"
              onClick={() => setActiveTab?.('editor')}
              className="block max-w-[260px] truncate text-sm font-medium leading-5 text-foreground hover:text-primary"
            >
              {project.name}
            </button>
            <p className="truncate text-xs leading-5 text-muted-foreground">
              {project.sector} · {project.marketCap}
            </p>
          </div>
          {project.isFavorite ? <Star className="size-4 shrink-0 text-amber-600" fill="currentColor" /> : null}
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setActiveTab?.('editor')}
            title="تعديل"
            className="text-muted-foreground hover:text-primary"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onShare(project.name)}
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
  onShare: (name: string) => void;
}) {
  return (
    <div className="grid gap-3 lg:hidden">
      {projects.map((project) => (
        <Card key={project.id} className="p-4 shadow-none">
          <div className="flex items-start justify-between gap-3">
            <ProjectStatusBadge status={project.status} />
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setActiveTab?.('editor')}
                title="تعديل"
                className="text-muted-foreground hover:text-primary"
              >
                <Pencil className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onShare(project.name)}
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

          <Button className="mt-4 w-full" onClick={() => setActiveTab?.('editor')}>
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
