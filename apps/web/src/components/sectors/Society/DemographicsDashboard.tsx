import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Users, Globe, Activity, Heart, BarChart3, TrendingUp, Baby, Home } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الديموغرافيا والسكان',
  titleEn: 'Demographics Industry',
  subtitle: 'دراسة الخصائص السكانية، معدلات النمو، التنوع العرقي، وتوقعات متوسط العمر عالمياً',
  icon: Users,
  accent: 'blue',
  pdfLabel: 'تقرير الديموغرافيا العالمي (PDF)',

  kpis: [
    { label: 'سكان الولايات المتحدة', value: '332', unit: 'مليون', icon: Users },
    { label: 'أعلى حصة سكانية (آسيا)', value: '60', unit: '%', icon: Globe },
    { label: 'متوسط عمر النساء (بريطانيا)', value: '82.9', unit: 'سنة', icon: Activity },
  ],

  topMarkets: [
    { 
      label: 'أكبر كتلة سكانية في العالم', 
      country: 'الهند / الصين', 
      note: 'تمثلان أكثر من ثلث سكان العالم، مما يحملهما ثقلاً ديموغرافياً هائلاً في الاقتصاد والسياسة العالمية.',
      icon: Globe
    },
    { 
      label: 'أكبر هرم سكاني مقلوب', 
      country: 'اليابان / ألمانيا', 
      note: 'تواجهان أسرع معدلات الشيخوخة وتناقص القوى العاملة الشابة، مما يغير استراتيجيات الرعاية والتقاعد.',
      icon: Users
    },
    { 
      label: 'أسرع نمو سكاني مستقبلي', 
      country: 'نيجيريا / أفريقيا', 
      note: 'تشهد طفرة في المواليد وتزايداً في نسبة الشباب، مما يجعها محركاً كبيراً للطلب الاستهلاكي المستقبلي.',
      icon: Baby
    }
  ],

  navItems: ['نظرة عامة', 'حجم السكان', 'المواليد والوفيات', 'الهجرة والفقر', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'دراسة المجتمعات البشرية',
      subtitle: 'The Science of Populations',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            الديموغرافيا هي الدراسة الإحصائية للسكان البشريين وخصائصهم. تشمل البيانات الديموغرافية معلومات عن حجم السكان، الكثافة، النمو، والمجموعات التنظيمية مثل العرق، الجنس، أو العمر. تعد هذه البيانات ضرورية للحكومات والشركات لتخطيط الخدمات والمنتجات المستقبلية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Activity className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">زيادة متوسط العمر المتوقع</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  بفضل التحسينات الكبيرة في الطب الحديث، زاد متوسط العمر المتوقع العالمي بشكل كبير في العقود الأخيرة، مما يفرض تحديات جديدة لأنظمة الرعاية الصحية والتقاعد.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'population',
      title: 'النمو السكاني العالمي',
      subtitle: 'Global Population Dynamics',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تجاوز سكان العالم سبعة مليارات نسمة وهم في نمو مستمر. يعد إحصاء وتصنيف هذا العدد الهائل من السكان مهمة معقدة تتولى القيام بها مؤسسات وطنية ودولية بشكل دوري.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Baby className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">تراجع المواليد</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تشهد العديد من الدول المتقدمة تراجعاً في معدلات المواليد، لكن السكان لا يزالون ينمون بسبب زيادة العمر المتوقع.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Home className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">تغير مفهوم الزواج</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تراجعت معدلات الزواج في العديد من الثقافات الغربية مع تغير القيم الاجتماعية والاقتصادية للشباب.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'migration-poverty',
      title: 'الهجرة وتحديات الفقر',
      subtitle: 'Migration & Poverty Challenges',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            سواء بدافع الضرورة أو الرغبة، ينتقل الناس يومياً عبر الحدود بحثاً عن الأمان أو فرص معيشية أفضل. وبالمقابل، يظل الفقر المدقع (العيش على أقل من 1.25 دولار يومياً) تحدياً هيكلياً ضخماً.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Globe className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">حركات الهجرة المعاصرة</p>
                <p className="text-sm text-slate-400">تشهد أوروبا وأمريكا الشمالية تدفقات كبيرة من اللاجئين والمهاجرين بسب الحروب والبحث عن حياة كريمة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Heart className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">معدلات الفقر</p>
                <p className="text-sm text-slate-400">تُقاس معدلات الفقر بناءً على عدم القدرة على الحصول على السلع والخدمات الأساسية اللازمة للبقاء بكرامة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'U.S. Census Bureau', country: 'USA', note: 'المؤسسة الرائدة عالمياً في جمع وتحليل البيانات الديموغرافية المعقدة' },
    { name: 'World Bank', country: 'Global', note: 'المصدر الرئيسي لبيانات الفقر والتمنية البشرية على مستوى العالم' },
    { name: 'United Nations Population Fund', country: 'Global', note: 'تعمل على تحسين الصحة الإنجابية وفهم التحولات السكانية العالمية' },
    { name: 'Japanese Ministry of Health', country: 'Japan', note: 'تدير إحصاءات أكثر المجتمعات شيخوخة وتحديات "تراجع الخصوبة" في العالم' },
  ],

  definition: 'توفر فئة الديموغرافيا بيانات عن إحصاءات السكان، بما في ذلك معدلات النمو، حركات الهجرة، والتصنيفات العرقية والعمرية على المستويات العالمية والإقليمية.',

  industryInsights: [
    'من المتوقع أن يصل سكان العالم إلى 9.7 مليار نسمة بحلول عام 2050، مع تركيز النمو في أفريقيا وآسيا',
    'الشيخوخة السكانية ستغير هيكل القوى العاملة العالمية، مما يتطلب تقنيات أتمتة متقدمة لسد الفجوات',
    'الهجرة الدولية تساهم بنسبة 10% من الناتج المحلي الإجمالي العالمي عبر تحويلات المهاجرين واستهلاكهم',
  ],

  tags: ['Demographics', 'Population', 'Migration', 'Poverty', 'Life Expectancy', 'Census'],
};

const DemographicsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default DemographicsDashboard;
