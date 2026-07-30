import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { PawPrint, Globe, TrendingUp, Heart } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'مستلزمات الحيوانات الأليفة',
  titleEn: 'Pets & Animal Supplies',
  subtitle: 'أنسنة الحيوانات الأليفة، نمو سوق الأغذية الفائقة، والطلب المتزايد على المكملات الصحية',
  icon: PawPrint,
  accent: 'orange',
  pdfLabel: 'تقرير مستلزمات الحيوانات (PDF)',

  kpis: [
    { label: 'مبيعات أغذية الحيوانات عالمياً', value: '123.6B', unit: 'مليار دولار أمريكي', icon: Globe },
    { label: 'إيرادات أكبر سوق إقليمي (أمريكا)', value: '57.3B', unit: 'مليار دولار سنوياً', icon: TrendingUp },
    { label: 'رائد الصناعة العالمي', value: 'Nestlé Purina', unit: 'مبيعات سنوية قوية', icon: PawPrint },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق عالمي للحيوانات', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم بإنفاق يتجاوز 57 مليار دولار، وهي مقر لأكبر عمالقة الصناعة مثل Mars وPurina.',
      icon: TrendingUp
    },
    { 
      label: 'أسرع الأسواق نمواً', 
      country: 'الصين', 
      note: 'تشهد طفرة هائلة في ملكية الحيوانات الأليفة بين الطبقة المتوسطة الشابة، مما يجعلها محرك النمو القادم.',
      icon: Globe
    },
    { 
      label: 'ثالث أكبر سوق عالمي', 
      country: 'البرازيل', 
      note: 'تمتلك واحداً من أكبر مجتمعات الحيوانات الأليفة في العالم مع طلب قوي على خدمات الرعاية والتغذية.',
      icon: PawPrint
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'القطاعات الربحية', 'اتجاهات المكملات', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يوفر سوق مستلزمات الحيوانات الأليفة مئات المنتجات التي تشمل الأغذية، منتجات الصحة والنظافة، الألعاب، الأثاث، وأدوات التغذية. أصبح التسوق لهذه المنتجات أسهل من أي وقت مضى مع التوسع الكبير في منافذ التجزئة الإلكترونية والتقليدية.
          </p>
          <p>
            كان لجائحة كورونا تأثير إيجابي مباشر على معدلات ملكية الحيوانات الأليفة، حيث قضى المستهلكون وقتاً أطول مع رفاقهم من الحيوانات. ومع عودة الحياة لطبيعتها، يلاحظ استمرار نمو الإنفاق مدفوعاً بالتوجه نحو المنتجات <strong>الطبيعية والعضوية</strong>.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Pet Food Sales on the Up',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                في عام 2023، وصلت مبيعات أغذية الحيوانات الأليفة إلى حوالي <strong>133.9 مليار دولار أمريكي</strong> عالمياً، بزيادة قدرها 30 مليار دولار مقارنة بعام 2020.
              </p>
              <p>
                لا يعد هذا النمو مفاجئاً مع التوسع في تقديم خيارات الأغذية <strong>الممتازة (Premium)</strong> والمخصصة، حيث أصبح المالكون يعاملون حيواناتهم كأفراد من العائلة، مما زاد من وتيرة الإنفاق النوعي والكمي.
              </p>
            </div>
            <div className="p-8 bg-orange-50 rounded-2xl border border-orange-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Globe size={48} className="text-orange-600 mb-4" />
               <p className="text-2xl font-black text-orange-900">$133.9B</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">تقديرات المبيعات لعام 2023</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'القطاعات الأكثر ربحية',
      subtitle: 'Food, Treats, and Vet Care',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            داخل السوق الإجمالي، تستحوذ <strong>الأغذية والمكافآت (Food & Treats)</strong> على الحصة الأكبر من المبيعات، تليها مباشرة خدمات الرعاية البيطرية والمنتجات الصحية.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-orange-400">الأغذية والمكافآت</p>
              <p className="text-sm text-slate-300 mt-2">الفئة الأكثر مبيعاً واستقراراً في جميع الأسواق العالمية.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-orange-400">الرعاية البيطرية</p>
              <p className="text-sm text-slate-300 mt-2">ثاني أكثر القطاعات ربحية مع زيادة الوعي بالصحة الوقائية للحيوانات.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات المكملات الصحية',
      subtitle: 'Growing Health Consciousness',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أصبح أصحاب الحيوانات الأليفة أكثر وعياً بصحة حيواناتهم، مما أدى لنمو سوق <strong>المكملات الغذائية</strong> بشكل ملحوظ لتحسين صحة الأمعاء، السلوك، وتقليل القلق والتوتر لدى الحيوانات.
          </p>
          <div className="flex items-start gap-4 p-6 bg-orange-50 rounded-2xl border border-orange-100">
            <Heart className="text-orange-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-orange-900">أنسنة الحيوانات (Humanization)</p>
              <p className="text-slate-700 text-sm leading-relaxed">
                هذا الاتجاه يدفع المالكين للبحث عن "أغذية فائقة" (Superfoods) ومكونات طبيعية تماماً لحيواناتهم، تماماً كما يبحثون عن صحتهم الشخصية.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Nestlé Purina PetCare', country: 'الولايات المتحدة', note: 'المتصدر عالمياً بإيرادات 21.4 مليار دولار' },
    { name: 'Mars Petcare Inc.', country: 'الولايات المتحدة', note: 'المركز الثاني بمبيعات تقارب 20 مليار دولار' },
    { name: 'Hill’s Pet Nutrition', country: 'الولايات المتحدة', note: 'رائد في التغذية المتخصصة والعلاجية' },
    { name: 'General Mills', country: 'الولايات المتحدة', note: 'توسع هائل في قطاع أغذية الحيوانات الممتازة' },
    { name: 'Diamond Pet Foods', country: 'الولايات المتحدة', note: 'شركة كبرى تركز على الجودة العالية' },
  ],

  definition: `تتمحور صناعة مستلزمات الحيوانات الأليفة حول إنتاج وتجزئة واستهلاك مجموعة واسعة من المنتجات. يمكن تقسيم الصناعة بشكل عام إلى فئتين: أغذية الحيوانات (وهي الأكثر ربحية) ومنتجات الحيوانات (التي تشمل النظافة، الألعاب، والإكسسوارات). يعتبر معظم المالكين حيواناتهم جزءاً لا يتجزأ من العائلة، مما يعزز الاستدامة المالية لهذا القطاع.`,

  industryInsights: [
    'الولايات المتحدة تهيمن على المشهد العالمي بمبيعات سنوية تتخطى 57 مليار دولار',
    'أغذية الحيوانات الفاخرة والمخصصة (Personalized) هي المحرك الأكبر لنمو الإيرادات',
    'أنسنة الحيوانات جعلت من الرعاية الصحية الوقائية والمكملات الغذائية قطاعاً انفجارياً',
    'سوق التجارة الإلكترونية لمستلزمات الحيوانات ينمو بمعدلات تفوق التجارة التقليدية',
  ],

  tags: ['Pet Food', 'Animal Care', 'Pet Supplies', 'Health & Wellness', 'FMCG', 'Humanization'],
};

const PetSuppliesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PetSuppliesDashboard;
