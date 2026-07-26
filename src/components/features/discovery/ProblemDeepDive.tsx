import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  BadgeAlert,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Compass,
  Globe2,
  Layers3,
  Lightbulb,
  Target,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/separator';

import { MARKET_PROBLEM_STORAGE_KEY, type SavedMarketRecord } from './problemDetailStorage';

const statusLabels: Record<SavedMarketRecord['status'], string> = {
  draft: 'تحتاج مراجعة',
  validated: 'قيد التحقق',
  priority: 'أولوية عالية',
};

const marketLabels: Record<SavedMarketRecord['marketBand'], string> = {
  small: 'صغير',
  medium: 'متوسط',
  large: 'كبير',
};

const easeLabels: Record<SavedMarketRecord['easeBand'], string> = {
  hard: 'صعب',
  moderate: 'متوسط',
  easy: 'سهل',
};

const profitLabels: Record<SavedMarketRecord['profitBand'], string> = {
  low: 'ضعيفة',
  medium: 'متوسطة',
  high: 'مرتفعة',
};

const competitionLabels: Record<SavedMarketRecord['competitionBand'], string> = {
  high: 'مرتفعة',
  medium: 'متوسطة',
  low: 'منخفضة',
};

const scoreTone = (score: number) => {
  if (score >= 8) return 'bg-emerald-50 text-emerald-700';
  if (score >= 6) return 'bg-amber-50 text-amber-700';
  return 'bg-slate-100 text-slate-700';
};

interface ProblemDeepDiveProps {
  onBack: () => void;
}

