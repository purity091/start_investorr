import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { MessageSquare, Video, Mail, Users, Globe, TrendingUp, Zap, Smartphone, Share2, ShieldCheck } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الاتصالات الرقمية',
  titleEn: 'Digital Communications',
  subtitle: 'تحليل تطبيقات المراسلة الفورية، خدمات البريد الإلكتروني، منصات الفيديو، وتوجهات التواصل المهني والاجتماعي',
  icon: MessageSquare,
  accent: 'cyan',
  pdfLabel: 'تقرير الاتصالات الرقمية (PDF)',

  kpis: [
    { label: 'مستخدمو البريد الإلكتروني (2026)', value: '4.7', unit: 'مليار', icon: Mail },
    { label: 'مستخدمو WeChat نشطون شهرماً', value: '1.3', unit: 'مليار', icon: Users },
    { label: 'إيرادات Zoom لعام 2023', value: '4.4', unit: 'مليار $', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'موطن عمالقة التواصل', 
      country: 'الولايات المتحدة', 
      note: 'مقر الشركات التي تسيطر على التواصل العالمي: Meta (WhatsApp), Google (Gmail), Microsoft (Teams), وZoom.',
      icon: Globe
    },
    { 
      label: 'نموذج التطبيق الشامل (WeChat)', 
      country: 'الصين', 
      note: 'تمتلك نظاماً فريداً للتواصل المدمج مع الخدمات الحياتية والمالية عبر WeChat الذي يتجاوز مليار مستخدم.',
      icon: MessageSquare
    },
    { 
      label: 'أضخم سوق نمو للمراسلة', 
      country: 'الهند', 
      note: 'تعد السوق الأكبر عالمياً من حيث عدد مستخدمي WhatsApp وTelegram، وهي المحرك لنمو منصات التواصل الجديدة.',
      icon: TrendingUp
    }
  ],

  navItems: ['نظرة عامة', 'منصات المراسلة', 'الاتصال المرئي', 'التواصل المهني', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'عالم متصل: ثورة التواصل عبر الإنترنت',
      subtitle: 'A Connected Global Hub',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            أصبح الإنترنت الوسيلة الأساسية للبقاء على اتصال، متجاوزاً الحدود الجغرافية والظروف الاجتماعية. من العائلات التي يدرس أبناؤها في الخارج إلى الشركات العالمية، تضمن التكنولوجيا استمرارية التواصل عبر أنواع متعددة من المنصات، بدءاً من شبكات التواصل الاجتماعي وصولاً إلى تطبيقات المراسلة الفورية والبريد الإلكتروني.
          </p>
          <div className="p-6 bg-cyan-50 rounded-2xl border border-cyan-100 flex items-start gap-4">
             <Globe className="text-cyan-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-cyan-900 leading-tight">انتشار عالمي غير مسبوق</p>
                <p className="text-sm text-cyan-700/80 mt-2">
                  تطبيقات مثل WhatsApp و WeChat تهيمن على المشهد، بينما شهدت تطبيقات مثل Telegram نمواً هائلاً في أسواق ضخمة مثل الهند بأكثر من 83.8 مليون تحميل.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'messaging-platforms',
      title: 'صراع العمالقة: تطبيقات المراسلة الفورية',
      subtitle: 'The Battle of Messengers',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يظل WhatsApp التطبيق الأكثر استخداماً عالمياً للمراسلة الفورية. وفي الولايات المتحدة، يتمتع Facebook Messenger بأعلى وعي بين المستخدمين بنسبة 91%، يليه Snapchat و FaceTime. كما يبرز Discord كمنصة رائدة للمجتمعات الافتراضية واللاعبين.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Smartphone className="text-cyan-600 mb-2" size={20} />
                <p className="font-black text-slate-900">المراسلة الفورية</p>
                <p className="text-xs text-slate-500 mt-1">تطبيقات WhatsApp و Telegram و Signal تركز على السرعة والأمان (End-to-end Encryption).</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Share2 className="text-cyan-600 mb-2" size={20} />
                <p className="font-black text-slate-900">التواصل الاجتماعي والمرئي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">منصات Discord و Snapchat توفر تجربة تفاعلية تشمل الصور، الفيديو، ومشاركة الشاشة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'video-calls',
      title: 'عصر الاتصال المرئي: انفجار Zoom و Teams',
      subtitle: 'Video Call Revolution',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أحدثت جائحة كوفيد-19 طفرة في استخدام برمجيات الاتصال المرئي. سجلت Zoom حوالي 3000 مليار اجتماع عالمي في عام 2021، ونمت إيراداتها لتصل إلى 4.4 مليار دولار في 2023 بمعدل زيادة 69% مقارنة بعام 2021.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Video className="text-cyan-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">منصة Zoom</p>
                <p className="text-sm text-slate-400">تحولت من أداة عمل إلى ضرورة اجتماعية وتعليمية، مسجلة مليارات الاجتماعات سنوياً.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Zap className="text-cyan-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">Microsoft Teams</p>
                <p className="text-sm text-slate-400">أصبحت البيئة المتكاملة المفضلة للتواصل والتعاون المهني في الشركات الكبرى.</p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'professional-comm',
      title: 'البريد الإلكتروني: العمود الفقري للتواصل المهني',
      subtitle: 'Email: The Professional Backbone',
      content: (
        <div className="space-y-6 text-right">
          <p>
            رغم ظهور تقنيات جديدة، لا يزال البريد الإلكتروني هو الوسيلة الرائدة للتواصل المهني. من المتوقع أن يتجاوز عدد مستخدمي البريد الإلكتروني 4.7 مليار شخص بحلول عام 2026، مما يجعله الأداة الأكثر انتشاراً وموثوقية في بيئات العمل الرسمية.
          </p>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
              <div>
                  <h4 className="text-2xl font-black text-slate-900">4.7 مليار</h4>
                  <p className="text-slate-500 font-bold">مستخدم بريد إلكتروني متوقع</p>
              </div>
              <Mail className="text-cyan-600/20 group-hover:scale-110 transition-transform" size={60} />
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'WhatsApp', country: 'Global', note: 'تطبيق المراسلة الأكثر استخداماً وموثوقية في العالم للتواصل الشخصي والأعمال' },
    { name: 'Zoom Video Communications', country: 'الولايات المتحدة', note: 'الرائد العالمي في خدمات الاتصال المرئي والاجتماعات الافتراضية' },
    { name: 'Microsoft Teams', country: 'الولايات المتحدة', note: 'المنصة المتكاملة الرائدة للتواصل والتعاون داخل المؤسسات والشركات' },
    { name: 'WeChat', country: 'الصين', note: 'التطبيق الشامل (Super App) الذي يهيمن على كافة جوانب التواصل في السوق الصيني' },
  ],

  definition: 'قطاع الاتصالات الرقمية يشمل كافة الوسائل والمنصات التي تتيح تبادل المعلومات والرسائل والمكالمات عبر الإنترنت، بما في ذلك تطبيقات الدردشة الفورية، البريد الإلكتروني، ومنصات الفيديو.',

  industryInsights: [
    'من المتوقع أن يصل عدد مستخدمي البريد الإلكتروني إلى 4.7 مليار بحلول عام 2026',
    '35.3% من مستخدمي الإنترنت حول العالم يقومون بإجراء مكالمات فيديو بشكل منتظم',
    'WhatsApp Business يحقق نمواً متزايداً في متوسط الإيرادات لكل مستخدم عالمياً',
  ],

  tags: ['Communications', 'Internet', 'WhatsApp', 'Zoom', 'Email', 'Messaging', 'Digital Networking'],
};

const CommunicationsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default CommunicationsDashboard;
