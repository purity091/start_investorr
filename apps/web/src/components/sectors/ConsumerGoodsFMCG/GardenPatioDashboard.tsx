import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Flower2, Globe, TrendingUp, Sun, Leaf } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الحدائق والساحات الخارجية',
  titleEn: 'Garden & Patio',
  subtitle: 'رقمنة سوق الحدائق، الأثاث الخارجي، والتوجه نحو الحلول الجمالية المستدامة والاقتصادية',
  icon: Flower2,
  accent: 'lime',
  pdfLabel: 'تقرير سوق الحدائق (PDF)',

  kpis: [
    { label: 'إيرادات سوق الحدائق والباحات (أمريكا)', value: '147.3B', unit: 'مليار دولار أمريكي', icon: Flower2 },
    { label: 'توقعات مبيعات الأثاث الخارجي', value: '20B', unit: 'مليار دولار أمريكي', icon: TrendingUp },
    { label: 'إيرادات سوق الشوايات والمحامص', value: '7.7B', unit: 'مليار دولار عالمياً', icon: Sun },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق لمعدات الحدائق', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أضخم سوق إنفاق على المروج وصيانة الحدائق والباحات الخارجية عالمياً بفضل الثقافة السكنية الواسعة.',
      icon: Sun
    },
    { 
      label: 'محور تجارة الزهور العالمي', 
      country: 'هولندا', 
      note: 'تعتبر المركز الدولي الأول لتجارة وتصدير الزهور والنباتات عبر مزادات Royal FloraHolland الشهيرة.',
      icon: Leaf
    },
    { 
      label: 'رائد المنتجات المستدامة', 
      country: 'ألمانيا', 
      note: 'تقود التوجه الأوروبي نحو الحدائق العضوية والأدوات اليدوية والآلية ذات الكفاءة العالية.',
      icon: Flower2
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'القطاعات', 'التجارة الإقليمية', 'الاتجاهات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد صناعة الحدائق والساحات الخارجية قطاعاً متعدد الأوجه يضم فئات متنوعة تبدأ من الزهور والنباتات وتصل إلى معدات الشواء. شهد هذا السوق مؤخراً تحولاً كبيراً نحو <strong>الرقمنة</strong> وتبسيط قنوات التوزيع، مع زيادة ملحوظة في حصة القنوات الإلكترونية والبيع المباشر للمستهلك.
          </p>
          <p>
            من الناحية الاقتصادية، يكمن الهدف الحالي للكثير من المستهلكين في الحفاظ على مساحة خارجية جذابة من الناحية الجمالية ولكن بخيارات <strong>اقتصادية</strong> لا تثقل كاهل الميزانية.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'The Great Outdoors Spending',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                لا يتردد الناس في الاستثمار في مساحاتهم الخارجية، ومن المتوقع أن تزداد مبيعات المروج والحدائق لتصل إلى قرابة <strong>393 مليار دولار أمريكي</strong> بحلول عام 2028.
              </p>
              <p>
                علاوة على ذلك، من المتوقع أن تنمو قيمة سوق الأثاث الخارجي العالمي لتصل إلى حوالي 63 مليار دولار بحلول نفس العام، مما يعكس تحول الحدائق لملحقات أساسية للمعيشة المنزلية.
              </p>
            </div>
            <div className="p-8 bg-lime-50 rounded-2xl border border-lime-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Globe size={48} className="text-lime-600 mb-4" />
               <p className="text-2xl font-black text-lime-900">$393 مليار</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">تقديرات عام 2028</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق',
      subtitle: 'Grilling and Social Gathering',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            يعد الشواء من أكثر طرق الطهي انتشاراً وتقليدية حول العالم، حيث سجلت إيرادات سوق الشوايات والمحامص حوالي <strong>6.5 مليار دولار</strong> في عام 2023.
          </p>
          <p>
            يمثل هذا القطاع أحد الأركان الأساسية لصناعة "الفناء والحديقة"، حيث يرتبط بقوة بأنماط الحياة الاجتماعية والاستمتاع بالهواء الطلق، ويظهر نمواً مستقراً يعكس الروابط الثقافية العميقة لهذه الأنشطة.
          </p>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'Sustainability and Eco-Friendly Focus',
      content: (
        <div className="space-y-6">
          <p>
            كما هو الحال في الصناعات الأخرى، تتأثر صناعة الحدائق بشدة بالتوجه نحو <strong>الاستدامة</strong>. هناك توقعات بزيادة في بناء الحدائق الصديقة للحياة البرية، واستخدام الأسمدة والتربة الصديقة للبيئة.
          </p>
          <div className="flex items-start gap-4 p-6 bg-lime-50 rounded-2xl border border-lime-100">
            <Leaf className="text-lime-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-lime-900">طرق التسميد الذاتي (DIY Composting)</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                تجذب طرق التسميد المنزلي المستهلكين بشكل متزايد، ليس فقط لفوائدها البيئية، بل لأنها توفر خيارات منخفضة التكلفة وعالية الجودة لعشاق الزراعة المنزلية.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Royal FloraHolland', country: 'هولندا', note: 'المركز العالمي الأكبر لتجارة ومزادات الزهور' },
    { name: 'Home Depot', country: 'الولايات المتحدة', note: 'المصدر الرئيسي لمعدات وأدوات الحدائق' },
    { name: 'IKEA', country: 'السويد / عالمي', note: 'قوة بارزة في الأثاث الخارجي العملي' },
    { name: 'Lowe’s', country: 'الولايات المتحدة', note: 'منافس رئيسي في قطاع تحسين المنازل والحدائق' },
  ],

  definition: `تندرج تحت هذه الفئة جميع السلع الاستهلاكية المستخدمة في الحدائق أو الباحات الخاصة؛ ويشمل ذلك الشوايات، الزهور والنباتات، أثاث الحدائق، ومعدات الصيانة. تعد هولندا المحور العالمي الرئيسي لتجارة الزهور، حيث ترسم التوجهات السعرية والنوعية لقطاع النباتات من خلال المزادات الدولية الكبرى.`,

  industryInsights: [
    'سوق المروج والحدائق يتجه لكسر حاجز 390 مليار دولار عالمياً بحلول 2028',
    'هولندا هي القلب النابض للتجارة الدولية للزهور والنباتات عبر مزادات Royal FloraHolland',
    'الاستدامة والحلول الاقتصادية (DIY) هي المحرك الرئيسي لاختيارات المستهلكين حالياً',
    'الرقمنة مكنت تجار التجزئة من الوصول المباشر للعملاء وزيادة الحصة السوقية للأونلاين',
  ],

  tags: ['Gardening', 'Outdoor Furniture', 'Grills', 'Flowers', 'FMCG', 'Sustainability'],
};

const GardenPatioDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default GardenPatioDashboard;
