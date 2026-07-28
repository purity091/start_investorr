import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Heart,
  LayoutGrid,
  Layers,
  Lightbulb,
  Pencil,
  Rocket,
  Share2,
  Sparkles,
  Trash2,
  Zap,
} from 'lucide-react';

import SmartBeginnerPro from '../../../features/easy-mode/SmartBeginnerPro';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { IdeaCreation, CreationMode } from './IdeaCreation';
import { ExampleViewer } from './ExampleViewer';

type ToolMode = 'selection' | 'easy' | 'ai' | 'family' | 'bmc' | 'mit24';
type IntroMode = Exclude<ToolMode, 'selection' | 'ai'>;
type ProjectStatus = 'ready' | 'review' | 'draft';

type ToolIntro = {
  title: string;
  badge: string;
  projectLabel: string;
  projectShortLabel: string;
  icon: React.ElementType;
  summary: string;
  steps: string[];
  outcomes: string[];
  example: {
    name: string;
    sector: string;
    description: string;
    points: string[];
  };
};

interface Template {
  id: string;
  title: string;
  description: string;
}

interface SectionProject {
  id: string;
  name: string;
  sector: string;
  status: ProjectStatus;
  progress: number;
  updated: string;
}

const TOOL_INTROS: Record<IntroMode, ToolIntro> = {
  family: {
    title: 'النموذج السهل',
    badge: 'مسار مبسط',
    projectLabel: 'مشاريع النموذج السهل',
    projectShortLabel: 'السهل',
    icon: Sparkles,
    summary:
      'النموذج السهل مخصص للمرحلة التي تكون فيها الفكرة موجودة لكن تفاصيلها غير مرتبة بعد. يساعدك على تحويل الفكرة إلى وصف عملي واضح: ما المشروع؟ ما المشكلة؟ من العميل؟ كيف يعمل؟ وكيف يمكن أن يحقق دخلاً؟ الهدف ليس إنتاج دراسة نهائية معقدة، بل بناء أساس مفهوم يمكن مراجعته وتطويره لاحقاً مع مستشار أو مبرمج أو شريك.',
    steps: [
      'تبدأ بتسمية المشروع وصياغة الفكرة بلغة مباشرة يمكن شرحها لشخص غير متخصص.',
      'تحدد المشكلة الأساسية، العميل الأقرب، والسبب الذي يجعل هذا العميل يهتم بالحل.',
      'توضح طريقة التشغيل ومصدر الإيرادات بصورة أولية حتى يصبح منطق المشروع قابلاً للنقاش.',
      'تجمع الإجابات في مخرج مختصر يساعدك على معرفة هل الفكرة تستحق الانتقال إلى تحليل أعمق أم تحتاج إعادة صياغة.',
    ],
    outcomes: [
      'تعريف أولي منظم للمشروع بدلاً من أفكار متفرقة.',
      'صياغة واضحة تصلح كبداية لدراسة جدوى أو Brief للمستشار أو الفريق التقني.',
      'رؤية مبكرة للفجوات: هل المشكلة واضحة؟ هل العميل محدد؟ هل نموذج الربح مفهوم؟',
      'قرار عملي حول الخطوة التالية: تطوير الفكرة، اختبارها، أو الانتقال إلى النموذج الاحترافي.',
    ],
    example: {
      name: 'LinkSync - أداة ربط الحسابات',
      sector: 'Micro SaaS - أدوات مطورين',
      description: 'أداة سحابية خفيفة تربط بين منصات الدفع وخدمات البريد الإلكتروني للمتاجر الصغيرة دون الحاجة لأي كود.',
      points: [
        'المشكلة: المتاجر الصغيرة لا تملك مبرمجين لربط الخدمات.',
        'العميل المستهدف: أصحاب المتاجر الإلكترونية المستقلة.',
        'نموذج الربح المبدئي: اشتراك شهري رمزي بـ 9$.'
      ]
    }
  },
  easy: {
    title: 'النموذج الاحترافي',
    badge: 'تحليل موجه',
    projectLabel: 'مشاريع النموذج الاحترافي',
    projectShortLabel: 'الاحترافي',
    icon: Zap,
    summary:
      'النموذج الاحترافي مناسب عندما تكون الفكرة أوضح وتحتاج إلى دراسة أكثر انضباطاً. يقودك عبر أسئلة منظمة حول السوق، العميل، التشغيل، الإيرادات، المخاطر، ومؤشرات الجاهزية حتى يصبح المشروع قابلاً للتقييم قبل كتابة التقرير النهائي أو عرضه على شريك أو مستثمر.',
    steps: [
      'تبدأ بتجميع معلومات المشروع الأساسية ثم ربطها بالسوق والشريحة المستهدفة.',
      'تقيس التماسك بين المشكلة، الحل، العميل، نموذج التشغيل، ومصدر الإيرادات.',
      'تراجع نقاط الضعف والمخاطر قبل أن تتحول الفكرة إلى خطة تنفيذ أو تقرير نهائي.',
      'تنتج قراءة أكثر صرامة تساعدك على اتخاذ قرار: تطوير، اختبار، تأجيل، أو إعادة بناء الفرضيات.',
    ],
    outcomes: [
      'تصور أكثر احترافية للمشروع من ناحية السوق والتنفيذ والربحية.',
      'مؤشرات أوضح حول الجاهزية والمخاطر والفجوات المطلوب إغلاقها.',
      'مخرجات قابلة للتحويل لاحقاً إلى دراسة جدوى تفصيلية أو عرض للمستثمر.',
      'أساس عملي للمراجعة مع مستشار أو فريق تقني قبل الدخول في التنفيذ.',
    ],
    example: {
      name: 'FormAI - صانع نماذج ذكي',
      sector: 'Micro SaaS - إنتاجية وتسويق',
      description: 'منصة لإنشاء نماذج جمع البيانات باستخدام الذكاء الاصطناعي مع تحليلات متقدمة.',
      points: [
        'حجم السوق المتاح: 50 ألف وكالة تسويق إقليمية.',
        'الميزة التنافسية: دعم كامل وتلقائي للغة العربية.',
        'المخاطر الرئيسية: تكلفة واجهة برمجة تطبيقات الذكاء الاصطناعي.'
      ]
    }
  },
  mit24: {
    title: 'MIT 24 Steps',
    badge: 'منهجية متقدمة',
    projectLabel: 'مشاريع MIT 24 Steps',
    projectShortLabel: 'MIT 24',
    icon: Rocket,
    summary:
      'مسار MIT 24 Steps مناسب عندما تريد بناء مشروع بمنهجية دقيقة بدلاً من الاعتماد على وصف عام للفكرة. يقسم العمل إلى مراحل متتابعة تغطي العميل، القيمة، السوق، النموذج التجاري، والتحقق، بحيث لا تنتقل إلى مرحلة أعمق قبل تثبيت أساس المرحلة السابقة.',
    steps: [
      'تبدأ بتحديد العميل الأولي وسياق المشكلة قبل التوسع في الحل أو المنتج.',
      'تمر على خطوات متتابعة تبني السوق، القيمة، القناة، الإيراد، والموقع التنافسي.',
      'تتعامل مع كل خطوة كفرضية يجب توضيحها أو اختبارها بدلاً من معلومة ثابتة.',
      'تصل في النهاية إلى تصور يمكن الدفاع عنه أمام الشركاء أو المستثمرين أو فريق التنفيذ.',
    ],
    outcomes: [
      'خريطة منهجية عميقة لعناصر المشروع الأساسية.',
      'وضوح أكبر في العميل، القيمة، السوق، والتمايز.',
      'تقليل القفزات العشوائية بين الفكرة والتنفيذ عبر مسار متدرج.',
      'محتوى قابل للتطوير إلى وثائق تنفيذية أعمق عند نضج المشروع.',
    ],
    example: {
      name: 'ClinicSync - حجز العيادات السحابي',
      sector: 'Micro SaaS - تقنية صحية',
      description: 'نظام حجز وإدارة مبسط جداً لعيادات الأسنان المستقلة للحد من تغيب المرضى.',
      points: [
        'الشريحة الأولى: 100 عيادة أسنان في مدينة الرياض كإطلاق أولي.',
        'القيمة الأساسية: تقليل عدم الحضور بنسبة 40% عبر رسائل واتساب آلية.',
        'تكلفة الاستحواذ على العميل (CAC): حوالي 150$.'
      ]
    }
  },
  bmc: {
    title: 'بناء نموذج العمل BMC',
    badge: 'لوحة قرار',
    projectLabel: 'مشاريع نموذج العمل BMC',
    projectShortLabel: 'BMC',
    icon: LayoutGrid,
    summary:
      'مسار BMC يساعدك على رؤية منطق المشروع التجاري في لوحة واحدة. يربط بين العميل، القيمة المقترحة، القنوات، الإيرادات، الموارد، الشركاء، والهيكل التشغيلي، بحيث تستطيع اكتشاف التناقضات مبكراً قبل كتابة خطة طويلة أو البدء في التنفيذ.',
    steps: [
      'تحدد المشروع والقيمة التي يقدمها والشريحة التي يستهدفها.',
      'تمر على عناصر نموذج العمل التسعة بشكل مترابط وليس كحقول منفصلة.',
      'تقارن بين القنوات، العلاقات، الموارد، الشركاء، الإيرادات، والتكاليف لمعرفة منطق التشغيل.',
      'تخرج بلوحة مختصرة تكشف أين يحتاج المشروع إلى توضيح أو اختبار إضافي.',
    ],
    outcomes: [
      'لوحة عمل واضحة للعناصر الأساسية في المشروع.',
      'تصور مترابط لنموذج المشروع التجاري والتشغيلي.',
      'كشف مبكر للتناقضات بين القيمة، العميل، القنوات، والتكاليف.',
      'مادة جاهزة للمراجعة أو العرض أو التطوير لاحقاً.',
    ],
    example: {
      name: 'MenuQR - منيو المطاعم التفاعلي',
      sector: 'Micro SaaS - ضيافة ومطاعم',
      description: 'خدمة سريعة لتحويل قوائم الطعام التقليدية إلى قوائم رقمية تفاعلية بمسح الـ QR.',
      points: [
        'شرائح العملاء: المقاهي والمطاعم ذات الميزانية المحدودة.',
        'القنوات: التسويق المباشر والزيارات الميدانية للمقاهي.',
        'هيكل التكاليف: استضافة سحابية بسيطة ودعم فني غير معقد.'
      ]
    }
  },
};

