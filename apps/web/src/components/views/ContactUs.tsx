import React, { useState } from 'react';
import { Clock, Mail, MapPin, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import FAQ from './FAQ';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const WHATSAPP_NUMBER = '963936638280';

const contactMethods = [
  { title: 'المراسلة المباشرة', value: 'مراسلة فورية مع مستشار', icon: MessageCircle, link: `https://wa.me/${WHATSAPP_NUMBER}` },
  { title: 'البريد الإلكتروني', value: 'support@khotta.sa', icon: Mail, link: 'mailto:support@khotta.sa' },
  { title: 'ساعات العمل', value: 'الأحد إلى الخميس، 9 صباحاً - 6 مساءً', icon: Clock },
  { title: 'الموقع', value: 'الرياض، المملكة العربية السعودية', icon: MapPin },
];

export const ContactUs: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [requestType, setRequestType] = useState('guidance');
  const [projectStage, setProjectStage] = useState('idea');
  const [message, setMessage] = useState('');

  const sendToWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const typeLabels: Record<string, string> = {
      guidance: 'توجيه لاختيار المسار',
      subscription: 'استفسار اشتراك',
      report: 'مخرجات وتقرير',
      other: 'طلب آخر',
    };

    const stageLabels: Record<string, string> = {
      idea: 'فكرة أولية',
      study: 'بناء دراسة جدوى',
      launch: 'التحضير للإطلاق',
      growth: 'مشروع قائم',
    };

    const formattedMessage = [
      '📌 *طلب استفسار جديد عبر منصة خطة*',
      '',
      `👤 *الاسم:* ${fullName.trim() || 'غير محدد'}`,
      `📧 *البريد الإلكتروني:* ${email.trim() || 'غير محدد'}`,
      `🏷️ *نوع الطلب:* ${typeLabels[requestType] || requestType}`,
      `🚀 *مرحلة المشروع:* ${stageLabels[projectStage] || projectStage}`,
      '',
      '📝 *الرسالة:*',
      message.trim() || 'طلب التواصل والمساعدة المباشرة',
      '',
      '--------------------------------',
      '🌐 مرسل عبر منصة خطة',
    ].join('\n');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="w-full space-y-3 sm:space-y-4 px-1 py-2 sm:px-2 pb-16 text-right font-['IBM_Plex_Sans_Arabic']" dir="rtl">
      {/* Top Banner Header - Clean Shadcn Styling */}
      <section className="rounded-lg bg-card p-3 sm:p-4 border-0 shadow-2xs">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl space-y-1.5">
            <Badge variant="secondary" className="w-fit text-[11px] font-bold">المراسلة والدعم</Badge>
            <div className="space-y-1">
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">نساعدك على اختيار المسار المناسب</h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                أرسل استفسارك أو طلبك، وسنوجهك مباشرة إلى الأداة المناسبة داخل المنصة أو نوضح لك أفضل طريقة لبدء دراسة جدوى مشروعك.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground shrink-0 self-start lg:self-auto">
            <ShieldCheck className="size-3.5 text-primary shrink-0" />
            <span>تُعالج جميع الرسائل بسرية وتنظيم تام.</span>
          </div>
        </div>
      </section>

      {/* Contact Form & Quick Action Cards */}
      <section className="grid gap-3 lg:grid-cols-12">
        <Card className="lg:col-span-8 border-0 shadow-2xs bg-card">
          <CardHeader className="p-3.5 sm:p-4 pb-2 border-0">
            <CardTitle className="text-base font-bold">إرسال طلب استفسار</CardTitle>
            <CardDescription className="text-xs">تواصل مباشرة مع المستشار الاستراتيجي عبر الخدمة المباشرة.</CardDescription>
          </CardHeader>
          <CardContent className="p-3.5 sm:p-4 pt-1">
            <form className="grid gap-3 sm:grid-cols-2" onSubmit={sendToWhatsApp}>
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-foreground">الاسم الكامل</label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="اكتب اسمك"
                  className="text-xs text-right h-9"
                />
              </div>
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-foreground">البريد الإلكتروني</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@example.com"
                  dir="ltr"
                  className="text-xs text-right h-9"
                />
              </div>
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-foreground">نوع الطلب</label>
                <Select value={requestType} onValueChange={setRequestType}>
                  <SelectTrigger className="text-xs text-right h-9">
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
              <div className="space-y-1 text-right">
                <label className="text-xs font-bold text-foreground">مرحلة المشروع</label>
                <Select value={projectStage} onValueChange={setProjectStage}>
                  <SelectTrigger className="text-xs text-right h-9">
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
              <div className="space-y-1 sm:col-span-2 text-right">
                <label className="text-xs font-bold text-foreground">الرسالة</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="اشرح ما تحتاجه باختصار..."
                  className="text-xs leading-relaxed text-right min-h-20"
                />
              </div>
              <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row pt-1">
                <Button type="submit" size="sm" className="sm:w-fit font-bold text-xs gap-1.5 cursor-pointer">
                  <Send className="size-3.5" />
                  إرسال الرسالة
                </Button>
                <Button
                  type="button"
                  onClick={() => sendToWhatsApp()}
                  variant="outline"
                  size="sm"
                  className="sm:w-fit font-bold text-xs gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="size-3.5 text-primary" />
                  مراسلة مباشرة
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contact Method Quick Cards */}
        <div className="lg:col-span-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card
                key={method.title}
                className={`border-0 shadow-2xs bg-card ${method.link ? 'cursor-pointer hover:bg-muted/50 transition-colors' : ''}`}
                onClick={() => {
                  if (method.link) window.open(method.link, '_blank');
                }}
              >
                <CardContent className="flex items-center gap-3 p-3 text-right">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <p className="text-xs font-bold text-foreground">{method.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate font-medium">{method.value}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Embedded FAQ */}
      <FAQ embedded />
    </main>
  );
};

export default ContactUs;
