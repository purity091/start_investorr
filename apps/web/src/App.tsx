
// v5.0.0 - Next.js Production AppShell with Supabase Auth & Route Protection
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { StrategicSupportFloat } from './components/layout/StrategicSupportFloat';
import { BottomNavBar } from './components/layout/BottomNavBar';
import { Header } from './components/layout/Header';
import { AppBreadcrumb } from './components/layout/AppBreadcrumb';
import { DashboardFooter } from './components/layout/DashboardFooter';
import { DashboardRouter } from './components/views/DashboardRouter';
import SiteTour from './components/views/SiteTour';
import { TooltipProvider } from './components/ui/tooltip';
import { SidebarInset, SidebarProvider } from './components/ui/sidebar';

import { INITIAL_SECTIONS, ADMIN_TABS } from './data/constants';
import { PlanSection, User } from './types';
import { getTabFromPathname, getTabPath } from './utils/routes';
import { ProjectWorkspaceProvider, useProjectWorkspace } from './features/workspace/ProjectWorkspaceContext';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { NotificationProvider } from './services/notificationService';
import { AuthScreen } from './features/auth/AuthScreen';

const DEFAULT_TAB = 'home';

const TAB_ALIASES: Record<string, string> = {
  'customer-dashboard': DEFAULT_TAB,
};

const normalizeTab = (tab: string) => {
  return TAB_ALIASES[tab] || tab;
};

/** Public routes accessible without logging in */
const PUBLIC_TABS = new Set([
  'landing',
  'pricing-plans',
  'pricing',
  'contact-us',
  'faq',
  'about',
  'terms',
  'privacy',
]);

const PRIVATE_DASHBOARD_TABS = new Set([
  ...ADMIN_TABS,
  'strategic-dashboard',
]);

const isAdminTab = (tab: string) => ADMIN_TABS.includes(tab);
const isPublicTab = (tab: string) =>
  PUBLIC_TABS.has(tab) || (tab.endsWith('-dashboard') && !PRIVATE_DASHBOARD_TABS.has(tab));
const getCurrentPath = () => `${window.location.pathname}${window.location.search}`;
const getLoginPath = (targetPath: string) => `/login?next=${encodeURIComponent(targetPath)}`;

