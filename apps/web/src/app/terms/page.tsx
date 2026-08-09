import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { FileText, ShieldCheck, Scale, CheckCircle2, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'شروط وأحكام الخدمة | خطة',
  description: 'شروط وأحكام الاستخدام المعتمدة لمنصة خطة SaaS. اطلع على الحقوق والالتزامات والملكية الفكرية وضوابط الخدمة.',
};

export default function TermsPage() {
  return (
    <PublicLayout>
      <div dir="rtl" className="w-full bg-background text-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          
          <div className="text-center space-y-3">
            <Badge variant="outline" className="text-xs font-semibold px-3 py-1 gap-1.5 mx-auto">
              <Scale className="size-3.5 text-primary" />
              <span>الوثيقة التنظيمية</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              شروط وأحكام الخدمة (Terms of Service)
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              تاريخ آخر تحديث: 9 أغسطس 2026 | القواعد والضوابط المنظمة لاستخدام خدمات منصة خطة.
            </p>
          </div>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                <span>اتفاقية الاستخدام والالتزامات القانونية</span>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                تحدد هذه الاتفاقية الضوابط المنظمة بين منصة خطة والمستخدمين والشركات المشتركة.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6 text-sm text-foreground leading-relaxed">
              
              <section className="space-y-2">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>1. قبول الشروط وتأهيل الحساب</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  بإنشائك حساباً في منصة خطة، فإنك توافق على الالتزام الكامل بهذه الشروط. يجب أن تملك الأهلية القانونية الكاملة وتكون بالغاً سن 18 عاماً على الأقل أو تملك تفويضاً رسمياً لإبرام العقود نيابة عن شركتك.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-border/40">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>2. ملكية البيانات والملكية الفكرية</span>
                </h2>
                <ul className="list-disc pr-6 space-y-1.5 text-xs text-muted-foreground">
                  <li><strong>ملكية العميل 100%:</strong> يمتلك العميل كامل حقوق الملكية الفكرية والتجارية لجميع دراسات الجدوى ونماذج الأعمال التي ينشئها على المنصة.</li>
                  <li><strong>ملكية المنصة:</strong> تحتفظ المنصة بحقوق الملكية الفكرية الخاصة بالأكواد البرمجية، الخوارزميات، التصاميم، والعلامة التجارية.</li>
                </ul>
              </section>

              <section className="space-y-2 pt-4 border-t border-border/40">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>3. اشتراكات الباقات والدفع</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  تتوفر المنصة عبر باقات متدرجة (رائد، مؤسس، قائد). يتم الدفع ومعالجة الفواتير بأمان من خلال بوابات الدفع الإلكترونية المشفرة والمعتمدة. تتجدد الاشتراكات دورياً وفق خيارك (شهري أو سنوي) ويمكنك إيقاف التجديد في أي وقت من لوحة حسابك.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-border/40">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>4. الاستخدام المقبول وإخلاء المسؤولية الاستثمارية</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  تُقدم النماذج والحسابات المالية في المنصة لأغراض تخطيطية وتحليلية استرشادية. تقع مسؤولية التحقق الميداني والاتخاذ النهائي للقرارات الاستثمارية على عاتق رائد الأعمال والمستثمر، ولا تتحمل المنصة مسؤولية أي قرارات استثمارية خارجية.
                </p>
              </section>

              <div className="pt-6 border-t border-border/40 bg-muted/30 p-4 rounded-xl space-y-2 text-xs">
                <h3 className="font-bold text-foreground flex items-center gap-1.5">
                  <Mail className="size-4 text-primary" />
                  <span>تواصل معنا للاستفسارات القانونية:</span>
                </h3>
                <p className="text-muted-foreground">البريد الإلكتروني للدعم الفني والقانوني: <a href="mailto:support@khttah.com" className="text-primary font-bold underline">support@khttah.com</a></p>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </PublicLayout>
  );
}
