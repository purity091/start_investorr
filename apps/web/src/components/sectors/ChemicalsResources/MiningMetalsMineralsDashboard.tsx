import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Mining, Metals & Minerals',
  titleEn: 'Mining, Metals & Minerals',
  subtitle: 'تحليل شامل لـ Mining, Metals & Minerals...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Mining, Metals & Minerals...'
    }
  ],
  leaders: [],
  definition: 'تعريف Mining, Metals & Minerals...',
  industryInsights: [],
  tags: ['MiningMetalsMinerals']
};

const MiningMetalsMineralsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default MiningMetalsMineralsDashboard;
