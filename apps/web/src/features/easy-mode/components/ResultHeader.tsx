import React from "react";
import * as Lucide from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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
    <div className="w-full bg-card border-b border-border sticky top-0 z-30 px-3 sm:px-6 lg:px-10 py-2.5" dir="rtl">
      <Tabs value={activeTab.toString()} onValueChange={(v) => setActiveTab(parseInt(v, 10))} className="w-full">
        <TabsList className="w-full flex overflow-x-auto whitespace-nowrap scrollbar-none h-auto p-1 bg-muted/80 rounded-xl gap-1 justify-start">
          {TABS.map((tab, i) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={i.toString()}
                className={cn(
                  "flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer",
                  "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-xs text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={14} className="shrink-0" />
                <span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
};
