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
import { ArrowUpDown, ChevronDown, ChevronLeft, ChevronRight, ExternalLink, Search, BarChart3, Users, Globe, Building2 } from 'lucide-react';
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

interface ProvenProjectsTableProps {
  data: any[];
  onRowClick: (project: any) => void;
}

// Custom sorting function for revenue strings like "$250K /mo"
const parseRevenue = (val: string) => {
  if (!val) return 0;
  const clean = val.replace(/[^0-9.KkMm]/g, '');
  let num = parseFloat(clean);
  if (clean.toLowerCase().includes('k')) num *= 1000;
  if (clean.toLowerCase().includes('m')) num *= 1000000;
  return isNaN(num) ? 0 : num;
};

// Custom sorting function for traffic strings like "60K /mo"
const parseTraffic = (val: string) => {
  if (!val) return 0;
  const clean = val.replace(/[^0-9.KkMm]/g, '');
  let num = parseFloat(clean);
  if (clean.toLowerCase().includes('k')) num *= 1000;
  if (clean.toLowerCase().includes('m')) num *= 1000000;
  return isNaN(num) ? 0 : num;
};

// Helper for Country and Flags
const getCountryInfo = (location: string) => {
  if (!location) return { name: 'عالمي', flag: '🌍' };
  const loc = location.toLowerCase();
  if (loc.includes('florida') || loc.includes('atlanta') || loc.includes('united states') || loc.includes('usa') || loc.includes('california')) return { name: 'الولايات المتحدة', flag: '🇺🇸' };
  if (loc.includes('singapore')) return { name: 'سنغافورة', flag: '🇸🇬' };
  if (loc.includes('uk') || loc.includes('london')) return { name: 'المملكة المتحدة', flag: '🇬🇧' };
  if (loc.includes('canada')) return { name: 'كندا', flag: '🇨🇦' };
  if (loc.includes('السعودية') || loc.includes('saudi arabia') || loc.includes('مكة')) return { name: 'المملكة العربية السعودية', flag: '🇸🇦' };
  return { name: 'عالمي', flag: '🌍' }; // Default for 'not stated' or remote
};

