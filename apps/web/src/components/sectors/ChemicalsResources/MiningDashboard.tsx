import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Pickaxe, DollarSign, Globe, Cpu } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'التعدين والمعادن',
  titleEn: 'Mining, Metals & Minerals',
  subtitle: 'استكشاف الثروات الباطنية — الركيزة الأساسية لاقتصاد الطاقة النظيفة والتحول الصناعي',
  icon: Pickaxe,
  accent: 'stone',
  pdfLabel: 'تقرير التعدين والمعادن (PDF)',

  kpis: [
    { label: 'إيرادات كبرى شركات التعدين 2024', value: '$867B', unit: 'مليار دولار أمريكي', icon: DollarSign },
    { label: 'الشركة الرائدة عالمياً', value: 'Glencore', unit: 'إيرادات 230 مليار دولار', icon: Globe },
    { label: 'أعلى معدل عائد على المعادن', value: 'الذهب', unit: 'المركز الأول 2024', icon: DollarSign },
  ],

  topMarkets: [
    { 
      label: 'أكبر منتج ومستهلك للمعادن', 
      country: 'الصين', 
      note: 'تسيطر على سلاسل توريد المعادن الأرضية النادرة ومعالجة معظم المعادن الصناعية عالمياً.',
      icon: Globe
    },
    { 
      label: 'عملاق التعدين والتصدير', 
      country: 'أستراليا', 
      note: 'تمتلك أضخم احتياطيات خام الحديد وتعد من كبار منتجي الفحم والذهب في العالم.',
      icon: Pickaxe
    },
    { 
      label: 'قوة المعادن الحيوية (النحاس)', 
      country: 'تشيلي / الولايات المتحدة', 
      note: 'تشيلي هي المنتج الأول للنحاس عالمياً، بينما تقود أمريكا الابتكار في المعادن الاستراتيجية.',
      icon: Cpu
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
            يُعدّ التعدين من أعرق الصناعات في تاريخ البشرية. يشمل هذا القطاع في جوهره استكشاف المعادن والمواد الخام المدفونة في قشرة الأرض، وانتزاعها، ومعالجتها لتصبح مدخلات أساسية تغذّي صناعات لا حصر لها.
          </p>
          <p>
            تضطلع الصناعة التعدينية بدور محوري في دعم التحول العالمي نحو الطاقة النظيفة، إذ تُشكّل المعادن الحيوية مكوناً لا غنى عنه في تقنيات الطاقة المتجددة، من ألواح الطاقة الشمسية إلى بطاريات السيارات الكهربائية وتوربينات الرياح.
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
            <p>تشمل أبرز محاور الرؤى التحليلية لهذا القطاع:</p>
            <ul className="space-y-3">
              {[
                'كبرى شركات التعدين العالمية وصناعة التعدين في الهند',
                'صناعة خام الحديد والنحاس على المستوى العالمي',
                'التعدين في إندونيسيا والمملكة المتحدة وجمهورية الكونغو',
                'المعادن الحيوية الاستراتيجية في الولايات المتحدة',
                'التعدين الذهبي عالمياً وتعدين المعادن الثمينة في أمريكا',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-stone-500 flex-shrink-0" />
                  <span className="font-semibold">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-stone-50 rounded-2xl p-8 border border-stone-100">
            <p className="font-semibold leading-relaxed text-stone-800">
              يمثّل قطاع التعدين شريان الحياة لصناعات التصنيع والبناء والطاقة، ويكتسب اليوم أهمية متصاعدة في سياق التحول الأخضر العالمي.
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
            بلغت الإيرادات المجمّعة لأكبر 40 شركة تعدين عالمياً عام 2024 نحو <strong>867 مليار دولار أمريكي</strong>، وهو ارتفاع لافت مقارنةً بعام 2010 حين كانت الإيرادات تقلّ عن نصف هذا الرقم.
          </p>
          <p>
            وقد سجّل القطاع أعلى إيراداته في تاريخه خلال عام 2021، إذ بلغت <strong>925 مليار دولار</strong>. وعلى مدار العقد الماضي، حافظت إيرادات الصناعة على مستويات ثبات نسبي، رغم تقلبات أسعار السلع الخام والتحولات الاقتصادية العالمية.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            {[
              { val: '$867B', desc: 'الإيرادات المجمّعة 2024' },
              { val: '$925B', desc: 'الذروة التاريخية 2021' },
              { val: 'Top 40', desc: 'أكبر شركات التعدين' },
            ].map((stat) => (
              <div key={stat.desc} className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
                <p className="text-3xl font-black text-stone-700">{stat.val}</p>
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
            تتصدر المواد الخام الأكثر استخراجاً في العالم من حيث الحجم: خام الحديد، والفحم، والبوكسيت، والبوتاس. وفيما يخص الإيرادات، يُعدّ خام الحديد والنحاس أكثر المجالات ربحيةً في محافظ شركات التعدين المتنوعة الكبرى.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {[
              { name: 'خام الحديد', en: 'Iron Ore' },
              { name: 'النحاس', en: 'Copper' },
              { name: 'الذهب', en: 'Gold' },
              { name: 'البوتاس', en: 'Potash' },
              { name: 'الليثيوم', en: 'Lithium' },
              { name: 'المعادن النادرة', en: 'Rare Earths' },
              { name: 'الكوبالت', en: 'Cobalt' },
              { name: 'الفضة', en: 'Silver' },
            ].map((seg) => (
              <div key={seg.en} className="bg-white/10 border border-white/10 rounded-2xl p-4 hover:bg-white/15 transition-all">
                <p className="font-black text-white">{seg.name}</p>
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
      subtitle: 'Industry Trends — Smart Mining',
      content: (
        <div className="space-y-6">
          <p>
            يشهد مستقبل الصناعة التعدينية تحولاً نوعياً نحو ما بات يُعرف بـ<strong> "التعدين الذكي" (Smart Mining)</strong>، القائم على دمج التكنولوجيا والأتمتة لتحسين مستويات السلامة، وزيادة الإنتاجية، وخفض التكاليف التشغيلية.
          </p>
          <p>
            تُتوقع قيمة سوق التعدين الذكي بلوغ <strong>34 مليار دولار</strong> حول العالم بحلول عام 2028. وتكشف أحدث التوقعات أن القطاع سيصل إلى معدل تبني 75% لتقنيات الأمن السيبراني للأصول، و20% لأجهزة الاستشعار الذكية خلال عام 2025.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {[
              { tech: 'الأمن السيبراني للأصول', adoption: '75%', color: 'text-emerald-600' },
              { tech: 'العمليات عن بُعد', adoption: '55%', color: 'text-blue-600' },
              { tech: 'العمال المتصلة بالشبكة', adoption: '45%', color: 'text-indigo-600' },
              { tech: 'أجهزة الاستشعار الذكية', adoption: '20%', color: 'text-amber-600' },
            ].map((item) => (
              <div key={item.tech} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <span className={`text-xl font-black ${item.color}`}>{item.adoption}</span>
                <span className="font-semibold text-slate-600">{item.tech}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Glencore', country: 'المملكة المتحدة', note: 'الأكبر عالمياً · $230B' },
    { name: 'Rio Tinto', country: 'أستراليا / المملكة المتحدة', note: 'تعدين متنوع عالمي' },
    { name: 'BHP', country: 'أستراليا / المملكة المتحدة', note: 'عملاق الموارد الطبيعية' },
    { name: 'Vale', country: 'البرازيل', note: 'رائد خام الحديد الأمريكي' },
    { name: 'Jiangxi Copper', country: 'الصين / هونغ كونغ', note: 'قيادة النحاس الآسيوية' },
    { name: 'Nippon Steel', country: 'اليابان', note: 'رائد صناعة الفولاذ الياباني' },
  ],

  definition: `تُقدّم فئة التعدين والمعادن والمواد الأولية معلوماتٍ شاملة حول صناعة التعدين بجميع جوانبها، وتمتد لتشمل سلع المعادن والخامات. تغطي محتويات هذه الفئة عمليات الاستكشاف والاحتياطيات والإنتاج، وصولاً إلى الاستهلاك والاستخدامات النهائية لهذه المنتجات. كما تُوفّر بيانات التجارة الدولية والأسعار والمناطق المنتجة الكبرى وأبرز شركات التعدين العاملة على الصعيد العالمي.`,

  industryInsights: [
    'خام الحديد والنحاس يتصدران قائمة المعادن الأعلى ربحية عالمياً',
    'الليثيوم والكوبالت يكتسبان أهمية استراتيجية متسارعة مع صعود المركبات الكهربائية',
    'التعدين الذكي يُحوّل العمليات نحو الأتمتة الكاملة وخفض المخاطر',
    'المعادن الحيوية تُعدّ العمود الفقري لتحقيق أهداف الطاقة النظيفة العالمية',
  ],

  tags: ['GoldMining', 'IronOre', 'Lithium', 'RareEarth', 'Exploration', 'MineralWealth'],
  sectorId: 'mining-dashboard',
};

const MiningDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default MiningDashboard;
