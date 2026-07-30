import { Cpu } from 'lucide-react';
import { Sector } from '../../types';

export const techData: Sector = {
  id: 'tech', 
  icon: Cpu, 
  name: 'التكنولوجيا', 
  count: 1540, 
  color: 'violet',
  subs: [
    {
      id: 'cyber', 
      name: 'الأمن السيبراني', 
      count: 95, 
      problems: [
        {
          id: 'p11', 
          title: 'هجمات الفدية على المنشآت الطبية', 
          desc: 'الشركات الناشئة والمستشفيات لا تملك ميزانية لأنظمة أمنية معقدة، مما يجعلها هدفاً سهلاً.', 
          pain: 10, 
          money: 9, 
          freq: 7, 
          gap: 9,
          budget: 'medium', 
          b2x: 'B2B',
          countries: ['SA', 'AE', 'US', 'GB'],
          opps: [{ type: 'Managed Security', name: 'NanoShield', model: 'اشتراك شهري مرن' }]
        },
      ]
    },
  ]
};
