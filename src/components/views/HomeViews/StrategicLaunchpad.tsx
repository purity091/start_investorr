import React from 'react';
import { Palette, FileEdit, ArrowRight, Globe, Layers, LayoutDashboard } from 'lucide-react';

const WorkbenchCard = ({ tool, onClick }: any) => {
  return (
    <div
      onClick={() => onClick(tool.tab)}
      className="group relative h-full cursor-pointer transition-all duration-300 hover:-translate-y-2 active:scale-95"
    >
      <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 group-hover:border-slate-300 group-hover:shadow-lg">
        <div className="p-5 sm:p-6 flex h-full min-h-[260px] flex-col lg:min-h-[220px]">
          <div className="mb-4 flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
              <tool.icon size={20} />
            </div>
            <div className={`rounded-md border px-2 py-0.5 text-[7px] font-black uppercase tracking-wider ${tool.badgeBg} ${tool.badgeText} ${tool.badgeBorder}`}>
              {tool.badge}
            </div>
          </div>

          <h3 className="mb-1.5 text-base font-black leading-tight text-slate-900">
            {tool.title}
          </h3>

          <p className="mb-4 flex-1 text-[11px] font-bold leading-relaxed text-slate-500">
            {tool.desc}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-slate-700 transition-transform group-hover:translate-x-[-2px]">
              {tool.cta}
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-slate-900 group-hover:text-white">
              <ArrowRight size={14} className="rotate-180" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StrategicLaunchpad = ({ setActiveTab }: any) => {
  const tools = [
    {
      title: 'رادار اكتشاف الفرص',
      desc: 'استكشف الفجوات السوقية العالمية ورصد التوجهات الاستثمارية الحية في القطاعات الرئيسية.',
      icon: Globe,
      tab: 'market-discovery',
      badge: 'رئيسي',
      badgeBg: 'bg-slate-100',
      badgeText: 'text-slate-700',
      badgeBorder: 'border-slate-200',
      cta: 'افتح الرادار',
    },
    {
      title: 'استوديو الهوية البصرية',
      desc: 'صمّم هوية المشروع بطريقة منظمة، وحدد الألوان والخطوط والاتجاه البصري النهائي.',
      icon: Palette,
      tab: 'brand-identity',
      badge: 'هوية',
      badgeBg: 'bg-slate-100',
      badgeText: 'text-slate-700',
      badgeBorder: 'border-slate-200',
      cta: 'افتح الاستوديو',
    },
    {
      title: 'محرر الخطط',
      desc: 'ابنِ خطة عمل المشروع وحرر الأقسام الأساسية قبل الانتقال إلى التنفيذ والتشغيل.',
      icon: FileEdit,
      tab: 'new-plan',
      badge: 'بناء',
      badgeBg: 'bg-slate-100',
      badgeText: 'text-slate-700',
      badgeBorder: 'border-slate-200',
      cta: 'ابدأ البناء',
    },
    {
      title: 'مساحة المشروع',
      desc: 'ادخل إلى مركز التشغيل لمتابعة الجاهزية والمهام والتقدم من نقطة عمل موحدة.',
      icon: LayoutDashboard,
      tab: 'workspace',
      badge: 'تشغيل',
      badgeBg: 'bg-slate-100',
      badgeText: 'text-slate-700',
      badgeBorder: 'border-slate-200',
      cta: 'افتح المساحة',
    },
  ];

  return (
    <section className="overflow-hidden border-b border-slate-100 bg-slate-50/50 px-5 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
      <div className="mx-auto max-w-7xl" dir="rtl">
        <div className="mb-8 space-y-2 text-right sm:mb-10 sm:space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-slate-700 shadow-sm">
            <Layers size={12} /> منصة العمل
          </div>
          <h2 className="text-2xl font-black leading-tight text-slate-900 sm:text-3xl">
            مختبر الهندسة الاستثمارية
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {tools.map((tool, index) => (
            <WorkbenchCard key={index} tool={tool} onClick={setActiveTab} />
          ))}
        </div>
      </div>
    </section>
  );
};
