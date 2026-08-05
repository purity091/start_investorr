import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ClipboardList,
  FileText,
  Gauge,
  Layers,
  LineChart,
  ShieldAlert,
  Target,
  Users,
  XCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type FieldType = 'text' | 'textarea' | 'number';
type Answers = Record<string, string | string[]>;

type ProField = {
  id: string;
  label: string;
  type?: FieldType;
  placeholder: string;
  required?: boolean;
};

type ProStep = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fields: ProField[];
  optionsLabel?: string;
  options?: string[];
  professionalNote: string;
};

const EMPTY_MESSAGE = 'لم يتم إدخال بيانات بعد';

const PRO_STEPS: ProStep[] = [
  {
    id: 'executive_summary',
    title: 'الملخص التنفيذي وهوية المشروع',
    shortTitle: 'الملخص والفكرة',
    description: 'واجهة المشروع التي تلخص الرؤية والهدف الاستراتيجي. هذا القسم هو ما يقرأه المستثمر أولاً لتقرير ما إذا كان سيكمل القراءة.',
    icon: BriefcaseBusiness,
    professionalNote: 'الملخص التنفيذي الجيد يجب أن يجيب على: ماذا، لمن، ولماذا الآن، وبأي ميزة تنافسية.',
    fields: [
      { id: 'name', label: 'اسم المشروع / العلامة التجارية', placeholder: 'مثال: منصة إدارة مشتريات المتاجر الصغيرة', required: true },
      { id: 'vision', label: 'الرؤية الاستراتيجية', placeholder: 'ما هو الطموح على المدى الطويل؟ (مثال: رقمنة سلاسل الإمداد لقطاع التجزئة في الشرق الأوسط)', required: true },
      { id: 'one_liner', label: 'وصف المشروع (Elevator Pitch)', type: 'textarea', placeholder: 'وصف دقيق في جملتين يشرح القيمة الأساسية التي تقدمها المنصة للمستخدمين.', required: true },
      { id: 'why_now', label: 'لماذا الآن؟ (Timing)', type: 'textarea', placeholder: 'اشرح الدوافع السوقية، التقنية، أو التنظيمية التي تجعل إطلاق المشروع الآن فرصة لا تعوض.' },
    ],
  },
  {
    id: 'market_analysis',
    title: 'تحليل السوق والصناعة',
    shortTitle: 'السوق والصناعة',
    description: 'تقييم شامل لحجم السوق، ومعدلات النمو، والبيئة التنظيمية التي يعمل فيها المشروع.',
    icon: BarChart3,
    professionalNote: 'الأرقام هنا يجب أن تكون مبنية على أبحاث أو افتراضات منطقية يمكن الدفاع عنها (Bottom-up أو Top-down).',
    optionsLabel: 'خصائص السوق',
    options: ['سوق متنامي', 'سوق متشبع', 'احتكار قلة', 'سوق ناشئ', 'تنظيم حكومي صارم', 'تغيرات تقنية سريعة'],
    fields: [
      { id: 'tam', label: 'حجم السوق الكلي (TAM)', placeholder: 'القيمة الإجمالية للسوق المستهدف بالدولار أو العدد.' },
      { id: 'sam_som', label: 'السوق القابل للخدمة والمستهدف (SAM / SOM)', type: 'textarea', placeholder: 'حدد الشريحة التي يمكنك خدمتها فعلياً (SAM) والحصة التي تستهدفها في أول 3 سنوات (SOM).' },
      { id: 'growth_rate', label: 'معدل النمو السنوي (CAGR)', placeholder: 'كم نسبة نمو هذا السوق سنوياً؟' },
      { id: 'market_trends', label: 'التوجهات والفرص (Market Trends)', type: 'textarea', placeholder: 'ما هي أهم التغيرات في سلوك العملاء أو التقنية في هذا القطاع؟' },
      { id: 'barriers', label: 'عوائق الدخول (Barriers to Entry)', type: 'textarea', placeholder: 'تراخيص، تكلفة تقنية عالية، عقود حصرية للمنافسين...' },
    ],
  },
  {
    id: 'target_customer',
    title: 'العميل المستهدف وتحليل الاحتياج',
    shortTitle: 'العميل',
    description: 'تشريح دقيق لشريحة العملاء، مشاكلهم، وسلوكهم الشرائي لضمان وجود توافق بين المنتج والسوق (PMF).',
    icon: Users,
    professionalNote: 'كلما كان تعريف العميل أدق (Niche)، زادت دقة استراتيجية التسويق وانخفضت تكلفة الاستحواذ.',
    optionsLabel: 'نوع نموذج الأعمال (B2X)',
    options: ['B2B Enterprise', 'B2B SME', 'B2C', 'B2B2C', 'Marketplace (C2C)', 'SaaS', 'D2C'],
    fields: [
      { id: 'primary_persona', label: 'شخصية العميل الأساسية (Persona)', type: 'textarea', placeholder: 'من هو؟ كم عمره/حجم شركته؟ أين يتواجد؟', required: true },
      { id: 'core_pain', label: 'الألم أو المشكلة الجوهرية', type: 'textarea', placeholder: 'ما هي التكلفة المالية أو الزمنية أو النفسية التي يعاني منها العميل حالياً؟', required: true },
      { id: 'alternatives', label: 'البدائل الحالية للعميل', type: 'textarea', placeholder: 'كيف يحل العميل هذه المشكلة اليوم؟ (إكسل، واتساب، منافس تقليدي)' },
      { id: 'buying_behavior', label: 'دوافع الشراء (Buying Motives)', type: 'textarea', placeholder: 'ما الذي يجعله يتخذ قرار الدفع؟ (توفير المال، زيادة الأرباح، تقليل الجهد)' },
    ],
  },
  {
    id: 'product_operations',
    title: 'المنتج، التقنية والنموذج التشغيلي',
    shortTitle: 'المنتج والتشغيل',
    description: 'وصف شامل للحل المقدم، وكيف سيتم تصنيعه أو تطويره، وسلسلة القيمة التشغيلية.',
    icon: Layers,
    professionalNote: 'في المشاريع التقنية، توضيح الـ Tech Stack وأطراف الربط (APIs) يعكس نضج التخطيط التقني.',
    optionsLabel: 'مرحلة المنتج',
    options: ['فكرة فقط', 'Wireframes / تصميم', 'MVP (نموذج أولي)', 'منتج جاهز للسوق', 'منتج يحقق إيرادات'],
    fields: [
      { id: 'uvp', label: 'عرض القيمة الفريد (UVP)', type: 'textarea', placeholder: 'ما هو المزيج الفريد (سعر، جودة، سرعة) الذي ستقدمه ولا يستطيع المنافس تقديمه؟', required: true },
      { id: 'core_features', label: 'الميزات التقنية الأساسية للمنتج', type: 'textarea', placeholder: 'اكتب الميزات الجوهرية (مثال: لوحة تحكم، تطبيق مناديب، ربط مع بوابات الدفع).' },
      { id: 'tech_stack', label: 'البنية التقنية (Tech Stack) والأدوات', type: 'textarea', placeholder: 'لغات البرمجة، خوادم الاستضافة، أدوات الـ No-code، أطراف الربط الخارجية.' },
      { id: 'supply_chain', label: 'سلسلة الإمداد والموردين', type: 'textarea', placeholder: 'الشركاء التشغيليون، مزودي الخدمات السحابية، شركاء التوصيل.' },
      { id: 'legal_requirements', label: 'المتطلبات القانونية والتراخيص', placeholder: 'تراخيص تجارية، موافقات من جهات حكومية، سياسات الخصوصية.' },
    ],
  },
  {
    id: 'marketing_sales',
    title: 'استراتيجية التسويق والمبيعات (GTM)',
    shortTitle: 'التسويق والمبيعات',
    description: 'خطة اختراق السوق (Go-to-Market)، قنوات الاستحواذ، وهيكلة المبيعات لضمان نمو مستدام.',
    icon: Target,
    professionalNote: 'أكبر فخ في دراسات الجدوى هو افتراض أن "العميل سيأتي بمجرد الإطلاق". يجب تفصيل كيف ستصل إليه.',
    fields: [
      { id: 'acquisition_channels', label: 'قنوات الاستحواذ (Acquisition)', type: 'textarea', placeholder: 'إعلانات ممولة، SEO، مبيعات مباشرة (B2B)، علاقات عامة...', required: true },
      { id: 'sales_cycle', label: 'دورة المبيعات (Sales Cycle)', type: 'textarea', placeholder: 'كم يوماً يستغرق العميل من أول اتصال حتى الدفع؟ وما هي مراحل التفاوض؟' },
      { id: 'cac_target', label: 'تكلفة الاستحواذ المستهدفة (CAC Target)', type: 'number', placeholder: 'بالدولار. كم تتوقع أن يكلفك جلب عميل واحد دافع؟' },
      { id: 'retention_strategy', label: 'استراتيجية الاحتفاظ بالعملاء (Retention)', type: 'textarea', placeholder: 'برامج ولاء، دعم فني ممتاز، عقود سنوية مقفلة.' },
    ],
  },
  {
    id: 'financial_model',
    title: 'النموذج المالي والاقتصاديات',
    shortTitle: 'النموذج المالي',
    description: 'الترجمة الرقمية للمشروع. تقدير التكاليف التأسيسية، التشغيلية، ومسارات الإيرادات والربحية.',
    icon: LineChart,
    professionalNote: 'المستثمر يبحث هنا عن واقعية التكاليف ومنطقية الإيرادات، وليس عن أرباح خيالية من السنة الأولى.',
    optionsLabel: 'نماذج الإيرادات المطبقة',
    options: ['اشتراك شهري (SaaS)', 'عمولة (Marketplace)', 'رسوم تأسيس (Setup Fee)', 'مبيعات مباشرة', 'Freemium', 'B2B Contracts'],
    fields: [
      { id: 'revenue_model', label: 'نموذج الإيرادات والتسعير', type: 'textarea', placeholder: 'اشرح باقات التسعير بالتفصيل (مثال: باقة أساسية 10$، باقة متقدمة 50$).', required: true },
      { id: 'capex', label: 'النفقات الرأسمالية والتأسيسية (CAPEX)', type: 'textarea', placeholder: 'تكلفة تطوير التطبيق، التراخيص، المعدات، تأسيس الشركة.' },
      { id: 'opex', label: 'النفقات التشغيلية الشهرية (OPEX)', type: 'textarea', placeholder: 'رواتب الفريق، خوادم سحابية، ميزانية تسويق شهرية، إيجار.' },
      { id: 'ltv', label: 'القيمة العمرية للعميل (LTV)', type: 'number', placeholder: 'إجمالي الإيراد المتوقع من العميل الواحد قبل أن يغادر المنصة.' },
      { id: 'funding_ask', label: 'حجم التمويل المطلوب ومجالات الصرف', type: 'textarea', placeholder: 'مثال: نطلب 200 ألف دولار. تصرف 40% للتطوير، 40% للتسويق، 20% للتشغيل لمدة 18 شهراً.' },
    ],
  },
  {
    id: 'swot_risk',
    title: 'التحليل الرباعي (SWOT) وإدارة المخاطر',
    shortTitle: 'SWOT والمخاطر',
    description: 'تقييم واقعي لنقاط القوة والضعف، وتحليل استباقي للمخاطر التي قد تهدد بقاء المشروع.',
    icon: ShieldAlert,
    professionalNote: 'المشروع القوي هو الذي يعترف بنقاط ضعفه ومخاطره ويضع خططاً واضحة لتخفيفها (Mitigation).',
    fields: [
      { id: 'strengths', label: 'نقاط القوة (Strengths)', type: 'textarea', placeholder: 'خبرات الفريق، تقنية حصرية، شراكات استراتيجية، تكلفة منخفضة.' },
      { id: 'weaknesses', label: 'نقاط الضعف (Weaknesses)', type: 'textarea', placeholder: 'نقص التمويل، عدم وجود وعي بالعلامة التجارية، فريق غير مكتمل.' },
      { id: 'opportunities_threats', label: 'الفرص والتهديدات (Opportunities & Threats)', type: 'textarea', placeholder: 'الفرص: قرارات حكومية داعمة. التهديدات: دخول منافس عالمي للسوق.' },
      { id: 'risk_mitigation', label: 'خطة تخفيف المخاطر (Risk Mitigation)', type: 'textarea', placeholder: 'كيف ستواجه أسوأ السيناريوهات (انقطاع السيرفرات، تسرب مؤسس، نفاذ الكاش)؟', required: true },
    ],
  },
  {
    id: 'implementation_plan',
    title: 'خطة التنفيذ (Roadmap) والفريق',
    shortTitle: 'خطة التنفيذ',
    description: 'جدول زمني يوضح مراحل نقل المشروع من فكرة على ورق إلى كيان حي يولد إيرادات.',
    icon: Gauge,
    professionalNote: 'خطة التنفيذ الجيدة تقسم الإنجازات إلى مراحل (Milestones) مرتبطة بفترات زمنية وأهداف قابلة للقياس.',
    optionsLabel: 'هيكل الفريق الحالي',
    options: ['مؤسس فرد (Solo)', 'فريق تقني متكامل', 'فريق تشغيلي فقط', 'شراكة مؤسسين', 'يوجد مستشارون'],
    fields: [
      { id: 'team_structure', label: 'هيكلة الفريق الأساسي (Key Personnel)', type: 'textarea', placeholder: 'اذكر المؤسسين والأدوار الحيوية (CEO, CTO, CMO) وخبراتهم.' },
      { id: 'q1_milestone', label: 'مستهدفات الربع الأول (Q1)', type: 'textarea', placeholder: 'تأسيس قانوني، إطلاق MVP، الحصول على أول 10 عملاء تجريبيين.' },
      { id: 'q2_q4_milestone', label: 'مستهدفات الربع الثاني إلى الرابع', type: 'textarea', placeholder: 'الوصول لنقطة التعادل التشغيلي، التوسع لمدينة ثانية، إطلاق النسخة الثانية من المنتج.' },
      { id: 'kpis', label: 'مؤشرات الأداء الرئيسية (KPIs)', type: 'textarea', placeholder: 'ما هي أهم 3 مقاييس ستراقبها يومياً؟ (مثال: MRR, Churn Rate, Active Users).', required: true },
    ],
  },
];

