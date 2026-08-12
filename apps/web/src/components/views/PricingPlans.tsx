import React, { useEffect, useState } from 'react';
import {
  Check,
  CheckCircle2,
  Minus,
  Rocket,
  User,
  Zap,
  Upload,
  AlertCircle,
  LayoutDashboard,
  Sparkles,
  PhoneCall,
  Receipt,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import { SubscriptionPlanId, getSubscriptionPlan, isHigherSubscriptionPlan } from '@/lib/subscriptionPlans';

interface PricingPlansProps {
  setActiveTab?: (tab: string) => void;
}

interface PlanCardData {
  id: SubscriptionPlanId;
  name: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  monthly: number;
  yearly: number;
  badge?: string | null;
  highlight?: boolean;
  cta: string;
  featuresSummary: string[];
}

const PLANS: PlanCardData[] = [
  {
    id: 'starter',
    name: 'باقة رائد',
    subtext: 'لتجربة النمذجة واختبار أول 5 مشاريع.',
    icon: User,
    monthly: 0,
    yearly: 0,
    cta: 'الخطة الحالية',
    featuresSummary: [
      'سعة 5 مشاريع ودراسات جدوى',
      'تصفح عينات +500 شركة ناجحة',
      'حاسبة الإيرادات الأساسية (MRR)',
    ],
  },
  {
    id: 'founder',
    name: 'باقة مؤسس',
    subtext: 'الخيار الأكثر شعبية لبناء 10 مشاريع ومشاركة الخطط.',
    icon: Rocket,
    monthly: 35,
    yearly: 29,
    badge: 'الأكثر شعبية',
    highlight: true,
    cta: 'ترقية الباقة',
    featuresSummary: [
      'سعة 10 مشاريع ودراسات متكاملة',
      'روابط مشاركة تفاعلية آمنة',
      'تحليل الفجوات والجاهزية الاستثمارية',
      'توليد تعليمات ChatGPT ومخرجات JSON',
    ],
  },
  {
    id: 'leader',
    name: 'باقة قائد',
    icon: Zap,
    monthly: 75,
    yearly: 59,
    badge: 'متقدم للقياديين',
    cta: 'ترقية الباقة',
    subtext: 'للمستشارين والفرق التي تحتاج سعة غير محدودة.',
    featuresSummary: [
      'سعة مشاريع غير محدودة',
      'تعدد المستخدمين ودعم فريق العمل',
      'تخصيص الهوية التجارية والشعار',
      'أولوية الاستشارات والمراجعة VIP 24/7',
    ],
  },
];

interface FeatureRow {
  name: string;
  starter: string | boolean;
  founder: string | boolean;
  leader: string | boolean;
}

const COMPARISON_FEATURES: FeatureRow[] = [
  {
    name: 'سعة المشاريع ودراسات الجدوى',
    starter: '5 مشاريع',
    founder: '10 مشاريع',
    leader: 'غير محدود',
  },
  {
    name: 'مشاركة الخطط عبر روابط تفاعلية',
    starter: false,
    founder: true,
    leader: true,
  },
  {
    name: 'تصفح قاعدة بيانات الشركات الناجحة (+500)',
    starter: 'عينات محددة',
    founder: 'وصول كامل',
    leader: 'وصول كامل',
  },
  {
    name: 'حاسبة الإيرادات والنماذج المالية',
    starter: 'أساسية (MRR/ARR)',
    founder: 'متقدمة (LTV, Churn)',
    leader: 'متقدمة + مخصصة',
  },
  {
    name: 'توليد تعليمات ChatGPT ومحلل JSON',
    starter: false,
    founder: true,
    leader: true,
  },
  {
    name: 'تصدير التقارير الرسمية وإدارة النسخ',
    starter: false,
    founder: true,
    leader: true,
  },
  {
    name: 'تخصيص الهوية التجارية والشعار على التقارير',
    starter: false,
    founder: false,
    leader: true,
  },
  {
    name: 'دعم العمل الجماعي وتعدد المستخدمين (Team)',
    starter: false,
    founder: false,
    leader: true,
  },
  {
    name: 'أولوية المراجعة والاستشارات الاستثمارية',
    starter: false,
    founder: 'دعم عادي',
    leader: 'أولوية VIP 24/7',
  },
];

export const PricingPlans: React.FC<PricingPlansProps> = ({ setActiveTab }) => {
  const { user, profile } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'plans' | 'billing' | 'account'>('plans');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activeProjectsCount, setActiveProjectsCount] = useState(0);
  const [upgradeTargetPlan, setUpgradeTargetPlan] = useState<SubscriptionPlanId | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isSubmittingUpgrade, setIsSubmittingUpgrade] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currentPlan = getSubscriptionPlan(profile?.subscription_plan);

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
    <div className="w-full space-y-6 text-right font-['IBM_Plex_Sans_Arabic'] text-foreground" dir="rtl">
      {/* Header & Sub-Nav Bar (Clean Shadcn Style) */}
      <div className="space-y-3">
        {/* Breadcrumb path */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
          <span>لوحة التحكم</span>
          <span>/</span>
          <span>الفوترة والاشتراكات</span>
          <span>/</span>
          <span className="text-foreground font-bold">باقات الأسعار</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              الاشتراك والفوترة
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              ترقية الحساب لفتح سعة مشاريع أعلى وأدوات الاستثمار والذكاء الاصطناعي.
            </p>
          </div>

          {setActiveTab && (
            <Button
              onClick={() => setActiveTab('customer-dashboard')}
              variant="outline"
              size="sm"
              className="gap-1.5 text-xs font-medium shrink-0 self-start sm:self-auto cursor-pointer"
            >
              <LayoutDashboard className="size-3.5" />
              <span>العودة لحسابي</span>
            </Button>
          )}
        </div>

        {/* Sub-Navigation & Yearly Toggle */}
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveSubTab('plans')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'plans'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              باقات الاشتراك
            </button>
            <button
              onClick={() => setActiveSubTab('billing')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'billing'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              سجل الفواتير والدفع
            </button>
            <button
              onClick={() => setActiveSubTab('account')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                activeSubTab === 'account'
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              استهلاك السعة ({activeProjectsCount} مشاريع)
            </button>
          </div>

          {/* Monthly / Yearly Switcher */}
          <div className="flex items-center gap-1.5 self-end sm:self-auto bg-muted/60 p-1 rounded-md border border-border/40">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`text-xs font-bold px-2.5 py-1 rounded transition-all cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              دفع شهري
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('yearly')}
              className={`text-xs font-bold px-2.5 py-1 rounded transition-all cursor-pointer flex items-center gap-1 ${
                billingCycle === 'yearly'
                  ? 'bg-background text-foreground shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>دفع سنوي</span>
              <span className="text-[10px] bg-emerald-500/15 text-emerald-600 px-1 py-0.2 rounded font-extrabold">
                -20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'billing' && (
        <div className="py-8 text-center space-y-2 bg-card rounded-lg border border-border/60 p-6 my-2">
          <div className="size-10 rounded-lg bg-muted text-muted-foreground flex items-center justify-center mx-auto">
            <Receipt className="size-5" />
          </div>
          <h3 className="text-sm font-bold text-foreground">سجل الفواتير والتحويلات</h3>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto">
            يتم توثيق أي عملية ترقية فور اعتماد الحوالة البنكية من قبل الإدارة.
          </p>
          <Button variant="outline" size="sm" onClick={() => setActiveTab?.('contact-us')} className="font-medium text-xs mt-2">
            تواصل مع الفوترة والدعم
          </Button>
        </div>
      )}

      {activeSubTab === 'account' && (
        <div className="bg-card rounded-lg border border-border/60 p-5 my-2 space-y-3">
          <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
            <div>
              <h3 className="text-sm font-bold text-foreground">استهلاك سعة المشاريع</h3>
              <p className="text-xs text-muted-foreground">نسبة استهلاك السعة المتاحة بحسابك</p>
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs font-bold">
              {currentPlan.name} مفعّلة
            </Badge>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-foreground">
              <span>المشاريع المنشأة: {activeProjectsCount}</span>
              <span>الحد المسموح: {currentPlan.projectLimit ? `${currentPlan.projectLimit} مشاريع` : 'غير محدود'}</span>
            </div>
            {currentPlan.projectLimit ? (
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((activeProjectsCount / currentPlan.projectLimit) * 100))}%` }}
                />
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Pricing Cards Grid (Clean Shadcn Style) */}
      {activeSubTab === 'plans' && (
        <div className="space-y-8">
          <div className="grid gap-3.5 md:grid-cols-3 items-stretch">
            {PLANS.map((plan) => {
              const Icon = plan.icon;
              const price = billingCycle === 'monthly' ? plan.monthly : plan.yearly;
              const isCurrentPlan = plan.id === currentPlan.id;
              const canUpgrade = isHigherSubscriptionPlan({
                currentPlanId: currentPlan.id,
                targetPlanId: plan.id,
              });

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between p-5 rounded-lg border transition-all ${
                    plan.highlight
                      ? 'bg-card border-primary/80 shadow-xs ring-1 ring-primary/20'
                      : 'bg-card border-border/60'
                  }`}
                >
                  {/* Top Badge */}
                  {plan.badge && (
                    <div className="absolute -top-2.5 left-4">
                      <Badge className="bg-primary text-primary-foreground font-bold text-[10px] px-2 py-0.5">
                        <Sparkles className="size-3 ml-1" />
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Header */}
                    <div className="space-y-1.5">
                      <div className="size-9 rounded-md bg-muted text-foreground flex items-center justify-center shrink-0">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <h3 className="text-base font-bold text-foreground">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{plan.subtext}</p>
                    </div>

                    {/* Price */}
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-foreground tracking-tight">
                          {price === 0 ? 'مجاناً' : `${price} ر.س`}
                        </span>
                        {price > 0 && (
                          <span className="text-xs text-muted-foreground font-bold">
                            / {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div>
                      <Button
                        type="button"
                        variant={isCurrentPlan ? 'outline' : plan.highlight ? 'default' : 'outline'}
                        disabled={isCurrentPlan}
                        onClick={() => {
                          if (canUpgrade) {
                            setUpgradeTargetPlan(plan.id);
                            setReceiptFile(null);
                            setUpgradeMessage(null);
                            return;
                          }
                          setActiveTab?.('customer-dashboard');
                        }}
                        className="w-full font-bold text-xs h-9 cursor-pointer"
                      >
                        {isCurrentPlan ? 'الخطة الحالية' : canUpgrade ? 'ترقية الباقة' : plan.cta}
                      </Button>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 pt-2 border-t border-border/40">
                      {plan.featuresSummary.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-xs font-medium text-foreground">
                          <Check className="size-3.5 text-emerald-600 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feature Comparison Table */}
          <div className="bg-card rounded-lg border border-border/60 p-4 sm:p-5 space-y-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-border/40 pb-3">
              <div>
                <h2 className="text-base font-bold text-foreground">مقارنة الميزات بين الباقات</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  تفاصيل الخصائص وتغطية الأدوات عبر كافة الباقات.
                </p>
              </div>

              <Button
                variant="outline"
                size="xs"
                onClick={() => setActiveTab?.('contact-us')}
                className="gap-1.5 font-bold text-xs shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <PhoneCall className="size-3.5" />
                <span>حجز استشارة</span>
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="py-2.5 px-3 font-bold text-foreground text-xs">الميزة والتغطية</th>
                    <th className="py-2.5 px-3 font-bold text-foreground text-center w-1/4">باقة رائد</th>
                    <th className="py-2.5 px-3 font-bold text-foreground text-center w-1/4 bg-muted/40">
                      باقة مؤسس ⭐
                    </th>
                    <th className="py-2.5 px-3 font-bold text-foreground text-center w-1/4">باقة قائد</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {COMPARISON_FEATURES.map((row) => (
                    <tr key={row.name} className="hover:bg-muted/20 transition-colors">
                      <td className="py-3 px-3 font-medium text-foreground">{row.name}</td>

                      <td className="py-3 px-3 text-center text-muted-foreground">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? (
                            <Check className="size-4 text-emerald-600 mx-auto" />
                          ) : (
                            <Minus className="size-4 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="font-medium text-foreground">{row.starter}</span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center font-bold text-foreground bg-muted/20">
                        {typeof row.founder === 'boolean' ? (
                          row.founder ? (
                            <Check className="size-4 text-emerald-600 mx-auto" />
                          ) : (
                            <Minus className="size-4 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span>{row.founder}</span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-center text-foreground">
                        {typeof row.leader === 'boolean' ? (
                          row.leader ? (
                            <Check className="size-4 text-emerald-600 mx-auto" />
                          ) : (
                            <Minus className="size-4 text-muted-foreground/40 mx-auto" />
                          )
                        ) : (
                          <span className="font-bold">{row.leader}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Upload Receipt Dialog */}
      <Dialog open={Boolean(upgradeTargetPlan)} onOpenChange={(open) => !open && closeUpgradeDialog()}>
        <DialogContent dir="rtl" className="sm:max-w-[420px] p-0 overflow-hidden">
          <DialogHeader className="border-b border-border p-4 text-right bg-muted/20">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <Upload className="size-4" />
              </div>
              <div>
                <DialogTitle className="text-sm font-bold text-foreground">
                  طلب ترقية الباقة
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  أرفق وصل الحوالة البنكية، وسيتم تفعيل الباقة فور المراجعة.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="p-4 space-y-3 text-right">
            <div className="rounded-md border border-border bg-muted/20 p-3 flex items-center justify-between text-xs font-bold">
              <span className="text-muted-foreground">الترقية المطلوبة:</span>
              <span className="text-foreground">
                من {currentPlan.name} ➔ {upgradeTargetPlan ? getSubscriptionPlan(upgradeTargetPlan).name : ''}
              </span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-foreground">وصل الحوالة البنكية (PDF / PNG / JPG)</label>
              <Input
                type="file"
                accept="image/png,image/jpeg,image/webp,application/pdf"
                onChange={(event) => setReceiptFile(event.target.files?.[0] ?? null)}
                className="text-xs font-medium cursor-pointer"
              />
              <p className="text-[10px] text-muted-foreground">أقصى حجم: 5MB.</p>
            </div>

            {receiptFile && (
              <div className="flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs text-emerald-600 font-bold">
                <CheckCircle2 className="size-3.5 shrink-0" />
                <span className="truncate">{receiptFile.name}</span>
              </div>
            )}

            {upgradeMessage && (
              <div
                className={`flex items-start gap-1.5 rounded-md border p-2.5 text-xs font-bold ${
                  upgradeMessage.type === 'success'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600'
                    : 'border-destructive/30 bg-destructive/10 text-destructive'
                }`}
              >
                <AlertCircle className="size-3.5 shrink-0 mt-0.5" />
                <span>{upgradeMessage.text}</span>
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-border p-3 bg-muted/10 flex items-center justify-end gap-2">
            <Button type="button" variant="outline" size="xs" onClick={closeUpgradeDialog} disabled={isSubmittingUpgrade} className="text-xs font-bold h-8">
              إلغاء
            </Button>
            <Button
              type="button"
              size="xs"
              onClick={submitUpgradeRequest}
              disabled={isSubmittingUpgrade || !receiptFile}
              className="font-bold text-xs h-8 gap-1"
            >
              {isSubmittingUpgrade ? 'جارٍ الإرسال...' : 'إرسال الوصل'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
