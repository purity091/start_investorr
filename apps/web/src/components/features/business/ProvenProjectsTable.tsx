import React, { useState, useMemo } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpDown, Bookmark, BookmarkCheck, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Search, X, ShieldCheck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ProvenProjectsTableProps {
  data: any[];
  onRowClick: (project: any) => void;
}

// Custom sorting helper for revenue strings like "$250K /mo", "$84.7M /mo", "$4.19B"
const parseRevenue = (val: string) => {
  if (!val || val.includes('مغلق')) return 0;
  
  const bMatch = val.match(/(\d+(?:\.\d+)?)\s*(?:B|b|\$B|B\$|مليار)/i);
  if (bMatch) return parseFloat(bMatch[1]) * 1000000000;

  const mMatch = val.match(/(\d+(?:\.\d+)?)\s*(?:M|m|\$M|M\$|مليون)/i);
  if (mMatch) return parseFloat(mMatch[1]) * 1000000;

  const kMatch = val.match(/(\d+(?:\.\d+)?)\s*(?:K|k|\$K|K\$|ألف)/i);
  if (kMatch) return parseFloat(kMatch[1]) * 1000;

  const clean = val.replace(/[^0-9.]/g, '');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
};

// Custom sorting helper for traffic strings like "60K /mo", "14M عميل", "105M زائر"
const parseTraffic = (val: string) => {
  if (!val || val.includes('غير')) return 0;

  const bMatch = val.match(/(\d+(?:\.\d+)?)\s*(?:B|b|مليار)/i);
  if (bMatch) return parseFloat(bMatch[1]) * 1000000000;

  const mMatch = val.match(/(\d+(?:\.\d+)?)\s*(?:M|m|مليون)/i);
  if (mMatch) return parseFloat(mMatch[1]) * 1000000;

  const kMatch = val.match(/(\d+(?:\.\d+)?)\s*(?:K|k|ألف)/i);
  if (kMatch) return parseFloat(kMatch[1]) * 1000;

  const clean = val.replace(/[^0-9.]/g, '');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
};

// Helper to format compact revenue display ($250K, $84.7M, $4.19B)
const formatCompactRevenue = (num: number) => {
  if (!num || num <= 0) return '-';
  if (num >= 1000000000) {
    const formatted = (num / 1000000000).toFixed(2).replace(/\.00$/, '');
    return `$${formatted}B`;
  }
  if (num >= 1000000) {
    const formatted = (num / 1000000).toFixed(1).replace(/\.0$/, '');
    return `$${formatted}M`;
  }
  if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1).replace(/\.0$/, '');
    return `$${formatted}K`;
  }
  return `$${num}`;
};

// Helper to format compact traffic display (60K, 1.2M, 105M)
const formatCompactTraffic = (num: number) => {
  if (!num || num <= 0) return '-';
  if (num >= 1000000000) {
    const formatted = (num / 1000000000).toFixed(1).replace(/\.0$/, '');
    return `${formatted}B`;
  }
  if (num >= 1000000) {
    const formatted = (num / 1000000).toFixed(1).replace(/\.0$/, '');
    return `${formatted}M`;
  }
  if (num >= 1000) {
    const formatted = (num / 1000).toFixed(1).replace(/\.0$/, '');
    return `${formatted}K`;
  }
  return `${num}`;
};

