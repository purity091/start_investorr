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
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Gift,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers,
  Rocket,
  Crown,
  Compass,
  CreditCard,
  Zap,
  Lock,
  DollarSign,
  Globe
} from 'lucide-react';
import { useAuthModal } from '@/features/auth/AuthModalContext';
import { cn } from '@/lib/utils';

export const PricingPlansGallery: React.FC = () => {
  const { openAuthModal } = useAuthModal();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [currency, setCurrency] = useState<'SAR' | 'USD'>('SAR');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const claimedCount = 73;
  const totalSpots = 100;
  const remainingSpots = totalSpots - claimedCount;

  const plans = [
    {
      id: 'pioneer',
      name: 'باقة رائد',
      icon: Compass,
      tagline: 'ل للمبتدئين واكتشاف المشاريع',
      description: 'بداية سلسة تتيح لك بناء واختبار أول 5 مشاريع ونماذج أعمال تجارية.',
      priceDisplay: currency === 'SAR' ? '0 ر.س' : '$0',
      priceNote: 'مجاناً للأبد بدون إدخال بطاقة',
      period: 'للأبد',
      badgeVariant: 'secondary' as const,
      popular: false,
      ctaText: 'ابدأ كـ رائد مجاناً',
      ctaVariant: 'outline' as const,
      projectLimitText: '5 مشاريع (سعة دائمة)',
      parentPlanNote: '',
      features: [
        'سعة إنشاء حتى 5 مشاريع ودراسات جدوى',
        'تصفح عينات مشاريع SaaS والشركات الناجحة',
        'بناء ونمذجة الأعمال عبر باني المنصة (BMC)',
        'حاسبة الإيرادات المتكررة الأساسية (MRR / ARR)',
        'الوصول لأكاديمية خطة والمقالات التعليمية',
      ],
      notIncluded: [
        'مشاركة الخطط ونماذج العمل عبر رابط آمن',
        'تحليل الجاهزية الاستثمارية من MIT',
        'فتح تفاصيل +500 شركة',
        'تخصيص الهوية التجارية وتعدد المستخدمين',
      ]
    },
    {
      id: 'founder',
      name: 'باقة مؤسس',
      icon: Rocket,
      tagline: 'الباقة الأكثر اختياراً',
      description: 'الخيار التأسيسي الأنسب لرواد الأعمال لبناء 10 مشاريع مع أدوات تحليل ومشاركة.',
      priceDisplay: currency === 'SAR' 
        ? (billingCycle === 'annual' ? '29 ر.س' : '35 ر.س') 
        : (billingCycle === 'annual' ? '$7' : '$9'),
      priceNote: currency === 'SAR'
        ? (billingCycle === 'annual' ? 'تُدفع سنوياً (348 ر.س / سنة)' : 'تُدفع شهرياً مع إلغاء مرن')
        : (billingCycle === 'annual' ? 'تُدفع سنوياً ($84 / سنة)' : 'تُدفع شهرياً مع إلغاء مرن'),
      period: '/ شهرياً',
      badgeVariant: 'default' as const,
      popular: true,
      ctaText: currency === 'SAR'
        ? (billingCycle === 'annual' ? 'اشترك بباقة مؤسس (29 ر.س/شهر)' : 'اشترك بباقة مؤسس (35 ر.س/شهر)')
        : (billingCycle === 'annual' ? 'اشترك بباقة مؤسس ($7/شهر)' : 'اشترك بباقة مؤسس ($9/شهر)'),
      ctaVariant: 'default' as const,
      projectLimitText: '10 مشاريع متكاملة',
      parentPlanNote: 'يشمل كل مميزات باقة رائد، بالإضافة إلى:',
      features: [
        'ترقية السعة لبناء حتى 10 مشاريع متكاملة',
        'مشاركة الخطط ونماذج العمل عبر روابط تفاعلية آمنة',
        'فتح كافة تفاصيل ودراسات +500 شركة ناجحة',
        'حاسبة الإيرادات المتقدمة (MRR, ARR, LTV, Churn)',
        'التحليل المالي المتقدم وتوليد المخرجات الاستثمارية',
        'تحليل الجاهزية الاستثمارية وتقييم المخاطر (MIT)',
        'دعم فني سريع الاستجابة',
      ],
      notIncluded: [
        'استشارات ومراجعة مالية مباشرة',
        'تخصيص الهوية التجارية وفريق العمل',
      ]
    },
    {
      id: 'leader',
      name: 'باقة قائد',
      icon: Crown,
      tagline: 'الباقة القيادية الشاملة',
      description: 'القوة الكاملة للمستشارين والحاضنات لبناء مشاريع غير محدودة بأعلى كفاءة.',
      priceDisplay: currency === 'SAR' 
        ? (billingCycle === 'annual' ? '59 ر.س' : '75 ر.س') 
        : (billingCycle === 'annual' ? '$15' : '$19'),
      priceNote: currency === 'SAR'
        ? (billingCycle === 'annual' ? 'تُدفع سنوياً (708 ر.س / سنة)' : 'تُدفع شهرياً مع إلغاء مرن')
        : (billingCycle === 'annual' ? 'تُدفع سنوياً ($180 / سنة)' : 'تُدفع شهرياً مع إلغاء مرن'),
      period: '/ شهرياً',
      badgeVariant: 'outline' as const,
      popular: false,
      ctaText: currency === 'SAR'
        ? (billingCycle === 'annual' ? 'اشترك بباقة قائد (59 ر.س/شهر)' : 'اشترك بباقة قائد (75 ر.س/شهر)')
        : (billingCycle === 'annual' ? 'اشترك بباقة قائد ($15/شهر)' : 'اشترك بباقة قائد ($19/شهر)'),
      ctaVariant: 'outline' as const,
      projectLimitText: 'مشاريع غير محدودة',
      parentPlanNote: 'يشمل كل مميزات باقة مؤسس، بالإضافة إلى:',
      features: [
        'إنشاء مشاريع ودراسات جدوى غير محدودة',
        'مشاركة الخطط ونماذج العمل مع الفريق والمستثمرين',
        'دعم الاستشارات والمراجعة المالية والتسويقية',
        'تخصيص الهوية التجارية وتجربة الاستخدام',
        'دعم العمل الجماعي وتعدد المستخدمين (Team Access)',
        'أولوية الوصول للمميزات والأدوات البرمجية الذكية',
        'دعم فني استثنائي وخاص VIP 24/7',
      ],
      notIncluded: []
    },
  ];

  const comparisonFeatures = [
    { name: 'سعة المشاريع المسموحة', pioneer: '5 مشاريع', founder: '10 مشاريع', leader: 'غير محدود' },
    { name: 'تصفح أفكار مشاريع SaaS و Micro-SaaS', pioneer: 'محدود', founder: 'كامل (+500)', leader: 'كامل (+500)' },
    { name: 'بناء دراسات الجدوى ونماذج العمل (BMC Builder)', pioneer: 'حتى 5 مشاريع', founder: 'حتى 10 مشاريع', leader: 'غير محدود' },
    { name: 'مشاركة الخطط ونماذج العمل (Sharing Links)', pioneer: 'مغلق', founder: 'متاح بالكامل', leader: 'متاح بالكامل' },
    { name: 'استوديو نموذج العمل التجاري (BMC)', pioneer: 'أساسي', founder: 'متقدم', leader: 'شامل وتشاركي' },
    { name: 'مولد الذكاء الاصطناعي وعرض القيمة', pioneer: 'مغلق', founder: 'متاح بالكامل', leader: 'متاح بالكامل' },
    { name: 'حاسبة الإيرادات (MRR / ARR / LTV)', pioneer: 'أساسية', founder: 'متقدمة', leader: 'متقدمة' },
    { name: 'لوحة المؤشرات والتحليل المالي التفاعلي', pioneer: 'مغلق', founder: 'متاح بالكامل', leader: 'متاح بالكامل' },
    { name: 'تقييم الجاهزية الاستثمارية (MIT)', pioneer: 'مغلق', founder: 'متاح بالكامل', leader: 'متاح بالكامل' },
    { name: 'تخصيص الهوية التجارية وتجربة الاستخدام', pioneer: 'غير مشمول', founder: 'غير مشمول', leader: 'متاح بالكامل' },
    { name: 'تعدد المستخدمين وفريق العمل', pioneer: 'غير مشمول', founder: 'غير مشمول', leader: 'متاح بالكامل' },
    { name: 'الدعم الفني والأولوية', pioneer: 'قياسي', founder: 'سريع', leader: 'VIP 24/7' },
  ];

  const pricingFaqs = [
    {
      icon: Layers,
      category: 'سعة المشاريع',
      q: 'كيف يتم احتساب سعة المشاريع بين باقات رائد ومؤسس وقائد؟',
      a: 'تمنحك باقة رائد إمكانية بناء وإدارة حتى 5 مشاريع، بينما ترفع باقة مؤسس السعة إلى 10 مشاريع متكاملة، في حين تتيح لك باقة قائد إنشاء عدد غير محدود من المشاريع ونماذج العمل بدون أي قيود.'
    },
    {
      icon: Sparkles,
      category: 'تراكم المميزات',
      q: 'هل يختلف محتوى المميزات وتكرارها بين الباقات؟',
      a: 'لا يتم تكرار أسماء المميزات نهائياً؛ تبدأ بباقة رائد للتحليل المبدئي، ثم تضيف باقة مؤسس مميزات التشارك والتحليل المتقدم عبر روابط تفاعلية، وتكتمل في باقة قائد لتضمين الهوية التجارية، تعدد المستخدمين، والدعم الاستشاري.'
    },
    {
      icon: CreditCard,
      category: 'التجربة والدفع',
      q: 'هل يتطلب التسجيل إدخال بطاقة ائتمانية؟',
      a: 'لا يتطلب التسجيل أي بطاقة ائتمانية. يمكنك البدء المباشر في باقة رائد مجاناً للأبد واستكشاف أدوات المنصة قبل الترقية لباقة مؤسس أو قائد.'
    },
    {
      icon: Zap,
      category: 'الترقية والمرونة',
      q: 'هل يمكنني ترقية حسابي أو تعديل الباقة في أي وقت؟',
      a: 'نعم، يمكنك الترقية الفورية بين الباقات من لوحة التحكم في أي وقت. يتم احتساب الفارق بمرونة عالية، كما يمكنك إلغاء أو تغيير الاشتراك دون أي التزامات طويلة الأجل.'
    },
    {
      icon: Lock,
      category: 'الموثوقية والسرية',
      q: 'هل النماذج والبيانات الصادرة من المنصة آمنة وموثوقة؟',
      a: 'تعتمد خطة على أعلى معايير التشفير السحابي وحماية البيانات (Row Level Security)، وتتبع الخوارزميات المالية المعايير المعتمدة لدى حاضنات ومؤسسات التمويل والاستثمار.'
    }
  ];

  return (
    <div dir="rtl" className="w-full bg-background text-foreground font-sans pb-20 space-y-10">
      
      {/* 1. Launch Offer Banner (High Readability & Contrast) */}
      <div className="bg-primary/10 border-b border-primary/20 text-foreground py-3 px-4 sticky top-16 z-40 backdrop-blur-md shadow-2xs">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 text-center lg:text-right">
          
          <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
            <Badge variant="default" className="text-xs font-bold gap-1.5 px-3 py-1 bg-primary text-primary-foreground shadow-2xs">
              <Gift className="size-3.5" />
              <span>عرض الإطلاق الحصري</span>
            </Badge>
            
            <p className="text-xs sm:text-sm font-bold text-foreground leading-snug">
              تسجيل مجاني في باقة رائد لأول 100 مستخدم + أسعار خاصة لباقات مؤسس وقائد!
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* Progress Pill Indicator */}
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-background border border-border/80 shadow-2xs text-xs font-semibold">
              <span className="text-muted-foreground">تم حجز <strong className="text-foreground font-bold">{claimedCount} من {totalSpots}</strong></span>
              <span className="size-1 rounded-full bg-primary" />
              <span className="text-primary font-bold">({remainingSpots} متبقياً)</span>
            </div>

            <Button
              onClick={() => openAuthModal('register')}
              size="sm"
              className="font-bold text-xs h-8 px-4 gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>انشئ حسابك الآن</span>
              <ArrowLeft className="size-3.5" />
            </Button>
          </div>

        </div>
      </div>

      {/* 2. Header Section with Currency & Billing Controls */}
      <section className="container mx-auto px-4 max-w-4xl text-center space-y-5 pt-4">
        <Badge variant="outline" className="text-xs font-medium px-3 py-1 gap-1.5 mx-auto">
          <Sparkles className="size-3.5 text-primary" />
          <span>خطط اشتراك متدرجة ومحددة السعة والدورية</span>
        </Badge>

        <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
          اختر الباقة المناسبة: رائد، مؤسس، أو قائد
        </h1>

        <p className="text-sm text-muted-foreground font-normal leading-relaxed max-w-2xl mx-auto">
          شفافية كاملة في الأسعار ودورية الفوترة بدون أي رسوم خفية. يمكنك الترقية والإلغاء بسهولة.
        </p>

        {/* Currency & Billing Cycle Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          
          {/* Billing Cycle Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-muted border border-border/60 text-xs font-medium">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-3.5 py-1.5 rounded-lg transition-all cursor-pointer",
                billingCycle === 'monthly' ? "bg-background text-foreground shadow-2xs font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              دفع شهري (Monthly)
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={cn(
                "px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5",
                billingCycle === 'annual' ? "bg-background text-foreground shadow-2xs font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>دفع سنوي (Annual)</span>
              <Badge variant="secondary" className="text-[10px] font-bold py-0 px-1.5">
                توفير 20%
              </Badge>
            </button>
          </div>

          {/* Currency Switcher (SAR / USD) */}
          <div className="inline-flex items-center p-1 rounded-xl bg-muted border border-border/60 text-xs font-medium">
            <button
              onClick={() => setCurrency('SAR')}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1",
                currency === 'SAR' ? "bg-background text-foreground shadow-2xs font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Globe className="size-3.5 text-emerald-600" />
              <span>ريال سعودي (SAR)</span>
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1",
                currency === 'USD' ? "bg-background text-foreground shadow-2xs font-bold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <DollarSign className="size-3.5 text-blue-600" />
              <span>دولار أمريكي (USD)</span>
            </button>
          </div>

        </div>

        {/* Pricing Transparency & Stripe Compliance Banner */}
        <div className="max-w-2xl mx-auto p-3 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-4">
          <span className="flex items-center gap-1 text-foreground font-semibold">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>معالجة آمنة عبر بوابة Stripe العالمية</span>
          </span>
          <span className="text-border">•</span>
          <span>إلغاء فوري بضغطة زر</span>
          <span className="text-border">•</span>
          <span>فواتير إلكترونية فورية</span>
        </div>
      </section>

      {/* 3. Pricing Cards Grid */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const PlanHeaderIcon = plan.icon;
            return (
              <Card
                key={plan.id}
                className={cn(
                  "flex flex-col justify-between relative border-border/60 shadow-xs transition-all",
                  plan.popular ? "border-primary shadow-sm bg-card ring-1 ring-primary/20" : "bg-card"
                )}
              >
                <CardHeader className="p-5 sm:p-6 text-right space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <PlanHeaderIcon className="size-5" />
                    </span>
                    <Badge variant={plan.badgeVariant} className="text-xs font-medium">
                      {plan.tagline}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <CardTitle className="text-xl font-bold text-foreground">{plan.name}</CardTitle>
                    <CardDescription className="text-xs text-muted-foreground font-normal leading-relaxed">
                      {plan.description}
                    </CardDescription>
                  </div>

                  <div className="pt-2 border-t border-border/40 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">{plan.priceDisplay}</span>
                      {plan.period && <span className="text-xs text-muted-foreground font-normal">{plan.period}</span>}
                    </div>
                    <p className="text-xs font-semibold text-primary">{plan.priceNote}</p>
                  </div>
                </CardHeader>

                <CardContent className="p-5 sm:p-6 pt-0 space-y-4 flex-1 text-right border-t border-border/40">
                  {/* Initial Project Capacity Banner */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20 mt-3">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Layers className="size-4 text-primary" />
                      <span>سعة المشاريع:</span>
                    </span>
                    <Badge variant="default" className="text-xs font-extrabold px-2.5 py-0.5">
                      {plan.projectLimitText}
                    </Badge>
                  </div>

                  {plan.parentPlanNote ? (
                    <div className="pt-2">
                      <p className="text-xs font-bold text-primary flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20">
                        <Sparkles className="size-3.5 shrink-0" />
                        <span>{plan.parentPlanNote}</span>
                      </p>
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block pt-1">
                      المميزات المشمولة:
                    </span>
                  )}

                  <ul className="space-y-2.5">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs font-normal text-foreground">
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{feat}</span>
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
            );
          })}
        </div>
      </section>

      {/* 4. Comparison Table */}
      <section className="container mx-auto px-4 max-w-5xl">
        <Card className="border-border/60 shadow-xs overflow-hidden">
          <CardHeader className="bg-card p-5 sm:p-6 border-b border-border/40">
            <CardTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              <span>جدول المقارنة التفصيلي بين الباقات (رائد - مؤسس - قائد)</span>
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground font-normal">
              استعرض سعة المشاريع والميزات الإضافية لكل باقة.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%] font-bold text-foreground">الميزة / الأداة</TableHead>
                  <TableHead className="text-center font-bold text-muted-foreground">باقة رائد</TableHead>
                  <TableHead className="text-center font-bold text-primary">باقة مؤسس</TableHead>
                  <TableHead className="text-center font-bold text-foreground">باقة قائد</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonFeatures.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium text-xs text-foreground">{row.name}</TableCell>
                    <TableCell className="text-center text-xs text-muted-foreground font-normal">{row.pioneer}</TableCell>
                    <TableCell className="text-center text-xs text-primary font-bold">{row.founder}</TableCell>
                    <TableCell className="text-center text-xs text-foreground font-bold">{row.leader}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      {/* 5. Professional Pricing FAQ */}
      <section className="container mx-auto px-4 max-w-4xl space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="text-xs font-semibold px-3 py-1 gap-1.5 mx-auto">
            <HelpCircle className="size-3.5 text-primary" />
            <span>الأسئلة الشائعة</span>
          </Badge>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            إجابات شاملة وشفافة حول الباقات وسعة المشاريع
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
            تعرف على التفاصيل المتعلقة بسعة المشاريع، آلية تجميع الميزات بدون تكرار، وخيارات الترقية المرنة.
          </p>
        </div>

        <div className="grid gap-3">
          {pricingFaqs.map((faq, idx) => {
            const FaqIcon = faq.icon;
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-xl border bg-card transition-all overflow-hidden",
                  isOpen ? "border-primary/50 shadow-xs ring-1 ring-primary/10" : "border-border/60 hover:border-border"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "flex size-9 items-center justify-center rounded-lg shrink-0 transition-colors",
                      isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      <FaqIcon className="size-4" />
                    </span>
                    <div className="space-y-0.5 text-right">
                      <span className="text-[11px] font-semibold text-primary block">{faq.category}</span>
                      <h3 className="text-xs sm:text-sm font-bold text-foreground leading-snug">{faq.q}</h3>
                    </div>
                  </div>

                  <span className={cn(
                    "flex size-7 items-center justify-center rounded-full bg-muted/60 transition-transform duration-200 shrink-0",
                    isOpen && "rotate-180 bg-primary/10 text-primary"
                  )}>
                    <ChevronDown className="size-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 font-normal mt-1">
                    <p className="pt-3 pr-12">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
