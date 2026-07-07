import { NextResponse } from "next/server";
import { editableSettingKeys, getAdminSettings, updateSettings } from "../../../lib/database";
import { requireAdmin } from "../../../lib/require-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await requireAdmin();
    const settings = await getAdminSettings();
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json().catch(() => null);
    const incoming = body?.settings || {};
    const settings: Record<string, string> = {};

    for (const key of editableSettingKeys) {
      if (key in incoming) {
        settings[key] = String(incoming[key] || "");
      }
    }

    await updateSettings(settings);
    const savedSettings = await getAdminSettings();
    return NextResponse.json({ ok: true, settings: savedSettings });
  } catch {
    return NextResponse.json({ message: "Unable to save settings." }, { status: 400 });
  }
}
