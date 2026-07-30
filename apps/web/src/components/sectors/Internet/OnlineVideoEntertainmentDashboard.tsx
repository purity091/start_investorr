import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Youtube, Play, Tv, Users, Activity, BarChart3, TrendingUp, Music, Smile } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الفيديو والترفيه عبر الإنترنت',
  titleEn: 'Online Video & Entertainment',
  subtitle: 'تحليل منصات البث، محتوى الفيديو القصير والطويل، شعبية يوتيوب وتيك توك، وعادات استهلاك المحتوى',
  icon: Play,
  accent: 'red',
  pdfLabel: 'تقرير الترفيه الرقمي العالمي (PDF)',

  kpis: [
    { label: 'وقت استخدام يوتيوب/أسبوعياً', value: '23', unit: 'ساعة', icon: Youtube },
    { label: 'سكان الفيديو الرقمي عالمياً', value: '4.5', unit: 'مليار', icon: Users },
    { label: 'مدى وصول الفيديو الرقمي', value: '92%', icon: Activity },
  ],

  topMarkets: [
    { 
      label: 'عاصمة المحتوى العالمي', 
      country: 'الولايات المتحدة', 
      note: 'مقر العمالقة (YouTube, Netflix, Disney+) والمنتج الأكبر للمحتوى الترفيهي الموزع عالمياً.',
      icon: Play
    },
    { 
      label: 'رائد الفيديو القصير', 
      country: 'الصين', 
      note: 'مبتكرة ثورة الفيديو القصير (TikTok/Douyin) والتجارة عبر البث المباشر (Live-stream Commerce).',
      icon: TrendingUp
    },
    { 
      label: 'أعلى استهلاك للفرد', 
      country: 'كوريا الجنوبية', 
      note: 'تسجل أعلى متوسط ساعات مشاهدة يوتيوب شهرياً للفرد، وتعد مركزاً عالمياً لتصدير المحتوى الثقافي الرقمي.',
      icon: Youtube
    }
  ],

  navItems: ['نظرة عامة', 'قيادة يوتيوب', 'ظاهرة تيك توك', 'المحتوى والأطفال', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'عصر السيادة البصرية',
      subtitle: 'The Era of Visual Content',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            مع أكثر من 4.5 مليار مستخدم للإنترنت حول العالم، يظل الفيديو والترفيه أحد أكثر الأنشطة شعبية. تنجذب الأجيال الحديثة بشكل متزايد للمحتوى البصري، حيث يحقق الفيديو القصير والطويل ملايين بل مليارات المشاهدات.
          </p>
          <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-4">
             <Music className="text-red-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-red-900 leading-tight">الموسيقى: المحرك الأول</p>
                <p className="text-sm text-red-700/80 mt-2">
                  بحلول نهاية عام 2023، كانت الفيديوهات الموسيقية هي المحتوى الأكثر استهلاكاً عالمياً، تليها الأخبار والرياضة والبث المباشر للألعاب.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'youtube',
      title: 'يوتيوب: ملك محتوى الفيديو',
      subtitle: 'YouTube Dominance',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تستقطب منصات مثل يوتيوب وفيميو عدداً متزايداً من المستخدمين. في عام 2023، قضى المستخدمون العالميون أكثر من 23 ساعة أسبوعياً في استخدام تطبيق يوتيوب للهواتف المحمولة.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-red-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سجل المشاهدات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">فيديو "Baby Shark Dance" هو الفيديو الأكثر مشاهدة في تاريخ يوتيوب، متجاوزاً "Despacito".</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-red-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أسرع مليار مشاهدة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعتبر أغنية "Hello" للمغنية Adele هي أسرع فيديو يصل إلى مليار مشاهدة على المنصة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tiktok',
      title: 'ظاهرة تيك توك وتحدي المحتوى القصير',
      subtitle: 'TikTok Sensation & Short-form Trends',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبح تيك توك المنصة الأكثر شعبية بين المراهقين والشباب، حيث يركز على الفيديوهات القصيرة والتحديات الاجتماعية التي تجذب ملايين المستخدمين يومياً.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Smile className="text-red-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">محتوى الأطفال</p>
                <p className="text-sm text-slate-400">تحقق قنوات الأطفال مثل ChuChu TV أكثر من 70 مليون مشترك، وهي شريحة ضخمة في سوق الفيديو الرقمي.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Tv className="text-red-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">البث فوق الأعلى (OTT)</p>
                <p className="text-sm text-slate-400">تتصدر نتفليكس وديزني+ سوق الاشتراكات، مع تحول تدريجي نحو النماذج التي تدعم الإعلانات لتقليل التكلفة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'YouTube (Google)', country: 'USA', note: 'المنصة الأكبر عالمياً لمحتوى الفيديو والاستماع الموسيقي' },
    { name: 'TikTok (ByteDance)', country: 'China', note: 'الرائد في نمو الفيديو القصير والاقتصاد القائم على المبدعين' },
    { name: 'Netflix', country: 'USA', note: 'زعيم محتوى OTT والإنتاج التلفزيوني السينمائي عبر البث' },
    { name: 'Spotify', country: 'Sweden', note: 'العملاق العالمي في البث الصوتي وتوزيع الموسيقى والبودكاست' },
  ],

  definition: 'يشمل قطاع الفيديو والترفيه منصات بث الفيديو ومواقع مشاركة المحتوى وخدمات المحتوى الصوتي (OTT) التي تتيح للمستخدمين استهلاك الترفيه رقمياً.',

  industryInsights: [
    'المستخدمون في كوريا الجنوبية هم الأكثر استهلاكاً ليوتيوب (44.5 ساعة شهرياً)',
    'الفيديو عبر الهاتف المحمول يمثل الآن أكثر من 50% من إجمالي مشاهدات الفيديو الرقمي',
    'البث المباشر (Live Streaming) للأب لعاب ينمو كقطاع ترفيهي رئيسي يتنافس مع التلفزيون التقليدي',
  ],

  tags: ['Online Video', 'YouTube', 'TikTok', 'Netflix', 'Streaming', 'OTT'],
};

const OnlineVideoEntertainmentDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default OnlineVideoEntertainmentDashboard;
