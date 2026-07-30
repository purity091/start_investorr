import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Plane, Globe, BarChart3, TrendingUp, ShieldCheck, Zap, Fuel, Building2 } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الطيران',
  titleEn: 'Aviation Industry',
  subtitle: 'تحليل سوق النقل الجوي العالمي، الشحن الجوي، شركات الطيران منخفضة التكلفة، وتوجهات صافي الانبعاثات الصفرية',
  icon: Plane,
  accent: 'blue',
  pdfLabel: 'تقرير الطيران (PDF)',

  kpis: [
    { label: 'حجم السوق العالمي', value: '762.8', unit: 'مليار $', icon: Globe },
    { label: 'حركة الشحن الجوي', value: '57.7', unit: 'مليون طن', icon: BarChart3 },
    { label: 'العلامة الأثمن (Delta)', value: '7.3', unit: 'مليار $', icon: ShieldCheck },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق طيران داخلي', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أضخم قاعدة مسافرين محليين في العالم وتضم أكثر المطارات ازدحاماً.',
      icon: TrendingUp
    },
    { 
      label: 'أسرع أسواق النمو', 
      country: 'الصين', 
      note: 'تقود التوسع العالمي في عدد المسافرين الجدد والاستثمار في بنية المطارات التحتية.',
      icon: Globe
    },
    { 
      label: 'مركز الربط العالمي', 
      country: 'المملكة المتحدة', 
      note: 'تعد مركزاً حيوياً للرحلات الدولية والشحن الجوي بفضل موقعها الاستراتيجي وتاريخها.',
      icon: Plane
    }
  ],

  navItems: ['نظرة عامة', 'التعافي والنمو', 'الشحن والمنخفض التكلفة', 'الاستدامة والتقنية', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'شريان التنقل العالمي',
      subtitle: 'The Global Mobility Connector',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يعد الطيران مكوناً أساسياً من مكونات الحياة المعاصرة، حيث يربط الناس والبضائع عبر القارات في ساعات معدودة. وبإيرادات تتجاوز 760 مليار دولار في عام 2023، يظل القطاع محركاً استراتيجياً للاقتصاد العالمي ومركزاً للابتكار الهندسي واللوجستي.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Plane className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الولايات المتحدة: السوق الأكبر</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يظل السوق المحلي الأمريكي هو الأكبر عالمياً، حيث استقبل أكثر من 666 مليون مسافر، ويضم مطار أتلانتا (ATL) كأكثر المطارات ازدحاماً في العالم.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'low-cost',
      title: 'الطيران منخفض التكلفة والشحن',
      subtitle: 'LCCs & Air Cargo Growth',
      content: (
        <div className="space-y-6 text-right">
          <p>
            شهد العقد الأخير صعوداً لافتاً لشركات الطيران منخفضة التكلفة (LCCs)، خاصة في جنوب شرق آسيا حيث تجاوزت حصتها 50%. كما شكل الشحن الجوي "أوكسجين" القطاع أثناء الأزمات العالمية الأخيرة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">طيران Ryanair و Southwest</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تقود هاتان الشركتان فئة الطيران الاقتصادي بنماذج أعمال تركز على الكفاءة التشغيلية والخدمات الاختيارية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إيرادات الشحن الجوي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">رغم تحديات سلاسل التوريد، يظل الشحن قطاعاً واعداً بهوامش ربحية جيدة لشركات الطيران العالمية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'sustainability',
      title: 'نحو صافي انبعاثات صفرية 2050',
      subtitle: 'Net Zero 2050 & Decarbonization',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تلتزم الصناعة حالياً باستراتيجية طموحة لتحقيق صافي انبعاثات صفرية بحلول 2050. يتطلب ذلك ضخ استثمارات هائلة في وقود الطيران المستدام (SAF)، وتحسين كفاءة المحركات، وتطوير الطائرات الكهربائية والهيدروجينية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Fuel className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">وقود الطيران المستدام</p>
                <p className="text-sm text-slate-400">يمثل الـ SAF الحل الأكثر جدوى على المدى القريب لتقليل البصمة الكربونية دون تغيير جذري في البنية التحتية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Zap className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الطيران الكهربائي</p>
                <p className="text-sm text-slate-400">تتسارع الابتكارات في الطائرات الصغيرة والمتوسطة المدى لتعمل بالبطاريات في الرحلات الإقليمية القصيرة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Delta Air Lines', country: 'USA', note: 'المجموعة الأكبر من حيث الإيرادات وقيمة العلامة التجارية في السوق الأمريكي والعالمي' },
    { name: 'American Airlines', country: 'USA', note: 'واحدة من أضخم الأساطيل الجوية في العالم مع شبكة وجهات عالمية واسعة' },
    { name: 'Lufthansa Group', country: 'Germany', note: 'أكبر مشغل في أوروبا ورائدة في خدمات الصيانة والشحن الجوي' },
    { name: 'Ryanair', country: 'Ireland', note: 'الشركة الرائدة في الطيران منخفض التكلفة في أوروبا بأعلى عدد مسافرين إقليمياً' },
  ],

  definition: 'تشمل صناعة الطيران كافة جوانب النقل الجوي الميكانيكي للبضائع والركاب، وتتضمن مشغلي الرحلات، وكلاء الشحن، والبنية التحتية للمطارات.',

  industryInsights: [
    'الهند والصين تمثلان أسرع أسواق نمو المسافرين المتوقعة حتى عام 2037',
    'الاعتماد على التقنيات الرقمية في المطارات (Biometrics) يزيد من سرعة إنهاء الإجراءات بنسبة 30%',
    'الشحن الجوي يظل العامل الحاسم في التجارة الإلكترونية العابرة للحدود لتوصيل الطرود السريعة',
  ],

  tags: ['Aviation', 'Air Cargo', 'LCC', 'Net Zero 2050', 'Delta', 'Airports', 'SAF'],
};

const AviationDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default AviationDashboard;
