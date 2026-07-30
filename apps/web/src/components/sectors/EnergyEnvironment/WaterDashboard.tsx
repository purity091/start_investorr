import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Waves, Droplets, Filter, Globe, ShieldCheck, TrendingUp, BarChart3, Building2, MapPin } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المياه والصرف الصحي',
  titleEn: 'Water & Wastewater',
  subtitle: 'تحليل موارد المياه العذبة، خدمات الصرف الصحي العالمية، تقنيات تحلية المياه، وإدارة الندرة',
  icon: Waves,
  accent: 'blue',
  pdfLabel: 'تقرير قطاع المياه العالمي (PDF)',

  kpis: [
    { label: 'المياه العذبة المتاحة للاستهلاك', value: '< 1%', unit: 'إجمالي موارد الأرض', icon: Droplets },
    { label: 'أشخاص بلا خدمات مياه شرب أساسية', value: '703M', unit: 'مليون شخص', icon: Globe },
    { label: 'قدرة تحلية المياه في الشرق الأوسط', value: '> 50%', unit: 'الحصة العالمية', icon: MapPin },
  ],

  topMarkets: [
    { 
      label: 'رائد تحلية المياه العالمي', 
      country: 'المملكة العربية السعودية', 
      note: 'تتصدر العالم في إنتاج المياه المحلاة عبر مشاريع عملاقة مثل محطة الجبيل، وتمتلك خبرات تقنية رائدة.',
      icon: MapPin
    },
    { 
      label: 'أكبر احتياطيات مياه متجددة', 
      country: 'الصين', 
      note: 'تمتلك أضخم موارد مائية متجددة في العالم وتستثمر بكثافة في البنية التحتية لنقل ومعالجة المياه.',
      icon: Globe
    },
    { 
      label: 'أكبر سوق لمرافق المياه', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أكبر سوق مالي لشركات مرافق المياه المدرجة وتدير شبكات توزيع وصرف صحي هي الأضخم عالمياً.',
      icon: Building2
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'موارد المياه', 'الصرف الصحي', 'تحلية المياه', 'القادة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تغطي المياه حوالي 70% من سطح الأرض، ومع ذلك فإن أقل من 1% فقط من موارد المياه الإجمالية للكوكب يمكن تصنيفها كمياه عذبة يمكن الوصول إليها للاستهلاك البشري.
          </p>
          <p>
             يستمر الطلب على المياه في الارتفاع مع نمو السكان وتحسن الاقتصادات، بينما يضع تغير المناخ وتلوث المياه ضغوطاً إضافية على الإمدادات، مما يزيد من أهمية قطاع المياه في توفير الأمن المائي.
          </p>
        </div>
      ),
    },
    {
      id: 'resources',
      title: 'موارد المياه المتجددة حول العالم',
      subtitle: 'Renewable Water Resources',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تستضيف القارة الأمريكية ثلاثاً من بين الدول الخمس الأ غنى بالمياه في العالم: البرازيل وكندا وبيرو، والتي تمتلك معاً أكثر من 14 تريليون متر مكعب من المياه المتجددة.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center shrink-0 w-full md:w-64 text-center">
               <Droplets size={40} className="text-blue-600 mb-4" />
               <p className="text-3xl font-black text-blue-900">8.5T</p>
               <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">احتياطي الصين (متر مكعب)</p>
            </div>
            <div className="flex-1 space-y-4">
              <p>
                تعد الصين الدولة التي تمتلك أكبر قدر من احتياطيات المياه المتجددة، حيث تمتلك ما يقرب من 8.5 تريليون متر مكعب، تليها روسيا والبرازيل.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'sanitation',
      title: 'الوصول إلى مرافق الصرف الصحي',
      subtitle: 'Sanitation Access',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            حصل ما يقرب من 4.5 مليار شخص في جميع أنحاء العالم على خدمات صرف صحي مدارة بأمان في عام 2022، وهو ما يمثل زيادة كبيرة منذ بداية القرن.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <ShieldCheck className="text-blue-400 mb-3" size={24} />
              <p className="font-bold text-white">إدارة آمنة</p>
              <p className="text-xs text-slate-400">57% من سكان العالم لديهم الآن إمكانية الوصول إلى مرافق صرف صحي مدارة بأمان.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <TrendingUp className="text-blue-400 mb-3" size={24} />
              <p className="font-bold text-white">تحسينات مستمرة</p>
              <p className="text-xs text-slate-400">انخفض عدد الأشخاص الذين يمارسون التغوط في العراء إلى حوالي 400 مليون شخص عالمياً.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'desalination',
      title: 'تحلية المياه كحل للندرة',
      subtitle: 'Desalination Trends',
      content: (
        <div className="space-y-6 text-right">
          <p>
            مع تزايد ندرة المياه، أصبح البحث عن مصادر بديلة للمياه العذبة توجهاً رئيسياً. أصبحت تحلية مياه البحر للاستهلاك البشري ممارسة شائعة في الدول التي تفتقر لمصادر الطبيعة.
          </p>
          <div className="flex items-start gap-5 p-6 bg-blue-50 rounded-2xl border border-blue-200">
             <Filter className="text-blue-700 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-slate-900 leading-tight">هيمنة الشرق الأوسط</p>
                <p className="text-sm text-slate-700 leading-relaxed mt-2">
                  تستحوذ منطقة الشرق الأوسط على الحصة الأكبر من قدرة تحلية المياه العالمية بنسبة تزيد عن <strong>50%</strong>، تليها أمريكا الشمالية بنسبة تقارب 20%.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'كبرى شركات المياه العالمية',
      subtitle: 'Leading Water Companies',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتحمل شركات المياه مسؤولية توفير مياه شرب آمنة وخدمات معالجة مياه الصرف الصحي، فضلاً عن صيانة شبكات الأنابيب والمجاري الواسعة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
             {[
               { name: 'Acwa Power', country: 'S. Arabia', val: '$50B+' },
               { name: 'American Water', country: 'U.S.', val: '$26B' },
               { name: 'Xylem', country: 'U.S.', val: '$28B' },
               { name: 'Suez SA', country: 'France', val: '$15B+' },
               { name: 'Severn Trent', country: 'UK', val: '$8B' },
             ].map((company, idx) => (
               <div key={idx} className="p-5 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-black text-blue-600 mb-1">{company.country}</p>
                  <p className="font-black text-slate-800">{company.name}</p>
                  <p className="text-[10px] text-slate-400 mt-1">القيمة السوقية: {company.val}</p>
               </div>
             ))}
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Acwa Power', country: 'Saudi Arabia', note: 'الرائد العالمي في مشاريع تحلية المياه والطاقة المتجددة' },
    { name: 'American Water Works', country: 'United States', note: 'أكبر شركة مرافق مياه وصرف صحي مدرجة في أمريكا الشمالية' },
    { name: 'Xylem', country: 'United States', note: 'متخصص في تكنولوجيا المياه وحلول النقل والمعالجة الذكية' },
    { name: 'Suez SA', country: 'France', note: 'لاعب تاريخي عالمي في خدمات المياه وإدارة النفايات' },
    { name: 'Severn Trent', country: 'United Kingdom', note: 'إحدى كبرى شركات المياه في المملكة المتحدة تخدم ملايين العملاء' },
  ],

  definition: `توفر فئة المياه والصرف الصحي إحصاءات وتقارير حول جميع الجوانب المتعلقة بقطاع المياه العالمي. وتشمل هذه المواضيع الطلب والاستهلاك، معالجة المياه والصرف، ندرة المياه، فضلاً عن أسعار المياه وشركات المرافق.`,

  industryInsights: [
    'أقل من 1% من مياه الكوكب عذبة ومتاحة، مما يجعل الأمن المائي أولوية قصوى للدول',
    'الشرق الأوسط يمتلك أكثر من 50% من قدرة تحلية المياه في العالم لمواجهة الندرة الطبيعية',
    'البرازيل وكندا والصين تمتلك أضخم احتياطيات المياه المتجددة في العالم',
    'أكثر من 4.5 مليار شخص لديهم وصول للصرف الصحي المدار بأمان، بزيادة مضاعفة عن مطلع القرن',
  ],

  tags: ['Water', 'Wastewater', 'Desalination', 'Sanitation', 'Freshwater', 'Water Utilities', 'Environmental Policy'],
};

const WaterDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default WaterDashboard;
