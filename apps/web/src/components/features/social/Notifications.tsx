import React, { useState } from 'react';
import {
  AlertTriangle,
  Bell,
  CheckCheck,
  CheckCircle2,
  Clock,
  CreditCard,
  ExternalLink,
  FileText,
  Info,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  SlidersHorizontal,
  BellRing
} from 'lucide-react';
import { Notification } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const INITIAL_NOTIFICATIONS: (Notification & { category?: 'projects' | 'security' | 'billing' | 'system' })[] = [
  {
    id: '1',
    type: 'success',
    category: 'projects',
    title: 'اكتمل تحليل خطة المشروع الذكية',
    message: 'تم تجهيز ملخص دراسة الجدوى الأولي بنجاح. يمكنك مراجعة النتائج واستكمال دراسة السوق.',
    timestamp: 'منذ دقيقتين',
    isRead: false,
    link: '/workspace',
  },
  {
    id: '2',
    type: 'info',
    category: 'projects',
    title: 'فرصة جديدة محفوظة في رادار السوق',
    message: 'تمت إضافة فرصة "منصة إدارة الطلبات للمطاعم" إلى مشاريعك المحفوظة للعودة إليها لاحقاً.',
    timestamp: 'منذ ساعة',
    isRead: false,
    link: '/saved-market-items',
  },
  {
    id: '3',
    type: 'warning',
    category: 'projects',
    title: 'تنبيه: أقسام نموذج العمل تحتاج استكمال',
    message: 'هناك قسمان في نموذج العمل التجاري (BMC) لم يتم تعبئتهما بعد. يفضل إكمالهما للحصول على تقرير دقيق.',
    timestamp: 'منذ 5 ساعات',
    isRead: false,
    link: '/bmc',
  },
  {
    id: '4',
    type: 'system',
    category: 'system',
    title: 'تحديث منصة خطة v2.4',
    message: 'تمت إضافة الـ Mega Menu الجديد وميزات اختيار عدد النتائج بالجدول لصفحات SaaS و Micro-SaaS.',
    timestamp: 'منذ يوم',
    isRead: true,
  },
  {
    id: '5',
    type: 'info',
    category: 'billing',
    title: 'تجديد الاشتراك السنوي بنجاح',
    message: 'تم تجديد اشتراكك في باقة "المستثمر المحترف". الفاتورة متاحة الآن للتحميل.',
    timestamp: 'منذ يومين',
    isRead: true,
    link: '/pricing',
  },
  {
    id: '6',
    type: 'warning',
    category: 'security',
    title: 'تسجيل دخول جديد للحساب',
    message: 'تم تسجيل الدخول إلى حسابك من متصفح Chrome على جهاز Windows جديد.',
    timestamp: 'منذ 3 أيام',
    isRead: true,
  },
  {
    id: '7',
    type: 'ai',
    category: 'projects',
    title: 'توصيات الذكاء الاصطناعي للمشروع',
    message: 'حلل نموذج الذكاء الاصطناعي مشروعك واقترح خفض تكاليف التسويق الأولية بنسبة 15%.',
    timestamp: 'منذ 4 أيام',
    isRead: true,
    link: '/workspace',
  },
];

