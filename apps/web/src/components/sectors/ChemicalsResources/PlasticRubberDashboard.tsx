import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Layers, Globe, Recycle, TrendingUp, Box } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'البلاستيك والمطاط',
  titleEn: 'Plastic & Rubber',
  subtitle: 'معالجة البوليمرات، الابتكار في المواد، وتحديات الاقتصاد الدائري',
  icon: Layers,
  accent: 'cyan',
  pdfLabel: 'تقرير البلاستيك والمطاط (PDF)',

  kpis: [
    { label: 'أكبر منتج للمواد البلاستيكية', value: 'الصين', unit: '34.5% من الإنتاج العالمي', icon: Globe },
    { label: 'حجم الإنتاج العالمي للبلاستيك', value: '414M', unit: 'مليون طن متري', icon: Layers },
    { label: 'رائد تصدير المطاط الطبيعي', value: 'تايلاند', unit: 'المركز الأول عالمياً', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'مصنع البوليمر العالمي', 
      country: 'الصين', 
      note: 'تنتج أكثر من ثلث البلاستيك العالمي وتعد عصب سلاسل توريد البوليمرات الاستهلاكية.',
      icon: Globe
    },
    { 
      label: 'عاصمة المطاط الطبيعي', 
      country: 'تايلاند', 
      note: 'المصدّر الأول في العالم للمطاط الطبيعي الخام وتلعب دوراً حاسماً في صناعة الإطارات العالمية.',
      icon: TrendingUp
    },
    { 
      label: 'رائد تكنولوجيا البوليمر', 
      country: 'ألمانيا', 
      note: 'تقود الابتكار في البلاستيك الهندسي المتطور وتقنيات إعادة التدوير من أجل الاقتصاد الدائري.',
      icon: Recycle
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
            تضم صناعات البلاستيك والمطاط المؤسسات التي تصنع السلع عن طريق معالجة المواد الخام البلاستيكية والمطاطية. حققت هذه الصناعة نجاحاً عالمياً يعود بشكل أساسي إلى معدل النمو الهائل في استهلاك البوليمرات، من المواد الخام إلى المنتجات النهائية.
          </p>
          <p>
            تُستخدم المواد البوليمرية الآن على نطاق واسع في صناعات مثل السيارات، والتعبئة والتغليف، والبناء، والرعاية الصحية. ورغم الدور الأساسي الذي يلعبه البلاستيك والمطاط في المجتمع الحديث، فمن الضروري تطوير نهج أكثر دائرية لاستخدامهما في المستقبل بسبب المخاوف المتزايدة بشأن نفايات البلاستيك.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Market Size & Regional Distribution',
      content: (
        <div className="space-y-6">
          <p>
            تهيمن الصين على صناعة البلاستيك العالمية، حيث أنتجت 33% من المواد البلاستيكية في العالم في عام 2023. تليها دول آسيوية أخرى بنسبة 20%، مما يجعل آسيا المركز الرئيسي للإنتاج.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[
              { val: '34.5%', desc: 'الصين' },
              { val: '20.1%', desc: 'بقية آسيا' },
              { val: '16.3%', desc: 'أمريكا الشمالية' },
              { val: '12%', desc: 'أوروبا' },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
                <p className="text-2xl font-black text-cyan-600">{stat.val}</p>
                <p className="text-sm font-semibold text-slate-500 mt-2">{stat.desc}</p>
              </div>
            ))}
          </div>
          <p className="pt-4">
            من المتوقع أن يستمر الطلب على البلاستيك في الارتفاع بشكل كبير في العقود القادمة، ليصل إلى أكثر من <strong>1.2 مليار طن متري بحلول عام 2060</strong>.
          </p>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق',
      subtitle: 'Rigid Plastic Packaging',
      dark: true,
      content: (
        <div className="space-y-6">
          <p>
            لقد كان للبلاستيك تأثير كبير على الاقتصاد العالمي، حيث مكّن من تصنيع مجموعة متنوعة من السلع وتحويل طريقة تعبئتها وبيعها.
          </p>
          <p>
            شهد سوق التغليف البوليمري الصلب (Rigid Plastic Packaging) نمواً كبيراً مؤخراً، حيث وصلت قيمته إلى <strong>330.53 مليار دولار أمريكي</strong> في عام 2024. ورغم فوائده، إلا أن استخدامه الواسع أدى إلى آثار سلبية تشمل التلوث البيئي والمخاطر الصحية.
          </p>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'Bioplastics & Sustainability',
      content: (
        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <p>
                يتزايد الإنتاج العالمي للبلاستيك الحيوي (Bioplastics) باستمرار، مع تزايد حظر البلاستيك لمرة واحدة في جميع أنحاء العالم، مما يعزز الاستثمارات في المواد القابلة للتحلل الحيوي.
              </p>
              <p className="mt-4">
                يستثمر المصنعون أيضاً في تقنيات الأتمتة لتقليل تكاليف الإنتاج وتحسين الجودة. هناك طلب متزايد، خاصة في صناعات البناء والسيارات، لاستبدال المكونات المعدنية ببوليمرات أكثر متانة وقوة.
              </p>
            </div>
            <div className="hidden md:block p-8 bg-cyan-50 rounded-2xl border border-cyan-100 shrink-0">
               <Recycle size={48} className="text-cyan-600 mb-4" />
               <p className="text-xs font-black text-cyan-900 uppercase">الهدف القادم</p>
               <p className="text-xl font-black text-cyan-700">الاقتصاد الدائري</p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'BASF SE', country: 'ألمانيا', note: 'رائد عالمي في الكيماويات والبوليمرات' },
    { name: 'Dow Chemical', country: 'الولايات المتحدة', note: 'مورد رئيسي لراتنجات البولي إيثيلين' },
    { name: 'LyondellBasell', country: 'هولندا', note: 'متخصص في البتروكيماويات والبوليمرات' },
    { name: 'ExxonMobil', country: 'الولايات المتحدة', note: 'قدرات إنتاج بوليمر هائلة' },
    { name: 'LG Chem', country: 'كوريا الجنوبية', note: 'نمو سريع في السوق الآسيوي' },
    { name: 'Mitsubishi Chemical', country: 'اليابان', note: 'تنوع في حلول بوليمرات الهندسة' },
  ],

  definition: `تقدم فئة البلاستيك والمطاط إحصاءات وتقارير عن صناعة البوليمرات، بما في ذلك أنواع البلاستيك المختلفة والمطاط الطبيعي والاصطناعي. نوفر بيانات عن التصنيع، والاستهلاك، والمبيعات، وتجارة المكونات البوليمرية على المستويات العالمية والإقليمية والمحلية.`,

  industryInsights: [
    'الصين تسيطر على ثلث الإنتاج العالمي للمواد البلاستيكية',
    'البلاستيك الحيوي يمثل فرصة استثمارية كبرى مع تشديد القوانين البيئية',
    'التغليف الصلب يمثل الشريحة الأكبر من حيث نمو القيمة السوقية',
    'تحديات إعادة التدوير ترفع تكاليف الاسترداد وتتطلب ابتكاراً في المواد',
  ],

  tags: ['Polymer', 'Packaging', 'Bioplastics', 'Polyethylene', 'Synthetic Rubber', 'Natural Rubber'],
  sectorId: 'plastic-rubber-dashboard',
};

const PlasticRubberDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PlasticRubberDashboard;
