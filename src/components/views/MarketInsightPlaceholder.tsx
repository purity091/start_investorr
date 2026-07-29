import React from 'react';
import { ArrowRight, Compass, FileSearch, LayoutDashboard, Route } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

interface MarketInsightPlaceholderProps {
  title: string;
  category: string;
  summary: string;
  setActiveTab: (tab: string) => void;
}

const handoffItems = [
  { title: 'حالة الصفحة', value: 'واجهة انتقالية مرتبطة', icon: FileSearch },
  { title: 'الطبقة التالية', value: 'العودة إلى مكتبة القطاعات', icon: Compass },
  { title: 'هدف المستخدم', value: 'لا توجد صفحة يتيمة في الرحلة', icon: Route },
];

export const MarketInsightPlaceholder: React.FC<MarketInsightPlaceholderProps> = ({
  title,
  category,
  summary,
  setActiveTab,
}) => {
  return (
    <main className="app-page-shell-wide space-y-6 text-right" dir="rtl">
      <section className="rounded-xl bg-card p-4 sm:p-5 shadow-sm ring-1 ring-border/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <Badge variant="secondary" className="w-fit">{category}</Badge>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h1>
              <p className="text-sm leading-7 text-muted-foreground">{summary}</p>
            </div>
          </div>
          <Button onClick={() => setActiveTab('market-discovery')} className="w-full sm:w-fit">
            <ArrowRight className="size-4" />
            العودة لاستكشاف السوق
          </Button>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {handoffItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="shadow-sm">
              <CardContent className="flex items-start gap-3 p-3 sm:p-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                  <Icon className="size-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card className="shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3">
          <CardTitle>ماذا يمكن أن يفعل المستخدم الآن؟</CardTitle>
          <CardDescription>اختيارات واضحة حتى لا تنتهي رحلة المستخدم في صفحة انتقالية.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 sm:flex-row p-4 sm:p-6 pt-0 sm:pt-0">
          <Button onClick={() => setActiveTab('market-discovery')} variant="outline" className="sm:w-fit">
            <Compass className="size-4" />
            استكمال استكشاف السوق
          </Button>
          <Button onClick={() => setActiveTab('workspace')} variant="outline" className="sm:w-fit">
            <LayoutDashboard className="size-4" />
            الانتقال إلى مساحة المشروع
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};
