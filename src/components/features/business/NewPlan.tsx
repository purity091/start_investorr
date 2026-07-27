import React, { useEffect, useMemo, useState } from 'react';
import {
  Heart,
  LayoutGrid,
  Layers,
  Lightbulb,
  Rocket,
  Sparkles,
  Wand2,
  Zap,
} from 'lucide-react';

import SmartBeginnerPro from '../../../features/easy-mode/SmartBeginnerPro';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { IdeaCreation, CreationMode } from './IdeaCreation';

type ToolMode = 'selection' | 'easy' | 'ai' | 'family' | 'bmc' | 'mit24';

type ToolIntro = {
  title: string;
  badge: string;
  summary: string;
  steps: string[];
  outcomes: string[];
};

interface Template {
  id: string;
  title: string;
  description: string;
}

const TOOL_INTROS: Record<Exclude<ToolMode, 'selection' | 'ai' | 'scratch'>, ToolIntro> = {
  family: {
    title: 'النموذج السهل',
    badge: 'مسار مبسط',
    summary:
      'هذه الأداة تبني دراسة جدوى مشروع بطريقة مباشرة ومفهومة. تبدأ بتوضيح الفكرة، المشكلة، العميل، وطريقة الربح، ثم تنتقل إلى مخرجات أوضح يمكن تطويرها لاحقاً مع المبرمج أو المستشار.',
    steps: [
      'تحديد اسم أولي للمشروع وصياغة الفكرة بلغة بسيطة.',
      'توضيح المشكلة التي يحلها المشروع والشريحة المستهدفة.',
      'شرح النموذج التشغيلي وكيفية تحقيق الإيرادات.',
    ],
    outcomes: [
      'هيكل أولي واضح لفكرة المشروع.',
      'صياغة مبسطة تصلح كبداية لدراسة الجدوى.',
      'مخرجات أسهل للمراجعة قبل الانتقال للمراحل الأعمق.',
    ],
  },
  easy: {
    title: 'النموذج الاحترافي',
    badge: 'تحليل موجه',
    summary:
      'هذه الأداة تقودك عبر أسئلة مرتبة لبناء دراسة جدوى مشروع بصورة أكثر نضجاً. تركز على وضوح السوق، منطق التنفيذ، والجدوى الأولية قبل الانتقال إلى التقرير النهائي.',
    steps: [
      'الإجابة على أسئلة موجهة تغطي جوهر المشروع.',
      'قياس التماسك بين الفكرة، العميل، والسوق.',
      'إخراج تحليل أوضح يصلح لاتخاذ القرار.',
    ],
    outcomes: [
      'تصور أقوى للمشروع من الناحية الاستثمارية.',
      'قراءة أولية لمستوى الجاهزية.',
      'أساس منظم لاستكمال دراسة الجدوى لاحقاً.',
    ],
  },
  mit24: {
    title: 'MIT 24 Steps',
    badge: 'منهجية متقدمة',
    summary:
      'هذا المسار مناسب عندما تريد بناء دراسة جدوى مشروع بشكل منهجي ومفصل. الأداة تقسم العمل إلى 24 خطوة تغطي العميل، القيمة، النموذج، والتحقق التجاري بشكل متدرج.',
    steps: [
      'المرور على مراحل متتابعة بدلاً من تعبئة نموذج واحد فقط.',
      'بناء الفرضيات الأساسية للمشروع بشكل منظم.',
      'تحويل الفكرة إلى مسار عمل يمكن الدفاع عنه بوضوح.',
    ],
    outcomes: [
      'تصور عميق لعناصر المشروع الأساسية.',
      'منهج واضح لتقييم جدوى الفكرة.',
      'محتوى جاهز للتطوير لاحقاً إلى وثائق تنفيذية أعمق.',
    ],
  },
  bmc: {
    title: 'بناء نموذج العمل BMC',
    badge: 'لوحة قرار',
    summary:
      'هذه الأداة تبني دراسة جدوى مشروع من خلال نموذج العمل التجاري. تبدأ بتعريف المشروع، ثم تنتقل إلى اللوحة المعروفة لعناصر BMC لفهم العميل، القيمة، القنوات، الإيرادات، والتكاليف.',
    steps: [
      'تحديد المشروع والهدف من بناء النموذج.',
      'المرور على أقسام نموذج العمل التسعة.',
      'تجميع إجابات منظمة تسهل فهم منطق المشروع.',
    ],
    outcomes: [
      'لوحة عمل واضحة للعناصر الأساسية.',
      'تصور مترابط لنموذج المشروع.',
      'مادة جاهزة للعرض أو التطوير لاحقاً.',
    ],
  },
};

