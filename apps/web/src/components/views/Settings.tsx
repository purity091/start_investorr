import React, { useState, useEffect } from 'react';
import {
  Bell,
  CheckCircle2,
  Globe2,
  KeyRound,
  LockKeyhole,
  PencilLine,
  Save,
  ShieldCheck,
  Sparkles,
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

const NOTIFICATION_OPTIONS = [
  { id: 'notif_projects', label: 'تحديثات المشاريع ودراسات الجدوى' },
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
  { value: 'preferences', label: 'التفضيلات', icon: Globe2 },
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

  // Notification checkboxes state — persisted in user_metadata
  const [notifications, setNotifications] = useState<Record<string, boolean>>(() => {
    const saved = authUser?.user_metadata?.notifications as Record<string, boolean> | undefined;
    return {
      notif_projects: saved?.notif_projects ?? true,
      notif_reports: saved?.notif_reports ?? true,
      notif_weekly: saved?.notif_weekly ?? true,
      notif_updates: saved?.notif_updates ?? false,
    };
  });

  // Password change state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (profile?.full_name) setFullName(profile.full_name);
    if (profile?.email || authUser?.email) setEmail(profile?.email || authUser?.email || '');
    if (authUser?.user_metadata?.job_title) setJobTitle(authUser.user_metadata.job_title);
    if (authUser?.user_metadata?.market) setMarket(authUser.user_metadata.market);
    if (authUser?.user_metadata?.bio) setBio(authUser.user_metadata.bio);
    if (authUser?.user_metadata?.language) setLanguage(authUser.user_metadata.language);
    if (authUser?.user_metadata?.density) setDensity(authUser.user_metadata.density);
    if (authUser?.user_metadata?.default_report) setDefaultReport(authUser.user_metadata.default_report);
    if (authUser?.user_metadata?.default_page) setDefaultPage(authUser.user_metadata.default_page);
    // Sync notification prefs from auth metadata
    const saved = authUser?.user_metadata?.notifications as Record<string, boolean> | undefined;
    if (saved) setNotifications(prev => ({ ...prev, ...saved }));
  }, [profile, authUser]);

  const handleSave = async () => {
    setSaved(false);
    setErrorMessage(null);
    setIsSaving(true);

    try {
      const currentUserId = authUser?.id;

      if (currentUserId) {
        // 1. Update public.profiles table in Supabase Database
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            full_name: fullName,
            email: email,
          })
          .eq('id', currentUserId);

        if (profileError) {
          console.warn('Profile DB update warning:', profileError);
        }

        // 2. Update Supabase Auth user metadata & email if changed
        const updatePayload: any = {
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

        // 3. Refresh context profile state
        if (refetchProfile) {
          await refetchProfile();
        }
      }

      setIsSaving(false);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error('Error saving settings to DB:', err);
      setIsSaving(false);
      setErrorMessage(err.message || 'حدث خطأ أثناء حفظ التعديلات في قاعدة البيانات');
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
    } catch (err: any) {
      setIsUpdatingPassword(false);
      setPasswordMsg({ type: 'error', text: err.message || 'فشل تحديث كلمة المرور' });
    }
  };

  const displayName = fullName || user.name;
  const displayEmail = email || user.email;

  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8 px-4 py-6 sm:py-8 sm:px-6 pb-24" dir="rtl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">إعدادات الحساب</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            إدارة بياناتك الشخصية، الأمان، وتفضيلات النظام المنحفظة في قاعدة البيانات.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-muted/50 px-4 py-2.5 rounded-xl border border-border/60">
          <div className="size-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
            {displayName.slice(0, 1).toUpperCase()}
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{displayName}</p>
            <p className="text-xs text-muted-foreground">{displayEmail}</p>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
          <AlertCircle className="size-5 shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SettingsTab)} dir="rtl" className="space-y-6">
        <div className="flex justify-start">
          <TabsList dir="rtl" className="grid w-full max-w-md grid-cols-3 mr-0">
            {tabItems.map((item) => {
              const Icon = item.icon;
              return (
                <TabsTrigger key={item.value} value={item.value} className="gap-2 justify-center">
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <TabsContent value="identity" className="space-y-6 mt-0">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="text-right">
              <CardTitle>البيانات الشخصية</CardTitle>
              <CardDescription>المعلومات الأساسية لملفك التعريفي في قاعدة البيانات.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:gap-6 sm:grid-cols-2 p-4 sm:p-6 pt-0">
              <Field label="الاسم الكامل">
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="text-right"
                  placeholder="أدخل الاسم الكامل"
                />
              </Field>
              <Field label="البريد الإلكتروني" hint="مخفي في المشاركات">
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  dir="ltr"
                  className="text-right"
                  placeholder="name@example.com"
                />
              </Field>
              <Field label="المسمى أو الدور">
                <Input
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="text-right"
                  placeholder="مؤسس مشروع / مدير منتج"
                />
              </Field>
              <Field label="السوق الأساسي">
                <Select value={market} onValueChange={setMarket}>
                  <SelectTrigger className="text-right">
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
              <Field label="نبذة مختصرة" className="sm:col-span-2">
                <Textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-24 text-right leading-relaxed"
                  placeholder="اكتب نبذة مختصرة عنك..."
                />
              </Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-0">
          <div className="grid gap-6 md:grid-cols-[1fr_320px]">
            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>إعدادات الأمان</CardTitle>
                <CardDescription>خيارات تسجيل الدخول والحماية.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 rounded-xl border border-border/70 bg-muted/35 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-right">
                    <LockKeyhole className="size-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">تغيير كلمة المرور</h3>
                  </div>

                  {passwordMsg && (
                    <div
                      className={cn(
                        'flex items-center gap-2 rounded-md p-3 text-xs font-medium',
                        passwordMsg.type === 'success'
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                          : 'bg-destructive/10 text-destructive border border-destructive/20'
                      )}
                    >
                      {passwordMsg.type === 'success' ? (
                        <CheckCircle2 className="size-4 shrink-0" />
                      ) : (
                        <AlertCircle className="size-4 shrink-0" />
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
                      className="text-right"
                    />
                    <Input
                      type="password"
                      placeholder="تأكيد كلمة المرور الجديدة"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="text-right"
                    />
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleUpdatePassword}
                    disabled={isUpdatingPassword}
                  >
                    {isUpdatingPassword ? (
                      <>
                        <Loader2 className="size-4 ml-2 animate-spin" />
                        جاري التحديث...
                      </>
                    ) : (
                      'تحديث كلمة المرور'
                    )}
                  </Button>
                </div>
                <div className="space-y-3">
                  <ToggleRow title="التحقق الثنائي" description="طبقة أمان إضافية قبل الدخول." checked />
                  <ToggleRow title="تنبيهات الدخول" description="إشعار عند تسجيل دخول من جهاز جديد." checked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>جلسة الدخول الحالية</CardTitle>
                <CardDescription>أنت مسجّل الدخول حالياً بهذا الحساب.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between gap-3 rounded-xl border border-border/70 bg-muted/35 p-3 text-right">
                  <div>
                    <p className="text-sm font-semibold text-foreground">الجلسة الحالية</p>
                    <p className="text-xs text-muted-foreground mt-1">{displayEmail}</p>
                    <p className="text-xs text-muted-foreground">آخر نشاط: الآن</p>
                  </div>
                  <Badge className="shrink-0 bg-emerald-500/10 text-emerald-700 border-emerald-500/20">نشط الآن</Badge>
                </div>
                <p className="text-xs text-muted-foreground text-right">
                  لإدارة الجلسات الأخرى أو إلغاء الوصول من أجهزة أخرى، استخدم خيار تسجيل الخروج من جميع الأجهزة.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6 mt-0">
          <div className="grid gap-6 md:grid-cols-[1fr_320px]">
            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>تفضيلات النظام</CardTitle>
                <CardDescription>الواجهة والإعدادات الافتراضية.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 sm:grid-cols-2">
                <Field label="لغة المنصة">
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="text-right"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="كثافة العرض">
                  <Select value={density} onValueChange={setDensity}>
                    <SelectTrigger className="text-right"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">مضغوط</SelectItem>
                      <SelectItem value="comfortable">مريح</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="التقرير الافتراضي">
                  <Select value={defaultReport} onValueChange={setDefaultReport}>
                    <SelectTrigger className="text-right"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interactive">تقرير تفاعلي</SelectItem>
                      <SelectItem value="brief">Brief مختصر</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="الصفحة الافتراضية">
                  <Select value={defaultPage} onValueChange={setDefaultPage}>
                    <SelectTrigger className="text-right"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-dashboard">الرئيسية</SelectItem>
                      <SelectItem value="my-plans">مشاريعي</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>الإشعارات</CardTitle>
                <CardDescription>التنبيهات التي ترغب باستلامها — تُحفظ تلقائياً عند الضغط على حفظ.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {NOTIFICATION_OPTIONS.map((option) => (
                  <label key={option.id} className="flex cursor-pointer items-start gap-3 text-right">
                    <Bell className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 text-sm text-foreground">{option.label}</span>
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

      <div className="sticky bottom-4 z-10 flex items-center justify-between rounded-xl border border-border bg-card/95 px-4 py-3 sm:px-6 sm:py-4 shadow-sm backdrop-blur">
        <div className="flex items-center gap-3">
          {saved ? (
            <CheckCircle2 className="size-5 text-emerald-600" />
          ) : (
            <Sparkles className="size-5 text-muted-foreground" />
          )}
          <div>
            <p className="text-sm font-semibold text-foreground">
              {saved ? 'تم حفظ التغييرات في قاعدة البيانات بنجاح' : 'تعديلات إعدادات الحساب'}
            </p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              تأكد من الضغط على زر الحفظ أدناه لحفظ أي تعديلات قمت بها في التبويبات.
            </p>
          </div>
        </div>
        <Button onClick={handleSave} loading={isSaving}>
          <Save className="size-4 ml-2" />
          حفظ التعديلات
        </Button>
      </div>
    </div>
  );
};

function Field({ label, hint, children, className }: { label: string; hint?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-2 text-right', className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground">{label}</label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ title, description, checked = false }: { title: string; description: string; checked?: boolean }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border/70 bg-muted/35 p-3 sm:p-4 text-right">
      <ShieldCheck className="size-4 shrink-0 text-muted-foreground mt-0.5" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
      <Checkbox defaultChecked={checked} className="shrink-0 mt-1" />
    </div>
  );
}
