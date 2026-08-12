import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { getTabPath } from '../../utils/routes';
import { DISCOVERY_DATA } from '../features/discovery/DiscoveryCenter';

const SECTOR_BREADCRUMB_MAP: Record<string, { label: string; groupTitle: string }> = {};
DISCOVERY_DATA.forEach((group) => {
  group.sectors.forEach((sec) => {
    SECTOR_BREADCRUMB_MAP[sec.id] = {
      label: sec.label,
      groupTitle: group.title,
    };
  });
});

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
  'market-discovery': 'استكشاف قطاعات السوق',
  'advertising-dashboard': 'قطاع الإعلانات والتسويق',
  'agriculture-dashboard': 'قطاع الزراعة والأغذية',
  'tech-dashboard': 'قطاع التقنية والبرمجيات',
  'fintech-dashboard': 'قطاع التقنية المالية',
  'ecommerce-dashboard': 'قطاع التجارة الإلكترونية',
  'healthcare-dashboard': 'قطاع الرعاية الصحية',
  'realestate-dashboard': 'قطاع العقارات والبناء',
  'energy-dashboard': 'قطاع الطاقة والبيئة',
  'education-dashboard': 'قطاع التعليم والتدريب',
  'logistics-dashboard': 'قطاع النقل واللوجستيات',
  'problem-engine': 'المشكلات والفرص',
  'problem-detail': 'تفاصيل المشكلة',
  'saved-market-items': 'المحفوظات',
  'unicorn-benchmark': 'رادار اليونيكورن',
  'brand-identity': 'الهوية البصرية',
  workspace: 'مساحة المشروع',
  editor: 'محرر خطة العمل',
  'strategic-dashboard': 'النموذج الاحترافي',
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
  'admin-analytics': 'تحليلات المنصة',
  'admin-security': 'الأمان',
  'proven-projects': 'أفكار شركات ناجحة',
  'failed-projects': 'شركات فشلت (Post-Mortem)',
  'saas-ideas': 'أفكار SaaS',
  'micro-saas-ideas': 'أفكار Micro-SaaS',
  'project-ideas': 'أفكار مشاريع',
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

  // Market Sector Discovery & Sector Dashboards
  const sectorInfo = SECTOR_BREADCRUMB_MAP[activeTab];
  if (
    activeTab === 'market-discovery' ||
    sectorInfo ||
    (activeTab.endsWith('-dashboard') && !['admin-dashboard', 'customer-dashboard', 'strategic-dashboard'].includes(activeTab))
  ) {
    if (activeTab === 'market-discovery') {
      return [
        { label: 'الرئيسية', tab: 'home' },
        { label: 'استكشاف قطاعات السوق', tab: 'market-discovery' },
      ];
    }

    const sectorTitle = subTabLabel || sectorInfo?.label || currentLabel;

    return [
      { label: 'الرئيسية', tab: 'home' },
      { label: 'استكشاف قطاعات السوق', tab: 'market-discovery' },
      { label: sectorTitle, tab: activeTab },
    ];
  }

  // Problems & Opportunities Engine
  if (activeTab === 'problem-engine' || activeTab === 'problem-detail') {
    if (activeTab === 'problem-engine') {
      return [
        { label: 'الرئيسية', tab: 'home' },
        { label: 'المشكلات والفرص', tab: 'problem-engine' },
      ];
    }
    return [
      { label: 'الرئيسية', tab: 'home' },
      { label: 'المشكلات والفرص', tab: 'problem-engine' },
      { label: currentLabel, tab: activeTab },
    ];
  }

  if (
    [
      'saved-market-items',
      'discovery-center',
      'company-deep-dive',
      'proven-projects',
      'failed-projects',
      'saas-ideas',
      'micro-saas-ideas',
      'project-ideas',
    ].includes(activeTab)
  ) {
    if (activeTab === 'project-ideas') {
      return [
        { label: 'الرئيسية', tab: 'home' },
        { label: 'أفكار مشاريع', tab: 'project-ideas' },
      ];
    }

    if (subTabLabel && ['proven-projects', 'failed-projects', 'saas-ideas', 'micro-saas-ideas'].includes(activeTab)) {
      return [
        { label: 'الرئيسية', tab: 'home' },
        { label: 'أفكار مشاريع', tab: 'project-ideas' },
        { label: TAB_LABELS[activeTab] || currentLabel, tab: activeTab },
        { label: subTabLabel, tab: activeTab },
      ];
    }

    return [
      { label: 'الرئيسية', tab: 'home' },
      { label: 'أفكار مشاريع', tab: 'project-ideas' },
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
    <div dir="rtl" className="border-b border-border bg-background px-3 py-1.5 sm:px-6 sm:py-2 lg:px-8">
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
