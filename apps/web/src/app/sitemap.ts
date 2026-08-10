import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/features', priority: 0.92, changeFrequency: 'monthly' as const },
    { path: '/market-discovery', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/proven-projects', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/saas-ideas', priority: 0.88, changeFrequency: 'weekly' as const },
    { path: '/micro-saas-ideas', priority: 0.86, changeFrequency: 'weekly' as const },
    { path: '/failed-projects', priority: 0.82, changeFrequency: 'weekly' as const },
    { path: '/platform-academy', priority: 0.84, changeFrequency: 'weekly' as const },
    { path: '/pricing-plans', priority: 0.78, changeFrequency: 'monthly' as const },
    { path: '/faq', priority: 0.72, changeFrequency: 'monthly' as const },
    { path: '/changelog', priority: 0.68, changeFrequency: 'weekly' as const },
    { path: '/about', priority: 0.62, changeFrequency: 'monthly' as const },
    { path: '/contact-us', priority: 0.58, changeFrequency: 'monthly' as const },
    { path: '/privacy', priority: 0.35, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.35, changeFrequency: 'yearly' as const },
    { path: '/refund-policy', priority: 0.32, changeFrequency: 'yearly' as const },
    { path: '/fulfillment-policy', priority: 0.32, changeFrequency: 'yearly' as const },
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path === '/' ? '' : route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
