import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminCookie, createSessionToken } from "../../../lib/admin-auth";
import { getAdminUser, verifyPassword } from "../../../lib/database";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "");

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const admin = await getAdminUser(email);
  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    return NextResponse.json({ message: "Invalid login details." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(adminCookie.name, createSessionToken(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: adminCookie.maxAge
  });

  return NextResponse.json({ ok: true, email });
}
