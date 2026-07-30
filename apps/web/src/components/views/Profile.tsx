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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/features/auth/AuthContext';

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

export const Profile: React.FC<ProfileProps> = ({ user, setActiveTab }) => {
  const { user: authUser, profile } = useAuth();

  const displayName = profile?.full_name || authUser?.user_metadata?.full_name || user.name;
  const displayEmail = profile?.email || authUser?.email || user.email;
  const userRole = profile?.role || 'user';

  const usagePercentage = Math.min((user.credits / Math.max(user.totalCredits, 1)) * 100, 100);

  const accountFacts = [
    { label: 'اسم الحساب', value: displayName },
    { label: 'الباقة الحالية', value: 'الاحترافي' },
    { label: 'الدور في المنصة', value: userRole === 'admin' ? 'مدير النظام (Admin)' : 'مستخدم (User)' },
    { label: 'الرصيد المتاح', value: `${user.credits} من ${user.totalCredits}` },
    { label: 'أولوية الدعم', value: 'فائقة (VIP)' },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:py-8 sm:px-6 pb-24 text-right" dir="rtl">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-right">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">حسابي الشخصي</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            ملخص الحساب، والمشاريع، والنشاطات الأخيرة في مكان واحد.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setActiveTab?.('pricing')} variant="outline">
            <CreditCard className="size-4 ml-2" />
            إدارة الاشتراك
          </Button>
          <Button onClick={() => setActiveTab?.('settings')}>
            <User className="size-4 ml-2" />
            إعدادات الحساب
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 max-w-[400px]">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="activity">النشاط</TabsTrigger>
          <TabsTrigger value="account">تفاصيل الحساب</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-0">
          <Card className="border-border/70 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="grid gap-6 md:grid-cols-[1fr_300px] items-center">
                <div className="flex items-center gap-4 text-right">
                  <img
                    src={user.avatar}
                    alt={displayName}
                    className="size-16 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">{displayName}</h3>
                    <p className="text-sm text-muted-foreground dir-ltr text-right">{displayEmail}</p>
                    <div className="mt-2 flex gap-2 justify-start">
                      <Badge variant="secondary">الباقة الاحترافية</Badge>
                      <Badge variant="outline" className="capitalize">{userRole}</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">رصيد الأدوات</span>
                    <span className="font-semibold">{user.credits} / {user.totalCredits}</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary transition-all rounded-full" style={{ width: `${usagePercentage}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 mt-0">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>آخر المشاريع</CardTitle>
                <CardDescription>العودة السريعة للأعمال الجارية والمفتوحة.</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                  <Table dir="rtl">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">المشروع</TableHead>
                        <TableHead className="text-right">النوع</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">تحديث</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentProjects.map((project) => (
                        <TableRow key={project.name}>
                          <TableCell className="font-medium text-foreground text-right">{project.name}</TableCell>
                          <TableCell className="text-muted-foreground text-right">{project.type}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant="outline">{project.status}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-right">{project.updated}</TableCell>
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
                <CardDescription>سجل العمليات السريعة.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {activityFeed.map((item) => (
                  <div key={item.title} className="flex items-start gap-3 text-right">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                      <item.icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="account" className="space-y-6 mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>بيانات الحساب</CardTitle>
                <CardDescription>المعلومات التشغيلية الأساسية.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {accountFacts.map((fact) => (
                  <div key={fact.label} className="flex items-center justify-between gap-4 rounded-xl border border-border/70 bg-muted/35 px-4 py-3 text-right">
                    <span className="text-sm font-medium text-foreground">{fact.value}</span>
                    <span className="text-xs text-muted-foreground">{fact.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>إجراءات سريعة</CardTitle>
                <CardDescription>الوصول السريع للمهام.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 pt-0 sm:grid-cols-2">
                <QuickAction icon={User} title="إعدادات الملف" description="الهوية والأمان." actionLabel="تعديل" onClick={() => setActiveTab?.('settings')} />
                <QuickAction icon={CreditCard} title="الاشتراك" description="الفواتير والاستخدام." actionLabel="إدارة" onClick={() => setActiveTab?.('pricing')} />
                <QuickAction icon={Briefcase} title="مشاريعي" description="عرض كل الأعمال." actionLabel="فتح" onClick={() => setActiveTab?.('my-plans')} />
                <QuickAction icon={LifeBuoy} title="الدعم" description="التواصل للاستفسار." actionLabel="مساعدة" onClick={() => setActiveTab?.('contact-us')} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
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
