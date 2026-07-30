import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Landmark, Globe, TrendingUp, ShieldCheck, Building2, Briefcase } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المؤسسات المالية والخدمات المصرفية',
  titleEn: 'Financial Institutions & Banking',
  subtitle: 'تحليل البنوك المركزية، المؤسسات المصرفية العالمية، واستقرار النظام المالي الدولي',
  icon: Landmark,
  accent: 'blue',
  pdfLabel: 'تقرير المؤسسات المالية (PDF)',

  kpis: [
    { label: 'إجمالي أصول أكبر 100 بنك', value: '112T', unit: 'تريليون دولار أمريكي', icon: Globe },
    { label: 'معدل كفاية رأس المال العالمي', value: '15.2%', unit: 'متوسط الأمان المالي', icon: ShieldCheck },
    { label: 'أصول البنك الأكبر عالمياً', value: '5.9T', unit: 'تريليون دولار (ICBC)', icon: Building2 },
  ],

  topMarkets: [
    { 
      label: 'أضخم كتلة مصرفية بالعالم', 
      country: 'الصين', 
      note: 'تضم أكبر 4 بنوك في العالم من حيث الأصول، وتمثل القوة المالية الصاعدة المهيمنة على التمويل الصناعي.',
      icon: Building2
    },
    { 
      label: 'محور النظام المالي العالمي', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك النظام المالي الأكثر تأثيراً وعمقاً، ومقر لأكبر البنوك الاستثمارية عالمياً مثل JPMorgan Chase.',
      icon: TrendingUp
    },
    { 
      label: 'المركز المالي الدولي', 
      country: 'المملكة المتحدة', 
      note: 'تعد لندن المركز الأول عالمياً لتداول العملات والخدمات المالية الدولية العابرة للحدود.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'أصول البنوك', 'النظام العالمي', 'القادة والتشريعات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'استقرار النظام المالي العالمي',
      subtitle: 'Global Financial System Stability',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تشكل المؤسسات المالية العصب الحيوي للاقتصاد العالمي، حيث تعمل كوسيط لتوجيه رؤوس الأموال من المدخرين إلى المستثمرين. وقد شهد العقد الأخير زيادة كبيرة في القواعد التنظيمية (مثل بازل 3) لضمان عدم تكرار الأزمات المالية التاريخية.
          </p>
          <p>
             تهيمن البنوك الصينية والأمريكية على المشهد من حيث الأصول والقيمة السوقية، مع تحول متزايد نحو <strong>الخدمات المصرفية الرقمية</strong> التي باتت تهدد النماذج التقليدية للفروع البدنية.
          </p>
        </div>
      ),
    },
    {
      id: 'assets',
      title: 'توزيع الأصول والقوة المصرفية',
      subtitle: 'Banking Asset Distribution',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتجاوز أصول أكبر 100 بنك في العالم حاجز الـ <strong>110 تريليون دولار</strong>. وتستحوذ الصين وحدها على الحصة الأكبر، حيث تبلغ أصول بنك ICBC وحده ما يقرب من 6 تريليونات دولار، مما يعكس دورها كممول أول للمشاريع القومية والعالمية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Briefcase className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">البنوك الاستثمارية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تقود المؤسسات الأمريكية مثل Goldman Sachs وMorgan Stanley عمليات الاندماج والاكتتابات العالمية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <ShieldCheck className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الأمان التنظيمي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تفرض البنوك المركزية معايير صارمة للسيولة لضمان مرونة المؤسسات أمام تقلبات السوق المفاجئة.</p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'ICBC', country: 'الصين', note: 'أكبر بنك في العالم من حيث إجمالي الأصول' },
    { name: 'JPMorgan Chase', country: 'الولايات المتحدة', note: 'البنك الأكثر قيمة سوقية وتأثيراً في الغرب' },
    { name: 'China Construction Bank', country: 'الصين', note: 'ثاني أكبر بنك عالمياً بتركيز على التمويل العقاري والصناعي' },
    { name: 'BNP Paribas', country: 'فرنسا', note: 'أضخم مجموعة مصرفية في منطقة اليورو' },
    { name: 'HSBC Holdings', country: 'المملكة المتحدة', note: 'رائد التمويل التجاري بين الشرق والغرب' },
  ],

  definition: 'تشمل المؤسسات المالية البنوك التجارية، البنوك الاستثمارية، الصناديق السيادية، والاتحادات الائتمانية التي تقوم بإدارة الأموال وتوفير الائتمان وتيسير المعاملات المالية.',

  industryInsights: [
    'الصين تضم أكبر 4 بنوك في العالم تعتمد عليها الدولة في تمويل سلاسل التوريد العالمية',
    'التحول الرقمي (Mobile Banking) جعل من كفاءة التكنولوجيا معياراً يسبق حجم الفروع البدنية',
    'البنوك الإسلامية تمثل قطاعاً ينمو بمعدلات تفوق التمويل التقليدي في منطقة الشرق الأوسط وجنوب آسيا',
    'إدارة المخاطر المناخية (ESG) أصبحت جزءاً لا يتجزأ من استراتيجيات الإقراض والاستثمار المصرفي',
  ],

  tags: ['Banking', 'Finance', 'ICBC', 'JPMorgan', 'Financial Assets', 'Monetary Policy', 'Investment'],
};

const FinancialInstitutionsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default FinancialInstitutionsDashboard;

