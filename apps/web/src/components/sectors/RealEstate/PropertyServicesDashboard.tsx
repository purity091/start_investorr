import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Key, Smartphone, Briefcase, Globe, BarChart3, TrendingUp, Zap, MousePointer2 } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الخدمات والتقنيات العقارية',
  titleEn: 'Property Services & Proptech',
  subtitle: 'تحليل إدارة العقارات، حلول التكنولوجيا العقارية (Proptech)، شركات التطوير المدرجة، والوساطة الرقمية',
  icon: Key,
  accent: 'blue',
  pdfLabel: 'تقرير الخدمات العقارية (PDF)',

  kpis: [
    { label: 'القيمة الإجمالية للشركات المدرجة', value: '3', unit: 'ترليون $', icon: BarChart3 },
    { label: 'زعيم Proptech عالمياً', value: 'Fifth Wall', unit: 'أمريكا', icon: Zap },
    { label: 'أكبر شركة تطوير (أوروبا)', value: 'Segro', unit: 'بريطانيا', icon: Briefcase },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق خدمات ووساطة', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في حجم معاملات الوساطة وموطن لأكبر منصات التكنولوجيا العقارية (Zillow, CoStar).',
      icon: Globe
    },
    { 
      label: 'أكبر سوق تطوير عقاري', 
      country: 'الصين', 
      note: 'تمتلك أضخم شركات التطوير العقاري من حيث القيمة السوقية والمشاريع العمرانية الكبرى.',
      icon: Briefcase
    },
    { 
      label: 'رائد الابتكار الرقمي', 
      country: 'المملكة المتحدة', 
      note: 'تعد مركزاً عالمياً لشركات PropTech الناشئة وتجذب استثمارات ضخمة في تقنيات إدارة العقارات الذكية.',
      icon: Zap
    }
  ],

  navItems: ['نظرة عامة', 'صناعة Proptech', 'الوساطة والمواقع', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'ما وراء جدران العقارات التقليدية',
      subtitle: 'The Vast Network Behind Real Estate',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            العقارات هي أكثر من مجرد مبانٍ؛ إنها شبكة واسعة من المتخصصين والشركات. تشهد هذه الصناعة ثورة رقمية من خلال Proptech التي تعيد تشكيل عمليات الإدارة، البيع، والتطوير.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <MousePointer2 className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">مفهوم "المكان كخدمة"</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  مع صعود العمل المشترك (Coworking) والعيش المشترك (Coliving)، تغير مفهوم الفضاء ليصبح خدمة مرنة تلبي متطلبات الحياة والأعمال الحديثة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'proptech',
      title: 'ثورة الـ Proptech والذكاء الاصطناعي',
      subtitle: 'Revolutionizing Real Estate via Technology',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أصبح الذكاء الاصطناعي وتحليلات البيانات الضخمة (Big Data) و blockchain أدوات أساسية لتحسين عمليات الشراء والتأجير وإدارة المرافق.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Zap className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">رأس المال الجريء</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">رغم تقلبات الاقتصاد، تظل شركات التكنولوجيا العقارية وجهة رئيسية لاستثمارات رأس المال الجريء عالمياً.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو الوكالات الرقمية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">حقق عدد الوكلاء العقاريين في أمريكا أرقاماً قياسية، مدعوماً بمواقع وساطة قوية مثل Zillow وRealtor.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'قادة السوق والمنصات الرقمية',
      subtitle: 'Market Leaders & Online Portals',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تسيطر شركات تطوير عملاقة ومنصات رقمية على المشهد. في الصين، تعد "China Resources Land" الأكبر من حيث القيمة السوقية، بينما تتصدر Zillow المواقع الإلكترونية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Smartphone className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">منصات متكاملة (One-stop)</p>
                <p className="text-sm text-slate-400">تجمع البوابات العقارية بين قوائم العقارات، حاسبات الرهن، الجولات الافتراضية، وتحليلات الأسعار في مكان واحد.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Globe className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الشركات المدرجة</p>
                <p className="text-sm text-slate-400">تجاوزت القيمة المجمعة للشركات العقارية المتداولة في البورصات العالمية 3 تريليونات دولار بنهاية 2025.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'China Resources Land', country: 'Hong Kong', note: 'أكبر شركة عقارية في العالم من حيث القيمة السوقية' },
    { name: 'CBRE Group', country: 'USA', note: 'الرائد العالمي في خدمات العقارات المتكاملة والوساطة' },
    { name: 'Zillow Group', country: 'USA', note: 'أكثر المنصات الرقمية العقارية زيارة وتأثيراً في سوق الإسكان' },
    { name: 'Segro', country: 'UK', note: 'أكبر شركة تطوير عقاري مدرجة في أوروبا متخصصة في الخدمات اللوجستية' },
  ],

  definition: 'تشمل الخدمات العقارية كافة الأنشطة التي تسهل عمل القطاع، بما في ذلك الاستثمار، المبيعات، الإدارة، وشركات تكنولوجيا العقارات (Proptech) التي تعمل على تحسين جودة الخدمات.',

  industryInsights: [
    'الذكاء الاصطناعي التوليدي بدأ يُستخدم لإنشاء جولات افتراضية (Virtual Tours) فائقة الواقعية',
    'تقنية "التوأم الرقمي" (Digital Twin) تتيح إدارة المباني وصيانتها بشكل استباقي عبر نماذج ثلاثية الأبعاد',
    'الوساطة العقارية تتحول بشكل متزايد نحو نماذج "الخدمة الذاتية" المدعومة بالتكنولوجيا الرقمية',
  ],

  tags: ['Property Services', 'Proptech', 'Zillow', 'Real Estate Tech', 'Asset Management', 'Brokerage'],
};

const PropertyServicesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PropertyServicesDashboard;
