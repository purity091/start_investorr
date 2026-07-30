import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Landmark, Globe, TrendingUp, Zap, AlertCircle } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الاقتصاد العالمي والمؤشرات الكلية',
  titleEn: 'Global Economy',
  subtitle: 'تحولات القوى الاقتصادية الكبرى، تحديات التضخم، والتحول نحو الاقتصاد الرقمي والأخضر',
  icon: Landmark,
  accent: 'slate',
  pdfLabel: 'تقرير الاقتصاد العالمي (PDF)',

  kpis: [
    { label: 'أكبر ناتج محلي إجمالي (الولايات المتحدة)', value: '25T+', unit: 'تريليون دولار أمريكي', icon: Globe },
    { label: 'أعلى ناتج محلي للفرد (لوكسمبورج)', value: 'Top', unit: 'GDP per Capita', icon: Landmark },
    { label: 'أعلى معدل تضخم (الأرجنتين)', value: 'Critical', unit: 'تحدي تضخمي كبير', icon: AlertCircle },
  ],

  topMarkets: [
    { 
      label: 'أكبر اقتصاد في العالم', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر القائمة بناتج محلي يتجاوز 25 تريليون دولار وتهيمن على النظام المالي العالمي.',
      icon: Globe
    },
    { 
      label: 'المصنع الأكبر عالمياً', 
      country: 'الصين', 
      note: 'ثاني أكبر اقتصاد والقوة التصنيعية الأولى، وتقود النمو في الأسواق الناشئة.',
      icon: Landmark
    },
    { 
      label: 'المركز الثالث اقتصادياً', 
      country: 'اليابان', 
      note: 'اقتصاد متطور يعتمد على التكنولوجيا والتصدير ويعد من أكثر الأسواق استقراراً.',
      icon: TrendingUp
    }
  ],

  navItems: ['نظرة عامة', 'رؤى اقتصادية', 'تحدي التضخم', 'العولمة والصدمات', 'صعود الصين', 'مؤشرات العمالة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            شهد الاقتصاد العالمي تحولات كبرى في العقود الأولى من القرن الحادي والعشرين. وبينما تظل الولايات المتحدة أكبر اقتصاد في العالم بناتج محلي يتجاوز <strong>25 تريليون دولار</strong>، فإن الصين تقترب بسرعة مدفوعة بقوتها التصنيعية الهائلة.
          </p>
          <p>
            لا تقتصر التغيرات على هرمية القوى فحسب، بل تمتد لطبيعة الإنتاج؛ حيث يتطلب <strong>الاقتصاد الرقمي</strong> مهارات أعلى، وتواجه الوظائف الروتينية خطر الأتمتة. كما يبرز "التحول الأخضر" كأهم قضية اقتصادية للقرن القادم، مع محاولات جعل النمو الاقتصادي متوافقاً مع الاستدامة البيئية.
          </p>
        </div>
      ),
    },
    {
      id: 'inflation',
      title: 'التحدي الاقتصادي: عودة التضخم',
      subtitle: 'The Return of Inflation',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                شهدت بداية عشرينيات القرن الحالي عودة التضخم، وهو اتجاه اقتصادي غير مرغوب فيه يتمثل في ارتفاع المستوى الإجمالي لكافة الأسعار.
              </p>
              <p>
                أدت جائحة كورونا إلى هذه الطفرة من خلال مشاكل سلاسل التوريد، نقص العمالة، والتحول نحو استهلاك السلع. ويظل السؤال الأكبر للعقد الحالي هو مدى قدرة البنوك المركزية على السيطرة على التضخم دون التسبب في ضرر اقتصادي هائل.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <TrendingUp size={48} className="text-slate-600 mb-4" />
               <p className="text-2xl font-black text-slate-900">CPI Index</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">مؤشر أسعار المستهلك</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'globalization',
      title: 'العولمة والصدمات',
      subtitle: 'Globalization Persistence',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            على الرغم من بعض الانتكاسات الناجمة عن الأزمات المالية والسياسية التي أدت لزيادة تجزئة الاقتصاد العالمي، إلا أن <strong>العولمة الاقتصادية</strong> لا تزال مستمرة.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-slate-400">التجارة العالمية</p>
              <p className="text-sm text-slate-300 mt-2">تستمر تدفقات السلع والتمويل في الزيادة، مما يثبت صمود العولمة رغم الصدمات الجيوسياسية.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-slate-400">التحول الرقمي</p>
              <p className="text-sm text-slate-300 mt-2">رقمنة الخدمات تسمح بالعمل عابر الحدود وتخلق سوق عمل عالمياً موحداً للمهارات العالية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'china-rise',
      title: 'صعود الصين كقوة عظمى',
      subtitle: 'China as an Economic Superpower',
      content: (
        <div className="space-y-6">
          <p>
            من المتوقع أن تتجاوز الصين الولايات المتحدة كأكبر اقتصاد في العالم في العقد القادم. هذا ليس مجرد تغيير اقتصادي، بل هو تحول في النظام السياسي العالمي؛ حيث ستكون المنافسة الاقتصادية بين البلدين هي الحقيقية المحددة للقرن الحادي والعشرين.
          </p>
          <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <Zap className="text-slate-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-slate-900">توسيع نطاق الثروات</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                يساهم ارتفاع ثروات ودخل المواطنين الصينيين في تشكيل ملامح التجارة العالمية، من استهلاك السلع الفاخرة إلى الاستثمارات الخارجية الضخمة.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'الولايات المتحدة', country: 'Global Leader', note: 'المتصدر في الناتج المحلي الإجمالي والابتكار التقني' },
    { name: 'الصين', country: 'Rising Superpower', note: 'أكبر مصنع ومصدر للسلع في العالم' },
    { name: 'الاتحاد الأوروبي', country: 'Regional Bloc', note: 'أكبر تكتل تجاري واقتصادي موحد' },
    { name: 'الهند', country: 'Emerging Giant', note: 'أحد أسرع الاقتصادات الكبرى نمواً في العقد الأخير' },
  ],

  definition: `يوفر قطاع الاقتصاد مجموعة من المؤشرات على المستوى الوطني والإقليمي والعالمي؛ تشمل الناتج المحلي الإجمالي وقيم العلاقات التجارية والتضخم العالمي. كما يغطي بيانات سوق العمل كالأجور والتوظيف وساعات العمل ومقاييس الرفاهية الاقتصادية.`,

  industryInsights: [
    'الولايات المتحدة تحافظ على صدارة الناتج المحلي الإجمالي بـ 25 تريليون دولار، مع صعود صاروخي للصين',
    'التضخم العالمي يمثل التحدي النقدي الأكبر للبنوك المركزية في مرحلة ما بعد الجائحة',
    'التحول نحو الاقتصاد الأخضر سيغير تدفقات الاستثمار العالمية نحو الطاقة المتجددة والاستدامة',
    'النمو في الصين لا يغير موازين الاقتصاد فحسب، بل يعيد تشكيل النظام السياسي العالمي بالكامل',
  ],

  tags: ['Economy', 'GDP', 'Inflation', 'Globalization', 'China Economy', 'Green Transition', 'Digital Economy'],
};

const EconomyDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default EconomyDashboard;