export const ProvenProjectsTable: React.FC<ProvenProjectsTableProps> = ({ data, onRowClick }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'المشروع',
        cell: ({ row }) => {
          const project = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 rounded-xl bg-blue-600/10 text-blue-700 text-lg font-serif font-black shadow-sm shrink-0 border border-blue-600/20">
                {project.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-slate-900 truncate">{project.name}</span>
                <span className="text-[11px] font-medium text-slate-500 truncate max-w-[200px]" title={project.headline}>
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
        cell: ({ row }) => (
          <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 font-bold px-2.5 py-0.5 text-[11px]">
            {row.original.category.split('/')[0].trim()}
          </Badge>
        ),
      },
      {
        accessorFn: (row) => getCountryInfo(row.company?.location).name,
        id: 'country',
        header: 'الدولة',
        cell: ({ row }) => {
          const locInfo = getCountryInfo(row.original.company?.location);
          return (
            <div className="flex items-center gap-2 pr-2">
              <span className="text-xl" title={locInfo.name}>{locInfo.flag}</span>
              <span className="text-[13px] font-bold text-slate-700">{locInfo.name}</span>
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.directory_snapshot?.monthly_revenue,
        id: 'revenue',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="-ml-4 h-8 data-[state=open]:bg-accent px-3 hover:bg-slate-100 font-bold text-xs"
            >
              الدخل الشهري
              <ArrowUpDown className="ml-2 size-3.5 text-slate-400" />
            </Button>
          );
        },
        sortingFn: (rowA, rowB, columnId) => {
          const a = parseRevenue(rowA.getValue(columnId) as string);
          const b = parseRevenue(rowB.getValue(columnId) as string);
          return a > b ? 1 : a < b ? -1 : 0;
        },
        cell: ({ row }) => {
          const val = row.getValue('revenue') as string;
          const display = val ? val.split(' ')[0] : '-';
          return (
            <div className="flex flex-col justify-center pr-3">
              <span className="font-black text-[14px] text-slate-900 tracking-tight">{display}</span>
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.directory_snapshot?.monthly_traffic,
        id: 'traffic',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              className="-ml-4 h-8 data-[state=open]:bg-accent px-3 hover:bg-slate-100 font-bold text-xs"
            >
              الزيارات الشهرية
              <ArrowUpDown className="ml-2 size-3.5 text-slate-400" />
            </Button>
          );
        },
        sortingFn: (rowA, rowB, columnId) => {
          const a = parseTraffic(rowA.getValue(columnId) as string);
          const b = parseTraffic(rowB.getValue(columnId) as string);
          return a > b ? 1 : a < b ? -1 : 0;
        },
        cell: ({ row }) => {
          const val = row.getValue('traffic') as string;
          const display = val ? val.split(' ')[0] : '-';
          return (
            <div className="flex flex-col justify-center pr-3">
              <span className="font-bold text-[14px] text-slate-700">{display}</span>
            </div>
          );
        },
      },
      {
        accessorFn: (row) => row.company?.business_model,
        id: 'business_model',
        header: 'نموذج العمل',
        cell: ({ row }) => (
          <span className="text-[12px] font-medium text-slate-600 line-clamp-1 max-w-[150px]" title={row.getValue('business_model')}>
            {row.getValue('business_model') || '-'}
          </span>
        ),
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          return (
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation(); // prevent row click
                  onRowClick(row.original);
                }}
                className="h-8 text-xs font-bold border-slate-200 hover:bg-slate-50 text-slate-700"
              >
                عرض التفاصيل
                <ExternalLink className="mr-2 size-3.5 text-slate-400" />
              </Button>
            </div>
          );
        },
      },
    ],
    [onRowClick]
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
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="w-full flex flex-col gap-3 sm:gap-4">
      {/* Table Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              placeholder="ابحث عن شركة، مجال، أو تقنية..."
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="pl-3 pr-9 h-10 w-full bg-white border-slate-200 focus-visible:ring-blue-500 rounded-xl font-medium text-sm shadow-sm"
            />
          </div>
          
          <Select 
            value={(table.getColumn('country')?.getFilterValue() as string) ?? 'all'} 
            onValueChange={(val) => table.getColumn('country')?.setFilterValue(val === 'all' ? '' : val)}
          >
            <SelectTrigger className="h-10 w-full sm:w-[160px] bg-white border-slate-200 rounded-xl font-bold text-sm text-slate-700">
              <SelectValue placeholder="تصفية حسب الدولة" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200" dir="rtl">
              <SelectItem value="all" className="font-bold cursor-pointer">كل الدول</SelectItem>
              {Array.from(new Set(data.map(item => getCountryInfo(item.company?.location).name))).map(country => (
                <SelectItem key={country} value={country} className="font-bold cursor-pointer">{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <DropdownMenu>
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
                // Map internal column IDs to user-friendly labels
                let label = column.id;
                if (label === 'name') label = 'المشروع';
                if (label === 'category') label = 'التصنيف';
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

      {/* Table Container */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 border-b border-slate-200/80">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-none">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="h-10 sm:h-12 text-slate-500 font-bold text-[11px] sm:text-xs uppercase tracking-wider pr-3 sm:pr-4 whitespace-nowrap">
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
                  className="cursor-pointer hover:bg-blue-50/50 transition-colors border-b border-slate-100 group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2.5 sm:py-3 pr-3 sm:pr-4 align-middle">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-slate-500 font-medium"
                >
                  لا يوجد نتائج مطابقة للبحث.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between px-2 pt-2 gap-3 sm:gap-0">
        <div className="flex-1 text-xs sm:text-sm font-medium text-slate-500 text-center sm:text-right">
          عرض {table.getRowModel().rows.length} من أصل {table.getFilteredRowModel().rows.length} شركة
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-9 w-9 p-0 border-slate-200 rounded-lg shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center text-sm font-bold text-slate-700 min-w-[3rem]">
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
      </div>
    </div>
  );
};
