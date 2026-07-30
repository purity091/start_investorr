import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Sparkles, Globe, Shirt, DollarSign } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'منتجات التنظيف والعناية المنزلية',
  titleEn: 'Cleaning Products',
  subtitle: 'النظافة، التعقيم، والابتكار المستدام في عصر الوعي الصحي المتزايد',
  icon: Sparkles,
  accent: 'cyan',
  pdfLabel: 'تقرير منتجات التنظيف (PDF)',

  kpis: [
    { label: 'إيرادات المنظفات المنزلية عالمياً', value: '42B', unit: 'مليار دولار أمريكي', icon: Globe },
    { label: 'القطاع الأكثر مبيعاً واستقطاباً', value: 'أدوات الغسيل', unit: 'Laundry Care', icon: Shirt },
    { label: 'مبيعات العناية المنزلية في أمريكا', value: '31.3B', unit: 'مليار دولار أمريكي', icon: DollarSign },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق استهلاكي عالمي', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أعلى معدل إنفاق للفرد على منتجات العناية المنزلية والتعقيم عالمياً.',
      icon: DollarSign
    },
    { 
      label: 'سوق النمو الهائل', 
      country: 'الصين', 
      note: 'تشهد طفرة في الطلب على المنظفات المتميزة نتيجة ارتفاع الوعي الصحي لدى الطبقة المتوسطة.',
      icon: Globe
    },
    { 
      label: 'رائد المنتجات المستدامة', 
      country: 'ألمانيا', 
      note: 'أكبر سوق أوروبي لمنتجات التنظيف الصديقة للبيئة والشركات الكيميائية المبتكرة.',
      icon: Sparkles
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
            يستمر الطلب على منتجات التنظيف في النمو المستمر، ويرجع ذلك جزئياً إلى وعي المستهلكين المتزايد بشأن أهمية النظافة وانتشار الأمراض المعدية. يستفيد السوق العالمي من التركيز المتزايد على أهمية الظروف الصحية والحاجة لتعقيم الأسطح المنزلية.
          </p>
          <p>
            تعد "الملاءمة وسهولة الاستخدام" من أهم عوامل الجذب للمطهرات متعددة الأغراض، حيث أصبح وقت المستهلكين ضيقاً جداً للقيام بالأعمال المنزلية، لكنهم يتوقون في الوقت ذاته إلى الحفاظ على معايير عالية من النظافة.
          </p>
          <p>
            سيلعب التسويق والابتكار دوراً هاماً خلال السنوات القادمة. يجب أن تحافظ الشركات المصنعة على جهود إعلانية مستمرة لتعزيز صورة الماركة وحضورها. الأهم من ذلك، يتمثل التحدي الحالي في تمديد خطوط الإنتاج لتشمل خيارات حِزَم ومنتجات طبيعية وصديقة للبيئة لمواكبة تطور المستهلكين الحتمي.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Steady Global Growth',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                في عام 2023، بلغت قيمة السوق العالمي للمنظفات المنزلية حوالي <strong>42 مليار دولار أمريكي</strong>. وتتوسع قيمة هذا السوق بشكل كبير في السنوات الأخيرة، ومن المتوقع أن تستمر في النمو لتصل إلى ما يقرب من 47 مليار دولار أمريكي قريباً.
              </p>
              <p>
                يتكون هذا السوق العملاق من مجموعة متنوعة من المنتجات الاستهلاكية المباشرة، بما في ذلك المنظفات متعددة الأغراض، منظفات المطابخ والحمامات، المطهرات، ومنظفات الصرف الصحي.
              </p>
            </div>
            <div className="p-8 bg-cyan-50 rounded-2xl border border-cyan-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Globe size={48} className="text-cyan-600 mb-4" />
               <p className="text-2xl font-black text-cyan-900">$47 مليار</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">حجم السوق المتوقع قريباً</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق',
      subtitle: 'Laundry Care Leads the Way',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعتبر "العناية بالغسيل" (Laundry care) واحدة من أكثر القطاعات ربحية وتدفقاً نقدياً في سوق منتجات التنظيف، يليها مباشرة المنظفات المنزلية، ثم ملمعات الأسطح، معطرات الجو، والمبيدات الحشرية للاستخدام المنزلي.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-cyan-400">$17.6B</p>
              <p className="text-sm font-semibold text-slate-300 mt-2">القيمة المتوقعة لقطاع الغسيل في أمريكا (2029)</p>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-slate-300">$9.0B+</p>
              <p className="text-sm font-semibold text-slate-400 mt-2">المنظفات المنزلية العامة</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'The Rise of Sustainable Home Care',
      content: (
        <div className="space-y-6">
          <p>
            أصبحت "الاستدامة" تدريجياً من أهم العوامل المحفزة للشراء لدى المستهلكين حول العالم. وصناعة منتجات التنظيف ليست محصنة ضد هذا التحول الجذري.
          </p>
          <p>
            صرّح أكثر من <strong>30%</strong> من المستهلكين في الولايات المتحدة باستعدادهم لإنفاق المزيد من الأموال للحصول على منتجات عناية منزلية وعناية بالغسيل مستدامة (صديقة للبيئة). 
          </p>
          <p>
            أصبحت التعبئة والتغليف البيئي واستخدام مواد كيميائية أقل شيوعاً بشكل ملحوظ. وعلاوة على ذلك، بدأت حلول "اصنعها بنفسك" والمنتجات العضوية الطبيعية تكتسب زخماً واضحاً في أرفف المتاجر.
          </p>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'The Clorox Company', country: 'الولايات المتحدة', note: 'المتصدر عالمياً بصافي مبيعات 7.4 مليار دولار' },
    { name: 'Procter & Gamble', country: 'الولايات المتحدة', note: 'مظلة لأشهر علامات التنظيف الاستهلاكية' },
    { name: 'Henkel', country: 'ألمانيا', note: 'رائد ابتكارات الغسيل والتنظيف في أوروبا' },
    { name: 'Unilever', country: 'المملكة المتحدة', note: 'شبكة توزيع ضخمة للمنظفات الشخصية والمنزلية' },
    { name: 'Reckitt Benckiser', country: 'المملكة المتحدة', note: 'مالك علامات التعقيم العالمية الرائدة' },
    { name: 'Colgate-Palmolive', country: 'الولايات المتحدة', note: 'علامات تجارية عريقة في التنظيف والتعقيم' },
  ],

  definition: `يغطي سوق منتجات التنظيف السلع المصممة للاستخدام في المنازل الخاصة. يُقسم السوق إلى مجالات متعددة أبرزها: العناية بالغسيل (المنظفات ومكيفات الأقمشة)، المنظفات المنزلية (العناية بالأسطح والمطابخ والحمامات والمبيضات)، ومنظفات غسيل الأطباق. يتضمن السوق قطاعات متخصصة كالمعطرات والمبيدات الحشرية. يخضع السوق لهيمنة علامات تجارية دولية عملاقة مثل Clorox، Henkel، و P&G.`,

  industryInsights: [
    'الابتكار في التغليف المستدام وتقليل الاعتماد على البلاستيك بات أمراً إجبارياً للحفاظ على ولاء العملاء',
    'تنامي الطلب على المطهرات المنزلية كممارسة صحية اعتيادية بعد الأوبئة العالمية',
    'تصدر قطاع العناية بالغسيل (Laundry Care) قائمة إيرادات الصناعة بهامش ربحي مرتفع',
    'زيادة مقبوليّة المستهلكين لدفع أسعار إضافية (Premium) مقابل منتجات التنظيف الخضراء (اللطيفة على البيئة)',
  ],

  tags: ['Household Cleaners', 'Laundry Care', 'Disinfectants', 'Eco-friendly', 'FMCG', 'Consumer Goods'],
};

const CleaningProductsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default CleaningProductsDashboard;
