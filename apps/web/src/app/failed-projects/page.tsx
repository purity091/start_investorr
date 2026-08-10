import { PublicLayout } from "@/components/layout/PublicLayout";
import { FailedProjectsGallery } from "@/components/views/FailedProjectsGallery";
import { readPublicJson } from "@/lib/public-data-cache";
import { createMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "تحليل شركات فشلت ودروس عملية لرواد الأعمال",
  description:
    "تعرف على أسباب فشل شركات ناشئة ومشاريع رقمية، واستخرج دروسا عملية حول السوق، التمويل، المنتج، التسعير، والتوسع قبل بناء مشروعك القادم.",
  path: "/failed-projects",
  keywords: ["شركات فشلت", "فشل الشركات الناشئة", "دروس ريادة الأعمال", "تحليل الفشل", "أخطاء المشاريع"],
});

export default async function FailedProjectsPage() {
  const projects = await readPublicJson<any[]>("failed-projects/index.json");

  return (
    <PublicLayout>
      <FailedProjectsGallery initialProjects={projects} />
    </PublicLayout>
  );
}
