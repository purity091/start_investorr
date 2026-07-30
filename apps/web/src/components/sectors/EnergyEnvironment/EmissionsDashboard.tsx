import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Cloud, Globe, TrendingUp } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الانبعاثات العالمية',
  titleEn: 'Emissions',
  subtitle: 'انبعاثات غازات الاحتباس والغازات الدفيئة',
  icon: Cloud,
  accent: 'blue',
  pdfLabel: 'تقرير الانبعاثات العالمية (PDF)',

  kpis: [
    { label: 'المؤشر الرئيسي', value: 'بانتظار البيانات', unit: 'إحصاء عالمي', icon: Cloud },
  ],

  topMarkets: [
    { 
      label: 'أكبر مصدر للانبعاثات', 
      country: 'الصين', 
      note: 'تتصدر العالم في إجمالي انبعاثات الكربون نتيجة اعتمادها الكبير على الفحم في الصناعة وتوليد الطاقة.',
      icon: Cloud
    },
    { 
      label: 'ثاني أكبر مصدر تاريخي', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أكبر حصة تراكمية من الانبعاثات تاريخياً، وتعمل حالياً على تقليل بصمتها عبر التحول للغاز والطاقة المتجددة.',
      icon: Globe
    },
    { 
      label: 'محرك النمو المستقبلي', 
      country: 'الهند', 
      note: 'تشهد نمواً متسارعاً في الانبعاثات تزامناً مع التطور الصناعي الضخم والنمو السكاني والتحضر.',
      icon: TrendingUp
    }
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

  tags: ['Emissions', 'Emissions'],
};

const EmissionsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default EmissionsDashboard;
