import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bookmark, BookmarkCheck, FolderSearch, Globe2, Lightbulb, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import {
  MARKET_PROBLEM_STORAGE_KEY,
  type SavedMarketRecord,
  loadSavedMarketItems,
  saveSavedMarketItems,
} from './problemDetailStorage';

const kindLabels: Record<SavedMarketRecord['kind'], string> = {
  problem: 'مشكلة',
  opportunity: 'فرصة',
};

const statusLabels: Record<SavedMarketRecord['status'], string> = {
  draft: 'تحتاج مراجعة',
  validated: 'قيد التحقق',
  priority: 'أولوية',
};

const priorityTone = (score: number) => {
  if (score >= 8) return 'border-emerald-200 bg-emerald-50 text-emerald-700';
  if (score >= 6) return 'border-amber-200 bg-amber-50 text-amber-700';
  return 'border-slate-200 bg-slate-50 text-slate-700';
};

interface SavedMarketItemsProps {
  setActiveTab: (tab: string) => void;
}

export const SavedMarketItems: React.FC<SavedMarketItemsProps> = ({ setActiveTab }) => {
  const [query, setQuery] = useState('');
  const [savedItems, setSavedItems] = useState<SavedMarketRecord[]>([]);

  useEffect(() => {
    setSavedItems(loadSavedMarketItems());
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return savedItems;

    return savedItems.filter(item =>
      [item.title, item.summary, item.sectorName, item.subSectorName, item.linkedTitle, ...item.countries]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, savedItems]);

  const handleRemove = (recordId: string) => {
    const next = savedItems.filter(item => item.id !== recordId);
    setSavedItems(next);
    saveSavedMarketItems(next);
  };

  const openItem = (item: SavedMarketRecord) => {
    if (item.kind === 'problem') {
      localStorage.setItem(MARKET_PROBLEM_STORAGE_KEY, JSON.stringify(item));
      setActiveTab('problem-detail');
      return;
    }

    setActiveTab('problem-engine');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-right text-foreground">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <Card className="border-border shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-md">المحفوظات</Badge>
                  <Badge variant="outline" className="rounded-md">Shadcn UI</Badge>
                </div>
                <h1 className="text-xl font-semibold">العناصر المحفوظة</h1>
                <p className="text-sm text-muted-foreground">
                  راجع المشاكل والفرص التي حفظتها من مساحة تحليل السوق وافتحها لاحقاً من مكان واحد.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                <div className="rounded-lg border bg-muted/30 px-3 py-2">
                  <div className="text-[11px] text-muted-foreground">إجمالي المحفوظ</div>
                  <div className="mt-1 text-sm font-semibold">{savedItems.length}</div>
                </div>
                <div className="rounded-lg border bg-muted/30 px-3 py-2">
                  <div className="text-[11px] text-muted-foreground">مشاكل</div>
                  <div className="mt-1 text-sm font-semibold">{savedItems.filter(item => item.kind === 'problem').length}</div>
                </div>
                <div className="rounded-lg border bg-muted/30 px-3 py-2">
                  <div className="text-[11px] text-muted-foreground">فرص</div>
                  <div className="mt-1 text-sm font-semibold">{savedItems.filter(item => item.kind === 'opportunity').length}</div>
                </div>
                <div className="rounded-lg border bg-muted/30 px-3 py-2">
                  <div className="text-[11px] text-muted-foreground">قطاعات</div>
                  <div className="mt-1 text-sm font-semibold">{new Set(savedItems.map(item => item.sectorName)).size}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <FolderSearch className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder="ابحث داخل العناصر المحفوظة"
                  className="h-10 pr-10 text-right"
                />
              </div>
              <Button type="button" variant="outline" onClick={() => setActiveTab('problem-engine')}>
                <ArrowRight className="size-4" />
                العودة إلى المشاكل والفرص
              </Button>
            </div>
          </CardContent>
        </Card>

        {filteredItems.length === 0 ? (
          <Card className="border-dashed shadow-sm">
            <CardContent className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-center">
              <div className="rounded-full border bg-muted/40 p-4">
                <Bookmark className="size-6 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">لا توجد عناصر محفوظة</h2>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                  احفظ المشاكل أو الفرص من الجدول لتظهر هنا في صفحة منظمة ومهيأة للمراجعة.
                </p>
              </div>
              <Button type="button" onClick={() => setActiveTab('problem-engine')}>
                فتح مساحة المشاكل والفرص
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">جدول المحفوظات</CardTitle>
              <CardDescription>عرض منظم للعناصر التي قررت متابعتها لاحقاً.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table dir="rtl" className="w-full min-w-[1180px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[240px]">العنوان</TableHead>
                      <TableHead className="w-[100px]">النوع</TableHead>
                      <TableHead className="w-[180px]">القطاع</TableHead>
                      <TableHead className="w-[180px]">العنصر المرتبط</TableHead>
                      <TableHead className="w-[120px]">الأولوية</TableHead>
                      <TableHead className="w-[220px]">الدول</TableHead>
                      <TableHead className="w-[120px]">الحالة</TableHead>
                      <TableHead className="w-[180px] text-left">الإجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map(item => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{item.title}</div>
                            <div className="line-clamp-1 text-xs text-muted-foreground">{item.summary}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-md">
                            {kindLabels[item.kind]}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.sectorName}</TableCell>
                        <TableCell>{item.linkedTitle}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`rounded-md ${priorityTone(item.priorityScore)}`}>
                            {item.priorityScore}/10
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.countries.slice(0, 2).map(country => (
                              <Badge key={country} variant="outline" className="rounded-md">
                                <Globe2 className="me-1 size-3" />
                                {country}
                              </Badge>
                            ))}
                            {item.countries.length > 2 ? (
                              <Badge variant="outline" className="rounded-md">+{item.countries.length - 2}</Badge>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-md">
                            {statusLabels[item.status]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button type="button" size="sm" variant="outline" onClick={() => openItem(item)}>
                              {item.kind === 'problem' ? <Lightbulb className="size-4" /> : <BookmarkCheck className="size-4" />}
                              {item.kind === 'problem' ? 'فتح الصفحة' : 'العودة للجدول'}
                            </Button>
                            <Button type="button" size="icon-sm" variant="ghost" onClick={() => handleRemove(item.id)}>
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SavedMarketItems;
