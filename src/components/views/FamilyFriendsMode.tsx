import React, { useState } from 'react';
import { Activity, CheckCircle2, ChevronLeft, ChevronRight, DollarSign, Heart, Layers, Target, Users } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/textarea';

interface FamilyFriendsData {
  nickname: string;
  simpleProblem: string;
  grandmaExplanation: string;
  firstUser: string;
  moneyModel: string;
}

type StepConfig = {
  id: keyof FamilyFriendsData;
  title: string;
  subtitle: string;
  placeholder: string;
  icon: React.ElementType;
};

const STEPS: StepConfig[] = [
  {
    id: 'nickname',
    title: 'تسمية المشروع',
    subtitle: 'اسم أولي يوضح فكرة المشروع واتجاهه.',
    placeholder: 'مثال: منصة تربط الحرفيين المحليين بالعملاء داخل المدينة.',
    icon: Layers,
  },
  {
    id: 'simpleProblem',
    title: 'المشكلة الأساسية',
    subtitle: 'ما المشكلة الحقيقية التي يحاول المشروع حلها؟',
    placeholder: 'مثال: صعوبة وصول العميل إلى مزودي خدمة موثوقين بسرعة وبسعر واضح.',
    icon: Target,
  },
  {
    id: 'grandmaExplanation',
    title: 'شرح الفكرة ببساطة',
    subtitle: 'اشرح كيف يعمل المشروع بلغة يفهمها أي شخص.',
    placeholder: 'مثال: التطبيق يربط العميل بمقدم الخدمة، ثم يتابع الطلب والدفع والتقييم في مكان واحد.',
    icon: Activity,
  },
  {
    id: 'firstUser',
    title: 'العميل الأول',
    subtitle: 'من الشريحة الأقرب لاستخدام المشروع عند الإطلاق؟',
    placeholder: 'مثال: الأسر الشابة، أصحاب المشاريع الصغيرة، الطلاب، أو الشركات الصغيرة.',
    icon: Users,
  },
  {
    id: 'moneyModel',
    title: 'طريقة تحقيق الإيراد',
    subtitle: 'كيف سيحقق المشروع الدخل أو الربح؟',
    placeholder: 'مثال: اشتراك شهري، عمولة على الطلبات، رسوم تشغيل ثابتة، أو بيع مباشر.',
    icon: DollarSign,
  },
];

export const FamilyFriendsMode: React.FC<{
  data: FamilyFriendsData;
  onChange: (data: Partial<FamilyFriendsData>) => void;
  onComplete: () => void;
}> = ({ data, onChange, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const current = STEPS[currentStep];
  const CurrentIcon = current.icon;
  const currentValue = data[current.id] || '';
  const hasValue = currentValue.trim().length > 0;
  const isLast = currentStep === STEPS.length - 1;
  const completedCount = STEPS.filter((step) => (data[step.id] || '').trim().length > 0).length;
  const progress = Math.round((completedCount / STEPS.length) * 100);

  return (
    <main dir="rtl" className="mx-auto w-full max-w-6xl space-y-5 px-4 py-6 text-right sm:px-6 lg:px-8">
      <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">
                <Heart className="h-3.5 w-3.5" />
                النموذج السهل
              </Badge>
              <Badge variant="outline">خطوة {currentStep + 1} من {STEPS.length}</Badge>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">ابدأ دراسة الجدوى بلغة بسيطة</h1>
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                هذا المسار مناسب لمن يريد تحويل فكرة أولية إلى وصف واضح قبل الانتقال للتفاصيل المتقدمة.
              </p>
            </div>
          </div>

          <div className="min-w-[220px] space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>الاكتمال</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">خطوات النموذج</CardTitle>
            <CardDescription>اختر أي خطوة وعدّل الإجابة بدون تعقيد.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = (data[step.id] || '').trim().length > 0;

              return (
                <Button
                  key={step.id}
                  type="button"
                  variant={isActive ? 'secondary' : 'ghost'}
                  onClick={() => setCurrentStep(index)}
                  className="h-auto w-full justify-start whitespace-normal px-3 py-3 text-right"
                >
                  <div className="flex w-full items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background text-muted-foreground ring-1 ring-border">
                      {isCompleted ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{step.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{step.subtitle}</p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <CurrentIcon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-lg">{current.title}</CardTitle>
                <CardDescription className="leading-6">{current.subtitle}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={currentValue}
              onChange={(event) => onChange({ [current.id]: event.target.value })}
              placeholder={current.placeholder}
              className="min-h-[240px] resize-y bg-background text-right leading-7"
            />

            <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">عدد الأحرف: {currentValue.length}</p>

              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentStep((value) => Math.max(0, value - 1))}
                  disabled={currentStep === 0}
                >
                  <ChevronRight className="h-4 w-4" />
                  السابقة
                </Button>

                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    if (!hasValue) return;
                    if (isLast) {
                      onComplete();
                      return;
                    }
                    setCurrentStep((value) => Math.min(STEPS.length - 1, value + 1));
                  }}
                  disabled={!hasValue}
                >
                  {isLast ? 'إنشاء دراسة الجدوى' : 'التالي'}
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
