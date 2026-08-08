import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Settings,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import type { Notification } from '@/types';

export type NotificationCategory = 'projects' | 'security' | 'billing' | 'system';
export type SystemNotification = Notification & {
  category: NotificationCategory;
  createdAt: string;
  readAt: string | null;
  metadata: Record<string, unknown>;
};

type NotificationRow = {
  id: string;
  type: Notification['type'];
  category: NotificationCategory;
  title: string;
  message: string;
  link: string | null;
  read_at: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

const relativeTimeFormatter = new Intl.RelativeTimeFormat('ar', { numeric: 'auto' });

const formatRelativeTime = (isoDate: string) => {
  const deltaSeconds = Math.round((new Date(isoDate).getTime() - Date.now()) / 1000);
  const absSeconds = Math.abs(deltaSeconds);

  if (absSeconds < 60) return relativeTimeFormatter.format(deltaSeconds, 'second');
  if (absSeconds < 3600) return relativeTimeFormatter.format(Math.round(deltaSeconds / 60), 'minute');
  if (absSeconds < 86400) return relativeTimeFormatter.format(Math.round(deltaSeconds / 3600), 'hour');
  if (absSeconds < 2592000) return relativeTimeFormatter.format(Math.round(deltaSeconds / 86400), 'day');
  return new Intl.DateTimeFormat('ar', { dateStyle: 'medium' }).format(new Date(isoDate));
};

const toNotification = (row: NotificationRow): SystemNotification => ({
  id: row.id,
  type: row.type,
  category: row.category,
  title: row.title,
  message: row.message,
  timestamp: formatRelativeTime(row.created_at),
  isRead: Boolean(row.read_at),
  link: row.link ?? undefined,
  createdAt: row.created_at,
  readAt: row.read_at,
  metadata: row.metadata ?? {},
});

const notificationMeta: Record<
  Notification['type'],
  { label: string; icon: LucideIcon; className: string }
> = {
  success: { label: 'تم الإنجاز', icon: CheckCircle2, className: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  info: { label: 'تحديث', icon: Info, className: 'text-sky-700 bg-sky-50 border-sky-200' },
  warning: { label: 'تنبيه مهم', icon: AlertTriangle, className: 'text-amber-700 bg-amber-50 border-amber-200' },
  ai: { label: 'ذكاء اصطناعي', icon: Sparkles, className: 'text-violet-700 bg-violet-50 border-violet-200' },
  system: { label: 'تحديث نظام', icon: Settings, className: 'text-slate-700 bg-slate-100 border-slate-200' },
};

const categoryLabels: Record<NotificationCategory, string> = {
  projects: 'المشاريع',
  security: 'الأمان',
  billing: 'الاشتراكات',
  system: 'النظام',
};

const getNotificationMeta = (type: Notification['type']) => notificationMeta[type];
const getCategoryLabel = (category: NotificationCategory) => categoryLabels[category];

export const useSystemNotifications = (options?: { limit?: number }) => {
  const { user } = useAuth();
  const userId = user?.id;
  const limit = options?.limit;
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadNotifications = useCallback(async () => {
    if (!userId) {
      setNotifications([]);
      setIsLoading(false);
      setErrorMessage(null);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const query = supabase
      .from('notifications')
      .select('id, type, category, title, message, link, read_at, metadata, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (limit) query.limit(limit);

    const { data, error } = await query;

    if (error) {
      setErrorMessage(error.message);
      setNotifications([]);
    } else {
      setNotifications(((data ?? []) as NotificationRow[]).map(toNotification));
    }

    setIsLoading(false);
  }, [limit, userId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        () => void loadNotifications()
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [loadNotifications, userId]);

  const markAsRead = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: new Date().toISOString() })
      .eq('id', id)
      .is('read_at', null);

    if (error) throw error;
    setNotifications((current) => current.map((item) => item.id === id ? { ...item, isRead: true, readAt: new Date().toISOString() } : item));
  }, []);

  const toggleRead = useCallback(async (notification: SystemNotification) => {
    const nextReadAt = notification.isRead ? null : new Date().toISOString();
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: nextReadAt })
      .eq('id', notification.id);

    if (error) throw error;
    setNotifications((current) =>
      current.map((item) => item.id === notification.id ? { ...item, isRead: Boolean(nextReadAt), readAt: nextReadAt } : item)
    );
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;
    const readAt = new Date().toISOString();
    const { error } = await supabase
      .from('notifications')
      .update({ read_at: readAt })
      .eq('user_id', userId)
      .is('read_at', null);

    if (error) throw error;
    setNotifications((current) => current.map((item) => ({ ...item, isRead: true, readAt })));
  }, [userId]);

  const deleteNotification = useCallback(async (id: string) => {
    const { error } = await supabase.from('notifications').delete().eq('id', id);
    if (error) throw error;
    setNotifications((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearAll = useCallback(async () => {
    if (!userId) return;
    const { error } = await supabase.from('notifications').delete().eq('user_id', userId);
    if (error) throw error;
    setNotifications([]);
  }, [userId]);

  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.isRead).length,
    [notifications]
  );

  return {
    notifications,
    unreadCount,
    isLoading,
    errorMessage,
    reload: loadNotifications,
    markAsRead,
    toggleRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  };
};

export { getCategoryLabel, getNotificationMeta };
