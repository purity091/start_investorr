import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Mail, Sparkles, Database, UserCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'سياسة الخصوصية وحماية البيانات في منصة خطة',
  description:
    'تعرف على سياسة الخصوصية وحماية البيانات في منصة خطة، وكيف نحمي بيانات مشاريعك ودراسات الجدوى والحسابات والمعاملات.',
  path: '/privacy',
  keywords: ['سياسة الخصوصية', 'حماية بيانات المشاريع', 'خصوصية دراسة الجدوى', 'أمان منصة خطة'],
});

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div dir="rtl" className="w-full bg-background text-foreground py-14 sm:py-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-10">

          {/* Hero Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground">
              سياسة الخصوصية وحماية البيانات
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto font-medium leading-relaxed">
              تاريخ آخر تحديث: 9 أغسطس 2026 | إرشادات وضوابط حماية البيانات والتشفير السحابي المعتمدة منصة خطة.
            </p>
          </div>

          {/* Main Content Area - Frameless & Modern Layout */}
          <div className="space-y-6">

            {/* Banner Statement Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-muted/40 text-foreground space-y-3">
              <div className="flex items-center gap-2 text-primary font-black text-base">
                <Lock className="size-5 text-primary" />
                <span>الالتزام التام بالسرية والأمان</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                تلتزم منصة خطة لحلول الأعمال البرمجية (SaaS) بحماية خصوصية بيانات المستخدمين والمشاريع وفق أعلى المعايير القياسية العالمية. أفكارك وبياناتك المالية مشفرة ومحفوطة بأمان.
              </p>
            </div>

            {/* Policy Sections Grid */}
            <div className="space-y-4 text-sm leading-relaxed">

              {/* Section 1 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Database className="size-4" />
                  </div>
                  <span>1. البيانات التي نجمعها</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  نحن نجمع البيانات الضرورية لتقديم وتفعيل الخدمة البرمجية فقط:
                </p>
                <ul className="list-disc pr-6 space-y-2 text-xs sm:text-sm text-muted-foreground font-medium">
                  <li><strong>معلومات الحساب:</strong> الاسم، البريد الإلكتروني، ورقم الهاتف عند التسجيل.</li>
                  <li><strong>بيانات المشاريع والدراسات:</strong> البيانات التي يدخلها المستخدم لبناء نموذج العمل التجاري (BMC) وحسابات الإيرادات.</li>
                  <li><strong>معلومات الفوترة والتسديد:</strong> تتم معالجة المعاملات المالية مشفرة بالكامل عبر بوابات الدفع المشفرة والمعتمدة عالمياً. <u>نحن لا نخزن أرقام البطاقات البنكية أو رموز CVC على خوادمنا نهائياً.</u></li>
                </ul>
              </div>

              {/* Section 2 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Lock className="size-4" />
                  </div>
                  <span>2. سرية بيانات المشاريع (السرية الحصرية 100%)</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  أفكار مشروعك ودراساتك ملكية حصرية لك 100%. نستخدم تقنيات التشفير السحابي وإدارات العزل السحابي (Row-Level Security - RLS). لا يمتلك أي طرف ثالث، ولا يمتلك موظف الدعم، أي صلاحية للاطلاع على مشاريعك إلا بناءً على طلبك الصريح لمساعدتك تقنياً.
                </p>
              </div>

              {/* Section 3 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                    <Eye className="size-4" />
                  </div>
                  <span>3. عدم مشاركة أو بيع البيانات</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  نلتزم بشكل قاطع بعدم بيع أو تأجير أو مشاركة بياناتك الشخصية أو التجارية مع أي طرف ثالث لأغراض تسويقية. يتم مشاركة الحد الأدنى التشفيري من البيانات مع مزودي بوابات الدفع المشفرة المعتمدين فقط.
                </p>
              </div>

              {/* Section 4 */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card text-card-foreground shadow-2xs space-y-3">
                <h2 className="text-base font-black text-foreground flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                    <UserCheck className="size-4" />
                  </div>
                  <span>4. حقوقك الكاملة في تعديل وحذف البيانات</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  يحق لك في أي وقت الدخول إلى حسابك، تعديل بياناتك، تصدير خططك، أو تقديم طلب حذف شامل ودائم لبياناتك وحسابك من خوادمنا (Right to be Forgotten).
                </p>
              </div>

            </div>

            {/* Company Contact Box */}
            <div className="p-6 rounded-3xl bg-primary/5 text-foreground space-y-2">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <span>بيانات التواصل والمسؤولية القانونية:</span>
              </h3>
              <p className="text-xs text-muted-foreground">منصة خطة لتطوير وتخطيط المشاريع (Khttah SaaS Platform)</p>
              <p className="text-xs text-muted-foreground">البريد الإلكتروني المخصص للخصوصية: <a href="mailto:support@khttah.com" className="text-primary font-bold underline">support@khttah.com</a></p>
            </div>

          </div>

        </div>
      </div>
    </PublicLayout>
  );
}
