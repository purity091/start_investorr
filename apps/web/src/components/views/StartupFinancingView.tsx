'use client';

import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  flexRender,
  SortingState,
} from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { VENTURE_FIRMS, VentureFirm } from '@/data/startupFinancingFirms';
import {
  Building2,
  Search,
  ExternalLink,
  Filter,
  RotateCcw,
  Sparkles,
  Globe2,
  TrendingUp,
  Coins,
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Copy,
  Check,
  Share2,
  Info,
  ShieldCheck,
  Landmark,
  Zap,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

// Category color mapping for types
const TYPE_CONFIG: Record<
  VentureFirm['typeCategory'],
  { label: string; bg: string; text: string; border: string }
> = {
  vc: { label: 'رأس مال جريء (VC)', bg: 'bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400', border: 'border-emerald-500/20' },
  accelerator: { label: 'مسرعة / حاضنة', bg: 'bg-purple-500/10', text: 'text-purple-700 dark:text-purple-400', border: 'border-purple-500/20' },
  angel: { label: 'مستثمرون ملائكيون', bg: 'bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400', border: 'border-amber-500/20' },
  cvc: { label: 'تمويل الشركات (CVC)', bg: 'bg-sky-500/10', text: 'text-sky-700 dark:text-sky-400', border: 'border-sky-500/20' },
  gov_dev: { label: 'بنك/تمويل حكومي', bg: 'bg-blue-500/10', text: 'text-blue-700 dark:text-blue-400', border: 'border-blue-500/20' },
  fund_of_funds: { label: 'صندوق الصناديق', bg: 'bg-indigo-500/10', text: 'text-indigo-700 dark:text-indigo-400', border: 'border-indigo-500/20' },
  investment: { label: 'منصة استثمارية', bg: 'bg-teal-500/10', text: 'text-teal-700 dark:text-teal-400', border: 'border-teal-500/20' },
};

const STAGE_LABELS: Record<string, string> = {
  pre_seed: 'ما قبل البذرة',
  seed: 'البذرة',
  series_a: 'الجولة A',
  series_b: 'الجولة B',
  growth: 'مرحلة النمو',
  sme: 'المشاريع الصغيرة',
};

export function StartupFinancingView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedTypeCategory, setSelectedTypeCategory] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedFirm, setSelectedFirm] = useState<VentureFirm | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract unique countries
  const countries = useMemo(() => {
    const list = Array.from(new Set(VENTURE_FIRMS.map((f) => f.countryAr)));
    return list.sort();
  }, []);

  // Filtered dataset
  const filteredData = useMemo(() => {
    return VENTURE_FIRMS.filter((firm) => {
      // Search term matching (nameAr, nameEn, sectors, country)
      const matchesSearch =
        !searchTerm.trim() ||
        firm.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        firm.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        firm.countryAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        firm.sectorsAr.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

      // Country filter
      const matchesCountry = selectedCountry === 'all' || firm.countryAr.includes(selectedCountry);

      // Type Category filter
      const matchesType = selectedTypeCategory === 'all' || firm.typeCategory === selectedTypeCategory;

      // Stage filter
      const matchesStage =
        selectedStage === 'all' || firm.stages.includes(selectedStage as any);

      return matchesSearch && matchesCountry && matchesType && matchesStage;
    });
  }, [searchTerm, selectedCountry, selectedTypeCategory, selectedStage]);

  // Copy website link handler
  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCountry('all');
    setSelectedTypeCategory('all');
    setSelectedStage('all');
  };

  const columns = useMemo<ColumnDef<VentureFirm>[]>(
    () => [
      {
        accessorKey: 'nameAr',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-1 font-bold text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>اسم الجهة / الصندوق</span>
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3.5" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronsUpDown className="size-3 text-muted-foreground opacity-60" />
            )}
          </button>
        ),
        cell: ({ row }) => {
          const firm = row.original;
          return (
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedFirm(firm)}
                  className="font-bold text-foreground text-xs truncate hover:underline hover:text-primary transition-colors text-right"
                >
                  {firm.nameAr}
                </button>
                {firm.featured && (
                  <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-0 text-[9px] py-0 px-1 font-bold shrink-0">
                    مميز
                  </Badge>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground font-medium block truncate">
                {firm.nameEn}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'countryAr',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-1 font-bold text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>الدولة</span>
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3.5" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronsUpDown className="size-3 text-muted-foreground opacity-60" />
            )}
          </button>
        ),
        cell: ({ row }) => (
          <button
            onClick={() => setSelectedCountry(row.original.countryAr)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:underline hover:text-primary transition-colors cursor-pointer text-right"
          >
            <span className="text-sm shrink-0">{row.original.flag}</span>
            <span>{row.original.countryAr}</span>
          </button>
        ),
      },
      {
        accessorKey: 'typeAr',
        header: ({ column }) => (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="flex items-center gap-1 font-bold text-[11px] uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>نوع الاستثمار</span>
            {column.getIsSorted() === 'asc' ? (
              <ChevronUp className="size-3.5" />
            ) : column.getIsSorted() === 'desc' ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronsUpDown className="size-3 text-muted-foreground opacity-60" />
            )}
          </button>
        ),
        cell: ({ row }) => {
          const cat = TYPE_CONFIG[row.original.typeCategory] || {
            label: row.original.typeAr,
            bg: 'bg-muted',
            text: 'text-foreground',
          };
          return (
            <span
              className={cn(
                'inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border-0',
                cat.bg,
                cat.text
              )}
            >
              {row.original.typeAr}
            </span>
          );
        },
      },
      {
        accessorKey: 'stageAr',
        header: () => <span className="font-bold text-[11px] uppercase tracking-wider text-muted-foreground">المرحلة الاستثمارية</span>,
        cell: ({ row }) => (
          <span className="text-[10px] font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded-md">
            {row.original.stageAr}
          </span>
        ),
      },
      {
        accessorKey: 'sectorsAr',
        header: () => <span className="font-bold text-[11px] uppercase tracking-wider text-muted-foreground">القطاعات والتركيز</span>,
        cell: ({ row }) => (
          <div className="flex flex-wrap gap-1 max-w-xs">
            {row.original.sectorsAr.slice(0, 3).map((sector, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-muted/50 text-muted-foreground px-1.5 py-0.5 rounded-md"
              >
                {sector}
              </span>
            ))}
            {row.original.sectorsAr.length > 3 && (
              <span className="text-[9px] font-bold text-muted-foreground self-center">
                +{row.original.sectorsAr.length - 3}
              </span>
            )}
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 15 } },
  });

  return (
    <div dir="rtl" className="w-full flex-1 flex flex-col min-h-screen bg-background p-3 sm:p-6 gap-4 sm:gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="size-9 sm:size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 shadow-2xs">
            <Building2 className="size-4 sm:size-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-base sm:text-xl font-extrabold text-foreground tracking-tight">
                دليل تمويل الشركات الناشئة في الشرق الأوسط
              </h1>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5 leading-relaxed">
              قاعدة بيانات شاملة لشركات رأس المال الجريء (VC)، المسرعات، المستثمرين الملائكيين وصناديق التمويل الحكومية
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        <Card className="shadow-2xs border-0 bg-card">
          <CardContent className="p-2.5 sm:p-3.5 flex items-center gap-2 sm:gap-3">
            <div className="size-8 sm:size-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
              <Coins className="size-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-medium truncate">إجمالي الجهات</p>
              <p className="text-xs sm:text-base font-bold text-foreground tabular-nums truncate">
                {VENTURE_FIRMS.length} جهة
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xs border-0 bg-card">
          <CardContent className="p-2.5 sm:p-3.5 flex items-center gap-2 sm:gap-3">
            <div className="size-8 sm:size-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
              <Globe2 className="size-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-medium truncate">التغطية الجغرافية</p>
              <p className="text-xs sm:text-base font-bold text-foreground tabular-nums truncate">
                {countries.length} دولة عربية
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xs border-0 bg-card">
          <CardContent className="p-2.5 sm:p-3.5 flex items-center gap-2 sm:gap-3">
            <div className="size-8 sm:size-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
              <Sparkles className="size-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-medium truncate">الجهات الموصى بها</p>
              <p className="text-xs sm:text-base font-bold text-foreground tabular-nums truncate">
                {VENTURE_FIRMS.filter((f) => f.featured).length} صندوق مميز
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-2xs border-0 bg-card">
          <CardContent className="p-2.5 sm:p-3.5 flex items-center gap-2 sm:gap-3">
            <div className="size-8 sm:size-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
              <TrendingUp className="size-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] text-muted-foreground font-medium truncate">مراحل الاستثمار</p>
              <p className="text-xs sm:text-base font-bold text-foreground tabular-nums truncate">
                Pre-Seed إلى Growth
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-2xs border-0 bg-card">
        <CardContent className="p-2.5 sm:p-3.5 flex flex-col gap-2.5 sm:gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-2.5">
            <div className="relative lg:col-span-2">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                placeholder="ابحث باسم الصندوق، الدولة، أو القطاع (Fintech, SaaS)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pe-9 ps-3 text-xs h-8 sm:h-9 border-0 bg-muted/50 focus:bg-background transition-colors w-full"
              />
            </div>

            <div>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full h-8 sm:h-9 rounded-lg text-xs font-medium px-2.5 border-0 bg-muted/50 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="all">كافة الدول ({VENTURE_FIRMS.length})</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedTypeCategory}
                onChange={(e) => setSelectedTypeCategory(e.target.value)}
                className="w-full h-8 sm:h-9 rounded-lg text-xs font-medium px-2.5 border-0 bg-muted/50 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="all">جميع أنواع التمويل</option>
                <option value="vc">رأس مال جريء (VC)</option>
                <option value="accelerator">مسرعات وحاضنات أعمال</option>
                <option value="angel">مستثمرون ملائكيون</option>
                <option value="cvc">تمويل الشركات (CVC)</option>
                <option value="gov_dev">بنوك وتمويل حكومي</option>
                <option value="fund_of_funds">صندوق الصناديق</option>
                <option value="investment">منصات استثمار سيادية</option>
              </select>
            </div>

            <div>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full h-8 sm:h-9 rounded-lg text-xs font-medium px-2.5 border-0 bg-muted/50 text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="all">كافة مراحل الاستثمار</option>
                <option value="pre_seed">ما قبل البذرة (Pre-Seed)</option>
                <option value="seed">مرحلة البذرة (Seed)</option>
                <option value="series_a">الجولة (Series A)</option>
                <option value="series_b">الجولة (Series B)</option>
                <option value="growth">مرحلة النمو (Growth)</option>
                <option value="sme">المشاريع الصغيرة والمتوسطة</option>
              </select>
            </div>
          </div>

          {(searchTerm ||
            selectedCountry !== 'all' ||
            selectedTypeCategory !== 'all' ||
            selectedStage !== 'all') && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-muted/60 text-xs">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-muted-foreground font-medium text-[11px]">الفلاتر النشطة:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="text-[10px]">بحث: {searchTerm}</Badge>
                )}
                {selectedCountry !== 'all' && (
                  <Badge variant="secondary" className="text-[10px]">الدولة: {selectedCountry}</Badge>
                )}
                {selectedTypeCategory !== 'all' && (
                  <Badge variant="secondary" className="text-[10px]">النوع: {TYPE_CONFIG[selectedTypeCategory as keyof typeof TYPE_CONFIG]?.label}</Badge>
                )}
                {selectedStage !== 'all' && (
                  <Badge variant="secondary" className="text-[10px]">المرحلة: {STAGE_LABELS[selectedStage]}</Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="text-[11px] text-rose-500 hover:text-rose-600 gap-1 h-6 px-2 self-start sm:self-auto"
              >
                <RotateCcw className="size-3" />
                <span>إعادة ضبط</span>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {filteredData.length === 0 ? (
        <Card className="shadow-2xs border-0 bg-card p-6 sm:p-10 text-center flex flex-col items-center justify-center gap-2.5">
          <div className="size-10 rounded-xl bg-muted flex items-center justify-center">
            <Search className="size-5 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-bold text-foreground">لم يتم العثور على نتائج</h3>
          <p className="text-[11px] text-muted-foreground max-w-sm">
            جرّب تغيير عبارة البحث أو تخفيف الفلاتر المحددة لعرض المزيد من صناديق الاستثمار.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetFilters}
            className="mt-1 text-xs font-bold gap-1.5 h-8"
          >
            <RotateCcw className="size-3" />
            <span>عرض جميع الجهات</span>
          </Button>
        </Card>
      ) : (
        <Card className="border-0 shadow-none bg-card/60 rounded-2xl overflow-hidden p-1 sm:p-2">
          <div className="relative w-full overflow-x-auto touch-pan-x">
            <Table dir="rtl" containerClassName="border-0 shadow-none rounded-none bg-transparent" className="min-w-[720px]">
              <TableHeader className="bg-muted/30 rounded-xl">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-0 hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="h-9 py-2 px-3 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-0">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows.map((row, idx) => (
                  <TableRow
                    key={row.id}
                    className={cn(
                      "border-0 transition-colors hover:bg-muted/50",
                      idx % 2 === 0 ? "bg-transparent" : "bg-muted/20"
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2.5 px-3 text-xs border-0">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between p-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-[11px]">عرض {filteredData.length} جهة تمويلية</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="h-7 text-xs font-bold px-2.5 border-0 hover:bg-muted/80"
              >
                السابق
              </Button>
              <span className="font-semibold text-foreground tabular-nums">
                صفحة {table.getState().pagination.pageIndex + 1} من {table.getPageCount()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="h-8 text-xs font-bold px-3 border-0 bg-muted/50"
              >
                التالي
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Detail Dialog Modal */}
      <Dialog open={!!selectedFirm} onOpenChange={() => setSelectedFirm(null)}>
        {selectedFirm && (
          <DialogContent dir="rtl" className="max-w-[92vw] sm:max-w-lg max-h-[90vh] overflow-y-auto border-0 bg-card shadow-lg p-4 sm:p-6">
            <DialogHeader className="pb-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedFirm.flag}</span>
                <div>
                  <DialogTitle className="text-lg font-black text-foreground">
                    {selectedFirm.nameAr}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-muted-foreground">
                    {selectedFirm.nameEn}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-2 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-muted/50">
                <div>
                  <span className="text-muted-foreground block text-[11px]">الدولة:</span>
                  <span className="font-bold text-foreground text-sm">{selectedFirm.countryAr}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">نوع التمويل:</span>
                  <span className="font-bold text-foreground text-sm">{selectedFirm.typeAr}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-muted-foreground block text-[11px]">المرحلة الاستثمارية:</span>
                  <span className="font-bold text-foreground text-sm">{selectedFirm.stageAr}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-1.5 text-xs">القطاعات والمجالات المستهدفة:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFirm.sectorsAr.map((s, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs font-semibold py-1 px-2.5">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                <div className="min-w-0">
                  <span className="text-[11px] text-muted-foreground block">رابط الموقع الرسمي:</span>
                  <span className="font-mono text-xs text-primary font-bold truncate block">
                    {selectedFirm.websiteUrl}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopyLink(selectedFirm.websiteUrl, selectedFirm.id)}
                  className="shrink-0 text-xs font-bold gap-1"
                >
                  {copiedId === selectedFirm.id ? (
                    <>
                      <Check className="size-3.5 text-emerald-500" />
                      <span className="text-emerald-500">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      <span>نسخ</span>
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <a
                  href={selectedFirm.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-colors shadow-2xs"
                >
                  <span>زيارة الموقع الرسمي للجهة</span>
                  <ExternalLink className="size-4" />
                </a>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
