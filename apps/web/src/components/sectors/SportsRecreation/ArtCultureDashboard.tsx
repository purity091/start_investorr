import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Palette, Landmark, Theater, Music, BarChart3, TrendingUp, Globe, Sparkles } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الفن والثقافة',
  titleEn: 'Art & Culture Industry',
  subtitle: 'تحليل سوق الفن العالمي، المتاحف، الفنون الأدائية، وتأثير التحول الرقمي وNFT على الإبداع',
  icon: Palette,
  accent: 'blue',
  pdfLabel: 'تقرير الثقافة والإبداع (PDF)',

  kpis: [
    { label: 'سوق الفن العالمي', value: '67.8', unit: 'مليار $', icon: BarChart3 },
    { label: 'سوق المسرح (أمريكا)', value: '8.4', unit: 'مليار $', icon: Theater },
    { label: 'زوار متحف اللوفر', value: '8', unit: 'مليون', icon: Landmark },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق لتجارة الفن', 
      country: 'الولايات المتحدة', 
      note: 'تستحوذ على أكثر من 40% من مبيعات الفن العالمية وتعد موطناً لأكبر دور المزادات والجامعين المحترفين.',
      icon: Palette
    },
    { 
      label: 'عاصمة المتاحف والسياحة الثقافية', 
      country: 'فرنسا', 
      note: 'تضم أهم المتاحف العالمية (مثل اللوفر) وتعتبر الوجهة الأولى للسياح الباحثين عن التراث الفني كقيمة اقتصادية.',
      icon: Landmark
    },
    { 
      label: 'محرك سوق الفن الآسيوي', 
      country: 'الصين / هونغ كونغ', 
      note: 'ثاني أكبر سوق عالمي للمزادات الفنية والتحف، مع تزايد ضخم في عدد الجامعين الجدد من فئة الشباب.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'سوق الفن', 'المسرح والبرودواي', 'التحول الرقمي', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الإبداع كمحرك اقتصادي',
      subtitle: 'Art as an Economic Driver',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            بعيداً عن تأثيره في صياغة هوياتنا وقيمنا، يُعرف قطاع الفن والثقافة كمحرك مهم للنمو الاقتصادي والتنمية. تكمن قوة النظام الثقافي في تنوعه، حيث يربط بين قطاعات مختلفة مثل سوق الفن، المتاحف، صالات العرض، والمسرح.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Sparkles className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الرقمنة في عالم الفن</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  بعد الجائحة، سارع سوق الفن من عملية الرقمنة، حيث عززت دور المزاد أقسامها الرقمية وارتفعت مبيعات الـ NFT، مما فتح آفاقاً جديدة للفنانين المعاصرين.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'art-market',
      title: 'سوق الفن العالمي والمزادات',
      subtitle: 'Global Art Market & Auctions',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أثبت سوق الفن مرونته في مواجهة الاضطرابات العالمية على مدار الـ 15 عاماً الماضية. تظل الولايات المتحدة المركز الرائد لتجارة الفن الدولية، تليها المملكة المتحدة والصين كمراكز محورية رئيسية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">انتعاش المبيعات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعافى السوق سريعاً من صدمات الأزمات المالية، حيث وصلت القيمة السوقية العالمية إلى مستويات قياسية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">المتاحف العالمية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تضم أوروبا الغربية وأمريكا الشمالية أكبر عدد من المؤسسات الثقافية والمتاحف الأكثر زيارة عالمياً.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'digital-shift',
      title: 'المبيعات الرقمية والـ NFT',
      subtitle: 'Online Sales & The NFT Boom',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تضاعفت قيمة المعاملات الفنية عبر الإنترنت في السنوات الأولى من الأزمة الصحية. ورغم تراجع حمى الـ NFT في عام 2022، إلا أن المبيعات الرقمية لا تزال ذات أهمية كبيرة، خاصة بين جامعي الفنون الأصغر سناً.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Music className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الفنون الأدائية</p>
                <p className="text-sm text-slate-400">بدأ قطاع المسرح والبرودواي بالتعافي التدريجي، مع عودة الحضور الأسبوعي لمستوياته الطبيعية بعد توقف طويل.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Palette className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">دور المزادات الرائدة</p>
                <p className="text-sm text-slate-400">تسيطر Christie’s و Sotheby’s على سوق المزاد العالمي، حيث تحققان مبيعات بمليارات الدولارات سنوياً.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Sotheby\'s', country: 'UK/Global', note: 'واحدة من أقدم وأكبر دور المزادات للفنون والتحف في العالم' },
    { name: 'The Louvre', country: 'France', note: 'المتحف الأكثر زيارة في العالم ورمز ثقافي عالمي في باريس' },
    { name: 'Broadway League', country: 'USA', note: 'تمثل صناعة المسرح الحي في نيويورك وتدير تعافي القطاع بعد الجائحة' },
    { name: 'Christie\'s', country: 'UK/Global', note: 'رائدة في تنظيم المزادات الفنية الكبرى وتوسيع تكنولوجيا الـ NFT' },
  ],

  definition: 'تضم صناعة الفن والثقافة مجموعة واسعة من الأسواق المرتبطة بالقيم الفنية والسلع الثقافية، من المزادات والمتاحف إلى الفنون الأدائية والمهرجانات الثقافية.',

  industryInsights: [
    'المبيعات الفنية عبر الإنترنت تمثل الآن حصة كبيرة من السوق، مدفوعة بجيل الشباب من المستثمرين الرقميين',
    'التحول الرقمي في المتاحف أدى إلى زيادة التفاعل العالمي عبر جولات الواقع الافتراضي ووسائل التواصل الاجتماعي',
    'الاستثمار في العقارات الثقافية والمناطق الإبداعية يساهم في تنشيط السياحة الحضرية في المدن الكبرى',
  ],

  tags: ['Art', 'Culture', 'Museums', 'Auctions', 'NFTs', 'Broadway', 'Digital Art'],
};

const ArtCultureDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ArtCultureDashboard;
