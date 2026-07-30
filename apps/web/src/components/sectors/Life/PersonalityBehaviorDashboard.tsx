import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { BrainCircuit, Activity, Globe, Heart, ShieldAlert, BarChart3, TrendingUp, UserCheck, MessageSquare } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الشخصية والسلوك البشري',
  titleEn: 'Personality & Behavior',
  subtitle: 'تحليل المخاوف العالمية، السمات الشخصية، المعتقدات الأخلاقية، والرفاهية النفسية للمجتمعات',
  icon: BrainCircuit,
  accent: 'blue',
  pdfLabel: 'تقرير السلوك البشري (PDF)',

  kpis: [
    { label: 'أكبر قلق عالمي اليوم', value: 'Poverty', unit: 'الفقر واللامساواة', icon: ShieldAlert },
    { label: 'نسبة الإيمان بالاحتباس الحراري (أمريكا)', value: '75%', icon: Globe },
    { label: 'الفئات الأكثر قلقاً بيئياً', value: 'Germany', unit: 'وألمانيا والصين', icon: Activity },
  ],

  navItems: ['نظرة عامة', 'المخاوف والقلق', 'حقوق الإنسان', 'السمات الشخصية', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'فهم النفس البشرية في سياق عالمي',
      subtitle: 'Understanding Human Personality',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعد الشخصية والسلوك من المواضيع الأكثر شعبية في المناقشات العلمية والعامة. تساهم الدراسات في الكشف عما يخافه الناس أو يفضلونه، حيث تشير الأبحاث العالمية إلى أن الفقر والمساواة والبطالة والرعاية الصحية هي أكثر المواضيع التي تقلق البشرية اليوم.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <MessageSquare className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">مخاوف الفئات الشابة (Gen Z)</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يبرز القلق البيئي والعدالة الاجتماعية كأولويات قصوى للأجيال الجديدة، مما يؤثر على قراراتهم الشرائية وانتماءاتهم السياسية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'fears',
      title: 'الخوف والقلق ونظريات المؤامرة',
      subtitle: 'Fear, Anxiety & Belief Systems',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تنشأ نظريات المؤامرة من الاعتقاد بأن بعض الأحداث هي نتيجة أفعال لمجموعات قوية مخفية. تؤثر هذه المعتقدات بشكل مباشر على مواقف الناس من قضايا مثل اللقاحات وتغير المناخ.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <ShieldAlert className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نظريات المؤامرة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يعتقد حوالي ربع الأمريكيين أن الاحتباس الحراري لا يحدث فعلياً، مما يعكس تأثير التشكيك والشك العام.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Activity className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">القلق البيئي (Eco-anxiety)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتصدر ألمانيا وأستراليا والصين قائمة الدول الأكثر قلقاً بشأن مآلات التغير المناخي والبيئي.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'human-rights',
      title: 'المواقف من حقوق الإنسان والقيم',
      subtitle: 'Human Rights & Rule of Law',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تختلف مفاهيم حقوق الإنسان وتفصيلاتها من بلد لآخر ومن شخص لآخر، مما يخلق تباينات في كيفية التعامل مع قضايا مثل حرية التعبير والحق في التعليم.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
             <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center shrink-0 w-full md:w-64 text-center">
                <UserCheck size={40} className="text-blue-400 mb-4" />
                <p className="text-3xl font-black text-white">Top 10</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">دول الصدارة في مؤشر سيادة القانون</p>
             </div>
             <div className="flex-1 space-y-4">
                <p className="text-slate-400">
                  يرى الناس حول العالم أن الحضور النسائي الأكبر في الحكومة والحصول المتساوي على التعليم هما المفتاح لإنهاء الفجوات القائمة بين الجنسين وتحقيق العدالة الاجتماعية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Human Rights Agencies', country: 'Global', note: 'المؤسسات التي تراقب مؤشرات سيادة القانون وحقوق الفرد' },
    { name: 'Psychological Research Inst.', country: 'International', note: 'المراكز البحثية المتخصصة في دراسة السلوك الجمعي' },
    { name: 'Climate Concern Groups', country: 'Europe/Asia', note: 'المنظمات التي تقيس ردود الفعل الجماهيرية تجاه الأزمات الكبرى' },
  ],

  definition: 'تشمل فئة الشخصية والسلوك نتائج مجموعة واسعة من الاستطلاعات حول الحالات الأخلاقية، المعتقدات الروحية، السمات الشخصية، والمخاوف الكبرى والرفاهية النفسية.',

  industryInsights: [
    'المخاوف الاقتصادية تظل المحرك الأول للسلوك الانتخابي في معظم دول العالم',
    'هناك زيادة مطردة في "الرهاب الرقمي" ومخاوف الخصوصية والتحرش عبر الإنترنت',
    'الوعي بالصحة النفسية تحول من موضوع محظور إلى أولوية في بيئات العمل الحديثة',
  ],

  tags: ['Personality', 'Human Behavior', 'World Worries', 'Psychology', 'Beliefs'],
};

const PersonalityBehaviorDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PersonalityBehaviorDashboard;
