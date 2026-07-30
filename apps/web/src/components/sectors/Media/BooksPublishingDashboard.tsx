import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { BookOpen, Newspaper, Book, Headphones, Globe, BarChart3, TrendingUp, DollarSign, Tablet } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'الكتب والنشر',
  titleEn: 'Books & Publishing Industry',
  subtitle: 'تحليل سوق الكتب الورقية والإلكترونية، الصحف والمجلات، وصعود الكتب الصوتية كأسرع القطاعات نمواً',
  icon: BookOpen,
  accent: 'emerald',
  pdfLabel: 'تقرير سوق النشر العالمي (PDF)',

  kpis: [
    { label: 'إجمالي إيرادات نشر الكتب', value: '122', unit: 'مليار $', icon: Book },
    { label: 'إيرادات الصحف عالمياً', value: '52.1', unit: 'مليار $', icon: Newspaper },
    { label: 'نشر المواد الرقمية (أمريكا)', value: '10', unit: 'مليار $', icon: Tablet },
  ],

  topMarkets: [
    { 
      label: 'أضخم سوق نشر عالمي', 
      country: 'الولايات المتحدة', 
      note: 'تتصدر العالم في مبيعات الكتب الورقية والإلكترونية، وتمتلك أقوى منصات التوزيع الرقمي (Amazon Kindle).',
      icon: Book
    },
    { 
      label: 'محرك النشر الأوروبي', 
      country: 'ألمانيا', 
      note: 'موطن لأكبر مجموعات النشر العالمية (Bertelsmann) وتتميز بتقاليد ثقافية عريقة في معارض الكتب الدولية.',
      icon: Globe
    },
    { 
      label: 'رائد النشر المتخصص', 
      country: 'المملكة المتحدة', 
      note: 'تمتلك نفوذاً عالمياً ضخماً في النشر الأكاديمي والتعليمي والكتب الموجهة للأسواق العالمية بالإنجليزية.',
      icon: BookOpen
    }
  ],

  navItems: ['نظرة عامة', 'النشر الرقمي', 'الكتب والمطبوعات', 'قادة الصناعة', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'بقاء المطبوع في عصر التحول الرقمي',
      subtitle: 'Print Persistence vs Digital Shift',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يخضع قطاع الكتب والنشر لتغييرات جذرية. بينما تكافح الصحف والمجلات المطبوعة بنقص الاشتراكات، أظهرت الكتب الورقية صموداً أكبر في العصر الرقمي وتظل الخيار المفضل للمستهلكين.
          </p>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
             <Headphones className="text-emerald-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-emerald-900 leading-tight">انفجار الكتب الصوتية</p>
                <p className="text-sm text-emerald-700/80 mt-2">
                  تعتبر الكتب الصوتية (Audiobooks) أسرع قطاعات النشر نمواً، مع توقعات بأن تصل قيمتها السوقية لأكثر من 10 مليارات دولار خلال العقد القادم.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'digital',
      title: 'المستقبل الرقمي: إلكتروني وصوتي',
      subtitle: 'The Future of ePublishing',
      content: (
        <div className="space-y-6 text-right">
          <p>
            تتصدر الولايات المتحدة سوق النشر الرقمي العالمي بفارق كبير، حيث تقترب إيرادات الكتب الإلكترونية وحدها من 8 مليارات دولار.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-emerald-600 mb-2" size={20} />
                <p className="font-black text-slate-900">سوق الورقي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">رغم تراجع إيرادات المطبوعات في أمريكا بـ 30 مليار دولار مؤخراً، لا تزال الكتب الورقية أكثر شعبية من الرقمية.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <TrendingUp className="text-emerald-600 mb-2" size={20} />
                <p className="font-black text-slate-900">النمو السنوي</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تتمتع الكتب الصوتية بمعدل نمو سنوي مركب (CAGR) مرتفع جداً مقارنة ببقية قطاعات النشر.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'leaders',
      title: 'عمالقة النشر والاستثمارات الكبرى',
      subtitle: 'Publishing Conglomerates',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            تهيمن مجموعات كبرى على سوق النشر العالمي من خلال عمليات الاستحواذ والاندماج المستمرة، مثل امتلاك برتلسمان لـ Penguin Random House.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-6 mt-6">
             <div className="p-8 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center shrink-0 w-full md:w-64 text-center">
                <Globe size={40} className="text-emerald-400 mb-4" />
                <p className="text-3xl font-black text-white">122B$</p>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">إيرادات سوق الكتب العالمي</p>
             </div>
             <div className="flex-1 space-y-4">
                <p className="text-slate-400">
                  شركات مثل RELX Group وThomson Reuters وPearson تحقق مليارات الدولارات سنوياً من خلال التركيز على النشر الأكاديمي والمهني والرقمي.
                </p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'RELX Group', country: 'UK/Netherlands', note: 'الرائد في النشر العلمي والمهني والتحليلات الرقمية' },
    { name: 'Bertelsmann', country: 'Germany', note: 'يمتلك أكبر دور النشر التجاري في العالم (Penguin Random House)' },
    { name: 'Thomson Reuters', country: 'Canada', note: 'العملاق المتخصص في المعلومات القانونية والمهنية الصادرة' },
    { name: 'Pearson', country: 'UK', note: 'أكبر شركة في قطاع النشر والتعليم والخدمات التدريبية' },
  ],

  definition: 'يشمل قطاع الكتب والنشر إنتاج وتوزيع الكتب الورقية والإلكترونية والصوتية، بالإضافة إلى الصحف والمجلات بنماذجها التقليدية والرقمية وعبر الاشتراكات.',

  industryInsights: [
    'الكتب الورقية لا زالت "الهدية المفضلة" مما يحافظ على استقرار مبيعاتها في المواسم',
    'الاشتراكات الرقمية (Paywalls) أصبحت المنقذ المالي الوحيد للصحف الكبرى',
    'تثير تقنيات الذكاء الاصطناعي مخاوف وتحديات جديدة في مجال حقوق النشر والتأليف',
  ],

  tags: ['Publishing', 'eBooks', 'Audiobooks', 'Newspapers', 'Print Industry'],
};

const BooksPublishingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;

export default BooksPublishingDashboard;
