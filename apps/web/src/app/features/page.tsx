import React from 'react';
import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { createMetadata } from '@/lib/seo';
import {
  Brain,
  BarChart3,
  Sparkles,
  PieChart,
  FileText,
  Palette,
  ShieldCheck,
  Zap,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  Target,
  Globe,
} from 'lucide-react';

export const metadata = createMetadata({
  title: 'مميزات منصة خطة لدراسات الجدوى وتحليل المشاريع',
  description:
    'تعرف على أدوات منصة خطة لبناء دراسات الجدوى، نماذج العمل، التوقعات المالية، تحليل السوق، واستكشاف الفرص الاستثمارية باستخدام الذكاء الاصطناعي.',
  path: '/features',
  keywords: ['مميزات دراسة جدوى', 'أدوات تحليل مالي', 'منصة دراسات جدوى', 'نموذج العمل التجاري', 'ذكاء اصطناعي للأعمال'],
});

const mainFeatures = [
  {
    icon: Brain,
    title: 'محرك دراسات الجدوى الذكي',
    description: 'تحليل شامل للفكرة الاستثمارية مع إعداد الهيكل المالي، التشغيلي، والتسويقي خلال دقائق معدودة معتمد على بيانات السوق الحية.',
    badge: 'الذكاء الاصطناعي',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: BarChart3,
    title: 'التوقعات والتحليلات المالية',
    description: 'حساب دقيق لنسب الربحية، نقطة التعادل، التكاليف الرأسمالية والتشغيلية، مع تدفقات نقدية متوقعة لخمس سنوات قادمة.',
    badge: 'مالية متقدمة',
    color: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    icon: Target,
    title: 'استوديو نموذج العمل (BMC)',
    description: 'بناء واختبار شرائح العملاء، القيمة المضافة، قنوات التوزيع، ومصادر الإيرادات عبر نموذج عمل تجاري تفاعلي وسلس.',
    badge: 'تفاعلي',
    color: 'bg-amber-500/10 text-amber-600',
  },
  {
    icon: Palette,
    title: 'استوديو الهوية البصرية',
    description: 'توليد واختيار الألوان، الخطوط، ونبرة الصوت المناسبة لمشروعك بما يتوافق مع السوق المستهدف والهوية التجارية.',
    badge: 'تصميم',
    color: 'bg-purple-500/10 text-purple-600',
  },
  {
    icon: Globe,
    title: 'رادار أبحاث ودراسات السوق',
    description: 'استكشاف المشكلات الواقعية في السوق والفرص المتاحة، ودراسة المنافسين المباشرين وغير المباشرين في المنطقة العربية.',
    badge: 'بيانات حية',
    color: 'bg-blue-500/10 text-blue-600',
  },
  {
    icon: FileText,
    title: 'مشاركة وتصدير الروابط التفاعلية',
    description: 'مشاركة الخطط ودراسات الجدوى عبر روابط تفاعلية آمنة وسريعة للعرض على المستثمرين وحاضنات الأعمال.',
    badge: 'روابط تفاعلية',
    color: 'bg-rose-500/10 text-rose-600',
  },
];

const featureHighlights = [
  'دعم كامل للأسواق العربية (السعودية، الإمارات، مصر، سوريا، الخليج)',
  'تحليل الماطر وسيناريوهات التفاؤل والتحفظ المالي',
  'تحديثات فورية ومزامنة آلية لقاعدة البيانات',
  'حماية وأمان عالي للمعلومات والبيانات المالية',
  'إمكانية المشاركة مع الشركاء والمستثمرين عبر روابط آمنة',
];

export default function FeaturesPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden bg-muted/30 border-b border-border/50">
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/30 text-primary">
            <Sparkles className="size-3.5 ml-1.5 inline" />
            أدوات متكاملة لبناء مشاريع ناجحة
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-tight">
            كل ما تحتاجه لتحويل الفكرة إلى <span className="text-primary">مشروع استثماري ناجح</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            منصة خطة تزودك بأحدث الأدوات الذكية والنماذج المالية المعتمدة لإعداد دراسات جدوى احترافية بأعلى دقة وسرعة.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="gap-2 shadow-md">
                تجربة المنصة مجاناً
                <ArrowLeft className="size-4" />
              </Button>
            </Link>
            <Link href="/pricing-plans">
              <Button size="lg" variant="outline">
                عرض خطط الأسعار
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            أدوات مصممة خصيصاً للمستثمرين ورواد الأعمال
          </h2>
          <p className="mt-4 text-muted-foreground">
            تدمج المنصة بين التحليل المالي الدقيق والذكاء الاصطناعي لتوفير تجربة استثنائية.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mainFeatures.map((feat) => {
            const Icon = feat.icon;
            return (
              <Card key={feat.title} className="border-border/70 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                <CardHeader className="text-right">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`size-12 rounded-xl flex items-center justify-center ${feat.color}`}>
                      <Icon className="size-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-semibold">{feat.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold">{feat.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-right">
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {feat.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-muted/40 border-y border-border/60">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-2 items-center">
          <div className="text-right space-y-6">
            <Badge variant="secondary">لماذا منصة خطة؟</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              أرقام ودراسات تثق بها الجهات التمويلية والمستثمرون
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              تعتمد المنصة على معايير الجدوى الدولية مع تخصيص شامل للأسواق والأنظمة في الشرق الأوسط وشمال أفريقيا، مما يضمن تقارير موثوقة وعالية الجودة.
            </p>
            <ul className="space-y-3 pt-2">
              {featureHighlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm space-y-6 text-right">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                98%
              </div>
              <div>
                <h4 className="font-bold text-foreground">دقة التوقعات المالية</h4>
                <p className="text-xs text-muted-foreground">تطابق عالي مع نتائج المشاريع الفعلية بالسوق.</p>
              </div>
            </div>
            <hr className="border-border/60" />
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                10x
              </div>
              <div>
                <h4 className="font-bold text-foreground">توفير الوقت والجهد</h4>
                <p className="text-xs text-muted-foreground">إنجاز الدراسة خلال ساعات بدلاً من أسابيع من الانتظار.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto rounded-3xl bg-primary/5 border border-primary/20 p-8 sm:p-12 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-foreground">
            جاهز لبدء دراسة مشروعك القادم؟
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            انضم إلى آلاف المستثمرين ورواد الأعمال الذين يثقون بمنصة خطة لتطوير أعمالهم.
          </p>
          <Link href="/login">
            <Button size="lg" className="gap-2 text-base px-8 mt-2">
              ابدأ الآن مجاناً
              <ArrowLeft className="size-5" />
            </Button>
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}
