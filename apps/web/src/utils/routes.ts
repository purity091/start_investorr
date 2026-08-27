const STATIC_TABS = new Set([
  'home',
  'profile',
  'subscriber-hub',
  'customer-dashboard',
  'customer-projects',
  'customer-subscription',
  'customer-usage',
  'customer-activity',
  'customer-account',
  'customer-support',
  'workspace',
  'users-management',
  'admin-dashboard',
  'admin-plans',
  'admin-analytics',
  'admin-security',
  'my-plans',
  'new-plan',
  'new-plan-family',
  'new-plan-pro',
  'new-plan-mit24',
  'new-plan-bmc',
  'bmc',
  'brand-identity',
  'unicorn-benchmark',
  'platform-academy',
  'market-discovery',
  'pricing',
  'hackathon',
  'settings',
  'tasks',
  'changelog',
  'editor',
  'strategic-dashboard',
  'notifications',
  'site-map',
  'problem-engine',
  'problem-detail',
  'project-edit',
  'saved-market-items',
  'discovery-center',
  'company-deep-dive',
  'contact-us',
  'seo-content-marketing',
  'proven-projects',
  'failed-projects',
  'saas-ideas',
  'micro-saas-ideas',
  'agritech',
  'agritech-dashboard',
  'smart-farming',
  'seeds-crop-protection',
  'recycled-materials',
  'battery-materials',
  'sustainable-consumer-goods',
  'packaged-foods',
  'online-marketplaces',
  'cross-border-ecommerce',
  'social-commerce',
  'fintech',
  'digital-payments',
  'wealth-management',
  'biotechnology',
  'digital-health',
  'mental-health-services',
  'ai-platforms',
  'cloud-services-internet',
  'streaming-platforms',
  'podcast-industry',
  'digital-publishing',
  'artificial-intelligence-new',
  'pharma-dashboard',
  'healthcare-dashboard',
  'renewable-energy-integration-dashboard',
  'carbon-neutrality-tech-dashboard',
  'mental-wellness-wellbeing-dashboard',
  'longevity-biotech-performance-dashboard',
  'semiconductor-foundary-dashboard',
  'industrial-iot-automation-dashboard',
  'ev-infrastructure-dashboard',
  'medical-tourism-dashboard',
  'travel-technology-dashboard',
  'public-policy-economic-strategy-dashboard',
  'geopolitical-risk-global-trade-analysis-dashboard',
  'modular-prefab-construction-dashboard',
  'seeds-crop-protection-dashboard',
  'arab-maps',
  'startup-financing',
  'financial-calculator',
  'first-90-days',
  'new-plan-lean',
  'project-ideas',
]);

const hasTabShape = (segment: string) =>
  STATIC_TABS.has(segment) ||
  segment.endsWith('-dashboard') ||
  segment.startsWith('admin-');

export const isKnownTabPath = (pathname: string) => {
  if (getProjectIdFromEditPath(pathname)) return true;

  const segments = getSegments(pathname);
  if (!segments.length) return true;

  const lastSegment = segments[segments.length - 1];
  return isIndexFile(lastSegment) || hasTabShape(lastSegment);
};

const isIndexFile = (segment: string) =>
  segment === 'index.html' || segment === 'index.php';

const getSegments = (pathname: string) =>
  pathname.split('/').filter(Boolean).map((segment) => decodeURIComponent(segment));

export const getProjectIdFromEditPath = (pathname: string) => {
  const segments = getSegments(pathname);
  if (segments.length !== 3 || segments[0] !== 'projects' || segments[2] !== 'edit') {
    return null;
  }

  return segments[1] || null;
};

export const getTabFromPathname = (pathname: string) => {
  if (getProjectIdFromEditPath(pathname)) return 'project-edit';

  const segments = getSegments(pathname);
  if (!segments.length) return 'home';

  const lastSegment = segments[segments.length - 1];
  if (isIndexFile(lastSegment)) return 'home';
  return hasTabShape(lastSegment) ? lastSegment : null;
};

const getBasePath = (pathname: string) => {
  if (getProjectIdFromEditPath(pathname)) return '';

  const segments = getSegments(pathname);
  if (!segments.length) return '';

  const lastSegment = segments[segments.length - 1];
  const baseSegments = hasTabShape(lastSegment) || isIndexFile(lastSegment) ? segments.slice(0, -1) : segments;
  
  const firstTabIdx = baseSegments.findIndex(hasTabShape);
  if (firstTabIdx !== -1) {
    baseSegments.splice(firstTabIdx);
  }

  return baseSegments.length ? `/${baseSegments.join('/')}` : '';
};

export const getTabPath = (tab: string, pathname = window.location.pathname) => {
  if (tab === 'project-edit' && getProjectIdFromEditPath(pathname)) {
    return pathname;
  }

  const basePath = getBasePath(pathname);

  if (!tab || tab === 'home') {
    return basePath ? `${basePath}/home` : '/home';
  }

  return `${basePath}/${encodeURIComponent(tab)}`;
};
