import React, { useMemo, useState } from 'react';
import {
  Bell,
  CheckCheck,
  Clock,
  ExternalLink,
  Loader2,
  MoreHorizontal,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Trash2,
} from 'lucide-react';

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
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  getCategoryLabel,
  getNotificationMeta,
  type NotificationCategory,
  type SystemNotification,
  useSystemNotifications,
} from '@/services/notificationService';

interface NotificationsProps {
  setActiveTab?: (tab: string) => void;
}

type NotificationFilter = 'all' | 'unread' | NotificationCategory;

const filterLabels: Array<{ value: NotificationFilter; label: string }> = [
  { value: 'all', label: 'الكل' },
  { value: 'unread', label: 'غير المقروءة' },
  { value: 'projects', label: 'المشاريع' },
  { value: 'security', label: 'الأمان' },
  { value: 'billing', label: 'الاشتراكات' },
  { value: 'system', label: 'النظام' },
];

export const Notifications: React.FC<NotificationsProps> = ({ setActiveTab }) => {
  const { user } = useAuth();
  const {
    notifications,
    unreadCount,
    isLoading,
    errorMessage,
    reload,
    toggleRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useSystemNotifications();

  const [filter, setFilter] = useState<NotificationFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);
  const [settings, setSettings] = useState(() => {
    const saved = user?.user_metadata?.notifications as Record<string, boolean> | undefined;
    return {
      emailProjects: saved?.notif_projects ?? true,
      emailSecurity: saved?.notif_security ?? true,
      emailBilling: saved?.notif_billing ?? true,
      weeklyDigest: saved?.notif_weekly ?? true,
    };
  });

  const filteredNotifications = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return notifications.filter((notification) => {
      if (filter === 'unread' && notification.isRead) return false;
      if (filter !== 'all' && filter !== 'unread' && notification.category !== filter) return false;

      if (!query) return true;
      return (
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        getCategoryLabel(notification.category).toLowerCase().includes(query)
      );
    });
  }, [filter, notifications, searchQuery]);

  const runAction = async (action: () => Promise<void>) => {
    setActionError(null);
    try {
      await action();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : 'تعذر تنفيذ العملية على قاعدة البيانات');
    }
  };

  const openNotificationLink = (notification: SystemNotification) => {
    const link = notification.link;
    if (!link) return;

    if (link.startsWith('/') && !link.startsWith('//')) {
      window.location.assign(link);
      return;
    }

    if (setActiveTab) setActiveTab(link);
  };

  const saveNotificationSettings = async () => {
    if (!user || isSavingSettings) return;

    setIsSavingSettings(true);
    setSettingsMessage(null);
    const currentSettings = user.user_metadata?.notifications as Record<string, boolean> | undefined;
    const { error } = await supabase.auth.updateUser({
      data: {
        notifications: {
          ...currentSettings,
          notif_projects: settings.emailProjects,
          notif_security: settings.emailSecurity,
          notif_billing: settings.emailBilling,
          notif_weekly: settings.weeklyDigest,
        },
      },
    });

    if (error) {
      setSettingsMessage('تعذر حفظ تفضيلات التنبيهات. حاول مرة أخرى.');
    } else {
      setSettingsMessage('تم حفظ تفضيلات التنبيهات.');
    }
    setIsSavingSettings(false);
  };

  return (
    <main className="app-page-shell-wide space-y-6 text-right font-sans" dir="rtl">
      <Card className="border-border bg-card p-6 shadow-xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2.5">
              {unreadCount > 0 ? (
                <Badge variant="default" className="bg-primary px-2.5 py-1 font-bold text-primary-foreground">
                  {unreadCount} غير مقروءة
                </Badge>
              ) : null}
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                إشعارات وتنبيهات الحساب
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                تنبيهات محفوظة في قاعدة البيانات لحالة المشاريع، الأمان، الاشتراكات، وتحديثات النظام.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => void runAction(markAllAsRead)}
              variant="outline"
              size="sm"
              className="gap-1.5 font-medium"
              disabled={isLoading || unreadCount === 0}
            >
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
                    <Bell className="size-5 text-primary" />
                    إعدادات التنبيهات
                  </DialogTitle>
                  <DialogDescription>
                    اختر التنبيهات التي ترغب باستلامها على حسابك.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-3">
                  {[
                    ['emailProjects', 'تحديثات المشاريع والخطط'],
                    ['emailSecurity', 'تنبيهات الأمان وتعديل الحساب'],
                    ['emailBilling', 'الفواتير والاشتراك'],
                    ['weeklyDigest', 'التقرير الأسبوعي الملخص'],
                  ].map(([id, label]) => (
                    <label key={id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
                      <span className="text-sm font-semibold text-foreground">{label}</span>
                      <Checkbox
                        checked={settings[id as keyof typeof settings]}
                        onCheckedChange={(checked) =>
                          setSettings((current) => ({ ...current, [id]: Boolean(checked) }))
                        }
                      />
                    </label>
                  ))}
                </div>
                {settingsMessage ? (
                  <p className={cn('text-sm font-medium', settingsMessage.startsWith('تم ') ? 'text-emerald-700' : 'text-destructive')}>
                    {settingsMessage}
                  </p>
                ) : null}
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setIsSettingsOpen(false)} size="sm" disabled={isSavingSettings}>
                    إغلاق
                  </Button>
                  <Button onClick={() => void saveNotificationSettings()} size="sm" disabled={isSavingSettings}>
                    {isSavingSettings ? <Loader2 className="size-4 animate-spin" /> : null}
                    حفظ التفضيلات
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={() => void reload()}
              variant="outline"
              size="sm"
              className="gap-1.5 font-medium"
              disabled={isLoading}
            >
              <RefreshCw className={cn('size-4', isLoading && 'animate-spin')} />
              تحديث
            </Button>

            <Button
              onClick={() => void runAction(clearAll)}
              variant="outline"
              size="sm"
              className="gap-1.5 font-medium text-destructive hover:bg-destructive/10"
              disabled={isLoading || notifications.length === 0}
            >
              <Trash2 className="size-4" />
              حذف الكل
            </Button>
          </div>
        </div>
      </Card>

      {(errorMessage || actionError) ? (
        <Card className="border-destructive/40 bg-destructive/5 p-4 text-destructive">
          <p className="text-sm font-medium">
            {errorMessage
              ? 'خدمة التنبيهات غير متاحة مؤقتاً. حاول التحديث بعد قليل.'
              : actionError}
          </p>
        </Card>
      ) : null}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Tabs value={filter} onValueChange={(value) => setFilter(value as NotificationFilter)} className="w-full md:w-auto">
          <TabsList className="w-full justify-start overflow-x-auto">
            {filterLabels.map((item) => (
              <TabsTrigger key={item.value} value={item.value} className="font-semibold">
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-72">
          <Search className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="بحث في التنبيهات..."
            className="h-9 border-input bg-card pr-9 text-xs"
          />
        </div>
      </div>

      <Card className="border-border bg-card shadow-xs">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border bg-muted/10 p-4 sm:p-5">
          <div>
            <CardTitle className="text-base font-bold text-foreground">قائمة التنبيهات</CardTitle>
            <CardDescription className="mt-0.5 text-xs">
              عرض {filteredNotifications.length} من {notifications.length} تنبيه محفوظ.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="divide-y divide-border p-3 sm:p-4">
          {isLoading ? (
            <StateBlock icon={<Loader2 className="size-6 animate-spin" />} title="جاري تحميل التنبيهات" description="يتم الآن قراءة التنبيهات من Supabase." />
          ) : filteredNotifications.length === 0 ? (
            <StateBlock icon={<Bell className="size-6" />} title="لا توجد تنبيهات" description="لا توجد تنبيهات تطابق خيارات العرض الحالية." />
          ) : (
            filteredNotifications.map((notification) => {
              const meta = getNotificationMeta(notification.type);
              const Icon = meta.icon;

              return (
                <div
                  key={notification.id}
                  className={cn(
                    'my-1 flex flex-col items-start gap-3.5 rounded-lg p-3.5 transition-colors hover:bg-muted/40 sm:flex-row',
                    !notification.isRead && 'border-r-2 border-primary bg-secondary/40'
                  )}
                >
                  <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg border', meta.className)}>
                    <Icon className="size-4" />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        {!notification.isRead ? <span className="size-2 shrink-0 rounded-full bg-primary" title="غير مقروء" /> : null}
                        <h3 className={cn('text-sm font-bold text-foreground', !notification.isRead && 'font-black')}>
                          {notification.title}
                        </h3>
                        <Badge variant="outline" className="px-2 py-0 text-[10px] font-medium">
                          {meta.label}
                        </Badge>
                        <Badge variant="secondary" className="px-2 py-0 text-[10px] font-medium">
                          {getCategoryLabel(notification.category)}
                        </Badge>
                      </div>

                      <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] text-muted-foreground">
                        <Clock className="size-3 text-muted-foreground/70" />
                        {notification.timestamp}
                      </span>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground">{notification.message}</p>

                    {notification.link ? (
                      <button
                        type="button"
                        onClick={() => openNotificationLink(notification)}
                        className="inline-flex cursor-pointer items-center gap-1 pt-1 text-xs font-bold text-primary hover:underline"
                      >
                        <span>عرض التفاصيل</span>
                        <ExternalLink className="size-3" />
                      </button>
                    ) : null}
                  </div>

                  <div className="shrink-0 self-end sm:self-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44 text-right">
                        <DropdownMenuItem onClick={() => void runAction(() => toggleRead(notification))} className="text-xs font-medium">
                          {notification.isRead ? 'تعيين كغير مقروء' : 'تعيين كمقروء'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => void runAction(() => deleteNotification(notification.id))}
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

function StateBlock({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-muted/20 px-4 py-16 text-center">
      <div className="mb-3 flex size-12 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
        {icon}
      </div>
      <h3 className="text-base font-bold text-foreground">{title}</h3>
      <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}