function answerKey(stepId: string, fieldId: string) {
  return `${stepId}.${fieldId}`;
}

function getAnswerText(value: string | string[] | undefined) {
  if (!value) return EMPTY_MESSAGE;
  if (Array.isArray(value)) return value.length ? value.join('، ') : 'لم يتم اختيار عناصر';
  return value.trim() || EMPTY_MESSAGE;
}

function getFieldValue(answers: Answers, stepId: string, fieldId: string) {
  const value = answers[answerKey(stepId, fieldId)];
  return typeof value === 'string' ? value : '';
}

function getStepCompletion(step: ProStep, answers: Answers) {
  const filledFields = step.fields.filter((field) => getFieldValue(answers, step.id, field.id).trim()).length;
  return filledFields / step.fields.length;
}

function getCompletedCount(answers: Answers) {
  return PRO_STEPS.filter((step) => getStepCompletion(step, answers) >= 0.5).length;
}

function inferReadiness(answers: Answers) {
  const allFields = PRO_STEPS.flatMap((step) => step.fields.map((field) => answerKey(step.id, field.id)));
  const filledFields = allFields.filter((key) => typeof answers[key] === 'string' && (answers[key] as string).trim()).length;
  const score = Math.round((filledFields / allFields.length) * 100);

  if (score >= 80) {
    return {
      score,
      label: 'جاهزية احترافية عالية',
      tone: 'text-emerald-700',
      summary: 'المدخلات كافية لبناء نموذج أولي قوي وربط الدراسة بقرار تنفيذ أو تحقق واضح.',
    };
  }

  if (score >= 50) {
    return {
      score,
      label: 'جاهزية متوسطة تحتاج تدقيقاً',
      tone: 'text-amber-700',
      summary: 'الهيكل جيد، لكن بعض أقسام الماليات أو السوق أو المخاطر تحتاج تفاصيل قبل الاعتماد النهائي.',
    };
  }

  return {
    score,
    label: 'جاهزية أولية',
    tone: 'text-destructive',
    summary: 'المدخلات ما زالت غير كافية لدراسة احترافية. أكمل الحقول الأساسية قبل عرض المشروع على شريك أو مستشار.',
  };
}

