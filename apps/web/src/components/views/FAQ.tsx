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
    <section className={cn('w-full text-right', embedded ? 'space-y-3' : 'app-page-shell-wide space-y-4')} dir="rtl">
      {!embedded && (
        <div className="rounded-lg bg-card p-3 sm:p-4 shadow-2xs border-0">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl space-y-1.5">
              <Badge variant="secondary" className="w-fit text-[11px] font-bold">مركز المساعدة</Badge>
              <div className="space-y-1">
                <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">الأسئلة الشائعة</h1>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  إجابات مختصرة تساعد المستخدم على فهم المنصة، المسارات، ومخرجات كل أداة قبل البدء.
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full justify-center lg:w-auto font-bold text-xs gap-1.5 border-0 bg-muted/60">
              <MessageCircle className="size-3.5" />
              تواصل مع الدعم
            </Button>
          </div>
        </div>
      )}

      {!embedded && (
        <div className="grid gap-2.5 sm:grid-cols-3">
          {supportCards.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="shadow-2xs border-0">
                <CardContent className="flex items-center gap-2.5 p-3 text-right">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Card className={cn('shadow-2xs', embedded ? 'border-0 ring-0 bg-card' : 'border-border/60')}>
        <CardHeader className="p-3.5 sm:p-4 pb-2 border-0">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-4 text-primary shrink-0" />
            <div>
              <CardTitle className="text-base font-bold">إجابات مهمة قبل استخدام المنصة</CardTitle>
              <CardDescription className="text-xs">أسئلة وأجوبة تفاعلية سهلة التصفح.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-1.5 p-3 sm:p-4 pt-0">
          {faqs.map((faq, index) => (
            <Collapsible key={faq.question} open={openId === index} onOpenChange={() => setOpenId(openId === index ? -1 : index)}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-right text-xs font-bold text-foreground transition-colors hover:bg-muted/50"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={cn('size-3.5 shrink-0 text-muted-foreground transition-transform', openId === index && 'rotate-180')} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-3 py-2 text-xs leading-relaxed text-muted-foreground bg-muted/20 rounded-md mt-1">
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
