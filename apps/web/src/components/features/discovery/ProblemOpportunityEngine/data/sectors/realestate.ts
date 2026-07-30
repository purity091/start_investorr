import { Building } from 'lucide-react';
import { Sector } from '../../types';

export const realEstateData: Sector = {
  id: 'realestate', 
  icon: Building, 
  name: 'العقارات والإنشاءات', 
  count: 4800, 
  color: 'slate',
  subs: [
    {
      id: 'proptech_market', 
      name: 'تسويق وإدارة العقارات', 
      count: 124, 
      problems: [
        {
          id: 're1', 
          title: 'فوضى الإعلانات الوهمية والمكررة', 
          desc: 'في المدن الكبرى (دبي، القاهرة، الرياض)، يبحث المستأجر أو المشتري عبر آلاف الإعلانات التي أغلبها قديم أو وهمي أو مكرر من مكاتب متعددة، مما يضيع الوقت ويفقد الثقة في السوق.', 
          pain: 9, 
          money: 10, 
          freq: 10, 
          gap: 7,
          budget: 'high', 
          b2x: 'B2C',
          countries: ['AE', 'SA', 'EG', 'GB'],
          opps: [
            { type: 'Verified Marketplace', name: 'ZillowGulf', model: 'إعلانات موثقة فقط بنظام التحقق بالبلوكشين أو الهوية الوطنية' },
            { type: 'Price Oracle', name: 'PropValues', model: 'توفير أسعار السوق الفعلية بناءً على الصفقات الموثقة' }
          ]
        }
      ]
    },
    {
      id: 'construction_tech', 
      name: 'تكنولوجيا الإنشاءات (ConTech)', 
      count: 58, 
      problems: [
        {
          id: 're5', 
          title: 'تأخر المشاريع الإنشائية بسبب سوء التنسيق', 
          desc: 'أكثر من 80% من المشاريع الكبرى تتجاوز ميزانيتها أو جدولها الزمني بسبب سوء التواصل بين الملاك والمقاولين والموردين وغياب المتابعة اللحظية للتنفيذ.', 
          pain: 10, 
          money: 10, 
          freq: 8, 
          gap: 8,
          budget: 'high', 
          b2x: 'B2B',
          countries: ['SA', 'CN', 'US', 'AE'],
          opps: [{ type: 'Project Management Tool', name: 'SiteSync', model: 'منصة متابعة بصرية (بالدرونز والـ AI) لمواقع الإنشاء' }]
        }
      ]
    },
    {
      id: 'fractional_ownership', 
      name: 'التمويل العقاري الجماعي', 
      count: 36, 
      problems: [
        {
          id: 're10', 
          title: 'ارتفاع عوائق دخول الاستثمار العقاري للشباب', 
          desc: 'تتطلب الاستثمارات العقارية المجزية مبالغ ضخمة، مما يحرم الفئة المتوسطة والشباب من التحوط ضد التضخم عبر العقارات.', 
          pain: 7, 
          money: 9, 
          freq: 10, 
          gap: 9,
          budget: 'medium', 
          b2x: 'B2C',
          countries: ['SA', 'US', 'GB', 'AE'],
          opps: [{ type: 'Fractional Investment', name: 'Hessa', model: 'امتلاك حصص في عقارات مدرة للدخل بحد أدنى 1000$' }]
        }
      ]
    }
  ]
};
