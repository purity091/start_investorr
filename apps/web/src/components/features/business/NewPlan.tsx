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
  RefreshCcw,
  Target,
} from 'lucide-react';

import SmartBeginnerPro from '../../../features/easy-mode/SmartBeginnerPro';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { IdeaCreation, CreationMode } from './IdeaCreation';
import { ExampleViewer } from './ExampleViewer';
import LeanStartupWizard from '@/features/business/LeanStartupWizard';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';

type ToolMode = 'selection' | 'easy' | 'ai' | 'family' | 'bmc' | 'mit24' | 'lean';
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
  lean: {
    title: 'منهجية Lean Startup',
    badge: 'دورة التعلم',
    projectLabel: 'مشاريع Lean Startup',
    projectShortLabel: 'Lean',
    icon: RefreshCcw,
    summary:
      'Lean Startup ليس نموذجاً لملء البيانات، بل هو رحلة استكشاف وتجربة (Build → Measure → Learn). يبدأ من الفرضيات، يقيس أهميتها، ويساعدك في تصميم تجارب حقيقية (مثل المقابلات، صفحات الهبوط، والـ MVP) للتحقق منها بناءً على بيانات فعلية قبل كتابة سطر كود واحد.',
    steps: [
      'تحدد المشكلة والعميل ليقوم النظام بإنشاء الفرضيات تلقائياً.',
      'تقيّم الفرضيات وترتبها من الأخطر إلى الأقل خطورة.',
      'تختار أسلوب الاختبار لكل فرضية وتصمم التجربة بوضوح.',
      'تُدخل النتائج ليحللها النظام ويوجهك للقرار: استمر، أو عدل، أو غيّر مسارك تماماً (Pivot).',
    ],
    outcomes: [
      'فهم عميق للاحتياج الحقيقي للعميل قبل استثمار الأموال.',
      'قائمة واضحة بالفرضيات الحرجة واختباراتها.',
      'نسب نجاح مدعمة ببيانات حقيقية (كم عدد الزوار، من اشترى؟).',
      'قرار مبني على التعلم الحقيقي يساعد في تجنب الفشل المكلف.',
    ],
    example: {
      name: 'DeliverNow - توصيل سريع',
      sector: 'Logistics',
      description: 'نموذج لاختبار ما إذا كانت المطاعم مستعدة للدفع مقابل نظام إدارة أسطول المناديب المستقلين.',
      points: [
        'أخطر فرضية: المطاعم ستدفع اشتراكاً شهرياً.',
        'التجربة: صفحة هبوط وهمية بإعلانات مستهدفة.',
        'النتيجة: 45 تسجيل اهتمام، مما أدى لقرار بالاستمرار وبناء MVP.'
      ]
    }
  },
};

