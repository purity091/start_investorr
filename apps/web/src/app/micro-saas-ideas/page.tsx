import { PublicLayout } from "@/components/layout/PublicLayout";
import { MicroSaaSIdeasGallery } from "@/components/views/MicroSaaSIdeasGallery";
import { readPublicJson } from "@/lib/public-data-cache";
import { createMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = createMetadata({
  title: "أفكار Micro-SaaS للمؤسسين الأفراد والفرق الصغيرة",
  description:
    "دليل عملي لأفكار Micro-SaaS منخفضة التعقيد ومناسبة لمؤسس فردي أو فريق صغير، مع نماذج ربح متكررة وفرص نيش قابلة للاختبار السريع.",
  path: "/micro-saas-ideas",
  keywords: ["أفكار Micro-SaaS", "مشاريع صغيرة رقمية", "مؤسس فردي", "SaaS مصغر", "دخل متكرر"],
});

const MICRO_SAAS_SLUGS = new Set([
  'dashp',
  'supademo',
  'formula-bot',
  'outseta',
  'bannerbear',
  'shipfast',
  'carrd',
  'plausible',
  'cal-com',
  'resend',
  'scalefactor',
]);

const isMicroSaasIdea = (item: any) => {
  const id = item.slug || item.id;
  if (MICRO_SAAS_SLUGS.has(id)) return true;

  const cat = (item.category || '').toLowerCase();
  const bm = (item.company?.business_model || '').toLowerCase();

  return cat.includes('micro-saas') || bm.includes('micro-saas') || cat.includes('micro saas');
};

export default async function MicroSaaSIdeasPage() {
  const [provenList, failedList] = await Promise.all([
    readPublicJson<any[]>("proven-projects/index.json"),
    readPublicJson<any[]>("failed-projects/index.json"),
  ]);
  const projects = [
    ...provenList.map((item) => ({ ...item, sourceStatus: 'proven' })),
    ...failedList.map((item) => ({ ...item, sourceStatus: 'failed' })),
  ].filter(isMicroSaasIdea);

  return (
    <PublicLayout>
      <MicroSaaSIdeasGallery initialProjects={projects} />
    </PublicLayout>
  );
}
