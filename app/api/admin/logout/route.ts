import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminCookie } from "../../../lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(adminCookie.name);

  return NextResponse.json({ ok: true });
}
