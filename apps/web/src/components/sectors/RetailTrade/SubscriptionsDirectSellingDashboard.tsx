import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { RefreshCw, UserCheck, Zap, Globe, BarChart3, TrendingUp, Box, ShoppingCart } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الاشتراكات والبيع المباشر',
  titleEn: 'Subscriptions & Direct Selling',
  subtitle: 'تحليل نموذج البيع الشخصي (Direct Selling)، صناديق الاشتراكات (Subscription Boxes)، ونمو إيرادات الوجبات الجاهزة',
  icon: RefreshCw,
  accent: 'blue',
  pdfLabel: 'تقرير سوق الاشتراكات والبيع المباشر (PDF)',

  kpis: [
    { label: 'مبيعات البيع المباشر (أوروبا)', value: '34.7', unit: 'مليار $', icon: Globe },
    { label: 'القيمة الدائمة للمشترك (غذاء)', value: '356', unit: '$', icon: BarChart3 },
    { label: 'عدد البائعين المباشرين (أمريكا)', value: '7', unit: 'مليون', icon: UserCheck },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق بيع مباشر', 
      country: 'الولايات المتحدة', 
      note: 'تمثل السوق الأكبر عالمياً في نموذج البيع الشخصي ومقر لعمالقة مثل Amway و Herbalife.',
      icon: UserCheck
    },
    { 
      label: 'رائد اقتصاد الاشتراكات الغذائية', 
      country: 'ألمانيا', 
      note: 'مقر لشركة HelloFresh وتقود العالم في تبني نموذج اشتراكات صناديق الوجبات والطبخ المنزلي.',
      icon: RefreshCw
    },
    { 
      label: 'أعلى معدل مندوبين للفرد', 
      country: 'البرازيل / أمريكا اللاتينية', 
      note: 'تتميز بأكبر شبكة مندوبين مستقلين لشركات التجميل (Natura, Avon)، مما يجعلها سوقاً حيوياً للبيع المباشر.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'البيع المباشر', 'اقتصاد الاشتراكات', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نماذج أعمال مكملة ومتطورة',
      subtitle: 'Complimentary Business Models',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            البيع المباشر وصناعة الاشتراكات هما نموذجان مختلفان غالباً ما يسيران معاً. البيع المباشر يعني البيع للمستهلك دون وسيط، بينما تعني الاشتراكات دفع رسوم دورية للوصول للمنتج، مثل صناديق الجمال أو الوجبات الجاهزة.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Zap className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">هيمنة أمريكا وألمانيا</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تعد الولايات المتحدة السوق الرائد عالمياً في البيع المباشر، تليها الصين. وفي أوروبا، تحتل ألمانيا الصدارة في هذا النموذج من التجارة الشخصية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'direct-selling',
      title: 'البائع المباشر الحديث والبيع الشخصي',
      subtitle: 'Person-to-person Sales Interactions',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعتمد عملية البيع المباشر على التفاعل الشخصي بين مندوب مبيعات مستقل والعميل. غالباً ما تتركز هذه المبيعات في مجالات الصحة، الجمال، الرعاية الشخصية، والأدوات المنزلية المعمرة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <UserCheck className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">المندوبون المستقلون</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يعمل الملايين في أمريكا اللاتينية والوسطى كمندوبين مستقلين، مما يوفر دخولاً مرنة وقدرة عالية على اختراق الأسواق المحلية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق أمريكا اللاتينية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تمتلك المنطقة ملايين المندوبين النشطين، مما يجعلها ساحة رئيسية لشركات مثل Avon و Natura.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'subscriptions',
      title: 'ثورة اقتصاد الاشتراكات والصناديق',
      subtitle: 'The Subscription Box Business Model',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
             تحول نموذج الاشتراك إلى محرك قوي للنمو، من صناديق الوجبات (Meal Kits) مثل HelloFresh إلى صناديق الجمال والمواد التعليمية للأطفال.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Box className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">صناديق المفاجآت (Loot Boxes)</p>
                <p className="text-sm text-slate-400">تنمو اشتراكات "صناديق الهوايات" في اليابان وأمريكا كطريقة مفضلة لاكتشاف المنتجات الجديدة دورياً.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الوجبات الجاهزة</p>
                <p className="text-sm text-slate-400">تحقق HelloFresh إيرادات بمليارات اليورو سنوياً، مما يثبت نجاح نموذج الاشتراك في تبسيط حياة المستهلكين المزدحمة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Amway', country: 'USA', note: 'أكبر شركة بيع مباشر في العالم متخصصة في منتجات الصحة والجمال منذ عقود' },
    { name: 'HelloFresh', country: 'Germany', note: 'القائد العالمي في حلول اشتراكات الوجبات الجاهزة وصناديق الطبخ' },
    { name: 'Avon Products', country: 'Global/Brazil', note: 'أحد أشهر الأسماء في البيع الشخصي لمستحضرات التجميل عبر شبكة ضخمة من المندوبات' },
    { name: 'Peloton', country: 'USA', note: 'نجح في دمج بيع الأجهزة الرياضية مع نموذج اشتراك رقمي عالي الربحية' },
  ],

  definition: 'يشمل هذا القطاع نماذج البيع التي تتجنب الوسطاء التقليديين عبر البيع الشخصي المباشر، أو تعتمد على الإيرادات الدورية المتكررة من خلال خدمات الاشتراك في المنتجات المادية.',

  industryInsights: [
    'نموذج الاشتراك يزيد من "القيمة الدائمة للعميل" (CLV) ويقلل من تكاليف التسويق المتكررة للشركات',
    'البيع المباشر في الأسواق الناشئة يعتمد بشكل كبير على الثقة الشخصية والشبكات الاجتماعية المحلية',
    'أهم أسباب إلغاء الاشتراكات هو تكرار المنتجات وعدم ملاءمتها لاحتياجات العميل المتغيرة',
  ],

  tags: ['Subscriptions', 'Direct Selling', 'Amway', 'HelloFresh', 'Subscription Box', 'MLM'],
};

const SubscriptionsDirectSellingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default SubscriptionsDirectSellingDashboard;
