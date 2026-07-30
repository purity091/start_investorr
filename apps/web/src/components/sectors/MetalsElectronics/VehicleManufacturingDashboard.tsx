import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Car, Smartphone, Zap, Globe, BarChart3, TrendingUp, Factory, Shield } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تصنيع المركبات والسيارات',
  titleEn: 'Vehicle Manufacturing Industry',
  subtitle: 'تحليل إنتاج السيارات العالمي، التحول للسيارات الكهربائية، تقنيات القيادة الذاتية، وقادة التصنيع والموردين',
  icon: Car,
  accent: 'blue',
  pdfLabel: 'تقرير سوق السيارات العالمي (PDF)',

  kpis: [
    { label: 'الإنتاج السنوي للمركبات', value: '94', unit: 'مليون وحدة', icon: Factory },
    { label: 'القيمة المضافة للصناعة', value: '0.9', unit: 'ترليون $', icon: TrendingUp },
    { label: 'الدولة الرائدة في الإنتاج', value: 'China', unit: 'الصين', icon: Globe },
  ],

  topMarkets: [
    { 
      label: 'أكبر منتج وسوق سيارات', 
      country: 'الصين', 
      note: 'تتصدر العالم في حجم الإنتاج السنوي وتعد المركز الأول للسيارات الكهربائية عالمياً.',
      icon: Globe
    },
    { 
      label: 'رائد الابتكار والتكنولوجيا', 
      country: 'الولايات المتحدة', 
      note: 'تقود التحول في القيادة الذاتية والبرمجيات المدمجة بفضل شركات مثل Tesla.',
      icon: Zap
    },
    { 
      label: 'عملاق الجودة والهندسة', 
      country: 'اليابان / ألمانيا', 
      note: 'موطن لأعرق العلامات التجارية (تويوتا وفولكس فاجن) والريادة في سلاسل التوريد العالمية.',
      icon: Factory
    }
  ],

  navItems: ['نظرة عامة', 'كهربة السيارات', 'الابتكار والقيادة الذاتية', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'صناعة السيارات: نمو وتحديات مستمرة',
      subtitle: 'Growth Amidst Structural Change',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            في عام 2023، تم إنتاج ما يقرب من 94 مليون مركبة بمحرك في جميع أنحاء العالم، مما يمثل العام الثالث على التوالي من النمو. رغم هذا التوسع، تواجه الصناعة تحديات خارجية تؤثر على هوامش الربح.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Zap className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">التحول نحو الكهربة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يشهد قطاع المركبات تغييرات هيكلية تقودها الكهربة والأتمتة، مع استثمارات ضخمة في الذكاء الاصطناعي لتعزيز الأمان وتجربة القيادة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-segments',
      title: 'سوق الركاب والموردين',
      subtitle: 'Passenger Cars & Global Suppliers',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تظل "سيارات الركاب" هي الجزء الأكبر في صناعة تصنيع المركبات، حيث يتم إنتاج ثلاثة أضعاف عدد سيارات الركاب مقارنة بالمركبات التجارية الخفيفة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Smartphone className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">هوامش ربح الموردين</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">على الرغم من نمو الإنتاج، لا تزال هوامش ربح موردي السيارات أقل من هوامش شركات تصنيع السيارات الأصلية (OEMs).</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أوروبا وآسيا كركائز</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتصدر ألمانيا (بوش) واليابان (دينسو) مشهد الموردين، بينما تهيمن تويوتا وفولكس فاجن على مبيعات السيارات.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'innovation',
      title: 'القيادة الذاتية وتقنيات البطاريات',
      subtitle: 'Autonomous Driving & AI Projects',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت القيادة الذاتية أحد أهم الاتجاهات، مع زيادة كبيرة في عدد براءات الاختراع النشطة، بجوار الاستثمار في شركات بطاريات السيارات الناشئة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Shield className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">سلامة معززة بالذكاء الاصطناعي</p>
                <p className="text-sm text-slate-400">يمول صانعو السيارات مشاريع ذكاء اصطناعي قادرة على تحسين السلامة وتجربة السائق بشكل جذري.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">قيمة مضافة 0.9 ترليون $</p>
                <p className="text-sm text-slate-400">يمثل تصنيع المقطورات والمركبات ذات المحركات 81% من إجمالي القيمة المضافة لقطاع السيارات العالمي.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Toyota Motor Corp', country: 'Japan', note: 'المتصدر العالمي في المبيعات وحجم الإنتاج السنوي' },
    { name: 'Volkswagen Group', country: 'Germany', note: 'الرائد الأوروبي في استراتيجيات التحول الكهربائي الشامل' },
    { name: 'Bosch', country: 'Germany', note: 'أكبر مورد عالمي لمكونات وتقنيات السيارات في العالم' },
    { name: 'Denso', country: 'Japan', note: 'المزود الرئيسي لأنظمة الإلكترونيات الحرارية في صناعة السيارات' },
  ],

  definition: 'يشمل قطاع تصنيع المركبات إنتاج سيارات الركاب، المركبات التجارية الخفيفة، الشاحنات، والموتوسيكلات، بالإضافة إلى قطع الغيار والخدمات والأنظمة المرتبطة بالقيادة الذاتية والكهربائية.',

  industryInsights: [
    'الصين تظل السوق والمنتج الأكبر للسيارات التقليدية والكهربائية في آن واحد',
    'القيادة الذاتية (Level 3 وما فوق) هي التحدي الهندسي القادم لمعظم الشركات الكبرى',
    'الاستثمار في البطاريات يمثل الحصة الأكبر من رأس المال الجريء في قطاع التنقل الكهربائي',
  ],

  tags: ['Vehicle Manufacturing', 'Automotive', 'Electric Vehicles', 'Autonomous Driving', 'Toyota', 'Volkswagen'],
};

const VehicleManufacturingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default VehicleManufacturingDashboard;
