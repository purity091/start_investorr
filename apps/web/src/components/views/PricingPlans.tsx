import React, { useEffect, useState } from 'react';
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
  Sparkles,
  Upload,
  AlertCircle
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import { SubscriptionPlanId, getSubscriptionPlan, isHigherSubscriptionPlan } from '@/lib/subscriptionPlans';

interface PricingPlansProps {
  setActiveTab?: (tab: string) => void;
}

const plans = [
  {
    id: 'starter',
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
    id: 'founder',
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
    id: 'leader',
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
  },
];

export const PricingPlans: React.FC<PricingPlansProps> = ({ setActiveTab }) => {
  const { user, profile } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activeProjectsCount, setActiveProjectsCount] = useState(0);
  const [upgradeTargetPlan, setUpgradeTargetPlan] = useState<SubscriptionPlanId | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmittingUpgrade, setIsSubmittingUpgrade] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const currentPlan = getSubscriptionPlan(profile?.subscription_plan);
  const currentPlanIcon = currentPlan.id === 'starter' ? User : currentPlan.id === 'founder' ? Rocket : Zap;
  const usagePercentage = currentPlan.projectLimit
    ? Math.min(Math.round((activeProjectsCount / currentPlan.projectLimit) * 100), 100)
    : 0;

  useEffect(() => {
    let cancelled = false;

    const fetchActiveProjectsCount = async () => {
      if (!user) {
        setActiveProjectsCount(0);
        return;
      }

      const { count, error } = await supabase
        .from('business_canvas')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .is('deleted_at', null);

      if (!cancelled && !error) {
        setActiveProjectsCount(count ?? 0);
      }
    };

    void fetchActiveProjectsCount();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const closeUpgradeDialog = () => {
    if (isSubmittingUpgrade) return;
    setUpgradeTargetPlan(null);
    setReceiptFile(null);
    setUpgradeMessage(null);
  };

  const submitUpgradeRequest = async () => {
    if (!upgradeTargetPlan || !receiptFile) {
      setUpgradeMessage({ type: 'error', text: 'أرفق وصل الحوالة البنكية أولاً.' });
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
              ? 'صيغة الوصل غير مدعومة. استخدم PDF أو صورة PNG/JPG/WebP.'
              : payload?.error === 'INVALID_RECEIPT_SIZE'
                ? 'حجم الوصل يجب ألا يتجاوز 5MB.'
                : 'تعذر إرسال طلب الترقية الآن. حاول مرة أخرى.';
        throw new Error(message);
      }

      setUpgradeMessage({ type: 'success', text: 'تم إرسال طلب الترقية بنجاح. سنراجع وصل الحوالة قبل تفعيل الباقة.' });
      setReceiptFile(null);
    } catch (error) {
      setUpgradeMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'تعذر إرسال طلب الترقية الآن.',
      });
    } finally {
      setIsSubmittingUpgrade(false);
    }
  };

  return (
    <div className="app-page-shell-wide space-y-5 py-4 sm:py-6" dir="rtl">
      {/* Page Header */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-right">
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              إدارة الاشتراك والفوترة
            </h1>
            <p className="text-sm text-muted-foreground">
              اختر الباقة المناسبة لاحتياجاتك وتابع حالة حسابك بسهولة.
            </p>
          </div>
          {setActiveTab && (
            <Button onClick={() => setActiveTab('customer-dashboard')} variant="outline" size="sm" className="gap-2 shrink-0">
              <LayoutDashboard className="size-4" />
              العودة إلى حسابي
            </Button>
          )}
        </div>
      </section>

      {/* Subscription Quick Metrics */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="الباقة الحالية" value={currentPlan.name} hint={currentPlan.projectLimitLabel} icon={currentPlanIcon} />
        <Metric
          label="المشاريع"
          value={currentPlan.projectLimit ? `${activeProjectsCount} / ${currentPlan.projectLimit}` : `${activeProjectsCount}`}
          hint={currentPlan.projectLimit ? `${activeProjectsCount} من أصل ${currentPlan.projectLimit}` : 'مشاريع غير محدودة'}
          icon={Wallet}
        />
        <Metric label="الاستخدام" value={currentPlan.projectLimit ? `${usagePercentage}%` : 'مفتوح'} hint="نسبة استهلاك السعة" icon={ShieldCheck} />
        <Metric label="حالة الفوترة" value="اشتراك نشط" hint="نظام الدفع قيد التفعيل" icon={CreditCard} />
      </section>

      {/* Active Plan Details & Invoices */}
      <section className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="border-border/70 shadow-xs">
          <CardHeader className="text-right pb-3">
            <CardTitle>تفاصيل الباقة الحالية</CardTitle>
            <CardDescription>
              معلومات السعة ونسبة الاستخدام بالحساب.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="rounded-xl border border-border/70 bg-muted/35 p-4 text-right">
              <div className="flex items-center justify-between">
                <Badge variant="secondary">اشتراك نشط</Badge>
                <span className="text-xs text-muted-foreground">{currentPlan.projectLimitLabel}</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-foreground">{currentPlan.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {plans.find((p) => p.id === currentPlan.id)?.description || 'الباقة الحالية المفعّلة بحسابك.'}
              </p>
            </div>

            {currentPlan.projectLimit ? (
              <div className="space-y-2 text-right">
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-bold text-foreground">{usagePercentage}%</span>
                  <span className="text-muted-foreground">معدل استهلاك سعة المشاريع</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${usagePercentage}%` }} />
                </div>
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-2.5">
              <span className="text-xs text-amber-700 font-medium">نظام الدفع الإلكتروني قيد التفعيل حالياً</span>
              <Clock className="size-4 text-amber-600 shrink-0" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-xs">
          <CardHeader className="text-right pb-3">
            <CardTitle>سجل الفواتير</CardTitle>
            <CardDescription>سيظهر سجل عمليات الفوترة هنا تلقائياً عند تفعيل نظام الدفع.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="flex flex-col items-center justify-center py-8 gap-2.5 text-center rounded-xl border border-dashed border-border bg-muted/20">
              <Clock className="size-7 text-muted-foreground" />
              <p className="text-xs font-bold text-foreground">نظام الدفع قيد التفعيل</p>
              <p className="text-[11px] text-muted-foreground max-w-xs">
                لأي استفسارات حول الفواتير والترقية، يمكن التواصل مع فريق الدعم.
              </p>
              <Button size="sm" variant="outline" className="mt-1 text-xs" onClick={() => setActiveTab?.('contact-us')}>
                تواصل معنا
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-xs sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-right">
            <h2 className="text-sm font-semibold text-foreground">الباقات المتاحة</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              اختر الباقة المناسبة للترقية حسب سعة المشاريع والمميزات المطلوبة.
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
            const isCurrentPlan = plan.id === currentPlan.id;
            const canUpgradeToPlan = isHigherSubscriptionPlan({
              currentPlanId: currentPlan.id,
              targetPlanId: plan.id,
            });

            return (
              <Card
                key={plan.name}
                className={isCurrentPlan ? 'border-primary shadow-xs' : 'border-border/70 shadow-xs'}
              >
                <CardHeader className="p-4 sm:p-5 text-right">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className="size-5 text-foreground" />
                    </span>
                    {isCurrentPlan ? <Badge>خطتك الحالية</Badge> : null}
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
                    variant={isCurrentPlan ? 'default' : canUpgradeToPlan ? 'default' : 'outline'}
                    disabled={isCurrentPlan}
                    onClick={() => {
                      if (canUpgradeToPlan) {
                        setUpgradeTargetPlan(plan.id as SubscriptionPlanId);
                        setReceiptFile(null);
                        setUpgradeMessage(null);
                        return;
                      }
                      setActiveTab?.(plan.action);
                    }}
                  >
                    {isCurrentPlan ? 'الخطة الحالية' : canUpgradeToPlan ? 'طلب ترقية بإرفاق وصل' : plan.cta}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <Dialog open={Boolean(upgradeTargetPlan)} onOpenChange={(open) => !open && closeUpgradeDialog()}>
        <DialogContent dir="rtl" className="sm:max-w-[520px]">
          <DialogHeader className="text-right">
            <DialogTitle>طلب ترقية الباقة</DialogTitle>
            <DialogDescription>
              أرفق وصل الحوالة البنكية، وسيبقى طلبك قيد المراجعة حتى يتم اعتماد الترقية من الإدارة.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-right">
            <div className="rounded-xl border border-border bg-muted/35 p-4">
              <p className="text-xs text-muted-foreground">الترقية المطلوبة</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                من {currentPlan.name} إلى {upgradeTargetPlan ? getSubscriptionPlan(upgradeTargetPlan).name : ''}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">وصل الحوالة البنكية</label>
              <Input
                type="file"
                accept="image/png,image/jpeg,image/webp,application/pdf"
                onChange={(event) => setReceiptFile(event.target.files?.[0] ?? null)}
              />
              <p className="text-xs leading-6 text-muted-foreground">
                الصيغ المدعومة: PDF أو صورة PNG/JPG/WebP، بحد أقصى 5MB.
              </p>
            </div>

            {receiptFile ? (
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
                <Upload className="size-4" />
                <span className="truncate">{receiptFile.name}</span>
              </div>
            ) : null}

            {upgradeMessage ? (
              <div
                className={`flex items-start gap-2 rounded-xl border px-3 py-2 text-sm ${
                  upgradeMessage.type === 'success'
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-destructive/30 bg-destructive/10 text-destructive'
                }`}
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <span>{upgradeMessage.text}</span>
              </div>
            ) : null}
          </div>

          <DialogFooter className="gap-2 sm:justify-start">
            <Button type="button" onClick={submitUpgradeRequest} disabled={isSubmittingUpgrade || !receiptFile}>
              {isSubmittingUpgrade ? 'جارٍ إرسال الطلب...' : 'إرسال طلب الترقية'}
            </Button>
            <Button type="button" variant="outline" onClick={closeUpgradeDialog} disabled={isSubmittingUpgrade}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
