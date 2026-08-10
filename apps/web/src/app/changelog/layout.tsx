import type { ReactNode } from 'react';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'سجل تحديثات منصة خطة',
  description:
    'تابع آخر تحديثات منصة خطة، الميزات الجديدة، تحسينات تجربة المستخدم، وإصلاحات أدوات دراسات الجدوى وتحليل المشاريع.',
  path: '/changelog',
  keywords: ['تحديثات منصة خطة', 'سجل الإصدارات', 'ميزات جديدة', 'تحسينات المنتج'],
});

export default function ChangelogLayout({ children }: { children: ReactNode }) {
  return children;
}
