import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Landmark } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'السياسة والحكومة',
  titleEn: 'Politics & Government',
  subtitle: 'السياسات العامة والحوكمة',
  icon: Landmark,
  accent: 'blue',
  pdfLabel: 'تقرير السياسة والحكومة (PDF)',

  kpis: [
    { label: 'المؤشر الرئيسي', value: 'بانتظار البيانات', unit: 'إحصاء عالمي', icon: Landmark },
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

  tags: ['PoliticsGovernment', 'Politics & Government'],
};

const PoliticsGovernmentDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PoliticsGovernmentDashboard;
