import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Wrench, Globe, TrendingUp, Cpu, Hammer } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تحسين وصيانة المنازل',
  titleEn: 'Home Improvement',
  subtitle: 'مشاريع الـ DIY، المنازل الذكية، ونمو سوق التجزئة العالمي لترقية المساحات السكنية',
  icon: Wrench,
  accent: 'indigo',
  pdfLabel: 'تقرير تحسين المنازل (PDF)',

  kpis: [
    { label: 'مبيعات التجزئة (أمريكا)', value: '544.6B', unit: 'مليار دولار أمريكي', icon: Globe },
    { label: 'مبيعات متاجر الأدوات والأجهزة', value: '39B', unit: 'مليار دولار أمريكي', icon: Hammer },
    { label: 'الرائد في السوق العالمي', value: 'Home Depot', unit: 'Value Leader', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق عالمي للتحسينات', 
      country: 'الولايات المتحدة', 
      note: 'السوق رقم 1 عالمياً بإنفاق استهلاكي مذهل يتجاوز نصف تريليون دولار ومقر لأكبر سلاسل التجزئة مثل Home Depot.',
      icon: TrendingUp
    },
    { 
      label: 'رائد سوق التجزئة الأوروبي', 
      country: 'فرنسا', 
      note: 'تقود فرنسا السوق الأوروبي في مشاريع الـ DIY بفضل Groupe Adeo الذي يمتلك علامة Leroy Merlin الشهيرة.',
      icon: Hammer
    },
    { 
      label: 'مركز ابتكار المنازل الذكية', 
      country: 'الصين', 
      note: 'تمتلك أعلى معدلات تبني للأتمتة المنزلية وتتصدر العالم في إنتاج الأجهزة المنزلية الذكية والمترابطة.',
      icon: Cpu
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'مشاريع الـ DIY', 'المنازل الذكية', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            حققت صناعة تحسين المنازل نتائج نمو ممتازة خلال السنوات الأخيرة. تشمل هذه الصناعة بيع مواد البناء، الأجهزة، الديكور، بالإضافة إلى الخدمات التي يقدمها المقاولون والحرفيون والعمال المتخصصون الذين يساعدون في بناء وتثبيت وتعديل وترقية المنازل.
          </p>
          <p>
            يمثل امتلاك المنزل جزءاً كبيراً من الاقتصاد العالمي، حيث يرغب المستهلكون في جميع أنحاء العالم في جعل منازلهم أكثر جاذبية وعملية. وفي الآونة الأخيرة، بدأ التوجه نحو تحويل المنازل إلى <strong>بيئات ذكية</strong> من خلال تقديم أجهزة متكاملة ومترابطة تقوم بأتمتة الوظائف المختلفة.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Stronger Than Ever',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                تتزايد صناعة تحسين المنازل سنوياً في معظم أجزاء العالم. في الولايات المتحدة، من المتوقع أن تتجاوز القيمة السوقية <strong>600 مليار دولار</strong> بحلول عام 2027، وهو أكثر من ضعف القيمة التي تم الوصول إليها في عام 2008.
              </p>
              <p>
                وبالمثل، يمكن ملاحظة النمو السنوي لهذه الصناعة في دول مثل المكسيك، فرنسا، ألمانيا، والعديد من البلدان الأخرى، مما يعكس مرونة هذا القطاع وقوته الاستهلاكية.
              </p>
            </div>
            <div className="p-8 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Globe size={48} className="text-indigo-600 mb-4" />
               <p className="text-2xl font-black text-indigo-900">$600 مليار</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">تقديرات عام 2027</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'diy-projects',
      title: 'مشاريع الـ DIY',
      subtitle: 'Interior Room Remodels',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد مشاريع <strong>"افعلها بنفسك" (DIY)</strong> جزءاً كبيراً من سوق تحسين المنازل. يعد تجديد الغرف الداخلية وتزيين المنازل من بين الأنشطة المفضلة لدى المستهلكين.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-indigo-400">9 سنوات</p>
              <p className="text-sm font-semibold text-slate-300 mt-2">تجديد الغرف هو المشروع الأكثر تكراراً</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-slate-300">Popular</p>
              <p className="text-sm font-semibold text-slate-400 mt-2">ترقيات الأنظمة المنزلية والواجهات الخارجية</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'High-Tech & Smart Homes',
      content: (
        <div className="space-y-6">
          <p>
            اكتسبت المنازل الذكية زخماً سريعاً في السنوات القليلة الماضية. لقد ثبت أن إدخال التكنولوجيا في تحسين المنازل مفيد لأصحاب البيوت حيث أصبحت مساحاتهم المعيشية أكثر أماناً، تسلية، وكفاءة في استخدام الطاقة.
          </p>
          <div className="flex items-start gap-4 p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
            <Cpu className="text-indigo-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-indigo-900">ريادة آسيوية في التكنولوجيا</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                تعد الصين والهند وكوريا الجنوبية من بين الدول التي تمتلك أعلى معدلات ملكية للتكنولوجيا الذكية، سواء للأجهزة الكبيرة (مثل الثلاجات والغسالات) أو الصغيرة (مثل ماكينات القهوة والميكروويف).
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'The Home Depot', country: 'الولايات المتحدة', note: 'قيمة الماركة تتجاوز 61 مليار دولار' },
    { name: 'Lowe’s', country: 'الولايات المتحدة', note: 'المنافس الأكبر لـ Home Depot في أمريكا' },
    { name: 'Groupe Adeo', country: 'فرنسا', note: 'الرائد الأول في سوق الـ DIY الأوروبي' },
    { name: 'Kingfisher', country: 'المملكة المتحدة', note: 'من قادة السوق الأوروبي والعالمي' },
    { name: 'Ace Hardware', country: 'الولايات المتحدة', note: 'أكبر تعاونية لتجار التجزئة في العالم' },
  ],

  definition: `تقدم فئة تحسين المنازل رؤى حول المشاريع التي ينفذها أصحاب المنازل؛ بما في ذلك أعمال الحدائق، الديكور، وأي تعديلات داخلية أو خارجية. تركز الصناعة على سلوك المستهلك وتوفر بيانات شاملة عن تجار التجزئة والمصنعين للأدوات والمعدات المنزلية.`,

  industryInsights: [
    'سوق تحسين المنازل الأمريكي في طريقه لتجاوز 600 مليار دولار بحلول 2027',
    'مشاريع الـ DIY (افعلها بنفسك) تشهد اهتماماً غير مسبوق لخفض التكاليف وزيادة القيمة الجمالية',
    'التحول نحو المنازل الذكية (Smart Homes) هو المحرك الأسرع نمواً في مبيعات الأجهزة الفائقة',
    'الريادة الآسيوية في دمج الأتمتة المنزلية ترسم معالم مستقبل الصناعة العالمي',
  ],

  tags: ['Home Improvement', 'DIY', 'Smart Home', 'Interior Design', 'Retail', 'Home Automation'],
};

const HomeImprovementDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default HomeImprovementDashboard;
