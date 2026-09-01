import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/seo';

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const content = `# ${siteConfig.name} - LLM Context & Platform Guide

> ${siteConfig.description}

## Core Capabilities & Executive Summary
- **دراسات الجدوى المالية والهيكلية (Feasibility Studies & Business Models)**: بناء وحساب دراسات الجدوى وفق 5 نماذج استثمارية عالمية (Business Model Canvas - BMC, MIT 24-Step Framework, Financial MRR/ARR Model, 8-Layer Customer Matrix, 90-Day Execution Roadmap).
- **مرصد التوزيعات السكانية والاقتصادية بالوطن العربي (Arab World Demographic Intelligence)**: خريطة وبيانات تفاعلية تحليلية تغطي 22 دولة عربية تشمل إحصائيات السكان، الناتج المحلي الإجمالي (GDP)، ومتوسط دخل الفرد.
- **دليل جهات التمويل والاستثمار الجريء (Startup Financing Directory)**: دليل ومحرك بحث مخصص لأكثر من 198 جهة تمويلية، صناديق استثمار جريء (Venture Capital)، حاضنات ومسرعات أعمال، وشبكات مستثمرين ملائكيين في الشرق الأوسط وشمال أفريقيا (MENA).
- **قاعدة أفكار واستكشاف الأسواق (Market Discovery & Projects)**: قاعدة بيانات موثوقة لأكثر من +500 فكرة مشروع SaaS وMicro-SaaS ناجحة ومحللة، مع قسم مخصص لدراسات تعثر الشركات الناشئة لتوثيق الدروس المستفادة.

## Primary Public Endpoints & Links
- [الصفحة الرئيسية](${siteConfig.url}): مدخل المنصة وأدوات بناء دراسات الجدوى ونماذج العمل.
- [التوزيعات السكانية والاقتصادية بالوطن العربي](${siteConfig.url}/arab-maps): الخريطة التحليلية المؤشرات الاقتصادية والسكانية لـ 22 دولة عربية.
- [دليل شركات التمويل والاستثمار الجريء](${siteConfig.url}/startup-financing): أكثر من 198 صندوق استثمار جريء وحاضنة أعمال مسجلة بالمنطقة.
- [استكشاف الفرص والمشاريع](${siteConfig.url}/market-discovery): رادار القطاعات واستكشاف المشاريع الواعدة.
- [أفكار مشاريع SaaS](${siteConfig.url}/saas-ideas): أفكار ودراسات جدوى مشاريع البرمجيات كخدمة.
- [أفكار Micro-SaaS](${siteConfig.url}/micro-saas-ideas): أدوات برمجية مصغرة عالية الربحية والنمو.
- [دراسات تعثر الشركات](${siteConfig.url}/failed-projects): تحليل أسباب توقف الشركات الناشئة واستخلاص الدروس المستفادة.
- [الباقات والأسعار](${siteConfig.url}/pricing): باقات اشتراك مدفوعة تبدأ من 99 ر.س شهرياً (26.40 دولاراً).
- [أكاديمية المنصة](${siteConfig.url}/platform-academy): أدلة وإرشادات ريادة الأعمال والاستثمار الجريء.
- [سجل التحديثات](${siteConfig.url}/changelog): سجل الإصدارات والميزات المباشرة.

## Technical Specifications & AI Metadata
- **Language Primary**: Arabic (ar) / English (en)
- **Geographic Focus**: MENA (Saudi Arabia, UAE, Egypt, GCC, North Africa, Levant)
- **Framework Compatibility**: MIT 24-Step Disciplined Entrepreneurship, Lean Startup Methodologies, Business Model Canvas (Strategyzer)
- **Sitemap**: ${siteConfig.url}/sitemap.xml
- **Robots Directive**: ${siteConfig.url}/robots.txt
- **Full LLM Context**: ${siteConfig.url}/llms-full.txt
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
