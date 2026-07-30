import { Wallet } from 'lucide-react';
import { Sector } from '../../types';

export const fintechData: Sector = {
  id: 'fintech', 
  icon: Wallet, 
  name: 'المالية (FinTech)', 
  count: 3450, 
  color: 'indigo',
  subs: [
    {
      id: 'payments', 
      name: 'المدفوعات والتحويلات', 
      count: 145, 
      problems: [
        {
          id: 'ft1', 
          title: 'بطء وتكلفة التحويلات العابرة للحدود للمؤسسات الصغيرة', 
          desc: 'تعاني الشركات الصغيرة والمتوسطة في منطقة الخليج وأفريقيا من رسوم تحويل تصل لـ 5% وتأخير لمدة 3-5 أيام عند التعامل مع موردين دوليين بسبب تعقيدات البنوك المراسلة.', 
          pain: 9, 
          money: 10, 
          freq: 10, 
          gap: 8,
          budget: 'medium', 
          b2x: 'B2B',
          countries: ['SA', 'AE', 'EG', 'IN'],
          opps: [
            { type: 'Stablecoin Rails', name: 'SwiftBridge', model: 'رسوم 0.5% على التحويل الفوري عبر العملات المستقرة' },
            { type: 'Liquidity Pool', name: 'NeoCor', model: 'نموذج موازنة السيولة المحلية لتقليل الاحتكاك البنكي' }
          ]
        },
        {
          id: 'ft5', 
          title: 'ارتفاع رسوم التحويلات المالية للعمالة الوافدة', 
          desc: 'العمالة ذات الدخل المنخفض تفقد ما يصل إلى 10% من دخلها في رسوم التحويل والفرق في سعر الصرف عند إرسال الأموال لذويهم.', 
          pain: 10, 
          money: 7, 
          freq: 10, 
          gap: 9,
          budget: 'low', 
          b2x: 'B2C',
          countries: ['SA', 'AE', 'QA', 'KW', 'IN', 'PH'],
          opps: [{ type: 'Neobank', name: 'WorkerWallet', model: 'اشتراك شهري زهيد مقابل تحويلات مجانية غير محدودة' }]
        },
        {
          id: 'ft7', 
          title: 'تعقيد تسوية المدفوعات لمنصات التجارة الإلكترونية عالية الحجم', 
          desc: 'تواجه المنصات الكبيرة صعوبة في مطابقة آلاف المدفوعات اليومية مع الطلبات الفعلية، مما يؤدي لفجوات محاسبية وضياع أرباح.', 
          pain: 7, 
          money: 9, 
          freq: 10, 
          gap: 6,
          budget: 'high', 
          b2x: 'B2B',
          countries: ['US', 'CN', 'SA', 'AE'],
          opps: [{ type: 'Reconciliation AI', name: 'MatchFlow', model: 'SaaS - رسوم شهرية حسب حجم الأسطر المحاسبية' }]
        }
      ]
    },
    {
      id: 'lending', 
      name: 'الإقراض والتمويل البديل', 
      count: 92, 
      problems: [
        {
          id: 'ft2', 
          title: 'غياب التقييم الائتماني للعاملين المستقلين (Freelancers)', 
          desc: 'أكثر من 20 مليون عامل مستقل في المنطقة والأسواق الناشئة غير قادرين على الحصول على قروض شخصية أو بطاقات ائتمان لأن البنوك لا تعترف بالدخل غير التقليدي.', 
          pain: 9, 
          money: 9, 
          freq: 8, 
          gap: 9,
          budget: 'medium', 
          b2x: 'B2C',
          countries: ['SA', 'EG', 'AE', 'US'],
          opps: [
            { type: 'Alternative Credit Scoring', name: 'TrustValue', model: 'توفير بيانات التقييم للبنوك مقابل رسوم (API)' },
            { type: 'Micro-Lending', name: 'FreeCap', model: 'إقراض مباشر بناءً على تدفقات المحافظ الرقمية' }
          ]
        },
        {
          id: 'ft8', 
          title: 'تأخر السيولة لموردي المصانع (Supply Chain Gap)', 
          desc: 'الموردون الصغار للمصانع الكبرى يضطرون للانتظار 90-120 يوماً لتحصيل فواتيرهم، مما يهدد استمرارية عملياتهم بسبب نقص السيولة.', 
          pain: 9, 
          money: 10, 
          freq: 8, 
          gap: 8,
          budget: 'high', 
          b2x: 'B2B',
          countries: ['DE', 'CN', 'IN', 'SA'],
          opps: [{ type: 'Factoring Platform', name: 'InvX', model: 'شراء الفواتير بخصم بسيط وتوفير سيولة فورية' }]
        },
        {
          id: 'ft3', 
          title: 'عبء الإيجار السكني السنوي المسبق', 
          desc: 'في مدن مثل الرياض ودبي، يشكل دفع الإيجار دفعة واحدة أو دفعتين عبئاً مالياً ضخماً على الموظفين الجدد والشباب.', 
          pain: 10, 
          money: 10, 
          freq: 7, 
          gap: 8,
          budget: 'high', 
          b2x: 'B2C',
          countries: ['SA', 'AE'],
          opps: [{ type: 'RNPL (Rent Now Pay Later)', name: 'StayMonthly', model: 'دفع الإيجار السنوي للمالك وتقسيطه للمستأجر شهرياً بفائدة' }]
        }
      ]
    },
    {
      id: 'insurtech', 
      name: 'تكنولوجيا التأمين', 
      count: 61, 
      problems: [
        {
          id: 'ft11', 
          title: 'انعدام الغطاء التأميني لعمال "اقتصاد المنصة" (Gig Workers)', 
          desc: 'سائقو التوصيل ومقدمو الخدمات المستقلين لا يملكون تأميناً صحياً أو تأميناً ضد الحوادث بسبب طبيعة عملهم غير الدائم.', 
          pain: 9, 
          money: 8, 
          freq: 10, 
          gap: 9,
          budget: 'medium', 
          b2x: 'B2B2C',
          countries: ['AE', 'SA', 'EG', 'IN', 'US'],
          opps: [{ type: 'Micro-Insurance', name: 'GigShield', model: 'تأمين "بالدقيقة" أو "بالرحلة" مدمج في تطبيقات التوصيل' }]
        }
      ]
    },
    {
      id: 'wealth', 
      name: 'إدارة الثروات والاستثمار', 
      count: 78, 
      problems: [
        {
          id: 'ft10', 
          title: 'غياب المستشار المالي للفئة "فوق المتوسطة"', 
          desc: 'الأفراد الذين يملكون مدخرات بين 10k-100k دولار لا يجدون مدراء ثروات يهتمون بهم، ويفتقرون للأدوات المؤتمتة للاستثمار في الصناديق العالمية والمحلية بطريقة شرعية.', 
          pain: 7, 
          money: 10, 
          freq: 5, 
          gap: 9,
          budget: 'medium', 
          b2x: 'B2C',
          countries: ['SA', 'AE', 'QA', 'US', 'GB'],
          opps: [{ type: 'Robo-Advisor', name: 'HalalWealth AI', model: 'رسوم إدارية 0.5% سنوياً على الأصول' }]
        }
      ]
    },
    {
      id: 'regtech', 
      name: 'تشريعات المال (RegTech)', 
      count: 54, 
      problems: [
        {
          id: 'ft9', 
          title: 'التكلفة الباهظة للالتزام ومكافحة غسيل الأموال للشركات الناشئة', 
          desc: 'الشركات المالية الناشئة تنفق ما يصل إلى 30% من ميزانيتها على فرق الامتثال اليدوي وأنظمة الـ KYC المكلفة والبطيئة.', 
          pain: 8, 
          money: 9, 
          freq: 10, 
          gap: 7,
          budget: 'high', 
          b2x: 'B2B',
          countries: ['SA', 'AE', 'US', 'GB', 'SG', 'CH'],
          opps: [{ type: 'Compliance-as-a-Service', name: 'RegShield', model: 'رسوم عن كل عملية فحص (Usage-based billing)' }]
        }
      ]
    }
  ]
};
