import React from 'react';
import { TabTemplate } from "./TabTemplate";
import { TAB_CONFIGS } from "../tabConfigs";
import { GrowthResults } from "../result_components/GrowthResults";

interface GrowthPlanTabProps {
  isGenerated: boolean;
  onGenerate: (answers: any) => void;
}

export const GrowthPlanTab = (props: GrowthPlanTabProps) => {
  return (
    <TabTemplate 
      config={TAB_CONFIGS.growth_plan as any}
      isGenerated={props.isGenerated}
      onGenerate={props.onGenerate}
      renderResults={() => (
        <GrowthResults />
      )}
    />
  );
};
