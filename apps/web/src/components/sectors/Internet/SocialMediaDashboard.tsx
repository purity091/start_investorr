import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Share2, Users, Globe, Heart, MessageCircle, BarChart3, TrendingUp, Zap, Camera } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'وسائل التواصل الاجتماعي والمحتوى',
  titleEn: 'Social Media & User-Generated Content',
  subtitle: 'تحليل نمو مستخدمي الشبكات الاجتماعية، هيمنة ميتأ، ظاهرة المؤثرين، ومستقبل المحتوى التفاعلي',
  icon: Share2,
  accent: 'blue',
  pdfLabel: 'تقرير التواصل الاجتماعي العالمي (PDF)',

  kpis: [
    { label: 'عدد مستخدمي التواصل الاجتماعي', value: '5.17', unit: 'مليار', icon: Users },
    { label: 'معدل الانتشار العالمي', value: '62.2%', icon: Globe },
    { label: 'المستخدمون المتوقعون (2028)', value: '6.05', unit: 'مليار', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'أكبر قاعدة مستخدمين', 
      country: 'آسيا', 
      note: 'تضم أكثر من 3 مليارات مستخدم نشط، مما يجعلها المحرك الأول لنمو المنصات العالمية.',
      icon: Globe
    },
    { 
      label: 'مركز الابتكار والمنصات', 
      country: 'الولايات المتحدة', 
      note: 'موطن عمالقة التواصل مثل Meta وYouTube وLinkedIn والريادة في تكنولوجيا الإعلانات.',
      icon: Share2
    },
    { 
      label: 'قوة النمو القادمة', 
      country: 'الهند', 
      note: 'من المتوقع أن تصبح أكبر جمهور لوسائل التواصل في العالم بفضل رخص البيانات وانتشار الهواتف.',
      icon: Users
    }
  ],

  navItems: ['نظرة عامة', 'هيمنة ميتأ', 'سوق المؤثرين', 'التوزيع الجغرافي', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الربط العالمي عبر المجتمعات الافتراضية',
      subtitle: 'Global Interactive Technologies',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تحدد وسائل التواصل الاجتماعي الطريقة التي نخلق ونشارك بها الأفكار والاهتمامات. بحلول عام 2024، وصل معدل انتشار وسائل التواصل الاجتماعي إلى 62%، مع توقعات بأن يتجاوز عدد المستخدمين نصف سكان الكوكب قريباً.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Heart className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">الدافع الأول: الأهل والأصدقاء</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  يظل الحفاظ على التواصل مع العائلة والأصدقاء هو السبب الرئيسي لاستخدام وسائل التواصل الاجتماعي، يليق ذلك متابعة الأخبار والترفيه.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'ميتأ: الملك غير المتوج',
      subtitle: 'Meta is King',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعد فيسبوك أكبر شبكة اجتماعية موجودة مع أكثر من 3 مليارات مستخدم نشط شهرياً في أوائل عام 2024. تحقق عائلة تطبيقات ميتأ (WhatsApp, Instagram, Messenger) نمواً مستمراً منذ عام 2018.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إيرادات ميتأ</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أعلنت ميتأ عن إيرادات سنوية تبلغ 133 مليار دولار في عام 2023، لتضاعف إيراداتها منذ 2018.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">صعود تيك توك</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يقدر عدد مستخدمي تيك توك بـ 1.9 مليار مستخدم، مما يشكل تهديداً كبيراً للمنصات التقليدية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'influencers',
      title: 'سوق المبدعين والمؤثرين',
      subtitle: 'Social Media Influence & UGC',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبح منشئو المحتوى والمؤثرون مرئيين للغاية عبر منصات الفيديو القصيرة مثل Instagram Reels وTikTok وYouTube Shorts، حيث يحققون مليارات المشاهدات.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Camera className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">توزيع المؤثرين</p>
                <p className="text-sm text-slate-400">أكثر من 66% من منشئي المحتوى على تيك توك لديهم ما بين 1,000 و10,000 متابع (Nano-influencers).</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <MessageCircle className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">التفاعل الإيجابي</p>
                <p className="text-sm text-slate-400">تمثل المحادثات والتعليقات والرسائل الخاصة عصب التجربة الاجتماعية الحديثة للمستخدمين.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Meta (Facebook/Instagram)', country: 'USA', note: 'يسيطر على أكبر مجموعة من مستخدمي التواصل الاجتماعي عالمياً' },
    { name: 'YouTube', country: 'USA', note: 'الرائد في محتوى الفيديو الطويل وتوزيع إيرادات الإعلانات على المبدعين' },
    { name: 'TikTok', country: 'China', note: 'الأسرع نمواً والمهيمن على انتباه الجيل Z' },
    { name: 'LinkedIn', country: 'USA', note: 'الشبكة المهنية الرائدة عالمياً لربط الأعمال والوظائف' },
  ],

  definition: 'تشمل وسائل التواصل الاجتماعي التقنيات التفاعلية التي تسمح بإنشاء ومشاركة المعلومات والأفكار والمصالح عبر المجتمعات والشبكات الافتراضية.',

  industryInsights: [
    'آسيا هي القارة التي تضم أكبر جمهور لوسائل التواصل الاجتماعي بأكثر من 3 مليارات مستخدم',
    'من المتوقع أن تصبح الهند أكبر جمهور لوسائل التواصل الاجتماعي في العالم خلال السنوات القليلة القادمة',
    'التسويق عبر المؤثرين أصبح ركيزة أساسية لميزانيات الدعاية في قطاعات الجمال والأزياء والتكنولوجيا',
  ],

  tags: ['Social Media', 'Facebook', 'Instagram', 'TikTok', 'Influencer Marketing', 'UGC'],
};

const SocialMediaDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default SocialMediaDashboard;
