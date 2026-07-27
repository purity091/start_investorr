import React, { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  DollarSign,
  Lightbulb,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type Step = {
  id: number;
  title: string;
  hint: string;
};

type Phase = {
  id: number;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tone: {
    soft: string;
    text: string;
    strong: string;
  };
  steps: Step[];
};

type StepAnswer = {
  id: number;
  value: string;
};

const PHASES: Phase[] = [
  {
    id: 1,
    label: 'اكتشاف العميل',
    description: 'فهم السوق المستهدف وتحديد نقطة الدخول الأولى.',
    icon: Users,
    tone: {
      soft: 'bg-sky-50',
      text: 'text-sky-700',
      strong: 'bg-sky-600',
    },
    steps: [
      { id: 1, title: 'تقسيم السوق', hint: 'حدد الشرائح السوقية الممكنة، ثم صف الفروق الجوهرية بينها.' },
      { id: 2, title: 'اختيار سوق الانطلاق', hint: 'اختر شريحة واحدة فقط لتكون البداية، ووضح لماذا هي الأنسب.' },
      { id: 3, title: 'بناء ملف المستخدم النهائي', hint: 'صف العميل المثالي، أولوياته، وسياق استخدامه للمشروع.' },
      { id: 4, title: 'تقدير الحجم الكلي للسوق', hint: 'قدّر إجمالي السوق القابل للخدمة بلغة كمية واضحة.' },
    ],
  },
  {
    id: 2,
    label: 'تحليل القيمة',
    description: 'تحويل فهم العميل إلى مشكلة وعرض قيمة واضح.',
    icon: Lightbulb,
    tone: {
      soft: 'bg-violet-50',
      text: 'text-violet-700',
      strong: 'bg-violet-600',
    },
    steps: [
      { id: 5, title: 'رسم شخصية العميل', hint: 'أنشئ Persona واضحة تعكس العميل الأقرب للواقع.' },
      { id: 6, title: 'رحلة الاستخدام الكاملة', hint: 'اشرح كيف يكتشف العميل الحل ويستخدمه ويقيّمه.' },
      { id: 7, title: 'صياغة الوظائف الأساسية', hint: 'حدد الوظائف الأساسية التي لا بد أن ينجزها المنتج.' },
      { id: 8, title: 'قياس القيمة المقدمة', hint: 'صف القيمة بلغة وقت أو مال أو جهد أو دقة أو سرعة.' },
    ],
  },
  {
    id: 3,
    label: 'النموذج والإيراد',
    description: 'تحديد ما الذي يباع ولمن وبأي منطق سعري.',
    icon: DollarSign,
    tone: {
      soft: 'bg-emerald-50',
      text: 'text-emerald-700',
      strong: 'bg-emerald-600',
    },
    steps: [
      { id: 9, title: 'تحديد أول 10 عملاء', hint: 'اكتب العملاء أو الحسابات الأقرب للوصول في البداية.' },
      { id: 10, title: 'تحديد جوهر المنتج', hint: 'ما الشيء الواحد الذي يجب أن ينجزه المنتج بشكل متفوق؟' },
      { id: 11, title: 'تصميم نموذج الإيرادات', hint: 'حدد منطق الدفع: اشتراك أو ترخيص أو عمولة أو بيع مباشر.' },
      { id: 12, title: 'وضع استراتيجية التسعير', hint: 'اقترح السعر ومنطق الوصول إليه والمقارنة التي تدعمه.' },
    ],
  },
  {
    id: 4,
    label: 'التحقق التجاري',
    description: 'اختبار صلاحية النموذج من الناحية الاقتصادية.',
    icon: TrendingUp,
    tone: {
      soft: 'bg-amber-50',
      text: 'text-amber-700',
      strong: 'bg-amber-600',
    },
    steps: [
      { id: 13, title: 'حساب قيمة عمر العميل', hint: 'قدّر الإيراد المتوقع من العميل طوال علاقته بالمشروع.' },
      { id: 14, title: 'حساب تكلفة اكتساب العميل', hint: 'قدّر تكلفة الوصول إلى عميل واحد رابح وقارنها بالعائد.' },
      { id: 15, title: 'تحديد الفرضيات الحرجة', hint: 'حدد الفرضيات الأخطر التي قد تضعف النموذج إذا ثبت خطؤها.' },
      { id: 16, title: 'صياغة النسخة القابلة للبيع', hint: 'صف أبسط نسخة تحقق قيمة قابلة للبيع الآن.' },
    ],
  },
  {
    id: 5,
    label: 'أفضلية السوق',
    description: 'تثبيت عناصر التفوق والتميّز أمام المنافسة.',
    icon: Target,
    tone: {
      soft: 'bg-rose-50',
      text: 'text-rose-700',
      strong: 'bg-rose-600',
    },
    steps: [
      { id: 17, title: 'رسم المشهد التنافسي', hint: 'من البدائل الحالية وكيف يقارن العميل بينها وبين مشروعك؟' },
      { id: 18, title: 'بناء الميزة التنافسية', hint: 'ما الذي يجعل المشروع أصعب في النسخ أو اللحاق لاحقاً؟' },
      { id: 19, title: 'تصميم آلية البيع الأولى', hint: 'اشرح كيف ستتم أول عملية بيع من الوصول إلى الإغلاق.' },
      { id: 20, title: 'تحديد مؤشرات النجاح', hint: 'اختر مؤشرات تشغيلية وتجارية واضحة لقياس التقدم.' },
    ],
  },
  {
    id: 6,
    label: 'الإطلاق والنمو',
    description: 'تحويل النموذج إلى خطة تنفيذ وتمويل وتوسع.',
    icon: Rocket,
    tone: {
      soft: 'bg-slate-100',
      text: 'text-slate-700',
      strong: 'bg-slate-900',
    },
    steps: [
      { id: 21, title: 'خارطة طريق المنتج', hint: 'ما الذي سيبنى خلال 3 و6 و12 شهراً؟' },
      { id: 22, title: 'تحديد متطلبات التمويل', hint: 'كم يحتاج المشروع من تمويل، ولماذا، وكيف سيوزع؟' },
      { id: 23, title: 'خطة التوسع', hint: 'ما السوق أو الشريحة أو الدولة التالية بعد إثبات البداية؟' },
      { id: 24, title: 'الرؤية خلال 24 شهراً', hint: 'صف أين يجب أن يكون المشروع بعد عامين من الآن.' },
    ],
  },
];

const INITIAL_ANSWERS: StepAnswer[] = PHASES.flatMap((phase) =>
  phase.steps.map((step) => ({
    id: step.id,
    value: '',
  })),
);

export const MIT24Mode: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<StepAnswer[]>(INITIAL_ANSWERS);
  const [activePhase, setActivePhase] = useState(1);
  const [openStep, setOpenStep] = useState(1);

  const getValue = (id: number) => answers.find((answer) => answer.id === id)?.value ?? '';

  const setValue = (id: number, value: string) => {
    setAnswers((current) =>
      current.map((answer) => (answer.id === id ? { ...answer, value } : answer)),
    );
  };

  const totalSteps = answers.length;
  const filledCount = answers.filter((answer) => answer.value.trim().length > 0).length;
  const completion = Math.round((filledCount / totalSteps) * 100);

  const currentPhase = PHASES.find((phase) => phase.id === activePhase) ?? PHASES[0];

  const currentStepIndex = useMemo(
    () => currentPhase.steps.findIndex((step) => step.id === openStep),
    [currentPhase.steps, openStep],
  );

  const currentStep = currentPhase.steps[currentStepIndex] ?? currentPhase.steps[0];

  const phaseProgress = (phase: Phase) => {
    const filled = phase.steps.filter((step) => getValue(step.id).trim().length > 0).length;
    return {
      filled,
      percent: Math.round((filled / phase.steps.length) * 100),
    };
  };

  const moveToStep = (phaseId: number, stepId: number) => {
    setActivePhase(phaseId);
    setOpenStep(stepId);
  };

  const goToAdjacentStep = (direction: 'previous' | 'next') => {
    if (direction === 'previous') {
      if (currentStepIndex > 0) {
        setOpenStep(currentPhase.steps[currentStepIndex - 1].id);
        return;
      }

      const previousPhase = PHASES.find((phase) => phase.id === currentPhase.id - 1);
      if (previousPhase) {
        moveToStep(previousPhase.id, previousPhase.steps[previousPhase.steps.length - 1].id);
      }
      return;
    }

    if (currentStepIndex < currentPhase.steps.length - 1) {
      setOpenStep(currentPhase.steps[currentStepIndex + 1].id);
      return;
    }

    const nextPhase = PHASES.find((phase) => phase.id === currentPhase.id + 1);
    if (nextPhase) {
      moveToStep(nextPhase.id, nextPhase.steps[0].id);
    }
  };

  return (
    <div
      dir="rtl"
      className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-3 py-3 sm:px-4 lg:px-5"
    >
      <Card className="border-0 bg-background shadow-none">
        <CardHeader className="gap-3 px-0 pt-0">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-3">
              <Badge variant="secondary" className="w-fit rounded-md px-3 py-1 font-medium">
                منهجية بناء مشروع منضبطة
              </Badge>
              <div className="space-y-2">
                <CardTitle className="text-xl leading-tight sm:text-2xl">MIT 24 Steps</CardTitle>
                <CardDescription className="line-clamp-3 max-w-3xl text-sm leading-6">
                  مسار منظم لتحويل فكرة المشروع إلى نموذج قابل للتنفيذ عبر 24 خطوة تغطي العميل،
                  القيمة، الإيراد، التحقق، والجاهزية للنمو.
                </CardDescription>
              </div>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-3 xl:w-[560px]">
              <div className="rounded-lg bg-muted/40 p-3">
                <div className="text-xs font-medium text-muted-foreground">إجمالي الخطوات</div>
                <div className="mt-1 text-xl font-semibold text-foreground">{totalSteps}</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-3">
                <div className="text-xs font-medium text-muted-foreground">خطوات مكتملة</div>
                <div className="mt-1 text-xl font-semibold text-foreground">{filledCount}</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-3">
                <div className="text-xs font-medium text-muted-foreground">نسبة الإنجاز</div>
                <div className="mt-1 text-xl font-semibold text-foreground">{completion}%</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-muted/30 px-3 py-3 sm:px-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-foreground">مستوى التقدم العام</div>
                <div className="flex items-center gap-3">
                  <div className="h-2.5 w-48 overflow-hidden rounded-full bg-muted sm:w-72">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{completion}%</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="rounded-md px-3 py-1 font-medium">
                  الخطوة الحالية: {currentStep.id}
                </Badge>
                <Button type="button" onClick={onComplete} disabled={filledCount < 8}>
                  تحليل النتائج
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-0 bg-muted/20 shadow-none">
        <CardHeader className="p-4 pb-3">
          <CardTitle className="text-lg">مراحل المنهجية</CardTitle>
          <CardDescription>
            اختر المرحلة التي تريد العمل عليها. كل مرحلة تحتوي 4 خطوات واضحة.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 p-4 pt-0 sm:grid-cols-2 xl:grid-cols-3">
          {PHASES.map((phase) => {
            const progress = phaseProgress(phase);
            const isActive = phase.id === activePhase;
            const Icon = phase.icon;

            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => moveToStep(phase.id, phase.steps[0].id)}
                className={cn(
                  'flex flex-col gap-2 rounded-lg p-3 text-right transition-colors',
                  isActive ? `${phase.tone.soft} shadow-sm` : 'bg-background/80 hover:bg-background',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-foreground">{phase.label}</div>
                    <div className="text-xs leading-6 text-muted-foreground">{phase.description}</div>
                  </div>
                  <div
                    className={cn(
                      'flex size-9 shrink-0 items-center justify-center rounded-lg bg-background',
                      phase.tone.text,
                    )}
                  >
                    <Icon className="size-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{progress.filled}/4</span>
                    <span>{progress.percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-background">
                    <div
                      className={cn('h-full rounded-full transition-all', phase.tone.strong)}
                      style={{ width: `${progress.percent}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-0 bg-background shadow-none">
        <CardHeader className="px-0 pb-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg">{currentPhase.label}</CardTitle>
              <CardDescription>{currentPhase.description}</CardDescription>
            </div>
            <Badge variant="secondary" className="w-fit rounded-md px-3 py-1 font-medium">
              {phaseProgress(currentPhase).filled} من {currentPhase.steps.length} مكتملة
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 px-0">
          {currentPhase.steps.map((step) => {
            const value = getValue(step.id);
            const isOpen = openStep === step.id;
            const isCompleted = value.trim().length > 0;

            return (
              <div
                key={step.id}
                className={cn(
                  'overflow-hidden rounded-xl bg-muted/20 transition-colors',
                  isOpen && `${currentPhase.tone.soft}`,
                  isCompleted && !isOpen && 'bg-emerald-50/30',
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenStep(isOpen ? -1 : step.id)}
                  className="flex w-full items-start gap-3 px-3 py-3 text-right hover:bg-background/40"
                >
                  <div
                    className={cn(
                      'mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold',
                      isCompleted
                        ? 'bg-emerald-500 text-white'
                        : isOpen
                          ? `${currentPhase.tone.strong} text-white`
                          : 'bg-background text-muted-foreground',
                    )}
                  >
                    {isCompleted ? <CheckCircle2 className="size-4" /> : step.id}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="text-sm font-semibold text-foreground">{step.title}</div>
                    {isCompleted && !isOpen ? (
                      <div className="line-clamp-1 text-xs leading-6 text-muted-foreground">{value}</div>
                    ) : (
                      <div className="text-xs leading-6 text-muted-foreground">
                        اضغط لفتح هذه الخطوة وتحرير الإجابة.
                      </div>
                    )}
                  </div>

                  <ChevronDown
                    className={cn(
                      'mt-1 size-4 shrink-0 text-muted-foreground transition-transform',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>

                {isOpen ? (
                  <div className="px-3 pb-3">
                    <div
                      className={cn(
                        'mb-3 rounded-lg px-3 py-2 text-sm leading-6',
                        currentPhase.tone.soft,
                        currentPhase.tone.text,
                      )}
                    >
                      {step.hint}
                    </div>

                    <Textarea
                      value={value}
                      onChange={(event) => setValue(step.id, event.target.value)}
                      placeholder="اكتب إجابتك هنا بشكل واضح ومباشر..."
                      className="min-h-[130px] resize-y border-0 bg-background text-right leading-7 shadow-none focus-visible:ring-1"
                    />

                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs text-muted-foreground">عدد الأحرف: {value.length}</div>

                      <div className="flex flex-wrap items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => goToAdjacentStep('previous')}
                          disabled={currentPhase.id === 1 && currentStep.id === 1}
                        >
                          السابقة
                        </Button>
                        <Button type="button" size="sm" onClick={() => goToAdjacentStep('next')}>
                          التالية
                          <ChevronLeft className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};
