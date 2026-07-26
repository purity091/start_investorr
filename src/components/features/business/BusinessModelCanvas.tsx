import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Handshake,
  HeartHandshake,
  LayoutGrid,
  Package,
  PencilLine,
  Plus,
  Search,
  Sparkles,
  Target,
  Truck,
  Users,
  Wrench,
} from 'lucide-react';

import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/Card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { Input } from '../../ui/Input';
import { PageHeader } from '../../ui/PageHeader';
import { Textarea } from '../../ui/textarea';
import { cn } from '../../../lib/utils';

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

function countBlocksWithAnswers(data: BmcData) {
  return BLOCK_ORDER.filter((key) => data[key].some((item) => item.answer.trim().length > 0)).length;
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function briefCompletion(brief: ProjectBrief) {
  const filled = GENERAL_BRIEF_FIELDS.filter(({ key }) => brief[key].trim().length > 0).length;
  return Math.round((filled / GENERAL_BRIEF_FIELDS.length) * 100);
}

function getProjectHealth(project: BmcProject) {
  const answered = countAnswered(project.data);
  const total = Object.values(project.data).reduce((sum, items) => sum + items.length, 0);
  return Math.round((answered / total) * 100);
}

function getNextBlock(project: BmcProject) {
  return BLOCK_ORDER.find((key) => !project.data[key].some((item) => item.answer.trim().length > 0)) ?? 'valuePropositions';
}

function CompactMetric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-3 text-right">
      <p className="text-[11px] font-semibold text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
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
  onOpenQuestion,
}: {
  block: CanvasKey;
  questions: QuestionAnswer[];
  searchQuery: string;
  onOpenQuestion: (block: CanvasKey, questionId: string) => void;
}) {
  const [showAllQuestions, setShowAllQuestions] = useState(false);
  const meta = BLOCK_META[block];
  const answered = questions.filter((item) => item.answer.trim().length > 0).length;
  const filteredQuestions = questions.filter((item) =>
    `${item.question} ${item.answer}`.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const shouldShowAll = showAllQuestions || searchQuery.trim().length > 0;
  const visibleQuestions = shouldShowAll ? filteredQuestions : filteredQuestions.slice(0, 2);
  const hiddenQuestionsCount = Math.max(filteredQuestions.length - visibleQuestions.length, 0);

  return (
    <Card className={cn('h-full rounded-xl shadow-none', meta.cardClassName)}>
      <CardHeader className="gap-3 border-b border-border/50 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg border', meta.iconClassName)}>
              <meta.icon size={18} />
            </div>
            <div className="min-w-0 text-right">
              <CardTitle className="text-sm font-semibold text-foreground">{meta.title}</CardTitle>
              <CardDescription className="mt-1 text-xs leading-6">{meta.objective}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={cn('shrink-0 text-[10px]', meta.badgeClassName)}>
            {answered}/{questions.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-3">
        <div className="space-y-2">
          {filteredQuestions.length > 0 ? (
            visibleQuestions.map((question) => {
              const hasAnswer = question.answer.trim().length > 0;
              return (
                <Collapsible
                  key={question.id}
                  className={cn(
                    'rounded-lg border text-right transition-colors',
                    hasAnswer
                      ? meta.questionAnsweredClassName
                      : meta.questionDefaultClassName
                  )}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="group flex w-full items-center justify-between gap-3 px-3 py-3 transition-colors"
                    >
                      <div className="min-w-0 flex-1 text-right">
                        <p className="text-sm font-medium leading-6 text-foreground">{question.question}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {hasAnswer ? (
                          <CheckCircle2 size={16} className="text-primary" />
                        ) : (
                          <PencilLine size={16} className="text-muted-foreground" />
                        )}
                        <ChevronDown size={16} className="text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                      </div>
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className={cn('border-t px-3 py-3', meta.questionExpandedClassName)}>
                    <div className="space-y-3">
                      <p className="text-xs leading-6 text-muted-foreground">
                        {hasAnswer ? question.answer : 'لا توجد إجابة مكتوبة بعد. افتح نافذة الإجابة لتوثيق القرار الخاص بهذا السؤال.'}
                      </p>
                      <div className="flex justify-start">
                        <Button
                          size="sm"
                          variant={hasAnswer ? 'outline' : 'secondary'}
                          className={hasAnswer ? meta.actionButtonClassName : ''}
                          onClick={() => onOpenQuestion(block, question.id)}
                        >
                          <PencilLine size={14} />
                          {hasAnswer ? 'تحرير الإجابة' : 'إضافة إجابة'}
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })
          ) : (
            <div className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              لا توجد أسئلة مطابقة للبحث داخل هذا القسم.
            </div>
          )}

          {hiddenQuestionsCount > 0 ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setShowAllQuestions(true)}
            >
              عرض المزيد
              <Badge variant="secondary" className="mr-1">
                +{hiddenQuestionsCount}
              </Badge>
            </Button>
          ) : null}

          {showAllQuestions && searchQuery.trim().length === 0 && filteredQuestions.length > 2 ? (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => setShowAllQuestions(false)}
            >
              عرض أقل
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}

export const BusinessModelCanvas: React.FC<{
  onComplete: (data: BmcData) => void;
}> = ({ onComplete }) => {
  const [projects, setProjects] = useState<BmcProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [createProject(1)];
    try {
      const parsed = JSON.parse(saved) as BmcProject[];
      return parsed.length > 0 ? parsed : [createProject(1)];
    } catch {
      return [createProject(1)];
    }
  });
  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return '';
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
  const [currentQuestion, setCurrentQuestion] = useState<{ block: CanvasKey; questionId: string } | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (!activeProjectId && projects[0]) {
      setActiveProjectId(projects[0].id);
    }
  }, [activeProjectId, projects]);

  const activeProject = useMemo(
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0],
    [activeProjectId, projects]
  );

  const currentQuestionEntry = useMemo(() => {
    if (!activeProject || !currentQuestion) return null;
    return activeProject.data[currentQuestion.block].find((item) => item.id === currentQuestion.questionId) ?? null;
  }, [activeProject, currentQuestion]);

  const answeredQuestions = activeProject ? countAnswered(activeProject.data) : 0;
  const totalQuestions = activeProject ? Object.values(activeProject.data).reduce((sum, items) => sum + items.length, 0) : 0;
  const readiness = activeProject ? getProjectHealth(activeProject) : 0;
  const answeredBlocks = activeProject ? countBlocksWithAnswers(activeProject.data) : 0;
  const nextBlock = activeProject ? BLOCK_META[getNextBlock(activeProject)].title : 'القيمة المقدمة';
  const briefProgress = activeProject ? briefCompletion(activeProject.brief) : 0;

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

  const handleCreateProject = () => {
    const next = createProject(projects.length + 1);
    if (newProjectName.trim()) {
      next.brief.name = newProjectName.trim();
    }
    setProjects((prev) => [next, ...prev]);
    setActiveProjectId(next.id);
    setNewProjectName('');
    setProjectDialogOpen(false);
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

  const handleStartProject = () => {
    updateActiveProject((project) => ({
      ...project,
      started: true,
    }));
  };

  const handleQuestionAnswerChange = (value: string) => {
    if (!currentQuestion || !activeProject) return;
    updateActiveProject((project) => ({
      ...project,
      data: {
        ...project.data,
        [currentQuestion.block]: project.data[currentQuestion.block].map((item) =>
          item.id === currentQuestion.questionId ? { ...item, answer: value } : item
        ),
      },
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background px-3 pb-10 pt-4 sm:px-4 lg:px-5 2xl:px-6">
      <div className="mx-auto flex w-full max-w-[1880px] flex-col gap-4">
        <PageHeader
          badge="Business Model Canvas"
          title="بناء نموذج العمل BMC"
          description="هذه الصفحة تعطي العميل تخطيط نموذج العمل بصورته المعروفة، مع أسئلة جاهزة داخل كل قسم، وإجابات منظمة يمكن نقلها لاحقاً للمبرمج أو لفريق دراسة الجدوى."
          actions={[
            {
              label: 'متابعة التحليل',
              onClick: () => activeProject && onComplete(activeProject.data),
              icon: <ArrowUpRight size={16} />,
            },
          ]}
          metrics={[
            { label: 'المشاريع', value: `${projects.length}`, helper: 'نماذج محفوظة داخل الصفحة' },
            { label: 'الجاهزية', value: `${readiness}%`, helper: 'نسبة الإجابات المكتملة' },
            { label: 'الأقسام النشطة', value: `${answeredBlocks}/9`, helper: 'أقسام فيها قرارات مكتوبة' },
          ]}
          className="rounded-xl"
        />

        <section className="rounded-xl border border-border bg-background">
          <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="text-right">
                  <p className="text-xs font-semibold text-muted-foreground">مساحة المشاريع</p>
                  <h2 className="text-sm font-semibold text-foreground">يمكن للعميل بناء أكثر من نموذج عمل من نفس الصفحة</h2>
                </div>
                <Button size="sm" onClick={() => setProjectDialogOpen(true)}>
                  <Plus size={14} />
                  مشروع جديد
                </Button>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-1">
                {projects.map((project) => (
                  <ProjectSwitchItem
                    key={project.id}
                    project={project}
                    active={project.id === activeProject?.id}
                    onClick={() => setActiveProjectId(project.id)}
                  />
                ))}
              </div>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-[520px]">
              <CompactMetric label="المشروع النشط" value={activeProject?.brief.name || 'بدون اسم'} hint="النموذج الجاري تحريره الآن" />
              <CompactMetric label="إجابات مكتملة" value={`${answeredQuestions}/${totalQuestions}`} hint="إجمالي الأسئلة المجاب عنها" />
              <CompactMetric label="الخطوة التالية" value={nextBlock} hint="القسم الذي يحتاج قراراً أولاً" />
            </div>
          </div>
        </section>

        <section className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(320px,0.8fr)]">
          <Card className="rounded-xl shadow-none">
            <CardHeader className="gap-3 border-b border-border p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 text-right">
                  <Badge variant="outline">قبل بناء اللوحة</Badge>
                  <CardTitle className="mt-3 text-lg font-semibold">
                    تعريف المشروع الذي ستبنى عليه دراسة الجدوى
                  </CardTitle>
                  <CardDescription className="mt-2 max-w-3xl text-sm leading-7">
                    ابدأ بتوصيف الفكرة، العميل، السوق، والهدف من بناء النموذج. بعد ذلك انتقل إلى اللوحة الفعلية وسيظهر كل قسم بأسئلته الافتراضية داخل `modal` منظم.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setBriefOpen(true)}>
                  <PencilLine size={14} />
                  تحرير البيانات الأساسية
                </Button>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3 p-4 sm:grid-cols-2 2xl:grid-cols-3">
              {GENERAL_BRIEF_FIELDS.slice(0, 6).map((field) => (
                <div key={field.key} className="rounded-lg border border-border bg-background px-3 py-3 text-right">
                  <p className="text-[11px] font-semibold text-muted-foreground">{field.label}</p>
                  <p className="mt-1 text-sm font-medium leading-7 text-foreground">
                    {activeProject?.brief[field.key] || 'لم يتم إدخال هذه المعلومة بعد'}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-none">
            <CardHeader className="gap-3 border-b border-border p-4">
              <CardTitle className="text-base font-semibold">قرار البدء</CardTitle>
              <CardDescription className="text-sm leading-7">
                لا يتم عرض اللوحة التفصيلية إلا بعد تثبيت سياق المشروع. هذا يجعل رحلة المستخدم أوضح ويسلم للمبرمج واجهة منطقية.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4">
              <div className="rounded-lg border border-border bg-accent/40 p-4 text-right">
                <p className="text-xs font-semibold text-muted-foreground">اكتمال البيانات التمهيدية</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{briefProgress}%</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  كلما كانت هذه الطبقة أوضح، أصبحت إجابات `BMC` أدق وأكثر قابلية للتحويل إلى مخرجات دراسة جدوى.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-4 text-right">
                <p className="text-sm font-semibold text-foreground">ماذا سيحدث بعد البدء؟</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-muted-foreground">
                  <li>سيظهر التخطيط الكامل لنموذج العمل بالشكل المعروف.</li>
                  <li>كل قسم يحتوي أسئلة افتراضية جاهزة وليست خانات حرة مبهمة.</li>
                  <li>كل إجابة تحفظ ضمن المشروع النشط ويمكن الانتقال بين المشاريع بسهولة.</li>
                </ul>
              </div>
              <Button className="w-full" onClick={handleStartProject}>
                <LayoutGrid size={16} />
                {activeProject?.started ? 'العودة إلى اللوحة' : 'ابدأ بناء النموذج'}
              </Button>
            </CardContent>
          </Card>
        </section>

        {activeProject?.started ? (
          <>
            <section className="rounded-xl border border-border bg-background">
              <div className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="text-right">
                  <p className="text-xs font-semibold text-muted-foreground">لوحة النموذج</p>
                  <h2 className="text-base font-semibold text-foreground">
                    التخطيط التقليدي لنموذج العمل مع مركزية القيمة المقدمة
                  </h2>
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

            <section className="grid gap-4 xl:grid-cols-5">
              <div className="xl:row-span-2">
                <BmcBlockCard
                  block="customerSegments"
                  questions={activeProject.data.customerSegments}
                  searchQuery={searchQuery}
                  onOpenQuestion={(block, questionId) => setCurrentQuestion({ block, questionId })}
                />
              </div>
              <div>
                <BmcBlockCard
                  block="customerRelationships"
                  questions={activeProject.data.customerRelationships}
                  searchQuery={searchQuery}
                  onOpenQuestion={(block, questionId) => setCurrentQuestion({ block, questionId })}
                />
              </div>
              <div className="xl:row-span-2">
                <BmcBlockCard
                  block="valuePropositions"
                  questions={activeProject.data.valuePropositions}
                  searchQuery={searchQuery}
                  onOpenQuestion={(block, questionId) => setCurrentQuestion({ block, questionId })}
                />
              </div>
              <div>
                <BmcBlockCard
                  block="keyActivities"
                  questions={activeProject.data.keyActivities}
                  searchQuery={searchQuery}
                  onOpenQuestion={(block, questionId) => setCurrentQuestion({ block, questionId })}
                />
              </div>
              <div className="xl:row-span-2">
                <BmcBlockCard
                  block="keyPartners"
                  questions={activeProject.data.keyPartners}
                  searchQuery={searchQuery}
                  onOpenQuestion={(block, questionId) => setCurrentQuestion({ block, questionId })}
                />
              </div>
              <div>
                <BmcBlockCard
                  block="channels"
                  questions={activeProject.data.channels}
                  searchQuery={searchQuery}
                  onOpenQuestion={(block, questionId) => setCurrentQuestion({ block, questionId })}
                />
              </div>
              <div>
                <BmcBlockCard
                  block="keyResources"
                  questions={activeProject.data.keyResources}
                  searchQuery={searchQuery}
                  onOpenQuestion={(block, questionId) => setCurrentQuestion({ block, questionId })}
                />
              </div>
              <div className="xl:col-span-2">
                <BmcBlockCard
                  block="revenueStreams"
                  questions={activeProject.data.revenueStreams}
                  searchQuery={searchQuery}
                  onOpenQuestion={(block, questionId) => setCurrentQuestion({ block, questionId })}
                />
              </div>
              <div className="xl:col-span-3">
                <BmcBlockCard
                  block="costStructure"
                  questions={activeProject.data.costStructure}
                  searchQuery={searchQuery}
                  onOpenQuestion={(block, questionId) => setCurrentQuestion({ block, questionId })}
                />
              </div>
            </section>
          </>
        ) : null}
      </div>

      <Dialog open={briefOpen} onOpenChange={setBriefOpen}>
        <DialogContent className="max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="border-b border-border px-6 py-5">
            <DialogTitle>البيانات التمهيدية للمشروع</DialogTitle>
            <DialogDescription>
              هذه الطبقة تسبق بناء اللوحة وتثبت سياق المشروع قبل الإجابة على أقسام نموذج العمل التسعة.
            </DialogDescription>
          </DialogHeader>
          <div className="grid max-h-[calc(90vh-160px)] gap-4 overflow-y-auto px-6 py-5">
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
          <DialogFooter className="border-t border-border px-6 py-4">
            <Button onClick={() => setBriefOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>إنشاء مشروع جديد داخل صفحة BMC</DialogTitle>
            <DialogDescription>
              سيتم إنشاء مشروع مستقل ببيانات تمهيدية ولوحة أسئلة خاصة به، ويمكن التنقل بينه وبين باقي المشاريع من الأعلى.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-right">
            <label className="text-sm font-medium text-foreground">اسم المشروع</label>
            <Input
              value={newProjectName}
              onChange={(event) => setNewProjectName(event.target.value)}
              placeholder="مثال: منصة خدمات لوجستية للشركات الصغيرة"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setProjectDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleCreateProject}>
              <Plus size={14} />
              إنشاء المشروع
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!currentQuestion && !!currentQuestionEntry} onOpenChange={(open) => !open && setCurrentQuestion(null)}>
        <DialogContent className="max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="border-b border-border px-6 py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 text-right">
                <Badge variant="outline">{currentQuestion ? BLOCK_META[currentQuestion.block].title : ''}</Badge>
                <DialogTitle className="mt-3 text-right">
                  {currentQuestionEntry?.question}
                </DialogTitle>
                <DialogDescription className="mt-2 text-right">
                  اكتب إجابة واضحة وقابلة للتحويل لاحقاً إلى قرار تنفيذي داخل دراسة الجدوى أو وثيقة العمل.
                </DialogDescription>
              </div>
              <div className="hidden rounded-lg border border-border bg-background px-3 py-2 text-right sm:block">
                <p className="text-[11px] font-semibold text-muted-foreground">المشروع</p>
                <p className="text-sm font-medium text-foreground">{activeProject?.brief.name || 'بدون اسم'}</p>
              </div>
            </div>
          </DialogHeader>
          <div className="space-y-4 px-6 py-5">
            <div className="rounded-lg border border-border bg-accent/30 p-4 text-right">
              <p className="text-xs font-semibold text-muted-foreground">الهدف من هذا القسم</p>
              <p className="mt-2 text-sm leading-7 text-foreground">
                {currentQuestion ? BLOCK_META[currentQuestion.block].objective : ''}
              </p>
            </div>
            <div className="space-y-2 text-right">
              <label className="text-sm font-medium text-foreground">الإجابة</label>
              <Textarea
                value={currentQuestionEntry?.answer ?? ''}
                onChange={(event) => handleQuestionAnswerChange(event.target.value)}
                placeholder="اكتب الإجابة بصياغة واضحة ومباشرة..."
                className="min-h-40 resize-y"
              />
            </div>
          </div>
          <DialogFooter className="border-t border-border px-6 py-4">
            <Button
              variant="outline"
              onClick={() => handleQuestionAnswerChange('')}
            >
              مسح الإجابة
            </Button>
            <Button onClick={() => setCurrentQuestion(null)}>
              حفظ وإغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
