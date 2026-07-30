import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Search, Globe, MessageSquare, BarChart3, TrendingUp, Cpu, ShieldCheck, DollarSign } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'محركات البحث عبر الإنترنت',
  titleEn: 'Online Search Sector',
  subtitle: 'تحليل حصص سوق محركات البحث، الإنفاق الإعلاني، وتأثير الذكاء الاصطناعي وشات بوتس على البحث',
  icon: Search,
  accent: 'blue',
  pdfLabel: 'تقرير سوق البحث العالمي (PDF)',

  kpis: [
    { label: 'الإنفاق العالمي على إعلانات البحث', value: '279.35', unit: 'مليار $', icon: DollarSign },
    { label: 'حصة جوجل في السوق العالمي', value: '91.47%', icon: Globe },
    { label: 'حصة بايدو في الصين', value: '55.85%', icon: Search },
  ],

  topMarkets: [
    { 
      label: 'موطن عمالقة البحث', 
      country: 'الولايات المتحدة', 
      note: 'تسيطر الشركات الأمريكية (Google وMicrosoft) على أكثر من 95% من سوق البحث العالمي خارج الصين.',
      icon: Search
    },
    { 
      label: 'سوق البحث الصيني المشتعل', 
      country: 'الصين', 
      note: 'سوق فريد تهيمن عليه Baidu، ويتميز بخوارزميات محلية متطورة وتكامل عميق مع الخدمات الصينية.',
      icon: Search
    },
    { 
      label: 'المنافس المحلي الأقوى', 
      country: 'روسيا', 
      note: 'تمتلك Yandex التي تنجح في التفوق على جوجل محلياً بفضل فهمها العميق للغة والثقافة الروسية.',
      icon: Globe
    }
  ],

  navItems: ['نظرة عامة', 'هيمنة جوجل', 'البحث والذكاء الاصطناعي', 'المنافسون المحليون', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'بوابة الويب: محركات البحث',
      subtitle: 'The Ubiquitous Search Experience',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يعد استخدام محركات البحث عاملاً حاضراً في التجربة اليومية عبر الإنترنت. مع دمج الإنترنت بشكل متزايد في الأنشطة والخدمات، تزداد الحاجة لهذه الأدوات، مما ينتج المزيد من بيانات المستهلكين وفرصاً هائلة للمعنين.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Cpu className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">التحول الجذري نحو الذكاء الاصطناعي</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  قد يشهد سوق البحث تغييرات جوهرية مع دمج تقنيات الدردشة الآلية والذكاء الاصطناعي، مما يعيد تشكيل كيفية تفاعل المستخدمين مع المعلومات.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'google-dominance',
      title: 'هيمنة جوجل المطلقة',
      subtitle: 'Google’s Market Dominance',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد جوجل القائد المهيمن في مجال البحث، بفضل الخوارزميات المتقدمة والتكامل العميق مع متصفحات الويب والأجهزة المحمولة التي تعتمد عليها كخيار افتراضي.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
             <div className="p-8 bg-slate-900 rounded-2xl border border-blue-500/30 flex flex-col items-center shrink-0 w-full md:w-64 text-center">
                <BarChart3 size={40} className="text-blue-400 mb-4" />
                <p className="text-3xl font-black text-white">91%+</p>
                <p className="text-[10px] font-bold text-blue-300 mt-1 uppercase">حصة جوجل في سوق البحث العالمي</p>
             </div>
             <div className="flex-1 space-y-4">
                <p className="text-slate-600">
                  على الرغم من سيطرة جوجل، يظل محرك البحث Bing هو المنافس الوحيد الحقيقي في سوق البحث باللغة الإنجليزية، وإن كان بحصة سوقية أصغر بكثير.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'ai-trends',
      title: 'تحدي الذكاء الاصطناعي وChatbots',
      subtitle: 'AI-Powered Online Search',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أدى إطلاق ChatGPT إلى تسخين سوق البحث الراكد، مما دفع الاتجاه الجديد لروبوتات الدردشة التي تقدم النتائج في شكل محادثة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <MessageSquare className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">روبوتات الاستعلام</p>
                <p className="text-sm text-slate-400">بدأ المستخدمون في تفضيل الإجابات المباشرة والمحاورة بدلاً من البحث التقليدي عبر الروابط الزرقاء.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShieldCheck className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الخصوصية والاستدامة</p>
                <p className="text-sm text-slate-400">تحاول محركات بديلة مثل DuckDuckGo وEcosia كسب حصة من خلال التركيز على الخصوصية والبيئة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Google (Alphabet)', country: 'USA', note: 'المحرك المهيمن والأكثر ربحية في عالم الدعاية والبحث' },
    { name: 'Microsoft (Bing)', country: 'USA', note: 'المنافس الأكبر لجوجل مع تكامل قوي للذكاء الاصطناعي' },
    { name: 'Baidu', country: 'China', note: 'محرك البحث الرائد في الصين والسوق الصينية العملاقة' },
    { name: 'Yandex', country: 'Russia', note: 'القائد المهيمن في روسيا ودول كومنولث المستقلة' },
  ],

  definition: 'يشمل قطاع البحث عبر الإنترنت محركات البحث التي تتيح للمستخدمين العثور على المعلومات عبر الويب، والتقنيات الإعلانية المرتبطة بها (Search Advertising).',

  industryInsights: [
    'إعلانات البحث هي الشكل الأكثر فعالية من الإعلانات الرقمية وتحقق أعلى عائد استثمار (ROI)',
    'البحث الصوتي (Voice Search) ينمو بمعدل سريع مع انتشار المساعدات الذكية في المنازل',
    'البيانات الضخمة (Big Data) تسمح لمحركات البحث بفهم نية المستخدم بشكل أدق من أي وقت مضى',
  ],

  tags: ['Search Engines', 'Google', 'SEO', 'SEM', 'AI Search', 'Privacy'],
};

const OnlineSearchDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default OnlineSearchDashboard;