const TEMPLATES: Template[] = [
  {
    id: 'saas',
    title: 'شركة تقنية ناشئة',
    description: 'بداية مناسبة للمشاريع الرقمية والخدمات البرمجية.',
  },
  {
    id: 'retail',
    title: 'تجارة ومنتجات',
    description: 'للمتاجر، المنتجات، والتوزيع والبيع المباشر.',
  },
  {
    id: 'services',
    title: 'خدمات واستشارات',
    description: 'للمشاريع التي تعتمد على الخبرة، التشغيل، أو التنفيذ.',
  },
];

const TOOL_CARDS: Array<{
  mode: Exclude<ToolMode, 'selection' | 'ai'>;
  title: string;
  description: string;
  icon: React.ElementType;
}> = [
  {
    mode: 'family',
    title: 'النموذج السهل',
    description: 'مسار مبسط لشرح فكرة المشروع وتحويلها إلى بداية واضحة لدراسة الجدوى.',
    icon: Heart,
  },
  {
    mode: 'easy',
    title: 'النموذج الاحترافي',
    description: 'تحليل موجه لبناء دراسة جدوى مشروع بشكل أكثر انضباطاً واستعداداً للتطوير.',
    icon: Zap,
  },
  {
    mode: 'mit24',
    title: 'MIT 24 Steps',
    description: 'منهجية عميقة خطوة بخطوة لبناء المشروع والتحقق من منطقه التجاري.',
    icon: Rocket,
  },
  {
    mode: 'bmc',
    title: 'بناء نموذج العمل BMC',
    description: 'لوحة منظمة لفهم عناصر المشروع وعلاقاتها الأساسية.',
    icon: LayoutGrid,
  },
];

