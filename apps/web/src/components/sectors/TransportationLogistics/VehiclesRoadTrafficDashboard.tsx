import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Car, Globe, BarChart3, TrendingUp, ShieldCheck, Zap, Battery, Cpu } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المركبات وحركة المرور',
  titleEn: 'Vehicles & Road Traffic',
  subtitle: 'تحليل سوق السيارات الكهربائية، السيارات ذاتية القيادة، مبيعات سيارات الركاب، وتوجهات النقل المستدام',
  icon: Car,
  accent: 'blue',
  pdfLabel: 'تقرير المركبات (PDF)',

  kpis: [
    { label: 'سوق الركاب الأكبر (الصين)', value: '75.3', unit: 'مليون وحدة مباعة', icon: Globe },
    { label: 'مبيعات السيارات الكهربائية', value: '14', unit: 'مليون وحدة', icon: Battery },
    { label: 'العلامة الرائدة (Toyota)', value: '1', unit: 'Market Leader', icon: ShieldCheck },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق لمبيعات السيارات', 
      country: 'الصين', 
      note: 'تتصدر العالم في إنتاج واستهلاك السيارات (خاصة الكهربائية عبر BYD) وتعد المحرك الرئيسي للنمو العالمي.',
      icon: Globe
    },
    { 
      label: 'رائد التكنولوجيا والسيارات الفاخرة', 
      country: 'ألمانيا', 
      note: 'مركز الهندسة المتقدمة والسيارات الفاخرة (Mercedes, BMW, VW) وتقود الابتكار في أنظمة الأمان والاحتراق الداخلي.',
      icon: Car
    },
    { 
      label: 'عاصمة السيارات الكهربائية والذاتية', 
      country: 'الولايات المتحدة', 
      note: 'مقر شركة Tesla وتقود ثورة القيادة الذاتية والتحول الكامل نحو الطاقة النظيفة في قطاع النقل الشخصي والتجاري.',
      icon: Battery
    }
  ],

  navItems: ['نظرة عامة', 'التحول نحو الكهرباء', 'السيارات ذاتية القيادة', 'القادة والأسواق', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'ثورة في صناعة التنقل',
      subtitle: 'A Revolution in Mobility Industry',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يشهد سوق السيارات تعافياً قوياً بعد الجائحة، حيث تجاوزت المبيعات العالمية 75 مليون وحدة في 2023. يقود هذا النمو الطلب المتزايد على السيارات الرياضية متعددة الاستخدامات (SUVs) والتوجه الحكومي الصارم لخفض الانبعاثات الكربونية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Car className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">هيمنة سيارات الركاب</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تعد الصين السوق الأكبر لسيارات الركاب عالمياً، بينما تسجل الأمريكتان أعلى مستويات لمبيعات المركبات التجارية والشاحنات.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'electric-shift',
      title: 'عصر المركبات الكهربائية (EV)',
      subtitle: 'The Age of Electric Vehicles',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تضاعفت مبيعات السيارات الكهربائية الموصلة (PEVs) بأكثر من 4 مرات منذ 2020 لتصل إلى 14 مليون وحدة سنوياً. أصبحت الاستدامة المحرك الأول للابتكار، مما دفع الشركات التقليدية والناشئة لاستثمار المليارات في تقنيات البطاريات.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Battery className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق البطاريات والشحن</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تظل سرعة الشحن وتوفر البنية التحتية هي العوائق الرئيسية أمام اعتماد واسع النطاق للمركبات الثقيلة الكهربائية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو الـ SUVs</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبحت سيارات الـ SUV الفئة الأكثر مبيعاً، حيث تصدرت Tesla Model Y القائمة كأكثر السيارات مبيعاً في العالم لعام 2023.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'autonomous-tech',
      title: 'الذكاء الاصطناعي والقيادة الذاتية',
      subtitle: 'AI & Autonomous Driving Future',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يمهد الذكاء الاصطناعي الطريق لجيل جديد من "المركبات المتصلة". تزيد استثمارات البحث والتطوير (R&D) بشكل مطرد لتعزيز ميزات السلامة المتقدمة وتحقيق استقلال كامل للقيادة في ظروف الطريق المعقدة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Cpu className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">أنظمة المساعدة (ADAS)</p>
                <p className="text-sm text-slate-400">أصبحت ميزات مثل الكبح التلقائي والحفاظ على المسار معياراً أساسياً في معظم المركبات الحديثة بفضل الرؤية الحاسوبية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Zap className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">التكنولوجيا المتصلة (V2X)</p>
                <p className="text-sm text-slate-400">تسمح للسيارات بالتواصل مع بعضها ومع البنية التحتية للطرق لتقليل الحوادث وتحسين تدفق المرور.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Toyota Motor Corp.', country: 'Japan', note: 'العلامة التجارية الأكثر مبيعاً وحصة سوقية عالمية مستقرة بفضل متانة مركباتها' },
    { name: 'Volkswagen Group', country: 'Germany', note: 'أكبر مصنع أوروبي يركز بقوة حالياً على ريادة سوق السيارات الكهربائية' },
    { name: 'Tesla Inc.', country: 'USA', note: 'أكثر علامات السيارات قيمة في العالم والرائدة في ابتكار السيارات الكهربائية والقيادة الذاتية' },
    { name: 'BYD Company', country: 'China', note: 'المنافس الشرس لـ Tesla والمهيمن على سوق السيارات الكهربائية في آسيا' },
  ],

  definition: 'تشمل صناعة المركبات وحركة المرور سيارات الركاب، المركبات التجارية، الدراجات النارية، وتغطي مجالات مبيعات السيارات، سلامة المرور، والبنية التحتية الطرقية.',

  industryInsights: [
    'سوق السيارات المستعملة يشهد نمواً قوياً نتيجة ارتفاع أسعار المركبات الجديدة ونقص الرقائق الإلكترونية',
    'التحول نحو النقل النشط (Active Mobility) مثل ركوب الدراجات في المدن يقلل البصمة الكربونية للفرد بشكل ملحوظ',
    'السيارات ذاتية القيادة بالكامل من المستوى 4 و 5 لا تزال تواجه تحديات قانونية وتشريعية قبل الاعتماد الواسع',
  ],

  tags: ['Automotive', 'Electric Vehicles', 'Tesla', 'Toyota', 'Autonomous Driving', 'SUVs', 'AI'],
};

const VehiclesRoadTrafficDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default VehiclesRoadTrafficDashboard;
