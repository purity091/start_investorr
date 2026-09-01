import React from 'react';
import { Trophy, TrendingDown, CloudCog, Settings2, ArrowLeft, Compass, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

interface ProjectIdeasHubProps {
  setActiveTab?: (tab: string) => void;
}

export const ProjectIdeasHub: React.FC<ProjectIdeasHubProps> = ({ setActiveTab }) => {
  const categories = [
    {
      id: 'proven-projects',
      title: 'أفكار شركات ناجحة',
      description: 'قاعدة بيانات تفاعلية لشركات ناشئة ومشاريع أثبتت نجاحها. استكشف نماذج العمل والتقنيات التي استخدموها.',
      icon: <Trophy className="size-8 text-amber-500" />,
      color: 'bg-amber-50 border-amber-100 hover:border-amber-300 hover:shadow-amber-100/50',
    },
    {
      id: 'failed-projects',
      title: 'شركات فشلت (Post-Mortem)',
      description: 'دراسات حالة لمشاريع تقنية لم يكتب لها النجاح. تعلم من أخطاء الآخرين لكي تتجنب تكرارها في مشروعك.',
      icon: <TrendingDown className="size-8 text-red-500" />,
      color: 'bg-red-50 border-red-100 hover:border-red-300 hover:shadow-red-100/50',
    },
    {
      id: 'saas-ideas',
      title: 'أفكار SaaS',
      description: 'اكتشف أفكار برمجيات كخدمة (SaaS) واعدة ومطلوبة في السوق لتستلهم منها مشروعك القادم.',
      icon: <CloudCog className="size-8 text-blue-500" />,
      color: 'bg-blue-50 border-blue-100 hover:border-blue-300 hover:shadow-blue-100/50',
    },
    {
      id: 'micro-saas-ideas',
      title: 'أفكار Micro-SaaS',
      description: 'أفكار لمشاريع برمجية صغيرة ومتخصصة (Niche) يسهل بناؤها وإدارتها بواسطة شخص واحد أو فريق صغير.',
      icon: <Settings2 className="size-8 text-emerald-500" />,
      color: 'bg-emerald-50 border-emerald-100 hover:border-emerald-300 hover:shadow-emerald-100/50',
    },
    {
      id: 'market-discovery',
      title: 'استكشاف قطاعات السوق',
      description: 'حلل أكثر من 100 قطاع مختلف واكتشف حجم السوق، المنافسين، والفرص المتاحة في مجالات متنوعة.',
      icon: <Compass className="size-8 text-indigo-500" />,
    },
    {
      id: 'problem-engine',
      title: 'المشكلات والفرص',
      description: 'محرك ذكي لاكتشاف المشكلات الحقيقية التي يعاني منها الناس والشركات وتحويلها إلى فرص ومشاريع ناجحة.',
      icon: <Activity className="size-8 text-violet-500" />,
      color: 'bg-violet-50 border-violet-100 hover:border-violet-300 hover:shadow-violet-100/50',
    }
  ];

  return (
    <div dir="rtl" className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-8 px-3 py-3 sm:px-6 sm:py-8 lg:px-8 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-3 mb-2">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">أفكار مشاريع</h1>
        <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
          مكتبتك الشاملة لاستلهام الأفكار، دراسة النماذج الناجحة، والتعلم من التجارب الفاشلة. اختر القسم الذي تود استكشافه لتبدأ رحلتك نحو بناء مشروعك القادم.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Card 
            key={category.id} 
            className={`cursor-pointer transition-all duration-300 border-2 shadow-sm hover:shadow-md ${category.color}`}
            onClick={() => setActiveTab && setActiveTab(category.id)}
          >
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-3 bg-white rounded-xl shadow-sm shrink-0">
                {category.icon}
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-slate-900">{category.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-[15px] leading-relaxed text-slate-700 font-medium pt-2 pb-4">
                {category.description}
              </CardDescription>
              <div className="flex items-center text-sm font-bold text-slate-600 gap-2 opacity-80 group-hover:opacity-100">
                <span>تصفح القسم</span>
                <ArrowLeft className="size-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
