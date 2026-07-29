import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowRight, CheckCircle2, DollarSign, Users, Globe, ExternalLink, Lightbulb, Rocket, Settings, Info, Building2, UserCircle2, Code, ShieldCheck, FileText, Check, TrendingUp, Search, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProvenProjectProps {
  project: any;
  onBack: () => void;
}

const getToolColor = (tool: string) => {
  const t = tool.toLowerCase();
  if (t.includes('react') || t.includes('expo') || t.includes('stripe')) return "bg-blue-100 text-blue-700 border-blue-200";
  if (t.includes('supabase') || t.includes('google') || t.includes('excel')) return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (t.includes('vercel') || t.includes('retool')) return "bg-slate-100 text-slate-700 border-slate-200";
  if (t.includes('موبايل') || t.includes('تطبيقات')) return "bg-purple-100 text-purple-700 border-purple-200";
  return "bg-primary/10 text-primary border-primary/20";
};

export const ProvenProjectProfile: React.FC<ProvenProjectProps> = ({ project, onBack }) => {
  const [activeId, setActiveId] = useState<string>('company');
  const containerRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  // Scroll-based sticky: track window scroll and fix the TOC panel manually
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !tocRef.current) return;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const headerHeight = 100; // header ~96px
      if (containerTop <= headerHeight) {
        tocRef.current.style.position = 'fixed';
        tocRef.current.style.top = `${headerHeight}px`;
        tocRef.current.style.width = '200px';
      } else {
        tocRef.current.style.position = 'relative';
        tocRef.current.style.top = '0';
        tocRef.current.style.width = 'auto';
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      { root: null, rootMargin: '-20% 0px -60% 0px' }
    );

    const elements = document.querySelectorAll('.profile-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { id: 'overview', label: 'نظرة عامة' },
    { id: 'company', label: 'حقائق الشركة' },
    { id: 'problem-and-product', label: 'المشكلة والمنتج' },
    { id: 'origin-story', label: 'المؤسس وقصة البداية' },
    { id: 'build-and-launch', label: 'البناء والإطلاق' },
    { id: 'costs-and-operations', label: 'التكاليف والتشغيل' },
    { id: 'monetization', label: 'نموذج الربح والتسعير' },
    { id: 'growth', label: 'النمو والاستحواذ' },
    { id: 'tools', label: 'التقنيات والأدوات' },
    { id: 'revenue-timeline', label: 'المخطط الزمني للإيرادات' },
    { id: 'lessons', label: 'دروس مستفادة' },
    { id: 'sources', label: 'المصادر' },
    { id: 'data-quality', label: 'دقة البيانات' },
  ];

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 font-sans pb-32">

      {/* Top Alert & Back */}
      <div className="flex flex-col gap-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors w-fit"
        >
          <ArrowRight className="size-4" />
          العودة للقائمة
        </button>

        <div className="flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-blue-900 shadow-sm">
          <div className="mt-0.5 text-blue-500">
            <Search className="size-5" />
          </div>
          <p className="text-[13.5px] font-medium leading-relaxed">
            <strong className="font-bold text-slate-900">ملف مدروس.</strong> قام نظام الذكاء الاصطناعي الخاص بنا بتجميع هذه الصفحة من مصادر عامة — لم يقم المؤسس بكتابتها. قد تخطئ الأنظمة الآلية في قراءة بعض البيانات، لذا تعامل مع الأرقام كأفضل تقدير.
          </p>
        </div>
      </div>

      {/* Layout Grid */}
      <div ref={containerRef} className="grid lg:grid-cols-[220px_1fr] gap-10 mt-6 items-start relative">

        {/* Sidebar TOC placeholder to maintain grid space */}
        <aside className="hidden lg:block" style={{ minHeight: '1px' }}>
          <div ref={tocRef} className="flex flex-col gap-2">
            <h3 className="font-bold text-sm text-foreground mb-2">محتويات دراسة الحالة</h3>
            <div className="flex flex-col border-r-2 border-muted pr-4 gap-1 relative">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full text-right py-1.5 text-[13.5px] transition-all focus:outline-none relative",
                    activeId === item.id
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground font-medium"
                  )}
                >
                  {activeId === item.id && (
                    <span className="absolute right-[-18px] top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-full shadow-sm" />
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content Sections */}
        <div className="flex flex-col gap-10 min-w-0">

          <section id="overview" className="profile-section scroll-mt-24 pb-10 border-b border-slate-100">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6 justify-between">
                <div className="flex items-start gap-5">
                  <div className="flex items-center justify-center size-20 rounded-2xl bg-blue-600 text-white text-4xl font-serif shadow-md shrink-0">
                    {project.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col gap-2 pt-1">
                    <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                      {project.name}
                      <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 p-1.5 rounded-lg">
                        <ExternalLink className="size-5" />
                      </a>
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-0 font-bold px-3 py-1 text-[13px]">
                        {project.category}
                      </Badge>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-0 font-bold px-3 py-1 text-[13px]">
                        {project.company.customer_type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-[16px] leading-relaxed font-medium max-w-3xl">
                {project.summary}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">الإيرادات الشهرية</span>
                  <span className="text-2xl font-black text-emerald-600">{project.directory_snapshot.monthly_revenue.split(' ')[0]}</span>
                </div>
                <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">المؤسس</span>
                  <span className="text-xl font-black text-slate-900">{project.company.founder}</span>
                </div>
                <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">نموذج العمل</span>
                  <span className="text-lg font-black text-slate-900 line-clamp-1" title={project.company.business_model}>{project.company.business_model}</span>
                </div>
                <div className="flex flex-col gap-1.5 p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">الإطلاق</span>
                  <span className="text-xl font-black text-slate-900">{project.company.started}</span>
                </div>
              </div>
            </div>
          </section>

          <section id="company" className="profile-section scroll-mt-24">
            <Card className="shadow-sm border-border overflow-hidden">
              <CardHeader className="border-b border-border/50 bg-slate-50/80 pb-4">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                    <Building2 className="size-5" />
                  </div>
                  حقائق الشركة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-border/50">
                  <div className="p-5 hover:bg-muted/20 transition-colors">
                    <dt className="text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">نموذج العمل</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.business_model}</dd>
                  </div>
                  <div className="p-5 hover:bg-muted/20 transition-colors">
                    <dt className="text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">نوع العميل</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.customer_type}</dd>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border/50 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-border/50">
                  <div className="p-5 hover:bg-muted/20 transition-colors">
                    <dt className="text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">المؤسس</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.founder}</dd>
                  </div>
                  <div className="p-5 hover:bg-muted/20 transition-colors">
                    <dt className="text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">التأسيس</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.started}</dd>
                  </div>
                  <div className="p-5 hover:bg-muted/20 transition-colors">
                    <dt className="text-xs font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">حجم الفريق</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.founders_count} مؤسس • {project.company.employees}</dd>
                  </div>
                </div>
                <div className="grid grid-cols-1 border-t border-border/50">
                  <div className="p-5 bg-emerald-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <dt className="text-xs font-bold text-emerald-700 mb-1.5 uppercase tracking-wider">الربحية والإيراد المعلن</dt>
                      <dd className="font-black text-base text-emerald-950">{project.company.public_revenue_claim}</dd>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0 pointer-events-none">
                      {project.company.funding}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="problem-and-product" className="profile-section scroll-mt-24 pb-10 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <Lightbulb className="size-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">المشكلة والمنتج</h2>
            </div>
            <ul className="space-y-4 pr-11 border-r-2 border-amber-50 py-2">
              {project.problem_and_product.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2.5 size-1.5 rounded-full bg-amber-300 shrink-0" />
                  <p className="text-[15px] text-slate-700 font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="origin-story" className="profile-section scroll-mt-24 pb-10 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <UserCircle2 className="size-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">المؤسس وقصة البداية</h2>
            </div>
            <ul className="space-y-4 pr-11 border-r-2 border-indigo-50 py-2">
              {project.origin_story.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2.5 size-1.5 rounded-full bg-indigo-300 shrink-0" />
                  <p className="text-[15px] text-slate-700 font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="build-and-launch" className="profile-section scroll-mt-24 pb-10 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
                <Rocket className="size-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">البناء والإطلاق</h2>
            </div>
            <div className="relative border-r-2 border-violet-100 pr-11 py-2 space-y-6">
              {project.build_and_launch.map((item: string, i: number) => {
                const parts = item.split(': ');
                const date = parts.length > 1 ? parts[0] : null;
                const text = parts.length > 1 ? parts.slice(1).join(': ') : item;

                return (
                  <div key={i} className="relative">
                    <div className="absolute w-2 h-2 bg-violet-400 rounded-full -right-[49px] top-2 ring-4 ring-white" />
                    {date && <h4 className="text-[13px] font-black text-violet-600 mb-1.5 uppercase tracking-wide">{date}</h4>}
                    <p className="text-[15px] text-slate-700 font-medium leading-relaxed">{text}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="costs-and-operations" className="profile-section scroll-mt-24 pb-10 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                <Settings className="size-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">التكاليف والتشغيل</h2>
            </div>
            <ul className="space-y-4 pr-11 border-r-2 border-slate-100 py-2">
              {project.costs_and_operations.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2.5 size-1.5 rounded-full bg-slate-300 shrink-0" />
                  <p className="text-[15px] text-slate-700 font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="monetization" className="profile-section scroll-mt-24 pb-10 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <DollarSign className="size-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">نموذج الربح والتسعير</h2>
            </div>
            <ul className="space-y-4 pr-11 border-r-2 border-emerald-50 py-2">
              {project.monetization.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2.5 size-1.5 rounded-full bg-emerald-300 shrink-0" />
                  <p className="text-[15px] text-slate-700 font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="growth" className="profile-section scroll-mt-24 pb-10 border-b border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600">
                <Globe className="size-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">النمو والاستحواذ</h2>
            </div>
            <ul className="space-y-4 pr-11 border-r-2 border-cyan-50 py-2">
              {project.growth.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2.5 size-1.5 rounded-full bg-cyan-300 shrink-0" />
                  <p className="text-[15px] text-slate-700 font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="tools" className="profile-section scroll-mt-24">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3 text-foreground">
              <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
                <Code className="size-5" />
              </div>
              التقنيات والأدوات المستخدمة
            </h3>
            <div className="flex flex-wrap gap-3 p-6 rounded-2xl bg-muted/10 border border-border/50">
              {project.tools.map((tool: string, i: number) => (
                <Badge key={i} variant="outline" className={cn("text-sm font-bold px-4 py-2 rounded-xl border shadow-sm transition-transform hover:scale-105", getToolColor(tool))}>
                  {tool}
                </Badge>
              ))}
            </div>
          </section>

          <section id="revenue-timeline" className="profile-section scroll-mt-24">
            <h3 className="text-2xl font-black mb-6 text-foreground">المخطط الزمني للإيرادات</h3>
            <div className="grid gap-4">
              {project.revenue_timeline.map((rt: any, i: number) => (
                <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-8 p-6 rounded-2xl border border-border/60 bg-gradient-to-l from-muted/5 to-transparent shadow-sm">
                  <div className="md:w-32 shrink-0">
                    <Badge variant="outline" className="bg-background text-sm font-black border-border shadow-sm px-3 py-1 text-muted-foreground">{rt.date}</Badge>
                  </div>
                  <div className="flex flex-col">
                    <div className="text-3xl font-black text-emerald-600">{rt.amount}</div>
                    <div className="text-xs font-bold text-slate-500 uppercase mt-2 mb-1 bg-slate-100 w-fit px-2 py-0.5 rounded-md">{rt.type}</div>
                    <div className="text-base font-medium text-foreground leading-relaxed mt-2">{rt.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="lessons" className="profile-section scroll-mt-24">
            <Card className="shadow-md border-emerald-200">
              <CardHeader className="border-b border-emerald-100 bg-emerald-500 pb-5">
                <CardTitle className="text-xl font-black flex items-center gap-3 text-white">
                  <FileText className="size-5 text-emerald-100" />
                  خلاصة الدروس المستفادة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-emerald-50/30">
                <ul className="space-y-4">
                  {project.lessons.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-emerald-100 text-emerald-950 leading-relaxed font-bold text-base shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                        <Check className="size-5" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <section id="sources" className="profile-section scroll-mt-24">
              <h3 className="text-lg font-bold mb-4 text-foreground">المصادر (Sources)</h3>
              <div className="grid gap-3">
                {project.sources.map((src: any, i: number) => (
                  <div key={i} className="p-4 border border-border/60 rounded-xl bg-muted/10 hover:bg-muted/20 transition-colors">
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline flex items-center justify-between mb-1">
                      {src.label}
                      <ExternalLink className="size-3" />
                    </a>
                    <p className="text-xs font-medium text-muted-foreground">{src.coverage}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="data-quality" className="profile-section scroll-mt-24">
              <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                <ShieldCheck className="size-4" />
                دقة البيانات
              </h3>
              <ul className="space-y-3 p-4 border border-border/60 rounded-xl bg-muted/10">
                {project.data_quality.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] font-medium text-muted-foreground leading-relaxed">
                    <div className="size-1.5 rounded-full bg-slate-300 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};
