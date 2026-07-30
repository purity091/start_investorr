import React from 'react';
import { StrategicPulseResults } from "../result_components/StrategicPulseResults";
import { TabTemplate } from "./TabTemplate";
import { TAB_CONFIGS } from "../tabConfigs";

interface StrategicPulseTabProps {
  isGenerated: boolean;
  onGenerate: (answers: any) => void;
  incomeProjection: any[];
  activeScenario: "optimistic" | "pessimistic";
  setActiveScenario: (val: "optimistic" | "pessimistic") => void;
  scenarios: any;
  uvpData: any[];
  checklistStep: "setup" | "marketing" | "launch";
  setChecklistStep: (val: "setup" | "marketing" | "launch") => void;
  completedItems: Record<string, boolean>;
  toggleItem: (id: string) => void;
  isActivating: boolean;
  handleActivate: () => void;
  checklistData: any;
  answers: any;
}

export const StrategicPulseTab = (props: StrategicPulseTabProps) => {
  return (
    <TabTemplate 
      config={TAB_CONFIGS.strategic_pulse as any}
      isGenerated={props.isGenerated}
      onGenerate={props.onGenerate}
      renderResults={() => (
        <StrategicPulseResults />
      )}
    />
  );
};
