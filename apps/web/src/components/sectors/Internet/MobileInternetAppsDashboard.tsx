import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Smartphone, AppWindow, Globe, Download, DollarSign, Activity, BarChart3, TrendingUp, ShieldCheck } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الإنترنت المحمول والتطبيقات',
  titleEn: 'Mobile Internet & Apps',
  subtitle: 'تحليل عدد مستخدمي الإنترنت المحمول، حصة حركة المرور العالمية، وتنزيلات التطبيقات والإنفاق عليها',
  icon: Smartphone,
  accent: 'blue',
  pdfLabel: 'تقرير تطبيقات الهاتف العالمي (PDF)',

  kpis: [
    { label: 'سكان الإنترنت المحمول عالمياً', value: '4.24', unit: 'مليار', icon: Globe },
    { label: 'حصة حركة الإنترنت المحمول', value: '54.67%', icon: Activity },
    { label: 'تنزيلات التطبيقات السنوية', value: '257', unit: 'مليار', icon: Download },
  ],

  topMarkets: [
    { 
      label: 'أقوى منظومة تطبيقات (Super Apps)', 
      country: 'الصين', 
      note: 'تمتلك أكثر أنظمة التطبيقات تقدماً في العالم (WeChat وTikTok)، وتتصدر في التجارة عبر المحمول والمدفوعات الرقمية.',
      icon: Smartphone
    },
    { 
      label: 'أضخم سوق لتنزيل التطبيقات', 
      country: 'الهند', 
      note: 'تعد السوق الأول عالمياً من حيث عدد تنزيلات التطبيقات واستهلاك البيانات المحمولة بفضل انتشار الهواتف الذكية الرخيصة.',
      icon: Download
    },
    { 
      label: 'رائد التمويل بالمحمول (Mobile Money)', 
      country: 'أفريقيا (كينيا/نيجيريا)', 
      note: 'تعد المختبر العالمي لخدمات الأموال المحمولة والشمول المالي الذي يعتمد كلياً على الهاتف بدلاً من البنوك التقليدية.',
      icon: TrendingUp
    }
  ],

  navItems: ['نظرة عامة', 'هيمنة المناطق', 'سوق التطبيقات', 'الخصوصية والأمن', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الهاتف المحمول: القاعدة الجديدة للاتصال',
      subtitle: 'Mobile First Reality',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            وصل استهلاك الهاتف المحمول إلى مستويات غير مسبوقة. بينما بدأت النمو المندفع خلال جائحة كورونا في الاستقرار، يظل الاتصال "أثناء التنقل" هو المعيار الجديد حتى خارج الأسواق التي كانت تعتمد على المحمول أولاً.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <TrendingUp className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">نمو مستقر واقتصاد مزدهر</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  على الرغم من تباطؤ وتيرة النمو مقارنة بعامي 2021-2022، إلا أن استخدام الأجهزة القابلة للارتداء والأجهزة اللوحية يستمر في تعزيز النظام البيئي للتطبيقات.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'regions',
      title: 'هيمنة أفريقيا وآسيا على حركة المرور',
      subtitle: 'Regional Mobile Traffic Share',
      content: (
        <div className="space-y-6 text-right">
          <p>
            بحلول عام 2024، شكل الإنترنت المحمول أكثر من 73.5% من إجمالي حركة المرور الويب في أفريقيا، و69.4% في آسيا، بفضل توفر الأجهزة بأسعار معقولة وتوسع بنية الشبكات.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">أفريقيا وآسيا</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تعتبر القارتان رائدتين في اعتماد الإنترنت المحمول كخيار أساسي ووحيد للكثير من السكان.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <DollarSign className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الإنفاق على التطبيقات</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">وصل الإنفاق الاستهلاكي على التطبيقات إلى 171 مليار دولار في عام 2023، مع عودة اتجاهات النمو الطبيعية.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'platforms',
      title: 'نظام التشغيل: صراع العمالقة',
      subtitle: 'OS Market Dynamics (Android vs iOS)',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يسيطر أندرويد على حوالي 71% من السوق العالمي بفضل انتشاره في الأجهزة الأرخص، بينما يحتفظ iOS بالربحية العالية في فئات الهواتف المتميزة.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <AppWindow className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">سوق التطبيقات (App Stores)</p>
                <p className="text-sm text-slate-400">يظل Apple App Store وGoogle Play Store هما المتحكمان الرئيسيان في توزيع البرمجيات العالمية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShieldCheck className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الأمن الذكي</p>
                <p className="text-sm text-slate-400">تتصاعد مخاطر "التصيد الاحتيالي عبر الرسائل" (Smishing)، حيث استهدفت 76% من المنظمات في السنوات الأخيرة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Apple', country: 'USA', note: 'المتحكم في نظام iOS والأكثر ربحية في سوق التطبيقات' },
    { name: 'Google (Android)', country: 'USA', note: 'نظام التشغيل المهيمن عالمياً بنسبة تزيد عن 70%' },
    { name: 'Tencent', country: 'China', note: 'قائد تطبيقات "السوبر آب" (WeChat) والألعاب المحمولة' },
    { name: 'ByteDance (TikTok)', country: 'China', note: 'صاحب التطبيق الأكثر تنزيلاً وتأثيراً في العقد الأخير' },
  ],

  definition: 'يشمل قطاع الإنترنت المحمول جميع الأنشطة والخدمات المتاحة عبر الأجهزة المحمولة، وبرمجيات التطبيقات (Apps) التي تتيح الوظائف المتقدمة للمستخدمين على هواتفهم وأجهزتهم اللوحية.',

  industryInsights: [
    'التطبيقات الفائقة (Super Apps) تجمع بين المحفظة الرقمية والتجارة والاتصالات في واجهة واحدة',
    'الذكاء الاصطناعي سيوفر مستقبلاً تطبيقات أكثر شخصية وتنبؤاً لاحتياجات المستخدمين',
    'أفريقيا هي القائد العالمي في استخدام "الأموال المحمولة" (Mobile Money) والخدمات البنكية الرقمية',
  ],

  tags: ['Mobile Internet', 'App Downloads', 'Android', 'iOS', 'In-App Spending'],
};

const MobileInternetAppsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default MobileInternetAppsDashboard;
