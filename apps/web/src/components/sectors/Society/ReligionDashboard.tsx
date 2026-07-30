import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Landmark, Globe, TrendingUp, Heart, BarChart3, Users, Star, Coins } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الأديان والمعتقدات',
  titleEn: 'Religion & Belief Systems',
  subtitle: 'تحليل الانتماءات الدينية العالمية، الأثر الاقتصادي للسياحة الدينية، واتجاهات التنوع العقائدي',
  icon: Landmark,
  accent: 'blue',
  pdfLabel: 'تقرير الأديان العالمي (PDF)',

  kpis: [
    { label: 'أكبر ديانة (المسيحية)', value: '2.4', unit: 'مليار', icon: Globe },
    { label: 'أسرع ديانة نمواً (الإسلام)', value: '1.9', unit: 'مليار', icon: TrendingUp },
    { label: 'سوق الحلال العالمي', value: '2.3', unit: 'تريليون $', icon: Coins },
  ],

  topMarkets: [
    { 
      label: 'قلب العالم الإسلامي', 
      country: 'المملكة العربية السعودية', 
      note: 'تضم أهم المقدسات الإسلامية وتدير أضخم موسم سياحة دينية (الحج والعمرة) في العالم بأثر اقتصادي ضخم.',
      icon: Landmark
    },
    { 
      label: 'المركز الروحي للكاثوليك', 
      country: 'الفاتيكان / إيطاليا', 
      note: 'المقر البابوي للكنيسة الكاثوليكية، ويعد قوة دفع دينية وثقافية وسياحية هائلة للملايين حول العالم.',
      icon: Star
    },
    { 
      label: 'أضخم تجمع هندوسي', 
      country: 'الهند', 
      note: 'موطن لأكبر شريحة هندوسية وتتميز بتأثير عميق للثقافة الدينية على الاقتصاد الاستهلاكي والسياسة المحلية.',
      icon: Users
    }
  ],

  navItems: ['نظرة عامة', 'الانتماءات العالمية', 'الاقتصاد الديني', 'القيم والعمل الخيري', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'البعد الروحي والمجتمعي',
      subtitle: 'Spiritual & Social Architecture',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تشكل الأديان والمعتقدات عنصراً جوهرياً في هوية معظم سكان العالم. تؤثر هذه المعتقدات على السلوك الاستهلاكي، القوانين الاجتماعية، والروابط الدولية. تظهر البيانات أن العالم لا يزال متديناً إلى حد كبير، رغم تزايد اتجاهات العلمانية في بعض المناطق الغربية.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
            <Heart className="text-blue-600 shrink-0 mt-1" size={24} />
            <div>
              <p className="font-bold text-blue-900 leading-tight">الأثر الاجتماعي للتبرعات</p>
              <p className="text-sm text-blue-700/80 mt-2">
                تعد المؤسسات الدينية من أكبر المحركات للعمل الخيري والمنظمات غير الربحية عالمياً، حيث تضخ مئات المليارات في التعليم والرعاية الصحية الموجهة للفقراء.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'demographics',
      title: 'الخرائط السكانية والنمو',
      subtitle: 'Global Religious Demographics',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتوقع الدراسات الديموغرافية (مثل تقارير Pew Research) تحولات كبرى؛ حيث يتوقع أن يتساوى عدد المسلمين والمسيحيين بحلول عام 2050، مع تركيز ديموغرافي هائل في أفريقيا وجنوب آسيا.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">نفوذ الهندوسية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">بأكثر من مليار معتنق، تشكل الهندوسية القوة الروحية الثالثة عالمياً مع تركز جغرافي قوي في شبه القارة الهندية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Globe className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">البوذية والشرق الأقصى</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تستمر البوذية في التأثير بعمق على ثقافة وقيم الأعمال في دول شرق آسيا وجنوب شرقها.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'religious-economy',
      title: 'الاقتصاد الديني والسياحة',
      subtitle: 'Faith-Based Economy & Tourism',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            السياحة الدينية هي قطاع بمليارات الدولارات. مدن مثل مكة، روما، والقدس تستقبل ملايين الزوار سنوياً، مما يدعم قطاعات الطيران، الفنادق، والتجزئة المحلية.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Coins className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">قطاع "الحلال" و "الكوشر"</p>
                <p className="text-sm text-slate-400">ينمو الإنفاق على الغذاء والتمويل المتوافق مع الشريعة بشكل متسارع، مع دخول شركات عالمية كبرى لهذا السوق المربح.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Landmark className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">العمارة الدينية والمتاحف</p>
                <p className="text-sm text-slate-400">تمثل الكاتدرائيات والمساجد التاريخية والمعابد أهم عوامل الجذب السياحي الثقافي في العالم.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Organization of Islamic Cooperation', country: 'Global', note: 'المنظمة التي تجمع الدول الإسلامية وتنسق السياسات المشتركة' },
    { name: 'The Vatican', country: 'Vatican City', note: 'الدولة والقيادة الروحية للكنيسة الرومانية الكاثوليكية عالمياً' },
    { name: 'Pew Research Center (Religion)', country: 'USA', note: 'رائد عالمي في توفير البيانات والإحصاءات الديموغرافية حول الأديان' },
    { name: 'Ministry of Hajj and Umrah', country: 'Saudi Arabia', note: 'تدير أكبر حركة حشود بشرية دورية في العالم لخدمة الحجاج' },
  ],

  definition: 'تشمل هذه الفئة البيانات المتعلقة بالانتماءات الدينية، ممارسات العبادة، الأثر الاقتصادي للمؤسسات الدينية، وحركات السكان المرتبطة بالمعتقدات.',

  industryInsights: [
    'الشباب في الدول النامية هم الأكثر تديناً، مما يضمن استمرار نمو الانتماءات الدينية لعقود قادمة',
    'التمويل الإسلامي (Islamic Finance) أصبح جزءاً معترفاً به في النظام المالي العالمي بأصول تريليونية',
    'القيم الدينية تلعب دوراً متزايداً في "الاستثمار المسؤول" (ESG) من حيث المعايير الأخلاقية والاجتماعية',
  ],

  tags: ['Religion', 'Islam', 'Christianity', 'Hinduism', 'Halal Economy', 'Religious Tourism', 'Demographics'],
};

const ReligionDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ReligionDashboard;
