import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { ShoppingBag, LayoutGrid, Zap, Globe, BarChart3, TrendingUp, Smartphone, Store } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تجارة السلع العامة',
  titleEn: 'General Merchandise Retail',
  subtitle: 'تحليل المتاجر الكبرى (Supercenters)، الموالات، محلات التجزئة المتنوعة، وتحديات "النهاية التقليدية للتجزئة"',
  icon: ShoppingBag,
  accent: 'blue',
  pdfLabel: 'تقرير السلع العامة العالمي (PDF)',

  kpis: [
    { label: 'مبيعات Dollar General', value: '38.6', unit: 'مليار $', icon: TrendingUp },
    { label: 'معدل شغور المتاجر (أمريكا)', value: '4%', icon: Store },
    { label: 'سوق الجملة/المستودعات الشهري', value: '64', unit: 'مليار $', icon: LayoutGrid },
  ],

  topMarkets: [
    { 
      label: 'أقوى سوق تجزئة استهلاكي', 
      country: 'الولايات المتحدة', 
      note: 'موطن لأكبر عمالقة التجزئة (Walmart, Target) وتمتلك أضخم بنية تحتية للمتاجر الكبرى في العالم.',
      icon: Store
    },
    { 
      label: 'رائد متاجر الخصم', 
      country: 'ألمانيا', 
      note: 'السوق الأكثر سيطرة لمتاجر الخصم بنموذج عالي الكفاءة، ويعد مرجعاً لسياسات التسعير المنخفضة عالمياً.',
      icon: LayoutGrid
    },
    { 
      label: 'أسرع سوق نمو مستقبلي', 
      country: 'الصين', 
      note: 'تشهد طفرة في دمج المتاجر الفعلية مع الدفع الرقمي والخدمات اللوجستية فائقة السرعة للسلع الاستهلاكية.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'صمود المتاجر التقليدية', 'التكامل الرقمي', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'بين الانهيار التقليدي والابتكار الرقمي',
      subtitle: 'The Impact of the Retail Apocalypse',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يواجه قطاع السلع العامة تحدي "نهاية التجزئة التقليدية" بسبب نمو التجارة الإلكترونية وإغلاق الموالات الكبرى. ومع ذلك، تظل المتاجر الفعلية اللاعب الأكبر عالمياً، حيث تركز حالياً على تحويل مساحاتها إلى "فضاءات اختبارية" لجذب العملاء مجدداً.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Zap className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">مرونة "متاجر الدولار"</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  أثبتت سلاسل مثل Dollar General صموداً استثنائياً، حيث لجأ إليها المستهلكون بشكل متزايد لتوفير النفقات في ظل الظروف الاقتصادية الصعبة عامي 2022 و2023.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'store-resilience',
      title: 'صمود المتاجر والتحولات المكانية',
      subtitle: 'Physical Retail & Value Chains',
      content: (
        <div className="space-y-6 text-right">
          <p>
            لا يزال البيع داخل المتاجر يمثل الحصة الكبرى من مبيعات التجزئة عالمياً. شهدت متاجر "الراحة" نمواً ثابتاً، بينما تراجعت المتاجر متعددة الأقسام (Department Stores) بنسبة حادة منذ بداية الألفية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">متاجر الخصم (ألمانيا)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تستحوذ متاجر الخصم على أكثر من 40% من مبيعات الغذاء في ألمانيا، مما جعلها نموذجاً يحتذى به عالمياً.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نوادي المستودعات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعتبر Costco ملكة هذا القطاع، حيث تدير أكثر من 860 متجراً حول العالم وتولد مبيعات ضخمة شهرياً.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'digital-integration',
      title: 'التكامل التقني وتطبيقات الهاتف',
      subtitle: 'Unifying Brick-and-Mortar with E-commerce',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يسعى عمالقة التجزئة مثل Walmart و Target إلى توفير تجربة متكاملة (BOPIS)، حيث يمتلكون أكثر تطبيقات التسوق شعبية لتسهيل عمليات الطلب والاستلام.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Smartphone className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تطبيقات التسوق</p>
                <p className="text-sm text-slate-400">تتصدر أمازون وول مارت قائمتين الأكثر تحميلاً، مما يعكس رغبة المستهلك في دمج تجربة الجوال مع التسوق الميداني.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Store className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">مراكز الاستلام</p>
                <p className="text-sm text-slate-400">ثبت Walmart آلاف نقاط الاستلام والتوصيل في أمريكا، محولاً متاجره الفعلية إلى مراكز لوجستية متطورة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Walmart', country: 'USA', note: 'بطل التجزئة الفعلي وصاحب أعلى إيرادات مبيعات في العالم بلا منازع' },
    { name: 'Amazon', country: 'USA', note: 'يقود المشهد في مبيعات التجارة الإلكترونية والابتكار اللوجستي الرقمي' },
    { name: 'Costco Wholesale', country: 'USA', note: 'الرائد في نموذج "نوادي المستودعات" والولاء العالي للأعضاء' },
    { name: 'Target', country: 'USA', note: 'أحد أهم متاجر التجزئة التي نجحت في بناء تجربة تسوق عصرية ومتكاملة' },
  ],

  definition: 'تشمل تجارة السلع العامة متاجر الراحة، الموالات، المتاجر متعددة الأقسام، مراكز التخزين (Warehouse Clubs)، ومتاجر الخصم والـ Dollar Stores.',

  industryInsights: [
    'المتاجر الفعلية لم تمت، بل تحولت إلى مراكز لتلبية الطلبات الرقمية (Fulfillment Centers)',
    'متاجر "الدولار" تنمو بقوة كلما ارتفعت معدلات التضخم وتراجعت القدرة الشرائية للطبقة المتوسطة',
    'النجاح في التجزئة الحديثة يعتمد على قدرة المتجر على تقديم تجربة "شخصية" ممتعة لا يمكن تكرارها عبر الإنترنت',
  ],

  tags: ['General Merchandise', 'Walmart', 'Costco', 'Retail Apocalypse', 'Discount Stores', 'Omnichannel'],
};

const GeneralMerchandiseDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default GeneralMerchandiseDashboard;
