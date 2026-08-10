import React, { useState } from 'react';
import {
  Check,
  CreditCard,
  LayoutDashboard,
  Rocket,
  ShieldCheck,
  User,
  Wallet,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

interface PricingPlansProps {
  setActiveTab?: (tab: string) => void;
}

const plans = [
  {
    name: 'باقة رائد',
    icon: User,
    monthly: 0,
    yearly: 0,
    projectLimit: '5 مشاريع',
    description: 'لتجربة أولية واختبار أول 5 مشاريع ونماذج أعمال تجارية.',
    parentPlanNote: '',
    features: [
      'سعة إنشاء حتى 5 مشاريع ودراسات جدوى',
      'تصفح عينات مشاريع SaaS والشركات الناجحة',
      'بناء ونمذجة الأعمال عبر باني المنصة',
      'حاسبة الإيرادات المتكررة الأساسية (MRR / ARR)',
      'الوصول لأكاديمية خطة والمقالات التعليمية',
    ],
    action: 'customer-dashboard',
    cta: 'العودة إلى الحساب',
  },
  {
    name: 'باقة مؤسس',
    icon: Rocket,
    monthly: 35,
    yearly: 29,
    projectLimit: '10 مشاريع',
    description: 'الخيار التأسيسي الأنسب لرواد الأعمال لبناء 10 مشاريع متكاملة.',
    parentPlanNote: 'يشمل كل مميزات باقة رائد، بالإضافة إلى:',
    features: [
      'ترقية السعة لبناء حتى 10 مشاريع متكاملة',
      'مشاركة الخطط ونماذج العمل عبر روابط تفاعلية آمنة',
      'فتح كافة تفاصيل ودراسات +500 شركة ناجحة',
      'حاسبة الإيرادات المتقدمة (MRR, ARR, LTV, Churn)',
      'توليد المخرجات والتحليل الاستثماري',
      'تحليل الجاهزية الاستثمارية وتقييم المخاطر (MIT)',
    ],
    action: 'contact-us',
    cta: 'ترقية إلى باقة مؤسس',
  },
  {
    name: 'باقة قائد',
    icon: Zap,
    monthly: 75,
    yearly: 59,
    projectLimit: 'مشاريع غير محدودة',
    description: 'الخطة القيادية الشاملة لإدارة مشاريع غير محدودة بمخرجات وتخصيص كامل.',
    parentPlanNote: 'يشمل كل مميزات باقة مؤسس، بالإضافة إلى:',
    features: [
      'إنشاء مشاريع ودراسات جدوى غير محدودة',
      'مشاركة الخطط ونماذج العمل مع الفريق والمستثمرين',
      'دعم الاستشارات والمراجعة المالية والتسويقية',
      'تخصيص الهوية التجارية والشعار على التقارير',
      'دعم العمل الجماعي وتعدد المستخدمين (Team Access)',
      'أولوية الوصول للمميزات والأدوات البرمجية VIP 24/7',
    ],
    action: 'customer-dashboard',
    cta: 'الخطة الحالية',
    featured: true,
  },
];

export const PricingPlans: React.FC<PricingPlansProps> = ({ setActiveTab }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const usagePercentage = 62;

  return (
    <div className="app-page-shell-wide space-y-4 sm:space-y-6 py-4 sm:py-6" dir="rtl">
      <section className="rounded-2xl border border-border bg-card px-4 py-4 sm:py-5 shadow-xs sm:px-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
          <div className="space-y-4 text-right">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                إدارة الاشتراك والفوترة (رائد - مؤسس - قائد)
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                اختر الباقة المناسبة لاحتياجاتك. تبدأ من 5 مشاريع في باقة رائد، 10 مشاريع في باقة مؤسس، ومشاريع غير محدودة في باقة قائد.
              </p>
            </div>
          </div>

          <Card className="border-border/70 shadow-none">
            <CardHeader className="pb-3 text-right">
              <CardTitle className="text-base">الوضع الحالي</CardTitle>
              <CardDescription>ملخص سريع قبل الدخول في التفاصيل.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Fact label="الخطة الحالية" value="باقة قائد" />
              <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <span className="text-xs text-amber-700 font-medium">نظام الدفع قيد التفعيل</span>
                <Clock className="size-4 text-amber-600 shrink-0" />
              </div>
              <Button onClick={() => setActiveTab?.('customer-dashboard')} variant="outline" className="w-full">
                <LayoutDashboard className="size-4" />
                العودة إلى حسابي الشخصي
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="الباقة" value="باقة قائد" hint="نشطة حالياً (غير محدود)" icon={Zap} />
        <Metric label="الرصيد المتاح" value="85 / 100" hint="ضمن الدورة الحالية" icon={Wallet} />
        <Metric label="الاستخدام" value={`${usagePercentage}%`} hint="استهلاك الأدوات" icon={ShieldCheck} />
        <Metric label="الفوترة" value="قيد التفعيل" hint="نظام الدفع قادم" icon={CreditCard} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="border-border/70 shadow-xs">
          <CardHeader className="text-right">
            <CardTitle>الخطة الحالية والاستخدام</CardTitle>
            <CardDescription>
              ملخص واضح لحالة الباقة والرصيد.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="rounded-xl border border-border/70 bg-muted/35 p-3 sm:p-4 text-right">
              <Badge variant="secondary">اشتراك نشط</Badge>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">باقة قائد (مشاريع غير محدودة)</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                مناسبة للمستخدم القيادي الذي يدير مشاريع غير محدودة ويحتاج إلى مخرجات مخصصة بهويته التجارية مع أولوية دعم VIP.
              </p>
            </div>

            <div className="space-y-2 text-right">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-foreground">{usagePercentage}%</span>
                <span className="text-muted-foreground">نسبة الاستهلاك خلال الدورة الحالية</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${usagePercentage}%` }} />
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <span className="text-xs text-amber-700 font-medium">نظام الفوترة والدفع قيد التفعيل — سيتاح قريباً</span>
              <Clock className="size-4 text-amber-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-xs">
          <CardHeader className="text-right">
            <CardTitle>سجل الفواتير</CardTitle>
            <CardDescription>سيظهر سجل فواتيرك هنا بعد تفعيل نظام الدفع.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="flex flex-col items-center justify-center py-10 gap-3 text-center rounded-xl border border-dashed border-border bg-muted/30">
              <Clock className="size-8 text-muted-foreground" />
              <p className="text-sm font-semibold text-foreground">نظام الدفع قيد التفعيل</p>
              <p className="text-xs text-muted-foreground max-w-xs">
                سيتم تفعيل نظام الفوترة والدفع قريباً. للتواصل بخصوص التسعير أو طلب التفعيل المبكر اضغط على الزر أدناه.
              </p>
              <Button size="sm" variant="outline" onClick={() => setActiveTab?.('contact-us')}>
                تواصل معنا
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-xs sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-right">
            <h2 className="text-sm font-semibold text-foreground">مقارنة الباقات (رائد - مؤسس - قائد)</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              تتدرج المميزات بإضافة سعة المشاريع والخواص بدون تكرار.
            </p>
          </div>
          <div className="flex rounded-lg bg-muted p-1">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('monthly')}
            >
              شهرياً
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('yearly')}
            >
              سنوياً
            </Button>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = billingCycle === 'monthly' ? plan.monthly : plan.yearly;

            return (
              <Card
                key={plan.name}
                className={plan.featured ? 'border-primary shadow-xs' : 'border-border/70 shadow-xs'}
              >
                <CardHeader className="p-4 sm:p-5 text-right">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-5 text-foreground" />
                    </span>
                    {plan.featured ? <Badge>خطتك الحالية</Badge> : null}
                  </div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex h-full flex-col p-4 sm:p-5 pt-0 sm:pt-0 text-right">
                  <div className="mb-3">
                    <span className="text-3xl font-semibold text-foreground">{price}</span>
                    <span className="mr-1 text-xs text-muted-foreground">
                      ر.س / {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                    </span>
                  </div>

                  <div className="mb-4 flex items-center justify-between p-2.5 rounded-lg bg-primary/5 border border-primary/20">
                    <span className="text-xs font-bold text-foreground">سعة المشاريع:</span>
                    <Badge variant="secondary" className="text-xs font-extrabold">
                      {plan.projectLimit}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-3">
                    {plan.parentPlanNote ? (
                      <p className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/10 px-2.5 py-1 rounded-md">
                        <Sparkles className="size-3 shrink-0" />
                        <span>{plan.parentPlanNote}</span>
                      </p>
                    ) : (
                      <p className="text-xs font-semibold text-muted-foreground">المميزات الرئيسية:</p>
                    )}

                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-xs text-foreground">
                        <Check className="size-4 text-emerald-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="mt-6 w-full text-xs font-bold"
                    variant={plan.featured ? 'default' : 'outline'}
                    onClick={() => setActiveTab?.(plan.action)}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
};

function Metric({
  label,
  value,
  hint,
  icon: Icon,
}: {
  label: string;
  value: string;
  hint: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="border-border/70 shadow-xs">
      <CardContent className="p-3 sm:p-4 text-right">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-muted">
            <Icon className="size-4 text-muted-foreground" />
          </span>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
        </div>
        <p className="text-xl font-semibold text-foreground">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      </CardContent>
    </Card>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-muted/35 px-4 py-3">
      <span className="text-sm font-medium text-foreground">{value}</span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
