import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = [
    '/api/',
    '/login',
    '/reset-password',
    '/share/',
    '/home',
    '/workspace/',
    '/admin',
    '/profile',
    '/settings',
    '/customer-portal',
    '/my-projects',
  ];

  const aiBots = [
    'GPTBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Anthropic-AI',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    'cohere-ai',
    'Diffbot',
    'Meta-ExternalAgent',
  ];

  return {
    rules: [
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: ['/', '/llms.txt', '/llms-full.txt', '/sitemap.xml'],
        disallow: disallowedPaths,
      })),
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: disallowedPaths,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
