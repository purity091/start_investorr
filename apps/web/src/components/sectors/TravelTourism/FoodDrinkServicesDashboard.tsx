import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Utensils, Globe, BarChart3, TrendingUp, ShieldCheck, Smartphone, Zap, Coffee } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'خدمات الأطعمة والمشروبات',
  titleEn: 'Food & Drink Services',
  subtitle: 'تحليل قطاع المطاعم، خدمات التوصيل عبر الإنترنت، المقاهي، وتطور مطابخ الأشباح (Ghost Kitchens)',
  icon: Utensils,
  accent: 'blue',
  pdfLabel: 'تقرير الأطعمة والمشروبات (PDF)',

  kpis: [
    { label: 'حجم السوق العالمي', value: '2.52', unit: 'تريليون $', icon: Globe },
    { label: 'المدينة الأكثر نجوماً (Michelin)', value: 'Tokyo', unit: 'City', icon: Zap },
    { label: 'العلامة الأثمن (McDonald\'s)', value: '1', unit: 'Market Value', icon: ShieldCheck },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق لمطاعم الخدمة السريعة', 
      country: 'الولايات المتحدة', 
      note: 'مقر كبرى السلاسل العالمية (McDonald\'s, Starbucks) وتسيطر على ثقافة استهلاك الوجبات السريعة عالمياً.',
      icon: Utensils
    },
    { 
      label: 'عاصمة فنون الطهي المرموقة', 
      country: 'اليابان (طوكيو)', 
      note: 'تضم أكبر عدد من المطاعم الحاصلة على نجوم ميشلان في العالم وتعد وجهة رائدة للسياحة الغذائية الراقية.',
      icon: Zap
    },
    { 
      label: 'أضخم سوق لخدمات التوصيل الرقمي', 
      country: 'الصين', 
      note: 'تتصدر العالم في حجم معاملات طلبات الطعام عبر التطبيقات وتمتلك أضخم شبكة "مطابخ أشباح" تشغيلية.',
      icon: Smartphone
    }
  ],

  navItems: ['نظرة عامة', 'الخدمة السريعة vs الكاملة', 'التوصيل والرقمنة', 'القادة والتوجهات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'تحول جذري في تجربة الطعام',
      subtitle: 'A Paradigm Shift in Dining',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            واجه قطاع الأطعمة والمشروبات تغييرات غير مسبوقة مدفوعة بالرقمنة القسرية. تحول التركيز من تناول الطعام داخل المطعم إلى خدمات التوصيل عبر الإنترنت والطلبات الخارجية. وبقيمة سوقية تتجاوز 2.5 تريليون دولار، يستمر القطاع في الازدهار مع بروز مفاهيم جديدة للأعمال.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Smartphone className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">ازدهار "مطابخ الأشباح"</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  ترسخت مكانة المطاعم التي تركز حصرياً على الطهي للتوصيل دون استقبال زوار، مما يقلل التكاليف التشغيلية ويركز على سرعة التوصيل.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'مطاعم الخدمة السريعة (QSR)',
      subtitle: 'Quick Service Restaurants Dominance',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أثبتت مطاعم الخدمة السريعة (مثل McDonald's و Starbucks) مرونة هائلة بفضل جاهزيتها الرقمية السابقة للأزمة. وفي المقابل، عانت المطاعم ذات الخدمة الكاملة (FSR) والحياة الليلية بشكل أكبر، مما دفعها لتبني حلول تقنية مثل القوائم التفاعلية عبر الواقع المعزز (AR).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Coffee className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">عمالقة المقاهي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تظل Starbucks العلامة المهيمنة عالمياً، مع تحول متزايد نحو القهوة المستدامة والأخلاقية المصدر.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق التوصيل عبر الإنترنت</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">من المتوقع أن ينمو سوق توصيل الطعام بمعدلات تفوق التقديرات السابقة، ليصبح ركيزة أساسية في إيرادات المطاعم.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'التوجهات الاستهلاكية والتقنية',
      subtitle: 'Consumer Trends & Tech Innovation',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            مع عودة الزوار لتناول الطعام في الأماكن المغلقة، برزت توجهات جديدة تركز على الخيارات النباتية (Vegan) والاستدامة البيئية. كما بدأت التكنولوجيا تتدخل في العروض عبر جولات افتراضية داخل المطاعم لتعزيز ثقة وولاء العملاء.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Utensils className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">النظام الغذائي النباتي</p>
                <p className="text-sm text-slate-400">تحقق المدن التي تضم أكبر نسبة من المطاعم الصديقة للنباتيين نمواً أسرع في جذب جيل الألفية والجيل Z.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShieldCheck className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">معايير النظافة الفائقة</p>
                <p className="text-sm text-slate-400">أصبحت الشفافية في التدابير الصحية مطلباً أساسياً للمستهلكين عند اختيار وجهات الطعام.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'McDonald\'s', country: 'USA', note: 'الشركة الأكبر عالمياً في سوق الخدمة السريعة من حيث القيمة السوقية ومدى الانتشار' },
    { name: 'Starbucks', country: 'USA', note: 'المتصدر العالمي في قطاع المقاهي والمشروبات المتخصصة مع ريادة في طلبات الجوال' },
    { name: 'Yum! Brands', country: 'USA', note: 'تمتلك علامات مثل KFC و Pizza Hut و Taco Bell مع حصص سوقية عملاقة عالمياً' },
    { name: 'Yum China Holdings', country: 'China', note: 'المشغل الأكبر لخدمات الأطعمة في آسيا مع نموذج أعمال فريد ومستقل' },
  ],

  definition: 'تشمل صناعة خدمات الأطعمة والمشروبات عمليات إعداد وتقديم الأكل والشرب للعملاء، وتضم المطاعم، المقاهي، الحانات، ونوادي الترفيه.',

  industryInsights: [
    'التوصيل عبر الإنترنت لم يعد مجرد خدمة إضافية، بل تحول لنموذج عمل أساسي لضمان استمرارية الربحية',
    'المطاعم الراقية الحاصلة على نجوم ميشلان تتركز بكثافة في طوكيو، باريس، ونيويورك كوجهات سياحية غذائية',
    'تخصيص الوجبات عبر الذكاء الاصطناعي يُتوقع أن يكون الموجة القادمة في تطبيقات طلب الطعام لزيادة متوسط قيمة الطلب',
  ],

  tags: ['Food Services', 'Restaurants', 'McDonalds', 'Starbucks', 'Food Delivery', 'Ghost Kitchens', 'Michelin'],
};

const FoodDrinkServicesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default FoodDrinkServicesDashboard;
