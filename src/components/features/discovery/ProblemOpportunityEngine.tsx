import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpDown,
  Bookmark,
  BookmarkCheck,
  Database,
  Filter,
  Globe2,
  LoaderCircle,
  Search,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
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

import { DATA, COUNTRIES } from './ProblemOpportunityEngine/constants.tsx';
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

const competitionLabels: Record<CompetitionBand, string> = {
  high: 'مرتفعة',
  medium: 'متوسطة',
  low: 'منخفضة',
};

const typeToneClasses: Record<RecordKind, string> = {
  problem: 'border-slate-300 bg-slate-100 text-slate-900',
  opportunity: 'border-indigo-200 bg-indigo-50 text-indigo-700',
};

const statusToneClasses: Record<RecordStatus, string> = {
  draft: 'border-slate-300 bg-slate-100 text-slate-800',
  validated: 'border-slate-300 bg-white text-slate-800',
  priority: 'border-indigo-200 bg-indigo-50 text-indigo-700',
};

const priorityTone = (score: number) => {
  if (score >= 8) return 'border-indigo-200 bg-indigo-50 text-indigo-700';
  if (score >= 6) return 'border-slate-300 bg-slate-100 text-slate-800';
  return 'border-slate-200 bg-background text-slate-700';
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
  <Card className="border-dashed shadow-sm">
    <CardContent className="flex min-h-[260px] flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="rounded-full border bg-muted/40 p-4">
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
      <Card className="border-dashed shadow-sm">
        <CardContent className="flex min-h-[280px] items-center justify-center p-6 text-center text-sm text-muted-foreground">
          اختر صفاً من الجدول لمراجعة الملخص السريع.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border shadow-sm">
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
          <div className="rounded-lg border bg-muted/20 p-3">
            <div className="text-xs text-muted-foreground">القطاع</div>
            <div className="mt-1 font-medium">{record.sectorName}</div>
          </div>
          <div className="rounded-lg border bg-muted/20 p-3">
            <div className="text-xs text-muted-foreground">الشريحة</div>
            <div className="mt-1 font-medium">{record.audience}</div>
          </div>
          <div className="rounded-lg border bg-muted/20 p-3">
            <div className="text-xs text-muted-foreground">الحجم السوقي</div>
            <div className="mt-1 font-medium">{marketLabels[record.marketBand]}</div>
          </div>
          <div className="rounded-lg border bg-muted/20 p-3">
            <div className="text-xs text-muted-foreground">إمكانية الربح</div>
            <div className="mt-1 font-medium">{profitLabels[record.profitBand]}</div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="text-sm font-medium">العنصر المرتبط</div>
          <div className="rounded-lg border bg-muted/20 p-3">{record.linkedTitle}</div>
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
  const [advancedStatuses, setAdvancedStatuses] = useState<Record<RecordStatus, boolean>>({
    draft: true,
    validated: true,
    priority: true,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
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
        matchesStatus
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
    profitFilter,
    query,
    records,
    sectorFilter,
    sortBy,
    sourceFilter,
    typeFilter,
  ]);

  const perPage = 10;
  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / perPage));

  useEffect(() => {
    setPage(1);
  }, [query, sortBy, typeFilter, sectorFilter, marketFilter, easeFilter, profitFilter, countryFilter, competitionFilter, sourceFilter, advancedStatuses]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const paginatedRecords = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredRecords.slice(start, start + perPage);
  }, [filteredRecords, page, perPage]);

  const selectedRecord = useMemo(
    () => filteredRecords.find(record => record.id === selectedId) ?? paginatedRecords[0] ?? null,
    [filteredRecords, paginatedRecords, selectedId],
  );

  useEffect(() => {
    if (!selectedId && paginatedRecords[0]) {
      setSelectedId(paginatedRecords[0].id);
      return;
    }

    if (selectedId && !filteredRecords.some(record => record.id === selectedId)) {
      setSelectedId(filteredRecords[0]?.id ?? null);
    }
  }, [filteredRecords, paginatedRecords, selectedId]);

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
    setAdvancedStatuses({ draft: true, validated: true, priority: true });
  };

  const handleBookmark = (record: EngineRecord) => {
    const result = toggleSavedMarketItem(record);
    setBookmarks(current => ({
      ...current,
      [record.id]: result.saved,
    }));
  };

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, index) => index + 1);
    if (page <= 3) return [1, 2, 3, 4, totalPages];
    if (page >= totalPages - 2) return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, page - 1, page, page + 1, totalPages];
  }, [page, totalPages]);

  const renderRow = (record: EngineRecord, compact = false) => (
    <TableRow
      key={record.id}
      data-state={selectedRecord?.id === record.id ? 'selected' : undefined}
      className="cursor-pointer"
      onClick={() => {
        if (record.kind === 'problem' && setActiveTab) {
          localStorage.setItem(MARKET_PROBLEM_STORAGE_KEY, JSON.stringify(record));
          setActiveTab('problem-detail');
          return;
        }
        setSelectedId(record.id);
        setDetailsOpen(true);
      }}
    >
      <TableCell className="w-[140px]">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={cn(
            'h-8 rounded-md border px-2 text-xs font-medium transition-colors',
            bookmarks[record.id]
              ? 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
              : 'border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
          onClick={(event) => {
            event.stopPropagation();
            handleBookmark(record);
          }}
          aria-label={`حفظ المشروع ${record.title}`}
        >
          {bookmarks[record.id] ? <BookmarkCheck className="size-3.5" /> : <Bookmark className="size-3.5" />}
          <span className="truncate">{bookmarks[record.id] ? 'محفوظ' : 'حفظ المشروع'}</span>
        </Button>
      </TableCell>
      <TableCell className="min-w-[240px] whitespace-nowrap">
        <div className="space-y-1 overflow-hidden">
          <div className="flex items-center gap-2">
            <HoverCard>
              <HoverCardTrigger asChild>
                <button type="button" className="truncate text-right font-semibold text-foreground hover:text-primary">
                  {record.title}
                </button>
              </HoverCardTrigger>
              <HoverCardContent className="w-[360px] text-right">
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
            {bookmarks[record.id] ? <Bookmark className="size-3.5 fill-current text-primary" /> : null}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {record.summary}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={cn('rounded-md border font-medium', typeToneClasses[record.kind])}>
          {typeLabels[record.kind]}
        </Badge>
      </TableCell>
      <TableCell className="whitespace-nowrap">{record.sectorName}</TableCell>
      <TableCell>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="rounded-md">
              {marketLabels[record.marketBand]}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>درجة السوق: {record.marketScore}/10</TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="rounded-md">
              {easeLabels[record.easeBand]}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>سهولة التنفيذ: {record.easeScore}/10</TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant="outline" className="rounded-md">
              {profitLabels[record.profitBand]}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>إمكانية الربح: {record.profitScore}/10</TooltipContent>
        </Tooltip>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={cn('rounded-md border font-medium', priorityTone(record.priorityScore))}>
          {record.priorityScore}/10
        </Badge>
      </TableCell>
      <TableCell className="whitespace-nowrap">{record.updatedLabel}</TableCell>
    </TableRow>
  );

  return (
    <TooltipProvider>
      <div dir="rtl" className="min-h-screen bg-background text-right text-foreground">
        <div className="mx-auto flex w-full max-w-[1700px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <Card className="border-border shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col gap-3 rounded-xl border bg-card px-4 py-3">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[10px]">مساحة تحليل السوق</Badge>
                      <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[10px]">SaaS-ready UI</Badge>
                      <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[10px]">Shadcn style</Badge>
                      <Badge variant="outline" className="rounded-md px-2 py-0.5 text-[10px]">كثافة معلومات عالية</Badge>
                    </div>
                    <div className="space-y-1">
                      <h1 className="text-lg font-semibold leading-none tracking-tight sm:text-xl">مشاكل وفرص السوق</h1>
                      <p className="max-w-4xl text-xs leading-5 text-muted-foreground sm:text-sm">
                        مساحة قرار مضغوطة لقراءة المشاكل والفرص بسرعة داخل جدول احترافي وفلاتر واضحة.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4 lg:min-w-[480px]">
                    <div className="rounded-lg border bg-muted/30 px-2.5 py-2">
                      <div className="text-[11px] text-muted-foreground">المشاكل</div>
                      <div className="mt-1 text-sm font-semibold leading-none sm:text-base">{totalProblems}</div>
                    </div>
                    <div className="rounded-lg border bg-muted/30 px-2.5 py-2">
                      <div className="text-[11px] text-muted-foreground">الفرص</div>
                      <div className="mt-1 text-sm font-semibold leading-none sm:text-base">{totalOpportunities}</div>
                    </div>
                    <div className="rounded-lg border bg-muted/30 px-2.5 py-2">
                      <div className="text-[11px] text-muted-foreground">الأولوية العالية</div>
                      <div className="mt-1 text-sm font-semibold leading-none sm:text-base">{priorityRecords}</div>
                    </div>
                    <div className="rounded-lg border bg-muted/30 px-2.5 py-2">
                      <div className="text-[11px] text-muted-foreground">القطاعات النشطة</div>
                      <div className="mt-1 text-sm font-semibold leading-none sm:text-base">{activeSectors}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardContent className="flex flex-col gap-3 p-4">
              <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    placeholder="ابحث عن مشكلة، فرصة، قطاع، دولة، أو نموذج عمل"
                    className="h-10 pr-10 text-right"
                  />
                </div>
                <Button type="button" size="md" className="min-w-[110px]">
                  <Sparkles className="size-4" />
                  اسأل
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map(suggestion => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="xs"
                    className="rounded-full"
                    onClick={() => setQuery(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-sm">شريط الفلاتر</CardTitle>
                  <CardDescription className="text-xs leading-6">فلترة النتائج حسب النوع، القطاع، الربحية، وسهولة التنفيذ.</CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={resetFilters}>
                    إعادة ضبط الفلاتر
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button type="button" variant="outline" size="sm">
                        <SlidersHorizontal className="size-4" />
                        فلاتر متقدمة
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
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              {isLoading ? (
                <FiltersSkeleton />
              ) : (
                <div className="overflow-x-auto">
                  <div className="flex min-w-max items-center gap-3 pb-1">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger><SelectValue placeholder="ترتيب حسب" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="priority">ترتيب حسب الأولوية</SelectItem>
                      <SelectItem value="latest">ترتيب حسب آخر تحديث</SelectItem>
                      <SelectItem value="market">ترتيب حسب حجم السوق</SelectItem>
                      <SelectItem value="ease">ترتيب حسب سهولة التنفيذ</SelectItem>
                      <SelectItem value="profit">ترتيب حسب إمكانية الربح</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={value => setTypeFilter(value as 'all' | RecordKind)}>
                    <SelectTrigger><SelectValue placeholder="النوع" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل الأنواع</SelectItem>
                      <SelectItem value="problem">مشاكل</SelectItem>
                      <SelectItem value="opportunity">فرص</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sectorFilter} onValueChange={setSectorFilter}>
                    <SelectTrigger><SelectValue placeholder="القطاع" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل القطاعات</SelectItem>
                      {sectors.map(sector => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={marketFilter} onValueChange={value => setMarketFilter(value as 'all' | MarketBand)}>
                    <SelectTrigger><SelectValue placeholder="حجم السوق" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل الأحجام</SelectItem>
                      <SelectItem value="large">كبير</SelectItem>
                      <SelectItem value="medium">متوسط</SelectItem>
                      <SelectItem value="small">صغير</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={easeFilter} onValueChange={value => setEaseFilter(value as 'all' | EaseBand)}>
                    <SelectTrigger><SelectValue placeholder="سهولة التنفيذ" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل المستويات</SelectItem>
                      <SelectItem value="easy">سهل</SelectItem>
                      <SelectItem value="moderate">متوسط</SelectItem>
                      <SelectItem value="hard">صعب</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={profitFilter} onValueChange={value => setProfitFilter(value as 'all' | ProfitBand)}>
                    <SelectTrigger><SelectValue placeholder="إمكانية الربح" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل المستويات</SelectItem>
                      <SelectItem value="high">مرتفعة</SelectItem>
                      <SelectItem value="medium">متوسطة</SelectItem>
                      <SelectItem value="low">ضعيفة</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={countryFilter} onValueChange={setCountryFilter}>
                    <SelectTrigger><SelectValue placeholder="الدولة" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل الدول</SelectItem>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={competitionFilter} onValueChange={value => setCompetitionFilter(value as 'all' | CompetitionBand)}>
                    <SelectTrigger><SelectValue placeholder="المنافسة" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل المستويات</SelectItem>
                      <SelectItem value="low">منخفضة</SelectItem>
                      <SelectItem value="medium">متوسطة</SelectItem>
                      <SelectItem value="high">مرتفعة</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sourceFilter} onValueChange={value => setSourceFilter(value as DataSource)}>
                    <SelectTrigger><SelectValue placeholder="مصدر البيانات" /></SelectTrigger>
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

          <div className="space-y-4">
              {isLoading ? (
                <Card className="border-border shadow-sm">
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
                <Card className="border-border shadow-sm">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table dir="rtl" className="w-full min-w-[1680px] table-fixed">
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[140px] whitespace-nowrap">حفظ المشروع</TableHead>
                            <TableHead className="w-[320px] whitespace-nowrap">العنوان</TableHead>
                            <TableHead className="w-[120px] whitespace-nowrap">النوع</TableHead>
                            <TableHead className="w-[180px] whitespace-nowrap">القطاع</TableHead>
                            <TableHead className="w-[120px] whitespace-nowrap">حجم السوق</TableHead>
                            <TableHead className="w-[120px] whitespace-nowrap">سهولة الحل</TableHead>
                            <TableHead className="w-[140px] whitespace-nowrap">إمكانية الربح</TableHead>
                            <TableHead className="w-[140px] whitespace-nowrap">مؤشر الأولوية</TableHead>
                            <TableHead className="w-[120px] whitespace-nowrap">آخر تحديث</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {paginatedRecords.map(record => renderRow(record))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              )}

              {filteredRecords.length > 0 ? (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Badge variant="outline" className="rounded-md px-3 py-1">
                      {filteredRecords.length} نتيجة
                    </Badge>
                    <Badge variant="outline" className="rounded-md px-3 py-1">
                      <Database className="me-1 size-3.5" />
                      عرض قاعدة بيانات
                    </Badge>
                  </div>
                <Pagination>
                  <PaginationContent className="justify-start">
                    <PaginationItem>
                      <PaginationPrevious
                        disabled={page <= 1}
                        onClick={() => page > 1 && setPage(current => current - 1)}
                      />
                    </PaginationItem>
                    {pageNumbers.map((pageNumber, index) => {
                      const previous = pageNumbers[index - 1];
                      const shouldShowEllipsis = previous && pageNumber - previous > 1;

                      return (
                        <React.Fragment key={pageNumber}>
                          {shouldShowEllipsis ? (
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                          ) : null}
                          <PaginationItem>
                            <PaginationLink isActive={page === pageNumber} onClick={() => setPage(pageNumber)}>
                              {pageNumber}
                            </PaginationLink>
                          </PaginationItem>
                        </React.Fragment>
                      );
                    })}
                    <PaginationItem>
                      <PaginationNext
                        disabled={page >= totalPages}
                        onClick={() => page < totalPages && setPage(current => current + 1)}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                </div>
              ) : null}
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
