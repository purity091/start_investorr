import {
  ArrowLeft,
  BarChart3,
  Bookmark,
  BrainCircuit,
  CheckCircle2,
  Compass,
  FileText,
  Layers3,
  Palette,
  Rocket,
  Search,
  Sparkles,
  Target,
} from 'lucide-react';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

type HomeProps = {
  setActiveTab: (tab: string) => void;
  onCompanyClick?: (id: string) => void;
};

const START_PATHS = [
  {
    title: 'لا أعرف من أين أبدأ',
    description: 'ابدأ بأسئلة بسيطة تحوّل الفكرة الضبابية إلى اتجاه مشروع أولي قابل للنقاش.',
    action: 'ابدأ بالنموذج السهل',
    tab: 'new-plan-family',
    icon: Sparkles,
  },
  {
    title: 'لدي فكرة وأريد اختبارها',
    description: 'افهم السوق، المشاكل، والفرص قبل أن تكتب خطة طويلة أو تبني منتجاً غير واضح.',
    action: 'استكشف السوق',
    tab: 'market-discovery',
    icon: Compass,
  },
  {
    title: 'أريد بناء دراسة جدوى منظمة',
    description: 'انتقل إلى أدوات بناء المشروع: النموذج الاحترافي، BMC، وMIT 24 Steps.',
    action: 'بناء دراسة جدوى',
    tab: 'new-plan-pro',
    icon: FileText,
  },
];

const PLATFORM_TOOLS = [
  { title: 'مشاريعي', description: 'راجع المشاريع المحفوظة وعد إلى آخر نقطة عمل.', tab: 'my-plans', icon: Bookmark },
  { title: 'المشاكل والفرص', description: 'اكتشف مشاكل سوقية قابلة للتحويل إلى مشاريع.', tab: 'problem-engine', icon: Search },
  { title: 'نموذج العمل BMC', description: 'رتّب العملاء، القيمة، الإيرادات، والموارد في لوحة واحدة.', tab: 'new-plan-bmc', icon: Layers3 },
  { title: 'الهوية البصرية', description: 'حوّل اتجاه المشروع إلى brief واضح للمصمم.', tab: 'brand-identity', icon: Palette },
  { title: 'رادار اليونيكورن', description: 'قارن مؤشرات المشروع مع نماذج نمو عالية.', tab: 'unicorn-benchmark', icon: BarChart3 },
  { title: 'MIT 24 Steps', description: 'اتبع منهجية منظمة لبناء مشروع قابل للنمو.', tab: 'new-plan-mit24', icon: Rocket },
  { title: 'Lean Startup', description: 'دورة تفاعلية لاختبار الفرضيات قبل التنفيذ.', tab: 'new-plan-lean', icon: Sparkles },
];

const MINDSET_STEPS = [
  'توضيح الفكرة بدل الدوران حولها',
  'فهم السوق قبل كتابة الخطة',
  'اختيار نموذج عمل قابل للتنفيذ',
  'تحويل القرارات إلى مشروع محفوظ',
];