const notificationMeta: Record<Notification['type'], { label: string; icon: React.ElementType; className: string }> = {
  success: { label: 'تم الانجاز', icon: CheckCircle2, className: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  info: { label: 'تحديث', icon: Info, className: 'text-sky-700 bg-sky-50 border-sky-200' },
  warning: { label: 'تنبيه مهم', icon: AlertTriangle, className: 'text-amber-700 bg-amber-50 border-amber-200' },
  ai: { label: 'ذكاء اصطناعي', icon: Sparkles, className: 'text-purple-700 bg-purple-50 border-purple-200' },
  system: { label: 'تحديث نظام', icon: Settings, className: 'text-slate-700 bg-slate-100 border-slate-200' },
};

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread' | 'projects' | 'security' | 'billing'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    emailProjects: true,
    emailSecurity: true,
    emailBilling: true,
    weeklyDigest: false,
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    // Tab Filter
    if (filter === 'unread' && n.isRead) return false;
    if (filter === 'projects' && n.category !== 'projects') return false;
    if (filter === 'security' && n.category !== 'security') return false;
    if (filter === 'billing' && n.category !== 'billing') return false;

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.message.toLowerCase().includes(q);
    }

    return true;
  });

  const markAllAsRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  const clearAll = () => setNotifications([]);
  const deleteNotification = (id: string) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const toggleRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );

  return (
    <main className="app-page-shell-wide space-y-6 text-right font-sans" dir="rtl">
      
      {/* Header Banner - Pure shadcn Card */}
      <Card className="p-6 bg-card border border-border shadow-xs rounded-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="outline" className="gap-1.5 font-semibold py-1 px-3 bg-background">
                <Bell className="size-3.5 text-primary" />
                مركز التنبيهات والتحديثات
              </Badge>
              {unreadCount > 0 && (
                <Badge variant="default" className="font-bold py-1 px-2.5 bg-primary text-primary-foreground">
                  {unreadCount} غير مقروءة
                </Badge>
              )}
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                إشعارات وتنبيهات الحساب
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                متابعة فورية ومنظمة لكافة الأنشطة، تحديثات دراسات الجدوى، حالة الاشتراك، وتنبيهات الأمان.
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Button onClick={markAllAsRead} variant="outline" size="sm" className="gap-1.5 font-medium">
              <CheckCheck className="size-4" />
              تعيين الكل كمقروء
            </Button>
            
            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 font-medium">
                  <SlidersHorizontal className="size-4" />
                  تخصيص الإشعارات
                </Button>
              </DialogTrigger>
              <DialogContent dir="rtl" className="max-w-md">
                <DialogHeader className="text-right">
                  <DialogTitle className="flex items-center gap-2">
                    <BellRing className="size-5 text-primary" />
                    إعدادات التنبيهات
                  </DialogTitle>
                  <DialogDescription>
                    حدد التنبيهات التي تود استلامها عبر البريد الإلكتروني واللوحة.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-3">
                  <div className="flex items-center justify-between space-x-2 space-x-reverse rounded-lg border border-border p-3">
                    <div className="space-y-0.5">
                      <label className="text-sm font-semibold text-foreground cursor-pointer" htmlFor="emailProjects">
                        تحديثات المشاريع والخطط
                      </label>
                      <p className="text-xs text-muted-foreground">إشعارات عند إكمال التحليلات وتجهيز التمارين.</p>
                    </div>
                    <Checkbox
                      id="emailProjects"
                      checked={settings.emailProjects}
                      onCheckedChange={(c) => setSettings((s) => ({ ...s, emailProjects: !!c }))}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2 space-x-reverse rounded-lg border border-border p-3">
                    <div className="space-y-0.5">
                      <label className="text-sm font-semibold text-foreground cursor-pointer" htmlFor="emailSecurity">
                        تنبيهات الأمان وتعديل الحساب
                      </label>
                      <p className="text-xs text-muted-foreground">تنبيهات فورية عند تغيير كلمة المرور أو الدخول من جهاز جديد.</p>
                    </div>
                    <Checkbox
                      id="emailSecurity"
                      checked={settings.emailSecurity}
                      onCheckedChange={(c) => setSettings((s) => ({ ...s, emailSecurity: !!c }))}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2 space-x-reverse rounded-lg border border-border p-3">
                    <div className="space-y-0.5">
                      <label className="text-sm font-semibold text-foreground cursor-pointer" htmlFor="emailBilling">
                        الفواتير والاشتراك
                      </label>
                      <p className="text-xs text-muted-foreground">إشعارات تجديد الباقة وتنزيل الفواتير الضريبية.</p>
                    </div>
                    <Checkbox
                      id="emailBilling"
                      checked={settings.emailBilling}
                      onCheckedChange={(c) => setSettings((s) => ({ ...s, emailBilling: !!c }))}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2 space-x-reverse rounded-lg border border-border p-3">
                    <div className="space-y-0.5">
                      <label className="text-sm font-semibold text-foreground cursor-pointer" htmlFor="weeklyDigest">
                        التقرير الأسبوعي الملخص
                      </label>
                      <p className="text-xs text-muted-foreground">ملخص أسبوعي بالبريد لأهم تطورات مشاريعك.</p>
                    </div>
                    <Checkbox
                      id="weeklyDigest"
                      checked={settings.weeklyDigest}
                      onCheckedChange={(c) => setSettings((s) => ({ ...s, weeklyDigest: !!c }))}
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={() => setIsSettingsOpen(false)} size="sm">
                    حفظ التفضيلات
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={clearAll} variant="outline" size="sm" className="gap-1.5 font-medium text-destructive hover:bg-destructive/10">
              <Trash2 className="size-4" />
              حذف الكل
            </Button>
          </div>
        </div>
      </Card>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs value={filter} onValueChange={(value) => setFilter(value as any)} className="w-full md:w-auto">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="all" className="font-semibold">الكل ({notifications.length})</TabsTrigger>
            <TabsTrigger value="unread" className="font-semibold">غير المقروءة ({unreadCount})</TabsTrigger>
            <TabsTrigger value="projects" className="font-semibold">المشاريع</TabsTrigger>
            <TabsTrigger value="security" className="font-semibold">الأمان</TabsTrigger>
            <TabsTrigger value="billing" className="font-semibold">الاشتراكات</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث في التنبيهات..."
            className="pr-9 text-xs h-9 bg-card border-input"
          />
        </div>
      </div>

      {/* Notifications List Card */}
      <Card className="rounded-xl border border-border shadow-xs bg-card">
        <CardHeader className="border-b border-border bg-muted/10 p-4 sm:p-5 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-foreground">قائمة التنبيهات</CardTitle>
            <CardDescription className="text-xs text-muted-foreground mt-0.5">
              عرض التنبيهات بناءً على التصفية المحددة.
            </CardDescription>
          </div>
          <span className="text-xs font-mono text-muted-foreground">
            عرض {filteredNotifications.length} من {notifications.length}
          </span>
        </CardHeader>

        <CardContent className="p-3 sm:p-4 divide-y divide-border">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg bg-muted/20 px-4 py-16 text-center">
              <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground mb-3 border border-border">
                <Bell className="size-6" />
              </div>
              <h3 className="text-base font-bold text-foreground">لا توجد تنبيهات متطابقة</h3>
              <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
                لم يتم العثور على أي إشعار يطابق خيارات التصفية أو كلمة البحث الحالية.
              </p>
              {searchQuery && (
                <Button variant="outline" size="sm" onClick={() => setSearchQuery('')} className="mt-4 text-xs font-medium">
                  إلغاء تصفية البحث
                </Button>
              )}
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const meta = notificationMeta[notification.type];
              const Icon = meta.icon;

              return (
                <div
                  key={notification.id}
                  className={cn(
                    'flex flex-col sm:flex-row items-start gap-3.5 p-3.5 rounded-lg transition-colors hover:bg-muted/40 my-1',
                    !notification.isRead && 'bg-secondary/40 border-r-2 border-primary'
                  )}
                >
                  {/* Category Icon */}
                  <div className={cn('size-9 shrink-0 rounded-lg flex items-center justify-center border', meta.className)}>
                    <Icon className="size-4" />
                  </div>

                  {/* Notification Details */}
                  <div className="min-w-0 flex-1 space-y-1.5 w-full">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        {!notification.isRead && (
                          <span className="size-2 rounded-full bg-primary shrink-0" title="غير مقروء" />
                        )}
                        <h3 className={cn("text-sm font-bold text-foreground", !notification.isRead && "font-black")}>
                          {notification.title}
                        </h3>
                        <Badge variant="outline" className="text-[10px] font-medium py-0 px-2">
                          {meta.label}
                        </Badge>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground shrink-0 font-mono">
                        <Clock className="size-3 text-muted-foreground/70" />
                        {notification.timestamp}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground">{notification.message}</p>

                    {/* Direct Link Action if exists */}
                    {notification.link && (
                      <div className="pt-1">
                        <a
                          href={notification.link}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                        >
                          <span>عرض التفاصيل والاستكمال</span>
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Context Actions Menu */}
                  <div className="self-end sm:self-center shrink-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 text-right">
                        <DropdownMenuItem onClick={() => toggleRead(notification.id)} className="text-xs font-medium">
                          {notification.isRead ? 'تعيين كغير مقروء' : 'تعيين كمقروء'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs font-medium text-destructive focus:bg-destructive/10 focus:text-destructive"
                        >
                          حذف التنبيه
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </main>
  );
};
