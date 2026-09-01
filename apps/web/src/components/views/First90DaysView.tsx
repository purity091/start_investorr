import React, { useState, useEffect, useRef } from 'react';
import {
  CalendarRange,
  BriefcaseBusiness,
  LayoutGrid,
  Target,
  ListTodo,
  Check,
  Trophy,
  Lightbulb,
  Pencil,
  ArrowUp,
  ArrowDown,
  Plus,
  RotateCcw,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  SlidersHorizontal,
  Save,
  Loader2,
  Cloud,
  AlertCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/features/auth/AuthContext';
import { First90DaysGantt } from './First90DaysGantt';
import type { PersistedGanttLink } from './First90DaysGantt';
import { First90DaysKanban } from './First90DaysKanban';
import { getFirst90DaysProjectId, getFirst90DaysProjectPath } from '@/utils/routes';
import {
  PLAN_START_STORAGE_KEY,
  addDays,
  getDefaultTaskDates,
  getPlanStartDate,
  getScheduleMeta,
  fromDateKey,
  normalizeTasks,
  PLAN_MONTHS,
  toDateKey,
} from './first90DaysTaskUtils';
import type { PlanMonth, TaskItem } from './first90DaysTaskUtils';

const TASKS_STORAGE_KEY = 'first_90_days_tasks';
const LINKS_STORAGE_KEY = 'first_90_days_gantt_links';

type First90DaysPlanRow = {
  project_id: string | null;
  plan_start_date: string;
  tasks: unknown;
  links: unknown;
  updated_at: string | null;
};

type LaunchProject = {
  id: string;
  project_title: string | null;
  sector_label: string | null;
  current_stage: string | null;
  readiness_score: number | null;
  validation_score: number | null;
  execution_score: number | null;
  updated_at: string;
  hasPlan: boolean;
  plan_updated_at: string | null;
};

const getProjectStorageKey = (key: string, projectId: string) => `${key}_${projectId}`;

const isLinkTaskId = (value: unknown): value is string | number =>
  (typeof value === 'string' && value.length > 0) || typeof value === 'number';

const isPersistedLinkType = (value: unknown): value is PersistedGanttLink['type'] =>
  value === 's2s' || value === 's2e' || value === 'e2s' || value === 'e2e';

const normalizeStoredLinks = (value: unknown): PersistedGanttLink[] => {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const candidate = item as Partial<PersistedGanttLink>;
    if (
      !isLinkTaskId(candidate.id) ||
      !isLinkTaskId(candidate.source) ||
      !isLinkTaskId(candidate.target) ||
      !isPersistedLinkType(candidate.type)
    ) return [];

    return [{
      id: candidate.id,
      source: candidate.source,
      target: candidate.target,
      type: candidate.type,
      ...(typeof candidate.lag === 'number' ? { lag: candidate.lag } : {}),
    }];
  });
};

const getPlanSnapshot = (planStartDate: Date, tasks: TaskItem[], links: PersistedGanttLink[]) =>
  JSON.stringify({ planStartDate: toDateKey(planStartDate), tasks, links });

const INITIAL_TASKS: TaskItem[] = [
  // Month 1
  {
    id: 'm1-1',
    month: 1,
    week: 1,
    title: 'إجراء 10 مقابلات استكشافية مع عملاء محتملين',
    description: 'التحدث المباشر مع 10 أشخاص من الشريحة المستهدفة للتحقق من وجود ألم حقيقي قبل بناء أي جزء من المنتج.',
    deliverable: '10 مقابلات موثقة بمشاكل العميل الحقيقية',
    whyItMatters: 'تجنب إضاعة الوقت والأموال في بناء حل لا يريده أحد. التوثيق المباشر يمنحك ميزة تنافسية ضخمة.',
    category: 'validation',
    completed: true,
  },
  {
    id: 'm1-2',
    month: 1,
    week: 2,
    title: 'صياغة القيمة المقترحة الفائقة (Value Proposition)',
    description: 'تحديد ما الذي يجعلك فريداً بوضوح شديد في جملة واحدة يفهمها العميل في 5 ثوانٍ دون غموض.',
    deliverable: 'صياغة عروض القيمة في جملة ناطقة بـ Value Proposition',
    whyItMatters: 'العميل لا يشتري مواصفات تقنية بل يشتري النتيجة والتحول السريع الذي يمنحه له عرضك.',
    category: 'validation',
    completed: true,
  },
  {
    id: 'm1-3',
    month: 1,
    week: 3,
    title: 'تصميم النموذج الأول المبسط (Wireframe / Prototype)',
    description: 'رسم واجهات أو خطوات الخدمة على الورق أو باستخدام أدوات بسيطة لاختبار تفاعل العميل المبدئي.',
    deliverable: 'مخطط الواجهات أو مسار الخدمة المبسط واختباره',
    whyItMatters: 'رؤية نموذج ملموس تسهم في كشف الثغرات المنطقية قبل البدء في التطوير البرمجي أو التشغيلي المكلف.',
    category: 'product',
    completed: false,
  },
  {
    id: 'm1-4',
    month: 1,
    week: 4,
    title: 'إعداد صفحة الهبوط وتجميع أول 50 مهتم (Waitlist)',
    description: 'إنشاء صفحة بسيطة تشرح الفكرة وتطلب البريد أو الهاتف للانضمام لقائمة الانتظار المبكرة.',
    deliverable: 'صفحة هبوط شغالة مع 50 بريد/عميل مهتم مسجل',
    whyItMatters: 'قائمة الانتظار هي دليل السوق الأولي القابل للقياس وتمنحك قاعدة انطلاق حقيقية عند الإطلاق.',
    category: 'marketing',
    completed: false,
  },

  // Month 2
  {
    id: 'm2-1',
    month: 2,
    week: 5,
    title: 'إطلاق النسخة الأولية القابلة للتجربة (MVP Launch)',
    description: 'تقديم أصغر نسخة تعمل وتؤدي الخدمة الأساسية بدون تعقيدات أو ميزات إضافية زائدة.',
    deliverable: 'رابط النسخة الأولية MVP جاهز للاستخدام المباشر',
    whyItMatters: 'الإطلاق السريع يمنحك التغذية الراجعة الواقعية من الاستخدام بدلاً من الاستغراق في التكهنات.',
    category: 'product',
    completed: false,
  },
  {
    id: 'm2-2',
    month: 2,
    week: 6,
    title: 'الحصول على أول عميل يدفع مقابل الخدمة (First Paying Customer)',
    description: 'إغلاق عملية بيع حقيقية مقابل مقابل مالي ولو رمزياً لاختبار الجاهزية الفعلية للدفع.',
    deliverable: 'إغلاق أول صفقة وتحصيل مقابل مالي حقيقي',
    whyItMatters: 'الدفع المالي هو الدليل الحاسم والوحيد على وجود مشروع تجاري ناجح وليس مجرد مجاملات لطيفة.',
    category: 'operations',
    completed: false,
  },
  {
    id: 'm2-3',
    month: 2,
    week: 7,
    title: 'جمع وتدوين التغذية الراجعة من المستخدمين الأوائل',
    description: 'التواصل الفردي مع كل مستخدم جرب MVP ومعرفة نقاط الصعوبة والرضا لديه.',
    deliverable: 'تقرير الملاحظات والتعديلات المطلوبة للنسخة القادمة',
    whyItMatters: 'المستخدمون الأوائل هم البوصلة الحقيقية التي توجه تطوير المنتج للوصول للملاءمة مع السوق (PMF).',
    category: 'validation',
    completed: false,
  },
  {
    id: 'm2-4',
    month: 2,
    week: 8,
    title: 'تحديد تكلفة جذب العميل الأولي (CAC Baseline)',
    description: 'حساب النفقات والجهد المبذول للحصول على كل عميل جديد لمعرفة مدى استدامة النموذج.',
    deliverable: 'معادلة تكلفة العميل المبكرة (CAC) واضحة ومقاسة',
    whyItMatters: 'فهم معادلة الاقتصاديات المبكرة يساعدك في تقدير الاحتياج المالي للنمو وتجنب الاستنزاف.',
    category: 'operations',
    completed: false,
  },

  // Month 3
  {
    id: 'm3-1',
    month: 3,
    week: 9,
    title: 'تحسين تجربة المستخدم وسد الثغرات التشغيلية',
    description: 'تعديل الرحلة وتسهيل استخدام المنتج بناءً على الملاحظات المستلمة في الشهر الثاني.',
    deliverable: 'نسخة محسنة وسريعة تضمن استمرارية الاستخدام',
    whyItMatters: 'رفع نسبة رضا العميل الحالي يقلل التسرب ويجعل النمو أسرع وأقل تكلفة.',
    category: 'product',
    completed: false,
  },
  {
    id: 'm3-2',
    month: 3,
    week: 10,
    title: 'اختبار قناة تسويق واحدة متكررة (Repeatable Channel)',
    description: 'التركيز على قناة واحدة (محتوى، تسويق مباشر، إعلانات) وااختبار استدامتها.',
    deliverable: 'قناة جذب واحدة تولد مهتمين بشكل أسبوعي ثابت',
    whyItMatters: 'الشركات الناجحة لا تشتت جهودها بل تتقن قناة استقطاب رئيسية واحدة تضمن لها التدفق.',
    category: 'marketing',
    completed: false,
  },
  {
    id: 'm3-3',
    month: 3,
    week: 11,
    title: 'قياس نسبة الاحتفاظ وتكرار التعامل (Retention Rate)',
    description: 'معرفة كم نسبة العملاء الذين يعودون لاستخدام أو طلب الخدمة مجدداً.',
    deliverable: 'مؤشر عودة العملاء ورضاهم فوق نسبة 30%',
    whyItMatters: 'الاحتفاظ بالعملاء أهم من تجنيد عملاء جدد لتجنب مشكلة "سطل الماء المثقوب".',
    category: 'operations',
    completed: false,
  },
  {
    id: 'm3-4',
    month: 3,
    week: 12,
    title: 'تقييم الـ 90 يوم واتخاذ القرار الاستراتيجي (Pivot / Scale)',
    description: 'مراجعة كافة الأرقام والمؤشرات ومقارنتها بالأهداف الموضوعة لاتخاذ القرار المستقبلي.',
    deliverable: 'وثيقة القرار: التوسع في النمو أو تعديل مسار المشروع',
    whyItMatters: 'نهاية 90 يوم هي نقطة مفصلية للمؤسس لوضع استراتيجية المرحلة التالية أو تعديل الاتجاه بنجاح.',
    category: 'operations',
    completed: false,
  },
];

