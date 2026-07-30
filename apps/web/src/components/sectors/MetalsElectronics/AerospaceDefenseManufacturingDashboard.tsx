import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Aerospace & Defense Manufacturing',
  titleEn: 'Aerospace & Defense Manufacturing',
  subtitle: 'تحليل شامل لـ Aerospace & Defense Manufacturing...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Aerospace & Defense Manufacturing...'
    }
  ],
  leaders: [],
  definition: 'تعريف Aerospace & Defense Manufacturing...',
  industryInsights: [],
  tags: ['AerospaceDefenseManufacturing']
};

const AerospaceDefenseManufacturingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default AerospaceDefenseManufacturingDashboard;
