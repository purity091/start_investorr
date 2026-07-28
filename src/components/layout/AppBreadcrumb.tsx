import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { getTabPath } from '@/utils/routes';

interface BreadcrumbNode {
  label: string;
  tab?: string;
}

interface AppBreadcrumbProps {
  activeTab: string;
  subTabLabel?: string | null;
  setActiveTab: (tab: string) => void;
}

const TAB_LABELS: Record<string, string> = {
  home: 'الرئيسية',
  'my-plans': 'مشاريعي',
  'new-plan': 'بناء دراسة جدوى مشروع',
  'new-plan-family': 'النموذج السهل',
  'new-plan-pro': 'النموذج الاحترافي',
  'new-plan-mit24': 'MIT 24 Steps',
  'new-plan-bmc': 'نموذج بناء نموذج العمل BMC',
  'new-plan-lean': 'منهجية Lean Startup',
  'market-discovery': 'استكشاف السوق',
  'problem-engine': 'المشكلات والفرص',
  'problem-detail': 'تفاصيل المشكلة',
  'saved-market-items': 'المحفوظات',
  'unicorn-benchmark': 'رادار اليونيكورن',
  'brand-identity': 'الهوية البصرية',
  workspace: 'مساحة المشروع',
  editor: 'محرر خطة العمل',
  'strategic-dashboard': 'لوحة القرار',
  pricing: 'اشتراكي',
  profile: 'ملف التعريف',
  settings: 'ملف التعريف',
  'customer-dashboard': 'حسابي الشخصي',
  'customer-projects': 'مشاريعي',
  'customer-subscription': 'اشتراكي',
  'customer-usage': 'استخدام الاشتراك',
  'customer-activity': 'النشاط',
  'customer-account': 'ملف التعريف',
  'customer-support': 'الدعم',
  notifications: 'التنبيهات',
  tasks: 'المهام',
  changelog: 'سجل التحديثات',
  'contact-us': 'تواصل معنا',
  'site-map': 'خريطة الموقع',
  'discovery-center': 'مركز الاستكشاف',
  'company-deep-dive': 'تحليل شركة',
  hackathon: 'الهاكاثون',
  'admin-dashboard': 'لوحة الإدارة',
  'users-management': 'المستخدمون',
  'admin-plans': 'أرشيف الخطط',
  'admin-analytics': 'تحليلات المنصة',
  'admin-security': 'الأمان',
};

function getTabLabel(activeTab: string, subTabLabel?: string | null) {
  if (subTabLabel && !activeTab.startsWith('new-plan-')) return subTabLabel;
  if (TAB_LABELS[activeTab]) return TAB_LABELS[activeTab];
  if (activeTab.endsWith('-dashboard')) return formatDashboardLabel(activeTab);
  return 'لوحة العمل';
}

function getBreadcrumbNodes(activeTab: string, subTabLabel?: string | null): BreadcrumbNode[] {
  const currentLabel = getTabLabel(activeTab, subTabLabel);

  if (activeTab === 'home') {
    return [{ label: 'الرئيسية', tab: 'home' }];
  }

  if (activeTab.startsWith('admin-') || activeTab === 'users-management') {
    return [
      { label: 'الرئيسية', tab: 'home' },
      { label: 'الإدارة', tab: 'admin-dashboard' },
      { label: currentLabel, tab: activeTab },
    ];
  }

  if (
    activeTab.startsWith('customer-') ||
    ['profile', 'settings', 'pricing'].includes(activeTab)
  ) {
    const accountRoot = activeTab === 'pricing' || activeTab.includes('subscription') || activeTab.includes('usage')
      ? 'pricing'
      : activeTab === 'profile' || activeTab === 'settings' || activeTab === 'customer-account'
        ? 'profile'
        : 'customer-dashboard';

    return [
      { label: 'الرئيسية', tab: 'home' },
      { label: 'الحساب', tab: accountRoot },
      { label: currentLabel, tab: activeTab },
    ];
  }

  if (activeTab.startsWith('new-plan')) {
    return [
      { label: 'الرئيسية', tab: 'home' },
      { label: 'بناء دراسة جدوى مشروع', tab: 'new-plan' },
      { label: currentLabel, tab: activeTab },
    ];
  }

  if (
    [
      'market-discovery',
      'problem-engine',
      'problem-detail',
      'saved-market-items',
      'discovery-center',
      'company-deep-dive',
    ].includes(activeTab) ||
    activeTab.endsWith('-dashboard')
  ) {
    return [
      { label: 'الرئيسية', tab: 'home' },
      { label: 'استكشاف السوق', tab: 'market-discovery' },
      { label: currentLabel, tab: activeTab },
    ];
  }

  if (['brand-identity', 'unicorn-benchmark', 'workspace', 'editor', 'strategic-dashboard'].includes(activeTab)) {
    return [
      { label: 'الرئيسية', tab: 'home' },
      { label: 'أدوات المشروع', tab: 'workspace' },
      { label: currentLabel, tab: activeTab },
    ];
  }

  return [
    { label: 'الرئيسية', tab: 'home' },
    { label: currentLabel, tab: activeTab },
  ];
}

function formatDashboardLabel(tab: string) {
  return tab
    .replace(/-dashboard$/, '')
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function AppBreadcrumb({ activeTab, subTabLabel, setActiveTab }: AppBreadcrumbProps) {
  const nodes = getBreadcrumbNodes(activeTab, subTabLabel);

  return (
    <div dir="rtl" className="border-b border-border bg-background px-4 py-2 sm:px-6 lg:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          {nodes.map((node, index) => {
            const isLast = index === nodes.length - 1;
            const key = `${node.tab ?? node.label}-${index}`;

            return (
              <React.Fragment key={key}>
                <BreadcrumbItem>
                  {isLast || !node.tab ? (
                    <BreadcrumbPage>{node.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <button
                        type="button"
                        onClick={() => setActiveTab(node.tab!)}
                        className="rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                      >
                        {node.label}
                      </button>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast ? <BreadcrumbSeparator /> : null}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
