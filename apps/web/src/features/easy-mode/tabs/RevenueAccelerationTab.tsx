import React from 'react';
import { TabTemplate } from "./TabTemplate";
import { TAB_CONFIGS } from "../tabConfigs";
import { RoadMapResults } from "../result_components/RoadMapResults";

interface RevenueAccelerationTabProps {
  isGenerated: boolean;
  onGenerate: (answers: any) => void;
}

export const RevenueAccelerationTab = (props: RevenueAccelerationTabProps) => {
  return (
    <TabTemplate 
      config={TAB_CONFIGS.revenue_acceleration as any}
      isGenerated={props.isGenerated}
      onGenerate={props.onGenerate}
      renderResults={() => (
        <RoadMapResults />
      )}
    />
  );
};
