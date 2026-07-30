import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Armchair, Globe, TrendingUp, Home } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الأثاث والمفروشات والسلع المنزلية',
  titleEn: 'Furniture & Household Items',
  subtitle: 'تحولات العمل عن بُعد، أثاث المكاتب المنزلية، ونمو التجارة الإلكترونية في تجهيز المنازل',
  icon: Armchair,
  accent: 'amber',
  pdfLabel: 'تقرير سوق الأثاث (PDF)',

  kpis: [
    { label: 'إيرادات سوق الأثاث العالمي', value: '729.2B', unit: 'مليار دولار أمريكي', icon: Globe },
    { label: 'قيمة سوق الأثاث والمفروشات الفاخرة', value: '53B', unit: 'مليار يورو سنوياً', icon: Armchair },
    { label: 'إيرادات سوق الأثاث الخارجي', value: '50B', unit: 'مليار دولار أمريكي', icon: Home },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق استهلاكي للأثاث', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم بإنفاق هائل على أثاث المنازل والمكاتب، خاصة في قطاع أثاث المطبخ الذي بلغت قيمته 36 مليار دولار.',
      icon: Home
    },
    { 
      label: 'مركز التصنيع العالمي', 
      country: 'الصين', 
      note: 'أكبر منتج ومصدر للأثاث في العالم، وتمتلك سوقاً محلياً ينمو بسرعة بفضل التوسع الحضري.',
      icon: Globe
    },
    { 
      label: 'رائد التصميم والجودة الأوروبية', 
      country: 'ألمانيا', 
      note: 'تعتبر القوة المحركة لسوق الأثاث الأوروبي وتشتهر بتميزها في قطاع الأثاث المدمج وتجهيزات المطابخ عالية الجودة.',
      icon: Armchair
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'قطاعات السوق', 'اتجاهات الصناعة', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            شهدت صناعة الأثاث والسلع المنزلية تحولات جوهرية مؤخراً، أبرزها التغير في أنماط العمل. أصبح الموظفون يستفيدون بشكل متزايد من فرصة <strong>العمل عن بُعد</strong>، مما أدى لنمو هائل في الطلب على "أثاث المكاتب المنزلية" وتجهيز مساحات عمل احترافية داخل المسكن.
          </p>
          <p>
            على جانب الإنتاج، ظلت مشاكل سلاسل التوريد العالمية عقبة مستمرة نظراً لأن جزءاً كبيراً من المنتجات المباعة في أوروبا والأمريكيتين يتطلب النقل لمسافات طويلة من مراكز التصنيع الرئيسية مثل الصين.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Impressive Growth Forecast',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                بحلول عام 2030، من المتوقع أن يصل سوق الأثاث العالمي إلى <strong>873 مليار دولار أمريكي</strong>، ارتفاعاً من حوالي 579 مليار دولار في عام 2023، مما يمثل نمواً بنسبة 50% تقريباً خلال هذه الفترة.
              </p>
              <p>
                تتكون هذه المبيعات من مجموعة واسعة من المنتجات لتأثيث جميع غرف المنزل، بالإضافة إلى السلع المنزلية الأخرى ذات القيمة السوقية العالية مثل أجهزة المطبخ والغسيل.
              </p>
            </div>
            <div className="p-8 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <TrendingUp size={48} className="text-amber-600 mb-4" />
               <p className="text-2xl font-black text-amber-900">$873 مليار</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">القيمة المتوقعة لـ 2030</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق',
      subtitle: 'Kitchen and Dining Focus',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتصدر <strong>الولايات المتحدة</strong> تصنيفات إيرادات سوق أثاث المطبخ بقيمة 36 مليار دولار في عام 2023، بينما تحل ألمانيا في المرتبة الثانية عالمياً.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-amber-400">أثاث المطبخ وتناول الطعام</p>
              <p className="text-sm text-slate-300 mt-2">يغطي إنتاج وتوزيع وبيع الأغراض المصممة لإعداد أو تخزين أو تناول الطعام.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-amber-400">الأجهزة المنزلية</p>
              <p className="text-sm text-slate-300 mt-2">قطاع مكمل يشمل أجهزة الطهي والغسيل والتبريد ذات القيمة المضافة العالية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'From Brick-and-Mortar to E-commerce',
      content: (
        <div className="space-y-6">
          <p>
            بالنسبة لتجار التجزئة في المتاجر التقليدية، ظلت المبيعات مستقرة نسبياً في عام 2023 مع ميل طفيف نحو الانخفاض، حيث بلغت مبيعات أكتوبر <strong>10.5 مليار دولار</strong> في أمريكا.
          </p>
          <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
            <Globe className="text-amber-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-amber-900">طفرة التجارة الإلكترونية</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                هناك تحول جذري نحو قنوات الأونلاين في شراء الأثاث الضخم، مدفوعاً بتحسين لوجستيات التوصيل وظهور منصات متخصصة توفر خيارات واسعة وتقنيات معاينة افتراضية.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Wayfair', country: 'الولايات المتحدة', note: 'المتصدر في مبيعات التجارة الإلكترونية للأثاث' },
    { name: 'IKEA', country: 'السويد / عالمي', note: 'العلامة التجارية الأشهر في الأثاث الجاهز للتجميع' },
    { name: 'Williams-Sonoma', country: 'الولايات المتحدة', note: 'رائد في تجزئة السلع المنزلية الفاخرة' },
    { name: 'Home Depot', country: 'الولايات المتحدة', note: 'أكبر بائع لتجهيزات المنازل في أمريكا' },
  ],

  definition: `تشتمل صناعة الأثاث والمفروشات والسلع المنزلية على كل ما يتم شراؤه لدعم الوظيفة أو الجمالية في المنزل أو العمل؛ من الطاولات والكراسي إلى أدوات الطبخ والأجهزة المنزلية. تنقسم إلى أثاث منزلي وأثاث مكتبي، ويُصنف حسب الوظيفة أو الغرفة. أحد الفروع الحيوية هو قطاع السلع الاستهلاكية كأدوات الصيانة المنزلية والإكسسوارات الديكورية.`,

  industryInsights: [
    'نمو سوق الأثاث العالمي بنسبة 50% بحلول 2030 ليعكس اهتمام المستهلكين المتزايد برفاهية المنزل',
    'العمل عن بُعد خلق فئة سوقية جديدة تماماً هي "المكتب المنزلي الاحترافي"',
    'الولايات المتحدة تهيمن على سوق أثاث المطبخ وتناول الطعام بـ 36 مليار دولار إيرادات',
    'Wayfair و IKEA يقودان مشهد الابتكار الرقمي واللوجستي في الصناعة حالياً',
  ],

  tags: ['Furniture', 'Home Decor', 'Remote Work', 'Kitchen Design', 'Home Appliances', 'Retail'],
};

const FurnitureHouseholdDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default FurnitureHouseholdDashboard;
