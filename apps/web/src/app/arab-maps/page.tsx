import { PublicLayout } from "@/components/layout/PublicLayout";
import { ArabWorldMapsView } from "@/components/views/ArabWorldMapsView";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "التوزيعات السكانية والاقتصادية بالوطن العربي | مؤشرات الناتج المحلي ودخل الفرد",
  description:
    "مرصد تحليلي تفاعلي يعرض إحصائيات التوزيع السكاني، الناتج المحلي الإجمالي (GDP)، ومتوسط دخل الفرد لـ 22 دولة عربية عبر خريطة استثمارية ذكية متكاملة.",
  path: "/arab-maps",
  keywords: [
    "سكان الوطن العربي",
    "التوزيعات السكانية",
    "الناتج المحلي للدول العربية",
    "دخل الفرد العربي",
    "خريطة الوطن العربي التفاعلية",
    "مؤشرات اقتصادية عربية",
    "دراسات الجدوى الإقليمية",
    "بيانات اقتصادية عربية"
  ],
});

export const arabWorldDatasetJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "مرصد التوزيعات السكانية والاقتصادية للوطن العربي",
  description: "بيانات تفاعلية شاملة لمؤشرات السكان، الناتج المحلي الإجمالي، ودخل الفرد عبر 22 دولة عربية.",
  url: "https://khotta.app/arab-maps",
  keywords: ["سكان الوطن العربي", "GDP الوطن العربي", "دخل الفرد العربي"],
  creator: {
    "@type": "Organization",
    name: "منصة خطة",
    url: "https://khotta.app"
  },
  spatialCoverage: "Middle East and North Africa (MENA)",
  temporalCoverage: "2024/2026",
  inLanguage: "ar"
};

export default function ArabMapsPage() {
  return (
    <PublicLayout>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(arabWorldDatasetJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <ArabWorldMapsView />
      </div>
    </PublicLayout>
  );
}
