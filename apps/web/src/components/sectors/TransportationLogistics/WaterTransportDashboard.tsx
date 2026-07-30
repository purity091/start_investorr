import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Ship, Globe, BarChart3, TrendingUp, ShieldCheck, Anchor, Fuel, Waves } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'النقل البحري',
  titleEn: 'Water Transport Industry',
  subtitle: 'تحليل شحن البضائع عبر البحار، سوق الحاويات العالمي، كبرى الموانئ، وتوجهات الشحن البحري الأخضر',
  icon: Ship,
  accent: 'blue',
  pdfLabel: 'تقرير النقل البحري (PDF)',

  kpis: [
    { label: 'حجم التجارة البحرية', value: '11', unit: 'مليار طن', icon: Globe },
    { label: 'إنتاجية موانئ الحاويات', value: '860', unit: 'مليون TEU', icon: Anchor },
    { label: 'قائد السوق (Maersk)', value: '82', unit: 'مليار إيراد', icon: ShieldCheck },
  ],

  topMarkets: [
    { 
      label: 'مركز الموانئ العالمي', 
      country: 'الصين', 
      note: 'تستحوذ على أكبر حجم مناولة حاويات عالمياً عبر موانئها العملاقة في شنغهاي ونينغبو وتعد مركز التصنيع الأول.',
      icon: Anchor
    },
    { 
      label: 'محور الربط والخدمات البحرية', 
      country: 'سنغافورة', 
      note: 'أهم مركز عبور (Transshipment) وخدمات تموين السفن في العالم بفضل موقعها في مضيق ملقا الإستراتيجي.',
      icon: Globe
    },
    { 
      label: 'رائد الأساطيل الملاحية والأبحاث', 
      country: 'الدنمارك / النرويج', 
      note: 'موطن كبرى شركات الشحن (Maersk) وتقود التحول التكنولوجي نحو الشحن الأخضر والوقود المستدام.',
      icon: Waves
    }
  ],

  navItems: ['نظرة عامة', 'سوق الشحن والحاويات', 'التوجهات الخضراء', 'القادة والموانئ', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'شرايين التجارة البحرية',
      subtitle: 'Arteries of Seaborne Trade',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعد المحيطات والمجاري المائية أهم طرق النقل للسفن السياحية وسفن الشحن عالمياً. تضاعف حجم التجارة البحرية خلال العقدين الماضيين ليصل إلى 11 مليار طن من البضائع المحملة، مدفوعاً بنمو التجارة بنظام الحاويات وتكامل سلاسل التوريد عبر الموانئ الكبرى.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Anchor className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">هيمنة الموانئ الآسيوية</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تضم آسيا أهم مواقع موانئ الحاويات عالمياً، حيث يتصدر ميناء شنغهاي وميناء سنغافورة القائمة من حيث حجم المناولة (Throughput).
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'container-market',
      title: 'سوق الحاويات والخطوط الملاحية',
      subtitle: 'Container Shipping & Liner Fleet',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تسيطر شركات عملاقة على الأسطول العالمي للحاويات. تعد شركة "Maersk" الدنماركية أحد أكبر المشغلين بحصة تبلغ 16% من الأسطول العالمي، وهي تسعى مع شركائها لتحسين السيطرة على التكاليف وكفاءة السعة عبر تحالفات كبرى.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إنتاجية الموانئ</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">من المتوقع أن تصل مناولة الحاويات عالمياً إلى 860 مليون وحدة نمطية (TEU)، مما يعكس استمرار الطلب القوي.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Waves className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أسعار الشحن (Freight Rates)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتذبذب أسعار الشحن البحري بشكل حاد بناءً على الاستقرار الأمني في الممرات المائية الحيوية مثل البحر الأحمر وقناة السويس.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'green-shipping',
      title: 'التحول نحو الشحن البحري الأخضر',
      subtitle: 'The Greening of Maritime Transport',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تنتج صناعة الشحن البحري حوالي 700 مليون طن من ثاني أكسيد الكربون سنوياً. تبذل المنظمة البحرية الدولية (IMO) جهوداً كبيرة للحد من الانبعاثات عبر فرض حدود قصوى للكبريت وتشجيع السفن على استخدام وقود منخفض الكربون أو أنظمة غسل الغاز.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Fuel className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الحد الأقصى للكبريت 2020</p>
                <p className="text-sm text-slate-400">أجبر القانون الجديد السفن على استبدال الوقود الثقيل بوقود منخفض الكبريت، مما أثر على تكاليف التشغيل عالمياً.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الاستثمار في أنظمة التوفير</p>
                <p className="text-sm text-slate-400">يزداد الطلب على أنظمة تنظيف غاز العادم (Scrubbers) والسفن التي تعمل بالغاز الطبيعي المسال (LNG).</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'A.P. Møller - Mærsk A/S', country: 'Denmark', note: 'الشركة الرائدة في مجال شحن الحاويات عالمياً وسلسلة التوريد المتكاملة' },
    { name: 'Kuehne + Nagel', country: 'Switzerland', note: 'أكبر وكيل شحن بحري في العالم من حيث حجم مناولة البضائع' },
    { name: 'COSCO Shipping', country: 'China', note: 'لاعب استراتيجي ضخم بأسطول متكامل ومراكز لوجستية في الموانئ الصينية الكبرى' },
    { name: 'Hapag-Lloyd', country: 'Germany', note: 'خامس أكبر مشغل حاويات في العالم بتركيز قوي على كفاءة الخدمات عبر القارات' },
  ],

  definition: 'تشمل فئة النقل البحري شحن البضائع والركاب عبر البحار والمحيطات والمجاري المائية الداخلية، وتغطي الموانئ، الخطوط الملاحية، وبناء السفن.',

  industryInsights: [
    'تأثير الصراعات في البحر الأحمر يطيل مسارات الشحن ويزيد تكاليف التأمين والوقود بشكل مباشر',
    'الرقمنة والموانئ الذكية (Smart Ports) هي المفتاح لتقليل زمن انتظار السفن وزيادة الإنتاجية السنوية',
    'الاهتمام بسياحة السفن العملاقة (Cruise Ships) يعود لمستويات ما قبل الجائحة مع تحول نحو الاستدامة البيئية في الأساطيل الجديدة',
  ],

  tags: ['Water Transport', 'Shipping', 'Maersk', 'Container Port', 'IMO 2020', 'Seaborne Trade', 'Kuehne + Nagel'],
};

const WaterTransportDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default WaterTransportDashboard;
