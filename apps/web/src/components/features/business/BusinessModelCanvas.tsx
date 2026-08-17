import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Handshake,
  HeartHandshake,
  HelpCircle,
  Package,
  PencilLine,
  Plus,
  Search,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from 'lucide-react';

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
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';
import { cn } from '../../../lib/utils';
import { useProjectWorkspace } from '@/features/workspace/ProjectWorkspaceContext';
import { getProjectEditPath } from '@/features/workspace/workspaceNavigation';
import { AIPromptHelper } from './AIPromptHelper';

type CanvasKey =
  | 'customerSegments'
  | 'valuePropositions'
  | 'channels'
  | 'customerRelationships'
  | 'revenueStreams'
  | 'keyResources'
  | 'keyActivities'
  | 'keyPartners'
  | 'costStructure';

interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
}

export interface BmcData {
  customerSegments: QuestionAnswer[];
  valuePropositions: QuestionAnswer[];
  channels: QuestionAnswer[];
  customerRelationships: QuestionAnswer[];
  revenueStreams: QuestionAnswer[];
  keyResources: QuestionAnswer[];
  keyActivities: QuestionAnswer[];
  keyPartners: QuestionAnswer[];
  costStructure: QuestionAnswer[];
}

interface ProjectBrief {
  name: string;
  ideaSummary: string;
  problem: string;
  offering: string;
  targetCustomer: string;
  market: string;
  stage: string;
  competitors: string;
  goal: string;
}

interface BmcProject {
  id: string;
  brief: ProjectBrief;
  data: BmcData;
  started: boolean;
  updatedAt: string;
}

interface BlockMeta {
  title: string;
  objective: string;
  icon: React.ElementType;
  questions: string[];
  cardClassName: string;
  iconClassName: string;
  badgeClassName: string;
  questionDefaultClassName: string;
  questionAnsweredClassName: string;
  questionExpandedClassName: string;
  actionButtonClassName: string;
}

const STORAGE_KEY = 'bmc_projects_v3';

const GENERAL_BRIEF_FIELDS: Array<{
  key: keyof ProjectBrief;
  label: string;
  placeholder: string;
  textarea?: boolean;
}> = [
  { key: 'name', label: 'اسم المشروع', placeholder: 'مثال: منصة لإدارة الإعلانات المحلية' },
  { key: 'ideaSummary', label: 'وصف فكرة المشروع', placeholder: 'صف الفكرة في جملتين أو ثلاث.', textarea: true },
  { key: 'problem', label: 'المشكلة التي يحلها المشروع', placeholder: 'ما المشكلة الأساسية؟', textarea: true },
  { key: 'offering', label: 'المنتج أو الخدمة', placeholder: 'ما الذي يقدمه المشروع فعلياً؟', textarea: true },
  { key: 'targetCustomer', label: 'العميل المستهدف', placeholder: 'من العميل الأساسي؟' },
  { key: 'market', label: 'الدولة أو السوق', placeholder: 'مثال: السعودية - الشركات الصغيرة' },
  { key: 'stage', label: 'مرحلة المشروع', placeholder: 'الفكرة / التطوير / التشغيل' },
  { key: 'competitors', label: 'المنافسون المعروفون', placeholder: 'من هم المنافسون؟', textarea: true },
  { key: 'goal', label: 'الهدف من بناء النموذج', placeholder: 'تحقق من الفكرة / دراسة جدوى / جذب مستثمرين...' },
];

const BLOCK_ORDER: CanvasKey[] = [
  'customerSegments',
  'customerRelationships',
  'valuePropositions',
  'keyActivities',
  'keyPartners',
  'channels',
  'keyResources',
  'revenueStreams',
  'costStructure',
];

