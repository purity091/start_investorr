import React from 'react';
import {
  Home,
  Layers,
  ListChecks,
  Sparkles,
  Palette,
  CreditCard,
  Bell,
  Plus,
  Settings,
  Target,
  Rocket,
  FileText,
  ArrowRightLeft,
  Compass,
} from 'lucide-react';

interface MobileSiteMapProps {
  setActiveTab: (tab: string) => void;
}

interface SiteMapItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  isNew?: boolean;
}

interface SiteMapSection {
  title: string;
  description: string;
  items: SiteMapItem[];
}

export const MobileSiteMap: React.FC<MobileSiteMapProps> = ({ setActiveTab }) => {
  const sections: SiteMapSection[] = [
    {
      title: 'العمليات الأساسية',
      description: 'إدارة رحلتك الريادية من الفكرة إلى التنفيذ',
      items: [
        { id: 'home', label: 'الرئيسية', description: 'ملخص الأداء والنبض الاستراتيجي', icon: Home, color: 'text-slate-700 bg-slate-100' },
        { id: 'my-plans', label: 'مشاريعي', description: 'إدارة خطط العمل الحالية', icon: Layers, color: 'text-slate-700 bg-slate-100' },
        { id: 'new-plan', label: 'خلق فكرة', description: 'توليد أفكار مشاريع ذكية', icon: Plus, color: 'text-slate-700 bg-slate-100' },
        { id: 'editor', label: 'محرر الخطط', description: 'تعديل وتطوير خطة العمل', icon: FileText, color: 'text-slate-700 bg-slate-100' },
      ],
    },
    {
      title: 'مختبر الاستراتيجية',
      description: 'أدوات بناء وتحليل وتطوير المشروع',
      items: [
        { id: 'problem-engine', label: 'محرك الفرص', description: 'تحليل المشاكل وتحويلها لفرص', icon: Target, color: 'text-slate-700 bg-slate-100', isNew: true },
        { id: 'market-discovery', label: 'استكشاف السوق', description: 'رصد الاتجاهات العالمية والقطاعات', icon: Compass, color: 'text-slate-700 bg-slate-100' },
        { id: 'unicorn-benchmark', label: 'رادار اليونيكورن', description: 'مقارنة مع الشركات المليونية', icon: Sparkles, color: 'text-slate-700 bg-slate-100', isNew: true },
        { id: 'brand-identity', label: 'استوديو الهوية', description: 'تصميم العلامة التجارية بصرياً', icon: Palette, color: 'text-slate-700 bg-slate-100' },
        { id: 'comparison', label: 'مقارنة السيناريوهات', description: 'تحليل المسارات الاستثمارية المختلفة', icon: ArrowRightLeft, color: 'text-slate-700 bg-slate-100' },
      ],
    },
    {
      title: 'الإدارة والتنفيذ',
      description: 'إدارة العمل اليومي داخل المنصة',
      items: [
        { id: 'workspace', label: 'مساحة المشروع', description: 'مركز التشغيل والمتابعة والتنفيذ', icon: Rocket, color: 'text-slate-700 bg-slate-100' },
        { id: 'tasks', label: 'المهام والجدولة', description: 'تتبع خطوات التنفيذ الميداني', icon: ListChecks, color: 'text-slate-700 bg-slate-100' },
        { id: 'notifications', label: 'مركز التنبيهات', description: 'إشعارات النظام ورسائل المتابعة', icon: Bell, color: 'text-slate-700 bg-slate-100' },
      ],
    },
    {
      title: 'الحساب والاشتراك',
      description: 'ضبط إعدادات المنصة وإدارة الباقة',
      items: [
        { id: 'settings', label: 'الإعدادات', description: 'تعديل الملف والبيانات الشخصية', icon: Settings, color: 'text-slate-700 bg-slate-100' },
        { id: 'pricing', label: 'الباقات والأسعار', description: 'ترقية الحساب واكتشاف المزايا', icon: CreditCard, color: 'text-slate-700 bg-slate-100' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-40 rtl" dir="rtl">
      <div className="sticky top-0 z-50 rounded-b-[2.5rem] border-b border-slate-100 bg-white/95 px-6 pb-8 pt-12 shadow-sm backdrop-blur-xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
              <Rocket size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-black leading-none text-slate-900">خريطة المنصة</h1>
              <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Strategic Mission Control</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-10 space-y-12 px-6">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${sectionIndex * 100}ms` }}>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-6 w-1.5 rounded-full bg-slate-900" />
              <div>
                <h3 className="text-base font-black leading-none text-slate-900">{section.title}</h3>
                <p className="mt-1 text-[10px] font-bold text-slate-400">{section.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className="group relative w-full overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-4 text-right shadow-sm transition-all active:scale-[0.97] hover:border-slate-300 hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}>
                      <item.icon size={22} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-black text-slate-900">{item.label}</span>
                        {item.isNew ? (
                          <span className="rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-[9px] font-black text-slate-700">
                            جديد
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-[11px] font-bold leading-6 text-slate-500">{item.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
