import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { MousePointer2, Smartphone, Monitor, Globe, BarChart3, TrendingUp, Zap, MousePointerSquareDashed } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'مدى الوصول وحركة المرور',
  titleEn: 'Reach & Traffic Sector',
  subtitle: 'تحليل أكثر المواقع زيارة في العالم، حصة الزيارات عبر الهاتف vs الحاسوب، ومقاييس نجاح الويب',
  icon: MousePointer2,
  accent: 'blue',
  pdfLabel: 'تقرير حركة المرور الويب (PDF)',

  kpis: [
    { label: 'أكثر المواقع زيارة (Google)', value: '88.4', unit: 'مليار زيارة/شهر', icon: Globe },
    { label: 'حصة حركة الإنترنت المحمول', value: '>50%', icon: Smartphone },
    { label: 'حركة الويب محمول (نيجيريا)', value: '>80%', icon: Zap },
  ],

  topMarkets: [
    { 
      label: 'مركز الجذب الرقمي العالمي', 
      country: 'الولايات المتحدة', 
      note: 'تستحوذ المواقع الأمريكية (Google, YouTube, Facebook) على أكثر من 60% من إجمالي حركة المرور الويب العالمية.',
      icon: Globe
    },
    { 
      label: 'أضخم مجتمع رقمي مغلق', 
      country: 'الصين', 
      note: 'تمتلك أكبر عدد من مستخدمي الإنترنت في العالم، مع حركة مرور هائلة تتركز في منصات Baidu وAlibaba وTencent.',
      icon: BarChart3
    },
    { 
      label: 'رائد المرور عبر المحمول', 
      country: 'نيجيريا', 
      note: 'تتصدر العالم في نسبة حركة المرور القادمة من الهواتف المحمولة بنسبة تتجاوز 80%، متفوقة على الحواسيب التقليدية.',
      icon: Smartphone
    }
  ],

  navItems: ['نظرة عامة', 'قادة السوق', 'تحول المحمول', 'المرور الرقمي', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'قياس النجاح الرقمي',
      subtitle: 'Measuring Online Success',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعد حركة مرور الويب (Web Traffic) واحدة من أهم المقاييس لقياس الأداء والنجاح عبر الإنترنت. بعد معركة مع ياهو منذ عام 2006، حصدت جوجل المركز الأول كأكثر المواقع شعبية في العالم في عام 2010، ولا تزال تحتفظ بهذا المنصب حتى اليوم.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <MousePointerSquareDashed className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">جوجل ويوتيوب: قيادة مطلقة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تعد منصة Google.com هي الموقع الأكثر زيارة بـ 88.4 مليار زيارة شهرية، تليها منصة YouTube.com بـ 74.8 مليار زيارة، مما يعكس هيمنة Alphabet على حركة المرور العالمية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'أكثر المواقع شعبية في العالم',
      subtitle: 'World\'s Most Popular Websites',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تظل أسماء مثل جوجل، فيسبوك، وأمازون مألوفة لمستخدمي الإنترنت وتتصدر باستمرار مراتب الخصائص الرقمية الأكثر زيارة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">ترتيب المواقع</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تسيطر شركات GAMAM (جوجل، أمازون، ميتأ، أبل، مايكروسوفت) على الجزء الأكبر من الانتباه الرقمي.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو المنصات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">حركة المرور للفيديو (YouTube) تنمو بمعدل أسرع من الشبكات الاجتماعية التقليدية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'mobile-shift',
      title: 'الهاتف هو المستقبل',
      subtitle: 'Mobile is the Way Forward',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            في وقت مبكر من عام 2024، شكل الهاتف المحمول ما يقرب من 60% من حركة الإنترنت العالمية، وهذا الاتجاه يتسارع باستمرار خاصة في المناطق النامية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Smartphone className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">أسواق المحمول أولاً</p>
                <p className="text-sm text-slate-400">في أفريقيا، يأتي أكثر من 75% من حركة مرور الويب من الهواتف، حيث يفتقر الكثيرون للوصول للحواسيب تماماً.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Monitor className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تراجع دور الحاسوب</p>
                <p className="text-sm text-slate-400">لم يعد تصفح سطح المكتب هو الطريقة الافتراضية للوصول للمحتوى عالمياً كما كان في السابق.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Google.com', country: 'USA', note: 'الموقع الأكثر زيارة في العالم بـ 88.4 مليار زيارة شهرية' },
    { name: 'YouTube.com', country: 'USA', note: 'الموقع الثاني عالمياً والرائد في استهلاك الفيديو' },
    { name: 'Facebook.com', country: 'USA', note: 'يحافظ على كونه أكبر شبكة اجتماعية من حيث عدد الزيارات' },
    { name: 'Amazon.com', country: 'USA', note: 'القائد العالمي في حركة مرور التجارة الإلكترونية' },
  ],

  definition: 'يشمل قطاع مدى الوصول وحركة المرور المقاييس التي تحدد حجم الجمهور والمشاركة والظهور لأي كيان عبر الإنترنت، بما في ذلك عدد الزيارات، والزوار الفريدين، ومصادر حركة المرور.',

  industryInsights: [
    'تقنيات مثل 5G تدفع نمو قطاعات التجارة الإلكترونية والبحث عبر الهاتف المحمول بقوة',
    'أكثر من 50% من سكان العالم يصلون للإنترنت الآن بشكل حصري أو أساسي عبر الهاتف',
    'استحواذ جوجل على محرك البحث والفيديو يمنحها سيطرة غير مسبوقة على مسارات حركة المرور العالمية',
  ],

  tags: ['Web Traffic', 'Reach', 'Mobile Traffic', 'Google Sites', 'Digital Engagement'],
};

const ReachTrafficDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ReachTrafficDashboard;
