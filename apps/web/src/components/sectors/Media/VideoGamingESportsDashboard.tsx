import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Gamepad2, Smartphone, Monitor, Trophy, Globe, BarChart3, TrendingUp, Zap, Users } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'ألعاب الفيديو والرياضات الإلكترونية',
  titleEn: 'Video Gaming & eSports',
  subtitle: 'تحليل سوق الألعاب العالمي، صدارة الهواتف المحمولة، ظاهرة الرياضات الإلكترونية، وقادة صناعة الألعاب',
  icon: Gamepad2,
  accent: 'indigo',
  pdfLabel: 'تقرير سوق الألعاب العالمي (PDF)',

  kpis: [
    { label: 'إيرادات سوق الألعاب العالمي', value: '455', unit: 'مليار $', icon: BarChart3 },
    { label: 'لاعبو المحمول عالمياً', value: '2.0', unit: 'مليار لاعب', icon: Smartphone },
    { label: 'أعلى اللاعبين دخلاً (N0tail)', value: '7.1', unit: 'مليون $', icon: Trophy },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق ألعاب في العالم', 
      country: 'الصين', 
      note: 'موطن لأكبر شركات الألعاب (Tencent, NetEase) وتهيمن على سوق ألعاب المحمول والرياضات الإلكترونية عالمياً.',
      icon: Smartphone
    },
    { 
      label: 'قائد الابتكار والأجهزة', 
      country: 'اليابان', 
      note: 'منبت أساطير الألعاب (Nintendo, Sony) والمبتكر الأول في مجال أجهزة الكونسول والتجارب الحصرية.',
      icon: Gamepad2
    },
    { 
      label: 'مركز الرياضات الإلكترونية', 
      country: 'كوريا الجنوبية', 
      note: 'تعتبر مهد الرياضات الإلكترونية المحترفة وتمتلك أفضل بنية تحتية لتدريب وبث مسابقات الألعاب.',
      icon: Trophy
    }
  ],

  navItems: ['نظرة عامة', 'أجهزة اللعب', 'الألعاب المحمولة', 'الرياضات الإلكترونية', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الألعاب: صناعة الترفيه الأكبر',
      subtitle: 'Gaming as Mainstream Entertainment',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            أصبحت ألعاب الفيديو والرياضات الإلكترونية خياراً ترفيهياً أساسياً لجميع الفئات العمرية. لا تقتصر الألعاب على الترفيه فحسب، بل أصبحت منصة للتواصل الاجتماعي بين الأصدقاء عن بعد، مما خلق سوقاً بمليارات الدولارات.
          </p>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
             <Globe className="text-indigo-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-indigo-900 leading-tight">هيمنة الصين والولايات المتحدة</p>
                <p className="text-sm text-indigo-700/80 mt-2">
                  يمثل سوق الصين والولايات المتحدة ما يقرب من نصف إيرادات الألعاب العالمية، حيث يتم توليد معظم هذه الإيرادات عبر المبيعات والتحميلات الرقمية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'platforms',
      title: 'الهواتف المحمولة: ملك السوق',
      subtitle: 'Mobile Gaming Dominance',
      content: (
        <div className="space-y-6 text-right">
          <p>
            على الرغم من أهمية أجهزة الكونسول (مثل بلاي ستيشن وإكس بوكس)، إلا أن ألعاب الهاتف المحمول تستحوذ على الحصة الأكبر من السوق، حيث بلغت إيراداتها وحدها 74 مليار دولار في 2020.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Smartphone className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الألعاب المجانية (F2P)</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعتبر الألعاب المجانية المحرك الرئيسي للنمو، حيث حقق تطبيق PUBG Mobile وحده 2.6 مليار دولار في عام واحد.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أندونيسيا والوصول</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعتبر أندونيسيا السوق الذي يمتلك أكبر معدل وصول للألعاب (Gaming Reach) على مستوى العالم.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'esports',
      title: 'الرياضات الإلكترونية والبث المباشر',
      subtitle: 'The Rise of eSports & Streaming',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبحت الرياضات الإلكترونية مسابقات عالمية احترافية تجذب ملايين المشاهدين عبر منصات مثل Twitch، وتقدم جوائز تقدر بملايين الدولارات.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Users className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">جمهور متفاعل</p>
                <p className="text-sm text-slate-400">يمتلك Twitch معدل مشاهدة يتجاوز 2 مليون مشاهد في أي لحظة، مما يعكس قوة التواصل المباشر مع اللاعبين.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Zap className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">صناعة المحتوى</p>
                <p className="text-sm text-slate-400">تمثل الفيديوهات المتعلقة بالألعاب حوالي ثلث إجمالي المحتوى المرفوع على يوتيوب عالمياً.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Tencent', country: 'China', note: 'الشركة الأضخم في العالم من حيث إيرادات الألعاب والرياضات الإلكترونية' },
    { name: 'Nintendo', country: 'Japan', note: 'رائد عالمي في أجهزة الكونسول المحمولة والامتيازات الحصرية (Mario, Pokemon)' },
    { name: 'Activision Blizzard', country: 'USA', note: 'صاحب أشهر العناوين العالمية (Call of Duty, Candy Crush)' },
    { name: 'Sony (PlayStation)', country: 'Japan', note: 'المتصدر في جودة المحتوى الحصري ومبيعات أجزاء الكونسول المنزلية' },
  ],

  definition: 'يغطي قطاع ألعاب الفيديو والرياضات الإلكترونية صناعة تطوير الأجهزة والبرمجيات للألعاب، ومسابقات المحترفين، وخدمات البث المباشر للألعاب وتجارة المحتوى الرقمي.',

  industryInsights: [
    'الميتافيرس (Metaverse) والواقع الافتراضي هما الجبهة القادمة لنمو صناعة الألعاب',
    'يتحول سوق الألعاب بشكل كامل نحو نموذج "الخدمة المستمرة" (Games as a Service)',
    'تحقق الألعاب المستقلة (Indie Games) نجاحاً كبيراً ينافس أحياناً ميزانيات الألعاب الضخمة (AAA)',
  ],

  tags: ['Gaming Industry', 'eSports', 'Mobile Gaming', 'Twitch', 'Tencent', 'Nintendo'],
};

const VideoGamingESportsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default VideoGamingESportsDashboard;
