import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
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
  Building2,
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
  Boxes,
  Zap,
  BookOpen,
  Fingerprint,
  AlertCircle,
  BadgeAlert,
  BarChart3,
  Compass,
  Target,
  Layers3,
  Globe2,
  ShieldAlert,
  PieChart,
  Cpu,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MARKET_PROBLEM_STORAGE_KEY, type SavedMarketRecord } from './problemDetailStorage';

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
  
  return { icon: <Code className="size-4" />, colors: "bg-primary/5 text-primary border-primary/20 hover:bg-primary/10" };
};

const statusLabels: Record<SavedMarketRecord['status'], string> = {
  draft: 'تحتاج مراجعة',
  validated: 'قيد التحقق',
  priority: 'أولوية عالية',
};

const marketLabels: Record<SavedMarketRecord['marketBand'], string> = {
  small: 'سوق محدود',
  medium: 'سوق متوسط',
  large: 'سوق واعد وكبير',
};

const easeLabels: Record<SavedMarketRecord['easeBand'], string> = {
  hard: 'تنفيذ متطلب',
  moderate: 'تنفيذ متوسط',
  easy: 'سهل السريع',
};

const profitLabels: Record<SavedMarketRecord['profitBand'], string> = {
  low: 'ربحية محدودة',
  medium: 'ربحية متوسطة',
  high: 'ربحية عالية جداً',
};

const competitionLabels: Record<SavedMarketRecord['competitionBand'], string> = {
  high: 'منافسة شاقة',
  medium: 'منافسة متوازنة',
  low: 'فرصة زرقاء (منافسة منخفضة)',
};

interface ProblemDeepDiveProps {
  onBack: () => void;
}

