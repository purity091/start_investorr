"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Gift,
  ChevronDown,
  Layers,
  Rocket,
  Crown,
  Compass,
  Zap,
  Lock,
  Upload,
  AlertCircle,
  Check,
  Minus,
} from 'lucide-react';
import { useAuthModal } from '@/features/auth/AuthModalContext';
import { useAuth } from '@/features/auth/AuthContext';
import {
  SubscriptionPlanId,
  getSubscriptionPlan,
  isHigherSubscriptionPlan,
  normalizeSubscriptionPlanId,
  SUBSCRIPTION_PLANS,
} from '@/lib/subscriptionPlans';
import { cn } from '@/lib/utils';

export const PricingPlansGallery: React.FC = () => {
  const { openAuthModal } = useAuthModal();
  const { user, profile } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [currency, setCurrency] = useState<'SAR' | 'USD'>('SAR');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Upgrade Modal State
  const [upgradeTargetPlan, setUpgradeTargetPlan] = useState<SubscriptionPlanId | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmittingUpgrade, setIsSubmittingUpgrade] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currentPlanId: SubscriptionPlanId = normalizeSubscriptionPlanId(profile?.subscription_plan);
  const currentPlan = getSubscriptionPlan(currentPlanId);

  const claimedCount = 73;
  const totalSpots = 100;
  const remainingSpots = totalSpots - claimedCount;

  const plans = [
    {
      id: 'starter' as const,
      name: 'باقة رائد',
      tag: 'الباقة الأولى',
      icon: Compass,
      description: 'الباقة الأولى لبناء أول 5 مشاريع ودراسات جدوى والبدء باحتراف.',
      priceDisplay: currency === 'SAR'
        ? `${SUBSCRIPTION_PLANS.starter.monthlyPriceSar} ر.س`
        : `$${SUBSCRIPTION_PLANS.starter.monthlyPriceUsd.toFixed(2)}`,
      priceNote: currency === 'SAR'
        ? (billingCycle === 'annual' ? 'تُدفع سنوياً (1,188 ر.س / سنة)' : 'تُدفع شهرياً')
        : (billingCycle === 'annual' ? 'تُدفع سنوياً ($316.80 / سنة)' : 'تُدفع شهرياً'),
      period: '/ شهرياً',
      popular: false,
      ctaText: currency === 'SAR'
        ? `اشترك بـ ${SUBSCRIPTION_PLANS.starter.monthlyPriceSar} ر.س/شهر`
        : `اشترك بـ $${SUBSCRIPTION_PLANS.starter.monthlyPriceUsd.toFixed(2)}/شهر`,
      projectLimitText: 'سعة 5 مشاريع',
      features: [
        'سعة بناء 5 مشاريع ودراسات جدوى',
        'تصفح عينات +500 شركة ناجحة',
        'حاسبة الإيرادات والنموذج المالي الأساسي',
        'بناء نموذج العمل التجاري (BMC Builder)',
        'وصول كامل لأكاديمية خطة والمستندات',
      ],
      notIncluded: [
        'روابط مشاركة تفاعلية مع المستثمرين',
        'فتح تفاصيل ودراسات +500 شركة',
        'تحليل الجاهزية الاستثمارية من MIT',
        'تخصيص الهوية التجارية وفريق العمل',
      ]
    },
    {
      id: 'founder' as const,
      name: 'باقة مؤسس',
      tag: 'الباقة الأكثر شعبية',
      icon: Rocket,
      description: 'الخيار التأسيسي لبناء 10 مشاريع، وتوليد مخرجات الذكاء الاصطناعي، ومشاركة الخطط.',
      priceDisplay: currency === 'SAR' 
        ? (billingCycle === 'annual' ? `${SUBSCRIPTION_PLANS.founder.annualMonthlyPriceSar} ر.س` : `${SUBSCRIPTION_PLANS.founder.monthlyPriceSar} ر.س`)
        : (billingCycle === 'annual' ? `$${SUBSCRIPTION_PLANS.founder.annualMonthlyPriceUsd.toFixed(2)}` : `$${SUBSCRIPTION_PLANS.founder.monthlyPriceUsd.toFixed(2)}`),
      priceNote: currency === 'SAR'
        ? (billingCycle === 'annual' ? `تُدفع سنوياً (${(SUBSCRIPTION_PLANS.founder.annualMonthlyPriceSar * 12).toLocaleString('en-US')} ر.س / سنة)` : 'تُدفع شهرياً مع إلغاء مرن')
        : (billingCycle === 'annual' ? `تُدفع سنوياً ($${(SUBSCRIPTION_PLANS.founder.annualMonthlyPriceUsd * 12).toFixed(2)} / سنة)` : 'تُدفع شهرياً مع إلغاء مرن'),
      period: '/ شهرياً',
      popular: true,
      badgeText: 'الأكثر اختياراً',
      ctaText: currency === 'SAR'
        ? (billingCycle === 'annual' ? `اشترك بـ ${SUBSCRIPTION_PLANS.founder.annualMonthlyPriceSar} ر.س/شهر` : `اشترك بـ ${SUBSCRIPTION_PLANS.founder.monthlyPriceSar} ر.س/شهر`)
        : (billingCycle === 'annual' ? `اشترك بـ $${SUBSCRIPTION_PLANS.founder.annualMonthlyPriceUsd.toFixed(2)}/شهر` : `اشترك بـ $${SUBSCRIPTION_PLANS.founder.monthlyPriceUsd.toFixed(2)}/شهر`),
      projectLimitText: 'سعة 10 مشاريع',
      parentPlanNote: 'تشمل ميزات باقة رائد، بالإضافة إلى:',
      features: [
        'سعة بناء 10 مشاريع ودراسات جدوى',
        'روابط مشاركة تفاعلية آمنة مع المستثمرين',
        'فتح كافة تفاصيل وخفايا +500 شركة ناجحة',
        'حاسبة الإيرادات المتقدمة (MRR, ARR, LTV)',
        'توليد تعليمات الذكاء الاصطناعي ومخرجات JSON',
        'تحليل الجاهزية الاستثمارية وتقييم المخاطر (MIT)',
        'دعم فني سريع الاستجابة',
      ],
      notIncluded: [
        'تخصيص الهوية التجارية والشعار على التقارير',
        'تعدد المستخدمين ودعم فريق العمل',
      ]
    },
    {
      id: 'leader' as const,
      name: 'باقة قائد',
      tag: 'للمستشارين والفرق',
      icon: Crown,
      description: 'للمستشارين والحاضنات والفرق التي تحتاج سعة غير محدودة وتخصيص كامل.',
      priceDisplay: currency === 'SAR' 
        ? (billingCycle === 'annual' ? `${SUBSCRIPTION_PLANS.leader.annualMonthlyPriceSar} ر.س` : `${SUBSCRIPTION_PLANS.leader.monthlyPriceSar} ر.س`)
        : (billingCycle === 'annual' ? `$${SUBSCRIPTION_PLANS.leader.annualMonthlyPriceUsd.toFixed(2)}` : `$${SUBSCRIPTION_PLANS.leader.monthlyPriceUsd.toFixed(2)}`),
      priceNote: currency === 'SAR'
        ? (billingCycle === 'annual' ? `تُدفع سنوياً (${(SUBSCRIPTION_PLANS.leader.annualMonthlyPriceSar * 12).toLocaleString('en-US')} ر.س / سنة)` : 'تُدفع شهرياً مع إلغاء مرن')
        : (billingCycle === 'annual' ? `تُدفع سنوياً ($${(SUBSCRIPTION_PLANS.leader.annualMonthlyPriceUsd * 12).toFixed(2)} / سنة)` : 'تُدفع شهرياً مع إلغاء مرن'),
      period: '/ شهرياً',
      popular: false,
      badgeText: 'سعة غير محدودة',
      ctaText: currency === 'SAR'
        ? (billingCycle === 'annual' ? `اشترك بـ ${SUBSCRIPTION_PLANS.leader.annualMonthlyPriceSar} ر.س/شهر` : `اشترك بـ ${SUBSCRIPTION_PLANS.leader.monthlyPriceSar} ر.س/شهر`)
        : (billingCycle === 'annual' ? `اشترك بـ $${SUBSCRIPTION_PLANS.leader.annualMonthlyPriceUsd.toFixed(2)}/شهر` : `اشترك بـ $${SUBSCRIPTION_PLANS.leader.monthlyPriceUsd.toFixed(2)}/شهر`),
      projectLimitText: 'مشاريع غير محدودة',
      parentPlanNote: 'تشمل ميزات باقة مؤسس، بالإضافة إلى:',
      features: [
        'إنشاء مشاريع ودراسات جدوى غير محدودة',
        'تعدد المستخدمين ودعم فريق العمل (Team Access)',
        'تخصيص الهوية التجارية والشعار على التقارير',
        'أولوية المراجعة والاستشارات الاستثمارية VIP',
        'تصدير التقارير الرسمية وإدارة كافة النسخ',
        'دعم فني استثنائي وتوجيه مباشر',
      ],
      notIncluded: []
    },
  ];

  const comparisonCategories = [
    {
      title: 'سعة المشاريع والنمذجة',
      features: [
        { name: 'سعة إنشاء المشاريع ودراسات الجدوى', starter: '5 مشاريع', founder: '10 مشاريع', leader: 'غير محدود' },
        { name: 'تصفح قاعدة بيانات الشركات الناجحة (+500 شركة)', starter: 'عينات محددة', founder: 'وصول كامل', leader: 'وصول كامل' },
        { name: 'بناء مخطط نموذج العمل التجاري (BMC Builder)', starter: true, founder: true, leader: true },
      ]
    },
    {
      title: 'التحليل المالي والذكاء الاصطناعي',
      features: [
        { name: 'حاسبة الإيرادات والنماذج المالية (MRR/ARR/LTV)', starter: 'أساسية', founder: 'متقدمة', leader: 'متقدمة + مخصصة' },
        { name: 'توليد تعليمات ChatGPT ومحلل مخرجات JSON', starter: false, founder: true, leader: true },
        { name: 'تقييم الجاهزية الاستثمارية والتحليل الميداني (MIT)', starter: false, founder: true, leader: true },
      ]
    },
    {
      title: 'المشاركة والتصدير والعمل الجماعي',
      features: [
        { name: 'مشاركة الخطط عبر روابط تفاعلية آمنة', starter: false, founder: true, leader: true },
        { name: 'تصدير التقارير الرسمية وإدارة النسخ', starter: false, founder: true, leader: true },
        { name: 'تخصيص الهوية التجارية والشعار على التقارير', starter: false, founder: false, leader: true },
        { name: 'دعم العمل الجماعي وتعدد المستخدمين (Team Access)', starter: false, founder: false, leader: true },
      ]
    },
    {
      title: 'الدعم الفني والاستشارات',
      features: [
        { name: 'أولوية المراجعة والاستشارات الاستثمارية', starter: 'دعم قياسي', founder: 'دعم سريع', leader: 'أولوية VIP' },
      ]
    }
  ];

  const pricingFaqs = [
    {
      icon: Layers,
      category: 'سعة المشاريع',
      q: 'ما الفرق الرئيسي بين الباقات؟',
      a: 'تبدأ الباقات من باقة رائد بقيمة 99 ر.س شهرياً (ما يعادل 26.40 دولاراً)، ثم تمنحك باقتا مؤسس وقائد سعة أعلى (10 مشاريع أو سعة غير محدودة)، وروابط مشاركة، وتحليلات مالية متقدمة، وتوليد الذكاء الاصطناعي.'
    },
    {
      icon: Sparkles,
      category: 'التطوير والترقية',
      q: 'هل يمكنني الترقية أو إلغاء الاشتراك في أي وقت؟',
      a: 'نعم بالتأكيد. يمكنك ترقية خطتك فوراً من لوحة التحكم، أو التغيير بين الدفع الشهري والسنوي، أو إلغاء الاشتراك بنقرة واحدة.'
    },
    {
      icon: Lock,
      category: 'الأمان والسرية',
      q: 'هل بيانات المشاريع والخطط الصادرة من المنصة آمنة؟',
      a: 'تعتمد منصة خطة على أعلى معايير التشفير السحابي لحماية بياناتك وأفكارك الاستثمارية بنسبة 100%.'
    }
  ];

  const closeUpgradeDialog = () => {
    if (isSubmittingUpgrade) return;
    setUpgradeTargetPlan(null);
    setReceiptFile(null);
    setUpgradeMessage(null);
  };

  const submitUpgradeRequest = async () => {
    if (!upgradeTargetPlan || !receiptFile) {
      setUpgradeMessage({ type: 'error', text: 'يرجى إرفاق صورة أو ملف وصل الحوالة البنكية.' });
      return;
    }

    setIsSubmittingUpgrade(true);
    setUpgradeMessage(null);

    try {
      const formData = new FormData();
      formData.append('targetPlan', upgradeTargetPlan);
      formData.append('receipt', receiptFile);

      const response = await fetch('/api/subscription/upgrade-request', {
        method: 'POST',
        body: formData,
      });

      const payload = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        const message =
          payload?.error === 'PENDING_REQUEST_EXISTS'
            ? 'لديك طلب ترقية قيد المراجعة حالياً.'
            : payload?.error === 'INVALID_RECEIPT_TYPE'
              ? 'صيغة الوصل غير مدعومة (استخدم PDF أو PNG/JPG).'
              : payload?.error === 'INVALID_RECEIPT_SIZE'
                ? 'حجم الملف يتجاوز الحد المسموح (5MB).'
                : 'تعذر إرسال الطلب، حاول مرة أخرى.';
        throw new Error(message);
      }

      setUpgradeMessage({ type: 'success', text: 'تم إرسال الطلب بنجاح! سيتم مراجعة الوصل وتفعيل الباقة مباشرة.' });
      setReceiptFile(null);
    } catch (error) {
      setUpgradeMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'تعذر إرسال طلب الترقية حالياً.',
      });
    } finally {
      setIsSubmittingUpgrade(false);
    }
  };

  return (
    <div dir="rtl" className="w-full bg-background text-foreground font-sans pb-20 space-y-8">
      
      {/* Launch Banner */}
      <div className="bg-primary/10 text-foreground py-2.5 px-4 sticky top-16 z-40 backdrop-blur-md border-0 shadow-2xs">
        <div className="container mx-auto flex items-center justify-between gap-3 text-right">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="text-xs font-bold gap-1 px-2.5 py-0.5 bg-primary text-primary-foreground border-0">
              <Gift className="size-3.5" />
              <span>عرض الإطلاق</span>
            </Badge>
            <p className="text-xs font-bold text-foreground">
               استفد من سعر الباقة الأولى: 99 ر.س شهرياً (26.40 دولاراً).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground hidden sm:inline">
              متبقي {remainingSpots} مقعداً
            </span>
            {!user && (
              <Button
                onClick={() => openAuthModal('login')}
                size="sm"
                className="font-bold text-xs h-7 px-3 gap-1 cursor-pointer border-0 shadow-2xs"
              >
                <span>ابدأ بـ 99 ر.س</span>
                <ArrowLeft className="size-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Streamlined Header & Controls (Minimalist & Direct) */}
      <section className="container mx-auto px-4 max-w-4xl text-center space-y-3 pt-2">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground text-center mx-auto">
          باقات خطة
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-medium max-w-lg mx-auto text-center">
           اختر الباقة المناسبة لحجم أعمالك. تبدأ الباقات من 99 ر.س شهرياً (26.40 دولاراً).
        </p>

        {user && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 font-bold text-xs border-0 shadow-2xs">
            <CheckCircle2 className="size-3.5 shrink-0" />
            <span>اشتراكك الحالي: <strong>{currentPlan.name}</strong> ({currentPlan.projectLimitLabel})</span>
          </div>
        )}

        {/* Controls Switcher (Monthly/Annual & Currency Dropdown on Left) */}
        <div className="pt-3 flex items-center justify-between max-w-xl mx-auto gap-3">
          {/* Left Side: Compact Currency Select Dropdown */}
          <div className="relative inline-flex items-center shrink-0">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'SAR' | 'USD')}
              className="appearance-none bg-muted/60 hover:bg-muted text-foreground text-xs font-bold py-2 pr-3 pl-7 rounded-xl border-0 shadow-2xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all dir-rtl"
              aria-label="اختر العملة"
            >
              <option value="SAR">ر.س (SAR)</option>
              <option value="USD">$ (USD)</option>
            </select>
            <ChevronDown className="size-3.5 text-muted-foreground pointer-events-none absolute left-2 top-1/2 -translate-y-1/2" />
          </div>

          {/* Center / Right: Sleek Monthly/Annual Toggle */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-muted/70 text-xs font-semibold border-0 shadow-2xs mx-auto sm:mx-0">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                "px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer border-0 font-bold text-xs select-none",
                billingCycle === 'monthly'
                  ? "bg-background text-foreground shadow-2xs font-black"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              دفع شهري
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={cn(
                "px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 border-0 font-bold text-xs select-none",
                billingCycle === 'annual'
                  ? "bg-background text-foreground shadow-2xs font-black"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span>دفع سنوي</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0">
                توفير حتى 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards Grid (Immediately Shown) */}
      <section className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => {
            const PlanHeaderIcon = plan.icon;
            const isCurrentPlan = !!user && currentPlanId === plan.id;
            const canUpgrade = !!user && isHigherSubscriptionPlan({ currentPlanId, targetPlanId: plan.id });
            const isLowerPlan = !!user && !isCurrentPlan && !canUpgrade;

            return (
              <Card
                key={plan.id}
                className={cn(
                  "flex flex-col justify-between relative border-0 shadow-2xs transition-all rounded-3xl p-6 text-right",
                  isCurrentPlan
                    ? "bg-card ring-2 ring-emerald-500/40"
                    : plan.popular
                    ? "bg-card ring-2 ring-primary shadow-md"
                    : "bg-card/90 hover:bg-card"
                )}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={cn(
                    "size-10 rounded-2xl flex items-center justify-center text-foreground shrink-0 shadow-2xs",
                     plan.popular ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  )}>
                    <PlanHeaderIcon className="size-5" />
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    <span className={cn(
                      "text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs",
                       "bg-primary/15 text-primary"
                    )}>
                      {plan.tag}
                    </span>

                    {plan.badgeText && (
                      <span className="bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs">
                        {plan.badgeText}
                      </span>
                    )}

                    {isCurrentPlan && (
                      <Badge className="bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-1 border-0">
                        باقتك الحالية
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Tag */}
                  <div className="pt-3 border-0 space-y-1">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-foreground tracking-tight">{plan.priceDisplay}</span>
                      {plan.period && <span className="text-xs text-muted-foreground font-bold">{plan.period}</span>}
                    </div>
                    <p className="text-xs font-bold text-primary">{plan.priceNote}</p>
                  </div>

                  {/* Capacity Box */}
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border-0 shadow-2xs">
                    <span className="text-xs font-extrabold text-foreground flex items-center gap-1.5">
                      <Layers className="size-4 text-primary" />
                      <span>سعة المشاريع:</span>
                    </span>
                    <span className="text-xs font-black text-primary bg-background px-2.5 py-0.5 rounded-lg shadow-2xs">
                      {plan.projectLimitText}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2">
                    {plan.parentPlanNote && (
                      <p className="text-[11px] font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-xl border-0">
                        {plan.parentPlanNote}
                      </p>
                    )}

                    <ul className="space-y-2 text-xs font-medium text-foreground">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-medium text-foreground">
                          <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.notIncluded.length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        {plan.notIncluded.map((notFeat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground/50 line-through">
                            <Minus className="size-3.5 text-muted-foreground/40 shrink-0" />
                            <span>{notFeat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CTA Footer */}
                <div className="pt-6 mt-auto">
                  {!user ? (
                    <Button
                      onClick={() => openAuthModal('login')}
                      variant={plan.popular ? 'default' : 'outline'}
                      className="w-full text-xs font-black h-11 gap-1.5 cursor-pointer rounded-xl border-0 shadow-2xs"
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowLeft className="size-4" />
                    </Button>
                  ) : isCurrentPlan ? (
                    <Button
                      disabled
                      variant="outline"
                      className="w-full text-xs font-black h-11 gap-1.5 bg-emerald-500/10 text-emerald-600 border-0 cursor-default rounded-xl"
                    >
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      <span>باقتك الحالية النشطة</span>
                    </Button>
                  ) : canUpgrade ? (
                    <Button
                      onClick={() => {
                        setUpgradeTargetPlan(plan.id);
                        setReceiptFile(null);
                        setUpgradeMessage(null);
                      }}
                      variant="default"
                      className="w-full text-xs font-black h-11 gap-1.5 cursor-pointer border-0 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl"
                    >
                      <Zap className="size-4 text-amber-300" />
                      <span>الترقية إلى {plan.name}</span>
                      <ArrowLeft className="size-4" />
                    </Button>
                  ) : isLowerPlan ? (
                    <Button
                      disabled
                      variant="outline"
                      className="w-full text-xs font-bold h-11 gap-1.5 opacity-60 cursor-default rounded-xl border-0"
                    >
                      <Check className="size-4 text-muted-foreground" />
                      <span>مشمولة في باقتك الحالية</span>
                    </Button>
                  ) : null}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="container mx-auto px-4 max-w-5xl">
        <div className="bg-card rounded-3xl p-6 space-y-6 border-0 shadow-2xs">
          <div className="space-y-1 text-right">
            <h2 className="text-xl font-black text-foreground">مقارنة ميزات الباقات</h2>
            <p className="text-xs text-muted-foreground font-medium">
              نظرة مفصلة على خصائص ومميزات كل باقة لمساعدتك على اتخاذ القرار الأنسب.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-right text-xs">
              <thead>
                <tr className="bg-muted/40 text-foreground font-black border-0">
                  <th className="py-3 px-4 text-xs font-black rounded-r-xl">الميزة والخاصية</th>
                  <th className="py-3 px-3 text-center w-1/4">باقة رائد (99 ر.س)</th>
                  <th className="py-3 px-3 text-center w-1/4 bg-primary/10 text-primary font-black">باقة مؤسس</th>
                  <th className="py-3 px-3 text-center w-1/4 rounded-l-xl">باقة قائد</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {comparisonCategories.map((category) => (
                  <React.Fragment key={category.title}>
                    <tr className="bg-muted/20">
                      <td colSpan={4} className="py-2.5 px-4 font-black text-xs text-primary bg-muted/30">
                        {category.title}
                      </td>
                    </tr>
                    {category.features.map((row) => (
                      <tr key={row.name} className="hover:bg-muted/20 transition-colors border-0">
                        <td className="py-3 px-4 font-medium text-foreground text-xs">{row.name}</td>

                        <td className="py-3 px-3 text-center text-muted-foreground">
                          {typeof row.starter === 'boolean' ? (
                            row.starter ? (
                              <Check className="size-4 text-emerald-600 mx-auto" />
                            ) : (
                              <Minus className="size-4 text-muted-foreground/30 mx-auto" />
                            )
                          ) : (
                            <span className="font-bold text-foreground">{row.starter}</span>
                          )}
                        </td>

                        <td className="py-3 px-3 text-center font-black text-foreground bg-primary/5">
                          {typeof row.founder === 'boolean' ? (
                            row.founder ? (
                              <Check className="size-4 text-emerald-600 mx-auto" />
                            ) : (
                              <Minus className="size-4 text-muted-foreground/30 mx-auto" />
                            )
                          ) : (
                            <span className="text-primary font-black">{row.founder}</span>
                          )}
                        </td>

                        <td className="py-3 px-3 text-center text-foreground">
                          {typeof row.leader === 'boolean' ? (
                            row.leader ? (
                              <Check className="size-4 text-emerald-600 mx-auto" />
                            ) : (
                              <Minus className="size-4 text-muted-foreground/30 mx-auto" />
                            )
                          ) : (
                            <span className="font-bold">{row.leader}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Security note after cards */}
      <section className="container mx-auto px-4 max-w-4xl text-center">
        <div className="p-3.5 rounded-2xl bg-muted/30 text-xs text-muted-foreground flex flex-wrap items-center justify-center gap-4 border-0 shadow-2xs">
          <span className="flex items-center gap-1.5 text-foreground font-semibold">
            <ShieldCheck className="size-4 text-emerald-600" />
            <span>معاملات وحفظ آمن 100%</span>
          </span>
          <span className="text-muted-foreground/30">•</span>
          <span className="font-medium text-foreground/80">إلغاء أو تعديل مرن بنقرة واحدة</span>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 max-w-4xl space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-black text-foreground">الأسئلة الشائعة</h2>
        </div>

        <div className="grid gap-3">
          {pricingFaqs.map((faq, idx) => {
            const FaqIcon = faq.icon;
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={cn(
                  "rounded-2xl bg-card transition-all overflow-hidden border-0 shadow-2xs",
                  isOpen ? "ring-2 ring-primary/20" : "hover:bg-card"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-right gap-4 cursor-pointer border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "flex size-8 items-center justify-center rounded-xl shrink-0 transition-colors shadow-2xs",
                      isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      <FaqIcon className="size-4" />
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-foreground leading-snug">{faq.q}</h3>
                  </div>

                  <span className={cn(
                    "flex size-6 items-center justify-center rounded-full bg-muted/60 transition-transform duration-200 shrink-0",
                    isOpen && "rotate-180 bg-primary/10 text-primary"
                  )}>
                    <ChevronDown className="size-3.5" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-0 text-xs text-muted-foreground leading-relaxed font-normal border-0">
                    <p className="pt-1 pr-11">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Upgrade Payment Dialog */}
      <Dialog open={Boolean(upgradeTargetPlan)} onOpenChange={(open) => !open && closeUpgradeDialog()}>
        <DialogContent dir="rtl" className="w-[92vw] sm:max-w-[440px] p-0 overflow-hidden rounded-3xl border-0 shadow-2xl">
          <DialogHeader className="p-5 text-right bg-muted/30 border-0">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shadow-2xs">
                <Upload className="size-5" />
              </div>
              <div>
                <DialogTitle className="text-base font-black text-foreground">
                  طلب ترقية الاشتراك
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5 font-medium">
                  أرفق وصل الحوالة البنكية وسنرافقك فور المراجعة والتفعيل المباشر.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-5 space-y-4 text-right">
            <div className="rounded-2xl bg-primary/10 p-3.5 flex items-center justify-between text-xs font-bold border-0">
              <span className="text-muted-foreground">تفاصيل الترقية:</span>
              <span className="text-foreground">
                من <strong>{currentPlan.name}</strong> ➔ <strong>{upgradeTargetPlan ? getSubscriptionPlan(upgradeTargetPlan).name : ''}</strong>
              </span>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold text-foreground block">إرفاق وصل الحوالة البنكية (PDF / PNG / JPG)</label>
              <Input
                type="file"
                accept="image/png,image/jpeg,image/webp,application/pdf"
                onChange={(event) => setReceiptFile(event.target.files?.[0] ?? null)}
                className="text-xs font-medium cursor-pointer border-0 shadow-2xs py-4"
              />
              <p className="text-[10px] text-muted-foreground">أقصى حجم مسموح للملف: 5MB.</p>
            </div>

            {receiptFile && (
              <div className="flex items-center gap-2 rounded-2xl bg-emerald-500/10 p-3 text-xs text-emerald-600 font-bold border-0">
                <CheckCircle2 className="size-4 shrink-0" />
                <span className="truncate">{receiptFile.name}</span>
              </div>
            )}

            {upgradeMessage && (
              <div
                className={`flex items-start gap-2 rounded-2xl p-3.5 text-xs font-bold border-0 ${
                  upgradeMessage.type === 'success'
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                <AlertCircle className="size-4 shrink-0 mt-0.5" />
                <span>{upgradeMessage.text}</span>
              </div>
            )}
          </div>

          <DialogFooter className="p-4 bg-muted/20 flex items-center justify-end gap-2 border-0">
            <Button type="button" variant="outline" size="sm" onClick={closeUpgradeDialog} disabled={isSubmittingUpgrade} className="text-xs font-bold h-9 rounded-xl border-0">
              إلغاء
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={submitUpgradeRequest}
              disabled={isSubmittingUpgrade || !receiptFile}
              className="font-black text-xs h-9 gap-1.5 bg-primary text-primary-foreground rounded-xl border-0 shadow-2xs"
            >
              {isSubmittingUpgrade ? 'جارٍ الإرسال...' : 'إرسال طلب الترقية'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};
