import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Tv, Film, Play, Users, Activity, BarChart3, TrendingUp, DollarSign, Monitor } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التلفزيون، الفيديو والسينما',
  titleEn: 'TV, Video & Film Industry',
  subtitle: 'تحليل المنصات الرقمية، إيرادات السينما العالمية، هيمنة الفيديو عبر الطلب (OTT)، وتطور عمالقة الترفيه',
  icon: Tv,
  accent: 'red',
  pdfLabel: 'تقرير سوق الترفيه المرئي (PDF)',

  kpis: [
    { label: 'إجمالي إيرادات OTT عالمياً', value: '288', unit: 'مليار $', icon: Activity },
    { label: 'إيرادات ديزني السنوية', value: '90', unit: 'مليار $', icon: DollarSign },
    { label: 'مشتركو التلفزيون المدفوع', value: '985', unit: 'مليون شخص', icon: Users },
  ],

  topMarkets: [
    { 
      label: 'عاصمة الترفيه العالمية', 
      country: 'الولايات المتحدة (هوليوود)', 
      note: 'لا تزال المركز الأول عالمياً في إنتاج وتصدير الأفلام والمسلسلات، ومقر كبرى منصات البث (Netflix, Disney).',
      icon: Film
    },
    { 
      label: 'أضخم سوق شباك تذاكر', 
      country: 'الصين', 
      note: 'أصبح السوق الصيني يمتلك أكبر عدد من شاشات السينما عالمياً ويحقق إيرادات سينمائية تنافس السوق الأمريكي.',
      icon: Play
    },
    { 
      label: 'القوة الإنتاجية الصاعدة', 
      country: 'الهند (بوليوود)', 
      note: 'أكبر منتج للأفلام من حيث العدد سنوياً، مع قاعدة جماهيرية ضخمة ونمو متسارع في خدمات البث المحلية.',
      icon: Tv
    }
  ],

  navItems: ['نظرة عامة', 'البث والسينما', 'تحولات السوق', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'سيادة البث الرقمي وتحولات المشاهدة',
      subtitle: 'The Age of Video Streaming',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يعد البث الرقمي هو المحرك الأساسي لصناعة السينما حالياً ومستقبلاً. يتجه المستهلكون بعيداً عن الكابل التقليدي والقمر الصناعي نحو المنصات التي تتيح المشاهدة عبر جميع الأجهزة، من الهواتف إلى الشاشات الكبيرة.
          </p>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4">
             <Play className="text-red-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-red-900 leading-tight">نمو البث المدعوم بالإعلانات</p>
                <p className="text-sm text-red-700/80 mt-2">
                  بينما تعاني النماذج القائمة على الاشتراك من التضخم، يحقق البث المدعوم بالإعلانات (Ad-supported) شعبية متزايدة، مع توقعات بمضاعفة إيراداته بحلول عام 2029.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'cinema-rebound',
      title: 'السينما: رحلة التعافي الصعبة',
      subtitle: 'Cinema Industry & Box Office',
      content: (
        <div className="space-y-6 text-right">
          <p>
            لا يزال قطاع السينما يحاول العودة لمستويات ما قبل الجائحة، حيث سجلت إيرادات شباك التذاكر حوالي 34.5 مليار دولار في 2023 مقارنة بـ 42 مليار دولار في 2019.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Film className="text-red-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق السينما الصيني</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبح السوق الصيني اليوم منافساً قوياً لهوليوود، مع توقعات بزيادة إيراداته بنسبة 50% مستقبلاً.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-red-600 mb-2" size={20} />
                <p className="font-black text-slate-900">التعافي العالمي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">من المتوقع أن تتجاوز إيرادات قطاع الترفيه المصور (سينما ومنزلي) 100 مليار دولار بحلول عام 2026.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'streaming-trends',
      title: 'استراتيجيات البث ومواجهة Churn',
      subtitle: 'Streaming Strategies & Ad-Tiers',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أدى ارتفاع الأسعار إلى زيادة إلغاء الاشتراكات، مما دفع مقدمي الخدمة مثل نتفليكس وديزني+ إلى إطلاق فئات اشتراك منخفضة التكلفة مدعومة بالإعلانات (HVOD).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Monitor className="text-red-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تلفزيون ذو إعلانات</p>
                <p className="text-sm text-slate-400">توقعات بأن تصل إيرادات النماذج الهجينة لشركات كبرى لأكثر من 20 مليار دولار بحلول عام 2029.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <BarChart3 className="text-red-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">ديزني: القوة الشاملة</p>
                <p className="text-sm text-slate-400">تمتلك ديزني أكثر من 150 مليون مشترك في خدمتها Disney+، مدعومة بمحتوى مارفل وبيكسار وستار وورز.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Disney', country: 'USA', note: 'المجمع الإعلامي الأضخم عالمياً بإيرادات تقترب من 90 مليار دولار' },
    { name: 'Netflix', country: 'USA', note: 'الرائد في سوق SVOD والمنصة الأكثر تأثيراً في عادات المشاهدة' },
    { name: 'Warner Bros. Discovery', country: 'USA', note: 'قوة كبرى في السينما والمحتوى الحصري ومنصات البث' },
    { name: 'Universal Pictures', country: 'USA', note: 'أحد استوديوهات السينما الرائدة التي تحافظ على حصة سوقية قوية' },
  ],

  definition: 'يشمل قطاع التلفزيون والفيديو والسينما كافة جوانب الترفيه المرئي، من البث التلفزيوني التقليدي إلى منصات الفيديو حسب الطلب، وصناعة الصالات السينمائية والاستوديوهات.',

  industryInsights: [
    'سوق السينما الصيني أصبح العامل الحاسم في نجاح الأفلام العالمية الكبرى (Blockbusters)',
    'تعد اقتباسات ألعاب الفيديو (مثل Super Mario) المحرك الجديد لإيرادات شباك التذاكر',
    'الاشتراكات المدعومة بالإعلانات أصبحت ضرورة استراتيجية للحفاظ على مستويات النمو',
  ],

  tags: ['TV & Film', 'Streaming', 'Box Office', 'Netflix', 'Disney+', 'OTT'],
};

const TVVideoFilmDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default TVVideoFilmDashboard;
