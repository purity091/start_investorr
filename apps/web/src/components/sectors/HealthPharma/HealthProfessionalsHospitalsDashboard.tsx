import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Health Professionals & Hospitals',
  titleEn: 'Health Professionals & Hospitals',
  subtitle: 'تحليل شامل لـ Health Professionals & Hospitals...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Health Professionals & Hospitals...'
    }
  ],
  leaders: [],
  definition: 'تعريف Health Professionals & Hospitals...',
  industryInsights: [],
  tags: ['HealthProfessionalsHospitals']
};

const HealthProfessionalsHospitalsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default HealthProfessionalsHospitalsDashboard;
