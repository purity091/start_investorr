import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Terminal, Database, Code, BarChart3, TrendingUp, Globe, Sparkles, Layout } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'صناعة البرمجيات',
  titleEn: 'Software Industry',
  subtitle: 'تحليل قطاعات برمجيات المؤسسات (ERP/CRM)، حلول SaaS، تطوير البرمجيات المعتمد على الـ AI، ونظم التشغيل',
  icon: Code,
  accent: 'blue',
  pdfLabel: 'تقرير البرمجيات (PDF)',

  kpis: [
    { label: 'الإنفاق على برمجيات المؤسسات', value: '1.04', unit: 'تريليون $', icon: Globe },
    { label: 'حصة الـ SaaS من السوق', value: '33', unit: '%', icon: Database },
    { label: 'الشركة الأكبر عالمياً', value: 'Microsoft', unit: 'Brand', icon: Sparkles },
  ],

  topMarkets: [
    { 
      label: 'القوة البرمجية الأولى', 
      country: 'الولايات المتحدة', 
      note: 'تسيطر على معظم الإنفاق العالمي على البرمجيات وتضم عمالقة مثل Microsoft وOracle.',
      icon: TrendingUp
    },
    { 
      label: 'سوق النمو الرقمي', 
      country: 'الصين', 
      note: 'تشهد توسعاً هائلاً في حلول المؤسسات والذكاء الاصطناعي مع دعم حكومي قوي للتوطين التقني.',
      icon: Globe
    },
    { 
      label: 'مركز برمجيات المؤسسات', 
      country: 'ألمانيا', 
      note: 'أكبر سوق برمجيات في أوروبا ومقر لشركة SAP العملاقة في مجال إدارة الموارد.',
      icon: Terminal
    }
  ],

  navItems: ['نظرة عامة', 'برمجيات المؤسسات', 'نموذج SaaS والسحاب', 'الذكاء الاصطناعي التوليدي', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'البرمجيات تقود عصر المعلومات',
      subtitle: 'Software in the Digital Era',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تتغلغل البرمجيات في كافة جوانب الحياة الحديثة. يعتمد الأفراد والشركات على نظم التشغيل والتطبيقات لإنجاز المهام اليومية. يحقق قطاع برمجيات المؤسسات أحد أعلى معدلات النمو في الصناعة التقنية، مع توقعات باستمرار هذا الزخم.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Code className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">تطوير البرمجيات بالذكاء الاصطناعي</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  أصبح التطوير المدعوم بالذكاء الاصطناعي التقنية الأكثر شعبية وجذباً للمطورين، مما يسهم في تسريع دورة إنتاج البرمجيات وتحسين جودتها.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'برمجيات المؤسسات و الـ SaaS',
      subtitle: 'Enterprise Software & SaaS Model',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد برمجيات المؤسسات (مثل ERP و CRM) القسم الأكبر في الصناعة. يمثل التحول من البرمجيات المقيمة محلياً إلى البرمجيات كخدمة (SaaS) اتجاهاً مهيمناً نظراً لانخفاض تكاليف الملكية الكلية وسهولة الوصول.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Layout className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إدارة علاقات العملاء CRM</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أصبحت أدوات مثل Salesforce ضرورة حتمية للشركات للبقاء قادرة على المنافسة في السوق الرقمي.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Database className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نظم تخطيط الموارد ERP</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تهيمن SAP و Oracle على هذا القطاع الذي ينظم العمليات الأساسية للشركات الكبرى عالمياً.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-revolution',
      title: 'ثورة الذكاء الاصطناعي التوليدي',
      subtitle: 'The Generative AI Revolution',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أدى ظهور النماذج اللغوية الضخمة مثل ChatGPT و Gemini إلى تحول جذري في الصناعة. دمج الذكاء الاصطناعي في البرمجيات يزيد من الكفاءة ويقلل التكاليف، مع تأثيرات متلاحقة على كافة المهن من البرمجة إلى الإدارة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Terminal className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">أدوات المطورين</p>
                <p className="text-sm text-slate-400">تساعد أدوات مثل Copilot المطورين على كتابة الأكواد بفعالية أكبر، مما يقلل الوقت اللازم لإطلاق الميزات الجديدة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">نمو سوق الـ AI</p>
                <p className="text-sm text-slate-400">من المتوقع أن ينمو حجم سوق الذكاء الاصطناعي عالمياً بشكل كبير حتى عام 2031 ليتغلغل في كافة القطاعات.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Microsoft', country: 'USA', note: 'المتصدر الدائم عبر Windows و Office Suite وحلول السحاب المتكاملة مع الـ AI' },
    { name: 'SAP SE', country: 'Germany', note: 'الشركة الأوروبية الأكبر المتخصصة في برمجيات إدارة المؤسسات و ERP' },
    { name: 'Oracle Corporation', country: 'USA', note: 'رائدة في قواعد البيانات وبرمجيات الأعمال المتطورة والخدمات السحابية' },
    { name: 'Adobe Inc.', country: 'USA', note: 'تهيمن على برمجيات الإبداع والتصميم والتسويق الرقمي بفضل حزمة Creative Cloud' },
  ],

  definition: 'تتكون صناعة البرمجيات من تطوير وتوزيع وصيانة البرمجيات، وتشمل التطبيقات، البنية التحتية، نظم التشغيل، وإدارة قواعد البيانات.',

  industryInsights: [
    'البرمجيات مفتوحة المصدر (Open Source) تشكل الآن ركيزة أساسية للبنية التحتية البرمجية لمعظم الشركات الكبرى',
    'الاشتراك السحابي (Subscription Model) أصبح المعيار الوحيد المستدام للشركات لضمان تدفق نقدي ثابت وتحديثات مستمرة',
    'الأمن المدمج (DevSecOps) أصبح ضرورة وليس خياراً في دورة تطوير البرمجيات لمواجهة التهديدات السيبرانية المعقدة',
  ],

  tags: ['Software', 'Enterprise Software', 'SaaS', 'Microsoft', 'Generative AI', 'SaaS', 'ERP'],
};

const SoftwareDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default SoftwareDashboard;
