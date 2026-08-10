import React from 'react';
import { Download, Eye, FileText, Lock, Printer, Scale, Shield, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/separator';

const principles = [
  { title: 'وضوح البيانات', description: 'يعرف المستخدم ما الذي يقدمه ولماذا يستخدم داخل المنصة.', icon: Eye },
  { title: 'تقليل الجمع', description: 'يتم طلب المعلومات الضرورية لبناء تجربة دراسة الجدوى فقط.', icon: Shield },
  { title: 'صلاحيات محددة', description: 'يجب أن تبنى الصلاحيات لاحقاً بما يناسب الاشتراكات وأدوار المستخدمين.', icon: UserCheck },
];

const sections = [
  {
    title: 'نطاق الوثيقة',
    icon: FileText,
    body:
      'هذه الصفحة تصف تصور واجهة سياسة الخصوصية وشروط الاستخدام داخل المنصة. عند تنفيذ المنتج برمجياً يجب مراجعتها قانونياً وربطها بالسياسات الفعلية للشركة.',
  },
  {
    title: 'البيانات التي قد يشاركها المستخدم',
    icon: Lock,
    body:
      'قد تتضمن البيانات اسم المشروع، وصف الفكرة، معلومات السوق، ملاحظات دراسة الجدوى، وتفضيلات الهوية البصرية. الهدف من عرضها في الواجهة هو تنظيم رحلة المستخدم وليس تنفيذ تخزين فعلي حالياً.',
  },
  {
    title: 'استخدام المعلومات داخل المنصة',
    icon: Shield,
    body:
      'تستخدم المعلومات لتخصيص الواجهات، بناء ملخصات المشروع، تجهيز التقارير، وتحسين وضوح القرارات. أي استخدام فعلي للبيانات يجب أن يكون موثقاً عند بناء المنطق الخلفي.',
  },
  {
    title: 'حقوق المستخدم',
    icon: UserCheck,
    body:
      'ينبغي أن يستطيع المستخدم لاحقاً مراجعة بياناته، تعديلها، طلب حذفها، ومعرفة حالة اشتراكه ومخرجاته من لوحة التحكم المخصصة له.',
  },
  {
    title: 'شروط الاستخدام',
    icon: Scale,
    body:
      'المنصة تساعد في التفكير والتنظيم ولا تعد بديلاً عن الاستشارة القانونية أو المالية أو الاستثمارية المتخصصة. القرارات النهائية تبقى مسؤولية المستخدم.',
  },
];

export const PrivacyTerms: React.FC = () => {
  return (
    <main className="app-page-shell-wide space-y-6 text-right" dir="rtl">
      <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border/60">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">الخصوصية وشروط الاستخدام</h1>
              <p className="text-sm leading-7 text-muted-foreground">
                عرض منظم وخفيف للسياسات التي يحتاجها المستخدم قبل مشاركة معلومات مشروعه أو استخدام أدوات دراسة الجدوى.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" size="sm">
              <Printer className="size-4" />
              طباعة
            </Button>
            <Button size="sm">
              <Download className="size-4" />
              تنزيل نسخة
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {principles.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="shadow-sm">
              <CardContent className="flex items-start gap-3 p-4">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                  <Icon className="size-4" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>نص الوثيقة</CardTitle>
          <CardDescription>تقسيم واضح يسهل تحويله لاحقاً إلى صفحة قانونية نهائية.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <section key={section.title} className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground">
                    <Icon className="size-4" />
                  </div>
                  <h2 className="text-base font-semibold text-foreground">{section.title}</h2>
                </div>
                <p className="max-w-5xl text-sm leading-7 text-muted-foreground">{section.body}</p>
                {index < sections.length - 1 && <Separator />}
              </section>
            );
          })}
        </CardContent>
      </Card>
    </main>
  );
};

export default PrivacyTerms;
