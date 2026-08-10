import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { createMetadata } from '@/lib/seo';
import { HelpCircle, ArrowLeft, Search, MessageSquare } from 'lucide-react';

export const metadata = createMetadata({
  title: 'الأسئلة الشائعة حول منصة خطة ودراسات الجدوى',
  description:
    'إجابات واضحة حول إعداد دراسات الجدوى، التحليلات المالية، الاشتراكات، الأمان، ومشاركة المشاريع داخل منصة خطة.',
  path: '/faq',
  keywords: ['الأسئلة الشائعة خطة', 'دراسة جدوى بالذكاء الاصطناعي', 'أمان البيانات', 'اشتراكات خطة'],
});

const faqsList = [
  {
    category: 'عامة ودراسات الجدوى',
    items: [
      {
        q: 'ما هي منصة خطة وكيف تساعدني في مشروعي؟',
        a: 'منصة خطة هي منصة عربية ذكية مخصصة لإعداد دراسات الجدوى والتحليلات المالية والخطط الاستثمارية. تساعدك المنصة في تقييم فكرة مشروعك وتحويلها إلى أرقام ودراسة متكاملة قابلة للتقديم للمستثمرين أو الجهات التمويلية.',
      },
      {
        q: 'كم يستغرق إعداد دراسة الجدوى عبر المنصة؟',
        a: 'بفضل محرك التحليل والذكاء الاصطناعي، يمكنك إعداد نموذج العمل والتوقعات المالية الأولية خلال أقل من 15 دقيقة، وتوليد دراسة شاملة في نفس اليوم.',
      },
      {
        q: 'هل تدعم المنصة عملات ودول مختلفة؟',
        a: 'نعم، تدعم المنصة معظم العملات العربية والدولية (الريال السعودي، الدرهم الإماراتي، الجنيه المصري، الدولار، وغيرها) وتتيح تخصيص السوق المستهدف بحسب البلد.',
      },
    ],
  },
  {
    category: 'التحليل المالي والتقارير',
    items: [
      {
        q: 'كيف يتم حساب التوقعات المالية ونقطة التعادل؟',
        a: 'تعتمد المنصة على نماذج مالية رياضية متقدمة تحسب التكاليف الرأسمالية (CAPEX)، التكاليف التشغيلية (OPEX)، والإيرادات المتوقعة، لترسم خريطة التدفقات النقدية ونقطة التعادل دقيقة.',
      },
      {
        q: 'كيف يمكنني مشاركة نموذج العمل والدراسة؟',
        a: 'تتيح لك المنصة مشاركة جميع الخطط ودراسات الجدوى عبر روابط تفاعلية آمنة تتيح للمستثمرين استعراضها مباشرة.',
      },
    ],
  },
  {
    category: 'الاشتراكات والحسابات',
    items: [
      {
        q: 'هل يمكنني إلغاء اشتراكي في أي وقت؟',
        a: 'نعم، إلغاء الاشتراك متاح بضغطة زر من صفحة إعدادات الحساب دون أي شروط أو رسوم إلغاء.',
      },
      {
        q: 'هل توجد باقة مجانية لتجربة المنصة؟',
        a: 'نعم، تتيح الباقة المجانية تجربة إعداد نماذج الأعمال (BMC) واستكشاف أدوات المنصة الأساسية مجاناً.',
      },
    ],
  },
];

export default function FAQPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsList.flatMap((group) =>
      group.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    ),
  };

  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* Hero Section */}
      <section className="py-20 lg:py-24 text-center bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary">
            <HelpCircle className="size-3.5 ml-1.5 inline" />
            مركز المساعدة والإجابات
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            كيف يمكننا مساعدتك اليوم؟
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            استكشف الإجابات الشائعة حول إعداد دراسات الجدوى، التقارير المالية، والاشتراكات.
          </p>
        </div>
      </section>

      {/* FAQs Body */}
      <section className="py-16 container mx-auto px-4 max-w-4xl space-y-16">
        {faqsList.map((group) => (
          <div key={group.category} className="space-y-6 text-right">
            <h2 className="text-2xl font-bold text-foreground border-r-4 border-primary pr-3">
              {group.category}
            </h2>
            <div className="grid gap-6">
              {group.items.map((item) => (
                <div key={item.q} className="p-6 rounded-2xl border border-border/70 bg-card shadow-sm space-y-3">
                  <h3 className="text-lg font-bold text-foreground">{item.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Support Box */}
      <section className="py-16 container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-muted/50 border border-border space-y-4">
          <MessageSquare className="size-10 text-primary mx-auto" />
          <h3 className="text-2xl font-bold text-foreground">لم تجد إجابة لسؤالك؟</h3>
          <p className="text-sm text-muted-foreground">
            فريق الدعم الفني والمستشارون متواجدون لمساعدتك في أي استفسار أو توضيح.
          </p>
          <Link href="/contact-us">
            <Button size="lg" className="gap-2 mt-2">
              تواصل مع فريق الدعم
              <ArrowLeft className="size-4" />
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
