import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { RefreshCw, ShieldCheck, CheckCircle2, CreditCard, Clock, Mail, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'سياسة الاسترجاع والإلغاء في منصة خطة',
  description:
    'تعرف على سياسة الاسترجاع والإلغاء في منصة خطة، شروط استرداد المدفوعات، إلغاء الاشتراك، وآلية التعامل مع خدمات SaaS الرقمية.',
  path: '/refund-policy',
  keywords: ['سياسة الاسترجاع', 'إلغاء الاشتراك', 'استرداد المدفوعات', 'باقات خطة', 'SaaS refund policy'],
});

export default function RefundPolicyPage() {
  return (
    <PublicLayout>
      <div dir="rtl" className="w-full bg-background text-foreground py-14 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">

          {/* Hero Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              سياسة الاسترجاع والإلغاء
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
              تاريخ آخر تحديث: 9 أغسطس 2026 | سياسة وإجراءات إلغاء الاشتراكات واسترداد المبالغ المالـية بأمان.
            </p>
          </div>

          {/* Main Content Area - Frameless & Modern Layout */}
          <div className="space-y-6">

            {/* Banner Statement Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-muted/40 text-foreground space-y-3">
              <div className="flex items-center gap-2 text-primary font-black text-base">
                <CreditCard className="size-5 text-primary" />
                <span>شروط إلغاء الاشتراكات واسترداد الأموال</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                نحن نضمن حماية حقوق العميل ومرونة كاملة في إدارة الاشتراكات والاسترداد المالي دون تعقيدات وبكل شفافية.
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
                  <span>1. ضمان استرداد الأموال خلال 14 يوماً (14-Day Guarantee)</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  نقدم ضمان استرداد الأموال بنسبة 100% لجميع المشتركين الجدد خلال <strong>14 يوماً</strong> من الشراء الأول دون الحاجة لإبداء أسباب معقدة، شريطة الالتزام بسياسات الاستخدام المشروعة.
                </p>
              </div>

              {/* Section 2 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <RefreshCw className="size-4" />
                  </div>
                  <span>2. حرية إلغاء الاشتراك في أي وقت</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  يمكنك إلغاء التجديد التلقائي لاشتراكك في أي وقت بنقرة زر من قسم "إعدادات الحساب" دون أي رسوم إلغاء أو جزاءات. تستمر في الاستفادة من مميزات باقتك الحالية حتى نهاية الدورة المدفوعة.
                </p>
              </div>

              {/* Section 3 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                    <Clock className="size-4" />
                  </div>
                  <span>3. مدة وطريقة إعادة المبلغ المسترد</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  يتم إرجاع المبلغ المسترد إلى <strong>بطاقة الدفع الأصلية</strong> حصراً من خلال بوابات الدفع الإلكترونية المشفرة والمعتمدة. يستغرق ظهور المبلغ في حسابك البنكي عادةً ما بين <strong>5 إلى 10 أيام عمل</strong> حسب إجراءات البنك المصدر لبطاقتك.
                </p>
              </div>

            </div>

            {/* Company Contact Box */}
            <div className="p-6 rounded-3xl bg-primary/5 text-foreground space-y-2">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <span>طلب استرداد أو استفسار مالي:</span>
              </h3>
              <p className="text-xs text-muted-foreground">لتقديم طلب استرداد يرجى مراسلتنا مع ذكر بريد حسابك على: <a href="mailto:support@khttah.com" className="text-primary font-bold underline">support@khttah.com</a></p>
            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
