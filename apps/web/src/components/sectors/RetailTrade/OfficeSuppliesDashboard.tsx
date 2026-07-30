import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Briefcase, PenTool, Layout, Globe, BarChart3, TrendingUp, Monitor, Laptop } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المستلزمات المكتبية ودعم العمل',
  titleEn: 'Office Supplies Industry',
  subtitle: 'تحليل سوق القرطاسية، تجهيزات المكاتب المنزلية، تحول الطلب الرقمي، وهيمنة الصين كأكبر مصدر للأدوات المكتبية',
  icon: Briefcase,
  accent: 'blue',
  pdfLabel: 'تقرير سوق المكتب والقرطاسية (PDF)',

  kpis: [
    { label: 'قيمة الصادرات العالمية سنوياً', value: '18.1', unit: 'مليار $', icon: Globe },
    { label: 'إنفاق القرطاسية (بريطانيا)', value: '1+', unit: 'مليار £', icon: BarChart3 },
    { label: 'إيرادات Flying Tiger', value: '5', unit: 'مليار كرونة', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'أضخم مصدّر للقرطاسية', 
      country: 'الصين', 
      note: 'تنتج وتصدر أكثر من 18 مليار دولار من المستلزمات المكتبية والقرطاسية سنوياً، وتهيمن على سلاسل التوريد العالمية.',
      icon: Globe
    },
    { 
      label: 'أكبر سوق استهلاكي وتجهيزي', 
      country: 'الولايات المتحدة', 
      note: 'تشهد أعلى إنفاق فردي على مستلزمات المدارس والكليات وتجهيزات المكاتب المنزلية المتقدمة.',
      icon: Briefcase
    },
    { 
      label: 'رائد ثقافة الجماليات الملحقة', 
      country: 'اليابان / الدنمارك', 
      note: 'مراكز ابتكار في تصميم القرطاسية "الجمالية" والفاخرة، مع علامات تجارية مثل Flying Tiger و MUJI.',
      icon: PenTool
    }
  ],

  navItems: ['نظرة عامة', 'أقسام السوق', 'العمل الهجين وعن بعد', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'بين الورق والمنصات الرقمية',
      subtitle: 'Home-office as the New Normal',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            أصبح العمل من المنزل جزءاً من "الواقع الجديد" عالمياً. وفي حين تراجع الطلب على المنتجات الورقية التقليدية مثل الأقلام والورق بسبب التحول الرقمي، زاد الطلب بشكل كبير على تجهيزات المكاتب المنزلية، السماعات، الشاشات، والأثاث المكتبي المتخصص.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Monitor className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الأسواق الناضجة والناشئة</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تعتبر أمريكا وأوروبا أسواقاً ناضجة يحركها الطلب عبر الإنترنت، بينما تمثل آسيا والمحيط الهادئ مناطق ذات إمكانات نمو هائلة للشركات العالمية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'أقسام السوق: من المدرسة إلى المكتب',
      subtitle: 'Stationery, PC & School Supplies',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تشمل أقسام الصناعة القرطاسية، مستلزمات العودة للمدارس، أجهزة الكمبيوتر الشخصية، والأثاث المكتبي. في أمريكا، سجل المتسوقون أعلى متوسط إنفاق على مستلزمات العودة للكليات (Back-to-college) بقيمة تصل لـ 95 دولاراً للفرد.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <PenTool className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">القرطاسية المستدامة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يتزايد الطلب على منتجات القرطاسية القابلة لإعادة التدوير والصديقة للبيئة كاتجاه رئيسي يحرك السوق.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Monitor className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">تجهيزات العمل عن بعد</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبح المكتب المنزلي فئة أصول استثمارية للأفراد، مما عزز مبيعات الشاشات المزدوجة والمقاعد المريحة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'hybrid-work',
      title: 'العمل الهجين ومستقبل المساحات المكتبي',
      subtitle: 'Hybrid Work & Remote Efficiency',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أدى نموذج العمل الهجين إلى تحسين كفاءة استهلاك الأدوات المكتبية وتطوير أدوات تعاون رقمية تكمّل المنتجات المادية التقليدية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Layout className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تجزئة الفضاء المكتبي</p>
                <p className="text-sm text-slate-400">تحول تركيز تجار التجزئة من توريد الشركات الضخمة إلى استهداف الأفراد بمجموعات "تصميم المكتب المنزلي" المتكاملة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Laptop className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">التجارة الإلكترونية</p>
                <p className="text-sm text-slate-400">تنمو مبيعات الأدوات المكتبية عبر الإنترنت بشكل أسرع من المتاجر التقليدية بفضل سهولة الطلب المتكرر (Recurring Orders).</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Flying Tiger Copenhagen', country: 'Denmark', note: 'أحد أبرز اللاعبين في قطاع القرطاسية والديكور المكتبي بانتشار عالمي واسع' },
    { name: 'Staples', country: 'USA', note: 'الاسم الأشهر في توريد المكاتب والشركات، مع تحول استراتيجي نحو التجارة الإلكترونية' },
    { name: 'Steelcase', country: 'USA', note: 'الرائد في تصنيع وتصميم أثاث المكاتب المتقدم وحلول بيئات العمل الحديثة' },
    { name: 'China (National)', country: 'China', note: 'الدولة المصدرة الأولى عالمياً للأدوات المكتبية والقرطاسية بأسعار تنافسية' },
  ],

  definition: 'تشمل تجارة المستلزمات المكتبية بيع القرطاسية، مستلزمات المدارس، معدات الكمبيوتر، والأثاث المكتبي الموجه للشركات أو الأفراد في مكاتبهم المنزلية.',

  industryInsights: [
    'القرطاسية "الفاخرة" وذات التصميم المصمم (Design Stationery) تشهد نمواً كبيراً كمنتجات للهدايا',
    'الشركات تعيد تصميم مكاتبها لتكون مساحات تعاونية بدلاً من مجرد مكاتب فردية، مما يغير الطلب على الأثاث',
    'موسم "العودة للمدارس" يظل الحدث الشرائي الأهم سنوياً لهذا القطاع في كافة دول العالم',
  ],

  tags: ['Office Supplies', 'Stationery', 'Home Office', 'Flying Tiger', 'Remote Work', 'School Supplies'],
};

const OfficeSuppliesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default OfficeSuppliesDashboard;
