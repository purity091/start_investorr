import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { ShieldAlert, Lock, Globe, DollarSign, Activity, BarChart3, TrendingUp, Fingerprint } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الأمن السيبراني والجرائم الإلكترونية',
  titleEn: 'Cyber Crime & Security',
  subtitle: 'تحليل انتهاكات البيانات، تكلفة الجرائم الإلكترونية، الهجمات ببرامج الفدية، وتشريعات حماية البيانات',
  icon: ShieldAlert,
  accent: 'red',
  pdfLabel: 'تقرير الأمن السيبراني العالمي (PDF)',

  kpis: [
    { label: 'تكلفة الجرائم الإلكترونية عالمياً', value: '9.22', unit: 'ترليون $', icon: DollarSign },
    { label: 'متوسط تكلفة خرق البيانات', value: '4.35', unit: 'مليون $', icon: Activity },
    { label: 'المنظمات التي تدفع الفدية', value: '46%', icon: Lock },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق للأمن السيبراني', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في الإنفاق السيبراني، وموطن لأكبر شركات الدفاع الرقمي مثل Palo Alto وCrowdStrike.',
      icon: ShieldAlert
    },
    { 
      label: 'مركز الابتكار السيبراني', 
      country: 'إسرائيل', 
      note: 'تُعد ثاني أهم بيئة تكنولوجية للأمن السيبراني في العالم، مع تركيز هائل على الأبحاث والشركات الناشئة المتطورة.',
      icon: Lock
    },
    { 
      label: 'رائد الدفاع السيبراني الحكومي', 
      country: 'المملكة المتحدة', 
      note: 'تمتلك واحداً من أذكى الاستراتيجيات الوطنية للأمن السيبراني وبيئة اقتصادية قوية لحماية الخدمات المالية.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'الأضرار المالية', 'التوجهات والخصوصية', 'التشريعات (GDPR)', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'تحول مشهد التهديدات الرقمية',
      subtitle: 'Cyber Threat Landscape',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            مع استمرار زيادة استخدام الإنترنت، تزداد كمية المعلومات الشخصية والبيانات المتاحة عبر الإنترنت. ومع تطور أدوات الذكاء الاصطناعي المختلفة حالياً، تتحول الجرائم الإلكترونية لتصبح أكثر تعقيداً واستهدافاً، مما يجعل المخاطر أكبر من أي وقت مضى.
          </p>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4">
             <Fingerprint className="text-red-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-red-900 leading-tight">فقدان المعلومات الحساسة</p>
                <p className="text-sm text-red-700/80 mt-2">
                  تعتبر المنظمات فقدان البيانات الشخصية للعملاء أو الموظفين من أخطر نتائج الهجمات، حيث تؤدي إلى أضرار جسيمة في السمعة وخسائر فورية في الإيرادات.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'financial',
      title: 'الأضرار المالية والاقتصادية',
      subtitle: 'Financial Impact of Cybercrime',
      content: (
        <div className="space-y-6 text-right">
          <p>
            لا تدفع المنظمات ثمن البيانات المفقودة فحسب، بل تعاني أيضاً من توقف العمليات وتعطيل الإنتاجية. يختلف حجم الضرر بشكل كبير حسب المنطقة وحجم المنظمة ونوع الصناعة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <DollarSign className="text-red-600 mb-2" size={20} />
                <p className="font-black text-slate-900">خرق البيانات الصحي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يصل متوسط تكلفة خرق البيانات في قطاع الرعاية الصحية إلى 10.1 مليون دولار، وهو الأعلى بين القطاعات.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-red-600 mb-2" size={20} />
                <p className="font-black text-slate-900">عدد التهديدات الفريدة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تم الإبلاغ عن أكثر من 1.9 مليون تهديد فريد من قبل المستخدمين النهائيين في عام 2023 وحده.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'privacy',
      title: 'أولويات الخصوصية والتشريعات',
      subtitle: 'Laws & Privacy Priorities',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت حماية البيانات أولوية عالمية. تم إدخال لائحة GDPR في الاتحاد الأوروبي عام 2018 لتنظيم التعامل مع البيانات، وتظل حتى الآن الشريعة الأكثر شمولاً في العالم.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Lock className="text-red-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">حماية الهوية</p>
                <p className="text-sm text-slate-400">ذكر 7 من كل 10 مستخدمين أنهم اتخذوا خطوات نشطة لحماية هويتهم عبر الإنترنت في عام 2023.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShieldAlert className="text-red-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">غرامات GDPR</p>
                <p className="text-sm text-slate-400">تستمر الهيئات التنظيمية في فرض غرامات بمليارات اليورو على الشركات التي تنتهك حقوق الخصوصية للمواطنين.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Palo Alto Networks', country: 'USA', note: 'الرائد العالمي في جدران الحماية والحلول الأمنية السحابية' },
    { name: 'Fortinet', country: 'USA', note: 'متخصص في دمج تقنيات الشبكات مع الأمن السيبراني' },
    { name: 'CrowdStrike', country: 'USA', note: 'رائد في حماية الأجهزة الطرفية والاستجابة للحوادث' },
    { name: 'Check Point', country: 'Israel', note: 'من أقدم وأقوى الشركات في أمن الشبكات والبيانات' },
  ],

  definition: 'يشمل قطاع الأمن السيبراني جميع التقنيات والعمليات والممارسات المصممة لحماية الشبكات والأجهزة والبيانات من الهجمات أو الأضرار أو الوصول غير المصرح به.',

  industryInsights: [
    'الذكاء الاصطناعي التوليدي (ChatGPT) يغير قواعد اللعبة في كل من الهجمات والدفاع السيبراني',
    'هناك نقص عالمي في القوى العاملة المتخصصة في الأمن السيبراني يقدر بملايين الوظائف',
    'هجمات التصيد الاحتيالي (Phishing) تظل الناقل الأول لمعظم حوادث خرق البيانات الكبرى',
  ],

  tags: ['Cybersecurity', 'Data Breach', 'GDPR', 'Ransomware', 'Privacy'],
};

const CyberCrimeSecurityDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default CyberCrimeSecurityDashboard;