const SECTION_PROJECTS: Record<IntroMode, SectionProject[]> = {
  family: [
    { id: 'easy-1', name: 'منصة الحصاد الذكي', sector: 'AgriTech', status: 'review', progress: 65, updated: 'منذ 5 ساعات' },
    { id: 'easy-2', name: 'استوديو محتوى عربي', sector: 'Media', status: 'draft', progress: 42, updated: 'قبل 3 أيام' },
  ],
  easy: [
    { id: 'pro-1', name: 'أكاديمية الذكاء الاصطناعي', sector: 'EdTech', status: 'ready', progress: 95, updated: 'منذ ساعتين' },
    { id: 'pro-2', name: 'حل لوجستي للصيدليات', sector: 'Health Logistics', status: 'review', progress: 75, updated: 'قبل 4 أيام' },
  ],
  mit24: [
    { id: 'mit-1', name: 'بوابة الدفع الإقليمية', sector: 'FinTech', status: 'draft', progress: 23, updated: 'أمس' },
  ],
  bmc: [
    { id: 'bmc-1', name: 'عقارات افتراضية', sector: 'Property', status: 'ready', progress: 97, updated: 'منذ يومين' },
  ],
};

const STATUS_META: Record<ProjectStatus, { label: string; className: string; icon: React.ElementType }> = {
  ready: { label: 'جاهز', className: 'bg-emerald-100 text-emerald-800', icon: CheckCircle2 },
  review: { label: 'قيد المراجعة', className: 'bg-amber-100 text-amber-800', icon: Clock },
  draft: { label: 'مسودة', className: 'bg-muted text-muted-foreground', icon: Sparkles },
};

