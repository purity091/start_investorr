import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const metadata = {
  title: 'سياسة الخصوصية وحماية البيانات | خطة',
  description: 'تعرف على سياسة الخصوصية وحماية البيانات المعمول بها في منصة خطة والتزامنا التام بحفظ وسرية مشاريعك والمعاملات المكونة عبر Stripe.',
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div dir="rtl" className="w-full bg-background text-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-8">
          
          {/* Header Badge & Title */}
          <div className="text-center space-y-3">
            <Badge variant="outline" className="text-xs font-semibold px-3 py-1 gap-1.5 mx-auto">
              <ShieldCheck className="size-3.5 text-primary" />
              <span>الأمان وحماية البيانات</span>
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              سياسة الخصوصية وحماية البيانات (Privacy Policy)
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
              تاريخ آخر تحديث: 9 أغسطس 2026 | وثيقة معتمدة وممتثلة لاشتراطات بوابة الدفع Stripe وحماية الخصوصية السحابية.
            </p>
          </div>

          <Card className="border-border/70 shadow-xs">
            <CardHeader className="border-b border-border/40 pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Lock className="size-4 text-primary" />
                <span>الالتزام التام بالسرية والأمان</span>
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                تلتزم منصة خطة لحلول الأعمال البرمجية (SaaS) بحماية خصوصية بيانات المستخدمين والمشاريع وفق أعلى المعايير القياسية.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6 text-sm text-foreground leading-relaxed">
              
              <section className="space-y-2">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>1. البيانات التي نجمعها</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  نحن نجمع البيانات الضرورية لتقديم وتفعيل الخدمة البرمجية فقط:
                </p>
                <ul className="list-disc pr-6 space-y-1.5 text-xs text-muted-foreground">
                  <li><strong>معلومات الحساب:</strong> الاسم، البريد الإلكتروني، ورقم الهاتف عند التسجيل.</li>
                  <li><strong>بيانات المشاريع والدراسات:</strong> البيانات التي يدخلها المستخدم لبناء نموذج العمل التجاري (BMC) وحسابات الإيرادات.</li>
                  <li><strong>معلومات الفوترة والتسديد:</strong> تتم معالجة المعاملات المالية مشفرة بالكامل عبر معالج الدفع العالمي <strong>Stripe</strong>. <u>نحن لا نخزن أرقام البطاقات البنكية أو رموز CVC على خوادمنا نهائياً.</u></li>
                </ul>
              </section>

              <section className="space-y-2 pt-4 border-t border-border/40">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>2. سرية بيانات المشاريع (السرية الحصرية 100%)</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  أفكار مشروعك ودراساتك ملكية حصرية لك 100%. نستخدم تقنيات التشفير السحابي وإدارات العزل السحابي (Row-Level Security - RLS). لا يمتلك أي طرف ثالث، ولا يمتلك موظف الدعم، أي صلاحية للاطلاع على مشاريعك إلا بناءً على طلبك الصريح لمساعدتك تقنياً.
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-border/40">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>3. عدم مشاركة أو بيع البيانات</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  نلتزم بشكل قاطع بعدم بيع أو تأجير أو مشاركة بياناتك الشخصية أو التجارية مع أي طرف ثالث لأغراض تسويقية. يتم مشاركة الحد الأدنى التشفيري من البيانات مع مزودي الخدمات المعتمدين فقط (مثل بوابة Stripe لتسديد الاشتراكات).
                </p>
              </section>

              <section className="space-y-2 pt-4 border-t border-border/40">
                <h2 className="text-base font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  <span>4. حقوقك الكاملة في تعديل وحذف البيانات</span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  يحق لك في أي وقت الدخول إلى حسابك، تعديل بياناتك، تصدير خططك، أو تقديم طلب حذف شامل ودائم لبياناتك وحسابك من خوادمنا (Right to be Forgotten).
                </p>
              </section>

              {/* Company Contact Info for Stripe */}
              <div className="pt-6 border-t border-border/40 bg-muted/30 p-4 rounded-xl space-y-2 text-xs">
                <h3 className="font-bold text-foreground flex items-center gap-1.5">
                  <Mail className="size-4 text-primary" />
                  <span>بيانات التواصل والمسؤولية القانونية:</span>
                </h3>
                <p className="text-muted-foreground">منصة خطة لتطوير وتخطيط المشاريع (Khttah SaaS Platform)</p>
                <p className="text-muted-foreground">البريد الإلكتروني المخصص للخصوصية: <a href="mailto:support@khttah.com" className="text-primary font-bold underline">support@khttah.com</a></p>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </PublicLayout>
  );
}
