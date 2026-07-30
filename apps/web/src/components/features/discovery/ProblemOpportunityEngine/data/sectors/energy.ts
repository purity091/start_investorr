import { Leaf } from 'lucide-react';
import { Sector } from '../../types';

export const energyData: Sector = {
  id: 'energy', 
  icon: Leaf, 
  name: 'الطاقة والاستدامة', 
  count: 1420, 
  color: 'teal',
  subs: [
    {
      id: 'solar_tech', 
      name: 'التكنولوجيا الشمسية', 
      count: 48, 
      problems: [
        {
          id: 'en1', 
          title: 'عجز سكان الشقق عن الوصول للطاقة النظيفة', 
          desc: 'الملايين يعيشون في مبانٍ سكنية لا تسمح بتركيب ألواح شمسية فردية، مما يستثني شريحة ضخمة من ثورة الطاقة المتجددة.', 
          pain: 7, 
          money: 9, 
          freq: 10, 
          gap: 9,
          budget: 'high', 
          b2x: 'B2C',
          countries: ['AE', 'SA', 'US', 'DE'],
          opps: [
            { type: 'Virtual Net Metering', name: 'CloudSolar', model: 'شراء حصة في حقل شمسي بعيد وخصمها من فاتورة الكهرباء' },
            { type: 'Sharing Economy', name: 'OpenGrid', model: 'منصة لتبادل الطاقة الفائضة بين الجيران' }
          ]
        }
      ]
    },
    {
      id: 'industrial_efficiency', 
      name: 'كفاءة الطاقة الصناعية', 
      count: 62, 
      problems: [
        {
          id: 'en5', 
          title: 'الهدر الخفي للطاقة في المصانع التقليدية', 
          desc: 'المصانع في الأسواق النامية تفقد ما يصل إلى 40% من الطاقة بسبب معدات قديمة وغياب المراقبة اللحظية للاستهلاك، مما يرفع تكلفة الإنتاج.', 
          pain: 9, 
          money: 10, 
          freq: 10, 
          gap: 7,
          budget: 'medium', 
          b2x: 'B2B',
          countries: ['EG', 'JO', 'CN', 'IN', 'SA'],
          opps: [{ type: 'Energy Audit AI', name: 'WasteNo', model: 'نظام مراقبة مرتبط بمحركات المصنع لتقليل الهدر الذكي' }]
        }
      ]
    },
    {
      id: 'ev_infrastructure', 
      name: 'البنية التحتية للمركبات الكهربائية', 
      count: 38, 
      problems: [
        {
          id: 'en10', 
          title: 'بطء شحن الأساطيل التجارية الكهربائية', 
          desc: 'شركات التوصيل التي ترغب في التحول لمركبات كهربائية تواجه مشكلة في وقت الشحن الطويل الذي يعطل خطوط الإمداد ونقص محطات الشحن السريع المخصصة للشاحنات.', 
          pain: 8, 
          money: 9, 
          freq: 5, 
          gap: 8,
          budget: 'high', 
          b2x: 'B2B',
          countries: ['AE', 'SA', 'US', 'CN', 'NO'],
          opps: [{ type: 'Battery Swapping', name: 'VoltSwap', model: 'محطات تبديل بطاريات سريعة (60 ثانية) بدلاً من الشحن' }]
        }
      ]
    }
  ]
};
