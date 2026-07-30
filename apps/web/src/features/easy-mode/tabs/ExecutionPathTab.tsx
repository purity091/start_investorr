import React from 'react';
import { TabTemplate } from "./TabTemplate";
import { TAB_CONFIGS } from "../tabConfigs";
import { ExecutionResults } from "../result_components/ExecutionResults";

interface ExecutionPathTabProps {
  isGenerated: boolean;
  onGenerate: (answers: any) => void;
  checklistStep: "setup" | "marketing" | "launch";
  setChecklistStep: (val: "setup" | "marketing" | "launch") => void;
  completedItems: Record<string, boolean>;
  toggleItem: (id: string) => void;
  isActivating: boolean;
  handleActivate: () => void;
  checklistData: any;
}

export const ExecutionPathTab = (props: ExecutionPathTabProps) => {
  return (
    <TabTemplate 
      config={TAB_CONFIGS.execution_path as any}
      isGenerated={props.isGenerated}
      onGenerate={props.onGenerate}
      renderResults={() => (
        <ExecutionResults />
      )}
    />
  );
};
