import type { ReactNode } from 'react';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'تسجيل الدخول إلى منصة خطة',
  description: 'تسجيل الدخول إلى حسابك في منصة خطة لإدارة مشاريعك ودراسات الجدوى الخاصة بك.',
  path: '/login',
  noIndex: true,
});

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
