import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Furniture, Furnishings & Household Items',
  titleEn: 'Furniture, Furnishings & Household Items',
  subtitle: 'تحليل شامل لـ Furniture, Furnishings & Household Items...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Furniture, Furnishings & Household Items...'
    }
  ],
  leaders: [],
  definition: 'تعريف Furniture, Furnishings & Household Items...',
  industryInsights: [],
  tags: ['FurnitureFurnishingsHouseholdItems']
};

const FurnitureFurnishingsHouseholdItemsDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default FurnitureFurnishingsHouseholdItemsDashboard;
