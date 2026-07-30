import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Mic2, Music, Radio, Podcast, Headphones, BarChart3, TrendingUp, Users, DollarSign, Globe } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الصوتيات والموسيقى',
  titleEn: 'Audio & Music Industry',
  subtitle: 'تحليل بث الموسيقى الرقمية، البودكاست، الراديو العالمي، وعودة الازدهار للحفلات المباشرة',
  icon: Mic2,
  accent: 'indigo',
  pdfLabel: 'تقرير سوق الصوتيات العالمي (PDF)',

  kpis: [
    { label: 'حصة البث من إيرادات الموسيقى', value: '94%', icon: Music },
    { label: 'إيرادات البث في أمريكا', value: '15', unit: 'مليار $', icon: DollarSign },
    { label: 'مستخدمو سبوتيفاي النشطون', value: '226M+', icon: Users },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق موسيقي عالمي', 
      country: 'الولايات المتحدة', 
      note: 'السوق الأول من حيث إيرادات البث الرقمي والإنتاج الفني، وموطن كبرى منصات التكنولوجيا الصوتية.',
      icon: DollarSign
    },
    { 
      label: 'ثاني أكبر سوق موسيقي', 
      country: 'اليابان', 
      note: 'يتميز بمرونة فريدة حيث لا يزال يحتفظ بحصة كبيرة من المبيعات الفيزيائية (CDs) إلى جانب النمو الرقمي.',
      icon: Globe
    },
    { 
      label: 'رائد التصدير والمواهب', 
      country: 'المملكة المتحدة', 
      note: 'ثالث أكبر سوق عالمي وقائد في تصدير المواهب والإنتاج الموسيقي والابتكار في البودكاست.',
      icon: Mic2
    }
  ],

  navItems: ['نظرة عامة', 'البث الرقمي', 'الحفلات المباشرة', 'البودكاست والراديو', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'التحول الشامل نحو التجربة الرقمية',
      subtitle: 'The Digital Audio Revolution',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            شهد قطاع الصوتيات تطورات كبرى، حيث تراجعت حصة تحميل الموسيقى (Downloads) إلى 3% فقط في 2023، بينما يهيمن البث الرقمي (Streaming) بنسبة 67% والموسيقى الفيزيائية بـ 18%.
          </p>
          <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-4">
             <Headphones className="text-indigo-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-indigo-900 leading-tight">سيادة البث الرقمي</p>
                <p className="text-sm text-indigo-700/80 mt-2">
                  أصبح البث هو القاعدة الجديدة للاستهلاك العالمي، مع توقعات باستمرار تراجع الوسائط التقليدية والتحميلات المباشرة مقابل الاشتراك في المنصات.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'streaming',
      title: 'هيمنة منصات البث العالمية',
      subtitle: 'Streaming Platform Dominance',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تستحوذ Spotify على الحصة الأكبر من المشتركين عالمياً، متفوقة على Apple Music وTencent وYouTube، حيث حققت إيرادات بلغت 13.3 مليار يورو في عام 2022.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إيرادات البث</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">وصلت إيرادات بث الموسيقى في الولايات المتحدة إلى رقم قياسي قدره 15 مليار دولار في عام 2023.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Users className="text-indigo-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو المشتركين</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تستمر قواعد المشتركين في النمو عالمياً، مع تحول الأسواق الناشئة نحو نماذج الاشتراك المدفوع.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'live-music',
      title: 'عودة الحفلات المباشرة والفعاليات',
      subtitle: 'Live Music & Concert Rebound',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            شهد عام 2024 عودة قوية للموسيقى الحية والمهرجانات بعد انقطاع الجائحة، مع ظهور توجهات جديدة مثل بث الحفلات في دور السينما.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">إيرادات الجولات</p>
                <p className="text-sm text-slate-400">حققت مبيعات التذاكر في دور السينما للجولات الموسيقية ما يقرب من 500 مليون دولار في أوائل 2024.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Podcast className="text-indigo-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">عالم البودكاست</p>
                <p className="text-sm text-slate-400">ينمو سوق البودكاست في فرنسا وأوروبا بشكل متسارع، مع زيادة الإنفاق الإعلاني في هذا القطاع.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Spotify', country: 'Sweden', note: 'المتصدر العالمي في عدد المشتركين النشطين (226 مليون+)' },
    { name: 'Universal Music Group', country: 'Global', note: 'أكبر شركة إنتاج موسيقي بحصة سوقية رقمية هائلة' },
    { name: 'Live Nation', country: 'USA', note: 'الرائد العالمي في خدمات التذاكر وتنظيم الحفلات الموسيقية' },
    { name: 'Apple Music', country: 'USA', note: 'المنافس الأقوى في سوق البث المتكامل مع النظام البيئي لأجهزة أبل' },
  ],

  definition: 'يشمل قطاع الصوتيات كافة جوانب الترفيه المسموع، بما في ذلك إنتاج الموسيقى، خدمات البث، البودكاست، الراديو، وصناعة الحفلات والفعاليات المباشرة.',

  industryInsights: [
    'الموسيقى الفيزيائية (الفينيل) تشهد عودة مفاجئة بين هواة الجمع في الولايات المتحدة',
    'الذكاء الاصطناعي بدأ في تغيير طرق إنتاج وتخصيص قوائم الاستماع للمستخدمين',
    'البث المباشر للحفلات (Livestreaming) أصبح قناة إيرادات إضافية هامة للفنانين',
  ],

  tags: ['Audio Industry', 'Spotify', 'Music Streaming', 'Podcasts', 'Live Concerts'],
};

const AudioDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default AudioDashboard;
