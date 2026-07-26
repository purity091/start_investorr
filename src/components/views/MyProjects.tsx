import React, { useMemo, useState } from 'react';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileDown,
  LayoutGrid,
  List,
  Plus,
  Search,
  Share2,
  Star,
  TrendingUp,
} from 'lucide-react';
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

interface Project {
  id: string;
  name: string;
  sector: string;
  status: 'ready' | 'review' | 'draft';
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

const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'أكاديمية الذكاء الاصطناعي',
    sector: 'EdTech',
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
    status: 'ready',
    progress: { market: 100, product: 100, financial: 90 },
    aiScore: 91,
    lastEdited: 'منذ يومين',
    marketCap: '$12M',
    isFavorite: true,
  },
];

interface MyProjectsProps {
  setActiveTab?: (tab: string) => void;
}

type ProjectsPreviewState = 'live' | 'loading' | 'first-use' | 'empty' | 'no-results' | 'success' | 'error';

const PROJECT_PAGE_STATES: Array<{ id: ProjectsPreviewState; label: string }> = [
  { id: 'live', label: 'الحالة الحية' },
  { id: 'loading', label: 'تحميل' },
  { id: 'first-use', label: 'أول استخدام' },
  { id: 'empty', label: 'فارغة' },
  { id: 'no-results', label: 'بدون نتائج' },
  { id: 'success', label: 'نجاح' },
  { id: 'error', label: 'خطأ' },
];

