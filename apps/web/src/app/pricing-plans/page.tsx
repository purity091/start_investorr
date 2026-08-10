import React from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { PricingPlansGallery } from '@/components/views/PricingPlansGallery';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'أسعار منصة خطة وباقات دراسات الجدوى',
  description:
    'قارن باقات منصة خطة لبناء دراسات الجدوى ونماذج العمل والتحليلات المالية، واختر الباقة المناسبة لحجم مشاريعك واحتياجات فريقك.',
  path: '/pricing-plans',
  keywords: ['أسعار دراسة جدوى', 'باقات خطة', 'اشتراك SaaS', 'تكلفة دراسة جدوى', 'منصة خطة الأسعار'],
});

export default function PricingPlansPage() {
  return (
    <PublicLayout>
      <PricingPlansGallery />
    </PublicLayout>
  );
}
