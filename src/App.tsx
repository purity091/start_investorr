
// v5.0.0 - Auth Guard Rewrite (Two-Shell Architecture)
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { StrategicSupportFloat } from './components/layout/StrategicSupportFloat';
import { BottomNavBar } from './components/layout/BottomNavBar';
import { Header } from './components/layout/Header';
import { AppBreadcrumb } from './components/layout/AppBreadcrumb';
import { DashboardRouter } from './components/views/DashboardRouter';
import { LandingPage } from './components/views/LandingPage';
import SiteTour from './components/views/SiteTour';
import { TooltipProvider } from './components/ui/tooltip';
import { SidebarInset, SidebarProvider } from './components/ui/sidebar';

import { MOCK_USER, INITIAL_SECTIONS, ADMIN_TABS } from './data/constants';
import { PlanSection, User } from './types';
import { getTabFromPathname, getTabPath } from './utils/routes';
import { ProjectWorkspaceProvider, useProjectWorkspace } from './features/workspace/ProjectWorkspaceContext';
import { AuthModal } from './components/features/auth/AuthModal';

// ─── Auth constants ────────────────────────────────────────────────────────────

const AUTH_VERSION = '3';
const DEFAULT_AUTHENTICATED_TAB = 'home';
const DEFAULT_PUBLIC_TAB = 'landing';

/**
 * Pages accessible WITHOUT authentication.
 * Everything else requires login.
 * NOTE: 'home' is the dashboard home — it is PRIVATE.
 */
const PUBLIC_TABS = new Set([
  'landing',
  'pricing',
  'contact-us',
  'proven-projects',
  'failed-projects',
  'saas-ideas',
  'micro-saas-ideas',
  'project-ideas',
  'market-discovery', // read-only teaser
]);

/** Returns true if this tab is accessible without auth */
const isPublicTab = (tab: string) =>
  PUBLIC_TABS.has(tab) || tab.endsWith('-dashboard'); // sector dashboards are public teasers

// ─── Auth helpers ──────────────────────────────────────────────────────────────

function readAuthState(): { authenticated: boolean; user: User | null } {
  const version = localStorage.getItem('khotta_auth_version');
  if (version !== AUTH_VERSION) {
    // Bust all stale sessions on version bump
    localStorage.removeItem('khotta_is_authenticated');
    localStorage.removeItem('khotta_user');
    localStorage.removeItem('khotta_active_tab');
    localStorage.setItem('khotta_auth_version', AUTH_VERSION);
    return { authenticated: false, user: null };
  }

  const authenticated = localStorage.getItem('khotta_is_authenticated') === 'true';
  if (!authenticated) return { authenticated: false, user: null };

  const raw = localStorage.getItem('khotta_user');
  const user = raw ? (JSON.parse(raw) as User) : null;
  return { authenticated: !!user, user };
}

// ─── AppShell ─────────────────────────────────────────────────────────────────

