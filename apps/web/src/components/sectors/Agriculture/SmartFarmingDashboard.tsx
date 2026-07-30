import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Smart Farming',
  titleEn: 'Smart Farming',
  subtitle: 'تحليل شامل لـ Smart Farming...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Smart Farming...'
    }
  ],
  leaders: [],
  definition: 'تعريف Smart Farming...',
  industryInsights: [],
  tags: ['SmartFarming', 'NEW']
};

const SmartFarmingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default SmartFarmingDashboard;
