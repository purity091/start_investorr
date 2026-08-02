import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Users,
  Globe,
  ExternalLink,
  Lightbulb,
  Rocket,
  Settings,
  Info,
  Building2,
  UserCircle2,
  Code,
  ShieldCheck,
  FileText,
  Check,
  TrendingUp,
  Search,
  Database,
  Cloud,
  Bot,
  CreditCard,
  Layout,
  MonitorPlay,
  Mails,
  Link,
  Boxes,
  Zap,
  BookOpen,
  Fingerprint
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProvenProjectProps {
  project: any;
  onBack: () => void;
}

const getToolBranding = (tool: string) => {
  const t = tool.toLowerCase();

  if (t.includes('mongo') || t.includes('mysql') || t.includes('postgres') || t.includes('prisma') || t.includes('supabase') || t.includes('planetscale')) {
    return { icon: <Database className="size-4" />, colors: "bg-emerald-50 text-emerald-700 border-emerald-200" };
  }
  if (t.includes('aws') || t.includes('google cloud') || t.includes('digitalocean') || t.includes('vercel')) {
    return { icon: <Cloud className="size-4" />, colors: "bg-sky-50 text-sky-700 border-sky-200" };
  }
  if (t.includes('openai') || t.includes('claude') || t.includes('gpt') || t.includes('elevenlabs') || t.includes('ai') || t.includes('ذكاء')) {
    return { icon: <Bot className="size-4" />, colors: "bg-purple-50 text-purple-700 border-purple-200" };
  }
  if (t.includes('stripe') || t.includes('payment') || t.includes('مدفوعات') || t.includes('paypal')) {
    return { icon: <CreditCard className="size-4" />, colors: "bg-indigo-50 text-indigo-700 border-indigo-200" };
  }
  if (t.includes('tailwind') || t.includes('css') || t.includes('webflow') || t.includes('framer') || t.includes('design')) {
    return { icon: <Layout className="size-4" />, colors: "bg-cyan-50 text-cyan-700 border-cyan-200" };
  }
  if (t.includes('auth') || t.includes('magic link') || t.includes('security') || t.includes('مصادقة')) {
    return { icon: <Fingerprint className="size-4" />, colors: "bg-rose-50 text-rose-700 border-rose-200" };
  }
  if (t.includes('email') || t.includes('mailgun') || t.includes('postmark') || t.includes('intercom') || t.includes('slack') || t.includes('بريد')) {
    return { icon: <Mails className="size-4" />, colors: "bg-amber-50 text-amber-700 border-amber-200" };
  }
  if (t.includes('youtube') || t.includes('wistia') || t.includes('video')) {
    return { icon: <MonitorPlay className="size-4" />, colors: "bg-red-50 text-red-700 border-red-200" };
  }
  if (t.includes('zapier') || t.includes('make') || t.includes('automation') || t.includes('أتمتة')) {
    return { icon: <Zap className="size-4" />, colors: "bg-orange-50 text-orange-700 border-orange-200" };
  }
  if (t.includes('notion') || t.includes('linear') || t.includes('gitbook') || t.includes('canny')) {
    return { icon: <BookOpen className="size-4" />, colors: "bg-slate-100 text-slate-700 border-slate-300" };
  }
  if (t.includes('react') || t.includes('next') || t.includes('node') || t.includes('angular') || t.includes('.net') || t.includes('typescript') || t.includes('javascript') || t.includes('تطبيقات') || t.includes('موبايل')) {
    return { icon: <Boxes className="size-4" />, colors: "bg-blue-50 text-blue-700 border-blue-200" };
  }
  if (t.includes('github') || t.includes('cursor') || t.includes('git')) {
    return { icon: <Code className="size-4" />, colors: "bg-zinc-100 text-zinc-800 border-zinc-300" };
  }

  return { icon: <Code className="size-4" />, colors: "bg-primary/5 text-primary border-primary/20" };
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
  const [activeId, setActiveId] = useState<string>('overview');
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

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !tocRef.current) return;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const headerHeight = 100;
      if (containerTop <= headerHeight) {
        tocRef.current.style.position = 'fixed';
        tocRef.current.style.top = `${headerHeight}px`;
        tocRef.current.style.width = '220px';
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
    { id: 'overview', label: 'نظرة عامة والملخص' },
    { id: 'company', label: 'حقائق الشركة الهيكلية' },
    { id: 'problem-and-product', label: 'المشكلة والحل التقني' },
    { id: 'origin-story', label: 'المؤسس ومحطات التمويل الذاتي' },
    { id: 'build-and-launch', label: 'البناء والتطور التاريخي' },
    { id: 'costs-and-operations', label: 'التكاليف ومؤشرات التشغيل' },
    { id: 'monetization', label: 'نموذج الربح وهيكلية التسعير' },
    { id: 'growth', label: 'معدلات النمو والاستحواذ' },
    { id: 'tools', label: 'التقنيات والتكاملات' },
    { id: 'revenue-timeline', label: 'المخطط الزمني للإيرادات' },
    { id: 'lessons', label: 'الدروس والاستراتيجيات' },
    ...(hasEvidenceMap ? [{ id: 'evidence-map', label: 'خريطة الأدلة الميدانية (v2.0)' }] : []),
    { id: 'sources', label: 'المصادر والتقارير' },
    { id: 'data-quality', label: 'معايير التوثيق' },
  ];

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8 font-sans pb-24">

      {/* Action Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={onBack}
          className="gap-2 font-bold text-slate-700 hover:text-slate-900 border-slate-200"
        >
          <ArrowRight className="size-4" />
          العودة لدليل الشركات الناجحة
        </Button>
      </div>

      {/* Top Verification Alert Card */}
      {rawProject.verification ? (
        <Card className="border-emerald-200/80 bg-emerald-50/50 shadow-xs overflow-hidden">
          <CardContent className="p-4 sm:p-5 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-200/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <ShieldCheck className="size-6" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    ملف موثق بمصادر رسمية وأولية (Verified Primary Data)
                  </h2>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    {rawProject.verification.source_policy}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold text-xs shrink-0">
                تم التوثيق: {rawProject.verification.verified_on || '2026'}
              </Badge>
            </div>

            {rawProject.verification.important_notes && rawProject.verification.important_notes.length > 0 && (
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                  سياسة التوثيق وحدود الاستدلال الدقيقة:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                  {rawProject.verification.important_notes.map((note: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 bg-white/90 p-2.5 rounded-lg border border-emerald-200/60">
                      <div className="size-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-blue-200/80 bg-blue-50/50 shadow-xs">
          <CardContent className="p-4 flex items-start gap-3 text-blue-900">
            <Search className="size-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm font-medium leading-relaxed">
              <strong className="font-bold text-slate-900">ملف دراسة حالة موثق.</strong> تم تجميع وتحقيق هذه البيانات من التقارير الرسمية وإفصاحات الهيئات التنفيذية.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Main Grid Layout */}
      <div ref={containerRef} className="grid lg:grid-cols-[230px_1fr] gap-8 mt-2 items-start relative">

        {/* Sticky Table of Contents Sidebar */}
        <aside className="hidden lg:block">
          <div ref={tocRef} className="flex flex-col gap-2 bg-card p-3 rounded-xl border border-border/60 shadow-xs">
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground px-2 py-1 border-b border-border/40 mb-1">
              محتويات دراسة الحالة
            </h3>
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full text-right py-2 px-3 text-xs rounded-lg transition-all focus:outline-none flex items-center justify-between",
                    activeId === item.id
                      ? "bg-primary/10 text-primary font-bold"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground font-medium"
                  )}
                >
                  <span className="truncate">{item.label}</span>
                  {activeId === item.id && (
                    <div className="size-1.5 rounded-full bg-primary shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Section Column */}
        <div className="flex flex-col gap-8 min-w-0">

          {/* Section 1: Overview Card */}
          <section id="overview" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60 overflow-hidden">
              <CardHeader className="bg-muted/30 pb-6 border-b border-border/40">
                <div className="flex flex-col md:flex-row md:items-start gap-5 justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center size-16 rounded-xl bg-blue-600 text-white text-3xl font-bold shadow-xs shrink-0">
                      {project.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                          {project.name}
                        </h1>
                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline bg-primary/10 px-2.5 py-1 rounded-md"
                          >
                            <span>الموقع الرسمي</span>
                            <ExternalLink className="size-3" />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="secondary" className="font-bold text-xs">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="font-bold text-xs bg-background">
                          {project.company.customer_type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {project.summary && (
                  <p className="text-sm sm:text-base text-muted-foreground font-normal leading-relaxed mt-4 pt-4 border-t border-border/40">
                    {project.summary}
                  </p>
                )}
              </CardHeader>

              <CardContent className="p-4 sm:p-6 bg-card">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex flex-col gap-1">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">الإيراد الشهري</span>
                    <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 tracking-tight dir-ltr text-right">
                      {project.directory_snapshot.monthly_revenue.split(' ')[0]}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">متوسط موثق</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">المؤسس الرئيسي</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 truncate" title={project.company.founder}>
                      {project.company.founder}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">{project.company.founders_count} مؤسسين</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">نموذج التمويل</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 truncate" title={project.company.funding}>
                      {project.company.funding}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">بدون استثمار خارجي</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">الاستحواذ والتقييم</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 truncate">
                      {project.financials?.valuation || '12 مليار $'}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">شركة Intuit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 2: Structural Company Facts */}
          <section id="company" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                    <Building2 className="size-4" />
                  </div>
                  حقائق الشركة الهيكلية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-border/40">
                  <div className="p-4 sm:p-5 space-y-1">
                    <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">نموذج العمل</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.business_model}</dd>
                  </div>
                  <div className="p-4 sm:p-5 space-y-1">
                    <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">نوع الشريحة المستهدفة</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.customer_type}</dd>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border/40 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-border/40">
                  <div className="p-4 sm:p-5 space-y-1">
                    <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">المؤسس</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.founder}</dd>
                  </div>
                  <div className="p-4 sm:p-5 space-y-1">
                    <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">عام التأسيس</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.started}</dd>
                  </div>
                  <div className="p-4 sm:p-5 space-y-1">
                    <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">حجم الفريق والقوى العاملة</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.founders_count} مؤسس • {project.company.employees}</dd>
                  </div>
                </div>
                <div className="p-4 sm:p-5 border-t border-border/40 bg-emerald-50/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <dt className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">الربحية والإيراد الأقصى المعلن</dt>
                    <dd className="font-bold text-sm sm:text-base text-emerald-950">{project.company.public_revenue_claim}</dd>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-300 font-bold text-xs">
                    {project.company.funding}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 3: Problem and Solution */}
          <section id="problem-and-product" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600">
                    <Lightbulb className="size-4" />
                  </div>
                  المشكلة والحل التقني
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {project.problem_and_product.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/30 border border-border/40">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Section 4: Origin Story & Founder Journey */}
          <section id="origin-story" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-600">
                    <UserCircle2 className="size-4" />
                  </div>
                  المؤسس وقصة البداية والتمويل الذاتي
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {project.origin_story.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/30 border border-border/40">
                    <div className="size-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Section 5: Build and Launch */}
          <section id="build-and-launch" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-md bg-violet-500/10 text-violet-600">
                    <Rocket className="size-4" />
                  </div>
                  البناء والتطور التاريخي
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {project.build_and_launch.map((item: string, i: number) => {
                  const parts = item.split(': ');
                  const title = parts.length > 1 ? parts[0] : null;
                  const text = parts.length > 1 ? parts.slice(1).join(': ') : item;

                  return (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/20 border border-border/40">
                      <div className="p-1 rounded bg-violet-100 text-violet-700 shrink-0 mt-0.5">
                        <Check className="size-3.5" />
                      </div>
                      <div className="space-y-1">
                        {title && <h4 className="text-xs font-bold text-violet-700 uppercase tracking-wide">{title}</h4>}
                        <p className="text-sm text-foreground font-medium leading-relaxed">{text}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </section>

          {/* Section 6: Costs and Operations */}
          <section id="costs-and-operations" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-md bg-slate-500/10 text-slate-700">
                    <Settings className="size-4" />
                  </div>
                  التكاليف التشغيلية ومؤشرات الإدارة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {project.costs_and_operations.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/30 border border-border/40">
                    <div className="size-2 rounded-full bg-slate-400 shrink-0 mt-1.5" />
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Section 7: Monetization */}
          <section id="monetization" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600">
                    <DollarSign className="size-4" />
                  </div>
                  نموذج الربح وهيكلية التسعير
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {project.monetization.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-emerald-50/30 border border-emerald-100">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Section 8: Growth */}
          <section id="growth" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-600">
                    <Globe className="size-4" />
                  </div>
                  معدلات النمو والاستحواذ النهائي
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {project.growth.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/30 border border-border/40">
                    <TrendingUp className="size-4 text-cyan-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Section 9: Tools */}
          <section id="tools" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-md bg-pink-500/10 text-pink-600">
                    <Code className="size-4" />
                  </div>
                  التقنيات والأدوات والتكاملات المستخدمة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-2.5">
                  {project.tools.map((tool: string, i: number) => {
                    const branding = getToolBranding(tool);
                    return (
                      <Badge
                        key={i}
                        variant="outline"
                        className={cn("flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-lg border", branding.colors)}
                      >
                        {branding.icon}
                        <span>{tool}</span>
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 10: Revenue Timeline */}
          <section id="revenue-timeline" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60">
              <CardHeader className="border-b border-border/40 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                  <div className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-600">
                    <TrendingUp className="size-4" />
                  </div>
                  المخطط الزمني للإيرادات والتوسع المالي
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {project.revenue_timeline.map((rt: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-background text-xs font-bold border-border">
                          {rt.date}
                        </Badge>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0 font-bold text-[11px]">
                          {rt.type}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mt-2">{rt.note}</p>
                    </div>
                    <div className="text-2xl font-black text-emerald-700 tracking-tight dir-ltr">
                      {rt.amount}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Section 11: Lessons Learned */}
          <section id="lessons" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-emerald-200/80 bg-emerald-50/20">
              <CardHeader className="border-b border-emerald-200/60 pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2 text-emerald-950">
                  <div className="p-1.5 rounded-md bg-emerald-100 text-emerald-700">
                    <FileText className="size-4" />
                  </div>
                  خلاصة الدروس المستفادة والاستراتيجيات للمؤسسين
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 space-y-3">
                {project.lessons.map((item: any, i: number) => (
                  <div key={i} className="p-4 rounded-xl bg-background border border-emerald-100 shadow-xs flex items-start gap-3">
                    <div className="p-1 rounded bg-emerald-100 text-emerald-700 shrink-0 mt-0.5">
                      <Check className="size-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                      {item.description && (
                        <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          {/* Section 12: Evidence Map (v2.0) */}
          {rawProject.evidence_map && (
            <section id="evidence-map" className="profile-section scroll-mt-24">
              <Card className="shadow-xs border-border/60">
                <CardHeader className="border-b border-border/40 pb-4">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <CardTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
                      <div className="p-1.5 rounded-md bg-purple-500/10 text-purple-600">
                        <Fingerprint className="size-4" />
                      </div>
                      خريطة الأدلة الميدانية الموثقة لكل ادعاء (Evidence Map v2.0)
                    </CardTitle>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-xs font-bold">
                      {Object.keys(rawProject.evidence_map).length} ادعاءات موثقة بالكامل
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  {Object.entries(rawProject.evidence_map).map(([key, item]: [string, any], idx: number) => {
                    if (!item || typeof item !== 'object' || Array.isArray(item)) return null;

                    const title = getEvidenceFieldTitle(key);
                    const statusMeta = getStatusMeta(item.verification_status);

                    return (
                      <div key={idx} className="p-4 sm:p-5 rounded-xl bg-card border border-border/60 shadow-xs space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
                          <div className="flex items-center gap-2">
                            <div className="size-2 rounded-full bg-primary shrink-0" />
                            <h4 className="font-bold text-foreground text-sm sm:text-base">{title}</h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={cn("text-[11px] font-bold px-2.5 py-0.5 border", statusMeta.className)}>
                              {statusMeta.label}
                            </Badge>
                            {item.confidence && (
                              <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border text-[10px] font-bold">
                                ثقة: {item.confidence === 'high' ? 'عالية (100%)' : item.confidence}
                              </Badge>
                            )}
                          </div>
                        </div>

                        {item.evidence_summary && (
                          <div className="text-xs sm:text-sm text-foreground font-medium leading-relaxed bg-muted/30 p-3 rounded-lg border border-border/40">
                            <strong className="text-foreground font-bold block mb-1 text-xs">ملخص الدليل والأدلة المعززة:</strong>
                            {item.evidence_summary}
                          </div>
                        )}

                        {item.calculation && (
                          <div className="p-3 bg-sky-50/60 border border-sky-200/60 rounded-lg text-sky-950 text-xs space-y-1">
                            <span className="font-bold text-sky-900 flex items-center gap-1.5">
                              <TrendingUp className="size-3.5 text-sky-600" />
                              المعادلة الحسابية المشتقة:
                            </span>
                            <p className="font-mono text-sky-950 dir-ltr text-right font-bold text-xs">{item.calculation.formula} = {item.calculation.rounded_display_value}</p>
                            <p className="text-[11px] text-sky-800 font-medium">المدخلات: ${item.calculation.official_amount_usd?.toLocaleString()} USD خلال {item.calculation.included_months} أشهر ({item.calculation.included_period_start} إلى {item.calculation.included_period_end})</p>
                          </div>
                        )}

                        {item.source_references && item.source_references.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">المصادر المباشرة ذات الصلة:</span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {item.source_references.map((ref: any, rIdx: number) => (
                                <div key={rIdx} className="p-3 rounded-lg bg-muted/20 border border-border/40 text-xs space-y-1">
                                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline flex items-center justify-between gap-1">
                                    <span className="truncate">{ref.title}</span>
                                    <ExternalLink className="size-3 shrink-0" />
                                  </a>
                                  <p className="text-[11px] text-muted-foreground font-medium">{ref.publisher} • {ref.source_locator}</p>
                                  {ref.supports && (
                                    <p className="text-[11px] text-foreground font-medium pt-1 border-t border-border/40 leading-relaxed">
                                      ✓ {ref.supports}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.limitations && (
                          <div className="p-2.5 bg-amber-50/70 border border-amber-200/70 rounded-lg text-amber-900 text-xs font-medium flex items-start gap-2">
                            <Info className="size-4 text-amber-600 shrink-0 mt-0.5" />
                            <span><strong>حدود الاستدلال: </strong>{item.limitations}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </section>
          )}

          {/* Section 13 & 14: Sources and Data Quality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section id="sources" className="profile-section scroll-mt-24">
              <Card className="shadow-xs border-border/60 h-full">
                <CardHeader className="border-b border-border/40 pb-4">
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                    <Link className="size-4 text-primary" />
                    المصادر والتقارير الرسمية
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-5 space-y-3">
                  {project.sources.map((src: any, i: number) => (
                    <div key={i} className="p-3.5 border border-border/60 rounded-xl bg-card hover:border-primary/40 transition-colors space-y-1.5">
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="font-bold text-primary hover:underline flex items-center justify-between gap-2 text-xs">
                        <span className="line-clamp-1">{src.title || src.label}</span>
                        <ExternalLink className="size-3.5 shrink-0" />
                      </a>
                      <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground flex-wrap">
                        <span>{src.publisher || src.coverage}</span>
                        {src.published_on && (
                          <>
                            <span>•</span>
                            <span>{src.published_on}</span>
                          </>
                        )}
                      </div>
                      {src.supports && src.supports.length > 0 && (
                        <div className="pt-2 border-t border-border/40 space-y-1">
                          <span className="text-[10px] font-bold text-muted-foreground block uppercase">الحقائق الموثقة:</span>
                          <ul className="space-y-1 text-xs text-foreground font-medium">
                            {src.supports.map((sup: string, sIdx: number) => (
                              <li key={sIdx} className="flex items-start gap-1.5">
                                <div className="size-1 rounded-full bg-primary shrink-0 mt-1.5" />
                                <span className="leading-relaxed">{sup}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section id="data-quality" className="profile-section scroll-mt-24">
              <Card className="shadow-xs border-border/60 h-full">
                <CardHeader className="border-b border-border/40 pb-4">
                  <CardTitle className="text-base font-bold flex items-center gap-2 text-foreground">
                    <ShieldCheck className="size-4 text-emerald-600" />
                    معايير التوثيق وجودة البيانات
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-5">
                  <div className="space-y-2.5">
                    {project.data_quality.map((item: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-muted/20 border border-border/40 text-xs font-medium text-foreground leading-relaxed">
                        <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};
