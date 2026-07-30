import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpDown,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Database,
  Filter,
  Globe2,
  LoaderCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { DATA, COUNTRIES } from './ProblemOpportunityEngine/constants';
import { Problem } from './ProblemOpportunityEngine/types';
import { loadDynamicOpportunities } from '../../../services/opportunityService';
import {
  MARKET_PROBLEM_STORAGE_KEY,
  loadSavedMarketItems,
  toggleSavedMarketItem,
  type SavedMarketRecord,
} from './problemDetailStorage';

type RecordKind = 'problem' | 'opportunity';
type RecordStatus = 'draft' | 'validated' | 'priority';
type MarketBand = 'small' | 'medium' | 'large';
type EaseBand = 'hard' | 'moderate' | 'easy';
type ProfitBand = 'low' | 'medium' | 'high';
type CompetitionBand = 'high' | 'medium' | 'low';
type DataSource = 'all' | 'base' | 'dynamic';

type EngineRecord = SavedMarketRecord & {
  id: string;
  source: DataSource;
};

const MOJIBAKE_PATTERN = /[ÃØÙ]/;

const decodeMojibake = (value: string) => {
  if (!value || !MOJIBAKE_PATTERN.test(value)) {
    return value;
  }

  try {
    const bytes = Uint8Array.from(Array.from(value).map(character => character.charCodeAt(0) & 0xff));
    const decoded = new TextDecoder('utf-8').decode(bytes);
    return decoded.includes('ï¿½') ? value : decoded;
  } catch {
    return value;
  }
};

const audienceLabels: Record<string, string> = {
  B2B: 'شركات ومؤسسات',
  B2C: 'أفراد ومستهلكون',
  B2G: 'جهات حكومية',
  B2B2C: 'شركات تصل للمستهلك',
};

const budgetLabels: Record<string, string> = {
  low: 'ميزانية منخفضة',
  medium: 'ميزانية متوسطة',
  high: 'ميزانية مرتفعة',
};

const statusLabels: Record<RecordStatus, string> = {
  draft: 'تحتاج مراجعة',
  validated: 'قيد التحقق',
  priority: 'أولوية',
};

const typeLabels: Record<RecordKind, string> = {
  problem: 'مشكلة',
  opportunity: 'فرصة',
};

const marketLabels: Record<MarketBand, string> = {
  small: 'صغير',
  medium: 'متوسط',
  large: 'كبير',
};

const easeLabels: Record<EaseBand, string> = {
  hard: 'صعب',
  moderate: 'متوسط',
  easy: 'سهل',
};

const profitLabels: Record<ProfitBand, string> = {
  low: 'ضعيفة',
  medium: 'متوسطة',
  high: 'مرتفعة',
};

const typeToneClasses: Record<RecordKind, string> = {
  problem: 'border-transparent bg-slate-100 text-slate-900',
  opportunity: 'border-transparent bg-indigo-50 text-indigo-700',
};

const statusToneClasses: Record<RecordStatus, string> = {
  draft: 'border-transparent bg-slate-100 text-slate-800',
  validated: 'border-transparent bg-slate-100/70 text-slate-800',
  priority: 'border-transparent bg-indigo-50 text-indigo-700',
};

const priorityTone = (score: number) => {
  if (score >= 8) return 'border-transparent bg-indigo-50 text-indigo-700';
  if (score >= 6) return 'border-transparent bg-slate-100 text-slate-800';
  return 'border-transparent bg-slate-100/70 text-slate-700';
};

const suggestions = [
  'فرص SaaS عربية في التجارة الإلكترونية',
  'مشاكل لوجستية قابلة للحل في السوق المحلي',
  'فرص في تقنيات الزراعة الذكية',
  'فجوات رقمية في قطاع الصحة',
  'أسواق منخفضة المنافسة وعالية الربحية',
];

const getCountryName = (country: unknown) => {
  if (typeof country === 'string') {
    const match = COUNTRIES.find(item => item.id === country);
    return decodeMojibake(match?.name || country);
  }

  if (country && typeof country === 'object' && 'name' in country) {
    return decodeMojibake(String(country.name));
  }

  return 'غير محدد';
};

const buildStatus = (problem: Problem): RecordStatus => {
  if (problem.gap >= 8 || problem.money >= 8) return 'priority';
  if (problem.pain >= 6 || problem.freq >= 6) return 'validated';
  return 'draft';
};

const buildMarketBand = (money: number): MarketBand => {
  if (money >= 8) return 'large';
  if (money >= 5) return 'medium';
  return 'small';
};

const buildEaseScore = (problem: Problem) => Math.max(1, Math.min(10, Math.round((12 - problem.pain + 11 - problem.gap + 11 - problem.freq) / 3)));
const buildEaseBand = (score: number): EaseBand => {
  if (score >= 7) return 'easy';
  if (score >= 4) return 'moderate';
  return 'hard';
};

