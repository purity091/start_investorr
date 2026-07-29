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

          <section id="overview" className="profile-section scroll-mt-24">
            <h2 className="text-xl font-black text-slate-900 mb-5">نظرة عامة</h2>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
              
              {/* Left Main Card */}
              <Card className="shadow-sm border-slate-200/60 overflow-hidden flex flex-col rounded-xl">
                <CardContent className="p-5 md:p-6 flex-1 flex flex-col">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="flex items-center justify-center size-14 rounded-xl bg-blue-600 text-white text-2xl font-serif shadow-sm">
                      {project.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="pt-1">
                      <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                        {project.name}
                        <a href={project.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                          <ExternalLink className="size-4" />
                        </a>
                      </h1>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-1 font-medium">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 font-bold px-2.5 py-1 text-xs whitespace-normal text-right leading-snug h-auto">
                      {project.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0 font-bold px-2.5 py-1 text-xs whitespace-normal text-right leading-snug h-auto">
                      {project.company.customer_type}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-5 border-t border-slate-100 mt-auto">
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 mb-1">تحقيق الدخل</div>
                      <div className="text-[13px] font-bold text-blue-600 leading-snug">{project.company.business_model}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 mb-1">الإطلاق</div>
                      <div className="text-[13px] font-bold text-slate-900">{project.company.started}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-slate-500 mb-1">تحديث</div>
                      <div className="text-[13px] font-bold text-slate-900">مؤخراً</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Right Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Est. Monthly Revenue */}
                <Card className="shadow-sm border-slate-200/60 hover:border-slate-300 transition-colors group cursor-default rounded-xl">
                  <CardContent className="p-4 md:p-5 flex flex-col h-full justify-center">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[13px] font-bold text-slate-900">الإيرادات الشهرية</span>
                      <ArrowUpRight className="size-3.5 text-slate-400 group-hover:text-slate-600 transition-colors -scale-x-100" />
                    </div>
                    <div className="text-2xl font-black text-slate-900 mb-1">
                      {project.directory_snapshot.monthly_revenue}
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 mb-4">
                      أرقام تقديرية
                    </div>
                    <div className="text-[11px] font-bold text-blue-600 mt-auto">
                      مستند إلى مصادر عامة
                    </div>
                  </CardContent>
                </Card>

                {/* Founder */}
                <Card className="shadow-sm border-slate-200/60 hover:border-slate-300 transition-colors group cursor-default rounded-xl">
                  <CardContent className="p-4 md:p-5 flex flex-col h-full justify-center">
                    <div className="text-[13px] font-bold text-slate-900 mb-4">المؤسس</div>
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                        <UserCircle2 className="size-5" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{project.company.founder}</div>
                        <div className="text-[11px] font-medium text-slate-500 mt-0.5">@{project.name.replace(/\s+/g, '').toLowerCase()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tools they use */}
                <Card className="shadow-sm border-slate-200/60 hover:border-slate-300 transition-colors group cursor-default rounded-xl">
                  <CardContent className="p-4 md:p-5 flex flex-col h-full justify-center">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-bold text-slate-900">الأدوات المستخدمة</span>
                      <ArrowUpRight className="size-3.5 text-slate-400 group-hover:text-slate-600 transition-colors -scale-x-100" />
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 mb-4">التقنيات · {project.tools.length} أدوات</div>
                    <div className="flex items-center gap-2 mt-auto">
                      {project.tools.slice(0, 3).map((tool: string, i: number) => (
                        <div key={i} className="size-9 rounded-lg border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700 bg-white shadow-sm" title={tool}>
                          {tool.charAt(0).toUpperCase()}
                        </div>
                      ))}
                      {project.tools.length > 3 && (
                        <div className="size-9 rounded-lg border border-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 bg-slate-50">
                          +{project.tools.length - 3}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Growth channels */}
                <Card className="shadow-sm border-slate-200/60 hover:border-slate-300 transition-colors group cursor-default rounded-xl">
                  <CardContent className="p-4 md:p-5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-bold text-slate-900">قنوات النمو</span>
                      <ArrowUpRight className="size-3.5 text-slate-400 group-hover:text-slate-600 transition-colors -scale-x-100" />
                    </div>
                    <div className="text-[11px] font-medium text-slate-500 mb-4">أهم قنوات الاستحواذ</div>
                    <div className="flex flex-col gap-2.5 mt-auto">
                      {project.growth.slice(0, 3).map((channel: string, i: number) => {
                        let Icon = Globe;
                        if (channel.toLowerCase().includes('seo') || channel.includes('بحث')) Icon = Search;
                        else if (channel.includes('social') || channel.includes('تواصل')) Icon = Users;
                        else if (channel.includes('backlink') || channel.includes('روابط')) Icon = TrendingUp;
                        return (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="shrink-0 text-slate-400 mt-0.5">
                              <Icon className="size-3.5" />
                            </div>
                            <div className="text-[13px] font-bold text-slate-700 leading-snug">{channel}</div>
                          </div>
                        );
                      })}
                      {project.growth.length > 3 && (
                        <div className="text-[11px] font-medium text-slate-400 mt-1 mr-6">
                          +{project.growth.length - 3} أخرى
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
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

          <section id="problem-and-product" className="profile-section scroll-mt-24">
            <Card className="shadow-sm border-amber-100/50">
              <CardHeader className="border-b border-border/30 bg-amber-50/30 pb-4">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                    <Lightbulb className="size-5" />
                  </div>
                  المشكلة والمنتج
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-5">
                  {project.problem_and_product.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-base text-foreground font-medium leading-relaxed">
                      <div className="mt-1 flex items-center justify-center size-5 rounded-full bg-amber-100 shrink-0">
                        <div className="size-2 rounded-full bg-amber-500" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="origin-story" className="profile-section scroll-mt-24">
            <Card className="shadow-sm border-indigo-100/50">
              <CardHeader className="border-b border-border/30 bg-indigo-50/30 pb-4">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                    <UserCircle2 className="size-5" />
                  </div>
                  المؤسس وقصة البداية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-5">
                  {project.origin_story.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-base text-foreground font-medium leading-relaxed">
                      <div className="mt-1 flex items-center justify-center size-5 rounded-full bg-indigo-100 shrink-0">
                        <div className="size-2 rounded-full bg-indigo-500" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="build-and-launch" className="profile-section scroll-mt-24">
            <Card className="shadow-sm border-violet-100/50">
              <CardHeader className="border-b border-border/30 bg-violet-50/30 pb-4">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-100 text-violet-600">
                    <Rocket className="size-5" />
                  </div>
                  البناء والإطلاق
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative border-r-2 border-violet-200/60 pr-6 space-y-8">
                  {project.build_and_launch.map((item: string, i: number) => {
                    const parts = item.split(': ');
                    const date = parts.length > 1 ? parts[0] : null;
                    const text = parts.length > 1 ? parts.slice(1).join(': ') : item;

                    return (
                      <div key={i} className="relative">
                        <div className="absolute w-4 h-4 bg-violet-500 rounded-full -right-[33px] top-1 ring-4 ring-background" />
                        {date && <h4 className="text-sm font-black text-violet-600 mb-2">{date}</h4>}
                        <p className="text-base text-foreground font-medium leading-relaxed">{text}</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="costs-and-operations" className="profile-section scroll-mt-24">
            <Card className="shadow-sm border-slate-200/60">
              <CardHeader className="border-b border-border/30 bg-slate-50/50 pb-4">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                    <Settings className="size-5" />
                  </div>
                  التكاليف والتشغيل
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-5">
                  {project.costs_and_operations.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-base text-foreground font-medium leading-relaxed">
                      <div className="mt-1 flex items-center justify-center size-5 rounded-full bg-slate-100 shrink-0">
                        <div className="size-2 rounded-full bg-slate-500" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="monetization" className="profile-section scroll-mt-24">
            <Card className="shadow-sm border-emerald-100/50">
              <CardHeader className="border-b border-border/30 bg-emerald-50/30 pb-4">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                    <DollarSign className="size-5" />
                  </div>
                  نموذج الربح والتسعير
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-5">
                  {project.monetization.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-base text-foreground font-medium leading-relaxed">
                      <div className="mt-1 flex items-center justify-center size-5 rounded-full bg-emerald-100 shrink-0">
                        <div className="size-2 rounded-full bg-emerald-500" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          <section id="growth" className="profile-section scroll-mt-24">
            <Card className="shadow-sm border-cyan-100/50">
              <CardHeader className="border-b border-border/30 bg-cyan-50/30 pb-4">
                <CardTitle className="text-xl font-black flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-100 text-cyan-600">
                    <Globe className="size-5" />
                  </div>
                  النمو والاستحواذ
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-5">
                  {project.growth.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-4 text-base text-foreground font-medium leading-relaxed">
                      <div className="mt-1 flex items-center justify-center size-5 rounded-full bg-cyan-100 shrink-0">
                        <div className="size-2 rounded-full bg-cyan-500" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
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