const ToolIntroPanel: React.FC<{
  mode: Exclude<ToolMode, 'selection' | 'ai'>;
  onStart: () => void;
  onBack?: () => void;
}> = ({ mode, onStart, onBack }) => {
  const intro = TOOL_INTROS[mode];

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
      <Card className="border-0 bg-background shadow-none">
        <CardHeader className="px-0 pt-0">
          <Badge variant="secondary" className="mb-3 w-fit rounded-md px-3 py-1 font-medium">
            {intro.badge}
          </Badge>
          <CardTitle className="text-2xl sm:text-3xl">{intro.title}</CardTitle>
          <CardDescription className="max-w-3xl text-sm leading-7 sm:text-[15px]">
            {intro.summary}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-0 bg-muted/30 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">كيف تبني هذه الأداة دراسة جدوى مشروع؟</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {intro.steps.map((step) => (
              <div key={step} className="rounded-xl bg-background/80 px-4 py-3 text-sm leading-7 text-foreground">
                {step}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 bg-muted/30 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">ماذا ستحصل في النهاية؟</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {intro.outcomes.map((item) => (
              <div key={item} className="rounded-xl bg-background/80 px-4 py-3 text-sm leading-7 text-foreground">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 bg-muted/20 shadow-none">
        <CardContent className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-foreground">ابدأ من هذه الصفحة</p>
            <p className="text-sm leading-7 text-muted-foreground">
              بعد قراءة التعريف يمكنك الانتقال مباشرة إلى بناء دراسة جدوى مشروع داخل نفس الأداة.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {onBack ? (
              <Button type="button" variant="outline" onClick={onBack}>
                العودة للأدوات
              </Button>
            ) : null}
            <Button type="button" onClick={onStart}>
              إنشاء دراسة جدوى مشروع
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const NewPlan: React.FC<{
  onStart: (id: string) => void;
  onBuildPlan?: () => void;
  setSubTabLabel: (label: string | null) => void;
  subTabLabel?: string | null;
  initialMode?: 'selection' | 'easy' | 'family' | 'bmc' | 'mit24';
}> = ({ onStart, onBuildPlan, setSubTabLabel, initialMode = 'selection' }) => {
  const [mode, setMode] = useState<ToolMode>(initialMode);
  const [hasStarted, setHasStarted] = useState(initialMode === 'selection');

  useEffect(() => {
    setMode(initialMode);
    setHasStarted(initialMode === 'selection');
  }, [initialMode]);

  const isIntroMode = useMemo(
    () => mode === 'family' || mode === 'easy' || mode === 'mit24' || mode === 'bmc',
    [mode],
  );

  if (mode === 'easy' && hasStarted) {
    return <SmartBeginnerPro />;
  }

  if ((mode === 'family' || mode === 'bmc' || mode === 'mit24') && hasStarted) {
    return (
      <IdeaCreation
        initialMode={mode as CreationMode}
        onBuildPlan={onBuildPlan}
        onBack={() => {
          setMode('selection');
          setHasStarted(true);
          setSubTabLabel(null);
        }}
      />
    );
  }

  if (isIntroMode && !hasStarted) {
    return (
      <ToolIntroPanel
        mode={mode}
        onStart={() => setHasStarted(true)}
        onBack={initialMode === 'selection' ? () => setMode('selection') : undefined}
      />
    );
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      <Card className="border-0 bg-background shadow-none">
        <CardHeader className="px-0 pt-0">
          <Badge variant="secondary" className="mb-3 w-fit rounded-md px-3 py-1 font-medium">
            بناء دراسة جدوى مشروع
          </Badge>
          <CardTitle className="text-2xl sm:text-3xl">اختر أداة بناء الدراسة المناسبة</CardTitle>
          <CardDescription className="max-w-3xl text-sm leading-7 sm:text-[15px]">
            كل مسار هنا يبدأ بصفحة تعريفية تشرح طريقة الأداة في بناء دراسة جدوى مشروع، ثم تنتقل
            إلى التنفيذ داخل نفس الصفحة.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {TOOL_CARDS.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.mode}
              type="button"
              onClick={() => {
                setMode(tool.mode);
                setHasStarted(false);
                setSubTabLabel(tool.title);
              }}
              className="rounded-2xl bg-muted/30 p-5 text-right transition-colors hover:bg-muted/50"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-background text-foreground">
                <Icon className="size-5" />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-foreground">{tool.title}</p>
                <p className="text-xs leading-6 text-muted-foreground">{tool.description}</p>
              </div>
            </button>
          );
        })}
      </div>

      <Card className="border-0 bg-muted/20 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">كيف تختار المسار المناسب؟</CardTitle>
          <CardDescription>اختر الأداة بحسب مستوى النضج الحالي للمشروع.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-background/80 p-4">
            <p className="mb-2 text-sm font-semibold text-foreground">بداية سريعة</p>
            <p className="text-xs leading-6 text-muted-foreground">
              ابدأ بـ <span className="font-semibold text-foreground">النموذج السهل</span> إذا كانت
              الفكرة ما زالت في أول صياغتها.
            </p>
          </div>
          <div className="rounded-xl bg-background/80 p-4">
            <p className="mb-2 text-sm font-semibold text-foreground">قرار أوضح</p>
            <p className="text-xs leading-6 text-muted-foreground">
              استخدم <span className="font-semibold text-foreground">النموذج الاحترافي</span> عندما
              تريد قراءة أكثر تنظيماً وجاهزية.
            </p>
          </div>
          <div className="rounded-xl bg-background/80 p-4">
            <p className="mb-2 text-sm font-semibold text-foreground">تفصيل أعمق</p>
            <p className="text-xs leading-6 text-muted-foreground">
              انتقل إلى <span className="font-semibold text-foreground">MIT 24 Steps</span> أو{' '}
              <span className="font-semibold text-foreground">BMC</span> إذا كنت تبني هيكلاً أشمل
              للمشروع.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-muted/20 shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-foreground" />
            <CardTitle className="text-lg">قوالب بداية سريعة</CardTitle>
          </div>
          <CardDescription>اختصارات أولية تساعدك على بدء التفكير في نوع المشروع.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              type="button"
              onClick={() => onStart(template.id)}
              className="rounded-xl bg-background/80 p-4 text-right transition-colors hover:bg-background"
            >
              <p className="mb-2 text-sm font-semibold text-foreground">{template.title}</p>
              <p className="text-xs leading-6 text-muted-foreground">{template.description}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card className="border-0 bg-muted/20 shadow-none">
        <CardContent className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Lightbulb className="size-4 text-foreground" />
              <p className="text-sm font-semibold text-foreground">هل تحتاج إلى ترشيح أسرع؟</p>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              ابدأ من النموذج السهل إذا كنت تريد صياغة الفكرة بسرعة، ثم انتقل إلى الأدوات الأعمق.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={() => {
            setMode('family');
            setHasStarted(false);
            setSubTabLabel('النموذج السهل');
          }}>
            ابدأ بالنموذج السهل
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
