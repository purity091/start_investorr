import { PublicLayout } from "@/components/layout/PublicLayout";
import { SaaSIdeasGallery } from "@/components/views/SaaSIdeasGallery";
import { readPublicJson } from "@/lib/public-data-cache";
import { createMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "أفكار مشاريع SaaS ناجحة مع نماذج إيرادات وتحليل سوق",
  description:
    "استكشف أفكار مشاريع SaaS قابلة للتنفيذ مع نماذج اشتراك، مؤشرات نمو، دروس من شركات ناجحة وتجارب فاشلة، وتحليلات تساعدك على اختيار فكرة برمجية قابلة للاستثمار.",
  path: "/saas-ideas",
  keywords: ["أفكار مشاريع SaaS", "مشاريع برمجية", "SaaS عربي", "نموذج اشتراك", "MRR", "ARR"],
});

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
