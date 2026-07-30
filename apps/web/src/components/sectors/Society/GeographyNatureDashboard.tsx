import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Mountain, Waves, TreePine, Map, BarChart3, TrendingUp, Globe, AlertCircle } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الجغرافيا والطبيعة',
  titleEn: 'Geography & Nature Industry',
  subtitle: 'تحليل الموارد الطبيعية، تغير المناخ، الحفاظ على الحياة البرية، وتوزيع الغابات والحدود العالمية',
  icon: Globe,
  accent: 'blue',
  pdfLabel: 'تقرير البيئة والجغرافيا (PDF)',

  kpis: [
    { label: 'أطول حدود (كندا-أمريكا)', value: '8,891', unit: 'كم', icon: Map },
    { label: 'أكبر صحراء في العالم', value: 'Antarctic', unit: 'Desert', icon: Mountain },
    { label: 'النمور البرية في الهند', value: '2,967', unit: 'نمر', icon: TreePine },
  ],

  topMarkets: [
    { 
      label: 'أكبر رئة خضراء في العالم', 
      country: 'البرازيل', 
      note: 'تضم غابات الأمازون الشاسعة التي تعد مركزاً عالمياً للتنوع البيولوجي ومخزناً حيوياً للكربون.',
      icon: TreePine
    },
    { 
      label: 'أضخم كتلة يابسة متصلة', 
      country: 'روسيا', 
      note: 'تحتل المساحة الأكبر جغرافياً في العالم، وتضم تنوعاً تضاريسياً وموارد طبيعية هائلة غير مستغلة.',
      icon: Globe
    },
    { 
      label: 'رائد جهود الحفاظ البري', 
      country: 'الهند / كينيا', 
      note: 'تتميز بأقوى مبادرات الحماية لأنواع الحيوانات المهددة بالانقراض (مثل النمور والفيلة) وتطوير السياحة البيئية المستدامة.',
      icon: Waves
    }
  ],

  navItems: ['نظرة عامة', 'الجغرافيا الطبيعية', 'الجغرافيا البشرية', 'الحيوانات والنباتات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'كوكبنا المهدد بالتغيير',
      subtitle: 'Our Plastic Planet & Climate Threat',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يتعامل هذا الموضوع مع العالم من حولنا، من المناظر الطبيعية الفيزيائية إلى تجمعات الحيوانات والحدود من صنع الإنسان. يتعرض العالم الطبيعي حالياً لتهديد من تغير المناخ، حيث تتقلص الغابات، وتتوسع الصحاري، وتذوب الصفائح الجليدية بشكل متسارع.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <AlertCircle className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">تحدي الحفاظ على الموارد</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تعد الموارد الطبيعية مصدراً للدخل للكثيرين، مما يخلق مقاومة لجهود الحفاظ على البيئة، ويتطلب استجابة دولية منسقة لحماية مستقبل الكوكب.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'physical-geography',
      title: 'الجغرافيا الطبيعية والموارد المتجددة',
      subtitle: 'Physical Geography & Renewable Energy',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتعامل الجغرافيا الطبيعية مع العمليات والأنماط الطبيعية، من أطول الجبال إلى أعمق نقاط المحيطات. تبرز أهمية فهم هذه الأنماط اليوم لاستغلال طاقة الرياح والمد والجزر والطاقة الحرارية الأرضية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TreePine className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">مساحات الغابات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تمتلك دول مثل روسيا والبرازيل وكندا أكبر مساحات الغابات في العالم التي تعمل كرئات للأرض.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Waves className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">طاقة المياه</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبحت السواحل والأنهار مصدراً حيوياً للطاقة المتجددة في ظل التحول الأخضر العالمي.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'wildlife-conservation',
      title: 'الحفاظ على الحياة البرية والتعافي',
      subtitle: 'Wildlife Conservation & Biodiversity',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تزداد سرعة انقراض الأنواع بسبب تدمير النظم البيئية وتغير المناخ. تبرز جهود الحفاظ على البيئة كضرورة ملحة لمنع الضرر البيئي الذي لا يمكن إصلاحه.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Globe className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">المدن العملاقة (Megacities)</p>
                <p className="text-sm text-slate-400">تنمو المدن في منطقة آسيا والمحيط الهادئ لتصبح "ميغالوبوليس" تضم أكثر من 80 مليون نسمة، مما يضغط على الموارد الطبيعية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">إعادة التوازن البيئي</p>
                <p className="text-sm text-slate-400">تركز المبادرات الدولية مثل Living Planet Index على مراقبة التهديدات التي تواجه الحياة البرية وتوجيه جهود الإنقاذ.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Amazon Rainforest', country: 'Brazil', note: 'أكبر مخزن للتنوع البيولوجي في العالم وتخضع لمراقبة دولية لحماية الغابات' },
    { name: 'Indian Wildlife Trust', country: 'India', note: 'حققت نجاحاً بارزاً في زيادة أعداد النمور البرية عبر برامج حماية صارمة' },
    { name: 'Living Planet Index', country: 'Global', note: 'المؤشر العالمي الرائد لقياس حالة التنوع البيولوجي في الكوكب' },
    { name: 'Conservation International', country: 'Global', note: 'منظمة تعمل على حماية الطبيعة من أجل رفاهية البشرية عبر الحلول القائمة على الطبيعة' },
  ],

  definition: 'تتعامل بيانات الجغرافيا والطبيعة مع العالم الطبيعي والجوانب الجغرافية البشرية، بما في ذلك أعداد الحيوانات، مساحات الأراضي، والميزات الفيزيائية للأرض.',

  industryInsights: [
    'تغير المناخ قد يؤدي إلى فقدان 20% من الأنواع البرية بحلول نهاية القرن إذا لم يتم اتخاذ تدابير حماية فورية',
    'المدن الذكية والمستدامة هي الحل المقترح لتقليل استهلاك الموارد الطبيعية في المدن العملاقة المتنامية',
    'استخدام البيانات الجغرافية الضخمة (GIS) يساهم في تحسين القدرة على التنبؤ بالكوارث الطبيعية بنسبة 50%',
  ],

  tags: ['Geography', 'Nature', 'Environment', 'Climate Change', 'Wildlife', 'Biodiversity'],
};

const GeographyNatureDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default GeographyNatureDashboard;
