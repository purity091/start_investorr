import { PublicLayout } from "@/components/layout/PublicLayout";
import { PlatformAcademyView } from "@/components/views/PlatformAcademyView";
import { readPublicJson } from "@/lib/public-data-cache";
import { createMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "أكاديمية خطة لتعلم دراسة الجدوى ونماذج العمل",
  description:
    "مقالات وأدلة عربية عملية لفهم دراسة الجدوى، تحليل السوق، نماذج العمل، مؤشرات SaaS، التوقعات المالية، وتجهيز المشاريع للنمو والاستثمار.",
  path: "/platform-academy",
  keywords: ["تعلم دراسة الجدوى", "أكاديمية ريادة الأعمال", "تحليل السوق", "نموذج العمل", "مؤشرات SaaS"],
});

export default async function PlatformAcademyPage() {
  const academyIndex = await readPublicJson<{ categories?: any[]; articles?: any[] }>("academy/index.json");

  return (
    <PublicLayout>
      <PlatformAcademyView
        initialCategories={academyIndex.categories || []}
        initialArticles={academyIndex.articles || []}
      />
    </PublicLayout>
  );
}
