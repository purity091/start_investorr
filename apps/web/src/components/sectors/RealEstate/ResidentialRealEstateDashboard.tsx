import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Home, Users, Key, Globe, BarChart3, TrendingUp, DollarSign, MapPin } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'العقارات السكنية',
  titleEn: 'Residential Real Estate',
  subtitle: 'تحليل سوق الإسكان، أسعار الشقق في المدن الكبرى، اتجاهات الاستئجار مقابل التملك، ونماذج الاستثمار السكني',
  icon: Home,
  accent: 'indigo',
  pdfLabel: 'تقرير سوق الإسكان العالمي (PDF)',

  kpis: [
    { label: 'سعر المتر (موناكو)', value: '62.5K', unit: '$', icon: MapPin },
    { label: 'صناعة الإسكان (كندا)', value: '443.5K', unit: 'عملية بيع', icon: BarChart3 },
    { label: 'نسبة السعر للإيجار (بريطانيا)', value: '128.2', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق سكني في العالم', 
      country: 'الصين', 
      note: 'تمثل العقارات السكنية الحصة الأكبر من ثروة الأسر الصينية وتشهد نهضة عمرانية هائلة.',
      icon: Globe
    },
    { 
      label: 'رائد القيمة الاستثمارية', 
      country: 'الولايات المتحدة', 
      note: 'السوق الأكثر نضجاً للاستثمار السكني المؤسسي ويضم أكبر مجموعات بناء المنازل.',
      icon: Home
    },
    { 
      label: 'أسرع سوق نمو حضري', 
      country: 'الهند', 
      note: 'تشهد طلباً انفجارياً على الشقق السكنية في المدن الكبرى نتيجة التحضر السريع ونمو الدخل.',
      icon: MapPin
    }
  ],

  navItems: ['نظرة عامة', 'أسعار المدن الكبرى', 'التملك vs الإيجار', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'بناء الثروة وحجر الزاوية للمعيشة',
      subtitle: 'Equity Building & Global Wealth',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يعد امتلاك المنزل أهم أصل مالي في محفظة معظم الأسر. يركز قطاع الإسكان جزءاً كبيراً من الثروة العالمية، حيث شهدت أسعار المنازل اتجاهاً تصاعدياً شاملاً منذ الجائحة، مما زاد من جاذبية هذا القطاع كفئة استثمارية.
          </p>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
             <Key className="text-indigo-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-indigo-900 leading-tight">نموذج "البناء من أجل التأجير"</p>
                <p className="text-sm text-indigo-700/80 mt-2">
                  أصبحت العقارات متعددة العائلات (Build-to-rent) واحدة من أكبر فئات الأصول الاستثمارية، حيث يفضل الكثيرون المرونة التي يوفرها الاستئجار في المدن الكبرى.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'city-prices',
      title: 'تكلفة المعيشة في العواصم الكبرى',
      subtitle: 'Cost of Living in Prosperity Cities',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تصل أسعار الشقق في لندن إلى 14,000 يورو للمتر المربع، وهو ضعف السعر في كوبنهاجن وخمسة أضعاف السعر في وارسو، مما يعكس الفجوة الكبيرة في أسعار العقارات الأوروبية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <DollarSign className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق الرفاهية (موناكو)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعد موناكو الأغلى عالمياً، حيث لا يمكن لمليون دولار شراء سوى 16 متراً مربعاً من المساحات الفاخرة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">صمود سوق كندا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">رغم تقلبات الفائدة، حافظت كندا على نشاط عالي في مبيعات المنازل بمتوسط يتخطى 400 ألف عملية سنوياً.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'تحولات جيل الألفية والإيجار الدائم',
      subtitle: 'Millennials & The Forever Rent Trend',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يتزايد عدد جيل الألفية الذين يتوقعون البقاء في الإيجار للأبد بسبب انخفاض القدرة على تحمل تكاليف الشراء، مما يحول الاستئجار من "ضرورة" إلى "نمط حياة".
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Users className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">سكن كبار السن والطلاب</p>
                <p className="text-sm text-slate-400">تنمو قطاعات السكن المتخصصة كاستثمارات تجارية قوية تلبي احتياجات الديموغرافيا المتغيرة في أمريكا وأوروبا.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <MapPin className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تأثير تكلفة الاقتراض</p>
                <p className="text-sm text-slate-400">أدت معدلات الفائدة المرتفعة مؤخراً إلى تبريد السوق السكني وتصحيح طفيف في الأسعار بعد الطفرة الكبرى.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'CDN Apartment UN', country: 'Canada', note: 'أكبر صندوق استثمار عقاري (REIT) في كندا متخصص في العقارات السكنية' },
    { name: 'D.R. Horton', country: 'USA', note: 'أكبر شركة لبناء المنازل في الولايات المتحدة من حيث حجم الإيرادات' },
    { name: 'Vonovia', country: 'Germany', note: 'الرائد الأوروبي في امتلاك وإدارة المحافظ السكنية الضخمة' },
    { name: 'Lennar Corporation', country: 'USA', note: 'قوة هندسية واستثمارية كبرى في بناء المجمعات السكنية الفاخرة' },
  ],

  definition: 'تشمل العقارات السكنية العقارات المطورة لأغراض السكن، من الشقق الحضرية الكثيفة إلى المنازل المنفصلة في الضواحي، بالإضافة إلى صناديق الاستثمار السكني المستدرة للدخل.',

  industryInsights: [
    'المواقع المتميزة في مراكز المدن (Prime Locations) تظل استثمارات آمنة ضد التضخم وصدمات الاقتصاد',
    'نظام "العيش المشترك" (Coliving) أصبح الصرعة الجديدة في لندن ونيويورك لخفض تكلفة السكن للشباب المهنيين',
    'الطلب على "المنازل الذكية" والمستدامة يرفع قيمة العقار بنسبة تتراوح بين 5% و10% في الأسواق المتقدمة',
  ],

  tags: ['Residential Real Estate', 'Housing Market', 'Apartments', 'Homeownership', 'Real Estate Investment'],
};

const ResidentialRealEstateDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ResidentialRealEstateDashboard;
