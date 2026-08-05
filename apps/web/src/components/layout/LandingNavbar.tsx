"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/Input';
import {
  ChevronDown,
  Sparkles,
  Bot,
  LayoutGrid,
  Palette,
  Calculator,
  Compass,
  BarChart3,
  TrendingDown,
  BookOpen,
  GraduationCap,
  HelpCircle,
  ArrowLeft,
  Search,
  Menu,
  X,
  Target,
  ShieldCheck,
  Building2,
  DollarSign,
  Laptop,
  Cpu,
  Layers,
  ChevronLeft
} from 'lucide-react';
import { useAuthModal } from '@/features/auth/AuthModalContext';
import { cn } from '@/lib/utils';

export const LandingNavbar: React.FC = () => {
  const { openAuthModal } = useAuthModal();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>('features');

  // Handle Ctrl+K shortcut for quick search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const searchResults = [
    { title: 'أفكار مشاريع SaaS', category: 'قواعد البيانات', href: '/saas-ideas', icon: Laptop },
    { title: 'أفكار Micro-SaaS', category: 'قواعد البيانات', href: '/micro-saas-ideas', icon: Cpu },
    { title: 'استكشاف قطاعات السوق', category: 'التحليلات', href: '/market-discovery', icon: Compass },
    { title: 'دراسات حالة الشركات الناجحة', category: 'الفرص الميدانية', href: '/proven-projects', icon: Building2 },
    { title: 'حاسبة الإيرادات (MRR / ARR)', category: 'الأدوات', href: '/#calculator', icon: Calculator },
    {title: 'أكاديمية خطة والمفاهيم', category: 'المصادر', href: '/platform-academy', icon: BookOpen },
    { title: 'سجل التحديثات والإصدارات', category: 'المصادر', href: '/changelog', icon: Sparkles },
    { title: 'الشركات المتعثرة (Post-Mortem)', category: 'الدروس', href: '/failed-projects', icon: TrendingDown },
    { title: 'خطط الأسعار والتراخيص', category: 'الحساب', href: '/pricing-plans', icon: DollarSign },
  ].filter((item) => item.title.includes(searchQuery) || item.category.includes(searchQuery));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-all">
      
      {/* 1. Top Announcement Bar */}
      {showBanner && (
        <div className="bg-primary text-primary-foreground text-xs py-2 px-4 flex items-center justify-between shadow-2xs font-medium">
          <div className="container mx-auto flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs">
            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 text-[10px] font-bold px-2 py-0.5 border-none">
              جديد v2.5 🎉
            </Badge>
            <span>تم إطلاق +100 فكرة مشروع Micro-SaaS وحاسبة الإيرادات التفاعلية</span>
            <Link href="#calculator" className="font-extrabold underline underline-offset-4 hover:opacity-90 transition-opacity">
              جرب الحاسبة الآن ←
            </Link>
          </div>
          <button 
            onClick={() => setShowBanner(false)} 
            className="text-primary-foreground/70 hover:text-primary-foreground p-1 transition-colors rounded-sm"
            aria-label="إغلاق التنبيه"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* 2. Main Navigation Bar Header */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center size-9 rounded-xl bg-primary text-primary-foreground font-black text-lg shadow-sm transition-transform group-hover:scale-105">
              خ
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-foreground">
                خطة<span className="text-primary">.</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Mega Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 text-xs font-bold text-muted-foreground">
          
          {/* Dropdown 1: Features & Tools */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('features')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer",
                activeDropdown === 'features' ? "bg-primary/10 text-primary font-black" : "hover:text-foreground hover:bg-muted/60"
              )}
            >
              <span>الأدوات والمميزات</span>
              <ChevronDown className={cn("size-3.5 transition-transform duration-200", activeDropdown === 'features' && "rotate-180 text-primary")} />
            </button>

            {activeDropdown === 'features' && (
              <div dir="rtl" className="absolute top-full right-0 pt-2 w-[920px] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="p-7 rounded-3xl bg-card/98 border border-border/80 shadow-2xl backdrop-blur-xl space-y-5 text-right">
                  
                  <div className="grid grid-cols-12 gap-6">
                    {/* Highlight AI Spotlight Card */}
                    <div className="col-span-4 p-6 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-muted/80 border border-primary/25 flex flex-col justify-between shadow-2xs relative overflow-hidden group">
                      <div className="space-y-3.5 relative z-10">
                        <Badge className="bg-primary text-primary-foreground text-[10px] font-extrabold gap-1 px-3 py-0.5 rounded-full shadow-2xs">
                          <Sparkles className="size-3" />
                          محرك الذكاء الاصطناعي
                        </Badge>
                        <h4 className="text-base font-black text-foreground group-hover:text-primary transition-colors leading-snug">
                          مولد ودراسة نموذج العمل (BMC Studio)
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                          صمم نموذج عملك التجاري تفاعلياً واحصل على تقييم فوري لمستوى الجاهزية الاستثمارية وتوليد خطط المخاطر وفق منهجية MIT.
                        </p>
                        <ul className="space-y-1.5 pt-1 text-[11px] text-foreground font-semibold">
                          <li className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-emerald-500"></span>
                            صياغة العناصر الـ 9 بنقرة واحدة
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-blue-500"></span>
                            تحديد شرائح العملاء وعرض القيمة
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="size-1.5 rounded-full bg-amber-500"></span>
                            تقييم الجدوى وتوقع المخاطر
                          </li>
                        </ul>
                      </div>
                      <div className="pt-5 relative z-10">
                        <Button
                          onClick={() => openAuthModal('register')}
                          size="sm"
                          className="w-full text-xs font-extrabold gap-1.5 h-9 shadow-2xs cursor-pointer"
                        >
                          ابدأ بناء نموذج مشروعك مجاناً
                          <ArrowLeft className="size-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Tools Grid */}
                    <div className="col-span-8 grid grid-cols-2 gap-4">
                      <Link href="/#features" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3.5 group">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                          <Layers className="size-5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            نموذج العمل التجاري (BMC)
                            <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </h5>
                          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                            بناء وتفصيل عناصر مشروعك الـ 9 بدءاً من قنوات التوزيع، أنشطة التكلفة، وحتى مصادر الإيرادات بشكل منظري ومفهوم.
                          </p>
                        </div>
                      </Link>

                      <Link href="/#calculator" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3.5 group">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                          <Calculator className="size-5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            حاسبة الإيرادات (MRR / ARR)
                            <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </h5>
                          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                            أداة تفاعلية لتقدير الإيرادات الشهرية والسنوية المتكررة لشركات الـ SaaS، وحساب متوسط قيمة العميل (LTV) ومعدل التخلي (Churn).
                          </p>
                        </div>
                      </Link>

                      <Link href="/#features" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3.5 group">
                        <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                          <Target className="size-5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            محرك آلام وفرص السوق
                            <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </h5>
                          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                            استخرج المشكلات الواقعية في السوق العربي وتحليل احتياجات العملاء غير المخدومة لتحويلها إلى فرص تجارية مربحة وقابلة للنمو.
                          </p>
                        </div>
                      </Link>

                      <Link href="/#features" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3.5 group">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                          <Palette className="size-5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            استوديو الهوية البصرية
                            <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </h5>
                          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                            صيغ القيم الجوهرية لمشروعك، نبرة الصوت والمخاطبة الرسمية، والتنسيق البصري للتقدم به بثقة إلى المستثمرين والمستخدمين.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Mega Menu Footer Bar */}
                  <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-muted-foreground">
                    <span className="flex items-center gap-2 text-emerald-600">
                      <ShieldCheck className="size-4" />
                      أدوات مصممة ومختبرة وفق منهجية الـ 24 خطوة المعتمدة من جامعات ريادة الأعمال العالمية (MIT)
                    </span>
                    <Link href="/#features" className="text-primary hover:underline flex items-center gap-1.5 font-black">
                      استكشف كافة المميزات والأدوات
                      <ArrowLeft className="size-3.5" />
                    </Link>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Dropdown 2: Databases & Sectors */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('databases')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer",
                activeDropdown === 'databases' ? "bg-primary/10 text-primary font-black" : "hover:text-foreground hover:bg-muted/60"
              )}
            >
              <span>الشركات والقطاعات</span>
              <ChevronDown className={cn("size-3.5 transition-transform duration-200", activeDropdown === 'databases' && "rotate-180 text-primary")} />
            </button>

            {activeDropdown === 'databases' && (
              <div dir="rtl" className="absolute top-full right-0 pt-2 w-[840px] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="p-7 rounded-3xl bg-card/98 border border-border/80 shadow-2xl backdrop-blur-xl text-right space-y-5">
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="/saas-ideas" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3.5 group">
                      <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                        <Laptop className="size-5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                          أفكار مشاريع SaaS البرمجية
                          <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h5>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                          قاعدة بيانات تضم مئات أفكار البرمجيات بالاشتراكات الدورية الموجهة للشركات والشرائح المختلفة مع تحليلات التكلفة والتسعير.
                        </p>
                      </div>
                    </Link>

                    <Link href="/micro-saas-ideas" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3.5 group">
                      <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                        <Cpu className="size-5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                          أفكار Micro-SaaS للمطورين المستقلين
                          <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h5>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                          حلول وأدوات مصغرة يمكنك بناؤها وإطلاقها خلال 2-4 أسابيع بمفردك لتوفير تدفقات إيرادات متكررة مستقرة.
                        </p>
                      </div>
                    </Link>

                    <Link href="/market-discovery" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3.5 group">
                      <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                        <Compass className="size-5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                          رادار وقطاعات السوق الميدانية
                          <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h5>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                          استكشف أكثر من +100 قطاع استثماري (تجارة إلكترونية، صحة رقمية، تعليم، تقنية مالية) واعرف حجوم الفرص ومعدلات التوسع.
                        </p>
                      </div>
                    </Link>

                    <Link href="/failed-projects" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3.5 group">
                      <div className="p-3 rounded-xl bg-red-500/10 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                        <TrendingDown className="size-5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                          تحليلات دروس الشركات المتعثرة (Post-Mortem)
                          <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h5>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                          دراسات حالة نقدية تشرح أسباب تعثر وفشل بعض المشاريع الناشئة لمساعدتك على تجنب الأخطاء الشائعة وحماية رأس مالك.
                        </p>
                      </div>
                    </Link>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-muted-foreground">
                    <span className="text-foreground flex items-center gap-2">
                      <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      قاعدة بيانات محدثة أسبوعياً بأكثر من +500 شركة ورائدة أعمال محلية وعالمية
                    </span>
                    <Link href="/proven-projects" className="text-primary hover:underline flex items-center gap-1 font-black">
                      معاينة جدول المشاريع الناجحة ←
                    </Link>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Dropdown 3: Academy & Resources */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('academy')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all cursor-pointer",
                activeDropdown === 'academy' ? "bg-primary/10 text-primary font-black" : "hover:text-foreground hover:bg-muted/60"
              )}
            >
              <span>المصادر والأكاديمية</span>
              <ChevronDown className={cn("size-3.5 transition-transform duration-200", activeDropdown === 'academy' && "rotate-180 text-primary")} />
            </button>

            {activeDropdown === 'academy' && (
              <div dir="rtl" className="absolute top-full right-0 pt-2 w-[760px] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="p-7 rounded-3xl bg-card/98 border border-border/80 shadow-2xl backdrop-blur-xl grid grid-cols-1 gap-3 text-right space-y-1">
                  
                  <Link href="/platform-academy" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-4 group">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0 shadow-2xs">
                      <BookOpen className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        أكاديمية خطة والمفاهيم الريادية
                        <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      </h5>
                      <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                        مكتبة وحقيبة تعليمية متكاملة تضم 18 مقالاً وحالة دراسية تفاعلية تشرح لك كيفية حساب المقاييس المالية المتقدمة (CAC, LTV, Churn, ARR, Payback Period) وإعداد دراسات الجدوى المعتمدة لدى البنوك والمستثمرين.
                      </p>
                    </div>
                  </Link>

                  <Link href="/changelog" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-4 group">
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                      <Sparkles className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        سجل التحديثات والإصدارات (Changelog)
                        <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      </h5>
                      <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                        تابع كافة التحديثات التقنية الصادرة أسبوعياً للمنصة، الميزات الجديدة، إصلاحات الأداء السريعة، وتوثيق المجموعات البرمجية الصادرة بالنسخ الفعالة (v2.4.0).
                      </p>
                    </div>
                  </Link>

                  <Link href="/#faq" className="p-4 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-4 group">
                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                      <HelpCircle className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                        الأسئلة الشائعة ومعايير أمان وحفظ البيانات
                        <ChevronLeft className="size-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      </h5>
                      <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                        إجابات كاملة وشفافة حول آليات حفظ البيانات سحابياً بتقنية Row Level Security (RLS)، التسجيل المجاني، وإلغاء الاشتراك أو الترقية بسهولة بدون أي التزامات.
                      </p>
                    </div>
                  </Link>

                </div>
              </div>
            )}
          </div>

          {/* Single Link: Pricing */}
          <Link href="/pricing-plans" className="px-3 py-2 rounded-lg hover:text-foreground hover:bg-muted/50 transition-all">
            الأسعار والخطط
          </Link>

        </nav>

        {/* Right Section: Search Command & Auth Buttons */}
        <div className="flex items-center gap-2.5">
          
          {/* Quick Search Icon Button Trigger */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="size-9 border-border/80 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60"
            title="بحث سريع (Ctrl+K)"
            aria-label="ابحث في المنصة"
          >
            <Search className="size-4" />
          </Button>

          <div className="hidden sm:flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => openAuthModal('login')}
              className="font-bold text-xs h-9 cursor-pointer hover:bg-muted/70"
            >
              تسجيل الدخول
            </Button>

            <Button
              size="sm"
              onClick={() => openAuthModal('register')}
              className="gap-1.5 font-bold text-xs h-9 shadow-2xs bg-primary hover:bg-primary/90 cursor-pointer"
            >
              ابدأ مجاناً
              <ArrowLeft className="size-3.5" />
            </Button>
          </div>

          {/* Mobile Drawer Trigger (Sheet) */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden size-9">
                <Menu className="size-4" />
                <span className="sr-only">افتح القائمة</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right" dir="rtl" className="w-[300px] sm:w-[360px] p-0 flex flex-col justify-between">
              
              <div className="p-5 space-y-6 overflow-y-auto">
                <SheetHeader className="p-0 border-b border-border pb-4">
                  <SheetTitle className="flex items-center justify-between text-right">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground font-black text-base">
                        خ
                      </div>
                      <span className="text-lg font-black text-foreground">خطة<span className="text-primary">.</span></span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                {/* Mobile Search Button Trigger */}
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full justify-start text-xs text-muted-foreground gap-2 h-9 bg-muted/40"
                >
                  <Search className="size-4 text-muted-foreground" />
                  <span>ابحث في المميزات والقطاعات...</span>
                </Button>

                {/* Navigation Sections Accordion */}
                <div className="space-y-4 text-xs font-bold text-foreground">
                  
                  {/* Section 1: Features */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setMobileExpandedSection(mobileExpandedSection === 'features' ? null : 'features')}
                      className="w-full flex items-center justify-between py-2 text-primary font-black border-b border-border/40"
                    >
                      <span>الأدوات والمميزات</span>
                      <ChevronDown className={cn("size-4 transition-transform", mobileExpandedSection === 'features' && "rotate-180")} />
                    </button>

                    {mobileExpandedSection === 'features' && (
                      <div className="space-y-2 pr-2 pt-1 font-medium">
                        <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Layers className="size-3.5 text-emerald-600" />
                          <span>نموذج العمل التجاري (BMC)</span>
                        </Link>
                        <Link href="/#calculator" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Calculator className="size-3.5 text-blue-600" />
                          <span>حاسبة الإيرادات (MRR / ARR)</span>
                        </Link>
                        <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Target className="size-3.5 text-amber-600" />
                          <span>محرك آلام ومشكلات السوق</span>
                        </Link>
                        <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Palette className="size-3.5 text-purple-600" />
                          <span>استوديو الهوية البصرية</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Section 2: Databases */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setMobileExpandedSection(mobileExpandedSection === 'databases' ? null : 'databases')}
                      className="w-full flex items-center justify-between py-2 text-primary font-black border-b border-border/40"
                    >
                      <span>الشركات والقطاعات</span>
                      <ChevronDown className={cn("size-4 transition-transform", mobileExpandedSection === 'databases' && "rotate-180")} />
                    </button>

                    {mobileExpandedSection === 'databases' && (
                      <div className="space-y-2 pr-2 pt-1 font-medium">
                        <Link href="/saas-ideas" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Laptop className="size-3.5 text-blue-600" />
                          <span>أفكار مشاريع SaaS</span>
                        </Link>
                        <Link href="/micro-saas-ideas" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Cpu className="size-3.5 text-emerald-600" />
                          <span>أفكار Micro-SaaS</span>
                        </Link>
                        <Link href="/market-discovery" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Compass className="size-3.5 text-amber-600" />
                          <span>استكشاف قطاعات السوق</span>
                        </Link>
                        <Link href="/failed-projects" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                          <TrendingDown className="size-3.5 text-red-600" />
                          <span>تحليل الشركات المتعثرة</span>
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Section 3: Academy & Links */}
                  <div className="space-y-2 pt-2">
                    <Link href="/platform-academy" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-foreground hover:text-primary">
                      <BookOpen className="size-4 text-primary" />
                      <span>أكاديمية منصة خطة</span>
                    </Link>
                    <Link href="/pricing-plans" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-foreground hover:text-primary">
                      <DollarSign className="size-4 text-emerald-600" />
                      <span>الأسعار والخطط</span>
                    </Link>
                    <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-foreground hover:text-primary">
                      <HelpCircle className="size-4 text-blue-600" />
                      <span>الأسئلة الشائعة</span>
                    </Link>
                  </div>

                </div>
              </div>

              {/* Mobile Sheet Footer CTA Buttons */}
              <div className="p-5 border-t border-border bg-muted/30 space-y-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full font-bold text-xs h-10 cursor-pointer"
                >
                  تسجيل الدخول
                </Button>
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('register');
                  }}
                  className="w-full font-bold text-xs h-10 gap-1.5 shadow-2xs cursor-pointer"
                >
                  إنشاء حساب مجاني
                  <ArrowLeft className="size-4" />
                </Button>
              </div>

            </SheetContent>
          </Sheet>

        </div>

      </div>

      {/* Quick Search Modal Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-lg p-0 overflow-hidden" dir="rtl">
          <DialogHeader className="p-4 border-b border-border pb-3">
            <DialogTitle className="text-sm font-bold flex items-center gap-2">
              <Search className="size-4 text-primary" />
              <span>البحث السريع في منصة خطة</span>
            </DialogTitle>
          </DialogHeader>

          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute right-3 top-2.5 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث عن أفكار SaaS، قطاعات، أدوات، أو الأكاديمية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-9 text-xs h-10 font-medium"
                autoFocus
              />
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-1">
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={item.href}
                      onClick={() => setIsSearchOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted transition-colors text-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="size-4" />
                        </div>
                        <span className="font-bold text-foreground">{item.title}</span>
                      </div>
                      <Badge variant="secondary" className="text-[10px] font-bold">
                        {item.category}
                      </Badge>
                    </Link>
                  );
                })
              ) : (
                <div className="p-8 text-center text-xs text-muted-foreground font-medium">
                  لم نجد نتائج مطابقة لـ "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </header>
  );
}
