import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Train, Globe, BarChart3, TrendingUp, ShieldCheck, Map, Zap, Factory } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'النقل بالسكك الحديدية',
  titleEn: 'Rail Transport Industry',
  subtitle: 'تحليل شحن البضائع بالقطارات، شبكات القطارات فائقة السرعة، استثمارات البنية التحتية، ونمو الركاب عالمياً',
  icon: Train,
  accent: 'blue',
  pdfLabel: 'تقرير السكك الحديدية (PDF)',

  kpis: [
    { label: 'المركبات في الخدمة (الصين)', value: '1', unit: 'مليون قطار', icon: Factory },
    { label: 'سوق الركاب العالمي', value: '0.97', unit: 'مليار مستخدم', icon: Globe },
    { label: 'أكبر شركة (Union Pacific)', value: '1', unit: 'Market Leader', icon: ShieldCheck },
  ],

  topMarkets: [
    { 
      label: 'أضخم شبكة قطارات فائقة السرعة', 
      country: 'الصين', 
      note: 'تمتلك أكثر من ثلثي إجمالي طول مسارات القطارات فائقة السرعة في العالم وتقود ابتكار قطارات "ماغليف".',
      icon: Train
    },
    { 
      label: 'رائد شحن البضائع بالسكك', 
      country: 'الولايات المتحدة', 
      note: 'تعتمد على شبكة شحن برية هي الأكثر كفاءة وموثوقية في نقل المواد الخام والسلع الصناعية عبر مسافات شاسعة.',
      icon: Factory
    },
    { 
      label: 'محرك نقل الركاب العالمي', 
      country: 'الهند', 
      note: 'تشغل واحدة من أكبر شبكات السكك الحديدية في العالم وتخدم مئات الملايين من الركاب سنوياً بأسعار مدعومة.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'شحن البضائع بالسكك', 'القطارات فائقة السرعة', 'القادة والاستثمارات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نهضة السكك الحديدية العالمية',
      subtitle: 'Global Rail Renaissance',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يُقسم قطاع السكك الحديدية إلى نقل الركاب وشحن البضائع. بعد سنوات من التراجع بسبب الجائحة، عاد القطاع لمسار النمو مدعوماً بوعي بيئي متزايد واستثمارات ضخمة في البنية التحتية، لا سيما في الصين والولايات المتحدة.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Map className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">مبادرة الحزام والطريق</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تستثمر الصين في السكك الحديدية في حوالي 70 دولة لربط الأسواق وتعزيز التجارة العابرة للقارات.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'freight-rail',
      title: 'شحن البضائع: العمود الفقري اللوجستي',
      subtitle: 'Rail Freight: The Logistic Backbone',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد شركات شحن البضائع هي الأكبر في هذا القطاع، وغالباً ما تمتلك البنية التحتية التي تشغلها. تبرز "Union Pacific" في الولايات المتحدة كأكبر شركة في العالم من حيث الإيرادات وطول الشبكة المملوكة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق الشحن الأمريكي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يعتمد الاقتصاد الأمريكي بشكل حيوي على قطارات الشحن لنقل المواد الخام والمنتجات الصناعية عبر مسافات شاسعة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">النمو في أوروبا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يشهد شحن البضائع بالسكك في أوروبا نمواً بفضل سياسات التحول نحو وسائل نقل أقل بعثاً للكربون مقارنة بالشاحنات.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'high-speed',
      title: 'طفرة القطارات فائقة السرعة',
      subtitle: 'The High-Speed Rail Boom',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت القطارات التي تتجاوز سرعتها 250 كم/س المعيار الجديد للتنقل بين المدن. تشغل الصين أطول شبكة في العالم بطول 44 ألف كم، بينما تبدأ الولايات المتحدة حالياً ببناء خطوطها الأولى فائقة السرعة لمنافسة الطيران الداخلي.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Zap className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">أسرع القطارات عالمياً</p>
                <p className="text-sm text-slate-400">تتصدر القطارات الصينية (Maglev) والفرنسية (TGV) القائمة بسرعات تشغيلية وتجريبية مذهلة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">توسع الركاب</p>
                <p className="text-sm text-slate-400">تستقبل السكك الحديدية الهندية أكبر عدد من المسافرين عالمياً بحصة سوقية تبلغ 11% من إجمالي مستخدمي القطارات.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Union Pacific Railroad', country: 'USA', note: 'أكبر شركة سكة حديد في العالم وتمتلك شبكة شحن برية ضخمة عبر الولايات المتحدة' },
    { name: 'Indian Railways', country: 'India', note: 'المتصدر العالمي في نقل الركاب وأحد أكبر أرباب العمل في العالم' },
    { name: 'Canadian National Railway', country: 'Canada', note: 'المنافس الأقرب في سوق شحن البضائع عبر أمريكا الشمالية' },
    { name: 'Deutsche Bahn', country: 'Germany', note: 'رائدة النقل المتكامل بالسكك في أوروبا ومبتكرة حلول القطارات الرقمية' },
  ],

  definition: 'تشمل صناعة النقل بالسكك الحديدية مشغلي قطارات الركاب والشحن، وكلاء الشحن، والبنية التحتية للسكك الحديدية وأنظمة المترو.',

  industryInsights: [
    'التوجه نحو رقمنة التحكم في القطارات (ETCS) يرفع الكفاءة التشغيلية ويسمح بمرور عدد أكبر من القطارات على نفس الخط',
    'السكك الحديدية هي الوسيلة الأكثر كفاءة في استهلاك الطاقة لنقل الطن الواحد من البضائع لمسافات طويلة',
    'الاستثمارات القادمة ستركز على شبكات القطارات الليلية كبديل مستدام للرحلات الجوية قصيرة المدى في أوروبا',
  ],

  tags: ['Rail Transport', 'High-Speed Rail', 'Freight Rail', 'Union Pacific', 'China Rail', 'Sustainability'],
};

const RailTransportDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default RailTransportDashboard;
