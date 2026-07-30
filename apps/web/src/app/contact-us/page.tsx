import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-24 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-6 text-primary border-primary/30 bg-primary/5">تواصل معنا</Badge>
          <h1 className="text-4xl md:text-5xl font-black mb-6">نحن هنا <span className="text-primary">لمساعدتك</span></h1>
          <p className="text-lg text-muted-foreground">لديك استفسار، اقتراح، أو تحتاج إلى مساعدة في مشروعك؟ فريقنا جاهز للرد على جميع تساؤلاتك.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          <div className="md:col-span-2 space-y-8">
            <div className="bg-muted/20 p-8 rounded-2xl border border-border/50">
              <h3 className="text-xl font-bold mb-6">معلومات التواصل</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">البريد الإلكتروني</h4>
                    <p className="text-muted-foreground text-sm mb-2">للأسئلة العامة والدعم الفني:</p>
                    <a href="mailto:support@khotta.com" className="text-primary font-medium hover:underline" dir="ltr">support@khotta.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <MessageSquare className="size-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">المبيعات والشراكات</h4>
                    <p className="text-muted-foreground text-sm mb-2">لباقات الشركات والجامعات:</p>
                    <a href="mailto:business@khotta.com" className="text-primary font-medium hover:underline" dir="ltr">business@khotta.com</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 bg-card p-8 md:p-10 rounded-3xl border border-border/50 shadow-sm">
            <h3 className="text-2xl font-bold mb-8">أرسل لنا رسالة</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold">الاسم الكامل</label>
                  <Input placeholder="الاسم" className="h-12 bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">البريد الإلكتروني</label>
                  <Input placeholder="البريد الإلكتروني" type="email" className="h-12 bg-muted/50 text-left" dir="ltr" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">الموضوع</label>
                <Input placeholder="كيف يمكننا مساعدتك؟" className="h-12 bg-muted/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">الرسالة</label>
                <textarea 
                  className="w-full min-h-[150px] p-4 rounded-xl border border-input bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-y"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>
              <Button type="button" size="lg" className="w-full h-14 text-base font-bold">
                إرسال الرسالة
              </Button>
            </form>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
