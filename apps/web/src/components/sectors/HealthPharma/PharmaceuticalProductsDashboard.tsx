import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Pill, FlaskConical, TestTube, ShoppingBag, BarChart3, TrendingUp, Globe, ShieldPlus } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'سوق الأدوية والمستحضرات',
  titleEn: 'Pharmaceutical Products & Market',
  subtitle: 'تحليل نفقات البحث والتطوير، الأدوية الموصوفة، التقنيات البيولوجية، وأكبر شركات الأدوية عالمياً',
  icon: Pill,
  accent: 'blue',
  pdfLabel: 'تقرير سوق الأدوية العالمي (PDF)',

  kpis: [
    { label: 'سوق الأدوية العالمي المتوقع', value: '1.6', unit: 'ترليون $', icon: Globe },
    { label: 'نمو قطاع الأدوية البيولوجية', value: '12%', unit: 'سنوياً', icon: TrendingUp },
    { label: 'نفقات البحث والتطوير عالمياً', value: '244', unit: 'مليار $', icon: FlaskConical },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق أدوية في العالم', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في مبيعات الأدوية المبتكرة ونفقات البحث والتطوير، ومقر لأضخم شركات الأدوية عالمياً.',
      icon: Pill
    },
    { 
      label: 'مركز الأدوية البيولوجية الأوروبي', 
      country: 'سويسرا', 
      note: 'موطن لعملاقي الصناعة (Roche وNovartis)، وتتميز بقوة هائلة في الأدوية الشخصية والبيولوجية.',
      icon: FlaskConical
    },
    { 
      label: 'أسرع أسواق النمو والـ API', 
      country: 'الصين', 
      note: 'ثاني أكبر سوق عالمي وأكبر منتج للمواد الخام الدوائية (API) والمستحضرات الجنيسة في العالم.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'أكبر الشركات', 'البحث والتطوير', 'التوقعات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'ديناميكيات سوق الأدوية العالمي',
      subtitle: 'Market Dynamics',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يصل حجم سوق الأدوية العالمي حالياً إلى حوالي 1.6 تريليون دولار أمريكي. تتنوع مجموعة منتجات الأدوية من المضادات الحيوية التي لم تتغير كثيراً في ما يقرب من قرن من الزمان إلى أحدث جيل من العلاجات الجينية والعلاجات المصممة خصيصاً للأفراد.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">
             <div className="p-5 border border-blue-100 rounded-2xl bg-blue-50/50">
                <ShieldPlus className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الأدوية الموصوفة (Prescription)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تمثل الجزء الأكبر من إيرادات الصناعة، مع تركيز متزايد على أدوية الأورام والأمراض النادرة.</p>
             </div>
             <div className="p-5 border border-blue-100 rounded-2xl bg-blue-50/50">
                <ShoppingBag className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الذكاء الاصطناعي في الأدوية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يؤدي استخدام البيانات الضخمة والذكاء الاصطناعي في الأبحاث إلى تسريع وتيرة هذه الصناعة بشكل هائل.</p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'عمالقة صناعة الأدوية',
      subtitle: 'Top Pharma Companies by Revenue',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تهيمن مجموعة صغيرة من الشركات المتعددة الجنسيات على الحصة الأكبر من السوق، وتقع معظمها في الولايات المتحدة وأوروبا.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
             <div className="p-8 bg-slate-900 rounded-2xl border border-blue-500/30 flex flex-col items-center shrink-0 w-full md:w-64 text-center">
                <BarChart3 size={40} className="text-blue-400 mb-4" />
                <p className="text-3xl font-black text-white">Pfizer</p>
                <p className="text-[10px] font-bold text-blue-300 mt-1 uppercase">أكبر شركة من حيث الإيرادات</p>
             </div>
             <div className="flex-1 space-y-4">
                <p className="text-slate-600">
                  شهد عام 2022 وما بعده تحولاً في مراكز القوى نتيجة مبيعات لقاحات كورونا والأدوية المضادة للفيروسات، حيث قفزت شركات مثل Pfizer وRoche وAbbVie وJohnson & Johnson إلى صدارة الترتيب العالمي.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'rnd',
      title: 'الاستثمار في المستقبل: البحث والتطوير',
      subtitle: 'R&D Investment Trends',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تستثمر شركات الأدوية مبالغ هائلة في تطوير عقاقير جديدة. في المتوسط، تخصص شركات الأدوية الكبرى حوالي 15% إلى 25% من إيراداتها السنوية لعمليات البحث والتطوير.
          </p>
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-start gap-4">
             <TestTube className="text-blue-400 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-white leading-tight">تكلفة تطوير دواء جديد</p>
                <p className="text-sm text-slate-400 mt-2">
                  تشير التقديرات إلى أن تطوير عقار واحد جديد يتطلب استثماراً يفوق 2.6 مليار دولار، مع الأخذ في الاعتبار معدلات الفشل العالية في التجارب السريرية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Pfizer', country: 'USA', note: 'الشركة الرائدة عالمياً مدفوعة بمبيعات اللقاحات والعلاجات الجينية' },
    { name: 'Roche', country: 'Switzerland', note: 'رائد عالمي في مجال الأدوية الشخصية وعلاجات الأورام' },
    { name: 'AbbVie', country: 'USA', note: 'تملك أحد الأدوية الأكثر مبيعاً في التاريخ (Humira)' },
    { name: 'Johnson & Johnson', country: 'USA', note: 'تنوع كبير بين الرعاية الصحية الاستهلاكية والأجهزة والأدوية' },
    { name: 'Novartis', country: 'Switzerland', note: 'تركيز قوي على الأدوية المبتكرة والجيل القادم من العلاجات' },
  ],

  definition: 'يشمل قطاع الأدوية الشركات التي تقوم ببحث وتطوير وتصنيع وتوزيع الأدوية البشرية والبيطرية، ويعد من أكثر القطاعات تنظيماً وارتباطاً بنظم براءات الاختراع العالمية.',

  industryInsights: [
    'الولايات المتحدة هي أكبر سوق وطني للأدوية، تليها الصين كأسرع الأسواق نمواً',
    'هناك طفرة هائلة في تطوير أدوية السمنة (مثلاً GLP-1) والتي من المتوقع أن تقود نمو السوق في العقد القادم',
    'انتهاء براءات الاختراع للأدوية الكبرى (Patent Cliff) يؤدي إلى نمو سوق الأدوية الجنيسة (Generics)',
  ],

  tags: ['Pharma', 'Biotech', 'Drug Development', 'Healthcare Market', 'R&D'],
};

const PharmaceuticalProductsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PharmaceuticalProductsDashboard;
