import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Activity, Watch, Smartphone, BarChart3, TrendingUp, Globe, ShoppingBag, Heart } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الرياضة واللياقة البدنية',
  titleEn: 'Sports & Fitness Industry',
  subtitle: 'تحليل قطاع الصالات الرياضية، الأجهزة القابلة للارتداء (Wearables)، معدات الرياضة للهواة والملابس الرياضية',
  icon: Activity,
  accent: 'blue',
  pdfLabel: 'تقرير اللياقة والصحة (PDF)',

  kpis: [
    { label: 'إيرادات الرياضة عالمياً', value: '355', unit: 'مليار $', icon: Globe },
    { label: 'سوق الجيم (أمريكا)', value: '32.02', unit: 'مليار $', icon: BarChart3 },
    { label: 'عدد الصالات الرياضية (أمريكا)', value: '31k+', unit: 'نادي', icon: Activity },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق لمعدات اللياقة والملابس', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أضخم قاعدة مستهلكين للسلع الرياضية الفاخرة، والصالات الرياضية، والابتكارات التقنية في اللياقة.',
      icon: ShoppingBag
    },
    { 
      label: 'رائد التكنولوجيا الرياضية القابلة للارتداء', 
      country: 'الولايات المتحدة / كوريا الجنوبية', 
      note: 'موطن لأكبر شركات الساعات الذكية (Apple, Samsung) التي تقود سوق مراقبة الصحة والنشاط البدني.',
      icon: Watch
    },
    { 
      label: 'سوق النمو الرياضي الجماهيري', 
      country: 'أوروبا (ألمانيا / بريطانيا)', 
      note: 'تتميز بمعدلات مشاركة عالية في الرياضات المجتمعية ونمو مضطرد في سلاسل النوادي الصحية منخفضة التكلفة.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'سوق اللياقة والنوادي', 'التكنولوجيا القابلة للارتداء', 'القادة والعلامات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'اللياقة كمحرك صحي واقتصادي',
      subtitle: 'Fitness & The Global Economy',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            الرياضة واللياقة البدنية ليست حيوية لصحة الأمة فحسب، بل لاقتصادها أيضاً. في حين تساهم الرياضة الاحترافية بشكل كبير، تلعب رياضة الهواة دوراً رئيسياً عبر استهلاك السلع المرتبطة بالرياضة مثل الملابس والمعدات، والتي تمثل صناعة بحد ذاتها.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Watch className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الثورة الرقمية في اللياقة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  مع تقدم التكنولوجيا، تأثرت اللياقة بأسواق جديدة مثل الصحة الرقمية، الأجهزة القابلة للارتداء (Smartwatches)، وتطبيقات اللياقة التي سهلت ممارسة الرياضة في المنزل.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'سوق الجيم والنمو المستمر',
      subtitle: 'Health & Gym Club Growth',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد صناعة النوادي الصحية والرياضية مربحة للغاية، حيث تبلغ قيمتها أكثر من 30 مليار دولار في الولايات المتحدة وحدها. كما يمثل القطاع سوقاً متنامياً للتوظيف، حيث يتجاوز عدد العاملين فيه 900 ألف شخص.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Smartphone className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">تطبيقات اللياقة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يستخدم أكثر من ثلث المستهلكين في الأسواق المتقدمة تطبيقات لمراقبة نشاطهم البدني وتغذيتهم.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Heart className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الرياضات الشعبية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">زادت شعبية الجري والمشي كطرق مجانية وفعالة للحفاظ على الصحة خاصة بعد إغلاقات الصالات الماضية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'wearables-brands',
      title: 'الساعات الذكية والعلامات التجارية',
      subtitle: 'Wearables & Leading Sports Brands',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تواصل الساعات الذكية نموها القوي مع توقعات بتجاوز إيراداتها 60 مليار دولار بحلول 2027. وعلى صعيد العلامات التجارية، تظل نايكي هي الشركة الأكثر قيمة بمبيعات تتجاوز 40 مليار دولار سنوياً.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShoppingBag className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الملابس الرياضية (Apparel)</p>
                <p className="text-sm text-slate-400">تهيمن Nike و Adidas على السوق، مع تحول ملحوظ نحو استخدام المواد المستدامة والمعاد تدويرها في التصنيع.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Watch className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الصحة الرقمية (mHealth)</p>
                <p className="text-sm text-slate-400">أصبحت الأجهزة القابلة للارتداء ضرورة لمراقبة ضربات القلب، جودة النوم، والنشاط اليومي بدقة عالية.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Nike', country: 'USA', note: 'أثمن علامة تجارية رياضية في العالم ورائدة في ابتكار الأحذية والملابس الرياضية' },
    { name: 'Planet Fitness', country: 'USA', note: 'واحدة من أكبر سلاسل الصالات الرياضية من حيث عدد المنتسبين والنوادي عالمياً' },
    { name: 'Apple Watch', country: 'USA', note: 'تتصدر سوق الساعات الذكية والأجهزة التقنية القابلة للارتداء لمراقبة الصحة' },
    { name: 'Peloton', country: 'USA', note: 'أحدثت ثورة في اللياقة المنزلية التفاعلية عبر دراجاتها ومنصتها الرقمية' },
  ],

  definition: 'تغطي صناعة الرياضة واللياقة الاتجاهات في المشاركة الرياضية، التغذية، الملابس، والمعدات، بالإضافة إلى سوق النوادي الصحية والصناعات التقنية الداعمة لها.',

  industryInsights: [
    'سوق اللياقة المنزلية مستمر في النمو كخيار مكمل لزيارات الصالات الرياضية التقليدية',
    'الذكاء الاصطناعي مدمج الآن في تطبيقات التمرين لتوفير "مدرب شخصي" افتراضي لكل مستخدم',
    'الاهتمام بالملابس الرياضية "اليومية" (Athleisure) زاد من حجم مبيعات شركات الألبسة الرياضية عالمياً',
  ],

  tags: ['Sports', 'Fitness', 'Gym', 'Wearables', 'Smartwatch', 'Nike', 'Fitness Apps'],
};

const SportsFitnessDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default SportsFitnessDashboard;
