import React from 'react';
import {
  Activity,
  ArrowLeft,
  Briefcase,
  CreditCard,
  LifeBuoy,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  User,
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

interface ProfileProps {
  user: {
    name: string;
    email: string;
    avatar: string;
    credits: number;
    totalCredits: number;
  };
  setActiveTab?: (tab: string) => void;
}

const accountStats = [
  { label: 'المشاريع النشطة', value: '14', hint: '4 تحتاج مراجعة' },
  { label: 'التقارير المصدرة', value: '8', hint: 'خلال آخر 30 يوماً' },
  { label: 'جاهزية الحساب', value: '92%', hint: 'الهوية مكتملة تقريباً' },
  { label: 'حالة الاشتراك', value: 'نشط', hint: 'التجديد في 26 أغسطس 2026' },
];

const recentProjects = [
  { name: 'منصة إدارة العيادات', type: 'دراسة جدوى', status: 'جاهز للمراجعة', updated: 'اليوم' },
  { name: 'هوية متجر عطور', type: 'هوية بصرية', status: 'مسودة', updated: 'أمس' },
  { name: 'حل لوجستي للمتاجر', type: 'BMC', status: 'قيد البناء', updated: 'قبل 3 أيام' },
];

const activityFeed = [
  { title: 'تم تحديث دراسة جدوى المشروع الرئيسي', time: 'قبل 35 دقيقة', icon: Briefcase },
  { title: 'تم حفظ فرصة جديدة من صفحة المشكلات والفرص', time: 'اليوم 11:20', icon: Sparkles },
  { title: 'تم تعديل إعدادات الحساب الأساسية', time: 'أمس 18:05', icon: User },
  { title: 'تم تسجيل دخول من جهاز موثوق', time: 'قبل يومين', icon: ShieldCheck },
];

const accountFacts = [
  { label: 'اسم الحساب', value: 'حساب أعمال فردي' },
  { label: 'الباقة الحالية', value: 'الاحترافي' },
  { label: 'الرصيد المتاح', value: '85 من 100' },
  { label: 'أولوية الدعم', value: 'قياسية' },
];

export const Profile: React.FC<ProfileProps> = ({ user, setActiveTab }) => {
  const usagePercentage = Math.min((user.credits / Math.max(user.totalCredits, 1)) * 100, 100);

  return (
    <div className="app-page-shell-wide space-y-6 py-6" dir="rtl">
      <section className="rounded-2xl border border-border bg-card px-4 py-5 shadow-sm sm:px-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
          <div className="space-y-4 text-right">
            <div className="flex flex-wrap items-center justify-start gap-2">
              <Badge variant="secondary">حسابي الشخصي</Badge>
              <Badge variant="outline">مركز المستخدم</Badge>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="size-20 rounded-2xl object-cover ring-1 ring-border"
              />
              <div className="min-w-0 space-y-2">
                <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {user.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="size-4" />
                    {user.email}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    السوق الأساسي: الخليج
                  </span>
                </div>
                <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                  هذه الصفحة تجمع كل ما يحتاجه المستخدم بشكل يومي: ملخص الحساب، آخر المشاريع،
                  النشاط الأخير، والوصول السريع إلى ملف التعريف والاشتراك.
                </p>
              </div>
            </div>
          </div>

          <Card className="border-border/70 shadow-none">
            <CardHeader className="pb-3 text-right">
              <CardTitle className="text-base">ملخص سريع</CardTitle>
              <CardDescription>نظرة مختصرة على حالة الحساب والرصيد.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-right">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">رصيد الأدوات</span>
                  <span className="font-semibold text-foreground">
                    {user.credits}/{user.totalCredits}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${usagePercentage}%` }}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Button onClick={() => setActiveTab?.('profile')} className="w-full">
                  <User className="size-4" />
                  فتح ملف التعريف
                </Button>
                <Button onClick={() => setActiveTab?.('pricing')} variant="outline" className="w-full">
                  <CreditCard className="size-4" />
                  إدارة الاشتراك
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {accountStats.map((item) => (
          <Card key={item.label} className="border-border/70 shadow-sm">
            <CardContent className="p-4 text-right">
              <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="text-xl font-semibold text-foreground">{item.value}</p>
                <span className="text-xs text-muted-foreground">{item.hint}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="text-right">
            <CardTitle>آخر المشاريع داخل الحساب</CardTitle>
            <CardDescription>
              عودة سريعة إلى الأعمال المفتوحة والجارية بدون التنقل بين صفحات متعددة.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="overflow-x-auto">
              <Table dir="rtl">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">المشروع</TableHead>
                    <TableHead className="text-right">النوع</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">آخر تحديث</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentProjects.map((project) => (
                    <TableRow key={project.name}>
                      <TableCell className="font-medium text-foreground">{project.name}</TableCell>
                      <TableCell>{project.type}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{project.status}</Badge>
                      </TableCell>
                      <TableCell>{project.updated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader className="text-right">
            <CardTitle>النشاط الأخير</CardTitle>
            <CardDescription>أهم ما جرى على الحساب والمشاريع خلال الفترة القريبة.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {activityFeed.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-muted/35 px-4 py-3"
              >
                <ArrowLeft className="size-4 shrink-0 text-muted-foreground" />
                <div className="flex min-w-0 flex-1 items-start gap-3 text-right">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-background">
                    <item.icon className="size-4 text-muted-foreground" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="text-right">
            <CardTitle>بيانات الحساب</CardTitle>
            <CardDescription>حقائق تشغيلية أساسية يحتاجها المستخدم في مكان واحد.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 pt-0">
            {accountFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-muted/35 px-4 py-3"
              >
                <span className="text-sm font-medium text-foreground">{fact.value}</span>
                <span className="text-xs text-muted-foreground">{fact.label}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm">
          <CardHeader className="text-right">
            <CardTitle>إجراءات سريعة</CardTitle>
            <CardDescription>
              الروابط الأساسية التي تخص المستخدم فقط بعد إعادة تنظيم الحساب إلى 3 صفحات.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 pt-0 sm:grid-cols-2">
            <QuickAction
              icon={User}
              title="ملف التعريف"
              description="الهوية، الأمان، والتفضيلات."
              actionLabel="فتح الصفحة"
              onClick={() => setActiveTab?.('profile')}
            />
            <QuickAction
              icon={CreditCard}
              title="اشتراكي"
              description="الخطة الحالية، الفواتير، والاستخدام."
              actionLabel="إدارة الاشتراك"
              onClick={() => setActiveTab?.('pricing')}
            />
            <QuickAction
              icon={Briefcase}
              title="مشاريعي"
              description="العودة إلى المشاريع المفتوحة والجارية."
              actionLabel="فتح المشاريع"
              onClick={() => setActiveTab?.('my-plans')}
            />
            <QuickAction
              icon={LifeBuoy}
              title="الدعم"
              description="التواصل أو طلب مساعدة حول الحساب."
              actionLabel="التواصل"
              onClick={() => setActiveTab?.('contact-us')}
            />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

function QuickAction({
  icon: Icon,
  title,
  description,
  actionLabel,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel: string;
  onClick: () => void;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/35 p-4 text-right">
      <span className="mb-3 flex size-9 items-center justify-center rounded-lg bg-background">
        <Icon className="size-4 text-muted-foreground" />
      </span>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-muted-foreground">{description}</p>
      <Button onClick={onClick} variant="outline" size="sm" className="mt-4 w-full">
        {actionLabel}
      </Button>
    </div>
  );
}
