import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Building2, Globe, TrendingUp, Thermometer, Leaf } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'بناء العقارات والإنشاءات',
  titleEn: 'Building Construction',
  subtitle: 'العقارات السكنية والتجارية، الأبنية الخضراء، وتحديات التكلفة العالمية',
  icon: Building2,
  accent: 'blue',
  pdfLabel: 'تقرير التشييد والبناء (PDF)',

  kpis: [
    { label: 'أكبر شركة إنشاءات في العالم', value: 'CSCE', unit: 'الصين الحكومية للهندسة', icon: Globe },
    { label: 'أعلى تكاليف بناء في أوروبا', value: 'جنيف', unit: 'سويسرا', icon: TrendingUp },
    { label: 'أعلى ناطحة سحاب في العالم', value: 'برج خليفة', unit: 'دبي - الإمارات', icon: Building2 },
  ],

  topMarkets: [
    { 
      label: 'عملاق الإنشاءات العالمي', 
      country: 'الصين', 
      note: 'تمتلك أكبر صناعة بناء وتشييد في العالم، ومقر لأضخم شركات المقاولات الحكومية التي تنفذ مشاريع دولية.',
      icon: Globe
    },
    { 
      label: 'أضخم سوق عقاري سكني', 
      country: 'الولايات المتحدة', 
      note: 'يقود القطاع السكني الخاص فيها الاقتصاد الإنشائي بقيمة تتجاوز 860 مليار دولار سنوياً.',
      icon: Building2
    },
    { 
      label: 'مركز المجموعات الإنشائية الكبرى', 
      country: 'فرنسا', 
      note: 'مقر لشركات عملاقة مثل Vinci وBouygues التي تقود مشاريع البنية التحتية والإنشاءات المعقدة في أوروبا.',
      icon: TrendingUp
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'قطاعات السوق', 'اتجاهات الصناعة', 'قادة الصناعة', 'تعريف الصناعة'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            شهد الطلب على المساكن الجديدة والعقارات التجارية نمواً مستمراً في السنوات الأخيرة، لكن العرض يواجه صعوبة في مواكبة هذا الطلب. لا تقتصر المشكلة على ندرة مساحات البناء في المدن الكبرى فحسب، بل شملت أيضاً نقصاً في المواد والكوادر الفنية في السنوات الماضية، بينما أبقى التضخم تكاليف البناء مرتفعة.
          </p>
          <p>
            وقد أدى الوعي العالمي المتزايد بتغير المناخ إلى تعزيز التغيير في الصناعة، بما في ذلك نمو قطاع تشييد المباني الخضراء. ومع ذلك، فإن هذه الاتجاهات والتحديات الجديدة لم تعق نمو صناعة البناء والتشييد.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق',
      subtitle: 'Residential Market Value',
      content: (
        <div className="space-y-6">
          <p>
            تمتلك الولايات المتحدة، باعتبارها واحدة من أكبر الاقتصادات في العالم، صناعة تشييد مبانٍ ضخمة مكافئة. وصل قطاعها السكني الخاص وحده إلى قيمة تزيد عن <strong>862 مليار دولار أمريكي</strong> في عام 2023.
          </p>
          <p>
            على جانب العرض، كان لارتفاع تكاليف البناء تأثير سلبي على ربحية أنشطة البناء. ومع ذلك، فإن تطوير هذه الصناعة يعتمد أيضاً بشكل كبير على سوق العقارات، الذي يشير إلى الطلب على الإسكان والمباني الأخرى.
          </p>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق',
      subtitle: 'Industrial & Residential Costs',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            يمكن أن تختلف تكلفة بناء المباني الصناعية بشكل كبير من مدينة إلى أخرى. تعتمد هذه الاختلافات على عدة عوامل، مثل سعر الأرض، وتوافر المواد وأسعارها، أو متوسط الرواتب.
          </p>
          <p>
            أدت التطورات الأخيرة، مثل الحاجة إلى الخدمات اللوجستية خلال الجائحة، إلى زيادة الاهتمام ببناء المستودعات. ومؤخراً، أدى التضخم إلى زيادة تكلفة المواد بشكل ملحوظ.
          </p>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'Green Buildings & Efficiency',
      content: (
        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <p>
                زاد الطلب على الهياكل ذات الانبعاثات المنخفضة من غازات الاحتباس الحراري مع استمرار نمو المخاوف بشأن تغير المناخ. بلغت قيمة سوق كفاءة البناء حوالي <strong>391 مليار دولار أمريكي</strong> في عام 2022.
              </p>
              <p className="mt-4 italic font-bold text-blue-800">
                "بالإضافة إلى تقليل البصمة الكربونية، تساعد المباني الخضراء أيضاً في تقليل تكاليف التشغيل طويلة الأمد."
              </p>
            </div>
            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center">
               <Leaf size={40} className="text-emerald-600 mb-2" />
               <p className="text-xl font-black text-blue-900">$391B</p>
               <p className="text-xs font-bold text-slate-500 text-center uppercase">سوق كفاءة الأبنية</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'hvac',
      title: 'قطاع HVAC',
      subtitle: 'Heating & Cooling Impact',
      content: (
        <div className="space-y-6">
          <p>
            أصبح سوق التدفئة والتهوية وتكييف الهواء (HVAC) ذا أهمية متزايدة في السنوات الماضية. وتعد درجات الحرارة العالمية المرتفعة مع تغير أنماط الطقس محركاً لهذا التطور.
          </p>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
             <Thermometer className="text-orange-500" size={32} />
             <p className="text-lg font-medium text-slate-600">تنمو المبيعات السنوية لمضخات الحرارة بشكل ملحوظ، خاصة في الأسواق الأوروبية مثل ألمانيا والسويد.</p>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'China State Constr. Eng.', country: 'الصين', note: 'أكبر شركة مقاولات عالمياً' },
    { name: 'Vinci S.A.', country: 'فرنسا', note: 'أكبر شركة إنشاءات في أوروبا' },
    { name: 'D.R. Horton', country: 'الولايات المتحدة', note: 'رائد بناء المنازل السكنية' },
    { name: 'Lennar Corp.', country: 'الولايات المتحدة', note: 'متخصص عقارات سكنية كبرى' },
    { name: 'PulteGroup', country: 'الولايات المتحدة', note: 'تطوير عقاري وإنشائي' },
    { name: 'Bouygues', country: 'فرنسا', note: 'عملاق خدمات البناء المتكاملة' },
  ],

  definition: `يوفر هذا القسم نظرة ثاقبة حول بناء المباني التجارية والسكنية. تقدم إحصاءاتنا بيانات عن جميع مراحل عملية البناء، من عدد تصاريح البناء الصادرة إلى الإنفاق على الأنشطة اللازمة لإكمال المباني، مثل الطلاء والزجاج. كما تتوفر معلومات حول الموظفين والشركات المعنية، بالإضافة إلى المباني الخضراء وأنظمة HVAC.`,

  industryInsights: [
    'التضخم ونقص العمالة يمثلان أكبر التحديات التي تواجه هوامش ربح المقاولين',
    'المباني الخضراء أصبحت ضرورة استراتيجية لتقليل تكاليف التشغيل والانبعاثات',
    'الولايات المتحدة تسيطر على أعلى قيم لبناء العقارات السكنية الخاصة',
    'تغير المناخ يرفع الطلب العالمي على أنظمة التبريد والتدفئة المتطورة (HVAC)',
  ],

  tags: ['Residential', 'Commercial', 'Green Building', 'Real Estate', 'HVAC', 'BIM', 'Sustainable Construction'],
};

const BuildingConstructionDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default BuildingConstructionDashboard;