const TEMPLATES: Template[] = [
  { id: 'saas', title: 'شركة تقنية ناشئة', description: 'بداية مناسبة للمشاريع الرقمية والخدمات البرمجية.' },
  { id: 'retail', title: 'تجارة ومنتجات', description: 'للمتاجر، المنتجات، التوزيع، والبيع المباشر.' },
  { id: 'services', title: 'خدمات واستشارات', description: 'للمشاريع التي تعتمد على الخبرة، التشغيل، أو التنفيذ.' },
];

const TOOL_CARDS: Array<{ mode: IntroMode; title: string; description: string; icon: React.ElementType }> = [
  { mode: 'family', title: 'النموذج السهل', description: 'مسار مبسط لصياغة الفكرة والعميل وطريقة الربح قبل التعمق.', icon: Heart },
  { mode: 'easy', title: 'النموذج الاحترافي', description: 'تحليل موجه لبناء دراسة جدوى أكثر انضباطاً واستعداداً للتطوير.', icon: Zap },
  { mode: 'mit24', title: 'MIT 24 Steps', description: 'منهجية عميقة خطوة بخطوة لبناء المشروع والتحقق من منطقه التجاري.', icon: Rocket },
  { mode: 'bmc', title: 'بناء نموذج العمل BMC', description: 'لوحة منظمة لفهم عناصر المشروع وعلاقاتها الأساسية.', icon: LayoutGrid },
];

