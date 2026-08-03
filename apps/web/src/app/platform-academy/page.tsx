import { PublicLayout } from "@/components/layout/PublicLayout";
import { PlatformAcademyView } from "@/components/views/PlatformAcademyView";
import { readPublicJson } from "@/lib/public-data-cache";

export const revalidate = 3600;

export const metadata = {
  title: "أكاديمية خطة | خطة",
  description: "أدلة تعليمية لبناء المشاريع، دراسة السوق، ونماذج العمل.",
};

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
