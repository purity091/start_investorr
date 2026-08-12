import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpDown,
  Bookmark,
  BookmarkCheck,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FolderSearch,
  Lightbulb,
  Share2,
  Sparkles,
  Trash2,
  Award,
  Layers
} from 'lucide-react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/features/auth/AuthContext';
import { getProjectEditPath } from '@/features/workspace/workspaceNavigation';
import { fetchPublicJson } from '@/lib/publicData';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';

import {
  MARKET_PROBLEM_STORAGE_KEY,
  loadSavedMarketItems,
  loadBookmarkedProjectIds,
  parsePublicProjectBookmarkId,
  removeBookmarkedProjectId,
  removeSavedMarketRecord,
  syncCloudBookmarks,
  saveCloudBookmarks,
  type PublicProjectBookmarkSource,
} from './problemDetailStorage';

export type SourcePageId = 'all' | 'workspace' | 'problem_engine' | 'project_ideas' | 'proven_projects';

export interface SavedItemRow {
  id: string;
  sourcePageId: SourcePageId;
  sourcePageLabel: string;
  targetTab: string;
  title: string;
  summary: string;
  sector: string;
  scoreLabel: string;
  scoreValue: number;
  savedDate: string;
  rawPayload?: { id?: string; isProject?: boolean; source?: PublicProjectBookmarkSource; projectId?: string };
}

type SavedCanvasRow = {
  id: string;
  project_title: string | null;
  sector_label: string | null;
  project_summary: string | null;
  readiness_score: number | null;
  profile?: { sectorLabel?: string | null; summary?: string | null } | null;
  metrics?: { readinessScore?: number | null } | null;
  canvas_data?: {
    profile?: { sectorLabel?: string | null; summary?: string | null } | null;
    metrics?: { readinessScore?: number | null } | null;
  } | null;
  updated_at: string;
};

const SOURCE_PAGES_META: Record<SourcePageId, { label: string; icon: React.ComponentType<{ className?: string }>; tone: string }> = {
  all: {
    label: 'جميع المحفوظات',
    icon: Layers,
    tone: 'bg-muted text-foreground',
  },
  workspace: {
    label: 'خطط ومشاريع الأعمال',
    icon: Briefcase,
    tone: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  },
  problem_engine: {
    label: 'محرك المشاكل والفرص',
    icon: Lightbulb,
    tone: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  },
  project_ideas: {
    label: 'أفكار المشاريع و SaaS',
    icon: Sparkles,
    tone: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  },
  proven_projects: {
    label: 'معرض التجارب والمشاريع',
    icon: Award,
    tone: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  },
};

interface SavedMarketItemsProps {
  setActiveTab: (tab: string) => void;
}

