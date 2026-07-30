import React from 'react';
import { Calendar, CheckCircle2, History, Package, Settings, ShieldCheck, Sparkles, Zap } from 'lucide-react';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';

interface UpdateItem {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  type: 'feature' | 'improvement' | 'security' | 'fix';
  points?: string[];
}

const UPDATES: UpdateItem[] = [
  {
    id: '1',
    version: 'v1.2.5',
    date: '04 ديسمبر 2025',
    title: 'تحسين تجربة واجهة المستخدم',
    description: 'إعادة تنظيم الواجهات لتكون أكثر وضوحاً واستجابة، مع تقليل العناصر المشتتة وتحسين قابلية القراءة.',
    type: 'improvement',
    points: ['تحديث نظام الألوان', 'تحسين استجابة الشاشات', 'تقليل الظلال والتدرجات الثقيلة'],
  },
  {
    id: '2',
    version: 'v1.2.0',
    date: '28 نوفمبر 2025',
    title: 'تحسين إعدادات الحساب',
    description: 'تجهيز تصور أوضح لإدارة الملف الشخصي، الأمان، الاشتراك، والفواتير من مكان واحد.',
    type: 'security',
  },
  {
    id: '3',
    version: 'v1.1.0',
    date: '15 نوفمبر 2025',
    title: 'توسيع أدوات بناء المشروع',
    description: 'إضافة مسارات أوضح لبناء دراسة جدوى، نموذج عمل BMC، واستكشاف السوق.',
    type: 'feature',
    points: ['بناء دراسة جدوى', 'رادار السوق', 'استوديو الهوية البصرية'],
  },
  {
    id: '4',
    version: 'v1.0.0',
    date: '01 نوفمبر 2025',
    title: 'إطلاق النسخة الأولى',
    description: 'النسخة الأولى المستقرة من منصة خطة لبناء ومراجعة مشاريع المستخدمين.',
    type: 'feature',
  },
];

export const Changelog: React.FC = () => {
  return (
    <div className="app-page-shell-wide space-y-6 py-6" dir="rtl">
      <section className="rounded-xl bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">سجل التحديثات</Badge>
              <Badge variant="outline">واجهة المنتج</Badge>
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                ما الذي تغير في المنصة؟
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                عرض واضح للتحديثات المهمة حتى يفهم المستخدم تطور المنتج وما تم تحسينه في الواجهات والتجربة.
              </p>
            </div>
          </div>
          <span className="flex size-11 items-center justify-center rounded-xl bg-muted">
            <History className="size-5 text-muted-foreground" />
          </span>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {UPDATES.map((update) => {
          const meta = getTypeMeta(update.type);
          const Icon = meta.icon;

          return (
            <Card key={update.id} className="border-transparent shadow-sm">
              <CardHeader className="p-4 sm:p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-4 text-muted-foreground" />
                    </span>
                    <Badge variant="outline">{meta.label}</Badge>
                    <Badge variant="secondary">{update.version}</Badge>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-4" />
                    {update.date}
                  </span>
                </div>
                <CardTitle>{update.title}</CardTitle>
                <CardDescription>{update.description}</CardDescription>
              </CardHeader>
              {update.points ? (
                <CardContent className="space-y-2 p-4 sm:p-5 pt-0 sm:pt-0">
                  {update.points.map((point) => (
                    <div key={point} className="flex items-center gap-2 rounded-lg bg-muted/45 px-4 py-3 text-sm text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      {point}
                    </div>
                  ))}
                </CardContent>
              ) : null}
            </Card>
          );
        })}
      </section>

      <section className="rounded-xl bg-card p-4 sm:p-5 text-center shadow-sm">
        <Package className="mx-auto mb-3 size-8 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">هل لديك اقتراح لتحسين الواجهة؟</h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-muted-foreground">
          هذه الصفحة واجهة فقط ويمكن ربط زر الاقتراح لاحقاً بنظام دعم أو نموذج ملاحظات.
        </p>
        <Button className="mt-5" variant="outline">إرسال اقتراح</Button>
      </section>
    </div>
  );
};

function getTypeMeta(type: UpdateItem['type']) {
  if (type === 'feature') return { label: 'ميزة جديدة', icon: Sparkles };
  if (type === 'security') return { label: 'تحديث أمان', icon: ShieldCheck };
  if (type === 'fix') return { label: 'إصلاح', icon: Settings };
  return { label: 'تحسين', icon: Zap };
}
