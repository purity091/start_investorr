import React from 'react';
import {
  ArrowLeft,
  BarChart3,
  Bookmark,
  BrainCircuit,
  Compass,
  FileText,
  Layers3,
  Palette,
  Rocket,
  Search,
  Sparkles,
  Target,
  Zap,
  CheckCircle2,
} from 'lucide-react';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

type HomeProps = {
  setActiveTab: (tab: string) => void;
  onCompanyClick?: (id: string) => void;
};

const START_PATHS = [
  {
    title: 'لا أعرف من أين أبدأ؟',
    subtitle: 'النموذج السهل والمبسط',
    description: 'تحويل الفكرة المبدئية إلى خطة عمل أولية واضحة عبر أسئلة تفاعلية ذكية.',
    action: 'ابدأ بالنموذج السهل',
    tab: 'new-plan-family',
    icon: Sparkles,
    badgeColor: 'bg-blue-500/10 text-blue-600',
  },
  {
    title: 'لدي فكرة وأريد اختبارها',
    subtitle: 'استكشاف السوق والفرص',
    description: 'فهم حجم السوق والآلام والمنافسين قبل البدء في كتابة الخطط التفصيلية.',
    action: 'استكشف الفرص بالسوق',
    tab: 'market-discovery',
    icon: Compass,
    badgeColor: 'bg-purple-500/10 text-purple-600',
  },
  {
    title: 'أريد بناء دراسة جدوى متكاملة',
    subtitle: 'النماذج الاحترافية (BMC & MIT)',
    description: 'صياغة أركان المشروع التسعة وفق أفضل المناهج العالمية الجاهزة للعرض والتمويل.',
    action: 'بناء دراسة جدوى',
    tab: 'new-plan-pro',
    icon: FileText,
    badgeColor: 'bg-emerald-500/10 text-emerald-600',
  },
];

const PLATFORM_TOOLS = [
  {
    title: 'نموذج العمل (BMC)',
    description: 'ترتيب أركان المشروع التسعة وحساب القيمة والإيرادات في لوحة واحدة.',
    tab: 'new-plan-bmc',
    icon: Layers3,
    color: 'text-blue-600',
    bg: 'bg-blue-500/10',
  },
  {
    title: 'الجدوى والتحليل المالي',
    description: 'حساب الإيرادات المتكررة (MRR)، نقطة التعادل، وتوقعات النمو.',
    tab: 'financial-calculator',
    icon: BarChart3,
    color: 'text-emerald-600',
    bg: 'bg-emerald-500/10',
  },
  {
    title: 'استكشاف الفرص والمشاكل',
    description: 'تحليل الآلام الحقيقية بالأسواق وتحويل المشكلات إلى مشاريع مربحة.',
    tab: 'problem-engine',
    icon: Search,
    color: 'text-amber-600',
    bg: 'bg-amber-500/10',
  },
  {
    title: 'منهجية MIT (24 خطوة)',
    description: 'مسار ريادي متكامل لبناء وتنمية المشاريع عالية النمو.',
    tab: 'new-plan-mit24',
    icon: Rocket,
    color: 'text-purple-600',
    bg: 'bg-purple-500/10',
  },
  {
    title: 'مشاريعي المحفوظة',
    description: 'الوصول لكافة مشاريعك ودراساتك السابقة ومتابعة التعديلات.',
    tab: 'my-plans',
    icon: Bookmark,
    color: 'text-indigo-600',
    bg: 'bg-indigo-500/10',
  },
  {
    title: 'استوديو الهوية البصرية',
    description: 'تحديد نبرة صوت المشروع وإعداد دليل الهوية الأولية.',
    tab: 'brand-identity',
    icon: Palette,
    color: 'text-pink-600',
    bg: 'bg-pink-500/10',
  },
  {
    title: 'خريطة التنفيذ (90 يوماً)',
    description: 'تحويل دراسة الجدوى إلى مهام تنفيذية مرحلية لأول 3 أشهر.',
    tab: 'first-90-days',
    icon: Target,
    color: 'text-rose-600',
    bg: 'bg-rose-500/10',
  },
  {
    title: 'رادار الشركات والنمو',
    description: 'مقارنة أداء مشروعك ومؤشراته مع أفضل نماذج النمو.',
    tab: 'unicorn-benchmark',
    icon: BrainCircuit,
    color: 'text-teal-600',
    bg: 'bg-teal-500/10',
  },
];

