import type { ReactNode } from 'react';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'إعادة تعيين كلمة المرور',
  description: 'إعادة تعيين كلمة مرور حساب منصة خطة بشكل آمن.',
  path: '/reset-password',
  noIndex: true,
});

export default function ResetPasswordLayout({ children }: { children: ReactNode }) {
  return children;
}
