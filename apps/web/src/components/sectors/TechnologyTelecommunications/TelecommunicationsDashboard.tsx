import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Radio, Signal, Wifi, BarChart3, TrendingUp, Globe, Smartphone, Network } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الاتصالات',
  titleEn: 'Telecommunications Industry',
  subtitle: 'تحليل شبكات الـ 5G، خدمات النطاق العريض الثابت، حركة بيانات الهاتف المحمول، ومستقبل تكنولوجيا الـ 6G',
  icon: Signal,
  accent: 'blue',
  pdfLabel: 'تقرير الاتصالات (PDF)',

  kpis: [
    { label: 'أكبر شركة (قيمة سوقية)', value: 'T-Mobile US', unit: 'Brand', icon: Smartphone },
    { label: 'الإنفاق على خدمات الاتصال', value: '1.55', unit: 'تريليون $', icon: BarChart3 },
    { label: 'حركة البيانات الشهرية', value: '130.59', unit: 'إكسابايت', icon: Globe },
  ],

  topMarkets: [
    { 
      label: 'أكبر قاعدة مشتركين وابتكار 5G', 
      country: 'الصين', 
      note: 'تمتلك أضخم عدد من محطات 5G عالمياً وأكبر قاعدة مشتركين (China Mobile)، مما يدعم الثورة الصناعية الرقمية.',
      icon: Network
    },
    { 
      label: 'رائد القيمة والاندماجات', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر من حيث الإيرادات والقيمة السوقية للشركات (T-Mobile, AT&T) والابتكار في تقنيات الاتصال الفضائي.',
      icon: Signal
    },
    { 
      label: 'قائد التغطية والوصول العريض', 
      country: 'الاتحاد الأوروبي', 
      note: 'يتميز بسوق تنافسي للغاية وأنظمة تشريعية متطورة تضمن خصوصية البيانات وجودة الخدمة العالية.',
      icon: Wifi
    }
  ],

  navItems: ['نظرة عامة', 'ثورة الـ 5G و 6G', 'البيانات والنطاق العريض', 'القادة والتوسع', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'البنية التحتية للاقتصاد الرقمي',
      subtitle: 'Infrastructure for the Digital Economy',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعد شبكات الاتصالات العمود الفقري للمستهلكين والمنظمات حول العالم. يرتبط ابتكار المنطقة ارتباطاً وثيقاً بقوة شبكة اتصالاتها، حيث يدفع التحول الرقمي الحاجة الماسة لسرعة وموثوقية الاتصال بالإنترنت.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Wifi className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">توسع الألياف الضوئية</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  توفر شبكات الألياف الضوئية إنترنت عالي السرعة لعملاء النطاق العريض الثابت، مما يدعم العمل المرن واستهلاك المحتوى عالي الدقة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'mobile-revolution',
      title: 'ثورة الـ 5G وصولاً إلى 6G',
      subtitle: 'The 5G Rollout & 6G Future',
      content: (
        <div className="space-y-6 text-right">
          <p>
            كان طرح شبكة الجيل الخامس (5G) هو التركيز الأساسي في قطاع المحمول، حيث يُتوقع أن يتجاوز عدد الاشتراكات ملياري اشتراك في 2024. في الوقت نفسه، بدأ بالفعل العمل والتطوير في تقنيات الجيل السادس (6G).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Network className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الوصول اللاسلكي الثابت (FWA)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تساعد تقنيات FWA في توفير إنترنت سريع ومستقر للمناطق النائية باستخدام شبكات 5G.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Smartphone className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو بيانات الهاتف</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تشهد حركة البيانات الشهرية عالمياً نمواً انفجارياً يصل إلى أكثر من 130 إكسابايت.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-leaders',
      title: 'قادة السوق والاندماجات',
      subtitle: 'Market Leaders & Mergers',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تتميز أسواق الاتصالات بمنافسة شديدة وتكلفة باهظة لبناء الشبكات. أدى ذلك لظهور موجة من الاندماجات الكبرى (مثل T-Mobile و Sprint) لتعزيز القدرة التنافسية وتقديم أفضل سرعات التحميل للمشتركين.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Radio className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تغطية الشبكات</p>
                <p className="text-sm text-slate-400">تقود أمريكا الشمالية والصين السباق في اعتماد 5G، بينما لا تزال مناطق أخرى تواجه تحديات البنية التحتية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Signal className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">مساهمة "بيج تك"</p>
                <p className="text-sm text-slate-400">هناك نقاشات عالمية لمطالبة شركات التكنولوجيا الكبرى بالمساهمة في تكاليف الشبكات نظراً لاستهلاكها العالي للبيانات.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'T-Mobile US', country: 'USA', note: 'أكبر شركة اتصالات من حيث القيمة السوقية ورائدة في سرعات شبكات 5G' },
    { name: 'China Mobile', country: 'China', note: 'لديها أكبر قاعدة مشتركين في العالم وتستثمر بكثافة في البنية التحتية الوطنية' },
    { name: 'AT&T', country: 'USA', note: 'لاعب تاريخي ضخم يركز على تكامل خدمات الاتصال والبيانات للمؤسسات والأفراد' },
    { name: 'Verizon', country: 'USA', note: 'منافس رئيسي يركز على جودة الشبكة والابتكار في خدمات النطاق العريض والمحمول' },
  ],

  definition: 'يغطي قطاع الاتصالات الشركات والهيئات التنظيمية التي توفر البنية التحتية والخدمات اللازمة لنقل الإشارات والرسائل والبيانات (ثابت ومحمول).',

  industryInsights: [
    'الاعتماد على 5G سيمهد الطريق لاستخدامات واسعة في الذكاء الاصطناعي وإنترنت الأشياء الصناعي',
    'الفجوة الرقمية (Digital Divide) تظل تحدياً حيث تفتقر العديد من المناطق النامية للبنية التحتية الأساسية',
    'الاستثمار في الفضاء والأقمار الصناعية (مثل Starlink) بدأ يقدم بدائل للاتصالات التقليدية في الأماكن النائية',
  ],

  tags: ['Telecommunications', '5G', '6G', 'Mobile Data', 'T-Mobile', 'Broadband', 'Network Infrastructure'],
};

const TelecommunicationsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default TelecommunicationsDashboard;