const buildProfitBand = (money: number): ProfitBand => {
  if (money >= 8) return 'high';
  if (money >= 5) return 'medium';
  return 'low';
};

const buildCompetitionBand = (problem: Problem): CompetitionBand => {
  const score = Math.round((problem.pain + problem.freq) / 2);
  if (score >= 8) return 'high';
  if (score >= 5) return 'medium';
  return 'low';
};

const buildUpdatedLabel = (status: RecordStatus) => {
  if (status === 'priority') return 'اليوم';
  if (status === 'validated') return 'هذا الأسبوع';
  return 'مؤخراً';
};

const buildPriorityScore = (problem: Problem) =>
  Math.max(1, Math.min(10, Math.round((problem.pain + problem.money + problem.freq + problem.gap) / 4)));

const buildRecords = (dynamicProblems: Problem[]): EngineRecord[] => {
  const normalizedProblems: Array<
    Problem & {
      sectorNameResolved: string;
      subSectorNameResolved: string;
      sourceResolved: DataSource;
    }
  > = [];

  DATA.forEach(sector => {
    sector.subs.forEach(subSector => {
      subSector.problems.forEach(problem => {
        normalizedProblems.push({
          ...problem,
          sectorNameResolved: decodeMojibake(sector.name),
          subSectorNameResolved: decodeMojibake(subSector.name),
          sourceResolved: 'base',
        });
      });
    });
  });

  dynamicProblems.forEach(problem => {
    normalizedProblems.push({
      ...problem,
      sectorNameResolved: decodeMojibake(problem.sectorName || 'فرص إضافية'),
      subSectorNameResolved: decodeMojibake(problem.subSectorName || 'عام'),
      sourceResolved: 'dynamic',
    });
  });

  return normalizedProblems.flatMap(problem => {
    const countries = Array.from(new Set(problem.countries.map(getCountryName)));
    const title = decodeMojibake(problem.title);
    const summary = decodeMojibake(problem.desc);
    const audience = audienceLabels[problem.b2x] || decodeMojibake(problem.b2x);
    const budget = budgetLabels[problem.budget] || problem.budget;
    const status = buildStatus(problem);
    const marketScore = problem.money;
    const easeScore = buildEaseScore(problem);
    const profitScore = problem.money;
    const priorityScore = buildPriorityScore(problem);
    const marketBand = buildMarketBand(problem.money);
    const easeBand = buildEaseBand(easeScore);
    const profitBand = buildProfitBand(problem.money);
    const competitionBand = buildCompetitionBand(problem);
    const updatedLabel = buildUpdatedLabel(status);
    const firstOpportunity = problem.opps?.[0];

    const baseRecord: EngineRecord = {
      id: `problem-${problem.id}`,
      source: problem.sourceResolved,
      kind: 'problem',
      title,
      summary,
      sectorName: problem.sectorNameResolved,
      subSectorName: problem.subSectorNameResolved,
      countries,
      audience,
      budget,
      linkedTitle: firstOpportunity ? decodeMojibake(firstOpportunity.name) : 'غير محدد بعد',
      model: firstOpportunity ? decodeMojibake(firstOpportunity.model) : 'يحتاج تحديد نموذج',
      status,
      marketBand,
      easeBand,
      profitBand,
      competitionBand,
      priorityScore,
      marketScore,
      easeScore,
      profitScore,
      updatedLabel,
      tags: [problem.sectorNameResolved, problem.subSectorNameResolved, audience, budget],
    };

    const opportunityRecords = (problem.opps || []).map((opportunity, index) => ({
      ...baseRecord,
      id: `opportunity-${problem.id}-${index}`,
      kind: 'opportunity' as const,
      title: decodeMojibake(opportunity.name),
      summary: `فرصة ناتجة عن مشكلة: ${title}`,
      linkedTitle: title,
      model: decodeMojibake(opportunity.model),
      tags: [problem.sectorNameResolved, audience, decodeMojibake(opportunity.model)],
    }));

    return [baseRecord, ...opportunityRecords];
  });
};

const FiltersSkeleton = () => (
  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
    {Array.from({ length: 5 }).map((_, index) => (
      <Skeleton key={index} className="h-9 rounded-lg" />
    ))}
  </div>
);

const ResultsEmpty = ({ onReset }: { onReset: () => void }) => (
  <Card className="shadow-sm">
    <CardContent className="flex min-h-[260px] flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="rounded-full bg-muted/60 p-4">
        <Search className="size-6 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <div className="text-lg font-semibold">لا توجد نتائج مطابقة</div>
        <p className="max-w-xl text-sm leading-7 text-muted-foreground">
          جرّب توسيع البحث أو إعادة ضبط الفلاتر للوصول إلى مشاكل وفرص أكثر تنوعاً.
        </p>
      </div>
      <Button type="button" variant="outline" onClick={onReset}>
        إعادة ضبط الفلاتر
      </Button>
    </CardContent>
  </Card>
);

