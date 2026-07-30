import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Coffee, Globe, TrendingUp, Zap, Award } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المشروبات غير الكحولية',
  titleEn: 'Non-alcoholic Beverages',
  subtitle: 'سوق المشروبات الغازية، القهوة، الشاي، والعصائر؛ والتوجه نحو المشروبات الصحية قليلة السكر',
  icon: Coffee,
  accent: 'blue',
  pdfLabel: 'تقرير قطاع المشروبات (PDF)',

  kpis: [
    { label: 'سوق المشروبات الغازية عالمياً', value: '447B', unit: 'مليار دولار أمريكي', icon: Globe },
    { label: 'سوق القهوة العالمي (إيرادات)', value: '495B', unit: 'مليار دولار سنوياً', icon: Coffee },
    { label: 'معدل نمو مشروبات الطاقة', value: '8.1%', unit: 'نمو سنوي مركب', icon: Zap },
  ],

  topMarkets: [
    { 
      label: 'موطن العمالقة والابتكار', 
      country: 'الولايات المتحدة', 
      note: 'مقر لشركتي كوكاكولا وبيبسي، وأكبر سوق لاستهلاك المشروبات الغازية ومشروبات الطاقة والقهوة المختصة.',
      icon: TrendingUp
    },
    { 
      label: 'أكبر سوق نمو ناشئ', 
      country: 'الصين', 
      note: 'تمثل أضخم سوق للشاي عالمياً، وتشهد طفرة هائلة في استهلاك المياه المعبأة والمشروبات الغازية الصحية.',
      icon: Globe
    },
    { 
      label: 'رائد إنتاج القهوة العالمي', 
      country: 'البرازيل', 
      note: 'المنتج الأول للقهوة في العالم، وتمتلك سوقاً محلياً ضخماً يستهلك كميات كبيرة من المشروبات الغازية والعصائر.',
      icon: Coffee
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'القطاعات', 'الاتجاهات الصحية', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يعد قطاع المشروبات غير الكحولية واحداً من أكثر الصناعات استهلاكاً وحيوية في العالم. وهو يغطي مجموعة ضخمة من المنتجات التي تشمل المشروبات الغازية، مياه الشرب المعبأة، القهوة، الشاي، مشروبات الطاقة، والعصائر الطبيعية.
          </p>
          <p>
            تتأثر هذه الصناعة بشكل كبير بالوعي الصحي المتزايد للمستهلكين، مما أدى لموجة من الابتكار في المشروبات "الخالية من السكر"، والمشروبات الوظيفية التي تقدم فوائد صحية إضافية، والمشروبات العضوية.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق والنمو',
      subtitle: 'Thirst for Innovation',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                يُقدر حجم سوق المشروبات الغازية العالمي وحده بأكثر من <strong>447 مليار دولار</strong>، بينما يتجاوز سوق القهوة العالمي حاجز الـ <strong>495 مليار دولار</strong>، مما يوضح القوة الشرائية الهائلة لهذا القطاع.
              </p>
              <p>
                تعد <strong>مشروبات الطاقة</strong> و <strong>المياه المنكهة</strong> من أسرع القطاعات نمواً، حيث يبحث المستهلكون عن بدائل "منعشة ومنشطة" تتناسب مع نمط الحياة السريع والوعي الرياضي والبدني.
              </p>
            </div>
            <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Zap size={48} className="text-blue-600 mb-4" />
               <p className="text-2xl font-black text-blue-900">$900B+</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">إجمالي القطاعات الكبرى</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق: القهوة والشاي',
      subtitle: 'Hot Beverages and Soda',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تظل القهوة والشاي هما المشروبان المفضلان عالمياً في فئة المشروبات الساخنة، بينما تهيمن الشركات الأمريكية والعملاقة على سوق المشروبات الباردة والغازية.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-blue-400">سوق القهوة</p>
              <p className="text-sm text-slate-300 mt-2">يشهد تحولاً نحو القهوة المختصة (Specialty Coffee) والحلول الجاهزة للشرب (RTD).</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-blue-400">المشروبات الغازية</p>
              <p className="text-sm text-slate-300 mt-2">تركيز هائل على تقليل السعرات الحرارية واستخدام المحليات البديلة الطبيعية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'قادة الصناعة',
      subtitle: 'Global Beverage Giants',
      content: (
        <div className="space-y-6">
          <p>
            تتربع شركتان أمريكيتان على عرش مبيعات المشروبات الغازية عالمياً، بينما تبرز شركات أخرى في قطاع المياه والألبان والقهوة.
          </p>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
             <p className="text-lg font-bold text-blue-900 mb-2">الشركات الأكثر قيمة (Brand Value):</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-bold text-slate-700">• Coca-Cola Co.</div>
                <div className="text-sm font-bold text-slate-700">• PepsiCo Inc.</div>
                <div className="text-sm font-bold text-slate-700">• Nestlé (Water/Coffee)</div>
                <div className="text-sm font-bold text-slate-700">• Starbucks</div>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Coca-Cola', country: 'الولايات المتحدة', note: 'العلامة التجارية الأشهر للمشروبات الغازية في العالم' },
    { name: 'PepsiCo', country: 'الولايات المتحدة', note: 'قوة صناعية كبرى في المشروبات والوجبات الخفيفة' },
    { name: 'Starbucks', country: 'الولايات المتحدة', note: 'المتصدر العالمي في قطاع المقاهي والقهوة الجاهزة' },
    { name: 'Nestlé', country: 'سويسرا', note: 'أكبر شركة أغذية ومشروبات شاملة في العالم' },
    { name: 'Red Bull', country: 'النمسا', note: 'المتصدر في سوق مشروبات الطاقة عالمياً' },
  ],

  definition: `تغطي صناعة المشروبات غير الكحولية إنتاج وتوزيع كافة المشروبات الجاهزة للاستهلاك التي لا تحتوي على كحول. يركز الجانب التجاري على المشروبات المعبأة وتجارة التجزئة، بالإضافة إلى الخدمات في قطاع المقاهي والمطاعم.`,

  industryInsights: [
    'الوعي الصحي يقود مبيعات "المياه الوظيفية" والمشروبات منخفضة السكر لمستويات قياسية',
    'القهوة تظل المشروب الأكثر استقراراً ونمواً في فئة المشروبات الساخنة عالمياً',
    'الاستدامة في التعبئة والتغليف (البلاستيك المعاد تدويره) أصبحت أولوية قصوى لكوكاكولا وبيبسي',
    'مشروبات الطاقة تشهد توسعاً هائلاً في ديموغرافيات الشباب والرياضيين في الأسواق الآسيوية',
  ],

  tags: ['Beverages', 'Soft Drinks', 'Coffee', 'Tea', 'FMCG', 'Energy Drinks', 'Retail'],
};

const NonAlcoholicBeveragesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default NonAlcoholicBeveragesDashboard;
