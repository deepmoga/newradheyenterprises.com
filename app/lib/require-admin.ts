import { cookies } from "next/headers";
import { adminCookie, verifySessionToken } from "./admin-auth";

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookie.name)?.value;
  return verifySessionToken(token);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}
