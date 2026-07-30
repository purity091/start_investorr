import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://khotta.app';

  const routes = [
    '',
    '/about',
    '/contact-us',
    '/features',
    '/pricing-plans',
    '/faq',
    '/privacy',
    '/terms',
    '/login',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