const ToolIntroPanel: React.FC<{ mode: IntroMode; onStart: () => void; onBack?: () => void; onViewExample: () => void }> = ({ mode, onStart, onBack, onViewExample }) => {
  const intro = TOOL_INTROS[mode];
  const IntroIcon = intro.icon;

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 sm:px-4 lg:px-5">
      <Card className="overflow-hidden bg-background shadow-none">
        <CardContent className="grid gap-4 p-4 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)] xl:p-5">
          <div className="flex flex-col justify-between gap-4 text-right">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <IntroIcon className="size-4" />
                </span>
                <Badge variant="secondary" className="w-fit">{intro.badge}</Badge>
              </div>
              <div className="space-y-1.5">
                <CardTitle className="text-xl sm:text-2xl">{intro.title}</CardTitle>
                <CardDescription className="line-clamp-4 max-w-2xl text-sm leading-6">{intro.summary}</CardDescription>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {onBack ? (
                <Button type="button" size="sm" variant="outline" onClick={onBack}>
                  العودة للأدوات
                </Button>
              ) : null}
              <Button type="button" size="sm" onClick={onStart}>
                إنشاء دراسة جدوى مشروع
              </Button>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <ExplanationCard title="كيف تبني الدراسة بهذا المسار؟" items={intro.steps} />
            <ExplanationCard title="ماذا ستحصل في النهاية؟" items={intro.outcomes} />
            <ExampleCard example={intro.example} onViewExample={onViewExample} />
          </div>
        </CardContent>
      </Card>

      <ModeProjectsSection mode={mode} />
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
  const [isViewingExample, setIsViewingExample] = useState(false);

  useEffect(() => {
    setMode(initialMode);
    setHasStarted(initialMode === 'selection');
    setIsViewingExample(false);
  }, [initialMode]);

  const isIntroMode = mode === 'family' || mode === 'easy' || mode === 'mit24' || mode === 'bmc';

  if (isViewingExample && isIntroMode) {
    return <ExampleViewer mode={mode as IntroMode} onBack={() => setIsViewingExample(false)} />;
  }

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
        mode={mode as IntroMode}
        onStart={() => setHasStarted(true)}
        onBack={initialMode === 'selection' ? () => setMode('selection') : undefined}
        onViewExample={() => setIsViewingExample(true)}
      />
    );
  }

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-3 py-3 sm:px-4 lg:px-5">
      <Card className="bg-background shadow-none">
        <CardHeader className="gap-2 p-4 sm:p-5">
          <Badge variant="secondary" className="w-fit">بناء دراسة جدوى مشروع</Badge>
          <div className="space-y-2">
            <CardTitle className="text-xl sm:text-2xl">اختر أداة بناء الدراسة المناسبة</CardTitle>
            <CardDescription className="line-clamp-3 max-w-3xl text-sm leading-6">
              اختر المسار الأقرب لمرحلة مشروعك الحالية. كل أداة تبدأ بشرح واضح لما ستفعله، ثم تنتقل إلى التنفيذ داخل نفس الصفحة.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
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
              className="rounded-lg bg-muted/30 p-4 text-right transition-colors hover:bg-muted/50"
            >
              <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-background text-foreground">
                <Icon className="size-5" />
              </div>
              <p className="text-sm font-semibold text-foreground">{tool.title}</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{tool.description}</p>
            </button>
          );
        })}
      </div>

      <Card className="bg-muted/20 shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">كيف تختار المسار المناسب؟</CardTitle>
          <CardDescription>اختر الأداة بحسب مستوى النضج الحالي للمشروع.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <GuideCard title="بداية سريعة" text="ابدأ بالنموذج السهل إذا كانت الفكرة ما زالت في أول صياغتها وتحتاج إلى ترتيب سريع." />
          <GuideCard title="قرار أوضح" text="استخدم النموذج الاحترافي عندما تريد قراءة أكثر تنظيماً للسوق والجاهزية." />
          <GuideCard title="تفصيل أعمق" text="انتقل إلى MIT 24 Steps أو BMC إذا كنت تبني هيكلاً شاملاً للمشروع." />
        </CardContent>
      </Card>

      <Card className="bg-muted/20 shadow-none">
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

      <Card className="bg-muted/20 shadow-none">
        <CardContent className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Lightbulb className="size-4 text-foreground" />
              <p className="text-sm font-semibold text-foreground">هل تحتاج إلى ترشيح أسرع؟</p>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              ابدأ من النموذج السهل إذا كنت تريد صياغة الفكرة بسرعة، ثم انتقل إلى الأدوات الأعمق عند الحاجة.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setMode('family');
              setHasStarted(false);
              setSubTabLabel('النموذج السهل');
            }}
          >
            ابدأ بالنموذج السهل
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

function ExplanationCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="h-full bg-muted/20 shadow-none">
      <CardHeader className="px-3 py-3">
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 px-3 pb-3 pt-0">
        {items.map((item, index) => (
          <div key={item} className="grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2 rounded-md bg-background/80 px-3 py-2 text-right">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              {index + 1}
            </span>
            <p className="text-xs leading-5 text-foreground">{item}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ModeProjectsSection({ mode }: { mode: IntroMode }) {
  const intro = TOOL_INTROS[mode];
  const [projectsList, setProjectsList] = useState<SectionProject[]>([]);

  useEffect(() => {
    setProjectsList(SECTION_PROJECTS[mode]);
  }, [mode]);

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من رغبتك في حذف مشروع "${name}"؟`)) {
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
      SECTION_PROJECTS[mode] = SECTION_PROJECTS[mode].filter((p) => p.id !== id);
    }
  };

  const handleShare = (name: string) => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `مشروع: ${name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(`${window.location.href}?project=${encodeURIComponent(name)}`);
      alert(`تم نسخ رابط المشاركة لمشروع "${name}" إلى الحافظة!`);
    }
  };

  const Icon = intro.icon;

  return (
    <Card className="shadow-none">
      <CardHeader className="gap-1 p-4">
        <CardTitle className="text-lg">{intro.projectLabel}</CardTitle>
        <CardDescription>
          تظهر هنا فقط المشاريع التي تم إنشاؤها من هذا المسار، بنفس أسلوب جدول مشاريعي.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="hidden overflow-hidden rounded-md lg:block">
          <Table dir="rtl">
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[260px]">المشروع</TableHead>
                <TableHead className="w-[125px]">إجراءات</TableHead>
                <TableHead className="w-[100px]">التقدم</TableHead>
                <TableHead className="min-w-[130px]">الحالة</TableHead>
                <TableHead className="min-w-[130px]">آخر تعديل</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsList.map((project) => (
                <ProjectRow 
                  key={project.id} 
                  project={project} 
                  onDelete={handleDelete}
                  onShare={handleShare}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-3 lg:hidden">
          {projectsList.map((project) => (
            <Card key={project.id} className="p-4 shadow-none">
              <div className="flex items-start justify-between gap-3">
                <ProjectStatusBadge status={project.status} />
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => {
                      alert(`جاري فتح المشروع "${project.name}"...`);
                    }}
                    title="تعديل"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleShare(project.name)}
                    title="مشاركة"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Share2 className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(project.id, project.name)}
                    title="حذف"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-right">
                <h3 className="truncate text-sm font-medium text-foreground">{project.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{project.sector}</p>
              </div>
              <div className="mt-3">
                <ProgressSummary progress={project.progress} />
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectRow({
  project,
  onDelete,
  onShare,
}: {
  project: SectionProject;
  onDelete: (id: string, name: string) => void;
  onShare: (name: string) => void;
}) {
  return (
    <TableRow>
      <TableCell>
        <div className="min-w-0 text-right">
          <p className="max-w-[260px] truncate text-sm font-medium leading-5 text-foreground">{project.name}</p>
          <p className="truncate text-xs leading-5 text-muted-foreground">{project.sector}</p>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => {
              alert(`جاري فتح المشروع "${project.name}"...`);
            }}
            title="تعديل"
            className="text-muted-foreground hover:text-primary"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onShare(project.name)}
            title="مشاركة"
            className="text-muted-foreground hover:text-primary"
          >
            <Share2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(project.id, project.name)}
            title="حذف"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </TableCell>
      <TableCell>
        <ProgressSummary progress={project.progress} />
      </TableCell>
      <TableCell>
        <ProjectStatusBadge status={project.status} />
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="size-4" />
          {project.updated}
        </span>
      </TableCell>
    </TableRow>
  );
}

function ModelBadge({ label, icon: Icon }: { label: string; icon: React.ElementType }) {
  return (
    <Badge variant="outline" className="gap-1.5 bg-background">
      <Icon className="size-3.5" />
      {label}
    </Badge>
  );
}

function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  const Icon = meta.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${meta.className}`}>
      <Icon className="size-3.5" />
      {meta.label}
    </span>
  );
}

function ProgressSummary({ progress }: { progress: number }) {
  return (
    <span className="text-sm font-medium tabular-nums text-foreground">{progress}%</span>
  );
}

function GuideCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl bg-background/80 p-4">
      <p className="mb-2 text-sm font-semibold text-foreground">{title}</p>
      <p className="text-xs leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}

function ExampleCard({ example, onViewExample }: { example: ToolIntro['example']; onViewExample: () => void }) {
  return (
    <Card className="h-full border border-primary/20 bg-primary/5 shadow-none relative overflow-hidden flex flex-col">
      <div className="absolute right-0 top-0 w-1 h-full bg-primary" />
      <CardHeader className="px-4 py-3 pb-2">
        <CardTitle className="text-sm text-primary flex items-center gap-2">
          <Lightbulb className="size-4" />
          مثال توضيحي للنتيجة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4 pt-0 flex-1 flex flex-col">
        <div>
          <h4 className="font-bold text-foreground text-sm">{example.name}</h4>
          <p className="text-[11px] font-bold text-primary mt-0.5">{example.sector}</p>
        </div>
        <p className="text-xs leading-5 text-muted-foreground flex-1">{example.description}</p>
        <div className="pt-3 mt-auto">
          <Button type="button" variant="default" className="w-full text-xs" onClick={onViewExample}>
            عرض المثال كاملاً
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
