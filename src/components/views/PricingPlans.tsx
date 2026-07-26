import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, User, Rocket, Zap, Building2, Crown, LayoutDashboard } from 'lucide-react';

interface PricingPlansProps {
  setActiveTab?: (tab: string) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ setActiveTab }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'مجاني',
      icon: User,
      price: 0,
      description: 'للمستخدمين الذين يريدون تجربة أولية قبل تفعيل الاشتراك.',
      features: ['خطة عمل واحدة نشطة', '3 صادرات شهرية', 'دعم عبر البريد', 'الوصول للمحرر الأساسي'],
      buttonText: 'ابدأ مجاناً',
      variant: 'default',
      action: 'new-plan',
    },
    {
      name: 'المبتدئ',
      icon: Rocket,
      price: billingCycle === 'monthly' ? 49 : 39,
      description: 'للمؤسس الفردي الذي يريد نقل فكرته إلى أول خطة تنفيذية.',
      features: ['5 خطط عمل متقدمة', '20 تصديراً شهرياً', 'اقتراحات AI', 'دعم سريع'],
      buttonText: 'اشترك الآن',
      variant: 'primary',
      action: 'customer-dashboard',
    },
    {
      name: 'الاحترافي',
      icon: Zap,
      price: billingCycle === 'monthly' ? 149 : 119,
      description: 'للشركة الناشئة التي تريد لوحة تشغيل ومتابعة اشتراك متكاملة.',
      features: ['خطط غير محدودة', 'تصديرات غير محدودة', 'تحليلات متقدمة', 'أولوية في الدعم', 'تقارير مفصلة'],
      buttonText: 'ابدأ النسخة الاحترافية',
      variant: 'featured',
      badge: 'الأكثر طلباً',
      action: 'customer-dashboard',
    },
    {
      name: 'المؤسسات',
      icon: Building2,
      price: 499,
      description: 'للفرق الكبيرة التي تحتاج إدارة فواتير، توسعة مقاعد، ودعم مباشر.',
      features: ['كل مزايا الاحترافي', 'تخصيص كامل', 'تكاملات API', 'مدير حساب', 'تدريب للفريق'],
      buttonText: 'تواصل معنا',
      variant: 'dark',
      action: 'contact-us',
    },
  ] as const;

  const handlePlanAction = (action: string) => {
    if (setActiveTab) {
      setActiveTab(action);
    }
  };

  return (
    <div className="app-page-shell-wide py-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="surface-card mb-6 overflow-hidden rounded-[1.75rem] bg-white px-6 py-7 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl text-right">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-black text-slate-700">
              <Crown size={14} className="text-slate-900" />
              تجربة المشترك المدفوع
            </div>
            <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-[3rem]">اختر الخطة ثم أدِر اشتراكك من لوحة واحدة</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              تم ربط التسعير الآن مباشرة ببوابة العميل حتى ينتقل المشترك من شراء الباقة إلى إدارة الحساب والمشاريع والفوترة والاستخدام بدون صفحات مبعثرة.
            </p>
          </div>
          <button
            onClick={() => handlePlanAction('customer-dashboard')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
          >
            افتح بوابة العميل
            <LayoutDashboard size={16} />
          </button>
        </div>
      </div>

      <div className="surface-card mb-8 px-4 py-8 text-center sm:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-4 tracking-tight uppercase">خطط الأسعار</h2>
        <p className="text-gray-400 font-bold text-sm sm:text-lg mb-10 max-w-2xl mx-auto opacity-80">
          اختر الخطة التي تناسب مرحلة مشروعك وحجم التشغيل الذي تحتاجه داخل المنصة.
        </p>

        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-bold transition-colors ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-400'}`}>شهرياً</span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-16 h-8 bg-gray-100 rounded-full p-1 relative transition-all border border-gray-200"
          >
            <div className={`w-6 h-6 bg-primary-600 rounded-full shadow-lg transition-transform duration-300 ${billingCycle === 'yearly' ? '-translate-x-8' : 'translate-x-0'}`} />
          </button>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold transition-colors ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-400'}`}>سنوياً</span>
            <span className="bg-success/10 text-success text-[10px] font-bold px-2 py-0.5 rounded-lg border border-success/20">وفر 20%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-4 xl:grid-cols-4 items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`surface-card relative flex flex-col p-7 transition-all duration-300 hover:-translate-y-1 group ${
              plan.variant === 'featured'
                ? 'border-primary-200 bg-slate-950 text-white shadow-lg'
                : plan.variant === 'dark'
                  ? 'bg-slate-900 text-white shadow-lg'
                  : 'bg-white text-gray-800 hover:border-slate-300'
            }`}
          >
            {'badge' in plan && plan.badge && (
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 px-6 py-1.5 bg-amber-400 text-gray-900 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                {plan.badge}
              </div>
            )}

            <div className="mb-8">
              <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${plan.variant === 'featured' ? 'bg-white/10' : 'bg-slate-100'}`}>
                <plan.icon size={28} className={plan.variant === 'featured' || plan.variant === 'dark' ? 'text-white' : 'text-primary-600'} />
              </div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-xs font-bold leading-relaxed opacity-70">{plan.description}</p>
            </div>

            <div className="mb-10 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              <span className="text-xs font-bold opacity-60">ر.س / {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}</span>
            </div>

            <div className="flex-1 space-y-4 mb-10">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className={`p-0.5 rounded-full ${plan.variant === 'featured' || plan.variant === 'dark' ? 'bg-white/20' : 'bg-success/10 text-success'}`}>
                    <Check size={14} strokeWidth={4} />
                  </div>
                  <span className="text-[13px] font-bold opacity-90">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => handlePlanAction(plan.action)}
              className={`group/btn mt-auto flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[13px] font-bold transition-all ${
                plan.variant === 'featured'
                  ? 'bg-white text-slate-950 hover:bg-slate-100'
                  : plan.variant === 'dark'
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'border border-slate-200 bg-slate-50 text-gray-900 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span>{plan.buttonText}</span>
              <ArrowRight size={16} className="transition-transform group-hover/btn:-translate-x-1" />
            </button>
          </div>
        ))}
      </div>

      <div className="surface-card mt-8 overflow-hidden rounded-[1.75rem] p-6 text-center sm:p-10">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-50 rounded-full opacity-30 blur-3xl" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center text-success shadow-inner">
              <ShieldCheck size={36} strokeWidth={2.5} />
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-gray-900">إدارة اشتراك أوضح بعد الشراء</h4>
          </div>
          <p className="text-gray-500 font-bold text-sm sm:text-base max-w-2xl mb-10 leading-relaxed">
            بعد تفعيل أي باقة مدفوعة يستطيع المستخدم الوصول إلى بوابة العميل لمتابعة الفوترة والرصيد والمشاريع وربطها مع مساحة المشروع من نفس المكان.
          </p>
        </div>
      </div>
    </div>
  );
};
