import type { ReactNode } from 'react';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'معاينة مشروع مشارك عبر منصة خطة',
  description: 'رابط خاص لمعاينة مشروع أو نموذج عمل تمت مشاركته عبر منصة خطة.',
  path: '/share',
  noIndex: true,
});

export default function ShareLayout({ children }: { children: ReactNode }) {
  return children;
}
