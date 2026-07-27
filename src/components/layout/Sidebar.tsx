import React from 'react';
import {
  Activity,
  Bookmark,
  ChevronDown,
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
} from 'lucide-react';

import type { User } from '../../types';
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
} from '../ui/sidebar';

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
  { tab: 'home', label: 'الرئيسية', icon: Home, id: 'tour-home' },
  { tab: 'my-plans', label: 'مشاريعي', icon: Layers, id: 'tour-projects' },
  { tab: 'saved-market-items', label: 'المحفوظات', icon: Bookmark },
];

const PROJECT_BUILD: NavItemConfig[] = [
  { tab: 'new-plan-family', label: 'النموذج السهل', icon: Heart, id: 'tour-new-plan', badge: 2 },
  {
    tab: 'new-plan-pro',
    label: 'النموذج الاحترافي',
    icon: Zap,
    badge: 2,
    active: (tab) => tab === 'new-plan-pro' || tab === 'strategic-dashboard',
  },
  { tab: 'new-plan-mit24', label: 'MIT 24 Steps', icon: Rocket, badge: 1 },
  {
    tab: 'new-plan-bmc',
    label: 'بناء نموذج العمل BMC',
    icon: LayoutGrid,
    id: 'tour-bmc',
    badge: 1,
    active: (tab) => tab === 'new-plan-bmc' || tab === 'bmc',
  },
];

const PROJECT_IDEAS: NavItemConfig[] = [
  { tab: 'my-plans', label: 'مشاريع ناجحة مثبتة', icon: Sparkles },
  {
    tab: 'market-discovery',
    label: 'استكشاف السوق',
    icon: Compass,
    id: 'tour-market-discovery',
    active: (tab) => tab === 'market-discovery' || MARKET_DISCOVERY_DASHBOARDS.includes(tab),
  },
  { tab: 'problem-engine', label: 'المشكلات والفرص', icon: Activity, id: 'tour-problem-engine' },
];

const PROJECT_ATTACHMENTS: NavItemConfig[] = [
  { tab: 'unicorn-benchmark', label: 'رادار اليونيكورن', icon: Globe, id: 'tour-unicorn' },
  { tab: 'brand-identity', label: 'الهوية البصرية', icon: Palette, id: 'tour-brand' },
];

const ACCOUNT_ITEMS: NavItemConfig[] = [
  {
    tab: 'customer-dashboard',
    label: 'حسابي الشخصي',
    icon: Crown,
    active: (tab) =>
      ['subscriber-hub', 'customer-dashboard', 'customer-projects', 'customer-activity', 'customer-support'].includes(tab),
  },
  {
    tab: 'profile',
    label: 'ملف التعريف',
    icon: Settings,
    active: (tab) => ['profile', 'settings', 'customer-account'].includes(tab),
  },
  {
    tab: 'pricing',
    label: 'اشتراكي',
    icon: CreditCard,
    active: (tab) => ['pricing', 'customer-subscription', 'customer-usage'].includes(tab),
  },
];

const ADMIN_CORE: NavItemConfig[] = [
  { tab: 'admin-dashboard', label: 'الرئيسية', icon: LayoutDashboard },
  { tab: 'admin-analytics', label: 'تحليلات المنصة', icon: Activity },
];

const ADMIN_MANAGEMENT: NavItemConfig[] = [
  { tab: 'users-management', label: 'المستخدمون', icon: Users, badge: 248 },
  { tab: 'admin-plans', label: 'أرشيف الخطط', icon: Layers },
  { tab: 'admin-security', label: 'الأمان', icon: Shield },
];

function isItemActive(item: NavItemConfig, activeTab: string) {
  return item.active ? item.active(activeTab) : activeTab === item.tab;
}

