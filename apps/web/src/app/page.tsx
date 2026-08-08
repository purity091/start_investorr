"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { ProvenProjectsTable } from '@/components/features/business/ProvenProjectsTable';
import { fetchPublicJson } from '@/lib/publicData';
import { LandingNavbar } from '@/components/layout/LandingNavbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { 
  ArrowLeft, 
  BarChart3, 
  BrainCircuit, 
  CheckCircle2, 
  Compass, 
  Layers, 
  Rocket, 
  Target, 
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles,
  Palette,
  Lock,
  BookOpen,
  GraduationCap,
  Calculator,
  DollarSign,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  AlertCircle,
  Building2,
  Check,
  Laptop,
  Cpu,
  Globe,
  Users,
  Menu,
  FileText
} from 'lucide-react';
import { useAuthModal } from '@/features/auth/AuthModalContext';

const INITIAL_PREVIEW_PROJECTS = [
  {
    id: "salla",
    name: "سلة (Salla)",
    headline: "منصة التجارة الإلكترونية الأكثر نمواً للمتاجر في العالم العربي",
    category: "SaaS / تجارة إلكترونية",
    company: { location: "المملكة العربية السعودية", business_model: "Subscription + Transaction Fee" },
    last_updated: "منذ ساعتين",
    directory_snapshot: { monthly_revenue: "$8.5M /mo" }
  },
  {
    id: "foodics",
    name: "فودكس (Foodics)",
    headline: "منصة إدارة المطاعم والمقاهي ونقاط البيع السحابية",
    category: "SaaS / المطاعم والضيافة",
    company: { location: "المملكة العربية السعودية", business_model: "B2B SaaS" },
    last_updated: "منذ 3 ساعات",
    directory_snapshot: { monthly_revenue: "$14.2M /mo" }
  },
  {
    id: "tamara",
    name: "تمارا (Tamara)",
    headline: "خدمة الشراء الآن والدفع لاحقاً (BNPL) الرائدة في الخليج",
    category: "FinTech / مدفوعات",
    company: { location: "المملكة العربية السعودية", business_model: "Transaction Fee" },
    last_updated: "منذ 5 ساعات",
    directory_snapshot: { monthly_revenue: "$32.0M /mo" }
  },
  {
    id: "beehiiv",
    name: "beehiiv",
    headline: "منصة نشر النشرات البريدية وإدارة اشتراكات القراء",
    category: "Micro-SaaS / صناعة المحتوى",
    company: { location: "الولايات المتحدة", business_model: "Freemium SaaS" },
    last_updated: "منذ يومين",
    directory_snapshot: { monthly_revenue: "$1.2M /mo" }
  },
  {
    id: "tabby",
    name: "تابي (Tabby)",
    headline: "حلول التسوق والدفع الذكي في متاجر التجزئة",
    category: "FinTech / تقنية مالية",
    company: { location: "الإمارات العربية المتحدة", business_model: "Merchant Commission" },
    last_updated: "منذ 3 أيام",
    directory_snapshot: { monthly_revenue: "$28.4M /mo" }
  },
  {
    id: "thndr",
    name: "ثندر (Thndr)",
    headline: "تطبيق الاستثمار وتداول الأسهم في الشرق الأوسط",
    category: "FinTech / استثمار",
    company: { location: "مصر", business_model: "Commission Free + Premium" },
    last_updated: "منذ 4 أيام",
    directory_snapshot: { monthly_revenue: "$3.8M /mo" }
  },
  {
    id: "notion",
    name: "Notion",
    headline: "مساحة العمل المتكاملة للمستندات والمشاريع",
    category: "SaaS / إنتاجية",
    company: { location: "الولايات المتحدة", business_model: "B2B / B2C SaaS" },
    last_updated: "منذ 5 أيام",
    directory_snapshot: { monthly_revenue: "$67.0M /mo" }
  },
  {
    id: "canva",
    name: "Canva",
    headline: "منصة التصميم الجرافيكي السحابية الأسهل في العالم",
    category: "SaaS / تصميم",
    company: { location: "أستراليا", business_model: "Freemium Subscription" },
    last_updated: "منذ أسبوع",
    directory_snapshot: { monthly_revenue: "$140.0M /mo" }
  }
];

