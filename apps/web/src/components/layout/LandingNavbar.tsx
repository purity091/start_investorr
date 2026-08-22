"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  TrendingDown,
  BookOpen,
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
  ChevronLeft,
  User as UserIcon,
  CreditCard,
  LifeBuoy,
  LogOut,
} from 'lucide-react';
import { useAuthModal } from '@/features/auth/AuthModalContext';
import { useAuth } from '@/features/auth/AuthContext';
import { cn } from '@/lib/utils';

export const LandingNavbar: React.FC = () => {
  const pathname = usePathname();
  const currentPath = pathname || '/';
  const { openAuthModal } = useAuthModal();
  const { user, profile, loading: authLoading, signOut } = useAuth();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showBanner, setShowBanner] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isFeaturesActive = activeDropdown === 'features' || currentPath === '/features';
  const isDatabasesActive = activeDropdown === 'databases' || ['/saas-ideas', '/micro-saas-ideas', '/proven-projects', '/failed-projects'].includes(currentPath);
  const isMarketDiscoveryActive = currentPath === '/market-discovery';
  const isAcademyActive = currentPath === '/platform-academy';
  const isChangelogActive = currentPath === '/changelog';
  const isPricingActive = currentPath === '/pricing-plans' || currentPath === '/pricing';

  const userName = profile?.full_name 
    || user?.user_metadata?.full_name 
    || user?.user_metadata?.name 
    || user?.email?.split('@')[0] 
    || 'المستخدم';

  const userEmail = profile?.email || user?.email || '';
  const userAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || '';
  const userInitials = userName ? userName.trim().charAt(0).toUpperCase() : 'ح';

  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnterDropdown = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(name);
  };

  const handleMouseLeaveDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

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
    { title: 'سجل التحديثات والإصدارات', category: 'المصادر', href: '/changelog', icon: Sparkles },
    { title: 'الشركات المتعثرة (Post-Mortem)', category: 'الدروس', href: '/failed-projects', icon: TrendingDown },
    { title: 'الأسعار', category: 'الحساب', href: '/pricing', icon: DollarSign },
  ].filter((item) => item.title.includes(searchQuery) || item.category.includes(searchQuery));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-all">

      {/* 1. Top Announcement Bar */}
      {showBanner && (
        <div className="bg-primary text-primary-foreground text-xs py-2 px-4 flex items-center justify-between shadow-2xs font-medium">
          <div className="container mx-auto flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs whitespace-nowrap overflow-hidden">
            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 text-[10px] font-bold px-2 py-0.5 border-none shrink-0">
              جديد v2.5
            </Badge>
            <span className="truncate">تم إطلاق ميزة مشاركة الخطط ونماذج العمل آمنياً + بناء 10 دراسات جدوى بـ 0$!</span>
            <Link href="/changelog" className="font-extrabold underline underline-offset-4 hover:opacity-90 transition-opacity shrink-0 hidden md:inline">
              استكشف سجل التغييرات والميزات الجديدة ←
            </Link>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-primary-foreground/70 hover:text-primary-foreground p-1 transition-colors rounded-sm cursor-pointer shrink-0"
            aria-label="إغلاق التنبيه"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* 2. Main Navigation Bar Header Container */}
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4 relative">

        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group whitespace-nowrap">
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

        {/* Desktop Direct Links & Simple Navigation (Protected against text overlap) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-extrabold text-muted-foreground whitespace-nowrap shrink-0">

          {/* Dropdown 1: Features & Tools */}
          <div
            className="shrink-0"
            onMouseEnter={() => handleMouseEnterDropdown('features')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button
              onClick={() => {
                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                setActiveDropdown((prev) => prev === 'features' ? null : 'features');
              }}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-extrabold",
                isFeaturesActive
                  ? "bg-primary text-primary-foreground font-black shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <span>الأدوات والمميزات</span>
              <ChevronDown className={cn("size-3.5 transition-transform duration-200 shrink-0", activeDropdown === 'features' && "rotate-180", isFeaturesActive ? "text-primary-foreground" : "text-muted-foreground")} />
            </button>

            {activeDropdown === 'features' && (
              <div
                dir="rtl"
                onMouseEnter={() => handleMouseEnterDropdown('features')}
                onMouseLeave={handleMouseLeaveDropdown}
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[min(900px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-top-2 duration-150 z-50 before:absolute before:-top-3 before:inset-x-0 before:h-4 before:content-['']"
              >
                <div className="p-6 rounded-3xl bg-card/98 border border-border/80 shadow-2xl backdrop-blur-xl space-y-5 text-right whitespace-normal">

                  <div className="grid grid-cols-12 gap-5">
                    {/* Highlight AI Spotlight Card */}
                    <div className="col-span-4 p-5 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-muted/80 border border-primary/25 flex flex-col justify-between shadow-2xs relative overflow-hidden group">
                      <div className="space-y-3 relative z-10">
                        <Badge className="bg-primary text-primary-foreground text-[10px] font-extrabold gap-1 px-2.5 py-0.5 rounded-full shadow-2xs">
                          <Sparkles className="size-3" />
                          استوديو الذكاء الاصطناعي
                        </Badge>
                        <h4 className="text-sm font-black text-foreground group-hover:text-primary transition-colors leading-snug">
                          مولد نماذج العمل الذكي (BMC Studio)
                        </h4>
                        <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
                          صمّم وهيكل نموذج عملك تفاعلياً واحصل على تقييم فوري للجاهزية الاستثمارية وتوليد خطط المخاطر وفق أعلى المناهج العالمية.
                        </p>
                      </div>
                      <div className="pt-4 relative z-10">
                        <Button
                          onClick={() => {
                            setActiveDropdown(null);
                            if (user) {
                              window.location.href = '/customer-dashboard';
                            } else {
                              openAuthModal('login');
                            }
                          }}
                          size="sm"
                          className="w-full text-xs font-extrabold gap-1.5 h-9 shadow-2xs cursor-pointer"
                        >
                          {user ? 'الذهاب لصفحة البناء' : 'ابنِ نموذج مشروعك الآن'}
                          <ArrowLeft className="size-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* Tools Grid - 4 High Impact Cards */}
                    <div className="col-span-8 grid grid-cols-2 gap-3.5">
                      <Link href="/#features" onClick={() => setActiveDropdown(null)} className="p-3.5 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3 group">
                        <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                          <Layers className="size-4.5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            نموذج العمل التجاري (BMC)
                            <ChevronLeft className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </h5>
                          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                            هيكلة الأركان الـ 9 لمشروعك من القيمة المضافة والشراكات حتى التكاليف ومصادر الإيرادات.
                          </p>
                        </div>
                      </Link>

                      <Link href="/#calculator" onClick={() => setActiveDropdown(null)} className="p-3.5 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3 group">
                        <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                          <Calculator className="size-4.5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            حاسبة الإيرادات (MRR / ARR)
                            <ChevronLeft className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </h5>
                          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                            نمذجة تفاعلية لدفقات الإيرادات الدورية وتوقع النمو المالي وتكلفة استحواذ العملاء.
                          </p>
                        </div>
                      </Link>

                      <Link href="/market-discovery" onClick={() => setActiveDropdown(null)} className="p-3.5 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3 group">
                        <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                          <Compass className="size-4.5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            رادار استكشاف القطاعات
                            <ChevronLeft className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </h5>
                          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                            تحليل اتجاهات السوق ومؤشرات النمو للقطاعات الواعدة لتحديد ثغرات المنافسين الفريدة.
                          </p>
                        </div>
                      </Link>

                      <Link href="/proven-projects" onClick={() => setActiveDropdown(null)} className="p-3.5 rounded-2xl hover:bg-muted/70 border border-transparent hover:border-border/60 transition-all flex items-start gap-3 group">
                        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                          <Target className="size-4.5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            تفكيك نماذج الشركات
                            <ChevronLeft className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </h5>
                          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                            استنباط الرؤى التكتيكية وأسرار التوسع في نماذج الأعمال الناجحة عالمياً ومحلياً.
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Dropdown 2: Databases & Sectors */}
          <div
            className="shrink-0"
            onMouseEnter={() => handleMouseEnterDropdown('databases')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button
              onClick={() => {
                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                setActiveDropdown((prev) => prev === 'databases' ? null : 'databases');
              }}
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-extrabold",
                isDatabasesActive
                  ? "bg-primary text-primary-foreground font-black shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <span>الشركات والقطاعات</span>
              <ChevronDown className={cn("size-3.5 transition-transform duration-200 shrink-0", activeDropdown === 'databases' && "rotate-180", isDatabasesActive ? "text-primary-foreground" : "text-muted-foreground")} />
            </button>

            {activeDropdown === 'databases' && (
              <div
                dir="rtl"
                onMouseEnter={() => handleMouseEnterDropdown('databases')}
                onMouseLeave={handleMouseLeaveDropdown}
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[min(840px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] animate-in fade-in slide-in-from-top-2 duration-150 z-50 before:absolute before:-top-3 before:inset-x-0 before:h-4 before:content-['']"
              >
                <div className="p-6 rounded-3xl bg-card/98 border border-border/80 shadow-2xl backdrop-blur-xl text-right space-y-4 whitespace-normal">
                  <div className="grid grid-cols-2 gap-3.5">
                    
                    <Link
                      href="/saas-ideas"
                      onClick={() => setActiveDropdown(null)}
                      className={cn(
                        "p-3.5 rounded-2xl hover:bg-muted/70 border transition-all flex items-start gap-3 group",
                        currentPath === '/saas-ideas' ? "bg-primary/10 border-primary/40" : "border-transparent hover:border-border/60"
                      )}
                    >
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                        <Laptop className="size-4.5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                          أفكار مشاريع SaaS البرمجية
                          <ChevronLeft className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h5>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                          قاعدة بيانات تضم مئات أفكار البرمجيات بالاشتراكات الدورية الموجهة للشركات والشرائح المختلفة.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/micro-saas-ideas"
                      onClick={() => setActiveDropdown(null)}
                      className={cn(
                        "p-3.5 rounded-2xl hover:bg-muted/70 border transition-all flex items-start gap-3 group",
                        currentPath === '/micro-saas-ideas' ? "bg-primary/10 border-primary/40" : "border-transparent hover:border-border/60"
                      )}
                    >
                      <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                        <Cpu className="size-4.5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                          أفكار Micro-SaaS عالية الربحية
                          <ChevronLeft className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h5>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                          نماذج برمجية مصغرة منخفضة التكلفة وعالية الهامش مخصصة للفرق الصغيرة والرواد المستقلين.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/proven-projects"
                      onClick={() => setActiveDropdown(null)}
                      className={cn(
                        "p-3.5 rounded-2xl hover:bg-muted/70 border transition-all flex items-start gap-3 group",
                        currentPath === '/proven-projects' ? "bg-primary/10 border-primary/40" : "border-transparent hover:border-border/60"
                      )}
                    >
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                        <Building2 className="size-4.5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                          دراسات حالة الشركات الناجحة
                          <ChevronLeft className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h5>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                          تحليل عميق لأسرار نمو الشركات المحلية والعالمية ومراحل التوسع من الفكرة حتى الربحية.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/failed-projects"
                      onClick={() => setActiveDropdown(null)}
                      className={cn(
                        "p-3.5 rounded-2xl hover:bg-muted/70 border transition-all flex items-start gap-3 group",
                        currentPath === '/failed-projects' ? "bg-primary/10 border-primary/40" : "border-transparent hover:border-border/60"
                      )}
                    >
                      <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-all shrink-0 shadow-2xs">
                        <TrendingDown className="size-4.5" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="text-xs font-black text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                          تحليل الشركات المتعثرة (Post-Mortem)
                          <ChevronLeft className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                        </h5>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                          دروس استباقية من أسباب تعثر المشاريع لتفادي الأخطاء التكتيكية والتشغيلية المكررة.
                        </p>
                      </div>
                    </Link>

                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Direct Standard Link 1: Market Discovery */}
          <Link
            href="/market-discovery"
            className={cn(
              "px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-extrabold",
              isMarketDiscoveryActive
                ? "bg-primary text-primary-foreground font-black shadow-2xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            استكشاف القطاعات
          </Link>

          {/* Direct Standard Link 2: Problem Engine */}
          <Link
            href="/problem-engine"
            className={cn(
              "px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-extrabold",
              currentPath === '/problem-engine'
                ? "bg-primary text-primary-foreground font-black shadow-2xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            المشكلات والفرص
          </Link>

          {/* Direct Standard Link 3: Case Studies */}
          <Link
            href="/proven-projects"
            className={cn(
              "px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-extrabold",
              currentPath === '/proven-projects'
                ? "bg-primary text-primary-foreground font-black shadow-2xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            دراسات الشركات
          </Link>

          {/* Direct Standard Link 4: Pricing */}
          <Link
            href="/pricing"
            className={cn(
              "px-3 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 text-xs font-extrabold",
              isPricingActive
                ? "bg-primary text-primary-foreground font-black shadow-2xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
            )}
          >
            الأسعار
          </Link>

        </nav>

        {/* Left Section: Search Command, Profile Avatar Dropdown (Identical to Dashboard Header) & Dashboard Icon Button on the Far Left */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Quick Search Icon Button Trigger */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSearchOpen(true)}
            className="size-9 border-border/80 bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/60 shrink-0 cursor-pointer"
            title="بحث سريع (Ctrl+K)"
            aria-label="ابحث في المنصة"
          >
            <Search className="size-4" />
          </Button>

          {authLoading ? (
            <div className="hidden sm:block size-9 rounded-full bg-muted animate-pulse shrink-0" aria-hidden="true" />
          ) : user ? (
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              {/* User Profile Pill Dropdown Trigger */}
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <button
                    id="landing-profile-avatar-trigger"
                    className="flex items-center gap-2 rounded-full py-1 px-2.5 border border-primary/20 bg-primary/5 hover:bg-primary/10 shadow-2xs transition-all cursor-pointer outline-none shrink-0"
                    title={userName}
                    aria-label="حسابي - إعدادات الحساب"
                  >
                    <div className="relative shrink-0 flex items-center justify-center">
                      <Avatar className="size-7.5 rounded-full">
                        <AvatarImage src={userAvatar} alt={userName} className="rounded-full object-cover" />
                        <AvatarFallback className="bg-primary text-primary-foreground font-black text-[11px] rounded-full">
                          {userName.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                    </div>
                    <span className="text-xs font-extrabold text-foreground max-w-[110px] truncate hidden md:inline-block">
                      {userName}
                    </span>
                    <ChevronDown className="size-3 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-64">
                  <DropdownMenuLabel className="text-right">
                    <div className="text-sm font-semibold">{userName}</div>
                    <div className="mt-1 text-xs font-medium text-muted-foreground">{userEmail}</div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/settings" className="flex items-center gap-2">
                        <UserIcon className="size-4" />
                        <span>ملف التعريف</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/pricing" className="flex items-center gap-2">
                        <CreditCard className="size-4" />
                        <span>اشتراكي</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/contact-us" className="flex items-center gap-2">
                        <LifeBuoy className="size-4" />
                        <span>المساعدة والدعم</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={async () => {
                      await signOut();
                    }}
                    className="cursor-pointer"
                  >
                    <LogOut className="size-4" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Prominent Dashboard Button */}
              <Link href="/customer-dashboard" title="لوحة التحكم">
                <Button
                  size="sm"
                  className="gap-2 font-bold text-xs h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xs rounded-xl shrink-0 cursor-pointer"
                  aria-label="لوحة التحكم"
                >
                  <LayoutGrid className="size-4" />
                  <span>لوحة التحكم</span>
                  <ArrowLeft className="size-3.5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <Button
                size="sm"
                onClick={() => openAuthModal('login')}
                className="gap-1.5 font-bold text-xs h-9 shadow-2xs bg-primary hover:bg-primary/90 cursor-pointer whitespace-nowrap shrink-0"
              >
                ابدأ مجاناً
                <ArrowLeft className="size-3.5" />
              </Button>
            </div>
          )}

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

                {/* Navigation Sections & Direct Links */}
                <div className="space-y-1.5 text-xs font-bold text-foreground">
                  <Link
                    href="/saas-ideas"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition-all border-b border-border/30",
                      currentPath === '/saas-ideas'
                        ? "bg-primary text-primary-foreground font-black shadow-2xs"
                        : "text-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    <Laptop className={cn("size-4", currentPath === '/saas-ideas' ? "text-primary-foreground" : "text-blue-600")} />
                    <span>أفكار مشاريع SaaS</span>
                  </Link>

                  <Link
                    href="/micro-saas-ideas"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition-all border-b border-border/30",
                      currentPath === '/micro-saas-ideas'
                        ? "bg-primary text-primary-foreground font-black shadow-2xs"
                        : "text-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    <Cpu className={cn("size-4", currentPath === '/micro-saas-ideas' ? "text-primary-foreground" : "text-indigo-600")} />
                    <span>أفكار Micro-SaaS</span>
                  </Link>

                  <Link
                    href="/market-discovery"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition-all border-b border-border/30",
                      isMarketDiscoveryActive
                        ? "bg-primary text-primary-foreground font-black shadow-2xs"
                        : "text-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    <Compass className={cn("size-4", isMarketDiscoveryActive ? "text-primary-foreground" : "text-purple-600")} />
                    <span>استكشاف القطاعات</span>
                  </Link>

                  <Link
                    href="/proven-projects"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition-all border-b border-border/30",
                      currentPath === '/proven-projects'
                        ? "bg-primary text-primary-foreground font-black shadow-2xs"
                        : "text-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    <Building2 className={cn("size-4", currentPath === '/proven-projects' ? "text-primary-foreground" : "text-emerald-600")} />
                    <span>دراسات حالة الشركات</span>
                  </Link>

                  <Link
                    href="/problem-engine"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition-all border-b border-border/30",
                      currentPath === '/problem-engine'
                        ? "bg-primary text-primary-foreground font-black shadow-2xs"
                        : "text-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    <Target className={cn("size-4", currentPath === '/problem-engine' ? "text-primary-foreground" : "text-amber-500")} />
                    <span>المشكلات والفرص</span>
                  </Link>

                  <Link
                    href="/#calculator"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition-all border-b border-border/30",
                      currentPath === '/#calculator'
                        ? "bg-primary text-primary-foreground font-black shadow-2xs"
                        : "text-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    <Calculator className={cn("size-4", currentPath === '/#calculator' ? "text-primary-foreground" : "text-blue-500")} />
                    <span>حاسبة الجدوى والنمو</span>
                  </Link>

                  <Link
                    href="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 py-2.5 px-3 rounded-xl transition-all border-b border-border/30",
                      isPricingActive
                        ? "bg-primary text-primary-foreground font-black shadow-2xs"
                        : "text-foreground hover:text-primary hover:bg-muted/50"
                    )}
                  >
                    <DollarSign className={cn("size-4", isPricingActive ? "text-primary-foreground" : "text-amber-500")} />
                    <span>الأسعار والاشتراكات</span>
                  </Link>
                </div>
              </div>

              {/* Mobile Sheet Footer CTA Button */}
              <div className="p-4 border-t border-border bg-muted/30 space-y-3">
                {authLoading ? (
                  <div className="h-10 w-full rounded-md bg-muted animate-pulse" aria-hidden="true" />
                ) : user ? (
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-2xl bg-card border border-border flex items-center gap-3 shadow-2xs">
                      <div className="relative shrink-0">
                        <Avatar className="size-9 rounded-full">
                          <AvatarImage src={userAvatar} alt={userName} className="rounded-full object-cover" />
                          <AvatarFallback className="bg-primary text-primary-foreground font-black text-xs">
                            {userName.slice(0, 1).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
                      </div>
                      <div className="min-w-0 flex-1 text-right">
                        <p className="text-xs font-black text-foreground truncate">{userName}</p>
                        <p className="text-[11px] font-medium text-muted-foreground truncate">{userEmail}</p>
                      </div>
                    </div>

                    <Link href="/customer-dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full block">
                      <Button className="w-full font-bold text-xs h-10 gap-2 shadow-2xs cursor-pointer bg-primary text-primary-foreground">
                        <LayoutGrid className="size-4" />
                        <span>الانتقال إلى لوحة التحكم</span>
                        <ArrowLeft className="size-4" />
                      </Button>
                    </Link>

                    <Link href="/settings" onClick={() => setMobileMenuOpen(false)} className="w-full block">
                      <Button variant="outline" className="w-full font-bold text-xs h-9 gap-1.5 cursor-pointer bg-background">
                        <UserIcon className="size-4 text-primary" />
                        <span>إعدادات الحساب</span>
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('login');
                    }}
                    className="w-full font-bold text-xs h-10 gap-1.5 shadow-2xs cursor-pointer"
                  >
                    إنشاء حساب مجاني
                    <ArrowLeft className="size-4" />
                  </Button>
                )}
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
};
