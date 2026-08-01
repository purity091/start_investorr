import React, { useState, useEffect, useRef } from 'react';
import {
  Zap,
  ChevronDown,
  Menu,
  X,
  Compass,
  Layers,
  BarChart3,
  Brain,
  Palette,
  Rocket,
  Globe,
  TrendingUp,
  BookOpen,
  Star,
  Sparkles,
  LayoutGrid,
  Activity,
  CreditCard,
  ArrowUpLeft,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface MegaItem {
  label: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  tab?: string;
}

interface MegaSection {
  title: string;
  items: MegaItem[];
}

interface NavItem {
  label: string;
  tab?: string;
  mega?: {
    sections: MegaSection[];
    featured?: {
      title: string;
      description: string;
      cta: string;
      tab: string;
      highlights: string[];
    };
  };
}

// ─── Navigation Data ──────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: 'الرئيسية', tab: 'home' },
  {
    label: 'المنصة',
    mega: {
      sections: [
        {
          title: 'بناء دراسة الجدوى',
          items: [
            {
              label: 'النموذج السهل',
              description: 'دراسة جدوى كاملة خطوة بخطوة لأي مشروع',
              icon: Sparkles,
              badge: 'الأكثر شيوعاً',
              tab: 'new-plan-family',
            },
            {
              label: 'النموذج الاحترافي',
              description: 'تحليل استراتيجي معمّق بمنهجية علمية',
              icon: Brain,
              tab: 'new-plan-pro',
            },
            {
              label: 'MIT 24 Steps',
              description: 'منهجية MIT لبناء شركات ناجحة عالمياً',
              icon: Rocket,
              badge: 'MIT',
              tab: 'new-plan-mit24',
            },
            {
              label: 'نموذج العمل BMC',
              description: 'Business Model Canvas التفاعلي المتكامل',
              icon: LayoutGrid,
              tab: 'new-plan-bmc',
            },
          ],
        },
        {
          title: 'استكشاف السوق',
          items: [
            {
              label: 'رادار استكشاف الأسواق',
              description: 'تصفح 100+ قطاع استثماري مع بيانات حية',
              icon: Compass,
              tab: 'market-discovery',
            },
            {
              label: 'محرك المشكلات والفرص',
              description: 'اكتشف فرص السوق المخفية وغير المحلولة',
              icon: Activity,
              tab: 'problem-engine',
            },
            {
              label: 'رادار اليونيكورن',
              description: 'قارن مشروعك بمعايير الشركات العملاقة',
              icon: Star,
              tab: 'unicorn-benchmark',
            },
          ],
        },
      ],
      featured: {
        title: 'ابدأ دراسة جدواك الأولى',
        description: 'من الفكرة إلى الخطة الكاملة في أقل من 30 دقيقة مع مساعدة الذكاء الاصطناعي',
        cta: 'ابدأ مجاناً الآن',
        tab: 'new-plan-family',
        highlights: ['بدون تسجيل مطوّل', 'دعم عربي كامل', 'تصدير PDF فوري'],
      },
    },
  },
  {
    label: 'الميزات',
    mega: {
      sections: [
        {
          title: 'التحليل والذكاء',
          items: [
            {
              label: 'لوحات القطاعات التفاعلية',
              description: 'بيانات سوقية لـ 100+ قطاع محدّثة باستمرار',
              icon: BarChart3,
              tab: 'market-discovery',
            },
            {
              label: 'الهوية البصرية للمشروع',
              description: 'استوديو تصميم متكامل لبناء علامتك التجارية',
              icon: Palette,
              tab: 'brand-identity',
            },
            {
              label: 'إدارة المشاريع',
              description: 'إدارة جميع دراسات جدواك من مكان واحد',
              icon: Layers,
              tab: 'my-plans',
            },
          ],
        },
        {
          title: 'مكتبة المعرفة',
          items: [
            {
              label: 'مشاريع ناجحة مثبتة',
              description: 'تعلّم من نماذج مشاريع حققت نجاحاً فعلياً',
              icon: TrendingUp,
              tab: 'proven-projects',
            },
            {
              label: 'أفكار SaaS وMicro-SaaS',
              description: 'مئات الأفكار الجاهزة للتنفيذ الرقمي',
              icon: Globe,
              tab: 'saas-ideas',
            },
            {
              label: 'تحليل مشاريع فشلت',
              description: 'تجنّب أخطاء رواد الأعمال السابقين',
              icon: BookOpen,
              tab: 'failed-projects',
            },
          ],
        },
      ],
      featured: {
        title: 'أكثر من 100 قطاع استثماري',
        description: 'بيانات سوقية حية لجميع القطاعات الاقتصادية العالمية والمحلية',
        cta: 'استكشف القطاعات',
        tab: 'market-discovery',
        highlights: ['بيانات محدّثة يومياً', 'مقارنات تنافسية', 'تحليل المخاطر'],
      },
    },
  },
  { label: 'قطاعات السوق', tab: 'market-discovery' },
  { label: 'الأسعار', tab: 'pricing' },
];

