import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Gamepad2 } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الترفيه عبر الإنترنت',
  titleEn: 'Online Entertainment',
  subtitle: 'الألعاب والتسلية الرقمية',
  icon: Gamepad2,
  accent: 'blue',
  pdfLabel: 'تقرير الترفيه عبر الإنترنت (PDF)',

  kpis: [
    { label: 'المؤشر الرئيسي', value: 'بانتظار البيانات', unit: 'إحصاء عالمي', icon: Gamepad2 },
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

  tags: ['OnlineEntertainment', 'Online Entertainment'],
};

const OnlineEntertainmentDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default OnlineEntertainmentDashboard;
