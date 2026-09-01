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
  BookOpen,
  Plus,
  Calendar,
  Eye,
  FolderKanban,
  ExternalLink,
  Search,
  Check,
  Globe,
  X,
} from 'lucide-react';

import SmartBeginnerPro from '../../../features/easy-mode/SmartBeginnerPro';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Input } from '../../ui/Input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { IdeaCreation, CreationMode } from './IdeaCreation';
import { ExampleViewer } from './ExampleViewer';
import LeanStartupWizard from '@/features/business/LeanStartupWizard';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';
import { getProjectEditPath } from '@/features/workspace/workspaceNavigation';
import { cn } from '@/lib/utils';
import { shareProject } from '@/lib/projectSharing';
import { ErrorState, OfflineState, PageSectionSkeleton } from '@/components/ui/PageStates';

type ToolMode = 'selection' | 'easy' | 'ai' | 'family' | 'bmc' | 'mit24' | 'lean';
type IntroMode = Exclude<ToolMode, 'selection' | 'ai'>;
type ProjectStatus = 'ready' | 'review' | 'draft';

const isEditableMode = (value: unknown): value is IntroMode =>
  value === 'family' || value === 'easy' || value === 'bmc' || value === 'mit24' || value === 'lean';

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
  description?: string;
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
    {
      id: 'example-family-linksync',
      name: 'LinkSync - أداة ربط الحسابات',
      sector: 'Micro SaaS - أدوات مطورين',
      status: 'ready',
      progress: 100,
      updated: 'مثال توضيحي',
      description: 'أداة سحابية خفيفة تربط بين منصات الدفع وخدمات البريد الإلكتروني للمتاجر الصغيرة دون الحاجة لأي كود.'
    },
  ],
  easy: [
    {
      id: 'example-easy-formai',
      name: 'FormAI - صانع نماذج ذكي',
      sector: 'Micro SaaS - إنتاجية وتسويق',
      status: 'ready',
      progress: 95,
      updated: 'مثال توضيحي',
      description: 'منصة لإنشاء نماذج جمع البيانات باستخدام الذكاء الاصطناعي مع تحليلات متقدمة ودعم كامل للغة العربية.'
    },
  ],
  mit24: [
    {
      id: 'example-mit-clinicsync',
      name: 'ClinicSync - حجز العيادات السحابي',
      sector: 'Micro SaaS - تقنية صحية',
      status: 'ready',
      progress: 88,
      updated: 'مثال توضيحي',
      description: 'نظام حجز وإدارة مبسط جداً لعيادات الأسنان المستقلة للحد من تغيب المرضى عبر رسائل واتساب آلية.'
    },
  ],
  bmc: [
    {
      id: 'example-bmc-menuqr',
      name: 'MenuQR - منيو المطاعم التفاعلي',
      sector: 'Micro SaaS - ضيافة ومطاعم',
      status: 'ready',
      progress: 92,
      updated: 'مثال توضيحي',
      description: 'خدمة سريعة لتحويل قوائم الطعام التقليدية إلى قوائم رقمية تفاعلية بمسح الـ QR للمقاهي والمطاعم.'
    },
  ],
  lean: [
    {
      id: 'example-lean-delivernow',
      name: 'DeliverNow - توصيل سريع',
      sector: 'Logistics - خدمات لوجستية',
      status: 'review',
      progress: 60,
      updated: 'مثال توضيحي',
      description: 'نموذج لاختبار ما إذا كانت المطاعم مستعدة للدفع مقابل نظام إدارة أسطول المناديب المستقلين.'
    },
  ],
};