export const Home = ({ setActiveTab }: HomeProps) => {
  return (
    <main dir="rtl" className="min-h-screen bg-background pb-24 text-right">
      <div className="app-page-shell-wide space-y-8 py-8">
        <section className="rounded-lg bg-background px-1 py-2">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
            <div className="max-w-5xl">
              <Badge variant="secondary" className="h-7 px-3 text-[11px]">
                منصة تحويل التردد إلى مشروع واضح
              </Badge>
              <h1 className="mt-4 max-w-4xl text-3xl font-black tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                حوّل فكرتك إلى مشروع قابل للتنفيذ
              </h1>
              <p className="mt-4 max-w-3xl text-sm font-medium leading-8 text-muted-foreground sm:text-base">
                ابدأ من أي نقطة: فكرة جديدة، أو فرصة في السوق، أو مشروع قائم. تساعدك منصة خطة على تحليل السوق، وبناء نموذج العمل، وإعداد دراسة جدوى احترافية خطوة بخطوة، باستخدام أدوات ذكية تقودك إلى قرار استثماري واثق.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button size="lg" onClick={() => setActiveTab('new-plan-family')}>
                  <Sparkles size={16} />
                  ابدأ أول مشروع
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab('market-discovery')}>
                  <Compass size={16} />
                  استكشف المنصة
                </Button>
              </div>
            </div>

            <div className="rounded-lg bg-muted/55 p-5">
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-background p-2 text-foreground shadow-sm">
                  <BrainCircuit size={18} />
                </span>
                <div>
                  <p className="text-sm font-black text-foreground">تغيير طريقة التفكير</p>
                  <p className="text-xs font-medium text-muted-foreground">من فكرة مبعثرة إلى قرار مشروع</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {MINDSET_STEPS.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-lg bg-background px-3 py-3 shadow-sm">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-primary text-[11px] font-black text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-3 lg:grid-cols-3">
          {START_PATHS.map((path) => {
            const Icon = path.icon;
            return (
              <button
                key={path.title}
                type="button"
                onClick={() => setActiveTab(path.tab)}
                className="group rounded-lg bg-muted/55 p-5 text-right transition hover:bg-muted"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-md bg-background p-3 text-foreground shadow-sm">
                    <Icon size={20} />
                  </span>
                  <ArrowLeft className="mt-2 text-muted-foreground transition group-hover:-translate-x-1" size={17} />
                </div>
                <h2 className="mt-5 text-lg font-black text-foreground">{path.title}</h2>
                <p className="mt-2 min-h-[72px] text-sm font-medium leading-7 text-muted-foreground">{path.description}</p>
                <span className="mt-5 inline-flex items-center rounded-md bg-background px-3 py-2 text-xs font-bold text-foreground shadow-sm">
                  {path.action}
                </span>
              </button>
            );
          })}
        </section>

        <section className="rounded-lg bg-background p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-black text-foreground">ماذا تستطيع أن تفعل داخل المنصة؟</h2>
              <p className="mt-2 text-sm font-medium leading-7 text-muted-foreground">
                أدوات قليلة وواضحة تقود المستخدم حسب المرحلة، بدون ازدحام في الصفحة الرئيسية.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setActiveTab('my-plans')}>
              <Target size={16} />
              متابعة مشاريعي
            </Button>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {PLATFORM_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.title}
                  type="button"
                  onClick={() => setActiveTab(tool.tab)}
                  className="rounded-lg bg-muted/55 p-4 text-right transition hover:bg-muted"
                >
                  <div className="flex items-start gap-3">
                    <span className="rounded-md bg-background p-2 text-foreground shadow-sm">
                      <Icon size={17} />
                    </span>
                    <div>
                      <h3 className="text-sm font-black text-foreground">{tool.title}</h3>
                      <p className="mt-1 text-[13px] font-medium leading-6 text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="grid gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-lg bg-primary p-5 text-primary-foreground">
            <h2 className="text-xl font-black">الهدف من الصفحة الرئيسية</h2>
            <p className="mt-3 text-sm font-medium leading-7 text-primary-foreground/75">
              ليست صفحة إعلانات. هي نقطة دخول للقرار: ماذا أفعل الآن؟ أين أبدأ؟ وما الأداة المناسبة لوضعي الحالي؟
            </p>
            <Button className="mt-5" variant="secondary" onClick={() => setActiveTab('new-plan-family')}>
              <CheckCircle2 size={16} />
              ابدأ بخطوة بسيطة
            </Button>
          </div>

          <div className="rounded-lg bg-muted/55 p-5">
            <h2 className="text-xl font-black text-foreground">رحلة المستخدم المقترحة</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ['أفهم وضعي', 'النموذج السهل يحدد الفكرة والسوق والعميل.'],
                ['أبحث عن فرصة', 'استكشاف السوق والمشاكل يفتحان اتجاهات قابلة للبناء.'],
                ['أبني النموذج', 'BMC وMIT 24 Steps يحولان الفكرة إلى هيكل عمل.'],
                ['أجهز للتسليم', 'الهوية والرادار يرفعان وضوح المشروع قبل العرض.'],
              ].map(([title, description]) => (
                <div key={title} className="rounded-lg bg-background p-4 shadow-sm">
                  <p className="text-sm font-black text-foreground">{title}</p>
                  <p className="mt-2 text-[13px] font-medium leading-6 text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
