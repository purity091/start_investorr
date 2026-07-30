import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Train, Radio, Navigation, Globe, BarChart3, TrendingUp, Zap, Clock, Factory } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تصنيع القطارات والسكك الحديدية',
  titleEn: 'Rolling Stock Manufacturing',
  subtitle: 'تحليل إنتاج القاطرات، شبكات القطارات فائقة السرعة، الحلول اللوجستية الخضراء، وقادة السوق',
  icon: Train,
  accent: 'blue',
  pdfLabel: 'تقرير سوق السكك الحديدية العالمي (PDF)',

  kpis: [
    { label: 'حجم سوق القطارات العالمي', value: '55', unit: 'مليار $', icon: BarChart3 },
    { label: 'شبكة القطارات السريعة (الصين)', value: '43.7K', unit: 'كم', icon: Clock },
    { label: 'أكبر مُصنّع في العالم', value: 'CRRC', unit: 'الصين', icon: Factory },
  ],

  topMarkets: [
    { 
      label: 'أضخم شبكة قطارات سريعة', 
      country: 'الصين', 
      note: 'تمتلك أكثر من 40 ألف كم من السكك الحديدية فائقة السرعة وموطن شركة CRRC، أكبر مُصنّع عالمي.',
      icon: Clock
    },
    { 
      label: 'رائد تكنولوجيا السرعة والأمان', 
      country: 'اليابان', 
      note: 'مبتكر "قطار الطلقة" (Shinkansen) الذي يتمتع بأعلى معايير الدقة والأمان في العالم.',
      icon: Train
    },
    { 
      label: 'مركز الابتكار الأوروبي', 
      country: 'فرنسا', 
      note: 'تقود التحول الأخضر في السكك الحديدية وتعد مركزاً لشركة Alstom الرائدة في حلول النقل المستدام.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'القطارات السريعة', 'التوجهات اللوجستية', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'محرك النقل الجماعي واللوجستي',
      subtitle: 'Supporting Goods & Passengers',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يدعم قطاع تصنيع القطارات الحجم المتزايد لنقل البضائع والركاب عبر السكك الحديدية. ينمو الطلب بفضل العولمة وتوسع الشبكات، مع ميل متزايد نحو الشحن والفر بأساليب أكثر صديقة للبيئة.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Zap className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">كهربة السكك الحديدية</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تعد تقنيات الكهربة وتحسين الكفاءة والأمان من أهم أولويات القطاع لتقليل الاعتماد على الوقود الأحفوري وتحسين سرعة الوصول.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'high-speed',
      title: 'الثورة السريعة والمنافسة العالمية',
      subtitle: 'High-Speed Rail Networks',
      content: (
        <div className="space-y-6 text-right">
          <p>
            حققت الصين نمواً مذهلاً في شبكة قطاراتها فائقة السرعة، تليها دول مثل إسبانيا واليابان. يسيطر تحالف Alstom والشركات اليابانية على حصة كبيرة من توريد هذه الوحدات الحديثة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Clock className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أسرع القطارات عالمياً</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تستثمر الدول في تطوير قطارات تتجاوز سرعتها 350 كم/ساعة لتقليل الحاجة للرحلات الجوية القصيرة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو سوق أمريكا اللاتينية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">من المتوقع أن تكون أمريكا اللاتينية أسرع الأسواق نمواً في طلب عربات القطارات وحلول البنية التحتية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'logistics',
      title: 'اضطرابات سلاسل التوريد والابتكار',
      subtitle: 'Geopolitical & Supply Chain Evolution',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            واجه القطاع اضطرابات كبيرة بسبب الجائحة والتوترات الجيوسياسية، مما دفع نحو ابتكار حلول لوجستية جديدة لمرحلة "الميل الأخير" (Last-mile).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Globe className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">توسع الشبكة العالمية</p>
                <p className="text-sm text-slate-400">تظل الصين السوق الأكبر بفضل شبكتها العملاقة، بينما تسعى الهند لتحديث جذري في بنيتها التحتية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Radio className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">أنظمة الأمان والتحكم</p>
                <p className="text-sm text-slate-400">تدمج القاطرات الحديثة أنظمة تحكم رقمية لزيادة الامان وتجنب حوادث التصادم وتحسين استهلاك الطاقة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'CRRC', country: 'China', note: 'أكبر مُصنّع لعربات القطارات والقاطرات في العالم' },
    { name: 'Alstom', country: 'France', note: 'الرائد في تكنولوجيا القطارات فائقة السرعة والحلول المستدامة' },
    { name: 'Siemens Mobility', country: 'Germany', note: 'المزود الرئيسي لأنظمة التحكم الرقمية والكهربة والبنية التحتية' },
    { name: 'Hitachi Rail', country: 'Japan', note: 'قوة تقنية كبرى في تطوير قطارات الطلقة (Shinkansen)' },
  ],

  definition: 'يشمل قطاع تصنيع القطارات إنتاج البنية التحتية للسكك الحديدية والمعدات، بما في ذلك عربات الركاب، القاطرات، وعربات الشحن، وتقنيات الكهربة والأمان.',

  industryInsights: [
    'قطارات "الطلقة" اليابانية لا تزال المعيار العالمي للأمان والدقة في المواعيد',
    'التحول نحو الشحن بالسكك الحديدية يقلل انبعاثات الكربون بنسبة 75% مقارنة بالشاحنات الثقيلة',
    'التكامل الرقمي يسمح بمراقبة حالة السكك الحديدية لحظياً لتقليل تكاليف الصيانة',
  ],

  tags: ['Rolling Stock', 'Railway', 'High-speed Rail', 'CRRC', 'Alstom', 'Logistics'],
};

const RollingStockDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default RollingStockDashboard;