function goToTab(
  event: React.MouseEvent<HTMLAnchorElement>,
  tab: string,
  setActiveTab?: (tab: string) => void,
) {
  event.preventDefault();
  setActiveTab?.(tab);
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
  const Icon = item.icon;
  const isActive = isItemActive(item, activeTab);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.label}
        className="h-8 justify-start gap-2 px-2 text-right text-[13px] leading-none"
      >
        <a
          id={item.id}
          href={getTabPath(item.tab)}
          onClick={(event) => goToTab(event, item.tab, setActiveTab)}
        >
          <Icon />
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
          {item.badge ? (
            <span className="ms-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-md bg-sidebar-accent px-1.5 text-[11px] font-medium tabular-nums text-sidebar-foreground group-data-[collapsible=icon]:hidden">
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
  items,
  activeTab,
  setActiveTab,
}: {
  title: string;
  items: NavItemConfig[];
  activeTab: string;
  setActiveTab?: (tab: string) => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="justify-start text-right">{title}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarLink
              key={`${title}-${item.tab}-${item.label}`}
              item={item}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function AccountSection({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab?: (tab: string) => void;
}) {
  const isAccountActive = ACCOUNT_ITEMS.some((item) => isItemActive(item, activeTab));
  const [open, setOpen] = React.useState(isAccountActive);

  React.useEffect(() => {
    if (isAccountActive) {
      setOpen(true);
    }
  }, [isAccountActive]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="justify-start text-right">إدارة المستخدم</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible open={open} onOpenChange={setOpen} asChild>
            <SidebarMenuItem className="group/collapsible">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  isActive={isAccountActive}
                  className="h-8 justify-start gap-2 px-2 text-right text-[13px] leading-none"
                >
                  <Settings />
                  <span>صفحات المستخدم</span>
                  <ChevronDown className="me-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {ACCOUNT_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = isItemActive(item, activeTab);

                    return (
                      <SidebarMenuSubItem key={`account-${item.tab}`}>
                        <SidebarMenuSubButton asChild isActive={isActive} className="justify-start text-right">
                          <a
                            id={item.id}
                            href={getTabPath(item.tab)}
                            onClick={(event) => goToTab(event, item.tab, setActiveTab)}
                          >
                            <Icon />
                            <span>{item.label}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export const Sidebar: React.FC<SidebarProps> = ({ user, activeTab = 'home', setActiveTab }) => {
  const isAdminMode = ADMIN_TABS.includes(activeTab);

  return (
    <UiSidebar side="right" dir="rtl" variant="sidebar" collapsible="icon">
      <SidebarHeader className="hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="h-12 justify-start gap-2 px-2 text-right"
              onClick={() => setActiveTab?.(isAdminMode ? 'admin-dashboard' : 'home')}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                {isAdminMode ? <Shield className="size-4" /> : <Zap className="size-4" />}
              </span>
              <span className="grid min-w-0 flex-1 text-right leading-tight">
                <span className="truncate text-sm font-semibold">
                  {isAdminMode ? 'لوحة الإدارة' : 'خطة'}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {isAdminMode ? 'إدارة المنصة' : 'منصة دراسة الجدوى'}
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="hidden" />

      <SidebarContent>
        {isAdminMode ? (
          <>
            <SidebarSection title="التحكم" items={ADMIN_CORE} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="إدارة النظام" items={ADMIN_MANAGEMENT} activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        ) : (
          <>
            <SidebarSection title="الوصول السريع" items={QUICK_ACCESS} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="بناء دراسة جدوى مشروع" items={PROJECT_BUILD} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="أفكار مشاريع" items={PROJECT_IDEAS} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="ملحقات المشروع" items={PROJECT_ATTACHMENTS} activeTab={activeTab} setActiveTab={setActiveTab} />
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
          <SidebarMenuItem>
            <SidebarMenuButton className="h-9 justify-start gap-2 px-2 text-right">
              <Crown />
              <span className="truncate">{user.name}</span>
            </SidebarMenuButton>
            <SidebarMenuAction
              aria-label="ملف التعريف"
              title="ملف التعريف"
              onClick={() => setActiveTab?.('profile')}
            >
              <Settings />
            </SidebarMenuAction>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </UiSidebar>
  );
};
