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
import { cn } from '@/lib/utils';

export function LandingNavbar() {
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
    { title: 'أكاديمية خطة والمفاهيم', category: 'المصادر', href: '/platform-academy', icon: BookOpen },
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
              <span className="text-xl font-black tracking-tight text-foreground flex items-center gap-1">
                خطة<span className="text-primary">.</span>
                <Badge variant="outline" className="text-[10px] font-bold text-primary bg-primary/10 border-primary/20 px-1.5 py-0 rounded">
                  PRO
                </Badge>
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
                "flex items-center gap-1 px-3 py-2 rounded-lg transition-all cursor-pointer",
                activeDropdown === 'features' ? "bg-muted text-foreground font-extrabold" : "hover:text-foreground hover:bg-muted/50"
              )}
            >
              <span>الأدوات والمميزات</span>
              <ChevronDown className={cn("size-3.5 transition-transform duration-200", activeDropdown === 'features' && "rotate-180 text-primary")} />
            </button>

            {activeDropdown === 'features' && (
              <div dir="rtl" className="absolute top-full right-0 pt-2 w-[760px] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="p-5 rounded-2xl bg-card border border-border shadow-xl backdrop-blur-md grid grid-cols-12 gap-5 text-right">
                  
                  {/* Highlight AI Spotlight Card */}
                  <div className="col-span-4 p-4 rounded-xl bg-gradient-to-b from-primary/10 via-primary/5 to-muted border border-primary/20 flex flex-col justify-between">
                    <div className="space-y-2">
                      <Badge className="bg-primary text-primary-foreground text-[10px] font-bold gap-1 px-2">
                        <Sparkles className="size-3" />
                        الذكاء الاصطناعي
                      </Badge>
                      <h4 className="text-sm font-black text-foreground">مولد واستوديو دراسات الجدوى</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                        صمم نماذج أعمالك وقيم خطتك استراتيجياً بنقرة واحدة وفق معايير MIT.
                      </p>
                    </div>
                    <Link href="/login" className="pt-4">
                      <Button size="sm" className="w-full text-xs font-bold gap-1.5 h-8">
                        ابدأ الدراسة مجاناً
                        <ArrowLeft className="size-3" />
                      </Button>
                    </Link>
                  </div>

                  {/* Tools Grid */}
                  <div className="col-span-8 grid grid-cols-2 gap-3">
                    <Link href="/#features" className="p-2.5 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-3 group">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                        <Layers className="size-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">نموذج العمل (BMC)</h5>
                        <p className="text-[11px] text-muted-foreground font-medium">بناء وتفاعل مع العناصر التسعة.</p>
                      </div>
                    </Link>

                    <Link href="/#calculator" className="p-2.5 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-3 group">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                        <Calculator className="size-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">حاسبة MRR / ARR</h5>
                        <p className="text-[11px] text-muted-foreground font-medium">تقدير أرباح ومؤشرات الـ SaaS.</p>
                      </div>
                    </Link>

                    <Link href="/#features" className="p-2.5 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-3 group">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                        <Target className="size-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">محرك آلام السوق</h5>
                        <p className="text-[11px] text-muted-foreground font-medium">تحويل المشكلات لفرص مربحة.</p>
                      </div>
                    </Link>

                    <Link href="/#features" className="p-2.5 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-3 group">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                        <Palette className="size-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">استوديو الهوية</h5>
                        <p className="text-[11px] text-muted-foreground font-medium">صياغة نبرة الصوت ودليل الهوية.</p>
                      </div>
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
                "flex items-center gap-1 px-3 py-2 rounded-lg transition-all cursor-pointer",
                activeDropdown === 'databases' ? "bg-muted text-foreground font-extrabold" : "hover:text-foreground hover:bg-muted/50"
              )}
            >
              <span>الشركات والقطاعات</span>
              <ChevronDown className={cn("size-3.5 transition-transform duration-200", activeDropdown === 'databases' && "rotate-180 text-primary")} />
            </button>

            {activeDropdown === 'databases' && (
              <div dir="rtl" className="absolute top-full right-0 pt-2 w-[540px] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="p-4 rounded-2xl bg-card border border-border shadow-xl backdrop-blur-md grid grid-cols-2 gap-3 text-right">
                  
                  <Link href="/saas-ideas" className="p-3 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <Laptop className="size-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">أفكار مشاريع SaaS</h5>
                      <p className="text-[11px] text-muted-foreground font-medium">نماذج برمجيات بالاشتراكات الدوري.</p>
                    </div>
                  </Link>

                  <Link href="/micro-saas-ideas" className="p-3 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                      <Cpu className="size-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">أفكار Micro-SaaS</h5>
                      <p className="text-[11px] text-muted-foreground font-medium">أدوات مصغرة سريعة البناء والإطلاق.</p>
                    </div>
                  </Link>

                  <Link href="/market-discovery" className="p-3 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors shrink-0">
                      <Compass className="size-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">قطاعات السوق الميدانية</h5>
                      <p className="text-[11px] text-muted-foreground font-medium">+100 قطاع استثماري محلي وعالمي.</p>
                    </div>
                  </Link>

                  <Link href="/failed-projects" className="p-3 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-red-500/10 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                      <TrendingDown className="size-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">دروس الشركات المتعثرة</h5>
                      <p className="text-[11px] text-muted-foreground font-medium">تحليل أسباب الفشل لتجنب الأخطاء.</p>
                    </div>
                  </Link>

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
                "flex items-center gap-1 px-3 py-2 rounded-lg transition-all cursor-pointer",
                activeDropdown === 'academy' ? "bg-muted text-foreground font-extrabold" : "hover:text-foreground hover:bg-muted/50"
              )}
            >
              <span>المصادر والأكاديمية</span>
              <ChevronDown className={cn("size-3.5 transition-transform duration-200", activeDropdown === 'academy' && "rotate-180 text-primary")} />
            </button>

            {activeDropdown === 'academy' && (
              <div dir="rtl" className="absolute top-full right-0 pt-2 w-[480px] animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="p-4 rounded-2xl bg-card border border-border shadow-xl backdrop-blur-md grid grid-cols-1 gap-2 text-right">
                  
                  <Link href="/platform-academy" className="p-3 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                      <BookOpen className="size-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">أكاديمية خطة والمفاهيم الريادية</h5>
                      <p className="text-[11px] text-muted-foreground font-medium">18 مقال وحقيبة تعليمية لشرح مؤشرات SaaS و الـ BMC.</p>
                    </div>
                  </Link>

                  <Link href="/#faq" className="p-3 rounded-xl hover:bg-muted/60 transition-colors flex items-start gap-3 group">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                      <HelpCircle className="size-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">الأسئلة الشائعة والأمان</h5>
                      <p className="text-[11px] text-muted-foreground font-medium">إجابات عن حماية البيانات بتقنية RLS والتسجيل المجاني.</p>
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
          
          {/* Quick Search Dialog Trigger */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground h-9 px-3 border-border/80 bg-muted/30"
          >
            <Search className="size-3.5 text-muted-foreground" />
            <span>بحث سريع...</span>
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-0.5 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-bold text-muted-foreground opacity-100">
              Ctrl K
            </kbd>
          </Button>

          {/* Auth CTA Buttons */}
          <Link href="/login" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm" className="font-bold text-xs h-9">
              تسجيل الدخول
            </Button>
          </Link>

          <Link href="/login">
            <Button size="sm" className="gap-1.5 font-bold text-xs h-9 shadow-2xs bg-primary hover:bg-primary/90">
              ابدأ رحلتك مجاناً
              <ArrowLeft className="size-3.5" />
            </Button>
          </Link>

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
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full block">
                  <Button variant="outline" className="w-full font-bold text-xs h-10">
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full block">
                  <Button className="w-full font-bold text-xs h-10 gap-1.5 shadow-2xs">
                    إنشاء حساب مجاني
                    <ArrowLeft className="size-4" />
                  </Button>
                </Link>
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
