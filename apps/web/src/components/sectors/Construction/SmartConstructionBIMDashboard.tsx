import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { HardHat, Globe, TrendingUp, Award } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'البنية التحتية الذكية وBIM',
  titleEn: 'Smart Construction & BIM',
  subtitle: 'نمذجة معلومات البناء، التوائم الرقمية، وأتمتة العمليات في قطاع الإنشاءات الحديث',
  icon: HardHat,
  accent: 'orange',
  pdfLabel: 'تقرير الـ BIM (PDF)',
  kpis: [
    { label: 'حجم سوق BIM العالمي', value: '7.9', unit: 'مليار $', icon: Globe },
    { label: 'معدل النمو السنوي (CAGR)', value: '13.7', unit: '% المتوقع', icon: TrendingUp },
    { label: 'كفاءة تقليل التكلفة', value: '20', unit: '% عبر BIM', icon: HardHat },
  ],

  topMarkets: [
    { 
      label: 'القائد التقني والبرمجي', 
      country: 'الولايات المتحدة', 
      note: 'مقر كبرى شركات برمجيات النمذجة (Autodesk) وتتمتع بأعلى معدلات تبني للتقنيات السحابية في البناء.',
      icon: Globe
    },
    { 
      label: 'رائد التشريعات والمعايير', 
      country: 'المملكة المتحدة', 
      note: 'أول دولة فرضت معايير BIM (Level 2) في المشاريع الحكومية، مما جعلها مرجعاً عالمياً للتنظيم.',
      icon: Award
    },
    { 
      label: 'عملاق المشاريع الضخمة', 
      country: 'الصين', 
      note: 'تستخدم تقنيات البناء الذكي في أضخم مشاريع البنية التحتية والمدن الذكية بنطاق لا مثيل له.',
      icon: TrendingUp
    }
  ],

  navItems: ['نظرة عامة', 'تقنية BIM', 'التوائم الرقمية', 'التوجهات والقادة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'رقمنة مواقع البناء',
      subtitle: 'Digitizing Construction Sites',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يشهد قطاع الإنشاءات تحولاً حاسماً من العمليات الورقية التقليدية إلى الأنظمة الرقمية المتكاملة. يهدف البناء الذكي إلى دمج التقنيات مثل الطائرات بدون طيار، إنترنت الأشياء، والذكاء الاصطناعي لتحسين الإنتاجية وتقليل الهدر الذي يمثل تاريخياً تحدياً كبيراً في هذا القطاع.
          </p>
          <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100 flex items-start gap-4">
             <TrendingUp className="text-orange-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-orange-900 leading-tight">كفاءة الإنشاءات الرقمية</p>
                <p className="text-sm text-orange-700/80 mt-2">
                  تساهم النمذجة الرقمية في تقليل أخطاء التصميم والتداخلات بنسبة تصل إلى 40% قبل البدء الفعلي في الموقع.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'bim-tech',
      title: 'قوة نمذجة معلومات البناء (BIM)',
      subtitle: 'The Power of BIM',
      content: (
        <div className="space-y-6 text-right">
          <p>
            نمذجة معلومات البناء (Building Information Modeling) ليست مجرد رسم ثلاثي الأبعاد، بل هي عملية إدارة معلومات شاملة طوال دورة حياة المبنى. تسمح هذه التقنية لكافة الأطراف (مهندسين، مقاولين، ملاك) بالعمل على نموذج بيانات موحد يقلل الهدر ويسرع التنفيذ.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-orange-600 mb-2" size={20} />
                <p className="font-black text-slate-900">BIM في البنية التحتية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يتم استخدامه بشكل مكثف في تصميم الجسور والمطارات المعقدة لضمان دقة التنفيذ الفائقة.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <HardHat className="text-orange-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إدارة الموقع الذكية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تساعد التقنيات اللحظية في مراقبة سلامة العمال وتوافر المواد في الموقع بدقة عالية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'digital-twins',
      title: 'التوائم الرقمية (Digital Twins)',
      subtitle: 'Building Digital Twins',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يعد التوأم الرقمي نسخة افتراضية طبق الأصل للمبنى الفعلي، متصلة بحساسات ترسل بيانات في الوقت الحقيقي. يسمح ذلك للملاك بالتنبؤ باحتياجات الصيانة وتشغيل المبنى بأعلى كفاءة طاقة ممكنة، مما يحول المباني إلى أصول ذكية ومستدامة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-orange-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الاستدامة والـ BIM</p>
                <p className="text-sm text-slate-400">تساعد المحاكاة الرقمية في اختيار المواد الأكثر استدامة وتقليل الانبعاثات الكربونية للمنشآت.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Globe className="text-orange-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">مستقبل المدن الذكية</p>
                <p className="text-sm text-slate-400">دمج بيانات النمذجة (BIM) مع نظم المعلومات الجغرافية (GIS) هو اللبنة الأساسية لبناء مدن المستقبل الرقمية.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Autodesk', country: 'USA', note: 'المزود العالمي الأول لبرمجيات BIM (Revit) والأدوات التصميمية الذكية' },
    { name: 'Trimble Navigation', country: 'USA', note: 'رائد في برمجيات وتقنيات الموقع التي تربط الأجهزة الميدانية بالمكتب' },
    { name: 'Bentley Systems', country: 'USA', note: 'متخصص في برمجيات البنية التحتية الضخمة وحلول التوائم الرقمية للهندسة' },
    { name: 'Nemetschek Group', country: 'Germany', note: 'قوة أوروبية كبرى في برمجيات البناء والهندسة المعمارية الرقمية' },
  ],

  definition: 'البناء الذكي ونمذجة معلومات المباني (BIM) هو قطاع تكنولوجي يختص باستخدام الأدوات الرقمية والبيانات المتقدمة لتصميم وإنشاء وتشغيل الأصول العقارية والبنية التحتية بكفاءة استثنائية.',

  industryInsights: [
    'الـ BIM أصبح شرطاً إلزامياً في المشاريع الحكومية الكبرى في المملكة المتحدة، الاتحاد الأوروبي، ونموذداً يُحتذى به عالمياً',
    'التحول نحو البناء خارج الموقع (Off-site Construction) يعتمد بشكل كلي على دقة النماذج الرقمية المنتجة عبر BIM',
    'دمج الذكاء الاصطناعي مع نماذج BIM يسمح بالتوليد التلقائي للتصاميم المعمارية الأكثر كفاءة وملاءمة للبيئة',
  ],

  tags: ['BIM', 'Smart Construction', 'Digital Twin', 'Autodesk', 'Construction Tech', 'Infrastructure'],
};

const SmartConstructionBIMDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default SmartConstructionBIMDashboard;
