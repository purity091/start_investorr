import { Sprout } from 'lucide-react';
import { Sector } from '../../types';

export const agriData: Sector = {
  id: 'agri', 
  icon: Sprout, 
  name: 'الزراعة', 
  count: 890, 
  color: 'emerald',
  subs: [
    {
      id: 'soil', 
      name: 'صحة التربة', 
      count: 74, 
      problems: [
        {
          id: 'p9', 
          title: 'تدهور خصوبة التربة المائية', 
          desc: 'الاستخدام المفرط للأسمدة الكيميائية يدمر التربة على المدى البعيد.', 
          pain: 9, 
          money: 8, 
          freq: 6, 
          gap: 8,
          budget: 'low', 
          b2x: 'B2B',
          countries: ['EG', 'SA', 'AE', 'BR', 'CA'],
          opps: [{ type: 'AI SaaS', name: 'Soil Intelligence', model: 'اشتراك للمزارعين' }]
        },
      ]
    },
  ]
};
