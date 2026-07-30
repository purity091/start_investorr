import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Activity, FlaskConical, Globe, ShieldCheck, Zap, BarChart3, Building2, Microscope, Dna, TrendingUp } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المنتجات الدوائية وسوق الأدوية',
  titleEn: 'Pharmaceutical Products & Market',
  subtitle: 'تحليل سوق الأدوية العالمي، الابتكار في التكنولوجيا الحيوية، وعلاجات الجيل القادم',
  icon: Activity,
  accent: 'rose',
  pdfLabel: 'تقرير قطاع الأدوية العالمي (PDF)',

  kpis: [
    { label: 'إجمالي إيرادات الأدوية عالمياً', value: '$1.6T', unit: 'تريليون دولار', icon: BarChart3 },
    { label: 'أكبر سوق دوائي وطني', value: 'الولايات المتحدة', unit: 'نصف الإيرادات تقريباً', icon: Globe },
    { label: 'أكبر شركة بمبيعات الوصفات', value: 'Pfizer', unit: 'قائد مبيعات Rx', icon: ShieldCheck },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق دوائي في العالم', 
      country: 'الولايات المتحدة', 
      note: 'تستحوذ على ما يقرب من نصف إيرادات الأدوية العالمية وتعد مركزاً للابتكار التكنولوجي الحيوي.',
      icon: Globe
    },
    { 
      label: 'محرك النمو الآسيوي', 
      country: 'الصين', 
      note: 'ثاني أكبر سوق في العالم ومصدر رئيسي للمواد الخام الدوائية (APIs) والابتكارات المحلية.',
      icon: FlaskConical
    },
    { 
      label: 'رائد الصناعة الأوروبية', 
      country: 'ألمانيا', 
      note: 'أكبر سوق دوائي في أوروبا وتتميز بقطاع بحث وتطوير قوي جداً وشركات تاريخية كبرى.',
      icon: Activity
    }
  ],

  navItems: ['نظرة عامة', 'حجم السوق', 'قطاعات السوق', 'الاتجاهات', 'القادة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يبلغ حجم سوق الأدوية العالمي حالياً حوالي 1.6 تريليون دولار. تتنوع المنتجات من المضادات الحيوية التقليدية إلى أحدث علاجات الجينات والعلاجات المصممة خصيصاً للأفراد.
          </p>
          <p>
             أدى استخدام الذكاء الاصطناعي والبيانات الضخمة في تطوير العقاقير إلى تسريع وتيرة الصناعة بشكل مذهل، خاصة بعد الدور المحوري الذي لعبته شركات التكنولوجيا الحيوية مثل BioNTech و Moderna في مواجهة الأزمات الصحية العالمية.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'سوق مقاوم للأزمات',
      subtitle: 'A Crisis-Proof Market',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعتبر صناعة الأدوية من أكثر القطاعات مقاومة للأزمات. لم تشهد الإيرادات أي تراجعات كبرى خلال العقدين الماضيين، حتى في ظل الأزمات الاقتصادية العالمية.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <div className="p-8 bg-rose-50 rounded-2xl border border-rose-100 flex flex-col items-center shrink-0 w-full md:w-64 text-center">
               <TrendingUp size={40} className="text-rose-600 mb-4" />
               <p className="text-3xl font-black text-rose-900">$1.6T</p>
               <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">حجم السوق الحالي (2024)</p>
            </div>
            <div className="flex-1 space-y-4">
              <p>
                من المتوقع أن يستمر النمو ليصل إلى مستويات قياسية بحلول عام 2029، مع زيادة التركيز على سهولة الوصول إلى الأدوية والتنظيمات الأخلاقية في الأسواق الناشئة والبديلة.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق والتكنولوجيا',
      subtitle: 'Pharma Segments',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            يتم تقسيم السوق بين الأدوية التي تصرف بوصفة طبية (Rx) والأدوية التي تباع دون وصفة (OTC)، بالإضافة إلى التمييز بين المنتجات الكيميائية التقليدية والبيولوجية المبتكرة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Dna className="text-rose-400 mb-3" size={24} />
              <p className="font-bold text-white">التكنولوجيا الحيوية</p>
              <p className="text-xs text-slate-400">تعد الشركات الصغيرة في هذا المجال الأكثر ابتكاراً، حيث تقود الطريق في علاجات الأورام والمناعة.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Microscope className="text-rose-400 mb-3" size={24} />
              <p className="font-bold text-white">البحث والتطوير (R&D)</p>
              <p className="text-xs text-slate-400">يشكل التعاون مع المواقع الأكاديمية ركيزة أساسية للأبحاث الأولية وتطوير الجزيئات الجديدة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'الاتجاهات الكبرى وعمليات الاندماج',
      subtitle: 'Mergers & Trends',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تمر الصناعة بعملية مستمرة من الاندماج والاستحواذ (M&A) لتبادل المعرفة وتقليل تكاليف البحث. تعد صفقة Pfizer و Warner-Lambert مثالاً تاريخياً على ذلك.
          </p>
          <div className="flex items-start gap-5 p-6 bg-rose-50 rounded-2xl border border-rose-200">
             <Zap className="text-rose-700 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-slate-900 leading-tight">الذكاء الاصطناعي والعلاجات الشخصية</p>
                <p className="text-sm text-slate-700 leading-relaxed mt-2">
                  أصبحت البيانات الضخمة وتعلم الآلة أعمدة جديدة للبحث والتطوير، مما أتاح تطوير "علاجات شخصية" و "علاجات للأمراض النادرة" (Orphan Drugs) بكفاءة أكبر.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'قادة القطاع والمنافسة الإقليمية',
      subtitle: 'Regional & Market Leaders',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تهيمن الشركات الأمريكية والسويسرية على المشهد العالمي. تظل شركة Pfizer في الطليعة بفضل إيرادات اللقاحات، تليها شركات كبرى مثل AbbVie و Roche و Novartis.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
             {[
               { name: 'Pfizer', country: 'U.S.', val: 'Leader 2022' },
               { name: 'Roche', country: 'Switzerland', note: 'Gene Therapy Power' },
               { name: 'AbbVie', country: 'U.S.', val: 'Rx Giant' },
               { name: 'Novartis', country: 'Switzerland', note: 'Innovative Meds' },
               { name: 'Johnson & Johnson', country: 'U.S.', val: 'Consumer Health' },
             ].map((company, idx) => (
               <div key={idx} className="p-5 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-black text-rose-600 mb-1">{company.country}</p>
                  <p className="font-black text-slate-800">{company.name}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{company.val || company.note}</p>
               </div>
             ))}
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Pfizer', country: 'United States', note: 'قائد السوق العالمي في اللقاحات وعلاجات الوصفات الطبية المعقدة' },
    { name: 'AbbVie', country: 'United States', note: 'متخصص في المنتجات العلاجية المناعية والدوائية عالية القيمة' },
    { name: 'Roche', country: 'Switzerland', note: 'رائد عالمي في تشخيص وعلاجات الأورام المتقدمة' },
    { name: 'Novartis', country: 'Switzerland', note: 'يركز على الطب المبتكر والعلاجات الجينية' },
    { name: 'Johnson & Johnson', country: 'United States', note: 'مجموعة طبية شاملة تضم قطاعاً قوياً في الأدوية وصحة المستهلك' },
  ],

  definition: `تعتبر صناعة الأدوية مسؤولة عن تطوير وإنتاج وتسويق الأدوية كإجراءات وقائية وعلاجية. تهدف المنتجات الدوائية إلى علاج الحالات الطبية أو تأخير ظهورها أو تقليل أعراضها، وتشمل الصناعة الأدوية الكيميائية والتقنيات الحيوية.`,

  industryInsights: [
    'سوق الأدوية العالمي بلغ 1.6 تريليون دولار مع توقعات بنمو مستقر ومقاوم للأزمات',
    'الولايات المتحدة تولد ما يقرب من نصف إيرادات الأدوية العالمية بفضل أسعار الأدوية ومراكز الابتكار',
    'الذكاء الاصطناعي والبيانات الضخمة أصبحت الركيزة الأساسية لتطوير الأدوية الحديثة',
    'الأدوية التخصصية وعلاجات الأورام هي المحرك الأكبر للنمو في الإيرادات الحالية',
  ],

  tags: ['Pharma', 'Biotech', 'Drug Market', 'Pfizer', 'Oncology', 'Health Technology', 'M&A', 'Life Sciences'],
};

const PharmaDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PharmaDashboard;
