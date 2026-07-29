import React from 'react';
import {
  Activity,
  BellRing,
  Briefcase,
  CheckCircle2,
  CreditCard,
  Crown,
  FileText,
  Headphones,
  Layers3,
  Settings,
  ShieldCheck,
  UserCircle2,
  Wallet,
} from 'lucide-react';

import { User } from '../../types';
import { useProjectWorkspace } from '../../features/workspace/ProjectWorkspaceContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export type CustomerPortalSection =
  | 'dashboard'
  | 'projects'
  | 'subscription'
  | 'usage'
  | 'activity'
  | 'account'
  | 'support';

interface CustomerPortalProps {
  user: User;
  setActiveTab: (tab: string) => void;
  section: CustomerPortalSection;
}

type PortalState = 'live' | 'loading' | 'empty' | 'success' | 'error';

const SECTION_META: Record<CustomerPortalSection, { label: string; desc: string; icon: React.ElementType; tab: string }> = {
  dashboard: {
    label: 'لوحة العميل',
    desc: 'ملخص الحساب، الاشتراك، المشاريع، والنشاط من مكان واحد.',
    icon: Crown,
    tab: 'customer-dashboard',
  },
  projects: {
    label: 'مشاريع العميل',
    desc: 'كل المشاريع الجارية والجاهزة مع نقاط دخول سريعة.',
    icon: Briefcase,
    tab: 'customer-projects',
  },
  subscription: {
    label: 'الاشتراك والفوترة',
    desc: 'الخطة الحالية، التجديد، وسائل الدفع، والفواتير.',
    icon: CreditCard,
    tab: 'customer-subscription',
  },
  usage: {
    label: 'الاستخدام والصلاحيات',
    desc: 'حدود الخطة، الاستهلاك، والمزايا المتاحة للمشترك.',
    icon: Wallet,
    tab: 'customer-usage',
  },
  activity: {
    label: 'النشاط والتنبيهات',
    desc: 'آخر ما حدث في الحساب والمشاريع والمدفوعات.',
    icon: BellRing,
    tab: 'customer-activity',
  },
  account: {
    label: 'الحساب والهوية',
    desc: 'الملف الشخصي، الأمان، وتفضيلات تشغيل المنصة.',
    icon: UserCircle2,
    tab: 'customer-account',
  },
  support: {
    label: 'الدعم والطلبات',
    desc: 'التواصل، المساعدة، ومتابعة طلبات الحساب.',
    icon: Headphones,
    tab: 'customer-support',
  },
};

const PROJECT_ROWS = [
  { name: 'أكاديمية الذكاء الاصطناعي', status: 'جاهز للمراجعة', progress: '92%', targetTab: 'workspace' },
  { name: 'منصة الحصاد الذكي', status: 'قيد التطوير', progress: '68%', targetTab: 'new-plan-bmc' },
  { name: 'بوابة الدفع الإقليمية', status: 'مسودة', progress: '34%', targetTab: 'new-plan-pro' },
];

const ACTIVITY_FEED = [
  { title: 'تم تحديث مساحة المشروع الرئيسية', meta: 'منذ 15 دقيقة', type: 'project' },
  { title: 'تم إنشاء فاتورة التجديد القادمة', meta: '21 يوليو 2026', type: 'billing' },
  { title: 'تم حفظ فرصة جديدة من صفحة السوق', meta: 'منذ ساعة', type: 'market' },
  { title: 'تمت مزامنة تغييرات إعدادات الحساب', meta: '20 يوليو 2026', type: 'account' },
];

const INVOICES = [
  { id: 'INV-2026-071', date: '21 يوليو 2026', amount: '149 ر.س', status: 'مدفوعة' },
  { id: 'INV-2026-061', date: '21 يونيو 2026', amount: '149 ر.س', status: 'مدفوعة' },
  { id: 'INV-2026-051', date: '21 مايو 2026', amount: '149 ر.س', status: 'مدفوعة' },
];

const STATE_OPTIONS: Array<{ id: PortalState; label: string }> = [
  { id: 'live', label: 'الحالة الحية' },
  { id: 'loading', label: 'تحميل' },
  { id: 'empty', label: 'فارغة' },
  { id: 'success', label: 'نجاح' },
  { id: 'error', label: 'خطأ' },
];

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ user, setActiveTab, section }) => {
  const { workspace } = useProjectWorkspace();
  const [portalState, setPortalState] = React.useState<PortalState>('live');

  const meta = SECTION_META[section];
  const completedSections = workspace.planSections.filter((item) => item.isCompleted).length;
  const totalSections = Math.max(workspace.planSections.length, 1);
  const usedCredits = user.totalCredits - user.credits;
  const readinessScore = workspace.metrics.readinessScore;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 pb-24" dir="rtl">
      <section className="rounded-xl bg-card p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">مساحة العميل</Badge>
              <Badge variant="outline">واجهة اشتراك</Badge>
            </div>
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                {meta.label}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                {meta.desc}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setActiveTab('workspace')} size="sm">
              <Crown className="size-4" />
              مساحة المشروع
            </Button>
            <Button onClick={() => setActiveTab('settings')} variant="outline" size="sm">
              <Settings className="size-4" />
              إعدادات الحساب
            </Button>
          </div>
        </div>
      </section>

      <section className="overflow-x-auto rounded-xl bg-card p-2 shadow-sm">
        <div className="flex min-w-max gap-1">
          {Object.values(SECTION_META).map((item) => {
            const Icon = item.icon;
            const isActive = item.tab === SECTION_META[section].tab;

            return (
              <Button
                key={item.tab}
                variant={isActive ? 'default' : 'ghost'}
                size="sm"
                className="justify-start"
                onClick={() => setActiveTab(item.tab)}
              >
                <Icon className="size-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="الخطة" value="الاحترافي" hint="نشطة حتى 21 أغسطس 2026" />
        <Metric label="الرصيد" value={`${user.credits}/${user.totalCredits}`} hint="اعتمادات متاحة" />
        <Metric label="جاهزية المشروع" value={`${readinessScore}%`} hint="مرتبطة بالمساحة الحالية" />
        <Metric label="أقسام الخطة" value={`${completedSections}/${totalSections}`} hint="مكتملة حتى الآن" />
      </section>

      <section className="rounded-xl bg-card p-3 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-foreground">حالات واجهة بوابة العميل</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              هذه الحالات تساعد المبرمج على بناء loading وempty وsuccess وerror لاحقاً.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {STATE_OPTIONS.map((item) => (
              <Button
                key={item.id}
                variant={portalState === item.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPortalState(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {portalState !== 'live' ? (
        <StatePreview state={portalState} onReset={() => setPortalState('live')} />
      ) : (
        <SectionContent
          section={section}
          user={user}
          setActiveTab={setActiveTab}
          usedCredits={usedCredits}
          totalSections={totalSections}
          completedSections={completedSections}
        />
      )}
    </div>
  );
};

function SectionContent({
  section,
  user,
  setActiveTab,
  usedCredits,
  totalSections,
  completedSections,
}: {
  section: CustomerPortalSection;
  user: User;
  setActiveTab: (tab: string) => void;
  usedCredits: number;
  totalSections: number;
  completedSections: number;
}) {
  if (section === 'dashboard') {
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="مركز التحكم السريع" subtitle="أهم نقاط الوصول للمستخدم المشترك">
          <div className="grid gap-3 sm:grid-cols-2">
            <ActionTile title="إدارة المشاريع" desc="مراجعة المشاريع والعودة إلى آخر نقطة عمل." cta="فتح المشاريع" onClick={() => setActiveTab('customer-projects')} />
            <ActionTile title="الفوترة والاشتراك" desc="الخطة الحالية، التجديد القادم، والفواتير." cta="الفوترة" onClick={() => setActiveTab('customer-subscription')} />
            <ActionTile title="الاستخدام والصلاحيات" desc="رصيد الأدوات وحدود الباقة." cta="الاستخدام" onClick={() => setActiveTab('customer-usage')} />
            <ActionTile title="الدعم والطلبات" desc="طلب مساعدة أو الانتقال إلى صفحة التواصل." cta="الدعم" onClick={() => setActiveTab('customer-support')} />
          </div>
        </Panel>
        <Panel title="أفضل خطوة تالية" subtitle="اقتراحات واجهية لمسار العميل">
          <div className="space-y-2">
            <StepRow title="راجع المشروع الرئيسي" desc="افتح مساحة المشروع لمراجعة الجاهزية والتقدم." button="المساحة" onClick={() => setActiveTab('workspace')} />
            <StepRow title="أكمل بناء النموذج" desc={`أقسام مكتملة: ${completedSections}/${totalSections}.`} button="BMC" onClick={() => setActiveTab('new-plan-bmc')} />
            <StepRow title="حدّث إعدادات الحساب" desc="اضبط تفضيلات التقارير واللغة والإشعارات." button="الإعدادات" onClick={() => setActiveTab('settings')} />
          </div>
        </Panel>
      </div>
    );
  }

  if (section === 'projects') {
    return (
      <Panel title="مشاريع الحساب" subtitle="جدول مختصر قابل للربط لاحقاً ببيانات المستخدم">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>المشروع</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead>التقدم</TableHead>
              <TableHead>الإجراء</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PROJECT_ROWS.map((project) => (
              <TableRow key={project.name}>
                <TableCell className="font-medium text-foreground">{project.name}</TableCell>
                <TableCell><Badge variant="outline">{project.status}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{project.progress}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab(project.targetTab)}>فتح</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Panel>
    );
  }

  if (section === 'subscription') {
    return (
      <div className="grid gap-4 xl:grid-cols-[1fr_1.2fr]">
        <Panel title="حالة الاشتراك" subtitle="ملخص واضح للخطة الحالية">
          <div className="space-y-3">
            <Badge variant="secondary">اشتراك نشط</Badge>
            <h2 className="text-2xl font-semibold text-foreground">باقة المحترفين</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              التجديد القادم في 21 أغسطس 2026، ووسيلة الدفع الأساسية تنتهي بـ 4242.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setActiveTab('pricing')} size="sm">مقارنة الخطط</Button>
              <Button onClick={() => setActiveTab('settings')} variant="outline" size="sm">إعدادات الدفع</Button>
            </div>
          </div>
        </Panel>
        <Panel title="سجل الفواتير" subtitle="آخر العمليات المالية">
          <InvoiceTable />
        </Panel>
      </div>
    );
  }

  if (section === 'usage') {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <Panel title="اعتمادات الأدوات" subtitle="المتاح والمستهلك من خطتك">
          <ProgressBar value={Math.round((usedCredits / Math.max(user.totalCredits, 1)) * 100)} />
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            استهلكت {usedCredits} اعتماداً وبقي لديك {user.credits} اعتماداً في الدورة الحالية.
          </p>
        </Panel>
        <Panel title="المزايا المتاحة" subtitle="ما يتيحه الاشتراك الحالي">
          <FeatureList items={['مشاريع متعددة', 'تصدير تقارير PDF', 'هوية بصرية', 'رادار السوق', 'تنبيهات الحساب']} />
        </Panel>
        <Panel title="الصلاحيات" subtitle="ما يتحكم به الحساب داخل الموقع">
          <FeatureList items={['المشاريع', 'الفواتير', 'الإشعارات', 'إعدادات التقارير', 'الدعم']} />
        </Panel>
      </div>
    );
  }

  if (section === 'activity') {
    return (
      <Panel title="آخر النشاطات" subtitle="كل ما جرى في حسابك عبر الموقع">
        <div className="space-y-2">
          {ACTIVITY_FEED.map((item) => (
            <div key={item.title} className="flex items-center justify-between gap-4 rounded-lg bg-muted/45 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.meta}</p>
              </div>
              <Badge variant="outline">{item.type}</Badge>
            </div>
          ))}
        </div>
      </Panel>
    );
  }

  if (section === 'account') {
    return (
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel title="بيانات الحساب" subtitle="هوية العميل وتفاصيل الوصول">
          <div className="space-y-2">
            <Fact label="الاسم" value={user.name} />
            <Fact label="البريد" value={user.email} />
            <Fact label="الرصيد الحالي" value={`${user.credits}/${user.totalCredits}`} />
            <Fact label="حالة التحقق" value="موثق" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={() => setActiveTab('profile')} size="sm">الملف الشخصي</Button>
            <Button onClick={() => setActiveTab('settings')} variant="outline" size="sm">إعدادات الحساب</Button>
          </div>
        </Panel>
        <Panel title="تحكم الحساب بالموقع" subtitle="نقاط الإدارة التي يملكها المستخدم المشترك">
          <FeatureList items={['الوصول إلى المشاريع', 'إدارة بيانات الحساب', 'التحكم في الخطة والفواتير', 'إدارة التنبيهات', 'الدخول إلى أدوات التحليل']} />
        </Panel>
      </div>
    );
  }

  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Panel title="الدعم والطلبات" subtitle="كل ما يخص مساعدة العميل المشترك">
        <div className="grid gap-3 sm:grid-cols-2">
          <ActionTile title="التواصل مع مستشار" desc="للاستفسار عن الترقية أو استخدام المنصة." cta="تواصل" onClick={() => setActiveTab('contact-us')} />
          <ActionTile title="الأسئلة المتكررة" desc="إجابات عامة حول الحساب والاشتراك." cta="فتح" onClick={() => setActiveTab('site-map')} />
          <ActionTile title="إعدادات الحساب" desc="تعديل بيانات الوصول والتفضيلات." cta="الإعدادات" onClick={() => setActiveTab('settings')} />
          <ActionTile title="التسعير والترقية" desc="معرفة الفروقات بين الباقات." cta="الخطط" onClick={() => setActiveTab('pricing')} />
        </div>
      </Panel>
      <Panel title="حالة الدعم" subtitle="ملخص تشغيلي للحساب">
        <div className="space-y-2">
          <Fact label="آخر تجديد" value="21 يوليو 2026" />
          <Fact label="التجديد القادم" value="21 أغسطس 2026" />
          <Fact label="أولوية الدعم" value="احترافية" />
        </div>
      </Panel>
    </div>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Card className="border-transparent shadow-sm">
      <CardContent className="p-4">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="text-xl font-semibold text-foreground">{value}</p>
          <span className="text-xs text-muted-foreground">{hint}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function Panel({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <Card className="border-transparent shadow-sm">
      <CardHeader className="p-5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-0">{children}</CardContent>
    </Card>
  );
}

function ActionTile({ title, desc, cta, onClick }: { title: string; desc: string; cta: string; onClick: () => void }) {
  return (
    <div className="rounded-lg bg-muted/45 p-4">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-muted-foreground">{desc}</p>
      <Button onClick={onClick} variant="outline" size="sm" className="mt-4">{cta}</Button>
    </div>
  );
}

function StepRow({ title, desc, button, onClick }: { title: string; desc: string; button: string; onClick: () => void }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-muted/45 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-6 text-muted-foreground">{desc}</p>
      </div>
      <Button onClick={onClick} size="sm">{button}</Button>
    </div>
  );
}

function InvoiceTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>رقم الفاتورة</TableHead>
          <TableHead>التاريخ</TableHead>
          <TableHead>المبلغ</TableHead>
          <TableHead>الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {INVOICES.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium text-foreground">{invoice.id}</TableCell>
            <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
            <TableCell className="font-semibold text-foreground">{invoice.amount}</TableCell>
            <TableCell><Badge variant="success">{invoice.status}</Badge></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">{value}%</span>
        <span className="text-muted-foreground">نسبة الاستهلاك</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, value)}%` }} />
      </div>
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-2 rounded-lg bg-muted/45 px-4 py-3 text-sm font-medium text-foreground">
          <CheckCircle2 className="size-4 text-emerald-600" />
          {item}
        </div>
      ))}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg bg-muted/45 px-4 py-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function StatePreview({ state, onReset }: { state: PortalState; onReset: () => void }) {
  const content = {
    loading: {
      title: 'جار تحميل بيانات بوابة العميل',
      desc: 'تظهر هذه الحالة قبل وصول بيانات الحساب أو الفواتير أو المشاريع.',
      icon: Layers3,
    },
    empty: {
      title: 'لا توجد بيانات مرتبطة بالحساب حالياً',
      desc: 'تستخدم عند عدم وجود مشاريع أو فواتير أو نشاط سابق.',
      icon: FileText,
    },
    success: {
      title: 'تم تحديث بوابة العميل بنجاح',
      desc: 'حالة نجاح بعد حفظ إعدادات أو تحديث اشتراك أو مزامنة مشروع.',
      icon: CheckCircle2,
    },
    error: {
      title: 'تعذر تحميل بيانات الحساب',
      desc: 'حالة خطأ واضحة مع إجراء عودة للحالة الحية.',
      icon: ShieldCheck,
    },
    live: {
      title: '',
      desc: '',
      icon: Activity,
    },
  }[state];

  const Icon = content.icon;

  return (
    <Card className="border-transparent shadow-sm">
      <CardContent className="flex min-h-64 flex-col items-center justify-center p-6 text-center">
        <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-muted">
          <Icon className="size-5 text-muted-foreground" />
        </span>
        <h2 className="text-lg font-semibold text-foreground">{content.title}</h2>
        <p className="mt-2 max-w-lg text-sm leading-7 text-muted-foreground">{content.desc}</p>
        <Button onClick={onReset} className="mt-5" variant="outline">العودة للحالة الحية</Button>
      </CardContent>
    </Card>
  );
}
