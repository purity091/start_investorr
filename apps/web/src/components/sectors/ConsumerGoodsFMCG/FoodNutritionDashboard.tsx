import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Utensils, Globe, ShoppingBag, Leaf } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الغذاء والتغذية',
  titleEn: 'Food & Nutrition',
  subtitle: 'الاستدامة، التغذية الصحية، والتحول نحو المنتجات العضوية والبدائل النباتية المتطورة',
  icon: Utensils,
  accent: 'emerald',
  pdfLabel: 'تقرير الغذاء والتغذية (PDF)',

  kpis: [
    { label: 'استهلاك اللحوم العالمي للفرد', value: '28.5', unit: 'كيلوغرام سنوياً', icon: Utensils },
    { label: 'سوق معالجة الخضار والفاكهة', value: '339.6B', unit: 'مليار دولار أمريكي', icon: Globe },
    { label: 'قائد صناعة الحلويات عالمياً', value: 'Mars Inc.', unit: 'من حيث صافي المبيعات', icon: ShoppingBag },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق مأكولات عالمياً', 
      country: 'الصين', 
      note: 'تتصدر العالم بإيرادات تتجاوز 1.47 تريليون دولار وقاعدة استهلاكية ضخمة.',
      icon: Globe
    },
    { 
      label: 'المركز الثاني عالمياً', 
      country: 'الهند', 
      note: 'أسرع الأسواق نمواً وتجاوزت الولايات المتحدة لتصبح قوة غذائية كبرى.',
      icon: Utensils
    },
    { 
      label: 'رائد الابتكار الغذائي', 
      country: 'الولايات المتحدة', 
      note: 'السوق الأكثر تأثيراً في ابتكار المنتجات الصحية والعضوية والبدائل النباتية.',
      icon: Leaf
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
            تشهد صناعة الأغذية عدة اتجاهات نمو مستمرة تدور حول <strong>الاستدامة والحياة الصحية</strong>. يتزايد اهتمام المستهلكين بالعلامات التجارية التي لا تقدم لهم طعاماً صحياً ومغذياً فحسب، بل تأخذ في الاعتبار المخاوف البيئية والأخلاقية في تصنيع الأغذية.
          </p>
          <p>
            بينما وصلت اللحوم النباتية إلى ذروة أولية، فإن المنتجات المصنعة بشكل مفرط بدأت تفقد جاذبيتها لدى المستهلكين المهتمين بالصحة. في المقابل، تستعد منتجات <strong>اللحوم المستزرعة (Cultured meat)</strong> لأخذ دور الريادة في المرحلة المقبلة كبديل أكثر استدامة وتطوراً.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'China and India Lead the World',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                تصدر سوق المواد الغذائية في <strong>الصين</strong> القائمة العالمية بإيرادات تجاوزت <strong>1.47 تريليون دولار</strong> في عام 2023. وللمرة الأولى، جاءت <strong>الهند</strong> في المرتبة الثانية بقيمة 814.29 مليار دولار، متجاوزة الولايات المتحدة التي حلت في المركز الثالث.
              </p>
              <p>
                تشير التوقعات إلى أن الهند من المرجح أن توسع هذه الفجوة في السنوات القادمة نظراً للنمو السكاني والتحول في الأنماط الاستهلاكية.
              </p>
            </div>
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Globe size={48} className="text-emerald-600 mb-4" />
               <p className="text-2xl font-black text-emerald-900">$1.47T</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">إيرادات سوق الصين (2023)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق',
      subtitle: 'Dairy, Eggs, and Snacks',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعتبر <strong>منتجات الألبان والبيض</strong> القطاع الرائد من حيث حجم الاستهلاك، حيث يستهلك الفرد في الولايات المتحدة مثلاً أكثر من 123.75 كجم سنوياً.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-emerald-400">الحلويات والوجبات الخفيفة</p>
              <p className="text-sm text-slate-300 mt-2">الأكثر مبيعاً من حيث القيمة المالية والإيرادات الإجمالية.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-emerald-400">اللحوم والبروتين</p>
              <p className="text-sm text-slate-300 mt-2">تأتي في المرتبة الثانية بعد الوجبات الخفيفة من حيث العائدات المادية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'The Organic Revolution',
      content: (
        <div className="space-y-6">
          <p>
            وصلت مبيعات الأغذية العضوية في الولايات المتحدة إلى <strong>63.8 مليار دولار</strong> في عام 2023، وهو ما يمثل نمواً هائلاً بنسبة 380% منذ عام 2005. 
          </p>
          <div className="flex items-start gap-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <Leaf className="text-emerald-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-emerald-900">طفرة الأغذية العضوية</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                الأغذية العضوية، التي كانت ذات يوم ميزة متخصصة في متاجر الأغذية الصحية الصغيرة، وصلت الآن إلى جاذبية واسعة النطاق وتمثل قمة اتجاه "Better-for-you" في تجارة التجزئة الغذائية.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'PepsiCo Inc.', country: 'الولايات المتحدة', note: 'المتصدر بـ 52.7 مليار دولار مبيعات غذائية' },
    { name: 'Tyson Foods Inc.', country: 'الولايات المتحدة', note: 'عملاق معالجة اللحوم والبروتين' },
    { name: 'Nestlé', country: 'سويسرا', note: 'أكبر شركة أغذية في العالم من حيث الانتشار الجغرافي' },
    { name: 'Mars Inc.', country: 'الولايات المتحدة', note: 'العلامة التجارية الأبرز في قطاع الحلويات' },
    { name: 'JBS USA', country: 'الولايات المتحدة / البرازيل', note: 'رائد عالمي في تصنيع اللحوم والمنتجات الحيوانية' },
    { name: 'Kraft Heinz Co.', country: 'الولايات المتحدة', note: 'الشركة الرائدة في قطاع الأغذية المحفوظة والصلصات' },
  ],

  definition: `صناعة المواد الغذائية هي سوق معقد ومتعدد الأوجه مسؤول عن إنتاج جميع الأغذية للاستهلاك البشري. يمكن تقسيمها إلى أطعمة طازجة (ذات صلاحية قصيرة كالخضروات واللحوم) وأطعمة معبأة (تجدها في السوبر ماركت كالمعلبات والصلصات). تشمل التغذية كل ما يحتويه الطعام وتأثيراته على الجسم، وهو جانب حيوي يدفع المستهلكين لاتخاذ خيارات قائمة على الصحة أو الطعم.`,

  industryInsights: [
    'الصين والهند تهيمنان على أكبر حصص السوق الغذائي العالمي متجاوزتين الولايات المتحدة',
    'قطاع الوجبات الخفيفة والحلويات يحقق أعلى الإيرادات المالية رغم تنامي الوعي الصحي',
    'نمو قطاع الأغذية العضوية تجاوز 380% في العقدين الأخيرين ليصبح خياراً رئيسياً وليس هامشياً',
    'التحول نحو اللحوم المستزرعة والبدائل النباتية الأقل معالجة هو المستقبل القادم للصناعة',
  ],

  tags: ['Organic Food', 'Dairy & Eggs', 'Sustainability', 'FMCG', 'Meat Industry', 'Health & Wellness'],
};

const FoodNutritionDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default FoodNutritionDashboard;
