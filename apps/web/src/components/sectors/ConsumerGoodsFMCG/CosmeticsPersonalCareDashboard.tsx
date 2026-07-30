import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Heart, Globe, Award, Droplets } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'مستحضرات التجميل والعناية الشخصية',
  titleEn: 'Cosmetics & Personal Care',
  subtitle: 'الوعي الصحي، العناية بالبشرة، والتحول الملحوظ نحو المنتجات العضوية والطبيعية',
  icon: Heart,
  accent: 'pink',
  pdfLabel: 'تقرير العناية والتجميل (PDF)',

  kpis: [
    { label: 'حجم السوق العالمي', value: '626B', unit: 'مليار دولار (2023)', icon: Globe },
    { label: 'العلامة التجارية الأغلى', value: "L'Oréal", unit: 'باريس - المركز الأول', icon: Award },
    { label: 'أكبر الأسواق الإقليمية', value: '29%', unit: 'حصة أمريكا الشمالية وشمال آسيا', icon: Droplets },
  ],

  topMarkets: [
    { 
      label: 'أكبر تكتل لأسواق التجميل', 
      country: 'شمال آسيا وأمريكا الشمالية', 
      note: 'تتقاسم المنطقتان المركز الأول عالمياً بحصة 29% لكل منهما، مع نمو هائل في الصين وكوريا الجنوبية.',
      icon: Globe
    },
    { 
      label: 'عاصمة الجمال والابتكار', 
      country: 'فرنسا', 
      note: 'مقر لشركة L\'Oréal، الشركة الرائدة عالمياً، وتعتبر فرنسا المرجع الأول للعطور والمستحضرات الفاخرة.',
      icon: Award
    },
    { 
      label: 'رائد المنتجات التقنية والفائقة', 
      country: 'الولايات المتحدة', 
      note: 'تقود الابتكار في قطاع الـ Prestige والعناية المتقدمة بالبشرة والمنتجات العضوية والطبيعية.',
      icon: Droplets
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
            من المتوقع أن تسجل صناعة مستحضرات التجميل والعناية الشخصية مكاسب متزايدة ضمن جميع فئاتها، مع نمو قوي بشكل استثنائي لمنتجات "الحماية من الشمس" و"مكافحة الشيخوخة"، حيث أصبح المستهلكون أكثر وعياً بمخاطر التعرض للشمس وأكثر اهتماماً بالحفاظ على المظهر الشبابي لفترات أطول.
          </p>
          <p>
            تكتسب الدول الناشئة إمكانات ضخمة، حيث تبحث الشعوب ذات مستويات الدخل المتزايدة عن منتجات ذات جودة أفضل من تلك المنتجة محلياً بتكاليف رخيصة. وبمعنى آخر؛ زيادة الدخل تعني أن المستهلك أصبح يهتم كثيراً بفعالية المنتج والمكونات المستخدمة فيه بدلاً من البحث المنهجي عن أرخص خيار.
          </p>
          <p>
            كما نقلت "الرقمنة" صناعة التجميل إلى المملكة الإلكترونية، حيث أتيح للمتسوقين عبر الإنترنت الوصول إلى مجموعة واسعة جداً من الماركات، والتقييمات، وخيارات التوصيل السريع.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Steady Year-on-Year Growth',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                قُدرت قيمة السوق العالمي للجمال والعناية الشخصية بأكثر من <strong>620 مليار دولار أمريكي</strong> في عام 2023. ومن المتوقع أن يستمر هذا النمو لتتخطى قيمة الصناعة حاجز الـ 700 مليار دولار بحلول عام 2028.
              </p>
              <p>
                يُترجم هذا النمو المستمر إلى اهتمام المستهلكين الثابت -الذي لا يتأثر بالأزمات الاقتصادية بحدة- بالحفاظ على روتين جمالهم وعنايتهم الشخصية.
              </p>
            </div>
            <div className="p-8 bg-pink-50 rounded-2xl border border-pink-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Globe size={48} className="text-pink-600 mb-4" />
               <p className="text-2xl font-black text-pink-900">$700 مليار</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">تقديرات عام 2028</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق',
      subtitle: 'Skincare Leads the Industry',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            شكلت منتجات "العناية بالبشرة" (Skincare) وحدها ما يقارب <strong>40%</strong> من إجمالي السوق العالمي في عام 2023. واحتلت منتجات العناية بالشعر والمكياج المرتبتين الثانية والثالثة بحصص بلغت 21% و 17% على التوالي.
          </p>
          <p className="text-slate-300 mt-4 leading-relaxed">
            حدث هذا التحول الكبير نحو العناية بالبشرة بسبب تنامي اهتمام <strong>القاعدة الشبابية</strong>، حيث بدأ الناس باستخدام روتين العناية بالبشرة في سن مبكرة جداً كمحاولة استباقية لتأخير علامات الشيخوخة.
          </p>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'All-Natural & Organic Demand',
      content: (
        <div className="space-y-6">
          <p>
            بدأ المستهلكون بالتسوق بطريقة أكثر وعياً واستدامة، مفضلين منتجات التجميل والعناية الشخصية <strong>الطبيعية بالكامل</strong>، أو تلك التي تحمل ملصقات "خالية من الكيماويات" (Chemical-free) و "عضوية" (Organic).
          </p>
          <div className="bg-pink-50 p-6 rounded-2xl border border-pink-100">
             <p className="text-lg font-bold text-pink-900 mb-2">الإيرادات المذهلة للمنتجات العضوية</p>
             <p className="text-slate-700">
               بلغت الإيرادات العالمية لسوق مستحضرات التجميل الطبيعية والعضوية حوالي <strong>13 مليار دولار أمريكي</strong> في عام 2023، مع توقعات بقفزة هائلة بحلول نهاية العقد.
             </p>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: "L'Oréal", country: 'فرنسا', note: 'المتصدر المطلق بأكثر من 40 مليار استرليني إيرادات' },
    { name: 'Unilever', country: 'المملكة المتحدة', note: 'المنافس الأقرب في المرتبة الثانية' },
    { name: 'Estée Lauder Cos.', country: 'الولايات المتحدة', note: 'مظلة عملاقة للمستحضرات الفائقة (Prestige)' },
    { name: 'Procter & Gamble', country: 'الولايات المتحدة', note: 'منتجات عناية بالبشرة والأسنان والشعر الاستهلاكية' },
    { name: 'LVMH', country: 'فرنسا', note: 'رواد الفخامة والعطور والمستحضرات الراقية' },
    { name: 'Beiersdorf', country: 'ألمانيا', note: 'الشركة المالكة لعلامة Nivea وغيرها' },
  ],

  definition: `ينقسم سوق مستحضرات التجميل والعناية الشخصية عادةً إلى خمس شرائح رئيسية: العناية بالبشرة (وهي الأضخم)، العناية بالشعر، المكياج والتجميل، العطور، وأدوات النظافة الشخصية. هذه القطاعات متكاملة وتلبي بتنوعها كافة تطلعات المستهلكين. تُقسم كذلك المنتجات حسب مدى رقيها إلى قطاع فخم (Premium) وقطاع جماهيري (Mass Production). وتسيطر شركة لوريال (L'Oréal) على طليعة الشركات المُصنعة لهذه المستحضرات حول العالم.`,

  industryInsights: [
    'أمريكا الشمالية وشمال آسيا تتقاسمان المركز الأول كأكبر أسواق الجمال في العالم بحصة 29% لكليهما',
    'العناية بالبشرة تستحوذ على حوالي نصف الكعكة الاستهلاكية للصناعة (40%)',
    'ثورة المستحضرات العضوية والطبيعية تستقطب انتباه الأجيال الجديدة بقوة',
    'انتقال هائل للمبيعات نحو قنوات التجارة الإلكترونية التي توفر خيارات أوسع وتقييمات موثوقة',
  ],

  tags: ['Skincare', 'Haircare', 'Organic Beauty', 'Anti-aging', 'FMCG', 'Personal Care'],
};

const CosmeticsPersonalCareDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default CosmeticsPersonalCareDashboard;