export const ProblemDeepDive: React.FC<ProblemDeepDiveProps> = ({ onBack }) => {
  const [record, setRecord] = useState<SavedMarketRecord | null>(null);
  const [activeId, setActiveId] = useState<string>('facts');
  const containerRef = useRef<HTMLDivElement>(null);
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MARKET_PROBLEM_STORAGE_KEY);
      if (!raw) {
        setRecord(null);
        return;
      }
      const parsed = JSON.parse(raw) as SavedMarketRecord;
      setRecord(parsed || null);
    } catch {
      setRecord(null);
    }
  }, []);

  // Sticky scroll spy handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !tocRef.current) return;
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const headerHeight = 100;
      if (containerTop <= headerHeight) {
        tocRef.current.style.position = 'fixed';
        tocRef.current.style.top = `${headerHeight}px`;
        tocRef.current.style.width = '210px';
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
    { id: 'facts', label: 'حقائق الفكرة والسوق' },
    { id: 'problem-analysis', label: 'تحليل المشكلة والفجوة' },
    { id: 'target-audience', label: 'الشريحة والمستهدفون' },
    { id: 'proposed-solution', label: 'الحل والفرصة المقترحة' },
    { id: 'market-size', label: 'حجم السوق والنموذج' },
    { id: 'execution-roadmap', label: 'خريطة الطريق (MVP)' },
    { id: 'competition', label: 'المنافسة والبدائل' },
    { id: 'tech-stack', label: 'التقنيات المقترحة' },
    { id: 'risks-challenges', label: 'المخاطر والتحديات' },
    { id: 'lessons', label: 'التوصيات والدروس' },
  ];

  // Dynamic rich fallback details when specific record arrays are absent
  const structuredData = useMemo(() => {
    if (!record) return null;

    const isProblem = record.kind === 'problem';

    return {
      rootCauses: [
        `غياب الحلول المخصصة والمباشرة لتحدي "${record.title}" داخل قطاع ${record.sectorName}.`,
        `اعتماد الشريحة المستهدفة على أدوات تقليدية وغير مرنة تتسبب في ضياع الوقت وتكاليف مضاعفة.`,
        `عدم وجود ربط برمجي متكامل يسهل العمليات اليومية لفئة ${record.audience}.`,
        `ارتفاع الفجوة التنفيذية بين المتطلبات الفعلية وحجم الميزانيات المتاحة (${record.budget}).`
      ],
      targetPersonas: [
        { title: 'العميل الرئيسي', desc: record.audience },
        { title: 'النطاق الجغرافي', desc: record.countries.join('، ') || 'المنطقة العربية والشديدة النمو' },
        { title: 'نقطة الألم الكبرى', desc: `صعوبة التعامل مع المعاناة الكامنة في ${record.subSectorName}` },
      ],
      solutionFeatures: [
        `منصة أو تطبيق ذكي يعالج ${record.title} كخدمة سحابية خفيفة.`,
        `نموذج عمل مستدام قائم على: ${record.model}.`,
        `واجهة بسيطة تتيح للعملاء الوصول للحل بدقائق ودون تعقيدات تقنية.`,
        `تأطير حل مبتكر بعلامة تجارية: "${record.linkedTitle}".`
      ],
      roadmapSteps: [
        { date: 'المرحلة 1', text: 'بناء واجهة التحقق الأولية (Landing Page + Survey) لتأكيد اهتمام المستخدمين.' },
        { date: 'المرحلة 2', text: `تطوير النسخة التجريبية (MVP) المتركزة حول حل ${record.linkedTitle}.` },
        { date: 'المرحلة 3', text: 'إطلاق النسخة الأولى ومراقبة معدلات الاستخدام وتحويل العملاء.' },
        { date: 'المرحلة 4', text: `التوسع في التسويق واستهداف فئات جديدة ضمن قطاع ${record.sectorName}.` }
      ],
      techTools: [
        'React / Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Node.js / Supabase',
        'Stripe / PayTabs',
        'OpenAI API',
        'Vercel Deployment'
      ],
      risksList: [
        'مقاومة التغيير لدى المستخدمين واعتيادهم على الطرق التقليدية.',
        `ظهور منافسين محليين بحلول مشابهة في سوق ${record.sectorName}.`,
        'الحاجة إلى الاستثمارات الأولية الموجهة للتسويق واكتساب العملاء الأولين.'
      ],
      recommendations: [
        `البدء فوراً بإنشاء صفحة هبوط لاختبار الطلب على "${record.linkedTitle}".`,
        `التواصل المباشر مع 10-15 عميل من فئة ${record.audience} لتأكيد الافتراضات.`,
        `تقديم نموذج تسعير مريح يتماشى مع ميزانية (${record.budget}) لتسريع التبني.`,
        `التركيز على ميزة تجميع وتحليل البيانات كقيمة مضافة غير مسبوقة.`
      ]
    };
  }, [record]);

  if (!record || !structuredData) {
    return (
      <div dir="rtl" className="min-h-screen bg-background">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
          <Card className="shadow-sm border-border">
            <CardContent className="flex min-h-[360px] flex-col items-center justify-center gap-4 text-center">
              <div className="rounded-2xl bg-amber-50 p-4 text-amber-600">
                <AlertCircle className="size-8" />
              </div>
              <div className="space-y-2">
                <h1 className="text-xl font-bold text-foreground">لا توجد تفاصيل مشكلة أو فرصة محددة</h1>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                  الرجاء اختيار أحد العناصر من جدول المشاكل والفرص لفتح دراسة الحالة الشاملة والتفصيلية.
                </p>
              </div>
              <Button type="button" onClick={onBack} className="rounded-xl">
                <ArrowRight className="size-4 me-2" />
                العودة لرادار المشاكل والفرص
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isProblem = record.kind === 'problem';

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8 px-4 py-6 sm:py-8 sm:px-6 lg:px-8 font-sans pb-24 sm:pb-32 text-right">
      
      {/* Top Alert & Back Bar */}
      <div className="flex flex-col gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit"
        >
          <ArrowRight className="size-4" />
          العودة لاستكشاف المشاكل والفرص
        </button>

        <div className="flex items-start gap-3 p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl text-indigo-950 shadow-2xs">
          <div className="mt-0.5 text-indigo-600 shrink-0">
            <Search className="size-5" />
          </div>
          <p className="text-[13.5px] font-medium leading-relaxed">
            <strong className="font-bold text-slate-900">تحليل فجوة استثمارية.</strong> قامت منصة الاستثمار الذكي بتطوير هذه الدراسة الشاملة لتقييم {isProblem ? 'المشكلة الفعلية' : 'الفرصة الاستثمارية'} واحتساب جدارتها بالسوق، حجم الطلب، ومسار البناء المقترح.
          </p>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div ref={containerRef} className="grid lg:grid-cols-[230px_1fr] gap-8 sm:gap-10 mt-2 items-start relative">

        {/* Sidebar Table of Contents (Sticky) */}
        <aside className="hidden lg:block" style={{ minHeight: '1px' }}>
          <div ref={tocRef} className="flex flex-col gap-2">
            <h3 className="font-bold text-sm text-foreground mb-2 px-1">محتويات دراسة {isProblem ? 'المشكلة' : 'الفرصة'}</h3>
            <div className="flex flex-col border-r-2 border-muted pr-4 gap-1.5 relative">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full text-right py-1.5 text-[13.5px] transition-all focus:outline-none relative truncate",
                    activeId === item.id
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground font-medium"
                  )}
                >
                  {activeId === item.id && (
                    <span className="absolute right-[-18px] top-1/2 -translate-y-1/2 w-1.5 h-5 bg-primary rounded-full shadow-xs" />
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Sections */}
        <div className="flex flex-col gap-8 sm:gap-10 min-w-0">

          {/* Section 1: Overview */}
          <section id="overview" className="profile-section scroll-mt-24 pb-10 border-b border-border/60">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row md:items-start gap-6 justify-between">
                <div className="flex items-start gap-5">
                  <div className={cn(
                    "flex items-center justify-center size-20 rounded-2xl text-white text-3xl font-black shadow-md shrink-0",
                    isProblem ? "bg-rose-600" : "bg-emerald-600"
                  )}>
                    {isProblem ? <AlertCircle className="size-10" /> : <Lightbulb className="size-10" />}
                  </div>
                  <div className="flex flex-col gap-2.5 pt-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
                      {record.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={cn("font-bold px-3 py-1 text-xs rounded-lg border-0", isProblem ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700")}>
                        {isProblem ? 'مشكلة سوقية' : 'فرصة واعدة'}
                      </Badge>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-0 font-bold px-3 py-1 text-xs rounded-lg">
                        {record.sectorName}
                      </Badge>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-700 border-0 font-bold px-3 py-1 text-xs rounded-lg">
                        {statusLabels[record.status]}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground text-[15.5px] leading-relaxed font-medium max-w-4xl">
                {record.summary}
              </p>

              {/* 4 Metric Highlight Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-2">
                <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">درجة الأولوية</span>
                  <span className="text-xl sm:text-2xl font-black text-primary">{record.priorityScore} / 10</span>
                </div>
                <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">حجم السوق</span>
                  <span className="text-base sm:text-lg font-black text-foreground truncate">{marketLabels[record.marketBand]}</span>
                </div>
                <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">سهولة التنفيذ</span>
                  <span className="text-base sm:text-lg font-black text-foreground truncate">{easeLabels[record.easeBand]}</span>
                </div>
                <div className="flex flex-col gap-1.5 p-4 sm:p-5 rounded-2xl bg-muted/30 border border-border/60">
                  <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">إمكانية الربح</span>
                  <span className="text-base sm:text-lg font-black text-emerald-600 truncate">{profitLabels[record.profitBand]}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Facts Card */}
          <section id="facts" className="profile-section scroll-mt-24">
            <Card className="shadow-xs border-border overflow-hidden rounded-2xl">
              <CardHeader className="border-b border-border/50 bg-muted/30 pb-4">
                <CardTitle className="text-lg font-black flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
                    <Building2 className="size-5" />
                  </div>
                  حقائق الفكرة والسوق
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-border/50">
                  <div className="p-4 sm:p-5 hover:bg-muted/10 transition-colors">
                    <dt className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">القطاع الرئيسي</dt>
                    <dd className="font-bold text-sm text-foreground">{record.sectorName}</dd>
                  </div>
                  <div className="p-4 sm:p-5 hover:bg-muted/10 transition-colors">
                    <dt className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">القطاع الفرعي</dt>
                    <dd className="font-bold text-sm text-foreground">{record.subSectorName}</dd>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-border/50 divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-border/50">
                  <div className="p-4 sm:p-5 hover:bg-muted/10 transition-colors">
                    <dt className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">الجمهور المستهدف</dt>
                    <dd className="font-bold text-sm text-foreground">{record.audience}</dd>
                  </div>
                  <div className="p-4 sm:p-5 hover:bg-muted/10 transition-colors">
                    <dt className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">نموذج الإيراد المقترح</dt>
                    <dd className="font-bold text-sm text-foreground">{record.model}</dd>
                  </div>
                  <div className="p-4 sm:p-5 hover:bg-muted/10 transition-colors">
                    <dt className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">الميزانية المتوقعة</dt>
                    <dd className="font-bold text-sm text-foreground">{record.budget}</dd>
                  </div>
                </div>
                <div className="grid grid-cols-1 border-t border-border/50">
                  <div className="p-4 sm:p-5 bg-indigo-50/40 flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <dt className="text-xs font-bold text-indigo-800 mb-1 uppercase tracking-wider">مشروع / حل مرشح</dt>
                      <dd className="font-black text-base text-indigo-950">{record.linkedTitle}</dd>
                    </div>
                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0 pointer-events-none w-fit">
                      {competitionLabels[record.competitionBand]}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 3: Problem Analysis & Root Causes */}
          <section id="problem-analysis" className="profile-section scroll-mt-24 pb-10 border-b border-border/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
                <ShieldAlert className="size-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">تحليل المشكلة والفجوة السوقية</h2>
            </div>
            <ul className="space-y-3.5 pr-6 sm:pr-10 border-r-2 border-rose-100 py-1">
              {structuredData.rootCauses.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2.5 size-2 rounded-full bg-rose-400 shrink-0" />
                  <p className="text-[15px] text-foreground font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 4: Target Audience & Personas */}
          <section id="target-audience" className="profile-section scroll-mt-24 pb-10 border-b border-border/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
                <Target className="size-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">الشريحة والمستهدفون</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {structuredData.targetPersonas.map((persona, i) => (
                <Card key={i} className="shadow-2xs border-border bg-card">
                  <CardContent className="p-4 space-y-2">
                    <span className="text-xs font-bold text-muted-foreground uppercase">{persona.title}</span>
                    <p className="text-sm font-bold text-foreground leading-relaxed">{persona.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 5: Proposed Solution & Opportunity */}
          <section id="proposed-solution" className="profile-section scroll-mt-24 pb-10 border-b border-border/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                <Lightbulb className="size-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">الحل والفرصة المقترحة</h2>
            </div>
            <ul className="space-y-3.5 pr-6 sm:pr-10 border-r-2 border-amber-100 py-1">
              {structuredData.solutionFeatures.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-2.5 size-2 rounded-full bg-amber-400 shrink-0" />
                  <p className="text-[15px] text-foreground font-medium leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 6: Market Size & Financial Potential */}
          <section id="market-size" className="profile-section scroll-mt-24 pb-10 border-b border-border/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                <PieChart className="size-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">حجم السوق والنموذج المالي</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/40 space-y-2">
                <div className="text-xs font-bold text-emerald-700 uppercase">تصنيف إمكانات السوق</div>
                <div className="text-xl font-black text-emerald-950">{marketLabels[record.marketBand]}</div>
                <p className="text-xs text-emerald-800 leading-relaxed">تدرج سوقي واعد يتيح فرصة توليد عوائد مجزية بحال الاستحواذ على حارات في القطاع.</p>
              </div>
              <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/40 space-y-2">
                <div className="text-xs font-bold text-indigo-700 uppercase">نموذج تحقيق الربح</div>
                <div className="text-xl font-black text-indigo-950">{record.model}</div>
                <p className="text-xs text-indigo-800 leading-relaxed">اعتماد نموذج تدفقات نقدية واضحة ومستدامة ملائمة للشريحة المستهدفة.</p>
              </div>
            </div>
          </section>

          {/* Section 7: Execution Roadmap (MVP) */}
          <section id="execution-roadmap" className="profile-section scroll-mt-24 pb-10 border-b border-border/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-violet-50 text-violet-600">
                <Rocket className="size-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">خريطة الطريق والتنفيذ (MVP)</h2>
            </div>
            <div className="relative border-r-2 border-violet-100 pr-6 sm:pr-10 py-1 space-y-6">
              {structuredData.roadmapSteps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="absolute w-2.5 h-2.5 bg-violet-500 rounded-full -right-[29px] sm:-right-[45px] top-1.5 ring-4 ring-background" />
                  <h4 className="text-xs font-black text-violet-600 mb-1 uppercase tracking-wide">{step.date}</h4>
                  <p className="text-[15px] text-foreground font-medium leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Competition & Alternatives */}
          <section id="competition" className="profile-section scroll-mt-24 pb-10 border-b border-border/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                <Users className="size-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">المنافسة والبدائل الحالية</h2>
            </div>
            <div className="p-5 rounded-2xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">شدة المنافسة بالسوق</span>
                <Badge variant="outline" className="font-bold">{competitionLabels[record.competitionBand]}</Badge>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                يعتمد أغلب المتعاملين حالياً على الحلول التقليدية أو البرمجيات العامة غير المتخصصة، مما يوفر نافذة دخول استراتيجية لبناء حل مخصص يتفوق في تجربة المستخدم والسرعة.
              </p>
            </div>
          </section>

          {/* Section 9: Suggested Tech Stack & Tools */}
          <section id="tech-stack" className="profile-section scroll-mt-24">
            <h3 className="text-xl sm:text-2xl font-black mb-6 flex items-center gap-3 text-foreground">
              <div className="p-2 rounded-xl bg-pink-100 text-pink-600">
                <Code className="size-5" />
              </div>
              التقنيات والأدوات المقترحة للبناء
            </h3>
            <div className="flex flex-wrap gap-2.5 p-5 rounded-2xl bg-muted/20 border border-border/60">
              {structuredData.techTools.map((tool: string, i: number) => {
                const branding = getToolBranding(tool);
                return (
                  <Badge key={i} variant="outline" className={cn("flex items-center gap-2.5 text-sm font-bold px-3.5 py-2 rounded-xl border shadow-2xs transition-all hover:scale-105 cursor-default", branding.colors)}>
                    <div className="p-1 rounded-lg bg-white/80 shadow-2xs shrink-0">
                      {branding.icon}
                    </div>
                    {tool}
                  </Badge>
                );
              })}
            </div>
          </section>

          {/* Section 10: Risks & Challenges */}
          <section id="risks-challenges" className="profile-section scroll-mt-24">
            <h3 className="text-xl sm:text-2xl font-black mb-6 flex items-center gap-3 text-foreground">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <ShieldAlert className="size-5" />
              </div>
              المخاطر والتحديات الرئيسية
            </h3>
            <div className="grid gap-3">
              {structuredData.risksList.map((risk, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-amber-200/60 bg-amber-50/30 text-amber-950 font-semibold text-sm">
                  <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{risk}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 11: Executive Recommendations / Lessons */}
          <section id="lessons" className="profile-section scroll-mt-24">
            <Card className="shadow-md border-emerald-200 overflow-hidden rounded-2xl">
              <CardHeader className="p-5 border-b border-emerald-100 bg-emerald-600 text-white">
                <CardTitle className="text-lg font-black flex items-center gap-3">
                  <FileText className="size-5 text-emerald-100" />
                  خلاصة التوصيات والدروس التنفيذية
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 bg-emerald-50/30">
                <ul className="space-y-3">
                  {structuredData.recommendations.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-emerald-100 text-emerald-950 font-bold text-sm shadow-2xs">
                      <div className="p-1 rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                        <Check className="size-4" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ProblemDeepDive;
