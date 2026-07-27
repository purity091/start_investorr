import React from 'react';
import { Clock, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck } from 'lucide-react';
import FAQ from './FAQ';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const contactMethods = [
  { title: 'البريد الإلكتروني', value: 'support@khotta.sa', icon: Mail },
  { title: 'الهاتف', value: '+966 55 000 0000', icon: Phone },
  { title: 'ساعات العمل', value: 'الأحد إلى الخميس، 9 صباحاً - 6 مساءً', icon: Clock },
  { title: 'الموقع', value: 'الرياض، المملكة العربية السعودية', icon: MapPin },
];

export const ContactUs: React.FC = () => {
  return (
    <main className="app-page-shell-wide space-y-6 text-right" dir="rtl">
      <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <Badge variant="secondary" className="w-fit">تواصل معنا</Badge>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">نساعدك على اختيار المسار المناسب</h1>
              <p className="text-sm leading-7 text-muted-foreground">
                أرسل سؤالك أو طلبك، وسنوجهك إلى الأداة المناسبة داخل المنصة أو نوضح لك أفضل طريقة لبدء دراسة جدوى مشروعك.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4" />
            يتم التعامل مع الرسائل بسرية وتنظيم.
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>إرسال طلب</CardTitle>
            <CardDescription>واجهة نموذج جاهزة للربط البرمجي لاحقاً بدون منطق خلفي حالياً.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">الاسم الكامل</label>
                <Input placeholder="اكتب اسمك" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
                <Input type="email" placeholder="name@example.com" dir="ltr" className="text-left" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">نوع الطلب</label>
                <Select defaultValue="guidance">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الطلب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guidance">توجيه لاختيار المسار</SelectItem>
                    <SelectItem value="subscription">استفسار اشتراك</SelectItem>
                    <SelectItem value="report">مخرجات وتقرير</SelectItem>
                    <SelectItem value="other">طلب آخر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">مرحلة المشروع</label>
                <Select defaultValue="idea">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المرحلة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idea">فكرة أولية</SelectItem>
                    <SelectItem value="study">بناء دراسة جدوى</SelectItem>
                    <SelectItem value="launch">التحضير للإطلاق</SelectItem>
                    <SelectItem value="growth">مشروع قائم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground">الرسالة</label>
                <Textarea rows={6} placeholder="اشرح ما تحتاجه باختصار..." />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2 sm:flex-row">
                <Button type="submit" className="sm:w-fit">
                  <Send className="size-4" />
                  إرسال الطلب
                </Button>
                <Button type="button" variant="outline" className="sm:w-fit">
                  <MessageCircle className="size-4" />
                  مراسلة الدعم
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card key={method.title} className="shadow-sm">
                <CardContent className="flex items-start gap-3 p-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{method.title}</p>
                    <p className="text-sm leading-6 text-muted-foreground">{method.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <FAQ embedded />
    </main>
  );
};

export default ContactUs;