const ANNUAL_EXTENSION_TASKS: TaskItem[] = [
  {
    id: 'm4-1', month: 4, week: 13, title: 'تثبيت ملاءمة المنتج مع السوق (PMF)',
    description: 'تحليل سلوك العملاء الأوائل وتحديد الشريحة الأكثر استخداماً وقيمة، ثم توثيق مؤشرات الملاءمة الأولية.',
    deliverable: 'تعريف واضح بالشريحة الأساسية ومؤشرات PMF المستهدفة',
    whyItMatters: 'التركيز على العميل المناسب يمنع تبديد ميزانية التسويق ويجعل قرارات المنتج أكثر دقة.', category: 'validation', completed: false,
  },
  {
    id: 'm4-2', month: 4, week: 14, title: 'إعادة تصميم تجربة التهيئة للعميل (Onboarding)',
    description: 'تقليل الخطوات الأولى وإضافة إرشادات عملية تساعد العميل على الوصول إلى القيمة الأساسية بسرعة.',
    deliverable: 'مسار تهيئة يقود العميل إلى أول قيمة خلال دقائق',
    whyItMatters: 'الوصول المبكر إلى القيمة يرفع التفعيل ويقلل فقدان العملاء قبل بدء الاستخدام الحقيقي.', category: 'product', completed: false,
  },
  {
    id: 'm4-3', month: 4, week: 15, title: 'بناء نظام دعم وتوثيق للعملاء',
    description: 'إعداد قاعدة معرفة وقنوات دعم واضحة مع توثيق الأسئلة المتكررة وحلول المشكلات.',
    deliverable: 'مركز مساعدة وقواعد تصعيد للدعم قابلة للقياس',
    whyItMatters: 'الدعم المنظم يحافظ على ثقة العملاء ويقلل اعتماد المشروع على المؤسس في كل طلب.', category: 'operations', completed: false,
  },
  {
    id: 'm4-4', month: 4, week: 16, title: 'إطلاق نسخة محسنة بناءً على بيانات الاستخدام',
    description: 'ترتيب التحسينات حسب أثرها على التفعيل والاحتفاظ وإطلاق تحديث صغير قابل للقياس.',
    deliverable: 'إصدار محسن مع تقرير أثر قبل وبعد',
    whyItMatters: 'التطوير القائم على البيانات يحول الملاحظات إلى نتائج فعلية بدلاً من تراكم الميزات.', category: 'product', completed: false,
  },
  {
    id: 'm5-1', month: 5, week: 17, title: 'اختبار استراتيجية التسعير والباقات',
    description: 'مقارنة بدائل التسعير وربط كل باقة بالقيمة التي يحصل عليها العميل وحدود الاستخدام.',
    deliverable: 'صفحة أسعار بثلاثة مستويات واختبار عرض واضح',
    whyItMatters: 'التسعير الصحيح يضاعف الإيراد دون مضاعفة الجهد ويكشف العملاء الأكثر جدية.', category: 'operations', completed: false,
  },
  {
    id: 'm5-2', month: 5, week: 18, title: 'قياس اقتصاديات الوحدة (Unit Economics)',
    description: 'حساب CAC وLTV والهامش الإجمالي وفترة استرداد تكلفة اكتساب العميل لكل قناة.',
    deliverable: 'لوحة مؤشرات اقتصادية محدثة شهرياً',
    whyItMatters: 'لا يمكن توسيع مشروع غير مربح على مستوى العميل مهما كان حجم المبيعات.', category: 'operations', completed: false,
  },
  {
    id: 'm5-3', month: 5, week: 19, title: 'إنشاء نظام قياس وتحليلات موحد',
    description: 'توحيد تعريفات الأحداث والتحويلات وربطها بمصدر واحد للقرارات الأسبوعية.',
    deliverable: 'خريطة أحداث ولوحة تحليلات للإيراد والتحويل والاحتفاظ',
    whyItMatters: 'القياس الموحد يمنع القرارات المبنية على الانطباع ويكشف نقاط التسرب في القمع.', category: 'product', completed: false,
  },
  {
    id: 'm5-4', month: 5, week: 20, title: 'تحسين التحويل من المهتم إلى عميل',
    description: 'مراجعة الرسائل والعروض وتجربة خطوات الدفع أو التعاقد لتقليل الاحتكاك في البيع.',
    deliverable: 'تحسن موثق في معدل التحويل من المهتمين إلى عملاء',
    whyItMatters: 'تحسين القمع الحالي غالباً أسرع وأقل تكلفة من البحث المستمر عن زيارات جديدة.', category: 'marketing', completed: false,
  },
  {
    id: 'm6-1', month: 6, week: 21, title: 'توثيق إجراءات التشغيل القياسية (SOPs)',
    description: 'كتابة خطوات تشغيل التسليم والدعم والمبيعات والفوترة مع مالك واضح لكل إجراء.',
    deliverable: 'دليل تشغيل داخلي قابل للتفويض',
    whyItMatters: 'الإجراءات المكتوبة تجعل الجودة قابلة للتكرار وتحرر المؤسس من العمل التشغيلي المتكرر.', category: 'operations', completed: false,
  },
  {
    id: 'm6-2', month: 6, week: 22, title: 'رفع جودة المنتج والموثوقية',
    description: 'تحديد أكثر الأعطال تأثيراً وإضافة اختبارات ومراقبة للأجزاء الحرجة قبل زيادة الحمل.',
    deliverable: 'خطة جودة ومؤشرات توافر واستجابة واضحة',
    whyItMatters: 'الثقة والاعتمادية شرطان أساسيان للاحتفاظ بالعملاء عند الانتقال من التجربة إلى التوسع.', category: 'product', completed: false,
  },
  {
    id: 'm6-3', month: 6, week: 23, title: 'تأمين البيانات والامتثال الأساسي',
    description: 'مراجعة الصلاحيات والنسخ الاحتياطي وسياسة الخصوصية وشروط الاستخدام والالتزامات المحلية.',
    deliverable: 'قائمة تحقق أمنية وقانونية موقعة ومراجعة دورية',
    whyItMatters: 'المخاطر القانونية أو الأمنية المتأخرة قد توقف النمو وتضر بالثقة أكثر من أي منافس.', category: 'operations', completed: false,
  },
  {
    id: 'm6-4', month: 6, week: 24, title: 'تحديد أهداف الربع القادم بنظام OKR',
    description: 'تحويل الاستراتيجية إلى أهداف ونتائج رئيسية محددة مرتبطة بمؤشرات المشروع.',
    deliverable: 'صفحة OKRs للربع القادم مع ملاك ومواعيد',
    whyItMatters: 'الأهداف المحددة تمنع تشتت الفريق وتربط كل مهمة بنتيجة تجارية قابلة للمراجعة.', category: 'operations', completed: false,
  },
  {
    id: 'm7-1', month: 7, week: 25, title: 'اختيار قناة نمو قابلة للتكرار',
    description: 'توسيع القناة التي أثبتت أفضل تكلفة وجودة للعملاء مع فرضية نمو واضحة وتجارب أسبوعية.',
    deliverable: 'خطة تجارب نمو شهرية مع خط أساس ومؤشر نجاح',
    whyItMatters: 'قناة واحدة متقنة أفضل من توزيع الموارد على قنوات كثيرة دون معرفة ما يعمل.', category: 'marketing', completed: false,
  },
  {
    id: 'm7-2', month: 7, week: 26, title: 'بناء محرك محتوى وطلب مستمر',
    description: 'إنشاء تقويم محتوى يجيب عن أسئلة العملاء ويقود إلى عرض واضح مع إعادة استخدام المحتوى.',
    deliverable: 'تقويم محتوى 8 أسابيع ومؤشرات وصول وتحويل',
    whyItMatters: 'المحتوى المتراكم يخفض تكلفة الوصول ويمنح المشروع حضوراً موثوقاً على المدى الطويل.', category: 'marketing', completed: false,
  },
  {
    id: 'm7-3', month: 7, week: 27, title: 'تفعيل برنامج الإحالات والشراكات',
    description: 'تحديد شركاء مكملين وتصميم عرض إحالة بسيط يمكن تتبعه وقياس عائده.',
    deliverable: 'شراكتان تجريبيتان وقناة إحالات قابلة للقياس',
    whyItMatters: 'الشراكات المناسبة تفتح وصولاً أسرع إلى عملاء موثوقين دون رفع الإنفاق الإعلاني.', category: 'marketing', completed: false,
  },
  {
    id: 'm7-4', month: 7, week: 28, title: 'مراجعة هوية العلامة ورسائلها',
    description: 'توحيد الرسائل البصرية واللفظية وإثباتها عبر نقاط التواصل الرئيسية مع العملاء.',
    deliverable: 'دليل رسائل مختصر ونظام هوية متسق',
    whyItMatters: 'الوضوح والاتساق يرفعان الثقة ويجعلان المشروع أسهل تذكراً ومقارنة بالمنافسين.', category: 'marketing', completed: false,
  },
  {
    id: 'm8-1', month: 8, week: 29, title: 'إنشاء خط مبيعات ومراحل تحويل واضحة',
    description: 'تعريف مراحل العميل المحتمل من التأهيل إلى الإغلاق مع معيار انتقال واضح لكل مرحلة.',
    deliverable: 'قمع مبيعات موثق ولوحة فرص محدثة',
    whyItMatters: 'القمع المرئي يكشف أين تضيع الفرص ويجعل توقع الإيراد أكثر واقعية.', category: 'operations', completed: false,
  },
  {
    id: 'm8-2', month: 8, week: 30, title: 'توحيد عرض البيع والعروض التجريبية',
    description: 'إعداد عرض تقديمي وقصة قيمة ودراسة حالة ونص تجربة يساعد الفريق على البيع بثبات.',
    deliverable: 'حزمة مبيعات تشمل العرض ودراسة حالة ونص العرض',
    whyItMatters: 'الرسالة الموحدة تقلل وقت البيع وتحافظ على جودة التجربة مهما توسع الفريق.', category: 'marketing', completed: false,
  },
  {
    id: 'm8-3', month: 8, week: 31, title: 'تطبيق نظام CRM ومتابعة الفرص',
    description: 'تسجيل كل فرصة ومصدرها ومرحلتها والخطوة التالية مع مراجعة أسبوعية للبيانات.',
    deliverable: 'CRM محدث بنسبة التزام عالية وتقرير أسبوعي',
    whyItMatters: 'المتابعة المنظمة تمنع فقدان الفرص وتحوّل المبيعات من الذاكرة إلى عملية قابلة للتوسع.', category: 'operations', completed: false,
  },
  {
    id: 'm8-4', month: 8, week: 32, title: 'اختبار مبيعات B2B أو عقود سنوية',
    description: 'تجربة عرض أعلى قيمة أو عقد سنوي مع شريحة مناسبة لرفع متوسط الإيراد وتقليل التسرب.',
    deliverable: 'ثلاث فرص مؤهلة وعرض تجاري سنوي مختبر',
    whyItMatters: 'تنويع نوع العميل والعقد يحسن التدفق النقدي ويزيد القدرة على التخطيط.', category: 'operations', completed: false,
  },
  {
    id: 'm9-1', month: 9, week: 33, title: 'تحسين الاحتفاظ وتقليل التسرب',
    description: 'تحليل أسباب الإلغاء وتحديد تدخلات استباقية للعملاء المعرضين للمغادرة.',
    deliverable: 'خطة إنقاذ عملاء ومؤشر تسرب مستهدف',
    whyItMatters: 'كل عميل محفوظ يرفع قيمة المشروع ويقلل الحاجة إلى تعويضه بعميل جديد.', category: 'validation', completed: false,
  },
  {
    id: 'm9-2', month: 9, week: 34, title: 'إطلاق ميزات التوسع والبيع الإضافي',
    description: 'تحديد ما يحتاجه العملاء الحاليون بعد نجاحهم الأول وتقديم عرض ترقية منطقي.',
    deliverable: 'مسار ترقية وتجربة بيع إضافي للعملاء الحاليين',
    whyItMatters: 'النمو من العملاء الحاليين عادة أسرع وأعلى هامشاً من اكتساب جمهور جديد.', category: 'product', completed: false,
  },
  {
    id: 'm9-3', month: 9, week: 35, title: 'تحويل قصص العملاء إلى دراسات حالة',
    description: 'توثيق النتائج قبل وبعد بإذن العملاء وتحويلها إلى مواد ثقة قابلة للاستخدام في التسويق والمبيعات.',
    deliverable: 'ثلاث دراسات حالة موثقة وقابلة للنشر',
    whyItMatters: 'الدليل الاجتماعي يقلل تردد العملاء الجدد ويقصر دورة اتخاذ القرار.', category: 'marketing', completed: false,
  },
  {
    id: 'm9-4', month: 9, week: 36, title: 'قياس رضا العملاء وصوت العميل',
    description: 'تطبيق استبيان دوري ومقابلات نوعية وربط النتائج بقرارات المنتج والدعم.',
    deliverable: 'تقرير صوت العميل مع ثلاث أولويات تحسين',
    whyItMatters: 'الاستماع المنهجي يحافظ على الملاءمة ويكشف التغير في احتياجات السوق مبكراً.', category: 'validation', completed: false,
  },
  {
    id: 'm10-1', month: 10, week: 37, title: 'تخطيط البنية للتوسع والحمولة',
    description: 'مراجعة الأداء والتكلفة ونقاط الاختناق ووضع خطة نمو تقنية متدرجة حسب الاستخدام.',
    deliverable: 'خريطة توسع تقنية وتقدير تكلفة لكل مرحلة',
    whyItMatters: 'الاستعداد المبكر يمنع أن تصبح البنية سبباً في توقف المبيعات أو تدهور تجربة العميل.', category: 'product', completed: false,
  },
  {
    id: 'm10-2', month: 10, week: 38, title: 'تحديد أول توظيف أو تفويض استراتيجي',
    description: 'تحليل الوقت والمهارات الناقصة وتحديد الدور الذي يرفع قدرة الفريق بأكبر أثر.',
    deliverable: 'وصف وظيفي ومؤشرات نجاح وخطة تأهيل',
    whyItMatters: 'التوظيف المبني على عنق زجاجة حقيقي يمنع تضخم التكاليف ويحافظ على سرعة التنفيذ.', category: 'operations', completed: false,
  },
  {
    id: 'm10-3', month: 10, week: 39, title: 'بناء لوحة قيادة تشغيلية أسبوعية',
    description: 'جمع مؤشرات المنتج والمبيعات والتسويق والمال في لوحة واحدة مع اجتماع قرار قصير.',
    deliverable: 'لوحة قيادة أسبوعية ومسؤول لكل مؤشر',
    whyItMatters: 'المؤشرات المشتركة تسرع اكتشاف الانحراف وتحول الفريق إلى قرارات لا إلى تقارير فقط.', category: 'operations', completed: false,
  },
  {
    id: 'm10-4', month: 10, week: 40, title: 'مراجعة مخاطر استمرارية المشروع',
    description: 'تحديد الاعتماديات الحرجة ومخاطر الموردين والأمن والموظفين ووضع خطط بديلة.',
    deliverable: 'سجل مخاطر محدث وخطط استجابة مختبرة',
    whyItMatters: 'إدارة المخاطر تحمي التقدم المتراكم وتقلل أثر المفاجآت في مرحلة النمو.', category: 'operations', completed: false,
  },
  {
    id: 'm11-1', month: 11, week: 41, title: 'إعداد نموذج مالي لمدة 18 شهراً',
    description: 'بناء توقعات الإيراد والتكلفة والتدفق النقدي وفق سيناريوهات متحفظة وأساسية ومتوسعة.',
    deliverable: 'نموذج مالي قابل للتحديث مع نقطة تعادل واضحة',
    whyItMatters: 'الرؤية النقدية تمنح المؤسس وقتاً لاتخاذ القرار قبل الوصول إلى ضغط مالي.', category: 'operations', completed: false,
  },
  {
    id: 'm11-2', month: 11, week: 42, title: 'تحديد قرار التمويل أو الربحية',
    description: 'مقارنة التوسع من الإيراد بالتمويل الخارجي وتحديد الشروط التي تبرر كل خيار.',
    deliverable: 'مذكرة قرار تمويلية مع بدائل وتواريخ',
    whyItMatters: 'التمويل وسيلة لا غاية، والقرار المنضبط يحمي ملكية المؤسس وتركيز المشروع.', category: 'operations', completed: false,
  },
  {
    id: 'm11-3', month: 11, week: 43, title: 'تجهيز غرفة البيانات والمواد الاستثمارية',
    description: 'تنظيم المؤشرات والعقود والملكية الفكرية ودراسات الحالة في مساحة آمنة وقابلة للمشاركة.',
    deliverable: 'غرفة بيانات وملخص تنفيذي جاهز للمراجعة',
    whyItMatters: 'الجاهزية تقلل زمن التفاوض وتزيد ثقة الشركاء أو المستثمرين المحتملين.', category: 'operations', completed: false,
  },
  {
    id: 'm11-4', month: 11, week: 44, title: 'مراجعة الربحية لكل شريحة وقناة',
    description: 'تحليل الإيراد والهامش وتكلفة الخدمة حسب الشريحة والقناة لإيقاف الأنشطة منخفضة العائد.',
    deliverable: 'قرار تركيز على الشرائح والقنوات الأعلى ربحية',
    whyItMatters: 'ليس كل نمو جيداً؛ النمو الصحي هو الذي يضيف قيمة نقدية قابلة للاستمرار.', category: 'validation', completed: false,
  },
  {
    id: 'm12-1', month: 12, week: 45, title: 'إجراء مراجعة سنوية شاملة للنتائج',
    description: 'مقارنة الأهداف بالنتائج وتحليل ما نجح وما فشل وما يجب إيقافه أو مضاعفته.',
    deliverable: 'تقرير سنوي بالأرقام والدروس والقرارات',
    whyItMatters: 'المراجعة الصريحة تمنع تكرار الأخطاء وتحول السنة إلى معرفة تشغيلية متراكمة.', category: 'validation', completed: false,
  },
  {
    id: 'm12-2', month: 12, week: 46, title: 'تحديد استراتيجية السنة الثانية',
    description: 'اختيار اتجاه واضح بين التوسع أو التخصص أو تغيير المسار مع فرضيات ونتائج رئيسية.',
    deliverable: 'وثيقة استراتيجية السنة الثانية مع أولويات ربع سنوية',
    whyItMatters: 'التركيز الاستراتيجي يمنع دخول السنة الجديدة بقائمة أمنيات متعارضة.', category: 'operations', completed: false,
  },
  {
    id: 'm12-3', month: 12, week: 47, title: 'تثبيت خارطة المنتج والبحث والتطوير',
    description: 'ترتيب فرص المنتج حسب أثرها وثقة البيانات وتكلفة التنفيذ وربطها باحتياجات العملاء.',
    deliverable: 'خارطة منتج 12 شهراً مع معايير دخول وخروج',
    whyItMatters: 'خارطة المنتج المنضبطة تحافظ على قيمة العميل وتمنع التشتت في الميزات.', category: 'product', completed: false,
  },
  {
    id: 'm12-4', month: 12, week: 48, title: 'اعتماد خطة الإطلاق والتشغيل القادمة',
    description: 'تحويل قرارات المراجعة إلى خطة تنفيذ بملاك ومواعيد وميزانية ومؤشرات نجاح.',
    deliverable: 'خطة إطلاق وتشغيل معتمدة للربع الأول القادم',
    whyItMatters: 'الانتقال من التقييم إلى التنفيذ يحافظ على الزخم ويجعل النجاح قابلاً للمتابعة.', category: 'operations', completed: false,
  },
];