const AppShell: React.FC = () => {
  const { session, user: authUser, profile, loading: authLoading } = useAuth();
  
  const [activeTab, setActiveTabState] = useState<string>(() => {
    const pathTab = getTabFromPathname(window.location.pathname);
    if (pathTab) return normalizeTab(pathTab);
    const savedTab = localStorage.getItem('khotta_active_tab');
    return savedTab ? normalizeTab(savedTab) : DEFAULT_TAB;
  });

  const appUser: User = authUser ? {
    name: profile?.full_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'مستخدم خطة',
    email: authUser.email || '',
    avatar: authUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.email}`,
    credits: 100,
    totalCredits: 100,
  } : {
    name: '',
    email: '',
    avatar: '',
    credits: 0,
    totalCredits: 0,
  };

  const [expandedSectionId, setExpandedSectionId] = useState<string | null>('1');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    const savedState = localStorage.getItem('khotta_sidebar_collapsed');
    return savedState !== null ? savedState === 'true' : false; // Default expanded for logged-in internal views
  });
  const [isTourRunning, setIsTourRunning] = useState(false);
  const [subTabLabel, setSubTabLabel] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | undefined>(undefined);
  const { workspace, setPlanSections, setStage, flushWorkspace } = useProjectWorkspace();
  const sections = workspace.planSections;

  const requiresAuth = !isPublicTab(activeTab);

  const setActiveTab = (tab: string, options?: { replace?: boolean }) => {
    let nextTab = normalizeTab(tab || DEFAULT_TAB);
    let nextPath = getTabPath(nextTab, window.location.pathname);

    // Route Protection
    if (!session && !isPublicTab(nextTab)) {
      window.location.href = getLoginPath(nextPath);
      return;
    }

    if (session && isAdminTab(nextTab) && profile?.role !== 'admin') {
      nextTab = DEFAULT_TAB;
      nextPath = getTabPath(nextTab, window.location.pathname);
    }

    void flushWorkspace();

    const currentPath = getCurrentPath();

    if (currentPath !== nextPath) {
      if (options?.replace) {
        window.history.replaceState({ tab: nextTab }, '', nextPath);
      } else {
        window.history.pushState({ tab: nextTab }, '', nextPath);
      }
    }

    setSubTabLabel(null);
    setActiveTabState(nextTab);
    window.dispatchEvent(new CustomEvent('khotta:navigate', { detail: { tab: nextTab, path: nextPath } }));
  };

  useEffect(() => {
    const handlePopState = () => {
      let nextTab = normalizeTab(getTabFromPathname(window.location.pathname) || DEFAULT_TAB);
      if (!session && !isPublicTab(nextTab)) {
        window.location.replace(getLoginPath(getCurrentPath()));
        return;
      }
      if (session && isAdminTab(nextTab) && profile?.role !== 'admin') {
        nextTab = DEFAULT_TAB;
        window.history.replaceState({ tab: nextTab }, '', getTabPath(nextTab, window.location.pathname));
        setSubTabLabel(null);
        setActiveTabState(nextTab);
        return;
      }
      setSubTabLabel(null);
      setActiveTabState(nextTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [profile?.role, session]);

  useEffect(() => {
    localStorage.setItem('khotta_active_tab', activeTab);
    const expectedPath = getTabPath(activeTab, window.location.pathname);
    if (window.location.pathname !== expectedPath) {
      window.history.replaceState({ tab: activeTab }, '', expectedPath);
    }
    // Auto-collapse sidebar on small screens (< 1024px) or when on project edit/builder views
    if (window.innerWidth < 1024 || activeTab === 'project-edit' || activeTab.startsWith('new-plan-')) {
      setIsSidebarCollapsed(true);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleAppNavigation = (event: Event) => {
      const detail = (event as CustomEvent<{ tab?: string; path?: string }>).detail;
      if (!detail?.tab) return;
      let nextTab = normalizeTab(detail.tab);
      let nextPath = detail.tab === nextTab && detail.path
        ? detail.path
        : getTabPath(nextTab, window.location.pathname);

      if (!session && !isPublicTab(nextTab)) {
        window.location.replace(getLoginPath(nextPath));
        return;
      }

      if (session && isAdminTab(nextTab) && profile?.role !== 'admin') {
        nextTab = DEFAULT_TAB;
        nextPath = getTabPath(nextTab, window.location.pathname);
      }

      if (window.location.pathname !== nextPath) {
        window.history.pushState({ tab: nextTab }, '', nextPath);
      }
      setSubTabLabel(null);
      setActiveTabState(nextTab);
    };

    window.addEventListener('khotta:navigate', handleAppNavigation);
    return () => window.removeEventListener('khotta:navigate', handleAppNavigation);
  }, [profile?.role, session]);

  useEffect(() => {
    if (authLoading) return;

    if (activeTab === 'login' && session) {
      window.location.replace('/home');
      return;
    }

    if (requiresAuth && !session) {
      window.location.replace(getLoginPath(getCurrentPath()));
      return;
    }

    if (session && isAdminTab(activeTab) && profile?.role !== 'admin') {
      window.location.replace('/home');
    }
  }, [activeTab, authLoading, profile?.role, requiresAuth, session]);

  useEffect(() => {
    const tabToStageMap: Record<string, 'discovery' | 'analysis' | 'decision' | 'planning' | 'execution'> = {
      'market-discovery': 'discovery',
      'problem-engine': 'analysis',
      'strategic-dashboard': 'decision',
      'editor': 'planning',
      'workspace': 'execution',
    };

    if (tabToStageMap[activeTab]) {
      setStage(tabToStageMap[activeTab]);
    }
  }, [activeTab, setStage]);

  const handleSectionUpdate = (id: string, updates: Partial<PlanSection>) => {
    setPlanSections(sections.map((section) =>
      section.id === id ? { ...section, ...updates, lastEdited: 'الآن' } : section
    ));
  };

  const isAdminView = ADMIN_TABS.includes(activeTab);

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
          <p className="text-muted-foreground font-medium">جاري التحقق من الحساب...</p>
        </div>
      </div>
    );
  }

  // If user is on login tab but already has a session → redirect to home
  if (activeTab === 'login' && session) {
    return null;
  }

  // If user is on login tab with no session → show login/register screen
  if (activeTab === 'login') {
    return <AuthScreen />;
  }

  // If user tries to access a protected tab without a session → redirect to login
  if (requiresAuth && !session) {
    return null;
  }

  return (
    <TooltipProvider>
      <SidebarProvider 
        open={!isSidebarCollapsed} 
        onOpenChange={(open) => {
          const collapsed = !open;
          setIsSidebarCollapsed(collapsed);
          localStorage.setItem('khotta_sidebar_collapsed', String(collapsed));
        }}
      >
        <div className="flex min-h-screen w-full max-w-full bg-background">
          <Sidebar
            user={appUser}
            isCollapsed={isSidebarCollapsed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <SidebarInset
            className="min-h-screen flex flex-col w-full max-w-full min-w-0 overflow-x-hidden bg-background transition-[margin] duration-300"
          >
            <Header
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              subTabLabel={subTabLabel}
              setSubTabLabel={setSubTabLabel}
              setIsTourRunning={setIsTourRunning}
              user={appUser}
            />

            <AppBreadcrumb
              activeTab={activeTab}
              subTabLabel={subTabLabel}
              setActiveTab={setActiveTab}
            />

            <DashboardRouter
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setSubTabLabel={setSubTabLabel}
              user={appUser}
              sections={sections}
              handleSectionUpdate={handleSectionUpdate}
              expandedSectionId={expandedSectionId}
              onSectionExpand={setExpandedSectionId}
              selectedCompanyId={selectedCompanyId}
              setSelectedCompanyId={setSelectedCompanyId}
            />

            <DashboardFooter setActiveTab={setActiveTab} />

            {!isAdminView ? <StrategicSupportFloat /> : null}
          </SidebarInset>

          {isTourRunning && (
            <SiteTour
              onComplete={() => setIsTourRunning(false)}
              onSkip={() => setIsTourRunning(false)}
            />
          )}

          <BottomNavBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onMenuClick={() => setIsSidebarCollapsed(false)}
          />
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

const App: React.FC = () => {
  const [initialSections] = useState<PlanSection[]>(INITIAL_SECTIONS);

  return (
    <AuthProvider>
      <NotificationProvider>
        <ProjectWorkspaceProvider planSections={initialSections}>
          <AppShell />
        </ProjectWorkspaceProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