const EXECUTION_STEPS = [
  { step: '1', title: 'توضيح الفكرة', desc: 'صياغة الرؤية والقيمة الفريدة للمشروع' },
  { step: '2', title: 'تحليل السوق', desc: 'استكشاف الفرص والمنافسين وتحديد العميل' },
  { step: '3', title: 'نموذج العمل', desc: 'هيكلة BMC وحساب الجدوى المالية' },
  { step: '4', title: 'خريطة التنفيذ', desc: 'جدولة خطة إطلاق 90 يوماً واثقة' },
];

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  return (
    <main dir="rtl" className="min-h-screen bg-background pb-16 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10 space-y-8 sm:space-y-12">
        
        {/* HERO HEADER - Simplified Concept & Direct Action */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-muted/40 p-6 sm:p-10 shadow-2xs border-0">
          <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <Badge variant="secondary" className="px-3.5 py-1 text-xs font-bold gap-1.5 border-0 bg-primary/10 text-primary">
                <Zap className="size-3.5" />
                <span>المنصة الأولى لبناء وتخطيط المشاريع</span>
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-[1.2]">
                مسارك الذكي لبناء <span className="text-primary">دراسة الجدوى</span> ونموذج العمل
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground font-medium leading-relaxed max-w-2xl">
                تساعدك منصة "خطة" على تحويل الأفكار الاستثمارية إلى دراسات منظمة وقرارات واثقة، عبر أدوات تفاعلية تبدأ من استكشاف السوق وحتى صياغة نموذج العمل والتخطيط المالي.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button size="lg" onClick={() => setActiveTab('new-plan-family')} className="font-extrabold text-sm h-12 px-7 gap-2 shadow-2xs cursor-pointer">
                  <Sparkles className="size-4" />
                  <span>ابدأ مشروعك الآن</span>
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveTab('market-discovery')} className="font-bold text-sm h-12 px-7 gap-2 cursor-pointer bg-background">
                  <Compass className="size-4 text-primary" />
                  <span>استكشف الفرص والسوق</span>
                </Button>
              </div>
            </div>

            {/* 4-Step Simplified Execution Roadmap Strip */}
            <div className="lg:col-span-5 bg-background/80 backdrop-blur-md rounded-2xl p-5 sm:p-6 shadow-2xs border-0 space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-3">
                <h3 className="text-sm font-black text-foreground flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" />
                  <span>رحلة بناء المشروع في خطة</span>
                </h3>
                <span className="text-[11px] font-bold text-muted-foreground">4 خطوات مبسطة</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {EXECUTION_STEPS.map((item) => (
                  <div key={item.step} className="p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="size-5 rounded-md bg-primary text-primary-foreground font-black text-[10px] flex items-center justify-center">
                        {item.step}
                      </span>
                      <span className="text-xs font-black text-foreground">{item.title}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium leading-tight">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 3 MAIN START PATHWAYS */}
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-foreground">اختر مسار البدء المناسب لك</h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">حدد من أين تريد الانطلاق وستوجهك المنصة للأداة الأنسب</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {START_PATHS.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.title}
                  onClick={() => setActiveTab(path.tab)}
                  className="group rounded-3xl bg-card hover:bg-muted/50 p-6 sm:p-7 shadow-2xs transition-all duration-200 border-0 flex flex-col justify-between space-y-6 cursor-pointer text-right"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-black ${path.badgeColor}`}>
                        {path.subtitle}
                      </span>
                      <div className="p-3 rounded-2xl bg-muted/60 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-2xs">
                        <Icon className="size-5" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-black text-foreground group-hover:text-primary transition-colors">
                        {path.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                        {path.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="ghost" size="sm" className="w-full text-xs font-bold justify-between p-0 hover:bg-transparent text-primary group-hover:translate-x-[-2px] transition-transform">
                      <span>{path.action}</span>
                      <ArrowLeft className="size-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DIRECT TOOLKIT GRID */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-black text-foreground">أدوات منصة خطة المباشرة</h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium">وصول سريع لكافة أدوات ونماذج البناء داخل اللوحة</p>
            </div>

            <Button variant="outline" size="sm" onClick={() => setActiveTab('my-plans')} className="font-bold text-xs gap-1.5 bg-background">
              <Bookmark className="size-3.5 text-primary" />
              <span>مشاريعي المحفوظة</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {PLATFORM_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.title}
                  onClick={() => setActiveTab(tool.tab)}
                  className="p-5 rounded-2xl bg-card hover:bg-muted/60 transition-all shadow-2xs border-0 cursor-pointer space-y-3 group text-right flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl ${tool.bg} ${tool.color} shadow-2xs`}>
                        <Icon className="size-4.5" />
                      </div>
                      <ArrowLeft className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all" />
                    </div>

                    <h4 className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
};
