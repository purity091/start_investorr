import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Home, Zap, HeartPulse, BarChart3, TrendingUp, Globe, ShoppingCart, Sparkles } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الأجهزة المنزلية',
  titleEn: 'Household Appliances Industry',
  subtitle: 'تحليل سوق الأجهزة الكهربائية الكبيرة والصغيرة، تكنولوجيا المنازل الذكية، والروبوتات المساعدة في المهام اليومية',
  icon: Home,
  accent: 'blue',
  pdfLabel: 'تقرير الأجهزة المنزلية (PDF)',

  kpis: [
    { label: 'إيرادات السوق 2024', value: '670', unit: 'مليار $', icon: Globe },
    { label: 'حجم مبيعات الأجهزة الصغيرة', value: '3.8', unit: 'مليار وحدة', icon: ShoppingCart },
    { label: 'أكبر الشركات (إيرادات)', value: 'Midea/Haier', unit: 'Brands', icon: Sparkles },
  ],

  topMarkets: [
    { 
      label: 'أكبر قاعدة إنتاج واستهلاك', 
      country: 'الصين', 
      note: 'مقر لعمالقة الصناعة وتتحكم في سلاسل التوريد العالمية للأجهزة الكبيرة والصغيرة.',
      icon: Globe
    },
    { 
      label: 'محرك ابتكار المنازل الذكية', 
      country: 'الولايات المتحدة', 
      note: 'السوق الإنشائي الأكبر لأنظمة الـ IoT والأجهزة المتصلة التي ترفع من القيمة العقارية.',
      icon: Home
    },
    { 
      label: 'رائد مواصفات الجودة والاستدامة', 
      country: 'ألمانيا', 
      note: 'تضع المعايير العالمية لكفاءة الطاقة والمتانة في أجهزة الطبخ والغسيل الفاخرة.',
      icon: Zap
    }
  ],

  navItems: ['نظرة عامة', 'الأجهزة الكبيرة vs الصغيرة', 'المنازل الذكية وIoT', 'الروبوتات المساعدة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'من المواقد إلى الثلاجات الذكية',
      subtitle: 'Evolution of Home Technology',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تحول سوق الأجهزة المنزلية من مجرد أدوات ميكانيكية بسيطة إلى أنظمة ذكية متكاملة. بصافي إيرادات يتجاوز مئات المليارات، أصبحت هذه الأجهزة متاحة لنسبة متزايدة من سكان العالم بفضل نمو الثروة وتوسع الشبكات الكهربائية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <HeartPulse className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">جودة الحياة اليومية</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تساهم الأجهزة الحديثة في توفير الوقت والجهد في المهام المنزلية، مما يعزز الرفاهية في المسكن الشخصي.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'الأجهزة الكبيرة والصغيرة',
      subtitle: 'Major vs Small Appliances',
      content: (
        <div className="space-y-6 text-right">
          <p>
            ينقسم السوق إلى الأجهزة الكبيرة (الثلاجات، الغسالات، المكيفات) والأجهزة الصغيرة (ماكينات القهوة، الميكروويف، المكانس). تتصدر الأجهزة الكبيرة من حيث القيمة، بينما تتفوق الصغيرة من حيث عدد الوحدات المباعة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">مبيعات الأجهزة الكبيرة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تجاوزت المبيعات العالمية 400 مليار دولار في 2024، مع نمو الطلب في الأسواق الآسيوية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو التجارة الإلكترونية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبحت حصة المبيعات عبر الإنترنت تشكل ربع سوق الأجهزة الكبيرة، وهي أعلى في فئة الأجهزة الصغيرة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'smart-robots',
      title: 'المنازل الذكية وروبوتات الخدمة',
      subtitle: 'Smart Home & Service Robots',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تعد المنازل المتصلة والأجهزة الذكية المحرك الرئيسي للنمو. تضاعف سوق الأجهزة المتصلة بين عامي 2020 و 2024. كما بدأت الروبوتات المساعدة (مثل مكانس الروبوت وجزازات العشب) في دخول المنازل بأعداد متزايدة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Zap className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">إنترنت الأشياء IoT</p>
                <p className="text-sm text-slate-400">تسمح الثلاجات والأفران الذكية للمستخدمين بالتحكم في مطابخهم عن بعد عبر التطبيقات الذكية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Home className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الروبوتات التعاونية</p>
                <p className="text-sm text-slate-400">تشهد مبيعات روبوتات الخدمة المنزلية نمواً قوياً مع تطوير ذكاء اصطناعي يفهم البيئة المنزلية بدقة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Midea Group', country: 'China', note: 'واحدة من أكبر الشركات المصنعة للأجهزة المنزلية ونظم التكييف في العالم' },
    { name: 'Haier Smart Home', country: 'China', note: 'رائدة عالمية في الأجهزة الكبيرة وتطوير المنظومات المنزلية الذكية المتكاملة' },
    { name: 'Whirlpool Corporation', country: 'USA', note: 'علامة تجارية عريقة تسيطر على حصة كبيرة في سوق أمريكا الشمالية وأوروبا' },
    { name: 'Gree Electric', country: 'China', note: 'المتصدر العالمي في إنتاج مكيفات الهواء السكنية والتجارية' },
  ],

  definition: 'تشمل صناعة الأجهزة المنزلية الأجهزة الكهربائية المستخدمة في الوظائف المنزلية الخاصة، وتنقسم إلى فئات "الأجهزة الكبيرة" و"الأجهزة الصغيرة".',

  industryInsights: [
    'المطابخ الذكية ستبدأ في دمج ميزات تخطيط الوجبات المعتمدة على الذكاء الاصطناعي وتقليل الهدر الغذائي',
    'الروبوتات المساعدة المنزلية (Cobots) هي الموجة القادمة لخدمة كبار السن والأطفال في المنازل',
    'كفاءة الطاقة (Energy Efficiency) أصبحت المحفز الأول للمستهلكين لاستبدال أجهزتهم القديمة بأخرى حديثة',
  ],

  tags: ['Household Appliances', 'Smart Home', 'IoT', 'Robotics', 'Haier', 'Midea', 'Consumer Tech'],
};

const HouseholdAppliancesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default HouseholdAppliancesDashboard;
