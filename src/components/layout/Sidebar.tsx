import React from 'react';
import {
  Activity,
  Bell,
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
  Users,
  Zap,
} from 'lucide-react';

import type { User } from '../../types';
import { getTabPath } from '../../utils/routes';
import { Button } from '../ui/Button';
import {
  Sidebar as UiSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
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

const CUSTOMER_TABS = [
  'subscriber-hub',
  'customer-dashboard',
  'customer-projects',
  'customer-subscription',
  'customer-usage',
  'customer-activity',
  'customer-account',
  'customer-support',
];

const QUICK_ACCESS: NavItemConfig[] = [
  { tab: 'home', label: 'الرئيسية', icon: Home, id: 'tour-home' },
  { tab: 'my-plans', label: 'مشاريعي', icon: Layers, id: 'tour-projects' },
];

const PROJECT_BUILD: NavItemConfig[] = [
  { tab: 'new-plan-family', label: 'مود الأهل', icon: Heart, id: 'tour-new-plan' },
  { tab: 'new-plan-pro', label: 'النموذج الاحترافي', icon: Zap, active: (tab) => tab === 'new-plan-pro' || tab === 'strategic-dashboard' },
  { tab: 'new-plan-mit24', label: 'MIT 24 Steps', icon: Rocket },
  { tab: 'new-plan-bmc', label: 'بناء بنموذج العمل BMC', icon: LayoutGrid, id: 'tour-bmc', active: (tab) => tab === 'new-plan-bmc' || tab === 'bmc' },
];

const PROJECT_IDEAS: NavItemConfig[] = [
  { tab: 'my-plans', label: 'مشاريع ناجحة مثبتة', icon: Layers },
  { tab: 'market-discovery', label: 'استكشاف السوق', icon: Compass, id: 'tour-market-discovery', active: (tab) => tab === 'market-discovery' || MARKET_DISCOVERY_DASHBOARDS.includes(tab) },
  { tab: 'problem-engine', label: 'المشاكل والفرص', icon: Activity, id: 'tour-problem-engine' },
];

const PROJECT_ATTACHMENTS: NavItemConfig[] = [
  { tab: 'unicorn-benchmark', label: 'رادار اليونيكورن', icon: Globe, id: 'tour-unicorn' },
  { tab: 'brand-identity', label: 'الهوية البصرية', icon: Palette, id: 'tour-brand' },
];

const ACCOUNT_ITEMS: NavItemConfig[] = [
  { tab: 'notifications', label: 'التنبيهات', icon: Bell, id: 'tour-notifications', badge: 3 },
  { tab: 'saved-market-items', label: 'المحفوظات', icon: Bookmark },
  { tab: 'pricing', label: 'الاشتراكات والأسعار', icon: CreditCard },
  { tab: 'customer-dashboard', label: 'بوابة العميل', icon: Crown, active: (tab) => CUSTOMER_TABS.includes(tab) },
  { tab: 'settings', label: 'إعدادات المنصة', icon: Settings },
];

const ADMIN_CORE: NavItemConfig[] = [
  { tab: 'admin-dashboard', label: 'الصفحة الرئيسية', icon: LayoutDashboard },
  { tab: 'admin-analytics', label: 'تحليلات المنصة', icon: Activity },
];

const ADMIN_MANAGEMENT: NavItemConfig[] = [
  { tab: 'users-management', label: 'قاعدة المستخدمين', icon: Users, badge: 248 },
  { tab: 'admin-plans', label: 'أرشيف الخطط', icon: Layers },
  { tab: 'admin-security', label: 'بروتوكولات الأمان', icon: Shield },
];

function SidebarLink({
  item,
  activeTab,
  setActiveTab,
  size = 'default',
}: {
  item: NavItemConfig;
  activeTab: string;
  setActiveTab?: (tab: string) => void;
  size?: 'sm' | 'default' | 'lg';
}) {
  const isActive = item.active ? item.active(activeTab) : activeTab === item.tab;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        size={size}
        tooltip={item.label}
        className="justify-start gap-2.5 rounded-lg text-[13px] font-medium text-right"
      >
        <a
          id={item.id}
          href={getTabPath(item.tab)}
          className="flex w-full items-center gap-2.5 text-right"
          onClick={(event) => {
            event.preventDefault();
            setActiveTab?.(item.tab);
          }}
        >
          <item.icon />
          <span className="truncate">{item.label}</span>
        </a>
      </SidebarMenuButton>
      {item.badge ? (
        <SidebarMenuBadge className="rounded-full bg-sidebar-primary/10 px-1.5 text-[10px] font-semibold text-sidebar-primary">
          {item.badge}
        </SidebarMenuBadge>
      ) : null}
    </SidebarMenuItem>
  );
}

