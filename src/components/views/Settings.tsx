import React, { useState } from 'react';
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
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface SettingsProps {
  user: UserType;
}

type SettingsTab = 'identity' | 'security' | 'preferences';

const sessions = [
  { device: 'Chrome على Windows', location: 'دمشق، سوريا', status: 'نشط الآن' },
  { device: 'Safari على iPhone', location: 'دبي، الإمارات', status: 'قبل ساعتين' },
  { device: 'Edge على Windows', location: 'الرياض، السعودية', status: 'قبل يوم' },
];

const notificationOptions = [
  'تحديثات المشاريع ودراسات الجدوى',
  'اكتمال التقارير والملفات الجاهزة للتصدير',
  'ملخص أسبوعي عن نشاط الحساب',
  'إصدارات جديدة وتحسينات المنصة',
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
  const [activeTab, setActiveTab] = useState<SettingsTab>('identity');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(false);
    setIsSaving(true);
    window.setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1800);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8 px-4 py-6 sm:py-8 sm:px-6 pb-24" dir="rtl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">إعدادات الحساب</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            إدارة بياناتك الشخصية، الأمان، وتفضيلات النظام.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-lg border border-border/50">
          <Avatar className="size-10 rounded-full">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="text-right">
            <p className="text-sm font-semibold">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SettingsTab)} className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          {tabItems.map((item) => {
            const Icon = item.icon;
            return (
              <TabsTrigger key={item.value} value={item.value} className="gap-2">
                <Icon className="size-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="identity" className="space-y-6 mt-0">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="text-right">
              <CardTitle>البيانات الشخصية</CardTitle>
              <CardDescription>المعلومات الأساسية لملفك التعريفي.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:gap-6 sm:grid-cols-2 p-4 sm:p-6 pt-0">
              <Field label="الاسم الكامل">
                <Input defaultValue={user.name} className="text-right" />
              </Field>
              <Field label="البريد الإلكتروني" hint="مخفي في المشاركات">
                <Input defaultValue={user.email} type="email" dir="ltr" className="text-right" />
              </Field>
              <Field label="المسمى أو الدور">
                <Input defaultValue="مؤسس مشروع / مدير منتج" className="text-right" />
              </Field>
              <Field label="السوق الأساسي">
                <Select defaultValue="sy">
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
                  defaultValue="أستخدم المنصة لتحويل فكرة المشروع إلى دراسة جدوى منظمة، ومتابعة التنفيذ."
                  className="min-h-24 text-right leading-relaxed"
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
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input type="password" placeholder="كلمة المرور الحالية" className="text-right" />
                    <div />
                    <Input type="password" placeholder="الجديدة" className="text-right" />
                    <Input type="password" placeholder="تأكيد الجديدة" className="text-right" />
                  </div>
                  <Button size="sm" variant="secondary">
                    تحديث كلمة المرور
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
                <CardTitle>جلسات الدخول</CardTitle>
                <CardDescription>الأجهزة المتصلة بحسابك حالياً.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sessions.map((session) => (
                  <div key={`${session.device}-${session.location}`} className="flex items-center justify-between gap-3 text-right">
                    <div>
                      <p className="text-sm font-medium text-foreground">{session.device}</p>
                      <p className="text-xs text-muted-foreground">{session.location}</p>
                    </div>
                    <Badge variant="outline" className="shrink-0">{session.status}</Badge>
                  </div>
                ))}
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
                  <Select defaultValue="ar">
                    <SelectTrigger className="text-right"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="كثافة العرض">
                  <Select defaultValue="comfortable">
                    <SelectTrigger className="text-right"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">مضغوط</SelectItem>
                      <SelectItem value="comfortable">مريح</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="التقرير الافتراضي">
                  <Select defaultValue="pdf">
                    <SelectTrigger className="text-right"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF احترافي</SelectItem>
                      <SelectItem value="brief">Brief مختصر</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="الصفحة الافتراضية">
                  <Select defaultValue="customer-dashboard">
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
                <CardDescription>التنبيهات التي ترغب باستلامها.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {notificationOptions.map((option, index) => (
                  <label key={option} className="flex cursor-pointer items-start gap-3 text-right">
                    <Bell className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <span className="flex-1 text-sm text-foreground">{option}</span>
                    <Checkbox defaultChecked={index < 3} className="shrink-0" />
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-4 z-10 flex items-center justify-between rounded-xl border border-border bg-card/95 px-4 py-3 sm:px-6 sm:py-4 shadow-sm backdrop-blur">
        <div className="flex items-center gap-3">
          {saved ? <CheckCircle2 className="size-5 text-emerald-600" /> : <Sparkles className="size-5 text-muted-foreground" />}
          <div>
            <p className="text-sm font-semibold text-foreground">{saved ? 'تم حفظ التغييرات' : 'تعديلات غير محفوظة'}</p>
            <p className="hidden text-xs text-muted-foreground sm:block">يرجى تأكيد أي تعديلات قمت بها في التبويبات أعلاه.</p>
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
