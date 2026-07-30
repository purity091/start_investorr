import React, { useState } from 'react';
import {
  AlertTriangle,
  Bell,
  CheckCheck,
  CheckCircle2,
  Clock,
  Info,
  MoreHorizontal,
  Settings,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { Notification } from '../../../types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'اكتمل تحليل خطة المشروع',
    message: 'تم تجهيز ملخص دراسة الجدوى الأولي ويمكنك مراجعة النتائج من مساحة المشروع.',
    timestamp: 'منذ دقيقتين',
    isRead: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'تحديث على صفحة المشاكل والفرص',
    message: 'تم حفظ فرصة جديدة ضمن قائمة المشاريع المحفوظة للعودة إليها لاحقاً.',
    timestamp: 'منذ ساعة',
    isRead: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'تنبيه حول اكتمال البيانات',
    message: 'بعض أقسام نموذج العمل لا تزال فارغة. يفضل إكمالها قبل تصدير التقرير.',
    timestamp: 'منذ 5 ساعات',
    isRead: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'تحديث واجهة المنصة',
    message: 'تم تحسين تجربة لوحة المشترك وخريطة الموقع لتسهيل التنقل بين الأدوات.',
    timestamp: 'منذ يوم',
    isRead: true,
  },
  {
    id: '5',
    type: 'ai',
    title: 'ميزة ذكية مؤجلة',
    message: 'سيتم طرح المساعد الاستراتيجي الذكي في مرحلة لاحقة، والواجهة الحالية تخفيه عن المستخدم.',
    timestamp: 'منذ يومين',
    isRead: true,
  },
];

const notificationMeta: Record<Notification['type'], { label: string; icon: React.ElementType; className: string }> = {
  success: { label: 'نجاح', icon: CheckCircle2, className: 'text-emerald-700 bg-emerald-50' },
  info: { label: 'معلومة', icon: Info, className: 'text-sky-700 bg-sky-50' },
  warning: { label: 'تنبيه', icon: AlertTriangle, className: 'text-amber-700 bg-amber-50' },
  ai: { label: 'لاحقاً', icon: Sparkles, className: 'text-muted-foreground bg-muted' },
  system: { label: 'النظام', icon: Settings, className: 'text-slate-700 bg-slate-100' },
};

export const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((notification) => !notification.isRead).length;
  const filteredNotifications = filter === 'all' ? notifications : notifications.filter((notification) => !notification.isRead);

  const markAllAsRead = () => setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
  const clearAll = () => setNotifications([]);
  const deleteNotification = (id: string) => setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  const toggleRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: !notification.isRead } : notification)),
    );

  return (
    <main className="app-page-shell-wide space-y-6 text-right" dir="rtl">
      <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <Badge variant="secondary" className="w-fit">مركز الإشعارات</Badge>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">الإشعارات</h1>
              <p className="text-sm leading-7 text-muted-foreground">
                متابعة مختصرة لما يحدث داخل الحساب والمشاريع، بدون ازدحام أو بطاقات ضخمة.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={markAllAsRead} variant="outline" size="sm">
              <CheckCheck className="size-4" />
              تعيين الكل كمقروء
            </Button>
            <Button onClick={clearAll} variant="outline" size="sm">
              <Trash2 className="size-4" />
              حذف الكل
            </Button>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={filter} onValueChange={(value) => setFilter(value as 'all' | 'unread')}>
          <TabsList>
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="unread">غير المقروءة</TabsTrigger>
          </TabsList>
        </Tabs>
        <p className="text-sm text-muted-foreground">
          لديك <span className="font-medium text-foreground">{unreadCount}</span> إشعار غير مقروء.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle>قائمة الإشعارات</CardTitle>
          <CardDescription>حالة فارغة، مقروءة، وغير مقروءة جاهزة للتسليم البرمجي.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg bg-muted/40 px-4 py-14 text-center">
              <Bell className="mb-3 size-9 text-muted-foreground" />
              <h3 className="text-base font-semibold text-foreground">لا توجد إشعارات</h3>
              <p className="mt-1 max-w-sm text-sm leading-6 text-muted-foreground">
                عندما يحدث شيء مهم داخل المشروع أو الحساب سيظهر هنا بوضوح.
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const meta = notificationMeta[notification.type];
              const Icon = meta.icon;
              return (
                <div
                  key={notification.id}
                  className={cn(
                    'flex items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/60',
                    !notification.isRead && 'bg-muted/35',
                  )}
                >
                  <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', meta.className)}>
                    <Icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex min-w-0 items-center gap-2">
                        {!notification.isRead && <span className="size-2 rounded-full bg-primary" />}
                        <h3 className="truncate text-sm font-medium text-foreground">{notification.title}</h3>
                        <Badge variant="outline" className="shrink-0">{meta.label}</Badge>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {notification.timestamp}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{notification.message}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" className="shrink-0">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => toggleRead(notification.id)}>
                        {notification.isRead ? 'تعيين كغير مقروء' : 'تعيين كمقروء'}
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive" onClick={() => deleteNotification(notification.id)}>
                        حذف الإشعار
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </main>
  );
};
