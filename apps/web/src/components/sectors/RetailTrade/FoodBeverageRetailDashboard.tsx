import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { ShoppingCart, Utensils, Zap, Globe, BarChart3, TrendingUp, Truck, Package } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تجارة الأغذية والمشروبات',
  titleEn: 'Food & Beverage Retail',
  subtitle: 'تحليل قطاع السوبر ماركت، التوصيل عبر الإنترنت، الوجبات الجاهزة، وهيمنة عمالقة التجزئة للمواد الغذائية',
  icon: ShoppingCart,
  accent: 'blue',
  pdfLabel: 'تقرير سوق الغذاء العالمي (PDF)',

  kpis: [
    { label: 'سوق توصيل البقالة العالمي', value: '1', unit: 'ترليون $', icon: Truck },
    { label: 'حصة السوبر ماركت من السوق', value: '85%', icon: ShoppingCart },
    { label: 'إيرادات Kroger السنوية', value: '132.3', unit: 'مليار $', icon: Package },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق تجزئة غذائية', 
      country: 'الولايات المتحدة', 
      note: 'موطن لأضخم سلاسل السوبر ماركت في العالم (Walmart, Kroger) وتقود ابتكارات التوصيل الرقمي.',
      icon: ShoppingCart
    },
    { 
      label: 'معقل المتاجر المخفضة', 
      country: 'ألمانيا', 
      note: 'تتميز بنموذج "الخصم" (Lidl, Aldi) الذي أعاد تشكيل عادات التسوق الغذائي في أوروبا والعالم.',
      icon: Package
    },
    { 
      label: 'رائد ثقافة الهايبر ماركت', 
      country: 'فرنسا', 
      note: 'تعد المركز الرئيسي لعملاق التجزئة Carrefour ومنشأ نموذج الهايبر ماركت الذي يجمع كل الاحتياجات في مكان واحد.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'أنماط التجزئة', 'توصيل الطعام عبر الإنترنت', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'قطاع شديد التنافسية',
      subtitle: 'Competitive Landscape & Multiple Formats',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يشهد مشهد تجارة التجزئة ضغوطاً متزايدة من تنسيقات التجزئة المتعددة. يعمل تجار البقالة التقليديون في نفس السوق مع متاجر الخصم التي شهدت نمواً ملحوظاً مؤخراً بسبب التضخم، بينما تستفيد المتاجر الفعلية من دمج القنوات الإلكترونية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Zap className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">تجربة تسوق "شخصية"</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يسمح مزيج الشراء داخل المتجر وعبر الإنترنت للمستهلكين بتشكيل تجارب تسوق فريدة ومخصصة، مما يزيد من ولاء العملاء لمتاجر البقالة الكبرى.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'السوبر ماركت: ملك التجزئة الغذائية',
      subtitle: 'Supermarkets & Grocery Dominance',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تظل السوبر ماركت ومتاجر البقالة هي المهيمنة، حيث استحوذت على 85% من حصة السوق في عام 2022. ومع ذلك، شهدت متاجر "الراحة" (Convenience Stores) أعلى معدل نمو إجمالي.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو مبيعات التجزئة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">شهد قطاع الأغذية والمشروبات نمواً بنسبة 30% خلال 5 سنوات، مدفوعاً بآثار الجائحة وتضخم أسعار الغذاء.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Package className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الوجبات الجاهزة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبح شراء الوجبات الجاهزة عبر الاشتراكات المنزلية اتجاهاً قوياً يسمح للمستهلكين بإعادة تجربة المطعم في المنزل.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'delivery',
      title: 'طفرة توصيل البقالة عبر الإنترنت',
      subtitle: 'Surge of Online Grocery Delivery',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            حقق سوق توصيل الغذاء العالمي إيرادات تتجاوز تريليون دولار في 2023، منها 640 مليار دولار جاءت من قطاع توصيل البقالة وحده، مما جعلها ساحة تنافسية شرسة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Truck className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">سرعة التوصيل</p>
                <p className="text-sm text-slate-400">تتنافس الشركات الآن على تقليل رسوم التوصيل وتقديم أسرع وقت ممكن (قرب 15-30 دقيقة في بعض خدمات البقالة السريعة).</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Globe className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">عمالقة أوروبا</p>
                <p className="text-sm text-slate-400">تهيمن Schwarz-Gruppe و Tesco على المشهد الأوروبي، بينما يقود Aldi قطاع متاجر الخصم التي تتوسع بقوة في أمريكا.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Walmart', country: 'USA', note: 'المتصدر العالمي في بيع المواد الغذائية الصالحة للأكل وحجم العمليات' },
    { name: 'The Kroger Co.', country: 'USA', note: 'أكبر سلسلة سوبر ماركت في الولايات المتحدة (مبيعات 132 مليار $)' },
    { name: 'Schwarz-Gruppe', country: 'Germany', note: 'الشركة الأم لـ Lidl و Kaufland، القائد في قطاع تجارة الغذاء الأوروبية' },
    { name: 'Carrefour', country: 'France', note: 'أحد أهم مجموعات التجزئة العالمية التي تعمل في قطاع الهايبر ماركت' },
  ],

  definition: 'تغطي تجارة الأغذية والمشروبات قنوات التوزيع التي تشمل السوبر ماركت، المخابز، متاجر الخصم، وشركات بيع الأغذية بالاشتراك والتوصيل المنزلي.',

  industryInsights: [
    'التضخم دفع المستهلكين عالمياً نحو متاجر "الخصم" (Discount Stores) بمعدلات غير مسبوقة',
    'البقالة عبر الإنترنت أصبحت ضرورة استراتيجية للنمو، ولم تعد مجرد خدمة إضافية لمتاجر التجزئة',
    'تعد الاستدامة في التغليف وتقليل الفاقد الغذائي من أهم أولويات سلاسل التوريد الغذائية حالياً',
  ],

  tags: ['Food Retail', 'Supermarket', 'Grocery Delivery', 'Walmart', 'Kroger', 'Carrefour'],
};

const FoodBeverageRetailDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default FoodBeverageRetailDashboard;
