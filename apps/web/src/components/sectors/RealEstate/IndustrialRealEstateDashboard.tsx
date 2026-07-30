import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Warehouse, Truck, Package, Globe, BarChart3, TrendingUp, Settings, Navigation } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'العقارات الصناعية واللوجستية',
  titleEn: 'Industrial & Logistics Real Estate',
  subtitle: 'تحليل مراكز التوزيع، المستودعات العملاقة (Big-Box)، الخدمات اللوجستية للميل الأخير، وأتمتة سلاسل التوريد',
  icon: Warehouse,
  accent: 'blue',
  pdfLabel: 'تقرير العقارات اللوجستية (PDF)',

  kpis: [
    { label: 'الاستثمارات الصناعية في أوروبا', value: '32', unit: 'مليار €', icon: BarChart3 },
    { label: 'شغور المراكز في طوكيو', value: '7.1%', icon: Globe },
    { label: 'أكبر شركة صناديق صناعية', value: 'Prologis', unit: 'الأولى', icon: Warehouse },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق لوجستي وصناعي', 
      country: 'الولايات المتحدة', 
      note: 'موطن لأكبر شركات العقارات اللوجستية (Prologis) وتمتلك أضخم شبكات المستودعات لخدمة التجارة الإلكترونية.',
      icon: Truck
    },
    { 
      label: 'رائد الأتمتة والنمو اللوجستي', 
      country: 'المملكة المتحدة', 
      note: 'يشهد سوقها طلباً تاريخياً على مستودعات الميل الأخير (Last-mile) وأعلى معدلات نمو في إيجارات العقارات الصناعية.',
      icon: Package
    },
    { 
      label: 'المركز الصناعي لشرق آسيا', 
      country: 'اليابان (طوكيو)', 
      note: 'تتميز بمرافق لوجستية فائقة التطور وأتمتة عالية لمواجهة نقص الأيدي العاملة وضمان كفاءة سلاسل التوريد.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'سلاسل التوريد', 'المراكز اللوجستية', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'محرك التجارة الإلكترونية وسلاسل التوريد',
      subtitle: 'Supporting Rising E-commerce Demand',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يشمل قطاع العقارات الصناعية واللوجستية مرافق التصنيع، مراكز التوزيع، ومستودعات "الميل الأخير" (Last Mile). تعتمد كفاءة هذا القطاع على الموقع الاستراتيجي بالقرب من الموانئ والمطارات والطرق السريعة.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Settings className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الأتمتة والكفاءة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  أصبحت الأتمتة عاملاً حاسماً في هذا القطاع لتقليل التكاليف وزيادة كفاءة العمليات، حيث يتم بناء المرافق الحديثة لتناسب احتياجات لوجستية محددة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-insights',
      title: 'نمو الاستثمار والطلب العالمي',
      subtitle: 'Global Investment & Demand Hubs',
      content: (
        <div className="space-y-6 text-right">
          <p>
            حفز نمو التجارة الإلكترونية والحاجة لسلاسل توريد مرنة بعد الجائحة الاستثمار في هذا القطاع، خاصة في المملكة المتحدة وألمانيا وفرنسا.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Navigation className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">مراكز الطلب في أمريكا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتصدر تكساس (هيوستن ودالاس) وبنسلفانيا قائمة المناطق الأكثر طلباً على العقارات الصناعية في الولايات المتحدة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إيجارات المستودعات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">شهدت إيجارات مستودعات (Big-Box) نمواً مستمراً منذ عام 2012 نتيجة الطلب المرتفع ونقص المساحات المتاحة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'خدمات التخزين والقطاعات المتخصصة',
      subtitle: 'Self-Storage & Specialized Logistics',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت مرافق التخزين الذاتي (Self-storage) خياراً رائجاً للأفراد والشركات، وتتصدر شركات مثل Public Storage هذا السوق بقيمة سوقية كبرى.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Package className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">لوجستيات الميل الأخير</p>
                <p className="text-sm text-slate-400">الاقتراب من العميل النهائي هو الهدف الاستراتيجي لهذه المرافق لضمان سرعة التوصيل وخفض تكاليف النقل.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Truck className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الصمود أمام الأزمات</p>
                <p className="text-sm text-slate-400">أثبت قطاع العقارات اللوجستية مرونة استثنائية خلال الأزمات العالمية مقارنة ببقية قطاعات العقارات التجارية.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Prologis', country: 'USA', note: 'المتصدر العالمي في عقارات اللوجستيات والمستودعات والمالك لأضخم محفظة صناعية' },
    { name: 'Public Storage', country: 'USA', note: 'أكبر مشغل لمرافق التخزين الذاتي (Self-storage) في العالم' },
    { name: 'Segro', country: 'UK', note: 'الرائد في عقارات المستودعات والمرافق الصناعية في أوروبا' },
    { name: 'Goodman Group', country: 'Australia', note: 'أحد أقطاب الاستثمار العقاري الصناعي العالمي' },
  ],

  definition: 'تشمل العقارات الصناعية أي عقار يستخدم للتصنيع، التخزين، التوزيع، أو الوظائف الخاصة الأخرى. تتميز هذه العقارات بعقود إيجار طويلة الأجل وتخصص وظيفي عالي.',

  industryInsights: [
    'تعد مرافق "التخزين البارد" (Cold Storage) أسرع الأقسام نمواً لخدمة قطاع الأغذية والأدوية',
    'المستودعات الذكية تستخدم الآن الروبوتات والذكاء الاصطناعي لزيادة سعة التخزين بنسبة 30%',
    'الطلب على عقارات الميل الأخير في المدن الكبرى أدى لظهور "المستودعات العمودية" متعددة الطوابق',
  ],

  tags: ['Industrial Property', 'Warehouses', 'Logistics', 'Supply Chain', 'Self-storage', 'Prologis'],
};

const IndustrialRealEstateDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default IndustrialRealEstateDashboard;