export const SavedMarketItems: React.FC<SavedMarketItemsProps> = ({ setActiveTab }) => {
  const { user } = useAuth();

  const [items, setItems] = useState<SavedItemRow[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedSourcePage, setSelectedSourcePage] = useState<SourcePageId>('all');
  const [sorting, setSorting] = useState<SortingState>([{ id: 'savedDate', desc: true }]);
  const [{ pageIndex, pageSize }, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  // Load saved items strictly from saved records (no fake/unbookmarked items injected)
  useEffect(() => {
    const fetchAllSavedItems = async () => {
      const unifiedList: SavedItemRow[] = [];

      // 1. Saved Market Problems & Opportunities from local storage
      const marketRecords = loadSavedMarketItems();
      marketRecords.forEach((m) => {
        unifiedList.push({
          id: m.id,
          sourcePageId: 'problem_engine',
          sourcePageLabel: 'محرك المشاكل والفرص',
          targetTab: m.kind === 'problem' ? 'problem-detail' : 'problem-engine',
          title: m.title,
          summary: m.summary || `مرتبطة بـ: ${m.linkedTitle}`,
          sector: m.sectorName || 'عام',
          scoreLabel: `${m.priorityScore}/10`,
          scoreValue: m.priorityScore * 10,
          savedDate: m.updatedLabel || 'مؤخراً',
          rawPayload: m,
        });
      });

      // 2. Saved User Projects explicitly bookmarked by the user (with Supabase Cloud Sync)
      const bookmarkedProjectIds = user ? await syncCloudBookmarks(user.id) : loadBookmarkedProjectIds();
      const publicProjectBookmarks = bookmarkedProjectIds
        .map(parsePublicProjectBookmarkId)
        .filter(Boolean) as Array<{ source: PublicProjectBookmarkSource; projectId: string }>;

      if (publicProjectBookmarks.length > 0) {
        try {
          const [provenListResult, failedListResult] = await Promise.allSettled([
            fetchPublicJson<any[]>('/api/public-data/proven-projects'),
            fetchPublicJson<any[]>('/api/public-data/failed-projects'),
          ]);

          const projectIndexes: Record<PublicProjectBookmarkSource, any[]> = {
            'proven-projects': provenListResult.status === 'fulfilled' ? provenListResult.value : [],
            'failed-projects': failedListResult.status === 'fulfilled' ? failedListResult.value : [],
          };

          publicProjectBookmarks.forEach(({ source, projectId }) => {
            const project = projectIndexes[source].find((item) => (item.slug || item.id) === projectId);
            if (!project) return;

            unifiedList.push({
              id: `${source}:${projectId}`,
              sourcePageId: 'proven_projects',
              sourcePageLabel: source === 'failed-projects'
                ? 'الشركات والتجارب الفاشلة'
                : 'الشركات والتجارب الناجحة',
              targetTab: source === 'failed-projects' ? 'failed-projects' : 'proven-projects',
              title: project.name || project.title || project.company?.name || 'شركة محفوظة',
              summary: project.headline || project.description || project.summary || 'دراسة حالة محفوظة من صفحة الشركات.',
              sector: project.category || project.company?.business_model || 'دراسة حالة',
              scoreLabel: source === 'failed-projects' ? 'درس مستفاد' : 'دراسة نجاح',
              scoreValue: source === 'failed-projects' ? 70 : 90,
              savedDate: 'مؤخراً',
              rawPayload: { id: `${source}:${projectId}`, source, projectId },
            });
          });
        } catch (err) {
          console.error('Error loading bookmarked public projects:', err);
        }
      }

      if (user && bookmarkedProjectIds.length > 0) {
        try {
          const workspaceProjectIds = bookmarkedProjectIds.filter((id) => !parsePublicProjectBookmarkId(id));
          if (workspaceProjectIds.length === 0) {
            setItems(unifiedList);
            return;
          }

          const { data, error } = await supabase
            .from('business_canvas')
            .select('id, project_title, sector_label, project_summary, readiness_score, canvas_data->profile, canvas_data->metrics, updated_at')
            .eq('user_id', user.id)
            .is('deleted_at', null)
            .in('id', workspaceProjectIds);

          if (!error && data) {
            (data as SavedCanvasRow[]).forEach((row) => {
              const profile = row.profile || row.canvas_data?.profile;
              const metrics = row.metrics || row.canvas_data?.metrics;
              unifiedList.push({
                id: row.id,
                sourcePageId: 'workspace',
                sourcePageLabel: 'خطط ومشاريع الأعمال',
                targetTab: 'editor',
                title: row.project_title || 'مشروع بدون اسم',
                summary: row.project_summary || profile?.summary || 'دراسة جدوى ونموذج عمل قابل للتعديل المباشر.',
                sector: row.sector_label || profile?.sectorLabel || 'قطاع الأعمال',
                scoreLabel: `${row.readiness_score ?? metrics?.readinessScore ?? 85}%`,
                scoreValue: row.readiness_score ?? metrics?.readinessScore ?? 85,
                savedDate: new Date(row.updated_at).toLocaleDateString('ar-SA-u-nu-latn'),
                rawPayload: { isProject: true, id: row.id },
              });
            });
          }
        } catch (err) {
          console.error('Error loading bookmarked projects:', err);
        }
      }

      setItems(unifiedList);
    };

    fetchAllSavedItems();
  }, [user]);

  // Open item in its source page
  const handleOpenItem = (item: SavedItemRow) => {
    if (item.sourcePageId === 'workspace') {
      if (item.rawPayload?.id) {
        window.location.assign(getProjectEditPath(item.rawPayload.id));
        return;
      }
      setActiveTab('editor');
    } else if (item.sourcePageId === 'problem_engine') {
      if (item.rawPayload) {
        localStorage.setItem(MARKET_PROBLEM_STORAGE_KEY, JSON.stringify(item.rawPayload));
        setActiveTab('problem-detail');
      } else {
        setActiveTab('problem-engine');
      }
    } else if (item.sourcePageId === 'proven_projects') {
      const targetTab = item.rawPayload?.source === 'failed-projects' ? 'failed-projects' : 'proven-projects';
      const projectId = item.rawPayload?.projectId;

      if (projectId) {
        const nextUrl = new URL(window.location.href);
        nextUrl.pathname = `/${targetTab}`;
        nextUrl.search = '';
        nextUrl.searchParams.set('project', projectId);
        window.history.pushState({}, '', nextUrl.toString());
      }

      setActiveTab(targetTab);
      window.dispatchEvent(new CustomEvent('khotta:navigate', { detail: { tab: targetTab } }));
    } else {
      setActiveTab(item.targetTab);
    }
  };

  // Permanently remove item from saved storage (local + cloud)
  const handleRemoveItem = (item: SavedItemRow) => {
    if (item.sourcePageId === 'problem_engine') {
      removeSavedMarketRecord(item.id);
    } else if (item.sourcePageId === 'workspace' || item.sourcePageId === 'proven_projects') {
      removeBookmarkedProjectId(item.id);
      if (user) {
        const remaining = loadBookmarkedProjectIds();
        saveCloudBookmarks(user.id, remaining);
      }
    }
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  // Data filtered by Source Page
  const filteredData = useMemo(() => {
    if (selectedSourcePage === 'all') return items;
    return items.filter((item) => item.sourcePageId === selectedSourcePage);
  }, [items, selectedSourcePage]);

  // Counts by source page
  const sourceCounts = useMemo(() => {
    const counts: Record<SourcePageId, number> = {
      all: items.length,
      workspace: 0,
      problem_engine: 0,
      project_ideas: 0,
      proven_projects: 0,
    };
    items.forEach((item) => {
      if (counts[item.sourcePageId] !== undefined) {
        counts[item.sourcePageId]++;
      }
    });
    return counts;
  }, [items]);

  // TanStack Table Columns
  const columns = useMemo<ColumnDef<SavedItemRow>[]>(
    () => [
      {
        accessorKey: 'title',
        id: 'title',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 p-0 font-semibold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>العنوان والمضمون</span>
            <ArrowUpDown className="ms-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => {
          const item = row.original;
          const meta = SOURCE_PAGES_META[item.sourcePageId];
          const Icon = meta.icon;
          return (
            <div className="flex items-start gap-3 py-1">
              <div className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg mt-0.5', meta.tone)}>
                <Icon className="size-4" />
              </div>
              <div className="space-y-1 min-w-0">
                <div
                  className="font-semibold text-sm text-foreground hover:text-primary cursor-pointer transition-colors line-clamp-1"
                  onClick={() => handleOpenItem(item)}
                >
                  {item.title}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'sourcePageId',
        id: 'sourcePageId',
        header: 'الصفحة المصدر',
        cell: ({ row }) => {
          const meta = SOURCE_PAGES_META[row.original.sourcePageId];
          return (
            <Badge variant="secondary" className={cn('rounded-md px-2.5 py-1 text-xs font-medium border-0', meta.tone)}>
              {meta.label}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'sector',
        id: 'sector',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 p-0 font-semibold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>القطاع</span>
            <ArrowUpDown className="ms-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-xs font-medium text-foreground">
            {row.original.sector}
          </span>
        ),
      },
      {
        accessorKey: 'scoreValue',
        id: 'scoreValue',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 p-0 font-semibold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>التقييم / الأولوية</span>
            <ArrowUpDown className="ms-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => {
          const item = row.original;
          const isHigh = item.scoreValue >= 75;
          return (
            <Badge
              variant="outline"
              className={cn(
                'rounded-md font-semibold text-xs border-0',
                isHigh ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400' : 'bg-amber-500/10 text-amber-700 dark:text-amber-400'
              )}
            >
              {item.scoreLabel}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'savedDate',
        id: 'savedDate',
        header: ({ column }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="h-8 p-0 font-semibold hover:bg-transparent text-xs sm:text-sm text-foreground"
          >
            <span>تاريخ الحفظ</span>
            <ArrowUpDown className="ms-1.5 size-3.5 text-muted-foreground" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">
            {row.original.savedDate}
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="text-left font-semibold text-xs sm:text-sm">الإجراءات</div>,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center justify-end gap-1.5">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => handleOpenItem(item)}
                className="h-8 gap-1 px-2.5 text-xs font-medium"
              >
                <ExternalLink className="size-3.5" />
                فتح الصفحة
              </Button>
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/share/${item.id}`);
                  setCopiedItemId(item.id);
                  setTimeout(() => setCopiedItemId(null), 2000);
                }}
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                title="مشاركة"
              >
                <Share2 className="size-3.5" />
              </Button>
              {copiedItemId === item.id ? (
                <span className="text-[11px] font-semibold text-emerald-600">تم النسخ</span>
              ) : null}
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveItem(item);
                }}
                className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                title="حذف من المحفوظات"
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [copiedItemId]
  );

  const paginationState = useMemo(() => ({ pageIndex, pageSize }), [pageIndex, pageSize]);

  // TanStack Table Instance
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
      pagination: paginationState,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div dir="rtl" className="min-h-screen bg-background text-right text-foreground py-6 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6">

        {/* Page Header Area */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
          </div>
          <h1 className="text-2xl font-bold tracking-tight">سجل المحفوظات الشامل</h1>
          <p className="text-sm text-muted-foreground">
            تصفح واستكشف جميع العناصر والمشاريع التي قمت بحفظها مقسمة بحسب الصفحة المصدر.
          </p>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="flex flex-col gap-4 rounded-xl bg-card p-4 shadow-xs">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            {/* Source Page Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {(Object.keys(SOURCE_PAGES_META) as SourcePageId[]).map((pageId) => {
                const meta = SOURCE_PAGES_META[pageId];
                const Icon = meta.icon;
                const isActive = selectedSourcePage === pageId;
                const count = sourceCounts[pageId];
                return (
                  <Button
                    key={pageId}
                    size="sm"
                    variant={isActive ? 'default' : 'ghost'}
                    onClick={() => setSelectedSourcePage(pageId)}
                    className={cn(
                      'h-8 text-xs font-medium gap-1.5 rounded-lg transition-colors',
                      !isActive && 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Icon className="size-3.5" />
                    <span>{meta.label}</span>
                    <Badge variant="secondary" className="ms-1 rounded-md px-1.5 py-0 text-[10px]">
                      {count}
                    </Badge>
                  </Button>
                );
              })}
            </div>

            {/* Global Search Bar */}
            <div className="relative w-full lg:w-80">
              <FolderSearch className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="البحث بالاسم أو القطاع..."
                className="h-9 pr-9 text-xs text-right rounded-lg bg-muted/30 border-0 focus-visible:ring-1"
              />
            </div>
          </div>
        </div>

        {/* Clean TanStack Table Surface */}
        <div className="rounded-xl bg-card shadow-xs overflow-hidden">
          {table.getRowModel().rows.length === 0 ? (
            <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 p-8 text-center">
              <div className="rounded-full bg-muted/50 p-3">
                <Bookmark className="size-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold">لا توجد عناصر محفوظة حالياً</h3>
                <p className="text-xs text-muted-foreground">
                  عندما تقوم بحفظ مشاريع أو فرص استثمارية من التطبيق ستظهر فوراً هنا.
                </p>
              </div>
              <Button size="sm" variant="outline" onClick={() => setActiveTab('problem-engine')}>
                استكشاف المشاكل والفرص
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table dir="rtl" className="w-full min-w-[900px]">
                <TableHeader className="bg-muted/40">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="hover:bg-transparent border-b border-border/40">
                      {headerGroup.headers.map((header) => {
                        let widthClass = '';
                        if (header.id === 'title') widthClass = 'w-[240px] max-w-[260px] min-w-[200px]';
                        if (header.id === 'actions') widthClass = 'w-[140px] text-left';
                        return (
                          <TableHead key={header.id} className={cn("h-10 text-right font-semibold text-xs text-muted-foreground", widthClass)}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="divide-y divide-border/30">
                  {table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                      {row.getVisibleCells().map((cell) => {
                        let widthClass = '';
                        if (cell.column.id === 'title') widthClass = 'w-[240px] max-w-[260px] min-w-[200px]';
                        if (cell.column.id === 'actions') widthClass = 'w-[140px]';
                        return (
                          <TableCell key={cell.id} className={cn("py-3 text-sm", widthClass)}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Table Pagination Footer */}
          {table.getRowModel().rows.length > 0 && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-5 py-3 text-xs text-muted-foreground bg-muted/10 border-t border-border/30">
              <div className="flex items-center gap-1.5">
                <span>عرض العناصر</span>
                <span className="font-semibold text-foreground">
                  {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                </span>
                <span>إلى</span>
                <span className="font-semibold text-foreground">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length
                  )}
                </span>
                <span>من إجمالي</span>
                <span className="font-semibold text-foreground">{table.getFilteredRowModel().rows.length}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span>الصفوف لكل صفحة:</span>
                  <Select
                    value={String(table.getState().pagination.pageSize)}
                    onValueChange={(val) => table.setPageSize(Number(val))}
                  >
                    <SelectTrigger className="h-7 w-16 text-xs bg-transparent">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 20, 50].map((size) => (
                        <SelectItem key={size} value={String(size)}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="h-7 w-7"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                  <span className="px-2 font-medium text-foreground">
                    صفحة {table.getState().pagination.pageIndex + 1} من {table.getPageCount()}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="h-7 w-7"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SavedMarketItems;
