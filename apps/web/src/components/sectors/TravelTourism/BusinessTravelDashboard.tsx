import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Briefcase, Globe, BarChart3, TrendingUp, ShieldCheck, Map, Clock, Coffee } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'سفر الأعمال والمؤتمرات',
  titleEn: 'Business Travel Industry',
  subtitle: 'تحليل إنفاق الشركات على السفر، سياحة الحوافز، الاجتماعات والمعارض (MICE)، وأدوات الإدارة الرقمية للسفر',
  icon: Briefcase,
  accent: 'blue',
  pdfLabel: 'تقرير سفر الأعمال (PDF)',

  kpis: [
    { label: 'الإنفاق العالمي على سفر الأعمال', value: '933', unit: 'مليار $', icon: Globe },
    { label: 'أغلى وجهة للأعمال (NYC)', value: '1', unit: 'Ranking', icon: Map },
    { label: 'المدينة الأكثر تنافسية (Paris)', value: '1', unit: 'Convention City', icon: ShieldCheck },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق لإنفاق الشركات', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في حجم ميزانيات سفر الأعمال، ومقر كبرى شركات إدارة السفر (TMC) العالمية.',
      icon: Briefcase
    },
    { 
      label: 'مركز المؤتمرات والمعارض العالمي', 
      country: 'ألمانيا / فرنسا', 
      note: 'تضمان أهم المدن المضيفة للمعارض التجارية الكبرى (MICE) وتمتلكان بنية تحتية لوجستية فائقة.',
      icon: Map
    },
    { 
      label: 'أسرع أسواق نمو سفر الأعمال', 
      country: 'الصين', 
      note: 'تشهد طفرة في الانتقالات المهنية والفعاليات التجارية بفضل التوسع الصناعي والتقني المستمر.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'التعافي والإنفاق', 'سياحة المعارض MICE', 'إدارة السفر والرقمنة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'عودة اللقاءات وجهاً لوجه',
      subtitle: 'The Return of Face-to-Face Business',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تلاشت المخاوف من اختفاء سفر الأعمال لصالح الاجتماعات الافتراضية؛ حيث اكتشف الموظفون والمدراء القيمة التي لا تُعوض للقاءات الميدانية. وبإنفاق يقترب من تريليون دولار، يستعيد القطاع زخمه مع دمج الحلول الرقمية التي طُورت أثناء الأزمة لتحسين تجربة المسافر المؤسسي وتوفير المرونة.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Briefcase className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الولايات المتحدة: المحور العالمي</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تظل الولايات المتحدة السوق الأضخم للإنفاق على سفر الأعمال، متفوقة بوضوح على الأسواق الأوروبية والآسيوية مجتمعة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'mice-segment',
      title: 'قطاع المعارض والمؤتمرات (MICE)',
      subtitle: 'Meetings, Incentives, Conferences & Exhibitions',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد المعارض التجارية محركاً رئيسياً لسفر الأعمال، حيث تسمح للشركات بالترويج لمنتجاتها وبناء شبكات علاقات خارج العالم الرقمي. ورغم تقليص الميزانيات في السنوات الأخيرة، إلا أن التوجه الحالي يشير إلى زيادة الاستثمار في المعارض المتخصصة ذات القيمة المضافة العالية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">ميزانيات المعارض التجارية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تشهد الميزانيات المخصصة للمشاركة في المعارض زيادة ملحوظة خاصة في قطاعات التكنولوجيا والمالية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سفر "الترفيه والعمل" (Bleisure)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">توجه متنامي حيث يقوم مسافرو الأعمال بدمج أيام إضافية من السياحة الترفيهية مع رحلاتهم المهنية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'digital-mgmt',
      title: 'الإدارة الرقمية والرقمنة',
      subtitle: 'Digital Travel Management',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تعتمد الشركات الكبرى مثل Amazon و FedEx على أدوات تقنية متطورة لإدارة تكاليف السفر وتقديم تقارير الإنفاق (T&E). يساهم مزودو إدارة السفر (TMC) في توفير حلول ذكية لخدمات الطيران والفنادق ومشاركة السيارات بما يضمن سلامة وكفاءة الموظف.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Clock className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">إدارة النفقات الذكية</p>
                <p className="text-sm text-slate-400">ساهمت الرقمنة في تقليل الزمن اللازم لتسوية فواتير السفر بنسبة 60% عبر تطبيقات الأتمتة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Coffee className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الاستدامة في سفر الأعمال</p>
                <p className="text-sm text-slate-400">يتزايد الضغط على الشركات لتقليل بصمتها الكربونية عبر اختيار خيارات نقل وإقامة "خضراء" معتمدة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'American Express GBT', country: 'USA/Global', note: 'المتصدر العالمي في خدمات إدارة السفر والفعاليات للمؤسسات الكبرى' },
    { name: 'BCD Travel', country: 'Netherlands/Global', note: 'رائدة في تقديم حلول إدارة السفر والتقنيات المرتبطة بها للشركات العالمية' },
    { name: 'CWT', country: 'USA/Global', note: 'واحدة من أكبر شركات إدارة السفر (TMC) المتخصصة في حلول السفر المؤسسي' },
    { name: 'Amazon & FedEx', country: 'USA', note: 'أكبر المؤسسات إنفاقاً على حوزات طيران الأعمال والمؤتمرات داخلياً وخارجياً' },
  ],

  definition: 'يغطي سفر الأعمال الرحلات المتخذة لأغراض مهنية، ويشمل قطاعات الإقامة، النقل، إدارة السفر، والاجتماعات والمعارض التجارية.',

  industryInsights: [
    'المدن الأكثر جاهزية للمؤتمرات العالمية هي باريس وطوكيو نظراً لقدرتها الاستيعابية واللوجستية العالية',
    'التحول نحو "سفر الأعمال الواعي" يركز على جودة اللقاءات بدلاً من كثرة عدد الرحلات لتقليل الانبعاثات',
    'استخدام منصات تتبع الموظفين (Duty of Care) أصبح إلزامياً في سياسات السفر لضمان الأمان في البيئات المختلفة',
  ],

  tags: ['Business Travel', 'MICE', 'Meetings', 'Convention', 'Corporate Travel', 'Amex GBT', 'Bleisure'],
};

const BusinessTravelDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default BusinessTravelDashboard;
