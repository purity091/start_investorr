import React from 'react';
import * as Lucide from "lucide-react";
import { TOKENS, BaseCard } from "../result_components/CardDesignSystem";
import { WIZARD_GUIDANCE_DATA, WizardGuidanceStep } from "../wizardGuidanceData";

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
  // Get content for the current step and tab
  const tabContent = WIZARD_GUIDANCE_DATA[configId] || [];
  const stepContent: WizardGuidanceStep | undefined = tabContent.find(s => s.step === currentStep);

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-700 h-full">
      <BaseCard isInitiallyOpen={true} style={{
        background: `linear-gradient(135deg, #ffffff, ${themeColor}08)`,
        borderRadius: "20px",
        border: `3px solid ${themeColor}`,
        padding: "24px",
        boxShadow: `0 0 40px ${themeColor}25, 0 0 100px ${themeColor}10`,
        flex: 1,
        width: "100%",
        cursor: "default"
      }}>
        <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header Section */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ 
              width: 44, 
              height: 44, 
              borderRadius: "14px", 
              background: `linear-gradient(135deg, ${themeColor}20 0%, ${themeColor}10 100%)`, 
              color: themeColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 4px 12px ${themeColor}15`
            }}>
              <Lucide.Lightbulb size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: "18px", fontWeight: 900, color: TOKENS.colors.text.title, margin: 0 }}>
                {stepContent?.title || `مساعدة ذكية: الخطوة ${currentStep}`}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                 <span style={{ width: 6, height: 6, borderRadius: "50%", background: themeColor }}></span>
                 <span style={{ fontSize: "11px", fontWeight: 800, color: TOKENS.colors.text.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Expert Assistance Module</span>
              </div>
            </div>
          </div>

          {/* Main Description */}
          <p style={{ 
            fontSize: "13.5px", 
            color: TOKENS.colors.text.body, 
            lineHeight: 1.6, 
            fontWeight: 600, 
            marginBottom: 20,
            padding: "12px",
            background: "rgba(255,255,255,0.4)",
            borderRadius: "12px",
            border: "1px solid rgba(0,0,0,0.03)"
          }}>
             {stepContent?.description || "نقوم حالياً بتحليل بياناتك في مختبر الاستراتيجية. هذه التوجيهات ستساعدك على تقديم إجابات أكثر دقة لضمان مخرجات احترافية."}
          </p>

          {/* Detailed Hints List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
             {stepContent?.hints.map((hint, idx) => (
                <div key={idx} className="animate-in fade-in slide-in-from-bottom-2" style={{ 
                  animationDelay: `${idx * 0.1}s`,
                  display: "flex",
                  gap: 16,
                  padding: "18px",
                  background: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)"
                }}>
                   <div style={{ 
                     width: 32, 
                     height: 32, 
                     borderRadius: "10px", 
                     background: "#f8fafc", 
                     color: themeColor,
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     flexShrink: 0,
                     fontSize: "13px",
                     fontWeight: 900,
                     border: "1px solid #e2e8f0"
                   }}>
                     {idx + 1}
                   </div>
                   <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                         <Lucide.Sparkles size={14} color={themeColor} />
                         <span style={{ fontSize: "12px", fontWeight: 900, color: TOKENS.colors.text.title }}>تلميح ذكي</span>
                      </div>
                      <p style={{ fontSize: "13px", color: TOKENS.colors.text.muted, lineHeight: 1.6, fontWeight: 500, margin: 0 }}>
                         {hint.hint}
                      </p>
                   </div>
                </div>
             ))}

             {!stepContent && (
                <div style={{ padding: "40px 20px", textAlign: "center", opacity: 0.5 }}>
                   <Lucide.Search size={32} style={{ margin: "0 auto 12px" }} />
                   <p style={{ fontSize: "13px", fontWeight: 700 }}>المحتوى التعليمي قادم لهذه الخطوة...</p>
                </div>
             )}
          </div>

          {/* Progress Bar */}
          <div style={{ 
            marginTop: "auto", 
            paddingTop: "32px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: 16
          }}>
             <div style={{ height: "8px", background: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
                <div style={{ 
                  width: `${(currentStep / totalSteps) * 100}%`, 
                  height: "100%", 
                  background: `linear-gradient(90deg, ${themeColor} 0%, ${themeColor}dd 100%)`,
                  borderRadius: "10px",
                  transition: "width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }} />
             </div>
             <div style={{ 
               padding: "6px 12px", 
               background: `${themeColor}10`, 
               borderRadius: "100px",
               fontSize: "12px",
               fontWeight: 900,
               color: themeColor
             }}>
                {currentStep} / {totalSteps}
             </div>
          </div>
        </div>
      </BaseCard>

      {/* Secondary Status/Summary Card */}
      <div style={{
         padding: "20px 24px",
         background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
         borderRadius: "24px",
         color: "#fff",
         display: "flex",
         alignItems: "center",
         gap: 14,
         boxShadow: "0 15px 30px rgba(15, 23, 42, 0.2)",
         border: "1px solid rgba(255,255,255,0.05)"
      }}>
         <div style={{ 
           width: 38, 
           height: 38, 
           background: "rgba(255,255,255,0.05)", 
           borderRadius: "10px",
           display: "flex",
           alignItems: "center",
           justifyContent: "center"
         }}>
           <Lucide.Layers size={18} color={themeColor} />
         </div>
         <div style={{ flex: 1 }}>
            <div style={{ fontSize: "10px", fontWeight: 800, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>Laboratory Status</div>
            <div style={{ fontSize: "14px", fontWeight: 800, letterSpacing: "-0.01em" }}>نظام الاستخبارات الاستراتيجي نشط</div>
         </div>
         <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }}></div>
            <Lucide.Activity size={18} className="animate-pulse" style={{ opacity: 0.7 }} />
         </div>
      </div>
    </div>
  );
};
