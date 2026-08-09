import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Zap, ShieldCheck, CheckCircle2, Laptop, FileCheck, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'سياسة التسليم وتوفير الخدمة الرقمية | خطة',
  description: 'سياسة التسليم وتوفير الخدمات الرقمية السحابية (SaaS Fulfillment Policy) لمنصة خطة. توضيح التفعيل الفوري الإلكتروني.',
};

export default function FulfillmentPolicyPage() {
  return (
    <PublicLayout>
      <div dir="rtl" className="w-full bg-background text-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          
          <div className="text-center space-y-3">
            <Badge variant="outline" className="text-xs font-semibold px-3 py-1 gap-1.5 mx-auto">
              <Zap className="size-3.5 text-primary" />
              <span>التسليم الإلكتروني الفوري</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              سياسة التسليم وتوفير الخدمة (Fulfillment Policy)
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              تاريخ آخر تحديث: 9 أغسطس 2026 | آليات وضوابط تفعيل وتسليم الخدمات البرمجية السحابية (SaaS).
            </p>
          </div>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Laptop className="size-4 text-primary" />
                <span>طبيعة وشروط تسليم الخدمات الرقمية</span>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                توضح هذه السياسة آلية تفعيل الاشتراكات والخدمات الرقمية السحابية فور الشراء.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6 text-sm text-foreground leading-relaxed">
              
              <section className="space-y-2">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>1. التفعيل الفوري الإلكتروني (Instant Digital Access)</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  بما أن منصة خطة توفر خدماتها كمنصة سحابية عبر البرمجيات (SaaS)، يتم تفعيل حسابك، ترقية سعة المشاريع، وفتح جميع الأدوات المشمولة في باقتك <strong>فورياً في نفس اللحظة</strong> بمجرد تأكيد عملية الخصم بنجاح عبر بوابات الدفع الإلكترونية المعتمدة.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-border/40">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>2. عدم وجود شحن فيزيائي (No Physical Shipping)</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  جميع الخدمات والمخرجات رقمية بالكامل وتعمل عبر متصفح الويب. لا توجد أي منتجات مادية أو شحن جثماني أو رسوم شحن إضافية.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-border/40">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <FileCheck className="size-4 text-emerald-600" />
                  <span>3. الفواتير وإيصالات التأكيد</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  فور إتمام الخصم، يتم إرسال فاتورة إلكترونية رسمية وإيصال الدفع تلقائياً إلى بريدك الإلكتروني المسجل، وتكون متوفرة أيضاً للتنزيل دائماً من صفحة "الحساب والفوترة".
                </p>
              </section>

              <div className="pt-6 border-t border-border/40 bg-muted/30 p-4 rounded-xl space-y-2 text-xs">
                <h3 className="font-bold text-foreground flex items-center gap-1.5">
                  <Mail className="size-4 text-primary" />
                  <span>الدعم الفني ومتابعة التفعيل:</span>
                </h3>
                <p className="text-muted-foreground">في حال حدوث أي تأخير تقني نادر في التفعيل، يرجى مراسلتنا فوراً عبر: <a href="mailto:support@khttah.com" className="text-primary font-bold underline">support@khttah.com</a></p>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </PublicLayout>
  );
}