const ALL_INITIAL_TASKS = [...INITIAL_TASKS, ...ANNUAL_EXTENSION_TASKS];

const ensureAnnualTaskCoverage = (tasks: TaskItem[]) => {
  if (tasks.length === 0 || tasks.some((task) => task.month > 3)) return tasks;
  return [...tasks, ...ANNUAL_EXTENSION_TASKS];
};

const getProjectStageLabel = (stage: string | null) => {
  const labels: Record<string, string> = {
    discovery: 'اكتشاف',
    analysis: 'تحليل',
    planning: 'تخطيط',
    decision: 'اتخاذ القرار',
    execution: 'تنفيذ',
  };
  return labels[stage || ''] || 'مسودة';
};

const ProjectPlanSelection: React.FC<{
  projects: LaunchProject[];
  isLoading: boolean;
  error: string | null;
  onSelect: (project: LaunchProject) => void;
  onRetry: () => void;
  onCreateProject: () => void;
}> = ({ projects, isLoading, error, onSelect, onRetry, onCreateProject }) => (
  <main dir="rtl" className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-3 py-6 sm:px-6 sm:py-10 lg:px-8 font-sans text-right">
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">اختر مشروعاً لبناء خطة إطلاقه</h1>
      <p className="max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
        ستُحفظ خطة أول 90 يوماً وامتدادها السنوي داخل المشروع المختار، لتبقى المهام والمواعيد والروابط منفصلة عن بقية مشاريعك.
      </p>
    </div>

    {isLoading ? (
      <Card className="border-0 shadow-2xs"><CardContent className="flex min-h-44 items-center justify-center gap-2 text-sm font-semibold text-muted-foreground"><Loader2 className="size-5 animate-spin text-primary" /> جارٍ تحميل مشاريعك...</CardContent></Card>
    ) : error ? (
      <Card className="border-0 shadow-2xs"><CardContent className="flex flex-col items-center gap-3 py-12 text-center"><AlertCircle className="size-8 text-destructive" /><p className="text-sm font-semibold text-foreground">تعذر تحميل المشاريع</p><p className="text-xs text-muted-foreground">{error}</p><Button type="button" size="sm" onClick={onRetry}>إعادة المحاولة</Button></CardContent></Card>
    ) : projects.length === 0 ? (
      <Card className="border-0 shadow-2xs"><CardContent className="flex flex-col items-center gap-3 py-12 text-center"><BriefcaseBusiness className="size-9 text-muted-foreground" /><p className="text-sm font-bold text-foreground">لا توجد مشاريع محفوظة بعد</p><p className="max-w-md text-xs leading-6 text-muted-foreground">أنشئ مشروعاً أولاً، ثم عد إلى هذا القسم لبناء خطة إطلاق مرتبطة به.</p><Button type="button" size="sm" onClick={onCreateProject} className="gap-1.5"><Plus className="size-4" /> إنشاء مشروع جديد</Button></CardContent></Card>
    ) : (
      <Table containerClassName="border-0 bg-card shadow-2xs" className="min-w-[920px]" dir="rtl">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className="min-w-[230px]">المشروع</TableHead>
            <TableHead>القطاع</TableHead>
            <TableHead>المرحلة</TableHead>
            <TableHead className="text-center">الجاهزية</TableHead>
            <TableHead className="text-center">التحقق</TableHead>
            <TableHead className="text-center">التنفيذ</TableHead>
            <TableHead>خطة 90 يوم</TableHead>
            <TableHead>آخر تحديث</TableHead>
            <TableHead className="text-left">الإجراء</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="group">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><BriefcaseBusiness className="size-4" /></div>
                  <span className="max-w-[260px] truncate font-bold text-foreground">{project.project_title || 'مشروع بدون اسم'}</span>
                </div>
              </TableCell>
              <TableCell className="text-xs font-medium text-muted-foreground">{project.sector_label || 'قطاع غير محدد'}</TableCell>
              <TableCell><Badge variant="secondary" className="rounded-md border-0 bg-muted/60 text-[10px]">{getProjectStageLabel(project.current_stage)}</Badge></TableCell>
              <TableCell className="text-center"><span className="font-bold tabular-nums text-foreground">{project.readiness_score ?? 0}%</span></TableCell>
              <TableCell className="text-center"><span className="font-bold tabular-nums text-foreground">{project.validation_score ?? 0}%</span></TableCell>
              <TableCell className="text-center"><span className="font-bold tabular-nums text-foreground">{project.execution_score ?? 0}%</span></TableCell>
              <TableCell><Badge variant={project.hasPlan ? "default" : "secondary"} className="rounded-md border-0 text-[10px]">{project.hasPlan ? 'محفوظة' : 'غير منشأة'}</Badge></TableCell>
              <TableCell className="text-xs font-medium tabular-nums text-muted-foreground">{project.plan_updated_at ? new Date(project.plan_updated_at).toLocaleDateString('ar-SA-u-nu-latn') : '—'}</TableCell>
              <TableCell className="text-left"><Button type="button" size="sm" onClick={() => onSelect(project)} className="gap-1.5 whitespace-nowrap font-bold"><CalendarRange className="size-3.5" /> {project.hasPlan ? 'فتح الخطة' : 'إنشاء الخطة'}</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )}
  </main>
);

