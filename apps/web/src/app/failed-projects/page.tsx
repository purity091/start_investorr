import { PublicLayout } from "@/components/layout/PublicLayout";
import { FailedProjectsGallery } from "@/components/views/FailedProjectsGallery";
import { readPublicJson } from "@/lib/public-data-cache";

export const revalidate = 3600;

export const metadata = {
  title: "شركات فشلت | خطة",
  description: "دروس عملية من مشاريع وشركات لم تنجح وأسباب فشلها.",
};

export default async function FailedProjectsPage() {
  const projects = await readPublicJson<any[]>("failed-projects/index.json");

  return (
    <PublicLayout>
      <FailedProjectsGallery initialProjects={projects} />
    </PublicLayout>
  );
}
