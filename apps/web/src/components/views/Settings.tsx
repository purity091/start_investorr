import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Globe2,
  LockKeyhole,
  Save,
  ShieldCheck,
  Zap,
  User,
  AlertCircle,
  Loader2,
} from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { User as UserType } from '../../types';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';

interface SettingsProps {
  user: UserType;
}
type SettingsTab = 'identity' | 'security' | 'preferences';

const getErrorMessage = (error: unknown, fallback: string) =>
  error instanceof Error && error.message ? error.message : fallback;

const NOTIFICATION_OPTIONS = [
  { id: 'notif_projects', label: 'تحديثات المشاريع ودراسات الجدوى' },
  { id: 'notif_security', label: 'تنبيهات الأمان وتغييرات الحساب' },
  { id: 'notif_billing', label: 'الفواتير والاشتراك' },
  { id: 'notif_reports', label: 'اكتمال التقارير والملفات الجاهزة للتصدير' },
  { id: 'notif_weekly', label: 'ملخص أسبوعي عن نشاط الحساب' },
  { id: 'notif_updates', label: 'إصدارات جديدة وتحسينات المنصة' },
];

const tabItems: Array<{
  value: SettingsTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { value: 'identity', label: 'البيانات الشخصية', icon: User },
  { value: 'security', label: 'الأمان والخصوصية', icon: ShieldCheck },
  { value: 'preferences', label: 'التفضيلات والإشعارات', icon: Globe2 },
];

