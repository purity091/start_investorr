import { AppClientShell } from "./AppClientShell";
import { notFound } from "next/navigation";
import { isKnownTabPath } from "@/utils/routes";

export const dynamic = "force-dynamic";

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