const BLOCK_META: Record<CanvasKey, BlockMeta> = {
  customerSegments: {
    title: 'شرائح العملاء',
    objective: 'تحديد العملاء الذين سيخلق المشروع قيمة لهم.',
    icon: Users,
    cardClassName: 'border-emerald-200/80 bg-emerald-50/40',
    iconClassName: 'border-emerald-200 bg-emerald-100 text-emerald-700',
    badgeClassName: 'border-emerald-200 bg-emerald-100/80 text-emerald-800',
    questionDefaultClassName: 'border-emerald-200/70 bg-background hover:bg-emerald-50/60',
    questionAnsweredClassName: 'border-emerald-300 bg-emerald-100/60 hover:bg-emerald-100/80',
    questionExpandedClassName: 'border-emerald-200/70',
    actionButtonClassName: 'border-emerald-300 text-emerald-800 hover:bg-emerald-100',
    questions: [
      'من هم العملاء الرئيسيون الذين يستهدفهم المشروع؟',
      'ما الخصائص الديموغرافية للعملاء (العمر، الجنس، الموقع، الدخل...)؟',
      'هل تستهدف أفرادًا أم شركات أم جهات حكومية؟',
      'ما المشكلة أو الحاجة التي يعاني منها هؤلاء العملاء؟',
      'هل توجد شرائح عملاء مختلفة تحتاج إلى حلول مختلفة؟',
      'أي شريحة تمثل الأولوية عند إطلاق المشروع؟',
      'ما حجم هذه الشريحة تقريبًا؟',
      'كيف يتخذ العميل قرار الشراء؟',
    ],
  },
  valuePropositions: {
    title: 'القيمة المقدمة',
    objective: 'توضيح السبب الذي يجعل العميل يختارك.',
    icon: Sparkles,
    cardClassName: 'border-violet-200/80 bg-violet-50/40',
    iconClassName: 'border-violet-200 bg-violet-100 text-violet-700',
    badgeClassName: 'border-violet-200 bg-violet-100/80 text-violet-800',
    questionDefaultClassName: 'border-violet-200/70 bg-background hover:bg-violet-50/60',
    questionAnsweredClassName: 'border-violet-300 bg-violet-100/60 hover:bg-violet-100/80',
    questionExpandedClassName: 'border-violet-200/70',
    actionButtonClassName: 'border-violet-300 text-violet-800 hover:bg-violet-100',
    questions: [
      'ما المشكلة الأساسية التي يحلها المشروع؟',
      'ما القيمة التي يحصل عليها العميل؟',
      'لماذا سيختار العميل مشروعك بدلاً من المنافسين؟',
      'ما الفوائد الوظيفية التي تقدمها؟',
      'ما الفوائد العاطفية أو النفسية التي تحققها؟',
      'هل تقدم توفيرًا في الوقت أو المال أو الجهد؟',
      'ما أكثر ميزة تجعل عرضك فريدًا؟',
      'ما الاحتياجات التي يلبيها المشروع؟',
    ],
  },
  channels: {
    title: 'قنوات الوصول',
    objective: 'معرفة كيف سيصل المنتج إلى العميل.',
    icon: Truck,
    cardClassName: 'border-sky-200/80 bg-sky-50/40',
    iconClassName: 'border-sky-200 bg-sky-100 text-sky-700',
    badgeClassName: 'border-sky-200 bg-sky-100/80 text-sky-800',
    questionDefaultClassName: 'border-sky-200/70 bg-background hover:bg-sky-50/60',
    questionAnsweredClassName: 'border-sky-300 bg-sky-100/60 hover:bg-sky-100/80',
    questionExpandedClassName: 'border-sky-200/70',
    actionButtonClassName: 'border-sky-300 text-sky-800 hover:bg-sky-100',
    questions: [
      'كيف سيكتشف العملاء مشروعك؟',
      'ما القنوات التي ستستخدمها للتسويق؟',
      'أين سيشتري العميل المنتج أو الخدمة؟',
      'هل سيكون البيع عبر الإنترنت أم من خلال متجر فعلي أم عبر موزعين؟',
      'ما القنوات الأكثر فاعلية للوصول إلى العملاء؟',
      'كيف سيتم تسليم المنتج أو تقديم الخدمة؟',
      'كيف ستدعم العميل بعد عملية الشراء؟',
    ],
  },
  customerRelationships: {
    title: 'العلاقة مع العملاء',
    objective: 'تحديد طبيعة العلاقة مع العملاء.',
    icon: HeartHandshake,
    cardClassName: 'border-rose-200/80 bg-rose-50/40',
    iconClassName: 'border-rose-200 bg-rose-100 text-rose-700',
    badgeClassName: 'border-rose-200 bg-rose-100/80 text-rose-800',
    questionDefaultClassName: 'border-rose-200/70 bg-background hover:bg-rose-50/60',
    questionAnsweredClassName: 'border-rose-300 bg-rose-100/60 hover:bg-rose-100/80',
    questionExpandedClassName: 'border-rose-200/70',
    actionButtonClassName: 'border-rose-300 text-rose-800 hover:bg-rose-100',
    questions: [
      'ما نوع العلاقة التي تريد بناءها مع العملاء؟',
      'كيف ستكسب ثقة العملاء؟',
      'كيف ستحافظ عليهم بعد أول عملية شراء؟',
      'كيف ستشجعهم على تكرار الشراء؟',
      'هل سيتم تقديم دعم شخصي أم دعم ذاتي؟',
      'كيف ستتعامل مع الشكاوى؟',
      'كيف ستقيس رضا العملاء؟',
    ],
  },
  revenueStreams: {
    title: 'مصادر الإيرادات',
    objective: 'تحديد كيفية تحقيق الأرباح.',
    icon: CircleDollarSign,
    cardClassName: 'border-lime-200/80 bg-lime-50/40',
    iconClassName: 'border-lime-200 bg-lime-100 text-lime-700',
    badgeClassName: 'border-lime-200 bg-lime-100/80 text-lime-800',
    questionDefaultClassName: 'border-lime-200/70 bg-background hover:bg-lime-50/60',
    questionAnsweredClassName: 'border-lime-300 bg-lime-100/60 hover:bg-lime-100/80',
    questionExpandedClassName: 'border-lime-200/70',
    actionButtonClassName: 'border-lime-300 text-lime-800 hover:bg-lime-100',
    questions: [
      'كيف سيحقق المشروع الإيرادات؟',
      'ما المنتجات أو الخدمات المدفوعة؟',
      'هل ستكون الإيرادات لمرة واحدة أم متكررة؟',
      'كيف سيتم تحديد الأسعار؟',
      'هل توجد مصادر دخل إضافية؟',
      'ما طريقة الدفع المناسبة للعملاء؟',
      'ما المصدر المتوقع لأكبر نسبة من الإيرادات؟',
    ],
  },
  keyResources: {
    title: 'الموارد الرئيسية',
    objective: 'معرفة ما يحتاجه المشروع ليعمل.',
    icon: Package,
    cardClassName: 'border-amber-200/80 bg-amber-50/40',
    iconClassName: 'border-amber-200 bg-amber-100 text-amber-700',
    badgeClassName: 'border-amber-200 bg-amber-100/80 text-amber-800',
    questionDefaultClassName: 'border-amber-200/70 bg-background hover:bg-amber-50/60',
    questionAnsweredClassName: 'border-amber-300 bg-amber-100/60 hover:bg-amber-100/80',
    questionExpandedClassName: 'border-amber-200/70',
    actionButtonClassName: 'border-amber-300 text-amber-800 hover:bg-amber-100',
    questions: [
      'ما أهم الموارد التي يحتاجها المشروع؟',
      'ما الموارد البشرية المطلوبة؟',
      'ما الموارد التقنية المطلوبة؟',
      'ما الموارد المالية اللازمة؟',
      'هل توجد أصول فكرية أو تراخيص ضرورية؟',
      'ما الموارد التي تمتلكها بالفعل؟',
      'ما الموارد التي تحتاج إلى توفيرها؟',
    ],
  },
  keyActivities: {
    title: 'الأنشطة الرئيسية',
    objective: 'تحديد أهم الأعمال اليومية للمشروع.',
    icon: Wrench,
    cardClassName: 'border-blue-200/80 bg-blue-50/40',
    iconClassName: 'border-blue-200 bg-blue-100 text-blue-700',
    badgeClassName: 'border-blue-200 bg-blue-100/80 text-blue-800',
    questionDefaultClassName: 'border-blue-200/70 bg-background hover:bg-blue-50/60',
    questionAnsweredClassName: 'border-blue-300 bg-blue-100/60 hover:bg-blue-100/80',
    questionExpandedClassName: 'border-blue-200/70',
    actionButtonClassName: 'border-blue-300 text-blue-800 hover:bg-blue-100',
    questions: [
      'ما الأنشطة الأساسية التي يجب تنفيذها لإنجاح المشروع؟',
      'ما أهم العمليات التشغيلية؟',
      'ما الأنشطة المتعلقة بالإنتاج أو تقديم الخدمة؟',
      'ما الأنشطة التسويقية الضرورية؟',
      'ما الأنشطة المتعلقة بالمبيعات؟',
      'ما الأنشطة الخاصة بخدمة العملاء؟',
      'ما الأنشطة التي تضيف أكبر قيمة للعملاء؟',
    ],
  },
  keyPartners: {
    title: 'الشركاء الرئيسيون',
    objective: 'تحديد الجهات التي تساعد المشروع على النجاح.',
    icon: Handshake,
    cardClassName: 'border-fuchsia-200/80 bg-fuchsia-50/40',
    iconClassName: 'border-fuchsia-200 bg-fuchsia-100 text-fuchsia-700',
    badgeClassName: 'border-fuchsia-200 bg-fuchsia-100/80 text-fuchsia-800',
    questionDefaultClassName: 'border-fuchsia-200/70 bg-background hover:bg-fuchsia-50/60',
    questionAnsweredClassName: 'border-fuchsia-300 bg-fuchsia-100/60 hover:bg-fuchsia-100/80',
    questionExpandedClassName: 'border-fuchsia-200/70',
    actionButtonClassName: 'border-fuchsia-300 text-fuchsia-800 hover:bg-fuchsia-100',
    questions: [
      'من هم الشركاء الرئيسيون للمشروع؟',
      'هل يوجد موردون أساسيون؟',
      'هل تحتاج إلى شركاء تقنيين؟',
      'هل توجد جهات لوجستية أو تشغيلية؟',
      'ما سبب اختيار كل شريك؟',
      'ما القيمة التي يضيفها كل شريك؟',
      'ما المخاطر في حال فقدان أحد الشركاء؟',
    ],
  },
  costStructure: {
    title: 'هيكل التكاليف',
    objective: 'معرفة أين سيتم إنفاق الأموال.',
    icon: Building2,
    cardClassName: 'border-orange-200/80 bg-orange-50/40',
    iconClassName: 'border-orange-200 bg-orange-100 text-orange-700',
    badgeClassName: 'border-orange-200 bg-orange-100/80 text-orange-800',
    questionDefaultClassName: 'border-orange-200/70 bg-background hover:bg-orange-50/60',
    questionAnsweredClassName: 'border-orange-300 bg-orange-100/60 hover:bg-orange-100/80',
    questionExpandedClassName: 'border-orange-200/70',
    actionButtonClassName: 'border-orange-300 text-orange-800 hover:bg-orange-100',
    questions: [
      'ما أهم التكاليف الثابتة في المشروع؟',
      'ما أهم التكاليف المتغيرة؟',
      'ما أكبر بند يستهلك الميزانية؟',
      'ما تكلفة تشغيل المشروع شهريًا؟',
      'ما تكلفة اكتساب عميل جديد؟',
      'هل توجد تكاليف موسمية؟',
      'ما التكاليف التي يمكن تقليلها دون التأثير على جودة الخدمة؟',
    ],
  },
};

