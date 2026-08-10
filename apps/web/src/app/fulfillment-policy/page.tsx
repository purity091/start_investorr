import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Zap, ShieldCheck, CheckCircle2, Laptop, FileCheck, Mail, Send } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'سياسة التسليم وتفعيل الخدمة الرقمية في منصة خطة',
  description:
    'تعرف على آلية تسليم وتفعيل خدمات منصة خطة الرقمية، تفعيل الحسابات والاشتراكات، وإتاحة أدوات دراسات الجدوى بعد الدفع.',
  path: '/fulfillment-policy',
  keywords: ['سياسة التسليم الرقمي', 'تفعيل اشتراك SaaS', 'توفير الخدمة الرقمية', 'منصة خطة'],
});

export default function FulfillmentPolicyPage() {
  return (
    <PublicLayout>
      <div dir="rtl" className="w-full bg-background text-foreground py-14 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          
          {/* Hero Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              سياسة التسليم وتوفير الخدمة
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
              تاريخ آخر تحديث: 9 أغسطس 2026 | آليات وضوابط تفعيل وتسليم الخدمات البرمجية السحابية (SaaS).
            </p>
          </div>

          {/* Main Content Area - Frameless & Modern Layout */}
          <div className="space-y-6">

            {/* Banner Statement Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-muted/40 text-foreground space-y-3">
              <div className="flex items-center gap-2 text-primary font-black text-base">
                <Laptop className="size-5 text-primary" />
                <span>طبيعة وشروط تسليم الخدمات الرقمية</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                توضح هذه السياسة آلية تفعيل الاشتراكات والخدمات الرقمية السحابية فور الشراء، ودون أي رسوم شحن مادية.
              </p>
            </div>

            {/* Policy Sections Grid */}
            <div className="space-y-4 text-sm leading-relaxed">

              {/* Section 1 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="size-4" />
                  </div>
                  <span>1. التفعيل الفوري الإلكتروني (Instant Digital Access)</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  بما أن منصة خطة توفر خدماتها كمنصة سحابية عبر البرمجيات (SaaS)، يتم تفعيل حسابك، ترقية سعة المشاريع، وفتح جميع الأدوات المشمولة في باقتك <strong>فورياً في نفس اللحظة</strong> بمجرد تأكيد عملية الخصم بنجاح عبر بوابات الدفع الإلكترونية المعتمدة.
                </p>
              </div>

              {/* Section 2 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Send className="size-4" />
                  </div>
                  <span>2. عدم وجود شحن فيزيائي (No Physical Shipping)</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  جميع الخدمات والمخرجات رقمية بالكامل وتعمل عبر متصفح الويب. لا توجد أي منتجات مادية أو شحن جثماني أو رسوم شحن إضافية.
                </p>
              </div>

              {/* Section 3 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                    <FileCheck className="size-4" />
                  </div>
                  <span>3. الفواتير وإيصالات التأكيد</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  فور إتمام الخصم، يتم إرسال فاتورة إلكترونية رسمية وإيصال الدفع تلقائياً إلى بريدك الإلكتروني المسجل، وتكون متوفرة أيضاً للتنزيل دائماً من صفحة "الحساب والفوترة".
                </p>
              </div>

            </div>

            {/* Company Contact Box */}
            <div className="p-6 rounded-3xl bg-primary/5 text-foreground space-y-2">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <span>الدعم الفني ومتابعة التفعيل:</span>
              </h3>
              <p className="text-xs text-muted-foreground">في حال حدوث أي تأخير تقني نادر في التفعيل، يرجى مراسلتنا فوراً عبر: <a href="mailto:support@khttah.com" className="text-primary font-bold underline">support@khttah.com</a></p>
            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
