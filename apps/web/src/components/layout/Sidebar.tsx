import React from 'react';
import Link from 'next/link';
import {
  Activity,
  Bookmark,
  BookOpen,
  Calculator,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
  CreditCard,
  Crown,
  Globe,
  Heart,
  Home,
  Layers,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  Palette,
  Rocket,
  Settings,
  Shield,
  Sparkles,
  Users,
  Zap,
  TrendingDown,
  CloudCog,
  Settings2,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

import type { User } from '../../types';
import { useAuth } from '@/features/auth/AuthContext';
import { supabase } from '@/lib/supabase';
import { getTabPath } from '../../utils/routes';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import {
  Sidebar as UiSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '../ui/sidebar';
import {
  loadSavedMarketItems,
  loadBookmarkedProjectIds,
} from '../features/discovery/problemDetailStorage';

const MARKET_DISCOVERY_DASHBOARDS = [
  'advertising-dashboard', 'brands-leaders-dashboard', 'marketing-dashboard', 'farming-dashboard',
  'fisheries-aquaculture-dashboard', 'forestry-dashboard', 'chemical-industry-dashboard',
  'fossil-fuels-dashboard', 'mining-dashboard', 'pulp-paper-dashboard',
  'plastic-rubber-dashboard', 'petroleum-refinery-dashboard', 'apparel-shoes-dashboard',
  'non-alcoholic-beverages-dashboard', 'economy-dashboard', 'building-construction-dashboard',
  'heavy-construction-dashboard', 'cleaning-products-dashboard', 'cosmetics-personal-care-dashboard',
  'food-nutrition-dashboard', 'furniture-household-dashboard', 'garden-patio-dashboard',
  'home-improvement-dashboard', 'pet-supplies-dashboard', 'toys-dashboard',
  'b2b-ecommerce-dashboard', 'b2c-ecommerce-dashboard', 'c2c-ecommerce-dashboard',
  'digital-shopping-behaviour-dashboard', 'ecommerce-key-figures-dashboard', 'paid-content-dashboard',
  'international-trade-dashboard', 'politics-dashboard', 'climate-dashboard',
  'emissions-dashboard', 'energy-dashboard', 'greentech-dashboard',
  'waste-dashboard', 'water-dashboard', 'financial-services-dashboard', 'financial-institutions-dashboard',
  'investments-dashboard', 'insurance-dashboard', 'care-support-dashboard',
  'hospitals-health-professionals-dashboard', 'health-system-dashboard', 'medical-technology-dashboard',
  'pharma-market-dashboard', 'state-of-health-dashboard', 'cyber-crime-security-dashboard',
  'internet-demographics-dashboard', 'mobile-internet-apps-dashboard', 'online-search-dashboard',
  'online-video-entertainment-dashboard', 'reach-traffic-dashboard', 'social-media-dashboard',
  'celebrities-dashboard', 'family-friends-dashboard', 'personality-behavior-dashboard',
  'holidays-dashboard', 'audio-dashboard', 'books-publishing-dashboard',
  'news-dashboard', 'tv-video-film-dashboard', 'video-gaming-esports-dashboard', 'communications-dashboard',
  'aerospace-defense-dashboard', 'electronics-dashboard', 'industrial-machinery-dashboard',
  'metals-dashboard', 'rolling-stock-dashboard', 'shipbuilding-dashboard',
  'vehicle-manufacturing-dashboard', 'commercial-real-estate-dashboard', 'industrial-real-estate-dashboard',
  'mortgages-financing-dashboard', 'property-services-dashboard', 'residential-real-estate-dashboard',
  'diy-retail-dashboard', 'fashion-accessories-dashboard', 'food-beverage-retail-dashboard',
  'furniture-retail-dashboard', 'general-merchandise-dashboard', 'health-hygiene-dashboard',
  'office-supplies-dashboard', 'private-label-dashboard', 'retail-technology-dashboard',
  'shopping-behavior-dashboard', 'sports-leisure-retail-dashboard', 'subscriptions-direct-selling-dashboard',
  'supply-chain-dashboard', 'wholesale-dashboard', 'business-services-dashboard',
  'skilled-labor-dashboard', 'crime-law-enforcement-dashboard', 'demographics-dashboard',
  'education-science-dashboard', 'geography-nature-dashboard', 'historical-data-dashboard',
  'art-culture-dashboard', 'gambling-dashboard', 'hobbies-dashboard',
  'parks-outdoors-dashboard', 'professional-sports-dashboard', 'sports-fitness-dashboard',
  'wellness-spas-dashboard', 'consumer-electronics-dashboard', 'hardware-dashboard',
  'household-appliances-dashboard', 'it-services-dashboard', 'software-dashboard',
  'telecommunications-dashboard', 'aviation-dashboard', 'logistics-dashboard',
  'public-transport-dashboard', 'rail-transport-dashboard', 'vehicles-road-traffic-dashboard',
  'water-transport-dashboard', 'accommodation-dashboard', 'business-travel-dashboard',
  'food-drink-services-dashboard', 'leisure-travel-dashboard',
];

interface SidebarProps {
  user: User;
  isOpen?: boolean;
  isCollapsed?: boolean;
  onCollapseToggle?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

type NavItemConfig = {
  tab: string;
  label: string;
  icon: React.ElementType;
  id?: string;
  badge?: string | number;
  badgeClassName?: string;
  iconColor?: string;
  disabled?: boolean;
  tooltipText?: string;
  active?: (activeTab: string) => boolean;
};

const ADMIN_TABS = [
  'admin-dashboard',
  'users-management',
  'admin-plans',
  'admin-analytics',
  'admin-security',
];

const QUICK_ACCESS: NavItemConfig[] = [
  { tab: 'home', label: 'الرئيسية', icon: Home, id: 'tour-home', iconColor: 'text-sky-500', tooltipText: 'اللوحة الرئيسية ونظرة عامة على نشاطك ومشاريعك الحالية' },
  { tab: 'my-plans', label: 'مشاريعي', icon: Layers, id: 'tour-projects', iconColor: 'text-indigo-500', tooltipText: 'استعراض كافة دراسات الجدوى ونماذج الأعمال المحفوظة في حسابك' },
  { tab: 'saved-market-items', label: 'المحفوظات', icon: Bookmark, iconColor: 'text-amber-500', tooltipText: 'مكتبة الأفكار والفرص التي قمت بتفضيلها وحفظها' },
];

const PROJECT_BUILD: NavItemConfig[] = [
  { tab: 'new-plan-family', label: 'النموذج السهل', icon: Heart, id: 'tour-new-plan', iconColor: 'text-rose-500', tooltipText: 'بناء خطة عمل سريعة ومبسطة للمشاريع الناشئة والعائلية' },
  {
    tab: 'new-plan-pro',
    label: 'النموذج الاحترافي',
    icon: Zap,
    iconColor: 'text-amber-500',
    tooltipText: 'دراسة جدوى شمولية ودقيقة مع تحليلات استراتيجية ومالية متقدمة',
    active: (tab) => tab === 'new-plan-pro' || tab === 'strategic-dashboard',
  },
  { tab: 'new-plan-mit24', label: 'MIT 24 Steps', icon: Rocket, iconColor: 'text-purple-500', tooltipText: 'تطبيق منهجية معهد MIT الـ 24 خطوة لبناء المشاريع سريعة النمو' },
  {
    tab: 'new-plan-bmc',
    label: 'بناء نموذج العمل BMC',
    icon: LayoutGrid,
    id: 'tour-bmc',
    iconColor: 'text-blue-500',
    tooltipText: 'استوديو بناء نموذج العمل التجاري تفاعلياً وتحديد العناصر التسعة',
    active: (tab) => tab === 'new-plan-bmc' || tab === 'bmc',
  },
  { tab: 'new-plan-lean', label: 'منهجية Lean Startup', icon: Activity, badge: 'جديد', iconColor: 'text-emerald-500', tooltipText: 'منهجية اختبار الفرضيات وتقليل المخاطر قبل إطلاق المنتج' },
];

const PROJECT_IDEAS: NavItemConfig[] = [
  { tab: 'proven-projects', label: 'أفكار شركات ناجحة', icon: Sparkles, iconColor: 'text-amber-400', tooltipText: 'تحليل +500 شركة ناجحة واكتشاف نماذج إيراداتها واستراتيجيات نموها' },
  { tab: 'failed-projects', label: 'شركات فشلت', icon: TrendingDown, iconColor: 'text-rose-400', tooltipText: 'دراسة أسباب تعثر وفشل الشركات لتوثيق الدروس وتجنب الأخطاء المكلفة' },
  { tab: 'saas-ideas', label: 'أفكار SaaS', icon: CloudCog, iconColor: 'text-cyan-500', tooltipText: 'استكشاف أفكار المشاريع السحابية ونماذج الاشتراك الأكثر ربحية عالمياً' },
  { tab: 'micro-saas-ideas', label: 'أفكار Micro-SaaS', icon: Settings2, iconColor: 'text-teal-500', tooltipText: 'أفكار مشاريع برمجية مصغرة مناسبة للمطورين المستقلين ورواد الأعمال' },
  {
    tab: 'market-discovery',
    label: 'استكشاف قطاعات السوق',
    icon: Compass,
    id: 'tour-market-discovery',
    iconColor: 'text-blue-600',
    tooltipText: 'تحليل ميداني واستثماري لأكثر من 100 قطاع وسوق تجاري',
    active: (tab) => tab === 'market-discovery' || MARKET_DISCOVERY_DASHBOARDS.includes(tab),
  },
  { tab: 'problem-engine', label: 'المشكلات والفرص', icon: Activity, id: 'tour-problem-engine', iconColor: 'text-orange-500', tooltipText: 'رادار اكتشاف الفرص والمشاكل الميدانية لبناء حلول مبتكرة' },
];

const KNOWLEDGE_CENTER: NavItemConfig[] = [
  { tab: 'platform-academy', label: 'أكاديمية المنصة', icon: BookOpen, badge: 'جديد', id: 'tour-academy', iconColor: 'text-indigo-500', tooltipText: 'مركز المقالات والأدلة التعليمية لفهم المؤشرات المالية واستراتيجيات النمو' },
];

const PROJECT_ATTACHMENTS: NavItemConfig[] = [
  { tab: 'financial-calculator', label: 'حاسبة الأرباح والمؤشرات', icon: Calculator, badge: 'جديد', id: 'tour-calculator', iconColor: 'text-emerald-500', tooltipText: 'حساب مؤشرات الإيرادات المتكررة والأرباح (MRR, ARR, LTV, Churn)' },
  { tab: 'first-90-days', label: 'أول 90 يوم للمشروع', icon: Calendar, badge: 'جديد', id: 'tour-first-90-days', iconColor: 'text-sky-500', tooltipText: 'خطة عمل تنفذية وجدول زمني لأهم خطوات إطلاق المشروع في أول 3 أشهر' },
  {
    tab: 'unicorn-benchmark',
    label: 'رادار اليونيكورن',
    icon: Globe,
    id: 'tour-unicorn',
    badge: 'قريباً',
    badgeClassName: 'bg-amber-500/15 text-amber-700 font-bold border border-amber-500/30',
    iconColor: 'text-purple-500 opacity-75',
    disabled: true,
    tooltipText: 'مقيم ومستشار جاهزية اليونيكورن للمشاريع الواعدة — قريباً في المنصة لتوفير المقارنات المتقدمة والتنبؤات الاستثمارية.',
  },
  { tab: 'brand-identity', label: 'الهوية البصرية', icon: Palette, id: 'tour-brand', iconColor: 'text-pink-500', tooltipText: 'استوديو تصميم الهوية التجارية وتنسيق شعار وألوان تقارير الدراسة' },
];

const ACCOUNT_ITEMS: NavItemConfig[] = [
  {
    tab: 'customer-dashboard',
    label: 'حسابي الشخصي',
    icon: Crown,
    iconColor: 'text-amber-500',
    tooltipText: 'إدارة الاشتراك والتفضيلات والأنشطة الخاصة بحسابك',
    active: (tab) =>
      ['subscriber-hub', 'customer-dashboard', 'customer-projects', 'customer-activity', 'customer-support'].includes(tab),
  },
  {
    tab: 'profile',
    label: 'ملف التعريف',
    icon: Settings,
    iconColor: 'text-slate-500',
    tooltipText: 'تعديل البيانات الشخصية، كلمة المرور، وتفضيلات الحساب',
    active: (tab) => ['profile', 'settings', 'customer-account'].includes(tab),
  },
  {
    tab: 'pricing',
    label: 'اشتراكي',
    icon: CreditCard,
    iconColor: 'text-emerald-500',
    tooltipText: 'استعراض وترقية باقة الاشتراك وتفاصيل الفوترة',
    active: (tab) => ['pricing', 'customer-subscription', 'customer-usage'].includes(tab),
  },
];

const ADMIN_CORE: NavItemConfig[] = [
  { tab: 'admin-dashboard', label: 'الرئيسية', icon: LayoutDashboard, tooltipText: 'لوحة القيادة الرئيسية لمشرفي المنصة' },
  { tab: 'admin-analytics', label: 'تحليلات المنصة', icon: Activity, tooltipText: 'إحصائيات استخدام الأدوات وتحليلات الأداء' },
];

const ADMIN_MANAGEMENT: NavItemConfig[] = [
  { tab: 'users-management', label: 'المستخدمون', icon: Users, badge: 248, tooltipText: 'إدارة حسابات وصلاحيات المستخدمين والاشتراكات' },
  { tab: 'admin-plans', label: 'أرشيف الخطط', icon: Layers, tooltipText: 'أرشيف واستعراض دراسات الجدوى المنشورة' },
  { tab: 'admin-security', label: 'الأمان', icon: Shield, tooltipText: 'سجلات الأمان وحماية بيانات النظام' },
];

type ProjectBuildCounts = {
  easy: number;
  pro: number;
  mit24: number;
  bmc: number;
  lean: number;
};

type ProjectCountRow = {
  id: string;
  feasibilityModelType?: string | null;
  feasibilityModels?: Record<string, unknown> | null;
  canvas_data?: {
    feasibilityModelType?: string | null;
    feasibilityModels?: Record<string, unknown> | null;
  } | null;
};

const EMPTY_PROJECT_BUILD_COUNTS: ProjectBuildCounts = {
  easy: 0,
  pro: 0,
  mit24: 0,
  bmc: 0,
  lean: 0,
};

const PROJECT_BUILD_COUNT_CACHE_TTL_MS = 60 * 1000;

const getProjectBuildCountsCacheKey = (userId: string) => `khotta_project_build_counts_${userId}`;

const getProjectBuildCountKey = (modelType: string | null): keyof ProjectBuildCounts | null => {
  switch (modelType) {
    case 'family':
      return 'easy';
    case 'easy':
      return 'pro';
    case 'mit24':
      return 'mit24';
    case 'bmc':
      return 'bmc';
    case 'lean':
      return 'lean';
    default:
      return null;
  }
};

const getProjectBuildModelType = (row: ProjectCountRow): string | null =>
  row.feasibilityModelType
  ?? Object.keys(row.feasibilityModels || {})[0]
  ?? row.canvas_data?.feasibilityModelType
  ?? Object.keys(row.canvas_data?.feasibilityModels || {})[0]
  ?? null;

const readProjectBuildCountsCache = (userId: string): ProjectBuildCounts | null => {
  try {
    const raw = sessionStorage.getItem(getProjectBuildCountsCacheKey(userId));
    if (!raw) return null;

    const parsed = JSON.parse(raw) as { expiresAt: number; counts: ProjectBuildCounts };
    if (!parsed.expiresAt || parsed.expiresAt <= Date.now()) return null;

    return parsed.counts;
  } catch {
    return null;
  }
};

const writeProjectBuildCountsCache = (userId: string, counts: ProjectBuildCounts) => {
  try {
    sessionStorage.setItem(
      getProjectBuildCountsCacheKey(userId),
      JSON.stringify({
        expiresAt: Date.now() + PROJECT_BUILD_COUNT_CACHE_TTL_MS,
        counts,
      }),
    );
  } catch {
    // Cache is only an optimization; fresh Supabase counts remain the fallback.
  }
};

const withProjectBuildCounts = (
  items: NavItemConfig[],
  counts: ProjectBuildCounts,
): NavItemConfig[] =>
  items.map((item) => {
    switch (item.tab) {
      case 'new-plan-family':
        return { ...item, badge: counts.easy };
      case 'new-plan-pro':
      case 'strategic-dashboard':
        return { ...item, badge: counts.pro };
      case 'new-plan-mit24':
        return { ...item, badge: counts.mit24 };
      case 'new-plan-bmc':
        return { ...item, badge: counts.bmc };
      case 'new-plan-lean':
        return { ...item, badge: counts.lean };
      default:
        return item;
    }
  });

const withQuickAccessCounts = (
  items: NavItemConfig[],
  counts: ProjectBuildCounts,
  savedCount: number,
): NavItemConfig[] =>
  items.map((item) => {
    switch (item.tab) {
      case 'my-plans': {
        const total =
          counts.easy +
          counts.pro +
          counts.mit24 +
          counts.bmc +
          counts.lean;
        return { ...item, badge: total > 0 ? total : undefined };
      }
      case 'saved-market-items':
        return { ...item, badge: savedCount > 0 ? savedCount : undefined };
      default:
        return item;
    }
  });

function isItemActive(item: NavItemConfig, activeTab: string) {
  return item.active ? item.active(activeTab) : activeTab === item.tab;
}

function goToTab(
  event: React.MouseEvent<HTMLAnchorElement>,
  tab: string,
  setActiveTab?: (tab: string) => void,
) {
  event.preventDefault();
  event.stopPropagation();
  setActiveTab?.(tab);
  window.dispatchEvent(new CustomEvent('khotta:navigate', { detail: { tab } }));
}

function SidebarLink({
  item,
  activeTab,
  setActiveTab,
}: {
  item: NavItemConfig;
  activeTab: string;
  setActiveTab?: (tab: string) => void;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const Icon = item.icon;
  const isActive = isItemActive(item, activeTab);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.tooltipText || item.label}
        className={cn(
          "h-auto py-2 min-h-9.5 justify-start gap-2.5 px-3 text-right text-sm leading-relaxed transition-all rounded-xl cursor-pointer group-data-[collapsible=icon]:!h-9 group-data-[collapsible=icon]:!w-9 group-data-[collapsible=icon]:!min-h-0 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!justify-center",
          isActive
            ? "!bg-slate-900 !text-white font-bold shadow-sm hover:!bg-slate-900 hover:!text-white"
            : "text-slate-700 font-semibold hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        <a
          id={item.id}
          href={getTabPath(item.tab)}
          onClick={(event) => {
            goToTab(event, item.tab, setActiveTab);
            if (isMobile) setOpenMobile(false);
          }}
          className="flex w-full items-center gap-2.5 rounded-xl transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto"
        >
          <Icon className={cn("size-4.5 shrink-0 transition-transform group-hover:scale-105", isActive ? "!text-white" : item.iconColor || "text-slate-600")} />
          <span className={cn("min-w-0 flex-1 group-data-[collapsible=icon]:hidden", isActive ? "!text-white font-bold" : "font-semibold")}>
            {item.label}
          </span>
          {item.badge !== undefined && item.badge !== null && item.badge !== '' ? (
            <span
              className={cn(
                "ms-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md px-1.5 text-[11px] font-bold tabular-nums group-data-[collapsible=icon]:hidden",
                isActive
                  ? "!bg-white/20 !text-white font-bold"
                  : item.badgeClassName || "bg-sidebar-accent text-sidebar-foreground"
              )}
            >
              {item.badge}
            </span>
          ) : null}
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SidebarSection({
  title,
  icon: Icon,
  items,
  activeTab,
  setActiveTab,
}: {
  title: string;
  icon?: React.ElementType;
  items: NavItemConfig[];
  activeTab: string;
  setActiveTab?: (tab: string) => void;
}) {
  const { isMobile, setOpenMobile } = useSidebar();
  const isAnyActive = items.some((item) => isItemActive(item, activeTab));

  return (
    <Collapsible defaultOpen={true} className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild className="bg-transparent font-bold text-[11px] uppercase tracking-wider text-slate-400 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer transition-colors w-full flex items-center justify-between py-1">
          <CollapsibleTrigger>
            <span className={cn("flex items-center gap-1.5 transition-colors", isAnyActive && "text-slate-900 font-bold")}>
              {title}
            </span>
            <ChevronDown className="ms-auto size-3.5 transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const SubIcon = item.icon;
                const isActive = isItemActive(item, activeTab);
                const isDisabled = Boolean(item.disabled);

                return (
                  <SidebarMenuItem key={`${title}-${item.tab}-${item.label}`}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      disabled={isDisabled}
                      tooltip={item.tooltipText || item.label}
                      className={cn(
                        "h-auto py-2 min-h-9.5 justify-start gap-2.5 px-3 text-right text-sm leading-relaxed transition-all rounded-xl cursor-pointer group-data-[collapsible=icon]:!h-9 group-data-[collapsible=icon]:!w-9 group-data-[collapsible=icon]:!min-h-0 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:!justify-center",
                        isActive
                          ? "!bg-slate-900 !text-white font-bold shadow-sm hover:!bg-slate-900 hover:!text-white"
                          : "text-slate-700 font-semibold hover:bg-slate-100 hover:text-slate-900",
                        isDisabled && "hover:bg-amber-500/10 cursor-not-allowed"
                      )}
                    >
                      <a
                        id={item.id}
                        href={isDisabled ? '#' : getTabPath(item.tab)}
                        onClick={(event) => {
                          if (isDisabled) {
                            event.preventDefault();
                            return;
                          }
                          goToTab(event, item.tab, setActiveTab);
                          if (isMobile) setOpenMobile(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-xl transition-colors group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:w-auto",
                          isDisabled && "opacity-75 cursor-not-allowed"
                        )}
                      >
                        <SubIcon className={cn("size-4.5 shrink-0 transition-transform group-hover:scale-105", isActive ? "!text-white" : item.iconColor || "text-slate-600")} />

                        <span className={cn("min-w-0 flex-1 group-data-[collapsible=icon]:hidden", isActive ? "font-bold !text-white text-sm" : "font-semibold text-sm text-slate-700")}>
                          {item.label}
                        </span>

                        {item.badge !== undefined && item.badge !== null && item.badge !== '' ? (
                          <span
                            className={cn(
                              "ms-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md px-1.5 text-[11px] font-bold tabular-nums group-data-[collapsible=icon]:hidden",
                              isActive
                                ? "!bg-white/20 !text-white font-bold"
                                : item.badgeClassName || "bg-sidebar-accent text-sidebar-foreground"
                            )}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  );
}

function AccountSection({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab?: (tab: string) => void;
}) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="bg-transparent font-semibold text-sidebar-foreground/70">إدارة المستخدم</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {ACCOUNT_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item, activeTab);

            return (
              <SidebarMenuItem key={`account-${item.tab}`}>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive} 
                  tooltip={item.label}
                  className="h-auto py-1.5 min-h-8 justify-start gap-2 px-2 text-right text-[13px] leading-relaxed"
                >
                  <a
                    id={item.id}
                    href={getTabPath(item.tab)}
                    onClick={(event) => {
                      goToTab(event, item.tab, setActiveTab);
                      if (isMobile) setOpenMobile(false);
                    }}
                  >
                    <Icon />
                    <span className="min-w-0 flex-1">{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export const Sidebar: React.FC<SidebarProps> = ({ user, activeTab = 'home', setActiveTab }) => {
  const { user: authUser } = useAuth();
  const isAdminMode = ADMIN_TABS.includes(activeTab);
  const { state, toggleSidebar, isMobile, setOpenMobile } = useSidebar();
  const [projectBuildCounts, setProjectBuildCounts] = React.useState<ProjectBuildCounts>(EMPTY_PROJECT_BUILD_COUNTS);

  React.useEffect(() => {
    let isMounted = true;

    const loadProjectBuildCounts = async () => {
      if (!authUser?.id) {
        setProjectBuildCounts(EMPTY_PROJECT_BUILD_COUNTS);
        return;
      }

      const cachedCounts = readProjectBuildCountsCache(authUser.id);
      if (cachedCounts) {
        setProjectBuildCounts(cachedCounts);
      }

      try {
        const { data, error } = await supabase
          .from('business_canvas')
          .select('id, canvas_data->>feasibilityModelType, canvas_data->feasibilityModels')
          .eq('user_id', authUser.id)
          .is('deleted_at', null);

        if (error) throw error;

        const nextCounts = { ...EMPTY_PROJECT_BUILD_COUNTS };
        (data as ProjectCountRow[] | null)?.forEach((row) => {
          // The section pages add fixed example cards for demonstration only.
          // Never include persisted example rows in the user's project counts.
          if (row.id.startsWith('example')) return;
          const countKey = getProjectBuildCountKey(getProjectBuildModelType(row));
          if (countKey) {
            nextCounts[countKey] += 1;
          }
        });

        writeProjectBuildCountsCache(authUser.id, nextCounts);
        if (isMounted) {
          setProjectBuildCounts(nextCounts);
        }
      } catch (error) {
        console.error('Failed to load project build counts:', error);
        if (isMounted) {
          setProjectBuildCounts(EMPTY_PROJECT_BUILD_COUNTS);
        }
      }
    };

    void loadProjectBuildCounts();

    return () => {
      isMounted = false;
    };
  }, [authUser?.id, activeTab]);

  const [savedCount, setSavedCount] = React.useState(0);

  React.useEffect(() => {
    try {
      const marketItems = loadSavedMarketItems();
      const bookmarked = loadBookmarkedProjectIds();
      setSavedCount(marketItems.length + bookmarked.length);
    } catch {
      setSavedCount(0);
    }
  }, [activeTab]);

  const quickAccessItems = React.useMemo(
    () => withQuickAccessCounts(QUICK_ACCESS, projectBuildCounts, savedCount),
    [projectBuildCounts, savedCount],
  );

  const projectBuildItems = React.useMemo(
    () => withProjectBuildCounts(PROJECT_BUILD, projectBuildCounts),
    [projectBuildCounts],
  );

  return (
    <UiSidebar side="right" dir="rtl" variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="h-12 justify-start gap-2 px-2 text-right cursor-pointer"
            >
              <Link
                href="/"
                onClick={() => {
                  if (isMobile) setOpenMobile(false);
                }}
                title="الرئيسية - صفحة الهبوط"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-black">
                  {isAdminMode ? <Shield className="size-4" /> : <Zap className="size-4" />}
                </span>
                <span className="grid min-w-0 flex-1 text-right leading-tight">
                  <span className="truncate text-sm font-extrabold text-sidebar-foreground">
                    {isAdminMode ? 'لوحة الإدارة' : 'خطة.'}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {isAdminMode ? 'إدارة المنصة' : 'الجيل الجديد من دراسات الجدوى'}
                  </span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        {isAdminMode ? (
          <>
            <SidebarSection title="التحكم" items={ADMIN_CORE} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="إدارة النظام" items={ADMIN_MANAGEMENT} activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        ) : (
          <>
            <SidebarSection title="الوصول السريع" items={quickAccessItems} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="بناء دراسة جدوى مشروع" items={projectBuildItems} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="أفكار مشاريع" items={PROJECT_IDEAS} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="ملحقات المشروع" items={PROJECT_ATTACHMENTS} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="المركز المعرفي" items={KNOWLEDGE_CENTER} activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="hidden">
            <SidebarMenuButton
              className="h-9 justify-start gap-2 px-2 text-right"
              onClick={() => setActiveTab?.(isAdminMode ? 'home' : 'admin-dashboard')}
            >
              {isAdminMode ? <LogOut /> : <Shield />}
              <span>{isAdminMode ? 'حساب المستخدم' : 'لوحة الأدمن'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem className="mt-2">
            <SidebarMenuButton 
              className="h-10 justify-start gap-3 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border/50 rounded-lg cursor-pointer transition-all"
              onClick={toggleSidebar}
              title={state === "collapsed" ? "توسيع القائمة" : "طي القائمة"}
            >
              <div className="flex size-6 shrink-0 items-center justify-center rounded-md bg-muted shadow-sm border border-border/50 text-foreground">
                {state === "collapsed" ? <ChevronLeft className="size-3.5" /> : <ChevronRight className="size-3.5" />}
              </div>
              <span className="font-medium text-sm group-data-[collapsible=icon]:hidden">
                طي القائمة الجانبية
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </UiSidebar>
  );
};
