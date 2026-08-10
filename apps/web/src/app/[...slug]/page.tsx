import { AppClientShell } from "./AppClientShell";
import { notFound } from "next/navigation";
import { isKnownTabPath } from "@/utils/routes";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = createMetadata({
  title: "تطبيق منصة خطة",
  description: "واجهة تطبيق منصة خطة لإدارة المشاريع ودراسات الجدوى.",
  path: "/home",
  noIndex: true,
});

export default async function AppRoutePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const pathname = `/${slug.join("/")}`;

  if (!isKnownTabPath(pathname)) {
    notFound();
  }

  return <AppClientShell />;
}
