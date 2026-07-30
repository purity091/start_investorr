import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Landmark, Users, Shield, Globe, Award, TrendingUp, Scale } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'السياسة والحكومة',
  titleEn: 'Politics & Government',
  subtitle: 'تحليل النظم السياسية، التوظيف الحكومي، والتحولات الجيوسياسية في القرن الحادي والعشرين',
  icon: Landmark,
  accent: 'slate',
  pdfLabel: 'تقرير الحوكمة والسياسة (PDF)',

  kpis: [
    { label: 'مستوى الثقة في الحكومة (الصين)', value: '89%', unit: 'نسبة الثقة', icon: Users },
    { label: 'موظفي الحكومة (أمريكا)', value: '18.28M', unit: 'مليون موظف', icon: Landmark },
    { label: 'أعلى إنفاق عسكري (% من الناتج)', value: 'Saudi Arabia', unit: 'المملكة العربية السعودية', icon: Shield },
  ],

  topMarkets: [
    { 
      label: 'القوة العالمية المهيمنة', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أكبر نفوذ عسكري ودبلوماسي ومالي عالمي، وتقود التحالفات الدولية الكبرى.',
      icon: Shield
    },
    { 
      label: 'القوة الصاعدة والمؤثرة', 
      country: 'الصين', 
      note: 'تتمتع بنظام سياسي مركزي قوي ونفوذ اقتصادي متزايد في آسيا وأفريقيا والشرق الأوسط.',
      icon: Globe
    },
    { 
      label: 'التكتل السياسي الموحد', 
      country: 'الاتحاد الأوروبي', 
      note: 'أكبر كتلة سياسية واقتصادية تتبنى سياسات موحدة في التجارة والبيئة والحوق المدنية.',
      icon: Landmark
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'السياسة الأمريكية', 'الشأن الصيني', 'التحول الأوروبي', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            في العقود الأولى من القرن الحادي والعشرين، تم تعريف السياسة والحكومات في جميع أنحاء العالم وتحديها من خلال عدة تطورات رئيسية. أدى نمو الوصول إلى الإنترنت، وخاصة وسائل التواصل الاجتماعي، إلى خلق منتديات جديدة تماماً للمناقشة والمناظرة.
          </p>
          <p>
            شهدت العديد من المجموعات والأيديولوجيات السياسية الراسخة تراجعاً في سلطتها، مع صعود "الغرباء السياسيين" على موجة من السخط تجاه النظام الحالي. بينما يسعى هؤلاء القادة الجدد غالباً إلى تغيير مسار العولمة، فمن المرجح أن تكون التهديدات القادمة عالمية بطبيعتها وتتطلب استجابة منسقة.
          </p>
        </div>
      ),
    },
    {
      id: 'us-politics',
      title: 'السياسة في الولايات المتحدة',
      subtitle: 'United States Politics',
      content: (
        <div className="space-y-6 text-right">
          <p>
            بعد انتخابات التجديد النصفي لعام 2022، انقسم الكونجرس الأمريكي بين مجلس نواب يسيطر عليه الجمهوريون ومجلس شيوخ يسيطر عليه الديمقراطيون. تعكس الحكومة المقسمة مجتمعاً منقسماً في أمريكا.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
            <div className="flex-1 space-y-4">
              <p>
                تبدو آفاق التعاون بين الحزبين ضئيلة في المستقبل القريب. قد تكون الانتخابات الرئاسية القادمة بمثابة "مباراة إعادة" لانتخابات عام 2020، حيث يبرز جو بايدن ودونالد ترامب كمرشحين محتملين.
              </p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shrink-0 w-full md:w-64">
               <Scale size={40} className="text-slate-600 mb-4" />
               <p className="text-xl font-black text-slate-900 leading-tight">الكونجرس المنقسم</p>
               <p className="text-xs text-slate-500 mt-1 uppercase font-bold">2022 Midterm Results</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'china-politics',
      title: 'الصين: ولاية ثالثة لشي جين بينغ',
      subtitle: 'China: Xi’s Third Term',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            بعد تأمين ولاية ثالثة تاريخية، من المقرر أن يظل شي جين بينغ رئيساً للصين حتى عام 2027 على الأقل. ومع ذلك، تواجه الصين العديد من التحديات في بداية ولايته الثالثة.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-2xl font-black text-slate-400">98M+</p>
              <p className="text-sm text-slate-300 mt-1 uppercase font-bold">عضو في الحزب الشيوعي</p>
              <p className="text-xs text-slate-500 mt-2">تسارع كبير في عضوية الحزب بين عامي 2014 و2024.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
               <p className="text-2xl font-black text-slate-400">ثبات داخلي</p>
               <p className="text-sm text-slate-300 mt-1 font-bold">تزايد الحضور الدولي</p>
               <p className="text-xs text-slate-500 mt-2">طالما يُنظر إلى الحزب على أنه يوفر الاستقرار، سيظل يحظى بشعبية كبيرة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'europe-politics',
      title: 'أوروبا: الحرب تعيد تشكيل المشهد',
      subtitle: 'Europe: War Reshaping Politics',
      content: (
        <div className="space-y-6 text-right">
          <p>
            كانت التحولات السياسية الأوروبية طوال عام 2010 مضطربة، حددتها الأزمات الاقتصادية والإرهاب والشعبوية. ومع ذلك، من المرجح أن تترك الحرب في أوكرانيا علامة أعمق بكثير.
          </p>
          <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-200">
             <Globe className="text-slate-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-slate-900">انضمام دول جديدة للناتو</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  اختارت دول كانت محايدة سابقاً مثل <strong>السويد وفنلندا</strong> الانضمام إلى حلف الناتو، بينما قطع السياسيون الأوروبيون العلاقات الاقتصادية والدبلوماسية مع روسيا.
                </p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'جو بايدن', country: 'United States', note: 'رئيس الولايات المتحدة الـ 46' },
    { name: 'شي جين بينغ', country: 'China', note: 'الأمين العام للحزب الشيوعي الصيني' },
    { name: 'أورسولا فون دير لاين', country: 'European Union', note: 'رئيسة المفوضية الأوروبية' },
    { name: 'فلاديمير بوتين', country: 'Russia', note: 'رئيس روسيا الاتحادية' },
    { name: 'محمد بن سلمان', country: 'Saudi Arabia', note: 'ولي العهد ورئيس مجلس الوزراء' },
  ],

  definition: `يغطي قسم "السياسة والحكومة" في ستاتيستا إحصاءات حول الموضوع الواسع للسياسة، بالإضافة إلى البيانات المتعلقة بالتوظيف الحكومي والمالية العامة، والأمن القومي، والسياسات، والرعاية الاجتماعية.`,

  industryInsights: [
    'الانتخابات الرئاسية الأمريكية القادمة 2024 ستكون نقطة تحول محورية في السياسة العالمية',
    'الحزب الشيوعي الصيني (CCP) يواصل نموه كأكبر هيئة سياسية مهيمنة عالمياً من حيث عدد الأعضاء',
    'الحرب في أوكرانيا أعادت إحياء حلف الناتو ودفعت أوروبا نحو الوحدة الدفاعية',
    'الإنفاق العسكري العالمي يشهد ارتفاعاً تاريخياً نتيجة التوترات الجيوسياسية المتزايدة',
  ],

  tags: ['Politics', 'Government', 'Elections', 'EU', 'NATO', 'Public Finance', 'Global Policy'],
};

const PoliticsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PoliticsDashboard;