const SECTION_PROJECTS: Record<IntroMode, SectionProject[]> = {
  family: [
    { id: 'example-family-1', name: 'منصة الحصاد الذكي (مثال)', sector: 'AgriTech', status: 'review', progress: 65, updated: 'منذ 5 ساعات' },
  ],
  easy: [
    { id: 'example-easy-1', name: 'أكاديمية الذكاء الاصطناعي (مثال)', sector: 'EdTech', status: 'ready', progress: 95, updated: 'منذ ساعتين' },
  ],
  mit24: [
    { id: 'example-mit-1', name: 'بوابة الدفع الإقليمية (مثال)', sector: 'FinTech', status: 'draft', progress: 23, updated: 'أمس' },
  ],
  bmc: [
    { id: 'example-bmc-1', name: 'عقارات افتراضية (مثال)', sector: 'Property', status: 'ready', progress: 97, updated: 'منذ يومين' },
  ],
  lean: [
    { id: 'example-lean-1', name: 'تطبيق مناديب (مثال)', sector: 'Logistics', status: 'review', progress: 40, updated: 'قبل ساعة' },
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
  { mode: 'lean', title: 'منهجية Lean Startup', description: 'دورة تفاعلية (تبني، تقيس، تتعلم) لاختبار الفرضيات قبل التنفيذ.', icon: RefreshCcw },
];

const ToolIntroPanel: React.FC<{ mode: IntroMode; onStart: () => void; onBack?: () => void; onViewExample: () => void }> = ({ mode, onStart, onBack, onViewExample }) => {
  const intro = TOOL_INTROS[mode];
  const IntroIcon = intro.icon;

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      {/* Header Info */}
      <div className="flex flex-col gap-6 text-right">
        <div className="flex items-start gap-4">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20">
            <IntroIcon className="size-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{intro.title}</h1>
              <Badge variant="secondary" className="bg-muted/50 text-xs sm:text-sm">{intro.badge}</Badge>
            </div>
            <p className="max-w-4xl text-sm leading-8 text-muted-foreground sm:text-base sm:leading-8">
              {intro.summary}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" size="lg" className="px-8 font-semibold shadow-sm" onClick={onStart}>
            إنشاء دراسة عبر {intro.title}
          </Button>
          {onBack && (
            <Button type="button" size="lg" variant="outline" className="px-8 shadow-sm" onClick={onBack}>
              العودة للخيارات
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ExplanationCard title="كيف تبني الدراسة بهذا المسار؟" items={intro.steps} />
        <ExplanationCard title="ماذا ستحصل في النهاية؟" items={intro.outcomes} />
        <ExampleCard example={intro.example} onViewExample={onViewExample} />
      </div>

      <div className="pt-4">
        <ModeProjectsSection mode={mode} />
      </div>
    </div>
  );
};

export const NewPlan: React.FC<{
  onStart: (id: string) => void;
  onBuildPlan?: () => void;
  setSubTabLabel: (label: string | null) => void;
  subTabLabel?: string | null;
  initialMode?: 'selection' | 'easy' | 'family' | 'bmc' | 'mit24' | 'lean';
}> = ({ onStart, onBuildPlan, setSubTabLabel, initialMode = 'selection' }) => {
  const [mode, setMode] = useState<ToolMode>(initialMode);
  const [hasStarted, setHasStarted] = useState(initialMode === 'selection');
  const [isViewingExample, setIsViewingExample] = useState(false);

  const isIntroMode = mode === 'family' || mode === 'easy' || mode === 'mit24' || mode === 'bmc' || mode === 'lean';

  if (isViewingExample && isIntroMode) {
    return <ExampleViewer mode={mode as IntroMode} onBack={() => setIsViewingExample(false)} />;
  }

  if (mode === 'easy' && hasStarted) {
    return <SmartBeginnerPro />;
  }

  if (mode === 'lean' && hasStarted) {
    return <LeanStartupWizard />;
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
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-3 mb-2">
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10 border-0">بناء دراسة جدوى مشروع</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">اختر أداة بناء الدراسة المناسبة</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
          اختر المسار الأقرب لمرحلة مشروعك الحالية. كل أداة تبدأ بشرح واضح لما ستفعله، ثم تنتقل إلى التنفيذ داخل نفس الصفحة.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6 items-start">
        {/* Main Content: Tools Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
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
                className="group flex flex-col items-start gap-4 rounded-xl border border-border/60 bg-card p-6 text-right transition-all hover:border-primary/40 hover:bg-muted/20 hover:shadow-md"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Content: Helpers */}
        <div className="flex flex-col gap-4">
          <Card className="shadow-sm border-border/60">
            <CardHeader className="pb-3 border-b border-border/40 bg-muted/20">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Target className="size-4 text-primary" />
                كيف تختار المسار المناسب؟
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  بداية سريعة
                </h4>
                <p className="text-xs leading-5 text-muted-foreground mr-3.5">ابدأ بالنموذج السهل إذا كانت الفكرة ما زالت في أول صياغتها وتحتاج إلى ترتيب سريع.</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  قرار أوضح
                </h4>
                <p className="text-xs leading-5 text-muted-foreground mr-3.5">استخدم النموذج الاحترافي عندما تريد قراءة أكثر تنظيماً للسوق والجاهزية.</p>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  تفصيل أعمق
                </h4>
                <p className="text-xs leading-5 text-muted-foreground mr-3.5">انتقل إلى MIT 24 Steps أو BMC إذا كنت تبني هيكلاً شاملاً للمشروع.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-primary/20 bg-primary/5">
            <CardContent className="p-5 flex flex-col gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="size-4 text-primary" />
                  <h4 className="text-sm font-bold text-primary">هل تحتاج إلى ترشيح أسرع؟</h4>
                </div>
                <p className="text-xs leading-5 text-muted-foreground">
                  ابدأ من النموذج السهل إذا كنت تريد صياغة الفكرة بسرعة، ثم انتقل إلى الأدوات الأعمق عند الحاجة.
                </p>
              </div>
              <Button
                type="button"
                variant="default"
                size="sm"
                className="w-full text-xs font-semibold"
                onClick={() => {
                  setMode('family');
                  setHasStarted(false);
                  setSubTabLabel('النموذج السهل');
                }}
              >
                ابدأ بالنموذج السهل فوراً
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/60">
            <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3 border-b border-border/40">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <Layers className="size-4 text-muted-foreground" />
                قوالب بداية سريعة
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-4 sm:pt-4 flex flex-col gap-2">
              {TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => onStart(template.id)}
                  className="rounded-lg bg-muted/30 p-3 text-right transition-colors hover:bg-muted/60 border border-transparent hover:border-border/50"
                >
                  <h4 className="mb-1 text-xs font-bold text-foreground">{template.title}</h4>
                  <p className="text-[11px] leading-5 text-muted-foreground">{template.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

function ExplanationCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="h-full border-border/60 shadow-sm bg-card">
      <CardHeader className="border-b border-border/40 bg-muted/20 px-4 sm:px-5 py-4">
        <CardTitle className="text-base text-foreground font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-5">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={item} className="flex items-start gap-3 text-right">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary ring-1 ring-primary/20">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ModeProjectsSection({ mode }: { mode: IntroMode }) {
  const intro = TOOL_INTROS[mode];
  const { user } = useAuth();
  const [projectsList, setProjectsList] = useState<SectionProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDeleteProject, setPendingDeleteProject] = useState<SectionProject | null>(null);
  const [pendingShareProject, setPendingShareProject] = useState<SectionProject | null>(null);
  const [notice, setNotice] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('business_canvas')
          .select('id, project_title, sector_label, current_stage, readiness_score, canvas_data, updated_at')
          .eq('user_id', user.id)
          .is('deleted_at', null)
          .order('updated_at', { ascending: false });

        if (error) throw error;

        let realProjects: SectionProject[] = [];
        if (data) {
          realProjects = data.map((row) => ({
            id: row.id,
            name: row.project_title || 'مشروع بدون اسم',
            sector: row.sector_label || row.canvas_data?.profile?.sectorLabel || 'غير محدد',
            status: (row.current_stage || row.canvas_data?.currentStage) === 'execution' ? 'ready' : 'review',
            progress: row.readiness_score ?? row.canvas_data?.metrics?.readinessScore ?? 0,
            updated: new Date(row.updated_at).toLocaleDateString('ar-SA'),
          }));
        }
        
        // Show real projects plus the example projects for this mode
        setProjectsList([...realProjects, ...SECTION_PROJECTS[mode]]);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [mode, user]);

  const handleDelete = (project: SectionProject) => {
    setPendingDeleteProject(project);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteProject) return;

    const { id } = pendingDeleteProject;

    try {
      if (!id.startsWith('example')) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const { error } = await supabase
          .from('business_canvas')
          .update({ deleted_at: new Date().toISOString() })
          .eq('id', id)
          .eq('user_id', user?.id ?? '');

        if (error) throw error;
      }

      setProjectsList((prev) => prev.filter((p) => p.id !== id));
      SECTION_PROJECTS[mode] = SECTION_PROJECTS[mode].filter((p) => p.id !== id);
      setPendingDeleteProject(null);
    } catch (err) {
      console.error('Error deleting project:', err);
      setNotice({
        title: 'تعذر حذف المشروع',
        description: 'حدث خطأ أثناء حذف المشروع. حاول مرة أخرى بعد لحظات.',
      });
    }
  };

  const handleShare = (project: SectionProject) => {
    if (project.id.startsWith('example')) {
      setNotice({
        title: 'لا يمكن مشاركة المثال التجريبي',
        description: 'أنشئ مشروعاً حقيقياً أولاً حتى تتمكن من إنشاء رابط مشاركة عام.',
      });
      return;
    }

    setPendingShareProject(project);
  };

  const confirmShare = async () => {
    if (!pendingShareProject) return;

    try {
      const response = await fetch('/api/projects/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: pendingShareProject.id, isPublic: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to publish project');
      }

      const result = (await response.json()) as { shareToken?: string | null };
      const shareId = result.shareToken || pendingShareProject.id;
      const shareUrl = `${window.location.origin}/share/${shareId}`;

      if (navigator.share) {
        await navigator.share({
          title: pendingShareProject.name,
          text: `مشاهدة مشروع: ${pendingShareProject.name}`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }

      setPendingShareProject(null);
      setNotice({
        title: 'تم تجهيز رابط المشاركة',
        description: 'تم تفعيل الرابط العام ونسخه إلى الحافظة عند توفر صلاحية النسخ.',
      });
    } catch (err) {
      console.error('Error sharing:', err);
      setNotice({
        title: 'تعذر إعداد رابط المشاركة',
        description: 'حدث خطأ أثناء إنشاء الرابط العام. حاول مرة أخرى بعد لحظات.',
      });
    }
  };

  const { loadProject } = useProjectWorkspace();

  const handleOpenProject = async (project: SectionProject) => {
    if (!project.id.startsWith('example')) {
      await loadProject(project.id);
    }
    // Note: We need a way to navigate to the editor here if required,
    // but NewPlan doesn't receive setActiveTab by default for this component.
    // Instead we can dispatch the event AppShell uses to navigate:
    window.dispatchEvent(new CustomEvent('khotta:navigate', { detail: { tab: 'editor', path: '/editor' } }));
  };

  const Icon = intro.icon;

  return (
    <>
    <Card className="shadow-none">
      <CardHeader className="gap-1 p-4 sm:p-6">
        <CardTitle className="text-lg">{intro.projectLabel}</CardTitle>
        <CardDescription>
          تظهر هنا فقط المشاريع التي تم إنشاؤها من هذا المسار، بنفس أسلوب جدول مشاريعي.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
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
                  onOpen={() => handleOpenProject(project)}
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
                    onClick={() => handleOpenProject(project)}
                    title="تعديل"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleShare(project)}
                    title="مشاركة"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Share2 className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(project)}
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
    <ProjectActionDialog
      open={Boolean(pendingDeleteProject)}
      title="حذف المشروع"
      description={`سيتم حذف مشروع "${pendingDeleteProject?.name ?? ''}" من قائمتك.`}
      confirmLabel="حذف المشروع"
      confirmVariant="destructive"
      onClose={() => setPendingDeleteProject(null)}
      onConfirm={confirmDelete}
    />
    <ProjectActionDialog
      open={Boolean(pendingShareProject)}
      title="إنشاء رابط مشاركة"
      description={`سيصبح مشروع "${pendingShareProject?.name ?? ''}" متاحاً لكل من لديه الرابط.`}
      confirmLabel="إنشاء الرابط"
      onClose={() => setPendingShareProject(null)}
      onConfirm={confirmShare}
    />
    <NoticeDialog notice={notice} onClose={() => setNotice(null)} />
    </>
  );
}

