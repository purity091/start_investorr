import React from 'react';
import {
  Bell,
  Briefcase,
  Compass,
  CreditCard,
  Crown,
  LayoutDashboard,
  LogOut,
  MoreHorizontal,
  Settings as SettingsIcon,
  Sparkles,
  User as UserIcon,
} from 'lucide-react';

import type { User } from '../../types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  subTabLabel?: string | null;
  setSubTabLabel?: (label: string | null) => void;
  setIsTourRunning: (running: boolean) => void;
  user: User;
}

const TAB_LABELS: Record<string, string> = {
  home: 'الرئيسية',
  'my-plans': 'مشاريعي',
  'new-plan-family': 'النموذج السهل',
  'new-plan-pro': 'النموذج الاحترافي',
  'new-plan-mit24': 'MIT 24 Steps',
  'new-plan-bmc': 'بناء نموذج العمل BMC',
  'market-discovery': 'استكشاف السوق',
  'problem-engine': 'المشكلات والفرص',
  'unicorn-benchmark': 'رادار اليونيكورن',
  'brand-identity': 'الهوية البصرية',
  workspace: 'مساحة المشروع',
  pricing: 'اشتراكي',
  settings: 'ملف التعريف',
  notifications: 'التنبيهات',
  profile: 'ملف التعريف',
  'saved-market-items': 'المحفوظات',
  'customer-dashboard': 'حسابي الشخصي',
  'customer-projects': 'حسابي الشخصي',
  'customer-subscription': 'اشتراكي',
  'customer-usage': 'اشتراكي',
  'customer-activity': 'حسابي الشخصي',
  'customer-account': 'ملف التعريف',
  'customer-support': 'حسابي الشخصي',
  'admin-dashboard': 'لوحة الإدارة',
  'users-management': 'المستخدمون',
  'admin-analytics': 'تحليلات المنصة',
  'admin-security': 'الأمان',
  'admin-plans': 'أرشيف الخطط',
  'contact-us': 'تواصل معنا',
};

const notifications = [
  { title: 'تم تحديث المشروع الرئيسي', meta: 'منذ 15 دقيقة' },
  { title: 'فاتورة التجديد القادمة جاهزة', meta: '21 يوليو 2026' },
  { title: 'توصية جديدة متاحة داخل المنصة', meta: 'منذ ساعة' },
];

const quickActions = [
  { label: 'حسابي الشخصي', icon: Crown, tab: 'customer-dashboard' },
  { label: 'ملف التعريف', icon: SettingsIcon, tab: 'profile' },
  { label: 'اشتراكي', icon: CreditCard, tab: 'pricing' },
];

function getContextBadge(activeTab: string) {
  if (activeTab.startsWith('admin-') || activeTab === 'users-management') {
    return { label: 'وضع الإدارة', variant: 'secondary' as const };
  }

  if (['customer-dashboard', 'customer-projects', 'customer-activity', 'customer-support', 'subscriber-hub'].includes(activeTab)) {
    return { label: 'حسابي الشخصي', variant: 'outline' as const };
  }

  if (['profile', 'settings', 'customer-account'].includes(activeTab)) {
    return { label: 'ملف التعريف', variant: 'outline' as const };
  }

  if (['pricing', 'customer-subscription', 'customer-usage'].includes(activeTab)) {
    return { label: 'اشتراكي', variant: 'outline' as const };
  }

  if (
    activeTab === 'market-discovery' ||
    activeTab === 'problem-engine' ||
    activeTab === 'unicorn-benchmark' ||
    activeTab === 'brand-identity'
  ) {
    return { label: 'أدوات النمو', variant: 'outline' as const };
  }

  return { label: 'مساحة العمل', variant: 'outline' as const };
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  subTabLabel,
  setSubTabLabel,
  setIsTourRunning,
  user,
}) => {
  const title = TAB_LABELS[activeTab] || subTabLabel || 'لوحة العمل';
  const subtitle =
    subTabLabel && subTabLabel !== title
      ? subTabLabel
      : 'تنقل واضح وسريع مبني على shadcn/ui ويحافظ على تجربة RTL.';
  const contextBadge = getContextBadge(activeTab);

  const startTour = () => {
    setIsTourRunning(true);
    setSubTabLabel?.(null);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur" dir="rtl">
      <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <SidebarTrigger className="mt-0.5 h-9 w-9 rounded-lg border border-border bg-background text-foreground hover:bg-muted" />
            <Separator orientation="vertical" className="hidden h-9 sm:block" />

            <div className="min-w-0 flex-1 text-right">
              <div className="flex flex-wrap items-center justify-start gap-2">
                <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">{title}</h1>
                <Badge variant={contextBadge.variant} className="rounded-md">
                  {contextBadge.label}
                </Badge>
              </div>
              <p className="mt-1 truncate text-xs font-medium text-muted-foreground sm:text-sm">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 sm:justify-start">
            <div className="hidden items-center gap-2 lg:flex">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="h-9 rounded-lg"
                onClick={() => setActiveTab('saved-market-items')}
              >
                المحفوظات
              </Button>

              <Button
                id="tour-site-tour-trigger-header"
                type="button"
                variant="outline"
                size="sm"
                className="h-9 rounded-lg"
                onClick={startTour}
              >
                <Compass className="size-4" />
                جولة تعريفية
              </Button>
            </div>

            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-lg sm:min-w-32"
                >
                  <MoreHorizontal className="size-4" />
                  <span className="hidden sm:inline">وصول سريع</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-56">
                <DropdownMenuLabel className="text-right">إجراءات سريعة</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {quickActions.map(({ label, icon: Icon, tab }) => (
                    <DropdownMenuItem key={tab} onClick={() => setActiveTab(tab)}>
                      <Icon className="size-4" />
                      <span>{label}</span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuItem onClick={startTour}>
                    <Sparkles className="size-4" />
                    <span>بدء الجولة التعريفية</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button
                  id="tour-notifications"
                  variant="ghost"
                  size="icon-sm"
                  className="relative rounded-lg border border-transparent hover:border-border hover:bg-muted"
                  aria-label="التنبيهات"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-80">
                <DropdownMenuLabel className="text-right">التنبيهات</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((item) => (
                  <DropdownMenuItem key={item.title} className="flex flex-col items-end gap-1 py-3 text-right">
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.meta}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button
                  id="tour-profile-menu"
                  variant="ghost"
                  className="h-10 gap-2 rounded-xl border border-transparent px-2 hover:border-border hover:bg-muted"
                >
                  <div className="hidden min-w-0 text-right sm:block">
                    <p className="truncate text-xs font-semibold text-foreground">{user.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{user.email}</p>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-64">
                <DropdownMenuLabel className="text-right">
                  <div className="text-sm font-semibold">{user.name}</div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setActiveTab('customer-dashboard')}>
                    <Crown className="size-4" />
                    <span>حسابي الشخصي</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                    <UserIcon className="size-4" />
                    <span>ملف التعريف</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('pricing')}>
                    <CreditCard className="size-4" />
                    <span>اشتراكي</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => setActiveTab('my-plans')}>
                    <Briefcase className="size-4" />
                    <span>مشاريعي</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab('home')}>
                    <LayoutDashboard className="size-4" />
                    <span>الرئيسية</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOut className="size-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
