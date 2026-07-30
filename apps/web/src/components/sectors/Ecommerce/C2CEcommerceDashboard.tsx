import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Handshake, Globe, TrendingUp, RefreshCcw, Users } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التجارة الإلكترونية بين المستهلكين (C2C)',
  titleEn: 'C2C E-Commerce',
  subtitle: 'اقتصاد المشاركة، إعادة البيع (Recommerce)، ومنصات التداول المباشر بين الأفراد',
  icon: Handshake,
  accent: 'teal',
  pdfLabel: 'تقرير التجارة الإلكترونية C2C (PDF)',

  kpis: [
    { label: 'سوق إعادة البيع (أمريكا)', value: '207.4B', unit: 'مليار دولار أمريكي', icon: RefreshCcw },
    { label: 'مشترون نشطون على eBay', value: '130M', unit: 'مليون مستخدم نشط', icon: Users },
    { label: 'حصة C2C في التجزئة (الصين)', value: '18.7%', unit: 'من إجمالي المبيعات أونلاين', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'أضخم منظومة C2C عالمية', 
      country: 'الصين', 
      note: 'تمتلك أكبر سوق للتداول المباشر بين الأفراد من خلال منصة Taobao التابعة لعلي بابا، مع ملايين البائعين المستقلين.',
      icon: Globe
    },
    { 
      label: 'رائد المزادات والسلع اليدوية', 
      country: 'الولايات المتحدة', 
      note: 'موطن شركتي eBay وEtsy، وهما المنصتان اللتان أسستا وصاغتا مفاهيم التجارة الإلكترونية بين الأفراد عالمياً.',
      icon: Handshake
    },
    { 
      label: 'سوق إعادة البيع النشط', 
      country: 'المملكة المتحدة', 
      note: 'تتميز بواحد من أنشط الأسواق لإعادة بيع الأزياء (Recommerce) والسلع المستعملة بفضل وعي المستهلكين العالي بالاستدامة.',
      icon: RefreshCcw
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'قطاعات السوق', 'اتجاهات الموضة', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تُعرف المعاملات عبر الإنترنت بين مستخدمين نهائيين خاصين لبيع أو شراء السلع باسم التجارة الإلكترونية من المستهلك إلى المستهلك (<strong>C2C</strong>). تتم هذه الأنشطة عبر منصات مشهورة مثل eBay أو Etsy أو Taobao، بالإضافة إلى مواقع المزادات والمنتديات المتخصصة.
          </p>
          <p>
            أدى التحول نحو تطبيقات الهاتف المحمول في السنوات الأخيرة إلى ظهور منصات تشجع المستهلكين على البيع والشراء المباشر دون الحاجة إلى إنشاء عمل تجاري رسمي، مما جعل الـ C2C مفضلاً بشكل خاص في <strong>قطاع الموضة</strong> وشائعاً جداً بين الأجيال الشابة.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق والقوة الشرائية',
      subtitle: 'More Power to the Consumer',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                على الرغم من كونه قطاعاً أصغر مقارنة بالـ B2C، إلا أن الـ C2C يتمتع بقاعدة مستخدمين ضخمة. في أبريل 2023، استقبل موقع <strong>eBay</strong> وحده أكثر من 1.2 مليار زائر.
              </p>
              <p>
                يبرز "اقتصاد إعادة البيع" (Recommerce) كقوة اقتصادية هائلة، حيث وصلت قيمته في الولايات المتحدة إلى <strong>207.4 مليار دولار</strong>، مما يعكس توجهاً عالمياً نحو الاستدامة وتوفير التكاليف.
              </p>
            </div>
            <div className="p-8 bg-teal-50 rounded-2xl border border-teal-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Globe size={48} className="text-teal-600 mb-4" />
               <p className="text-2xl font-black text-teal-900">$207B</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">سوق الـ Recommerce (أمريكا)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق: الموضة المستعملة',
      subtitle: 'Fashion Resellers Flourish',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تسمح منصات C2C بأقصى قدر من المرونة والتحكم لأولئك الذين يحبون شراء أو بيع السلع. في السنوات الأخيرة، كانت المنصات الأكثر شعبية هي تلك المتخصصة في إعادة بيع عناصر <strong>الأزياء</strong>.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-teal-400">Vinted & Depop</p>
              <p className="text-sm text-slate-300 mt-2">منصات أحدثت ثورة في تداول الأزياء المستعملة بين الشباب.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-teal-400">الأسواق المفتوحة</p>
              <p className="text-sm text-slate-300 mt-2">تدر أكثر من 33% من إجمالي المشتريات عبر الإنترنت عالمياً بفضل نموذج الـ Marketplace.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'قادة الصناعة والمنصات',
      subtitle: 'eBay - The Indisputable Leader',
      content: (
        <div className="space-y-6">
          <p>
            يظل <strong>eBay</strong> القوة الضاربة في هذا القطاع منذ بدايات الإنترنت وحتى يومنا هذا، حيث يضم حوالي <strong>130 مليون مشترٍ نشط</strong> حول العالم.
          </p>
          <div className="flex items-start gap-4 p-6 bg-teal-50 rounded-2xl border border-teal-100">
            <Users className="text-teal-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-teal-900">تنوع المنصات</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                تتنوع المنصات الكبرى لتشمل Etsy المتخصص في السلع اليدوية، وTaobao الصيني العملاق التابع لعلي بابا، بالإضافة إلى منصات الإعلانات المبوبة مثل Craigslist.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'eBay Inc.', country: 'الولايات المتحدة', note: 'الرائد التاريخي والعالمي بـ 130 مليون مشترٍ' },
    { name: 'Etsy', country: 'الولايات المتحدة', note: 'المنصة الأولى للأعمال اليدوية والسلع الفريدة' },
    { name: 'Taobao (Alibaba)', country: 'الصين', note: 'أكبر سوق C2C في العالم من حيث حجم المعاملات' },
    { name: 'Vinted', country: 'ليتوانيا / أوروبا', note: 'المتصدر في سوق تجارة الأزياء المستعملة' },
    { name: 'Mercado Libre', country: 'الأرجنتين', note: 'المهيمن على قطاع الـ C2C في أمريكا اللاتينية' },
  ],

  definition: `تشير التجارة الإلكترونية C2C إلى المعاملات عبر الإنترنت التي تتم بين مستهلكين خاصين عبر أسواق إلكترونية أو مواقع مزادات أو إعلانات مبوبة، دون تدخل طرف ثالث كتاجر رسمي. يركز هذا القطاع على مفهوم "إعادة البيع" والاستخدام الأمثل للموارد القائمة.`,

  industryInsights: [
    'سوق الـ Recommerce (إعادة البيع) ينمو مدفوعاً بالوعي البيئي والرغبة في التوفير',
    'قطاع الموضة هو المحرك الأكثر حيوية في تطبيقات الـ C2C الحديثة',
    'eBay يواصل الحفاظ على مكانته العالمية كمرجع لأسواق المزادات والتداول المباشر',
    'المنصات الإلكترونية (Marketplaces) تستحوذ على ثلث إجمالي المشتريات الأونلاين عالمياً',
  ],

  tags: ['C2C', 'Recommerce', 'eBay', 'Fashion Resale', 'P2P', 'Sustainability', 'Marketplace'],
};

const C2CEcommerceDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default C2CEcommerceDashboard;
