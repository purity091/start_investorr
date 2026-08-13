import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  AreaChart,
  Briefcase,
  Calculator,
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
  X,
  Zap,
  TrendingDown,
  CloudCog,
  Settings2,
} from 'lucide-react';

import { getTabPath } from '../../utils/routes';
import { Button } from '../ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  setActiveTab: (tab: any) => void;
  isAdminMode: boolean;
}

type NavItem = {
  icon: React.ElementType;
  label: string;
  tab: string;
  active?: (activeTab: string) => boolean;
  badge?: string;
};

const buildItems: NavItem[] = [
  { icon: Heart, label: 'النموذج السهل', tab: 'new-plan-family' },
  { icon: Zap, label: 'النموذج الاحترافي', tab: 'new-plan-pro', active: (tab) => tab === 'new-plan-pro' || tab === 'strategic-dashboard' },
  { icon: Rocket, label: 'MIT 24 Steps', tab: 'new-plan-mit24' },
  { icon: LayoutGrid, label: 'بناء نموذج العمل BMC', tab: 'new-plan-bmc', active: (tab) => tab === 'new-plan-bmc' || tab === 'bmc' },
  { icon: Activity, label: 'منهجية Lean Startup', tab: 'new-plan-lean' },
];

const discoveryItems: NavItem[] = [
  { icon: Layers, label: 'أفكار شركات ناجحة', tab: 'proven-projects' },
  { icon: TrendingDown, label: 'شركات فشلت', tab: 'failed-projects' },
  { icon: CloudCog, label: 'أفكار SaaS', tab: 'saas-ideas' },
  { icon: Settings2, label: 'أفكار Micro-SaaS', tab: 'micro-saas-ideas' },
  { icon: Compass, label: 'استكشاف قطاعات السوق', tab: 'market-discovery', active: (tab) => tab === 'market-discovery' || tab.endsWith('-dashboard') },
  { icon: Activity, label: 'المشكلات والفرص', tab: 'problem-engine', active: (tab) => tab === 'problem-engine' || tab === 'problem-detail' },
];

const addOnItems: NavItem[] = [
  { icon: Calculator, label: 'حاسبة الأرباح والمؤشرات', tab: 'financial-calculator', badge: 'جديد' },
  { icon: Globe, label: 'رادار اليونيكورن', tab: 'unicorn-benchmark' },
  { icon: Palette, label: 'الهوية البصرية', tab: 'brand-identity' },
];

const accountItems: NavItem[] = [
  {
    icon: Crown,
    label: 'حسابي الشخصي',
    tab: 'customer-dashboard',
    active: (tab) => ['subscriber-hub', 'customer-dashboard', 'customer-projects', 'customer-activity', 'customer-support'].includes(tab),
  },
  {
    icon: Settings,
    label: 'ملف التعريف',
    tab: 'profile',
    active: (tab) => ['profile', 'settings', 'customer-account'].includes(tab),
  },
  {
    icon: CreditCard,
    label: 'اشتراكي',
    tab: 'pricing',
    active: (tab) => ['pricing', 'customer-subscription', 'customer-usage'].includes(tab),
  },
];

const adminItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'لوحة الإدارة', tab: 'admin-dashboard' },
  { icon: AreaChart, label: 'تحليلات المنصة', tab: 'admin-analytics' },
  { icon: Users, label: 'المستخدمون', tab: 'users-management', badge: '248' },
  { icon: Layers, label: 'أرشيف الخطط', tab: 'admin-plans' },
  { icon: Shield, label: 'الأمان', tab: 'admin-security' },
];

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, activeTab, setActiveTab, isAdminMode }) => {
  const [isAccountGroupOpen, setIsAccountGroupOpen] = useState(false);

  if (!isOpen) return null;

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    onClose();
  };

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[150] bg-black/20 lg:hidden"
        onClick={onClose}
        aria-label="إغلاق القائمة"
      />

      <aside
        id="tour-mobile-menu"
        className="fixed right-0 top-0 z-[160] flex h-full w-[86vw] max-w-[340px] flex-col border-l border-border bg-background shadow-xl lg:hidden"
        dir="rtl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex min-w-0 items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer"
            title="الانتقال إلى صفحة الهبوط"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              {isAdminMode ? <Shield className="size-5" /> : <Zap className="size-5" />}
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-foreground">
                {isAdminMode ? 'واجهة الإدارة' : 'خطة.'}
              </h2>
              <p className="truncate text-xs text-muted-foreground">
                {isAdminMode ? 'إدارة النظام' : 'منصة بناء المشاريع'}
              </p>
            </div>
          </Link>
          <Button variant="ghost" size="icon-sm" onClick={onClose} aria-label="إغلاق">
            <X className="size-4" />
          </Button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {isAdminMode ? (
            <NavGroup title="إدارة النظام">
              {adminItems.map((item) => (
                <MenuItem key={item.tab} item={item} activeTab={activeTab} onNavigate={handleNavigate} />
              ))}
            </NavGroup>
          ) : (
            <>
              <NavGroup title="الوصول السريع">
                <MenuItem item={{ icon: Home, label: 'الرئيسية', tab: 'home' }} activeTab={activeTab} onNavigate={handleNavigate} />
                <MenuItem item={{ icon: Briefcase, label: 'مشاريعي', tab: 'my-plans' }} activeTab={activeTab} onNavigate={handleNavigate} />
              </NavGroup>

              <NavGroup title="بناء دراسة جدوى مشروع">
                {buildItems.map((item) => (
                  <MenuItem key={item.tab} item={item} activeTab={activeTab} onNavigate={handleNavigate} />
                ))}
              </NavGroup>

              <NavGroup title="أفكار مشاريع">
                {discoveryItems.map((item) => (
                  <MenuItem key={item.tab} item={item} activeTab={activeTab} onNavigate={handleNavigate} />
                ))}
              </NavGroup>

              <NavGroup title="ملحقات المشروع">
                {addOnItems.map((item) => (
                  <MenuItem key={item.tab} item={item} activeTab={activeTab} onNavigate={handleNavigate} />
                ))}
              </NavGroup>

              <div>
                <button
                  type="button"
                  onClick={() => setIsAccountGroupOpen((value) => !value)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <span>صفحات المستخدم</span>
                  <ChevronDown className={`size-4 transition-transform ${isAccountGroupOpen ? 'rotate-180' : ''}`} />
                </button>
                {isAccountGroupOpen ? (
                  <div className="mt-2 space-y-1">
                    {accountItems.map((item) => (
                      <MenuItem key={item.tab} item={item} activeTab={activeTab} onNavigate={handleNavigate} />
                    ))}
                  </div>
                ) : null}
              </div>
            </>
          )}
        </nav>

        <div className="border-t border-border p-3">
          <Button
            variant={isAdminMode ? 'secondary' : 'outline'}
            className="w-full"
            onClick={() => handleNavigate(isAdminMode ? 'home' : 'admin-dashboard')}
          >
            {isAdminMode ? <LogOut className="size-4" /> : <Shield className="size-4" />}
            {isAdminMode ? 'العودة لواجهة المستخدم' : 'لوحة تحكم الإدارة'}
          </Button>
        </div>
      </aside>
    </>
  );
};

function NavGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground">{title}</h3>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

function MenuItem({
  item,
  activeTab,
  onNavigate,
}: {
  item: NavItem;
  activeTab: string;
  onNavigate: (tab: string) => void;
}) {
  const Icon = item.icon;
  const isActive = item.active ? item.active(activeTab) : activeTab === item.tab;

  return (
    <a
      href={getTabPath(item.tab)}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(item.tab);
      }}
      className={`flex min-h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon className="size-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate text-right">{item.label}</span>
      {item.badge ? (
        <span className={`rounded-md px-1.5 py-0.5 text-[10px] ${isActive ? 'bg-primary-foreground/15' : 'bg-muted text-muted-foreground'}`}>
          {item.badge}
        </span>
      ) : null}
    </a>
  );
}
