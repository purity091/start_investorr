import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Industrial Machinery Manufacturing',
  titleEn: 'Industrial Machinery Manufacturing',
  subtitle: 'تحليل شامل لـ Industrial Machinery Manufacturing...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Industrial Machinery Manufacturing...'
    }
  ],
  leaders: [],
  definition: 'تعريف Industrial Machinery Manufacturing...',
  industryInsights: [],
  tags: ['IndustrialMachineryManufacturing']
};

const IndustrialMachineryManufacturingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default IndustrialMachineryManufacturingDashboard;
