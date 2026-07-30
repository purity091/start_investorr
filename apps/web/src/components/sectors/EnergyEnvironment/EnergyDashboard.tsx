import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Zap, Battery, Drill, Wind, Sun, Flame, Leaf, Database, BarChart3, TrendingUp, Globe } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الطاقة العالمي',
  titleEn: 'Global Energy Sector',
  subtitle: 'تحليل إنتاج الكهرباء، هيمنة الوقود الأحفوري، الطفرة في الطاقة المتجددة، وتقنيات تخزين الطاقة',
  icon: Zap,
  accent: 'amber',
  pdfLabel: 'تقرير سوق الطاقة العالمي (PDF)',

  kpis: [
    { label: 'إنتاج الكهرباء العالمي', value: '29,925', unit: 'TWh', icon: Zap },
    { label: 'سعة الطاقة المتجددة المثبتة', value: '4,448', unit: 'GW', icon: Wind },
    { label: 'المصدر الرئيسي للطاقة الأولية', value: 'Oil', unit: 'النفط الخام', icon: Flame },
  ],

  topMarkets: [
    { 
      label: 'أكبر منتج ومستهلك للطاقة', 
      country: 'الصين', 
      note: 'تتصدر العالم في استهلاك الطاقة الأولية والريادة المطلقة في تصنيع تقنيات الطاقة النظيفة.',
      icon: Globe
    },
    { 
      label: 'القائد في إنتاج النفط والغاز', 
      country: 'الولايات المتحدة', 
      note: 'حققت استقلالية طاقوية كبرى وتعد من أكبر منتجي الغاز الطبيعي والنفط الصخري عالمياً.',
      icon: Drill
    },
    { 
      label: 'رائد التحوّل الأخضر', 
      country: 'الاتحاد الأوروبي', 
      note: 'يقود العالم في وضع التشريعات البيئية والاعتماد المتزايد على طاقة الرياح والهدروجين.',
      icon: Leaf
    }
  ],

  navItems: ['نظرة عامة', 'حجم السوق', 'القطاعات', 'التوجهات (البطاريات)', 'القادة', 'الأسعار والإحصاءات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Energy Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            على مدى العقدين الماضيين، شهد قطاع الطاقة العالمي تحولات كبيرة مع ظهور الاقتصادات النامية كقادة في إنتاج واستهلاك الطاقة. وبينما يستمر الوقود الأحفوري في الهيمنة، فإن سياسات المناخ عززت نمو الطاقة المتجددة باستمرار.
          </p>
          <p>
            تعتبر الصين القوة المهيمنة في صناعة الطاقة لعام 2025، حيث تسيطر على سلاسل التوريد لتقنيات الطاقة النظيفة، مثل تكرير المعادن النادرة وتصنيع الألواح الشمسية ومكونات البطاريات.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'الصين: أكبر منتج ومستهلك للطاقة',
      subtitle: 'Market Size & Energy Consumption',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد الصين أكبر منتج ومستهلك للطاقة الأولية في العالم. بكونها ثاني أكبر اقتصاد وموطناً لأكثر من 1.4 مليار نسمة، فإنها تحتاج إلى وقود أكبر من أي دولة أخرى لتشغيل صناعاتها ومنازلها.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
             <div className="p-8 bg-amber-50 rounded-2xl border border-amber-100 flex flex-col items-center shrink-0 w-full md:w-64 text-center">
               <Database size={40} className="text-amber-600 mb-4" />
               <p className="text-3xl font-black text-amber-900">1.4B+</p>
               <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">عدد السكان المستفيدين في الصين</p>
            </div>
            <div className="flex-1 space-y-4">
              <p>
                منذ بداية القرن، تراجع الإنتاج والاستهلاك العالمي للطاقة مرتين فقط: في عام 2009 بعد الركود الكبير، وفي عام 2020 خلال جائحة كورونا.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'هيمنة الوقود الأحفوري والنمو المتجدد',
      subtitle: 'Market Segments & Fuels',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            لا يزال الوقود الأحفوري هو المصدر الرئيسي للطاقة الأولية عالمياً. وتعتبر المحطات الحرارية التي تعمل بالفحم والغاز المحرك الأساسي للاقتصادات الصاعدة مثل الهند والصين.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Sun className="text-amber-400 mb-3" size={24} />
              <p className="font-bold text-white mb-1">نمو الطاقة المتجددة</p>
              <p className="text-xs text-slate-400">تحقق الطاقة الشمسية والرياح أرقاماً قياسية في السعة المثبتة سنوياً، مع ريادة صينية واضحة.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Flame className="text-amber-400 mb-3" size={24} />
              <p className="font-bold text-white mb-1">الوقود الأحفوري</p>
              <p className="text-xs text-slate-400">لا يزال النفط والفحم والغاز الطبيعي يشكلون العمود الفقري لشبكات الطاقة العالمية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'دور البطاريات وتخزين الطاقة',
      subtitle: 'Battery Manufacturing Capacity',
      content: (
        <div className="space-y-6 text-right">
          <p>
            للحد من البصمة الكربونية، يتجه العالم نحو الكهرباء النظيفة وأنظمة تخزين الطاقة. تتيح البطاريات مرونة الشبكة وموازنتها، مما يسد الفجوة في إنتاج الطاقة المتجددة غير المستقر.
          </p>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
             <Battery className="text-amber-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-slate-900 leading-tight">الريادة الصينية في التصنيع</p>
                <p className="text-sm text-slate-600 mt-2">
                  الصين في طليعة تصنيع البطاريات (أكثر من 5000 جيجاواط ساعة مستهدفة بحلول 2030)، وهي تضع أكثر أهداف سعة التخزين طموحاً في العالم.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'prices',
      title: 'تذبذب وتحليق الأسعار',
      subtitle: 'Global Energy Prices',
      content: (
        <div className="space-y-6 text-right">
          <p>
            شهدت أسعار الغاز والفحم قفزات هائلة في عامي 2021 و2022، مما أثر على أسعار الكهرباء، خاصة بعد الغزو الروسي لأوكرانيا ونقص الإمدادات المفاجئ.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
             <div className="p-5 border border-amber-100 rounded-2xl bg-amber-50/50">
                <BarChart3 className="text-amber-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق الغاز الطبيعي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تأثرت الأسعار بشكل حاد في أوروبا والولايات المتحدة نتيجة التوترات الجيوسياسية.</p>
             </div>
             <div className="p-5 border border-amber-100 rounded-2xl bg-amber-50/50">
                <TrendingUp className="text-amber-600 mb-2" size={20} />
                <p className="font-black text-slate-900">استعادة الطلب</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعافي الطلب بعد الجائحة تزامن مع نقص السعة، مما أدى لنمو الأسعار بشكل مطرد في 2024.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'NextEra Energy', country: 'United States', note: 'المرافق الأكبر قيمة عالمياً مع استثمارات ضخمة في الطاقة النظيفة' },
    { name: 'Iberdrola', country: 'Spain', note: 'رائد عالمي في إنتاج طاقة الرياح والتحول الأخضر' },
    { name: 'Yangtze Power', country: 'China', note: 'عملاق الطاقة الكهرومائية وأكبر شركة مرافق في الصين' },
    { name: 'Tokyo Electron', country: 'Japan', note: 'تكنولوجيا متقدمة لمعدات الطاقة وأشباه الموصلات' },
    { name: 'Enel', country: 'Italy', note: 'إحدى أكبر شركات الطاقة المتنوعة في أوروبا والعالم' },
  ],

  definition: `يوفر قطاع الطاقة بيانات مفصلة لجميع مصادر الطاقة الرئيسية، مثل الوقود الأحفوري والطاقة المتجددة والنووية، مع التركيز الإضافي على صناعة وسوق الكهرباء. يشمل مؤشرات السوق الرئيسية، مثل الإنتاج والاستهلاك والأسعار، بالإضافة إلى الإحصاءات والتقارير حول الشركات الرائدة.`,

  industryInsights: [
    'الصين تسيطر على 80% من سلاسل توريد الألواح الشمسية ومكونات البطاريات عالمياً',
    'إنتاج الكهرباء من المصادر المتجددة ينمو بمعدل 15% سنوياً لتلبية الطلب المتزايد',
    'أسعار الطاقة العالمية استقرت نسبياً في 2024 بعد اضطرابات عامي 2022 و2023',
    'أنظمة تخزين الطاقة بالبطاريات هي المفتاح لاستقرار الشبكات الكهربائية في المستقبل',
  ],

  tags: ['Energy', 'Electricity', 'Renewables', 'Solar', 'Wind', 'Battery Storage', 'Oil & Gas', 'Nuclear Power'],
};

const EnergyDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default EnergyDashboard;
