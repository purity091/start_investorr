import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { ShieldAlert, Users, Scale, AlertTriangle, BarChart3, TrendingUp, Search, Lock } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الجريمة وإنفاذ القانون',
  titleEn: 'Crime & Law Enforcement Industry',
  subtitle: 'تحليل معدلات الجريمة، مكافحة الإرهاب، نظم العدالة الجنائية، وإصلاح أجهزة الشرطة عالمياً',
  icon: ShieldAlert,
  accent: 'blue',
  pdfLabel: 'تقرير الأمن والعدالة (PDF)',

  kpis: [
    { label: 'عدد السجناء (أمريكا)', value: '1.2', unit: 'مليون', icon: Lock },
    { label: 'الهجمات الإرهابية عالمياً', value: '10,172', unit: 'حدث', icon: AlertTriangle },
    { label: 'أدنى مؤشر سلام (أفغانستان)', value: '1.0', unit: 'Index', icon: Scale },
  ],

  topMarkets: [
    { 
      label: 'أعلى معدلات حبس عالمية', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أكبر عدد من السجناء في العالم، مما يضع ضغوطاً كبرى على ميزانيات إنفاذ القانون ونظم العدالة.',
      icon: Lock
    },
    { 
      label: 'رائد تكنولوجيا الأمن الوقائي', 
      country: 'الصين', 
      note: 'تتصدر العالم في استخدام أنظمة المراقبة بالذكاء الاصطناعي والتعرف على الوجوه لإنفاذ القانون.',
      icon: Search
    },
    { 
      label: 'أعلى تحديات الجريمة المنظمة', 
      country: 'المكسيك / البرازيل', 
      note: 'تواجه أكبر تحديات في مكافحة الكارتيلات والجريمة العنيفة، مما يتطلب استراتيجيات أمنية عسكرية متخصصة.',
      icon: AlertTriangle
    }
  ],

  navItems: ['نظرة عامة', 'الجريمة العنيفة', 'الشرطة والإصلاح', 'نظام العدالة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الأمن والاستقرار الاقتصادي',
      subtitle: 'Security & Economic Prosperity',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يعد منع الجريمة وإنفاذ القانون ركيزة أساسية لأي دولة ناجحة. تميل الدول التي تنخفض فيها معدلات الجريمة إلى التمتع بجودة حياة أفضل وازدهار اقتصادي أكبر. ومع ذلك، لا يوجد اتفاق عالمي واحد على الطريقة المثلى لتقليل الجريمة، حيث تختلف النهج بين إعادة التأهيل والعقاب الصارم.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <AlertTriangle className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">تحديات إنفاذ القانون الحديثة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يمثل إنهاء ممارسات إنفاذ القانون القسرية وغير العادلة قضية عالمية ملحة، خاصة بعد حالات عنف الشرطة البارزة التي أثارت احتجاجات واسعة ودعوات للإصلاح.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'violent-crime',
      title: 'الجريمة العنيفة والمدن الخطرة',
      subtitle: 'Violent Crime & Dangerous Cities',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتركز العديد من أكثر مدن العالم عنفاً من حيث معدلات القتل في أمريكا اللاتينية، بسبب عوامل مثل تهريب المخدرات، وحروب العصابات، وعدم الاستقرار السياسي.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">معدلات القتل</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعاني مناطق معينة من مستويات عنف مرتفعة مقارنة بأوروبا وكندا، مما يتطلب استراتيجيات أمنية متخصصة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Search className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الجريمة السيبرانية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبحت مكافحة الجرائم الإلكترونية قضية محورية في العقد الحالي مع التقدم التكنولوجي السريع.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'reform',
      title: 'إصلاح الشرطة والعدالة',
      subtitle: 'Police Reform & Justice System',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أثارت حالات استخدام القوة المفرطة من قبل الشرطة نقاشات حول بدائل العمل الشرطي التقليدي وتحديث أنظمة العدالة لتشمل المحامين، القضاة، والمحاكم بشكل أكثر شفافية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Users className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">إصلاح أجهزة الشرطة</p>
                <p className="text-sm text-slate-400">تزيد الدعوات العالمية لإعادة هيكلة ميزانيات الشرطة وتوجيهها نحو خدمات الدعم الاجتماعي والوقاية من الجريمة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Scale className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">معدلات الحبس العالمية</p>
                <p className="text-sm text-slate-400">تعد معدلات الحبس وسيلة لمقارنة أنظمة العدالة، حيث تسعى بعض الدول لإعادة التأهيل بينما تركز أخرى على العقاب.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'US Justice System', country: 'USA', note: 'يسجل أعلى معدلات حبس في العالم بالنسبة لعدد السكان' },
    { name: 'Interpol', country: 'Global', note: 'المنظمة الدولية للتعاون الشرطي ومكافحة الجرائم العابرة للحدود' },
    { name: 'Amnesty International', country: 'UK/Global', note: 'منظمة رائدة في مراقبة حقوق الإنسان وإصلاح نظم العدالة' },
    { name: 'Latin American Safe Cities', country: 'LATAM', note: 'برامج وتطبيقات مبتكرة لتعزيز الأمن المجتمعي في المدن عالية الجريمة' },
  ],

  definition: 'تشمل هذه الفئة الإحصاءات والحقائق المتعلقة بالجريمة وإنفاذ القانون، بما في ذلك أرقام الجرائم، الإرهاب، وبيانات نظام العدالة الجنائية.',

  industryInsights: [
    'التكنولوجيا تساعد في تقليل زمن استجابة الشرطة للحوادث بنسبة 30% عبر أنظمة الذكاء الاصطناعي التنبؤي',
    'الجرائم الإلكترونية تكلف الاقتصاد العالمي تريليونات الدولارات سنوياً وتتطلب كوادر أمنية عالية المهارة',
    'إصلاح نظم السجون يركز الآن على برامج التعليم المهني لتقليل معدلات العودة للجريمة (Recidivism)',
  ],

  tags: ['Crime', 'Law Enforcement', 'Justice', 'Security', 'Cybercrime', 'Terrorism'],
};

const CrimeLawEnforcementDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default CrimeLawEnforcementDashboard;
