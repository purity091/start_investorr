import React from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCheck,
  Bell,
  Briefcase,
  CheckCircle2,
  Compass,
  CreditCard,
  Crown,
  LayoutDashboard,
  Loader2,
  LogOut,
  MessageSquarePlus,
  Clock,
  User as UserIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

import type { User } from '../../types';
import { useAuth } from '../../features/auth/AuthContext';
import { useProjectWorkspace } from '../../features/workspace/ProjectWorkspaceContext';
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { PlatformFeedbackModal } from './PlatformFeedbackModal';
import { getNotificationMeta, useSystemNotifications } from '@/services/notificationService';

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
  'strategic-dashboard': 'النموذج الاحترافي',
  'new-plan-mit24': 'MIT 24 Steps',
  'new-plan-bmc': 'بناء نموذج العمل BMC',
  'market-discovery': 'استكشاف قطاعات السوق',
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
  'proven-projects': 'أفكار شركات ناجحة',
  'failed-projects': 'شركات فشلت (Post-Mortem)',
  'saas-ideas': 'أفكار SaaS',
  'micro-saas-ideas': 'أفكار Micro-SaaS',
  'project-ideas': 'أفكار مشاريع',
};

const SECTION_NAMES: Record<string, string> = {
  home: 'الوصول السريع',
  'my-plans': 'الوصول السريع',
  'saved-market-items': 'الوصول السريع',
  'new-plan-family': 'بناء دراسة جدوى مشروع',
  'strategic-dashboard': 'بناء دراسة جدوى مشروع',
  'new-plan-pro': 'بناء دراسة جدوى مشروع',
  'new-plan-mit24': 'بناء دراسة جدوى مشروع',
  'new-plan-bmc': 'بناء دراسة جدوى مشروع',
  'new-plan-lean': 'بناء دراسة جدوى مشروع',
  'proven-projects': 'أفكار مشاريع',
  'failed-projects': 'أفكار مشاريع',
  'saas-ideas': 'أفكار مشاريع',
  'micro-saas-ideas': 'أفكار مشاريع',
  'market-discovery': 'أفكار مشاريع',
  'problem-engine': 'أفكار مشاريع',
  'platform-academy': 'المركز المعرفي',
  'financial-calculator': 'ملحقات المشروع',
  'first-90-days': 'ملحقات المشروع',
  'unicorn-benchmark': 'ملحقات المشروع',
  'brand-identity': 'ملحقات المشروع',
  'customer-dashboard': 'إدارة المستخدم',
  profile: 'إدارة المستخدم',
  pricing: 'إدارة المستخدم',
};

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

  if (
    ['proven-projects', 'failed-projects', 'saas-ideas', 'micro-saas-ideas', 'project-ideas'].includes(activeTab)
  ) {
    return { label: 'قاعدة المعرفة', variant: 'secondary' as const };
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
  const { signOut } = useAuth();
  const { isSaving, syncStatus, activeProjectId, flushWorkspace } = useProjectWorkspace();
  const title = TAB_LABELS[activeTab] || subTabLabel || 'لوحة العمل';
  const sectionName = SECTION_NAMES[activeTab] || null;
  const contextBadge = getContextBadge(activeTab);
  const [isFeedbackOpen, setIsFeedbackOpen] = React.useState(false);
  const [showSaved, setShowSaved] = React.useState(false);
  const prevSaving = React.useRef(false);

  const {
    notifications: headerNotifications,
    unreadCount: unreadHeaderCount,
    isLoading: isLoadingNotifications,
    markAsRead,
    markAllAsRead,
  } = useSystemNotifications({ limit: 5 });

  const markAllHeaderRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    void markAllAsRead();
  };

  // Show the saved indicator briefly after a remote sync completes.
  React.useEffect(() => {
    if (prevSaving.current && !isSaving && activeProjectId && syncStatus === 'saved') {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 2000);
      return () => clearTimeout(timer);
    }
    prevSaving.current = isSaving;
  }, [isSaving, activeProjectId, syncStatus]);

  React.useEffect(() => {
    const hasPrompted = sessionStorage.getItem('platform_feedback_prompted');
    if (hasPrompted) return;

    const timer = setTimeout(() => {
      setIsFeedbackOpen(true);
      sessionStorage.setItem('platform_feedback_prompted', 'true');
    }, 180000); // 3 minutes = 180,000ms

    return () => clearTimeout(timer);
  }, []);

  const startTour = () => {
    setIsTourRunning(true);
    setSubTabLabel?.(null);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur" dir="rtl">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 flex-1">
          <SidebarTrigger className="lg:hidden h-8 w-8 text-foreground hover:bg-muted [&_svg]:size-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </SidebarTrigger>
          <h1 className="truncate text-sm font-semibold text-foreground sm:text-base">{title}</h1>
          {/* Auto-save indicator */}
          {syncStatus === 'saving' && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" />
              جاري مزامنة الحفظ...
            </span>
          )}
          {syncStatus === 'pending' && (
            <button
              type="button"
              onClick={() => void flushWorkspace()}
              className="hidden sm:flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-800"
              title="مزامنة التعديلات الآن"
            >
              <Clock className="size-3" />
              محفوظ محلياً
            </button>
          )}
          {syncStatus === 'failed' && (
            <button
              type="button"
              onClick={() => void flushWorkspace()}
              className="hidden sm:flex items-center gap-1.5 text-xs text-destructive hover:underline"
              title="إعادة محاولة الحفظ"
            >
              <AlertCircle className="size-3" />
              فشل الحفظ
            </button>
          )}
          {syncStatus === 'conflict' && (
            <button
              type="button"
              onClick={() => void flushWorkspace()}
              className="hidden sm:flex items-center gap-1.5 text-xs text-amber-700 hover:underline"
              title="تم اكتشاف تعارض مع نسخة أحدث"
            >
              <AlertCircle className="size-3" />
              تعارض نسخة
            </button>
          )}
          {syncStatus === 'saved' && showSaved && (
            <span className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-600">
              <CheckCircle2 className="size-3" />
              تمت المزامنة
            </span>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
              className="h-9 gap-1.5 rounded-lg border-border text-foreground hover:bg-muted font-medium text-xs"
              title="أرسل اقتراحك لتطوير المنصة"
            >
              <MessageSquarePlus className="size-4 text-muted-foreground" />
              <span className="hidden sm:inline">اقتراح للمنصة</span>
            </Button>

            <Button
              id="tour-site-tour-trigger-header"
              type="button"
              variant="outline"
              size="icon-sm"
              className="h-9 w-9 rounded-lg"
              onClick={startTour}
              aria-label="بدء الجولة التعريفية"
              title="بدء الجولة التعريفية"
            >
              <Compass className="size-4" />
            </Button>

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
                  {unreadHeaderCount > 0 ? (
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
                  ) : null}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 sm:w-96">
                <DropdownMenuLabel className="text-right flex items-center justify-between">
                  <span>التنبيهات</span>
                  {unreadHeaderCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllHeaderRead}
                      className="text-[11px] font-normal text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCheck className="size-3" />
                      تحديد كمقروء
                    </button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-y-auto divide-y divide-border/50">
                  {isLoadingNotifications ? (
                    <div className="flex items-center justify-center gap-2 p-6 text-xs text-muted-foreground">
                      <Loader2 className="size-4 animate-spin" />
                      <span>جاري تحميل التنبيهات...</span>
                    </div>
                  ) : headerNotifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-muted-foreground">
                      لا توجد تنبيهات جديدة.
                    </div>
                  ) : headerNotifications.map((item) => {
                    const meta = getNotificationMeta(item.type);
                    const Icon = meta.icon;
                    return (
                      <DropdownMenuItem 
                        key={item.id || item.title} 
                        onClick={() => {
                          void markAsRead(item.id);
                          const tab = item.link?.replace('/', '');
                          if (tab) setActiveTab(tab);
                          else setActiveTab('notifications');
                        }}
                        className={cn(
                          "flex items-start gap-3 p-3.5 text-right cursor-pointer hover:bg-muted/60 transition-colors focus:bg-muted/60",
                          !item.isRead && "bg-primary/5 font-medium"
                        )}
                      >
                        <div className={cn("size-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border", meta.className)}>
                          <Icon className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-xs font-bold text-foreground truncate">{item.title}</p>
                            {!item.isRead && <span className="size-2 rounded-full bg-primary shrink-0" />}
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">{item.message}</p>
                          <span className="text-[10px] text-muted-foreground/80 font-mono block">{item.timestamp}</span>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setActiveTab('notifications')}
                  className="cursor-pointer justify-center text-center text-xs text-primary hover:bg-primary/10 py-2.5 flex items-center gap-1.5 font-bold"
                >
                  <span>عرض جميع التنبيهات</span>
                  <ArrowLeft className="size-3.5" />
                </DropdownMenuItem>




              </DropdownMenuContent>
            </DropdownMenu>

            {user.email ? (
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
                  <DropdownMenuItem variant="destructive" onClick={async () => {
                    await signOut();
                  }}>
                    <LogOut className="size-4" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                className="h-9 px-4 text-sm font-medium"
                onClick={() => setActiveTab('workspace')} // Trigger auth since workspace is protected
              >
                تسجيل الدخول
              </Button>
            )}
          </div>
      </div>

      <PlatformFeedbackModal
        open={isFeedbackOpen}
        onOpenChange={setIsFeedbackOpen}
        userName={user?.name}
      />
    </header>
  );
};
