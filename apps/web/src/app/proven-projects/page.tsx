import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProvenProjectsGallery } from "@/components/views/ProvenProjectsGallery";
import { readPublicJson } from "@/lib/public-data-cache";
import { createMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "أفكار شركات ناجحة ودراسات حالة قابلة للتطبيق",
  description:
    "قاعدة بيانات عربية لدراسة شركات ومشاريع ناجحة، تشمل نموذج العمل ومصادر الإيرادات وإشارات النمو لمساعدة رواد الأعمال على بناء أفكار قابلة للتنفيذ.",
  path: "/proven-projects",
  keywords: ["شركات ناجحة", "دراسات حالة", "أفكار شركات", "تحليل شركات", "نماذج أعمال ناجحة"],
});

export default async function ProvenProjectsPage() {
  const projects = await readPublicJson<any[]>("proven-projects/index.json");

  return (
    <PublicLayout>
      <ProvenProjectsGallery initialProjects={projects} />
    </PublicLayout>
  );
}
