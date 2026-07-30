import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Food & Beverage',
  titleEn: 'Food & Beverage',
  subtitle: 'تحليل شامل لـ Food & Beverage...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Food & Beverage...'
    }
  ],
  leaders: [],
  definition: 'تعريف Food & Beverage...',
  industryInsights: [],
  tags: ['FoodBeverage']
};

const FoodBeverageDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default FoodBeverageDashboard;
