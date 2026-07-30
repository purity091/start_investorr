import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Cpu, Zap, Globe, BarChart3, TrendingUp, Smartphone, BrainCircuit, Box } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'تقنيات التجزئة والتحول الرقمي',
  titleEn: 'Retail Technology Industry',
  subtitle: 'تحليل الأتمتة في المتاجر، تطبيقات الذكاء الاصطناعي (AI) في التجزئة، الواقع المعزز (AR)، وحلول إدارة المستودعات الذكية',
  icon: Cpu,
  accent: 'blue',
  pdfLabel: 'تقرير تقنيات التجزئة (PDF)',

  kpis: [
    { label: 'سوق أتمتة التجزئة العالمي', value: '12.2', unit: 'مليار $', icon: BrainCircuit },
    { label: 'استخدام AR في التسوق (2025)', value: '28%', icon: Smartphone },
    { label: 'تمويل شركات تقنيات المتاجر', value: '10.5', unit: 'مليار $', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'رائد الابتكار الرقمي والسحابي', 
      country: 'الولايات المتحدة', 
      note: 'موطن لأكبر شركات التكنولوجيا والذكاء الاصطناعي التي تخدم التجزئة (Amazon AWS, Stripe, Zebra).',
      icon: Cpu
    },
    { 
      label: 'قائد تجارة البث والاستجابة', 
      country: 'الصين', 
      note: 'تتصدر العالم في تقنيات "التجزئة الجديدة" (New Retail) التي تدمج الدفع الرقمي والواقع المعزز في المتاجر المادية.',
      icon: Smartphone
    },
    { 
      label: 'مركز أتمتة المستودعات اللوجستية', 
      country: 'المملكة المتحدة', 
      note: 'تمتلك تقنيات رائدة في أتمتة مستودعات البقالة (Ocado) وحلول اللوجستيات الذكية للشركات العالمية.',
      icon: BrainCircuit
    }
  ],

  navItems: ['نظرة عامة', 'أتمتة المتاجر', 'الذكاء الاصطناعي والواقع المعزز', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الجوهر الرقمي للتجزئة الحديثة',
      subtitle: 'The Heart of Retail Digital Transformation',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            أدت التطورات السريعة في الأتمتة والتقنيات الرقمية إلى ثورة في قطاع التجزئة. من أنظمة الدفع الذاتي إلى إدارة المخزون عبر السحابة، تلعب التكنولوجيا دوراً محورياً في تجربة العميل وكفاءة العمليات سواء في المتاجر الفعلية أو المنصات الإلكترونية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Zap className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">تكامل القنوات والمخزون</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تسمح الحلول الرقمية بإدارة frictionless (سلسة) لقواعد البيانات عبر منصات متعددة باستخدام أدوات CRM متطورة، مما يضمن تجربة شراء موحدة للعميل.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'automation',
      title: 'الأتمتة: من المستودعات إلى الدفع الذاتي',
      subtitle: 'Self-checkout & Warehouse Automation',
      content: (
        <div className="space-y-6 text-right">
          <p>
             تستثمر الشركات مليارات الدولارات في أتمتة المستودعات لزيادة سرعة معالجة الطلبات. سجلت استثمارات تقنيات المتاجر الفعلية نمواً ضخماً، خاصة في أنظمة الدفع الذاتي (Self-checkout) التي أصبحت معياراً في أوروبا وآسيا.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Box className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أتمتة المستودعات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تزايد عدد الشركات المتخصصة في روبوتات AGV/AMR لتسريع عمليات البيك والتغليف داخل المتاجر والمستودعات المركزية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">التمويل والاستثمار</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">جذبت الشركات الناشئة في مجال "تكنولوجيا التجزئة" تمويلات قياسية بفضل الطلب المتزايد على الرقمنة الشاملة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-ar',
      title: 'الذكاء الاصطناعي التوليدي والواقع المعزز',
      subtitle: 'Generative AI & Augmented Reality (AR)',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
             اجتاح الذكاء الاصطناعي التوليدي (Gen AI) جميع قطاعات التجزئة، حيث يستخدم لتخصيص العروض (Personalization)، إدارة سلاسل التوريد، وتحسين الأمن الإلكتروني.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <BrainCircuit className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تخصيص تجربة العميل</p>
                <p className="text-sm text-slate-400">نحو 28% من المستهلكين بحلول 2025 سيستخدمون أجهزة AR لتجربة المنتجات قبل شرائها، مما يرفع احتمالية التحويل لمبيعات.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Smartphone className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">التسوق بالبث المباشر</p>
                <p className="text-sm text-slate-400">تعد تقنية Livestream Commerce ثورة جديدة بدأت في الصين وتنتشر عالمياً، لدمج الترفيه بالتسوق الفوري.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Amazon Web Services (AWS)', country: 'USA', note: 'الموفر الأساسي للبنية التحتية السحابية وحلول الذكاء الاصطناعي لشركات التجزئة' },
    { name: 'BigCommerce', country: 'USA', note: 'منصة رائدة توفر حلول تقنيات التجارة الإلكترونية المتقدمة للشركات الكبرى' },
    { name: 'Zebra Technologies', country: 'USA', note: 'القائد في حلول المسح الضوئي، تتبع المخزون، وأتمتة العمليات داخل المتاجر' },
    { name: 'Ocado Solutions', country: 'UK', note: 'المبتكر الأول في أتمتة مستودعات البقالة باستخدام الروبوتات والذكاء الاصطناعي' },
  ],

  definition: 'تشمل تقنيات التجزئة الأدوات الرقمية وحلول الأتمتة المستخدمة في المتاجر الفعلية ومنصات التجارة الإلكترونية، بما في ذلك الذكاء الاصطناعي، إنترنت الأشياء (IoT)، والواقع المعزز.',

  industryInsights: [
    'الذكاء الاصطناعي التوليدي يساهم في خفض تكاليف خدمة العملاء وصناعة المحتوى التسويقي بنسبة تصل لـ 40%',
    'أتمتة "الميل الأخير" (Last Mile) باستخدام الروبوتات والدرونز هي الساحة القادمة للتنافس بين عمالقة التجزئة',
    'المتاجر التي تعتمد على "التجربة المكانية" الرقمية (Experiential spaces) تحقق معدلات ولاء أعلى بكثير من المتاجر التقليدية',
  ],

  tags: ['Retail Tech', 'AI in Retail', 'Automation', 'Warehouse Robotics', 'AR Shopping', 'Digital Transformation'],
};

const RetailTechnologyDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default RetailTechnologyDashboard;
