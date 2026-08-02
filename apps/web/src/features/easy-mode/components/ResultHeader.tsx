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
    <div className="w-full bg-card shadow-xs sticky top-0 z-40 px-4 sm:px-6 py-2.5" dir="rtl">
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 p-1.5 bg-muted/50 rounded-xl" dir="rtl">
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = activeTab === i;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-background text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }`}
            >
              <Icon size={14} className={isActive ? "text-primary" : "text-muted-foreground"} />
              <span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
