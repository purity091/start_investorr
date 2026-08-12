import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  CreditCard,
  LifeBuoy,
  Loader2,
  User,
  CheckCircle2,
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
              const profileData = row.profile || row.canvas_data?.profile;
              const currentStage = row.current_stage || row.currentStage || row.canvas_data?.currentStage;
              return {
                id: row.id,
                name: row.project_title || 'مشروع بدون اسم',
                type: (row.opportunity_title || profileData?.opportunityTitle) ? 'دراسة جدوى' : 'مسودة',
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
    <div className="w-full space-y-5 px-1 py-2 sm:px-2 pb-24 text-right font-['IBM_Plex_Sans_Arabic']" dir="rtl">
      {/* Top Header (Full Width) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-4 text-right">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-1">
            <span>لوحة التحكم</span>
            <span>/</span>
            <span className="text-foreground font-bold">الملف الشخصي</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">حسابي الشخصي</h1>
          <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
            ملخص الحساب، النشاطات الأخيرة، والسعة التشغيلية للمشاريع.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <Button onClick={() => setActiveTab?.('pricing')} variant="outline" size="sm" className="text-xs font-bold gap-1.5 cursor-pointer">
            <CreditCard className="size-3.5" />
            <span>إدارة الاشتراك</span>
          </Button>
          <Button onClick={() => setActiveTab?.('settings')} size="sm" className="text-xs font-bold gap-1.5 cursor-pointer">
            <User className="size-3.5" />
            <span>إعدادات الحساب</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" dir="rtl" className="w-full space-y-4">
        <TabsList dir="rtl" className="w-full justify-start bg-muted/50 p-1 border border-border/40 rounded-lg">
          <TabsTrigger value="overview" className="font-bold text-xs px-4 py-1.5 cursor-pointer">نظرة عامة</TabsTrigger>
          <TabsTrigger value="activity" className="font-bold text-xs px-4 py-1.5 cursor-pointer">مشاريعي</TabsTrigger>
          <TabsTrigger value="account" className="font-bold text-xs px-4 py-1.5 cursor-pointer">تفاصيل الحساب</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="w-full space-y-4 mt-0">
          <Card className="w-full border-border/60 shadow-2xs">
            <CardContent className="p-4 sm:p-5">
              <div className="grid gap-4 md:grid-cols-[1fr_280px] items-center">
                <div className="flex items-center gap-3 text-right">
                  {displayName ? (
                    <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border border-primary/20 shrink-0">
                      {displayName.slice(0, 1).toUpperCase()}
                    </div>
                  ) : (
                    <Skeleton className="size-12 rounded-xl" />
                  )}
                  <div>
                    {displayName ? (
                      <h3 className="text-lg font-bold text-foreground">{displayName}</h3>
                    ) : (
                      <Skeleton className="h-5 w-32 mb-1" />
                    )}
                    <p className="text-xs text-muted-foreground">{displayEmail}</p>
                    <div className="mt-1.5 flex gap-1.5 justify-start">
                      <Badge variant="secondary" className="text-[10px] font-bold">{subscriptionPlan.name}</Badge>
                      <Badge variant="outline" className="text-[10px] capitalize font-bold">{userRole}</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 text-right">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-muted-foreground">رصيد المشاريع</span>
                    <span className="text-foreground">
                      {subscriptionPlan.projectLimit ? `${projectCount} / ${subscriptionPlan.projectLimit}` : `${projectCount} / مفتوح`}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-primary transition-all rounded-full" style={{ width: `${subscriptionPlan.projectLimit ? projectUsagePercentage : 100}%` }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards Row */}
          <div className="grid gap-3 sm:grid-cols-3">
            <Card className="border-border/60 shadow-2xs">
              <CardContent className="p-3.5 text-right space-y-1">
                <p className="text-xs font-bold text-muted-foreground">المشاريع المحفوظة</p>
                <div className="flex items-end justify-between gap-2">
                  {loadingProjects ? (
                    <Skeleton className="h-6 w-10" />
                  ) : (
                    <p className="text-lg font-extrabold text-foreground">{projectCount}</p>
                  )}
                  <span className="text-[10px] text-muted-foreground font-medium">في النظام</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-2xs">
              <CardContent className="p-3.5 text-right space-y-1">
                <p className="text-xs font-bold text-muted-foreground">حالة الاشتراك</p>
                <div className="flex items-end justify-between gap-2">
                  <p className="text-lg font-extrabold text-foreground flex items-center gap-1 text-emerald-600">
                    <CheckCircle2 className="size-4" />
                    <span>نشط</span>
                  </p>
                  <Badge variant="secondary" className="text-[10px] font-bold">{subscriptionPlan.name}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 shadow-2xs">
              <CardContent className="p-3.5 text-right space-y-1">
                <p className="text-xs font-bold text-muted-foreground">المشاريع المتبقية</p>
                <div className="flex items-end justify-between gap-2">
                  <p className="text-lg font-extrabold text-foreground">
                    {subscriptionPlan.projectLimit ? Math.max(subscriptionPlan.projectLimit - projectCount, 0) : 'مفتوح'}
                  </p>
                  <span className="text-[10px] text-muted-foreground font-medium">{subscriptionPlan.projectLimitLabel}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="activity" className="w-full space-y-4 mt-0">
          <Card className="w-full border-border/60 shadow-2xs">
            <CardHeader className="text-right pb-3 border-b border-border/40">
              <CardTitle className="text-base font-bold">آخر المشاريع المحفوظة</CardTitle>
              <CardDescription className="text-xs">سجل أحدث المشاريع ودراسات الجدوى المنشأة.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {loadingProjects ? (
                <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  <span className="text-xs font-bold">جارٍ التحميل...</span>
                </div>
              ) : recentProjects.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <Briefcase className="size-7 mx-auto text-muted-foreground" />
                  <p className="text-xs font-bold text-foreground">لا توجد مشاريع محفوظة بعد</p>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={() => setActiveTab?.('new-plan-pro')}
                    className="font-bold text-xs"
                  >
                    إنشاء مشروع جديد
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table dir="rtl" className="w-full text-right">
                    <TableHeader>
                      <TableRow className="border-b border-border/40">
                        <TableHead className="text-right text-xs font-bold">اسم المشروع</TableHead>
                        <TableHead className="text-right text-xs font-bold">النوع</TableHead>
                        <TableHead className="text-right text-xs font-bold">الحالة</TableHead>
                        <TableHead className="text-right text-xs font-bold">آخر تعديل</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-border/30 text-xs">
                      {recentProjects.map((project) => (
                        <TableRow
                          key={project.id}
                          className="cursor-pointer hover:bg-muted/30"
                          onClick={() => setActiveTab?.('my-plans')}
                        >
                          <TableCell className="font-bold text-foreground">{project.name}</TableCell>
                          <TableCell className="text-muted-foreground font-medium">{project.type}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px] font-bold">{project.status}</Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground font-medium">{project.updated}</TableCell>
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
        <TabsContent value="account" className="w-full space-y-4 mt-0">
          <div className="grid gap-4 lg:grid-cols-12">
            <Card className="lg:col-span-6 border-border/60 shadow-2xs">
              <CardHeader className="text-right pb-3 border-b border-border/40">
                <CardTitle className="text-base font-bold">بيانات الحساب والملف</CardTitle>
                <CardDescription className="text-xs">المعلمات والخصائص الرئيسية بالحساب.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {accountFacts.map((fact) => (
                  <div key={fact.label} className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 px-3.5 py-2.5 text-xs text-right">
                    <span className="font-bold text-foreground">{fact.value}</span>
                    <span className="text-muted-foreground font-medium">{fact.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="lg:col-span-6 border-border/60 shadow-2xs">
              <CardHeader className="text-right pb-3 border-b border-border/40">
                <CardTitle className="text-base font-bold">إجراءات سريعة</CardTitle>
                <CardDescription className="text-xs">الانتقال السريع للأدوات والإعدادات.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 grid gap-3 sm:grid-cols-2">
                <QuickAction icon={User} title="إعدادات الملف" description="البيانات والأمان." actionLabel="تعديل" onClick={() => setActiveTab?.('settings')} />
                <QuickAction icon={CreditCard} title="الاشتراك" description="الفواتير والسعة." actionLabel="إدارة" onClick={() => setActiveTab?.('pricing')} />
                <QuickAction icon={Briefcase} title="مشاريعي" description="عرض كل الأعمال." actionLabel="فتح" onClick={() => setActiveTab?.('my-plans')} />
                <QuickAction icon={LifeBuoy} title="الدعم" description="استفسار فورى." actionLabel="مساعدة" onClick={() => setActiveTab?.('contact-us')} />
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
    <div className="rounded-lg border border-border/50 bg-muted/20 p-3 text-right space-y-2">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-md bg-background flex items-center justify-center border border-border/40">
          <Icon className="size-3.5 text-primary" />
        </div>
        <h3 className="text-xs font-bold text-foreground">{title}</h3>
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">{description}</p>
      <Button onClick={onClick} variant="outline" size="xs" className="w-full font-bold text-xs cursor-pointer">
        {actionLabel}
      </Button>
    </div>
  );
}
