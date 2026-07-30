import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Briefcase, Globe, TrendingUp, Cpu, ShoppingCart } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التجارة الإلكترونية بين الشركات (B2B)',
  titleEn: 'B2B E-Commerce',
  subtitle: 'التحول الرقمي للمشتريات الكبرى، حلول الـ EDI، وصعود المنصات التفاعلية للمحترفين',
  icon: Briefcase,
  accent: 'blue',
  pdfLabel: 'تقرير التجارة الإلكترونية B2B (PDF)',

  kpis: [
    { label: 'حصة آسيا والمحيط الهادئ (APAC)', value: '79%', unit: 'من إجمالي حجم التداول العالمي', icon: Globe },
    { label: 'مبيعات الـ B2B عبر المنصات (أمريكا)', value: '224B', unit: 'مليار دولار أمريكي', icon: ShoppingCart },
    { label: 'حجم سوق B2B في الصين', value: '18.4T', unit: 'تريليون يوان صيني', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'العملاق العالمي للـ B2B', 
      country: 'الصين', 
      note: 'تسيطر على الحصة الأكبر عالمياً بفضل منصات Alibaba وJD.com، مع حجم تداول يتجاوز 18 تريليون يوان صيني.',
      icon: Globe
    },
    { 
      label: 'رائد المنصات المفتوحة', 
      country: 'الولايات المتحدة', 
      note: 'تشهد نمواً انفجارياً في مبيعات B2B عبر المنصات (Marketplaces) بقيادة Amazon Business التي تدر مليارات الدولارات سنوياً.',
      icon: ShoppingCart
    },
    { 
      label: 'مركز حلول المؤسسات الأوروبي', 
      country: 'ألمانيا', 
      note: 'تقود التحول الرقمي الصناعي في أوروبا عبر أنظمة SAP والتبادل الإلكتروني للبيانات (EDI) للشركات الكبرى.',
      icon: Briefcase
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'قطاعات السوق', 'اتجاهات الصناعة', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تشتري الشركات المنتجات والخدمات عبر الإنترنت أكثر من أي وقت مضى. في التجارة الإلكترونية بين الشركات (B2B)، لا تزال برمجيات <strong>التبادل الإلكتروني للبيانات (EDI)</strong> تهيمن على القطاعات الكبرى والبيع بالجملة. ومع ذلك، بدأت المنصات الإلكترونية (Marketplaces) في اكتساب أرضية قوية بفضل مرونتها في تقديم إمدادات مخصصة.
          </p>
          <p>
            من حيث إجمالي حجم التداول (GMV)، تحتل منطقة آسيا والمحيط الهادئ المرتبة الأولى عالمياً، تليها أمريكا الشمالية، في سباق نحو رقمنة كاملة لسلاسل التوريد العالمية.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Asia Dominance',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                تشكل آسيا ما يقرب من <strong>80%</strong> من سوق التجارة الإلكترونية B2B العالمي. تبلغ قيمة السوق الصينية وحدها <strong>18.4 تريليون يوان</strong>، وهي في زيادة مستمرة على مدار العقد الماضي.
              </p>
              <p>
                يشمل هذا النمو المستدام المنصات المخصصة للمؤسسات الصغيرة والمتوسطة، والتي تشهد إيراداتها ارتفاعاً ملموساً نتيجة سهولة التكامل الرقمي مع الموردين العالميين.
              </p>
            </div>
            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Globe size={48} className="text-blue-600 mb-4" />
               <p className="text-2xl font-black text-blue-900">80%</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">حصة آسيا من السوق العالمي</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق الرئيسية',
      subtitle: 'Wholesale & Manufacturing',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد تجارة الجملة والتصنيع هما المحركان الأساسيان لهذا السوق. في الولايات المتحدة، ارتفعت قيمة تجارة الجملة عبر الإنترنت إلى أكثر من <strong>3.7 تريليون دولار</strong>.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-blue-400">قطاع التصنيع</p>
              <p className="text-sm text-slate-300 mt-2">تشكل القنوات الرقمية ما يقرب من 70% من جميع الشحنات في هذا القطاع عالمياً.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-blue-400">تجارة الجملة</p>
              <p className="text-sm text-slate-300 mt-2">تدر أكثر من 3.7 تريليون دولار سنوياً في أمريكا وحدها مع تحول كامل نحو الرقمية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'The Humanization of B2B',
      content: (
        <div className="space-y-6">
          <p>
            تتجه منصات B2B لتصبح أكثر سهولة في الاستخدام، مقتبسة استراتيجيات من عالم الـ B2C. يشمل ذلك تحسين تجربة العملاء، التخصيص، والدمج مع البيئات الرقمية الأخرى.
          </p>
          <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <Cpu className="text-blue-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-blue-900">تبني الذكاء الاصطناعي (AI)</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                يتم استخدام الذكاء الاصطناعي على نطاق واسع لتحسين عمليات البحث، التنبؤ بالطلب، وتخصيص الأسعار لخدمة الشركات بشكل أكثر فعالية ودقة.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Amazon Business', country: 'الولايات المتحدة', note: 'حجم تداول (GMV) يصل لـ 53.2 مليار دولار' },
    { name: 'Alibaba', country: 'الصين', note: 'الرائد العالمي في ربط المصنعين بالمستوردين' },
    { name: 'Salesforce', country: 'الولايات المتحدة', note: 'المزود الأول لحلول الـ SaaS لإدارة علاقات الشركات' },
    { name: 'Adobe (Magento)', country: 'الولايات المتحدة', note: 'منصة تقنية رائدة لبناء المتاجر الاحترافية' },
    { name: 'SAP', country: 'ألمانيا', note: 'عملاق إدارة الموارد والمشتريات الرقمية للشركات الكبرى' },
  ],

  definition: `تصف التجارة الإلكترونية بين الشركات (B2B) التبادل التجاري الرقمي الذي يتم بين المؤسسات (المصنعين، تجار الجملة، وتجار التجزئة) بدلاً من البيع للجمهور العام. تركز الصناعة على كفاءة سلاسل التوريد وتقليل التكاليف التشغيلية من خلال الأتمتة والارتباط المباشر بين المشترين والموردين.`,

  industryInsights: [
    'آسيا تسيطر على 80% من سوق B2B العالمي، مع دور محوري للصين',
    'الذكاء الاصطناعي يغير قواعد اللعبة في تخصيص تجربة الشراء للشركات',
    'Amazon Business و Alibaba هما القوتان المسيطرتان على المنصات المفتوحة',
    '70% من شحنات قطاع التصنيع تتم الآن عبر قنوات رقمية بالكامل',
  ],

  tags: ['B2B', 'E-commerce', 'Wholesale', 'Manufacturing', 'Supply Chain', 'AI', 'SaaS'],
};

const B2BEcommerceDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default B2BEcommerceDashboard;
