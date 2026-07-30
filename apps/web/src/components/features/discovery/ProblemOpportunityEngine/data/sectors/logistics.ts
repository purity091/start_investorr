import { Truck } from 'lucide-react';
import { Sector } from '../../types';

export const logisticsData: Sector = {
  id: 'logistics', 
  icon: Truck, 
  name: 'الخدمات اللوجستية', 
  count: 2150, 
  color: 'orange',
  subs: [
    {
      id: 'warehousing', 
      name: 'التخزين والمخازن الذكية', 
      count: 67, 
      problems: [
        {
          id: 'log1', 
          title: 'صعوبة الوصول لمخازن مرنة للمخزون الموسمي', 
          desc: 'الشركات الناشئة والمتاجر الإلكترونية تضطر لتوقيع عقود سنوية للمخازن حتى لو كانت حاجتها شهرية فقط، مما يرفع تكلفة التشغيل الثابتة.', 
          pain: 8, 
          money: 9, 
          freq: 7, 
          gap: 8,
          budget: 'medium', 
          b2x: 'B2B',
          countries: ['SA', 'AE', 'US', 'GB'],
          opps: [
            { type: 'Warehousing Marketplace', name: 'FlexSpace', model: 'Airbnb للمخازن - الدفع حسب الاستخدام' },
            { type: 'Micro-fulfillment', name: 'SwiftHub', model: 'مخازن مصغرة داخل المدن لتسريع التوصيل' }
          ]
        }
      ]
    },
    {
      id: 'cold_chain', 
      name: 'سلاسل التبريد', 
      count: 42, 
      problems: [
        {
          id: 'log5', 
          title: 'تلف الشحنات الحيوية بسبب انقطاع التبريد (Cold-Chain Breach)', 
          desc: 'الأدوية والمواد الغذائية الطازجة تفقد قيمتها أو تصبح خطرة عند تعرضها لتذبذب حراري بسيط أثناء النقل في المناطق الحارة (مثل الخليج)، مع غياب التتبع اللحظي.', 
          pain: 10, 
          money: 10, 
          freq: 6, 
          gap: 9,
          budget: 'high', 
          b2x: 'B2B',
          countries: ['SA', 'AE', 'QA', 'EG', 'IN'],
          opps: [{ type: 'IoT Monitoring', name: 'ChillTrace', model: 'تأجير مستشعرات IoT مع نظام تنبيهات ذكي' }]
        }
      ]
    },
    {
      id: 'trucking', 
      name: 'النقل البري والشحن', 
      count: 124, 
      problems: [
        {
          id: 'log10', 
          title: 'مشكلة "الرحلات الفارغة" (Empty Backhaul)', 
          desc: 'تعود 40% من الشاحنات فارغة بعد توصيل شحنتها، مما يرفع أسعار الشحن ويزيد من الانبعاثات الكربونية المهدرة.', 
          pain: 9, 
          money: 10, 
          freq: 10, 
          gap: 7,
          budget: 'low', 
          b2x: 'B2B',
          countries: ['SA', 'EG', 'JO', 'US', 'CN'],
          opps: [{ type: 'Truck Matching', name: 'ShareTruck', model: 'منصة لمطابقة الشاحنات الفارغة مع طلبيات الشحن في طريق العودة' }]
        }
      ]
    }
  ]
};
