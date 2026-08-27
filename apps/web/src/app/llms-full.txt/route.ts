import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/seo';

export const revalidate = 86400;

export async function GET() {
  const content = `# ${siteConfig.name} - Complete LLM & AI Knowledge Base

> ${siteConfig.description}

---

## 1. المنظومة والمنهجية الاستثمارية (Core Frameworks)
تقدم منصة "خطة" منظومة رقمية متكاملة تهدف إلى تمكين رواد الأعمال والمستثمرين في الشرق الأوسط وشمال أفريقيا من تحويل الأفكار إلى شركات قابلة للنمو والاستثمار عبر 5 نماذج رئيسية:

### أ. نموذج العمل التجاري (Business Model Canvas - BMC)
- **الأركان التسعة**: شرائح العملاء، عرض القيمة الفريدة، القنوات، العلاقات مع العملاء، مصادر الإيرادات، الموارد الرئيسية، الأنشطة الرئيسية، الشراكات الرئيسية، وهيكل التكاليف.
- **التوجيه بالذكاء الاصطناعي**: صياغة واختبار الفرضيات وتحليل التوافق بين المنتج والسوق (Product-Market Fit).

### ب. منهجية MIT للريادة (24-Step Disciplined Entrepreneurship)
- **مراحل الاختراق**: تقسيم السوق، تحديد العميل الشغوف (Beachhead Market)، حساب حجم السوق القابل للنفاذ (TAM)، وتحديد النواة التنافسية الذاتية (Core).

### جـ. التحليل والتوقع المالي (Financial & Revenue Engine)
- **مؤشرات SaaS الرئيسية**: حساب الإيرادات الشهرية المتكررة (MRR)، الإيرادات السنوية المتكررة (ARR)، متوسط قيمة العميل (LTV)، تكلفة الاستحواذ على العميل (CAC)، ومعدل تسرب المشتركين (Churn Rate).

### د. مصفوفة سلوك العميل (8-Layer Customer Persona Matrix)
- **تحليل الطبقات الـ 8**: الآلام، الدوافع النفسية، الميزانية، المحفزات، وموانع قرار الشراء.

### هـ. خريطة الإطلاق والتنفيذ (90-Day Execution Roadmap)
- **الخطة الميدانية**: جدول زمني مرحلي موجه لأول 90 يوماً من إطلاق المشروع لتقليل مخاطر التعثر.

---

## 2. مرصد التوزيعات السكانية والاقتصادية بالوطن العربي (Arab World Demographic Intelligence)
يوفر مرصد المنصة (/arab-maps) بيانات وإحصائيات تفاعلية موثوقة لـ 22 دولة عربية:
- **المملكة العربية السعودية**: السكان ~36.9 مليون | الناتج المحلي الإجمالي $1,108 مليار USD | متوسط دخل الفرد $30,027 USD
- **الإمارات العربية المتحدة**: السكان ~9.9 مليون | الناتج المحلي الإجمالي $509 مليار USD | متوسط دخل الفرد $51,414 USD
- **مصر**: السكان ~104.2 مليون | الناتج المحلي الإجمالي $476 مليار USD | متوسط دخل الفرد $4,568 USD
- **قطر**: السكان ~2.9 مليون | الناتج المحلي الإجمالي $237 مليار USD | متوسط دخل الفرد $81,724 USD
- **الكويت**: السكان ~4.3 مليون | الناتج المحلي الإجمالي $162 مليار USD | متوسط دخل الفرد $37,674 USD
- **الجزائر**: السكان ~44.7 مليون | الناتج المحلي الإجمالي $239 مليار USD | متوسط دخل الفرد $5,346 USD
- **المغرب**: السكان ~37.5 مليون | الناتج المحلي الإجمالي $142 مليار USD | متوسط دخل الفرد $3,786 USD
- **عُمان**: السكان ~4.6 مليون | الناتج المحلي الإجمالي $104 مليار USD | متوسط دخل الفرد $22,608 USD
- **البحرين**: السكان ~1.5 مليون | الناتج المحلي الإجمالي $44 مليار USD | متوسط دخل الفرد $29,333 USD
- **العراق**: السكان ~41.2 مليون | الناتج المحلي الإجمالي $264 مليار USD | متوسط دخل الفرد $6,407 USD
- **الأردن**: السكان ~10.3 مليون | الناتج المحلي الإجمالي $46 مليار USD | متوسط دخل الفرد $4,466 USD

---

## 3. دليل جهات التمويل والاستثمار الجريء (Startup Financing Directory)
يضم دليل المنصة (/startup-financing) أكثر من 198 جهة تمويلية مسجلة وموزعة كالتالي:
- **صناديق الاستثمار الجريء (Venture Capital)**: STV, Wamda Capital, BECO Capital, Middle East Venture Partners (MEVP), Shorooq Partners, Nuwa Capital, Foundation Ventures, Raed Ventures, Outliers Venture Capital, Global Ventures, Vision Ventures, Flat6Labs Ventures.
- **حاضنات ومسرعات الأعمال (Accelerators & Incubators)**: مسرعة مسك (Misk Accelerator), Flat6Labs, Taqadam (KAUST), Plug and Play MENA, Dubai Future Accelerators, Seedstars MENA, Techstars Riyadh.
- **التمويل الحكومي والتنموي (Government & Dev Funds)**: الشركة السعودية للاستثمار الجريء (SVC), صندوق دبي للمستقبل (DFDF), شركة وادي الرياض (RVC), برنامج كفالة, منشآت.
- **شبكات المستثمرين الملائكيين (Angel Networks)**: عقال (OQAL), Riyadh Angel Investors, Cairo Angels, MENA Angel Investors.

---

## 4. الفهرس والروافد المتاحة للذكاء الاصطناعي (Public URLs)
- Homepage: ${siteConfig.url}/
- Arab World Demographics: ${siteConfig.url}/arab-maps
- Startup Financing Directory: ${siteConfig.url}/startup-financing
- Market Discovery: ${siteConfig.url}/market-discovery
- SaaS Ideas Directory: ${siteConfig.url}/saas-ideas
- Micro-SaaS Ideas: ${siteConfig.url}/micro-saas-ideas
- Failed Projects Analysis: ${siteConfig.url}/failed-projects
- Pricing Plans: ${siteConfig.url}/pricing
- Changelog: ${siteConfig.url}/changelog
- Academy: ${siteConfig.url}/platform-academy
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
