import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Truck, Globe, BarChart3, TrendingUp, ShieldCheck, Box, ShoppingCart, Cpu } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الخدمات اللوجستية',
  titleEn: 'Logistics Industry',
  subtitle: 'تحليل تكاليف الخدمات اللوجستية العالمية، سوق 3PL، لوجستيات الميل الأخير، وتأثير التجارة الإلكترونية',
  icon: Truck,
  accent: 'blue',
  pdfLabel: 'تقرير اللوجستيات (PDF)',

  kpis: [
    { label: 'تكاليف اللوجستيات عالمياً', value: '11.41', unit: 'تريليون $', icon: Globe },
    { label: 'سوق الـ 3PL العالمي', value: '1.099', unit: 'تريليون $', icon: BarChart3 },
    { label: 'قائد السوق (UPS)', value: '231.5', unit: 'مليار إيراد', icon: ShieldCheck },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق لوجستي عالمي', 
      country: 'الولايات المتحدة', 
      note: 'تحتل الصدارة بفضل البنية التحتية المتطورة وشبكة شركات الشحن العملاقة والتحول الرقمي.',
      icon: TrendingUp
    },
    { 
      label: 'محرك التجارة والإنتاج', 
      country: 'الصين', 
      note: 'أضخم مركز لوجستي للتصنيع والتصدير العالمي مع استثمارات هائلة في موانئ ذكية.',
      icon: Globe
    },
    { 
      label: 'قوة لوجستية صاعدة', 
      country: 'الهند', 
      note: 'تشهد نمواً متسارعاً في تحسين كفاءة سلاسل التوريد والخدمات اللوجستية المتكاملة.',
      icon: Truck
    }
  ],

  navItems: ['نظرة عامة', 'سوق الـ 3PL', 'تحديات الميل الأخير', 'القادة والتكنولوجيا', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'محرك التجارة العالمية',
      subtitle: 'The Global Trade Catalyst',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعد اللوجستيات جزءاً لا يتجزأ من الاقتصاد العالمي، حيث تعتمد عليها كافة الصناعات لنقل المواد الخام والسلع النهائية. وبوصول تكلفة هذا القطاع عالمياً إلى أكثر من 11 تريليون دولار، تظل الكفاءة في النقل بالبر والجو والماء هي الدافع الرئيسي لنمو الأسواق.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <ShoppingCart className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">طفرة التجارة الإلكترونية</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  دفع سلوك المستهلك نحو التسوق عبر الإنترنت شركات مثل Amazon لتوسيع سلاسل توريدها الخاصة ومنافسة عمالقة اللوجستيات التقليديين.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: '3pl-market',
      title: 'لوجستيات الطرف الثالث (3PL)',
      subtitle: 'Third-Party Logistics Evolution',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتجه الشركات بشكل متزايد لتفويض عملياتها الثانوية لمزودي 3PL المتخصصين. تعد الولايات المتحدة والصين أكبر الأسواق لهذا القطاع، حيث تتصدر شركات مثل C.H. Robinson و XPO المشهد الأمريكي.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق آسيا والمحيط الهادئ</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تمثل المنطقة الحصة الأكبر من تكاليف اللوجستيات عالمياً بسبب حجم التصنيع الضخم في الصين واليابان.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أرباح قياسية لشركات الطرود</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">حققت UPS و FedEx و DHL إيرادات استثنائية خلال سنوات الجائحة وما بعدها نتيجة استمرار الطلب على التوصيل المنزلي.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'last-mile',
      title: 'معركة الميل الأخير والـ AI',
      subtitle: 'The Last Mile Battle & AI',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يمثل "الميل الأخير" التحدي الأكبر والأغلى في اللوجستيات. تتبارى الشركات في استخدام الذكاء الاصطناعي لتحسين مسارات التوصيل وأتمتة المستودعات لتقليل الزمن اللازم لوصول الطرود للعملاء.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Cpu className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الذكاء الاصطناعي في اللوجستيات</p>
                <p className="text-sm text-slate-400">يستخدم في التنبؤ بالطلب، إدارة المخزون الذكية، وتطوير الروبوتات القادرة على فرز الطرود بسرعة فائقة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Box className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">سلسلة التبريد (Cold Chain)</p>
                <p className="text-sm text-slate-400">قطاع متنامي يركز على نقل الأدوية والأغذية الحساسة لدرجات الحرارة بتقنيات تتبع دقيقة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'United Parcel Service (UPS)', country: 'USA', note: 'المتصدر العالمي في إيرادات خدمات 3PL وتوصيل الطرود بحصة سوقية ضخمة' },
    { name: 'Deutsche Post DHL', country: 'Germany', note: 'الشركة الرائدة في الشحن الدولي والبريد عبر شبكة عالمية تربط أكثر من 220 دولة' },
    { name: 'FedEx', country: 'USA', note: 'رائدة في الشحن السريع والخدمات اللوجستية المتخصصة عبر أسطول طيران بري وجوي كثيف' },
    { name: 'C.H. Robinson', country: 'USA', note: 'أكبر وسيط شحن بري في أمريكا يركز على تكريس التكنولوجيا في إدارة النقل' },
  ],

  definition: 'تشمل صناعة اللوجستيات كافة عمليات الشحن ودمج تدفق المعلومات عبر برمجيات إدارة سلسلة التوريد، وتتضمن خدمات البريد والطرود وناقلي البضائع.',

  industryInsights: [
    'تحديات الجغرافيا السياسية في أوكرانيا وغزة تفرض على الشركات البحث عن مسارات لوجستية بديلة وأكثر مرونة',
    'اللوجستيات العكسية (Reverse Logistics) أصبحت حيوية للتجارة الإلكترونية مع زيادة معدلات إرجاع المنتجات',
    'الاستثمار في المستودعات الذكية (Smart Warehousing) يقلل الأخطاء التشغيلية بنسبة تتجاوز 40%',
  ],

  tags: ['Logistics', '3PL', 'Last-Mile', 'UPS', 'FedEx', 'DHL', 'Supply Chain', 'Cold Chain'],
};

const LogisticsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default LogisticsDashboard;