export const ProblemDeepDive: React.FC<ProblemDeepDiveProps> = ({ onBack }) => {
  const [record, setRecord] = useState<SavedMarketRecord | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MARKET_PROBLEM_STORAGE_KEY);
      if (!raw) {
        setRecord(null);
        return;
      }

      const parsed = JSON.parse(raw) as SavedMarketRecord;
      setRecord(parsed?.kind === 'problem' ? parsed : null);
    } catch {
      setRecord(null);
    }
  }, []);

  const summaryRows = useMemo(
    () =>
      record
        ? [
            { label: 'القطاع', value: record.sectorName, icon: Briefcase },
            { label: 'القطاع الفرعي', value: record.subSectorName, icon: Layers3 },
            { label: 'الشريحة المستهدفة', value: record.audience, icon: Target },
            { label: 'الدول المرتبطة', value: record.countries.join('، ') || 'غير محدد', icon: Globe2 },
          ]
        : [],
    [record],
  );

  const scoreCards = useMemo(
    () =>
      record
        ? [
            {
              label: 'أولوية المعالجة',
              value: `${record.priorityScore}/10`,
              helper: statusLabels[record.status],
              icon: BadgeAlert,
              tone: scoreTone(record.priorityScore),
            },
            {
              label: 'حجم السوق',
              value: marketLabels[record.marketBand],
              helper: `${record.marketScore}/10`,
              icon: BarChart3,
              tone: scoreTone(record.marketScore),
            },
            {
              label: 'سهولة التنفيذ',
              value: easeLabels[record.easeBand],
              helper: `${record.easeScore}/10`,
              icon: Compass,
              tone: scoreTone(record.easeScore),
            },
            {
              label: 'إمكانية الربح',
              value: profitLabels[record.profitBand],
              helper: `${record.profitScore}/10`,
              icon: CheckCircle2,
              tone: scoreTone(record.profitScore),
            },
          ]
        : [],
    [record],
  );

  if (!record) {
    return (
      <div dir="rtl" className="min-h-screen bg-background">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <Card className="shadow-sm">
            <CardContent className="flex min-h-[340px] flex-col items-center justify-center gap-4 text-center">
              <div className="rounded-full bg-muted/50 p-4">
                <AlertCircle className="size-6 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h1 className="text-xl font-semibold text-foreground">لا توجد مشكلة محددة حالياً</h1>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                  افتح أي مشكلة من جدول المشاكل والفرص ليتم عرض صفحتها التفصيلية هنا.
                </p>
              </div>
              <Button type="button" onClick={onBack}>
                <ArrowRight className="size-4" />
                العودة إلى صفحة المشاكل والفرص
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background text-right text-foreground">
      <div className="mx-auto flex w-full max-w-[1540px] flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button type="button" variant="outline" size="sm" onClick={onBack}>
            <ArrowRight className="size-4" />
            العودة إلى المشاكل والفرص
          </Button>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="rounded-md border-transparent bg-muted text-foreground">
              صفحة مشكلة مستقلة
            </Badge>
            <Badge variant="outline" className="rounded-md border-transparent bg-muted text-foreground">
              Shadcn UI
            </Badge>
            <Badge variant="outline" className="rounded-md border-transparent bg-muted text-foreground">
              تحليل تنفيذي
            </Badge>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent className="space-y-5 p-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="rounded-md border-transparent bg-rose-50 text-rose-700">
                مشكلة سوق
              </Badge>
              <Badge variant="outline" className="rounded-md border-transparent bg-muted text-foreground">
                {statusLabels[record.status]}
              </Badge>
              <Badge variant="outline" className="rounded-md border-transparent bg-muted text-foreground">
                آخر تحديث: {record.updatedLabel}
              </Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-2xl font-semibold leading-tight sm:text-3xl">{record.title}</h1>
              <p className="max-w-5xl text-sm leading-8 text-muted-foreground sm:text-base">{record.summary}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {scoreCards.map(card => {
                const Icon = card.icon;
                return (
                  <div key={card.label} className={`rounded-xl px-4 py-3 ${card.tone}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="text-xs font-medium">{card.label}</div>
                        <div className="text-lg font-semibold leading-none">{card.value}</div>
                      </div>
                      <Icon className="size-4" />
                    </div>
                    <div className="mt-2 text-xs opacity-90">{card.helper}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {summaryRows.map(row => {
            const Icon = row.icon;
            return (
              <Card key={row.label} className="shadow-sm">
                <CardContent className="space-y-3 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Icon className="size-4 text-muted-foreground" />
                    {row.label}
                  </div>
                  <div className="text-sm leading-7 text-muted-foreground">{row.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">تعريف المشكلة</CardTitle>
              <CardDescription>وصف مباشر لما يحدث فعلياً داخل السوق.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>{record.summary}</p>
              <div className="rounded-xl bg-muted/40 p-4">
                <div className="mb-2 text-sm font-medium text-foreground">لماذا تستحق هذه المشكلة اهتماماً؟</div>
                <p>
                  تم تصنيف هذه المشكلة ضمن سوق <span className="font-medium text-foreground">{marketLabels[record.marketBand]}</span> مع
                  أولوية <span className="font-medium text-foreground">{record.priorityScore}/10</span>، ما يعني أنها مناسبة
                  لبناء دراسة جدوى أو فرصة منتج أكثر نضجاً.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">الفرصة المرتبطة</CardTitle>
              <CardDescription>المسار الأقرب لتحويل المشكلة إلى عرض قيمة قابل للبناء.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl bg-background p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Lightbulb className="size-4 text-amber-500" />
                  {record.linkedTitle}
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{record.model}</p>
              </div>
              <div className="rounded-xl bg-muted/40 p-4 text-sm leading-7 text-muted-foreground">
                المسار المقترح هنا ليس خطة تنفيذ نهائية، بل إطار واجهي واضح يساعد المطور أو محلل الأعمال لاحقاً على فهم
                اتجاه الحل المتوقع.
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">قراءة تنفيذية سريعة</CardTitle>
            <CardDescription>ملخص منظم يصلح لتسليم الفكرة إلى المصمم أو المبرمج أو محلل الأعمال.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl bg-muted/30 p-4">
                <div className="mb-2 text-sm font-medium text-foreground">من المتأثر؟</div>
                <p className="text-sm leading-7 text-muted-foreground">{record.audience}</p>
              </div>
              <div className="rounded-xl bg-muted/30 p-4">
                <div className="mb-2 text-sm font-medium text-foreground">مستوى المنافسة</div>
                <p className="text-sm leading-7 text-muted-foreground">{competitionLabels[record.competitionBand]}</p>
              </div>
              <div className="rounded-xl bg-muted/30 p-4">
                <div className="mb-2 text-sm font-medium text-foreground">الميزانية المتوقعة</div>
                <p className="text-sm leading-7 text-muted-foreground">{record.budget}</p>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl bg-muted/40 p-4">
                <div className="mb-3 text-sm font-medium text-foreground">ماذا يحتاج فريق المنتج أن يفهم؟</div>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  <li>المشكلة مرتبطة بقطاع {record.sectorName} وتحديداً ضمن {record.subSectorName}.</li>
                  <li>الأولوية الحالية تشير إلى أن البدء بالتحقق من الفرضيات سيكون ذا قيمة عملية.</li>
                  <li>فرصة الحل الأقرب حالياً هي {record.linkedTitle}.</li>
                </ul>
              </div>

              <div className="rounded-xl bg-muted/40 p-4">
                <div className="mb-3 text-sm font-medium text-foreground">ما الذي يمكن بناؤه لاحقاً؟</div>
                <ul className="space-y-2 text-sm leading-7 text-muted-foreground">
                  <li>واجهة تحقق من المشكلة مع أسئلة العملاء المتأثرين.</li>
                  <li>واجهة دراسة سوق مختصرة مرتبطة بالدول والقطاعات ذات الصلة.</li>
                  <li>واجهة بناء عرض قيمة مرتبطة مباشرة بهذه المشكلة.</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl bg-muted/30 p-4">
              <div className="mb-3 text-sm font-medium text-foreground">وسوم مرتبطة</div>
              <div className="flex flex-wrap gap-2">
                {record.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="rounded-md border-transparent bg-background text-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProblemDeepDive;
