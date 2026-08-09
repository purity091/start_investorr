import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { RefreshCw, ShieldCheck, CheckCircle2, CreditCard, Clock, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'سياسة الاسترجاع والإلغاء | خطة',
  description: 'سياسة الاسترجاع والإلغاء الشفافة المعتمدة لمنصة خطة. ضمان استرداد 100% خلال 14 يوماً وإلغاء فوري للاشتراك.',
};

export default function RefundPolicyPage() {
  return (
    <PublicLayout>
      <div dir="rtl" className="w-full bg-background text-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          
          <div className="text-center space-y-3">
            <Badge variant="outline" className="text-xs font-semibold px-3 py-1 gap-1.5 mx-auto">
              <RefreshCw className="size-3.5 text-primary" />
              <span>المرونة والشفافية المالية</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              سياسة الاسترجاع والإلغاء (Refund & Cancellation Policy)
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              تاريخ آخر تحديث: 9 أغسطس 2026 | سياسة وإجراءات إلغاء الاشتراكات واسترداد المبالغ.
            </p>
          </div>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <CreditCard className="size-4 text-primary" />
                <span>شروط إلغاء الاشتراكات واسترداد الأموال</span>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                نحن نضمن حماية حقوق العميل ومرونة كاملة في إدارة الاشتراكات والاسترداد المالي.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6 text-sm text-foreground leading-relaxed">
              
              <section className="space-y-2">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>1. ضمان استرداد الأموال خلال 14 يوماً (14-Day Guarantee)</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  نقدم ضمان استرداد الأموال بنسبة 100% لجميع المشتركين الجدد خلال <strong>14 يوماً</strong> من الشراء الأول دون الحاجة لإبداء أسباب معقدة، شريطة الالتزام بسياسات الاستخدام المشروعة.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-border/40">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>2. حرية إلغاء الاشتراك في أي وقت</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  يمكنك إلغاء التجديد التلقائي لاشتراكك في أي وقت بنقرة زر من قسم "إعدادات الحساب" دون أي رسوم إلغاء أو جزاءات. تستمر في الاستفادة من مميزات باقتك الحالية حتى نهاية الدورة المدفوعة.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-border/40">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <Clock className="size-4 text-emerald-600" />
                  <span>3. مدة وطريقة إعادة المبلغ المسترد</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  يتم إرجاع المبلغ المسترد إلى <strong>بطاقة الدفع الأصلية</strong> حصراً من خلال بوابات الدفع الإلكترونية المشفرة والمعتمدة. يستغرق ظهور المبلغ في حسابك البنكي عادةً ما بين <strong>5 إلى 10 أيام عمل</strong> حسب إجراءات البنك المصدر لبطاقتك.
                </p>
              </section>

              <div className="pt-6 border-t border-border/40 bg-muted/30 p-4 rounded-xl space-y-2 text-xs">
                <h3 className="font-bold text-foreground flex items-center gap-1.5">
                  <Mail className="size-4 text-primary" />
                  <span>طلب استرداد أو استفسار مالي:</span>
                </h3>
                <p className="text-muted-foreground">لتقديم طلب استرداد يرجى مراسلتنا مع ذكر بريد حسابك على: <a href="mailto:support@khttah.com" className="text-primary font-bold underline">support@khttah.com</a></p>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </PublicLayout>
  );
}
