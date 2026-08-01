import React from 'react';
import {
  Zap,
  Compass,
  BarChart3,
  Brain,
  ArrowLeft,
  Star,
  CheckCircle2,
  TrendingUp,
  Shield,
  Globe,
  Sparkles,
  Users,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import { cn } from '@/lib/utils';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
  onAuthRequested?: (mode: 'login' | 'signup') => void;
}

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '+500', label: 'دراسة جدوى مكتملة' },
  { value: '100+', label: 'قطاع استثماري' },
  { value: '4', label: 'منهجيات علمية' },
  { value: '97%', label: 'رضا المستخدمين' },
];

// ── Features ───────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Brain,
    title: 'تحليل استراتيجي بالذكاء الاصطناعي',
    description: 'منصة خطة تستخدم أحدث نماذج الذكاء الاصطناعي لتحليل السوق وتقييم فرص الاستثمار بدقة علمية.',
    tab: 'new-plan-pro',
    color: 'text-violet-600',
    bg: 'bg-violet-50 border-violet-100',
  },
  {
    icon: Compass,
    title: 'رادار استكشاف 100+ قطاع',
    description: 'استعرض بيانات سوقية حية لأكثر من مئة قطاع اقتصادي، مع مؤشرات النمو والمخاطر والمنافسين.',
    tab: 'market-discovery',
    color: 'text-sky-600',
    bg: 'bg-sky-50 border-sky-100',
  },
  {
    icon: BarChart3,
    title: 'مقارنة مع معايير الشركات الكبرى',
    description: 'رادار اليونيكورن يتيح لك قياس مشروعك بمعايير الشركات العملاقة واكتشاف نقاط القوة والضعف.',
    tab: 'unicorn-benchmark',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50 border-emerald-100',
  },
  {
    icon: Sparkles,
    title: 'نماذج جدوى متعددة المنهجيات',
    description: 'من النموذج السهل لرواد الأعمال المبتدئين، إلى MIT 24 Steps للمشاريع التقنية المتقدمة.',
    tab: 'new-plan-family',
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-100',
  },
];

// ── Methods ────────────────────────────────────────────────────────────────────
const METHODS = [
  {
    id: '01',
    title: 'النموذج السهل',
    subtitle: 'لكل رائد أعمال',
    description: 'دراسة جدوى كاملة بخطوات مبسّطة مع توجيه ذكي، مثالي للمشاريع الصغيرة والمتوسطة.',
    tab: 'new-plan-family',
    badge: 'الأكثر شيوعاً',
  },
  {
    id: '02',
    title: 'النموذج الاحترافي',
    subtitle: 'للمستثمر المتمرس',
    description: 'تحليل معمّق للسوق والتدفقات النقدية وتقييم المخاطر بأسلوب مؤسسي احترافي.',
    tab: 'new-plan-pro',
  },
  {
    id: '03',
    title: 'MIT 24 Steps',
    subtitle: 'منهجية MIT العالمية',
    description: 'المنهجية الأكاديمية لمعهد MIT لبناء شركات تقنية قابلة للتوسع على المستوى العالمي.',
    tab: 'new-plan-mit24',
    badge: 'MIT',
  },
  {
    id: '04',
    title: 'Business Model Canvas',
    subtitle: 'تصور استراتيجي كامل',
    description: 'نموذج العمل التفاعلي الذي يساعدك على تصور كل جانب من جوانب مشروعك دفعة واحدة.',
    tab: 'new-plan-bmc',
  },
];

// ── Trust items ────────────────────────────────────────────────────────────────
const TRUST = [
  { icon: Shield, text: 'بياناتك آمنة ومشفرة بالكامل' },
  { icon: Globe, text: 'يعمل بدون اتصال بالإنترنت' },
  { icon: TrendingUp, text: 'تقارير قابلة للتصدير PDF' },
  { icon: Users, text: 'دعم فني عربي على مدار الساعة' },
];

