import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Sprout, Globe, BarChart3, TrendingUp, ShieldCheck, Zap, Leaf, Truck } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الزراعة',
  titleEn: 'Farming Industry',
  subtitle: 'تحليل الإنتاج العالمي للحبوب، تقنيات الزراعة الذكية (Smart Farming)، الزراعة الداخلية، واللحوم',
  icon: Sprout,
  accent: 'green',
  pdfLabel: 'تقرير الزراعة (PDF)',

  kpis: [
    { label: 'سوق الزراعة الداخلية', value: '96.7', unit: 'مليار $', icon: Sprout },
    { label: 'إنتاج الحبوب العالمي', value: '2.3', unit: 'مليار طن', icon: Globe },
    { label: 'تقنية IoT الزراعية', value: '20', unit: '% النمو', icon: Zap },
  ],

  topMarkets: [
    { 
      label: 'أكبر منتج زراعي عالمي', 
      country: 'الصين', 
      note: 'تتصدر العالم في إنتاج الفواكه، الخضروات، والثروة الحيوانية بحجم هائل.',
      icon: Globe
    },
    { 
      label: 'القائد الاستراتيجي للتصدير', 
      country: 'الولايات المتحدة', 
      note: 'أكبر مصدر للمحاصيل الأساسية واللحوم عالمياً بفضل البنية الصناعية.',
      icon: TrendingUp
    },
    { 
      label: 'قوة الإنتاج المتسارعة', 
      country: 'البرازيل', 
      note: 'عملاق عالمي في إنتاج وتصدير الصويا، الذرة، والبن بجودة وتنافسية عالية.',
      icon: Leaf
    }
  ],

  navItems: ['نظرة عامة', 'الزراعة الذكية والداخلية', 'سوق الحبوب واللحوم', 'القادة والتوجهات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الثورة التكنولوجية في الحقول',
      subtitle: 'Technological Revolution in the Fields',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تشهد الزراعة تحولاً جذرياً نحو التكنولوجيا الذكية؛ من الطائرات بدون طيار والأقمار الصناعية إلى إنترنت الأشياء (IoT) والذكاء الاصطناعي. هذا الابتكار لا يعزز القوة الإنتاجية فحسب، بل يقلل بشكل كبير من الأثر البيئي للزراعة التقليدية.
          </p>
          <div className="p-6 bg-green-50 rounded-2xl border border-green-100 flex items-start gap-4">
             <Zap className="text-green-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-green-900 leading-tight">الزراعة الذكية (Smart Farming)</p>
                <p className="text-sm text-green-700/80 mt-2">
                  يُتوقع أن يتضاعف إنفاق أوروبا على إنترنت الأشياء الزراعي ليصل إلى 2.06 مليار دولار بحلول عام 2025، مما يعزز الكفاءة في استخدام الموارد.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'indoor-farming',
      title: 'الزراعة الداخلية والعمودية',
      subtitle: 'Indoor & Vertical Farming',
      content: (
        <div className="space-y-6 text-right">
          <p>
            توفر الزراعة الداخلية حلاً مستداماً يقلل الاعتماد على الطقس والتربة واستهلاك المياه. ويعد الاستزراع الهوائي (Aeroponics) الأبرز بحصة 48.5% من هذا السوق، مع توقعات بوصول حجم السوق العالمي إلى 96.7 مليار دولار بحلول 2032.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Leaf className="text-green-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الزراعة العضوية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تضع الزراعة العضوية معايير أعلى لحماية الحيوان والنبات، مع حظر الأسمدة الكيماوية والمبيدات الصناعية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Truck className="text-green-600 mb-2" size={20} />
                <p className="font-black text-slate-900">المعدات الذكية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">المعدات الزراعية المستقلة (Autonomous) بدأت تغزو الحقول، من الجرارات ذاتية القيادة إلى آلات الحلب الروبوتية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'grain-livestock',
      title: 'أسواق الحبوب والثروة الحيوانية',
      subtitle: 'Grain & Livestock Markets',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أظهر إنتاج الحبوب العالمي مرونة عالية رغم الصدمات الاقتصادية، حيث نما الإنتاج ليصل إلى 2.3 مليار طن سنوياً. وفي قطاع الثروة الحيوانية، تظل الصين القائد في تربية الخنازير بـ 434 مليون رأس، بينما تقود أمريكا إنتاج لحوم البقر والعدول.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Globe className="text-green-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">أمن الغذاء العالمي</p>
                <p className="text-sm text-slate-400">تعتبر القمح والذرة والأرز المحاصيل الاستراتيجية التي تضمن أمن الغذاء لأكثر من 8 مليارات إنسان.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <BarChart3 className="text-green-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تجارة الفواكه</p>
                <p className="text-sm text-slate-400">تستحوذ أوروبا على نصف تجارة الفواكه والخضروات الطازجة عالمياً، وتعد ألمانيا وهولندا أكبر المستوردين.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'China (Leader)', country: 'China', note: 'أكبر منتج للفواكه (250 مليون طن) والخنازير في العالم' },
    { name: 'USA (Farming)', country: 'USA', note: 'الرائدة عالمياً في إنتاج لحوم البقر والمحاصيل الاستراتيجية كالذرة وفول الصويا' },
    { name: 'European Union', country: 'EU', note: 'تنتج خمس إنتاج القمح العالمي وتتصدر تجارة الخضروات الطازجة نضوجاً' },
    { name: 'India (Agriculture)', country: 'India', note: 'واحدة من أضخم القوى العاملة الزراعية في العالم مع تنوع هائل في المحاصيل' },
  ],

  definition: 'الزراعة هي أقدم الأعمال البشرية وتشمل زراعة المحاصيل وتربية الماشية للغذاء، وتعتمد اليوم بشكل مكثف على التكنولوجيا (Smart Ag) والاستدامة.',

  industryInsights: [
    'الزراعة العمودية في المدن الكبرى تقلل من تكاليف الخدمات اللوجستية وتضمن محاصيل طازجة طوال العام',
    'إنترنت الأشياء الزراعي (IoT) يساهم في تقليل هدر المياه بنسبة تصل إلى 40% من خلال الري الدقيق',
    'أسواق اللحوم تشهد تحولاً نحو البروتينات البديلة والزراعة العضوية استجابة لتغير أذواق المستهلكين الواعين بيئياً',
  ],

  tags: ['Farming', 'Agriculture', 'Smart Farming', 'IoT', 'Livestock', 'Grains'],
  sectorId: 'farming-dashboard',
};

const FarmingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default FarmingDashboard;