export default function LandingPage() {
  const { openAuthModal } = useAuthModal();
  const [projectsList, setProjectsList] = useState<any[]>(INITIAL_PREVIEW_PROJECTS);
  const [activeTableTab, setActiveTableTab] = useState<'all' | 'saas' | 'micro-saas'>('all');
  
  // Calculator State
  const [subscribers, setSubscribers] = useState<number>(150);
  const [pricePerMonth, setPricePerMonth] = useState<number>(39);
  const [churnRate, setChurnRate] = useState<number>(3.5);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Fetch real public data asynchronously for initial preview
  useEffect(() => {
    fetchPublicJson<any[]>('/api/public-data/proven-projects')
      .then((data) => {
        if (data && Array.isArray(data) && data.length > 0) {
          setProjectsList(data);
        }
      })
      .catch((err) => {
        console.warn('Failed to load initial preview data:', err);
      });
  }, []);

  // Filtered dataset for Table preview based on active tab
  const displayProjects = useMemo(() => {
    if (activeTableTab === 'saas') {
      return projectsList.filter(item => {
        const cat = (item.category || '').toLowerCase();
        return cat.includes('saas') || cat.includes('برمجيات') || cat.includes('اشتراك');
      });
    }
    if (activeTableTab === 'micro-saas') {
      return projectsList.filter(item => {
        const cat = (item.category || '').toLowerCase();
        return cat.includes('micro') || cat.includes('أداة') || cat.includes('مصغرة');
      });
    }
    return projectsList;
  }, [projectsList, activeTableTab]);

  // Calculator Calculations
  const calculatedMetrics = useMemo(() => {
    const mrr = subscribers * pricePerMonth;
    const arr = mrr * 12;
    const ltv = churnRate > 0 ? (pricePerMonth / (churnRate / 100)) : 0;
    return {
      mrr: Math.round(mrr),
      arr: Math.round(arr),
      ltv: Math.round(ltv)
    };
  }, [subscribers, pricePerMonth, churnRate]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleRowClick = () => {
    openAuthModal('register');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      
      {/* Landing Navbar Component */}
      <LandingNavbar />

      <main className="flex flex-col gap-20 pb-20">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-24 border-b border-border/40">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="container relative mx-auto px-4 text-center max-w-5xl">
            <h1 className="mx-auto text-3xl font-black tracking-tight text-foreground sm:text-5xl md:text-6xl leading-[1.2]">
              حوّل فكرتك الطموحة إلى <span className="text-primary">مشروع حقيقي</span> قابل للنمو والاستثمار
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">
              استكشف أكثر من +500 فكرة مشروع SaaS وMicro-SaaS ناجحة ومحللة بالكامل في الجدول، وابنِ نموذج عملك التجاري (BMC) وفق منهجيات Lean Startup العالمية.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={() => openAuthModal('register')} size="lg" className="w-full sm:w-auto text-sm font-bold px-8 h-12 gap-2 shadow-2xs cursor-pointer">
                ابدأ بناء مشروعك مجاناً
                <Rocket className="size-4" />
              </Button>
              <a href="#table-preview">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-sm font-bold px-8 h-12 gap-2">
                  <Compass className="size-4 text-primary" />
                  معاينة جدول المشاريع
                </Button>
              </a>
            </div>
            
            {/* Quick Metrics Trust Bar */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-card border border-border/80 shadow-2xs max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center p-3 border-l border-border/60 last:border-l-0">
                <span className="text-2xl font-black text-primary">+500</span>
                <span className="text-xs font-medium text-muted-foreground mt-0.5">فكرة وحالة دراسية</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border-l border-border/60 last:border-l-0">
                <span className="text-2xl font-black text-foreground">+100</span>
                <span className="text-xs font-medium text-muted-foreground mt-0.5">قطاع وسوق عربي وعالمي</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3 border-l border-border/60 last:border-l-0">
                <span className="text-2xl font-black text-foreground">24</span>
                <span className="text-xs font-medium text-muted-foreground mt-0.5">خطوة منهجية وفق MIT</span>
              </div>
              <div className="flex flex-col items-center justify-center p-3">
                <span className="text-2xl font-black text-emerald-600">100%</span>
                <span className="text-xs font-medium text-muted-foreground mt-0.5">أمان وحفظ سحابي</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: Table Preview with Segmented Category Filter & Locked Overlay */}
        <section id="table-preview" className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-6 space-y-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-bold px-3 py-1 rounded-full gap-1.5 mx-auto">
              <Building2 className="size-3.5" />
              قواعد البيانات الميدانية
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight text-center mx-auto">
              جدول المشاريع والشركات الناجحة
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed text-center mx-auto">
              جدول تفاعلي مباشر من داخل المنصة. اختر التصنيف لمعاينة المشاريع، بينما تظل بقية الصفوف مغلقة لتسجيل المستخدمين الجدد.
            </p>
          </div>

          {/* Segmented Tab Filter Bar */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 rounded-xl bg-muted border border-border/60 text-xs font-bold gap-1">
              <button
                onClick={() => setActiveTableTab('all')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTableTab === 'all' 
                    ? 'bg-card text-foreground shadow-2xs font-extrabold' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                جميع المشاريع ({projectsList.length})
              </button>
              <button
                onClick={() => setActiveTableTab('saas')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTableTab === 'saas' 
                    ? 'bg-primary text-primary-foreground shadow-2xs font-extrabold' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Laptop className="size-3.5" />
                أفكار مشاريع SaaS
              </button>
              <button
                onClick={() => setActiveTableTab('micro-saas')}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                  activeTableTab === 'micro-saas' 
                    ? 'bg-primary text-primary-foreground shadow-2xs font-extrabold' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Cpu className="size-3.5" />
                أفكار Micro-SaaS
              </button>
            </div>
          </div>

          {/* Table Container with Blur & Lock Overlay */}
          <div className="relative rounded-2xl border border-border bg-card p-3 sm:p-5 shadow-sm overflow-hidden">
            
            {/* The Actual Application Table Component */}
            <div className="max-h-[460px] overflow-hidden select-none pointer-events-auto">
              <ProvenProjectsTable data={displayProjects} onRowClick={handleRowClick} />
            </div>

            {/* Locked Blur Overlay starting after row 3 */}
            <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-background via-background/95 to-transparent backdrop-blur-[4px] flex flex-col items-center justify-end p-6 text-center z-20">
              <div className="max-w-xl space-y-3.5 bg-card/95 border border-border p-6 rounded-2xl shadow-xl backdrop-blur-md">
                <div className="size-12 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center mx-auto shadow-2xs">
                  <Lock className="size-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-black text-foreground">
                    هناك أكثر من +500 شركة وفكرة مشروع SaaS مكتملة البيانات في الجدول!
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed">
                    سجل حسابك المجاني فوراً للوصول الكامل لكافة الصفوف، البيانات المالية، وتحليلات المنافسين دون أي قيود.
                  </p>
                </div>
                <div className="pt-2">
                  <Button onClick={() => openAuthModal('register')} size="lg" className="w-full sm:w-auto font-bold text-xs sm:text-sm h-11 px-8 gap-2 shadow-2xs bg-primary hover:bg-primary/90 cursor-pointer">
                    تسجيل الدخول / إنشاء حساب مجاني لفتح كافة الصفوف
                    <ArrowLeft className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: Featured SaaS Business Models & Revenue Strategy Cards */}
        <section id="saas-models" className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 space-y-2">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-700 border-blue-500/20 text-xs font-bold px-3 py-1 rounded-full gap-1.5 mx-auto">
              <Laptop className="size-3.5" />
              نماذج مشاريع SaaS البرمجية
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight text-center mx-auto">
              نماذج عمل وتحليلات نمو لشركات SaaS ناجحة
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed text-center mx-auto">
              استكشف كيف تبني وتصيغ نماذج التسعير، الاشتراكات المتكررة (MRR)، وشريحة العملاء المستهدفة في مشاريع البرمجيات.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* SaaS Model Card 1: Enterprise B2B SaaS */}
            <Card className="border-border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between bg-card relative overflow-hidden text-center">
              <div className="h-1.5 bg-blue-600 w-full"></div>
              <CardHeader className="p-5 pb-3 flex flex-col items-center">
                <div className="flex items-center justify-between gap-2 mb-2 w-full">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-0 text-[10px] font-bold">
                    B2B Enterprise SaaS
                  </Badge>
                  <span className="text-xs font-black text-blue-700">$14.2M ARR</span>
                </div>
                <CardTitle className="text-base font-bold text-foreground text-center">
                  فودكس (Foodics SaaS)
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1 leading-relaxed text-center">
                  منصة إدارة المطاعم والمقاهي ونقاط البيع السحابية.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3 text-xs flex flex-col items-center">
                <div className="space-y-1.5 p-3 rounded-xl bg-muted/40 border border-border/50 font-medium w-full text-center">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">نموذج التسعير:</span>
                    <span className="font-bold text-foreground">اشتراك سنوي + رسوم جهاز</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">الجمهور المستهدف:</span>
                    <span className="font-bold text-foreground">مطاعم ومقاهي</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">نسبة الاحتفاظ:</span>
                    <span className="font-bold text-emerald-600">92% Net Retention</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex justify-center">
                <Button onClick={() => openAuthModal('login')} variant="outline" size="sm" className="w-full text-xs font-bold gap-1.5 justify-center cursor-pointer">
                  تصفح تحليل الـ SaaS الكامل
                  <ArrowLeft className="size-3" />
                </Button>
              </CardFooter>
            </Card>

            {/* SaaS Model Card 2: Creator Economy SaaS */}
            <Card className="border-border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between bg-card relative overflow-hidden text-center">
              <div className="h-1.5 bg-purple-600 w-full"></div>
              <CardHeader className="p-5 pb-3 flex flex-col items-center">
                <div className="flex items-center justify-between gap-2 mb-2 w-full">
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-0 text-[10px] font-bold">
                    Creator SaaS
                  </Badge>
                  <span className="text-xs font-black text-purple-700">$2.4M MRR</span>
                </div>
                <CardTitle className="text-base font-bold text-foreground text-center">
                  ConvertKit / Beehiiv
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1 leading-relaxed text-center">
                  منصات النشرات البريدية وتسويق صناع المحتوى.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3 text-xs flex flex-col items-center">
                <div className="space-y-1.5 p-3 rounded-xl bg-muted/40 border border-border/50 font-medium w-full text-center">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">نموذج التسعير:</span>
                    <span className="font-bold text-foreground">تدرج حسب عدد المشتركين</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">الجمهور المستهدف:</span>
                    <span className="font-bold text-foreground">صناع المحتوى والمدربون</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">نمو الإيراد:</span>
                    <span className="font-bold text-purple-600">Freemium to Paid</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex justify-center">
                <Button onClick={() => openAuthModal('login')} variant="outline" size="sm" className="w-full text-xs font-bold gap-1.5 justify-center cursor-pointer">
                  تصفح تحليل الـ SaaS الكامل
                  <ArrowLeft className="size-3" />
                </Button>
              </CardFooter>
            </Card>

            {/* SaaS Model Card 3: Micro-SaaS Boilerplate */}
            <Card className="border-border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between bg-card relative overflow-hidden text-center">
              <div className="h-1.5 bg-emerald-600 w-full"></div>
              <CardHeader className="p-5 pb-3 flex flex-col items-center">
                <div className="flex items-center justify-between gap-2 mb-2 w-full">
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-0 text-[10px] font-bold">
                    Micro-SaaS Tool
                  </Badge>
                  <span className="text-xs font-black text-emerald-700">$45K / mo</span>
                </div>
                <CardTitle className="text-base font-bold text-foreground text-center">
                  ShipFast / Plausible
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1 leading-relaxed text-center">
                  أدوات برمجية مخصصة ومصغرة لإطلاق التطبيقات بسرعة.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3 text-xs flex flex-col items-center">
                <div className="space-y-1.5 p-3 rounded-xl bg-muted/40 border border-border/50 font-medium w-full text-center">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">نموذج التسعير:</span>
                    <span className="font-bold text-foreground">شراء لمرة واحدة أو اشتراك</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">فترة الإطلاق:</span>
                    <span className="font-bold text-foreground">أسبوعين فقط</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">هيكل التكاليف:</span>
                    <span className="font-bold text-emerald-600">منخفض جداً (Solopreneur)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex justify-center">
                <Button onClick={() => openAuthModal('login')} variant="outline" size="sm" className="w-full text-xs font-bold gap-1.5 justify-center cursor-pointer">
                  تصفح تحليل الـ SaaS الكامل
                  <ArrowLeft className="size-3" />
                </Button>
              </CardFooter>
            </Card>

            {/* SaaS Model Card 4: Developer Infrastructure SaaS */}
            <Card className="border-border shadow-2xs hover:shadow-md transition-all flex flex-col justify-between bg-card relative overflow-hidden text-center">
              <div className="h-1.5 bg-amber-600 w-full"></div>
              <CardHeader className="p-5 pb-3 flex flex-col items-center">
                <div className="flex items-center justify-between gap-2 mb-2 w-full">
                  <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-0 text-[10px] font-bold">
                    Dev SaaS Infrastructure
                  </Badge>
                  <span className="text-xs font-black text-amber-700">$850K MRR</span>
                </div>
                <CardTitle className="text-base font-bold text-foreground text-center">
                  Vercel / Resend
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1 leading-relaxed text-center">
                  بنية تحتية سحابية للمطورين والشركات التقنية.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3 text-xs flex flex-col items-center">
                <div className="space-y-1.5 p-3 rounded-xl bg-muted/40 border border-border/50 font-medium w-full text-center">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">نموذج التسعير:</span>
                    <span className="font-bold text-foreground">حسب الاستهلاك (Pay as you go)</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">الجمهور المستهدف:</span>
                    <span className="font-bold text-foreground">فرق البرمجة والمطورون</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-muted-foreground">استراتيجية النمو:</span>
                    <span className="font-bold text-amber-600">Product-Led Growth (PLG)</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-5 pt-0 flex justify-center">
                <Button onClick={() => openAuthModal('login')} variant="outline" size="sm" className="w-full text-xs font-bold gap-1.5 justify-center cursor-pointer">
                  تصفح تحليل الـ SaaS الكامل
                  <ArrowLeft className="size-3" />
                </Button>
              </CardFooter>
            </Card>

          </div>
        </section>

        {/* SECTION 3: Interactive Financial & SaaS Growth Calculator */}
        <section id="calculator" className="bg-muted/40 py-16 border-y border-border/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 space-y-2">
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full gap-1.5 mx-auto">
                <Calculator className="size-3.5" />
                حاسبة الأرباح والمؤشرات
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight text-center mx-auto">
                قدر إيرادات ومؤشرات نمو مشروعك القادم
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed text-center mx-auto">
                جرب الحاسبة التفاعلية لتقدير الإيرادات المتكررة (MRR / ARR) ومتوسط قيمة العميل (LTV).
              </p>
            </div>

            {/* Interactive Calculator Widget */}
            <div className="grid lg:grid-cols-12 gap-8 bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
              
              {/* Inputs Column */}
              <div className="lg:col-span-6 space-y-6">
                <h3 className="text-base font-extrabold text-foreground border-b border-border pb-3 flex items-center gap-2">
                  <DollarSign className="size-4 text-primary" />
                  مدخلات الاشتراك والعملاء
                </h3>

                {/* Subscriber Count Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <label className="text-foreground">عدد المشتركين / العملاء المتوقعين:</label>
                    <span className="text-primary font-black bg-primary/10 px-2 py-0.5 rounded-md">{subscribers} عميل</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="2000" 
                    step="10"
                    value={subscribers} 
                    onChange={(e) => setSubscribers(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                  />
                </div>

                {/* Price Per Month Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <label className="text-foreground">متوسط الاشتراك الشهري (بالدولار):</label>
                    <span className="text-primary font-black bg-primary/10 px-2 py-0.5 rounded-md">${pricePerMonth} / شهر</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="500" 
                    step="5"
                    value={pricePerMonth} 
                    onChange={(e) => setPricePerMonth(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
                  />
                </div>

                {/* Churn Rate Input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <label className="text-foreground">معدل التخلي الشهري المتوقع (Churn Rate):</label>
                    <span className="text-amber-700 font-black bg-amber-50 px-2 py-0.5 rounded-md">{churnRate}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="15" 
                    step="0.5"
                    value={churnRate} 
                    onChange={(e) => setChurnRate(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-muted rounded-lg cursor-pointer"
                  />
                  <p className="text-[11px] text-muted-foreground">معدل العملاء الذين يلغون اشتراكهم شهرياً.</p>
                </div>
              </div>

              {/* Live Output Metrics Column */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-4 bg-muted/30 p-6 rounded-xl border border-border/60">
                <h3 className="text-base font-extrabold text-foreground border-b border-border pb-3 flex items-center gap-2">
                  <TrendingUp className="size-4 text-emerald-600" />
                  المؤشرات المالية التقديرية المحسوبة
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-card border border-border/80 text-center space-y-1 shadow-2xs">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">الإيراد الشهري (MRR)</span>
                    <span className="text-xl font-black text-primary block">${calculatedMetrics.mrr.toLocaleString()}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border/80 text-center space-y-1 shadow-2xs">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">الإيراد السنوي (ARR)</span>
                    <span className="text-xl font-black text-emerald-700 block">${calculatedMetrics.arr.toLocaleString()}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-card border border-border/80 text-center space-y-1 shadow-2xs">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase block">قيمة العميل (LTV)</span>
                    <span className="text-xl font-black text-foreground block">${calculatedMetrics.ltv.toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200/80 text-emerald-900 text-xs leading-relaxed font-medium">
                  <span className="font-bold block mb-0.5">تحليل الجاهزية:</span>
                  مشروعك بهذا العدد من المشتركين يولد إيراداً سنوياً قدره <strong>${calculatedMetrics.arr.toLocaleString()}</strong> وهو مؤشر ممتاز للانتقال لبناء نموذج العمل في المنصة.
                </div>

                <Button onClick={() => openAuthModal('register')} className="w-full font-bold text-xs h-10 gap-2 cursor-pointer">
                  احفظ الحسابات وابدأ بناء نموذج عملك الآن
                  <ArrowLeft className="size-4" />
                </Button>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: Core Platform Features */}
        <section id="features" className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 space-y-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-bold px-3 py-1 rounded-full gap-1.5 mx-auto">
              <Zap className="size-3.5" />
              أدوات المنصة المتكاملة
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight text-center mx-auto">
              كل ما تحتاجه لإطلاق مشروعك وتوثيقه
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed text-center mx-auto">
              أدوات تفاعلية ترافقك في كل مرحلة من مراحل التفكير والتحليل وحتى كتابة خطة التنفيذ.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'استكشاف قطاعات السوق',
                description: 'تصفح أكثر من 100 قطاع استثماري، واكتشف حجم السوق والمنافسين المحليين والإقليميين.',
                icon: Compass,
                color: 'text-blue-600',
                bg: 'bg-blue-500/10'
              },
              {
                title: 'محرك المشكلات والفرص',
                description: 'حلل الآلام الحقيقية في السوق وحول المشكلات الشائعة إلى فرص استثمارية مربحة.',
                icon: Target,
                color: 'text-amber-600',
                bg: 'bg-amber-500/10'
              },
              {
                title: 'نموذج العمل التجاري (BMC)',
                description: 'ابنِ وتفاعل مع العناصر التسعة لنموذج عملك التجاري بواجهة أنيقة ومترابطة.',
                icon: Layers,
                color: 'text-emerald-600',
                bg: 'bg-emerald-500/10'
              },
              {
                title: 'رادار الشركات الناجحة والفاشلة',
                description: 'تعلم من تجارب الشركات العالمية السابقة واطلع على أسباب الفشل لتجنب الأخطاء المكلفة.',
                icon: BarChart3,
                color: 'text-purple-600',
                bg: 'bg-purple-500/10'
              },
              {
                title: 'استوديو الهوية البصرية',
                description: 'حدد نبرة صوت مشروعك واصنع دليلاً بصرياً أولياً (Brand Book) بأسلوب احترافي.',
                icon: Palette,
                color: 'text-pink-600',
                bg: 'bg-pink-500/10'
              },
              {
                title: 'تقييم الاستراتيجية بالذكاء الاصطناعي',
                description: 'احصل على تقييم فوري للجاهزية وتوصيات مخصصة لتقوية نقاط الضعف في دراستك.',
                icon: BrainCircuit,
                color: 'text-primary',
                bg: 'bg-primary/10'
              }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card key={i} className="border-border shadow-2xs hover:shadow-md transition-all bg-card text-center">
                  <CardContent className="p-6 flex flex-col items-center">
                    <div className={`size-11 rounded-xl flex items-center justify-center mb-5 mx-auto ${feature.bg}`}>
                      <Icon className={`size-5 ${feature.color}`} />
                    </div>
                    <h3 className="text-base font-extrabold text-foreground mb-2 text-center">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: Platform Academy Showcase */}
        <section id="academy" className="container mx-auto px-4 max-w-7xl">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-2xs">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 pb-6 border-b border-border/80 space-y-4">
              <div className="space-y-2 flex flex-col items-center text-center mx-auto">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-bold px-3 py-1 rounded-full gap-1.5 mx-auto">
                  <GraduationCap className="size-3.5" />
                  أكاديمية المنصة والمفاهيم
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight text-center mx-auto">
                  دليل المفاهيم والمصطلحات الميدانية للخطة
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium max-w-2xl leading-relaxed text-center mx-auto">
                  مقالات وتحليلات تعليمية مركزة تشرح لك كيفية تقييم الأفكار، وحساب مقاييس النمو، وإعداد دراسة الجدوى.
                </p>
              </div>

              <Link href="/platform-academy" className="shrink-0 mx-auto">
                <Button variant="outline" className="font-bold text-xs h-11 px-5 gap-2">
                  <BookOpen className="size-4 text-primary" />
                  تصفح الأكاديمية كاملة (18 مقال)
                </Button>
              </Link>
            </div>

            {/* 3 Featured Highlight Articles */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'فهم مقاييس الـ SaaS: ARR, MRR, Churn & CAC',
                  summary: 'دليل مبسط لحساب واستخدام المقاييس المالية التي يطلبها المستثمرون قبل تقديم أي تمويل.',
                  category: 'المؤشرات والمالية',
                  level: 'مبتدئ',
                  slug: 'saas-metrics-101'
                },
                {
                  title: 'صياغة عرض القيمة الفريدة (Value Proposition)',
                  summary: 'كيف تميز مشروعك عن المنافسين وتحدد السبب الجوهري الذي يدفع العملاء للشراء.',
                  category: 'نموذج العمل',
                  level: 'متوسط',
                  slug: 'value-proposition-craft'
                },
                {
                  title: 'تحليل الفجوات والبدائل السوقية (Market Gaps)',
                  summary: 'كيفية اكتشاف الثغرات في خدمات المنافسين الحاليين وتحويلها إلى ميزة تنافسية قاتلة.',
                  category: 'تحليل السوق',
                  level: 'متقدم',
                  slug: 'market-gaps-analysis'
                }
              ].map((art, i) => (
                <div key={i} className="p-5 rounded-2xl bg-muted/30 border border-border/60 flex flex-col justify-between gap-4 text-center">
                  <div className="space-y-2 flex flex-col items-center">
                    <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground w-full">
                      <span className="text-primary">{art.category}</span>
                      <Badge variant="secondary" className="text-[10px] font-bold">{art.level}</Badge>
                    </div>
                    <h3 className="text-sm font-extrabold text-foreground leading-snug text-center">{art.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed text-center">{art.summary}</p>
                  </div>

                  <Link href={`/platform-academy?article=${art.slug}`}>
                    <Button variant="ghost" size="sm" className="w-full text-xs font-bold justify-center p-0 hover:bg-transparent text-primary hover:text-primary/80 gap-1.5">
                      <span>قراءة المقال التعليمي</span>
                      <ArrowLeft className="size-3.5" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: FAQ Accordion */}
        <section id="faq" className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 space-y-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-bold px-3 py-1 rounded-full gap-1.5 mx-auto">
              <HelpCircle className="size-3.5" />
              الأسئلة الشائعة
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight text-center mx-auto">
              إجابات عن منصة خطة وقواعد البيانات
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed text-center mx-auto">
              كل ما تحتاج معرفته حول إنشاء الحساب، نموذج العمل التجاري (BMC)، حاسبة الإيرادات، وأمان البيانات.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {[
              {
                q: 'ما هي منصة خطة وكيف تساعدني في بناء ودراسة مشروعي؟',
                a: 'منصة "خطة" هي البيئة الأولى من نوعها لبناء ودراسة المشاريع الريادية. توفر لك قاعدة بيانات موثقة تضم +500 شركة ودراسة حالة، وأدوات تفاعلية مثل استوديو نموذج العمل (BMC) القائم على الذكاء الاصطناعي ومنهجية MIT، وحاسبة الإيرادات المتكررة (MRR / ARR)، مع توثيق خطط التسعير والتكاليف التشغيلية.'
              },
              {
                q: 'هل المنصة مخصصة لمشاريع الـ SaaS فقط أم لجميع القطاعات؟',
                a: 'تغطي المنصة أكثر من 100 قطاع استثماري متنوع (مثل التجارة الإلكترونية، التقنية المالية FinTech، الصحة الرقمية، الخدمات اللوجستية، والحلول البرمجية). سواء كنت تبني مشروع SaaS أو متجراً إلكترونياً أو شركة خدمية، تمنحك المنصة الأدوات المناسبة لبناء دراستك.'
              },
              {
                q: 'كيف تعمل حاسبة الإيرادات (MRR / ARR) وكيف تفيدني في التخطيط المالي؟',
                a: 'تمكنك الحاسبة التفاعلية من إدخال أعداد المشتركين المتوقعين، قيمة الاشتراك الشهري، ومعدل التسرب (Churn Rate) لحساب الإيرادات الشهرية والسنوية المتكررة تلقائياً، بالإضافة لحساب قيمة العميل مدى الحياة (LTV) وتوقع الفترة الزمنية لاسترداد التكاليف.'
              },
              {
                q: 'هل يمكنني بناء دراسة نموذج العمل التجاري (BMC) وتصديرها؟',
                a: 'نعم، يتيح لك استوديو نموذج العمل (BMC Studio) بناء العناصر التسعة لمشروعك (عرض القيمة، قنوات التوزيع، شرائح العملاء، مصادر الإيرادات...) بمساعدة محرك الذكاء الاصطناعي، ثم حفظ التقرير أو مشاركته مع فريقك والمستثمرين عبر رابط مشاركة آمن.'
              },
              {
                q: 'كيف تضمن المنصة سرية وخصوصية بيانات مشروعي ونموذج عملي؟',
                a: 'تُحفظ جميع مشاريعك ونماذج عملك سحابياً بتقنيات التشفير المتقدمة والحماية المشددة على مستوى الصفوف (Row Level Security - RLS). بياناتك خاصة 100% ولن يستطيع أي طرف ثالث الاطلاع عليها إلا إذا اخترت بنفسك إنشاء رابط مشاركة عمومي.'
              },
              {
                q: 'هل تتطلب تجربة المنصة والتسجيل المجاني بطاقة ائتمان؟',
                a: 'لا، يمكنك إنشاء حساب مجاني بالكامل واستكشاف قواعد البيانات الميدانية، واستخدام الحاسبة التفاعلية والأكاديمية، ومعاينة المشاريع الناجحة دون الحاجة لإدخال أي بطاقة ائتمان أو التزامات مالية.'
              }
            ].map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-border bg-card overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-4 hover:bg-muted/40 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold text-foreground">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="size-4 text-primary shrink-0" />
                    ) : (
                      <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 font-medium">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="bg-primary text-primary-foreground p-8 sm:p-14 rounded-3xl text-center space-y-6 shadow-md relative overflow-hidden">
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              جاهز لإحياء فكرتك وبناء دراسة عملك القادمة؟
            </h2>
            <p className="text-sm sm:text-base opacity-90 max-w-2xl mx-auto leading-relaxed">
              انضم إلى آلاف المبتكرين ورواد الأعمال الذين يستكشفون الفرص ويبنون نماذج أعمالهم بثقة عبر منصة خطة.
            </p>
            <div className="pt-2">
              <Button onClick={() => openAuthModal('register')} size="lg" variant="secondary" className="font-extrabold text-sm px-8 h-12 gap-2 shadow-sm cursor-pointer">
                انشئ حسابك المجاني الآن
                <ArrowLeft className="size-4" />
              </Button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-slate-950 text-slate-300 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground font-black text-base">
                  خ
                </div>
                <span className="text-xl font-black text-white">خطة<span className="text-primary">.</span></span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                المنصة العربية الأولى لبناء وتوثيق نماذج العمل التجاري ودراسة قطاعات السوق وفق المنهجيات الريادية العالمية.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs mb-4">المنتج والخيارات</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/market-discovery" className="hover:text-white transition-colors">استكشاف قطاعات السوق</Link></li>
                <li><Link href="/saas-ideas" className="hover:text-white transition-colors">أفكار مشاريع SaaS</Link></li>
                <li><Link href="/micro-saas-ideas" className="hover:text-white transition-colors">أفكار Micro-SaaS</Link></li>
                <li><Link href="/proven-projects" className="hover:text-white transition-colors">أفكار شركات ناجحة</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs mb-4">المصادر والأكاديمية</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/platform-academy" className="hover:text-white transition-colors">أكاديمية خطة والمفاهيم</Link></li>
                <li><Link href="/failed-projects" className="hover:text-white transition-colors">تحليل الشركات التي فشلت</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">الأسئلة الشائعة</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs mb-4">الشركة والخصوصية</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">من نحن</Link></li>
                <li><Link href="/contact-us" className="hover:text-white transition-colors">اتصل بنا</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">شروط الاستخدام</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} منصة خطة. جميع الحقوق محفوظة.</p>
            <p>مبنية وفق معايير Shadcn UI ودعم كامل للغة العربية.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
