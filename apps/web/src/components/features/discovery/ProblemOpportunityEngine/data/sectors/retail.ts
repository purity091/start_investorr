import { ShoppingBag } from 'lucide-react';
import { Sector } from '../../types';

export const retailData: Sector = {
  id: 'retail', 
  icon: ShoppingBag, 
  name: 'التجارة الإلكترونية والتجزئة', 
  count: 4200, 
  color: 'sky',
  subs: [
    {
      id: 'returns', 
      name: 'إدارة المرتجعات', 
      count: 85, 
      problems: [
        {
          id: 'ret1', 
          title: 'ارتفاع تكلفة وتعقيد عمليات إرجاع المنتجات', 
          desc: 'في قطاع الأزياء، تصل نسبة المرتجعات إلى 30%، وتكلفة استرداد وفحص وتخزين المنتج المرتجع تتجاوز أحياناً قيمته الربحية.', 
          pain: 8, 
          money: 10, 
          freq: 10, 
          gap: 7,
          budget: 'high', 
          b2x: 'B2B',
          countries: ['US', 'GB', 'DE', 'AE', 'SA'],
          opps: [
            { type: 'Reverse Logistics SaaS', name: 'ReTurny', model: 'أتمتة طلبات الإرجاع وتوفير ملصقات شحن مخصصة' },
            { type: 'Circular Economy', name: 'OutletAI', model: 'منصة لبيع المرتجعات المفتوحة مباشرة بسعر مخفض' }
          ]
        }
      ]
    },
    {
      id: 'personalization', 
      name: 'التخصيص وتجربة المستخدم', 
      count: 142, 
      problems: [
        {
          id: 'ret5', 
          title: 'ضعف التحويل بسبب محركات البحث غير الدقيقة عربياً', 
          desc: 'المتسوق العربي يواجه صعوبة في العثور على المنتجات باستخدام اللهجات المحلية، ومحركات البحث التقليدية تفشل في فهم النية الحقيقية للشراء باللغة العربية.', 
          pain: 7, 
          money: 9, 
          freq: 10, 
          gap: 8,
          budget: 'medium', 
          b2x: 'B2B',
          countries: ['SA', 'AE', 'EG', 'QA'],
          opps: [{ type: 'AI Semantic Search', name: 'Fahim AI', model: 'API للمتاجر لتحويل البحث إلى بحث سيمانتك ذكي' }]
        }
      ]
    },
    {
      id: 'social_commerce', 
      name: 'التجارة الاجتماعية', 
      count: 96, 
      problems: [
        {
          id: 'ret10', 
          title: 'تشتت المخزون لتجار التواصل الاجتماعي (Sellers)', 
          desc: 'الآلاف من الأسر المنتجة وصغار التجار على تيك توك وإنستقرام يفشلون في إدارة مخزونهم ومبيعاتهم عبر قنوات متعددة، مما يؤدي لطلبيات تفوق المخزون الحقيقي.', 
          pain: 9, 
          money: 7, 
          freq: 9, 
          gap: 9,
          budget: 'low', 
          b2x: 'B2C',
          countries: ['EG', 'SA', 'MA', 'ID', 'PH'],
          opps: [{ type: 'Social CRM', name: 'TajerHub', model: 'تطبيق موحد لإدارة الطلبات والرد الآلي والمخزون' }]
        }
      ]
    }
  ]
};
