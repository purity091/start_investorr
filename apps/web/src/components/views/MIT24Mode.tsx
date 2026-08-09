import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  HelpCircle,
  Lightbulb,
  Loader2,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type Step = {
  id: number;
  title: string;
  explanation: string;
  placeholder: string;
};

function SaveStatusBadge({ status, lastSaved }: { status: 'saving' | 'saved' | 'failed' | 'conflict'; lastSaved: string | null }) {
  if (status === 'saving') {
    return (
      <Badge variant="outline" className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30 font-bold px-3 py-1 text-xs gap-2 animate-pulse">
        <Loader2 className="size-3.5 animate-spin text-amber-600" />
        <span>جاري حفظ الإدخالات...</span>
      </Badge>
    );
  }

  if (status === 'failed') {
    return (
      <Badge variant="outline" className="gap-1.5 border-destructive/30 bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive">
        <AlertTriangle className="size-3.5" />
        <span>تعذر الحفظ، جارٍ إعادة المحاولة</span>
      </Badge>
    );
  }

  if (status === 'conflict') {
    return (
      <Badge variant="outline" className="gap-1.5 border-destructive/30 bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive">
        <AlertTriangle className="size-3.5" />
        <span>تعارض في الحفظ، التعديلات محفوظة محليًا</span>
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 font-bold px-3 py-1 text-xs gap-1.5 shadow-2xs">
      <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400" />
      <span>تم الحفظ آلياً {lastSaved ? `(${lastSaved})` : ''}</span>
    </Badge>
  );
}

type Phase = {
  id: number;
  label: string;
  shortLabel: string;
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
    label: '1. اكتشاف العميل',
    shortLabel: 'اكتشاف العميل',
    description: 'فهم القطاع والمستخدم واختيار سوق الانطلاق الأول (Beachhead Market).',
    icon: Users,
    tone: { soft: 'bg-sky-500/10', text: 'text-sky-700 dark:text-sky-400', strong: 'bg-sky-600' },
    steps: [
      {
        id: 1,
        title: 'الخطوة 1: تقسيم السوق (Market Segmentation)',
        explanation: 'حدد القطاعات والشرائح المختلفة التي يمكن لمشروعك تقديم حل لها. الهدف هو طرح كافة الاحتمالات الممكنة قبل التخصص.',
        placeholder: 'مثال واقعي: المتاجر الإلكترونية، مكاتب المحاسبة، العيادات الطبية، شركات المقاولات، الأسر المنتجة...',
      },
      {
        id: 2,
        title: 'الخطوة 2: اختيار سوق الانطلاق (Beachhead Market)',
        explanation: 'اختر شريحة واحدة فقط تبدأ بها. يفضل أن تكون شريحة تعاني بشدة من المشكلة، وتملك ميزانية للشراء وسهلة الوصول.',
        placeholder: 'مثال واقعي: المتاجر الإلكترونية على منصتي سلة وزد، لأنها تملك دافعاً عالياً لأتمتة الشحن وحجمها يناسب حلنا الأول.',
      },
      {
        id: 3,
        title: 'الخطوة 3: ملف المستخدم النهائي (End User Profile)',
        explanation: 'صف المستخدم الفعلي الذي سيتعامل مع المنتج يومياً. حدد عمره، وظيفته، تحدياته اليومية، وأولوياته.',
        placeholder: 'مثال واقعي: مدير عمليات المتجر (عمره 25-35 سنة)، يقضي 3 ساعات يومياً في متابعة الشحنات يدوياً ويبحث عن حل يوفر وقته.',
      },
      {
        id: 4,
        title: 'الخطوة 4: حجم سوق الانطلاق (Beachhead TAM)',
        explanation: 'قدّر الحجم المالي المتوقع لسوق الانطلاق إذا اشترى منك كافة العملاء المحتملين في هذه الشريحة سنوياً.',
        placeholder: 'مثال واقعي: 5,000 متجر إلكتروني مستهدف × 100 دولار اشتراك شهري = 6 ملايين دولار سنوياً إجمالي حجم سوق الانطلاق.',
      },
    ],
  },
  {
    id: 2,
    label: '2. تحليل القيمة',
    shortLabel: 'تحليل القيمة',
    description: 'صياغة العرض الفريد ورسم شخصية العميل ورحلة الاستخدام الكاملة.',
    icon: Lightbulb,
    tone: { soft: 'bg-violet-500/10', text: 'text-violet-700 dark:text-violet-400', strong: 'bg-violet-600' },
    steps: [
      {
        id: 5,
        title: 'الخطوة 5: شخصية العميل المثالي (Persona)',
        explanation: 'اختر شخصية حقيقية تمثل زبونك الأول المثالي. حدد اسمها، ودورها الوظيفي، ومخاوفها الجوهرية.',
        placeholder: 'مثال واقعي: "سارة" صاحبة متجر أزياء، أكبر مخاوفها تأخر تسليم الطلبات للعملاء وتلف البضائع أثناء النقل.',
      },
      {
        id: 6,
        title: 'الخطوة 6: رحلة الاستخدام الكاملة (Full Life Cycle Use Case)',
        explanation: 'ارسم التسلسل الزمني لتعامل العميل مع المنتج: من اكتشافه للمشروع، للتسجيل، والشراء، والتقييم المستمر.',
        placeholder: 'مثال واقعي: يرى إعلاناً في إنستغرام ⬅ يسجل في النسخة التجريبية ⬅ يربط متجره خلال دقيقتين ⬅ يدفع الاشتراك التلقائي.',
      },
      {
        id: 7,
        title: 'الخطوة 7: مواصفات المنتج الأساسية (High-Level Product Spec)',
        explanation: 'صف وظيفياً وبصرياً كيف يحل المنتج المشكلة بأبسط شكل ممكن دون التعمق في التفاصيل البرمجية.',
        placeholder: 'مثال واقعي: لوحة تحكم سحابية مجهزة بزر أتمتة الشحنات، وتوليد بولصات سريعة، مع تنبيهات واتساب آلي للمشتري.',
      },
      {
        id: 8,
        title: 'الخطوة 8: قياس العائد والقيمة (Quantified Value Proposition)',
        explanation: 'ترجم العائد من استخدام المنتج إلى أرقام واضحة ومحددة يلمسها العميل (توفير مال، توفير وقت، زيادة مبيعات).',
        placeholder: 'مثال واقعي: يوفر 15 ساعة عمل أسبوعياً على فريق العمل، ويخفض التكاليف التشغيلية بنسبة 25% من الشهر الأول.',
      },
    ],
  },
  {
    id: 3,
    label: '3. النموذج والإيراد',
    shortLabel: 'النموذج والإيراد',
    description: 'تحديد العملاء الأوائل وتصميم هيكل الإيرادات والتسعير.',
    icon: DollarSign,
    tone: { soft: 'bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400', strong: 'bg-emerald-600' },
    steps: [
      {
        id: 9,
        title: 'الخطوة 9: أول 10 عملاء محتملين (Next 10 Customers)',
        explanation: 'اكتب قائمة بأول 10 عملاء أو حسابات مستهدفة للتواصل معهم مباشرة والتحقق من رغبتهم بالشراء.',
        placeholder: 'مثال واقعي: متجر ستايل، متجر المدار، متجر الفخامة... تواصلنا مع 4 منهم وأبدوا استعداداً تجريبياً.',
      },
      {
        id: 10,
        title: 'الخطوة 10: تحديد الميزة الجوهرية (Define Core)',
        explanation: 'ما هي الميزة التنافسية الفريدة التي يمتلكها مشروعك ولا يستطيع أي منافس تقليدها بسهولة؟',
        placeholder: 'مثال واقعي: خوارزمية التتبع الآلي اللحظية المرتبطة بـ 10 شركات شحن محلية بتكلفة إرجاع صفرية.',
      },
      {
        id: 11,
        title: 'الخطوة 11: نموذج الإيرادات (Business Model)',
        explanation: 'حدد كيف ستحصل على المال مقابل حل المشكلة: اشتراك شهري، عمولة مبيعات، بيع ترخيص، أو رسوم تأسيس.',
        placeholder: 'مثال واقعي: اشتراك شهري برمجيات (SaaS) بـ 199 ريال شهرياً + عمولة 1 ريال على كل طلب منفذ.',
      },
      {
        id: 12,
        title: 'الخطوة 12: استراتيجية التسعير (Pricing Framework)',
        explanation: 'ضع هيكل التسعير بناءً على حجم القيمة والتوفير الذي تحققه للعميل، وليس فقط بناءً على تكاليفك التشغيلية.',
        placeholder: 'مثال واقعي: سعر الاشتراك يمثل 10% فقط من إجمالي المبالغ التي نوفرها للعميل شهرياً (توفير 2,000 ريال = سعر 199 ريال).',
      },
    ],
  },
  {
    id: 4,
    label: '4. التحقق التجاري',
    shortLabel: 'التحقق التجاري',
    description: 'حساب اقتصاديات الوحدة (LTV / CAC) وااختبار الفرضيات الجوهرية.',
    icon: TrendingUp,
    tone: { soft: 'bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400', strong: 'bg-amber-600' },
    steps: [
      {
        id: 13,
        title: 'الخطوة 13: قيمة عمر العميل (Life Time Value - LTV)',
        explanation: 'احسب متوسط الإيراد المالي الإجمالي المتوقع تحصيله من العميل طوال فترة بقائه واستخدامه للمشروع.',
        placeholder: 'مثال واقعي: متوسط بقاء العميل 24 شهراً × 300 ريال اشتراك شهري = 7,200 ريال إجمالي قيمة عمر العميل (LTV).',
      },
      {
        id: 14,
        title: 'الخطوة 14: تكلفة الاستحواذ على العميل (COCA / CAC)',
        explanation: 'احسب إجمالي مصاريف التسويق والمبيعات مقسمة على عدد العملاء المكتسبين الجدد.',
        placeholder: 'مثال واقعي: ميزانية تسويق 3,000 ريال أنتجت 10 عملاء ⬅ تكلفة العميل (CAC) = 300 ريال. (LTV تبلغ 24 ضعف CAC).',
      },
      {
        id: 15,
        title: 'الخطوة 15: تحديد الفرضيات الحرجة (Key Assumptions)',
        explanation: 'حدد الفرضيات الاستراتيجية التي لو ثبت خطؤها فسوف يتعثر نموذج العمل كلياً.',
        placeholder: 'مثال واقعي: 1. أصحاب المتاجر يرغبون بمشاركة بيانات الشحن. 2. العميل يمكنه استخدام لوحة التحكم دون تدريب.',
      },
      {
        id: 16,
        title: 'الخطوة 16: اختبار الفرضيات الحرجة (Test Key Assumptions)',
        explanation: 'صف تجربة عمل سريعة وقليلة التكلفة قمت بها (أو ستنفذها) لإثبات صحة تلك الفرضيات عملياً.',
        placeholder: 'مثال واقعي: إطلاق صفحة هبوط بسيطة بتشغيل تجريبي وحملة تسويقية بـ 200 ريال لجمع 50 طلب تسجيل مسبق.',
      },
    ],
  },
  {
    id: 5,
    label: '5. أفضلية السوق',
    shortLabel: 'أفضلية السوق',
    description: 'تحديد المنتج الأدنى القابل للبيع (MVBP) وآلية الشراء الأولى.',
    icon: Target,
    tone: { soft: 'bg-rose-500/10', text: 'text-rose-700 dark:text-rose-400', strong: 'bg-rose-600' },
    steps: [
      {
        id: 17,
        title: 'الخطوة 17: المنتج الأدنى القابل للبيع (MVBP)',
        explanation: 'حدد النسخة الأولية الأكثر بساطة من المنتج التي يقبل العميل الدفع مقابلها فوراً وتوفر القيمة الأساسية.',
        placeholder: 'مثال واقعي: نسخة تقتصر على ميزة ربط بوابتي شحن مع لوحة متابعة موحدة بدون بقية الميزات المتقدمة.',
      },
      {
        id: 18,
        title: 'الخطوة 18: إثبات رغبة العميل بالدفع (Customer Validation)',
        explanation: 'اذكر أدلة واقعية تثبت أن العملاء يرغبون بالفعل بالمنتج ومستعدون للدفع (دفع مسبق، خطابات رغبة، عقود مبدئية).',
        placeholder: 'مثال واقعي: الحصول على 5 دفعات اشتراك مسبقة بقيمة 199 ريال قبل الإطلاق الرسمي للمنتج.',
      },
      {
        id: 19,
        title: 'الخطوة 19: خطة التوسع المباشر (Adjacent Markets)',
        explanation: 'بعد تثبيت النجاح في سوق الانطلاق الأول، ما هي القطاعات أو الشراكات المجاورة المستهدفة في المرحلة الثانية؟',
        placeholder: 'مثال واقعي: التوسع من المتاجر الإلكترونية الصغرى إلى الشركات اللوجستية والمتاجر المتوسطة.',
      },
      {
        id: 20,
        title: 'الخطوة 20: خريطة عملية الشراء (Acquisition Process)',
        explanation: 'حدد خط سير عملية البيع من أول تواصل حتى تحويل المبلغ المالي وتفعيل الخدمة للعميل.',
        placeholder: 'مثال واقعي: إعلان ⬅ تسجيل في المنصة ⬅ مكالمة توضيحية 5 دقائق ⬅ فترة تجربة 7 أيام ⬅ تفعيل الاشتراك الفعلي.',
      },
    ],
  },
  {
    id: 6,
    label: '6. الإطلاق والنمو',
    shortLabel: 'الإطلاق والنمو',
    description: 'خارطة طريق المنتج، مؤشرات النجاح (KPIs)، ورؤية 24 شهراً.',
    icon: Rocket,
    tone: { soft: 'bg-slate-500/10', text: 'text-slate-800 dark:text-slate-200', strong: 'bg-slate-900' },
    steps: [
      {
        id: 21,
        title: 'الخطوة 21: شجرة المبيعات ودورة التحصيل (Sales & Collection)',
        explanation: 'اشرح طريقة إدارة المبيعات ودورة التحصيل المالي المتبعة لضمان التدفق النقدي السليم.',
        placeholder: 'مثال واقعي: الدفع آلي مسبقاً عبر بطاقة الائتمان أو مدى في بداية كل شهر بدون تأخير في التحصيل.',
      },
      {
        id: 22,
        title: 'الخطوة 22: خارطة تطوير المنتج (Product Roadmap)',
        explanation: 'حدد الميزات والتحسينات المخطط إطلاقها خلال 3 أشهر، 6 أشهر، و12 شهراً المقبلة.',
        placeholder: 'مثال واقعي: Q1: إطلاق الربط الآلي الأساسي، Q2: إطلاق خوارزمية خفض التكلفة، Q3: تطبيق المندوبين.',
      },
      {
        id: 23,
        title: 'الخطوة 23: مؤشرات الأداء الرئيسية (KPIs)',
        explanation: 'اختر أهم 3 مؤشرات رقمية تتابعها أسبوعياً وشحرياً لقياس نمو ونجاح المشروع.',
        placeholder: 'مثال واقعي: 1. الإيراد الشهري المكرر (MRR)، 2. معدل الاحتفاظ بالعملاء (Retention Rate)، 3. تكلفة الاستحواذ (CAC).',
      },
      {
        id: 24,
        title: 'الخطوة 24: الرؤية الاستراتيجية خلال 24 شهراً (24-Month Plan)',
        explanation: 'ضع الرؤية الشاملة والمستهدفات الكبيرة التي تسعى لتحقيقها بعد عامين من الإطلاق.',
        placeholder: 'مثال واقعي: الوصول لـ 500 متجر إلكتروني مشترك، وتحقيق إيراد سنوي 1.2 مليون ريال مع فريق عمل من 8 متفرغين.',
      },
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
  const { workspace, updateWorkspace, flushWorkspace, syncStatus, lastSyncedAt } = useProjectWorkspace();
  const savedMit24 = workspace.feasibilityModels?.mit24 as {
    answers?: StepAnswer[];
    activePhaseTab?: string;
  } | undefined;
  const [answers, setAnswers] = useState<StepAnswer[]>(savedMit24?.answers ?? INITIAL_ANSWERS);
  const [activePhaseTab, setActivePhaseTab] = useState<string>(savedMit24?.activePhaseTab ?? 'phase-1');
  const saveStatus = syncStatus === 'conflict'
    ? 'conflict'
    : syncStatus === 'failed'
      ? 'failed'
    : syncStatus === 'saving' || syncStatus === 'pending'
      ? 'saving'
      : 'saved';
  const lastSaved = lastSyncedAt
    ? new Date(lastSyncedAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : null;

  useEffect(() => {
    updateWorkspace((current) => ({
      feasibilityModels: {
        ...current.feasibilityModels,
        mit24: { ...current.feasibilityModels?.mit24, answers, activePhaseTab },
      },
    }));
  }, [activePhaseTab, answers, updateWorkspace]);

  const completeModel = () => {
    updateWorkspace((current) => ({
      feasibilityModels: {
        ...current.feasibilityModels,
        mit24: { ...current.feasibilityModels?.mit24, answers, activePhaseTab },
      },
    }));
    void flushWorkspace();
    onComplete();
  };

  const getValue = (id: number) => answers.find((answer) => answer.id === id)?.value ?? '';

  const setValue = (id: number, value: string) => {
    setAnswers((current) =>
      current.map((answer) => (answer.id === id ? { ...answer, value } : answer)),
    );
  };

  const totalSteps = answers.length;
  const filledCount = answers.filter((answer) => answer.value.trim().length > 0).length;
  const completion = Math.round((filledCount / totalSteps) * 100);

  const phaseProgress = (phase: Phase) => {
    const filled = phase.steps.filter((step) => getValue(step.id).trim().length > 0).length;
    return {
      filled,
      percent: Math.round((filled / phase.steps.length) * 100),
    };
  };

  const currentPhaseId = parseInt(activePhaseTab.replace('phase-', ''), 10) || 1;
  const currentPhase = PHASES.find((p) => p.id === currentPhaseId) || PHASES[0];

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
      {/* Hero Header Card */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 text-right">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-bold px-3 py-1 text-xs">
                منهجية MIT المنضبطة
              </Badge>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20 font-bold px-2.5 py-0.5 text-xs gap-1">
                <CheckCircle2 className="size-3.5" />
                <span>24 خطوة ريادية مبرهنة</span>
              </Badge>
              <SaveStatusBadge status={saveStatus} lastSaved={lastSaved} />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight">
              منهجية MIT الـ 24 خطوة لبناء المشاريع الريادية
            </h1>
            <p className="max-w-3xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
              مسار منظم مبني على إطار MIT العالمي لتحويل الفكرة إلى مشروع تجاري قابل للتنفيذ عبر 6 مراحل واضحة وتفاعلية.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0 lg:w-[480px]">
            <div className="rounded-xl border border-border/80 bg-card p-3.5 shadow-2xs">
              <div className="text-[11px] font-medium text-muted-foreground">إجمالي الخطوات</div>
              <div className="text-lg font-bold tracking-tight text-foreground mt-0.5">{totalSteps} خطوة</div>
            </div>
            <div className="rounded-xl border border-border/80 bg-card p-3.5 shadow-2xs">
              <div className="text-[11px] font-medium text-muted-foreground font-medium">الخطوات المكتملة</div>
              <div className="text-lg font-bold tracking-tight text-emerald-600 dark:text-emerald-400 mt-0.5">{filledCount} / {totalSteps}</div>
            </div>
            <div className="rounded-xl border border-border/80 bg-card p-3.5 shadow-2xs">
              <div className="text-[11px] font-medium text-muted-foreground font-medium">نسبة الإنجاز</div>
              <div className="text-lg font-bold tracking-tight text-primary mt-0.5">{completion}%</div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="rounded-xl border border-border/70 bg-muted/30 p-3 sm:p-4 space-y-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-foreground">نسبة التقدم الإجمالية:</span>
              <span className="text-xs font-extrabold text-primary">{completion}%</span>
            </div>
            <Button
              type="button"
              onClick={completeModel}
              disabled={filledCount < 4}
              className="gap-2 font-bold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 text-xs py-1.5 h-9"
            >
              <Sparkles className="size-4" />
              <span>تحليل النتائج واستخراج التقرير</span>
            </Button>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Tabs Container */}
      <Tabs value={activePhaseTab} onValueChange={setActivePhaseTab} dir="rtl" className="w-full space-y-6">
        {/* Phase Tabs Switcher */}
        <TabsList className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto w-full gap-2 bg-transparent p-0">
          {PHASES.map((phase) => {
            const progress = phaseProgress(phase);
            const tabKey = `phase-${phase.id}`;
            const Icon = phase.icon;
            const isCompleted = progress.filled === phase.steps.length;

            return (
              <TabsTrigger
                key={phase.id}
                value={tabKey}
                className={cn(
                  "flex flex-col items-end gap-2 p-3 sm:p-3.5 rounded-xl border border-border/80 text-right transition-all cursor-pointer h-auto data-[state=active]:bg-card data-[state=active]:border-primary data-[state=active]:shadow-xs",
                  isCompleted ? "bg-emerald-500/5 border-emerald-500/30" : "bg-card hover:bg-accent/50"
                )}
              >
                <div className="flex items-center justify-between w-full flex-row-reverse">
                  <div className={cn("size-7 rounded-lg flex items-center justify-center shrink-0", phase.tone.soft, phase.tone.text)}>
                    <Icon className="size-4" />
                  </div>
                  <Badge variant="outline" className={cn(
                    "text-[10px] font-bold px-1.5 py-0",
                    isCompleted ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" : "bg-muted text-muted-foreground"
                  )}>
                    {progress.filled}/{phase.steps.length}
                  </Badge>
                </div>
                <div className="space-y-0.5 w-full text-right">
                  <div className="text-xs font-bold text-foreground truncate">{phase.shortLabel}</div>
                  <div className="text-[10px] text-muted-foreground font-medium">{progress.percent}% مكتمل</div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab Content for Each Phase */}
        {PHASES.map((phase) => (
          <TabsContent key={phase.id} value={`phase-${phase.id}`} className="space-y-5">
            {/* Phase Description Banner */}
            <div className={cn("rounded-xl border p-4 sm:p-5 flex items-start gap-3.5", phase.tone.soft, "border-border/60")}>
              <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0 bg-background shadow-2xs", phase.tone.text)}>
                <phase.icon className="size-5" />
              </div>
              <div className="space-y-1 min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-bold text-foreground">{phase.label}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">{phase.description}</p>
              </div>
            </div>

            {/* Phase Steps Grid */}
            <div className="space-y-4">
              {phase.steps.map((step) => {
                const value = getValue(step.id);
                const isFilled = value.trim().length > 0;

                return (
                  <Card
                    key={step.id}
                    className={cn(
                      "border bg-card p-4 sm:p-5 rounded-2xl shadow-2xs space-y-4 transition-all",
                      isFilled ? "border-primary/40" : "border-border/80"
                    )}
                  >
                    {/* Step Header */}
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "size-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0",
                          isFilled ? "bg-emerald-500 text-white" : "bg-primary/10 text-primary"
                        )}>
                          {isFilled ? <CheckCircle2 className="size-4" /> : step.id}
                        </div>
                        <h4 className="text-base font-bold text-foreground tracking-tight">{step.title}</h4>
                      </div>

                      {isFilled ? (
                        <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[11px] font-bold gap-1 px-2.5 py-0.5">
                          <CheckCircle2 className="size-3.5" />
                          <span>تم الإدخال</span>
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted text-muted-foreground border-border text-[10px] font-medium px-2 py-0.5">
                          في انتظار الإدخال
                        </Badge>
                      )}
                    </div>

                    {/* Step Explanation Callout */}
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-3.5 flex items-start gap-2.5">
                      <HelpCircle className="size-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs leading-relaxed text-foreground/90 font-medium">
                        {step.explanation}
                      </p>
                    </div>

                    {/* Step Input Textarea with Practical Example Placeholder */}
                    <div className="space-y-2">
                      <Textarea
                        value={value}
                        onChange={(e) => setValue(step.id, e.target.value)}
                        placeholder={step.placeholder}
                        rows={3}
                        className="min-h-28 w-full resize-y rounded-xl border border-input bg-background p-3.5 text-xs sm:text-sm font-medium leading-relaxed text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60"
                      />
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground px-1 font-medium">
                        <span>مثال توضيحي بالأعلى يسهل إجابتك.</span>
                        <span>عدد الأحرف: {value.length}</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Phase Navigation Controls */}
            <div className="flex items-center justify-between pt-2 flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (phase.id > 1) {
                    setActivePhaseTab(`phase-${phase.id - 1}`);
                  }
                }}
                disabled={phase.id === 1}
                className="gap-2 font-bold cursor-pointer"
              >
                <ChevronRight className="size-4" />
                <span>المرحلة السابقة</span>
              </Button>

              <Button
                type="button"
                onClick={() => {
                  if (phase.id < PHASES.length) {
                    setActivePhaseTab(`phase-${phase.id + 1}`);
                  } else {
                    completeModel();
                  }
                }}
                className="gap-2 font-bold cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span>{phase.id === PHASES.length ? 'تحليل النتائج الكلية' : 'المرحلة التالية'}</span>
                <ChevronLeft className="size-4" />
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Floating Sticky Auto-Save Visual Notification */}
      <div className="fixed bottom-5 left-5 z-50 hidden sm:flex items-center gap-2 rounded-2xl border border-border/80 bg-card/95 p-2.5 px-4 shadow-xl backdrop-blur-md transition-all">
        <SaveStatusBadge status={saveStatus} lastSaved={lastSaved} />
        <span className="text-xs font-semibold text-foreground border-r border-border/60 pr-2.5 mr-1">
          إجاباتك محفوظة تلقائياً
        </span>
      </div>
    </div>
  );
};
