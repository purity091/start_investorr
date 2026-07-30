import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Dumbbell } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'اللياقة والعافية',
  titleEn: 'Fitness & Wellness',
  subtitle: 'اللياقة البدنية والصحة العامة',
  icon: Dumbbell,
  accent: 'blue',
  pdfLabel: 'تقرير اللياقة والعافية (PDF)',

  kpis: [
    { label: 'المؤشر الرئيسي', value: 'بانتظار البيانات', unit: 'إحصاء عالمي', icon: Dumbbell },
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

  tags: ['FitnessWellness', 'Fitness & Wellness'],
};

const FitnessWellnessDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default FitnessWellnessDashboard;