function SidebarSection({
  title,
  items,
  activeTab,
  setActiveTab,
  actionLabel,
  onAction,
}: {
  title: string;
  items: NavItemConfig[];
  activeTab: string;
  setActiveTab?: (tab: string) => void;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="justify-start px-3 text-right text-[11px] font-semibold text-sidebar-foreground/50">
        {title}
      </SidebarGroupLabel>
      {actionLabel && onAction ? (
        <SidebarGroupAction aria-label={actionLabel} title={actionLabel} onClick={onAction}>
          <Zap />
        </SidebarGroupAction>
      ) : null}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarLink key={`${title}-${item.tab}`} item={item} activeTab={activeTab} setActiveTab={setActiveTab} />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export const Sidebar: React.FC<SidebarProps> = ({ user, activeTab = 'home', setActiveTab }) => {
  const isAdminMode = ['admin-dashboard', 'users-management', 'admin-plans', 'admin-analytics', 'admin-security'].includes(activeTab);
  const [accountOpen, setAccountOpen] = React.useState(false);

  return (
    <UiSidebar side="right" dir="rtl" variant="floating" collapsible="icon" className="border-l-0">
      <SidebarHeader className="gap-3 px-3 py-3">
        <button
          type="button"
          onClick={() => setActiveTab?.(isAdminMode ? 'admin-dashboard' : 'home')}
          className="flex w-full items-center gap-3 rounded-xl border border-sidebar-border/70 bg-sidebar px-3 py-3 text-right transition-colors hover:bg-sidebar-accent"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-sidebar-border bg-sidebar-accent text-sidebar-accent-foreground">
            {isAdminMode ? <Shield size={18} /> : <Zap size={18} />}
          </div>
          <div className="min-w-0 flex-1 text-right group-data-[collapsible=icon]:hidden">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">
              {isAdminMode ? 'واجهة الإدارة' : 'خطة'}
            </p>
            <p className="mt-1 text-[11px] font-medium text-sidebar-foreground/55">
              {isAdminMode ? 'System Admin' : 'Business AI Platform'}
            </p>
          </div>
        </button>
      </SidebarHeader>

      <SidebarContent className="px-2 pb-2">
        {isAdminMode ? (
          <>
            <SidebarSection title="التحكم" items={ADMIN_CORE} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="إدارة النظام" items={ADMIN_MANAGEMENT} activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        ) : (
          <>
            <SidebarSection
              title="الوصول السريع"
              items={QUICK_ACCESS}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              actionLabel="الانتقال إلى الرئيسية"
              onAction={() => setActiveTab?.('home')}
            />
            <SidebarSection title="بناء دراسة جدوى مشروع" items={PROJECT_BUILD} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="أفكار مشاريع" items={PROJECT_IDEAS} activeTab={activeTab} setActiveTab={setActiveTab} />
            <SidebarSection title="ملحقات المشروع" items={PROJECT_ATTACHMENTS} activeTab={activeTab} setActiveTab={setActiveTab} />

            <SidebarGroup>
              <SidebarGroupLabel className="justify-start px-3 text-right text-[11px] font-semibold text-sidebar-foreground/50">
                إدارة الحساب
              </SidebarGroupLabel>
              <SidebarGroupAction
                aria-label="فتح الإعدادات"
                title="فتح الإعدادات"
                onClick={() => setActiveTab?.('settings')}
              >
                <Settings />
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={ACCOUNT_ITEMS.some((item) => item.active ? item.active(activeTab) : item.tab === activeTab)}
                      className="justify-start gap-2.5 rounded-lg text-right text-[13px] font-medium"
                      onClick={() => setAccountOpen((current) => !current)}
                    >
                      <Settings />
                      <span className="truncate">خيارات الحساب</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction
                      aria-label={accountOpen ? 'إخفاء خيارات الحساب' : 'إظهار خيارات الحساب'}
                      title={accountOpen ? 'إخفاء خيارات الحساب' : 'إظهار خيارات الحساب'}
                      onClick={() => setAccountOpen((current) => !current)}
                    >
                      <ChevronDown className={`transition-transform ${accountOpen ? 'rotate-180' : ''}`} />
                    </SidebarMenuAction>
                    {accountOpen ? (
                      <SidebarMenuSub>
                        {ACCOUNT_ITEMS.map((item) => {
                          const isActive = item.active ? item.active(activeTab) : activeTab === item.tab;
                          return (
                            <SidebarMenuSubItem key={`account-${item.tab}`}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive}
                                size="md"
                                className="justify-start gap-2.5 text-right"
                              >
                                <a
                                  id={item.id}
                                  href={getTabPath(item.tab)}
                                  onClick={(event) => {
                                    event.preventDefault();
                                    setActiveTab?.(item.tab);
                                  }}
                                >
                                  <item.icon />
                                  <span>{item.label}</span>
                                  {item.badge ? (
                                    <span className="me-auto rounded-full bg-sidebar-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-sidebar-primary">
                                      {item.badge}
                                    </span>
                                  ) : null}
                                </a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="gap-3 px-3 pb-3 pt-2">
        {!isAdminMode ? (
          <div className="hidden group-data-[collapsible=icon]:hidden">
            <div className="rounded-xl border border-sidebar-border/70 bg-sidebar-accent/40 p-3 text-right">
              <p className="text-[11px] font-semibold text-muted-foreground">الدعم الاستراتيجي</p>
              <p className="mt-2 text-sm font-semibold text-foreground">تحتاج لخبرة استثمارية؟</p>
              <Button className="mt-3 w-full" variant="outline" onClick={() => setActiveTab?.('contact-us')}>
                تحدث مع مستشار
              </Button>
            </div>
          </div>
        ) : null}

        <Button
          variant="outline"
          className="w-full justify-center rounded-lg group-data-[collapsible=icon]:px-0"
          onClick={() => setActiveTab?.(isAdminMode ? 'home' : 'admin-dashboard')}
        >
          {isAdminMode ? <LogOut size={16} /> : <Shield size={16} />}
          <span>{isAdminMode ? 'العودة لحساب المستخدم' : 'لوحة تحكم الآدمن'}</span>
        </Button>

        <div className="px-2 text-center group-data-[collapsible=icon]:hidden">
          <p className="text-[10px] font-semibold text-muted-foreground">{user.name}</p>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </UiSidebar>
  );
};
