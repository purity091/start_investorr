import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Star, Tv, Music, Trophy, DollarSign, BarChart3, TrendingUp, Users, Crown } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'المشاهير وعالم الأضواء',
  titleEn: 'Celebrities & Show Business',
  subtitle: 'تحليل نجوم الفن، الرياضيين الأكثر متابعة، المليارديرات العصاميين، وتأثير الشهرة على الثقافة',
  icon: Star,
  accent: 'amber',
  pdfLabel: 'تقرير المشاهير والثروة (PDF)',

  kpis: [
    { label: 'أكثر رياضي متابعة (رونالدو)', value: '600M+', unit: 'متابع', icon: Trophy },
    { label: 'أكبر جولة موسيقية (2024)', value: '1.0', unit: 'مليار $', icon: Music },
    { label: 'أشهر فرد في العائلة الملكية', value: 'Wiliam', unit: 'الأمير ويليام', icon: Crown },
  ],

  navItems: ['نظرة عامة', 'السينما والتلفزيون', 'الموسيقى والجوالات', 'الرياضة والشهرة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'صناعة الشهرة والاعتراف العام',
      subtitle: 'The Business of Fame',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يعد المشاهير وعالم الترفيه من بين أكثر مواضيع نمط الحياة شعبية. الشهرة اليوم لم تعد تقتصر على الأداء الفني فحسب، بل تمتد لتشمل رواد الأعمال الذين أصبحوا أسماء مألوفة في كل منزل، حيث تبلغ ثروات بعضهم مليارات الدولارات.
          </p>
          <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
             <DollarSign className="text-amber-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-amber-900 leading-tight">الاقتصاد القائم على الشهرة</p>
                <p className="text-sm text-amber-700/80 mt-2">
                  يتحول المشاهير إلى علامات تجارية بحد ذاتهم، حيث يستثمرون شهرتهم في بناء إمبراطوريات تجارية في مجالات التجميل، التكنولوجيا، والرياضة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'film-tv',
      title: 'السينما والتلفزيون: صناعة النجوم',
      subtitle: 'Film & TV Stardom',
      content: (
        <div className="space-y-6 text-right">
          <p>
            منذ اختراع الصور المتحركة، كان الممثلون محط أنظار العالم. لا يزال حفل الأوسكار والإيمي يمثلان قمة الاعتراف المهني، حيث تدر الأفلام والمسلسلات الناجحة ثروات هائلة لصناعها.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-amber-600 mb-2" size={20} />
                <p className="font-black text-slate-900">جوائز الأوسكار</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تؤدي الترشيحات والانتصارات التاريخية في الأوسكار إلى قفزات فورية في أجور الممثلين وقيمتهم التسويقية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-amber-600 mb-2" size={20} />
                <p className="font-black text-slate-900">تأثير البث الرقمي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">غيرت منصات البث الطريقة التي يحصل بها الممثلون على الشهرة، حيث يمكن لمسلسل واحد أن يخلق نجوماً عالميين في ليلة وضحاها.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'music-sports',
      title: 'الموسيقى والرياضة: جماهيرية بلا حدود',
      subtitle: 'Global Athletes & Musicians',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبح المطربون والرياضيون اليوم يمتلكون قاعدة جماهيرية عابرة للقارات بفضل منصات التواصل الاجتماعي والبث المباشر.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Users className="text-amber-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">قادة إنستغرام</p>
                <p className="text-sm text-slate-400">يهيمن الرياضيون مثل كريستيانو رونالدو وميسي على قائمة الأكثر متابعة، مما يمنحهم قوة تفاوضية إعلانية هائلة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Music className="text-amber-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الجولات الموسيقية</p>
                <p className="text-sm text-slate-400">تحقق جولات النجوم الكبار (مثل تايلور سويفت) إيرادات بمليارات الدولارات وتنعش اقتصادات المدن المضيفة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Cristiano Ronaldo', country: 'Portugal', note: 'الرياضي الأكثر متابعة وتأثيراً رقمياً في العالم' },
    { name: 'Taylor Swift', country: 'USA', note: 'أيقونة الموسيقى الحديثة وصاحبة الجولات الأعلى دخلاً' },
    { name: 'Elon Musk', country: 'USA', note: 'رائد أعمال تحول إلى شخصية عامة مثيرة للجدل والمتابعة' },
    { name: 'Prince William', country: 'UK', note: 'الشخصية الأكثر شعبية وتأثيراً في العائلة الملكية البريطانية' },
  ],

  definition: 'يشمل قطاع المشاهير الأفراد الذين يتمتعون بشهرة واعتراف واسع من قبل الجمهور عبر وسائل الإعلام المختلفة، ويغطي مجالات الفن والرياضة والأعمال والسياسة.',

  industryInsights: [
    'وسائل التواصل الاجتماعي سمحت للمشاهير بالاستغناء عن الوسطاء التقليديين في بناء صورتهم',
    'يتحول المشاهير بشكل متزايد إلى مستثمرين في "رأس المال المغامر" (Venture Capital)',
    'تحقق العلامات التجارية التابعة للمشاهير (مثلاً في التجميل) معدلات نمو تفوق العلامات التقليدية بفضل الولاء الجماهيري',
  ],

  tags: ['Celebrities', 'Entertainment', 'Showbiz', 'Influencers', 'Fame History'],
};

const CelebritiesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default CelebritiesDashboard;