function createQuestionId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createInitialData(): BmcData {
  return {
    customerSegments: BLOCK_META.customerSegments.questions.map((question) => ({ id: createQuestionId(), question, answer: '' })),
    valuePropositions: BLOCK_META.valuePropositions.questions.map((question) => ({ id: createQuestionId(), question, answer: '' })),
    channels: BLOCK_META.channels.questions.map((question) => ({ id: createQuestionId(), question, answer: '' })),
    customerRelationships: BLOCK_META.customerRelationships.questions.map((question) => ({ id: createQuestionId(), question, answer: '' })),
    revenueStreams: BLOCK_META.revenueStreams.questions.map((question) => ({ id: createQuestionId(), question, answer: '' })),
    keyResources: BLOCK_META.keyResources.questions.map((question) => ({ id: createQuestionId(), question, answer: '' })),
    keyActivities: BLOCK_META.keyActivities.questions.map((question) => ({ id: createQuestionId(), question, answer: '' })),
    keyPartners: BLOCK_META.keyPartners.questions.map((question) => ({ id: createQuestionId(), question, answer: '' })),
    costStructure: BLOCK_META.costStructure.questions.map((question) => ({ id: createQuestionId(), question, answer: '' })),
  };
}

function createEmptyBrief(index: number): ProjectBrief {
  return {
    name: `مشروع ${index}`,
    ideaSummary: '',
    problem: '',
    offering: '',
    targetCustomer: '',
    market: '',
    stage: '',
    competitors: '',
    goal: '',
  };
}

