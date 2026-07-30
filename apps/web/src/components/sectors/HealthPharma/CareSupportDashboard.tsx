import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Heart, Home, Users, Activity, ShieldCheck, ClipboardCheck, TrendingUp, HandHeart } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الرعاية والدعم',
  titleEn: 'Care & Support Sector',
  subtitle: 'تحليل خدمات الرعاية المنزلية، دعم كبار السن، وديناميكيات الرعاية غير الرسمية (Informal Care)',
  icon: Heart,
  accent: 'rose',
  pdfLabel: 'تقرير الرعاية والدعم العالمي (PDF)',

  kpis: [
    { label: 'نسبة انتشار الإعاقة في أمريكا', value: '13%', unit: 'من السكان', icon: Heart },
    { label: 'كبار السن (فوق 75) في أمريكا', value: '46%', unit: 'يعانون من إعاقة', icon: Users },
    { label: 'توقعات المسنين بحلول 2050', value: '22%', unit: 'من إجمالي السكان', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'سوق الرعاية المدفوعة الأكبر', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أضخم استثمارات في خدمات الرعاية المنزلية الرسمية وتقنيات "الشيخوخة في المكان" (Aging in Place).',
      icon: Home
    },
    { 
      label: 'رائد الاقتصاد الفضي (Silver Economy)', 
      country: 'اليابان', 
      note: 'تمتلك أسرع مجتمع يشيخ في العالم، مما جعلها المختبر العالمي لابتكارات رعاية المسنين والتمريض الروبوتي.',
      icon: TrendingUp
    },
    { 
      label: 'نموذج الرعاية الاجتماعية المنظم', 
      country: 'المملكة المتحدة', 
      note: 'تتميز بنظام رعاية اجتماعية متكامل وسوق متنامي لخدمات الرعاية المنزلية الخاصة (Domiciliary Care).',
      icon: Users
    }
  ],

  navItems: ['نظرة عامة', 'الديموغرافية', 'أنماط الرعاية', 'التحديات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة على خدمات الرعاية',
      subtitle: 'Sector Overview',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يتم تقديم خدمات الرعاية والدعم بعدة طرق مختلفة وتعمل تحت بيئات رسمية وغير رسمية متنوعة. بينما توفر المستشفيات والأطباء صورة واضحة للنظام الصحي، فإن الرعاية المقدمة خارج هذه الخطوط يصعب تقييمها دائماً.
          </p>
          <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-4">
             <HandHeart className="text-rose-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-rose-900 leading-tight">الفئات المستهدفة بالرعاية</p>
                <p className="text-sm text-rose-700/80 mt-2">
                  تُقدم الرعاية لمجموعة واسعة من الأفراد، خاصة أولئك الذين يحتاجون للمساعدة في حياتهم اليومية بسبب الشيخوخة، أو الأمراض المزمنة، أو الاضطرابات العقلية، أو الإعاقة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'demographics',
      title: 'الديموغرافية والاحتياجات المتزايدة',
      subtitle: 'Disability & Aging Demographics',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تعتبر قضية الشيخوخة والإعاقة المحرك الرئيسي لنمو هذا القطاع، مع تزايد الضغط على أنظمة الرعاية المنزلية والمؤسسية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Users className="text-rose-600 mb-2" size={20} />
                <p className="font-black text-slate-900">توقعات 2050</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">من المتوقع أن تصل نسبة السكان الذين تزيد أعمارهم عن 65 عاماً في الولايات المتحدة إلى 22% بحلول عام 2050.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <ShieldCheck className="text-rose-600 mb-2" size={20} />
                <p className="font-black text-slate-900">انتشار الإعاقة</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تزداد احتمالية الإعاقة بشكل كبير مع تقدم العمر، حيث يعاني ما يقرب من نصف الأفراد فوق سن 75 عاماً من نوع من الإعاقة.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'care-types',
      title: 'بيئات تقديم الرعاية',
      subtitle: 'Care Settings & Providers',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            يمكن تقديم الرعاية في بيئات متنوعة تتراوح من مرافق الرعاية الصحية المتخصصة إلى المنازل الخاصة، ويشمل مقدمو الرعاية طيفاً واسعاً من المهنيين والمتطوعين.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Home className="text-rose-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الرعاية المنزلية والمجتمعية</p>
                <p className="text-sm text-slate-400">تشمل المساعدة في الأنشطة اليومية (ADLs) ودعم المعيشة المستقلة في ممتلكات الأفراد الخاصة.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ClipboardCheck className="text-rose-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">الرعاية المؤسسية</p>
                <p className="text-sm text-slate-400">تشمل دور رعاية المسنين المتخصصة، ومرافق المعيشة المدعومة، ومستشفيات التأهيل الطويل الأمد.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Kindred Healthcare', country: 'USA', note: 'رائد في خدمات ما بعد العلاج الحاد والرعاية طويلة الأمد' },
    { name: 'Home Instead', country: 'International', note: 'أكبر شبكة لمنح امتيازات الرعاية المنزلية لغير الطبيين' },
    { name: 'Orpea Group', country: 'Europe', note: 'من قادة خدمات رعاية المسنين والمصحات في أوروبا' },
  ],

  definition: 'يشمل قطاع الرعاية والدعم كافة الخدمات والمنتجات المصممة لمساعدة الأفراد ذوي الاحتياجات الخاصة، سواء بسبب العمر أو المرض أو الإعاقة، ويغطي الرعاية الرسمية (المدفوعة) وغير الرسمية (من قبل العائلة والأصدقاء).',

  industryInsights: [
    'التوجه نحو "الشيخوخة في المكان" (Aging in Place) يزيد الطلب على تقنيات الرعاية المنزلية الذكية',
    'الرعاية غير الرسمية (Informal Care) تمثل ركيزة أساسية ولكنها تواجه تحديات استمرارية كبرى',
    'هناك نقص عالمي متزايد في القوى العاملة المؤهلة لتقديم خدمات الرعاية التمريضية والمنزلية',
  ],

  tags: ['Caregiving', 'Aging', 'Disability Support', 'Home Care', 'Long-term Care'],
};

const CareSupportDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default CareSupportDashboard;
