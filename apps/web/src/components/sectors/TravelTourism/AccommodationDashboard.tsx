import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Bed, Globe, BarChart3, TrendingUp, ShieldCheck, Smartphone, Leaf, Home } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'أماكن الإقامة والضيافة',
  titleEn: 'Accommodation Industry',
  subtitle: 'تحليل سوق الفنادق والمنتجعات، منصات المشاركة السكنية (Airbnb)، والتحول نحو الضيافة المستدامة والرقمية',
  icon: Bed,
  accent: 'blue',
  pdfLabel: 'تقرير الإقامة (PDF)',

  kpis: [
    { label: 'سوق الفنادق العالمي', value: '1.21', unit: 'تريليون $', icon: Globe },
    { label: 'إيرادات Airbnb', value: '8.4', unit: 'مليار $', icon: Home },
    { label: 'العلامة الرائدة (Marriott)', value: '1', unit: 'Market Value', icon: ShieldCheck },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق للفنادق والمنتجعات', 
      country: 'الولايات المتحدة', 
      note: 'تضم عمالقة الضيافة (Marriott, Hilton, Airbnb) وتسيطر على الحصة الأكبر من القيمة السوقية العالمية.',
      icon: Globe
    },
    { 
      label: 'أسرع أسواق النمو الفندقي', 
      country: 'الصين', 
      note: 'تشهد بناء آلاف الوحدات الفندقية الجديدة محلياً وتقود الانتعاش السياحي في منطقة آسيا والمحيط الهادئ.',
      icon: TrendingUp
    },
    { 
      label: 'عاصمة السياحة الفاخرة', 
      country: 'فرنسا / إسبانيا', 
      note: 'تتصدران العالم في عدد السياح الدوليين مع تركيز عالٍ على الفنادق التاريخية والضيافة الفاخرة.',
      icon: Bed
    }
  ],

  navItems: ['نظرة عامة', 'الفنادق ومنصات المشاركة', 'الاستدامة والرقمنة', 'القادة والتوجهات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'عصر جديد في الضيافة الشخصية',
      subtitle: 'A New Era in Personalized Hospitality',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يواجه قطاع الإقامة تحولاً عميقاً مدفوعاً بالابتكار الرقمي وتغير تفضيلات المسافرين. بعد تجاوز أزمة الجائحة، برزت معايير جديدة تركز على "Staycations" (السياحة الداخلية) والمعايير الصحية الصارمة، مع نمو هائل في الاعتماد على التكنولوجيا لإنهاء إجراءات الوصول والخدمات الذكية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Smartphone className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الرقمنة المتسارعة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  أصبح المسافرون يفضلون الخدمات "اللاتلامسية" عبر التطبيقات، من حجز الغرف إلى التحكم في الإضاءة ودرجة الحرارة عبر الهواتف الذكية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'الفنادق التقليدية مقابل مشاركة السكن',
      subtitle: 'Traditional Hotels vs Home-Sharing',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تشتعل المنافسة بين سلاسل الفنادق الكبرى ومنصات مثل Airbnb. توفر اقتصاديات المشاركة أسعاراً تشجيعية وتجارب محلية أصيلة، مما دفع الفنادق الكبرى (مثل Marriott و Hilton) لابتكار علامات تجارية جديدة تركز على الروح المحلية والتصاميم العصرية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Home className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">طفرة Airbnb</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">بإيرادات تجاوزت 8.4 مليار دولار، أثبتت Airbnb أن السكن التشاركي لم يعد مجرد خيار ثانوي بل قطاع مهيمن.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق الفنادق والمنتجعات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يظل قطاع الفنادق هو الأكبر قيمة، مع توقعات بوصول حجم السوق العالمي إلى مستويات قياسية في 2024 بعد سنوات التعافي.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'sustainability',
      title: 'الضيافة الخضراء والمستدامة',
      subtitle: 'Green & Sustainable Hospitality',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت الاستدامة ضرورة وليست خياراً؛ حيث يفضل المسافرون العلامات التي تعمل بمسؤولية لتقليل انبعاثات الكربون وهدر الموارد. تسعى الفنادق حالياً للحصول على شهادات "الأبنية الخضراء" وتقليل استخدام المواد البلاستيكية لمرة واحدة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Leaf className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تقليل الأثر البيئي</p>
                <p className="text-sm text-slate-400">المسافرون يبحثون عن أماكن إقامة تدعم الحفاظ على الطبيعة وتوفر خيارات غذائية محلية ومستدامة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الأصالة الثقافية</p>
                <p className="text-sm text-slate-400">يتزايد الطلب على التجارب التي تحترم التراث المحلي والمجتمعات المستضيفة لتجنب آثار "السياحة المفرطة".</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Marriott International Inc.', country: 'USA', note: 'المتصدر العالمي في القيمة السوقية ومبيعات الفنادق والمنتجعات الفاخرة' },
    { name: 'Hilton Worldwide', country: 'USA', note: 'واحدة من أضخم سلاسل الفنادق مع حضور قوي في كافة شرائح الضيافة عالمياً' },
    { name: 'Airbnb', country: 'USA', note: 'الشركة الرائدة في سوق مشاركة السكن والأسرع نمواً في قطاع التجارب السياحية' },
    { name: 'Wyndham Hotel Group', country: 'USA', note: 'تسيطر على أكبر عدد من الوحدات الفندقية المنتشرة في مختلف مناطق العالم' },
  ],

  definition: 'تشمل صناعة الإقامة كافة القطاعات التي توفر خدمات المبيت، من الفنادق والنزل إلى الشقق السياحية، منصات المشاركة، والمخيمات.',

  industryInsights: [
    'الذكاء الاصطناعي يُستخدم حالياً لتخصيص تجربة الضيف وتوقع احتياجاته قبل وصوله للفندق',
    'العمل من أي مكان (Workations) خلق شريحة جديدة من النزلاء الذين يبحثون عن إقامات طويلة مع مرافق مكتبية',
    'الفنادق الذكية التي تعتمد على إنترنت الأشياء (IoT) تحقق توفيراً في استهلاك الطاقة بنسبة تصل إلى 30%',
  ],

  tags: ['Accommodation', 'Hotels', 'Airbnb', 'Marriott', 'Sustainability', 'Hospitality', 'Digitalization'],
};

const AccommodationDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default AccommodationDashboard;