function createProject(index: number): BmcProject {
  return {
    id: createQuestionId(),
    brief: createEmptyBrief(index),
    data: createInitialData(),
    started: false,
    updatedAt: new Date().toISOString(),
  };
}

function countAnswered(data: BmcData) {
  return Object.values(data).reduce(
    (sum, questions) => sum + questions.filter((item) => item.answer.trim().length > 0).length,
    0
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('ar-SA-u-nu-latn', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function getProjectHealth(project: BmcProject) {
  const answered = countAnswered(project.data);
  const total = Object.values(project.data).reduce((sum, items) => sum + items.length, 0);
  return Math.round((answered / total) * 100);
}

function ProjectSwitchItem({
  project,
  active,
  onClick,
}: {
  project: BmcProject;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'min-w-[220px] rounded-lg border px-3 py-3 text-right transition-colors',
        active
          ? 'border-primary bg-primary/[0.06] text-foreground'
          : 'border-border bg-background hover:bg-accent hover:text-accent-foreground'
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{project.brief.name || 'مشروع بدون اسم'}</p>
          <p className="mt-1 truncate text-[11px] text-muted-foreground">
            {project.brief.market || 'لم يتم تحديد السوق بعد'}
          </p>
        </div>
        <Badge variant={project.started ? 'secondary' : 'outline'} className="shrink-0">
          {project.started ? 'قيد البناء' : 'تهيئة'}
        </Badge>
      </div>
    </button>
  );
}

function BmcBlockCard({
  block,
  questions,
  searchQuery,
  onOpenBlock,
}: {
  block: CanvasKey;
  questions: QuestionAnswer[];
  searchQuery: string;
  onOpenBlock: (block: CanvasKey) => void;
}) {
  const meta = BLOCK_META[block];
  const answered = questions.filter((item) => item.answer.trim().length > 0).length;
  const filteredQuestions = questions.filter((item) =>
    `${item.question} ${item.answer}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const visibleQuestions = filteredQuestions.slice(0, 3);

  return (
    <Card className={cn('flex h-full min-h-[208px] flex-col overflow-hidden rounded-xl shadow-none ring-1 ring-black/[0.03]', meta.cardClassName)}>
      <CardHeader className="shrink-0 border-b border-border/50 px-2.5 py-2.5 text-right">
        <div className="space-y-2">
          <div className="space-y-1.5">
            <div className={cn('flex size-8 shrink-0 items-center justify-center rounded-md border', meta.iconClassName)}>
              <meta.icon size={15} />
            </div>
            <Badge variant="outline" className={cn('h-5 w-fit shrink-0 rounded-md px-1.5 text-[10px]', meta.badgeClassName)}>
              {answered}/{questions.length}
            </Badge>
          </div>
          <div className="min-w-0">
            <CardTitle className="truncate text-[12px] font-semibold leading-5 text-foreground">{meta.title}</CardTitle>
            <CardDescription className="mt-0.5 line-clamp-2 text-[10px] leading-4">{meta.objective}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-2 p-2">
        <div className="text-[10px] font-medium leading-4 text-muted-foreground">محاور الأسئلة</div>
        <button
          type="button"
          onClick={() => onOpenBlock(block)}
          className="flex flex-1 flex-col gap-1.5 rounded-lg text-right outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
        >
          {filteredQuestions.length > 0 ? (
            visibleQuestions.map((question) => {
              const hasAnswer = question.answer.trim().length > 0;
              return (
                <div
                  key={question.id}
                  className={cn(
                    'w-full rounded-md border px-2 py-1.5 text-right transition-colors',
                    hasAnswer
                      ? meta.questionAnsweredClassName
                      : meta.questionDefaultClassName
                  )}
                >
                  <div className="space-y-1">
                    {hasAnswer ? (
                      <CheckCircle2 size={12} className="block text-primary" />
                    ) : (
                      <span className="block size-1.5 rounded-full bg-muted-foreground/40" />
                    )}
                    <p className="line-clamp-2 text-[10px] font-medium leading-4 text-foreground">
                      {question.question}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="rounded-md border border-dashed border-border px-2 py-4 text-center text-[10px] leading-5 text-muted-foreground">
              لا توجد أسئلة مطابقة للبحث داخل هذا القسم.
            </div>
          )}
        </button>

        <Button
          variant="outline"
          size="sm"
          className={cn('h-7 w-full text-[11px]', answered > 0 ? meta.actionButtonClassName : '')}
          onClick={() => onOpenBlock(block)}
        >
          فتح أسئلة القسم
        </Button>
      </CardContent>
    </Card>
  );
}

export const BusinessModelCanvas: React.FC<{
  onComplete: (data: BmcData) => void;
}> = ({ onComplete }) => {
  const {
    workspace,
    updateWorkspace,
    flushWorkspace,
    activeProjectId: workspaceProjectId,
    createProject: createWorkspaceProject,
  } = useProjectWorkspace();
  const savedBmc = workspace.feasibilityModels?.bmc as {
    projects?: BmcProject[];
    activeProjectId?: string;
  } | undefined;
  const [projects, setProjects] = useState<BmcProject[]>(() => {
    if (savedBmc?.projects?.length) return savedBmc.projects;

    if (workspaceProjectId) {
      const initialProject = createProject(1);
      initialProject.brief.name = workspace.profile.name;
      return [initialProject];
    }

    if (typeof window === 'undefined') return [createProject(1)];

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const initialProject = createProject(1);
      initialProject.brief.name = workspace.profile.name;
      return [initialProject];
    }
    try {
      const parsed = JSON.parse(saved) as BmcProject[];
      return parsed.length > 0 ? parsed : [createProject(1)];
    } catch {
      return [createProject(1)];
    }
  });
  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    if (savedBmc?.activeProjectId) return savedBmc.activeProjectId;
    if (savedBmc?.projects?.[0]) return savedBmc.projects[0].id;
    if (workspaceProjectId) return projects[0]?.id ?? '';
    if (typeof window === 'undefined') return projects[0]?.id ?? '';

    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return projects[0]?.id ?? '';
    try {
      const parsed = JSON.parse(saved) as BmcProject[];
      return parsed[0]?.id ?? '';
    } catch {
      return '';
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [briefOpen, setBriefOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [projectCreationError, setProjectCreationError] = useState<string | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [currentBlock, setCurrentBlock] = useState<CanvasKey | null>(null);

  useEffect(() => {
    if (workspaceProjectId) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects, workspaceProjectId]);

  useEffect(() => {
    const active = projects.find((project) => project.id === activeProjectId) ?? projects[0];
    updateWorkspace((current) => ({
      feasibilityModels: {
        ...current.feasibilityModels,
        bmc: { projects, activeProjectId: active?.id || activeProjectId },
      },
      profile: {
        ...current.profile,
        name: active?.brief.name || current.profile.name,
        opportunitySummary: active?.brief.ideaSummary || current.profile.opportunitySummary,
      },
    }));
  }, [activeProjectId, projects, updateWorkspace]);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId, projects]
  );

  const currentBlockQuestions = useMemo(() => {
    if (!activeProject || !currentBlock) return [];
    return activeProject.data[currentBlock];
  }, [activeProject, currentBlock]);

  const answeredQuestions = activeProject ? countAnswered(activeProject.data) : 0;
  const totalQuestions = activeProject ? Object.values(activeProject.data).reduce((sum, items) => sum + items.length, 0) : 0;
  const readiness = activeProject ? getProjectHealth(activeProject) : 0;

  const updateActiveProject = (updater: (project: BmcProject) => BmcProject) => {
    if (!activeProject) return;
    setProjects((prev) =>
      prev.map((project) =>
        project.id === activeProject.id
          ? {
              ...updater(project),
              updatedAt: new Date().toISOString(),
            }
          : project
      )
    );
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim() || isCreatingProject) return;

    setIsCreatingProject(true);
    setProjectCreationError(null);
    const next = createProject(projects.length + 1);
    next.brief.name = newProjectName.trim();
    const projectId = await createWorkspaceProject(next.brief.name || 'BMC', 'bmc');
    if (!projectId) {
      setProjectCreationError('تعذر إنشاء المشروع في قاعدة البيانات. تحقق من الاتصال ثم حاول مرة أخرى.');
      setIsCreatingProject(false);
      return;
    }

    setProjects([next]);
    setActiveProjectId(next.id);
    setNewProjectName('');
    setProjectDialogOpen(false);
    updateWorkspace((current) => ({
      feasibilityModels: {
        ...current.feasibilityModels,
        bmc: { projects: [next], activeProjectId: next.id },
      },
    }));
    await flushWorkspace();
    window.location.assign(getProjectEditPath(projectId));
  };

  const handleBriefFieldChange = (key: keyof ProjectBrief, value: string) => {
    updateActiveProject((project) => ({
      ...project,
      brief: {
        ...project.brief,
        [key]: value,
      },
    }));
  };

  const handleBlockQuestionAnswerChange = (block: CanvasKey, questionId: string, value: string) => {
    if (!activeProject) return;
    updateActiveProject((project) => ({
      ...project,
      data: {
        ...project.data,
        [block]: project.data[block].map((item) =>
          item.id === questionId ? { ...item, answer: value } : item
        ),
      },
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background px-2.5 pb-6 pt-2.5 sm:px-4 sm:pt-4 sm:pb-10 lg:px-5 2xl:px-6">
      <div className="flex w-full flex-col gap-3 sm:gap-4">
        <TooltipProvider>
          <section className="bg-background px-0 py-1">
            <div className="flex flex-col gap-2.5 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0 text-right">
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-6">
                        <HelpCircle size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-sm text-right leading-5 text-xs">
                      كل قسم في المخطط يفتح أسئلته داخل نافذة منظمة. استخدم الصفحة لتعديل المخطط، وليس لقراءة شرح طويل قبل الوصول إليه.
                    </TooltipContent>
                  </Tooltip>
                  <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">بناء نموذج العمل BMC</h1>
                </div>
                <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
                  {activeProject?.brief.name || 'مشروع بدون اسم'} · {answeredQuestions}/{totalQuestions} إجابة · الجاهزية {readiness}%
                </p>
              </div>

              <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-[520px]">
                  {projects.map((project) => (
                    <ProjectSwitchItem
                      key={project.id}
                      project={project}
                      active={project.id === activeProject?.id}
                      onClick={() => setActiveProjectId(project.id)}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => setBriefOpen(true)}>
                    <PencilLine size={14} />
                    بيانات المشروع
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setProjectDialogOpen(true)}>
                    <Plus size={14} />
                    مشروع جديد
                  </Button>
                  <Button size="sm" onClick={() => activeProject && onComplete(activeProject.data)}>
                    <ArrowUpRight size={14} />
                    متابعة التحليل
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <>
            <section className="rounded-xl border border-border bg-card p-3 sm:p-4 shadow-sm">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap items-center gap-2 text-right">
                  <Badge variant="secondary">لوحة النموذج</Badge>
                  <span className="text-sm font-medium text-foreground">الأقسام التسعة جاهزة للتعديل</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-7">
                        <HelpCircle size={15} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-sm text-right leading-6">
                      اضغط على أي قسم لفتح أسئلته وإدخال الإجابات. ترتيب المخطط يحافظ على الشكل التقليدي لنموذج العمل.
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative w-full lg:max-w-sm">
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="ابحث داخل أسئلة وأجوبة النموذج..."
                    className="pr-9"
                  />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-muted/30 p-2 shadow-sm sm:p-3">
              <div className="grid auto-rows-fr gap-2 md:grid-cols-2 xl:grid-cols-5 xl:[grid-template-areas:'partners_activities_value_relationships_segments'_'partners_resources_value_channels_segments'_'costs_costs_costs_revenue_revenue'] 2xl:gap-3">
              <div className="xl:[grid-area:segments]">
                <BmcBlockCard
                  block="customerSegments"
                  questions={activeProject.data.customerSegments}
                  searchQuery={searchQuery}
                  onOpenBlock={setCurrentBlock}
                />
              </div>
              <div className="xl:[grid-area:relationships]">
                <BmcBlockCard
                  block="customerRelationships"
                  questions={activeProject.data.customerRelationships}
                  searchQuery={searchQuery}
                  onOpenBlock={setCurrentBlock}
                />
              </div>
              <div className="xl:[grid-area:value]">
                <BmcBlockCard
                  block="valuePropositions"
                  questions={activeProject.data.valuePropositions}
                  searchQuery={searchQuery}
                  onOpenBlock={setCurrentBlock}
                />
              </div>
              <div className="xl:[grid-area:activities]">
                <BmcBlockCard
                  block="keyActivities"
                  questions={activeProject.data.keyActivities}
                  searchQuery={searchQuery}
                  onOpenBlock={setCurrentBlock}
                />
              </div>
              <div className="xl:[grid-area:partners]">
                <BmcBlockCard
                  block="keyPartners"
                  questions={activeProject.data.keyPartners}
                  searchQuery={searchQuery}
                  onOpenBlock={setCurrentBlock}
                />
              </div>
              <div className="xl:[grid-area:channels]">
                <BmcBlockCard
                  block="channels"
                  questions={activeProject.data.channels}
                  searchQuery={searchQuery}
                  onOpenBlock={setCurrentBlock}
                />
              </div>
              <div className="xl:[grid-area:resources]">
                <BmcBlockCard
                  block="keyResources"
                  questions={activeProject.data.keyResources}
                  searchQuery={searchQuery}
                  onOpenBlock={setCurrentBlock}
                />
              </div>
              <div className="xl:[grid-area:revenue]">
                <BmcBlockCard
                  block="revenueStreams"
                  questions={activeProject.data.revenueStreams}
                  searchQuery={searchQuery}
                  onOpenBlock={setCurrentBlock}
                />
              </div>
              <div className="xl:[grid-area:costs]">
                <BmcBlockCard
                  block="costStructure"
                  questions={activeProject.data.costStructure}
                  searchQuery={searchQuery}
                  onOpenBlock={setCurrentBlock}
                />
              </div>
              </div>
            </section>
          </>
        </TooltipProvider>
      </div>

      <Dialog open={briefOpen} onOpenChange={setBriefOpen}>
        <DialogContent className="max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="border-b border-border px-4 py-4 sm:px-6 sm:py-5">
            <DialogTitle>البيانات التمهيدية للمشروع</DialogTitle>
            <DialogDescription>
              هذه الطبقة تسبق بناء اللوحة وتثبت سياق المشروع قبل الإجابة على أقسام نموذج العمل التسعة.
            </DialogDescription>
          </DialogHeader>
          <div className="grid max-h-[calc(90vh-160px)] gap-4 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
            {GENERAL_BRIEF_FIELDS.map((field) => (
              <div key={field.key} className="space-y-2 text-right">
                <label className="text-sm font-medium text-foreground">{field.label}</label>
                {field.textarea ? (
                  <Textarea
                    value={activeProject?.brief[field.key] ?? ''}
                    onChange={(event) => handleBriefFieldChange(field.key, event.target.value)}
                    placeholder={field.placeholder}
                    className="min-h-28 resize-y"
                  />
                ) : (
                  <Input
                    value={activeProject?.brief[field.key] ?? ''}
                    onChange={(event) => handleBriefFieldChange(field.key, event.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter className="border-t border-border px-4 py-3 sm:px-6 sm:py-4">
            <Button onClick={() => setBriefOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={projectDialogOpen}
        onOpenChange={(open) => {
          if (isCreatingProject) return;
          setProjectDialogOpen(open);
          if (!open) setProjectCreationError(null);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader className="px-4 py-4 sm:px-6 sm:py-5 pb-0 sm:pb-0">
            <DialogTitle>إنشاء مشروع جديد داخل صفحة BMC</DialogTitle>
            <DialogDescription>
              سيتم إنشاء مشروع مستقل ببيانات تمهيدية ولوحة أسئلة خاصة به، ويمكن التنقل بينه وبين باقي المشاريع من الأعلى.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-right px-4 py-4 sm:px-6 sm:py-5">
            <label className="text-sm font-medium text-foreground">اسم المشروع</label>
            <Input
              value={newProjectName}
              onChange={(event) => setNewProjectName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && newProjectName.trim()) {
                  event.preventDefault();
                  void handleCreateProject();
                }
              }}
              placeholder="مثال: منصة خدمات لوجستية للشركات الصغيرة"
            />
            {projectCreationError ? (
              <p role="alert" className="text-sm leading-6 text-destructive">
                {projectCreationError}
              </p>
            ) : null}
          </div>
          <DialogFooter className="px-4 pb-4 sm:px-6 sm:pb-5">
            <Button variant="outline" onClick={() => setProjectDialogOpen(false)} disabled={isCreatingProject}>
              إلغاء
            </Button>
            <Button onClick={() => void handleCreateProject()} disabled={!newProjectName.trim() || isCreatingProject}>
              <Plus size={14} />
              {isCreatingProject ? 'جارٍ الإنشاء...' : 'إنشاء المشروع'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!currentBlock} onOpenChange={(open) => !open && setCurrentBlock(null)}>
        <DialogContent className="max-h-[90vh] overflow-hidden p-0 sm:max-w-3xl">
          <DialogHeader className="border-b border-border px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 text-right">
                <div className="space-y-3">
                  {currentBlock ? (
                    <div className={cn('flex size-10 items-center justify-center rounded-lg border', BLOCK_META[currentBlock].iconClassName)}>
                      {React.createElement(BLOCK_META[currentBlock].icon, { size: 18 })}
                    </div>
                  ) : null}
                  <Badge variant="outline">{currentBlock ? BLOCK_META[currentBlock].title : ''}</Badge>
                </div>
                <DialogTitle className="mt-3 text-right">
                  أسئلة القسم وإجابات نموذج العمل
                </DialogTitle>
                <DialogDescription className="mt-2 text-right">
                  اكتب إجابات واضحة وقابلة للتحويل لاحقاً إلى قرارات تنفيذية داخل دراسة الجدوى أو وثيقة العمل.
                </DialogDescription>
              </div>
              <div className="hidden rounded-lg border border-border bg-background px-3 py-2 text-right sm:block">
                <p className="text-[11px] font-semibold text-muted-foreground">المشروع</p>
                <p className="text-sm font-medium text-foreground">{activeProject?.brief.name || 'بدون اسم'}</p>
              </div>
            </div>
          </DialogHeader>
          <div className="max-h-[calc(90vh-180px)] space-y-4 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
            <div className="rounded-lg border border-border bg-accent/30 p-4 text-right">
              <p className="text-xs font-semibold text-muted-foreground">الهدف من هذا القسم</p>
              <p className="mt-2 text-sm leading-7 text-foreground">
                {currentBlock ? BLOCK_META[currentBlock].objective : ''}
              </p>
            </div>
            <div className="space-y-3">
              {currentBlockQuestions.map((question, index) => {
                const hasAnswer = question.answer.trim().length > 0;
                return (
                  <div key={question.id} className="rounded-lg border border-border bg-background p-3 sm:p-4 text-right">
                    <div className="space-y-3">
                      <Badge variant={hasAnswer ? 'secondary' : 'outline'} className="mt-0.5 shrink-0">
                        {index + 1}
                      </Badge>
                      <div className="min-w-0 space-y-2">
                        <div className="flex items-center justify-between gap-2 flex-wrap border-b border-border/40 pb-1.5">
                          <label className="block text-sm font-medium leading-7 text-foreground">
                            {question.question}
                          </label>
                          <AIPromptHelper
                            sectionTitle={currentBlock ? BLOCK_META[currentBlock].title : ''}
                            questionText={question.question}
                            projectName={activeProject?.brief.name || 'مشروع استثماري'}
                            projectSector={workspace.profile.sectorLabel || workspace.profile.sectorGroup || undefined}
                            targetMarket={workspace.profile.countryLabel || undefined}
                            customerType={workspace.profile.customerType || undefined}
                            formData={activeProject ? {
                              brief: activeProject.brief,
                              canvasAnswers: activeProject.data,
                            } : undefined}
                            onApplyAnswer={(ans) =>
                              currentBlock &&
                              handleBlockQuestionAnswerChange(currentBlock, question.id, ans)
                            }
                            compact
                          />
                        </div>
                        <Textarea
                          value={question.answer}
                          onChange={(event) =>
                            currentBlock &&
                            handleBlockQuestionAnswerChange(currentBlock, question.id, event.target.value)
                          }
                          placeholder="اكتب الإجابة بصياغة واضحة ومباشرة..."
                          className="min-h-28 resize-y"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <DialogFooter className="border-t border-border px-4 py-3 sm:px-6 sm:py-4">
            <Button
              variant="outline"
              onClick={() => {
                if (!currentBlock) return;
                currentBlockQuestions.forEach((question) =>
                  handleBlockQuestionAnswerChange(currentBlock, question.id, '')
                );
              }}
            >
              مسح إجابات القسم
            </Button>
            <Button onClick={() => setCurrentBlock(null)}>
              حفظ وإغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
