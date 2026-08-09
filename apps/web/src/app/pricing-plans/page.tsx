import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { PricingPlansGallery } from '@/components/views/PricingPlansGallery';

export const metadata = {
  title: 'الأسعار والباقات (رائد - مؤسس - قائد) | خطة',
  description: 'استكشف باقات الأسعار المترتبة على منصة خطة: باقة رائد (5 مشاريع)، باقة مؤسس (10 مشاريع)، وباقة قائد (مشاريع غير محدودة).',
};

export default function PricingPlansPage() {
  return (
    <PublicLayout>
      <PricingPlansGallery />
    </PublicLayout>
  );
}
