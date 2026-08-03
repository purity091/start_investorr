import { PublicLayout } from "@/components/layout/PublicLayout";
import { SaaSIdeasGallery } from "@/components/views/SaaSIdeasGallery";
import { readPublicJson } from "@/lib/public-data-cache";

export const revalidate = 3600;

export const metadata = {
  title: "أفكار مشاريع SaaS | خطة",
  description: "نماذج وأفكار لمشاريع البرمجيات كخدمة من شركات ناجحة وتجارب فاشلة.",
};

const isSaasIdea = (item: any) => {
  const cat = (item.category || '').toLowerCase();
  const bm = (item.company?.business_model || '').toLowerCase();
  const name = (item.name || '').toLowerCase();
  const headline = (item.headline || '').toLowerCase();

  return (
    cat.includes('saas') ||
    bm.includes('saas') ||
    name.includes('saas') ||
    headline.includes('saas') ||
    cat.includes('برمجيات') ||
    cat.includes('اشتراك')
  );
};

export default async function SaaSIdeasPage() {
  const [provenList, failedList] = await Promise.all([
    readPublicJson<any[]>("proven-projects/index.json"),
    readPublicJson<any[]>("failed-projects/index.json"),
  ]);
  const projects = [
    ...provenList.map((item) => ({ ...item, sourceStatus: 'proven' })),
    ...failedList.map((item) => ({ ...item, sourceStatus: 'failed' })),
  ].filter(isSaasIdea);

  return (
    <PublicLayout>
      <SaaSIdeasGallery initialProjects={projects} />
    </PublicLayout>
  );
}