// ─── Mega Menu Panel ──────────────────────────────────────────────────────────

function MegaMenuPanel({
  mega,
  onSelect,
}: {
  mega: NonNullable<NavItem['mega']>;
  onSelect: (tab: string) => void;
}) {
  const { sections, featured } = mega;

  return (
    <div
      dir="rtl"
      role="dialog"
      className="absolute top-[calc(100%+8px)] right-0 z-50 flex min-w-[760px] max-w-[880px] overflow-hidden rounded-2xl border border-border bg-background shadow-2xl ring-1 ring-black/[0.04] animate-in fade-in-0 slide-in-from-top-1 duration-150"
    >
      {/* Main sections */}
      <div className={cn('flex-1 grid gap-0 p-3', `grid-cols-${sections.length}`)}>
        {sections.map((section, si) => (
          <div key={si} className="p-3">
            <p className="mb-2.5 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
              {section.title}
            </p>
            <div className="flex flex-col gap-px">
              {section.items.map((item, ii) => {
                const Icon = item.icon;
                return (
                  <button
                    key={ii}
                    onClick={() => item.tab && onSelect(item.tab)}
                    className="group/item flex w-full items-start gap-3 rounded-xl px-2.5 py-2.5 text-right transition-all hover:bg-muted/70"
                  >
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background shadow-sm transition-all group-hover/item:border-primary/20 group-hover/item:bg-primary/5 group-hover/item:shadow-md">
                      <Icon className="size-4 text-muted-foreground transition-colors group-hover/item:text-primary" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold text-foreground leading-tight">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="rounded-full border border-primary/20 bg-primary/8 px-1.5 py-px text-[9px] font-bold text-primary">
                            {item.badge}
                          </span>
                        )}
                      </span>
                      <span className="mt-0.5 block text-[12px] leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                    <ArrowUpLeft className="mt-1 size-3.5 shrink-0 opacity-0 transition-opacity group-hover/item:opacity-40 text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Featured sidebar */}
      {featured && (
        <div className="flex w-[220px] shrink-0 flex-col justify-between border-s border-border bg-muted/30 p-5">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
              مميز
            </p>
            <h3 className="mb-2 text-sm font-bold text-foreground leading-snug">{featured.title}</h3>
            <p className="mb-4 text-[12px] leading-relaxed text-muted-foreground">{featured.description}</p>
            <ul className="mb-5 space-y-1.5">
              {featured.highlights.map((h, i) => (
                <li key={i} className="flex items-center gap-2 text-[12px] text-foreground">
                  <CheckCircle2 className="size-3.5 shrink-0 text-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <Button
            size="sm"
            onClick={() => onSelect(featured.tab)}
            className="w-full gap-1.5 text-xs"
          >
            <Zap className="size-3" />
            {featured.cta}
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Mobile Drawer ────────────────────────────────────────────────────────────

function MobileDrawer({
  open,
  onClose,
  navigate,
}: {
  open: boolean;
  onClose: () => void;
  navigate: (tab: string) => void;
}) {
  const sections = [
    {
      title: 'بناء دراسة الجدوى',
      items: [
        { label: 'النموذج السهل', icon: Sparkles, tab: 'new-plan-family', badge: 'شائع' },
        { label: 'النموذج الاحترافي', icon: Brain, tab: 'new-plan-pro' },
        { label: 'MIT 24 Steps', icon: Rocket, tab: 'new-plan-mit24' },
        { label: 'BMC', icon: LayoutGrid, tab: 'new-plan-bmc' },
      ],
    },
    {
      title: 'استكشاف',
      items: [
        { label: 'استكشاف الأسواق', icon: Compass, tab: 'market-discovery' },
        { label: 'المشكلات والفرص', icon: Activity, tab: 'problem-engine' },
        { label: 'رادار اليونيكورن', icon: Star, tab: 'unicorn-benchmark' },
        { label: 'مشاريعي', icon: Layers, tab: 'my-plans' },
      ],
    },
    {
      title: 'المزيد',
      items: [
        { label: 'مشاريع ناجحة', icon: TrendingUp, tab: 'proven-projects' },
        { label: 'أفكار SaaS', icon: Globe, tab: 'saas-ideas' },
        { label: 'الهوية البصرية', icon: Palette, tab: 'brand-identity' },
        { label: 'الأسعار', icon: CreditCard, tab: 'pricing' },
      ],
    },
  ];

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
      />
      <div
        dir="rtl"
        className={cn(
          'fixed top-0 right-0 z-[201] flex h-dvh w-[300px] max-w-[88vw] flex-col bg-background shadow-2xl transition-transform duration-300 ease-out lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Zap className="size-3.5" />
            </span>
            <span className="text-sm font-black tracking-tight text-foreground">خطة</span>
            <span className="rounded-full border border-primary/30 bg-primary/8 px-1.5 py-px text-[9px] font-bold text-primary">
              PRO
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {sections.map((section) => (
            <div key={section.title}>
              <p className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                {section.title}
              </p>
              <div className="flex flex-col gap-px">
                {section.items.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.tab}
                      onClick={() => navigate(link.tab)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-right transition-colors hover:bg-muted"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                        <Icon className="size-4 text-muted-foreground" />
                      </span>
                      <span className="flex-1 text-sm font-medium text-foreground">{link.label}</span>
                      {'badge' in link && link.badge && (
                        <span className="rounded-full bg-primary/10 px-2 py-px text-[9px] font-bold text-primary">
                          {link.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4 flex flex-col gap-2">
          <Button className="w-full gap-2" onClick={() => navigate('new-plan-family')}>
            <Zap className="size-4" />
            ابدأ مجاناً
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate('pricing')}>
            تسجيل الدخول
          </Button>
        </div>
      </div>
    </>
  );
}

// ─── Main LandingNavbar ───────────────────────────────────────────────────────

interface LandingNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAuthRequested?: (mode: 'login' | 'signup') => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ activeTab, setActiveTab, onAuthRequested }) => {
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMega(null);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMega(null);
        setDrawerOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const enterMega = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMega(label);
  };

  const leaveMega = () => {
    closeTimer.current = setTimeout(() => setOpenMega(null), 100);
  };

  const navigate = (tab: string) => {
    setActiveTab(tab);
    setOpenMega(null);
    setDrawerOpen(false);
  };

  return (
    <>
      <header
        ref={navRef}
        dir="rtl"
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-200',
          scrolled
            ? 'border-b border-border bg-background/95 shadow-[0_1px_12px_rgba(0,0,0,0.06)] backdrop-blur-md'
            : 'bg-background/90 backdrop-blur-sm',
        )}
      >
        {/* Main bar */}
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">

          {/* Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex shrink-0 items-center gap-2.5 rounded-xl px-1 py-1 transition-opacity hover:opacity-80"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Zap className="size-[18px]" />
            </span>
            <span className="text-[15px] font-black tracking-tight text-foreground">خطة</span>
            <span className="hidden rounded-full border border-primary/25 bg-primary/8 px-2 py-0.5 text-[10px] font-bold text-primary sm:inline">
              BETA
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden flex-1 items-center justify-center gap-0.5 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isOpen = openMega === item.label;
              const isActive = item.tab ? activeTab === item.tab : false;

              if (item.mega) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => enterMega(item.label)}
                    onMouseLeave={leaveMega}
                  >
                    <button
                      onClick={() => setOpenMega(isOpen ? null : item.label)}
                      className={cn(
                        'group flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                        isOpen
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'size-3.5 transition-transform duration-200 text-muted-foreground/60',
                          isOpen && 'rotate-180',
                        )}
                      />
                    </button>

                    {isOpen && (
                      <MegaMenuPanel mega={item.mega} onSelect={navigate} />
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => item.tab && navigate(item.tab)}
                  className={cn(
                    'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-muted text-foreground font-semibold'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (onAuthRequested ? onAuthRequested('login') : navigate('pricing'))}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              تسجيل الدخول
            </Button>
            <Button
              size="sm"
              onClick={() => (onAuthRequested ? onAuthRequested('signup') : navigate('new-plan-family'))}
              className="gap-1.5 text-sm h-9 px-4"
            >
              <Zap className="size-3.5" />
              ابدأ مجاناً
            </Button>
          </div>

          {/* Mobile trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors lg:hidden"
            aria-label="فتح القائمة"
          >
            <Menu className="size-5" />
          </button>
        </div>

        {/* Bottom line when mega open */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 h-px bg-border transition-opacity duration-150',
            openMega ? 'opacity-100' : 'opacity-0',
          )}
        />
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} navigate={navigate} />
    </>
  );
};

export default LandingNavbar;
