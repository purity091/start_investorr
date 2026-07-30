import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Water & Wastewater',
  titleEn: 'Water & Wastewater',
  subtitle: 'تحليل شامل لـ Water & Wastewater...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Water & Wastewater...'
    }
  ],
  leaders: [],
  definition: 'تعريف Water & Wastewater...',
  industryInsights: [],
  tags: ['WaterWastewater']
};

const WaterWastewaterDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default WaterWastewaterDashboard;
