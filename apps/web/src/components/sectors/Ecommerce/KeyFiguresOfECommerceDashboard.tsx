import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Key Figures of E-Commerce',
  titleEn: 'Key Figures of E-Commerce',
  subtitle: 'تحليل شامل لـ Key Figures of E-Commerce...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Key Figures of E-Commerce...'
    }
  ],
  leaders: [],
  definition: 'تعريف Key Figures of E-Commerce...',
  industryInsights: [],
  tags: ['KeyFiguresOfECommerce']
};

const KeyFiguresOfECommerceDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default KeyFiguresOfECommerceDashboard;
