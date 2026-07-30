import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Cpu, Leaf, Wind, Sun, Zap, Car, ShieldCheck, TrendingUp, History, Globe } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تكنولوجيا البيئة والتقنيات الخضراء',
  titleEn: 'Environmental Technology & Greentech',
  subtitle: 'تحليل استثمارات تكنولوجيا المناخ، سباق صافي الانبعاثات الصفري، وتقنيات احتجاز الكربون والنقل النظيف',
  icon: Cpu,
  accent: 'cyan',
  pdfLabel: 'تقرير التكنولوجيا الخضراء (PDF)',

  kpis: [
    { label: 'حصة الرياح والشمس من مزيج الكهرباء', value: '13%', unit: 'إجمالي الإنتاج', icon: Wind },
    { label: 'منشآت احتجاز الكربون (CCS) الكبرى', value: '43', unit: 'منشأة عالمية', icon: ShieldCheck },
    { label: 'حصة الصين من تصنيع طاقة الرياح', value: '65%', unit: 'قدرة التصنيع العالمية', icon: Globe },
  ],

  topMarkets: [
    { 
      label: 'عملاق تصنيع Cleantech', 
      country: 'الصين', 
      note: 'تهيمن على سلاسل التوريد العالمية للألواح الشمسية، توربينات الرياح، وبطاريات الليثيوم.',
      icon: Zap
    },
    { 
      label: 'مبتكر النقل المكهرب', 
      country: 'الولايات المتحدة', 
      note: 'تقود العالم في تطوير برمجيات القيادة الذاتية والبنية التحتية المتقدمة لمركبات الطاقة الجديدة.',
      icon: Car
    },
    { 
      label: 'رائد الهيدروجين الأخضر', 
      country: 'ألمانيا', 
      note: 'تستثمر بقوة في تطوير اقتصاد الهيدروجين لتقليل الانبعاثات في الصناعات الثقيلة والنقل البحري.',
      icon: Leaf
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'استثمارات المناخ', 'قطاعات النقل', 'إزالة الكربون', 'القادة الجدد', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أصبحت التكنولوجيا النظيفة، أو "Cleantech"، مجالاً ذا أهمية متزايدة في السنوات الأخيرة، مع اعتبار دورها في الحد من الانبعاثات ومكافحة تغير المناخ أمراً بالغ الأهمية. يعتمد نجاح الانتقال العالمي نحو "صافي الصفر" على نمو هذه التقنيات.
          </p>
          <p>
             نشأ سباق عالمي لقطاع التكنولوجيا النظيفة بين الصين والولايات المتحدة والاتحاد الأوروبي، حيث تتسارع الاستثمارات لتشمل الطاقة المتجددة والمركبات الكهربائية واحتجاز الكربون وتخزينه.
          </p>
        </div>
      ),
    },
    {
      id: 'investments',
      title: 'استثمارات تكنولوجيا المناخ الآخذة في الارتفاع',
      subtitle: 'Climate Tech Investments',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تجاوزت الاستثمارات العالمية في تحول الطاقة عتبة <strong>الترليون دولار</strong> لأول مرة في عام 2021، واستمرت في الارتفاع لتقفز بنسبة 17% في عام 2023 لتصل إلى مستوى قياسي جديد.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <div className="flex-1 space-y-4">
              <p>
                يتركز هذا التحول الاستثماري على نشر تقنيات متوافقة مع صافي الصفر، مع وجود منافسة شرسة بين القوى الاقتصادية الكبرى لتأمين سلاسل التوريد الخاصة بالتقنيات الخضراء.
              </p>
            </div>
            <div className="p-8 bg-cyan-50 rounded-2xl border border-cyan-100 flex flex-col items-center shrink-0 w-full md:w-64 text-center">
               <TrendingUp size={40} className="text-cyan-600 mb-4" />
               <p className="text-3xl font-black text-cyan-900">+17%</p>
               <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">نمو الاستثمار في 2023</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'transportation',
      title: 'النقل المكهرب والطاقة المتجددة',
      subtitle: 'Electrified Transportation & Renewables',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            يعد النقل المكهرب والطاقة المتجددة من أكبر مجالات الاستثمار في تحول الطاقة، حيث تلقى كل منهما أكثر من <strong>600 مليار دولار</strong> في عام 2023.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4">
              <Car className="text-cyan-400 shrink-0" size={24} />
              <div>
                <p className="font-bold text-white">النقل المكهرب</p>
                <p className="text-xs text-slate-400">ينمو بمعدل أسرع من الطاقة المتجددة نظراً للقفزة الهائلة في تبني المركبات الكهربائية عالمياً.</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4">
              <Sun className="text-cyan-400 shrink-0" size={24} />
              <div>
                <p className="font-bold text-white">الطاقة المتجددة</p>
                <p className="text-xs text-slate-400">ساهمت مع النقل بما يقرب من ثلاثة أرباع إجمالي استثمارات تحول الطاقة في العقد الأخير.</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'cdr',
      title: 'إزالة ثاني أكسيد الكربون (CDR)',
      subtitle: 'Carbon Dioxide Removal',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أحد أهم المواضيع الساخنة اليوم هو تقنيات إزالة الكربون من الغلاف الجوي وتخزينها بشكل دائم لعقود أو قرون.
          </p>
          <div className="flex items-start gap-5 p-6 bg-cyan-50 rounded-2xl border border-cyan-100">
             <History className="text-cyan-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-cyan-900 leading-tight">حلول للتخزين الدائم</p>
                <p className="text-sm text-cyan-800 leading-relaxed mt-2">
                  صرحت الهيئة الحكومية الدولية المعنية بتغير المناخ (IPCC) أن تقنيات CDR ستكون حاسمة لتحقيق انبعاثات سلبية ومعالجة آثار التغير المناخي المتراكمة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'الصين: العملاق المسيطر على Cleantech',
      subtitle: 'Industry Leaders',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تقود الصين حالياً سباق التكنولوجيا النظيفة العالمي، حيث تفوقت في الإنفاق على منافسيها وتهيمن على القدرة التصنيعية العالمية لتقنيات مثل أنظمة الرياح والطاقة الشمسية الكهروضوئية.
          </p>
          <div className="p-6 border border-slate-100 rounded-3xl space-y-4">
             <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <span className="font-bold text-slate-900">حصة الاستثمار في تحول الطاقة لعام 2024</span>
             </div>
             <div className="flex flex-wrap gap-2 justify-end">
                {['الصين (40%)', 'الولايات المتحدة', 'ألمانيا', 'المملكة المتحدة', 'الهند'].map((country, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700">
                    {country}
                  </span>
                ))}
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'China Yangtze Power', country: 'China', note: 'المتصدر الأول في توليد الطاقة الكهرومائية وتصنيع مكونات التكنولوجيا الخضراء' },
    { name: 'Tesla, Inc.', country: 'United States', note: 'الرائد العالمي في تبني النقل المكهرب وأنظمة تخزين الطاقة' },
    { name: 'ABB Group', country: 'Switzerland', note: 'مزود رائد لتقنيات التزويد بالكهرباء والأتمتة الصناعية لتقليل الانبعاثات' },
    { name: 'Iberdrola', country: 'Spain', note: 'أحد أكبر المستثمرين في البحوث والتطوير لتقنيات طاقة الرياح البحرية' },
    { name: 'NextEra Energy', note: 'أكبر شركة مرافق كهربائية في العالم تركز على تقنيات الرياح والشمس' },
  ],

  definition: `تقدم ستاتيستا معلومات حول أسواق مختلف القطاعات ضمن تخصص صناعة التكنولوجيا البيئية، سواء من منظور التطوير التكنولوجي أو تصنيع المعدات. كما يتم تضمين المعلومات المالية للقادة العالميين في السوق لتوفير نظرة شاملة على الصناعة.`,

  industryInsights: [
    'الاستثمارات في تحول الطاقة تتنامى بمعدل 17% سنوياً، متجاوزة الـ 1.3 تريليون دولار',
    'النقل المكهرب (EVs) يمثل نصف الاستثمارات الجديدة في قطاع التكنولوجيا النظيفة',
    'تقنيات إزالة الكربون (CDR) أصبحت ضرورة ملحة لتحقيق أهداف "صافي الصفر" المستقبلية',
    'الصين تسيطر على 65% من قدرة تصنيع طاقة الرياح و40% من إجمالي الاستثمار العالمي',
  ],

  tags: ['Greentech', 'Cleantech', 'Net Zero', 'Carbon Capture', 'Electric Vehicles', 'Solar PV', 'Energy Transition', 'Climate Tech'],
};

const GreentechDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default GreentechDashboard;
