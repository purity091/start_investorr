import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Plane, Globe, BarChart3, TrendingUp, ShieldCheck, Smartphone, Map, Ship } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'سياحة الترفيه والاستجمام',
  titleEn: 'Leisure Travel Industry',
  subtitle: 'تحليل سياحة العطلات، سوق وكالات السفر عبر الإنترنت (OTA)، السفن السياحية، وأكثر الوجهات زيارة عالمياً',
  icon: Plane,
  accent: 'blue',
  pdfLabel: 'تقرير سياحة الترفيه (PDF)',

  kpis: [
    { label: 'حصة الترفيه من السياحة', value: '80', unit: '%', icon: Globe },
    { label: 'الوجهة الأكثر زيارة (France)', value: '1', unit: 'Ranking', icon: Map },
    { label: 'رائد وكالات السفر (Booking)', value: '1', unit: 'Market Leader', icon: ShieldCheck },
  ],

  topMarkets: [
    { 
      label: 'الوجهة الأكثر زيارة في العالم', 
      country: 'فرنسا', 
      note: 'تحافظ على صدارة الوجهات السياحية العالمية بفضل جاذبيتها الثقافية وتنوعها السياحي الفريد.',
      icon: Map
    },
    { 
      label: 'عملاق السياحة الأوروبية', 
      country: 'إسبانيا', 
      note: 'تعد وجهة الترفيه الأولى في أوروبا لمن يبحث عن الشمس والشواطئ والسياحة الحضرية المستمرة.',
      icon: Globe
    },
    { 
      label: 'رائد الإيرادات السياحية', 
      country: 'الولايات المتحدة', 
      note: 'تحقق أعلى دخل من السياحة الدولية وتتمتع بسوق سياحة داخلية هو الأكبر عالمياً.',
      icon: TrendingUp
    }
  ],

  navItems: ['نظرة عامة', 'وكالات السفر (OTAs)', 'السفن السياحية', 'القادة والوجهات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'المحرك الأكبر للاقتصاد السياحي',
      subtitle: 'The Powerhouse of Global Tourism',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تمثل سياحة الترفيه القطاع الأهم في السياحة العالمية بإنفاق يشكل 80% من الإجمالي. في دول مثل الصين، تصل هذه النسبة إلى 80% من إجمالي الإنفاق السياحي. وبفضل التعافي التدريجي، تستعيد سياحة العطلات زخمها مع بروز الوجهات الأوروبية كأكثر المناطق جذباً للمسافرين الدوليين.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Smartphone className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">هيمنة تطبيقات السفر</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تمثل القنوات الرقمية أكثر من ثلثي إيرادات السياحة العالمية، حيث يفضل المسافرون الحجز المباشر عبر تطبيقات الجوال التي توفر عروضاً فورية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'otas-market',
      title: 'عمالقة وكالات السفر (OTAs)',
      subtitle: 'Online Travel Agencies Domination',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تسيطر شركات مثل Booking Holdings و Expedia Group على الحصة الكبرى من سوق السفر عبر الإنترنت. بفضل امتلاكها لعلامات تجارية متعددة (مثل Agoda و Hotels.com)، تمكنت هذه الشركات من التعافي السريع وجذب المسافرين الباحثين عن أفضل الأسعار والمرونة في الحجز.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نمو إيرادات تطبيقات السفر</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">من المتوقع أن تصل إيرادات تطبيقات السفر العالمية إلى ملياري دولار بحلول 2027، مع تركز 70% منها في أمريكا والصين.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Ship className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">انتعاش المسافرين عبر البحار</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">عادت أرقام ركاب السفن السياحية لمستويات ما قبل الجائحة، رغم التحديات المالية المرتبطة بالاستثمار في سفن جديدة ونظيفة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'الوجهات والتوجهات العالمية',
      subtitle: 'Global Destinations & Regional Trends',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تعتبر أوروبا الوجهة الأكثر زيارة في العالم، خاصة منطقة البحر الأبيض المتوسط. ومع عودة انفتاح أسواق مثل الصين، يُتوقع أن يتغير ميزان القوى السياحي مرة أخرى ليعيد المنطقة الآسيوية لمكانتها كأكبر مصدر لسياح الترفيه دولياً.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Map className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">فرنسا: المتصدر الدائم</p>
                <p className="text-sm text-slate-400">تحافظ فرنسا على موقعها كأكثر الدول استقبالاً للسياح الدوليين، مدعومة بجاذبية ثقافية وسياحية فريدة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">سياحة الطرود (Package Holidays)</p>
                <p className="text-sm text-slate-400">شهد هذا القطاع نمواً لافتاً حيث يفضل المسافرون الحلول المتكاملة التي تشمل الطيران والإقامة والأنشطة في حزمة واحدة.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Booking Holdings', country: 'USA/Global', note: 'المتصدر العالمي في سوق السفر عبر الإنترنت وتمتلك علامات مثل Booking.com و Agoda' },
    { name: 'Expedia Group', country: 'USA', note: 'ثاني أكبر لاعب في سوق الحجز عبر الإنترنت وتمتلك Vrbo و Hotels.com' },
    { name: 'Carnival Corporation', country: 'USA/Global', note: 'أكبر شركة لتشغيل السفن السياحية في العالم بأسطول ضخم يخدم كافة القارات' },
    { name: 'Trip.com Group', country: 'China', note: 'رائد وكالات السفر عبر الإنترنت في آسيا والمحرك الرئيسي للسياحة الصينية الصادرة' },
  ],

  definition: 'سياحة الترفيه تشمل الرحلات المتخذة للاسترخاء والمتعة، وتغطي السفن السياحية، الوجهات السياحية، منصات الحجز، ووكلاء السفر.',

  industryInsights: [
    'تأثير منصات التواصل الاجتماعي (TikTok/Instagram) أصبح العامل الأول في اختيار الوجهات السياحية للجيل الجديد',
    'السياحة الفاخرة تشهد نمواً في الطلب على التجارب الحصرية والبعيدة عن الحشود (Overtourism)',
    'دمج الواقع الافتراضي (VR) في تسويق الرحلات يسمح للمسافرين بمعاينة الفنادق والوجهات قبل الحجز الفعلي',
  ],

  tags: ['Leisure Travel', 'Tourism', 'Booking.com', 'Expedia', 'Cruises', 'Online Travel', 'France', 'Vacations'],
};

const LeisureTravelDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default LeisureTravelDashboard;
