import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Gamepad2, Globe, TrendingUp, Puzzle } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الألعاب والهوايات',
  titleEn: 'Toys & Games',
  subtitle: 'الابتكار التقني، الألعاب التعليمية، والريادة العالمية في صناعة الترفيه للأطفال',
  icon: Gamepad2,
  accent: 'indigo',
  pdfLabel: 'تقرير سوق الألعاب (PDF)',

  kpis: [
    { label: 'العلامة التجارية الأغلى عالمياً', value: 'LEGO', unit: 'قيمة تتخطى 7 مليار دولار', icon: Puzzle },
    { label: 'أكبر منتج ومصدر للألعاب', value: 'الصين', unit: '64 مليار دولار سنوياً', icon: Globe },
    { label: 'سوق مجموعات البناء والنماذج', value: '30B', unit: 'مليار دولار بحلول 2027', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'مركز التصنيع العالمي', 
      country: 'الصين', 
      note: 'تتصدر العالم كأكبر منتج ومصدر للألعاب، حيث تعتمد عليها أغلب العلامات التجارية العالمية في سلاسل توريدها.',
      icon: Globe
    },
    { 
      label: 'أكبر سوق استهلاكي', 
      country: 'الولايات المتحدة', 
      note: 'تمثل القوة الشرائية الأولى عالمياً وأكبر مستورد للألعاب، وهي مقر لشركات عملاقة مثل Mattel وHasbro.',
      icon: TrendingUp
    },
    { 
      label: 'موطن الإبداع والجودة', 
      country: 'الدنمارك', 
      note: 'مقر لشركة LEGO، العلامة التجارية الأغلى والأكثر تأثيراً في تاريخ صناعة الألعاب العالمية.',
      icon: Puzzle
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'قطاعات السوق', 'النظرة الإقليمية', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد الألعاب جزءاً أساسياً من مراحل تطور الطفل، حيث تساهم الألعاب التعليمية في صقل المهارات منذ سن مبكرة، وتعزز الألعاب التعاونية مهارات التواصل وحل النزاعات. تتأثر الصناعة باستمرار بتغير أذواق المستهلكين، مع انجذاب الأطفال نحو الألعاب <strong>الإلكترونية والتفاعلية</strong> الأكثر تطوراً.
          </p>
          <p>
            يطلب السوق من الشركات المصنعة تقديم خطوط إنتاج جديدة بانتظام والتركيز المكثف على الابتكار والتطور التقني لمواكبة قصر "عمر اهتمام" الأطفال بالألعاب التقليدية.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Global Toy Market Growth',
      content: (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 space-y-4">
              <p>
                يعد سوق الألعاب العالمي صناعة متنامية باستمرار. وتولد <strong>الصين</strong> الحصة الأكبر من المبيعات كونها المنتج والمصدر الرائد عالمياً كل عام.
              </p>
              <p>
                في المقابل، تظل <strong>الولايات المتحدة</strong> واحدة من أهم الأسواق الاستهلاكية، حيث تتربع على قمة مستوردي الألعاب في العالم بفارق كبير عن أقرب منافسيها، مما يمثل توازناً استراتيجياً بين التصنيع الشرقي والاستهلاك الغربي.
              </p>
            </div>
            <div className="p-8 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col items-center shrink-0 w-full md:w-64">
               <Globe size={48} className="text-indigo-600 mb-4" />
               <p className="text-2xl font-black text-indigo-900">$64 مليار</p>
               <p className="text-xs font-bold text-slate-500 mt-1 uppercase">حجم إنتاج الصين (2023)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق',
      subtitle: 'Dolls, Construction Sets, and Models',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتكون صناعة الألعاب من العديد من الصناعات الفرعية؛ من بيوت الدمى والسيارات الكهربائية للأطفال إلى الدمى المحشوة والحيوانات الرقمية المحمولة.
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-indigo-400">مجموعات البناء والنماذج</p>
              <p className="text-sm text-slate-300 mt-2">من المتوقع أن تتجاوز إيراداتها 30 مليار دولار عالمياً بحلول عام 2027.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-xl font-black text-indigo-400">ألعاب الأطفال الصغار</p>
              <p className="text-sm text-slate-300 mt-2">قطاع مستقر يركز على الأمان والجوانب التعليمية المبكرة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'قادة الصناعة',
      subtitle: 'LEGO Dominance',
      content: (
        <div className="space-y-6">
          <p>
            تعد <strong>LEGO</strong> إلى حد بعيد العلامة التجارية الرائدة للألعاب في العالم بقيمة تتجاوز <strong>7 مليارات دولار</strong>، متفوقة بـ 5.9 مليار دولار على أقرب منافسيها (Bandai Namco).
          </p>
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
             <p className="text-lg font-bold text-indigo-900 mb-2">عمالقة الألعاب عالمياً</p>
             <div className="grid grid-cols-2 gap-4">
                <div className="text-sm font-bold text-slate-700">• Bandai Namco</div>
                <div className="text-sm font-bold text-slate-700">• Mattel (Barbie)</div>
                <div className="text-sm font-bold text-slate-700">• Fisher-Price</div>
                <div className="text-sm font-bold text-slate-700">• Hasbro (Nerf)</div>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'LEGO Group', country: 'الدنمارك', note: 'المتصدر العالمي بلا منازع' },
    { name: 'Bandai Namco', country: 'اليابان', note: 'المركز الثاني عالمياً بقوة في الألعاب التفاعلية' },
    { name: 'Mattel Inc.', country: 'الولايات المتحدة', note: 'المالكة لعلامات Barbie و Fisher-Price' },
    { name: 'Hasbro', country: 'الولايات المتحدة', note: 'الرائدة في ألعاب اللوح وعلامات Nerf و Transformers' },
    { name: 'Nintendo', country: 'اليابان', note: 'تكامل فريد بين الألعاب الفيزيائية والإلكترونية' },
  ],

  definition: `تتكون صناعة الألعاب والهوايات من مجموعة واسعة من المنتجات الموجهة للترفيه والتعليم. يركز السوق على القطاعات التقليدية مثل الدمى ومجموعات البناء، بالإضافة إلى ألعاب اللوحة والكروت. توسع السوق في العقود الأخيرة ليشمل الألعاب الإلكترونية والتفاعلية التي باتت تستحوذ على النصيب الأكبر من اهتمام الجيل الجديد.`,

  industryInsights: [
    'LEGO تهيمن على القيمة السوقية للعلامات التجارية بفرق هائل عن كافة المنافسين',
    'الصين تسيطر على 64 مليار دولار من الإنتاج العالمي للألعاب كأكبر مصنع ومصدر',
    'الولايات المتحدة هي المحرك الاستهلاكي الأول وأكبر مستورد للألعاب عالمياً',
    'الابتكار في دمج التقنيات الذكية مع الألعاب التقليدية هو المعيار الجديد للنجاح التجاري',
  ],

  tags: ['Toys', 'Games', 'LEGO', 'Education', 'Entertainment', 'Mattel', 'Retail'],
};

const ToysDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ToysDashboard;
