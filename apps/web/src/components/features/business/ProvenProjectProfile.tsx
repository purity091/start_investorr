import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Globe,
  ExternalLink,
  Lightbulb,
  Rocket,
  Settings,
  Building2,
  UserCircle2,
  Code,
  ShieldCheck,
  FileText,
  Check,
  TrendingUp,
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
  Fingerprint,
  ChevronDown,
  ChevronUp,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProvenProjectProps {
  project: any;
  onBack: () => void;
}

const getCountryInfo = (location: string) => {
  if (!location) return { name: 'عالمي', flag: '🌍' };
  const loc = location.toLowerCase();

  if (loc.includes('السعودية') || loc.includes('saudi') || loc.includes('مكة') || loc.includes('الرياض') || loc.includes('جدة')) {
    return { name: 'المملكة العربية السعودية', flag: '🇸🇦' };
  }
  if (loc.includes('مصر') || loc.includes('القاهرة') || loc.includes('النوبارية') || loc.includes('البحيرة') || loc.includes('قنا') || loc.includes('egypt')) {
    return { name: 'مصر', flag: '🇪🇬' };
  }
  if (loc.includes('الإمارات') || loc.includes('دبي') || loc.includes('أبوظبي') || loc.includes('uae') || loc.includes('dubai')) {
    return { name: 'الإمارات العربية المتحدة', flag: '🇦🇪' };
  }
  if (loc.includes('الأردن') || loc.includes('عمّان') || loc.includes('عمان') || loc.includes('jordan')) {
    return { name: 'الأردن', flag: '🇯🇴' };
  }
  if (loc.includes('الكويت') || loc.includes('kuwait')) {
    return { name: 'الكويت', flag: '🇰🇼' };
  }
  if (loc.includes('قطر') || loc.includes('الدوحة') || loc.includes('qatar')) {
    return { name: 'قطر', flag: '🇶🇦' };
  }
  if (loc.includes('البحرين') || loc.includes('المنامة') || loc.includes('bahrain')) {
    return { name: 'البحرين', flag: '🇧🇭' };
  }
  if (loc.includes('المغرب') || loc.includes('الدار البيضاء') || loc.includes('morocco')) {
    return { name: 'المغرب', flag: '🇲🇦' };
  }
  if (loc.includes('الجزائر') || loc.includes('algeria')) {
    return { name: 'الجزائر', flag: '🇩🇿' };
  }
  if (loc.includes('لبنان') || loc.includes('بيروت') || loc.includes('lebanon')) {
    return { name: 'لبنان', flag: '🇱🇧' };
  }
  if (
    loc.includes('florida') || loc.includes('atlanta') || loc.includes('united states') || loc.includes('usa') ||
    loc.includes('california') || loc.includes('نيويورك') || loc.includes('سان فرانسيسكو') || loc.includes('مينلو بارك') ||
    loc.includes('بيتسبرغ') || loc.includes('لوس أنجلوس') || loc.includes('لوس جاتوس') || loc.includes('لوس غاتوس') ||
    loc.includes('جورجيا') || loc.includes('أورلاندو') || loc.includes('san francisco') || loc.includes('new york') || loc.includes('us')
  ) {
    return { name: 'الولايات المتحدة', flag: '🇺🇸' };
  }
  if (loc.includes('uk') || loc.includes('london') || loc.includes('المملكة المتحدة') || loc.includes('بريطانيا')) {
    return { name: 'المملكة المتحدة', flag: '🇬🇧' };
  }
  if (loc.includes('canada') || loc.includes('أوتاوا') || loc.includes('كندا')) {
    return { name: 'كندا', flag: '🇨🇦' };
  }
  if (loc.includes('singapore') || loc.includes('سنغافورة')) {
    return { name: 'سنغافورة', flag: '🇸🇬' };
  }
  if (loc.includes('فرنسا') || loc.includes('france') || loc.includes('باريس')) {
    return { name: 'فرنسا', flag: '🇫🇷' };
  }
  if (loc.includes('السويد') || loc.includes('ستوكهولم') || loc.includes('sweden')) {
    return { name: 'السويد', flag: '🇸🇪' };
  }
  if (loc.includes('أستراليا') || loc.includes('سيدني') || loc.includes('australia')) {
    return { name: 'أستراليا', flag: '🇦🇺' };
  }
  if (loc.includes('أوكرانيا') || loc.includes('ukraine')) {
    return { name: 'أوكرانيا', flag: '🇺🇦' };
  }
  if (loc.includes('غير مذكور') || loc.includes('غير مؤكد') || loc.includes('غير متاح')) {
    return { name: 'غير محدد', flag: '🌐' };
  }

  return { name: 'عالمي', flag: '🌍' };
};

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

