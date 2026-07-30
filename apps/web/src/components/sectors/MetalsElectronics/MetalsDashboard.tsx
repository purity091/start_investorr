import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Hammer, Factory, Pickaxe, Globe, BarChart3, TrendingUp, Droplets, Leaf } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع المعادن والصلب',
  titleEn: 'Metals Industry',
  subtitle: 'تحليل إنتاج الصلب العالمي، المعادن الثمينة، التحول نحو الاقتصاد الأخضر، وهيمنة الصين الصناعية',
  icon: Hammer,
  accent: 'slate',
  pdfLabel: 'تقرير سوق المعادن العالمي (PDF)',

  kpis: [
    { label: 'إنتاج الصلب الخام عالمياً', value: '1.9', unit: 'مليار طن', icon: Factory },
    { label: 'الطلب العالمي على الصلب', value: '1.85', unit: 'مليار طن', icon: TrendingUp },
    { label: 'الصلب المعاد تدويره', value: '469.7', unit: 'مليون طن', icon: Leaf },
  ],

  topMarkets: [
    { 
      label: 'المنتج المهيمن عالمياً', 
      country: 'الصين', 
      note: 'تنتج أكثر من 50% من الصلب العالمي وتعد المستهلك الأول للمعادن الأساسية والحديد.',
      icon: Factory
    },
    { 
      label: 'سوق النمو المتسارع', 
      country: 'الهند', 
      note: 'ثاني أكبر منتج للصلب عالمياً وتشهد نمواً هائلاً في الطلب المحلي بفضل مشاريع البنية التحتية.',
      icon: TrendingUp
    },
    { 
      label: 'رائد الجودة والتقنية', 
      country: 'اليابان', 
      note: 'تتميز بإنتاج أنواع صلب متقدمة وعالية الجودة مخصصة لصناعات السيارات والتكنولوجيا.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'صناعة الصلب', 'الاستدامة والبيئة', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'شريان الصناعة الحديثة',
      subtitle: 'The Vitality of Metals',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            المعادن هي سلعة حيوية بفضل تطبيقها الواسع في مختلف الصناعات. يمثل تصنيع المعادن ركيزة أساسية في تطوير البنية التحتية، بناء العقارات، تصنيع السيارات، وبناء السفن.
          </p>
          <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 flex items-start gap-4">
             <Factory className="text-slate-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-slate-900 leading-tight">هيمنة الصين المطلقة</p>
                <p className="text-sm text-slate-700/80 mt-2">
                  تعد الصين اللاعب الرئيسي في سوق المعادن العالمي، حيث تنتج أكثر من نصف إنتاج الصلب العالمي رغم تحديات سلاسل التوريد والتوترات الجيوسياسية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'steel-industry',
      title: 'صناعة الصلب الخام',
      subtitle: 'Global Crude Steel Production',
      content: (
        <div className="space-y-6 text-right">
          <p>
            حقق إنتاج الصلب الخام العالمي 1.9 مليار طن متري في عام 2022، وتفوقت الصين على جميع منافسيها بإنتاج مليار طن وحدها في نفس العام.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-slate-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أكبر المنتجين</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتصدر مجموعة China Baowu Group قائمة أكبر منتجي الصلب في العالم من حيث حجم الإنتاج.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-slate-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سلاسل التوريد</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أثرت أسعار الطاقة العالمية والتحولات السياسية على استقرار الإنتاج وأدت لإغلاق بعض المصانع في أوروبا.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'sustainability',
      title: 'التحول نحو الصلب الأخضر',
      subtitle: 'Decarbonization & Recycling',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يعد تقليل الانبعاثات الكربونية الموضوع الأكثر أهمية في الصناعة حالياً، حيث تساهم صناعة الصلب بنسبة كبيرة من غازات الاحتباس الحراري عالمياً.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Leaf className="text-slate-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">إعادة التدوير</p>
                <p className="text-sm text-slate-400">يمكن تحقيق الاستدامة عبر إعادة تدوير "خردة الصلب" (Steel Scrap)، حيث استخدمت الأسواق الرئيسية 469 مليون طن في 2022.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Droplets className="text-slate-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">معادن البطاريات</p>
                <p className="text-sm text-slate-400">يتصاعد الطلب على معادن خاصة مثل الكوبالت والليثيوم والنحاس لخدمة صناعة البطارات والطاقة المتجددة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'China Baowu Group', country: 'China', note: 'أكبر منتج للصلب الخام في العالم من حيث الحجم' },
    { name: 'ArcelorMittal', country: 'Luxembourg', note: 'القائد العالمي في تكنولوجيا الصلب والحلول الصناعية المتطورة' },
    { name: 'Glencore', country: 'Switzerland', note: 'واحدة من أكبر شركات التعدين وتجارة المعادن والموارد عالمياً' },
    { name: 'Nippon Steel', country: 'Japan', note: 'المزود الرئيسي للصلب عالي الجودة لصناعة السيارات اليابانية' },
  ],

  definition: 'يشمل قطاع المعادن استخراج وتصنيع وبيع المعادن الحديدية وغير الحديدية، المعادن الثمينة، والمعادن الأساسية، بالإضافة إلى عمليات إعادة التدوير الصناعية.',

  industryInsights: [
    'المعادن الحرجة (Critical Minerals) أصبحت قضية أمن قومي للدول المتقدمة لتأمين سلاسل التوريد',
    'استخدام الهيدروجين بدلاً من الفحم في أفران الصلب هو الحل القادم للوصول لصافي صفر انبعاثات',
    'أسعار المعادن الثمينة (الذهب والفضة) تظل ملاذاً آمناً في ظل التقلبات الاقتصادية العالمية',
  ],

  tags: ['Metals', 'Steel', 'Mining', 'Recycling', 'Sustainability', 'Critical Minerals'],
};

const MetalsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default MetalsDashboard;
