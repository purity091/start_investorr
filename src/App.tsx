
// v4.0.1 - Production Sync
import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { MobileMenu } from './components/layout/MobileMenu';
import { LeftAiSidebar } from './components/features/ai/LeftAiSidebar';
import { BottomNavBar } from './components/layout/BottomNavBar';
import { Header } from './components/layout/Header';
import { DashboardRouter } from './components/views/DashboardRouter';
import SiteTour from './components/views/SiteTour';

import { MOCK_USER, INITIAL_SECTIONS, ADMIN_TABS } from './data/constants';
import { PlanSection } from './types';
import { getTabFromPathname, getTabPath } from './utils/routes';
import { ProjectWorkspaceProvider, useProjectWorkspace } from './features/workspace/ProjectWorkspaceContext';

const DEFAULT_TAB = 'home';

const AppShell: React.FC = () => {
  const [activeTab, setActiveTabState] = useState<string>(() => {
    const pathTab = getTabFromPathname(window.location.pathname);
    if (pathTab) return pathTab;
    const savedTab = localStorage.getItem('khotta_active_tab');
    return (savedTab as any) || DEFAULT_TAB;
  });

  const [sections, setSections] = useState<PlanSection[]>(INITIAL_SECTIONS);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>('1');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>('saved');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isTourRunning, setIsTourRunning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [subTabLabel, setSubTabLabel] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | undefined>(undefined);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
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
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  return (
    <div className="flex min-h-screen bg-white lg:bg-[#F1F5F9]/80 w-full max-w-full overflow-x-hidden">
      {/* 1. Global AI Sidebar (Left) - Hidden on Mobile */}
      {!isAdminView && (
        <div className="hidden xl:flex">
          <LeftAiSidebar 
            isOpen={isAiSidebarOpen} 
            onToggle={() => setIsAiSidebarOpen(!isAiSidebarOpen)} 
          />
        </div>
      )}

      {/* 2. Global Navigation Sidebar (Right) - Hidden on Mobile */}
      <div className="hidden lg:flex">
        <Sidebar 
          user={MOCK_USER} 
          isOpen={isSidebarOpen} 
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </div>

      <main className={`flex-1 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-full max-w-full overflow-x-hidden
        ${!isSidebarOpen ? 'mr-0' : isSidebarCollapsed ? 'mr-0 lg:mr-24' : 'mr-0 lg:mr-72'} 
        ${!isAdminView && isAiSidebarOpen ? 'ml-0 xl:ml-96' : 'ml-0'}`}>

        <Header 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          subTabLabel={subTabLabel}
          setSubTabLabel={setSubTabLabel}
          isNotificationsOpen={isNotificationsOpen}
          setIsNotificationsOpen={setIsNotificationsOpen}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          isTourRunning={isTourRunning}
          setIsTourRunning={setIsTourRunning}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          notificationRef={notificationRef}
          profileRef={profileRef}
          user={MOCK_USER}
        />

        <DashboardRouter 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSubTabLabel={setSubTabLabel}
          user={MOCK_USER}
          sections={sections}
          handleSectionUpdate={handleSectionUpdate}
          expandedSectionId={expandedSectionId}
          onSectionExpand={setExpandedSectionId}
          selectedCompanyId={selectedCompanyId}
          setSelectedCompanyId={setSelectedCompanyId}
        />
      </main>
      {isTourRunning && (
        <SiteTour
          onComplete={() => setIsTourRunning(false)}
          onSkip={() => setIsTourRunning(false)}
        />
      )}

      {/* 3. Mobile Menu (Hamburger) */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isAdminMode={ADMIN_TABS.includes(activeTab)}
      />

      {/* 4. Bottom Navigation (Mobile Only) */}
      <BottomNavBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onMenuClick={() => setIsMobileMenuOpen(true)}
      />
    </div>
  );
};

const App: React.FC = () => {
  const [initialSections] = useState<PlanSection[]>(INITIAL_SECTIONS);

  return (
    <ProjectWorkspaceProvider planSections={initialSections}>
      <AppShell />
    </ProjectWorkspaceProvider>
  );
};

export default App;
