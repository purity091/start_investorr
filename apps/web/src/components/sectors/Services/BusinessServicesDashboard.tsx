import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Briefcase, BarChart3, Users, Globe, TrendingUp, ShieldCheck, Search, Building2 } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'خدمات الأعمال والاستشارات',
  titleEn: 'Business Services Industry',
  subtitle: 'تحليل قطاع الاستشارات الإدارية، أبحاث السوق، إدارة المرافق، وحلول التوظيف والموارد البشرية العالمية',
  icon: Briefcase,
  accent: 'blue',
  pdfLabel: 'تقرير خدمات الأعمال (PDF)',

  kpis: [
    { label: 'سوق الاستشارات (أمريكا)', value: '374.4', unit: 'مليار $', icon: BarChart3 },
    { label: 'أبحاث السوق العالمية', value: '84.3', unit: 'مليار $', icon: Search },
    { label: 'سوق البحث التنفيذي (Executive)', value: '35', unit: 'مليار €', icon: Users },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق استشاري عالمي', 
      country: 'الولايات المتحدة', 
      note: 'مقر لأكبر شركات الاستشارات (Big Three & Big Four) وتستحوذ على أكثر من 40% من السوق العالمي.',
      icon: Briefcase
    },
    { 
      label: 'مركز خبرات تكنولوجيا المعلومات', 
      country: 'الهند', 
      note: 'القائد العالمي في تعهيد الخدمات التقنية والبرمجية (BPO/IT) بفضل وفرة المهارات المتخصصة.',
      icon: Globe
    },
    { 
      label: 'ثاني أكبر قطاع خدمات أوروبي', 
      country: 'المملكة المتحدة', 
      note: 'تتمتع بلندن كمركز مالي واستشاري عالمي رائد، مع قوة كبيرة في أبحاث السوق والخدمات القانونية.',
      icon: Building2
    }
  ],

  navItems: ['نظرة عامة', 'الاستشارات الإدارية', 'أبحاث السوق والداتا', 'إدارة المرافق والتوظيف', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'التحول الرقمي في خدمات الشركات',
      subtitle: 'Technology & Digitalization Shift',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            شهد قطاع خدمات الأعمال تحولاً جذرياً نحو الرقمنة، حيث تُقدم الآن معظم الخدمات عبر منصات الويب وتطبيقات الجوال. أدى تطور تكنولوجيا الاتصالات إلى توسع كبير في عمليات التعهيد (Outsourcing)، مما جعل الشركات تعتمد بشكل متزايد على مزودي الخدمات الخارجيين بدلاً من الحلول الداخلية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <TrendingUp className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">نمو قطاع التعهيد (BPO)</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تتسارع الشركات في البحث عن حلول تكنولوجية مرنة ومبتكرة للتكيف مع ديناميكيات السوق الجديدة، مما يجعل مزودي خدمات الأعمال حجر الزاوية في كفاءة المؤسسات المعاصرة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'consulting',
      title: 'الاستشارات: قادة السوق والنمو العالمي',
      subtitle: 'Management Consulting & Global Leaders',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد أمريكا الشمالية وأوروبا أكبر الأسواق للاستشارات الإدارية. توظف المؤسسات المستشارين لمواجهة التحديات المعقدة وتحسين الأداء المالي والتشغيلي.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Building2 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">مجموعات Big Four</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تهيمن Deloitte, EY, KPMG, PwC على المشهد الاستشاري والمحاسبي العالمي بحصة سوقية هائلة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الشرق الأوسط وأفريقيا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يشهد سوق الاستشارات في المنطقة نمواً متسارعاً مدفوعاً بخطط التحول الوطني والمشاريع الضخمة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'market-research',
      title: 'أبحاث السوق: البيانات كذهب جديد',
      subtitle: 'Market Research & Big Data Analytics',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبح تحليل البيانات الضخمة (Big Data) أمراً حاسماً للتنبؤ باحتياجات العملاء والاستثمار في أسواق جديدة. تعتمد الصناعة بشكل متزايد على الخوارزميات الإحصائية والنماذج التنبؤية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Search className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">أدوات التحليل المتقدمة</p>
                <p className="text-sm text-slate-400">تنمو إيرادات الصناعة بفضل الطلب العالي على المعلومات الدقيقة لدعم قرارات البحث والتطوير (R&D).</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Users className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الشبكات المهنية (LinkedIn)</p>
                <p className="text-sm text-slate-400">تحولت منصات مثل LinkedIn إلى أدوات أساسية في صناعة التوظيف والبحث التنفيذي، مدعومة بالذكاء الاصطناعي.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Deloitte / PwC / EY / KPMG', country: 'Global', note: 'المجموعات الأربع الكبرى (Big Four) المهيمنة على قطاعات المحاسبة والاستشارات' },
    { name: 'McKinsey & Company', country: 'USA', note: 'تعتبر أكثر شركات الاستشارات المرموقة عالمياً في التخطيط الاستراتيجي' },
    { name: 'Nielsen Holdings', country: 'Global', note: 'الرائد العالمي في أبحاث السوق وقياس وتحليل سلوك المستهلكين' },
    { name: 'Adecco Group', country: 'Switzerland', note: 'قائد عالمي في حلول الموارد البشرية والتوظيف والخدمات المهنية' },
  ],

  definition: 'تشمل خدمات الأعمال (B2B) مجموعة واسعة من القطاعات التي توفر الدعم المهني والعلمي والتقني للمؤسسات، بما في ذلك المحاسبة، الاستشارات، إدارة المرافق، وأبحاث السوق.',

  industryInsights: [
    'الاعتماد على الذكاء الاصطناعي في الاستشارات يساهم في تسريع تحليل البيانات المعقدة بنسبة 50%',
    'إدارة المرافق (Facility Management) تركز بشكل متزايد على رفاهية الموظفين وتصميم مساحات عمل مرنة وآمنة',
    'سوق التوظيف العالمي يتجه نحو "التحليلات التنبؤية" لضمان مطابقة أفضل بين المرشحين والمؤسسات',
  ],

  tags: ['Business Services', 'Consulting', 'Market Research', 'Outsourcing', 'B2B', 'Big Four'],
};

const BusinessServicesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default BusinessServicesDashboard;
