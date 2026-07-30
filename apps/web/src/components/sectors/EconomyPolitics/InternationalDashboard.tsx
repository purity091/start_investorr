import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Map, Globe, TrendingUp, Users, Award } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الشؤون الدولية والدول',
  titleEn: 'International',
  subtitle: 'تحليل مقارن للدول، المنظمات الدولية، والتنمية البشرية في عالم مترابط',
  icon: Map,
  accent: 'indigo',
  pdfLabel: 'تقرير التنمية الدولية (PDF)',

  kpis: [
    { label: 'أكبر دولة سكاناً (الهند)', value: '1.4B+', unit: 'مليار نسمة', icon: Users },
    { label: 'أعلى متوسط عمر (اليابان)', value: '84.8', unit: 'سنة (متوسط)', icon: Award },
    { label: 'أعلى تنمية بشرية (سويسرا)', value: '0.967', unit: 'HDI Score', icon: Globe },
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'التقارب والتباعد', 'التنمية البشرية', 'المنظمات الدولية', 'قادة النمو', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            بالإضافة إلى تحليل الصناعات، من الضروري إلقاء نظرة أوسع على الدول الفردية التي توجد فيها هذه الصناعات. فشلت العديد من الشركات في التوسع دولياً لأنها لم تكيّف نماذج أعمالها مع الاحتياجات الفريدة لكل دولة.
          </p>
          <p>
            سواء كانت الاختلافات اقتصادية، ثقافية، أو بيروقراطية، فإن فهم هذه التباينات يمكن أن يزيل العديد من حواجز دخول السوق ويهيئ الطريق لنمو عالمي مستدام.
          </p>
        </div>
      ),
    },
    {
      id: 'convergence',
      title: 'التقارب أو التباعد الاقتصادي؟',
      subtitle: 'Convergence or Divergence?',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4 text-right">
              <p>
                كل دولة فريدة من نوعها بهويتها الثقافية ومؤسساتها الاقتصادية والسياسية وهيكلها الديموغرافي وتجاربها التاريخية. ومع ذلك، في عالمنا المعولم، تظل جميع الدول مترابطة ببعضها البعض.
              </p>
              <p>
                يساعد مقارنة الدول في فهم الاتجاهات العالمية ومعدلات النمو في الناتج المحلي الإجمالي الحقيقي (GDP) عالمياً، خاصة التوقعات للفترة بين 2021 و2026، حيث نراقب تباين الأداء بين الاقتصادات المتقدمة والناشئة.
              </p>
            </div>
            <div className="p-8 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col items-center shrink-0 w-full md:w-72">
               <TrendingUp size={48} className="text-indigo-600 mb-4" />
               <div className="text-center">
                 <p className="text-2xl font-black text-indigo-900">GDP Growth</p>
                 <p className="text-xs font-bold text-slate-500 mt-1 uppercase text-center">توقعات النمو 2021-2026</p>
                 <div className="mt-4 flex gap-2 justify-center">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded">Developing: ~4.5%</span>
                    <span className="px-2 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">Developed: ~2.1%</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'development',
      title: 'مؤشرات التنمية البشرية',
      subtitle: 'Human Development Index',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            لا يقاس نجاح الدول بالناتج المحلي الإجمالي فحسب، بل بمستوى رفاهية مواطنيها. تتصدر دول مثل <strong>سويسرا والنرويج</strong> قائمة أفضل الدول للعيش عالمياً.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-indigo-400">اليابان</p>
              <p className="text-sm text-slate-300 mt-2">أعلى متوسط عمر متوقع بفضل الوعي الصحي المتقدم.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-indigo-400">الهند</p>
              <p className="text-sm text-slate-300 mt-2">الدولة الأكثر سكاناً، وهي "العملاق الديموغرافي" الجديد.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-indigo-400">سويسرا</p>
              <p className="text-sm text-slate-300 mt-2">الأولى عالمياً في مؤشر التنمية البشرية (HDI Score: 0.967).</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'organizations',
      title: 'الدور الدولي والمنظمات',
      subtitle: 'International Organizations',
      content: (
        <div className="space-y-6">
          <p className="text-right">
            تلعب المنظمات الدولية مثل <strong>البنك الدولي، صندوق النقد الدولي، والأمم المتحدة</strong> دوراً محورياً في الحفاظ على استقرار النظام المالي العالمي وتقديم بيانات موحدة وشفافة.
          </p>
          <div className="flex items-start gap-4 p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-right">
            <Globe className="text-indigo-600 shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <p className="font-bold text-indigo-900">التكتلات الاقتصادية والميول العالمية</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                تبرز تكتلات مثل <strong>الاتحاد الأوروبي</strong> ودول <strong>البريكس (BRIC)</strong> كقوى جماعية. كما نراقب "الميول العالمية" (Global Megatrends) التي تشكل مستقبل التجارة مثل التحول الرقمي والاستدامة.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'الولايات المتحدة', country: 'North America', note: 'أكبر ناتج محلي إجمالي وقوة مالية عالمية' },
    { name: 'الصين', country: 'East Asia', note: 'قائدة التصنيع العالمي وثاني أكبر اقتصاد' },
    { name: 'الاتحاد الأوروبي', country: 'Europe', note: 'أكبر تكتل تجاري موحد في العالم' },
    { name: 'الهند', country: 'South Asia', note: 'أسرع الاقتصادات الكبرى نمواً والأكثر سكاناً' },
    { name: 'اليابان', country: 'East Asia', note: 'رائدة التكنولوجيا وطول العمر والجودة المعيشية' },
    { name: 'المملكة المتحدة', country: 'Europe', note: 'مركز مالي عالمي رائد (London City)' },
    { name: 'البرازيل', country: 'South America', note: 'عملاق الموارد الطبيعية والزراعة في الجنوب' },
    { name: 'روسيا', country: 'Eurasia', note: 'لاعب أساسي في أسواق الطاقة والموارد العالمية' },
  ],

  definition: `تتعامل فئة "الشؤون الدولية" مع الإحصاءات وبيانات السوق للدول الفردية والمنظمات الدولية والتكتلات الإقليمية. تغطي البيانات الديموغرافيا، الاقتصاد، مالية الدولة، وفصولاً فريدة للدول الكبرى، مستمدة من قواعد بيانات الأمم المتحدة والبنك الدولي لضمان الاتساق والنزاهة عبر جميع المنصات.`,

  industryInsights: [
    'الهند تجاوزت الصين رسمياً كأكثر دول العالم سكاناً، مما يخلق فرصاً وتحديات اقتصادية جديدة',
    'اليابان تحافظ على المركز الأول في طول العمر، مما يبرز نضج وكفاءة نظامها الصحي والاجتماعي',
    'الترابط الدولي جعل من الصعب عزل أي اقتصاد عن الهزات العالمية دون تكاليف باهظة',
    'النمو في الاقتصادات النامية (Developing Economies) يتجاوز ضعف نمو الاقتصادات المتقدمة حالياً',
  ],

  tags: ['International', 'Demographics', 'HDI', 'World Bank', 'Global Trends', 'BRIC', 'UN', 'GDP Growth'],
};

const InternationalDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default InternationalDashboard;
