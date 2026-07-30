import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Smartphone } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التطبيقات والإنترنت المحمول',
  titleEn: 'Apps & Mobile Internet',
  subtitle: 'تطبيقات الهواتف والإنترنت المتنقل',
  icon: Smartphone,
  accent: 'blue',
  pdfLabel: 'تقرير التطبيقات والإنترنت المحمول (PDF)',

  kpis: [
    { label: 'المؤشر الرئيسي', value: 'بانتظار البيانات', unit: 'إحصاء عالمي', icon: Smartphone },
  ],

  navItems: ['نظرة عامة', 'التحليل الاقتصادي', 'اتجاهات الصناعة', 'تعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-4 text-right">
          <p>سيتم إضافة المحتوى التحليلي لهذا القطاع قريباً.</p>
        </div>
      ),
    },
  ],

  leaders: [],

  definition: 'سيتم إضافة المحتوى التحليلي لهذا القطاع قريباً.',

  industryInsights: [
    'يعتبر هذا القطاع من الركائز الأساسية في السوق العالمي',
    'التطور التكنولوجي يساهم في زيادة كفاءة العمليات في هذا المجال',
  ],

  tags: ['AppsMobileInternet', 'Apps & Mobile Internet'],
};

const AppsMobileInternetDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default AppsMobileInternetDashboard;