const getShortRevenueDisplay = (revenueStr: string) => {
  if (!revenueStr) return '-';
  if (revenueStr.length < 25) return revenueStr;

  const amountMatch = revenueStr.match(/(\$\d+(?:\.\d+)?\s*(?:B|M|K)?|نحو \d+(?:\.\d+)?\s*(?:مليار|ملايين|مليون|ألف)\s*(?:دولار|درهم|جنيه)?)/i);
  if (amountMatch) return amountMatch[0];

  if (revenueStr.includes('غير معلن') || revenueStr.includes('غير متوفر')) return 'غير مفصح رسمياً';
  if (revenueStr.includes('مغلق')) return 'مغلق';

  return revenueStr.slice(0, 22) + '...';
};

const getShortTrafficDisplay = (trafficStr: string) => {
  if (!trafficStr) return '-';
  if (trafficStr.length < 25) return trafficStr;

  const trafficMatch = trafficStr.match(/(\d+(?:\.\d+)?\s*(?:B|M|K|مليون|ألف)\s*(?:عميل|زائر|مستخدم|بريد|مشترك)?)/i);
  if (trafficMatch) return trafficMatch[0];

  if (trafficStr.includes('غير معلن') || trafficStr.includes('غير متوفر') || trafficStr.includes('غير مناسب')) return 'غير مفصح رسمياً';

  return trafficStr.slice(0, 22) + '...';
};

const getShortValuationDisplay = (valStr: string) => {
  if (!valStr) return '-';
  if (valStr.length < 25) return valStr;

  const valMatch = valStr.match(/(\$\d+(?:\.\d+)?\s*(?:B|M|K)?|\d+(?:\.\d+)?\s*(?:مليار|ملايين|مليون|ألف)\s*(?:دولار|درهم|جنيه)?)/i);
  if (valMatch) return valMatch[0];

  if (valStr.includes('Nasdaq') || valStr.includes('عامة')) return 'شركة عامة';
  if (valStr.includes('لم تكشف') || valStr.includes('غير معلن') || valStr.includes('غير متوفر')) return 'غير مفصح رسمياً';

  return valStr.slice(0, 22) + '...';
};

