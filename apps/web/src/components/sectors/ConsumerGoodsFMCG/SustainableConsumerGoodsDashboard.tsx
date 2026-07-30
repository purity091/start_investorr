import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Sustainable Consumer Goods',
  titleEn: 'Sustainable Consumer Goods',
  subtitle: 'تحليل شامل لـ Sustainable Consumer Goods...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Sustainable Consumer Goods...'
    }
  ],
  leaders: [],
  definition: 'تعريف Sustainable Consumer Goods...',
  industryInsights: [],
  tags: ['SustainableConsumerGoods', 'NEW']
};

const SustainableConsumerGoodsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default SustainableConsumerGoodsDashboard;
