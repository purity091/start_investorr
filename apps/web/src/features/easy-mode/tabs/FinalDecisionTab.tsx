import React from 'react';
import { TabTemplate } from "./TabTemplate";
import { TAB_CONFIGS } from "../tabConfigs";
import { FinalDecisionResults } from "../result_components/FinalDecisionResults";

interface FinalDecisionTabProps {
  isGenerated: boolean;
  onGenerate: (answers: any) => void;
}

export const FinalDecisionTab = (props: FinalDecisionTabProps) => {
  return (
    <TabTemplate 
      config={TAB_CONFIGS.final_decision as any}
      isGenerated={props.isGenerated}
      onGenerate={props.onGenerate}
      renderResults={() => (
        <FinalDecisionResults />
      )}
    />
  );
};