type Gap = {
  id: string;
  type: 'danger' | 'warning' | 'success';
  title: string;
  description: string;
};

function analyzeGaps(answers: Answers): Gap[] {
  const gaps: Gap[] = [];
  
  // 1. Competitive UVP Gap
  const competitors = getFieldValue(answers, 'market_analysis', 'competitors');
  const uvp = getFieldValue(answers, 'product_operations', 'uvp');
  if (competitors && !uvp) {
    gaps.push({ id: 'uvp_danger', type: 'danger', title: 'فجوة تنافسية حرجة', description: 'يوجد منافسون في السوق ولكن الميزة التنافسية (UVP) غير محددة. الدخول بدون ميزة سيؤدي إلى حرب أسعار خاسرة.' });
  } else if (uvp) {
    gaps.push({ id: 'uvp_ok', type: 'success', title: 'ميزة تنافسية محددة', description: 'تحديد الميزة التنافسية بوضوح يسهل عملية التسعير واختراق السوق.' });
  }

  // 2. Unit Economics (CAC vs LTV)
  const cacStr = getFieldValue(answers, 'marketing_sales', 'cac_target');
  const ltvStr = getFieldValue(answers, 'financial_model', 'ltv');
  if (cacStr && ltvStr) {
    const cac = parseFloat(cacStr);
    const ltv = parseFloat(ltvStr);
    if (!isNaN(cac) && !isNaN(ltv)) {
      if (cac >= ltv) {
        gaps.push({ id: 'unit_econ_danger', type: 'danger', title: 'انهيار النموذج المالي (CAC ≥ LTV)', description: `تكلفة استحواذ العميل (${cac}) أعلى من أو تساوي القيمة العمرية له (${ltv}). المشروع يخسر أموالاً مع كل عميل جديد!` });
      } else if (ltv / cac < 3) {
        gaps.push({ id: 'unit_econ_warning', type: 'warning', title: 'اقتصاديات وحدة ضعيفة (LTV/CAC < 3)', description: 'العميل لا يغطي تكلفة الاستحواذ بشكل مريح. تحتاج إما لرفع الأسعار أو خفض تكلفة التسويق لضمان الاستدامة.' });
      } else {
        gaps.push({ id: 'unit_econ_success', type: 'success', title: 'اقتصاديات وحدة صحية', description: 'نسبة LTV إلى CAC ممتازة وتسمح بالنمو المتسارع بأمان.' });
      }
    }
  } else if (!cacStr) {
    gaps.push({ id: 'cac_missing', type: 'warning', title: 'غياب تكلفة الاستحواذ (CAC)', description: 'لم تحدد التكلفة المستهدفة لجلب العميل. هذا يجعل من المستحيل تقييم ميزانية التسويق بدقة.' });
  }

  // 3. Execution / Validation Risk
  const q1 = getFieldValue(answers, 'implementation_plan', 'q1_milestone');
  if (q1 && !q1.includes('نموذج') && !q1.includes('MVP') && !q1.includes('اختبار') && !q1.includes('تجريبي')) {
    gaps.push({ id: 'mvp_warning', type: 'warning', title: 'مخاطرة التنفيذ المباشر (Waterfall Risk)', description: 'خطة الربع الأول لا تحتوي على مصطلحات تحقق (مثل: MVP، إطلاق تجريبي). بناء المنتج بالكامل قبل الاختبار يعرضك لخسارة فادحة.' });
  }

  // 4. Marketing vs Sales Cycle
  const channels = getFieldValue(answers, 'marketing_sales', 'acquisition_channels');
  const salesCycle = getFieldValue(answers, 'marketing_sales', 'sales_cycle');
  if (!channels && salesCycle) {
    gaps.push({ id: 'gtm_warning', type: 'warning', title: 'فجوة قنوات الاستحواذ', description: 'تم تحديد دورة المبيعات لكن دون قنوات استحواذ واضحة. العميل لن يأتي من تلقاء نفسه بمجرد الإطلاق.' });
  }

  // 5. Funding vs CAPEX
  const capex = getFieldValue(answers, 'financial_model', 'capex');
  const funding = getFieldValue(answers, 'financial_model', 'funding_ask');
  if (capex && !funding) {
    gaps.push({ id: 'funding_warning', type: 'warning', title: 'فجوة التمويل الرأسمالي', description: 'يوجد تكاليف تأسيسية (CAPEX) ولكن لم يتم تحديد حجم أو مصدر التمويل المطلوب لتغطيتها.' });
  }

  return gaps;
}