const categoryLabels: Record<TaskItem['category'], { label: string; className: string }> = {
  validation: { label: 'تحقق وسوق', className: 'bg-sky-500/10 text-sky-700 dark:text-sky-300' },
  product: { label: 'بناء وتطوير', className: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300' },
  marketing: { label: 'تسويق وجذب', className: 'bg-amber-500/10 text-amber-700 dark:text-amber-300' },
  operations: { label: 'تشغيل ومالية', className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
};

export const First90DaysView: React.FC<{ setActiveTab: (tab: string, options?: { replace?: boolean; path?: string }) => void }> = ({ setActiveTab }) => {
  const { user, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState<LaunchProject[]>([]);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState<string | null>(null);
  const [projectsReloadToken, setProjectsReloadToken] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() => getFirst90DaysProjectId(window.location.pathname));
  const [planStartDate, setPlanStartDate] = useState<Date>(() => {
    return getPlanStartDate();
  });

  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    return normalizeTasks(ALL_INITIAL_TASKS, planStartDate);
  });
  const [links, setLinks] = useState<PersistedGanttLink[]>([]);
  const [isHydrating, setIsHydrating] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [saveState, setSaveState] = useState<'saved' | 'dirty' | 'saving' | 'error'>('saved');
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);
  const hydratedRef = useRef(false);
  const persistedSnapshotRef = useRef('');
  const currentPlanStartDateRef = useRef(planStartDate);
  const currentTasksRef = useRef(tasks);
  const currentLinksRef = useRef(links);

  const [activeMonthFilter, setActiveMonthFilter] = useState<number>(0);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskDeliverable, setNewTaskDeliverable] = useState('');
  const [newTaskWhy, setNewTaskWhy] = useState('');
  const [newTaskMonth, setNewTaskMonth] = useState<PlanMonth>(1);
  const [newTaskWeek, setNewTaskWeek] = useState<number>(1);
  const [newTaskCategory, setNewTaskCategory] = useState<TaskItem['category']>('validation');

  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;
    if (!user?.id) {
      return () => {
        cancelled = true;
      };
    }

    const loadProjects = async () => {
      setIsProjectsLoading(true);
      setProjectsError(null);
      try {
        const [projectsResult, plansResult] = await Promise.all([
          supabase
            .from('business_canvas')
            .select('id, project_title, sector_label, current_stage, readiness_score, validation_score, execution_score, updated_at')
            .eq('user_id', user.id)
            .is('deleted_at', null)
            .order('updated_at', { ascending: false })
            .limit(50),
          supabase
            .from('first_90_day_plans')
            .select('project_id, updated_at')
            .eq('user_id', user.id),
        ]);

        if (cancelled) return;
        if (projectsResult.error) throw projectsResult.error;

        const planRows = plansResult.error ? [] : (plansResult.data || []) as Array<{ project_id: string | null; updated_at: string | null }>;
        const plansByProject = new Map(
          planRows
            .filter((plan) => Boolean(plan.project_id))
            .map((plan) => [plan.project_id as string, plan.updated_at]),
        );
        const projectRows = (projectsResult.data || []) as Omit<LaunchProject, 'hasPlan' | 'plan_updated_at'>[];
        setProjects(projectRows.map((project) => {
          const localPlanExists = Boolean(
            localStorage.getItem(getProjectStorageKey(TASKS_STORAGE_KEY, project.id))
              || localStorage.getItem(getProjectStorageKey(LINKS_STORAGE_KEY, project.id))
              || localStorage.getItem(getProjectStorageKey(PLAN_START_STORAGE_KEY, project.id)),
          );
          return {
            ...project,
            hasPlan: plansByProject.has(project.id) || localPlanExists,
            plan_updated_at: plansByProject.get(project.id) || null,
          };
        }));
        setIsProjectsLoading(false);
      } catch (error: unknown) {
        if (cancelled) return;
        console.error('Failed to load projects for first 90 day plan:', error);
        setProjectsError('تحقق من الاتصال ثم حاول مرة أخرى.');
        setIsProjectsLoading(false);
      }
    };

    void loadProjects();

    return () => {
      cancelled = true;
    };
  }, [authLoading, projectsReloadToken, user?.id]);

  useEffect(() => {
    currentPlanStartDateRef.current = planStartDate;
    currentTasksRef.current = tasks;
    currentLinksRef.current = links;
  }, [links, planStartDate, tasks]);

  // Keep an instant local draft; cloud persistence only happens through the Save button.
  useEffect(() => {
    if (!selectedProjectId) return;
    try {
      localStorage.setItem(getProjectStorageKey(PLAN_START_STORAGE_KEY, selectedProjectId), toDateKey(planStartDate));
    } catch { }
  }, [planStartDate, selectedProjectId]);

  useEffect(() => {
    if (!selectedProjectId) return;
    try {
      localStorage.setItem(getProjectStorageKey(TASKS_STORAGE_KEY, selectedProjectId), JSON.stringify(tasks));
      localStorage.setItem(getProjectStorageKey(LINKS_STORAGE_KEY, selectedProjectId), JSON.stringify(links));
    } catch { }

    if (!hydratedRef.current) return;
    setIsDirty(getPlanSnapshot(planStartDate, tasks, links) !== persistedSnapshotRef.current);
    setSaveState((current) => (current === 'saving' ? current : 'dirty'));
  }, [links, planStartDate, selectedProjectId, tasks]);

  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;
    const userId = user?.id;
    const projectId = selectedProjectId;
    const loadPlan = async () => {
      if (!userId || !projectId) {
        hydratedRef.current = false;
        setIsHydrating(false);
        setIsDirty(false);
        return;
      }

      const projectTasksKey = getProjectStorageKey(TASKS_STORAGE_KEY, projectId);
      const projectLinksKey = getProjectStorageKey(LINKS_STORAGE_KEY, projectId);
      const projectStartKey = getProjectStorageKey(PLAN_START_STORAGE_KEY, projectId);
      const legacyTasksKey = projects.length === 1 ? TASKS_STORAGE_KEY : null;
      const legacyLinksKey = projects.length === 1 ? LINKS_STORAGE_KEY : null;
      const legacyStartKey = projects.length === 1 ? PLAN_START_STORAGE_KEY : null;

      const localStartDate = fromDateKey(
        localStorage.getItem(projectStartKey)
          || (legacyStartKey ? localStorage.getItem(legacyStartKey) : null)
          || undefined,
      );
      const localTasksRaw = localStorage.getItem(projectTasksKey)
        || (legacyTasksKey ? localStorage.getItem(legacyTasksKey) : null);
      const localLinksRaw = localStorage.getItem(projectLinksKey)
        || (legacyLinksKey ? localStorage.getItem(legacyLinksKey) : null);

      hydratedRef.current = false;
      setIsHydrating(true);
      setPlanStartDate(localStartDate ?? getPlanStartDate());
      setTasks(localTasksRaw
        ? (() => {
            try {
              const parsed = JSON.parse(localTasksRaw);
              return Array.isArray(parsed)
                ? normalizeTasks(ensureAnnualTaskCoverage(parsed as TaskItem[]), localStartDate ?? getPlanStartDate())
                : normalizeTasks(ALL_INITIAL_TASKS, localStartDate ?? getPlanStartDate());
            } catch {
              return normalizeTasks(ALL_INITIAL_TASKS, localStartDate ?? getPlanStartDate());
            }
          })()
        : normalizeTasks(ALL_INITIAL_TASKS, localStartDate ?? getPlanStartDate()));
      setLinks(localLinksRaw
        ? (() => {
            try {
              return normalizeStoredLinks(JSON.parse(localLinksRaw));
            } catch {
              return [];
            }
          })()
        : []);

      try {
        const { data, error } = await supabase
          .from('first_90_day_plans')
          .select('project_id, plan_start_date, tasks, links, updated_at')
          .eq('user_id', userId)
          .eq('project_id', projectId)
          .maybeSingle<First90DaysPlanRow>();

        if (error) throw error;
        if (cancelled) return;

        if (data) {
          const loadedStartDate = fromDateKey(data.plan_start_date) ?? currentPlanStartDateRef.current;
          const loadedTasks = Array.isArray(data.tasks)
            ? normalizeTasks(ensureAnnualTaskCoverage(data.tasks as TaskItem[]), loadedStartDate)
            : [];
          const loadedLinks = normalizeStoredLinks(data.links);

          setPlanStartDate(loadedStartDate);
          setTasks(loadedTasks);
          setLinks(loadedLinks);
          persistedSnapshotRef.current = getPlanSnapshot(loadedStartDate, loadedTasks, loadedLinks);
          setIsDirty(false);
          setSaveState('saved');
          setLastSavedAt(data.updated_at ? Date.parse(data.updated_at) : Date.now());
        } else {
          const hasLocalDraft = Boolean(
            localTasksRaw || localLinksRaw || localStartDate,
          );
          persistedSnapshotRef.current = hasLocalDraft
            ? '__no_cloud_plan__'
            : getPlanSnapshot(
              currentPlanStartDateRef.current,
              currentTasksRef.current,
              currentLinksRef.current,
            );
          setIsDirty(hasLocalDraft);
          setSaveState(hasLocalDraft ? 'dirty' : 'saved');
        }

        hydratedRef.current = true;
      } catch (error) {
        console.error('Failed to load first 90 days plan:', error);
        if (!cancelled) {
          hydratedRef.current = true;
          persistedSnapshotRef.current = '__cloud_load_failed__';
          setIsDirty(true);
          setSaveState('error');
        }
      } finally {
        if (!cancelled) setIsHydrating(false);
      }
    };

    void loadPlan();
    return () => {
      cancelled = true;
    };
  }, [authLoading, projects.length, selectedProjectId, user?.id]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const updateTaskTitle = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle.trim() } : t))
    );
  };

  const openTaskEditor = (id: string) => {
    const task = tasks.find((item) => item.id === id);
    if (task) setEditingTask(task);
  };

  const updateFullTask = (updatedTask: TaskItem) => {
    const startDate = fromDateKey(updatedTask.startDate);
    const scheduleMeta = startDate
      ? getScheduleMeta(startDate, planStartDate)
      : { month: updatedTask.month, week: updatedTask.week };

    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? { ...updatedTask, ...scheduleMeta } : t))
    );
    setEditingTask(null);
  };

  const moveTask = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= tasks.length) return;

    const updated = [...tasks];
    const [movedItem] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, movedItem);
    setTasks(updated);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const resetToInitialTasks = () => {
    setIsResetConfirmOpen(true);
  };

  const confirmResetToInitialTasks = () => {
    setTasks(normalizeTasks(ALL_INITIAL_TASKS, planStartDate));
    setIsResetConfirmOpen(false);
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const minWeek = (newTaskMonth - 1) * 4 + 1;
    const maxWeek = newTaskMonth * 4;
    const taskWeek = Math.min(maxWeek, Math.max(minWeek, newTaskWeek));

    const newTask: TaskItem = {
      id: `custom-${Date.now()}`,
      month: newTaskMonth,
      week: taskWeek,
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || 'مهمة مخصصة أضيفت بواسطة المستخدم.',
      deliverable: newTaskDeliverable.trim() || 'إنجاز المخرج المحدد للمهمة',
      whyItMatters: newTaskWhy.trim() || 'تسهم في تسريع تحقيق أهداف المرحلة',
      category: newTaskCategory,
      completed: false,
      ...getDefaultTaskDates({ month: newTaskMonth, week: taskWeek }, planStartDate),
    };

    setTasks((prev) => [...prev, newTask]);
    setIsAddDialogOpen(false);
    // Reset form
    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskDeliverable('');
    setNewTaskWhy('');
  };

  const updateTaskDatesFromGantt = (id: string, start: Date, end: Date) => {
    if (end <= start) return;

    const startDate = toDateKey(start);
    const endDate = toDateKey(end);
    const scheduleMeta = getScheduleMeta(start, planStartDate);

    setTasks((prev) => prev.map((task) => (
      task.id === id
        ? { ...task, startDate, endDate, ...scheduleMeta }
        : task
    )));
  };

  const updateTaskCompletionFromKanban = (id: string, completed: boolean) => {
    setTasks((prev) => prev.map((task) => (
      task.id === id ? { ...task, completed } : task
    )));
  };

  const updateTaskMonthFromKanban = (id: string, month: PlanMonth) => {
    setTasks((prev) => prev.map((task) => {
      if (task.id !== id || task.month === month) return task;

      const weekInMonth = ((Math.max(1, task.week) - 1) % 4) + 1;
      const nextWeek = (month - 1) * 4 + weekInMonth;
      const currentStart = fromDateKey(task.startDate);
      const currentEnd = fromDateKey(task.endDate);

      return {
        ...task,
        month,
        week: nextWeek,
        ...(currentStart && currentEnd
          ? {
              startDate: toDateKey(addDays(currentStart, (nextWeek - task.week) * 7)),
              endDate: toDateKey(addDays(currentEnd, (nextWeek - task.week) * 7)),
            }
          : getDefaultTaskDates({ month, week: nextWeek }, planStartDate)),
      };
    }));
  };

  const handleSelectProject = (project: LaunchProject) => {
    const freshStartDate = getPlanStartDate();
    setSelectedProjectId(project.id);
    setActiveTab('first-90-days', { path: getFirst90DaysProjectPath(project.id) });
    setPlanStartDate(freshStartDate);
    setTasks(normalizeTasks(ALL_INITIAL_TASKS, freshStartDate));
    setLinks([]);
    hydratedRef.current = false;
    persistedSnapshotRef.current = '';
    setIsHydrating(true);
    setIsDirty(false);
    setSaveState('saved');
    setActiveMonthFilter(0);
    setEditingTask(null);
    setIsAddDialogOpen(false);
  };

  const handleChangeProject = () => {
    setSelectedProjectId(null);
    setActiveTab('first-90-days', { path: '/first-90-days', replace: true });
    setEditingTask(null);
    setIsAddDialogOpen(false);
    setIsDirty(false);
  };

  const handleSavePlan = async () => {
    if (!user || !selectedProjectId || authLoading || isHydrating || isSaving || !isDirty) return;

    setIsSaving(true);
    setSaveState('saving');

    try {
      const { data, error } = await supabase.rpc('save_first_90_day_plan', {
        p_project_id: selectedProjectId,
        p_plan_start_date: toDateKey(planStartDate),
        p_tasks: tasks,
        p_links: links,
      });

      if (error) throw error;

      const savedRow = Array.isArray(data)
        ? data[0] as { saved_at?: string }
        : null;
      const savedAt = savedRow?.saved_at || new Date().toISOString();
      persistedSnapshotRef.current = getPlanSnapshot(planStartDate, tasks, links);
      setIsDirty(false);
      setSaveState('saved');
      setLastSavedAt(Date.parse(savedAt));
      setProjects((current) => current.map((project) => (
        project.id === selectedProjectId
          ? { ...project, hasPlan: true, plan_updated_at: savedAt }
          : project
      )));
    } catch (error) {
      console.error('Failed to save first 90 days plan:', error);
      setSaveState('error');
    } finally {
      setIsSaving(false);
    }
  };

  const filteredTasks = activeMonthFilter === 0
    ? tasks
    : tasks.filter((t) => t.month === activeMonthFilter);
  const selectedProject = projects.find((project) => project.id === selectedProjectId) || null;

  if (authLoading) {
    return <ProjectPlanSelection projects={[]} isLoading error={null} onSelect={() => undefined} onRetry={() => undefined} onCreateProject={() => undefined} />;
  }

  if (!user) {
    return <ProjectPlanSelection projects={[]} isLoading={false} error="يجب تسجيل الدخول للوصول إلى مشاريعك وخطط الإطلاق." onSelect={() => undefined} onRetry={() => undefined} onCreateProject={() => setActiveTab('login')} />;
  }

  if (!selectedProjectId || !selectedProject) {
    return (
      <ProjectPlanSelection
        projects={projects}
        isLoading={isProjectsLoading}
        error={projectsError}
        onSelect={handleSelectProject}
        onRetry={() => setProjectsReloadToken((current) => current + 1)}
        onCreateProject={() => setActiveTab('new-plan')}
      />
    );
  }

  return (
    <main dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-8 px-3 py-3 sm:px-6 sm:py-8 lg:px-8 font-sans text-right animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-muted-foreground">
            <BriefcaseBusiness className="size-3.5 text-primary" />
            <span>المشروع الحالي: <strong className="text-foreground">{selectedProject.project_title || 'مشروع بدون اسم'}</strong></span>
            <Button type="button" variant="ghost" size="xs" onClick={handleChangeProject} className="h-7 rounded-md px-2 text-[11px] text-primary">تغيير المشروع</Button>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            خطة إطلاق المشروع — السنة الأولى
          </h1>
          <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
            خارطة تنفيذ سنوية من التحقق وبناء المنتج إلى النمو والتوسع. نفّذ الأولويات شهراً بعد شهر، وراجع النتائج قبل الانتقال إلى المرحلة التالية.
          </p>
        </div>

        {/* Compact Progress Stat & Action */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 rounded-lg bg-card px-2.5 py-1.5 shadow-2xs" aria-live="polite">
            {isHydrating || isSaving ? (
              <Loader2 className="size-3.5 animate-spin text-primary" />
            ) : saveState === 'error' ? (
              <AlertCircle className="size-3.5 text-destructive" />
            ) : (
              <Cloud className="size-3.5 text-primary" />
            )}
            <span className={cn(
              'text-[11px] font-semibold',
              saveState === 'error' ? 'text-destructive' : isDirty ? 'text-amber-600' : 'text-muted-foreground',
            )}>
              {isHydrating
                ? 'جارٍ تحميل الخطة...'
                : isSaving
                  ? 'جارٍ الحفظ...'
                  : saveState === 'error'
                    ? 'تعذر الحفظ'
                    : isDirty
                      ? 'تعديلات غير محفوظة'
                      : lastSavedAt
                        ? `محفوظة ${new Intl.DateTimeFormat('ar', { hour: 'numeric', minute: '2-digit' }).format(lastSavedAt)}`
                        : 'محفوظة'}
            </span>
          </div>
          <Button
            type="button"
            onClick={handleSavePlan}
            size="sm"
            disabled={!user || authLoading || isHydrating || isSaving || !isDirty}
            className="gap-1.5 text-xs font-semibold rounded-lg shadow-2xs h-8.5"
            title="حفظ جميع تعديلات خطة إطلاق السنة الأولى"
          >
            <Save className="size-3.5" />
            حفظ التعديلات
          </Button>
          <div className="flex items-center gap-2.5 bg-muted/40 px-3 py-1.5 rounded-lg text-xs">
            <Trophy className="size-4 text-amber-500 shrink-0" />
            <div className="flex items-center gap-1.5 font-bold text-foreground">
              <span>الإنجاز:</span>
              <span className="text-primary tabular-nums">{progressPercent}%</span>
              <span className="text-[11px] text-muted-foreground font-normal">({completedCount}/{tasks.length})</span>
            </div>
            <div className="w-16 bg-muted h-1.5 rounded-full overflow-hidden ms-1">
              <div
                className="bg-primary h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <Button onClick={() => setIsAddDialogOpen(true)} size="sm" className="gap-1.5 text-xs font-semibold rounded-lg shadow-2xs h-8.5 cursor-pointer">
            <Plus className="size-3.5" />
            مهمة جديدة
          </Button>
        </div>
      </div>

      {/* Main Tabs Navigation - shadcn tabs composition */}
      <Tabs defaultValue="kanban" className="w-full space-y-5 sm:space-y-6" dir="rtl">
        <TabsList className="flex h-auto w-full max-w-full justify-start gap-1 overflow-x-auto whitespace-nowrap rounded-xl bg-muted/80 p-1 scrollbar-none">
          <TabsTrigger value="tasks" className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-muted-foreground transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs">
            <ListTodo className="size-3.5 text-primary" />
            <span>إدارة المهام</span>
          </TabsTrigger>
          <TabsTrigger value="gantt" className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-muted-foreground transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs">
            <CalendarRange className="size-3.5 text-primary" />
            <span>مخطط جانت</span>
          </TabsTrigger>
          <TabsTrigger value="kanban" className="flex shrink-0 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold text-muted-foreground transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs">
            <LayoutGrid className="size-3.5 text-primary" />
            <span>كانبان</span>
          </TabsTrigger>
        </TabsList>

        {/* ================= TAB 1: POPULAR TASKS APP VIEW ================= */}
        <TabsContent value="tasks" className="space-y-5 pt-1">
          {/* Controls Bar: Month Filter + Reset + Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-card p-3.5 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                <SlidersHorizontal className="size-3.5 text-primary" />
                تصفية الشهود:
              </span>
              <div className="flex max-w-full flex-wrap gap-1">
                <Button
                  size="xs"
                  variant={activeMonthFilter === 0 ? 'default' : 'ghost'}
                  onClick={() => setActiveMonthFilter(0)}
                  className="font-medium rounded-md text-xs"
                >
                  الكل ({tasks.length})
                </Button>
                {PLAN_MONTHS.map((month) => (
                  <Button
                    key={month}
                    size="xs"
                    variant={activeMonthFilter === month ? 'default' : 'ghost'}
                    onClick={() => setActiveMonthFilter(month)}
                    className="font-medium rounded-md text-xs"
                  >
                    الشهر {month} ({tasks.filter((task) => task.month === month).length})
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                size="xs"
                variant="ghost"
                onClick={resetToInitialTasks}
                className="text-xs text-muted-foreground hover:text-destructive gap-1"
                title="إعادة القائمة للتصميم والمهام الافتراضية"
              >
                <RotateCcw className="size-3" />
                إعادة ضبط
              </Button>
              <span className="text-xs font-medium text-muted-foreground tabular-nums border-s border-border ps-3">
                عرض {filteredTasks.length} مهمة
              </span>
            </div>
          </div>

          {/* Interactive Modern Task App List */}
          <div className="space-y-2.5">
            {filteredTasks.length === 0 ? (
              <div className="p-8 text-center bg-card rounded-2xl space-y-2 text-muted-foreground">
                <p className="text-sm font-medium">لا توجد مهام في هذا التصنيف حالياً.</p>
                <Button size="sm" variant="outline" onClick={() => setIsAddDialogOpen(true)} className="gap-1.5 text-xs">
                  <Plus className="size-3.5" />
                  إضافة مهمة جديدة
                </Button>
              </div>
            ) : (
              filteredTasks.map((task) => {
                const globalIndex = tasks.findIndex((t) => t.id === task.id);
                return (
                  <TaskRowItem
                    key={task.id}
                    task={task}
                    index={globalIndex}
                    totalCount={tasks.length}
                    toggleTask={toggleTask}
                    updateTaskTitle={updateTaskTitle}
                    moveTask={moveTask}
                    deleteTask={deleteTask}
                    openEditDialog={() => setEditingTask(task)}
                  />
                );
              })
            )}
          </div>
        </TabsContent>

        {/* ================= TAB 2: SVAR GANTT CHART ================= */}
        <TabsContent value="gantt" dir="ltr" className="pt-1">
          <First90DaysGantt
            tasks={tasks}
            planStartDate={planStartDate}
            links={links}
            onLinksChange={setLinks}
            onTaskDatesChange={updateTaskDatesFromGantt}
            onTaskEdit={openTaskEditor}
          />
        </TabsContent>

        <TabsContent value="kanban" dir="rtl" className="pt-1">
          <First90DaysKanban
            tasks={tasks}
            onTaskCompletionChange={updateTaskCompletionFromKanban}
            onTaskMonthChange={updateTaskMonthFromKanban}
            onTaskEdit={openTaskEditor}
          />
        </TabsContent>

      </Tabs>

      {/* ================= EDIT TASK DIALOG (SHADCN UI) ================= */}
      {editingTask && (
        <TaskEditDialog
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={updateFullTask}
        />
      )}

      {/* ================= ADD NEW TASK DIALOG (SHADCN UI) ================= */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md text-right font-sans" dir="rtl">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">إضافة مهمة جديدة لخطة إطلاق السنة الأولى</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddNewTask} className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">عنوان المهمة</label>
              <Input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="أدخل عنوان المهمة التنفيذية..."
                required
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground">الشهر</label>
                <select
                  value={newTaskMonth}
                  onChange={(e) => {
                    const month = Number(e.target.value) as PlanMonth;
                    const minWeek = (month - 1) * 4 + 1;
                    const maxWeek = month * 4;
                    setNewTaskMonth(month);
                    setNewTaskWeek((currentWeek) => Math.min(maxWeek, Math.max(minWeek, currentWeek)));
                  }}
                  dir="rtl"
                  className="w-full h-9 rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {PLAN_MONTHS.map((month) => (
                    <option key={month} value={month}>الشهر {month}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground">الأسبوع</label>
                <Input
                  type="number"
                  min={(newTaskMonth - 1) * 4 + 1}
                  max={newTaskMonth * 4}
                  value={newTaskWeek}
                  onChange={(e) => {
                    const minWeek = (newTaskMonth - 1) * 4 + 1;
                    const maxWeek = newTaskMonth * 4;
                    const nextWeek = Number(e.target.value);
                    setNewTaskWeek(Math.min(maxWeek, Math.max(minWeek, nextWeek)));
                  }}
                  className="h-9 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-foreground">التصنيف</label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as TaskItem['category'])}
                  dir="rtl"
                  className="w-full h-9 rounded-md border border-input bg-background px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="validation">تحقق وسوق</option>
                  <option value="product">بناء وتطوير</option>
                  <option value="marketing">تسويق وجذب</option>
                  <option value="operations">تشغيل ومالية</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">الوصف الإستراتيجي</label>
              <Textarea
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
                placeholder="شرح مختصر للخطوات والمطلوب..."
                rows={2}
                className="text-xs resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">المخرج الحاسم (Deliverable)</label>
              <Input
                value={newTaskDeliverable}
                onChange={(e) => setNewTaskDeliverable(e.target.value)}
                placeholder="ما النتيجة الملموسة بعد الإنجاز؟"
                className="text-xs"
              />
            </div>

            <DialogFooter className="gap-2 pt-2 flex-row-reverse sm:flex-row-reverse justify-start">
              <Button type="submit" size="sm" className="gap-1">
                <Plus className="size-3.5" />
                إضافة المهمة
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={isResetConfirmOpen} onOpenChange={setIsResetConfirmOpen}>
        <DialogContent className="sm:max-w-[440px]" dir="rtl">
          <DialogHeader className="text-right">
            <DialogTitle>إعادة ضبط قائمة المهام</DialogTitle>
          </DialogHeader>
          <p className="text-sm leading-7 text-muted-foreground">
            سيتم حذف التعديلات الحالية وإرجاع قائمة المهام إلى الحالة الافتراضية.
          </p>
          <DialogFooter className="flex-row-reverse sm:flex-row-reverse justify-start gap-2">
            <Button variant="destructive" onClick={confirmResetToInitialTasks}>
              إعادة الضبط
            </Button>
            <Button variant="outline" onClick={() => setIsResetConfirmOpen(false)}>
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
};

