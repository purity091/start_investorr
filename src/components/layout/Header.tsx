import React from 'react';
import {
  Bell,
  Bookmark,
  Briefcase,
  Compass,
  Crown,
  LayoutDashboard,
  LogOut,
  Settings as SettingsIcon,
  Sparkles,
  User as UserIcon,
} from 'lucide-react';

import type { User } from '../../types';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SidebarTrigger } from '../ui/sidebar';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  subTabLabel?: string | null;
  setSubTabLabel?: (label: string | null) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isTourRunning: boolean;
  setIsTourRunning: (running: boolean) => void;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  notificationRef: React.RefObject<HTMLDivElement>;
  profileRef: React.RefObject<HTMLDivElement>;
  user: User;
}

const TAB_LABELS: Record<string, string> = {
  home: 'الرئيسية',
  'my-plans': 'مشاريعي',
  'new-plan-family': 'مود الأهل',
  'new-plan-pro': 'النموذج الاحترافي',
  'new-plan-mit24': 'MIT 24 Steps',
  'new-plan-bmc': 'نموذج العمل BMC',
  'market-discovery': 'استكشاف السوق',
  'problem-engine': 'المشاكل والفرص',
  'unicorn-benchmark': 'رادار اليونيكورن',
  'brand-identity': 'الهوية البصرية',
  workspace: 'مساحة المشروع',
  editor: 'المحرر',
  pricing: 'الاشتراكات',
  settings: 'الإعدادات',
  notifications: 'التنبيهات',
  profile: 'الملف الشخصي',
  'customer-dashboard': 'بوابة العميل',
  'customer-projects': 'مشاريع العميل',
  'customer-subscription': 'الاشتراك والفوترة',
  'customer-usage': 'الاستخدام والصلاحيات',
  'customer-activity': 'النشاط والتنبيهات',
  'customer-account': 'الحساب والهوية',
  'customer-support': 'الدعم والطلبات',
  'admin-dashboard': 'لوحة الإدارة',
  'users-management': 'المستخدمون',
  'admin-analytics': 'تحليلات المنصة',
  'admin-security': 'الأمان',
  'admin-plans': 'أرشيف الخطط',
  'contact-us': 'تواصل معنا',
};

const notifications = [
  { title: 'تحديث جديد على مشروعك الرئيسي', meta: 'منذ 15 دقيقة' },
  { title: 'فاتورة التجديد القادمة جاهزة', meta: '21 يوليو 2026' },
  { title: 'اقتراح استراتيجي جديد متاح', meta: 'منذ ساعة' },
];

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  subTabLabel,
  setSubTabLabel,
  setIsTourRunning,
  user,
}) => {
  const title = TAB_LABELS[activeTab] || subTabLabel || 'لوحة العمل';
  const subtitle = subTabLabel && subTabLabel !== title ? subTabLabel : 'واجهة موحّدة مبنية على shadcn/ui';

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="h-9 w-9 rounded-lg border border-border bg-background text-foreground hover:bg-muted" />
          <div className="min-w-0 text-right">
            <p className="truncate text-sm font-black text-foreground">{title}</p>
            <p className="truncate text-xs font-medium text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="hidden h-9 rounded-lg sm:inline-flex"
            onClick={() => setActiveTab('saved-market-items')}
          >
            <Bookmark size={16} />
            <span>المحفوظات</span>
          </Button>
          <Button
            id="tour-site-tour-trigger-header"
            variant="outline"
            size="sm"
            className="hidden h-9 rounded-lg sm:inline-flex"
            onClick={() => {
              setIsTourRunning(true);
              setSubTabLabel?.(null);
            }}
          >
            <Compass size={16} />
            <span>جولة تعريفية</span>
          </Button>

          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button
                id="tour-notifications"
                variant="ghost"
                size="icon-sm"
                className="relative rounded-lg border border-transparent hover:border-border hover:bg-muted"
              >
                <Bell size={18} />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>التنبيهات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((item) => (
                <DropdownMenuItem key={item.title} className="flex flex-col items-end gap-1 py-3">
                  <span className="text-sm font-bold text-foreground">{item.title}</span>
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
                <span className="hidden text-xs font-medium text-foreground sm:inline">{user.name}</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel className="text-right">
                <div className="text-sm font-black">{user.name}</div>
                <div className="mt-1 text-xs font-medium text-muted-foreground">{user.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                <UserIcon />
                <span>ملفي الشخصي</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('my-plans')}>
                <Briefcase />
                <span>مشاريعي</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('saved-market-items')}>
                <Bookmark />
                <span>المحفوظات</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('customer-dashboard')}>
                <Crown />
                <span>بوابة العميل</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('settings')}>
                <SettingsIcon />
                <span>الإعدادات</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setActiveTab('home')}>
                <LayoutDashboard />
                <span>الرئيسية</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut />
                <span>تسجيل الخروج</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="rounded-lg sm:hidden"
            onClick={() => setActiveTab('saved-market-items')}
            aria-label="المحفوظات"
          >
            <Bookmark size={16} />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="rounded-lg sm:hidden"
            onClick={() => {
              setIsTourRunning(true);
              setSubTabLabel?.(null);
            }}
            aria-label="الجولة التعريفية"
          >
            <Sparkles size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
};
