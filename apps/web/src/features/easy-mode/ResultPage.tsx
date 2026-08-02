import React, { useState } from 'react';
import * as Lucide from "lucide-react";
import { ResultHeader } from "./components/ResultHeader";
import { StrategicPulseTab } from "./tabs/StrategicPulseTab";
import { FinancialViabilityTab } from "./tabs/FinancialViabilityTab";
import { ExecutionPathTab } from "./tabs/ExecutionPathTab";
import { GrowthPlanTab } from "./tabs/GrowthPlanTab";
import { RevenueAccelerationTab } from "./tabs/RevenueAccelerationTab";
import { FinalDecisionTab } from "./tabs/FinalDecisionTab";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const CHECKLIST_DATA = {
  setup: {
    id: "setup",
    label: "التجهيز والترخيص",
    icon: "🏗️",
    color: "#3b82f6",
    items: [
      { id: "s1", label: "التراخيص القانونية والسجل التجاري", category: "قانوني", days: 10 },
      { id: "s2", label: "فتح حسابات بنكية تجارية", category: "مالي", days: 5 },
      { id: "s3", label: "تأجير المساحة أو المتجر الرقمي", category: "عقاري", days: 14 }
    ]
  },
  marketing: {
    id: "marketing",
    label: "التسويق والهوية",
    icon: "📣",
    color: "#8b5cf6",
    items: [
      { id: "m1", label: "هوية بصرية متكاملة (Logo & Style)", category: "براند", days: 7 },
      { id: "m2", label: "تجهيز حملة التواصل الاجتماعي", category: "إعلان", days: 10 }
    ]
  },
  launch: {
    id: "launch",
    label: "الانطلاق والنمو",
    icon: "🚀",
    color: "#10b981",
    items: [
      { id: "l1", label: "حفل انطلاق تجريبي (Soft Launch)", category: "تشغيل", days: 3 },
      { id: "l2", label: "جمع التغذية الراجعة (Feedback)", category: "تطوير", days: 7 }
    ]
  }
};

export default function ResultPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeScenario, setActiveScenario] = useState<"optimistic" | "pessimistic">("optimistic");
  const [answers, setAnswers] = useState<any>(null);
  const [checklistStep, setChecklistStep] = useState<"setup" | "marketing" | "launch">("setup");
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [isActivating, setIsActivating] = useState(false);
  const [generatedLabs, setGeneratedLabs] = useState<Record<string, boolean>>({});

  const handleGenerate = (vals: any) => {
    const labIds = ["strategic_pulse", "financial_viability", "execution_path", "growth_plan", "revenue_acceleration", "final_decision"];
    const currentLabId = labIds[activeTab];
    setAnswers(vals);
    setGeneratedLabs((prev) => ({ ...prev, [currentLabId]: true }));
  };

  const handleActivate = () => {
    setIsActivating(true);
    setTimeout(() => setIsActivating(false), 2400);
  };

  const incomeProjection = [
    { month: 'الشهر 1', realistic: 45000, target: 50000 },
    { month: 'الشهر 2', realistic: 52000, target: 60000 },
    { month: 'الشهر 3', realistic: 48000, target: 75000 },
    { month: 'الشهر 4', realistic: 61000, target: 90000 },
    { month: 'الشهر 5', realistic: 55000, target: 110000 },
    { month: 'الشهر 6', realistic: 67000, target: 130000 },
  ];

  const scenarios = {
    optimistic: { irr: "34%", payback: "14 شهر", roi: "280%", growth: "+12% شهرياً" },
    pessimistic: { irr: "12%", payback: "26 شهر", roi: "95%", growth: "+3% شهرياً" }
  };

  const uvpData = [
    { axis: 'السعر', value: 85, fullMark: 100 },
    { axis: 'الجودة', value: 92, fullMark: 100 },
    { axis: 'السرعة', value: 70, fullMark: 100 },
    { axis: 'التقنية', value: 95, fullMark: 100 },
    { axis: 'الوصول', value: 65, fullMark: 100 },
  ];

  const renderTabContent = () => {
    const isLabGenerated = (id: string) => !!generatedLabs[id];
    switch (activeTab) {
      case 0:
        return <StrategicPulseTab isGenerated={isLabGenerated("strategic_pulse")} onGenerate={handleGenerate} incomeProjection={incomeProjection} activeScenario={activeScenario} setActiveScenario={setActiveScenario} scenarios={scenarios} uvpData={uvpData} checklistStep={checklistStep} setChecklistStep={setChecklistStep} completedItems={completedItems} toggleItem={(id) => setCompletedItems((p) => ({ ...p, [id]: !p[id] }))} isActivating={isActivating} handleActivate={handleActivate} checklistData={CHECKLIST_DATA} answers={answers} />;
      case 1:
        return <FinancialViabilityTab isGenerated={isLabGenerated("financial_viability")} onGenerate={handleGenerate} incomeProjection={incomeProjection} />;
      case 2:
        return <ExecutionPathTab isGenerated={isLabGenerated("execution_path")} onGenerate={handleGenerate} checklistStep={checklistStep} setChecklistStep={setChecklistStep} completedItems={completedItems} toggleItem={(id) => setCompletedItems((p) => ({ ...p, [id]: !p[id] }))} isActivating={isActivating} handleActivate={handleActivate} checklistData={CHECKLIST_DATA} />;
      case 3:
        return <GrowthPlanTab isGenerated={isLabGenerated("growth_plan")} onGenerate={handleGenerate} />;
      case 4:
        return <RevenueAccelerationTab isGenerated={isLabGenerated("revenue_acceleration")} onGenerate={handleGenerate} />;
      case 5:
        return <FinalDecisionTab isGenerated={isLabGenerated("final_decision")} onGenerate={handleGenerate} />;
      default:
        return null;
    }
  };

  return (
    <div
      dir="rtl"
      className="flex flex-col w-full min-h-screen bg-background relative text-right"
    >
      {/* Header Banner - Surface */}
      <header className="px-4 sm:px-6 lg:px-10 pt-6 pb-5 bg-card border-b border-border shadow-2xs">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
          <div className="text-center sm:text-right w-full sm:flex-1">
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="size-11 bg-primary text-primary-foreground rounded-xl flex items-center justify-center shrink-0 shadow-xs">
                <Lucide.Zap size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground leading-tight tracking-tight">النموذج الاحترافي</h1>
                  <Badge variant="secondary" className="text-xs font-semibold px-2.5 py-0.5">
                    تحليل إستراتيجي متقدم
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground font-medium mt-1 hidden sm:block">
                  لوحة تحكم استراتيجية متكاملة مدعومة بالذكاء الاصطناعي لتخطيط وتنفيذ المشروع
                </p>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Result Header Navigation Tabs */}
      <ResultHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
        <div className="w-full max-w-[1600px] mx-auto">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}
