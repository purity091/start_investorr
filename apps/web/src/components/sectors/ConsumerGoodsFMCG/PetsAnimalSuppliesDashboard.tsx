import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Pets & Animal Supplies',
  titleEn: 'Pets & Animal Supplies',
  subtitle: 'تحليل شامل لـ Pets & Animal Supplies...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Pets & Animal Supplies...'
    }
  ],
  leaders: [],
  definition: 'تعريف Pets & Animal Supplies...',
  industryInsights: [],
  tags: ['PetsAnimalSupplies']
};

const PetsAnimalSuppliesDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default PetsAnimalSuppliesDashboard;
