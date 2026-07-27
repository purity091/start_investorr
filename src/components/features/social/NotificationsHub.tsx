import React from 'react';
import { Bell, Check, Clock3, Settings, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/separator';

const notifications = [
  {
    id: 'insight',
    title: 'تحليل مشروع جديد جاهز للمراجعة',
    description: 'تم تجهيز ملخص مختصر يساعدك على مراجعة اتجاه المشروع قبل الانتقال للخطوة التالية.',
    meta: 'منذ 5 دقائق',
    badge: 'تحليل',
    icon: Sparkles,
  },
  {
    id: 'task',
    title: 'خطوة تحتاج استكمال',
    description: 'هناك قسم غير مكتمل في دراسة الجدوى. راجع البيانات الأساسية قبل التصدير.',
    meta: 'منذ ساعة',
    badge: 'مهمة',
    icon: Clock3,
  },
  {
    id: 'billing',
    title: 'تم تحديث حالة الاشتراك',
    description: 'اشتراكك مفعل ويمكنك متابعة استخدام أدوات بناء المشروع من لوحة التحكم.',
    meta: 'منذ يوم',
    badge: 'الحساب',
    icon: Check,
  },
];

export const NotificationsHub: React.FC = () => {
  return (
    <main dir="rtl" className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6 text-right lg:px-8">
      <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">مركز الحساب</Badge>
              <Badge variant="outline">واجهة جاهزة للتسليم</Badge>
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">مركز التنبيهات</h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                متابعة مختصرة للتحديثات المهمة داخل الحساب، بدون إزعاج بصري أو تفاصيل غير ضرورية.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
              إعدادات التنبيهات
            </Button>
            <Button size="sm">
              <Check className="h-4 w-4" />
              تعليم الكل كمقروء
            </Button>
          </div>
        </div>
      </section>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="h-4 w-4 text-muted-foreground" />
                التنبيهات الأخيرة
              </CardTitle>
              <CardDescription>قائمة مرتبة حسب آخر تحديث داخل المنصة.</CardDescription>
            </div>
            <Badge variant="secondary">{notifications.length} تنبيهات</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-0">
          {notifications.map((notification, index) => {
            const Icon = notification.icon;

            return (
              <React.Fragment key={notification.id}>
                <article className="flex gap-3 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-sm font-semibold text-foreground">{notification.title}</h2>
                        <Badge variant="outline">{notification.badge}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{notification.meta}</span>
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">{notification.description}</p>
                  </div>
                </article>
                {index < notifications.length - 1 ? <Separator /> : null}
              </React.Fragment>
            );
          })}
        </CardContent>
      </Card>
    </main>
  );
};
