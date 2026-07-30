import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { TreePine, Globe, BarChart3, TrendingUp, ShieldCheck, Mountain, Wind, Flame } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الغابات',
  titleEn: 'Forestry Industry',
  subtitle: 'تحليل الإدارة المستدامة للغابات، إنتاج الأخشاب، امتصاص الكربون، وحماية التنوع الحيوي العالمي',
  icon: TreePine,
  accent: 'green',
  pdfLabel: 'تقرير الغابات (PDF)',

  kpis: [
    { label: 'فقدان الغابات السنوي', value: '3.73', unit: 'مليون هكتار', icon: Flame },
    { label: 'مساحة الإنتاج العالمي', value: '1.15', unit: 'مليار هكتار', icon: Globe },
    { label: 'غابات كندا', value: '47.4', unit: 'مليون هكتار', icon: TreePine },
  ],

  topMarkets: [
    { 
      label: 'أكبر مساحة غابية في العالم', 
      country: 'روسيا', 
      note: 'تمتلك حوالي 20% من غابات العالم، مما يجعلها القوة الأكبر في احتياطيات الأخشاب.',
      icon: Globe
    },
    { 
      label: 'موطن الغابات المطيرة', 
      country: 'البرازيل', 
      note: 'تضم غابات الأمازون، وهي أكبر مساحة غابية مطيرة ذات دور حاسم في توازن المناخ.',
      icon: Mountain
    },
    { 
      label: 'رائد الإدارة المستدامة', 
      country: 'كندا', 
      note: 'ثالث أكبر دولة غابية عالمياً وتشتهر بتطبيق معايير صارمة في إنتاج الأخشاب واللباب.',
      icon: TreePine
    }
  ],

  navItems: ['نظرة عامة', 'الإدارة المستدامة', 'سوق الأخشاب', 'التوجهات والقادة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'التوازن بين الطبيعة والاستثمار',
      subtitle: 'Balance between Nature & Investment',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تمثل الغابات النظام البيئي البري المهيمن على الأرض، حيث توفر للبشرية منتجات حيوية وخدمات بيئية وتوفر فرص عمل وابتكار. ومع تزايد التحديات المناخية، تحول التركيز من قطع الأشجار الجائر إلى أساليب الإدارة المستدامة التي توازن بين الاحتياجات الاقتصادية والبيئية.
          </p>
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100 flex items-start gap-4">
             <Wind className="text-green-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-green-900 leading-tight">بالوعة الكربون (Carbon Sink)</p>
                <p className="text-sm text-green-700/80 mt-2">
                  تُستخدم الغابات بشكل متزايد كمخازن طبيعية لامتصاص ثاني أكسيد الكربون، مما يفتح آفاقاً جديدة للاستثمار في أرصدة الكربون.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'sustainability',
      title: 'الإدارة المستدامة للغابات',
      subtitle: 'Sustainable Forest Management',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تهدف الإدارة المستدامة إلى تحقيق مكاسب اقتصادية مع الحفاظ على التوازن البيئي والاجتماعي. يتم الآن الانتقال من "زراعة الصنف الواحد" إلى ممارسات "الاستخدام المتعدد" حيث تُستخدم الغابة كمصدر للخشب ومسكن للحياة البرية ومكان ترفيهي في آن واحد.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <ShieldCheck className="text-green-600 mb-2" size={20} />
                <p className="font-black text-slate-900">شهادات الاستدامة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تزايدت المساحات الغابية الحاصلة على شهادات بيئية، مما يضمن خلو المنتجات الخشبية من آثار القطع غير القانوني.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-green-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أكبر مساحة غابية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتصدر أمريكا الشمالية العالم كأكبر منطقة تحتوي على مساحات غابية شاسعة مُدارة لأغراض الإنتاج.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'timber-market',
      title: 'سوق الخشب وتملك الأراضي',
      subtitle: 'Timber Market & Ownership',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تبلغ مساحة الغابات المخصصة للإنتاج عالمياً 1.15 مليار هكتار، وهي تمثل 31% من إجمالي الغابات على كوكب الأرض. في الولايات المتحدة، يمتلك القطاع الخاص حوالي نصف "أراضي الأخشاب" (Timberland)، بينما تدير الحكومة الفيدرالية والمحلية الجزء المتبقي.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TreePine className="text-green-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">إنتاج كندا</p>
                <p className="text-sm text-slate-400">تعد كندا لاعباً رئيسياً في إنتاج الأخشاب واللباب، بفضل مساحاتها الغابية الشاسعة وإدارتها الفنية المتقدمة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Mountain className="text-green-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">غابات الأمازون</p>
                <p className="text-sm text-slate-400">تظل الأمازون نقطة الارتكاز الأهم للتنوع الحيوي والمناخ العالمي، مع ضغوط مستمرة نحو حمايتها من التوسع الزراعي.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'North America (Regional Leader)', country: 'USA/Canada', note: 'أكبر مساحة مخصصة للإنتاج وأعلى معدلات حيازة خاصة لأراضي الأخشاب' },
    { name: 'Europe Forestry', country: 'EU', note: 'تمتلك أعلى نسبة غابات مخصصة للإنتاج (53%) مع معايير بيئية صارمة جداً' },
    { name: 'China Forestry Industry', country: 'China', note: 'قوة صناعية كبرى في معالجة الأخشاب وتصنيع الأثاث والمنتجات الورقية' },
    { name: 'Brazil (Amazon)', country: 'Brazil', note: 'تمتلك أكبر مساحة غابات مطيرة في العالم مع دور محوري في توازن الكربون' },
  ],

  definition: 'صناعة الغابات تختص بتطوير وزراعة وإدارة وحماية الغابات لتوفير الخشب، امتصاص الكربون، حماية الحياة البرية، وتوفير مساحات ترفيهية.',

  industryInsights: [
    'التخطيط طويل المدى هو جوهر الصناعة بسبب البطء الشديد في نمو الأشجار، مما يجعلها استثماراً استراتيجياً وقوراً',
    'أوروبا تتصدر العالم في كفاءة استخدام الغابات، حيث تُدار أكثر من نصف مساحاتها الغابية لأغراض إنتاجية مستدامة',
    'التحول نحو المباني الخشبية الشاهقة (Mass Timber) يفتح أسواقاً جديدة ضخمة لمنتجات الغابات في قطاع البناء المستدام',
  ],

  tags: ['Forestry', 'Timber', 'Canada Forestry', 'Amazon', 'Sustainable Management', 'Wood Production'],
  sectorId: 'forestry-dashboard',
};

const ForestryDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default ForestryDashboard;
