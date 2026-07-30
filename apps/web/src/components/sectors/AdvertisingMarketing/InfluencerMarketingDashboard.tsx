import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Users, TrendingUp, BarChart3, ShieldCheck, ShoppingCart, Cpu, Globe, Zap, Target, Share2 } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التسويق عبر المؤثرين',
  titleEn: 'Influencer Marketing Industry',
  subtitle: 'تحول الثقة الاجتماعية إلى بنية تحتية اقتصادية كاملة داخل اقتصاد المنصات الرقمية',
  icon: Users,
  accent: 'purple',
  pdfLabel: 'تقرير اقتصاد المؤثرين (PDF)',

  kpis: [
    { label: 'حجم السوق العالمي', value: '~24', unit: 'مليار $', icon: TrendingUp },
    { label: 'معدل النمو السنوي', value: '25', unit: '%+', icon: BarChart3 },
    { label: 'تبني العلامات الكبرى', value: '80', unit: '%+', icon: Target },
    { label: 'عائد الاستثمار (ROI)', value: '11', unit: 'x ضعف', icon: Zap },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق إنفاق عالمي', 
      country: 'الولايات المتحدة', 
      note: 'السوق الأكثر نضجاً حيث تخصص العلامات التجارية ميزانيات ضخمة لحملات المؤثرين عبر كافة المنصات.',
      icon: Target
    },
    { 
      label: 'رائد التجارة المباشرة (KOL)', 
      country: 'الصين', 
      note: 'القائد العالمي في دمج المؤثرين مع التجارة المباشرة (Live Commerce) وتحقيق مبيعات فورية بالمليارات.',
      icon: Zap
    },
    { 
      label: 'المركز الإبداعي الأوروبي', 
      country: 'المملكة المتحدة', 
      note: 'تتميز بأعلى معدلات تفاعل مع المؤثرين وبيئة تنظيمية متطورة لضمان شفافية الإعلانات.',
      icon: Globe
    }
  ],

  navItems: ['الواقع الجديد', 'اقتصاد المنصات', 'سلاسل القيمة', 'المستقبل', 'القادة'],

  sections: [
    {
      id: 'overview',
      title: 'صعود "اقتصاد الثقة"',
      subtitle: 'The Rise of Trust Economy',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            التحول الحقيقي ليس في القنوات، بل في **من يملك الثقة**. الإعلانات التقليدية فقدت فعاليتها بسبب "تشبع المستخدم" (Ad Fatigue)، بينما أصبح المؤثر هو "وسيط الثقة البشري" الذي يحول المحتوى إلى توصية شخصية ترفع المصداقية.
          </p>
          <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-4">
             <ShieldCheck className="text-purple-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-purple-900 leading-tight">الثقة مقابل الوصول</p>
                <p className="text-sm text-purple-700/80 mt-2">
                  القيمة الاستثمارية اليوم ليست في عدد المشاهدات، بل في مستوى الثقة المتراكمة التي يمتلكها المؤثر داخل مجتمعه الرقمي.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'platform-economics',
      title: 'الاقتصاد الخفي للمنصات',
      subtitle: 'Platform Control Layer',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتحكم شركات مثل Meta وByteDance وAlphabet بالبنية الكاملة للسوق من خلال الخوارزميات وتوزيع الوصول. المؤثرون يمثلون أصولاً داخل "منصات مؤجرة"، مما يجعل أي تغيير في الخوارزمية يؤثر فورياً على تسعير الأرباح.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-purple-600 mb-2" size={20} />
                <p className="font-black text-slate-900">مخاطر نظامية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">الاعتماد على منصة واحدة يشكل خطراً؛ التنويع هو المفتاح لاستدامة الأصول الرقمية للمؤثر.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Cpu className="text-purple-600 mb-2" size={20} />
                <p className="font-black text-slate-900">هندسة الانتباه</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">الخوارزميات هي التي تقرر "قيمة الانتباه"، مما يجعل الذكاء الاصطناعي المتحكم الأول في العائد.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'mini-economy',
      title: 'المؤثر كـ "نظام اقتصادي"',
      subtitle: 'The Influencer Business Model',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            المؤثر الحديث تحول من مجرد "شخص" إلى شركة متكاملة تشمل طبقات الإعلام (إنتاج المحتوى)، التجارة (البيع المباشر)، والبيانات (تحليل السلوك). هذا يخلق "سلسلة طلب" كاملة تبدأ بالثقة وتنتهي بالشراء الفوري.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShoppingCart className="text-purple-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">طبقة التجارة</p>
                <p className="text-sm text-slate-400">تحويل الجمهور إلى عملاء عبر المتاجر الاجتماعية وAffiliate Commerce بدون مغادرة المنصة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <BarChart3 className="text-purple-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">طبقة البيانات</p>
                <p className="text-sm text-slate-400">استخدام ردود الفعل اللحظية لاختبار المنتجات وتحسين معدلات التحويل بشكل استباقي.</p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-evolution',
      title: 'تطور سوق المستقبل',
      subtitle: 'Next Phase Evolution',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يتجه السوق نحو تحولات جذرية تشمل الذكاء الاصطناعي في اختيار المؤثرين، وصعود المؤثرين الافتراضيين (AI Influencers)، ودمج التجارة مباشرة داخل المحتوى (Content-Commerce Fusion).
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-6 bg-purple-500 rounded-full mt-1 shrink-0" />
              <span className="text-slate-600 font-medium text-right">أتمتة اختيار المؤثرين وتحليل الجمهور الحقيقي vs المزيف</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-1.5 h-6 bg-purple-500 rounded-full mt-1 shrink-0" />
              <span className="text-slate-600 font-medium text-right">تحويل المحتوى التقليدي إلى نقاط بيع فورية داخل الفيديو مباشرة</span>
            </li>
          </ul>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Meta', country: 'USA', note: 'تتحكم بمنظومة Instagram وFacebook وتدير اقتصاد الانتباه العالمي' },
    { name: 'ByteDance', country: 'China', note: 'تقود ثورة الفيديو القصير عبر TikTok وتغير قواعد التجارة الاجتماعية' },
    { name: 'Alphabet Inc.', country: 'USA', note: 'YouTube يظل المنصة الأكبر للتأثير طويل المدى والمحتوى التعليمي والترفيهي' },
    { name: 'Amazon', country: 'USA', note: 'مركز تحويل التأثير إلى شراء مباشر من خلال برامج المؤثرين الخاصة بها' },
    { name: 'Shopify', country: 'Canada', note: 'الممكن التقني الأول للمؤثرين لامتلاك متاجرهم المستقلة والتحكم في بياناتهم' },
  ],

  definition: 'نظام اقتصادي قائم على تحويل "الثقة الاجتماعية" إلى قيمة تجارية قابلة للقياس، عبر منصات رقمية تتحكم في الوصول والانتباه وتحويل الرغبة إلى سلوك شرائي.',

  industryInsights: [
    'المؤثرون أصبحوا قنوات توزيع اقتصادية حقيقية وليسوا مجرد أدوات تسويقية إضافية',
    'المنصة (Platform) هي الأصل الحقيقي والمتحكم في قواعد اللعبة وليس المبدع نفسه',
    'الـ Micro-influencers يحققون ربحية أعلى وكفاءة رأس مال أعلى من المشاهير التقليديين',
    'الذكاء الاصطناعي سيعيد تسعير الصناعة بالكامل خلال 3-5 سنوات القادمة عبر التحليل التنبؤي',
  ],

  tags: ['InfluencerEconomy', 'AttentionEconomy', 'CreatorEconomy', 'SocialCommerce', 'DigitalTrust', 'AIInfluencers', 'MarketingFuture'],
  sectorId: 'influencer-marketing-dashboard',
};

const InfluencerMarketingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default InfluencerMarketingDashboard;
