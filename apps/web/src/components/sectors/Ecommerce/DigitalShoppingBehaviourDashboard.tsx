import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { BrainCircuit, Globe, TrendingUp, CreditCard, Users } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'سلوك التسوق الرقمي',
  titleEn: 'Digital Shopping Behaviour',
  subtitle: 'تحليل عادات الشراء الإلكتروني، المحافظ الرقمية، وتأثير الأجيال الشابة على التجارة العالمية',
  icon: BrainCircuit,
  accent: 'purple',
  pdfLabel: 'تقرير سلوك التسوق (PDF)',

  kpis: [
    { label: 'مستخدمو تجارة الموضة (أمريكا)', value: '216M', unit: 'مليون مستخدم نشط', icon: Users },
    { label: 'وسيلة الدفع المفضلة عالمياً', value: 'Wallets', unit: 'المحافظ الرقمية', icon: CreditCard },
    { label: 'المتجر الإلكتروني المفضل (LATAM)', value: 'Mercado', unit: 'Mercado Libre', icon: Globe },
  ],

  topMarkets: [
    { 
      label: 'رائد الدفع والتجارة الاجتماعية', 
      country: 'الصين', 
      note: 'تتصدر العالم في استخدام المحافظ الرقمية (Alipay/WeChat) وتسوق البث المباشر (Livestream Shopping).',
      icon: CreditCard
    },
    { 
      label: 'مبتكر تجربة العميل الذكية', 
      country: 'الولايات المتحدة', 
      note: 'السوق القائد في تبني التوصيات المخصصة بالذكاء الاصطناعي وتكامل القنوات (Omnichannel) بين المتجر والإنترنت.',
      icon: BrainCircuit
    },
    { 
      label: 'قوة التسوق عبر المؤثرين', 
      country: 'البرازيل', 
      note: 'تمتلك أعلى معدلات استجابة للتجارة الاجتماعية والتسوق المدفوع بتوصيات المؤثرين في منطقة أمريكا اللاتينية.',
      icon: Users
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'أونلاين vs أوفلاين', 'اتجاهات الابتكار', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يتطور سلوك التسوق الرقمي للمستهلكين بوتيرة متسارعة؛ فقد أصبحت طرق الدفع عبر الإنترنت أكثر شيوعاً، وبدأ عدد أكبر من الناس في التسوق عبر هواتفهم المحمولة، وأصبح المستهلكون بشكل عام أكثر استعداداً لاستخدام التجارة الإلكترونية مما كانوا عليه في السابق.
          </p>
          <p>
            منذ بداية الجائحة في مارس 2020، ظهر عدد كبير من المتسوقين عبر الإنترنت لأول مرة حول العالم، وينوي الكثير منهم الاستمرار في عاداتهم الجديدة، مما يجعل الشراء الرقمي "طبيعة ثانية" للكثيرين.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'سوق دائم النمو',
      subtitle: 'The Ever-growing Market',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                مع كل عام، تصبح تجارة التجزئة عبر الإنترنت أكبر مما كانت عليه. ما كان يُعتبر ذات يوم حداثة (Novelty)، أصبح اليوم إضافة طبيعية للتجارة الرقمية وحياتنا اليومية.
              </p>
              <p>
                لم يزدد عدد المشترين عالمياً فحسب، بل يمكن ملاحظة النمو أيضاً في "الإنفاق الاستهلاكي"، وعدد بائعي التجزئة الإلكترونيين، وخيارات الدفع المتعددة، مما يسرع التحول نحو اقتصاد رقمي بالكامل.
              </p>
            </div>
            <div className="p-8 bg-purple-50 rounded-2xl border border-purple-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <TrendingUp size={48} className="text-purple-600 mb-4" />
               <p className="text-2xl font-black text-purple-900">High Growth</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">توقعات التسارع حتى 2030</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'أونلاين vs المتاجر التقليدية',
      subtitle: 'Online vs Offline Preference',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            على الرغم من أن التسوق عبر الإنترنت أصبح جزءاً رئيساً من تجربة المستهلك، إلا أن الشراء "أوفلاين" (في المتاجر الفعلية) لا يزال هو الطريقة الأكثر شيوعاً في العديد من الصناعات التقليدية.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-purple-400">الأجيال الشابة (Z & Millennials)</p>
              <p className="text-sm text-slate-300 mt-2">الأكثر ميلاً للتسوق الرقمي المتكرر وتجربة المنصات الجديدة.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-purple-400">التواجد الكلي (Omnichannel)</p>
              <p className="text-sm text-slate-300 mt-2">أصبح المتسوقون الرقميون موجودين في كل مكان، بغض النظر عن العمر أو الأصل الجغرافي.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'ما الذي يؤثر على سلوك التسوق؟',
      subtitle: 'Innovation and Global Impact',
      content: (
        <div className="space-y-6">
          <p>
            أثرت التطورات التكنولوجية مثل <strong>الذكاء الاصطناعي التوليدي (Gen AI)</strong> بشكل عميق على قطاع التجزئة، حيث يطالب المتسوقون بابتكارات محددة لتحسين تجربتهم.
          </p>
          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 space-y-4">
            <p className="font-bold text-purple-900">أبرز مطالب المتسوقين الرقميين:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="text-sm text-slate-700 flex items-center gap-2">• <span className="font-bold">دفع بدون احتكاك:</span> سرعة إتمام الصفقة</li>
              <li className="text-sm text-slate-700 flex items-center gap-2">• <span className="font-bold">توصيات مخصصة:</span> منتجات تناسب ذوقي</li>
              <li className="text-sm text-slate-700 flex items-center gap-2">• <span className="font-bold">تجربة Omnichannel:</span> تكامل بين التطبيق والمتجر</li>
              <li className="text-sm text-slate-700 flex items-center gap-2">• <span className="font-bold">تقنيات VR/AR:</span> معاينة المنتجات افتراضياً</li>
            </ul>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Amazon', country: 'الولايات المتحدة', note: 'الرائد العالمي بلا منازع بمبيعات 574 مليار دولار' },
    { name: 'Walmart', country: 'الولايات المتحدة', note: 'أكبر منافس يجمع بين القوة البدنية والرقمية' },
    { name: 'eBay', country: 'الولايات المتحدة', note: 'رائد ثقافة المزادات والتداول بين المستهلكين' },
    { name: 'Alibaba', country: 'الصين', note: 'المحرك الأكبر لسلوك التسوق في الشرق الأقصى' },
    { name: 'Mercado Libre', country: 'الأرجنتين', note: 'المتجر الإلكتروني المفضل في أمريكا اللاتينية' },
  ],

  definition: `يقدم قطاع سلوك التسوق الرقمي نظرة عالمية على عادات المستهلكين عبر الإنترنت، وتفضيلات طرق الدفع، والمواقف العامة تجاه الشراء الرقمي. ويحلل كيفية تكيف العلامات التجارية والشركات مع هذه التوجهات والاعتبارات لضمان ولاء العميل في بيئة تنافسية محمومة.`,

  industryInsights: [
    'المحافظ الرقمية أصبحت وسيلة الدفع الأولى عالمياً متفوقة على البطاقات التقليدية',
    'الذكاء الاصطناعي يعيد رسم "رحلة العميل" من خلال التخصيص الفائق والتنبؤ بالاحتياجات',
    'تجارة الأزياء هي المحرك الأكبر لجذب مستخدمين جدد للتجارة الإلكترونية (216 مليون في أمريكا)',
    'نموذج الـ Omnichannel (التواجد عبر كافة القنوات) هو مفتاح النجاح المستقبلي للتجزئة',
  ],

  tags: ['Consumer Behaviour', 'Digital Payments', 'E-commerce', 'Online Retail', 'Digital Wallets', 'Gen AI'],
};

const DigitalShoppingBehaviourDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default DigitalShoppingBehaviourDashboard;
