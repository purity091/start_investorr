import { Factory } from 'lucide-react';
import { Sector } from '../../types';

export const industryData: Sector = {
  id: 'industry', 
  icon: Factory, 
  name: 'الصناعة والإنتاج', 
  count: 3600, 
  color: 'amber',
  subs: [
    {
      id: 'maintenance', 
      name: 'الصيانة الذكية والرقابة', 
      count: 94, 
      problems: [
        {
          id: 'ind1', 
          title: 'الأعطال المفاجئة (Unplanned Downtime) في المصانع', 
          desc: 'توقف خط إنتاج في مصنع بتروكيماويات أو سيارات ليوم واحد قد يكلف ملايين الدولارات، والصيانة الحالية تعتمد على رد الفعل (بعد العطل) أو الجداول الزمنية الجامدة.', 
          pain: 10, 
          money: 10, 
          freq: 5, 
          gap: 8,
          budget: 'high', 
          b2x: 'B2B',
          countries: ['GE', 'CN', 'US', 'SA', 'JP'],
          opps: [
            { type: 'Predictive Maintenance', name: 'SensorSense', model: 'تركيب حساسات IoT للتنبؤ بالأعطال قبل وقوعها' },
            { type: 'Digital Twin', name: 'FactorySim', model: 'بناء نسخة رقمية للمصنع لمحاكاة الأعطال' }
          ]
        }
      ]
    },
    {
      id: 'safety', 
      name: 'سلامة العمليات والمنشآت', 
      count: 67, 
      problems: [
        {
          id: 'ind5', 
          title: 'صعوبة مراقبة السلامة في البيئات الخطرة والمنعزلة', 
          desc: 'المصانع البعيدة ومواقع التنقيب تعاني من صعوبة مراقبة ارتداء أدوات السلامة (PPE) أو تسرب الغازات اللحظية، مما يعرض الأرواح والمنشآت للخطر.', 
          pain: 10, 
          money: 8, 
          freq: 6, 
          gap: 9,
          budget: 'high', 
          b2x: 'B2B',
          countries: ['SA', 'AE', 'US', 'NO'],
          opps: [{ type: 'Vision AI', name: 'SafetyWatch', model: 'استخدام الكاميرات الحالية لتحليل الالتزام بالسلامة آلياً' }]
        }
      ]
    },
    {
      id: 'small_mfg', 
      name: 'تمكين المصانع الصغيرة والمتوسطة', 
      count: 112, 
      problems: [
        {
          id: 'ind10', 
          title: 'غياب رؤية سلاسل الإمداد للمصانع الصغيرة', 
          desc: 'المصانع الصغيرة لا تملك القدرة على الوصول للمواد الخام بأسعار تنافسية أو تتبع وصولها، مما يضعها في وضع غير منافس أمام العمالقة.', 
          pain: 8, 
          money: 9, 
          freq: 8, 
          gap: 7,
          budget: 'medium', 
          b2x: 'B2B',
          countries: ['IN', 'TR', 'EG', 'CN', 'SA'],
          opps: [{ type: 'Procurement Marketplace', name: 'MawadHub', model: 'شراء جماعي للمواد الخام لتقليل التكلفة' }]
        }
      ]
    }
  ]
};
