import React from 'react';
import * as Lucide from "lucide-react";
import { BaseCard } from "../result_components/CardDesignSystem";
import { WIZARD_GUIDANCE_DATA, WizardGuidanceStep } from "../wizardGuidanceData";
import { Badge } from "@/components/ui/Badge";

interface WizardGuidanceProps {
  currentStep: number;
  totalSteps: number;
  themeColor: string;
  configId: string;
}

export const WizardGuidance: React.FC<WizardGuidanceProps> = ({ 
  currentStep, 
  totalSteps,
  themeColor,
  configId
}) => {
  const tabContent = WIZARD_GUIDANCE_DATA[configId] || [];
  const stepContent: WizardGuidanceStep | undefined = tabContent.find(s => s.step === currentStep);

  return (
    <div className="space-y-4 w-full">
      <BaseCard isInitiallyOpen={true} className="w-full">
        <div className="space-y-5">
          {/* Header Section */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Lucide.Lightbulb size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground m-0">
                {stepContent?.title || `مساعدة ذكية: الخطوة ${currentStep}`}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                 <span className="size-1.5 rounded-full bg-primary" />
                 <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">وحدة التوجيه الاستراتيجي</span>
              </div>
            </div>
          </div>

          {/* Main Description */}
          <p className="text-xs leading-relaxed font-medium text-muted-foreground p-3.5 rounded-xl bg-muted/40 m-0">
             {stepContent?.description || "نقوم حالياً بتحليل بياناتك في مختبر الاستراتيجية. هذه التوجيهات ستساعدك على تقديم إجابات أكثر دقة لضمان مخرجات احترافية."}
          </p>

          {/* Detailed Hints List */}
          <div className="space-y-3">
             {stepContent?.hints.map((hint, idx) => (
                <div key={idx} className="flex gap-3 p-3.5 rounded-xl bg-card shadow-2xs">
                   <div className="size-7 rounded-lg bg-muted text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                     {idx + 1}
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                         <Lucide.Zap size={13} className="text-primary" />
                         <span className="text-xs font-bold text-foreground">تلميح ذكي</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-medium m-0">
                         {hint.hint}
                      </p>
                   </div>
                </div>
             ))}

             {!stepContent && (
                <div className="py-8 text-center opacity-60">
                   <Lucide.Search size={28} className="mx-auto mb-2 text-muted-foreground" />
                   <p className="text-xs font-medium text-muted-foreground">المحتوى التعليمي قادم لهذه الخطوة...</p>
                </div>
             )}
          </div>

          {/* Progress Bar */}
          <div className="pt-4 flex items-center gap-3">
             <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${(currentStep / totalSteps) * 100}%` }} />
             </div>
             <Badge variant="secondary" className="text-xs font-bold shrink-0">
                {currentStep} / {totalSteps}
             </Badge>
          </div>
        </div>
      </BaseCard>

      {/* Secondary Summary Card */}
      <div className="p-4 rounded-xl bg-card shadow-xs flex items-center gap-3 text-foreground">
         <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
           <Lucide.Layers size={18} />
         </div>
         <div className="flex-1 min-w-0">
            <div className="text-[10px] font-semibold text-muted-foreground uppercase">حالة المساعد الاستراتيجي</div>
            <div className="text-xs font-bold truncate">نظام التحليل الاستراتيجي نشط</div>
         </div>
         <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500" />
            <Lucide.Activity size={16} className="text-muted-foreground animate-pulse" />
         </div>
      </div>
    </div>
  );
};
