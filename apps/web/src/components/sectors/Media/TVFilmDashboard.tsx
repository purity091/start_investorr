import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Film } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التلفزيون والأفلام',
  titleEn: 'TV & Film',
  subtitle: 'صناعة التلفزيون والسينما',
  icon: Film,
  accent: 'blue',
  pdfLabel: 'تقرير التلفزيون والأفلام (PDF)',

  kpis: [
    { label: 'المؤشر الرئيسي', value: 'بانتظار البيانات', unit: 'إحصاء عالمي', icon: Film },
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

  tags: ['TVFilm', 'TV & Film'],
};

const TVFilmDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default TVFilmDashboard;
