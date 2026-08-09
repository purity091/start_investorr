
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

import { MOCK_USER, INITIAL_SECTIONS, ADMIN_TABS } from './data/constants';
import { PlanSection, User } from './types';
import { getTabFromPathname, getTabPath } from './utils/routes';
import { ProjectWorkspaceProvider, useProjectWorkspace } from './features/workspace/ProjectWorkspaceContext';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
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

const isPublicTab = (tab: string) => PUBLIC_TABS.has(tab) || tab.endsWith('-dashboard');

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

  const [sections, setSections] = useState<PlanSection[]>(INITIAL_SECTIONS);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>('1');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>('saved');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    const savedState = localStorage.getItem('khotta_sidebar_collapsed');
    return savedState !== null ? savedState === 'true' : false; // Default expanded for logged-in internal views
  });
  const [isTourRunning, setIsTourRunning] = useState(false);
  const [subTabLabel, setSubTabLabel] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | undefined>(undefined);
  const { setPlanSections, setStage } = useProjectWorkspace();

  const requiresAuth = !isPublicTab(activeTab);

  const setActiveTab = (tab: string, options?: { replace?: boolean }) => {
    const nextTab = normalizeTab(tab || DEFAULT_TAB);

    // Route Protection
    if (!session && !isPublicTab(nextTab)) {
      window.location.href = `/login?redirect=${encodeURIComponent(nextTab)}`;
      return;
    }

    const nextPath = getTabPath(nextTab, window.location.pathname);
    const currentPath = `${window.location.pathname}${window.location.search}`;

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
      const nextTab = normalizeTab(getTabFromPathname(window.location.pathname) || DEFAULT_TAB);
      if (!session && !isPublicTab(nextTab)) {
        window.location.replace(`/login?redirect=${encodeURIComponent(nextTab)}`);
        return;
      }
      setSubTabLabel(null);
      setActiveTabState(nextTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [session]);

  useEffect(() => {
    localStorage.setItem('khotta_active_tab', activeTab);
    const expectedPath = getTabPath(activeTab, window.location.pathname);
    if (window.location.pathname !== expectedPath) {
      window.history.replaceState({ tab: activeTab }, '', expectedPath);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleAppNavigation = (event: Event) => {
      const detail = (event as CustomEvent<{ tab?: string; path?: string }>).detail;
      if (!detail?.tab) return;
      const nextTab = normalizeTab(detail.tab);

      if (!session && !isPublicTab(nextTab)) {
        window.location.replace(`/login?redirect=${encodeURIComponent(nextTab)}`);
        return;
      }

      const nextPath = detail.tab === nextTab && detail.path
        ? detail.path
        : getTabPath(nextTab, window.location.pathname);
      if (window.location.pathname !== nextPath) {
        window.history.pushState({ tab: nextTab }, '', nextPath);
      }
      setSubTabLabel(null);
      setActiveTabState(nextTab);
    };

    window.addEventListener('khotta:navigate', handleAppNavigation);
    return () => window.removeEventListener('khotta:navigate', handleAppNavigation);
  }, [session]);

  useEffect(() => {
    if (authLoading) return;

    if (activeTab === 'login' && session) {
      window.location.replace('/home');
      return;
    }

    if (requiresAuth && !session) {
      window.location.replace(`/login?redirect=${encodeURIComponent(activeTab)}`);
    }
  }, [activeTab, authLoading, requiresAuth, session]);

  useEffect(() => {
    if (saveStatus === 'saving') {
      const timer = setTimeout(() => setSaveStatus('saved'), 1000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  useEffect(() => {
    setPlanSections(sections);
  }, [sections, setPlanSections]);

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
    setSaveStatus('saving');
    setSections(prev => prev.map(s => 
      s.id === id ? { ...s, ...updates, lastEdited: 'الآن' } : s
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
      <ProjectWorkspaceProvider planSections={initialSections}>
        <AppShell />
      </ProjectWorkspaceProvider>
    </AuthProvider>
  );
};

export default App;
