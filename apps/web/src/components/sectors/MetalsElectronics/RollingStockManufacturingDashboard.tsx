import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Rolling Stock Manufacturing',
  titleEn: 'Rolling Stock Manufacturing',
  subtitle: 'تحليل شامل لـ Rolling Stock Manufacturing...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Rolling Stock Manufacturing...'
    }
  ],
  leaders: [],
  definition: 'تعريف Rolling Stock Manufacturing...',
  industryInsights: [],
  tags: ['RollingStockManufacturing']
};

const RollingStockManufacturingDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default RollingStockManufacturingDashboard;
