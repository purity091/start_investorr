import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Trophy, Users, Tv, BarChart3, TrendingUp, Globe, BadgeDollarSign, ShieldCheck } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الرياضات الاحترافية',
  titleEn: 'Professional Sports Industry',
  subtitle: 'تحليل الدوريات الكبرى، حقوق البث التلفزيوني، عقود الرعاية، وقيم العلامات التجارية للأندية والرياضيين',
  icon: Trophy,
  accent: 'blue',
  pdfLabel: 'تقرير الرياضة الاحترافية (PDF)',

  kpis: [
    { label: 'أثمن فريق (كاوبويز)', value: '6.5', unit: 'مليار $', icon: BadgeDollarSign },
    { label: 'سوق الرعاية العالمي', value: '64.8', unit: 'مليار $', icon: TrendingUp },
    { label: 'أكثر حدث شعبية (الأولمبياد)', value: 'Summer', unit: 'Games', icon: Globe },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق رياضي تجاري', 
      country: 'الولايات المتحدة', 
      note: 'تهيمن على الصناعة عبر دوريات (NFL, NBA, MLB) التي تحقق أعلى حقوق بث وعقود رعاية في التاريخ.',
      icon: BadgeDollarSign
    },
    { 
      label: 'قلب صناعة كرة القدم', 
      country: 'المملكة المتحدة / أوروبا', 
      note: 'تضم الدوريات الخمس الكبرى (مثل البريميرليغ) وتعد المصدر الرئيسي لتصدير ثقافة كرة القدم عالمياً.',
      icon: Trophy
    },
    { 
      label: 'قطب الرياضة الناشئ والنمو المتسارع', 
      country: 'السعودية / الصين', 
      note: 'تشهدان استثمارات حكومية هائلة في جذب النجوم العالميين، استضافة البطولات الكبرى، وتطوير البنية التحتية الرياضية.',
      icon: TrendingUp
    }
  ],

  navItems: ['نظرة عامة', 'إيرادات الدوريات', 'حقوق البث والتقنية', 'القادة الإقليميون', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'الرياضة كصناعة بمليارات الدولارات',
      subtitle: 'Sports as a Global Business',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تحولت الرياضة الاحترافية إلى أعمال بمليارات الدولارات. يتهافت المشجعون بالآلاف لمشاهدة فرقهم المفضلة في ملاعب مثل الدوري الإنجليزي الممتاز أو NBA، بينما يتابع الملايين المباريات من منازلهم، مما يجعل السوق مربحاً للغاية للمذيعين والمعلنين.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Tv className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">قوة العلامات التجارية</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تسعى العلامات التجارية العالمية للاستفادة من أكبر أسماء الرياضيين لبيع منتجاتها عبر وسائل التواصل الاجتماعي والبث المباشر، مما يرفع قيم العقود التسويقية لمستويات خيالية.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'league-revenue',
      title: 'إيرادات الدوريات واللاعبين',
      subtitle: 'Leagues Revenue & Star Earnings',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تأتي معظم الإيرادات من الرعاية، السلع، وحقوق الإعلام. تتيح السيولة المالية الكبيرة للأندية إنفاق مبالغ ضخمة على أفضل اللاعبين، حيث يحصل النجوم على ملايين الدولارات مقابل خدماتهم وعقود الدعاية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">دوريات كرة القدم الأوربية</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تحقق الدوريات "الخمسة الكبرى" في أوروبا إيرادات بمليارات اليورو سنوياً، مع هيمنة الدوري الإنجليزي.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Users className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الحضور الجماهيري</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">يتصدر الدوري الألماني (Bundsliga) متوسط الحضور الجماهيري لكل مباراة في أوروبا، مما يعزز مبيعات التذاكر.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'tech-media',
      title: 'تكنولوجيا البث وتجربة المشجع',
      subtitle: 'Broadcasting & Fan Technology',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            غيرت التطورات التكنولوجية الأخيرة والمنصات الرقمية طريقة استهلاك الرياضة. المذيعون يدفعون مبالغ طائلة مقابل حقوق البث الحصرية، بينما يبحث المشجعون عن إحصائيات حية وتوصيل الطعام لمقاعدهم في الملاعب.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">منصات البث المباشر (OTT)</p>
                <p className="text-sm text-slate-400">يزداد توجه المشجعين نحو تطبيقات البث المتخصصة والبودكاست الرياضي بدلاً من التلفزيون التقليدي.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShieldCheck className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تحليل البيانات (Big Data)</p>
                <p className="text-sm text-slate-400">تستخدم الفرق البيانات الضخمة لتحسين أداء اللاعبين وتخصيص تجربة المشجعين داخل الملاعب الذكية.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Dallas Cowboys', country: 'USA', note: 'أثمن فريق رياضي في العالم مع تقييم يتجاوز 6.5 مليار دولار' },
    { name: 'National Football League (NFL)', country: 'USA', note: 'أغنى دوري رياضي من حيث حقوق البث وعقود الرعاية' },
    { name: 'Premier League', country: 'UK', note: 'أكثر دوري كرة قدم مشاهدة وتأثيراً اقتصادياً في العالم' },
    { name: 'FIFA', country: 'Global', note: 'تدير الحدث الأكثر شعبية، كأس العالم، وتعيد توزيع مليارات الدولارات سنوياً' },
  ],

  definition: 'تشمل صناعة الرياضة الاحترافية الدوريات الكبرى والنخبوية عالمياً، وتعتمد على إيرادات حقوق البث، مبيعات التذاكر، وعقود الرعاية التجارية الضخمة.',

  industryInsights: [
    'حقوق البث التلفزيوني تمثل أكثر من 50% من إيرادات الدوريات الكبرى مثل NFL و Premier League',
    'الرياضات الإلكترونية (eSports) بدأت تنافس الرياضات التقليدية في جذب المعلنين وجيل الشباب',
    'المسؤولية الاجتماعية والبيئية أصبحت جزءاً لا يتجزأ من استراتيجيات الأندية الرياضية الكبرى حالياً',
  ],

  tags: ['Professional Sports', 'NFL', 'Premier League', 'Broadcasting Rights', 'Sponsorship', 'Athlete Earning'],
};

const ProfessionalSportsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default ProfessionalSportsDashboard;
