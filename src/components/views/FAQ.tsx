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
    question: 'ما هي منصة خطة؟',
    answer:
      'منصة تساعد المستخدم على الانتقال من فكرة غير واضحة إلى تصور عملي للمشروع عبر أدوات منظمة لبناء دراسة الجدوى، نموذج العمل، تحليل السوق، والهوية البصرية.',
  },
  {
    question: 'هل أحتاج خبرة سابقة في الاستثمار أو ريادة الأعمال؟',
    answer:
      'لا. الواجهات مصممة لتقود المستخدم خطوة بخطوة، مع أسئلة واضحة ومخرجات قابلة للتسليم لاحقاً للمبرمج أو المصمم أو المستشار.',
  },
  {
    question: 'ما الفرق بين النموذج السهل والنموذج الاحترافي؟',
    answer:
      'النموذج السهل مناسب للبداية السريعة وفهم الفكرة، بينما النموذج الاحترافي يقدم رحلة أعمق لتنظيم دراسة جدوى مشروع بطريقة أكثر تفصيلاً.',
  },
  {
    question: 'هل يمكن تصدير النتائج؟',
    answer:
      'الواجهة مجهزة لتوضيح تجربة التصدير والقيمة المتوقعة من التقرير النهائي. الربط البرمجي الكامل للتصدير يمكن تنفيذه لاحقاً حسب متطلبات المنتج.',
  },
  {
    question: 'هل المنصة تبني المشروع بدلاً عني؟',
    answer:
      'لا. المنصة تنظم التفكير والقرارات والمعلومات، وتساعد المستخدم على بناء تصور واضح يمكن تطويره لاحقاً إلى مشروع قابل للتنفيذ.',
  },
  {
    question: 'كيف يتم التعامل مع بياناتي؟',
    answer:
      'التصميم الحالي يوضح تجربة المستخدم والواجهات فقط. عند بناء المنطق البرمجي يجب تحديد سياسات التخزين، الصلاحيات، والحماية بشكل مستقل.',
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
        <div className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
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
                <CardContent className="flex items-center gap-3 p-4">
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
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="size-5 text-muted-foreground" />
            <div>
              <CardTitle className="text-lg">إجابات مهمة قبل استخدام المنصة</CardTitle>
              <CardDescription>كل سؤال قابل للفتح بدون تشويش بصري أو بطاقات ضخمة.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
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
