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
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  {
    value: 'identity',
    label: 'البيانات الشخصية',
    description: 'تعديل الاسم، البريد، الدور، والسوق الأساسي.',
    icon: User,
  },
  {
    value: 'security',
    label: 'الأمان والخصوصية',
    description: 'كلمة المرور، الجلسات، وخيارات الحماية.',
    icon: ShieldCheck,
  },
  {
    value: 'preferences',
    label: 'التفضيلات والتنبيهات',
    description: 'اللغة، العرض، الصفحة الافتراضية، والإشعارات.',
    icon: Globe2,
  },
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
    <div className="app-page-shell-wide space-y-6 py-6" dir="rtl">
      <section className="rounded-2xl border border-border bg-card px-4 py-5 shadow-sm sm:px-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
          <div className="space-y-4 text-right">
            <div className="flex flex-wrap items-center justify-start gap-2">
              <Badge variant="secondary">ملف التعريف</Badge>
              <Badge variant="outline">قابل للتعديل</Badge>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                ملف التعريف وإعدادات المستخدم
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                هذه الصفحة مخصصة لتعديل بيانات المستخدم وإعداداته. استخدم التبويبات للتنقل بين
                الأقسام، وعدّل الحقول مباشرة، ثم احفظ التغييرات من الزر الثابت أسفل الصفحة.
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-primary/35 bg-primary/5 p-4">
              <div className="flex items-start gap-3 text-right">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-background">
                  <PencilLine className="size-4 text-primary" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">هذه واجهة تعديل وليست للعرض فقط</p>
                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    كل الحقول والقوائم والتفضيلات في التبويبات التالية قابلة للتحديث، ولن تضيع
                    تغييراتك قبل الضغط على زر <span className="font-medium text-foreground">حفظ التغييرات</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="border-border/70 shadow-none">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="size-14 rounded-2xl">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-2xl">{user.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 text-right">
                  <p className="truncate text-base font-semibold text-foreground">{user.name}</p>
                  <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                  <div className="mt-2 flex flex-wrap items-center justify-start gap-2">
                    <Badge variant="outline">حساب موثق</Badge>
                    <Badge variant="success">جاهز للتحديث</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as SettingsTab)} className="space-y-4">
        <Card className="border-border/70 shadow-sm">
          <CardContent className="p-3">
            <TabsList className="grid h-auto w-full gap-2 bg-transparent p-0 md:grid-cols-3">
              {tabItems.map((item) => {
                const Icon = item.icon;

                return (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="h-auto justify-start rounded-xl border border-border bg-background px-4 py-3 text-right data-[state=active]:border-primary/30 data-[state=active]:bg-primary/5"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <Icon className="size-4 text-muted-foreground" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                        <span className="mt-1 block text-xs leading-6 text-muted-foreground">{item.description}</span>
                      </span>
                    </div>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </CardContent>
        </Card>

        <TabsContent value="identity" className="mt-0">
          <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline">بيانات قابلة للتعديل</Badge>
                  <div>
                    <CardTitle>بيانات الملف الشخصي</CardTitle>
                    <CardDescription className="mt-2">
                      عدّل المعلومات الأساسية التي تمثل المستخدم داخل المنصة والتقارير.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-2">
                <Field label="الاسم الكامل" hint="سيظهر في الملف الشخصي وبعض المخرجات.">
                  <Input defaultValue={user.name} className="text-right" />
                </Field>
                <Field label="البريد الإلكتروني" hint="يستخدم للدخول والتنبيهات.">
                  <Input defaultValue={user.email} type="email" dir="ltr" className="text-right" />
                </Field>
                <Field label="المسمى أو الدور" hint="مثل: مؤسس مشروع أو مدير منتج.">
                  <Input defaultValue="مؤسس مشروع / مدير منتج" className="text-right" />
                </Field>
                <Field label="السوق الأساسي" hint="لتخصيص اللغة والسياق التشغيلي.">
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
                <Field label="نبذة مختصرة" hint="ملخص موجز يعرف بك داخل النظام." className="lg:col-span-2">
                  <Textarea
                    defaultValue="أستخدم المنصة لتحويل فكرة المشروع إلى دراسة جدوى منظمة، ومتابعة التنفيذ، وإدارة المخرجات الأساسية في مكان واحد."
                    className="min-h-28 text-right leading-7"
                  />
                </Field>
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>إرشادات التعديل</CardTitle>
                <CardDescription className="mt-2">
                  لتكون تجربة التحرير أوضح للمستخدم داخل هذه الصفحة.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <HintBox title="كل حقل هنا يمكن تغييره" text="الحقول النصية، القوائم المنسدلة، ومربعات النص كلها عناصر تحرير مباشرة." />
                <HintBox title="الحفظ لا يتم تلقائياً" text="بعد الانتهاء من أي تعديل، استخدم زر الحفظ الثابت أسفل الصفحة لتأكيد التغييرات." />
                <HintBox title="التنقل بين التبويبات لا يلغي التعديل" text="يمكنك الانتقال بين الأقسام ثم الحفظ عندما تنتهي من مراجعة كل شيء." />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-0">
          <div className="grid gap-4 xl:grid-cols-[1fr_1.05fr]">
            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>الأمان والخصوصية</CardTitle>
                <CardDescription className="mt-2">
                  عدّل إعدادات الدخول الأساسية وعناصر الحماية الخاصة بالحساب.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="space-y-3 rounded-xl border border-border/70 bg-muted/35 p-4">
                  <div className="flex items-center gap-2 text-right">
                    <LockKeyhole className="size-4 text-muted-foreground" />
                    <h3 className="text-sm font-semibold text-foreground">تغيير كلمة المرور</h3>
                  </div>
                  <Input type="password" placeholder="كلمة المرور الحالية" className="text-right" />
                  <Input type="password" placeholder="كلمة المرور الجديدة" className="text-right" />
                  <Input type="password" placeholder="تأكيد كلمة المرور الجديدة" className="text-right" />
                  <Button size="sm" variant="secondary">
                    <KeyRound className="size-4" />
                    تحديث كلمة المرور
                  </Button>
                </div>

                <ToggleRow
                  title="تفعيل التحقق الثنائي"
                  description="إضافة طبقة أمان قبل تسجيل الدخول إلى الحساب."
                  checked
                />
                <ToggleRow
                  title="تنبيه عند تسجيل دخول جديد"
                  description="إشعار عند ظهور جهاز جديد أو موقع مختلف."
                  checked
                />
                <ToggleRow
                  title="إخفاء البريد في التقارير المشتركة"
                  description="مفيد عند مشاركة المخرجات مع شركاء أو عملاء."
                />
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>جلسات الدخول</CardTitle>
                <CardDescription className="mt-2">
                  راجع الأجهزة والمواقع التي تم استخدام الحساب منها مؤخراً.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {sessions.map((session) => (
                  <div
                    key={`${session.device}-${session.location}`}
                    className="flex flex-col gap-3 rounded-xl border border-border/70 bg-muted/35 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <Badge variant="outline" className="w-fit">
                      {session.status}
                    </Badge>
                    <div className="min-w-0 text-right">
                      <p className="truncate text-sm font-medium text-foreground">{session.device}</p>
                      <p className="mt-1 truncate text-xs text-muted-foreground">{session.location}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="mt-0">
          <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <CardTitle>تفضيلات الاستخدام</CardTitle>
                <CardDescription className="mt-2">
                  غيّر اللغة وشكل العرض والوجهة الافتراضية بعد الدخول.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Field label="لغة المنصة" hint="تحدد لغة الواجهة الأساسية.">
                  <Select defaultValue="ar">
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر اللغة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="كثافة العرض" hint="تؤثر على المسافات وكثافة المحتوى.">
                  <Select defaultValue="comfortable">
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الكثافة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">مضغوط</SelectItem>
                      <SelectItem value="comfortable">مريح</SelectItem>
                      <SelectItem value="dense">عال الكثافة</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="صيغة التقرير الافتراضية" hint="تستخدم عند إنشاء مخرجات جديدة.">
                  <Select defaultValue="pdf">
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الصيغة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF احترافي</SelectItem>
                      <SelectItem value="brief">Brief مختصر</SelectItem>
                      <SelectItem value="doc">ملف قابل للتحرير</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="الصفحة الافتراضية بعد الدخول" hint="اختر الصفحة التي تريد البدء منها.">
                  <Select defaultValue="customer-dashboard">
                    <SelectTrigger className="text-right">
                      <SelectValue placeholder="اختر الصفحة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-dashboard">حسابي الشخصي</SelectItem>
                      <SelectItem value="profile">ملف التعريف</SelectItem>
                      <SelectItem value="pricing">اشتراكي</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-sm">
              <CardHeader className="text-right">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline">الإشعارات</Badge>
                  <div>
                    <CardTitle>تفضيلات التنبيهات</CardTitle>
                    <CardDescription className="mt-2">
                      فعّل أو عطّل التنبيهات التي تريد وصولها إليك.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 pt-0">
                {notificationOptions.map((option, index) => (
                  <label
                    key={option}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/70 bg-muted/35 px-4 py-4 text-right"
                  >
                    <Checkbox defaultChecked={index < 3} className="mt-1" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{option}</p>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">
                        يمكن تعديل هذا الخيار مباشرة من هنا ثم حفظ التغييرات.
                      </p>
                    </div>
                    <Bell className="mt-0.5 size-4 text-muted-foreground" />
                  </label>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="sticky bottom-4 z-10 rounded-2xl border border-border bg-background/95 p-3 shadow-lg backdrop-blur">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-right">
            <div className="rounded-lg bg-muted/60 p-2">
              {saved ? (
                <CheckCircle2 className="size-4 text-emerald-600" />
              ) : (
                <Sparkles className="size-4 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {saved ? 'تم حفظ تعديلات ملف التعريف.' : 'يمكنك تعديل الحقول في التبويبات ثم حفظها من هنا.'}
              </p>
              <p className="text-xs leading-6 text-muted-foreground">
                {saved
                  ? 'يمكنك متابعة تعديل أي تبويب آخر وقتما تحتاج.'
                  : 'الحفظ لا يتم تلقائياً، لذلك استخدم زر الحفظ بعد الانتهاء من المراجعة.'}
              </p>
            </div>
          </div>

          <Button onClick={handleSave} loading={isSaving} loadingText="جارٍ الحفظ">
            <Save className="size-4" />
            حفظ التغييرات
          </Button>
        </div>
      </div>
    </div>
  );
};

function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('block text-right', className)}>
      <div className="mb-2 flex items-center justify-between gap-3">
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : <span />}
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      {children}
    </label>
  );
}

function ToggleRow({
  title,
  description,
  checked = false,
}: {
  title: string;
  description: string;
  checked?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border/70 bg-muted/35 px-4 py-4 text-right">
      <Checkbox defaultChecked={checked} className="mt-1" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 text-xs leading-6 text-muted-foreground">{description}</p>
      </div>
      <ShieldCheck className="mt-0.5 size-4 text-muted-foreground" />
    </div>
  );
}

function HintBox({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-muted/35 p-4 text-right">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 text-xs leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}
