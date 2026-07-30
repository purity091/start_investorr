import React from 'react';
import { TabTemplate } from "./TabTemplate";
import { TAB_CONFIGS } from "../tabConfigs";
import { FinancialResults } from "../result_components/FinancialResults";

interface FinancialViabilityTabProps {
  isGenerated: boolean;
  onGenerate: (answers: any) => void;
  incomeProjection: any[];
}

export const FinancialViabilityTab = (props: FinancialViabilityTabProps) => {
  return (
    <TabTemplate 
      config={TAB_CONFIGS.financial_viability as any}
      isGenerated={props.isGenerated}
      onGenerate={props.onGenerate}
      renderResults={() => (
        <FinancialResults />
      )}
    />
  );
};
