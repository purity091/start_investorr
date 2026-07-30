import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Users } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'ديموغرافية الاستخدام',
  titleEn: 'Demographics & Use',
  subtitle: 'إحصاءات استخدام الإنترنت عالمياً',
  icon: Users,
  accent: 'slate',
  pdfLabel: 'تقرير ديموغرافية الاستخدام (PDF)',

  kpis: [
    { label: 'المؤشر الأول', value: '—', unit: 'قيد التحديث', icon: Users },
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

  tags: ['Demographics', '', 'Use'],
};

const DemographicsUseDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default DemographicsUseDashboard;
