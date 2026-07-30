import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Shirt, Gem, ShoppingBag, Globe, BarChart3, TrendingUp, Sparkles, Recycle } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الأزياء والإكسسوارات',
  titleEn: 'Fashion & Accessories Industry',
  subtitle: 'تحليل سوق الملابس الجاهزة، الرفاهية (Luxury)، تجارة الملابس المستعملة، وهيمنة العلامات التجارية العالمية',
  icon: Shirt,
  accent: 'blue',
  pdfLabel: 'تقرير سوق الأزياء العالمي (PDF)',

  kpis: [
    { label: 'إيرادات سوق الملابس العالمي', value: '1.73', unit: 'ترليون $', icon: BarChart3 },
    { label: 'سوق السلع الفاخرة الشخصية', value: '337', unit: 'مليار €', icon: Gem },
    { label: 'سوق الملابس المستعملة (2028)', value: '350', unit: 'مليار $', icon: Recycle },
  ],

  topMarkets: [
    { 
      label: 'أكبر مصدّر للملابس', 
      country: 'الصين', 
      note: 'تسيطر على سلاسل التوريد العالمية للأزياء بفضل قدرات إنتاجية هائلة وتكلفة تنافسية.',
      icon: Globe
    },
    { 
      label: 'عاصمة الرفاهية والأناقة', 
      country: 'فرنسا', 
      note: 'مقر لشركات عملاقة مثل LVMH وتمثل المركز العالمي لتصميم وبيع السلع الفاخرة عالية القيمة.',
      icon: Sparkles
    },
    { 
      label: 'رائد الملابس الرياضية والابتكار', 
      country: 'الولايات المتحدة', 
      note: 'تقود العالم في قطاع الملابس الرياضية (Athleisure) وهي الموطن لعلامة Nike، الأكثر قيمة عالمياً.',
      icon: Shirt
    }
  ],

  navItems: ['نظرة عامة', 'قطاع الرفاهية', 'الأزياء المستدامة', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'صناعة ديناميكية في قلب الاستهلاك',
      subtitle: 'Dynamic Industry at the Core of FMCG',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تتجاوز صناعة الأزياء مجرد التصميم لتشمل الإنتاج، التوريد، والتوزيع العالمي. بلغت قيمة هذا السوق 1.73 تريليون دولار في عام 2023، مع توقعات بنمو قدره 250 مليار دولار بحلول عام 2028، مدفوعاً بطلب متزايد ورقمنة سريعة.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Sparkles className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">عالم "الموضة السريعة"</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يقود المشهد الحالي العلامات التجارية التي توفر منتجات متاحة بكميات ضخمة وبسرعة عالية، مع تحول ملحوظ نحو المبيعات عبر الإنترنت (أكثر من خمس المبيعات في أمريكا).
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'luxury',
      title: 'قطاع الرفاهية والماركات الأكثر قيمة',
      subtitle: 'Personal Luxury Goods & High End',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تهيمن الإكسسوارات مثل المجوهرات، النظارات، والحقائب الجلدية على سوق السلع الفاخرة. تعد Louis Vuitton العلامة التجارية الأكثر قيمة في هذا القطاع عالمياً.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Gem className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">Louis Vuitton</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تقدر قيمة العلامة بحوالي 130 مليار دولار، متصدرة أسماء مثل Chanel و Hermes و Gucci.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الصين كأكبر مصدر</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تظل الصين الرائد العالمي في تصدير منتجات الملابس لكافة أسواق العالم بفضل قدراتها التصنيعية الهائلة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'sustainability',
      title: 'ثورة الملابس المستعملة والاستدامة',
      subtitle: 'Secondhand Apparel & Pre-owned Retail',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أدى الوعي المتزايد بالبيئة إلى تحول كبير نحو الملابس المستعملة (Secondhand)، حيث من المتوقع أن يقفز حجم هذا السوق إلى 350 مليار دولار بحلول 2028.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Recycle className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">التجارة عبر التطبيقات</p>
                <p className="text-sm text-slate-400">تحول شراء القطع المستعملة من المتاجر التقليدية إلى التطبيقات والمواقع المتخصصة، مما زاد من سرعة نمو هذا القطاع.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">Nike: العلامة الأكثر قيمة</p>
                <p className="text-sm text-slate-400">تتصدر Nike فئة الملابس الرياضية والعامة كأكثر العلامات التجارية قيمة وتأثيراً في سلوك المستهلك العالمي.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Inditex Group', country: 'Spain', note: 'الشركة الأم لـ Zara والعديد من العلامات الرائدة (مبيعات 35.9 مليار €)' },
    { name: 'Nike', country: 'USA', note: 'العلامة التجارية الأكثر قيمة في قطاع الملابس والأحذية الرياضية' },
    { name: 'LVMH', country: 'France', note: 'العملاق العالمي في قطاع السلع الفاخرة (Louis Vuitton, Dior)' },
    { name: 'H&M', country: 'Sweden', note: 'أحد أكبر بائعي التجزئة في قطاع "الموضة السريعة" عالمياً' },
  ],

  definition: 'تشمل صناعة الأزياء تصميم وإنتاج وتوزيع الملابس والأحذية والإكسسوارات، وتتنوع بين قطاع السلع الفاخرة (Luxury) وقطاع الإنتاج الكثيف (Mass-production).',

  industryInsights: [
    'التجارة الإلكترونية تستحوذ الآن على أكثر من 20% من إجمالي مبيعات الملابس في الأسواق المبرى',
    'الوعي البيئي ساهم في نمو سوق الملابس المستعملة بمعدلات أسرع من قطاع الملابس الجديدة',
    'تعتبر الأحذية (Footwear) القطاع الأكثر نمواً داخل سوق الإكسسوارات والملابس الرياضية',
  ],

  tags: ['Fashion', 'Luxury Goods', 'Apparel', 'Secondhand Retail', 'Nike', 'Zara', 'LVMH'],
};

const FashionAccessoriesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default FashionAccessoriesDashboard;
