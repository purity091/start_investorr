
// v4.0.1 - Production Sync
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { StrategicSupportFloat } from './components/layout/StrategicSupportFloat';
import { BottomNavBar } from './components/layout/BottomNavBar';
import { Header } from './components/layout/Header';
import { AppBreadcrumb } from './components/layout/AppBreadcrumb';
import { DashboardRouter } from './components/views/DashboardRouter';
import SiteTour from './components/views/SiteTour';
import { TooltipProvider } from './components/ui/tooltip';
import { SidebarInset, SidebarProvider } from './components/ui/sidebar';

import { MOCK_USER, INITIAL_SECTIONS, ADMIN_TABS } from './data/constants';
import { PlanSection } from './types';
import { getTabFromPathname, getTabPath } from './utils/routes';
import { ProjectWorkspaceProvider, useProjectWorkspace } from './features/workspace/ProjectWorkspaceContext';

const DEFAULT_TAB = 'home';

import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { AuthScreen } from './features/auth/AuthScreen';

const AppShell: React.FC = () => {
  const { session, user: authUser, loading: authLoading } = useAuth();
  
  const [activeTab, setActiveTabState] = useState<string>(() => {
    const pathTab = getTabFromPathname(window.location.pathname);
    if (pathTab) return pathTab;
    const savedTab = localStorage.getItem('khotta_active_tab');
    return (savedTab as any) || DEFAULT_TAB;
  });

  const appUser = authUser ? {
    name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'مستخدم',
    email: authUser.email || '',
    avatar: authUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.email}`,
    credits: 100,
    totalCredits: 100,
  } : MOCK_USER;

  const [sections, setSections] = useState<PlanSection[]>(INITIAL_SECTIONS);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>('1');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>('saved');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isTourRunning, setIsTourRunning] = useState(false);
  const [subTabLabel, setSubTabLabel] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | undefined>(undefined);
  const { setPlanSections, setStage } = useProjectWorkspace();

  const setActiveTab = (tab: string, options?: { replace?: boolean }) => {
    const nextTab = tab || DEFAULT_TAB;
    const nextPath = getTabPath(nextTab, window.location.pathname);
    const currentPath = `${window.location.pathname}${window.location.search}`;

    if (currentPath !== nextPath) {
      if (options?.replace) {
        window.history.replaceState({ tab: nextTab }, '', nextPath);
      } else {
        window.history.pushState({ tab: nextTab }, '', nextPath);
      }
    }

    setActiveTabState(nextTab);
    window.dispatchEvent(new CustomEvent('khotta:navigate', { detail: { tab: nextTab, path: nextPath } }));
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextTab = getTabFromPathname(window.location.pathname) || DEFAULT_TAB;
      setActiveTabState(nextTab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    localStorage.setItem('khotta_active_tab', activeTab);
    const expectedPath = getTabPath(activeTab, window.location.pathname);
    if (window.location.pathname !== expectedPath) {
      window.history.replaceState({ tab: activeTab }, '', expectedPath);
    }
    setSubTabLabel(null);
  }, [activeTab]);

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

  const PROTECTED_TABS = ['workspace', 'editor', 'my-plans', 'profile', 'settings', 'customer-dashboard', 'customer-projects', 'customer-account'];
  const requiresAuth = PROTECTED_TABS.includes(activeTab);

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p className="text-slate-500 font-medium">جاري التحقق من الحساب...</p>
        </div>
      </div>
    );
  }

  if (activeTab === 'login' && !session) {
    return <AuthScreen />;
  }

  if (requiresAuth && !session) {
    // Client-side protection fallback
    window.location.href = '/login';
    return null;
  }

  return (
    <TooltipProvider>
      <SidebarProvider open={!isSidebarCollapsed} onOpenChange={(open) => setIsSidebarCollapsed(!open)}>
        <div className="flex min-h-screen w-full max-w-full bg-background">
          <Sidebar
            user={appUser}
            isCollapsed={isSidebarCollapsed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <SidebarInset
            className="min-h-screen w-full max-w-full bg-background transition-[margin] duration-300"
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
