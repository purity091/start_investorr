import { PublicLayout } from "@/components/layout/PublicLayout";
import { ProvenProjectsGallery } from "@/components/views/ProvenProjectsGallery";
import { readPublicJson } from "@/lib/public-data-cache";

export const revalidate = 3600;

export const metadata = {
  title: "أفكار شركات ناجحة | خطة",
  description: "استكشف نماذج مشاريع وشركات ناجحة قابلة للدراسة والتطبيق.",
};

export default async function ProvenProjectsPage() {
  const projects = await readPublicJson<any[]>("proven-projects/index.json");

  return (
    <PublicLayout>
      <ProvenProjectsGallery initialProjects={projects} />
    </PublicLayout>
  );
}
