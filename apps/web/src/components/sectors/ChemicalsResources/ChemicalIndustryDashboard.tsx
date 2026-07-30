import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { FlaskConical, Globe, Award, Database } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'صناعة الكيماويات',
  titleEn: 'Chemical Industry',
  subtitle: 'التحول الرقمي، الاستدامة البيئية، وقيادة السوق الآسيوية',
  icon: FlaskConical,
  accent: 'indigo',
  pdfLabel: 'تقرير الكيماويات (PDF)',

  kpis: [
    { label: 'الإيرادات العالمية 2022', value: '$5.72T', unit: 'دولار أمريكي', icon: Database },
    { label: 'أكبر منطقة إيرادات', value: 'آسيا', unit: 'المركز الأول عالمياً', icon: Globe },
    { label: 'الشركة الرائدة', value: 'BASF', unit: 'بإيرادات 68B$', icon: Award },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق كيميائي عالمي', 
      country: 'الصين', 
      note: 'تتصدر العالم في الإنتاج والاستهلاك وتمثل عصب الصناعة الكيماوية الحديثة.',
      icon: Globe
    },
    { 
      label: 'محرك الابتكار والإنتاج', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك واحداً من أضخم مراكز التصنيع والبحث العلمي في المواد المتقدمة.',
      icon: Database
    },
    { 
      label: 'رائد الجودة والتصدير', 
      country: 'ألمانيا', 
      note: 'القوة الكيميائية الأولى في أوروبا وتشتهر بالكيماويات المتخصصة عالية القيمة.',
      icon: FlaskConical
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'قطاعات السوق', 'اتجاهات الصناعة', 'قادة الصناعة', 'تعريف الصناعة'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6">
          <p>
            تعتبر صناعة الكيماويات واحدة من أكبر القطاعات على مستوى العالم، مدفوعةً بالاستخدام الواسع للمواد الكيميائية في المنتجات اليومية والمجموعة الهائلة من المنتجات الكيميائية المتاحة.
          </p>
          <p>
            بينما نما القطاع تقليدياً جنباً إلى جنب مع التصنيع العالمي، فإنه يدخل الآن مرحلة تحوّل جوهري. وفي حين تبقى آسيا المنطقة الأولى من حيث الإيرادات، تتهيأ الصين لتصبح المركز العالمي لهذه الصناعة في السنوات المقبلة.
          </p>
          <p>
            غير أن نمو مبيعات الكيماويات قد يواجه تحديات متزايدة جراء اللوائح البيئية الجديدة. في المقابل، تمتلك التقنيات الرقمية الناشئة إمكانات هائلة لتعزيز الإنتاجية وإعادة تشكيل نماذج الأعمال القائمة في هذه الصناعة.
          </p>
        </div>
      ),
    },
    {
      id: 'insights',
      title: 'رؤى الصناعة',
      subtitle: 'Industry Insights',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p>تشمل رؤى هذا القطاع أسواقاً عديدة أبرزها:</p>
            <ul className="space-y-3">
              {[
                'الصناعة الكيميائية الزراعية عالمياً',
                'صناعة الكيماويات في الولايات المتحدة',
                'صناعة الكيماويات في المملكة المتحدة والهند',
                'كبرى شركات BASF وDow الكيميائية',
                'عمليات الاندماج والاستحواذ في قطاع الكيماويات',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
            <p className="font-semibold leading-relaxed">
              تُسهم صناعة الكيماويات بشكل محوري في دعم سلاسل الإمداد الصناعية والزراعية والصيدلانية العالمية، وتُعدّ من أكثر القطاعات ارتباطاً بمسيرة الابتكار التكنولوجي.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق',
      subtitle: 'Market Size',
      content: (
        <div className="space-y-6">
          <p>
            شهد إجمالي إيرادات الصناعة الكيميائية في جميع أنحاء العالم زيادةً مستمرة على مر السنين. وعلى الرغم من أن جائحة كوفيد-19 أحدثت تأثيراً بالغاً تمثّل في تراجع الإيرادات بنسبة 35% خلال عام 2020، فقد أظهرت الصناعة انتعاشاً ملحوظاً في أعقاب ذلك.
          </p>
          <p>
            بلغت إيرادات هذه الصناعة على المستوى العالمي نحو <strong>5.7 تريليون دولار أمريكي</strong> في عام 2022، وهي تُشكّل ركيزة أساسية في الاقتصاد العالمي ومن المتوقع أن تواصل تطورها مع بروز موجات الابتكار.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {[
              { val: '5.7T$', desc: 'إيرادات 2022' },
              { val: '−35%', desc: 'تراجع عام الجائحة' },
              { val: 'آسيا', desc: 'أكبر منطقة إيرادات' },
            ].map((stat) => (
              <div key={stat.desc} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
                <p className="text-3xl font-black text-indigo-700">{stat.val}</p>
                <p className="text-sm font-semibold text-slate-500 mt-2">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق',
      subtitle: 'Market Segments',
      dark: true,
      content: (
        <div className="space-y-6">
          <p>
            تشتمل صناعة الكيماويات على قطاعات سوقية متعددة تتميز بتنوع منتجاتها وعملائها ومتطلبات السوق. وقد شكّلت المستحضرات الصيدلانية وقطاع الكيماويات الدقيقة والمتخصصة أكبر شريحتين من حيث القيمة البيعية العالمية.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {[
              { name: 'الكيماويات الصيدلانية', en: 'Pharmaceuticals' },
              { name: 'الكيماويات الدقيقة والمتخصصة', en: 'Fine & Specialty' },
              { name: 'البتروكيماويات', en: 'Petrochemicals' },
              { name: 'البوليمرات', en: 'Polymers' },
              { name: 'المواد غير العضوية', en: 'Bulk Inorganics' },
              { name: 'المنظفات والعناية الشخصية', en: 'Detergents & Care' },
            ].map((seg) => (
              <div key={seg.en} className="bg-white/10 border border-white/10 rounded-2xl p-5 hover:bg-white/15 transition-all">
                <p className="font-black text-white text-base">{seg.name}</p>
                <p className="text-slate-400 text-xs font-semibold mt-1">{seg.en}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'Industry Trends',
      content: (
        <div className="space-y-6">
          <p>
            تُعدّ صناعة الكيماويات سوقاً عالمياً بامتياز تضطلع بدور محوري في الاقتصاد العالمي. وتتصدر أوروبا حالياً قائمة أكبر مصدّري المواد الكيميائية عالمياً بصادرات بلغت <strong>758.9 مليار يورو</strong> في عام 2022، تليها مباشرةً منطقة آسيا والمحيط الهادئ بصادرات بلغت 673.3 مليار يورو.
          </p>
          <p>
            يُتوقع أن تكون آسيا، ولا سيما الصين، المحرّك الرئيسي لنمو استهلاك الكيماويات في السنوات القادمة، في ظل التصنيع المتسارع الذي يرفع الطلب على المنتجات الكيميائية بشكل ملحوظ. كما تمثّل التقنيات الرقمية فرصة كبرى لإعادة رسم ملامح النماذج التشغيلية للشركات.
          </p>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'BASF SE', country: 'ألمانيا', note: 'الأكبر إيراداً عالمياً · 68B$' },
    { name: 'Linde PLC', country: 'أيرلندا', note: 'قيادة في الغازات الصناعية' },
    { name: 'Hengli Petrochemical', country: 'الصين', note: 'صعود آسيوي قوي' },
    { name: 'Air Liquide', country: 'فرنسا', note: 'رائد في الغازات الطبية' },
    { name: 'LyondellBasell', country: 'الولايات المتحدة', note: 'بلاستيك وبتروكيماويات' },
    { name: 'Mitsubishi Chemical', country: 'اليابان', note: 'تنوع كيميائي ياباني' },
  ],

  definition: `يُغطّي قطاع صناعة الكيماويات بياناتٍ تحليلية حول شتى القطاعات الكيميائية، من بينها الكيمياء غير العضوية والعضوية، والبتروكيماويات، والكيماويات الزراعية، والدهانات والطلاءات، وعلوم المواد والمواد المركّبة. ويشمل تحليل هذه الصناعة أرقامَ الإنتاج والاستهلاك والتجارة لمجموعة واسعة من المنتجات الكيميائية، إلى جانب المؤشرات المالية الرئيسية وبيانات أبرز الشركات الرائدة.`,

  industryInsights: [
    'التوجه المتزايد نحو السوق الصيني كمركز رئيسي للطلب المستقبلي',
    'التقنيات الرقمية تفتح آفاقاً جديدة للإنتاجية وكفاءة التشغيل',
    'انتعاش قوي ما بعد كوفيد رغم التحديات اللوجستية المعقدة',
    'الالتزام باللوائح الخضراء أصبح شرطاً أساسياً للنمو المستدام',
  ],

  tags: ['Inorganic', 'Organic', 'Petrochemicals', 'Polymers', 'Agrochemicals', 'Specialty'],
  sectorId: 'chemical-industry-dashboard',
};

const ChemicalIndustryDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ChemicalIndustryDashboard;
