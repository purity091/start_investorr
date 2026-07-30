import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { ShoppingCart, Globe, TrendingUp, Smartphone, Award } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التجارة الإلكترونية للمستهلكين (B2C)',
  titleEn: 'B2C E-Commerce',
  subtitle: 'ثورة التجزئة الرقمية، هيمنة تطبيقات المحمول، والمستقبل الواعد للتسوق المخصص',
  icon: ShoppingCart,
  accent: 'sky',
  pdfLabel: 'تقرير التجارة الإلكترونية B2C (PDF)',

  kpis: [
    { label: 'مبيعات التجزئة عالمياً', value: '4.12T', unit: 'تريليون دولار أمريكي', icon: Globe },
    { label: 'صافي مبيعات أمازون', value: '574.8B', unit: 'مليار دولار سنوياً', icon: Award },
    { label: 'معدل النمو السنوي المركب', value: '9.83%', unit: 'نمو مستدام حتى 2030', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق استهلاكي رقمي', 
      country: 'الصين', 
      note: 'تتصدر العالم بإنفاق يتجاوز 1.6 تريليون دولار، وتتميز بنظام بيئي متطور يدمج بين الدفع الرقمي والتجارة الاجتماعية.',
      icon: Globe
    },
    { 
      label: 'موطن عمالقة التجزئة', 
      country: 'الولايات المتحدة', 
      note: 'مقر لشركة Amazon، أكبر شركة B2C في العالم، وتعد المحرك الأول للابتكار في تجربة المستخدم واللوجستيات.',
      icon: ShoppingCart
    },
    { 
      label: 'رائد النفاذ الرقمي الأوروبي', 
      country: 'المملكة المتحدة', 
      note: 'تمتلك أعلى معدل نفاذ للتجارة الإلكترونية في أوروبا، حيث يفضل المستهلكون الشراء عبر الإنترنت بشكل استثنائي.',
      icon: Smartphone
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'القطاعات', 'التطبيقات والمحمول', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تمثل الـ <strong>B2C</strong> الجزء المواجه للمستهلك في التجارة الإلكترونية، فتشمل المعاملات عبر الإنترنت للسلع والخدمات بين الشركات والمستهلكين الأفراد. لا تقتصر فقط على التجزئة عبر الأونلاين، بل تمتد لتشمل الأسواق الإلكترونية والمحتوى المدفوع.
          </p>
          <p>
            مع استمرار تطور التجارة الإلكترونية في جميع أنحاء العالم، يتوسع السوق بشكل متزايد نحو فئات أكثر تخصصاً (Niche)، لتلبية احتياجات المستهلكين الدقيقة، مما يعيد تشكيل نماذج أعمال التجزئة التقليدية.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي والنمو',
      subtitle: 'Only Up From Here',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                لا شك أن التجارة الإلكترونية ستستمر في تشكيل صناعات المستهلكين والتجزئة. من المتوقع أن تشهد السنوات الخمس القادمة نمواً هائلاً، حيث يتوقع لنمو الإيرادات العالمية أن يتجاوز <strong>50%</strong> بين عامي 2024 و2029.
              </p>
              <p>
                حققت المبيعات العالمية بالفعل أرقاماً فلكية تتجاوز <strong>4.12 تريليون دولار</strong>، مما يعكس تحولاً جذرياً في سلوك الشراء الرقمي للمجتمعات الحديثة.
              </p>
            </div>
            <div className="p-8 bg-sky-50 rounded-2xl border border-sky-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <TrendingUp size={48} className="text-sky-600 mb-4" />
               <p className="text-2xl font-black text-sky-900">+50%</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">نمو متوقع بحلول 2029</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق: الأزياء في الصدارة',
      subtitle: 'Fashion and Beyond',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تدمج التجارة الإلكترونية بشكل ممتاز مع قطاعات التجزئة المختلفة، ولكن أداء القنوات عبر الإنترنت استثنائي بشكل خاص في <strong>قطاع الأزياء</strong>.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-3xl font-black text-sky-400">$770B</p>
              <p className="text-sm font-semibold text-slate-300 mt-2">إيرادات سوق أزياء الأونلاين (2024)</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
               <p className="text-xl font-bold text-white mb-2">قطاعات النمو السريع</p>
               <ul className="text-xs text-slate-400 space-y-1">
                 <li>• الإلكترونيات الاستهلاكية</li>
                 <li>• العناية الشخصية والجمال</li>
                 <li>• الأثاث والسلع المنزلية</li>
               </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'تجارة المحمول (M-Commerce)',
      subtitle: 'Not Just Online, but Mobile',
      content: (
        <div className="space-y-6">
          <p>
            يقوم تجار التجزئة بتنويع قنوات التسوق؛ فبالإضافة إلى المواقع المحسنة للجوال، تستثمر العلامات التجارية الكبرى في <strong>تطبيقات التسوق</strong> لخلق رحلات شراء أكثر سلاسة وراحة.
          </p>
          <div className="flex items-start gap-4 p-6 bg-sky-50 rounded-2xl border border-sky-100">
            <Smartphone className="text-sky-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-sky-900">هوس التطبيقات الصينية</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                تطبيق <strong>Temu</strong> الصيني كان الأكثر تحميلاً في العالم خلال عام 2023، مما يوضح رغبة المستهلكين في حلول تسوق سريعة، رخيصة، ومتاحة دائماً في متناول اليد.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Amazon', country: 'الولايات المتحدة', note: 'قيمة سوقية تصل لـ 1.3 تريليون دولار' },
    { name: 'Alibaba Group', country: 'الصين', note: 'الشركة المهيمنة في آسيا والمنافس العالمي الأول' },
    { name: 'Pinduoduo (Temu)', country: 'الصين', note: 'نمو انفجاري وتوسع دولي فائق السرعة' },
    { name: 'Shopify', country: 'كندا', note: 'الممكن الرقمي الأكبر لمتاجر التجزئة المستقلة' },
    { name: 'MercadoLibre', country: 'الأرجنتين', note: 'الرائد المطلق في سوق أمريكا اللاتينية' },
  ],

  definition: `تشير التجارة الإلكترونية B2C إلى المعاملات الرقمية للسلع والخدمات التي تتم بين الشركات والمستهلكين الأفراد. تشمل متاجر التجزئة، الأسواق الإلكترونية، والمحتوى الرقمي المدفوع. تتربع آسيا على قمة هذا السوق عالمياً بإيرادات تتخطى 1.6 تريليون دولار، تليها أمريكا الشمالية ثم أوروبا.`,

  industryInsights: [
    'آسيا هي المحرك الأول للتجارة الإلكترونية B2C بفضل كثافتها السكانية واقتصادياتها الرقمية المتطورة',
    'التحول نحو تطبيقات المحمول (Shopping Apps) أصبح ضرورة استراتيجية وليس خياراً تكميلياً',
    'قطاع الأزياء يمثل القوة الضاربة في مبيعات التجزئة الأونلاين بـ 770 مليار دولار سنوياً',
    'أمازون وعلي بابا يواصلان الصراع على قيادة المشهد العالمي عبر التوسع الجغرافي واللوجستي',
  ],

  tags: ['Retail', 'B2C', 'E-commerce', 'Mobile Shopping', 'Fashion', 'Amazon', 'Temu'],
};

const B2CEcommerceDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default B2CEcommerceDashboard;