export const MyProjects: React.FC<MyProjectsProps> = ({ setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'ready' | 'draft'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [previewState, setPreviewState] = useState<ProjectsPreviewState>('live');

  const filteredProjects = useMemo(() => {
    return MOCK_PROJECTS.filter((project) => {
      const matchSearch = project.name.includes(searchTerm) || project.sector.includes(searchTerm);
      const matchFilter = filterMode === 'all' ? true : project.status === filterMode;
      return matchSearch && matchFilter;
    });
  }, [searchTerm, filterMode]);

  const showNoResults =
    previewState === 'no-results' || (previewState === 'live' && filteredProjects.length === 0 && searchTerm.trim().length > 0);
  const showEmpty = previewState === 'empty';
  const showFirstUse = previewState === 'first-use';
  const showLoading = previewState === 'loading';
  const showError = previewState === 'error';
  const showSuccess = previewState === 'success';
  const shouldShowCollection = previewState === 'live' || previewState === 'success';

  const resetDiscovery = () => {
    setSearchTerm('');
    setFilterMode('all');
    setPreviewState('live');
  };

  return (
    <div dir="rtl" className="app-page-shell-wide min-h-screen pb-20 font-['IBM_Plex_Sans_Arabic'] animate-in fade-in duration-700">
      <div className="mb-6 pt-6 sm:pt-8">
        <Card className="overflow-hidden rounded-[24px] border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="text-right">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">مساحة المشاريع</p>
              <h1 className="mt-2 text-2xl font-black text-slate-950 sm:text-3xl">مشاريعي</h1>
              <p className="mt-2 text-[13px] font-bold leading-6 text-slate-600">
                مراجعة سريعة للمشاريع والعودة إلى آخر نقطة عمل.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center xl:justify-end">
              <div className="grid grid-cols-3 gap-2 sm:min-w-[330px]">
                <MiniStat label="المشاريع" value={`${MOCK_PROJECTS.length}`} />
                <MiniStat
                  label="جاهزة"
                  value={`${MOCK_PROJECTS.filter((project) => project.status === 'ready').length}`}
                />
                <MiniStat
                  label="المفضلة"
                  value={`${MOCK_PROJECTS.filter((project) => project.isFavorite).length}`}
                />
              </div>

              <Button onClick={() => setActiveTab?.('new-plan')} size="lg" className="w-full sm:w-auto">
                <Plus size={16} strokeWidth={3} />
                <span>مشروع جديد</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mb-6 p-4 sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <Activity size={18} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900">مركز المشاريع</p>
                <p className="text-[11px] font-bold text-slate-500">بحث وتنقل سريع</p>
              </div>
            </div>

            <div className="flex rounded-xl bg-slate-100 p-1 sm:hidden">
              <button
                aria-pressed={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                className={`ui-card-interactive rounded-lg p-2 transition-all ${
                  viewMode === 'list' ? 'ui-selected-ring bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                }`}
              >
                <List size={16} strokeWidth={2.5} />
              </button>
              <button
                aria-pressed={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                className={`ui-card-interactive rounded-lg p-2 transition-all ${
                  viewMode === 'grid' ? 'ui-selected-ring bg-white text-slate-900 shadow-sm' : 'text-slate-400'
                }`}
              >
                <LayoutGrid size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center xl:w-auto">
            <div className="hidden rounded-xl bg-slate-100 p-1 sm:flex">
              <button
                aria-pressed={viewMode === 'list'}
                onClick={() => setViewMode('list')}
                className={`ui-card-interactive rounded-lg p-2.5 transition-all ${
                  viewMode === 'list' ? 'ui-selected-ring bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <List size={18} strokeWidth={2.5} />
              </button>
              <button
                aria-pressed={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
                className={`ui-card-interactive rounded-lg p-2.5 transition-all ${
                  viewMode === 'grid' ? 'ui-selected-ring bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <LayoutGrid size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="relative w-full xl:min-w-[360px] 2xl:min-w-[420px]">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="ابحث عن مشروع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-11"
              />
            </div>
            <Button onClick={() => setActiveTab?.('new-plan')} size="lg" className="w-full sm:w-auto">
              <Plus size={18} strokeWidth={3} />
              <span>مشروع جديد</span>
            </Button>
          </div>
        </div>
      </Card>

      <Card className="mb-6 p-4 sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="text-right">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">حالات الواجهة</p>
            <h2 className="mt-1 text-base font-black text-slate-950">معاينة حالات الصفحة</h2>
            <p className="mt-1 text-[12px] font-bold leading-6 text-slate-600">تبديل سريع بين الحالات المرجعية للمبرمج.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROJECT_PAGE_STATES.map((stateOption) => (
              <Button
                key={stateOption.id}
                variant={previewState === stateOption.id ? 'default' : 'outline'}
                size="sm"
                className={previewState === stateOption.id ? 'ui-selected-ring' : ''}
                onClick={() => setPreviewState(stateOption.id)}
              >
                {stateOption.label}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {showSuccess ? (
        <div className="mb-6">
          <InlineStatusBanner
            tone="success"
            title="تم حفظ تغييرات المشروع بنجاح"
            description="هذه هي حالة النجاح بعد إجراء مهم مثل تحديث المشروع أو تثبيت خطة العمل أو تفعيل التصدير."
          />
        </div>
      ) : null}

      <div>
        {showLoading ? (
          <div className="space-y-4">
            <PageSectionSkeleton blocks={4} />
            <PageSectionSkeleton blocks={3} compact />
          </div>
        ) : showFirstUse ? (
          <FirstUseState
            description="هذه هي الحالة الأولى للمستخدم قبل إنشاء أي مشروع. يجب أن تشرح القيمة مباشرة وتقوده إلى أول خطوة بدون ازدحام."
            actionLabel="إنشاء أول مشروع"
            onAction={() => setActiveTab?.('new-plan')}
          />
        ) : showEmpty ? (
          <EmptyState
            title="لا توجد مشاريع محفوظة حالياً"
            description="هذه هي الحالة الفارغة بعد حذف المشاريع أو قبل المزامنة. يجب أن تشرح لماذا الصفحة فارغة وما الخطوة التالية المتاحة."
            actionLabel="إنشاء مشروع جديد"
            onAction={() => setActiveTab?.('new-plan')}
          />
        ) : showError ? (
          <ErrorState
            description="هذه هي حالة الخطأ عندما يتعذر تحميل المشاريع أو مزامنة البيانات. المطلوب بصرياً هو رسالة واضحة مع إجراء استعادة مباشر."
            onRetry={() => setPreviewState('loading')}
          />
        ) : showNoResults ? (
          <NoResultsState
            description="لا يوجد مشروع يطابق كلمات البحث أو الفلاتر الحالية. يجب أن يرى المستخدم فوراً ما الذي يفعله لإعادة النتائج."
            onReset={resetDiscovery}
          />
        ) : viewMode === 'list' && shouldShowCollection ? (
          <div className="flex flex-col gap-3">
            <div className="hidden items-center px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 xl:flex">
              <div className="flex flex-[2] items-center">
                <div className="w-[42px] shrink-0" />
                <div className="pl-4">المشروع / القطاع</div>
              </div>
              <div className="flex flex-[2] items-center">
                <div className="flex-1 pr-2">التقدم</div>
                <div className="flex-1 text-center">تقييم الذكاء الاصطناعي</div>
              </div>
              <div className="flex flex-[2] items-center">
                <div className="flex-1 text-center">الحالة</div>
                <div className="flex-1 pl-4 text-left">الإجراءات</div>
              </div>
            </div>

            {filteredProjects.map((project) => (
              <ProjectListRow key={project.id} project={project} setActiveTab={setActiveTab} />
            ))}

            <div
              onClick={() => setActiveTab?.('new-plan')}
              className="group mt-2 flex cursor-pointer items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-slate-200 p-6 transition-all hover:border-blue-400 hover:bg-blue-50/30"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-all group-hover:bg-blue-600 group-hover:text-white">
                <Plus size={20} strokeWidth={3} />
              </div>
              <span className="text-sm font-black text-slate-400 group-hover:text-blue-600">إضافة مشروع جديد</span>
            </div>
          </div>
        ) : shouldShowCollection ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProjects.map((project) => (
              <ProjectGridCard key={project.id} project={project} setActiveTab={setActiveTab} />
            ))}

            <div
              onClick={() => setActiveTab?.('new-plan')}
              className="group flex min-h-[250px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 p-8 transition-all hover:border-blue-400 hover:bg-blue-50/30 sm:min-h-[300px]"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 transition-all group-hover:bg-blue-600 group-hover:text-white sm:h-14 sm:w-14">
                <Plus size={24} className="sm:h-7 sm:w-7" strokeWidth={3} />
              </div>
              <span className="text-xs font-black text-slate-400 group-hover:text-blue-600 sm:text-sm">إضافة مشروع</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center">
    <p className="text-[10px] font-black text-slate-400">{label}</p>
    <p className="mt-1 text-lg font-black text-slate-950">{value}</p>
  </div>
);

const ProjectListRow: React.FC<{ project: Project; setActiveTab?: (tab: string) => void }> = ({ project, setActiveTab }) => {
  const averageProgress = Math.round((project.progress.market + project.progress.product + project.progress.financial) / 3);

  return (
    <Card className="ui-card-interactive group rounded-2xl border-slate-200 p-4 transition-all duration-300 hover:border-slate-300 hover:shadow-md">
      <div className="relative flex flex-col items-start gap-0 overflow-hidden xl:flex-row xl:items-center xl:gap-4">
        <div className="mb-3 flex w-full items-center justify-between xl:mb-0 xl:w-auto xl:flex-[2]">
          <button
            className={`mr-0 ml-4 hidden shrink-0 rounded-xl p-2 transition-all xl:block ${
              project.isFavorite ? 'bg-amber-50 text-amber-400' : 'bg-slate-50 text-slate-300 hover:text-amber-400'
            }`}
          >
            <Star size={18} fill={project.isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-3 md:gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm md:h-12 md:w-12">
              <LayoutGrid size={20} strokeWidth={2.5} className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3
                className="mb-0.5 cursor-pointer truncate text-sm font-black text-slate-900 transition-colors group-hover:text-blue-600 md:mb-1"
                onClick={() => setActiveTab?.('editor')}
              >
                {project.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold text-slate-400 md:text-[11px]">
                <span className="rounded bg-slate-100 px-1.5 py-0.5 uppercase tracking-wider text-slate-500 md:px-2">
                  {project.sector}
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  <span className="hidden sm:inline">آخر تعديل</span>
                  {project.lastEdited}
                </span>
              </div>
            </div>
          </div>

          <button
            className={`shrink-0 rounded-xl p-2 transition-all xl:hidden ${
              project.isFavorite ? 'bg-amber-50 text-amber-400' : 'bg-slate-50 text-slate-300 hover:text-amber-400'
            }`}
          >
            <Star size={16} fill={project.isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
          </button>
        </div>

        <div className="mb-3 grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:mb-0 xl:flex xl:w-auto xl:flex-[2] xl:items-center xl:gap-0">
          <div className="w-full xl:flex-1 xl:pl-2 xl:pr-2 2xl:pr-6">
            <div className="mb-1.5 flex items-center justify-between text-[10px] font-black uppercase text-slate-400">
              <span>التقدم</span>
              <span className="text-slate-700">{averageProgress}%</span>
            </div>
            <div className="ui-progress-track flex h-1.5 w-full items-center gap-0.5 overflow-hidden rounded-full bg-slate-100">
              <div className="ui-progress-fill h-full bg-blue-600" style={{ width: `${project.progress.market / 3}%` }} />
              <div className="ui-progress-fill h-full bg-emerald-500" style={{ width: `${project.progress.product / 3}%` }} />
              <div className="ui-progress-fill h-full bg-amber-500" style={{ width: `${project.progress.financial / 3}%` }} />
            </div>
          </div>

          <div className="flex w-full items-center justify-start sm:justify-center xl:flex-1">
            <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-blue-50 bg-blue-50/50 px-3 py-2 text-blue-700 sm:w-auto sm:py-1.5">
              <Activity size={14} className="text-blue-500" />
              <span className="text-xs font-black md:text-sm">{project.aiScore}%</span>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 border-t border-slate-50 pt-3 sm:flex-row sm:items-center sm:justify-between xl:w-auto xl:flex-[2] xl:justify-end xl:border-t-0 xl:pt-0">
          <div className="flex items-center justify-start sm:flex-1 sm:justify-center">
            <div
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-bold md:px-3 md:text-xs ${
                project.status === 'ready'
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : project.status === 'review'
                    ? 'border-amber-100 bg-amber-50 text-amber-700'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              {project.status === 'ready' ? (
                <CheckCircle2 size={12} className="md:h-[14px] md:w-[14px]" />
              ) : project.status === 'review' ? (
                <Clock size={12} className="md:h-[14px] md:w-[14px]" />
              ) : (
                <TrendingUp size={12} className="md:h-[14px] md:w-[14px]" />
              )}
              <span>{project.status === 'ready' ? 'جاهز' : project.status === 'review' ? 'مراجعة' : 'مسودة'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 sm:flex-1 sm:justify-end">
            <div className="hidden gap-1 transition-all duration-300 xl:flex xl:-translate-x-2 xl:opacity-0 xl:group-hover:translate-x-0 xl:group-hover:opacity-100">
              <ActionIcon icon={<Share2 size={14} />} />
              <ActionIcon icon={<FileDown size={14} />} />
            </div>
            <button
              onClick={() => setActiveTab?.('editor')}
              className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-black text-white transition-colors hover:bg-blue-600 sm:min-w-[112px]"
            >
              <span>فتح</span>
              <ArrowRight size={14} className="rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

const ProjectGridCard: React.FC<{ project: Project; setActiveTab?: (tab: string) => void }> = ({ project, setActiveTab }) => {
  const averageProgress = Math.round((project.progress.market + project.progress.product + project.progress.financial) / 3);

  return (
    <Card className="ui-card-interactive group relative flex h-full flex-col rounded-3xl border-slate-200 p-4 transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 sm:p-5">
      <div className="mb-4 flex items-start justify-between">
        <button
          className={`rounded-xl p-2 transition-all ${
            project.isFavorite ? 'bg-amber-50 text-amber-400' : 'bg-slate-50 text-slate-300 hover:text-amber-400'
          }`}
        >
          <Star size={16} fill={project.isFavorite ? 'currentColor' : 'none'} strokeWidth={2.5} />
        </button>
        <div
          className={`flex items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-bold ${
            project.status === 'ready'
              ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
              : project.status === 'review'
                ? 'border-amber-100 bg-amber-50 text-amber-700'
                : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
        >
          {project.status === 'ready' ? <CheckCircle2 size={12} /> : project.status === 'review' ? <Clock size={12} /> : <TrendingUp size={12} />}
          <span>{project.status === 'ready' ? 'جاهز' : project.status === 'review' ? 'مراجعة' : 'مسودة'}</span>
        </div>
      </div>

      <div className="mb-5 flex flex-col items-center text-center sm:mb-6">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md transition-transform duration-300 group-hover:scale-105 sm:h-16 sm:w-16">
          <LayoutGrid size={24} className="sm:h-7 sm:w-7" strokeWidth={2} />
        </div>
        <h3 className="mb-1 line-clamp-1 text-sm font-black leading-tight text-slate-900 transition-colors group-hover:text-blue-600 sm:text-base">
          {project.name}
        </h3>
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-400 sm:text-[11px]">
          {project.sector}
        </span>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-2 sm:mb-6">
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-2 text-center sm:p-2.5">
          <span className="mb-1 block text-[8px] font-bold uppercase text-slate-400 sm:text-[9px]">التقدم</span>
          <span className="text-xs font-black text-slate-700 sm:text-sm">{averageProgress}%</span>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-2 text-center sm:p-2.5">
          <span className="mb-1 block text-[8px] font-bold uppercase text-blue-400 sm:text-[9px]">تقييم AI</span>
          <span className="text-xs font-black text-blue-700 sm:text-sm">{project.aiScore}%</span>
        </div>
      </div>

      <div className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-4">
        <button
          onClick={() => setActiveTab?.('editor')}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 py-2 text-xs font-black text-white transition-colors hover:bg-blue-600 sm:py-2.5"
        >
          <span>فتح الخطة</span>
        </button>

        <div className="flex shrink-0 gap-1.5">
          <ActionIcon icon={<Share2 size={14} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} />
          <ActionIcon icon={<FileDown size={14} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />} />
        </div>
      </div>
    </Card>
  );
};

const ActionIcon = ({ icon }: { icon: React.ReactNode }) => (
  <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-500 transition-all hover:bg-slate-800 hover:text-white sm:h-9 sm:w-9">
    {icon}
  </button>
);
