import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Check, ArrowLeft, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'الأسعار والخطط | خطة - خطط اشتراك مرنة لكل المستويات',
  description: 'استكشف خطط الأسعار المتنوعة لمنصة خطة. ابدأ خطتك المجانية أو اختر الباقة الاحترافية مع خيارات مرنة تناسب أصحاب المشاريع والشركات.',
};

const plans = [
  {
    name: 'المبتدئ (Starter)',
    price: 'مجاناً',
    period: 'للأبد',
    description: 'مثالية لاستكشاف المنصة وتجربة أدوات إعداد نموذج العمل الأولي.',
    features: [
      'دراسة جدوى مبسطة واحدة',
      'نموذج العمل التجاري (BMC)',
      'توقعات مالية أساسية (سنة واحدة)',
      'دعم عبر البريد الإلكتروني',
    ],
    cta: 'ابدأ مجاناً',
    variant: 'outline' as const,
    popular: false,
  },
  {
    name: 'الاحترافي (Pro)',
    price: '$49',
    period: '/ شهرياً',
    description: 'الخيار الأفضل لرواد الأعمال والمستثمرين لإعداد دراسات جدوى شاملة.',
    features: [
      'دراسات جدوى متكاملة غير محدودة',
      'توقعات مالية تفصيلية لـ 5 سنوات',
      'استوديو الهوية البصرية ورادار السوق',
      'تصدير تقارير PDF وفروض المستثمرين',
      'دعم فني ذو أولوية VIP',
      'تحليل المخاطر وحساب نقطة التعادل',
    ],
    cta: 'اشترك الآن',
    variant: 'default' as const,
    popular: true,
  },
  {
    name: 'المؤسسات (Enterprise)',
    price: '$149',
    period: '/ شهرياً',
    description: 'حساب مخصص للحاضنات، المكاتب الاستشارية، وحاضنات الأعمال.',
    features: [
      'كل مميزات الباقة الاحترافية',
      'حسابات متعددة لفريق العمل',
      'تخصيص الهوية التجارية على التقارير',
      'مستشار مالي خاص للمراجعة والتدقيق',
      'ربط برمجيات API ودعم خاص',
    ],
    cta: 'تواصل مع المبيعات',
    variant: 'outline' as const,
    popular: false,
  },
];

const pricingFaqs = [
  {
    q: 'هل يمكنني تجربة المنصة مجاناً قبل الاشتراك؟',
    a: 'نعم بالتأكيد! يمكنك إنشاء حساب مجاني والوصول لنماذج الأعمال الأساسية واستكشاف أدوات المنصة قبل الترقية.',
  },
  {
    q: 'هل التقارير الصادرة من المنصة مقبولة لدى الجهات التمويلية؟',
    a: 'نعم، تعتمد خطة على المعادلات المالية الدولية والمعايير المعتمدة لدى البنوك وحاضنات الأعمال في العالم العربي.',
  },
  {
    q: 'هل يمكنني إلغاء اشتراكي في أي وقت؟',
    a: 'نعم، يمكنك إلغاء أو تغيير باقة اشتراكك بسهولة في أي وقت من صفحة إعدادات الحساب دون أي التزامات خفية.',
  },
];

export default function PricingPlansPage() {
  return (
    <PublicLayout>
      {/* Header Section */}
      <section className="py-20 lg:py-24 text-center bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4 max-w-3xl">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary">
            <Sparkles className="size-3.5 ml-1.5 inline" />
            أسعار واضحة وشفافة
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight">
            خطط تناسب جميع مراحل مشروعك
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            اختر الباقة المناسبة لاحتياجاتك وابدأ في بناء خطة عملك ومستقبلك الاستثماري اليوم.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col justify-between relative border-border/70 shadow-sm ${
                plan.popular ? 'border-primary shadow-lg ring-2 ring-primary/20 bg-card' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full shadow">
                  الأكثر إقبالاً 🌟
                </div>
              )}
              <CardHeader className="text-right">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {plan.description}
                </CardDescription>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-foreground">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 text-right flex-1">
                <hr className="border-border/60 my-2" />
                <p className="text-xs font-semibold text-muted-foreground uppercase">المميزات المشمولة:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className="size-4 text-emerald-600 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-6">
                <Link href="/login" className="w-full">
                  <Button variant={plan.variant} className="w-full gap-2">
                    {plan.cta}
                    <ArrowLeft className="size-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Trust & Guarantee */}
      <section className="py-12 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto px-4 text-center max-w-2xl space-y-3">
          <ShieldCheck className="size-10 text-emerald-600 mx-auto" />
          <h3 className="text-xl font-bold text-foreground">ضمان الأمان والرضا 100%</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            جميع معاملاتك المالية مأمونة ومثبتة. يمكنك تجربة المنصة والتواصل مع فريق الدعم في أي وقت للحصول على المساعدة.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <HelpCircle className="size-8 text-primary mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-foreground">أسئلة شائعة عن الاشتراكات</h2>
        </div>

        <div className="space-y-6 text-right">
          {pricingFaqs.map((faq) => (
            <div key={faq.q} className="p-6 rounded-2xl border border-border bg-card space-y-2">
              <h4 className="font-bold text-foreground text-lg">{faq.q}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
