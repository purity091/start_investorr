import React from 'react';
import SectorDashboardTemplate, { SectorDashboardProps } from '../../features/dashboard/SectorDashboardTemplate';
import { Rocket } from 'lucide-react';

const config: SectorDashboardProps = {
  title: 'Public and religious holidays',
  titleEn: 'Public and religious holidays',
  subtitle: 'تحليل شامل لـ Public and religious holidays...',
  icon: Rocket,
  accent: 'blue',
  kpis: [],
  sections: [
    {
      id: 'overview',
      title: 'نظرة عامة',
      content: 'محتوى تجريبي لـ Public and religious holidays...'
    }
  ],
  leaders: [],
  definition: 'تعريف Public and religious holidays...',
  industryInsights: [],
  tags: ['PublicAndReligiousHolidays']
};

const PublicAndReligiousHolidaysDashboard: React.FC<any> = (props) => <SectorDashboardTemplate {...config} {...props} />;
export default PublicAndReligiousHolidaysDashboard;
