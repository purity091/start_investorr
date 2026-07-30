import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Megaphone, Globe, BarChart3, TrendingUp, ShieldCheck, Smartphone, Monitor, ShoppingCart } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'قطاع الإعلانات',
  titleEn: 'Advertising Industry',
  subtitle: 'تحليل الإنفاق العالمي على الإعلانات، هيمنة الوسائل الرقمية، صعود Retail Media، وريادة الوكالات العالمية',
  icon: Megaphone,
  accent: 'blue',
  pdfLabel: 'تقرير الإعلانات (PDF)',

  kpis: [
    { label: 'حصة الإعلان الرقمي', value: '50', unit: '%+', icon: Smartphone },
    { label: 'حصة إعلانات التلفاز', value: '26', unit: '%', icon: Monitor },
    { label: 'نمو أسواق MENA', value: '9', unit: '%', icon: TrendingUp },
  ],

  topMarkets: [
    { 
      label: 'أكبر سوق إعلاني في العالم', 
      country: 'الولايات المتحدة', 
      note: 'السوق القائد عالمياً في الإنفاق الإعلاني الرقمي والتقليدي بحصة مسيطرة.',
      icon: TrendingUp
    },
    { 
      label: 'ثاني أكبر سوق إعلاني', 
      country: 'الصين', 
      note: 'تتميز بنظام بيئي رقمي محلي ضخم ومعدلات نمو استثنائية.',
      icon: Globe
    },
    { 
      label: 'المركز الثالث عالمياً', 
      country: 'المملكة المتحدة', 
      note: 'مركز عالمي للإبداع وتعد من بين أكثر الأسواق تقدماً في الإعلان الرقمي.',
      icon: BarChart3
    }
  ],

  navItems: ['نظرة عامة', 'هيمنة الرقمي', 'صعود Retail Media', 'القادة والوكالات', 'التعريف'],

  sections: [
    {
      id: 'overview',
      title: 'تحول موازين القوى في الإعلام',
      subtitle: 'The Shift in Media Power',
      content: (
        <div className="space-y-6 text-right">
          <p className="text-gray-600 leading-relaxed">
            يعتمد قطاع الإعلانات بشكل متزايد على الوسائل الرقمية التي تجاوزت بالفعل الإنفاق على التلفزيون والوسائل المطبوعة. وبحصة تتجاوز 50% من إجمالي الإنفاق العالمي، يظل الإنترنت هو القائد المطلق، مع توقعات بنمو استثنائي في المناطق النامية مثل الشرق الأوسط (MENA) وأمريكا اللاتينية بمعدل 9%.
          </p>
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
             <Globe className="text-blue-600 shrink-0 mt-1" size={24} />
             <div>
                <p className="font-bold text-blue-900 leading-tight">أمريكا الشمالية: السوق الناضج</p>
                <p className="text-sm text-blue-700/80 mt-2">
                  تظل أمريكا الشمالية أكبر سوق إعلاني في العالم، حيث ينمو بنسبة 5% سنوياً بفضل الابتكارات التقنية المستمرة.
                </p>
             </div>
          </div>
        </div>
      ),
    },
    {
      id: 'digital-king',
      title: 'الإنترنت: الملك المطلق للإعلانات',
      subtitle: 'Digital is King!',
      content: (
        <div className="space-y-6 text-right">
          <p>
            أصبحت تنسيقات البحث (Search) ووسائل التواصل الاجتماعي والفيديو هي الأشكال المهيمنة على الإنفاق. وقد رسخت التغيرات في سلوك المستهلك بعد الجائحة مكانة الرقمي كخيار أول للمعلنين، متجاوزاً كافة الطرق التقليدية.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <Smartphone className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">إعلانات الجوال</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">تستحوذ تطبيقات الجوال ومواقع التواصل على الجزء الأكبر من ميزانيات التسويق الرقمي بفضل دقة الاستهداف.</p>
            </div>
            <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <BarChart3 className="text-blue-600 mb-2" size={20} />
                <p className="font-black text-slate-900">معدلات النمو</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">أسواق LATAM و MENA تظهر أعلى إمكانات نمو عالمية نتيجة تزايد انتشار الإنترنت والتحول التجاري الرقمي.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'retail-media',
      title: 'Retail Media: الموجة القادمة',
      subtitle: 'Retail Media Wave',
      dark: true,
      content: (
        <div className="space-y-6 text-right">
          <p className="text-slate-300">
            أصبح Retail Media (الإعلانات داخل لأسواق الإلكترونية) الأداة الأسرع نمواً. فمن خلال وضع الإعلانات في مواقع وتطبيقات البيع بالتجزئة، يصل المعلنون للمستهلكين في لحظة الشراء الفعلية، مما يجعلها وسيلة حاسمة للعلامات التجارية في ظل اختفاء ملفات تعريف الارتباط (Cookies).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <ShoppingCart className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">إعلانات أمازون</p>
                <p className="text-sm text-slate-400">تقود أمازون هذا التحول عالمياً، حيث توفر للمعلنين وصولاً مباشراً لبيانات نية الشراء الحقيقية.</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <TrendingUp className="text-blue-400 mb-3" size={24} />
                <p className="font-bold text-white mb-2">فعالية الاستهداف</p>
                <p className="text-sm text-slate-400">Retail Media توفر عائداً أعلى على الاستثمار لأنها تستهدف المتسوقين النشطين بدلاً من التصفح العشوائي.</p>
             </div>
          </div>
        </div>
      ),
    },
  ],

  leaders: [
    { name: 'WPP plc', country: 'UK', note: 'المتصدر العالمي بإيرادات سنوية تتجاوز 57 مليار دولار وقيمة سوقية تبلغ 17.5 مليار دولار' },
    { name: 'Publicis Groupe', country: 'France', note: 'من بين "الخمسة الكبار" عالمياً بتميز في مجالات التحول الرقمي والبيانات' },
    { name: 'Omnicom Group', country: 'USA', note: 'تمتلك بعض أكثر الوكالات إبداعاً في العالم مثل BBDO و DDB' },
    { name: 'Dentsu Group', country: 'Japan', note: 'قائدة السوق الآسيوي وواحدة من أكبر شبكات الوكالات الإعلانية دولياً' },
  ],

  definition: 'تشمل صناعة الإعلانات كافة الأنشطة المتعلقة بإنشاء ونشر الرسائل الترويجية، وتغطي ميزانيات الإنفاق على الإعلام الرقمي والتقليدي ووكالات الخدمات الإبداعية.',

  industryInsights: [
    'الذكاء الاصطناعي التوليدي بدأ يعيد صياغة إنتاج المحتوى الإعلاني لدى الوكالات العالمية الكبرى',
    'الإنفاق الإعلاني في MENA و LATAM ينمو بمعدل ضعف نمو الأسواق المشبعة في أمريكا وأوروبا',
    'تنسيق الفيديو الرقمي ينمو ليصبح الشكل رقم 1 في جذب الميزانيات الترويجية عبر منصات التواصل الاجتماعي',
  ],

  tags: ['Advertising', 'Marketing', 'WPP', 'Digital Ad Spend', 'Retail Media', 'MENA Growth'],
  sectorId: 'advertising-dashboard',
};

const AdvertisingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default AdvertisingDashboard;
