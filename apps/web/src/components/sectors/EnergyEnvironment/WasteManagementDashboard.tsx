import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Waste Management',
  titleEn: 'Waste Management',
  subtitle: 'تحليل شامل لـ Waste Management...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Waste Management...'
    }
  ],
  leaders: [],
  definition: 'تعريف Waste Management...',
  industryInsights: [],
  tags: ['WasteManagement']
};

const WasteManagementDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default WasteManagementDashboard;