/* ================= TASK ROW ITEM (TODOIST / LINEAR STYLE SHADCN UI) ================= */
interface TaskRowItemProps {
  task: TaskItem;
  index: number;
  totalCount: number;
  toggleTask: (id: string) => void;
  updateTaskTitle: (id: string, newTitle: string) => void;
  moveTask: (index: number, direction: 'up' | 'down') => void;
  deleteTask: (id: string) => void;
  openEditDialog: () => void;
}

const TaskRowItem: React.FC<TaskRowItemProps> = ({
  task,
  index,
  totalCount,
  toggleTask,
  updateTaskTitle,
  moveTask,
  deleteTask,
  openEditDialog,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleText, setTitleText] = useState(task.title);
  const [isExpanded, setIsExpanded] = useState(false);

  const catMeta = categoryLabels[task.category];

  const handleSaveTitle = () => {
    if (titleText.trim() && titleText !== task.title) {
      updateTaskTitle(task.id, titleText);
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveTitle();
    } else if (e.key === 'Escape') {
      setTitleText(task.title);
      setIsEditingTitle(false);
    }
  };

  return (
    <Card className={cn(
      "bg-card shadow-2xs rounded-xl border-0 transition-all duration-200 hover:shadow-xs group relative",
      task.completed && "bg-muted/20"
    )}>
      <CardContent className="p-3 sm:p-4 space-y-3">
        <div className="flex items-center gap-2.5 sm:gap-3.5">

          {/* Reorder Buttons (Up/Down) */}
          <div className="flex flex-col gap-0.5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => moveTask(index, 'up')}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
              title="تحريك للأعلى"
            >
              <ArrowUp className="size-3.5" />
            </button>
            <button
              type="button"
              disabled={index === totalCount - 1}
              onClick={() => moveTask(index, 'down')}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-20 disabled:hover:bg-transparent transition-colors"
              title="تحريك للأسفل"
            >
              <ArrowDown className="size-3.5" />
            </button>
          </div>

          {/* Interactive Todo Checkbox */}
          <button
            type="button"
            onClick={() => toggleTask(task.id)}
            className={cn(
              'flex size-6 shrink-0 items-center justify-center rounded-lg transition-all duration-200 shadow-2xs',
              task.completed
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            )}
            title={task.completed ? 'تعيين كغير مكتمل' : 'تعيين كمكتمل'}
          >
            {task.completed ? <Check className="size-4 stroke-[3]" /> : null}
          </button>

          {/* Main Title / Inline Input Area */}
          <div className="flex-1 min-w-0">
            {isEditingTitle ? (
              <div className="flex items-center gap-2">
                <Input
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  className="h-8 text-xs font-semibold bg-background"
                />
                <Button size="xs" onClick={handleSaveTitle} className="h-8 px-2.5 font-bold">
                  <Check className="size-3.5" />
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  onClick={() => {
                    setTitleText(task.title);
                    setIsEditingTitle(false);
                  }}
                  className="h-8 px-2"
                >
                  <X className="size-3.5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-wrap">
                <h3
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    'cursor-pointer text-sm font-semibold leading-snug text-foreground transition-colors hover:text-primary',
                    task.completed && 'line-through opacity-55'
                  )}
                >
                  {task.title}
                </h3>

                {/* Edit Title Button inline */}
                <button
                  type="button"
                  onClick={() => {
                    setTitleText(task.title);
                    setIsEditingTitle(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all p-1 rounded-md"
                  title="تعديل اسم المهمة سريعاً"
                >
                  <Pencil className="size-3" />
                </button>
              </div>
            )}

            {/* Badges & Meta strip */}
            {!isEditingTitle && (
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <Badge variant="secondary" className={cn('text-[10px] font-medium rounded-md px-1.5 py-0', catMeta.className)}>
                  {catMeta.label}
                </Badge>
                <Badge variant="outline" className="text-[10px] font-normal rounded-md border-0 bg-muted/40 px-1.5 py-0">
                  الشهر {task.month} • الأسبوع {task.week}
                </Badge>
                {task.startDate && task.endDate && (
                  <span className="text-[10px] font-medium text-muted-foreground tabular-nums">
                    {task.startDate} → {task.endDate}
                  </span>
                )}
                {task.deliverable && (
                  <span className="text-[11px] text-muted-foreground truncate max-w-[240px] font-medium hidden sm:inline-block">
                    • {task.deliverable}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions Strip */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Expand / Collapse Details Button */}
            <Button
              size="icon-xs"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-muted-foreground hover:text-foreground"
              title={isExpanded ? "اخفاء التفاصيل" : "عرض التفاصيل الإستراتيجية"}
            >
              {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
            </Button>

            {/* Dropdown Menu for Extra Actions */}
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button size="icon-xs" variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <MoreVertical className="size-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 text-right font-sans">
                <DropdownMenuItem onClick={() => setIsEditingTitle(true)} className="gap-2 text-xs">
                  <Pencil className="size-3.5 text-primary" />
                  تعديل الاسم سريعاً
                </DropdownMenuItem>
                <DropdownMenuItem onClick={openEditDialog} className="gap-2 text-xs">
                  <SlidersHorizontal className="size-3.5 text-indigo-500" />
                  تعديل التفاصيل والمخرجات
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => moveTask(index, 'up')}
                  disabled={index === 0}
                  className="gap-2 text-xs"
                >
                  <ArrowUp className="size-3.5" />
                  تحريك للأعلى
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => moveTask(index, 'down')}
                  disabled={index === totalCount - 1}
                  className="gap-2 text-xs"
                >
                  <ArrowDown className="size-3.5" />
                  تحريك للأسفل
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => deleteTask(task.id)}
                  className="gap-2 text-xs text-destructive focus:text-destructive"
                >
                  <Trash2 className="size-3.5" />
                  حذف المهمة
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Collapsible Details Panel */}
        {isExpanded && (
          <div className="pt-2 border-t border-border/40 grid gap-2.5 sm:grid-cols-2 text-xs">
            <div className="rounded-lg bg-muted/40 p-3 leading-relaxed text-foreground">
              <span className="font-semibold flex items-center gap-1.5 mb-1 text-muted-foreground">
                <Target className="size-3.5 text-primary shrink-0" />
                <span>المخرج المطلوب (Deliverable):</span>
              </span>
              <p className="font-medium text-foreground">{task.deliverable}</p>
            </div>

            <div className="rounded-lg bg-muted/40 p-3 leading-relaxed text-foreground">
              <span className="font-semibold flex items-center gap-1.5 mb-1 text-muted-foreground">
                <Lightbulb className="size-3.5 text-amber-500 shrink-0" />
                <span>لماذا هي مهمة؟</span>
              </span>
              <p className="font-medium text-foreground">{task.whyItMatters}</p>
            </div>

            <div className="sm:col-span-2 rounded-lg bg-muted/30 p-2.5 text-[11px] text-muted-foreground leading-relaxed">
              <strong className="text-foreground font-semibold">الشرح: </strong>
              {task.description}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

/* ================= EDIT TASK DETAILS DIALOG ================= */
const TaskEditDialog: React.FC<{
  task: TaskItem;
  onClose: () => void;
  onSave: (updatedTask: TaskItem) => void;
}> = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deliverable, setDeliverable] = useState(task.deliverable);
  const [whyItMatters, setWhyItMatters] = useState(task.whyItMatters);
  const [category, setCategory] = useState<TaskItem['category']>(task.category);
  const [startDate, setStartDate] = useState(task.startDate ?? '');
  const [endDate, setEndDate] = useState(task.endDate ?? '');
  const [dateError, setDateError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedStartDate = fromDateKey(startDate);
    const parsedEndDate = fromDateKey(endDate);
    if (!parsedStartDate || !parsedEndDate || parsedEndDate <= parsedStartDate) {
      setDateError(true);
      return;
    }

    setDateError(false);
    onSave({
      ...task,
      title: title.trim(),
      description: description.trim(),
      deliverable: deliverable.trim(),
      whyItMatters: whyItMatters.trim(),
      category,
      startDate: toDateKey(parsedStartDate),
      endDate: toDateKey(parsedEndDate),
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg text-right font-sans" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">تعديل معلومات المهمة التنفيذية</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">عنوان المهمة</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="text-xs font-semibold"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">التصنيف الإستراتيجي</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskItem['category'])}
              dir="rtl"
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="validation">تحقق وسوق</option>
              <option value="product">بناء وتطوير</option>
              <option value="marketing">تسويق وجذب</option>
              <option value="operations">تشغيل ومالية</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">تاريخ البداية</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setDateError(false);
                }}
                required
                className="text-xs font-semibold"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">تاريخ النهاية</label>
              <Input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setDateError(false);
                }}
                required
                className="text-xs font-semibold"
              />
            </div>
          </div>
          {dateError && (
            <p className="text-xs font-medium text-destructive">يجب أن يكون تاريخ النهاية بعد تاريخ البداية.</p>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">الوصف الإستراتيجي</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="text-xs resize-none leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">المخرج المطلوب (Deliverable)</label>
            <Input
              value={deliverable}
              onChange={(e) => setDeliverable(e.target.value)}
              className="text-xs"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">لماذا هي مهمة؟ (Why It Matters)</label>
            <Textarea
              value={whyItMatters}
              onChange={(e) => setWhyItMatters(e.target.value)}
              rows={2}
              className="text-xs resize-none leading-relaxed"
            />
          </div>

          <DialogFooter className="gap-2 pt-2 flex-row-reverse sm:flex-row-reverse justify-start">
            <Button type="submit" size="sm" className="gap-1.5">
              <Check className="size-3.5" />
              حفظ التعديلات
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
