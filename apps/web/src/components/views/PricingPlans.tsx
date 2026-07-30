import React, { useState } from 'react';
import {
  Check,
  CreditCard,
  Download,
  LayoutDashboard,
  Rocket,
  ShieldCheck,
  User,
  Wallet,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PricingPlansProps {
  setActiveTab?: (tab: string) => void;
}

const invoices = [
  { id: 'INV-2026-071', date: '21 يوليو 2026', amount: '149 ر.س', status: 'مدفوعة' },
  { id: 'INV-2026-061', date: '21 يونيو 2026', amount: '149 ر.س', status: 'مدفوعة' },
  { id: 'INV-2026-051', date: '21 مايو 2026', amount: '149 ر.س', status: 'مدفوعة' },
];

const plans = [
  {
    name: 'المجاني',
    icon: User,
    monthly: 0,
    yearly: 0,
    description: 'لتجربة أولية واختبار الأدوات الأساسية.',
    features: ['مشروع واحد', '3 صادرات شهرية', 'وصول أساسي'],
    action: 'customer-dashboard',
    cta: 'العودة إلى الحساب',
  },
  {
    name: 'المبتدئ',
    icon: Rocket,
    monthly: 49,
    yearly: 39,
    description: 'للمؤسس الفردي الذي بدأ أول مشروع بجدية.',
    features: ['5 مشاريع', '20 تصديراً شهرياً', 'دعم سريع'],
    action: 'contact-us',
    cta: 'طلب ترقية',
  },
  {
    name: 'الاحترافي',
    icon: Zap,
    monthly: 149,
    yearly: 119,
    description: 'الخطة الحالية المناسبة لإدارة مشاريع متعددة ومخرجات احترافية.',
    features: ['مشاريع غير محدودة', 'تصدير غير محدود', 'هوية بصرية', 'أولوية في الدعم'],
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
      <section className="rounded-2xl border border-border bg-card px-4 py-4 sm:py-5 shadow-sm sm:px-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
          <div className="space-y-4 text-right">
            <div className="flex flex-wrap items-center justify-start gap-2">
              <Badge variant="secondary">اشتراكي</Badge>
              <Badge variant="outline">الخطة والفواتير والاستخدام</Badge>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                إدارة الاشتراك والفوترة من صفحة واحدة
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                هذه الصفحة تحتوي كل ما يخص المستخدم مالياً وتشغيلياً: الخطة الحالية، الرصيد،
                سجل الفواتير، ومقارنة الباقات في مكان واحد بدون التشتت بين صفحات فرعية.
              </p>
            </div>
          </div>

          <Card className="border-border/70 shadow-none">
            <CardHeader className="pb-3 text-right">
              <CardTitle className="text-base">الوضع الحالي</CardTitle>
              <CardDescription>ملخص سريع قبل الدخول في التفاصيل.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Fact label="الخطة الحالية" value="الاحترافي" />
              <Fact label="التجديد القادم" value="26 أغسطس 2026" />
              <Fact label="طريقة الدفع" value="Visa •••• 8821" />
              <Button onClick={() => setActiveTab?.('customer-dashboard')} variant="outline" className="w-full">
                <LayoutDashboard className="size-4" />
                العودة إلى حسابي الشخصي
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="الباقة" value="الاحترافي" hint="نشطة حالياً" icon={Zap} />
        <Metric label="الرصيد المتاح" value="85 / 100" hint="ضمن الدورة الحالية" icon={Wallet} />
        <Metric label="الاستخدام" value={`${usagePercentage}%`} hint="استهلاك الأدوات" icon={ShieldCheck} />
        <Metric label="الفوترة" value="منتظمة" hint="لا توجد مدفوعات متأخرة" icon={CreditCard} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="text-right">
            <CardTitle>الخطة الحالية والاستخدام</CardTitle>
            <CardDescription>
              ملخص واضح لحالة الباقة، الرصيد، وتجهيزات الدفع والتجديد.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 p-4 sm:p-6 pt-0 sm:pt-0">
            <div className="rounded-xl border border-border/70 bg-muted/35 p-3 sm:p-4 text-right">
              <Badge variant="secondary">اشتراك نشط</Badge>
              <h2 className="mt-3 text-2xl font-semibold text-foreground">باقة الاحترافي</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                مناسبة للمستخدم الذي يدير أكثر من مشروع ويحتاج إلى مخرجات قابلة للتصدير،
                أدوات تحليل، ومتابعة حساب واضحة.
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

            <div className="grid gap-2">
              <Fact label="التجديد القادم" value="26 أغسطس 2026" />
              <Fact label="طريقة الدفع" value="Visa •••• 8821" />
              <Fact label="الأولوية" value="دعم احترافي قياسي" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader className="text-right">
            <CardTitle>سجل الفواتير</CardTitle>
            <CardDescription>آخر العمليات المالية الخاصة باشتراك المستخدم.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 overflow-x-auto">
            <div className="min-w-0">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">رقم الفاتورة</TableHead>
                    <TableHead className="text-right">التاريخ</TableHead>
                    <TableHead className="text-right">المبلغ</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">الإجراء</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell className="font-semibold">{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge variant="success">{invoice.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon-sm" aria-label="تحميل الفاتورة">
                          <Download className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-right">
            <h2 className="text-sm font-semibold text-foreground">مقارنة الباقات</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              اعرض التسعير شهرياً أو سنوياً ثم اختر الإجراء المناسب.
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
                className={plan.featured ? 'border-primary shadow-sm' : 'border-border/70 shadow-sm'}
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
                  <div className="mb-5">
                    <span className="text-3xl font-semibold text-foreground">{price}</span>
                    <span className="mr-1 text-xs text-muted-foreground">
                      ر.س / {billingCycle === 'monthly' ? 'شهرياً' : 'سنوياً'}
                    </span>
                  </div>
                  <div className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="size-4 text-emerald-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    className="mt-6 w-full"
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
    <Card className="border-border/70 shadow-sm">
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