// Helper for Country and Flags
const getCountryInfo = (location: string) => {
  if (!location) return { name: 'عالمي', flag: '🌍' };
  const loc = location.toLowerCase();

  if (loc.includes('السعودية') || loc.includes('saudi') || loc.includes('مكة') || loc.includes('الرياض') || loc.includes('جدة')) {
    return { name: 'المملكة العربية السعودية', flag: '🇸🇦' };
  }
  if (loc.includes('مصر') || loc.includes('القاهرة') || loc.includes('النوبارية') || loc.includes('البحيرة') || loc.includes('قنا') || loc.includes('egypt')) {
    return { name: 'مصر', flag: '🇪🇬' };
  }
  if (loc.includes('الإمارات') || loc.includes('دبي') || loc.includes('أبوظبي') || loc.includes('uae') || loc.includes('dubai')) {
    return { name: 'الإمارات العربية المتحدة', flag: '🇦🇪' };
  }
  if (loc.includes('الأردن') || loc.includes('عمّان') || loc.includes('عمان') || loc.includes('jordan')) {
    return { name: 'الأردن', flag: '🇯🇴' };
  }
  if (loc.includes('الكويت') || loc.includes('kuwait')) {
    return { name: 'الكويت', flag: '🇰🇼' };
  }
  if (loc.includes('قطر') || loc.includes('الدوحة') || loc.includes('qatar')) {
    return { name: 'قطر', flag: '🇶🇦' };
  }
  if (loc.includes('البحرين') || loc.includes('المنامة') || loc.includes('bahrain')) {
    return { name: 'البحرين', flag: '🇧🇭' };
  }
  if (loc.includes('المغرب') || loc.includes('الدار البيضاء') || loc.includes('morocco')) {
    return { name: 'المغرب', flag: '🇲🇦' };
  }
  if (loc.includes('الجزائر') || loc.includes('algeria')) {
    return { name: 'الجزائر', flag: '🇩🇿' };
  }
  if (loc.includes('لبنان') || loc.includes('بيروت') || loc.includes('lebanon')) {
    return { name: 'لبنان', flag: '🇱🇧' };
  }
  if (
    loc.includes('florida') || loc.includes('atlanta') || loc.includes('united states') || loc.includes('usa') ||
    loc.includes('california') || loc.includes('نيويورك') || loc.includes('سان فرانسيسكو') || loc.includes('مينلو بارك') ||
    loc.includes('بيتسبرغ') || loc.includes('لوس أنجلوس') || loc.includes('لوس جاتوس') || loc.includes('لوس غاتوس') ||
    loc.includes('جورجيا') || loc.includes('أورلاندو') || loc.includes('san francisco') || loc.includes('new york') || loc.includes('us')
  ) {
    return { name: 'الولايات المتحدة', flag: '🇺🇸' };
  }
  if (loc.includes('uk') || loc.includes('london') || loc.includes('المملكة المتحدة') || loc.includes('بريطانيا')) {
    return { name: 'المملكة المتحدة', flag: '🇬🇧' };
  }
  if (loc.includes('canada') || loc.includes('أوتاوا') || loc.includes('كندا')) {
    return { name: 'كندا', flag: '🇨🇦' };
  }
  if (loc.includes('singapore') || loc.includes('سنغافورة')) {
    return { name: 'سنغافورة', flag: '🇸🇬' };
  }
  if (loc.includes('فرنسا') || loc.includes('france') || loc.includes('باريس')) {
    return { name: 'فرنسا', flag: '🇫🇷' };
  }
  if (loc.includes('السويد') || loc.includes('ستوكهولم') || loc.includes('sweden')) {
    return { name: 'السويد', flag: '🇸🇪' };
  }
  if (loc.includes('أستراليا') || loc.includes('سيدني') || loc.includes('australia')) {
    return { name: 'أستراليا', flag: '🇦🇺' };
  }
  if (loc.includes('أوكرانيا') || loc.includes('ukraine')) {
    return { name: 'أوكرانيا', flag: '🇺🇦' };
  }
  if (loc.includes('غير مذكور') || loc.includes('غير مؤكد') || loc.includes('غير متاح')) {
    return { name: 'غير محدد', flag: '🌐' };
  }

  return { name: 'عالمي', flag: '🌍' };
};

