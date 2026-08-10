import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  CreditCard,
  LifeBuoy,
  Loader2,
  User,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/skeleton';
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
import { supabase } from '@/lib/supabase';
import { getSubscriptionPlan } from '@/lib/subscriptionPlans';

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

interface RealProject {
  id: string;
  name: string;
  type: string;
  status: string;
  updated: string;
}

type RecentProjectRow = {
  id: string;
  project_title: string | null;
  opportunity_title: string | null;
  current_stage: string | null;
  profile?: {
    opportunityTitle?: string | null;
  } | null;
  currentStage?: string | null;
  canvas_data?: {
    profile?: {
      opportunityTitle?: string | null;
    };
    currentStage?: string | null;
  };
  updated_at: string;
};

export const Profile: React.FC<ProfileProps> = ({ user, setActiveTab }) => {
  const { user: authUser, profile } = useAuth();

  const displayName = profile?.full_name || authUser?.user_metadata?.full_name || user.name || 'المستخدم';
  const displayEmail = profile?.email || authUser?.email || user.email;
  const userRole = profile?.role || 'user';
  const subscriptionPlan = getSubscriptionPlan(profile?.subscription_plan);

  const [recentProjects, setRecentProjects] = useState<RealProject[]>([]);
  const [projectCount, setProjectCount] = useState<number>(0);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const projectUsagePercentage = subscriptionPlan.projectLimit
    ? Math.min(Math.round((projectCount / subscriptionPlan.projectLimit) * 100), 100)
    : 0;

  useEffect(() => {
    const fetchProjects = async () => {
      if (!authUser?.id) { setLoadingProjects(false); return; }
      setLoadingProjects(true);
      try {
        const { data, error } = await supabase
          .from('business_canvas')
          .select('id, project_title, sector_label, opportunity_title, current_stage, canvas_data->profile, canvas_data->currentStage, updated_at')
          .eq('user_id', authUser.id)
          .is('deleted_at', null)
          .order('updated_at', { ascending: false })
          .limit(5);

        if (error) throw error;

        if (data) {
          setRecentProjects(
            (data as RecentProjectRow[]).map((row) => {
              const profile = row.profile || row.canvas_data?.profile;
              const currentStage = row.current_stage || row.currentStage || row.canvas_data?.currentStage;
              return {
                id: row.id,
                name: row.project_title || 'مشروع بدون اسم',
                type: (row.opportunity_title || profile?.opportunityTitle) ? 'دراسة جدوى' : 'مسودة',
                status:
                  currentStage === 'execution'
                    ? 'جاهز للتنفيذ'
                    : currentStage === 'planning'
                      ? 'قيد التخطيط'
                      : 'قيد البناء',
                updated: new Date(row.updated_at).toLocaleDateString('ar-SA'),
              };
            })
          );
        }

        const { count, error: countError } = await supabase
          .from('business_canvas')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', authUser.id)
          .is('deleted_at', null);

        if (countError) throw countError;
        setProjectCount(count ?? data?.length ?? 0);
      } catch (err) {
        console.error('Error fetching recent projects:', err);
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [authUser?.id]);

  const accountFacts = [
    { label: 'اسم الحساب', value: displayName },
    { label: 'الباقة الحالية', value: subscriptionPlan.name },
    { label: 'الدور في المنصة', value: userRole === 'admin' ? 'مدير النظام (Admin)' : 'مستخدم (User)' },
    { label: 'حد المشاريع', value: subscriptionPlan.projectLimit ? `${projectCount} من ${subscriptionPlan.projectLimit}` : `${projectCount} / مفتوح` },
    { label: 'أولوية الدعم', value: 'قياسي' },
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

      <Tabs defaultValue="overview" dir="rtl" className="space-y-6">
        <div className="flex justify-start">
          <TabsList dir="rtl" className="grid w-full grid-cols-3 max-w-[400px]">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="activity">مشاريعي</TabsTrigger>
            <TabsTrigger value="account">تفاصيل الحساب</TabsTrigger>
          </TabsList>
        </div>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-0">
          <Card className="border-border/70 shadow-sm">
            <CardContent className="p-4 sm:p-6">
              <div className="grid gap-6 md:grid-cols-[1fr_300px] items-center">
                <div className="flex items-center gap-4 text-right">
                  {displayName ? (
                    <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-xl shadow-sm">
                      {displayName.slice(0, 1).toUpperCase()}
                    </div>
                  ) : (
                    <Skeleton className="size-14 rounded-2xl" />
                  )}
                  <div>
                    {displayName ? (
                      <h3 className="text-2xl font-semibold text-foreground">{displayName}</h3>
                    ) : (
                      <Skeleton className="h-6 w-40 mb-2" />
                    )}
                    <p className="text-sm text-muted-foreground">{displayEmail}</p>
                    <div className="mt-2 flex gap-2 justify-start">
                      <Badge variant="secondary">{subscriptionPlan.name}</Badge>
                      <Badge variant="outline" className="capitalize">{userRole}</Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">رصيد الأدوات</span>
                    <span className="font-semibold">
                      {subscriptionPlan.projectLimit ? `${projectCount} / ${subscriptionPlan.projectLimit}` : `${projectCount} / مفتوح`}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary transition-all rounded-full" style={{ width: `${subscriptionPlan.projectLimit ? projectUsagePercentage : 100}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real stats from Supabase */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <Card className="border-border/70 shadow-sm">
              <CardContent className="p-4 text-right">
                <p className="text-xs font-medium text-muted-foreground">المشاريع المحفوظة</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  {loadingProjects ? (
                    <Skeleton className="h-7 w-12" />
                  ) : (
                    <p className="text-xl font-semibold text-foreground">{projectCount}</p>
                  )}
                  <span className="text-xs text-muted-foreground">في Supabase</span>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70 shadow-sm">
              <CardContent className="p-4 text-right">
                <p className="text-xs font-medium text-muted-foreground">حالة الاشتراك</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <p className="text-xl font-semibold text-foreground">نشط</p>
                  <Badge variant="secondary" className="text-xs">{subscriptionPlan.name}</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/70 shadow-sm">
              <CardContent className="p-4 text-right">
                <p className="text-xs font-medium text-muted-foreground">المشاريع المتبقية</p>
                <div className="mt-2 flex items-end justify-between gap-3">
                  <p className="text-xl font-semibold text-foreground">
                    {subscriptionPlan.projectLimit ? Math.max(subscriptionPlan.projectLimit - projectCount, 0) : 'مفتوح'}
                  </p>
                  <span className="text-xs text-muted-foreground">{subscriptionPlan.projectLimitLabel}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Projects Tab — Real data */}
        <TabsContent value="activity" className="space-y-6 mt-0">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="text-right">
              <CardTitle>آخر المشاريع</CardTitle>
              <CardDescription>أحدث مشاريعك المحفوظة في المنصة.</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {loadingProjects ? (
                <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  <span className="text-sm">جاري تحميل المشاريع...</span>
                </div>
              ) : recentProjects.length === 0 ? (
                <div className="py-8 text-center">
                  <Briefcase className="size-8 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm font-medium text-foreground">لا توجد مشاريع محفوظة بعد</p>
                  <p className="text-xs text-muted-foreground mt-1">ابدأ أول مشروع وسيظهر هنا</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-4"
                    onClick={() => setActiveTab?.('new-plan-pro')}
                  >
                    إنشاء مشروع جديد
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table dir="rtl">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-right">المشروع</TableHead>
                        <TableHead className="text-right">النوع</TableHead>
                        <TableHead className="text-right">الحالة</TableHead>
                        <TableHead className="text-right">آخر تعديل</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentProjects.map((project) => (
                        <TableRow
                          key={project.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => setActiveTab?.('my-plans')}
                        >
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
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Account Details Tab */}
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
