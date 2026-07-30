import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { TrendingUp, Globe, BarChart3, ShieldCheck, BrainCircuit, Users, Zap, Briefcase } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع التسويق',
  titleEn: 'Marketing Industry',
  subtitle: 'تحليل الإنفاق العالمي على التسويق، استخدام الذكاء الاصطناعي، العلاقات العامة، والتسويق عبر المؤثرين',
  icon: TrendingUp,
  accent: 'blue',
  pdfLabel: 'تقرير التسويق (PDF)',

  kpis: [
    { label: 'الإنفاق العالمي 2024', value: '897.7', unit: 'مليار $', icon: Globe },
    { label: 'سوق العلاقات العامة', value: '107', unit: 'مليار $', icon: Briefcase },
    { label: 'التسويق عبر المؤثرين', value: '16.4', unit: 'مليار $', icon: Users },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق تسويقي عالمي', 
      country: 'الولايات المتحدة', 
      note: 'تحتل الصدارة بإنفاق يتجاوز 480 مليار دولار مع توجه مكثف لـ MarTech.',
      icon: TrendingUp
    },
    { 
      label: 'محرك النمو في آسيا', 
      country: 'اليابان', 
      note: 'ثالث أكبر سوق تسويقي عالمي وتتميز بتركيزها العالي على التسويق المتكامل.',
      icon: Briefcase
    },
    { 
      label: 'مركز الاستراتيجية الرقمية', 
      country: 'المملكة المتحدة', 
      note: 'تعد من أكثر الأسواق نضجاً في تبني استراتيجيات التسويق الرقمي والأتمتة.',
      icon: Zap
    }
  ],

  navItems: ['نظرة عامة', 'الذكاء الاصطناعي', 'سوق العلاقات العامة', 'القادة والتوجهات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'التسويق في "الواقع الجديد"',
      subtitle: 'Marketing in the New Normal',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            في واقع يهيمن عليه الذكاء الاصطناعي وتغير عادات المستهلك، أصبح التسويق مجالاً يعتمد كلياً على البيانات. وبإنفاق يقترب من 900 مليار دولار عالمياً، تركز الاستراتيجيات الناجحة (Omnichannel) على دمج كافة القنوات لتوصيل المستهلك بقنوات التوزيع الرقمية التي أصبحت الخيار الأول.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Zap className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">نمو التسويق الرقمي</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  في الولايات المتحدة وحدها، نما الإنفاق التسويقي بنسبة 9% متجاوزاً 480 مليار دولار، مع توجه مكثف نحو TikTok و YouTube و Google.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-marketing',
      title: 'عصر الذكاء الاصطناعي والأتمتة',
      subtitle: 'AI & Automation Transformation',
      content: (
        <div className="space-y-6 text-right">
          <p>
            بدأ الذكاء الاصطناعي (AI) يصبح معياراً أساسياً في التسويق؛ حيث يستخدمه حالياً ربع المسوقين حول العالم لتحليل البيانات وتخصيص التجارب. وتتوقع التقارير أن تتجاوز إيرادات برمجيات أتمتة التسويق 10 مليارات دولار بحلول عام 2030.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BrainCircuit className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أتمتة التسويق (Martech)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبح استخدام الـ Martech ركيزة أساسية للعلامات التي ترغب في تقليل التكاليف وتحسين دقة الوصول.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">تحليل البيانات الضخمة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">القرارات التسويقية الفعالة تُبنى اليوم على تحليل استباقي لبيانات السوق وسلوكيات المستهلكين الحقيقية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'pr-influencers',
      title: 'العلاقات العامة والتأثير الاجتماعي',
      subtitle: 'PR & Social Influence',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يمثل سوق العلاقات العامة (PR) قوة مستقرة بـ 107 مليارات دولار، بينما ينمو التسويق عبر المؤثرين بوتيرة سريعة ليصل إلى 16.4 مليار دولار. هذه القنوات تضمن بناء الثقة والمصداقية للعلامات التجارية في بيئة رقمية مزدحمة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Users className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">اقتصاد المبدعين</p>
                <p className="text-sm text-slate-400">تحول المؤثرون من مجرد ناقلي رسائل إلى مبدعين محتوى يمتلكون مجتمعات ذات ولاء استثنائي.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Briefcase className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تخصيص العروض (Personalization)</p>
                <p className="text-sm text-slate-400">أثبتت الدراسات أن تخصيص الرسائل التسويقية يرفع معدلات التحويل بنسبة تتجاوز 30%.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'WPP (London)', country: 'UK', note: 'المتصدر العالمي وتمتلك شبكات كبرى مثل Wunderman Thompson و Ogilvy' },
    { name: 'Omnicom Group', country: 'USA', note: 'تمتلك أكثر شبكات الوكالات إبداعاً في العالم مثل BBDO و DDB' },
    { name: 'Publicis Groupe', country: 'France', note: 'واحدة من أهم المجموعات التسويقية التي تركز على البيانات والتكنولوجيا' },
    { name: 'Dentsu Group', country: 'Japan', note: 'تهيمن على السوق الآسيوي ولديها حضور عالمي قوي في التسويق المتكامل' },
  ],

  definition: 'تشمل صناعة التسويق كافة القنوات التقليدية والرقمية، وتغطي ميزانيات الشركات، استراتيجيات الوصول، وأداء وكالات العلاقات العامة والتأثير.',

  industryInsights: [
    'التوجه نحو (XaaS) والحلول السحابية يُجبر المسوقين على تبني استراتيجيات تعتمد على الاشتراك والولاء',
    'الذكاء الاصطناعي يعيد تعريف "مراكز المساعدة" عبر المساعدين الأذكياء والتحليل التنبؤي لرضا العملاء',
    'سوق أتمتة التسويق يُتوقع أن يتضاعف ثلاث مرات قبل نهاية العقد الحالي نتيجة الحاجة للكفاءة',
  ],

  tags: ['Marketing', 'Branding', 'Digital Marketing', 'AI in Marketing', 'PR Industry', 'Influencers'],
  sectorId: 'marketing-dashboard',
};

const MarketingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default MarketingDashboard;
function Megaphone(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 11 18-5v12L3 14v-3z" />
            <path d="M11.6 16.8 a3 3 0 1 1 -5.8-1.6" />
        </svg>
    )
}
