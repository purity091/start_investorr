import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Waves, Globe, BarChart3, TrendingUp, ShieldCheck, Anchor, Fish, Ship } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الثروة السمكية والاستزراع',
  titleEn: 'Fisheries & Aquaculture',
  subtitle: 'تحليل الإنتاج السمكي العالمي، نمو الاستزراع السمكي (Aquaculture)، وتجارة المأكولات البحرية الدولية',
  icon: Waves,
  accent: 'blue',
  pdfLabel: 'تقرير الثروة السمكية (PDF)',

  kpis: [
    { label: 'الإنتاج السمكي العالمي', value: '184.6', unit: 'مليون طن', icon: Globe },
    { label: 'عاملو القطاع', value: '58.5', unit: 'مليون شخص', icon: Anchor },
    { label: 'إنتاج الصين (صيد)', value: '13.4', unit: 'مليون طن', icon: Ship },
  ],

  topMarkets: [
    { 
      label: 'المتصدر المطلق للإنتاج', 
      country: 'الصين', 
      note: 'تمثل أكثر من ثلث الإنتاج العالمي للأسماك وتتصدر بجدارة في الصيد والاستزراع.',
      icon: Globe
    },
    { 
      label: 'ثاني أكبر منتج عالمي', 
      country: 'إندونيسيا', 
      note: 'لاعب رئيسي في إنتاج الأحياء المائية والمأكولات البحرية في منطقة المحيط الهادئ.',
      icon: Ship
    },
    { 
      label: 'رائد الجودة والتصدير', 
      country: 'النرويج', 
      note: 'القائد العالمي في تقنيات استزراع السلمون وأكبر مصدر للمأكولات البحرية الفاخرة.',
      icon: Waves
    }
  ],

  navItems: ['نظرة عامة', 'صعود الاستزراع', 'الدول الرائدة', 'الاستدامة والتوجهات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'تأمين الغذاء من المحيطات',
      subtitle: 'Securing Food from Oceans',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعتبر الثروة السمكية ركيزة أساسية لتغذية سكان العالم. ومع تزايد القلق بشأن الصيد الصناعي الجائر، ينتقل التركيز تدريجياً نحو حلول أكثر استدامة. الصين وإندونيسيا تقودان العالم في هذا القطاع، ليس فقط في كمية الإنتاج، بل في التنافس الجيوسياسي على حقوق الصيد.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Fish className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">تجنب انهيار المخزون</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يعتبر بحر الصين الجنوبي منطقة حرجة، حيث يتم العمل على موازنة الصيد الصناعي مع الحفاظ على التنوع الحيوي لمنع انهيار المصايد.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'aquaculture',
      title: 'نهضة الاستزراع السمكي',
      subtitle: 'The Rise of Aquaculture',
      content: (
        <div className="space-y-6 text-right">
          <p>
            لأول مرة في التاريخ، يتجاوز إنتاج الاستزراع السمكي (96 مليون طن) الإنتاج الناتج عن الصيد البري التقليدي (90.6 مليون طن). هذا التحول يعزز الأمن الغذائي ويخفف الضغط عن المحيطات، حيث نمت مخرجات الاستزراع بـ 30 مليون طن في عقد واحد.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Waves className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق السلمون العالمي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يمثل السلمون أحد أثمن المكونات في سوق الاستزراع السمكي بفضل الطلب العالي في أوروبا وأمريكا.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إفريقيا وآسيا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تقود دول آسيا هذا التحول، مع تزايد الاهتمام بالاستزراع السمكي في الدول الإفريقية لسد الفجوة الغذائية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'الصين: القوة البحرية المهيمنة',
      subtitle: 'China: The Dominant Power',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تنتج الصين بمفردها 13.4 مليون طن من الصيد البري، وهو أكثر من ضعف إنتاج الدولة التالية لها (إندونيسيا). وفي مجال الاستزراع، تسيطر الدول الآسيوية على المراكز الستة الأولى من بين العشر الكبار عالمياً، مما يجعل آسيا مركز الثقل الرئيسي للمأكولات البحرية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Ship className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">أساطيل الصيد الصناعي</p>
                <p className="text-sm text-slate-400">تستخدم الدول الرائدة أساطيل ضخمة مجهزة بتقنيات المسح الصوتي للوصول لأبعد مناطق الصيد في أعالي البحار.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Globe className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">التجارة الدولية</p>
                <p className="text-sm text-slate-400">تعد النرويج وفيتنام وتشيلي من كبار المصدرين للمأكولات البحرية المستزرعة إلى الأسواق العالمية.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'China (Overall Leader)', country: 'China', note: 'المتصدر المطلق في الصيد البري والاستزراع السمكي بإنتاج يتجاوز أي دولة أخرى بضعفين' },
    { name: 'Indonesia', country: 'Indonesia', note: 'ثاني أكبر منتج للأسماك في العالم ولاعب رئيسي في حوض البحر الكاريبي والمحيط الهادئ' },
    { name: 'Norway (Aquaculture)', country: 'Norway', note: 'الرائدة في تقنيات استزراع السلمون وأكبر مصدر للمأكولات البحرية عالية الجودة' },
    { name: 'Vietnam', country: 'Vietnam', note: 'قوة صاعدة هائلة في مجال الاستزراع السمكي وتصدير الروبيان والأسماك النهرية' },
  ],

  definition: 'تغطي الثروة السمكية والاستزراع العمليات التجارية لصيد الحيوانات المائية من المحيطات، أو تربيتها تحت ظروف مراقبة في المياه المالح والعذبة.',

  industryInsights: [
    'الاستزراع السمكي سيصبح المصدر رقم 1 للأسماك في العالم قريباً جداً، متجاوزاً الصيد التقليدي تاريخياً',
    'الاستدامة وشهادات المصدر أصبحت عاملاً حاسماً في قدرة الدول على تصدير منتجاتها للأسواق الأوروبية والأمريكية',
    'تقنيات الاستزراع في المياه العميقة (Deep Sea Farming) هي التوجه القادم لرفع جودة الإنتاج وتقليل الأمراض',
  ],

  tags: ['Fisheries', 'Aquaculture', 'China Fish', 'Seafood Trade', 'Sustainability', 'Salmon Market'],
  sectorId: 'fisheries-aquaculture-dashboard',
};

const FisheriesAquacultureDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default FisheriesAquacultureDashboard;
