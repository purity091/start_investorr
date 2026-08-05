"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Check,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Gift,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { useAuthModal } from '@/features/auth/AuthModalContext';
import { cn } from '@/lib/utils';

export const PricingPlansGallery: React.FC = () => {
  const { openAuthModal } = useAuthModal();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const claimedCount = 73; // 73 of 100 spots claimed
  const totalSpots = 100;
  const remainingSpots = totalSpots - claimedCount;

  const plans = [
    {
      id: 'free',
      name: 'الباقة الأساسية (Starter)',
      tagline: 'للمبتدئين والاستكشاف الأولي',
      description: 'مثالية للبداية السريعة واستكشاف أفكار المشاريع ونموذج العمل التجاري الأولي.',
      priceDisplay: '$0',
      originalPrice: '',
      priceNote: 'مجاناً للأبد',
      period: 'للأبد',
      badgeVariant: 'secondary' as const,
      popular: false,
      ctaText: 'ابدأ مجاناً الآن',
      ctaVariant: 'outline' as const,
      features: [
        'تصفح عينات مشاريع SaaS والشركات الناجحة',
        'بناء نموذج عمل تجاري واحد (BMC)',
        'حاسبة الإيرادات المتكررة الأساسية (MRR / ARR)',
        'الوصول لأكاديمية خطة والمقالات التعليمية',
        'حفظ دراسة واحدة سحابياً',
      ],
      notIncluded: [
        'نماذج عمل غير محدودة',
        'تصدير تقارير PDF المعتمدة',
        'فتح تفاصيل +500 شركة',
        'تقييم الجاهزية الاستثمارية من MIT',
      ]
    },
    {
      id: 'pro',
      name: 'الباقة المتوسطة (Pro)',
      tagline: 'الباقة الأكثر اختياراً 🌟',
      description: 'الخيار الأفضل والأنسب لرواد الأعمال والمستقلين لبناء مشاريع متكاملة.',
      priceDisplay: billingCycle === 'annual' ? '$7' : '$9',
      originalPrice: '',
      priceNote: billingCycle === 'annual' ? 'دفع سنوي ($84 / سنة)' : 'السعر الأساسي $9 شهرياً',
      period: '/ شهرياً',
      badgeVariant: 'default' as const,
      popular: true,
      ctaText: 'اشترك بالباقة المتوسطة ($9)',
      ctaVariant: 'default' as const,
      features: [
        'نماذج أعمال تجارية غير محدودة (BMC Studio)',
        'فتح كافة تفاصيل ودراسات +500 شركة ناجحة',
        'حاسبة الإيرادات المتقدمة (MRR, ARR, LTV, Churn)',
        'تصدير تقارير PDF وفروض المستثمرين المعتمدة',
        'استكشاف +100 قطاع وسوق استثماري ميداني',
        'تحليل الجاهزية الاستثمارية وتقييم المخاطر (MIT)',
        'دعم فني سريع وسريع الاستجابة',
      ],
      notIncluded: [
        'استشارات ومراجعة مالية مباشرة',
        'تخصيص الهوية التجارية للشركة',
      ]
    },
    {
      id: 'enterprise',
      name: 'الباقة القوية (Enterprise)',
      tagline: 'الباقة القوية الشاملة 🏛️',
      description: 'القوة الكاملة للمستشارين، الحاضنات، والشركات الناشئة التي تبحث عن أقصى كفاءة.',
      priceDisplay: billingCycle === 'annual' ? '$15' : '$19',
      originalPrice: '',
      priceNote: billingCycle === 'annual' ? 'دفع سنوي ($180 / سنة)' : 'السعر الأساسي $19 شهرياً',
      period: '/ شهرياً',
      badgeVariant: 'outline' as const,
      popular: false,
      ctaText: 'اشترك بالباقة القوية ($19)',
      ctaVariant: 'outline' as const,
      features: [
        'كل مميزات الباقة المتوسطة بالكامل',
        'دعم الاستشارات والمراجعة المالية والتسويقية',
        'تخصيص الهوية التجارية والشعار على التقارير',
        'دعم العمل الجماعي وتعدد المستخدمين (Team Access)',
        'أولوية الوصول للمميزات والأدوات البرمجية الذكية',
        'دعم فني استثنائي وخاص VIP 24/7',
        'ربط وتطوير مخصص لحسابك',
      ],
      notIncluded: []
    },
  ];

  const comparisonFeatures = [
    { name: 'تصفح أفكار مشاريع SaaS و Micro-SaaS', free: 'محدود', pro: 'كامل (+500)', enterprise: 'كامل (+500)' },
    { name: 'استوديو نموذج العمل التجاري (BMC)', free: 'مشروع واحد', pro: 'غير محدود', enterprise: 'غير محدود' },
    { name: 'مولد الذكاء الاصطناعي وعرض القيمة', free: 'مغلق', pro: 'متاح بالكامل', enterprise: 'متاح بالكامل' },
    { name: 'حاسبة الإيرادات (MRR / ARR / LTV)', free: 'أساسية', pro: 'متقدمة', enterprise: 'متقدمة' },
    { name: 'تصدير تقارير PDF وفروض التمويل', free: 'مغلق', pro: 'متاح بالكامل', enterprise: 'متاح بالكامل' },
    { name: 'تقييم الجاهزية الاستثمارية (MIT)', free: 'مغلق', pro: 'متاح بالكامل', enterprise: 'متاح بالكامل' },
    { name: 'تخصيص الشعار والهوية على التقارير', free: 'غير مشمول', pro: 'غير مشمول', enterprise: 'متاح بالكامل' },
    { name: 'تعدد المستخدمين وفريق العمل', free: 'غير مشمول', pro: 'غير مشمول', enterprise: 'متاح بالكامل' },
    { name: 'الدعم الفني والأولوية', free: 'قياسي', pro: 'سريع', enterprise: 'VIP 24/7' },
  ];

  const pricingFaqs = [
    {
      q: 'ما هي باقات المنصة وأسعارها؟',
      a: 'تتضمن المنصة 3 باقات رئيسية: الباقة الأساسية (مجاناً 0$)، الباقة المتوسطة (سعرها الأساسي $9 شهرياً)، والباقة القوية (سعرها الأساسي $19 شهرياً).'
    },
    {
      q: 'هل يتطلب التسجيل إدخال بطاقة ائتمان؟',
      a: 'يمكنك التسجيل فورياً واستكشاف الباقة الأساسية مجاناً قبل اختيار باقتك وتفعيلها.'
    },
    {
      q: 'هل توجد أي رسوم أو التزامات خفية؟',
      a: 'لا توجد أي رسوم خفية، يمكنك ترقية حسابك أو تعديل باقتك أو إلغائها في أي وقت بسهولة من إعدادات الحساب.'
    },
    {
      q: 'هل التقارير الصادرة من المنصة مقبولة لدى الجهات التمويلية؟',
      a: 'نعم، تعتمد خطة على المعادلات المالية الدولية والمعايير المعتمدة لدى البنوك وحاضنات الأعمال في العالم العربي ومؤسسات التمويل.'
    }
  ];

  return (
    <div dir="rtl" className="w-full bg-background text-foreground font-sans pb-20 space-y-10">
      
      {/* 1. Official Shadcn Announcement Banner */}
      <div className="bg-muted/80 border-b border-border text-foreground py-2.5 px-4 sticky top-16 z-40 backdrop-blur-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <Badge variant="default" className="text-xs font-bold gap-1">
              <Gift className="size-3" />
              <span>عرض الإطلاق</span>
            </Badge>
            <span className="text-xs sm:text-sm font-semibold text-foreground">
              تسجيل مجاني لأول 100 مستخدم + أسعار أساسية تبدأ من $9 و $19 فقط!
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span>تم حجز {claimedCount} من 100</span>
              <span className="text-primary font-bold">({remainingSpots} متبقياً)</span>
            </div>

            <Button
              onClick={() => openAuthModal('register')}
              size="sm"
              className="font-bold text-xs h-8 px-3 gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>انشئ حسابك الآن</span>
              <ArrowLeft className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Standard Page Header Section */}
      <section className="container mx-auto px-4 max-w-4xl text-center space-y-4 pt-4">
        <Badge variant="outline" className="text-xs font-medium px-3 py-1 gap-1.5 mx-auto">
          <Sparkles className="size-3.5 text-primary" />
          <span>خطط اشتراك واضحة ومحددة</span>
        </Badge>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
          اختر الباقة المناسبة لاحتياجات مشروك
        </h1>

        <p className="text-sm text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto">
          انتقل من الفكرة المبدئية إلى دراسة جدوى ونموذج عمل تجاري (BMC) متكامل وفق المعايير العالمية.
        </p>

        {/* Shadcn Segmented Billing Switcher */}
        <div className="pt-2 flex items-center justify-center gap-2">
          <div className="inline-flex items-center p-1 rounded-lg bg-muted border border-border/60 text-xs font-medium">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-3 py-1.5 rounded-md transition-all cursor-pointer",
                billingCycle === 'monthly' ? "bg-background text-foreground shadow-2xs font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              دفع شهري
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={cn(
                "px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center gap-1.5",
                billingCycle === 'annual' ? "bg-background text-foreground shadow-2xs font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>دفع سنوي</span>
              <Badge variant="secondary" className="text-[10px] font-semibold py-0 px-1.5">
                خصم 20%
              </Badge>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Standard Shadcn Cards Grid */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={cn(
                "flex flex-col justify-between relative border-border/60 shadow-xs transition-all",
                plan.popular ? "border-primary shadow-sm bg-card ring-1 ring-primary/20" : "bg-card"
              )}
            >
              <CardHeader className="p-5 sm:p-6 text-right space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant={plan.badgeVariant} className="text-xs font-medium">
                    {plan.tagline}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold text-foreground">{plan.name}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground font-normal leading-relaxed">
                    {plan.description}
                  </CardDescription>
                </div>

                <div className="pt-2 border-t border-border/40 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">{plan.priceDisplay}</span>
                    {plan.originalPrice && (
                      <span className="text-sm font-semibold text-muted-foreground line-through opacity-70">
                        {plan.originalPrice}
                      </span>
                    )}
                    {plan.period && <span className="text-xs text-muted-foreground font-normal">{plan.period}</span>}
                  </div>
                  <p className="text-xs font-semibold text-primary">{plan.priceNote}</p>
                </div>
              </CardHeader>

              <CardContent className="p-5 sm:p-6 pt-0 space-y-4 flex-1 text-right border-t border-border/40">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block pt-3">
                  المميزات المشمولة:
                </span>
                <ul className="space-y-2.5">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs font-normal text-foreground">
                      <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>

                {plan.notIncluded.length > 0 && (
                  <div className="pt-2 border-t border-border/40 space-y-2">
                    {plan.notIncluded.map((notFeat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-muted-foreground/60 line-through">
                        <span className="size-1 rounded-full bg-muted-foreground/40 shrink-0" />
                        <span>{notFeat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-5 sm:p-6 bg-muted/20 border-t border-border/40">
                <Button
                  onClick={() => openAuthModal('register')}
                  variant={plan.ctaVariant}
                  className="w-full text-xs font-bold h-9 gap-1.5 cursor-pointer shadow-2xs"
                >
                  <span>{plan.ctaText}</span>
                  <ArrowLeft className="size-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. Standard Shadcn Comparison Table */}
      <section className="container mx-auto px-4 max-w-5xl">
        <Card className="border-border/60 shadow-xs overflow-hidden">
          <CardHeader className="bg-card p-5 sm:p-6 border-b border-border/40">
            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              <span>جدول المقارنة التفصيلي بين الباقات</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground font-normal">
              استعرض الميزات والأدوات المتاحة في كل باقة قبل اتخاذ قرارك.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%] font-bold text-foreground">الميزة / الأداة</TableHead>
                  <TableHead className="text-center font-bold text-muted-foreground">الباقة الأساسية</TableHead>
                  <TableHead className="text-center font-bold text-primary">الباقة المتوسطة (Pro)</TableHead>
                  <TableHead className="text-center font-bold text-foreground">الباقة القوية (Enterprise)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonFeatures.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-xs text-foreground">{row.name}</TableCell>
                    <TableCell className="text-center text-xs text-muted-foreground font-normal">{row.free}</TableCell>
                    <TableCell className="text-center text-xs text-primary font-bold">{row.pro}</TableCell>
                    <TableCell className="text-center text-xs text-foreground font-bold">{row.enterprise}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* 5. Trust & Guarantee Section */}
      <section className="container mx-auto px-4 max-w-5xl">
        <Card className="border-border/60 shadow-xs bg-muted/20">
          <CardContent className="p-6 text-center space-y-2">
            <ShieldCheck className="size-8 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-foreground">ضمان الشفافية وأمان البيانات 100%</h3>
            <p className="text-xs text-muted-foreground font-normal max-w-xl mx-auto leading-relaxed">
              جميع معلوماتك ونماذج أعمالك محمية بتقنيات التشفير السحابي المتقدمة (Row Level Security). يمكنك إدارة أو تغيير باقتك في أي وقت بسهولة وبدون التزامات خفية.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* 6. Pricing FAQ Accordion */}
      <section className="container mx-auto px-4 max-w-3xl">
        <Card className="border-border/60 shadow-xs">
          <CardHeader className="p-5 sm:p-6 border-b border-border/40 pb-4">
            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <HelpCircle className="size-4 text-primary" />
              <span>الأسئلة الشائعة حول الباقات وعرض الإطلاق</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 sm:p-6 space-y-3">
            {pricingFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-border/60 bg-card overflow-hidden transition-all">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 flex items-center justify-between text-right gap-4 hover:bg-muted/40 transition-colors cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-bold text-foreground">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="size-4 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/40 font-normal">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>

    </div>
  );
};
