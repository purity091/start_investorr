import React, { useMemo, useState } from 'react';
import {
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
    id: 'project_identity',
    title: 'تعريف المشروع والفرضية الاستثمارية',
    shortTitle: 'التعريف',
    description: 'بناء تعريف دقيق للمشروع قبل الدخول في السوق والماليات. هذه هي صفحة الغلاف الفكرية لدراسة الجدوى.',
    icon: BriefcaseBusiness,
    professionalNote: 'المستثمر أو المستشار يحتاج أن يفهم المشروع في دقيقة واحدة: ماذا تبني، لمن، ولماذا الآن.',
    fields: [
      { id: 'name', label: 'اسم المشروع', placeholder: 'مثال: منصة إدارة مشتريات المتاجر الصغيرة', required: true },
      { id: 'sector', label: 'القطاع والسوق الجغرافي', placeholder: 'مثال: تجارة الجملة للمتاجر الصغيرة في سوريا والخليج', required: true },
      { id: 'one_liner', label: 'وصف المشروع في سطر واحد', placeholder: 'نساعد المتاجر الصغيرة على الوصول لموردي الجملة وإدارة الطلبات من مكان واحد', required: true },
      { id: 'why_now', label: 'لماذا هذا التوقيت مناسب؟', type: 'textarea', placeholder: 'اشرح التحولات السوقية أو التقنية أو السلوكية التي تجعل الفرصة الآن أقوى من السابق' },
    ],
  },
  {
    id: 'problem_customer',
    title: 'المشكلة والعميل المستهدف',
    shortTitle: 'العميل',
    description: 'تحديد الألم الاقتصادي أو التشغيلي الذي يدفع العميل للبحث عن حل، وليس مجرد وصف عام للشريحة.',
    icon: Users,
    professionalNote: 'في الدراسات الاحترافية يجب إثبات أن المشكلة متكررة، مكلفة، ولها صاحب قرار واضح.',
    optionsLabel: 'نوع العميل',
    options: ['B2C أفراد', 'B2B شركات', 'B2B2C', 'Marketplace', 'Enterprise', 'Government'],
    fields: [
      { id: 'segment', label: 'الشريحة الأساسية', placeholder: 'مثال: متاجر بقالة مستقلة تشتري من 5 موردين أو أكثر أسبوعياً', required: true },
      { id: 'pain', label: 'المشكلة الأساسية', type: 'textarea', placeholder: 'ما الألم المتكرر؟ كم يكلّف العميل وقتاً أو مالاً أو فرصاً؟', required: true },
      { id: 'current_solution', label: 'كيف يحل العميل المشكلة حالياً؟', type: 'textarea', placeholder: 'واتساب، موردين عشوائيين، إكسل، موظف مشتريات، حلول منافسة...' },
      { id: 'decision_maker', label: 'صاحب قرار الشراء', placeholder: 'المالك، مدير العمليات، مدير المشتريات، المستخدم النهائي...' },
    ],
  },
  {
    id: 'solution_prototype',
    title: 'الحل وقوة النموذج الأولي',
    shortTitle: 'النموذج الأولي',
    description: 'تحويل الفكرة إلى نموذج أولي قابل للاختبار قبل بناء المنتج الكامل.',
    icon: Layers,
    professionalNote: 'النموذج الأولي الاحترافي يثبت الطلب ويقلل المخاطر التقنية قبل صرف ميزانية كبيرة.',
    optionsLabel: 'نوع النموذج الأولي',
    options: ['Landing Page', 'Concierge MVP', 'No-code MVP', 'Prototype تفاعلي', 'Pilot مع عملاء', 'نسخة SaaS أولية'],
    fields: [
      { id: 'core_solution', label: 'وصف الحل', type: 'textarea', placeholder: 'ما الذي سيحصل عليه العميل تحديداً؟', required: true },
      { id: 'mvp_scope', label: 'نطاق MVP', type: 'textarea', placeholder: 'ما الخصائص التي يجب بناؤها أولاً؟ وما الذي سيتم تأجيله؟', required: true },
      { id: 'test_method', label: 'طريقة اختبار الطلب', type: 'textarea', placeholder: 'مقابلات، صفحة حجز، طلبات مسبقة، تجربة مدفوعة، Pilot محدود...' },
      { id: 'success_signal', label: 'إشارة نجاح النموذج الأولي', placeholder: 'مثال: 20 طلب تجريبي، 5 عملاء مدفوعين، 30% تحويل من صفحة الهبوط' },
    ],
  },
  {
    id: 'value_model',
    title: 'القيمة ونموذج الإيرادات',
    shortTitle: 'الإيراد',
    description: 'ربط القيمة التي يشعر بها العميل بمنطق تسعير واضح وقابل للدفاع.',
    icon: LineChart,
    professionalNote: 'لا يكفي أن يكون الحل مفيداً. يجب أن يكون قابلاً للتسعير والتحصيل والتكرار.',
    optionsLabel: 'نموذج الإيراد',
    options: ['اشتراك', 'عمولة', 'بيع مباشر', 'ترخيص', 'رسوم إعداد', 'Freemium', 'حزم خدمات'],
    fields: [
      { id: 'value_proposition', label: 'القيمة المقترحة', type: 'textarea', placeholder: 'ما الوعد الأساسي للعميل؟ توفير وقت، خفض تكلفة، زيادة مبيعات، تقليل مخاطر...' },
      { id: 'pricing', label: 'التسعير الأولي', placeholder: 'مثال: 15 دولار شهرياً لكل متجر + عمولة 1% على الطلبات', required: true },
      { id: 'revenue_streams', label: 'مصادر الإيراد', type: 'textarea', placeholder: 'مصدر أساسي ومصادر ثانوية محتملة' },
      { id: 'willingness_to_pay', label: 'سبب قبول العميل للدفع', type: 'textarea', placeholder: 'اربط السعر بالمشكلة والتكلفة الحالية والبدائل' },
    ],
  },
  {
    id: 'market_competition',
    title: 'السوق والمنافسة والتموضع',
    shortTitle: 'السوق',
    description: 'تحويل السوق من وصف عام إلى فرضيات قابلة للقياس: حجم، منافسين، قنوات، وتموضع.',
    icon: BarChart3,
    professionalNote: 'الهدف هنا ليس كتابة أرقام كبيرة فقط، بل تحديد أين يمكن الفوز أولاً.',
    optionsLabel: 'طبيعة السوق',
    options: ['سوق محلي', 'سوق إقليمي', 'Niche', 'سوق مزدحم', 'سوق ناشئ', 'سوق منظم قانونياً'],
    fields: [
      { id: 'tam_sam_som', label: 'TAM / SAM / SOM تقديري', type: 'textarea', placeholder: 'ضع تقديراً أولياً لحجم السوق الكلي، السوق القابل للخدمة، والحصة الواقعية الأولى' },
      { id: 'competitors', label: 'المنافسون والبدائل', type: 'textarea', placeholder: 'اذكر المنافسين المباشرين والبدائل غير المباشرة' },
      { id: 'positioning', label: 'التموضع والميزة', type: 'textarea', placeholder: 'لماذا سيختارك العميل بدل البدائل؟' },
      { id: 'go_to_market', label: 'قناة الوصول الأولى', placeholder: 'مبيعات مباشرة، شراكات، إعلانات، محتوى، موزعون، مجتمع...' },
    ],
  },
  {
    id: 'financial_assumptions',
    title: 'الافتراضات المالية الأولية',
    shortTitle: 'الماليات',
    description: 'إدخال أرقام أولية منفصلة تساعد على قراءة جدوى المشروع قبل بناء نموذج مالي كامل.',
    icon: Gauge,
    professionalNote: 'الدراسة الاحترافية تبدأ بأرقام مفهومة حتى لو كانت تقديرية، ثم يتم تحسينها بالتحقق.',
    optionsLabel: 'درجة وضوح الأرقام',
    options: ['أرقام موثقة', 'أرقام تقديرية', 'أحتاج تحقق', 'لا توجد أرقام بعد'],
    fields: [
      { id: 'capex', label: 'تكلفة التأسيس CAPEX', type: 'number', placeholder: 'مثال: 15000' },
      { id: 'opex', label: 'التكلفة الشهرية OPEX', type: 'number', placeholder: 'مثال: 3000' },
      { id: 'unit_price', label: 'متوسط سعر البيع أو الاشتراك', type: 'number', placeholder: 'مثال: 25' },
      { id: 'monthly_customers', label: 'عدد العملاء المتوقع شهرياً', type: 'number', placeholder: 'مثال: 120' },
      { id: 'break_even', label: 'فرضية نقطة التعادل', placeholder: 'مثال: خلال 9 أشهر عند الوصول إلى 400 عميل نشط' },
    ],
  },
  {
    id: 'operations_risks',
    title: 'التشغيل والمخاطر والاعتماديات',
    shortTitle: 'المخاطر',
    description: 'تحديد ما يحتاجه المشروع حتى يعمل فعلياً، وما الذي يمكن أن يعطل الإطلاق أو النمو.',
    icon: ShieldAlert,
    professionalNote: 'أي نموذج أولي قوي يجب أن يعرف نقاط فشله المحتملة قبل أن يكتشفها السوق.',
    optionsLabel: 'أهم فئات المخاطر',
    options: ['مالية', 'تقنية', 'قانونية', 'تشغيلية', 'مبيعات', 'توريد', 'اعتماد على طرف ثالث'],
    fields: [
      { id: 'team', label: 'الفريق المطلوب', type: 'textarea', placeholder: 'الأدوار الأساسية: مؤسس، مطور، مبيعات، تشغيل، مالية...' },
      { id: 'dependencies', label: 'الاعتماديات الأساسية', type: 'textarea', placeholder: 'موردون، بوابات دفع، تراخيص، بيانات، تكاملات، شراكات...' },
      { id: 'top_risks', label: 'أكبر 3 مخاطر', type: 'textarea', placeholder: 'اكتب المخاطر بوضوح مع سبب خطورتها' },
      { id: 'mitigation', label: 'خطة تخفيف المخاطر', type: 'textarea', placeholder: 'ما الإجراء الوقائي أو خطة B لكل خطر؟' },
    ],
  },
  {
    id: 'next_90_days',
    title: 'خطة التحقق والتنفيذ خلال 90 يوم',
    shortTitle: '90 يوم',
    description: 'إنهاء الرحلة بخطة تنفيذ قابلة للمتابعة وليست مجرد توصيات عامة.',
    icon: ClipboardList,
    professionalNote: 'النهاية الاحترافية يجب أن تجيب: ماذا سنفعل الآن؟ ماذا سنقيس؟ ومتى نقرر الاستمرار أو التعديل؟',
    optionsLabel: 'أولوية التنفيذ',
    options: ['تحقق من الطلب', 'MVP', 'مبيعات أولية', 'شراكات', 'تمويل', 'توظيف', 'إطلاق تجريبي'],
    fields: [
      { id: 'first_14_days', label: 'أول 14 يوم', type: 'textarea', placeholder: 'مقابلات، صفحة هبوط، عرض تجريبي، قائمة عملاء محتملين...' },
      { id: 'first_30_days', label: 'أول 30 يوم', type: 'textarea', placeholder: 'اختبار قناة الوصول، بناء النسخة الأولية، أول مبيعات...' },
      { id: 'days_31_90', label: 'من اليوم 31 إلى 90', type: 'textarea', placeholder: 'Pilot، تحسين المنتج، قياس التكرار، تجهيز قرار التوسع...' },
      { id: 'decision_metric', label: 'مؤشر قرار الاستمرار', placeholder: 'مثال: 10 عملاء مدفوعين أو 30% تحويل أو CAC أقل من قيمة محددة', required: true },
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

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-3 py-3 sm:px-4 lg:px-5">
        <Card className="border-0 bg-background shadow-none">
          <CardHeader className="px-0 pt-0">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3 text-right">
                <Badge variant="secondary" className="w-fit rounded-md">النموذج الاحترافي</Badge>
                <div className="space-y-2">
                  <CardTitle className="text-2xl sm:text-3xl">لوحة المشروع الاحترافية</CardTitle>
                  <CardDescription className="max-w-3xl text-sm leading-7">
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
          <TabsList className="grid h-auto w-full grid-cols-3 rounded-xl md:w-fit">
            <TabsTrigger value="overview">الملخص</TabsTrigger>
            <TabsTrigger value="inputs">كل الإدخالات</TabsTrigger>
            <TabsTrigger value="mvp">قوة MVP</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <Card className="border-0 bg-muted/20 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="size-5" />
                    قراءة تنفيذية
                  </CardTitle>
                  <CardDescription className={cn('text-sm font-medium leading-7', readiness.tone)}>
                    {readiness.label}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm leading-7 text-muted-foreground">{readiness.summary}</p>
                  <Separator />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <SummaryBlock label="اسم المشروع" value={answers['project_identity.name']} />
                    <SummaryBlock label="العميل المستهدف" value={answers['problem_customer.segment']} />
                    <SummaryBlock label="نطاق MVP" value={answers['solution_prototype.mvp_scope']} />
                    <SummaryBlock label="التسعير" value={answers['value_model.pricing']} />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-muted/20 shadow-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="size-5" />
                    ما الذي يمكن البناء عليه الآن؟
                  </CardTitle>
                  <CardDescription>قرارات عملية ناتجة عن بنية الإدخال الاحترافية.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'تحويل نطاق MVP إلى Backlog تطوير واضح.',
                    'تحويل الافتراضات المالية إلى نموذج Excel أو Dashboard.',
                    'اختبار قناة الوصول الأولى قبل الاستثمار في المنتج الكامل.',
                    'مراجعة المخاطر والاعتماديات قبل أي إطلاق تجريبي.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-xl bg-background p-3 text-sm leading-6">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </div>
                  ))}
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

          <TabsContent value="mvp" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3">
              <PrototypeCard title="فرضية الألم" value={answers['problem_customer.pain']} />
              <PrototypeCard title="نطاق MVP" value={answers['solution_prototype.mvp_scope']} />
              <PrototypeCard title="إشارة النجاح" value={answers['solution_prototype.success_signal']} />
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
