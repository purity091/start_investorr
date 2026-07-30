import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Shirt, Globe, TrendingUp, ShoppingBag, Award } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الملابس والأحذية',
  titleEn: 'Apparel & Shoes',
  subtitle: 'صناعة الأزياء العالمية، المنسوجات، والتحول نحو الاستدامة والموضة السريعة',
  icon: Shirt,
  accent: 'rose',
  pdfLabel: 'تقرير قطاع الملابس (PDF)',

  kpis: [
    { label: 'سوق الملابس العالمي', value: '1.5T', unit: 'تريليون دولار أمريكي', icon: Globe },
    { label: 'معدل نمو تجارة الملابس أونلاين', value: '11.5%', unit: 'نمو سنوي متوقع', icon: TrendingUp },
    { label: 'رائد السوق العالمي (إيرادات)', value: 'LVMH', unit: 'في السلع الفاخرة', icon: Award },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق مبيعات عالمي', 
      country: 'الولايات المتحدة', 
      note: 'السوق الأول عالمياً من حيث الإنفاق الاستهلاكي على الملابس والأحذية.',
      icon: TrendingUp
    },
    { 
      label: 'عملاق الإنتاج والطلب', 
      country: 'الصين', 
      note: 'تتصدر العالم في تصنيع المنسوجات وتمثل أضخم سوق نمو استهلاكي ناشئ.',
      icon: Globe
    },
    { 
      label: 'مركز الموضة الأوروبي', 
      country: 'ألمانيا', 
      note: 'أكبر سوق مبيعات للملابس في أوروبا ومركز ريسيسي لتجارة الملابس والتوزيع.',
      icon: ShoppingBag
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'قطاعات السوق', 'الموضة المستدامة', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد صناعة الملابس والأحذية واحدة من أكبر القطاعات الاستهلاكية في العالم. وهي تشمل كل شيء بدءاً من المنسوجات والمواد الخام المستخدمة في الإنتاج وحتى تجارة التجزئة للمنتجات النهائية.
          </p>
          <p>
            تتأثر هذه الصناعة بشدة بالاتجاهات الدورية، وتغير أذواق المستهلكين، والقوة الشرائية. في السنوات الأخيرة، أحدثت <strong>الموضة السريعة (Fast Fashion)</strong> ثورة في سرعة وصول التصاميم من منصات العرض إلى المستهلك النهائي.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Global Fashion Market Value',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                يُقدر حجم سوق الملابس العالمي بحوالي <strong>1.5 تريليون دولار أمريكي</strong>، ومن المتوقع أن يستمر في النمو مدفوعاً بزيادة الطلب في الأسواق الآسيوية والاقتصاديات الناشئة.
              </p>
              <p>
                تمثل الملابس النسائية الجزء الأكبر من هذا السوق، تليها ملابس الرجال ثم ملابس الأطفال. أما قطاع الأحذية، فيشهد نمواً انفجارياً في فئة "الأحذية الرياضية" (Sneakers) التي تحولت من مجرد أداة رياضية إلى أيقونة للموضة اليومية.
              </p>
            </div>
            <div className="p-8 bg-rose-50 rounded-2xl border border-rose-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <ShoppingBag size={48} className="text-rose-600 mb-4" />
               <p className="text-2xl font-black text-rose-900">$1.5T</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">حجم السوق العالمي</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق: الفخامة vs الموضة السريعة',
      subtitle: 'Luxury vs High Street',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            ينقسم السوق بشكل حاد بين قطاع السلع الفاخرة (Luxury) الذي تقوده شركات مثل <strong>LVMH</strong> ومجموعة <strong>Kering</strong>، وبين قطاع الموضة السريعة الذي تهيمن عليه علامات مثل <strong>Inditex (Zara)</strong> و <strong>H&M</strong>.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-rose-400">الملابس الرياضية</p>
              <p className="text-sm text-slate-300 mt-2">قطاع "Athleisure" يدمج بين الراحة والأناقة وهو المحرك الأقوى لنمو مبيعات الشباب.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-rose-400">التجارة الإلكترونية</p>
              <p className="text-sm text-slate-300 mt-2">أصبح الأونلاين القناة الأولى لشركات الأزياء الحديثة مثل SHEIN و ASOS.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الاستدامة',
      subtitle: 'Eco-Fashion and Resale',
      content: (
        <div className="space-y-6">
          <p>
            يواجه القطاع ضغوطاً متزايدة لتبني ممارسات مستدامة. بدأت العلامات التجارية في استخدام مواد معاد تدويرها وتقليل استهلاك المياه في الإنتاج لمواجهة الانتقادات البيئية.
          </p>
          <div className="flex items-start gap-4 p-6 bg-rose-50 rounded-2xl border border-rose-100">
            <TrendingUp className="text-rose-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-rose-900">سوق إعادة البيع</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                شهدت "الموضة المستعملة" نمواً يفوق نمو التجزئة التقليدية بـ 11 ضعفاً، مما يعكس تحولاً في عادات الاستهلاك نحو "الاقتصاد الدائري".
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Inditex (Zara)', country: 'إسبانيا', note: 'الرائد العالمي في الموضة السريعة' },
    { name: 'LVMH', country: 'فرنسا', note: 'المظلة الأكبر للعلامات التجارية الفاخرة' },
    { name: 'Nike', country: 'الولايات المتحدة', note: 'المتصدر المطلق في سوق الأحذية والملابس الرياضية' },
    { name: 'H&M Group', country: 'السويد', note: 'ثاني أكبر بائع تجزئة للملابس في العالم' },
    { name: 'UNIQLO (Fast Retailing)', country: 'اليابان', note: 'رائد الملابس الوظيفية والأساسية' },
  ],

  definition: `تغطي صناعة الملابس والأحذية إنتاج وبيع المنتجات الملبوسة؛ بما في ذلك الملابس الخارجية، الداخلية، الأحذية، والإكسسوارات. ترتكز الصناعة على سلاسل توريد عالمية معقدة تبدأ من زراعة القطن أو تصنيع الألياف الصناعية وتنتهي في المتاجر الفاخرة أو المنصات الرقمية.`,

  industryInsights: [
    'الأحذية الرياضية (Sneakers) تحولت إلى فئة استثمارية ومنتجات تجمع بين الوظيفة والأناقة القصوى',
    'التحول الرقمي جعل من SHEIN القوة الصاعدة الأسرع في تاريخ تجزئة الملابس',
    'الاستدامة والأزياء الأخلاقية لم تعد خياراً بل ضرورة للبقاء في الأسواق المتقدمة',
    'آسيا هي المحرك الأول للإنتاج بفضل قاعدة التصنيع في الصين وفيتنام وبنغلاديش',
  ],

  tags: ['Fashion', 'Apparel', 'Shoes', 'Luxury', 'Retail', 'Fast Fashion', 'Sustainability'],
};

const ApparelShoesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ApparelShoesDashboard;
