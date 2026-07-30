import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Globe } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التجارة الدولية',
  titleEn: 'International Trade',
  subtitle: 'التبادل التجاري العالمي',
  icon: Globe,
  accent: 'slate',
  pdfLabel: 'تقرير التجارة الدولية (PDF)',

  kpis: [
    { label: 'المؤشر الأول', value: '—', unit: 'قيد التحديث', icon: Globe },
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

  tags: ['International', 'Trade'],
};

const InternationalTradeRetailDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default InternationalTradeRetailDashboard;