const AppShell: React.FC = () => {
  // ── Auth state (single source of truth) ─────────────────────────────────
  const initialAuth = readAuthState();
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuth.authenticated);
  const [currentUser, setCurrentUser] = useState<User | null>(initialAuth.user);

  // ── Modal state ─────────────────────────────────────────────────────────
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('signup');
  const [pendingTab, setPendingTab] = useState<string | null>(null);

  // ── Active tab ───────────────────────────────────────────────────────────
  const [activeTab, setActiveTabState] = useState<string>(() => {
    const pathTab = getTabFromPathname(window.location.pathname);
    const saved = localStorage.getItem('khotta_active_tab');
    const candidate = pathTab || saved || (initialAuth.authenticated ? DEFAULT_AUTHENTICATED_TAB : DEFAULT_PUBLIC_TAB);

    // If not authenticated and tab is private, force landing
    if (!initialAuth.authenticated && !isPublicTab(candidate)) return DEFAULT_PUBLIC_TAB;
    return candidate;
  });

  // ── Plan sections ────────────────────────────────────────────────────────
  const [sections, setSections] = useState<PlanSection[]>(INITIAL_SECTIONS);
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>('1');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>('saved');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isTourRunning, setIsTourRunning] = useState(false);
  const [subTabLabel, setSubTabLabel] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | undefined>(undefined);
  const { setPlanSections, setStage } = useProjectWorkspace();

  // ── Auth handlers ────────────────────────────────────────────────────────

  const openAuthModal = (mode: 'login' | 'signup' = 'signup', targetTab?: string) => {
    setAuthModalMode(mode);
    if (targetTab) setPendingTab(targetTab);
    setIsAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('khotta_user', JSON.stringify(user));
    localStorage.setItem('khotta_is_authenticated', 'true');
    localStorage.setItem('khotta_auth_version', AUTH_VERSION);

    // Navigate to pending tab or home dashboard
    const destination = pendingTab || DEFAULT_AUTHENTICATED_TAB;
    setPendingTab(null);

    // Use setActiveTabState directly — isAuthenticated closure is stale here
    const nextPath = getTabPath(destination, window.location.pathname);
    window.history.pushState({ tab: destination }, '', nextPath);
    setActiveTabState(destination);
    window.dispatchEvent(new CustomEvent('khotta:navigate', { detail: { tab: destination, path: nextPath } }));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('khotta_is_authenticated');
    localStorage.removeItem('khotta_user');
    localStorage.removeItem('khotta_active_tab');
    // Navigate to landing directly (bypass auth check — isAuthenticated closure is stale)
    const nextPath = getTabPath(DEFAULT_PUBLIC_TAB, window.location.pathname);
    window.history.pushState({ tab: DEFAULT_PUBLIC_TAB }, '', nextPath);
    setActiveTabState(DEFAULT_PUBLIC_TAB);
  };

  // ── Navigation (with auth guard) ─────────────────────────────────────────

  const setActiveTab = (tab: string, options?: { replace?: boolean }) => {
    const nextTab = tab || (isAuthenticated ? DEFAULT_AUTHENTICATED_TAB : DEFAULT_PUBLIC_TAB);

    // Route Guard: private tab requested by unauthenticated user
    if (!isAuthenticated && !isPublicTab(nextTab)) {
      openAuthModal('signup', nextTab);
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

    setActiveTabState(nextTab);
    window.dispatchEvent(new CustomEvent('khotta:navigate', { detail: { tab: nextTab, path: nextPath } }));
  };

  // ── Effects ──────────────────────────────────────────────────────────────

  useEffect(() => {
    const handlePopState = () => {
      const nextTab = getTabFromPathname(window.location.pathname);
      const fallback = isAuthenticated ? DEFAULT_AUTHENTICATED_TAB : DEFAULT_PUBLIC_TAB;
      const resolved = nextTab || fallback;

      // If user navigates back to a protected URL while logged out → redirect
      if (!isAuthenticated && !isPublicTab(resolved)) {
        setActiveTabState(DEFAULT_PUBLIC_TAB);
        return;
      }
      setActiveTabState(resolved);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('khotta_active_tab', activeTab);
    }
    const expectedPath = getTabPath(activeTab, window.location.pathname);
    if (window.location.pathname !== expectedPath) {
      window.history.replaceState({ tab: activeTab }, '', expectedPath);
    }
    setSubTabLabel(null);
  }, [activeTab, isAuthenticated]);

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
    if (tabToStageMap[activeTab]) setStage(tabToStageMap[activeTab]);
  }, [activeTab, setStage]);

  const handleSectionUpdate = (id: string, updates: Partial<PlanSection>) => {
    setSaveStatus('saving');
    setSections(prev => prev.map(s =>
      s.id === id ? { ...s, ...updates, lastEdited: 'الآن' } : s
    ));
  };

  // ── AuthModal (shared across both shells) ────────────────────────────────
  const authModal = (
    <AuthModal
      isOpen={isAuthModalOpen}
      onClose={() => setIsAuthModalOpen(false)}
      onLoginSuccess={handleLoginSuccess}
      initialMode={authModalMode}
    />
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PUBLIC SHELL — rendered when NOT authenticated.
  // No sidebar, no user header, no mock user data visible.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  if (!isAuthenticated) {
    // Ensure we never render a private tab in the public shell
    const safeTab = isPublicTab(activeTab) ? activeTab : DEFAULT_PUBLIC_TAB;

    return (
      <TooltipProvider>
        <LandingPage
          activeTab={safeTab}
          setActiveTab={setActiveTab}
          onAuthRequested={openAuthModal}
        />
        {authModal}
      </TooltipProvider>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // AUTHENTICATED SHELL — rendered only for logged-in users.
  // Full dashboard with sidebar, header, and user data.
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const user = currentUser ?? MOCK_USER; // currentUser is always set here, fallback is safety net
  const isAdminView = ADMIN_TABS.includes(activeTab);

  return (
    <TooltipProvider>
      <SidebarProvider open={!isSidebarCollapsed} onOpenChange={(open) => setIsSidebarCollapsed(!open)}>
        <div className="flex min-h-screen w-full bg-background">
          <Sidebar
            user={user}
            isCollapsed={isSidebarCollapsed}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <SidebarInset className="min-h-screen flex-1 min-w-0 bg-background transition-all duration-200 ease-linear">
            <Header
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              subTabLabel={subTabLabel}
              setSubTabLabel={setSubTabLabel}
              setIsTourRunning={setIsTourRunning}
              user={user}
              onLogout={handleLogout}
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
              user={user}
              sections={sections}
              handleSectionUpdate={handleSectionUpdate}
              expandedSectionId={expandedSectionId}
              onSectionExpand={setExpandedSectionId}
              selectedCompanyId={selectedCompanyId}
              setSelectedCompanyId={setSelectedCompanyId}
              onAuthRequested={openAuthModal}
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

          {authModal}
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
};

// ─── Root App ─────────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [initialSections] = useState<PlanSection[]>(INITIAL_SECTIONS);

  return (
    <ProjectWorkspaceProvider planSections={initialSections}>
      <AppShell />
    </ProjectWorkspaceProvider>
  );
};

export default App;
