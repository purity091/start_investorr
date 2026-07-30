import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Environmental Technology & Greentech',
  titleEn: 'Environmental Technology & Greentech',
  subtitle: 'تحليل شامل لـ Environmental Technology & Greentech...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Environmental Technology & Greentech...'
    }
  ],
  leaders: [],
  definition: 'تعريف Environmental Technology & Greentech...',
  industryInsights: [],
  tags: ['EnvironmentalTechnologyGreentech']
};

const EnvironmentalTechnologyGreentechDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default EnvironmentalTechnologyGreentechDashboard;