export const ProvenProjectsTable: React.FC<ProvenProjectsTableProps> = ({ data, onRowClick }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [savedProjects, setSavedProjects] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem('saved_proven_projects') || '{}');
    } catch {
      return {};
    }
  });

  // Extract unique main categories for dropdown filter
  const uniqueCategories = useMemo(() => {
    const set = new Set<string>();
    data.forEach((item) => {
      if (item.category) {
        const mainCat = item.category.split('/')[0].trim();
        if (mainCat) set.add(mainCat);
      }
    });
    return Array.from(set).sort();
  }, [data]);

  // Extract unique business models for dropdown filter
  const uniqueBusinessModels = useMemo(() => {
    const set = new Set<string>();
    data.forEach((item) => {
      const bmStr = item.company?.business_model || '';
      if (bmStr) {
        const parts = bmStr.split(/[,/&]+/);
        parts.forEach((p: string) => {
          const trimmed = p.trim();
          if (trimmed) set.add(trimmed);
        });
      }
    });
    return Array.from(set).sort();
  }, [data]);

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        id: 'save',
        header: () => (
          <span title="الحفظ" className="flex items-center justify-center">
            <Bookmark className="size-3.5 text-slate-400 mx-auto" />
          </span>
        ),
        size: 44,
        cell: ({ row }) => {
          const project = row.original;
          const key = project.id || project.slug || project.name;
          const isSaved = savedProjects[key];

          const toggleSave = (e: React.MouseEvent) => {
            e.stopPropagation();
            const nextSaved = !isSaved;
            setSavedProjects((prev) => {
              const updated = { ...prev, [key]: nextSaved };
              try {
                localStorage.setItem('saved_proven_projects', JSON.stringify(updated));
              } catch (err) {}
              return updated;
            });
          };

          return (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleSave}
              className={cn(
                "size-7 rounded-md transition-colors mx-auto flex items-center justify-center p-0",
                isSaved
                  ? "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                  : "text-slate-400 hover:text-indigo-600 hover:bg-slate-100"
              )}
              title={isSaved ? "إلغاء حفظ المشروع" : "حفظ المشروع"}
            >
              {isSaved ? (
                <BookmarkCheck className="size-3.5 text-indigo-600 fill-indigo-600/20" />
              ) : (
                <Bookmark className="size-3.5" />
              )}
            </Button>
          );
        },
      },
      {
        accessorKey: 'name',
        header: 'المشروع',
        cell: ({ row }) => {
          const project = row.original;
          const isVerified = Boolean(project.verification || project.evidence_map);

          return (
            <div className="flex items-center gap-2.5 max-w-[240px]">
              <div className="flex items-center justify-center size-8 rounded-lg bg-blue-600/10 text-blue-700 text-xs font-bold shadow-xs shrink-0 border border-blue-600/20">
                {project.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-slate-900 text-sm truncate flex items-center gap-1" title={project.name}>
                  {project.name}
                  {isVerified && (
                    <span title="شركة موثقة بمصادر رسمية وأدلة تفصيلية (Verified Primary Data)">
                      <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-medium text-slate-500 truncate max-w-[170px]" title={project.headline}>
                  {project.headline}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'category',
        header: 'التصنيف',
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) return true;
          const cat = (row.getValue(columnId) as string || '').toLowerCase();
          return cat.includes(filterValue.toLowerCase());
        },
        cell: ({ row, table }) => {
          const rawCat = row.original.category || '';
          const displayCat = rawCat.split('/')[0].trim();
          const currentFilter = table.getColumn('category')?.getFilterValue() as string;
          const isFiltered = currentFilter && currentFilter.toLowerCase() === displayCat.toLowerCase();

          return (
            <Badge
              variant="secondary"
              onClick={(e) => {
                e.stopPropagation();
                if (isFiltered) {
                  table.getColumn('category')?.setFilterValue('');
                } else {
                  table.getColumn('category')?.setFilterValue(displayCat);
                }
              }}
              className={cn(
                "cursor-pointer font-bold px-2.5 py-0.5 text-[11px] transition-all hover:scale-105 active:scale-95 select-none",
                isFiltered
                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-800 border-0"
              )}
              title="اضغط لتصفية المشاريع حسب هذا التصنيف"
            >
              {displayCat}
            </Badge>
          );
        },
      },
      {
        accessorKey: 'sourceStatus',
        id: 'sourceStatus',
        header: 'حالة الشركة',
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue || filterValue === 'all') return true;
          const status = row.original.sourceStatus || (row.original.directory_snapshot?.monthly_revenue?.includes('مغلق') ? 'failed' : 'proven');
          return status === filterValue;
        },
        cell: ({ row, table }) => {
          const status = row.original.sourceStatus || (row.original.directory_snapshot?.monthly_revenue?.includes('مغلق') ? 'failed' : 'proven');
          const isFailed = status === 'failed';
          const currentFilter = table.getColumn('sourceStatus')?.getFilterValue() as string;
          const isFiltered = currentFilter === status;

          return (
            <Badge
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                if (isFiltered) {
                  table.getColumn('sourceStatus')?.setFilterValue('');
                } else {
                  table.getColumn('sourceStatus')?.setFilterValue(status);
                }
              }}
              className={cn(
                "cursor-pointer font-bold text-[11px] px-2.5 py-0.5 border border-transparent transition-all hover:scale-105 active:scale-95 select-none",
                isFailed
                  ? "bg-red-50 text-red-700 hover:bg-red-100 ring-1 ring-inset ring-red-600/20"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 ring-1 ring-inset ring-emerald-600/20"
              )}
              title="اضغط لتصفية المشاريع حسب هذه الحالة"
            >
              {isFailed ? 'شركات فشلت' : 'ناجحة'}
            </Badge>
          );
        },
      },
      {
        accessorFn: (row) => getCountryInfo(row.company?.location).name,
        id: 'country',
        header: 'الدولة',
        cell: ({ row }) => {
          const locInfo = getCountryInfo(row.original.company?.location);
          return (
            <div className="flex items-center gap-2 pr-2">
              <span className="text-xl shrink-0" title={locInfo.name}>{locInfo.flag}</span>
              <span className="text-[12px] font-bold text-slate-700 truncate max-w-[110px]" title={locInfo.name}>{locInfo.name}</span>
            </div>
          );
        },
      },
      {
        accessorFn: (row) => parseRevenue(row.directory_snapshot?.monthly_revenue),
        id: 'revenue',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="-ml-2 h-8 data-[state=open]:bg-accent px-2 hover:bg-slate-100 font-bold text-xs"
            >
              الدخل الشهري
              <ArrowUpDown className="ml-1.5 size-3.5 text-slate-400" />
            </Button>
          );
        },
        sortingFn: 'basic',
        cell: ({ row }) => {
          const rawNum = row.getValue('revenue') as number;
          const fullText = row.original.directory_snapshot?.monthly_revenue || '';

          if (rawNum > 0) {
            return (
              <div className="flex flex-col justify-center" title={fullText}>
                <span className="font-black text-xs text-slate-900 tracking-tight text-right dir-ltr">
                  {formatCompactRevenue(rawNum)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium text-right dir-rtl">/شهرياً</span>
              </div>
            );
          }

          if (fullText.includes('مغلق') || fullText.includes('فشلت')) {
            return (
              <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 text-[10px] py-0 px-1.5 font-bold">
                مغلق
              </Badge>
            );
          }

          return (
            <span className="text-slate-400 text-xs font-medium truncate max-w-[100px] block" title={fullText}>
              غير معلن
            </span>
          );
        },
      },
      {
        accessorFn: (row) => parseTraffic(row.directory_snapshot?.monthly_traffic),
        id: 'traffic',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="-ml-2 h-8 data-[state=open]:bg-accent px-2 hover:bg-slate-100 font-bold text-xs"
            >
              الزيارات الشهرية
              <ArrowUpDown className="ml-1.5 size-3.5 text-slate-400" />
            </Button>
          );
        },
        sortingFn: 'basic',
        cell: ({ row }) => {
          const rawNum = row.getValue('traffic') as number;
          const fullText = row.original.directory_snapshot?.monthly_traffic || '';

          if (rawNum > 0) {
            return (
              <div className="flex flex-col justify-center" title={fullText}>
                <span className="font-bold text-xs text-slate-700 tracking-tight text-right dir-ltr">
                  {formatCompactTraffic(rawNum)}
                </span>
                <span className="text-[10px] text-slate-400 font-medium text-right dir-rtl">/شهرياً</span>
              </div>
            );
          }

          return (
            <span className="text-slate-400 text-xs font-medium truncate max-w-[100px] block" title={fullText}>
              غير معلن
            </span>
          );
        },
      },
      {
        accessorFn: (row) => row.company?.business_model,
        id: 'business_model',
        header: 'نموذج العمل',
        filterFn: (row, columnId, filterValue) => {
          if (!filterValue) return true;
          const bm = (row.getValue(columnId) as string || '').toLowerCase();
          return bm.includes(filterValue.toLowerCase());
        },
        cell: ({ row, table }) => {
          const bmStr = (row.getValue('business_model') as string) || '';
          if (!bmStr) return <span className="text-slate-400 text-[12px]">-</span>;

          const tags = bmStr.split(/[,/&]+/).map((t) => t.trim()).filter(Boolean);
          const currentFilter = (table.getColumn('business_model')?.getFilterValue() as string) || '';

          return (
            <div className="flex flex-wrap gap-1 max-w-[150px] whitespace-normal">
              {tags.map((tag, idx) => {
                const isFiltered = currentFilter && currentFilter.toLowerCase() === tag.toLowerCase();
                return (
                  <Badge
                    key={idx}
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isFiltered) {
                        table.getColumn('business_model')?.setFilterValue('');
                      } else {
                        table.getColumn('business_model')?.setFilterValue(tag);
                      }
                    }}
                    className={cn(
                      "cursor-pointer text-[10px] font-bold px-1.5 py-0.5 rounded-md transition-all hover:scale-105 active:scale-95 select-none whitespace-normal text-right leading-tight break-words",
                      isFiltered
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200"
                    )}
                    title={`اضغط لتصفية المشاريع حسب نموذج العمل "${tag}"`}
                  >
                    {tag}
                  </Badge>
                );
              })}
            </div>
          );
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onRowClick(row.original);
                }}
                className="size-8 rounded-lg border border-slate-200 bg-white hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-500 shadow-2xs transition-all active:scale-95"
                title="عرض تفاصيل المشروع"
              >
                <ExternalLink className="size-4" />
              </Button>
            </div>
          );
        },
      },
    ],
    [onRowClick, savedProjects]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;
      const searchTerm = filterValue.toLowerCase();
      const name = (row.original.name || '').toLowerCase();
      const headline = (row.original.headline || '').toLowerCase();
      const category = (row.original.category || '').toLowerCase();
      const location = (row.original.company?.location || '').toLowerCase();
      const bm = (row.original.company?.business_model || '').toLowerCase();

      return (
        name.includes(searchTerm) ||
        headline.includes(searchTerm) ||
        category.includes(searchTerm) ||
        location.includes(searchTerm) ||
        bm.includes(searchTerm)
      );
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const categoryFilterVal = (table.getColumn('category')?.getFilterValue() as string) || '';
  const countryFilterVal = (table.getColumn('country')?.getFilterValue() as string) || '';
  const bmFilterVal = (table.getColumn('business_model')?.getFilterValue() as string) || '';
  const statusFilterVal = (table.getColumn('sourceStatus')?.getFilterValue() as string) || '';
  const isAnyFilterActive = globalFilter || categoryFilterVal || countryFilterVal || bmFilterVal || statusFilterVal;

  const resetAllFilters = () => {
    setGlobalFilter('');
    table.getColumn('category')?.setFilterValue('');
    table.getColumn('country')?.setFilterValue('');
    table.getColumn('business_model')?.setFilterValue('');
    table.getColumn('sourceStatus')?.setFilterValue('');
  };

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-60">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="ابحث عن شركة، مجال..."
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-3 pr-9 h-10 w-full bg-white border-slate-200 focus-visible:ring-blue-500 rounded-xl font-medium text-sm shadow-sm"
            />
          </div>

          {/* Status Filter Dropdown */}
          <Select
            value={statusFilterVal || 'all'}
            onValueChange={(val) => table.getColumn('sourceStatus')?.setFilterValue(val === 'all' ? '' : val)}
          >
            <SelectTrigger className="h-10 w-full sm:w-[150px] bg-white border-slate-200 rounded-xl font-bold text-sm text-slate-700">
              <SelectValue placeholder="حالة الشركة" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200" dir="rtl">
              <SelectItem value="all" className="font-bold cursor-pointer">جميع الشركات</SelectItem>
              <SelectItem value="proven" className="font-bold cursor-pointer text-emerald-600">شركات ناجحة</SelectItem>
              <SelectItem value="failed" className="font-bold cursor-pointer text-red-600">شركات فشلت</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter Dropdown */}
          <Select
            value={categoryFilterVal || 'all'}
            onValueChange={(val) => table.getColumn('category')?.setFilterValue(val === 'all' ? '' : val)}
          >
            <SelectTrigger className="h-10 w-full sm:w-[150px] bg-white border-slate-200 rounded-xl font-bold text-sm text-slate-700">
              <SelectValue placeholder="التصنيف" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200" dir="rtl">
              <SelectItem value="all" className="font-bold cursor-pointer">كل التصنيفات</SelectItem>
              {uniqueCategories.map((cat) => (
                <SelectItem key={cat} value={cat} className="font-bold cursor-pointer">{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Business Model Filter Dropdown */}
          <Select
            value={bmFilterVal || 'all'}
            onValueChange={(val) => table.getColumn('business_model')?.setFilterValue(val === 'all' ? '' : val)}
          >
            <SelectTrigger className="h-10 w-full sm:w-[160px] bg-white border-slate-200 rounded-xl font-bold text-sm text-slate-700">
              <SelectValue placeholder="نموذج العمل" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200" dir="rtl">
              <SelectItem value="all" className="font-bold cursor-pointer">كل النماذج</SelectItem>
              {uniqueBusinessModels.map((bm) => (
                <SelectItem key={bm} value={bm} className="font-bold cursor-pointer">{bm}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Country Filter Dropdown */}
          <Select
            value={countryFilterVal || 'all'}
            onValueChange={(val) => table.getColumn('country')?.setFilterValue(val === 'all' ? '' : val)}
          >
            <SelectTrigger className="h-10 w-full sm:w-[140px] bg-white border-slate-200 rounded-xl font-bold text-sm text-slate-700">
              <SelectValue placeholder="الدولة" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200" dir="rtl">
              <SelectItem value="all" className="font-bold cursor-pointer">كل الدول</SelectItem>
              {Array.from(new Set(data.map(item => getCountryInfo(item.company?.location).name))).map(country => (
                <SelectItem key={country} value={country} className="font-bold cursor-pointer">{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Clear Filters Button */}
          {isAnyFilterActive && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetAllFilters}
              className="h-10 px-3 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl gap-1.5"
            >
              <X className="size-3.5" />
              إلغاء التصفية
            </Button>
          )}
        </div>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto h-10 font-bold border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 mt-1 sm:mt-0">
              الأعمدة
              <ChevronDown className="mr-auto sm:ml-2 sm:mr-0 size-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px] rounded-xl border-slate-200">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                let label = column.id;
                if (label === 'name') label = 'المشروع';
                if (label === 'category') label = 'التصنيف';
                if (label === 'sourceStatus') label = 'حالة الشركة';
                if (label === 'country') label = 'الدولة';
                if (label === 'revenue') label = 'الدخل الشهري';
                if (label === 'traffic') label = 'الزيارات الشهرية';
                if (label === 'business_model') label = 'نموذج العمل';

                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize font-medium text-sm cursor-pointer"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Active Filter Pills indicator if filtered */}
      {(categoryFilterVal || bmFilterVal || statusFilterVal || countryFilterVal) && (
        <div className="flex flex-wrap items-center gap-2 px-1">
          <span className="text-xs font-medium text-slate-500">الفلاتر المحددة:</span>
          {statusFilterVal && (
            <Badge className={cn(
              "font-bold gap-1 text-xs py-0.5 px-2.5 rounded-lg text-white",
              statusFilterVal === 'failed' ? "bg-red-600" : "bg-emerald-600"
            )}>
              الحالة: {statusFilterVal === 'failed' ? 'شركات فشلت' : 'شركات ناجحة'}
              <button
                onClick={() => table.getColumn('sourceStatus')?.setFilterValue('')}
                className="mr-1 hover:text-slate-200"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {categoryFilterVal && (
            <Badge className="bg-blue-600 text-white font-bold gap-1 text-xs py-0.5 px-2.5 rounded-lg">
              التصنيف: {categoryFilterVal}
              <button
                onClick={() => table.getColumn('category')?.setFilterValue('')}
                className="mr-1 hover:text-blue-200"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {bmFilterVal && (
            <Badge className="bg-indigo-600 text-white font-bold gap-1 text-xs py-0.5 px-2.5 rounded-lg">
              نموذج العمل: {bmFilterVal}
              <button
                onClick={() => table.getColumn('business_model')?.setFilterValue('')}
                className="mr-1 hover:text-indigo-200"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {countryFilterVal && (
            <Badge className="bg-emerald-700 text-white font-bold gap-1 text-xs py-0.5 px-2.5 rounded-lg">
              الدولة: {countryFilterVal}
              <button
                onClick={() => table.getColumn('country')?.setFilterValue('')}
                className="mr-1 hover:text-emerald-200"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      {/* Table Container */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 border-b border-slate-200/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                {headerGroup.headers.map((header) => {
                  let widthClass = '';
                  if (header.id === 'save') widthClass = 'w-[44px] min-w-[44px] max-w-[44px] text-center px-1';
                  if (header.id === 'name') widthClass = 'w-[240px] max-w-[260px] min-w-[200px]';
                  if (header.id === 'category') widthClass = 'w-[110px]';
                  if (header.id === 'sourceStatus') widthClass = 'w-[95px]';
                  if (header.id === 'country') widthClass = 'w-[100px]';
                  if (header.id === 'revenue') widthClass = 'w-[105px]';
                  if (header.id === 'traffic') widthClass = 'w-[105px]';
                  if (header.id === 'business_model') widthClass = 'max-w-[140px] w-[140px]';
                  if (header.id === 'actions') widthClass = 'w-[60px] text-left';

                  return (
                    <TableHead key={header.id} className={cn("h-9 text-slate-500 font-bold text-[11px] uppercase tracking-wider px-2 sm:px-3 whitespace-nowrap", widthClass)}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => onRowClick(row.original)}
                  className="cursor-pointer hover:bg-blue-50/50 transition-colors border-b border-slate-100/80 group"
                >
                  {row.getVisibleCells().map((cell) => {
                    let widthClass = '';
                    if (cell.column.id === 'save') widthClass = 'w-[44px] min-w-[44px] max-w-[44px] text-center px-1';
                    if (cell.column.id === 'name') widthClass = 'w-[240px] max-w-[260px] min-w-[200px]';
                    if (cell.column.id === 'category') widthClass = 'w-[110px]';
                    if (cell.column.id === 'sourceStatus') widthClass = 'w-[95px]';
                    if (cell.column.id === 'country') widthClass = 'w-[100px]';
                    if (cell.column.id === 'revenue') widthClass = 'w-[105px]';
                    if (cell.column.id === 'traffic') widthClass = 'w-[105px]';
                    if (cell.column.id === 'business_model') widthClass = 'max-w-[140px] w-[140px]';
                    if (cell.column.id === 'actions') widthClass = 'w-[60px]';

                    return (
                      <TableCell key={cell.id} className={cn("py-2 px-2 sm:px-3 align-middle text-xs", widthClass)}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-slate-500 font-medium"
                >
                  لا يوجد نتائج مطابقة للبحث أو التصفية الحالية.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-2 pt-4 gap-4">
        {/* Page Size Selector on the right side in RTL */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-start">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">عرض:</span>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(val) => {
              table.setPageSize(Number(val));
            }}
          >
            <SelectTrigger className="h-9 w-[115px] bg-white border-slate-200 rounded-xl font-bold text-xs text-slate-700 shadow-xs">
              <SelectValue placeholder="10 نتائج" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 min-w-[115px]" dir="rtl">
              <SelectItem value="10" className="font-bold cursor-pointer text-xs">10 نتائج</SelectItem>
              <SelectItem value="20" className="font-bold cursor-pointer text-xs">20 نتيجة</SelectItem>
              <SelectItem value="50" className="font-bold cursor-pointer text-xs">50 نتيجة</SelectItem>
              <SelectItem value="100" className="font-bold cursor-pointer text-xs">100 نتيجة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Centered Pagination Controls */}
        <div className="flex items-center justify-center space-x-2 space-x-reverse sm:flex-none">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-9 w-9 p-0 border-slate-200 rounded-lg shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center text-sm font-bold text-slate-700 min-w-[4rem]">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-9 w-9 p-0 border-slate-200 rounded-lg shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Info Text */}
        <div className="flex-1 text-xs sm:text-sm font-medium text-slate-500 text-center sm:text-left w-full sm:w-auto">
          عرض {table.getRowModel().rows.length} من أصل {table.getFilteredRowModel().rows.length} شركة
        </div>
      </div>
    </div>
  );
};