export const Settings: React.FC<SettingsProps> = ({ user }) => {
  const { user: authUser, profile, refetchProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<SettingsTab>('identity');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Profile fields state
  const [fullName, setFullName] = useState(profile?.full_name || authUser?.user_metadata?.full_name || user.name || '');
  const [email, setEmail] = useState(profile?.email || authUser?.email || user.email || '');
  const [jobTitle, setJobTitle] = useState(authUser?.user_metadata?.job_title || 'مؤسس مشروع / مدير منتج');
  const [market, setMarket] = useState(authUser?.user_metadata?.market || 'sy');
  const [bio, setBio] = useState(authUser?.user_metadata?.bio || 'أستخدم المنصة لتحويل فكرة المشروع إلى دراسة جدوى منظمة، ومتابعة التنفيذ.');

  // System preferences state
  const [language, setLanguage] = useState(authUser?.user_metadata?.language || 'ar');
  const [density, setDensity] = useState(authUser?.user_metadata?.density || 'comfortable');
  const [defaultReport, setDefaultReport] = useState(authUser?.user_metadata?.default_report || 'pdf');
  const [defaultPage, setDefaultPage] = useState(authUser?.user_metadata?.default_page || 'customer-dashboard');

  // Notification checkboxes state
  const [notifications, setNotifications] = useState<Record<string, boolean>>(() => {
    const savedNotifs = authUser?.user_metadata?.notifications as Record<string, boolean> | undefined;
    return {
      notif_projects: savedNotifs?.notif_projects ?? true,
      notif_security: savedNotifs?.notif_security ?? true,
      notif_billing: savedNotifs?.notif_billing ?? true,
      notif_reports: savedNotifs?.notif_reports ?? true,
      notif_weekly: savedNotifs?.notif_weekly ?? true,
      notif_updates: savedNotifs?.notif_updates ?? false,
    };
  });

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const handleSave = async () => {
    setSaved(false);
    setErrorMessage(null);
    setIsSaving(true);

    try {
      const currentUserId = authUser?.id;

      if (currentUserId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: fullName,
            email: email,
          })
          .eq('id', currentUserId);

        if (profileError) throw profileError;

        const updatePayload: Parameters<typeof supabase.auth.updateUser>[0] = {
          data: {
            full_name: fullName,
            job_title: jobTitle,
            market: market,
            bio: bio,
            language: language,
            density: density,
            default_report: defaultReport,
            default_page: defaultPage,
            notifications: notifications,
          },
        };

        if (email && authUser.email && email !== authUser.email) {
          updatePayload.email = email;
        }

        const { error: authError } = await supabase.auth.updateUser(updatePayload);
        if (authError) throw authError;

        if (refetchProfile) {
          await refetchProfile();
        }
      }

      setIsSaving(false);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 3000);
    } catch (err: unknown) {
      console.error('Error saving settings to DB:', err);
      setIsSaving(false);
      setErrorMessage(getErrorMessage(err, 'حدث خطأ أثناء حفظ التعديلات في قاعدة البيانات'));
    }
  };

  const handleUpdatePassword = async () => {
    setPasswordMsg(null);

    if (!newPassword) {
      setPasswordMsg({ type: 'error', text: 'يرجى إدخال كلمة المرور الجديدة' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'كلمتا المرور غير متطابقتين' });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      setIsUpdatingPassword(false);
      setPasswordMsg({ type: 'success', text: 'تم تحديث كلمة المرور بنجاح' });
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      setIsUpdatingPassword(false);
      setPasswordMsg({ type: 'error', text: getErrorMessage(err, 'فشل تحديث كلمة المرور') });
    }
  };

  const displayName = fullName || user.name;
  const displayEmail = email || user.email;

  return (
    <div className="w-full space-y-5 pb-24 text-right font-['IBM_Plex_Sans_Arabic']" dir="rtl">
      {/* Top Header Shell (Full Width) */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-border/50 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-1">
            <span>لوحة التحكم</span>
            <span>/</span>
            <span className="text-foreground font-bold">إعدادات الحساب</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            إعدادات الحساب والتفضيلات
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">
            إدارة البيانات الشخصية، الأمان، والتفضيلات التشغيلية للحساب.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-muted/60 px-3.5 py-2 rounded-lg border border-border/50 shrink-0 self-start sm:self-auto">
          <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
            {displayName.slice(0, 1).toUpperCase()}
          </div>
          <div className="text-right leading-none space-y-1">
            <p className="text-xs font-bold text-foreground">{displayName}</p>
            <p className="text-[11px] text-muted-foreground">{displayEmail}</p>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-destructive text-xs font-medium">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Settings Tabs (Full Width Grid Layout) */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SettingsTab)} dir="rtl" className="w-full space-y-4">
        <TabsList dir="rtl" className="w-full justify-start overflow-x-auto scrollbar-none flex-nowrap bg-muted/50 p-1 border border-border/40 rounded-lg">
          {tabItems.map((item) => {
            const Icon = item.icon;
            return (
              <TabsTrigger key={item.value} value={item.value} className="gap-2 font-bold text-xs px-4 py-1.5 cursor-pointer whitespace-nowrap shrink-0">
                <Icon className="size-3.5" />
                <span>{item.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab 1: Personal Details */}
        <TabsContent value="identity" className="w-full space-y-4 mt-0">
          <Card className="w-full border-border/60 shadow-2xs">
            <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3 border-b border-border/40 text-right">
              <CardTitle className="text-base font-bold">البيانات الشخصية والملف التعريفي</CardTitle>
              <CardDescription className="text-xs">المعلومات الأساسية لحسابك المسجلة في المنصة.</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="الاسم الكامل">
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-8.5 sm:h-9 text-right text-xs px-2.5 py-1"
                    placeholder="أدخل الاسم الكامل"
                  />
                </Field>

                <Field label="البريد الإلكتروني" hint="مخفي في المشاركات العامة">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    dir="ltr"
                    className="h-8.5 sm:h-9 text-right text-xs px-2.5 py-1"
                    placeholder="name@example.com"
                  />
                </Field>

                <Field label="المسمى الوظيفي / الدور">
                  <Input
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="h-8.5 sm:h-9 text-right text-xs px-2.5 py-1"
                    placeholder="مؤسس مشروع / مدير منتج"
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="السوق المستهدف الأساسي">
                  <Select value={market} onValueChange={setMarket}>
                    <SelectTrigger className="h-8.5 sm:h-9 text-right text-xs px-2.5 py-1">
                      <SelectValue placeholder="اختر السوق" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sy">سوريا</SelectItem>
                      <SelectItem value="sa">السعودية</SelectItem>
                      <SelectItem value="ae">الإمارات</SelectItem>
                      <SelectItem value="eg">مصر</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="نبذة مختصرة عن نشاطك">
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="min-h-16 sm:min-h-20 text-right text-xs px-2.5 py-1.5 leading-relaxed"
                    placeholder="اكتب نبذة مختصرة عنك وعن مشاريعك..."
                  />
                </Field>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Security */}
        <TabsContent value="security" className="w-full space-y-4 mt-0">
          <div className="grid gap-4 lg:grid-cols-12">
            <Card className="lg:col-span-8 border-border/60 shadow-2xs">
              <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3 border-b border-border/40 text-right">
                <CardTitle className="text-base font-bold">إعدادات الأمان وحماية الحساب</CardTitle>
                <CardDescription className="text-xs">تغيير كلمة المرور وتفعيل خيارات الحماية الإضافية.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="space-y-3 rounded-lg border border-border/50 bg-muted/20 p-3.5 sm:p-4">
                  <div className="flex items-center gap-2 text-right">
                    <LockKeyhole className="size-4 text-primary" />
                    <h3 className="text-xs font-bold text-foreground">تحديث كلمة المرور</h3>
                  </div>

                  {passwordMsg && (
                    <div
                      className={cn(
                        'flex items-center gap-2 rounded-md p-2.5 text-xs font-medium',
                        passwordMsg.type === 'success'
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                          : 'bg-destructive/10 text-destructive border border-destructive/20'
                      )}
                    >
                      {passwordMsg.type === 'success' ? (
                        <CheckCircle2 className="size-3.5 shrink-0" />
                      ) : (
                        <AlertCircle className="size-3.5 shrink-0" />
                      )}
                      <span>{passwordMsg.text}</span>
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      type="password"
                      placeholder="كلمة المرور الجديدة"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-8.5 sm:h-9 text-right text-xs px-2.5 py-1"
                    />
                    <Input
                      type="password"
                      placeholder="تأكيد كلمة المرور الجديدة"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-8.5 sm:h-9 text-right text-xs px-2.5 py-1"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleUpdatePassword}
                    disabled={isUpdatingPassword}
                    className="h-8 text-xs font-bold px-3"
                  >
                    {isUpdatingPassword ? (
                      <>
                        <Loader2 className="size-3.5 ml-2 animate-spin" />
                        جارٍ التحديث...
                      </>
                    ) : (
                      'تحديث كلمة المرور'
                    )}
                  </Button>
                </div>

                <div className="space-y-2">
                  <ToggleRow title="التحقق الثنائي (2FA)" description="حماية إضافية عبر رمز التحقق." checked />
                  <ToggleRow title="تنبيهات تسجيل الدخول" description="إشعارات فورية عند دخول الحساب من جهاز جديد." checked />
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-4 border-border/60 shadow-2xs">
              <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3 border-b border-border/40 text-right">
                <CardTitle className="text-base font-bold">الجلسة الحالية</CardTitle>
                <CardDescription className="text-xs">تفاصيل الجهاز المسجّل حالياً.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                <div className="flex items-start justify-between gap-3 rounded-lg border border-border/60 bg-muted/20 p-3 text-right">
                  <div>
                    <p className="text-xs font-bold text-foreground">الجلسة النشطة</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{displayEmail}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">آخر نشاط: الآن</p>
                  </div>
                  <Badge className="shrink-0 bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px] font-bold">
                    متصل الآن
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: System Preferences & Notifications */}
        <TabsContent value="preferences" className="w-full space-y-4 mt-0">
          <div className="grid gap-4 lg:grid-cols-12">
            <Card className="lg:col-span-7 border-border/60 shadow-2xs">
              <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3 border-b border-border/40 text-right">
                <CardTitle className="text-base font-bold">تفضيلات واجهة النظام</CardTitle>
                <CardDescription className="text-xs">تخصيص اللغة والصفحة الافتراضية وكثافة العرض.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 grid gap-4 sm:grid-cols-2">
                <Field label="لغة المنصة">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="h-8.5 sm:h-9 text-right text-xs px-2.5 py-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية (الأصلية)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="كثافة الواجهة">
                  <Select value={density} onValueChange={setDensity}>
                    <SelectTrigger className="h-8.5 sm:h-9 text-right text-xs px-2.5 py-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">مضغوط وعالي الكثافة</SelectItem>
                      <SelectItem value="comfortable">مريح</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="نوع التقرير الافتراضي">
                  <Select value={defaultReport} onValueChange={setDefaultReport}>
                    <SelectTrigger className="h-8.5 sm:h-9 text-right text-xs px-2.5 py-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interactive">تقرير تفاعلي حي</SelectItem>
                      <SelectItem value="brief">ملخص مختصر</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field label="الصفحة الرئيسية عند الدخول">
                  <Select value={defaultPage} onValueChange={setDefaultPage}>
                    <SelectTrigger className="h-8.5 sm:h-9 text-right text-xs px-2.5 py-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-dashboard">لوحة التحكم</SelectItem>
                      <SelectItem value="my-plans">مشاريعي</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5 border-border/60 shadow-2xs">
              <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-3 border-b border-border/40 text-right">
                <CardTitle className="text-base font-bold">تفضيلات الإشعارات</CardTitle>
                <CardDescription className="text-xs">تحديد التنبيهات المستلمة بالحساب.</CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {NOTIFICATION_OPTIONS.map((option) => (
                  <label key={option.id} className="flex cursor-pointer items-center justify-between text-right p-2 rounded-md hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-2">
                      <Bell className="size-3.5 text-muted-foreground shrink-0" />
                      <span className="text-xs font-medium text-foreground">{option.label}</span>
                    </div>
                    <Checkbox
                      checked={notifications[option.id] ?? false}
                      onCheckedChange={(checked) =>
                        setNotifications(prev => ({ ...prev, [option.id]: !!checked }))
                      }
                      className="shrink-0"
                    />
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating Save Actions Bar */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between rounded-xl border border-border bg-card/95 px-4 py-3 shadow-md backdrop-blur">
        <div className="flex items-center gap-2">
          {saved ? (
            <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          ) : (
            <Zap className="size-4 text-primary shrink-0" />
          )}
          <div>
            <p className="text-xs font-bold text-foreground">
              {saved ? 'تم حفظ التعديلات في قاعدة البيانات' : 'حفظ تغييرات الإعدادات'}
            </p>
          </div>
        </div>
        <Button onClick={handleSave} loading={isSaving} size="sm" className="font-bold text-xs gap-1.5 cursor-pointer">
          <Save className="size-3.5 ml-1" />
          حفظ التعديلات
        </Button>
      </div>
    </div>
  );
};

function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-1.5 text-right', className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-foreground">{label}</label>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ title, description, checked = false }: { title: string; description: string; checked?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/20 p-3 text-right">
      <div className="flex items-start gap-2.5">
        <ShieldCheck className="size-4 text-muted-foreground mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-bold text-foreground">{title}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <Checkbox defaultChecked={checked} className="shrink-0" />
    </div>
  );
}