// ─────────────────────────────────────────────────────────────────────────────

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab, activeTab, onAuthRequested }) => {
  const handleCtaClick = (tab: string) => {
    // Protected tabs should open auth modal if onAuthRequested is provided
    // Otherwise fall back to setActiveTab (which has its own route guard)
    setActiveTab(tab);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <LandingNavbar activeTab={activeTab} setActiveTab={setActiveTab} onAuthRequested={onAuthRequested} />

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-background">
        {/* Subtle grid bg */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative mx-auto flex max-w-screen-2xl flex-col items-center px-4 pb-20 pt-24 text-center sm:px-6 lg:px-8 lg:pb-28 lg:pt-32 xl:px-12 2xl:px-16">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            <span className="flex size-1.5 rounded-full bg-emerald-500" />
            منصة دراسات الجدوى الأولى عربياً
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              جديد
            </span>
          </div>

          {/* Headline */}
          <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[80px]">
            من الفكرة إلى
            <br />
            <span className="text-primary">دراسة الجدوى الكاملة</span>
            <br />
            في دقائق
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl 2xl:text-2xl 2xl:max-w-3xl">
            خطة هي المنصة الذكية لرواد الأعمال العرب — تحليل السوق، بناء نموذج العمل، واتخاذ قرار الاستثمار
            بثقة ومنهجية علمية.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button
              size="lg"
              onClick={() => handleCtaClick('new-plan-family')}
              className="h-12 gap-2 px-8 text-base shadow-lg"
            >
              <Zap className="size-4" />
              ابدأ دراستك مجاناً
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setActiveTab('market-discovery')}
              className="h-12 gap-2 px-8 text-base"
            >
              <Compass className="size-4" />
              استكشف القطاعات
              <ChevronLeft className="size-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Trust line */}
          <p className="mt-5 text-xs text-muted-foreground">
            لا تحتاج بطاقة ائتمانية · مجاناً للأبد في الخطة الأساسية
          </p>

          {/* Stats row */}
          <div className="mt-16 grid w-full max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20 2xl:max-w-3xl">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-muted/30 px-4 py-5"
              >
                <span className="text-2xl font-black text-foreground lg:text-3xl">{s.value}</span>
                <span className="text-center text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 xl:px-12 2xl:px-16">
        <div className="mb-12 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">الميزات</p>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            كل ما تحتاجه في مكان واحد
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            منصة متكاملة تجمع أدوات التحليل والبحث وبناء الخطة في تجربة واحدة سلسة
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <button
                key={f.title}
                onClick={() => setActiveTab(f.tab)}
                className={cn(
                  'group flex flex-col gap-4 rounded-2xl border p-6 text-right transition-all hover:shadow-md hover:-translate-y-0.5',
                  f.bg,
                )}
              >
                <span
                  className={cn(
                    'flex size-11 items-center justify-center rounded-xl border bg-background shadow-sm',
                    f.bg.replace('bg-', 'border-'),
                  )}
                >
                  <Icon className={cn('size-5', f.color)} />
                </span>
                <div>
                  <h3 className="mb-1.5 text-sm font-bold text-foreground">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{f.description}</p>
                </div>
                <span className={cn('flex items-center gap-1 text-xs font-semibold', f.color)}>
                  اكتشف أكثر
                  <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" />
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Methods ──────────────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto max-w-screen-2xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 xl:px-12 2xl:px-16">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-primary">المنهجيات</p>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              أربع منهجيات علمية لكل حاجة
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.tab)}
                className="group flex flex-col gap-5 rounded-2xl border border-border bg-background p-6 text-right transition-all hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl font-black text-muted-foreground/20">{m.id}</span>
                  {m.badge && (
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
                      {m.badge}
                    </span>
                  )}
                </div>
                <div>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                    {m.subtitle}
                  </p>
                  <h3 className="mb-2 text-base font-bold text-foreground">{m.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{m.description}</p>
                </div>
                <span className="mt-auto flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  ابدأ الآن
                  <ArrowLeft className="size-3" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28 xl:px-12 2xl:px-16">
        <div className="flex flex-col items-center gap-10 rounded-3xl border border-border bg-muted/30 p-10 text-center lg:flex-row lg:gap-16 lg:p-14 lg:text-right 2xl:p-20">
          <div className="flex-1">
            <h2 className="mb-4 text-3xl font-black tracking-tight text-foreground sm:text-4xl xl:text-5xl">
              جاهز لتحويل فكرتك<br />إلى مشروع حقيقي؟
            </h2>
            <p className="mb-6 text-base text-muted-foreground xl:text-lg">
              انضم لآلاف رواد الأعمال العرب الذين يبنون مشاريعهم بثقة مع منصة خطة.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:justify-center lg:justify-start">
              {TRUST.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.text} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 shrink-0 text-primary" />
                    {t.text}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <Button
              size="lg"
              onClick={() => handleCtaClick('new-plan-family')}
              className="h-12 gap-2 px-8 text-base shadow-lg"
            >
              <Zap className="size-4" />
              ابدأ مجاناً
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setActiveTab('pricing')}
              className="h-12 gap-2 px-8 text-base"
            >
              <Star className="size-4" />
              ترقية الخطة
            </Button>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-muted/20">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:text-right sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="size-3.5" />
            </span>
            <span className="text-sm font-black tracking-tight text-foreground">خطة</span>
            <span className="text-xs text-muted-foreground">© 2026 جميع الحقوق محفوظة</span>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <button onClick={() => setActiveTab('privacy-terms')} className="hover:text-foreground transition-colors">
              سياسة الخصوصية
            </button>
            <button onClick={() => setActiveTab('contact-us')} className="hover:text-foreground transition-colors">
              تواصل معنا
            </button>
            <button onClick={() => setActiveTab('pricing')} className="hover:text-foreground transition-colors">
              الأسعار
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
