import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Sports & Leisure',
  titleEn: 'Sports & Leisure',
  subtitle: 'تحليل شامل لـ Sports & Leisure...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Sports & Leisure...'
    }
  ],
  leaders: [],
  definition: 'تعريف Sports & Leisure...',
  industryInsights: [],
  tags: ['SportsLeisure']
};

const SportsLeisureDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default SportsLeisureDashboard;