function ProjectActionDialog({
  open,
  title,
  description,
  confirmLabel,
  confirmVariant = 'default',
  onClose,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  confirmVariant?: React.ComponentProps<typeof Button>['variant'];
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="sm:max-w-[440px]" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function NoticeDialog({
  notice,
  onClose,
}: {
  notice: { title: string; description: string } | null;
  onClose: () => void;
}) {
  return (
    <Dialog open={Boolean(notice)} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent className="sm:max-w-[420px]" dir="rtl">
        <DialogHeader className="text-right">
          <DialogTitle>{notice?.title}</DialogTitle>
          <DialogDescription>{notice?.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>حسناً</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProjectRow({
  project,
  onDelete,
  onShare,
  onOpen,
}: {
  project: SectionProject;
  onDelete: (project: SectionProject) => void;
  onShare: (project: SectionProject) => void;
  onOpen: () => void;
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
            onClick={onOpen}
            title="تعديل"
            className="text-muted-foreground hover:text-primary"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onShare(project)}
            title="مشاركة"
            className="text-muted-foreground hover:text-primary"
          >
            <Share2 className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(project)}
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
    <Card className="h-full border-primary/20 bg-primary/5 shadow-sm relative overflow-hidden flex flex-col">
      <div className="absolute right-0 top-0 w-1 h-full bg-primary/70" />
      <CardHeader className="border-b border-primary/10 bg-primary/10 px-4 sm:px-5 py-4">
        <CardTitle className="text-base text-primary flex items-center gap-2 font-semibold">
          <Lightbulb className="size-4" />
          مثال توضيحي للنتيجة
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4 sm:p-5 pt-4 sm:pt-4 flex-1 flex flex-col text-right">
        <div>
          <h4 className="font-bold text-foreground text-sm">{example.name}</h4>
          <Badge variant="outline" className="mt-2 bg-background/50 border-primary/20 text-primary">{example.sector}</Badge>
        </div>
        <p className="text-sm leading-6 text-muted-foreground flex-1">{example.description}</p>
        <div className="pt-3 mt-auto">
          <Button type="button" variant="outline" className="w-full bg-background/50 shadow-sm hover:bg-primary hover:text-primary-foreground border-primary/20" onClick={onViewExample}>
            عرض المثال كاملاً
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