const DetailList = ({ record }: { record: EngineRecord | null }) => {
  if (!record) {
    return (
      <Card className="shadow-sm">
        <CardContent className="flex min-h-[280px] items-center justify-center p-6 text-center text-sm text-muted-foreground">
          اختر صفاً من الجدول لمراجعة الملخص السريع.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={cn('rounded-md border font-medium', typeToneClasses[record.kind])}>
            {typeLabels[record.kind]}
          </Badge>
          <Badge variant="outline" className={cn('rounded-md border font-medium', statusToneClasses[record.status])}>
            {statusLabels[record.status]}
          </Badge>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-lg leading-8">{record.title}</CardTitle>
          <CardDescription className="text-sm leading-7">{record.summary}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">القطاع</div>
            <div className="mt-1 font-medium">{record.sectorName}</div>
          </div>
          <div className="rounded-lg bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">الشريحة</div>
            <div className="mt-1 font-medium">{record.audience}</div>
          </div>
          <div className="rounded-lg bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">الحجم السوقي</div>
            <div className="mt-1 font-medium">{marketLabels[record.marketBand]}</div>
          </div>
          <div className="rounded-lg bg-muted/40 p-3">
            <div className="text-xs text-muted-foreground">إمكانية الربح</div>
            <div className="mt-1 font-medium">{profitLabels[record.profitBand]}</div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="text-sm font-medium">العنصر المرتبط</div>
          <div className="rounded-lg bg-muted/40 p-3">{record.linkedTitle}</div>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-medium">الدول المرتبطة</div>
          <div className="flex flex-wrap gap-2">
            {record.countries.map(country => (
              <Badge key={country} variant="outline" className="rounded-md">
                {country}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const sectorToneClasses: Record<string, string> = {
  'التقنية والذكاء الاصطناعي': 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
  'التجارة الإلكترونية والتجزئة': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  'الخدمات اللوجستية والنقل': 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
  'التقنية المالية (FinTech)': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  'الرعاية الصحية والتقنية الطبية': 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
  'التعليم والتدريب الرقمي': 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100',
  'العقارات والتقنية العقارية': 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
  'الأغذية والمشروبات': 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
  'الطاقة والتكنولوجيا النظيفة': 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
  'السياحة والضيافة': 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
  'الإعلام والمحتوى الرقمي': 'bg-violet-50 text-violet-700 border-violet-200 hover:bg-violet-100',
};

function getSectorTone(sectorName: string): string {
  if (sectorToneClasses[sectorName]) return sectorToneClasses[sectorName];
  const tones = [
    'bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100',
    'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
    'bg-lime-50 text-lime-700 border-lime-200 hover:bg-lime-100',
    'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 hover:bg-fuchsia-100',
    'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200',
  ];
  let charSum = 0;
  for (let i = 0; i < sectorName.length; i++) {
    charSum += sectorName.charCodeAt(i);
  }
  return tones[charSum % tones.length];
}

// TanStack Table Component for Problem & Opportunity Engine
function ProblemOpportunityTanStackTable({
  records,
  bookmarks,
  selectedRecordId,
  onSelectRecord,
  onBookmark,
  onCellFilter,
}: {
  records: EngineRecord[];
  bookmarks: Record<string, boolean>;
  selectedRecordId: string | null;
  onSelectRecord: (record: EngineRecord) => void;
  onBookmark: (record: EngineRecord) => void;
  onCellFilter?: (
    field: 'kind' | 'sectorName' | 'marketBand' | 'easeBand' | 'profitBand' | 'priorityBand' | 'updatedLabel',
    value: string
  ) => void;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  const columns = useMemo<ColumnDef<EngineRecord>[]>(
    () => [
      {
        id: 'bookmark',
        header: 'الحفظ',
        size: 60,
        cell: ({ row }) => {
          const record = row.original;
          const isSaved = bookmarks[record.id];
          return (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className={cn(
                'h-8 w-8 rounded-md p-0 text-xs font-medium transition-colors',
                isSaved
                  ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
              onClick={(event) => {
                event.stopPropagation();
                onBookmark(record);
              }}
              aria-label={`حفظ المشروع ${record.title}`}
            >
              {isSaved ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
            </Button>
          );
        },
      },
      {
        accessorKey: 'title',
        id: 'title',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-1 text-right font-bold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>العنوان</span>
            <ArrowUpDown className="mr-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => {
          const record = row.original;
          const isSaved = bookmarks[record.id];
          return (
            <div className="flex items-center gap-2">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectRecord(record);
                    }}
                    className="truncate text-right text-sm font-semibold text-foreground hover:text-primary hover:underline cursor-pointer"
                  >
                    {record.title}
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-[360px] text-right" dir="rtl">
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">{record.title}</div>
                    <p className="text-sm leading-7 text-muted-foreground">{record.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="rounded-md">{record.sectorName}</Badge>
                      <Badge variant="outline" className="rounded-md">{record.subSectorName}</Badge>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
              {isSaved ? <Bookmark className="size-3.5 fill-current text-primary shrink-0" /> : null}
            </div>
          );
        },
      },
      {
        accessorKey: 'kind',
        id: 'kind',
        header: 'النوع',
        cell: ({ row }) => {
          const record = row.original;
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCellFilter?.('kind', record.kind);
                  }}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <Badge variant="outline" className={cn('rounded-md px-2.5 py-1 text-xs font-bold shadow-none transition-all hover:ring-2 hover:ring-primary/20', typeToneClasses[record.kind])}>
                    {typeLabels[record.kind]}
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent dir="rtl">انقر لتصفية الجدول حسب {typeLabels[record.kind]}</TooltipContent>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'sectorName',
        id: 'sectorName',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-1 text-right font-bold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>القطاع</span>
            <ArrowUpDown className="mr-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => {
          const sectorName = row.original.sectorName;
          const toneClass = getSectorTone(sectorName);
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCellFilter?.('sectorName', sectorName);
                  }}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <Badge variant="outline" className={cn('rounded-md px-2.5 py-1 text-xs font-bold shadow-none transition-all hover:ring-2 hover:ring-primary/20', toneClass)}>
                    {sectorName}
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent dir="rtl">انقر لتصفية الجدول حسب قطاع: {sectorName}</TooltipContent>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'marketScore',
        id: 'marketScore',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-1 text-right font-bold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>حجم السوق</span>
            <ArrowUpDown className="mr-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => {
          const record = row.original;
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCellFilter?.('marketBand', record.marketBand);
                  }}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[11px] font-bold hover:border-primary/50 hover:bg-muted/80">
                    {marketLabels[record.marketBand]}
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent dir="rtl">درجة السوق: {record.marketScore}/10 (انقر للتصفية)</TooltipContent>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'easeScore',
        id: 'easeScore',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-1 text-right font-bold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>سهولة الحل</span>
            <ArrowUpDown className="mr-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => {
          const record = row.original;
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCellFilter?.('easeBand', record.easeBand);
                  }}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[11px] font-bold hover:border-primary/50 hover:bg-muted/80">
                    {easeLabels[record.easeBand]}
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent dir="rtl">سهولة التنفيذ: {record.easeScore}/10 (انقر للتصفية)</TooltipContent>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'profitScore',
        id: 'profitScore',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-1 text-right font-bold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>إمكانية الربح</span>
            <ArrowUpDown className="mr-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => {
          const record = row.original;
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCellFilter?.('profitBand', record.profitBand);
                  }}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[11px] font-bold hover:border-primary/50 hover:bg-muted/80">
                    {profitLabels[record.profitBand]}
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent dir="rtl">إمكانية الربح: {record.profitScore}/10 (انقر للتصفية)</TooltipContent>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'priorityScore',
        id: 'priorityScore',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 px-1 text-right font-bold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>مؤشر الأولوية</span>
            <ArrowUpDown className="mr-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => {
          const record = row.original;
          const prioBand = record.priorityScore >= 8 ? 'high' : record.priorityScore >= 5 ? 'medium' : 'low';
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCellFilter?.('priorityBand', prioBand);
                  }}
                  className="cursor-pointer transition-transform hover:scale-105"
                >
                  <Badge variant="outline" className={cn('rounded-md px-2 py-0.5 text-[11px] font-bold shadow-none hover:ring-2 hover:ring-primary/20', priorityTone(record.priorityScore))}>
                    {record.priorityScore}/10
                  </Badge>
                </button>
              </TooltipTrigger>
              <TooltipContent dir="rtl">الأولوية: {record.priorityScore}/10 (انقر لتصفية الأولوية)</TooltipContent>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'updatedLabel',
        id: 'updatedLabel',
        header: 'آخر تحديث',
        cell: ({ row }) => {
          const label = row.original.updatedLabel;
          return (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCellFilter?.('updatedLabel', label);
                  }}
                  className="text-xs text-muted-foreground font-medium hover:text-primary hover:underline cursor-pointer"
                >
                  {label}
                </button>
              </TooltipTrigger>
              <TooltipContent dir="rtl">تحديث: {label} (انقر للتصفية)</TooltipContent>
            </Tooltip>
          );
        },
      },
    ],
    [bookmarks, onBookmark, onCellFilter, onSelectRecord]
  );

  const table = useReactTable({
    data: records,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Card className="shadow-xs overflow-hidden border-border bg-card rounded-2xl">
      <div className="overflow-x-auto">
        <Table dir="rtl" className="w-full min-w-[1100px]">
          <TableHeader className="bg-muted/50 border-b border-border/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-11 text-right font-bold text-xs text-foreground">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => {
                const isActive = selectedRecordId === row.original.id;
                return (
                  <TableRow
                    key={row.id}
                    data-state={isActive ? 'selected' : undefined}
                    className="group hover:bg-muted/40 transition-colors border-b border-border/60"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2.5">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground text-sm font-medium">
                  لا توجد نتائج مطابقة لعملية البحث المحددة.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Pagination Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border bg-muted/20 text-xs">
        {/* Right side: Page size selector */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground font-medium">عدد النتائج في الصفحة:</span>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[75px] text-xs bg-background rounded-lg border-border">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-lg border-border">
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Left side: Navigation buttons & Page info */}
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground font-mono">
            صفحة <strong className="text-foreground">{table.getState().pagination.pageIndex + 1}</strong> من{' '}
            <strong className="text-foreground">{table.getPageCount() || 1}</strong> ({records.length} عنصر)
          </span>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 rounded-lg"
              title="الصفحة السابقة"
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 rounded-lg"
              title="الصفحة التالية"
            >
              <ChevronLeft className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export const ProblemOpportunityEngine: React.FC<{ setActiveTab?: (tab: string) => void }> = ({ setActiveTab }) => {
  const [dynamicProblems, setDynamicProblems] = useState<Problem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('priority');
  const [typeFilter, setTypeFilter] = useState<'all' | RecordKind>('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [marketFilter, setMarketFilter] = useState<'all' | MarketBand>('all');
  const [easeFilter, setEaseFilter] = useState<'all' | EaseBand>('all');
  const [profitFilter, setProfitFilter] = useState<'all' | ProfitBand>('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [competitionFilter, setCompetitionFilter] = useState<'all' | CompetitionBand>('all');
  const [sourceFilter, setSourceFilter] = useState<DataSource>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [advancedStatuses, setAdvancedStatuses] = useState<Record<RecordStatus, boolean>>({
    draft: true,
    validated: true,
    priority: true,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [detailsOpen, setDetailsOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadDynamicOpportunities()
      .then(records => {
        if (!mounted) return;
        setDynamicProblems(records);
      })
      .catch(() => {
        if (!mounted) return;
        setDynamicProblems([]);
      })
      .finally(() => {
        if (!mounted) return;
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const saved = loadSavedMarketItems();
    setBookmarks(
      saved.reduce<Record<string, boolean>>((accumulator, item) => {
        accumulator[item.id] = true;
        return accumulator;
      }, {}),
    );
  }, []);

  const records = useMemo(() => buildRecords(dynamicProblems), [dynamicProblems]);
  const sectors = useMemo(() => Array.from(new Set(records.map(record => record.sectorName))).sort(), [records]);
  const countries = useMemo(
    () =>
      COUNTRIES.map(country => decodeMojibake(country.name)).sort((a, b) => a.localeCompare(b, 'ar')),
    [],
  );

  const filteredRecords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const result = records.filter(record => {
      const haystack = [
        record.title,
        record.summary,
        record.sectorName,
        record.subSectorName,
        record.audience,
        record.linkedTitle,
        record.model,
        ...record.tags,
        ...record.countries,
      ]
        .join(' ')
        .toLowerCase();

      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesType = typeFilter === 'all' || record.kind === typeFilter;
      const matchesSector = sectorFilter === 'all' || record.sectorName === sectorFilter;
      const matchesMarket = marketFilter === 'all' || record.marketBand === marketFilter;
      const matchesEase = easeFilter === 'all' || record.easeBand === easeFilter;
      const matchesProfit = profitFilter === 'all' || record.profitBand === profitFilter;
      const matchesCountry = countryFilter === 'all' || record.countries.includes(countryFilter);
      const matchesCompetition = competitionFilter === 'all' || record.competitionBand === competitionFilter;
      const matchesSource = sourceFilter === 'all' || record.source === sourceFilter;
      const matchesStatus = advancedStatuses[record.status];
      const matchesPriority =
        priorityFilter === 'all' ||
        (priorityFilter === 'high' && record.priorityScore >= 8) ||
        (priorityFilter === 'medium' && record.priorityScore >= 5 && record.priorityScore < 8) ||
        (priorityFilter === 'low' && record.priorityScore < 5);

      return (
        matchesQuery &&
        matchesType &&
        matchesSector &&
        matchesMarket &&
        matchesEase &&
        matchesProfit &&
        matchesCountry &&
        matchesCompetition &&
        matchesSource &&
        matchesStatus &&
        matchesPriority
      );
    });

    return [...result].sort((left, right) => {
      if (sortBy === 'priority') return right.priorityScore - left.priorityScore;
      if (sortBy === 'market') return right.marketScore - left.marketScore;
      if (sortBy === 'ease') return right.easeScore - left.easeScore;
      if (sortBy === 'profit') return right.profitScore - left.profitScore;
      if (sortBy === 'latest') {
        const order = { اليوم: 3, 'هذا الأسبوع': 2, 'مؤخراً': 1 } as const;
        return order[right.updatedLabel as keyof typeof order] - order[left.updatedLabel as keyof typeof order];
      }
      return left.title.localeCompare(right.title, 'ar');
    });
  }, [
    advancedStatuses,
    competitionFilter,
    countryFilter,
    easeFilter,
    marketFilter,
    priorityFilter,
    profitFilter,
    query,
    records,
    sectorFilter,
    sortBy,
    sourceFilter,
    typeFilter,
  ]);

  const selectedRecord = useMemo(
    () => filteredRecords.find(record => record.id === selectedId) ?? filteredRecords[0] ?? null,
    [filteredRecords, selectedId],
  );

  useEffect(() => {
    if (!selectedId && filteredRecords[0]) {
      setSelectedId(filteredRecords[0].id);
      return;
    }

    if (selectedId && !filteredRecords.some(record => record.id === selectedId)) {
      setSelectedId(filteredRecords[0]?.id ?? null);
    }
  }, [filteredRecords, selectedId]);

  const totalProblems = records.filter(record => record.kind === 'problem').length;
  const totalOpportunities = records.filter(record => record.kind === 'opportunity').length;
  const priorityRecords = records.filter(record => record.priorityScore >= 8).length;
  const activeSectors = new Set(records.map(record => record.sectorName)).size;

  const resetFilters = () => {
    setQuery('');
    setSortBy('priority');
    setTypeFilter('all');
    setSectorFilter('all');
    setMarketFilter('all');
    setEaseFilter('all');
    setProfitFilter('all');
    setCountryFilter('all');
    setCompetitionFilter('all');
    setSourceFilter('all');
    setPriorityFilter('all');
    setAdvancedStatuses({ draft: true, validated: true, priority: true });
  };

  const handleCellFilter = (
    field: 'kind' | 'sectorName' | 'marketBand' | 'easeBand' | 'profitBand' | 'priorityBand' | 'updatedLabel',
    value: string,
  ) => {
    if (field === 'kind') setTypeFilter(value as 'all' | RecordKind);
    if (field === 'sectorName') setSectorFilter(value);
    if (field === 'marketBand') setMarketFilter(value as 'all' | MarketBand);
    if (field === 'easeBand') setEaseFilter(value as 'all' | EaseBand);
    if (field === 'profitBand') setProfitFilter(value as 'all' | ProfitBand);
    if (field === 'priorityBand') setPriorityFilter(value as 'all' | 'high' | 'medium' | 'low');
    if (field === 'updatedLabel') setQuery(value);
  };

  const handleBookmark = (record: EngineRecord) => {
    const result = toggleSavedMarketItem(record);
    setBookmarks(current => ({
      ...current,
      [record.id]: result.saved,
    }));
  };

  const handleSelectRecord = (record: EngineRecord) => {
    if (setActiveTab) {
      localStorage.setItem(MARKET_PROBLEM_STORAGE_KEY, JSON.stringify(record));
      setActiveTab('problem-detail');
      return;
    }
    setSelectedId(record.id);
    setDetailsOpen(true);
  };

  return (
    <TooltipProvider>
      <div dir="rtl" className="min-h-screen bg-background text-right text-foreground">
        <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
          {/* Header & Quick Stats Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/60 pb-3">
            <div className="space-y-1">
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">مشاكل وفرص السوق</h1>
              <p className="text-xs text-muted-foreground sm:text-sm">
                مساحة قرار مضغوطة لقراءة المشاكل والفرص بسرعة واستكشاف الفجوات الاستثمارية.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-lg bg-card px-3 py-1 text-xs font-semibold">
                {records.length} إجمالي الفجوات
              </Badge>
              <Badge variant="outline" className="rounded-lg bg-rose-50 text-rose-700 border-rose-200 px-3 py-1 text-xs font-semibold">
                {totalProblems} مشكلة
              </Badge>
              <Badge variant="outline" className="rounded-lg bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1 text-xs font-semibold">
                {totalOpportunities} فرصة
              </Badge>
              <Badge variant="outline" className="rounded-lg bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1 text-xs font-semibold">
                {priorityRecords} عالية الأولوية
              </Badge>
            </div>
          </div>

          {/* Main Controls Header & Filters Bar */}
          <Card className="shadow-xs border-border bg-card rounded-2xl">
            <CardContent className="space-y-3 p-4">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder="ابحث بالاسم، الكلمات المفتاحية، أو القطاع..."
                    className="h-10 text-xs sm:text-sm pr-9 rounded-xl border-border bg-background"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button type="button" variant="default" size="sm" onClick={() => setQuery('ذكاء اصطناعي')} className="h-9 text-xs rounded-xl">
                    <Sparkles className="size-4 me-1.5" />
                    اسأل
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={resetFilters} className="h-9 text-xs rounded-xl">
                    تصفير
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="outline" size="sm" className="h-9 text-xs rounded-xl">
                        <SlidersHorizontal className="size-3.5 me-1.5" />
                        فلاتر
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-64">
                      <DropdownMenuLabel>الحالات الظاهرة</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem
                        checked={advancedStatuses.priority}
                        onCheckedChange={() =>
                          setAdvancedStatuses(current => ({ ...current, priority: !current.priority }))
                        }
                      >
                        أولوية
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={advancedStatuses.validated}
                        onCheckedChange={() =>
                          setAdvancedStatuses(current => ({ ...current, validated: !current.validated }))
                        }
                      >
                        قيد التحقق
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem
                        checked={advancedStatuses.draft}
                        onCheckedChange={() =>
                          setAdvancedStatuses(current => ({ ...current, draft: !current.draft }))
                        }
                      >
                        تحتاج مراجعة
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {isLoading ? (
                <FiltersSkeleton />
              ) : (
                <div className="overflow-x-auto">
                  <div className="flex min-w-max items-center gap-2 pt-0.5">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-8 text-xs w-[140px] rounded-lg"><SelectValue placeholder="ترتيب حسب" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="priority">ترتيب حسب الأولوية</SelectItem>
                        <SelectItem value="latest">ترتيب حسب آخر تحديث</SelectItem>
                        <SelectItem value="market">ترتيب حسب حجم السوق</SelectItem>
                        <SelectItem value="ease">ترتيب حسب سهولة التنفيذ</SelectItem>
                        <SelectItem value="profit">ترتيب حسب إمكانية الربح</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={typeFilter} onValueChange={value => setTypeFilter(value as 'all' | RecordKind)}>
                      <SelectTrigger className="h-8 text-xs w-[110px] rounded-lg"><SelectValue placeholder="النوع" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">كل الأنواع</SelectItem>
                        <SelectItem value="problem">مشاكل</SelectItem>
                        <SelectItem value="opportunity">فرص</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sectorFilter} onValueChange={setSectorFilter}>
                      <SelectTrigger className="h-8 text-xs w-[130px] rounded-lg"><SelectValue placeholder="القطاع" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">كل القطاعات</SelectItem>
                        {sectors.map(sector => (
                          <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={marketFilter} onValueChange={value => setMarketFilter(value as 'all' | MarketBand)}>
                      <SelectTrigger className="h-8 text-xs w-[110px] rounded-lg"><SelectValue placeholder="حجم السوق" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">كل الأحجام</SelectItem>
                        <SelectItem value="massive">سوق ضخم</SelectItem>
                        <SelectItem value="large">سوق واسع</SelectItem>
                        <SelectItem value="medium">سوق متوسط</SelectItem>
                        <SelectItem value="niche">سوق متخصص</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={easeFilter} onValueChange={value => setEaseFilter(value as 'all' | EaseBand)}>
                      <SelectTrigger className="h-8 text-xs w-[110px] rounded-lg"><SelectValue placeholder="سهولة الحل" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">كل المستويات</SelectItem>
                        <SelectItem value="easy">سهل التنفيذ</SelectItem>
                        <SelectItem value="medium">متوسط الصعوبة</SelectItem>
                        <SelectItem value="complex">معقد وحساس</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={profitFilter} onValueChange={value => setProfitFilter(value as 'all' | ProfitBand)}>
                      <SelectTrigger className="h-8 text-xs w-[120px] rounded-lg"><SelectValue placeholder="إمكانية الربح" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">كل المستويات</SelectItem>
                        <SelectItem value="high">ربحية عالية</SelectItem>
                        <SelectItem value="medium">ربحية متوسطة</SelectItem>
                        <SelectItem value="steady">مستقرة تدريجياً</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={countryFilter} onValueChange={setCountryFilter}>
                      <SelectTrigger className="h-8 text-xs w-[110px] rounded-lg"><SelectValue placeholder="الدولة" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">كل الدول</SelectItem>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={competitionFilter} onValueChange={value => setCompetitionFilter(value as 'all' | CompetitionBand)}>
                      <SelectTrigger className="h-8 text-xs w-[110px] rounded-lg"><SelectValue placeholder="المنافسة" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">كل المستويات</SelectItem>
                        <SelectItem value="low">منخفضة</SelectItem>
                        <SelectItem value="medium">متوسطة</SelectItem>
                        <SelectItem value="high">مرتفعة</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={sourceFilter} onValueChange={value => setSourceFilter(value as DataSource)}>
                      <SelectTrigger className="h-8 text-xs w-[120px] rounded-lg"><SelectValue placeholder="مصدر البيانات" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">كل المصادر</SelectItem>
                        <SelectItem value="base">المصدر الأساسي</SelectItem>
                        <SelectItem value="dynamic">المصدر الديناميكي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Cell Filters Bar */}
          {(typeFilter !== 'all' || sectorFilter !== 'all' || marketFilter !== 'all' || easeFilter !== 'all' || profitFilter !== 'all' || priorityFilter !== 'all' || countryFilter !== 'all' || competitionFilter !== 'all' || sourceFilter !== 'all' || query) && (
            <div className="flex flex-wrap items-center gap-2 rounded-xl bg-muted/40 p-2.5 border border-border/60 text-xs">
              <span className="font-bold text-muted-foreground flex items-center gap-1">
                <Filter className="size-3.5" /> الفلاتر النشطة:
              </span>
              {typeFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 rounded-md px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/20">
                  النوع: {typeLabels[typeFilter]}
                  <button type="button" onClick={() => setTypeFilter('all')} className="hover:text-destructive ms-1 cursor-pointer"><X className="size-3" /></button>
                </Badge>
              )}
              {sectorFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 rounded-md px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/20">
                  القطاع: {sectorFilter}
                  <button type="button" onClick={() => setSectorFilter('all')} className="hover:text-destructive ms-1 cursor-pointer"><X className="size-3" /></button>
                </Badge>
              )}
              {marketFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 rounded-md px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/20">
                  السوق: {marketLabels[marketFilter]}
                  <button type="button" onClick={() => setMarketFilter('all')} className="hover:text-destructive ms-1 cursor-pointer"><X className="size-3" /></button>
                </Badge>
              )}
              {easeFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 rounded-md px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/20">
                  سهولة الحل: {easeLabels[easeFilter]}
                  <button type="button" onClick={() => setEaseFilter('all')} className="hover:text-destructive ms-1 cursor-pointer"><X className="size-3" /></button>
                </Badge>
              )}
              {profitFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 rounded-md px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/20">
                  إمكانية الربح: {profitLabels[profitFilter]}
                  <button type="button" onClick={() => setProfitFilter('all')} className="hover:text-destructive ms-1 cursor-pointer"><X className="size-3" /></button>
                </Badge>
              )}
              {priorityFilter !== 'all' && (
                <Badge variant="secondary" className="gap-1 rounded-md px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/20">
                  الأولوية: {priorityFilter === 'high' ? 'عالية (8+)' : priorityFilter === 'medium' ? 'متوسطة (5-7)' : 'منخفضة (<5)'}
                  <button type="button" onClick={() => setPriorityFilter('all')} className="hover:text-destructive ms-1 cursor-pointer"><X className="size-3" /></button>
                </Badge>
              )}
              {query && (
                <Badge variant="secondary" className="gap-1 rounded-md px-2 py-0.5 text-xs bg-primary/10 text-primary border border-primary/20">
                  البحث: "{query}"
                  <button type="button" onClick={() => setQuery('')} className="hover:text-destructive ms-1 cursor-pointer"><X className="size-3" /></button>
                </Badge>
              )}
              <Button type="button" variant="ghost" size="sm" onClick={resetFilters} className="h-6 px-2 text-[11px] text-muted-foreground hover:text-foreground ms-auto">
                إعادة ضبط الكل
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {isLoading ? (
              <Card className="shadow-sm">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LoaderCircle className="size-4 animate-spin" />
                    جاري تجهيز نتائج السوق
                  </div>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} className="h-14 rounded-lg" />
                  ))}
                </CardContent>
              </Card>
            ) : filteredRecords.length === 0 ? (
              <ResultsEmpty onReset={resetFilters} />
            ) : (
              <ProblemOpportunityTanStackTable
                records={filteredRecords}
                bookmarks={bookmarks}
                selectedRecordId={selectedId}
                onSelectRecord={handleSelectRecord}
                onBookmark={handleBookmark}
              />
            )}
          </div>
        </div>

        <Sheet open={detailsOpen} onOpenChange={setDetailsOpen}>
          <SheetContent side="bottom" className="max-h-[88vh] overflow-y-auto rounded-t-3xl">
            <SheetHeader>
              <SheetTitle>تفاصيل العنصر</SheetTitle>
              <SheetDescription>معاينة سريعة للمشكلة أو الفرصة المحددة.</SheetDescription>
            </SheetHeader>
            <div className="p-4 pt-0">
              <DetailList record={selectedRecord} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </TooltipProvider>
  );
};

export default ProblemOpportunityEngine;
