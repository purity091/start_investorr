import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Calendar } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'العطل والأعياد',
  titleEn: 'Public and Religious Holidays',
  subtitle: 'التقويمات والأعياد العالمية',
  icon: Calendar,
  accent: 'slate',
  pdfLabel: 'تقرير العطل والأعياد (PDF)',

  kpis: [
    { label: 'المؤشر الأول', value: '—', unit: 'قيد التحديث', icon: Calendar },
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'قطاعات السوق', 'اتجاهات الصناعة', 'قادة الصناعة', 'تعريف الصناعة'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: <p>قيد التحديث — سيتم إضافة المحتوى التحليلي لهذا القطاع قريباً.</p>,
    },
  ],

  leaders: [],

  definition: 'سيتم إضافة تعريف هذا القطاع بعد اكتمال البحث والتحليل.',

  industryInsights: [
    'قيد التحديث — سيتم إضافة أبرز النقاط قريباً',
  ],

  tags: ['Public', 'and', 'Religious', 'Holidays'],
};

const PublicReligiousHolidaysDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PublicReligiousHolidaysDashboard;
