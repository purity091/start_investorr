import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Settings, Construction, Drill, Globe, BarChart3, TrendingUp, Cpu, Factory } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تصنيع الآلات الصناعية',
  titleEn: 'Industrial Machinery Manufacturing',
  subtitle: 'تحليل إنتاج معدات البناء والتعدين، أدوات التصنيع، تقنيات الثورة الصناعية الثالثة (3D Printing)، وقادة السوق',
  icon: Settings,
  accent: 'orange',
  pdfLabel: 'تقرير الآلات الصناعية العالمي (PDF)',

  kpis: [
    { label: 'سوق معدات البناء والتعدين', value: '160.6', unit: 'مليار $', icon: Construction },
    { label: 'وحدات المعدات خارج الطرق', value: '45.6', unit: 'مليون وحدة', icon: Factory },
    { label: 'القائد الميداني (Caterpillar)', value: 'Sales', unit: 'الأول عالمياً', icon: Drill },
  ],

  topMarkets: [
    { 
      label: 'أكبر منتج ومستهلك للآلات', 
      country: 'الصين', 
      note: 'تسيطر على حوالي 29% من إنتاج أدوات الآلات عالمياً وتعد أضخم سوق لمعدات البناء نظراً لمشاريع التحضر الهائلة.',
      icon: Factory
    },
    { 
      label: 'رائد الجودة والآلات الدقيقة', 
      country: 'ألمانيا', 
      note: 'تشتهر بتصنيع أفضل هندسة للآلات الصناعية وأدوات الآلات عالية الدقة، وهي المورد الأول للمصانع الأوروبية.',
      icon: Settings
    },
    { 
      label: 'مركز الابتكار التقني', 
      country: 'اليابان', 
      note: 'تحتل المرتبة الثالثة عالمياً في الإنتاج وتتخصص في الروبوتات الصناعية والآلات المؤتمتة ذات التكنولوجيا المتقدمة.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'الأدوات والمعدات', 'الثورة الصناعية الرابعة', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'العمود الفقري للبنية التحتية العالمية',
      subtitle: 'The Heart of Global Infrastructure',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعتبر صناعة الآلات الصناعية ضرورية لتوفير البنية التحتية والخدمات اللوجستية، حيث تبني كل شيء من الأدوات البسيطة إلى المعدات الثقيلة الحيوية لقطاعات البناء والتعدين وتوزيع الطاقة.
          </p>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-4">
             <Factory className="text-orange-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-orange-900 leading-tight">التقدم التقني والإنتاجية</p>
                <p className="text-sm text-orange-700/80 mt-2">
                  ساهم التطور التكنولوجي في زيادة سرعة وجودة الإنتاج، مما أدى إلى تحسين الربحية الكلية مع استمرار التحول نحو الأتمتة المتقدمة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-segments',
      title: 'سوق معدات البناء والآلات',
      subtitle: 'Construction & Machine Tool Markets',
      content: (
        <div className="space-y-6 text-right">
          <p>
            بلغت قيمة سوق معدات البناء العالمي 160.6 مليار دولار في 2021، مع توقعات بنمو مستمر مدفوعاً بمشاريع التحضر الكبرى وبنيات مثل "طريق الحرير الجديد".
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-orange-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق أدوات الآلات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تمثل صناعة أدوات الآلات (Machine Tools) قطاعاً حيوياً بقيمة 84 مليار دولار، وتستخدم لتشكيل المعادن بدقة عالية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-orange-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الصين وألمانيا واليابان</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تسيطر الصين على 29% من حصة إنتاج أدوات الآلات، تليها ألمانيا بـ 15%، مما يجعلهما مراكز التصنيع الرئيسية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'future-trends',
      title: 'الثورة القادمة: الطباعة ثلاثية الأبعاد (3D)',
      subtitle: 'The Impact of Additive Manufacturing',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            بدأت تقنيات الطباعة ثلاثية الأبعاد في تغيير نموذج التصنيع من خلال بناء المنتجات طبقة تلو الأخرى، مما يوفر مرونة هائلة في النماذج الأولية والتصميمات المعقدة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Cpu className="text-orange-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الصناعة 4.0</p>
                <p className="text-sm text-slate-400">تدمج المصانع الذكية مستشعرات إنترنت الأشياء مع الآلات الثقيلة للتنبؤ بالأعطال وتحسين كفاءة استهلاك الطاقة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Construction className="text-orange-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">المعدات الثقيلة</p>
                <p className="text-sm text-slate-400">تظل Caterpillar القوة المهيمنة في سوق معدات التعدين والبناء بفضل شبكة انتشارها العالمية الواسعة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Caterpillar Inc.', country: 'USA', note: 'الرائد العالمي في تصنيع معدات البناء والتعدين والمحركات' },
    { name: 'Deere & Company', country: 'USA', note: 'المتصدر في قطاع الآلات الزراعية وتكنولوجيا الغابات' },
    { name: 'Volvo Group', country: 'Sweden', note: 'قوة صناعية كبرى في مجال الشاحنات والمعدات الإنشائية' },
    { name: 'KONE', country: 'Finland', note: 'أحد القادة العالميين في صناعة المصاعد والسلالم المتحركة' },
  ],

  definition: 'تشمل صناعة تصنيع الآلات الصناعية إنتاج كافة الآلات الميكانيكية لقطاعات التعدين، التصنيع، الطاقة، والبناء، بالإضافة إلى الأجهزة المنزلية الكبيرة.',

  industryInsights: [
    'التوجه نحو "كهربة" الآلات الثقيلة يقلل من الانبعاثات في مواقع العمل الكبرى',
    'الطباعة ثلاثية الأبعاد ستمكن من إنتاج قطع غيار الآلات في مواقع العمل البعيدة',
    'يعيد التحضر السريع في آسيا تشكيل الطلب العالمي على معدات البناء الضخمة',
  ],

  tags: ['Industrial Machinery', 'Caterpillar', '3D Printing', 'Construction Equipment', 'Industry 4.0'],
};

const IndustrialMachineryDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default IndustrialMachineryDashboard;
