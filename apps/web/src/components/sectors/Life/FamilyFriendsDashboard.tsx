import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Users, Heart, Home, Baby, Smile, BarChart3, TrendingUp, HandHeart, UserCheck } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'العائلة والأصدقاء',
  titleEn: 'Family & Friends',
  subtitle: 'تحليل أواصر العلاقات الاجتماعية، هيكلية الأسرة الحديثة، أهمية الصداقة، والدعم العاطفي والمالي',
  icon: Users,
  accent: 'rose',
  pdfLabel: 'تقرير الروابط الاجتماعية (PDF)',

  kpis: [
    { label: 'متوسط أفراد الأسرة (أمريكا)', value: '3', unit: 'أشخاص', icon: Home },
    { label: 'جوهر الصداقة (ألمانيا)', value: 'Support', unit: 'التواجد وقت الحاجة', icon: HandHeart },
    { label: 'مسؤولية الكسب (الهند)', value: 'Together', unit: 'كلا الزوجين', icon: UserCheck },
  ],

  navItems: ['نظرة عامة', 'الصداقات', 'العلاقات الأسرية', 'الدعم والنمو', 'الالتحام الاجتماعي'],

  sections: [
    {
      id: 'overview',
      title: 'الروابط الأقوى في حياتنا',
      subtitle: 'Critical Social Bonds',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            تعتبر علاقاتنا مع عائلاتنا وأصدقائنا من أهم العلاقات التي نبنيها. يميل البشر إلى اللجوء لعائلاتهم وأصدقائهم للحصول على الدعم والحب والقبول، ويمكن لمجموعات الأصدقاء أن تصبح "عائلة ثانية" للكثيرين.
          </p>
          <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-4">
             <Heart className="text-rose-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-rose-900 leading-tight">وحدات البناء المجتمعية</p>
                <p className="text-sm text-rose-700/80 mt-2">
                  تعتبر الأسرة هي اللبنة الأساسية للمجتمع، وهي التي توفر السياق الأول لفهم العالم من حولنا وتؤثر بشكل مباشر على نظرتنا للحياة وطرق تفكيرنا.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'friendship',
      title: 'الصداقة: العائلة التي تختارها',
      subtitle: 'Choosing Your Second Family',
      content: (
        <div className="space-y-6 text-right">
          <p>
            يعتبر الكثيرون أصدقاءهم بمثابة عائلة ثانية، وقد يكون الاتصال بهم أكثر تكراراً من أفراد العائلة أنفسهم. توفر مجموعات الأصدقاء بيئة داعمة ونظرة متنوعة للأمور.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Smile className="text-rose-600 mb-2" size={20} />
                <p className="font-black text-slate-900">تفاعل اجتماعي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">توفر الصداقات فرصاً للنمو الشخصي وتنوعاً في الآراء قد لا تتوفر دائماً داخل الإطار العائلي الضيق.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-rose-600 mb-2" size={20} />
                <p className="font-black text-slate-900">الصداقة في العمل</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تؤدي الروابط القوية بين الزملاء إلى بيئة عمل أكثر إنتاجية واستقراراً عاطفياً للموظفين.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'family-structure',
      title: 'تحولات هيكلية الأسرة',
      subtitle: 'Modern Family Unit Trends',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            شهدت أحجام الأسر وأنواعها تحولات كبيرة في العقود الأخيرة، من الأسر الممتدة إلى الأسر النووية والأسر ذات الوالد الوحيد.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Baby className="text-rose-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">تراجع معدلات الخصوبة</p>
                <p className="text-sm text-slate-400">تشهد مناطق مثل شرق آسيا تراجعاً حاداً في حجم الأسر، مما يغير من طبيعة الرعاية الاجتماعية مستقبلاً.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Home className="text-rose-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الاستقلال المالي</p>
                <p className="text-sm text-slate-400">هناك توجه عالمي نحو المساواة في مسؤولية الكسب المالي بين الزوجين لضمان استقرار الأسرة الاقتصادي.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Multifamily Housing', country: 'Global', note: 'نمط المعيشة السائد في المدن الكبرى لتعزيز الروابط المجتمعية' },
    { name: 'Parenting Organizations', country: 'International', note: 'المؤسسات التي تعنى بتطوير مهارات التربية الحديثة' },
    { name: 'Divorce Support Systems', country: 'Global', note: 'الخدمات التي تدعم إعادة تشكيل الأسر بعد الانفصال' },
  ],

  definition: 'يشمل قطاع العائلة والأصدقاء كافة جوانب العلاقات الشخصية والاجتماعية، وطرق التربية، والاختلافات الجيلية، والتقاليد التي تربط الأفراد ببعضهم البعض.',

  industryInsights: [
    'التكنولوجيا والرسائل الفورية عززت وتيرة التواصل مع الأصدقاء ولكنها غيرت من طبيعة اللقاءات الشخصية',
    'يُنظر إلى "العائلة المختارة" (الأصدقاء) كركيزة أساسية للصحة النفسية في المجتمعات الحديثة',
    'الاستثمار في وقت العائلة (Quality Time) أصبح ترفاً يُسعى إليه في ظل ضغوط الحياة العملية المتزايدة',
  ],

  tags: ['Family', 'Friendship', 'Parenting', 'Relationships', 'Lifestyle'],
};

const FamilyFriendsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default FamilyFriendsDashboard;
