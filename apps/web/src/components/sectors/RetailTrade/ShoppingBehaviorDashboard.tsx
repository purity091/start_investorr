import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Users, Heart, Zap, Globe, BarChart3, TrendingUp, ShoppingBag, AlertCircle } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'سلوك التسوق والمستهلك',
  titleEn: 'Shopping Behavior & Consumer Trends',
  subtitle: 'تحليل دوافع الشراء، تأثير التضخم على الإنفاق، الفروق بين جيل Z والأجيال السابقة، ومواسم التسوق الكبرى',
  icon: Users,
  accent: 'indigo',
  pdfLabel: 'تقرير سلوك المستهلك العالمي (PDF)',

  kpis: [
    { label: 'إنفاق الفرد في عيد الحب (أمريكا)', value: '190', unit: '$', icon: Heart },
    { label: 'نسبة Gen Z (ضد الموضة السريعة)', value: '13%', icon: Users },
    { label: 'الحدث الأعلى إنفاقاً (أمريكا)', value: 'العودة للكليات', icon: ShoppingBag },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق أحداث تسوق', 
      country: 'الصين', 
      note: 'موطن لأكبر حدث تسوق في العالم "يوم العزاب" (Singles\' Day) الذي يحطم أرقام المبيعات العالمية سنوياً.',
      icon: TrendingUp
    },
    { 
      label: 'محرك اتجاهات الاستهلاك', 
      country: 'الولايات المتحدة', 
      note: 'تقود سلوكيات التسوق الرقمي ومواسم "البلاك فرايدي"، وتؤثر عادات استهلاكها على السوق العالمي بالكامل.',
      icon: Globe
    },
    { 
      label: 'رائد الوعي الاستهلاكي', 
      country: 'المملكة المتحدة', 
      note: 'تتميز بأعلى معدلات البحث عن العلامات المستدامة والتحول نحو الاقتصاد الدائري في التسوق.',
      icon: Users
    }
  ],

  navItems: ['نظرة عامة', 'تجارة إلكترونية vs تقليدية', 'تأثير التضخم', 'مواسم التسوق', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'محركات القرار الشرائي',
      subtitle: 'Factors Influencing Purchasing Decisions',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يعتمد سلوك التسوق للمستهلك على عوامل متعددة تشمل العمر، الجنس، والاهتمامات. يتطور باستمرار كيف يبحث المستهلكون عن المنتجات وما هي طرق الدفع التي يفضلونها، مع تحول ملحوظ نحو القيم الشخصية مثل الاستدامة والجودة.
          </p>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
             <AlertCircle className="text-indigo-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-indigo-900 leading-tight">تأثير التضخم العالمي</p>
                <p className="text-sm text-indigo-700/80 mt-2">
                  أدى ارتفاع التضخم إلى تغيير جذري في عادات الإنفاق، حيث لجأ الكثيرون إلى البدائل الأرخص وتقليل النفقات غير الضرورية والاعتماد على عروض الخصم.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ecommerce',
      title: 'التسوق الرقمي مقابل الميداني',
      subtitle: 'Online vs Offline Shopping Habits',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أصبح التسوق عبر الإنترنت خياراً شائعاً ومريحاً وأرخص ثمناً للعديد من الفئات. ومع ذلك، لا تزال زيارات المتاجر الفعلية والمبيعات فيها أعلى لبعض الفئات مثل الأثاث والبقالة الطازجة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">هجر سلة التسوق</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعد التكاليف الإضافية غير المتوقعة (مثل الشحن) السبب الأول لهجر طلبات الشراء عبر الإنترنت خلال عملية الدفع.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الاستدامة (بريطانيا)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تبحث نسبة متزايدة من المتسوقين في بريطانيا عن علامات تجارية مستدامة تلتزم بالمسؤولية الاجتماعية والبيئية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'seasons',
      title: 'مواسم التسوق الصاخبة',
      subtitle: 'Sales Events: Black Friday & Holidays',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
             تصل نفقات المستهلكين إلى ذروتها خلال مواسم مثل "البلاك فرايدي" و"سايبر مونداي" وفصل الشتاء، حيث يتم التحضير المكثف للهدايا والاحتفالات.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Zap className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">Amazon Prime Day</p>
                <p className="text-sm text-slate-400">أصبح هذا الحدث معياراً لنمو مبيعات التجارة الإلكترونية، حيث يحقق أرقام مبيعات قياسية في فترة زمنية قصيرة جداً.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Users className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تحولات جيل Gen Z</p>
                <p className="text-sm text-slate-400">بدأ جيل Z في الابتعاد عن "الموضة السريعة" بنسبة 13% لصالح الملابس المستعملة، تعبيراً عن مواقفهم البيئية.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Amazon', country: 'Global', note: 'المحرك الأول لاتجاهات التسوق الرقمي وتجربة المستخدم عالمياً' },
    { name: 'Alibaba Group', country: 'China', note: 'الرائد في أحداث التسوق الكبرى مثل "يوم العزاب" (Singles Day)' },
    { name: 'Statista Research', country: 'Germany/Global', note: 'المصدر الأساسي لتحليل بيانات سلوك المستهلك وتوقعات السوق' },
    { name: 'eBay', country: 'USA', note: 'القوة الدافعة لسوق الملابس المستعملة والبيع بين المستهلكين (C2C)' },
  ],

  definition: 'يغطي قطاع سلوك التسوق الإحصاءات ونتائج الدراسات الاستقصائية التي تتعامل مع الإنفاق الاستهلاكي داخل المتاجر وعبر الإنترنت، وتحليل عادات الشراء والمواقف بين مجموعات المستهلكين المختلفة.',

  industryInsights: [
    'المستهلكون يميلون للولاء للمتاجر التي توفر سياسات إرجاع سهلة وشفافة أكثر من ولائهم للسعر المنخفض فقط',
    '"اشترِ الآن وادفع لاحقاً" (BNPL) أحدثت ثورة في سلوك التسوق للأجيال الشابة خلال مواسم الأعياد',
    'التخصيص المعتمد على الذكاء الاصطناعي يزيد من قيمة سلة التسوق بنسبة تتراوح بين 15% و 25%',
  ],

  tags: ['Consumer Behavior', 'Shopping Trends', 'Inflation', 'Gen Z', 'Black Friday', 'Ecommerce Habits'],
};

const ShoppingBehaviorDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ShoppingBehaviorDashboard;
