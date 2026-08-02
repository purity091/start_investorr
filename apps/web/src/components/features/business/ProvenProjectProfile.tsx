import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ArrowRight, CheckCircle2, DollarSign, Users, Globe, ExternalLink, Lightbulb, Rocket, Settings, Info, Building2, UserCircle2, Code, ShieldCheck, FileText, Check, TrendingUp, Search, ArrowUpRight, Database, Cloud, Bot, CreditCard, Layout, MonitorPlay, Mails, Link, Boxes, Zap, Lock, BookOpen, Fingerprint } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProvenProjectProps {
  project: any;
  onBack: () => void;
}

const getToolBranding = (tool: string) => {
  const t = tool.toLowerCase();
  
  if (t.includes('mongo') || t.includes('mysql') || t.includes('postgres') || t.includes('prisma') || t.includes('supabase') || t.includes('planetscale')) {
    return { icon: <Database className="size-4" />, colors: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" };
  }
  if (t.includes('aws') || t.includes('google cloud') || t.includes('digitalocean') || t.includes('vercel')) {
    return { icon: <Cloud className="size-4" />, colors: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100" };
  }
  if (t.includes('openai') || t.includes('claude') || t.includes('gpt') || t.includes('elevenlabs') || t.includes('ai') || t.includes('ذكاء')) {
    return { icon: <Bot className="size-4" />, colors: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" };
  }
  if (t.includes('stripe') || t.includes('payment') || t.includes('مدفوعات') || t.includes('paypal')) {
    return { icon: <CreditCard className="size-4" />, colors: "bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100" };
  }
  if (t.includes('tailwind') || t.includes('css') || t.includes('webflow') || t.includes('framer') || t.includes('design')) {
    return { icon: <Layout className="size-4" />, colors: "bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100" };
  }
  if (t.includes('auth') || t.includes('magic link') || t.includes('security') || t.includes('مصادقة')) {
    return { icon: <Fingerprint className="size-4" />, colors: "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100" };
  }
  if (t.includes('email') || t.includes('mailgun') || t.includes('postmark') || t.includes('intercom') || t.includes('slack') || t.includes('بريد')) {
    return { icon: <Mails className="size-4" />, colors: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100" };
  }
  if (t.includes('youtube') || t.includes('wistia') || t.includes('video')) {
    return { icon: <MonitorPlay className="size-4" />, colors: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100" };
  }
  if (t.includes('zapier') || t.includes('make') || t.includes('automation') || t.includes('أتمتة')) {
    return { icon: <Zap className="size-4" />, colors: "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100" };
  }
  if (t.includes('notion') || t.includes('linear') || t.includes('gitbook') || t.includes('canny')) {
    return { icon: <BookOpen className="size-4" />, colors: "bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200" };
  }
  if (t.includes('react') || t.includes('next') || t.includes('node') || t.includes('angular') || t.includes('.net') || t.includes('typescript') || t.includes('javascript') || t.includes('تطبيقات') || t.includes('موبايل')) {
    return { icon: <Boxes className="size-4" />, colors: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100" };
  }
  if (t.includes('github') || t.includes('cursor') || t.includes('git')) {
    return { icon: <Code className="size-4" />, colors: "bg-zinc-100 text-zinc-800 border-zinc-300 hover:bg-zinc-200" };
  }
  
  return { icon: <Code className="size-4" />, colors: "bg-primary/5 text-primary border-primary/20 hover:bg-primary/10" };
};

const getEvidenceFieldTitle = (key: string) => {
  switch (key) {
    case '$.company.location': return 'مقر الشركة وتاريخ التأسيس';
    case '$.company.business_model': return 'نموذج العمل وهيكلية الاشتراكات';
    case '$.directory_snapshot.monthly_revenue': return 'الإيرادات الشهرية والمتوسطات الحسابية';
    case '$.directory_snapshot.monthly_traffic': return 'مؤشرات التوسع وحجم العملاء والرسائل';
    case '$.overview.problem': return 'المشكلة الأساسية التي حلها المنتج';
    case '$.overview.solution': return 'المنتج والحل التقني والتطوير';
    case '$.market_data.target_audience': return 'الشريحة المستهدفة والشركات المعنية';
    case '$.market_data.market_size': return 'حجم السوق وإفصاح الفئة المستهدفة';
    case '$.market_data.growth_rate': return 'معدل النمو والاتجاه المالي متعدد السنوات';
    case '$.financials.initial_investment': return 'التمويل الأولي ونموذج التمويل الذاتي (Bootstrapping)';
    case '$.financials.valuation': return 'تقييم الشركة وقيمة الاستحواذ النهائي';
    case '$.financials.revenue_streams': return 'مصادر الإيرادات والخطط المدفوعة';
    case '$.tools': return 'الأدوات وواجهات الـ APIs والتكاملات الموثقة';
    default: return key.replace('$.', '');
  }
};

const getStatusMeta = (status: string) => {
  switch (status) {
    case 'verified':
      return { label: 'موثق بمصدر أولي', className: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    case 'verified_historical_calculation':
      return { label: 'مشتق بحسابات موثقة', className: 'bg-sky-100 text-sky-800 border-sky-300' };
    case 'verified_using_operational_proxies':
      return { label: 'مؤشرات تشغيل موثقة', className: 'bg-purple-100 text-purple-800 border-purple-300' };
    case 'verified_as_not_publicly_disclosed':
      return { label: 'غير مفصح عنه رسمياً', className: 'bg-amber-100 text-amber-800 border-amber-300' };
    default:
      return { label: 'مُحقَّق', className: 'bg-slate-100 text-slate-800 border-slate-300' };
  }
};

export const ProvenProjectProfile: React.FC<ProvenProjectProps> = ({ project: rawProject, onBack }) => {
  const [activeId, setActiveId] = useState<string>('company');
  const containerRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  const hasEvidenceMap = rawProject.evidence_map && Object.keys(rawProject.evidence_map).length > 0;

  // Normalize project data to support both legacy flat array format and new nested object format
  const project = {
    ...rawProject,
    problem_and_product: rawProject.problem_and_product || [
      rawProject.overview?.problem?.text,
      rawProject.overview?.problem?.impact,
      rawProject.overview?.solution?.text
    ].filter(Boolean),
    origin_story: rawProject.origin_story || [
      rawProject.financials?.initial_investment,
      rawProject.market_data?.target_audience && `الجمهور المستهدف: ${rawProject.market_data.target_audience}`
    ].filter(Boolean),
    build_and_launch: rawProject.build_and_launch || [
      rawProject.company?.started && `عام التأسيس: ${rawProject.company.started}`,
      rawProject.financials?.valuation && `التقييم/الاستحواذ: ${rawProject.financials.valuation}`
    ].filter(Boolean),
    costs_and_operations: rawProject.costs_and_operations || [
      rawProject.company?.employees && `حجم الفريق: ${rawProject.company.employees}`,
      rawProject.company?.location && `المقر: ${rawProject.company.location}`
    ].filter(Boolean),
    monetization: rawProject.monetization || rawProject.financials?.revenue_streams || [],
    growth: rawProject.growth || [
      rawProject.market_data?.growth_rate,
      rawProject.market_data?.market_size && `سوق المنصة: ${rawProject.market_data.market_size}`
    ].filter(Boolean),
    tools: rawProject.tools || [],
    revenue_timeline: rawProject.revenue_timeline || [
      {
        date: 'الإيراد المحسوب',
        amount: rawProject.directory_snapshot?.monthly_revenue || '-',
        type: 'إيرادات موثقة',
        note: rawProject.company?.public_revenue_claim || 'بيانات مأخوذة من التقارير الرسمية'
      }
    ],
    lessons: (rawProject.lessons || []).map((l: any) => {
      if (typeof l === 'string') {
        const parts = l.split(': ');
        return {
          title: parts.length > 1 ? parts[0] : 'درس مستفاد',
          description: parts.length > 1 ? parts.slice(1).join(': ') : l
        };
      }
      return {
        title: l.title || 'درس مستفاد',
        description: l.description || ''
      };
    }),
    sources: rawProject.sources || [],
    data_quality: rawProject.data_quality || (rawProject.verification?.important_notes || []),
  };

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
    ...(hasEvidenceMap ? [{ id: 'evidence-map', label: 'خريطة الأدلة (v2.0)' }] : []),
    { id: 'sources', label: 'المصادر' },
    { id: 'data-quality', label: 'دقة البيانات' },
  ];

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8 px-4 py-6 sm:py-8 sm:px-6 lg:px-8 font-sans pb-24 sm:pb-32">

      {/* Top Alert & Back */}
      <div className="flex flex-col gap-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors w-fit"
        >
          <ArrowRight className="size-4" />
          العودة للقائمة
        </button>

        {rawProject.verification ? (
          <div className="flex flex-col gap-3 p-5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-emerald-950 shadow-xs">
            <div className="flex items-start sm:items-center gap-3 justify-between flex-wrap">
              <div className="flex items-center gap-3">
                <ShieldCheck className="size-6 text-emerald-600 shrink-0" />
                <div>
                  <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                    ملف موثق من المصادر الرسمية والأولية (Verified Primary Data)
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-700 border-emerald-300 font-bold text-xs">
                      {rawProject.verification.verified_on || 'مُحقَّق'}
                    </Badge>
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {rawProject.verification.source_policy}
                  </p>
                </div>
              </div>
            </div>

            {rawProject.verification.important_notes && rawProject.verification.important_notes.length > 0 && (
              <div className="mt-2 pt-3 border-t border-emerald-200/60 space-y-1.5">
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider block mb-1">ملاحظات التوثيق الدقيق والشفافية:</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                  {rawProject.verification.important_notes.map((note: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                      <div className="size-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-xl text-blue-900 shadow-sm">
            <div className="mt-0.5 text-blue-500">
              <Search className="size-5" />
            </div>
            <p className="text-[13.5px] font-medium leading-relaxed">
              <strong className="font-bold text-slate-900">ملف مدروس.</strong> قام نظام الذكاء الاصطناعي الخاص بنا بتجميع هذه الصفحة من مصادر عامة — لم يقم المؤسس بكتابتها. قد تخطئ الأنظمة الآلية في قراءة بعض البيانات، لذا تعامل مع الأرقام كأفضل تقدير.
            </p>
          </div>
        )}
      </div>

      {/* Layout Grid */}
      <div ref={containerRef} className="grid lg:grid-cols-[220px_1fr] gap-8 sm:gap-10 mt-6 items-start relative">

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
        <div className="flex flex-col gap-8 sm:gap-10 min-w-0">

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

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-2">
                <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">الإيرادات الشهرية</span>
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 truncate" title={project.directory_snapshot.monthly_revenue}>{project.directory_snapshot.monthly_revenue.split(' ')[0]}</span>
                </div>
                <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">المؤسس</span>
                  <span className="text-lg sm:text-xl font-black text-slate-900 truncate" title={project.company.founder}>{project.company.founder}</span>
                </div>
                <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">نموذج العمل</span>
                  <span className="text-base sm:text-lg font-black text-slate-900 line-clamp-1" title={project.company.business_model}>{project.company.business_model}</span>
                </div>
                <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-100">
                  <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">الإطلاق</span>
                  <span className="text-lg sm:text-xl font-black text-slate-900 truncate" title={project.company.started}>{project.company.started}</span>
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
                  <div className="p-4 sm:p-5 hover:bg-muted/20 transition-colors">
                    <dt className="text-[11px] sm:text-xs font-bold text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">نموذج العمل</dt>
                    <dd className="font-bold text-[13px] sm:text-sm text-foreground">{project.company.business_model}</dd>
                  </div>
                  <div className="p-4 sm:p-5 hover:bg-muted/20 transition-colors">
                    <dt className="text-[11px] sm:text-xs font-bold text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">نوع العميل</dt>
                    <dd className="font-bold text-[13px] sm:text-sm text-foreground">{project.company.customer_type}</dd>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border/50 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-border/50">
                  <div className="p-4 sm:p-5 hover:bg-muted/20 transition-colors">
                    <dt className="text-[11px] sm:text-xs font-bold text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">المؤسس</dt>
                    <dd className="font-bold text-[13px] sm:text-sm text-foreground">{project.company.founder}</dd>
                  </div>
                  <div className="p-4 sm:p-5 hover:bg-muted/20 transition-colors">
                    <dt className="text-[11px] sm:text-xs font-bold text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">التأسيس</dt>
                    <dd className="font-bold text-[13px] sm:text-sm text-foreground">{project.company.started}</dd>
                  </div>
                  <div className="p-4 sm:p-5 hover:bg-muted/20 transition-colors">
                    <dt className="text-[11px] sm:text-xs font-bold text-muted-foreground mb-1 sm:mb-1.5 uppercase tracking-wider">حجم الفريق</dt>
                    <dd className="font-bold text-[13px] sm:text-sm text-foreground">{project.company.founders_count} مؤسس • {project.company.employees}</dd>
                  </div>
                </div>
                <div className="grid grid-cols-1 border-t border-border/50">
                  <div className="p-4 sm:p-5 bg-emerald-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <dt className="text-[11px] sm:text-xs font-bold text-emerald-700 mb-1 sm:mb-1.5 uppercase tracking-wider">الربحية والإيراد المعلن</dt>
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
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">المشكلة والمنتج</h2>
            </div>
            <ul className="space-y-3 sm:space-y-4 pr-6 sm:pr-11 border-r-2 border-amber-50 py-1 sm:py-2">
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
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">المؤسس وقصة البداية</h2>
            </div>
            <ul className="space-y-3 sm:space-y-4 pr-6 sm:pr-11 border-r-2 border-indigo-50 py-1 sm:py-2">
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
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">البناء والإطلاق</h2>
            </div>
            <div className="relative border-r-2 border-violet-100 pr-6 sm:pr-11 py-1 sm:py-2 space-y-5 sm:space-y-6">
              {project.build_and_launch.map((item: string, i: number) => {
                const parts = item.split(': ');
                const date = parts.length > 1 ? parts[0] : null;
                const text = parts.length > 1 ? parts.slice(1).join(': ') : item;

                return (
                  <div key={i} className="relative">
                    <div className="absolute w-2 h-2 bg-violet-400 rounded-full -right-[29px] sm:-right-[49px] top-2 ring-4 ring-white" />
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
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">التكاليف والتشغيل</h2>
            </div>
            <ul className="space-y-3 sm:space-y-4 pr-6 sm:pr-11 border-r-2 border-slate-100 py-1 sm:py-2">
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
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">نموذج الربح والتسعير</h2>
            </div>
            <ul className="space-y-3 sm:space-y-4 pr-6 sm:pr-11 border-r-2 border-emerald-50 py-1 sm:py-2">
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
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">النمو والاستحواذ</h2>
            </div>
            <ul className="space-y-3 sm:space-y-4 pr-6 sm:pr-11 border-r-2 border-cyan-50 py-1 sm:py-2">
              {project.growth.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2.5 size-1.5 rounded-full bg-cyan-300 shrink-0" />
                  <p className="text-[15px] text-slate-700 font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="tools" className="profile-section scroll-mt-24">
            <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-3 text-foreground">
              <div className="p-2 rounded-lg bg-pink-100 text-pink-600">
                <Code className="size-5" />
              </div>
              التقنيات والأدوات المستخدمة
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3 p-4 sm:p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
              {project.tools.map((tool: string, i: number) => {
                const branding = getToolBranding(tool);
                return (
                  <Badge key={i} variant="outline" className={cn("flex items-center gap-2.5 text-[14px] font-bold px-4 py-2.5 rounded-xl border shadow-sm transition-all hover:scale-105 hover:shadow-md cursor-default", branding.colors)}>
                    <div className="p-1.5 rounded-lg bg-white/70 shadow-sm shrink-0">
                      {branding.icon}
                    </div>
                    {tool}
                  </Badge>
                );
              })}
            </div>
          </section>

          <section id="revenue-timeline" className="profile-section scroll-mt-24">
            <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 text-foreground">المخطط الزمني للإيرادات</h3>
            <div className="grid gap-3 sm:gap-4">
              {project.revenue_timeline.map((rt: any, i: number) => (
                <div key={i} className="flex flex-col md:flex-row gap-3 md:gap-8 p-4 sm:p-6 rounded-2xl border border-border/60 bg-gradient-to-l from-muted/5 to-transparent shadow-sm">
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
              <CardHeader className="p-4 sm:p-6 border-b border-emerald-100 bg-emerald-600 pb-4 sm:pb-5">
                <CardTitle className="text-lg sm:text-xl font-black flex items-center gap-3 text-white">
                  <FileText className="size-5 text-emerald-100" />
                  خلاصة الدروس المستفادة والاستراتيجيات
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 bg-emerald-50/30">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {project.lessons.map((item: any, i: number) => (
                    <div key={i} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-emerald-100/80 text-emerald-950 shadow-xs hover:shadow-sm transition-shadow">
                      <div className="p-1.5 rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                        <Check className="size-5" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-black text-slate-900 text-base">{item.title}</h4>
                        {item.description && (
                          <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {rawProject.evidence_map && (
            <section id="evidence-map" className="profile-section scroll-mt-24">
              <Card className="shadow-md border-slate-200 overflow-hidden">
                <CardHeader className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900 pb-4 sm:pb-5 text-white">
                  <CardTitle className="text-lg sm:text-xl font-black flex items-center justify-between gap-3 text-white flex-wrap">
                    <div className="flex items-center gap-3">
                      <Fingerprint className="size-5 text-emerald-400" />
                      <span>خريطة الأدلة الميدانية الموثقة لكل ادعاء (Evidence Map v2.0)</span>
                    </div>
                    <Badge variant="outline" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40 text-xs font-bold">
                      {Object.keys(rawProject.evidence_map).length} حقائق موثقة بالكامل
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 bg-slate-50/50 space-y-4">
                  {Object.entries(rawProject.evidence_map).map(([key, item]: [string, any], idx: number) => {
                    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;

                    const title = getEvidenceFieldTitle(key);
                    const statusMeta = getStatusMeta(item.verification_status);

                    return (
                      <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-sm transition-all space-y-3">
                        {/* Card Header: Field Title & Status Badge */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-blue-600" />
                            <h4 className="font-black text-slate-900 text-base">{title}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={cn("text-[11px] font-bold px-2.5 py-0.5 border", statusMeta.className)}>
                              {statusMeta.label}
                            </Badge>
                            {item.confidence && (
                              <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200 text-[10px] font-bold">
                                ثقة: {item.confidence === 'high' ? 'عالية (100%)' : item.confidence}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Evidence Summary */}
                        {item.evidence_summary && (
                          <div className="text-slate-700 text-xs sm:text-sm font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <strong className="text-slate-900 font-bold block mb-1">ملخص الدليل والإثبات:</strong>
                            {item.evidence_summary}
                          </div>
                        )}

                        {/* Mathematical Calculation Box if available */}
                        {item.calculation && (
                          <div className="p-3 bg-sky-50/80 border border-sky-200/80 rounded-xl text-sky-950 text-xs space-y-1">
                            <span className="font-black text-sky-900 flex items-center gap-1.5">
                              <TrendingUp className="size-3.5 text-sky-600" />
                              المعادلة الحسابية المشتقة من الأرقام الرسمية:
                            </span>
                            <p className="font-mono text-sky-900 dir-ltr text-right font-bold text-sm">{item.calculation.formula} = {item.calculation.rounded_display_value}</p>
                            <p className="text-[11px] text-sky-700 font-medium">المدخلات: ${item.calculation.official_amount_usd?.toLocaleString()} USD خلال فترة {item.calculation.included_months} أشهر ({item.calculation.included_period_start} إلى {item.calculation.included_period_end})</p>
                          </div>
                        )}

                        {/* Source References List */}
                        {item.source_references && item.source_references.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">المصادر المباشرة ذات الصلة ({item.source_references.length}):</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {item.source_references.map((ref: any, rIdx: number) => (
                                <div key={rIdx} className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 text-xs space-y-1">
                                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-700 flex items-center justify-between gap-1">
                                    <span className="truncate">{ref.title}</span>
                                    <ExternalLink className="size-3 shrink-0" />
                                  </a>
                                  <p className="text-[11px] text-slate-500 font-medium">{ref.publisher} • {ref.source_locator}</p>
                                  {ref.supports && (
                                    <p className="text-[11px] text-slate-700 font-medium pt-1 border-t border-slate-200/50 leading-relaxed">
                                      ✓ {ref.supports}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Limitations Notice Box */}
                        {item.limitations && (
                          <div className="p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-xl text-amber-900 text-xs font-medium flex items-start gap-2">
                            <Info className="size-4 text-amber-600 shrink-0 mt-0.5" />
                            <span><strong>حدود الاستدلال والشفافية: </strong>{item.limitations}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </section>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-4">
            <section id="sources" className="profile-section scroll-mt-24">
              <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                <Link className="size-4" />
                المصادر الموثقة (Verified Sources)
              </h3>
              <div className="grid gap-3">
                {project.sources.map((src: any, i: number) => (
                  <div key={i} className="p-4 border border-slate-200/80 rounded-2xl bg-white shadow-xs hover:border-blue-300 transition-colors">
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-black text-blue-600 hover:text-blue-700 flex items-center justify-between gap-2 text-sm mb-1">
                      <span className="line-clamp-1">{src.title || src.label}</span>
                      <ExternalLink className="size-4 shrink-0" />
                    </a>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-2 flex-wrap">
                      <span>{src.publisher || src.coverage}</span>
                      {src.published_on && (
                        <>
                          <span>•</span>
                          <span>{src.published_on}</span>
                        </>
                      )}
                      {src.source_type && (
                        <Badge variant="outline" className="bg-slate-50 text-slate-600 border-slate-200 text-[10px] py-0 px-1.5 font-bold">
                          {src.source_type}
                        </Badge>
                      )}
                    </div>
                    {src.supports && src.supports.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-100">
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">حقائق موثقة بالمصدر:</span>
                        <ul className="space-y-1 text-xs text-slate-600 font-medium">
                          {src.supports.map((sup: string, sIdx: number) => (
                            <li key={sIdx} className="flex items-start gap-2">
                              <div className="size-1 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                              <span className="leading-relaxed">{sup}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section id="data-quality" className="profile-section scroll-mt-24">
              <h3 className="text-lg font-bold mb-4 text-foreground flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-600" />
                دقة البيانات والتوثيق
              </h3>
              <ul className="space-y-3 p-4 sm:p-5 border border-slate-200/80 rounded-2xl bg-slate-50/50 shadow-xs">
                {project.data_quality.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[13px] font-medium text-slate-700 leading-relaxed">
                    <div className="size-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
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
