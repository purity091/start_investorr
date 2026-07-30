import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Pharmaceutical Products & Market',
  titleEn: 'Pharmaceutical Products & Market',
  subtitle: 'تحليل شامل لـ Pharmaceutical Products & Market...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Pharmaceutical Products & Market...'
    }
  ],
  leaders: [],
  definition: 'تعريف Pharmaceutical Products & Market...',
  industryInsights: [],
  tags: ['PharmaceuticalProductsMarket']
};

const PharmaceuticalProductsMarketDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default PharmaceuticalProductsMarketDashboard;
