import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Hash, Globe, TrendingUp, Smartphone, Share2 } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'أرقام ومؤشرات التجارة الإلكترونية',
  titleEn: 'E-Commerce Key Figures',
  subtitle: 'إحصاءات حيوية حول نمو المبيعات العالمية، التجارة الاجتماعية، وهيمنة الهواتف الذكية',
  icon: Hash,
  accent: 'blue',
  pdfLabel: 'ملخص المؤشرات (PDF)',

  kpis: [
    { label: 'إيرادات السوق العالمي', value: '4.1T', unit: 'تريليون دولار أمريكي', icon: Globe },
    { label: 'معدل اختراق السوق (أمريكا)', value: '85%', unit: 'من إجمالي السكان', icon: TrendingUp },
    { label: 'الرائد في إجمالي حجم البضائع', value: 'Alibaba', unit: 'بفارق ضخم عالمياً', icon: Hash },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق تجارة إلكترونية', 
      country: 'الصين', 
      note: 'تتصدر العالم في حجم المعاملات عبر الإنترنت بفضل منصات Alibaba وJD.com.',
      icon: Globe
    },
    { 
      label: 'رائد القيمة والابتكار', 
      country: 'الولايات المتحدة', 
      note: 'موطن شركة Amazon وأكبر مركز للابتكار في تقنيات الدفع واللوجستيات الرقمية.',
      icon: TrendingUp
    },
    { 
      label: 'أعلى معدل نضوج في أوروبا', 
      country: 'المملكة المتحدة', 
      note: 'تتميز بأعلى نسبة مبيعات إلكترونية مقارنة بالتجزئة التقليدية في القارة الأوروبية.',
      icon: Smartphone
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'قنوات البيع', 'التجارة الاجتماعية', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تسلقت مبيعات التجارة الإلكترونية القمة بشكل مطرد لسنوات، ومن المتوقع حدوث مزيد من النمو في العقود القادمة. الآن، تولد العديد من الصناعات أكثر من <strong>ثلثي مبيعاتها</strong> عبر الأونلاين.
          </p>
          <p>
            نما إجمالي عدد المتسوقين الرقميين في جميع أنحاء العالم بأكثر من مليار شخص بين عامي 2019 و2023، وهو في طريقه لمزيد من التوسع، مما يجعل التجارة الإلكترونية العمود الفقري للاقتصاد العالمي الحديث.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق والنمو الإقليمي',
      subtitle: 'Global CAGR Projections',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                تزدهر مبيعات تجارة التجزئة الإلكترونية العالمية، وبينما يتباطأ معدل النمو السنوي قليلاً في الأسواق المتقدمة، فمن المتوقع أن تتمتع الاقتصاديات الناشئة مثل <strong>الهند، إندونيسيا، وتركيا</strong> بمعدلات نمو سنوية مركبة (CAGR) أعلى بكثير.
              </p>
              <p>
                لم تتوقف حصة التجارة الإلكترونية من إجمالي مبيعات التجزئة عن النمو أبداً، كدليل على أن العادات التي اكتسبها المستهلكون خلال وبعد الجائحة أصبحت دائمة ومستقرة.
              </p>
            </div>
            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <TrendingUp size={48} className="text-blue-600 mb-4" />
               <p className="text-2xl font-black text-blue-900">Top Growth</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">الهند وإندونيسيا تقودان النمو</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'm-commerce',
      title: 'الهاتف المحمول: القناة الرائدة',
      subtitle: 'Mobile is the Leading Channel',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            لفترة طويلة، كانت التجارة الإلكترونية تتم حصرياً على أجهزة اللابتوب؛ لكن ظهور الهواتف الذكية غير كل شيء. تمثل تجارة المحمول (M-commerce) الآن <strong>أكثر من نصف</strong> مبيعات التجارة الإلكترونية العالمية.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-blue-400">+50%</p>
              <p className="text-sm font-semibold text-slate-300 mt-2">حصة مبيعات المحمول عالمياً</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
               <Smartphone className="text-blue-400 mx-auto mb-2" size={32} />
               <p className="text-sm font-semibold text-slate-400 mt-2">توجه متزايد نحو الشراء عبر التطبيقات مباشرة</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'social-commerce',
      title: 'التجارة الاجتماعية',
      subtitle: 'Social Media as the New Marketplace',
      content: (
        <div className="space-y-6">
          <p>
            أصبحت شبكات التواصل الاجتماعي قوة مهيمنة في التجارة الإلكترونية. تربط منصات مثل فيسبوك، إنستغرام، وتيك توك البائعين بجمهورهم المستهدف بذكاء فائق.
          </p>
          <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <Share2 className="text-blue-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-blue-900">المنافسة المباشرة</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                مع ظهور منصات التسوق داخل التطبيقات (In-app shopping)، أصبحت شبكات التواصل الاجتماعي منافساً مباشراً لتجار التجزئة الإلكترونيين التقليديين، مغيرين رحلة العميل من "الاكتشاف" إلى "الشراء" في ثوانٍ.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Amazon', country: 'الولايات المتحدة', note: 'المتصدر في صافي المبيعات والقيمة السوقية' },
    { name: 'Alibaba Group', country: 'الصين', note: 'الرائد في إجمالي حجم البضائع (GMV)' },
    { name: 'eBay', country: 'الولايات المتحدة', note: 'من أكثر المنصات جذباً للزوار عالمياً' },
    { name: 'Walmart', country: 'الولايات المتحدة', note: 'نمو متسارع في حصة التجارة الإلكترونية' },
  ],

  definition: `تغطي أرقام ومؤشرات قطاع التجارة الإلكترونية المؤشرات الجوهرية للتسوق عبر الإنترنت؛ بما في ذلك قيم السوق، وأحجام أسواق التجزئة العالمية، وإحصاءات الأسواق الرائدة وتجار التجزئة، بالإضافة إلى بيانات عامة حول سلوك المستهلكين المجهولين.`,

  industryInsights: [
    'التجارة الإلكترونية تولد الآن ثلثي إجمالي المبيعات في تخصصات صناعية عديدة',
    'تجارة المحمول (M-Commerce) تجاوزت رسمياً أجهزة الكمبيوتر كقناة الشراء الأولى',
    'الاقتصاديات الناشئة (إندونيسيا والهند) تسجل أعلى معدلات نمو سنوي مركب حتى 2030',
    'منصات التواصل الاجتماعي تتحول لمتاجر مباشرة تهدد عمالقة التجزئة التقليديين',
  ],

  tags: ['Market Figures', 'E-commerce', 'M-commerce', 'Social Commerce', 'Growth Rates', 'Amazon'],
};

const ECommerceKeyFiguresDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ECommerceKeyFiguresDashboard;
