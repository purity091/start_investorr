import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { PricingPlansGallery } from '@/components/views/PricingPlansGallery';

export const metadata = {
  title: 'الأسعار والباقات | خطة - عرض لأول 100 مستخدم مجاناً',
  description: 'استكشف باقات الأسعار المترتبة على منصة خطة. احصل على الباقة المجانية، الباقة المتوسطة، أو الباقة القوية مجاناً لأول 100 مستخدم.',
};

export default function PricingPlansPage() {
  return (
    <PublicLayout>
      <PricingPlansGallery />
    </PublicLayout>
  );
}
