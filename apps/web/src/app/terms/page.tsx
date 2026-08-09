import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { FileText, ShieldCheck, Scale, CheckCircle2, Mail, Award, CreditCard, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'شروط وأحكام الخدمة | خطة',
  description: 'شروط وأحكام الاستخدام المعتمدة لمنصة خطة SaaS. اطلع على الحقوق والالتزامات والملكية الفكرية وضوابط الخدمة.',
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <div dir="rtl" className="w-full bg-background text-foreground py-14 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">
          
          {/* Hero Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              شروط وأحكام الخدمة
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
              تاريخ آخر تحديث: 9 أغسطس 2026 | القواعد والضوابط المنظمة لاستخدام خدمات منصة خطة.
            </p>
          </div>

          {/* Main Content Area - Frameless & Modern Layout */}
          <div className="space-y-6">

            {/* Banner Statement Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-muted/40 text-foreground space-y-3">
              <div className="flex items-center gap-2 text-primary font-black text-base">
                <FileText className="size-5 text-primary" />
                <span>اتفاقية الاستخدام والالتزامات القانونية</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                تحدد هذه الاتفاقية الضوابط المنظمة بين منصة خطة والمستخدمين والشركات المشتركة وضمان الحقوق والملكية الفكرية لجميع الأطراف.
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
                  <span>1. قبول الشروط وتأهيل الحساب</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  بإنشائك حساباً في منصة خطة، فإنك توافق على الالتزام الكامل بهذه الشروط. يجب أن تملك الأهلية القانونية الكاملة وتكون بالغاً سن 18 عاماً على الأقل أو تملك تفويضاً رسمياً لإبرام العقود نيابة عن شركتك.
                </p>
              </div>

              {/* Section 2 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Award className="size-4" />
                  </div>
                  <span>2. ملكية البيانات والملكية الفكرية</span>
                </h2>
                <ul className="list-disc pr-6 space-y-2 text-xs sm:text-sm text-muted-foreground font-medium">
                  <li><strong>ملكية العميل 100%:</strong> يمتلك العميل كامل حقوق الملكية الفكرية والتجارية لجميع دراسات الجدوى ونماذج الأعمال التي ينشئها على المنصة.</li>
                  <li><strong>ملكية المنصة:</strong> تحتفظ المنصة بحقوق الملكية الفكرية الخاصة بالأكواد البرمجية، الخوارزميات، التصاميم، والعلامة التجارية.</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                    <CreditCard className="size-4" />
                  </div>
                  <span>3. اشتراكات الباقات والدفع</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  تتوفر المنصة عبر باقات متدرجة (رائد، مؤسس، قائد). يتم الدفع ومعالجة الفواتير بأمان من خلال بوابات الدفع الإلكترونية المشفرة والمعتمدة. تتجدد الاشتراكات دورياً وفق خيارك (شهري أو سنوي) ويمكنك إيقاف التجديد في أي وقت من لوحة حسابك.
                </p>
              </div>

              {/* Section 4 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <AlertCircle className="size-4" />
                  </div>
                  <span>4. الاستخدام المقبول وإخلاء المسؤولية الاستثمارية</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  تُقدم النماذج والحسابات المالية في المنصة لأغراض تخطيطية وتحليلية استرشادية. تقع مسؤولية التحقق الميداني والاتخاذ النهائي للقرارات الاستثمارية على عاتق رائد الأعمال والمستثمر، ولا تتحمل المنصة مسؤولية أي قرارات استثمارية خارجية.
                </p>
              </div>

            </div>

            {/* Company Contact Box */}
            <div className="p-6 rounded-3xl bg-primary/5 text-foreground space-y-2">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <span>تواصل معنا للاستفسارات القانونية:</span>
              </h3>
              <p className="text-xs text-muted-foreground">البريد الإلكتروني للدعم الفني والقانوني: <a href="mailto:support@khttah.com" className="text-primary font-bold underline">support@khttah.com</a></p>
            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
