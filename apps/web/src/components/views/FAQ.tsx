import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

type FAQProps = {
  embedded?: boolean;
};

const faqs = [
  {
    question: 'ما هي منصة خطة وكيف تساعدني في بناء ودراسة مشروعي؟',
    answer:
      'منصة "خطة" هي البيئة الأولى من نوعها لبناء ودراسة المشاريع الريادية. توفر لك قاعدة بيانات موثقة تضم +500 شركة ودراسة حالة، وأدوات تفاعلية مثل استوديو نموذج العمل (BMC) القائم على الذكاء الاصطناعي ومنهجية MIT، وحاسبة الإيرادات المتكررة (MRR / ARR)، مع توثيق خطط التسعير والتكاليف التشغيلية.',
  },
  {
    question: 'هل المنصة مخصصة لمشاريع الـ SaaS فقط أم لجميع القطاعات؟',
    answer:
      'تغطي المنصة أكثر من 100 قطاع استثماري متنوع (مثل التجارة الإلكترونية، التقنية المالية FinTech، الصحة الرقمية، الخدمات اللوجستية، والحلول البرمجية). سواء كنت تبني مشروع SaaS أو متجراً إلكترونياً أو شركة خدمية، تمنحك المنصة الأدوات المناسبة لبناء دراستك.',
  },
  {
    question: 'كيف تعمل حاسبة الإيرادات (MRR / ARR) وكيف تفيدني في التخطيط المالي؟',
    answer:
      'تمكنك الحاسبة التفاعلية من إدخال أعداد المشتركين المتوقعين، قيمة الاشتراك الشهري، ومعدل التسرب (Churn Rate) لحساب الإيرادات الشهرية والسنوية المتكررة تلقائياً، بالإضافة لحساب قيمة العميل مدى الحياة (LTV) وتوقع الفترة الزمنية لاسترداد التكاليف.',
  },
  {
    question: 'هل يمكنني بناء دراسة نموذج العمل التجاري (BMC) وتصديرها؟',
    answer:
      'نعم، يتيح لك استوديو نموذج العمل (BMC Studio) بناء العناصر التسعة لمشروعك (عرض القيمة، قنوات التوزيع، شرائح العملاء، مصادر الإيرادات...) بمساعدة محرك الذكاء الاصطناعي، ثم حفظ التقرير أو مشاركته مع فريقك والمستثمرين عبر رابط مشاركة آمن.',
  },
  {
    question: 'كيف تضمن المنصة سرية وخصوصية بيانات مشروعي ونموذج عملي؟',
    answer:
      'تُحفظ جميع مشاريعك ونماذج عملك سحابياً بتقنيات التشفير المتقدمة والحماية المشددة على مستوى الصفوف (Row Level Security - RLS). بياناتك خاصة 100% ولن يستطيع أي طرف ثالث الاطلاع عليها إلا إذا اخترت بنفسك إنشاء رابط مشاركة عمومي.',
  },
  {
    question: 'هل تتطلب تجربة المنصة والتسجيل المجاني بطاقة ائتمان؟',
    answer:
      'لا، يمكنك إنشاء حساب مجاني بالكامل واستكشاف قواعد البيانات الميدانية، واستخدام الحاسبة التفاعلية والأكاديمية، ومعاينة المشاريع الناجحة دون الحاجة لإدخال أي بطاقة ائتمان أو التزامات مالية.',
  },
];

const supportCards = [
  { title: 'بدء سريع', value: 'مسارات واضحة', icon: Sparkles },
  { title: 'دعم القرار', value: 'أسئلة عملية', icon: ShieldCheck },
  { title: 'تواصل مباشر', value: 'قنوات محددة', icon: MessageCircle },
];

export const FAQ: React.FC<FAQProps> = ({ embedded = false }) => {
  const [openId, setOpenId] = useState(0);

  return (
    <section className={cn('w-full text-right', embedded ? 'space-y-5' : 'app-page-shell-wide space-y-6')} dir="rtl">
      {!embedded && (
        <div className="rounded-xl bg-card p-4 sm:p-5 shadow-sm ring-1 ring-border/60">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <Badge variant="secondary" className="w-fit">مركز المساعدة</Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">الأسئلة الشائعة</h1>
                <p className="text-sm leading-7 text-muted-foreground">
                  إجابات مختصرة تساعد المستخدم على فهم المنصة، المسارات، ومخرجات كل أداة قبل البدء.
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-center lg:w-auto">
              <MessageCircle className="size-4" />
              تواصل مع الدعم
            </Button>
          </div>
        </div>
      )}

      {!embedded && (
        <div className="grid gap-3 md:grid-cols-3">
          {supportCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="shadow-sm">
                <CardContent className="flex items-center gap-3 p-3 sm:p-4">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card className="shadow-sm">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">إجابات مهمة قبل استخدام المنصة</CardTitle>
              <CardDescription>كل سؤال قابل للفتح بدون تشويش بصري أو بطاقات ضخمة.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 p-3 sm:p-6 pt-0 sm:pt-0">
          {faqs.map((faq, index) => (
            <Collapsible key={faq.question} open={openId === index} onOpenChange={() => setOpenId(openId === index ? -1 : index)}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex w-full items-center justify-between gap-4 rounded-lg px-3 py-3 text-right text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', openId === index && 'rotate-180')} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 pb-4 text-sm leading-7 text-muted-foreground">
                {faq.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};

export default FAQ;