const STATUS_META: Record<ProjectStatus, { label: string; className: string; dotClass: string; icon: React.ElementType }> = {
  ready: { label: 'جاهز ومكتمل', className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20', dotClass: 'bg-emerald-500', icon: CheckCircle2 },
  review: { label: 'قيد التطوير', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20', dotClass: 'bg-amber-500 animate-pulse', icon: Clock },
  draft: { label: 'مسودة أولية', className: 'bg-muted text-muted-foreground border-border/60', dotClass: 'bg-slate-400', icon: Sparkles },
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

const ToolIntroPanel: React.FC<{
  mode: IntroMode;
  onStart: () => void;
  onBack?: () => void;
  onViewExample: () => void;
  isStarting?: boolean;
}> = ({ mode, onStart, onBack, onViewExample, isStarting = false }) => {
  const intro = TOOL_INTROS[mode];

  return (
    <div dir="rtl" className="flex w-full flex-col gap-4 px-2 py-2 sm:px-4 lg:px-6 text-right">
      {/* Header Info - Borderless and clean matching SmartBeginnerPro */}
      <div className="flex flex-col gap-2 bg-background px-0 py-1">
        <div className="flex items-start gap-3">
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{intro.title}</h1>
              {onBack && (
                <Button type="button" size="sm" variant="ghost" className="mr-auto font-medium text-xs h-7 text-muted-foreground hover:text-foreground" onClick={onBack}>
                  العودة للخيارات
                </Button>
              )}
            </div>
            <p className="max-w-4xl text-xs sm:text-sm leading-6 text-muted-foreground">
              {intro.summary}
            </p>
          </div>
        </div>
      </div>

      {/* HERO INTERACTIVE CONTAINER: TABLE WITH INLINE "CREATE STUDY" ACTION */}
      <div className="space-y-2">
        <ModeProjectsSection
          mode={mode}
          onStart={onStart}
          onViewExample={onViewExample}
          isStarting={isStarting}
        />
      </div>

      {/* EXPLANATORY CARDS (الشروحات والتوضيحات) */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <h2 className="text-base font-bold text-foreground flex items-center gap-2">
            <BookOpen className="size-4.5 text-primary" />
            دليل وشرح مسار العمل في {intro.title}
          </h2>
          <span className="text-xs text-muted-foreground">مرجع إرشادي لتوضيح خطوات ومخرجات بناء الفكرة</span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ExplanationCard title="كيف تبني الدراسة بهذا المسار؟" items={intro.steps} />
          <ExplanationCard title="ماذا ستحصل في النهاية؟" items={intro.outcomes} />
        </div>
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
  editProjectId?: string | null;
  fallbackEditor?: React.ReactNode;
}> = ({
  onBuildPlan,
  setSubTabLabel,
  initialMode = 'selection',
  editProjectId = null,
  fallbackEditor,
}) => {
  const { createProject, loadProject, activeProjectId } = useProjectWorkspace();
  const [mode, setMode] = useState<ToolMode>(initialMode);
  const [hasStarted, setHasStarted] = useState(initialMode === 'selection' && !editProjectId);
  const [isViewingExample, setIsViewingExample] = useState(false);
  const [isStartingProject, setIsStartingProject] = useState(false);
  const [isLoadingEditProject, setIsLoadingEditProject] = useState(Boolean(editProjectId));
  const [useFallbackEditor, setUseFallbackEditor] = useState(false);
  const [editProjectError, setEditProjectError] = useState<string | null>(null);
  const [projectName, setProjectName] = useState('');
  const [projectSector, setProjectSector] = useState('التجارة الإلكترونية والتجزئة');
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>(['المملكة العربية السعودية']);
  const [marketSearchQuery, setMarketSearchQuery] = useState('');
  const [customerType, setCustomerType] = useState('B2C - أفراد ومستهلكين');
  const [opportunitySummary, setOpportunitySummary] = useState('');
  const [projectCreationError, setProjectCreationError] = useState<string | null>(null);
  const [pendingStart, setPendingStart] = useState<
    { type: 'mode'; mode: IntroMode } | { type: 'template'; template: Template } | null
  >(null);
  const canUseFallbackEditor = Boolean(fallbackEditor);

  const ALL_INDIVIDUAL_COUNTRIES = [
    'المملكة العربية السعودية',
    'الإمارات العربية المتحدة',
    'الكويت',
    'قطر',
    'سلطنة عمان',
    'البحرين',
    'جمهورية مصر العربية',
    'الأردن',
    'العراق',
    'المغرب',
    'تونس',
    'الجزائر',
    'لبنان',
    'فلسطين',
    'ليبيا',
    'السودان',
    'اليمن',
    'سوريا',
    'موريتانيا',
    'الصومال',
    'جيبوتي',
    'جزر القمر',
    'الولايات المتحدة الأمريكية',
    'المملكة المتحدة',
    'تركيا',
    'ألمانيا',
    'فرنسا',
    'الصين',
    'الهند',
    'كندا',
    'أستراليا',
    'ماليزيا',
    'إندونيسيا',
    'دول أخرى / سوق عالمي',
  ];

  const filteredCountries = ALL_INDIVIDUAL_COUNTRIES.filter((country) =>
    country.toLowerCase().includes(marketSearchQuery.trim().toLowerCase())
  );

  const isIntroMode = mode === 'family' || mode === 'easy' || mode === 'mit24' || mode === 'bmc' || mode === 'lean';

  useEffect(() => {
    if (!editProjectId) return;

    let cancelled = false;

    void loadProject(editProjectId).then((loadedWorkspace) => {
      if (cancelled) return;

      const savedModes = Object.keys(loadedWorkspace?.feasibilityModels || {});
      const projectMode = loadedWorkspace?.feasibilityModelType || savedModes[0];

      if (!loadedWorkspace) {
        setEditProjectError('تعذر العثور على المشروع أو لا تملك صلاحية الوصول إليه.');
        setIsLoadingEditProject(false);
        return;
      }

      if (!isEditableMode(projectMode)) {
        if (canUseFallbackEditor) {
          setUseFallbackEditor(true);
          setHasStarted(true);
          setIsLoadingEditProject(false);
          return;
        }

        setEditProjectError('نوع نموذج هذا المشروع غير معروف أو غير قابل للتعديل من هذا المسار.');
        setIsLoadingEditProject(false);
        return;
      }

      setMode(projectMode);
      setHasStarted(true);
      setIsLoadingEditProject(false);
    });

    return () => {
      cancelled = true;
    };
  }, [canUseFallbackEditor, editProjectId, loadProject]);

  const startProject = () => {
    if (!isIntroMode || isStartingProject) return;
    const intro = TOOL_INTROS[mode as IntroMode];
    setProjectName('');
    setProjectSector('التجارة الإلكترونية والتجزئة');
    setSelectedMarkets(['المملكة العربية السعودية']);
    setMarketSearchQuery('');
    setCustomerType('B2C - أفراد ومستهلكين');
    setOpportunitySummary('');
    setProjectCreationError(null);
    setPendingStart({ type: 'mode', mode: mode as IntroMode });
    setSubTabLabel(intro.title);
  };

  const startTemplateProject = (template: Template) => {
    if (isStartingProject) return;
    setProjectName('');
    if (template.id === 'saas') {
      setProjectSector('التقنية والبرمجيات (SaaS)');
      setCustomerType('B2B - شركات ومؤسسات');
    } else if (template.id === 'retail') {
      setProjectSector('التجارة الإلكترونية والتجزئة');
      setCustomerType('B2C - أفراد ومستهلكين');
    } else if (template.id === 'services') {
      setProjectSector('الخدمات والاستشارات');
      setCustomerType('B2B - شركات ومؤسسات');
    } else {
      setProjectSector('التجارة الإلكترونية والتجزئة');
      setCustomerType('B2C - أفراد ومستهلكين');
    }
    setSelectedMarkets(['المملكة العربية السعودية']);
    setMarketSearchQuery('');
    setOpportunitySummary('');
    setProjectCreationError(null);
    setPendingStart({ type: 'template', template });
  };

  const closeProjectNameDialog = (force = false) => {
    if (isStartingProject && !force) return;
    setPendingStart(null);
    setProjectName('');
    setOpportunitySummary('');
    setMarketSearchQuery('');
    setProjectCreationError(null);
  };

  const confirmProjectCreation = async () => {
    if (!pendingStart || isStartingProject) return;
    const trimmedName = projectName.trim();
    if (!trimmedName) return;

    setIsStartingProject(true);
    setProjectCreationError(null);
    try {
      const projectMode = pendingStart.type === 'mode' ? pendingStart.mode : pendingStart.template.id;
      const targetMarketString = selectedMarkets.length > 0 ? selectedMarkets.join('، ') : 'المملكة العربية السعودية';

      const projectId = await createProject(trimmedName, projectMode, {
        sectorLabel: projectSector,
        targetMarket: targetMarketString,
        customerType,
        opportunitySummary: opportunitySummary.trim() || undefined,
      });

      if (projectId) {
        window.location.assign(getProjectEditPath(projectId));
        return;
      }

      setProjectCreationError('تعذر إنشاء المشروع في قاعدة البيانات. تحقق من الاتصال ثم حاول مرة أخرى.');
    } finally {
      setIsStartingProject(false);
    }
  };

  const projectNameDialog = (
    <Dialog open={Boolean(pendingStart)} onOpenChange={(open) => !open && closeProjectNameDialog()}>
      <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto border-0 shadow-2xs" dir="rtl">
        <DialogHeader className="text-right space-y-1 border-0">
          <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
            <Sparkles className="size-5 text-primary shrink-0" />
            تحديد بيانات وسياق المشروع الجديد
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            هذه المعلومات تُشكل القاعدة الأساسية لمساعد الذكاء الاصطناعي لتوليد تحليلات واقتراحات دقيقة ومخصصة لمشروعك.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-right">
          {/* Project Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              اسم المشروع <span className="text-destructive">*</span>
            </label>
            <Input
              autoFocus
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && projectName.trim()) {
                  event.preventDefault();
                  void confirmProjectCreation();
                }
              }}
              placeholder="مثال: منصة حجوزات العيادات الطبية"
              className="h-10 text-xs border-0 bg-muted/40 text-right focus:bg-background transition-colors"
            />
          </div>

          {/* Sector / Industry */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              قطاع المشروع / المجال
            </label>
            <Select value={projectSector} onValueChange={setProjectSector}>
              <SelectTrigger className="h-10 text-xs border-0 bg-muted/40 text-right">
                <SelectValue placeholder="اختر القطاع" />
              </SelectTrigger>
              <SelectContent dir="rtl" className="text-right border-0 shadow-md">
                <SelectItem value="التجارة الإلكترونية والتجزئة" className="text-xs">التجارة الإلكترونية والتجزئة</SelectItem>
                <SelectItem value="التقنية والبرمجيات (SaaS)" className="text-xs">التقنية والبرمجيات (SaaS)</SelectItem>
                <SelectItem value="الخدمات والاستشارات" className="text-xs">الخدمات والاستشارات</SelectItem>
                <SelectItem value="المطاعم والضيافة" className="text-xs">المطاعم والضيافة</SelectItem>
                <SelectItem value="التقنية الصحية (HealthTech)" className="text-xs">التقنية الصحية (HealthTech)</SelectItem>
                <SelectItem value="التعليم والتدريب (EdTech)" className="text-xs">التعليم والتدريب (EdTech)</SelectItem>
                <SelectItem value="الخدمات اللوجستية والنقل" className="text-xs">الخدمات اللوجستية والنقل</SelectItem>
                <SelectItem value="العقارات والإنشاءات" className="text-xs">العقارات والإنشاءات</SelectItem>
                <SelectItem value="الصناعة والإنتاج" className="text-xs">الصناعة والإنتاج</SelectItem>
                <SelectItem value="قطاع آخر" className="text-xs">قطاع آخر</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Target Market (Multi-Select & Searchable) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Globe className="size-3.5 text-primary shrink-0" />
                السوق المستهدف (حدد دولة أو مجموعة دول)
              </label>
              <div className="flex items-center gap-2">
                {selectedMarkets.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedMarkets([])}
                    className="text-[10px] text-muted-foreground hover:text-destructive font-medium cursor-pointer"
                  >
                    مسح الكل
                  </button>
                )}
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {selectedMarkets.length} مختارة
                </span>
              </div>
            </div>

            {/* Selected Pills */}
            {selectedMarkets.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-2 bg-muted/20 rounded-lg max-h-24 overflow-y-auto">
                {selectedMarkets.map((country) => (
                  <span
                    key={country}
                    className="inline-flex items-center gap-1 text-[11px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded-md shadow-2xs"
                  >
                    {country}
                    <button
                      type="button"
                      onClick={() => setSelectedMarkets((prev) => prev.filter((c) => c !== country))}
                      className="hover:bg-primary-foreground/20 cursor-pointer p-0.5 rounded-full transition-colors"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Search Input & Country Grid */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="size-3.5 text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <Input
                  value={marketSearchQuery}
                  onChange={(e) => setMarketSearchQuery(e.target.value)}
                  placeholder="ابحث عن دولة (مثال: السعودية، مصر، الإمارات...)"
                  className="h-9 text-xs border-0 bg-muted/40 pr-9 text-right focus:bg-background transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-40 overflow-y-auto p-1.5 bg-muted/20 rounded-lg">
                {filteredCountries.map((country) => {
                  const isSelected = selectedMarkets.includes(country);
                  return (
                    <button
                      key={country}
                      type="button"
                      onClick={() => {
                        setSelectedMarkets((prev) =>
                          isSelected ? prev.filter((c) => c !== country) : [...prev, country]
                        );
                      }}
                      className={cn(
                        'flex items-center justify-between p-2 rounded-md text-[11px] transition-all cursor-pointer text-right',
                        isSelected
                          ? 'bg-primary/10 text-primary font-bold shadow-2xs ring-1 ring-primary/30'
                          : 'bg-background/60 text-foreground hover:bg-muted font-medium'
                      )}
                    >
                      <span className="truncate">{country}</span>
                      {isSelected && <Check className="size-3 shrink-0 ms-1 text-primary" />}
                    </button>
                  );
                })}
                {filteredCountries.length === 0 && (
                  <p className="col-span-3 text-center text-xs text-muted-foreground py-3">
                    لا توجد نتائج تطابق &quot;{marketSearchQuery}&quot;
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Segment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              شريحة العملاء المستهدفة
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'B2C - أفراد ومستهلكين', label: 'B2C (أفراد)', desc: 'مستهلكين مباشرة' },
                { id: 'B2B - شركات ومؤسسات', label: 'B2B (شركات)', desc: 'أعمال ومؤسسات' },
                { id: 'B2B2C - شركات وأفراد', label: 'B2B2C (مزدوج)', desc: 'منصات ووساطة' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCustomerType(item.id)}
                  className={cn(
                    'flex flex-col items-center justify-center p-2.5 rounded-lg border-0 text-center transition-all cursor-pointer',
                    customerType === item.id
                      ? 'bg-primary/10 text-primary font-bold shadow-2xs ring-1 ring-primary/30'
                      : 'bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                  )}
                >
                  <span className="text-xs font-bold">{item.label}</span>
                  <span className="text-[10px] opacity-75 mt-0.5">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Opportunity Summary / Brief */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground block">
              وصف مبسط للفكرة أو الحل <span className="text-muted-foreground font-normal">(اختياري)</span>
            </label>
            <textarea
              value={opportunitySummary}
              onChange={(event) => setOpportunitySummary(event.target.value)}
              placeholder="شرح مختصر في سطرين عن المشكلة والحل..."
              rows={2}
              className="w-full rounded-lg border-0 bg-muted/40 p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:bg-background outline-none transition-colors resize-none text-right"
            />
          </div>

          {/* Context Note Box */}
          <div className="rounded-lg bg-primary/5 p-3 flex items-start gap-2.5 text-right border-0">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-0 shrink-0 mt-0.5 text-[10px] font-bold">
              تلقيم الذكاء الاصطناعي
            </Badge>
            <p className="text-[11px] leading-5 text-muted-foreground">
              تُحفظ هذه البيانات تلقائياً في قاعدة البيانات وتُمرر فوراً لمحرك AI لضمان توجيه النماذج الذكية بدقة متناهية.
            </p>
          </div>

          {projectCreationError ? (
            <p role="alert" className="text-xs leading-5 text-destructive font-medium">
              {projectCreationError}
            </p>
          ) : null}
        </div>

        <DialogFooter className="gap-2 sm:gap-0 border-0">
          <Button
            onClick={() => void confirmProjectCreation()}
            disabled={!projectName.trim() || isStartingProject}
            className="w-full sm:w-auto shadow-2xs border-0 font-bold"
          >
            {isStartingProject ? 'جاري إنشاء وتثبيت السياق...' : 'إنشاء الدراسة والبدء'}
          </Button>
          <Button
            variant="outline"
            onClick={() => closeProjectNameDialog()}
            disabled={isStartingProject}
            className="w-full sm:w-auto border-0 bg-muted/40 hover:bg-muted/70"
          >
            إلغاء
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  if (isLoadingEditProject) {
    return (
      <div className="mx-auto flex min-h-[360px] w-full max-w-7xl items-center justify-center px-4" dir="rtl">
        <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
          <RefreshCcw className="size-5 animate-spin" />
          جاري تحميل المشروع من قاعدة البيانات...
        </div>
      </div>
    );
  }

  if (editProjectError) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-10" dir="rtl">
        <Card className="border-destructive/30 shadow-sm">
          <CardHeader>
            <CardTitle>تعذر فتح المشروع</CardTitle>
            <CardDescription>{editProjectError}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => window.location.assign('/my-plans')}>
              العودة إلى مشاريعي
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (useFallbackEditor && fallbackEditor) {
    return (
      <div className="flex w-full flex-col gap-4" dir="rtl">
        {editProjectId ? <ProjectBasicsEditor /> : null}
        {fallbackEditor}
      </div>
    );
  }

  if (isViewingExample && isIntroMode) {
    return <ExampleViewer mode={mode as IntroMode} onBack={() => setIsViewingExample(false)} />;
  }

  if (mode === 'easy' && hasStarted) {
    return (
      <div className="flex w-full flex-col gap-4" dir="rtl">
        {editProjectId ? <ProjectBasicsEditor /> : null}
        <SmartBeginnerPro />
      </div>
    );
  }

  if (mode === 'lean' && hasStarted) {
    return (
      <div className="flex w-full flex-col gap-4" dir="rtl">
        {editProjectId ? <ProjectBasicsEditor /> : null}
        <LeanStartupWizard />
      </div>
    );
  }

  if ((mode === 'family' || mode === 'bmc' || mode === 'mit24') && hasStarted) {
    return (
      <div className="flex w-full flex-col gap-4" dir="rtl">
        {editProjectId ? <ProjectBasicsEditor /> : null}
        <IdeaCreation
          key={activeProjectId || mode}
          initialMode={mode as CreationMode}
          onBuildPlan={onBuildPlan}
          onBack={() => {
            setMode('selection');
            setHasStarted(true);
            setSubTabLabel(null);
          }}
        />
      </div>
    );
  }

  if (isIntroMode && !hasStarted) {
    return (
      <>
        <ToolIntroPanel
          mode={mode as IntroMode}
          onStart={startProject}
          onBack={initialMode === 'selection' ? () => setMode('selection') : undefined}
          onViewExample={() => setIsViewingExample(true)}
          isStarting={isStartingProject}
        />
        {projectNameDialog}
      </>
    );
  }

  return (
    <>
    <div dir="rtl" className="flex w-full flex-col gap-4 px-2 py-2 sm:px-4 lg:px-6">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-1">
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">اختر أداة بناء الدراسة المناسبة</h1>
        <p className="max-w-3xl text-xs sm:text-sm leading-6 text-muted-foreground">
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
                className="group flex flex-col items-start gap-4 rounded-xl border-0 bg-card p-6 text-right transition-all hover:bg-muted/30 shadow-2xs cursor-pointer"
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
          <Card className="shadow-2xs border-0">
            <CardHeader className="pb-3 border-0 bg-muted/20">
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

          <Card className="shadow-2xs border-0 bg-primary/5">
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
                className="w-full text-xs font-semibold border-0 shadow-2xs"
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

          <Card className="shadow-2xs border-0">
            <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3 border-0">
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
                  onClick={() => startTemplateProject(template)}
                  disabled={isStartingProject}
                  className="rounded-lg bg-muted/30 p-3 text-right transition-colors hover:bg-muted/60 border-0 shadow-2xs disabled:cursor-not-allowed disabled:opacity-60"
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
    {projectNameDialog}
    </>
  );
};

const EDITABLE_PROJECT_SECTORS = [
  'التجارة الإلكترونية والتجزئة',
  'التقنية والبرمجيات (SaaS)',
  'الخدمات والاستشارات',
  'المطاعم والضيافة',
  'التقنية الصحية (HealthTech)',
  'التعليم والتدريب (EdTech)',
  'الخدمات اللوجستية والنقل',
  'العقارات والإنشاءات',
  'الصناعة والإنتاج',
  'قطاع آخر',
];

const EDITABLE_CUSTOMER_TYPES = [
  { id: 'B2C - أفراد ومستهلكين', label: 'B2C', description: 'أفراد ومستهلكون' },
  { id: 'B2B - شركات ومؤسسات', label: 'B2B', description: 'شركات ومؤسسات' },
  { id: 'B2B2C - شركات وأفراد', label: 'B2B2C', description: 'شركات وأفراد' },
];

function ProjectBasicsEditor() {
  const { workspace, updateProfile, flushWorkspace, syncStatus } = useProjectWorkspace();
  const profile = workspace.profile;
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState({
    name: profile.name,
    sector: profile.sectorLabel || '',
    market: profile.countryLabel || '',
    customerType: profile.customerType || '',
    summary: profile.opportunitySummary || '',
  });

  const openEditor = () => {
    setDraft({
      name: profile.name,
      sector: profile.sectorLabel || '',
      market: profile.countryLabel || '',
      customerType: profile.customerType || '',
      summary: profile.opportunitySummary || '',
    });
    setIsOpen(true);
  };

  const saveDraft = () => {
    const name = draft.name.trim();
    updateProfile({
      name,
      opportunityTitle: name,
      sectorLabel: draft.sector || null,
      countryLabel: draft.market.trim() || null,
      customerType: draft.customerType || null,
      opportunitySummary: draft.summary.trim() || null,
    });
    void flushWorkspace();
    setIsOpen(false);
  };

  const saveStatus = syncStatus === 'saving' || syncStatus === 'pending'
    ? 'جاري حفظ البيانات الأساسية...'
    : syncStatus === 'failed' || syncStatus === 'conflict'
      ? 'تحقق من الحفظ، التعديلات محفوظة محلياً'
      : 'البيانات الأساسية محفوظة وتُستخدم في مولد التعليمة';

  return (
    <>
      <div className="w-full rounded-xl bg-card border-0 shadow-2xs px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs" dir="rtl">
        <div className="flex items-center gap-2 min-w-0 truncate">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-[10px] font-bold shrink-0">
            {profile.name || 'مشروع جديد'}
          </Badge>
          <span className="text-muted-foreground truncate text-xs">
            {profile.sectorLabel || 'القطاع غير محدد'} · {profile.countryLabel || 'السوق غير محدد'}
          </span>
        </div>
        <Button type="button" variant="ghost" size="sm" onClick={openEditor} className="h-7 text-xs gap-1 text-primary hover:bg-primary/10 shrink-0 font-bold">
          <Pencil className="size-3" />
          تعديل البيانات
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto border-0 shadow-2xs sm:max-w-[580px]" dir="rtl">
          <DialogHeader className="space-y-1 border-0 text-right">
            <DialogTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Pencil className="size-5 text-primary" />
              تعديل بيانات وسياق المشروع
            </DialogTitle>
            <DialogDescription className="text-xs leading-6">
              هذه هي المعلومات الأساسية التي يعتمد عليها مولد التعليمة لتخصيص التحليل والإجابات لمشروعك.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2 text-right">
            <div className="space-y-1.5">
              <label htmlFor="edit-project-name" className="block text-xs font-bold text-foreground">
                اسم المشروع <span className="text-destructive">*</span>
              </label>
              <Input
                id="edit-project-name"
                autoFocus
                value={draft.name}
                onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
                placeholder="مثال: منصة حجوزات العيادات الطبية"
                className="h-10 border-0 bg-muted/40 text-right text-xs focus:bg-background"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-foreground">قطاع المشروع / المجال</label>
              <Select value={draft.sector || undefined} onValueChange={(value) => setDraft((current) => ({ ...current, sector: value }))}>
                <SelectTrigger className="h-10 border-0 bg-muted/40 text-right text-xs focus:bg-background">
                  <SelectValue placeholder="اختر القطاع" />
                </SelectTrigger>
                <SelectContent dir="rtl" className="border-0 shadow-md">
                  {EDITABLE_PROJECT_SECTORS.map((sector) => (
                    <SelectItem key={sector} value={sector} className="text-xs">{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="edit-project-market" className="block text-xs font-bold text-foreground">السوق المستهدف / المنطقة</label>
              <Input
                id="edit-project-market"
                value={draft.market}
                onChange={(event) => setDraft((current) => ({ ...current, market: event.target.value }))}
                placeholder="مثال: السعودية، الإمارات، ودول الخليج"
                className="h-10 border-0 bg-muted/40 text-right text-xs focus:bg-background"
              />
              <p className="text-[10px] leading-5 text-muted-foreground">يمكنك كتابة أكثر من دولة وفصلها بفاصلة.</p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-foreground">شريحة العملاء الأساسية</span>
              <div className="grid grid-cols-3 gap-2">
                {EDITABLE_CUSTOMER_TYPES.map((customer) => (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => setDraft((current) => ({ ...current, customerType: customer.id }))}
                    className={cn(
                      'flex min-h-11 flex-col items-center justify-center rounded-lg border-0 px-2 py-1.5 text-center transition-colors',
                      draft.customerType === customer.id
                        ? 'bg-primary/10 text-primary shadow-2xs'
                        : 'bg-muted/40 text-muted-foreground hover:bg-muted/70 hover:text-foreground',
                    )}
                  >
                    <span className="text-[11px] font-bold">{customer.label}</span>
                    <span className="text-[9px] leading-4">{customer.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="edit-project-summary" className="block text-xs font-bold text-foreground">وصف الفكرة أو الحل</label>
              <Textarea
                id="edit-project-summary"
                value={draft.summary}
                onChange={(event) => setDraft((current) => ({ ...current, summary: event.target.value }))}
                placeholder="اشرح المشكلة والحل والقيمة التي يقدمها المشروع باختصار..."
                rows={3}
                className="resize-y border-0 bg-muted/40 text-right text-xs leading-6 focus:bg-background"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 border-0 sm:gap-0">
            <Button type="button" onClick={saveDraft} disabled={!draft.name.trim()} className="w-full border-0 font-bold shadow-2xs sm:w-auto">
              حفظ وتحديث سياق المشروع
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="w-full border-0 bg-muted/40 hover:bg-muted/70 sm:w-auto">
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ExplanationCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card className="h-full border border-border bg-card shadow-sm">
      <CardHeader className="border-b border-border/50 bg-muted/20 px-5 py-4">
        <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
          <Sparkles className="size-4 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-5 space-y-4">
        {items.map((item, index) => (
          <div key={item} className="flex items-start gap-3 text-right">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary border border-primary/20">
              {index + 1}
            </span>
            <p className="text-sm leading-relaxed text-muted-foreground font-medium">{item}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ModeProjectsSection({
  mode,
  onStart,
  onViewExample,
  isStarting = false,
}: {
  mode: IntroMode;
  onStart: () => void;
  onViewExample: () => void;
  isStarting?: boolean;
}) {
  const intro = TOOL_INTROS[mode];
  const { user } = useAuth();
  const { clearActiveProject } = useProjectWorkspace();
  const [projectsList, setProjectsList] = useState<SectionProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [pendingDeleteProject, setPendingDeleteProject] = useState<SectionProject | null>(null);
  const [pendingShareProject, setPendingShareProject] = useState<SectionProject | null>(null);
  const [notice, setNotice] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) {
        setProjectsList(SECTION_PROJECTS[mode]);
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setLoadError(null);
      setIsOffline(false);
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
          realProjects = data
            .filter((row) => {
              const modelType = row.canvas_data?.feasibilityModelType
                || Object.keys(row.canvas_data?.feasibilityModels || {})[0];
              return modelType === mode;
            })
            .map((row) => ({
            id: row.id,
            name: row.project_title || 'مشروع بدون اسم',
            sector: row.sector_label || row.canvas_data?.profile?.sectorLabel || 'غير محدد',
            status: (row.current_stage || row.canvas_data?.currentStage) === 'execution' ? 'ready' : 'review',
            progress: row.readiness_score ?? row.canvas_data?.metrics?.readinessScore ?? 0,
            updated: new Date(row.updated_at).toLocaleDateString('ar-SA-u-nu-latn'),
            }));
        }
        
        // Show real projects plus the example projects for this mode
        setProjectsList([...realProjects, ...SECTION_PROJECTS[mode]]);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setIsOffline(typeof navigator !== 'undefined' && !navigator.onLine);
        setProjectsList(SECTION_PROJECTS[mode]);
        setLoadError('تعذر تحميل مشاريعك من قاعدة البيانات. يمكنك إعادة المحاولة دون فقد أي مدخلات.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [mode, reloadKey, user]);

  const handleDelete = (project: SectionProject) => {
    if (project.id.startsWith('example')) {
      setNotice({
        title: 'لا يمكن حذف المثال التجريبي',
        description: 'الأمثلة جزء من دليل النموذج، ويمكن حذف المشاريع الحقيقية فقط.',
      });
      return;
    }
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

        const { data, error } = await supabase
          .from('business_canvas')
          .update({ deleted_at: new Date().toISOString() })
          .eq('id', id)
          .eq('user_id', user?.id ?? '')
          .select('id')
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error('PROJECT_DELETE_NOT_APPLIED');
      }

      clearActiveProject(id);
      setProjectsList((prev) => prev.filter((p) => p.id !== id));
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
      await shareProject(pendingShareProject.id, pendingShareProject.name);
      /*
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: pendingShareProject.id, isPublic: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to publish project');
      }
      */

      /* const result = (await response.json()) as { shareToken?: string | null };
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

      */
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

  return (
    <>
    <Card className="shadow-2xs border-0 bg-card">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-5 sm:p-6 border-0">
        <div className="space-y-1 text-right">
          <CardTitle className="text-xl font-bold text-foreground">{intro.projectLabel}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            تظهر هنا مشاريعك المنشأة عبر هذا المسار، بالإضافة للمثال التوضيحي للنتيجة.
          </CardDescription>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button type="button" size="lg" className="px-6 font-bold text-sm shadow-sm gap-2" onClick={onStart} disabled={isStarting}>
            {isStarting ? <RefreshCcw className="size-5 animate-spin" /> : <Plus className="size-5" />}
            إنشاء دراسة عبر {intro.title}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
        {isLoading ? (
          <>
            <PageSectionSkeleton blocks={3} compact />
          {/*
            <RefreshCcw className="size-5 animate-spin" />
            جاري تحميل المشاريع...
          */}
          </>
        ) : (
          <>
        {loadError ? (isOffline ? <OfflineState onRetry={() => setReloadKey((value) => value + 1)} /> : (
          <ErrorState description={loadError} onRetry={() => setReloadKey((value) => value + 1)} />
        )) : null}
          {/*
          <div role="alert" className="mb-4 flex flex-col gap-3 rounded-md border border-destructive/30 bg-destructive/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-destructive">{loadError}</p>
            <Button type="button" variant="outline" size="sm" onClick={() => setReloadKey((value) => value + 1)}>
              <RefreshCcw className="size-4" />
              إعادة المحاولة
            </Button>
          </div>*/}
        {/* Unified Responsive Table for All Screen Sizes (Mobile, Tablet, Desktop) */}
        <div className="w-full overflow-x-auto rounded-xl border-0 shadow-2xs bg-card">
          <Table dir="rtl" containerClassName="border-0 shadow-none rounded-none bg-transparent" className="min-w-[720px]">
            <TableHeader className="bg-muted/40">
              <TableRow className="border-0">
                <TableHead className="w-[120px] text-right font-bold text-foreground">إجراءات</TableHead>
                <TableHead className="min-w-[260px] text-right font-bold text-foreground">المشروع</TableHead>
                <TableHead className="w-[140px] text-right font-bold text-foreground">الحالة</TableHead>
                <TableHead className="w-[150px] text-right font-bold text-foreground">التقدم</TableHead>
                <TableHead className="w-[120px] text-right font-bold text-foreground">آخر تعديل</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsList.map((project) => (
                <ProjectRow 
                  key={project.id} 
                  project={project} 
                  onDelete={handleDelete}
                  onShare={handleShare}
                  onViewExample={onViewExample}
                />
              ))}
            </TableBody>
          </Table>
        </div>
          </>
        )}
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
  onViewExample,
}: {
  project: SectionProject;
  onDelete: (project: SectionProject) => void;
  onShare: (project: SectionProject) => void;
  onViewExample: () => void;
}) {
  const isExample = project.id.startsWith('example');

  return (
    <TableRow
      className="transition-colors duration-200 border-0 hover:bg-muted/50"
    >
      {/* Actions Column */}
      <TableCell className="py-3.5 px-3 whitespace-nowrap">
        <div className="flex items-center gap-1">
          {isExample ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onViewExample}
              className="gap-1 font-bold text-xs bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-400 border-0 rounded-lg h-7 px-2"
            >
              <Eye className="size-3.5" />
              <span>معاينة</span>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="icon-sm"
                className="h-7 w-7 text-muted-foreground hover:text-primary rounded-lg"
                title="تعديل الدراسة"
              >
                <a href={getProjectEditPath(project.id)}>
                  <Pencil className="size-3.5" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onShare(project)}
                title="مشاركة المشروع"
                className="h-7 w-7 text-muted-foreground hover:text-primary rounded-lg"
              >
                <Share2 className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onDelete(project)}
                title="حذف المشروع"
                className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </>
          )}
        </div>
      </TableCell>

      {/* Project Column */}
      <TableCell className="py-3.5 px-4 border-0">
        <div className="min-w-0 text-right space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <div className={cn(
              "flex size-7 items-center justify-center rounded-md shrink-0",
              isExample ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : "bg-primary/10 text-primary"
            )}>
              {isExample ? <Sparkles className="size-3.5" /> : <FolderKanban className="size-3.5" />}
            </div>
            <p className="text-sm font-extrabold text-foreground leading-snug">{project.name}</p>
            {isExample && (
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-0 font-bold text-[11px] px-2 py-0.5 gap-1 shrink-0">
                <Sparkles className="size-3" />
                مثال توضيحي للنتيجة
              </Badge>
            )}
            <Badge variant="secondary" className="text-[11px] font-semibold bg-muted/70 text-muted-foreground border-0 shrink-0">
              {project.sector}
            </Badge>
          </div>
          {project.description && (
            <p className="text-xs leading-relaxed text-muted-foreground/90 max-w-2xl font-normal pr-9">
              {project.description}
            </p>
          )}
        </div>
      </TableCell>

      {/* Status Column */}
      <TableCell className="py-3.5 px-4">
        <ProjectStatusBadge status={project.status} />
      </TableCell>

      {/* Progress Column */}
      <TableCell className="py-3.5 px-4">
        <ProgressSummary progress={project.progress} />
      </TableCell>

      {/* Last Edited Column */}
      <TableCell className="py-3.5 px-4 whitespace-nowrap">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-semibold">
          <Calendar className="size-3.5 text-muted-foreground/70" />
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
  const meta = STATUS_META[status] || STATUS_META.draft;
  const Icon = meta.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold border shrink-0",
        meta.className
      )}
    >
      <span className={cn("size-1.5 rounded-full shrink-0", meta.dotClass)} />
      <Icon className="size-3.5 shrink-0" />
      <span>{meta.label}</span>
    </span>
  );
}

function ProgressSummary({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col gap-1.5 w-full max-w-[130px]">
      <div className="flex items-center justify-between text-xs font-bold tabular-nums">
        <span className="text-[11px] text-muted-foreground font-medium">نسبة التقدم</span>
        <span className={cn(
          progress >= 100 ? "text-emerald-600 dark:text-emerald-400" : progress >= 50 ? "text-primary" : "text-amber-600 dark:text-amber-400"
        )}>
          {progress}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            progress >= 100 ? "bg-emerald-500" : progress >= 50 ? "bg-primary" : "bg-amber-500"
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
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
