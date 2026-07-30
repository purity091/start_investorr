import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { ShieldAlert } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الأمن السيبراني',
  titleEn: 'Cyber Security',
  subtitle: 'أمن المعلومات والحماية الرقمية',
  icon: ShieldAlert,
  accent: 'blue',
  pdfLabel: 'تقرير الأمن السيبراني (PDF)',

  kpis: [
    { label: 'المؤشر الرئيسي', value: 'بانتظار البيانات', unit: 'إحصاء عالمي', icon: ShieldAlert },
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

  tags: ['CyberSecurity', 'Cyber Security'],
};

const CyberSecurityDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default CyberSecurityDashboard;