function toggleOption(current: string | string[] | undefined, option: string): string[] {
  const selected = Array.isArray(current) ? current : [];
  if (selected.includes(option)) return selected.filter((item) => item !== option);
  return [...selected, option];
}

function ProjectDashboard({
  answers,
  onEdit,
  onRestart,
}: {
  answers: Answers;
  onEdit: (index: number) => void;
  onRestart: () => void;
}) {
  const readiness = inferReadiness(answers);
  const completedCount = getCompletedCount(answers);
  const selectedTags = PRO_STEPS.flatMap((step) => {
    const value = answers[`${step.id}.options`];
    return Array.isArray(value) ? value : [];
  });
  
  const gaps = useMemo(() => analyzeGaps(answers), [answers]);
  const dangerGaps = gaps.filter(g => g.type === 'danger').length;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-3 py-3 sm:px-4 lg:px-5">
        <Card className="border-0 bg-background shadow-none">
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-2 text-right">
                <div className="space-y-1">
                  <CardTitle className="text-xl sm:text-2xl">لوحة المشروع الاحترافية</CardTitle>
                  <CardDescription className="max-w-3xl text-xs sm:text-sm leading-6">
                    تعرض هذه اللوحة كل إدخالات دراسة الجدوى كما أدخلها المستخدم، مقسمة حسب أقسام احترافية يمكن البناء عليها في نموذج مالي أو ملف مستثمر أو مرحلة MVP.
                  </CardDescription>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:w-[560px]">
                <MetricCard label="جاهزية الدراسة" value={`${readiness.score}%`} />
                <MetricCard label="أقسام مكتملة" value={`${completedCount}/${PRO_STEPS.length}`} />
                <MetricCard label="عدد الحقول" value={`${PRO_STEPS.reduce((sum, step) => sum + step.fields.length, 0)}`} />
              </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" dir="rtl" className="gap-4">
          <TabsList className="grid h-auto w-full grid-cols-4 rounded-xl md:w-fit">
            <TabsTrigger value="overview">الملخص</TabsTrigger>
            <TabsTrigger value="inputs">كل الإدخالات</TabsTrigger>
            <TabsTrigger value="gaps" className="relative">
              كشف الفجوات
              {dangerGaps > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="mvp">قوة MVP</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-4">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-4">
              <h1 className="text-3xl font-black text-foreground">{getFieldValue(answers, 'executive_summary', 'name') || 'اسم المشروع غير محدد'}</h1>
              <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
                {getFieldValue(answers, 'executive_summary', 'one_liner') || 'لم يتم إدخال وصف المشروع (Elevator Pitch) بعد.'}
              </p>
            </div>

            {/* Executive Summary */}
            <Card className="border-primary/10 shadow-none bg-primary/[0.02]">
              <CardHeader className="pb-3 border-b border-primary/10">
                <CardTitle className="text-lg flex items-center gap-2 text-primary">
                  <BriefcaseBusiness className="size-5" />
                  الملخص التنفيذي
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm mb-1 text-foreground">المشكلة الجوهرية</h4>
                    <p className="text-sm leading-6 text-muted-foreground">{getAnswerText(answers['target_customer.core_pain'])}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 text-foreground">الحل المقترح (UVP)</h4>
                    <p className="text-sm leading-6 text-muted-foreground">{getAnswerText(answers['product_operations.uvp'])}</p>
                  </div>
                </div>
                <div className="space-y-4 bg-background p-4 rounded-xl border border-border/50">
                  <div>
                    <h4 className="font-bold text-sm mb-1 text-foreground">الرؤية الاستراتيجية</h4>
                    <p className="text-sm leading-6 text-muted-foreground">{getAnswerText(answers['executive_summary.vision'])}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 text-foreground">التمويل المطلوب</h4>
                    <p className="text-sm leading-6 text-emerald-600 font-semibold">{getAnswerText(answers['financial_model.funding_ask'])}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Market Analysis */}
              <Card className="shadow-none border-border/50">
                <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="size-5 text-blue-500" />
                    تحليل السوق (TAM/SAM/SOM)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">حجم السوق الكلي (TAM)</div>
                    <div className="font-bold text-sm">{getAnswerText(answers['market_analysis.tam'])}</div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">السوق القابل للخدمة والمستهدف (SAM/SOM)</div>
                    <div className="font-bold text-sm">{getAnswerText(answers['market_analysis.sam_som'])}</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1 text-foreground">تحليل المنافسة</h4>
                    <p className="text-sm leading-6 text-muted-foreground">{getAnswerText(answers['market_analysis.competitors'])}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Marketing & Sales (GTM) */}
              <Card className="shadow-none border-border/50">
                <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Target className="size-5 text-amber-500" />
                    استراتيجية الاختراق (GTM)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <h4 className="font-bold text-sm mb-1 text-foreground">قنوات الاستحواذ الرئيسية</h4>
                    <p className="text-sm leading-6 text-muted-foreground">{getAnswerText(answers['marketing_sales.acquisition_channels'])}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border border-border/50 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">دورة المبيعات المتوقعة</div>
                      <div className="font-bold text-sm">{getFieldValue(answers, 'marketing_sales', 'sales_cycle') || '-'}</div>
                    </div>
                    <div className="p-3 border border-border/50 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-1">استراتيجية الاحتفاظ</div>
                      <div className="font-bold text-sm">{getFieldValue(answers, 'marketing_sales', 'retention_strategy') || '-'}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Financial Projections */}
            <Card className="shadow-none border-border/50">
              <CardHeader className="pb-3 border-b border-border/50 bg-emerald-500/5">
                <CardTitle className="text-base flex items-center gap-2 text-emerald-700">
                  <LineChart className="size-5" />
                  المؤشرات المالية (Unit Economics)
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-background border border-border/50 rounded-xl text-center">
                  <div className="text-xs text-muted-foreground mb-1">التأسيس (CAPEX)</div>
                  <div className="text-lg font-bold">{getFieldValue(answers, 'financial_model', 'capex') || '-'}</div>
                </div>
                <div className="p-4 bg-background border border-border/50 rounded-xl text-center">
                  <div className="text-xs text-muted-foreground mb-1">تكلفة استحواذ العميل (CAC)</div>
                  <div className="text-lg font-bold text-red-500">{getFieldValue(answers, 'marketing_sales', 'cac_target') || '-'}</div>
                </div>
                <div className="p-4 bg-background border border-border/50 rounded-xl text-center">
                  <div className="text-xs text-muted-foreground mb-1">القيمة العمرية للعميل (LTV)</div>
                  <div className="text-lg font-bold text-emerald-600">{getFieldValue(answers, 'financial_model', 'ltv') || '-'}</div>
                </div>
                <div className="p-4 bg-background border border-border/50 rounded-xl text-center">
                  <div className="text-xs text-muted-foreground mb-1">التشغيل الشهري (OPEX)</div>
                  <div className="text-lg font-bold">{getFieldValue(answers, 'financial_model', 'opex') || '-'}</div>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* SWOT */}
              <Card className="shadow-none border-border/50">
                <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShieldAlert className="size-5 text-purple-500" />
                    تحليل SWOT والمخاطر
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 grid sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <h4 className="font-bold text-emerald-700 text-sm mb-2">نقاط القوة (S)</h4>
                    <p className="text-xs text-emerald-900/80 leading-5">{getAnswerText(answers['swot_risk.strengths'])}</p>
                  </div>
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <h4 className="font-bold text-red-700 text-sm mb-2">نقاط الضعف (W)</h4>
                    <p className="text-xs text-red-900/80 leading-5">{getAnswerText(answers['swot_risk.weaknesses'])}</p>
                  </div>
                  <div className="sm:col-span-2 mt-2 p-3 bg-muted/30 rounded-lg">
                    <h4 className="font-bold text-sm mb-1 text-foreground">خطة تخفيف المخاطر</h4>
                    <p className="text-xs leading-5 text-muted-foreground">{getAnswerText(answers['swot_risk.risk_mitigation'])}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Roadmap */}
              <Card className="shadow-none border-border/50">
                <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Gauge className="size-5 text-indigo-500" />
                    خطة التنفيذ (Roadmap)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="relative border-r-2 border-primary/20 pr-4 space-y-6 my-2">
                    <div className="relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -right-[23px] top-1"></div>
                      <h4 className="font-bold text-sm text-foreground">الربع الأول (Q1)</h4>
                      <p className="text-xs text-muted-foreground leading-5 mt-1">{getAnswerText(answers['implementation_plan.q1_milestone'])}</p>
                    </div>
                    <div className="relative">
                      <div className="absolute w-3 h-3 bg-primary/40 rounded-full -right-[23px] top-1"></div>
                      <h4 className="font-bold text-sm text-foreground">الأرباع التالية (Q2-Q4)</h4>
                      <p className="text-xs text-muted-foreground leading-5 mt-1">{getAnswerText(answers['implementation_plan.q2_q4_milestone'])}</p>
                    </div>
                    <div className="relative">
                      <div className="absolute w-3 h-3 bg-primary/20 rounded-full -right-[23px] top-1"></div>
                      <h4 className="font-bold text-sm text-foreground">مؤشرات الأداء (KPIs)</h4>
                      <p className="text-xs text-muted-foreground leading-5 mt-1">{getAnswerText(answers['implementation_plan.kpis'])}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inputs">
            <Card className="border-0 bg-muted/20 shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">كل إدخالات المستخدم حسب أقسام دراسة الجدوى</CardTitle>
                <CardDescription>كل صف يمثل قسماً احترافياً، وكل حقل داخله قابل للمراجعة والتعديل.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-48">القسم</TableHead>
                      <TableHead>الحقول والمدخلات</TableHead>
                      <TableHead className="w-32">الإجراء</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {PRO_STEPS.map((step, index) => (
                      <TableRow key={step.id}>
                        <TableCell className="font-medium">{step.title}</TableCell>
                        <TableCell>
                          <div className="grid gap-3 md:grid-cols-2">
                            {step.fields.map((field) => (
                              <div key={field.id} className="rounded-lg bg-background p-3">
                                <div className="text-xs font-semibold text-foreground">{field.label}</div>
                                <p className="mt-1 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                                  {getAnswerText(answers[answerKey(step.id, field.id)])}
                                </p>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" onClick={() => onEdit(index)}>
                            تعديل
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gaps" className="space-y-4">
            <Card className="border-0 bg-muted/20 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldAlert className="size-5 text-primary" />
                  محرك فحص الجدوى والفجوات
                </CardTitle>
                <CardDescription>
                  يقوم المحرك بتحليل مدخلاتك للبحث عن تناقضات أو فجوات خطيرة قد تؤدي إلى فشل المشروع مبكراً.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {gaps.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center bg-background rounded-xl">
                    <CheckCircle2 className="size-12 text-emerald-500 mb-4 opacity-20" />
                    <p className="text-muted-foreground text-sm">أكمل المزيد من الحقول (خاصة المالية والتنافسية) ليتمكن المحرك من تحليل الفجوات.</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {gaps.map(gap => (
                      <div key={gap.id} className={cn("p-4 rounded-xl border flex gap-3 items-start", 
                        gap.type === 'danger' ? "bg-red-500/10 border-red-500/20" : 
                        gap.type === 'warning' ? "bg-amber-500/10 border-amber-500/20" : 
                        "bg-emerald-500/10 border-emerald-500/20"
                      )}>
                        {gap.type === 'danger' && <XCircle className="size-5 text-red-600 shrink-0 mt-0.5" />}
                        {gap.type === 'warning' && <AlertTriangle className="size-5 text-amber-600 shrink-0 mt-0.5" />}
                        {gap.type === 'success' && <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />}
                        <div>
                          <h4 className={cn("font-bold text-sm mb-1", 
                            gap.type === 'danger' ? "text-red-800" : 
                            gap.type === 'warning' ? "text-amber-800" : 
                            "text-emerald-800"
                          )}>{gap.title}</h4>
                          <p className={cn("text-xs leading-6", 
                            gap.type === 'danger' ? "text-red-900/80" : 
                            gap.type === 'warning' ? "text-amber-900/80" : 
                            "text-emerald-900/80"
                          )}>{gap.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mvp" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <PrototypeCard title="الرؤية والمشكلة" value={answers['executive_summary.vision']} />
              <PrototypeCard title="قنوات الاستحواذ" value={answers['marketing_sales.acquisition_channels']} />
              <PrototypeCard title="مؤشرات الأداء" value={answers['implementation_plan.kpis']} />
            </div>

            <Card className="border-0 bg-muted/20 shadow-none">
              <CardHeader>
                <CardTitle className="text-lg">تصنيفات واختيارات مؤثرة</CardTitle>
                <CardDescription>تساعد هذه التصنيفات في نقل المشروع إلى خطة تنفيذ أو نموذج مالي لاحقاً.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedTags.length ? (
                    selectedTags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-md">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">لم يتم اختيار تصنيفات إضافية.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={onRestart}>إعادة بناء الرحلة</Button>
          <Button onClick={() => window.print()}>طباعة اللوحة</Button>
        </div>
      </div>
    </div>
  );
}

function SummaryBlock({ label, value }: { label: string; value: string | string[] | undefined }) {
  return (
    <div className="rounded-xl bg-background p-4">
      <div className="text-xs font-medium text-muted-foreground">{label}</div>
      <p className="mt-2 line-clamp-4 text-sm leading-7">{getAnswerText(value)}</p>
    </div>
  );
}

function PrototypeCard({ title, value }: { title: string; value: string | string[] | undefined }) {
  const hasValue = getAnswerText(value) !== EMPTY_MESSAGE;

  return (
    <Card className="border-0 bg-muted/20 shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {hasValue ? <CheckCircle2 className="size-4 text-primary" /> : <Target className="size-4 text-muted-foreground" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-7 text-muted-foreground">{getAnswerText(value)}</p>
      </CardContent>
    </Card>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="border-0 bg-muted/40 shadow-none">
      <CardContent className="p-3">
        <div className="text-xs font-medium text-muted-foreground">{label}</div>
        <div className="mt-2 text-2xl font-semibold text-foreground">{value}</div>
      </CardContent>
    </Card>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: ProField;
  value: string;
  onChange: (value: string) => void;
}) {
  const commonClassName = 'bg-background text-right leading-7';

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
        {field.label}
        {field.required ? <span className="text-destructive">*</span> : null}
      </label>
      {field.type === 'textarea' ? (
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          className={cn('min-h-24 resize-none', commonClassName)}
        />
      ) : (
        <Input
          type={field.type === 'number' ? 'number' : 'text'}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          className={commonClassName}
        />
      )}
    </div>
  );
}

export default function SmartBeginnerPro() {
  const [phase, setPhase] = useState<'form' | 'dashboard'>('form');
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const currentStep = PRO_STEPS[stepIndex];
  const completedCount = getCompletedCount(answers);
  const readiness = useMemo(() => inferReadiness(answers), [answers]);
  const isLastStep = stepIndex === PRO_STEPS.length - 1;
  const currentOptions = answers[`${currentStep.id}.options`];
  const StepIcon = currentStep.icon;

  const updateField = (fieldId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [answerKey(currentStep.id, fieldId)]: value }));
  };

  const updateOption = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`${currentStep.id}.options`]: toggleOption(prev[`${currentStep.id}.options`], option),
    }));
  };

  const goNext = () => {
    if (isLastStep) {
      setPhase('dashboard');
      return;
    }
    setStepIndex((current) => current + 1);
  };

  const restart = () => {
    setPhase('form');
    setStepIndex(0);
    setAnswers({});
  };

  if (phase === 'dashboard') {
    return (
      <ProjectDashboard
        answers={answers}
        onEdit={(index) => {
          setStepIndex(index);
          setPhase('form');
        }}
        onRestart={restart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-3 py-3 sm:px-4 lg:px-5">
        <Card className="border-0 bg-background shadow-none">
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="space-y-3 text-right">
                <Badge variant="secondary" className="w-fit rounded-md px-3 py-1">
                  النموذج الاحترافي
                </Badge>
                <div className="space-y-2">
                  <CardTitle className="text-2xl leading-tight sm:text-3xl">
                    ورشة احترافية لبناء النموذج الأولي لدراسة الجدوى
                  </CardTitle>
                  <CardDescription className="line-clamp-3 max-w-3xl text-sm leading-6">
                    إدخال منظم على طريقة دراسات الجدوى الاحترافية: حقول محددة، فرضيات واضحة، أرقام أولية، مخاطر، وخطة تحقق. المخرج النهائي لوحة مشروع كاملة يمكن البناء عليها مباشرة.
                  </CardDescription>
                </div>
              </div>

              <div className="grid w-full gap-3 sm:grid-cols-3 xl:w-[560px]">
                <MetricCard label="المرحلة الحالية" value={`${stepIndex + 1}`} />
                <MetricCard label="أقسام مكتملة" value={`${completedCount}/${PRO_STEPS.length}`} />
                <MetricCard label="جاهزية الدراسة" value={`${readiness.score}%`} />
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-4 xl:grid-cols-[280px_1fr]">
          <Card className="border-0 bg-muted/20 shadow-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <ClipboardList className="size-5" />
                سلسلة الدراسة
              </CardTitle>
              <CardDescription className={cn('leading-6', readiness.tone)}>
                {readiness.label}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {PRO_STEPS.map((step, index) => {
                const Icon = step.icon;
                const active = index === stepIndex;
                const complete = getStepCompletion(step, answers) >= 0.5;

                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setStepIndex(index)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-sm transition-colors',
                      active ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:bg-background/70',
                    )}
                  >
                    <span className={cn('flex size-8 items-center justify-center rounded-lg', active ? 'bg-primary text-primary-foreground' : 'bg-background')}>
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium">{step.shortTitle}</span>
                    {complete ? <CheckCircle2 className="size-4 text-primary" /> : null}
                  </button>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-0 bg-muted/20 shadow-none">
            <CardHeader className="gap-3 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
                    <StepIcon className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg sm:text-xl">{currentStep.title}</CardTitle>
                    <CardDescription className="leading-6">{currentStep.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="w-fit rounded-md">
                  {stepIndex + 1} من {PRO_STEPS.length}
                </Badge>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-background">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${((stepIndex + 1) / PRO_STEPS.length) * 100}%` }} />
              </div>
            </CardHeader>

            <CardContent className="space-y-4 p-4 pt-0">
              <div className="rounded-xl bg-background p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Target className="size-4" />
                  ملاحظة احترافية
                </div>
                <p className="text-xs leading-6 text-muted-foreground">{currentStep.professionalNote}</p>
              </div>

              <div className="grid gap-3 lg:grid-cols-2">
                {currentStep.fields.map((field) => (
                  <FieldControl
                    key={field.id}
                    field={field}
                    value={getFieldValue(answers, currentStep.id, field.id)}
                    onChange={(value) => updateField(field.id, value)}
                  />
                ))}
              </div>

              {currentStep.options?.length ? (
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-foreground">{currentStep.optionsLabel}</div>
                  <div className="flex flex-wrap gap-2">
                    {currentStep.options.map((option) => {
                      const active = Array.isArray(currentOptions) && currentOptions.includes(option);

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateOption(option)}
                          className={cn(
                            'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                            active
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-background text-muted-foreground hover:text-foreground',
                          )}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <Separator />

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs leading-6 text-muted-foreground">
                  الحقول المعلّمة بنجمة هي الحد الأدنى لجعل هذا القسم قابلاً للاستخدام في دراسة جدوى احترافية.
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
                    disabled={stepIndex === 0}
                  >
                    <ArrowRight className="size-4" />
                    السابق
                  </Button>
                  <Button type="button" onClick={goNext}>
                    {isLastStep ? 'عرض لوحة المشروع' : 'المرحلة التالية'}
                    <ChevronLeft className="size-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