export const ProvenProjectProfile: React.FC<ProvenProjectProps> = ({ project: rawProject, onBack }) => {
  const [activeId, setActiveId] = useState<string>('overview');
  const [isSourcesOpen, setIsSourcesOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  const evidenceMap = rawProject.evidence_map || {};

  // Extract key verified evidence insights
  const revenueEvidence = evidenceMap['$.directory_snapshot.monthly_revenue'];
  const trafficEvidence = evidenceMap['$.directory_snapshot.monthly_traffic'];
  const modelEvidence = evidenceMap['$.company.business_model'];
  const locationEvidence = evidenceMap['$.company.location'];
  const valuationEvidence = evidenceMap['$.financials.valuation'];

  // Normalize project data completely without hardcoded company fallbacks
  const project = {
    ...rawProject,
    company: rawProject.company || {},
    financials: rawProject.financials || {},
    directory_snapshot: rawProject.directory_snapshot || {},
    problem_and_product: rawProject.problem_and_product || [
      rawProject.overview?.problem?.text && `المشكلة: ${rawProject.overview.problem.text}`,
      rawProject.overview?.problem?.impact && `الأثر الداعم: ${rawProject.overview.problem.impact}`,
      rawProject.overview?.solution?.text && `الحل المبتكر: ${rawProject.overview.solution.text}`
    ].filter(Boolean),
    origin_story: rawProject.origin_story || [
      rawProject.financials?.initial_investment && `جولات الاستثمار والتمويل: ${rawProject.financials.initial_investment}`,
      rawProject.market_data?.target_audience && `الجمهور المستهدف: ${rawProject.market_data.target_audience}`
    ].filter(Boolean),
    build_and_launch: rawProject.build_and_launch || [
      rawProject.company?.started && `عام التأسيس: ${rawProject.company.started}`,
      rawProject.financials?.valuation && `التقييم والتوسع: ${rawProject.financials.valuation}`
    ].filter(Boolean),
    costs_and_operations: rawProject.costs_and_operations || [
      rawProject.company?.employees && `حجم القوى العاملة: ${rawProject.company.employees}`,
      rawProject.company?.location && `المقر والانتشار: ${rawProject.company.location}`
    ].filter(Boolean),
    monetization: rawProject.monetization || rawProject.financials?.revenue_streams || [],
    growth: rawProject.growth || [
      rawProject.market_data?.growth_rate && `معدل النمو: ${rawProject.market_data.growth_rate}`,
      rawProject.market_data?.market_size && `حجم السوق المستهدف: ${rawProject.market_data.market_size}`
    ].filter(Boolean),
    tools: rawProject.tools || [],
    revenue_timeline: rawProject.revenue_timeline || (
      rawProject.directory_snapshot?.monthly_revenue ? [
        {
          date: 'الإيراد الموثق',
          amount: getShortRevenueDisplay(rawProject.directory_snapshot.monthly_revenue),
          type: 'إفصاح موثق',
          note: rawProject.company?.public_revenue_claim || rawProject.directory_snapshot.monthly_revenue
        }
      ] : []
    ),
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
    { id: 'origin-story', label: 'المؤسس ومحطات التمويل' },
    { id: 'build-and-launch', label: 'البناء والتطور التاريخي' },
    { id: 'costs-and-operations', label: 'التكاليف ومؤشرات التشغيل' },
    { id: 'monetization', label: 'نموذج الربح وهيكلية التسعير' },
    { id: 'growth', label: 'معدلات النمو والتوسع' },
    ...(project.tools.length > 0 ? [{ id: 'tools', label: 'التقنيات والتكاملات' }] : []),
    { id: 'revenue-timeline', label: 'المخطط الزمني للإيرادات' },
    { id: 'lessons', label: 'الدروس والاستراتيجيات' },
    ...(rawProject.verification ? [{ id: 'verification-policy', label: 'حدود وسياسة التوثيق' }] : []),
    { id: 'sources', label: 'المصادر والتقارير (مطوي)' },
    { id: 'data-quality', label: 'معايير التوثيق' },
  ];

  // Collect all sources (general sources + evidence references) for the collapsed panel
  const allSourcesList: Array<{ title: string; url: string; publisher?: string; locator?: string; supports?: string }> = [];

  (project.sources || []).forEach((src: any) => {
    allSourcesList.push({
      title: src.title || src.label || 'مصدر رسمي',
      url: src.url,
      publisher: src.publisher || src.coverage,
      supports: Array.isArray(src.supports) ? src.supports.join(' • ') : src.supports
    });
  });

  Object.values(evidenceMap).forEach((evItem: any) => {
    if (evItem?.source_references && Array.isArray(evItem.source_references)) {
      evItem.source_references.forEach((ref: any) => {
        if (ref?.url && !allSourcesList.some(s => s.url === ref.url)) {
          allSourcesList.push({
            title: ref.title || 'مرجع إثبات',
            url: ref.url,
            publisher: ref.publisher,
            locator: ref.source_locator,
            supports: ref.supports
          });
        }
      });
    }
  });

  // Dynamic Company Details Logic
  const foundersText = project.company.founder || project.company.founders || 'غير مذكور رسمياً';
  const foundersCountText = project.company.founders_count
    ? `${project.company.founders_count} مؤسسين`
    : (project.company.founder || project.company.founders ? 'مؤسسو الشركة' : 'غير مذكور');
  const employeesText = project.company.employees || 'غير مفصح عنه';
  const locationInfo = getCountryInfo(project.company.location);

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

      {/* Main Grid Layout */}
      <div ref={containerRef} className="grid lg:grid-cols-[230px_1fr] gap-8 items-start relative">

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
                        {rawProject.verification && (
                          <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-300 font-bold text-xs flex items-center gap-1.5">
                            <ShieldCheck className="size-3.5 text-emerald-600 shrink-0" />
                            <span>
                              {rawProject.verification.verified_on ? `موثق بتاريخ ${rawProject.verification.verified_on}` : 'موثق بمصادر رسمية'}
                            </span>
                          </Badge>
                        )}
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
                        {project.company?.customer_type && (
                          <Badge variant="outline" className="font-bold text-xs bg-background">
                            {project.company.customer_type}
                          </Badge>
                        )}
                        <Badge variant="outline" className="font-bold text-xs bg-background flex items-center gap-1">
                          <span>{locationInfo.flag}</span>
                          <span>{locationInfo.name}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {project.headline && (
                  <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mt-4 pt-4 border-t border-border/40">
                    {project.headline}
                  </p>
                )}
              </CardHeader>

              <CardContent className="p-4 sm:p-6 bg-card space-y-4">
                {/* Dynamic 4-Stat Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                  
                  {/* Revenue Card */}
                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 flex flex-col justify-between gap-1.5">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">الإيراد الشهري</span>
                    <span className="text-lg sm:text-xl font-extrabold text-emerald-700 tracking-tight dir-ltr text-right">
                      {getShortRevenueDisplay(project.directory_snapshot?.monthly_revenue)}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium truncate">
                      {revenueEvidence?.confidence ? `درجة الثقة: ${revenueEvidence.confidence}` : 'بيانات إيراد موثقة'}
                    </span>
                  </div>

                  {/* Traffic & Scale Card */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">الزيارات والانتشار</span>
                    <span className="text-lg sm:text-xl font-bold text-slate-900 dir-ltr text-right">
                      {getShortTrafficDisplay(project.directory_snapshot?.monthly_traffic)}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium truncate">
                      {trafficEvidence?.confidence ? `التوثيق: ${trafficEvidence.confidence}` : 'مؤشرات نشاط تشغيلي'}
                    </span>
                  </div>

                  {/* Funding Card */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">نموذج التمويل</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 truncate" title={project.company?.funding || project.financials?.initial_investment}>
                      {project.company?.funding || (project.financials?.initial_investment ? 'جولة تمويلية' : 'تمويل ذاتي')}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium truncate">
                      {project.company?.bootstrapped ? 'Bootstrapped 100%' : (project.financials?.initial_investment ? 'استثمار معلن' : 'تمويل رأس مال')}
                    </span>
                  </div>

                  {/* Valuation Card */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between gap-1.5">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">التقييم / الاستحواذ</span>
                    <span className="text-base sm:text-lg font-bold text-slate-900 truncate" title={project.financials?.valuation}>
                      {getShortValuationDisplay(project.financials?.valuation)}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium truncate">
                      {valuationEvidence?.claim_type ? valuationEvidence.claim_type : 'بيانات مالية موثقة'}
                    </span>
                  </div>
                </div>

                {/* Detailed Operational & Traffic Proof Box */}
                {trafficEvidence?.evidence_summary && (
                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-900 text-xs space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Users className="size-4 text-primary" />
                        إفصاح مؤشرات التشغيل الرسمية (Operational Proxies):
                      </span>
                      {trafficEvidence.verification_status && (
                        <Badge variant="outline" className={cn("text-[10px] font-bold py-0 px-2", getStatusMeta(trafficEvidence.verification_status).className)}>
                          {getStatusMeta(trafficEvidence.verification_status).label}
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed">
                      {trafficEvidence.evidence_summary}
                    </p>
                  </div>
                )}

                {/* Derived Evidence Revenue Calculation Box */}
                {revenueEvidence?.calculation && (
                  <div className="p-3.5 bg-sky-50/70 border border-sky-200/80 rounded-xl text-sky-950 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="font-bold text-sky-900 flex items-center gap-1.5">
                        <TrendingUp className="size-4 text-sky-600" />
                        المعادلة الحسابية الموثقة من التقارير الرسمية:
                      </span>
                      <p className="text-sky-800 font-medium leading-relaxed">
                        {revenueEvidence.evidence_summary || `الإيراد المعلن يعطي متوسطاً قدره ${revenueEvidence.calculation.rounded_display_value}.`}
                      </p>
                    </div>
                    {revenueEvidence.calculation.formula && (
                      <Badge variant="outline" className="bg-sky-100 text-sky-800 border-sky-300 font-mono text-xs font-bold shrink-0 dir-ltr">
                        {revenueEvidence.calculation.formula} = {revenueEvidence.calculation.rounded_display_value}
                      </Badge>
                    )}
                  </div>
                )}
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
                  حقائق الشركة الهيكلية والموقع
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Row 1: Business Model & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-border/40">
                  
                  {/* Business Model */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">نموذج العمل والربح</dt>
                      {modelEvidence && (
                        <Badge variant="outline" className={cn("text-[10px] font-bold py-0 px-2", getStatusMeta(modelEvidence.verification_status).className)}>
                          {getStatusMeta(modelEvidence.verification_status).label}
                        </Badge>
                      )}
                    </div>
                    <dd className="font-bold text-sm text-foreground leading-snug">
                      {project.company.customer_type || 'نموذج التشغيل والتسويق'}
                    </dd>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed bg-muted/30 p-2.5 rounded-lg border border-border/30">
                      {project.company.business_model || 'غير مفصح عنه رسمياً'}
                    </p>
                  </div>

                  {/* Location & Foundation */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">المقر والتأسيس</dt>
                      {locationEvidence && (
                        <Badge variant="outline" className={cn("text-[10px] font-bold py-0 px-2", getStatusMeta(locationEvidence.verification_status).className)}>
                          {getStatusMeta(locationEvidence.verification_status).label}
                        </Badge>
                      )}
                    </div>
                    <dd className="font-bold text-sm text-foreground leading-snug">
                      {locationInfo.flag} {locationInfo.name}
                    </dd>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed bg-muted/30 p-2.5 rounded-lg border border-border/30">
                      {project.company.location || 'غير مذكور'}
                    </p>
                  </div>
                </div>

                {/* Row 2: Founders, Start Year & Team Size */}
                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border/40 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-border/40">
                  <div className="p-4 sm:p-5 space-y-1">
                    <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">المؤسسون</dt>
                    <dd className="font-bold text-sm text-foreground">{foundersText}</dd>
                    <span className="text-[11px] text-muted-foreground block">{foundersCountText}</span>
                  </div>
                  <div className="p-4 sm:p-5 space-y-1">
                    <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">عام التأسيس</dt>
                    <dd className="font-bold text-sm text-foreground">{project.company.started || 'غير مذكور'}</dd>
                    <span className="text-[11px] text-muted-foreground block">{locationInfo.name}</span>
                  </div>
                  <div className="p-4 sm:p-5 space-y-1">
                    <dt className="text-xs font-bold text-muted-foreground uppercase tracking-wider">حجم الفريق</dt>
                    <dd className="font-bold text-sm text-foreground">{employeesText}</dd>
                    <span className="text-[11px] text-muted-foreground block">القوى العاملة المعلنة</span>
                  </div>
                </div>

                {/* Valuation Details Box */}
                {valuationEvidence?.evidence_summary && (
                  <div className="p-4 border-t border-border/40 bg-slate-50 space-y-1.5">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign className="size-4 text-emerald-600" />
                      تفاصيل التقييم والاستحواذ الموثقة:
                    </span>
                    <p className="text-xs text-slate-700 font-medium leading-relaxed">
                      {valuationEvidence.evidence_summary}
                    </p>
                  </div>
                )}

                {/* Bottom Revenue Bar */}
                <div className="p-4 sm:p-5 border-t border-border/40 bg-emerald-50/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <dt className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">الربحية والإيراد المعلن</dt>
                    <dd className="font-bold text-sm sm:text-base text-emerald-950">
                      {project.company.public_revenue_claim || project.directory_snapshot?.monthly_revenue || 'غير مفصح عنه رسمياً'}
                    </dd>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-300 font-bold text-xs shrink-0">
                    {project.company.funding || 'بيانات موثقة'}
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
                  المؤسس وقصة البداية والتمويل
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
                  معدلات النمو والتوسع
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
          {project.tools.length > 0 && (
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
          )}

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
                    <div className="text-xl sm:text-2xl font-black text-emerald-700 tracking-tight dir-ltr">
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

          {/* Verification Policy & Limitations Notice */}
          {rawProject.verification && (
            <section id="verification-policy" className="profile-section scroll-mt-24">
              <Card className="border-emerald-200/80 bg-emerald-50/40 shadow-xs overflow-hidden">
                <CardHeader className="border-b border-emerald-200/60 pb-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                        <ShieldCheck className="size-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">
                          سياسة التوثيق وحدود الاستدلال الدقيقة (Verified Primary Data)
                        </h3>
                        <p className="text-xs text-slate-600 font-medium mt-0.5">
                          {rawProject.verification.source_policy}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold text-xs shrink-0">
                      تم التوثيق: {rawProject.verification.verified_on || '2026'}
                    </Badge>
                  </div>
                </CardHeader>
                {rawProject.verification.important_notes && rawProject.verification.important_notes.length > 0 && (
                  <CardContent className="p-4 sm:p-5">
                    <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block mb-2">
                      حدود الاستدلال الشفافة والملاحظات الميدانية:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                      {rawProject.verification.important_notes.map((note: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 bg-white/90 p-2.5 rounded-lg border border-emerald-200/60">
                          <div className="size-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                          <span className="leading-relaxed">{note}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            </section>
          )}

          {/* COLLAPSED BY DEFAULT SOURCES ACCORDION */}
          <section id="sources" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60 overflow-hidden">
              <CardHeader className="p-4 sm:p-5 bg-card">
                <button
                  type="button"
                  onClick={() => setIsSourcesOpen(!isSourcesOpen)}
                  className="w-full flex items-center justify-between gap-4 text-right focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <Link className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                        المصادر الرسمية وتقارير التوثيق الميداني
                      </h3>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">
                        انقر للفتح أو الطي ({allSourcesList.length} مصادر رسمية ومستندات موثقة)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-border text-xs font-bold">
                      {isSourcesOpen ? 'عرض أقل' : 'مطوي'}
                    </Badge>
                    <div className="p-1.5 rounded-lg bg-muted/40 text-muted-foreground">
                      {isSourcesOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                    </div>
                  </div>
                </button>
              </CardHeader>

              {isSourcesOpen && (
                <CardContent className="p-4 sm:p-5 border-t border-border/40 bg-muted/20 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {allSourcesList.map((src, idx) => (
                      <div key={idx} className="p-3.5 border border-border/60 rounded-xl bg-card hover:border-primary/40 transition-colors space-y-1.5">
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-primary hover:underline flex items-center justify-between gap-2 text-xs"
                        >
                          <span className="line-clamp-1">{src.title}</span>
                          <ExternalLink className="size-3.5 shrink-0" />
                        </a>
                        {(src.publisher || src.locator) && (
                          <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground flex-wrap">
                            <span>{src.publisher}</span>
                            {src.locator && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-foreground font-bold">{src.locator}</span>
                              </>
                            )}
                          </div>
                        )}
                        {src.supports && (
                          <div className="pt-1.5 border-t border-border/40">
                            <p className="text-xs text-foreground font-medium leading-relaxed">
                              ✓ {src.supports}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>
          </section>

          {/* Data Quality Standards */}
          <section id="data-quality" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border/60">
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
  );
};
