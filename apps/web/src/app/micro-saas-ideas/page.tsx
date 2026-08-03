import { PublicLayout } from "@/components/layout/PublicLayout";
import { MicroSaaSIdeasGallery } from "@/components/views/MicroSaaSIdeasGallery";
import { readPublicJson } from "@/lib/public-data-cache";

export const revalidate = 3600;

export const metadata = {
  title: "أفكار Micro-SaaS | خطة",
  description: "أفكار Micro-SaaS مناسبة لفريق صغير أو مؤسس فردي.",
};

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
