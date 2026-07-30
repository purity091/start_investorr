import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Building2, Store, Briefcase, Globe, BarChart3, TrendingUp, DollarSign, PieChart } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'العقارات التجارية',
  titleEn: 'Commercial Real Estate',
  subtitle: 'تحليل سوق المكاتب، العقارات التجزئة، الفنادق، والتحولات الكبرى في نماذج العمل الهجين والاستدامة',
  icon: Building2,
  accent: 'blue',
  pdfLabel: 'تقرير العقارات التجارية العالمي (PDF)',

  kpis: [
    { label: 'قيمة السوق العالمي', value: '37', unit: 'ترليون $', icon: DollarSign },
    { label: 'حصة أمريكا الشمالية', value: '33%', icon: Globe },
    { label: 'معدل شغور المكاتب (أمريكا)', value: '16.9%', icon: Briefcase },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق استثمار عقاري', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم بحصة 33% من قيمة السوق التجاري وتضم أضخم شركات الوساطة والـ REITs.',
      icon: Globe
    },
    { 
      label: 'أضخم سوق نمو وتوسّع', 
      country: 'الصين', 
      note: 'تمتلك أضخم مخزون عقاري تجاري ناتج عن النهضة العمرانية الهائلة والتوسّع الصناعي.',
      icon: Building2
    },
    { 
      label: 'أكبر سوق استقرار أوروبي', 
      country: 'ألمانيا', 
      note: 'تعد المركز الرئيسي للاستثمارات العقارية الآمنة في أوروبا بفضل قوة اقتصادها ومدنها الصناعية.',
      icon: TrendingUp
    }
  ],

  navItems: ['نظرة عامة', 'قطاع المكاتب والتجزئة', 'الاستثمار المباشر', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'سوق عالمي يضاهي اقتصادات كبرى',
      subtitle: 'A Market Twice the Size of China\'s Economy',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            بلغت قيمة سوق العقارات التجارية العالمي حوالي 37 تريليون دولار في عام 2023. ترتبط هذه الصناعة ارتباطاً وثيقاً بأداء الاقتصاد العام، وتواجه حالياً تحديات وفرصاً جديدة ناتجة عن التحول الرقمي ونماذج العمل الهجين.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <TrendingUp className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الاستدامة وابتكار Proptech</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  أصبح معيار ESG (الاستدامة البيئية والاجتماعية) والابتكار التكنولوجي من أهم ركائز مستقبل العقارات التجارية لجذب المستثمرين المؤسسيين.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'تحولات قطاع المكاتب والتجزئة',
      subtitle: 'Office & Retail Shifts',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أدت الجائحة إلى تراجع الطلب على المساحات المكتبية التقليدية، بينما انتعش قطاع المستودعات والمراكز اللوجستية لدعم طفرة التجارة الإلكترونية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Store className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو إيجارات التجزئة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">حققت إيجارات التجزئة الفاخرة في مدن مثل ميلانو نمواً بنسبة 3.09%، مما يعكس مرونة المواقع المتميزة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <PieChart className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">توزيع الاستثمارات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تزايدت شعبية العقارات السكنية واللوجستية بين المستثمرين المباشرين كبديل للمساحات المكتبية التقليدية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'investment',
      title: 'الاستثمار المؤسسي والمرونة',
      subtitle: 'Institutional Investor Interest',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت العقارات التجارية أصلاً أساسياً في محافظ المستثمرين المؤسسيين، مع التركيز على العقارات "متعددة العائلات" (Multifamily) والبناء من أجل التأجير.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <BarChart3 className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">أوروبا ولندن</p>
                <p className="text-sm text-slate-400">تظل لندن وهيثرو من أغلى أسواق الإيجارات اللوجستية، حيث يصل الإيجار السنوي إلى 300 يورو للمتر المربع.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Briefcase className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">عمالقة الوساطة</p>
                <p className="text-sm text-slate-400">تتصدر شركة CBRE قائمة عمالقة الوساطة العقارية بحجم معاملات يتجاوز مئات المليارات سنوياً.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'CBRE Group', country: 'USA', note: 'أكبر شركة وساطة واستثمار عقاري تجاري في العالم' },
    { name: 'JLL (Jones Lang LaSalle)', country: 'USA', note: 'رائد عالمي في إدارة العقارات والخدمات المهنية المتخصصة' },
    { name: 'Brookfield Asset Management', country: 'Canada', note: 'أحد أضخم مديري الأصول العقارية البديلة عالمياً' },
    { name: 'Prologis', country: 'USA', note: 'القائد العالمي في عقارات الخدمات اللوجستية والمستودعات العملاقة' },
  ],

  definition: 'تشمل العقارات التجارية العقارات المبنية لأغراض تجارية، وتغطي قطاعات المكاتب، التجزئة، العقارات الصناعية واللوجستية، والضيافة، بالإضافة إلى خيارات السكن البديلة كالسكن الطلابي.',

  industryInsights: [
    'التجارة الإلكترونية هي المحرك الأول للطلب التاريخي على المستودعات (Industrial Real Estate)',
    'تعد الاستدامة (ESG) الآن شرطاً أساسياً لجذب رأس المال الضخم من صناديق التقاعد العالمية',
    'العمل الهجين أدى لخفض الطلب على المكاتب في مراكز المدن الكبرى بنسب تتراوح بين 15% و25%',
  ],

  tags: ['Commercial Real Estate', 'Office Space', 'Logistics', 'REITs', 'Investment', 'Sustainability'],
};

const CommercialRealEstateDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default CommercialRealEstateDashboard;
