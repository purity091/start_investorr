import { NextResponse } from "next/server";

import { publicJsonHeaders, readPublicJson } from "@/lib/public-data-cache";

export const revalidate = 3600;

export async function GET() {
  const data = await readPublicJson("proven-projects/index.json");
  return NextResponse.json(data, { headers: publicJsonHeaders() });
}
