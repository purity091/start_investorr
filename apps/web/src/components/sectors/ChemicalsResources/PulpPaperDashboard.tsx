import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { FileBox, Globe, Recycle, TrendingUp, Newspaper } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'اللب والورق',
  titleEn: 'Pulp & Paper',
  subtitle: 'صناعة الورق المستدامة، التعبئة والتغليف، وتحديات التحول الرقمي',
  icon: FileBox,
  accent: 'emerald',
  pdfLabel: 'تقرير اللب والورق (PDF)',

  kpis: [
    { label: 'إنتاج اللب عالمياً', value: '194.75M', unit: 'طناً مترياً', icon: FileBox },
    { label: 'استهلاك اللب للورق', value: '194.4M', unit: 'طناً مترياً', icon: Globe },
    { label: 'إنتاج الورق المسترد', value: '239.45M', unit: 'طناً مترياً', icon: Recycle },
  ],

  topMarkets: [
    { 
      label: 'أكبر منتج ومستهلك عالمي', 
      country: 'الصين', 
      note: 'تقود العالم في إنتاج الورق والكرتون وتسيطر على أكثر من نصف الإنتاج الآسيوي.',
      icon: Globe
    },
    { 
      label: 'الريادة في ورق التغليف', 
      country: 'الولايات المتحدة', 
      note: 'تمتلك أضخم قدرة تصنيعية لورق التغليف المقوى بفضل قطاع التجارة الإلكترونية الضخم.',
      icon: FileBox
    },
    { 
      label: 'مركز الابتكار المستدام', 
      country: 'فنلندا / ألمانيا', 
      note: 'رواد عالميون في تقنيات اللب المستدام والورق عالي الجودة وحلول التغليف الصديقة للبيئة.',
      icon: Recycle
    }
  ],

  navItems: ['نظرة عامة', 'رؤى الصناعة', 'حجم السوق', 'قطاعات السوق', 'اتجاهات الصناعة', 'قادة الصناعة', 'تعريف الصناعة'],

  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      subtitle: 'Overview',
      content: (
        <div className="space-y-6 text-right">
          <p>
            منذ القرن التاسع عشر، أصبح اللب والمنتجات الورقية مكوناً أساسياً لمختلف الصناعات. بفضل رقمنة الأنشطة في كل من الصناعة والحياة اليومية، تأثر استهلاك الورق بشكل كبير، سواء كان ذلك للتوثيق أو لبساطة كوب قهوة للطلبات الخارجية.
          </p>
          <p>
            تعتبر صناعة الورق صناعة كثيفة الاستهلاك للطاقة وتعتمد بشكل كبير على المواد الخام، ومع ذلك فقد تبنت كفاءة الموارد والابتكار للانتقال نحو اقتصاد منخفض الكربون. وبسبب التحولات في سلوك المستهلك، شهدت الصناعة تحولات كبيرة، حيث نوعت العديد من الشركات منتجاتها الورقية الأخرى حيث تضرر الورق البياني سلباً من خلال الاتصالات الرقمية.
          </p>
        </div>
      ),
    },
    {
      id: 'market-size',
      title: 'حجم السوق العالمي',
      subtitle: 'Paper Production by Region',
      content: (
        <div className="space-y-6">
          <p>
            تتمتع صناعة اللب والورق بحضور ملحوظ في شرق آسيا وأوروبا ودول أمريكا الشمالية، حيث أنتجت آسيا أكثر من نصف المنتجات الورقية في العالم في عام 2023. تبرز الصين كمنتج ومستهلك ومصدر رائد للورق.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[
              { val: '53.89%', desc: 'آسيا' },
              { val: '22.35%', desc: 'الأمريكتان' },
              { val: '22.25%', desc: 'أوروبا' },
              { val: '1.5%', desc: 'أفريقيا وأوقيانوسيا' },
            ].map((stat) => (
              <div key={stat.desc} className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm">
                <p className="text-2xl font-black text-emerald-600">{stat.val}</p>
                <p className="text-sm font-semibold text-slate-500 mt-2">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'segments',
      title: 'قطاعات السوق',
      subtitle: 'Packaging Paper Leadership',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p>
            مع تناقص الحاجة إلى الورق الرسومي (مثل ورق الصحف والكتابة)، بدأ قطاع الورق بالتحول. يظل التغليف هو أكبر قطاع لاستهلاك الورق، حيث يُستخدم أكثر من نصف الورق المنتج كمواد تغليف.
          </p>
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 flex-1">
               <p className="text-3xl font-black text-white">251.37M</p>
               <p className="text-sm font-bold text-emerald-400">مليون طن متري: ورق التعبئة والتغليف</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 flex-1 opacity-60">
               <p className="text-3xl font-black text-white">94.1M</p>
               <p className="text-sm font-bold text-slate-400">مليون طن متري: الورق الرسومي</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'trends',
      title: 'اتجاهات الصناعة',
      subtitle: 'Sustainable Packaging Expansion',
      content: (
        <div className="space-y-6">
          <p>
            بسبب الزيادة في نزعة الاستهلاك عبر الإنترنت والحاجة إلى تغليف خفيف الوزن وقابل لإعادة الاستخدام، تتوسع صناعة التغليف المموج (Containerboard). ومن المتوقع أن يستمر هذا الاتجاه، مع تزايد الطلب على حلول التغليف التي تتيح النقل المستدام للبضائع.
          </p>
          <p>
            علاوة على ذلك، من المتوقع أن يشهد سوق منسوجات اللب (Pulp Textile) نمواً في السنوات القادمة حيث يعطي المستهلكون الأولوية بشكل متزايد للمنتجات الصديقة للبيئة.
          </p>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'Kimberly-Clark', country: 'الولايات المتحدة', note: 'المنتج الأكبر عالمياً للورق والألياف' },
    { name: 'Smurfit WestRock', country: 'عالمي', note: 'رائد في حلول التغليف الورقي' },
    { name: 'International Paper', country: 'الولايات المتحدة', note: 'ثاني أكبر شركة في الصناعة حسب القيمة السوقية' },
    { name: 'Stora Enso', country: 'فنلندا', note: 'تركيز كبير على المنتجات المتجددة' },
    { name: 'Oji Paper', country: 'اليابان', note: 'رائد الصناعة في السوق الآسيوي' },
    { name: 'UPM-Kymmene', country: 'فنلندا', note: 'متخصص في المنتجات القائمة على الألياف' },
  ],

  definition: `تقدم فئة اللب والورق بيانات عن منتجات اللب والورق، فضلاً عن إعادة تدوير الألياف ومعالجتها. ضمن هذا القطاع، نوفر معلومات حول حجم الإنتاج والاستهلاك والتجارة لمختلف درجات وأنواع اللب والمنتجات الورقية، بالإضافة إلى بيانات الشركات الرائدة.`,

  industryInsights: [
    'آسيا تسيطر على أكثر من نصف الإنتاج العالمي للمنتجات الورقية',
    'التحول من الورق الرسومي إلى ورق التغليف هو التوجه الاستراتيجي الأبرز',
    'الصين تتقدم عالمياً في إنتاج واستهلاك وتصدير الورق',
    'الورق المقوى المموج ينمو بفضل طفرة التجارة الإلكترونية العالمية',
  ],

  tags: ['Pulp', 'Paperboard', 'Packaging', 'Recycling', 'Graphic Paper', 'Containerboard'],
};

const PulpPaperDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default PulpPaperDashboard;
