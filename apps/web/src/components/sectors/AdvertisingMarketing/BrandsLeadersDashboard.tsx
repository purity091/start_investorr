import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Award, Globe, BarChart3, TrendingUp, ShieldCheck, Heart, Sparkles, Smartphone, Megaphone } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'العباقرة والرواد',
  titleEn: 'Brands & Leaders',
  subtitle: 'تحليل العلامات التجارية الأثمن عالمياً، أكبر المعلنين نفوذاً، والوكالات الإعلانية الأكثر إبداعاً وتأثيراً',
  icon: Award,
  accent: 'blue',
  pdfLabel: 'تقرير الرواد (PDF)',

  kpis: [
    { label: 'العلامة الأثمن (Apple)', value: '1', unit: 'Global Rank', icon: Globe },
    { label: 'أكبر معلن (P&G)', value: '1', unit: 'Global Spender', icon: Megaphone },
    { label: 'أكثر سوق مبدع', value: 'USA', unit: 'Market', icon: Sparkles },
  ],

  topMarkets: [
    {
      label: 'أكبر سوق إعلاني في العالم',
      country: 'الولايات المتحدة',
      note: 'السوق القائد عالمياً في الإنفاق الإعلاني الرقمي والتقليدي بحصة مسيطرة.',
      icon: Globe
    },
    {
      label: 'ثاني أكبر سوق إعلاني',
      country: 'الصين',
      note: 'تتميز بنظام بيئي رقمي محلي ضخم ومعدلات نمو استثنائية.',
      icon: TrendingUp
    },
    {
      label: 'المركز الثالث عالمياً',
      country: 'المملكة المتحدة',
      note: 'مركز عالمي للإبداع وتعد من بين أكثر الأسواق تقدماً في الإعلان الرقمي.',
      icon: Award
    }
  ],

  navItems: ['نظرة عامة', 'أكبر المعلنين', 'تصنيفات الوكالات', 'قيمة العلامة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'عمالقة التسويق العالمي',
      subtitle: 'Marketing Giants Worldwide',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يُدار عالم التسويق والإعلانات من قبل قوى عملاقة؛ تتصدرها Procter & Gamble كأكبر معلن عالمياً، وشركة Apple كأثمن علامة تجارية. وبفضل بيئة تنافسية وتطور تقني، تظل الولايات المتحدة السوق الإعلاني الأكثر إبداعاً واستثماراً في العالم.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <ShieldCheck className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">ريادة التكنولوجيا</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تحافظ العلامات التقنية (Apple, Google, Microsoft) على صدارة تصنيفات القيمة التجارية لسنوات طويلة نتيجة الولاء العالي والابتكار المستمر.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'advertisers',
      title: 'قوة الإنفاق: P&G في الصدارة',
      subtitle: 'P&G Leading Global Spend',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تستحوذ شركات السلع النهائية (الأغذية، المشروبات، مستحضرات التجميل) على الجزء الأكبر من الإنفاق الإعلاني. وتعد شركة P&G مثالاً فريداً؛ فلو كانت دولة، لكانت السوق الإعلاني رقم 14 عالمياً، متفوقة على دول كبرى مثل روسيا وإسبانيا.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <ShieldCheck className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نفوذ المعلنين الكبار</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">المعلنون الذين يمتلكون محافظ علامات متعددة يمتلكون قوة تفاوضية هائلة في شراء المساحات الإعلامية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أكثر الحملات إبداعاً</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">حملة "HP Streetcode" التي طورتها Edelman كانت الأكثر إبداعاً في 2023 لمعالجتها الفجوة الرقمية بذكاء فني.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'brand-value',
      title: 'سحر العلامة والولاء',
      subtitle: 'Brand Magic & Loyalty',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            العلامات التجارية ذات القيمة العالية تتمتع باعتراف واسع وقدرة على بناء ولاء استهلاكي طويل الأمد. وفي حين تهيمن التقنية عالمياً، تبرز علامات وطنية كأيقونات في بلدانها مثل Toyota في اليابان و Vodafone في بريطانيا و Itau في البرازيل.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Heart className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">بناء العلامة (Branding)</p>
                <p className="text-sm text-slate-400">جوهر النجاح يكمن في ربط العلامة عاطفياً بالمستهلك وليس فقط من خلال المزايا الوظيفية للمنتج.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Smartphone className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">العلامات في التواصل الاجتماعي</p>
                <p className="text-sm text-slate-400">أصبحت استراتيجية العلامات على منصات التواصل هي المعيار الجديد لقياس القبول والانتشار بين الأجيال الجديدة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Apple Inc.', country: 'USA', note: 'أثمن علامة تجارية في العالم ورائدة في بناء الولاء الرقمي' },
    { name: 'Procter & Gamble', country: 'USA', note: 'أكبر موظف للميزانيات الإعلانية في العالم بحصة سوقية استثنائية' },
    { name: 'Google', country: 'USA', note: 'قوة مطلقة في تقنية الإعلان وواحدة من أثمن 3 علامات تجارية دولياً' },
    { name: 'Toyota', country: 'Japan', note: 'نموذج للريادة الصناعية والاعتراف بالعلامة التجارية في آسيا والعالم' },
  ],

  definition: 'تستعرض فئة الرواد أفضل وأكبر الأسماء في صناعة الإعلان، من قيمة العلامات التجارية إلى تصنيفات وكالات الإبداع وميزانيات كبار المعلنين.',

  industryInsights: [
    'المعلنون الكبار في قطاع السلع الاستهلاكية يمثلون الثقل الأكبر في سوق الإعلانات التلفزيونية والرقمية',
    'تصنيف الوكالات من حيث الإبداع يعتمد بشكل كبير على جوائز المهرجانات العالمية مثل Cannes Lions',
    'العلامات التقنية أصبحت تحتل المراكز الأولى في القيمة السوقية متفوقة على العلامات الصناعية التقليدية',
  ],

  tags: ['Brands', 'Leaders', 'Apple', 'P&G', 'Creative Agencies', 'Brand Value'],
  sectorId: 'brands-leaders-dashboard',
};

const BrandsLeadersDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default BrandsLeadersDashboard;
