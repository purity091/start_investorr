import React from "react";
import * as Lucide from "lucide-react";

interface ResultHeaderProps {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TABS = [
  { id: "strategic_pulse", label: "النبض الاستراتيجي", shortLabel: "النبض", icon: Lucide.Activity },
  { id: "financial_viability", label: "التحليل المالي", shortLabel: "المالي", icon: Lucide.Coins },
  { id: "execution_path", label: "مسار التنفيذ", shortLabel: "التنفيذ", icon: Lucide.Compass },
  { id: "growth_plan", label: "خارطة النمو", shortLabel: "النمو", icon: Lucide.TrendingUp },
  { id: "revenue_acceleration", label: "خطة الانطلاق", shortLabel: "الانطلاق", icon: Lucide.Zap },
  { id: "final_decision", label: "الاستنتاج النهائي", shortLabel: "النتيجة", icon: Lucide.CheckCircle2 },
];

export const ResultHeader: React.FC<ResultHeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="result-header-wrapper w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 shadow-sm flex-shrink-0" dir="rtl">
      <div className="tabs-container flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 px-3 sm:px-6 py-2 sm:py-3 w-full" dir="rtl">
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(i)}
            className={`tab-button flex items-center gap-1.5 sm:gap-2.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl border-2 transition-all duration-300 flex-shrink-0 min-h-[42px] sm:min-h-[48px] whitespace-nowrap relative group ${
              activeTab === i
                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:text-slate-900"
            }`}
          >
            <tab.icon size={16} strokeWidth={activeTab === i ? 3 : 2} className={`transition-transform duration-300 ${activeTab === i ? "scale-110" : "group-hover:scale-110"}`} />
            <span className="tab-label text-[11px] sm:text-sm font-black tracking-tight">
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </span>
            {activeTab === i && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
