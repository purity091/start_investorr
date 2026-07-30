import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { CreditCard, Globe, BarChart3, TrendingUp, ShieldCheck, Wallet, Landmark, Zap, Handshake, Briefcase } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الخدمات المالية',
  titleEn: 'Financial Services',
  subtitle: 'تحليل الاستثمارات في التكنولوجيا المالية (Fintech)، نمو المدفوعات الرقمية، الاندماج والاستحواذ، والتحول نحو الأنظمة غير البنكية',
  icon: Landmark,
  accent: 'blue',
  pdfLabel: 'تقرير الخدمات المالية (PDF)',

  kpis: [
    { label: 'استثمارات الفنتك العالمية', value: '113.7', unit: 'مليار $', icon: Zap },
    { label: 'نمو المحافظ الرقمية (CAGR)', value: '14.9', unit: '%', icon: Wallet },
    { label: 'فائدة قروض السيارات (US)', value: '7.82', unit: '%', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق مالي عالمي', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في استثمارات الفنتك وتضم أضخم أسواق الأسهم والمؤسسات المالية.',
      icon: Globe
    },
    { 
      label: 'رائد المدفوعات الرقمية', 
      country: 'الصين', 
      note: 'أكبر سوق للمدفوعات عبر الهاتف المحمول وتقود الابتكار في الخدمات المالية المدمجة.',
      icon: Wallet
    },
    { 
      label: 'مركز الخدمات المصرفية', 
      country: 'المملكة المتحدة', 
      note: 'تعد لندن مركزاً عالمياً للتجارة المالية، الخدمات المصرفية العابرة للحدود، والتأمين.',
      icon: Landmark
    }
  ],

  navItems: ['نظرة عامة', 'حجم السوق العالمي', 'المدفوعات الرقمية', 'التوجهات والقادة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الخدمات المالية: عصب الاقتصاد الحديث',
      subtitle: 'The Heart of the Global Economy',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تُعد الخدمات المالية أحد أكثر القطاعات حيوية وتأثيراً في الاقتصاد العالمي، حيث تضمن التدفق الحر لرأس المال والسيولة في الأسواق. ومع صعود الحلول التكنولوجية (Fintech)، بدأت هذه الخدمات في التحول من الأطر التقليدية إلى نماذج رقمية أكثر مرونة وكفاءة، مما أدى لتعطيل واستبدال العديد من آليات العمل البنكي التقليدي.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <ShieldCheck className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">محرك النمو الاقتصادي</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تساهم الخدمات المالية في توفير السيولة اللازمة لنمو الشركات وتسهيل المعاملات اليومية للأفراد، مما يجعلها المقياس الأول لصحة الاقتصاد الوطني.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'توزيع القوة العالمية في الفنتك',
      subtitle: 'Global Fintech Power Distribution',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتركز شركات التكنولوجيا المالية بشكل أساسي في الولايات المتحدة والصين. ففي عام 2024، كانت 8 من أكبر 10 شركات فنتك عالمياً تنتمي لهذه الدول. وتظل أمريكا الشمالية الموطن الأكبر لما يسمى بـ "اليونيكورن" (الشركات التي تتجاوز قيمتها مليار دولار)، متفوقة بـ 3 أضعاف على منطقة آسيا.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الهيمنة الأمريكية-الصينية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يستحوذ البلدان على نصيب الأسد من الاستثمارات العالمية نتيجة البنية التحتية المتطورة وحجم السوق الهائل.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو دول MENA</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تشهد منطقة الشرق الأوسط وشمال إفريقيا تسارعاً ملحوظاً في تبني حلول الدفع الرقمي والتمويل البديل.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'digital-payments',
      title: 'التحول نحو عالم بلا نقود (Cashless)',
      subtitle: 'The Cashless Evolution',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تشير التوقعات إلى نمو استثنائي في المعاملات الرقمية، خاصة في أمريكا اللاتينية وجنوب شرق آسيا. الحلول الجديدة مثل المحافظ الإلكترونية، الدفع عبر رمز QR، والدفع من حساب لحساب (A2A) تساهم في تقليل الاعتماد على النقد التقليدي بشكل كبير، مما يوفر شمولاً مالياً للفئات التي لا تمتلك حسابات بنكية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <CreditCard className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">Buy Now, Pay Later (BNPL)</p>
                <p className="text-sm text-slate-400">أصبحت حلول "اشترِ الآن وادفع لاحقاً" ركيزة أساسية في التجارة الإلكترونية، موفرة مرونة مالية عالية للمستهلكين.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Zap className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">المدفوعات اللحظية</p>
                <p className="text-sm text-slate-400">أنظمة مثل UPI في الهند و Pix في البرازيل تعيد صياغة سرعة المعاملات التجارية والتحويلات المالية.</p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends-leaders',
      title: 'قادة القطاع والاندماجات الكبرى',
      subtitle: 'Industry Leaders & M&A Trends',
      content: (
        <div className="space-y-6 text-right">
          <p>
             تظل PayPal العلامة التجارية الأكبر في معالجة مدفوعات التجارة الإلكترونية، ولكن المنافسة تشتد مع ظهور حلول مثل Klarna و Apple Pay. من جانب آخر، شهد عام 2023 تراجعاً في قيمة الاندماجات والاستحواذات (M&A) بنسبة 16% نتيجة حذر المستثمرين وارتفاع أسعار الفائدة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-50 rounded-2xl bg-slate-50/50 border-dashed">
                <Handshake className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق الاندماج والاستحواذ</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">ينتظر القطاع استقرار الفائدة لإعادة تنشيط صفقات الاستحواذ على شركات الفنتك الواعدة.</p>
            </div>
            <div className="p-5 border border-slate-50 rounded-2xl bg-slate-50/50 border-dashed">
                <Briefcase className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">تمويل الشركات الصغيرة (SME)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">الحلول غير البنكية (NBFCs) أصبحت البديل الأسرع لتمويل الشركات الصغيرة والمتوسطة.</p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'PayPal', country: 'USA', note: 'المتصدر العالمي في معالجة مدفوعات المواقع الإلكترونية والتطبيقات الرقمية' },
    { name: 'Apple Pay', country: 'USA', note: 'أسرع الحلول نمواً في قطاع مدفوعات الأجهزة المحمولة دولياً' },
    { name: 'Klarna', country: 'Sweden', note: 'رائدة قطاع "اشترِ الآن وادفع لاحقاً" (BNPL) في أوروبا وأمريكا' },
    { name: 'Ant Group (Alipay)', country: 'China', note: 'قوة فنتك ضخمة تهيمن على سوق المدفوعات والخدمات المالية في الصين' },
  ],

  definition: 'تشمل الخدمات المالية المنظمات والأدوات التي تسهل المعاملات المالية، بما في ذلك التمويل المؤسسي، التكنولوجيا المالية (Fintech)، القروض، التأجير التمويلي، والمدفوعات الرقمية.',

  industryInsights: [
    'المحافظ الرقمية تشهد نمواً سنوياً مركباً بنسبة 14.9% نتيجة التحول السريع نحو التجارة الإلكترونية',
    'الولايات المتحدة تضم أكبر عدد من شركات الفنتك بفضل نظامها البيئي المتطور لرأس المال المغامر',
    'المدفوعات اللحظية عبر الهاتف أصبحت المعيار الجديد في الأسواق الناشئة مثل الهند والبرازيل والمكسيك',
  ],

  tags: ['Fintech', 'Financial Services', 'Digital Payments', 'M&A', 'PayPal', 'BNPL'],
};

const FinancialServicesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default FinancialServicesDashboard;
