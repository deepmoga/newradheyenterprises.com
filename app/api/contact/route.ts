import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { getRawSettings, saveContactMessage } from "../../lib/database";

export const dynamic = "force-dynamic";

function clean(value: unknown) {
  return String(value || "").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const input = {
    name: clean(body?.name),
    phone: clean(body?.phone),
    email: clean(body?.email),
    message: clean(body?.message)
  };

  if (!input.name || !input.phone || !input.email || !input.message) {
    return NextResponse.json(
      { message: "Please fill all required fields." },
      { status: 400 }
    );
  }

  const settings = await getRawSettings();
  await saveContactMessage(input);

  const smtpHost = settings.smtpHost || "smtp.gmail.com";
  const smtpPort = Number(settings.smtpPort || 587);
  const smtpSecure = settings.smtpSecure === "true" || smtpPort === 465;
  const smtpUser = settings.smtpUser;
  const smtpPass = settings.smtpPass?.replace(/\s+/g, "");
  const adminEmail = settings.adminEmail || settings.email;

  if (!smtpUser || !smtpPass || !adminEmail) {
    return NextResponse.json(
      { message: "Message saved, but SMTP settings are missing in admin panel." },
      { status: 202 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass
    }
  });

  try {
    await transporter.sendMail({
      from: settings.smtpFrom || smtpUser,
      to: adminEmail,
      replyTo: input.email,
      subject: `New enquiry from ${input.name}`,
      text: [
        `Name: ${input.name}`,
        `Phone: ${input.phone}`,
        `Email: ${input.email}`,
        "",
        input.message
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222">
          <h2>New website enquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(input.phone)}</p>
          <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
          <p><strong>Requirement:</strong></p>
          <p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>
        </div>
      `
    });
  } catch (error) {
    console.error("Contact email failed", error);
    return NextResponse.json(
      { message: "Message saved, but email could not be sent. Please check SMTP settings." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, message: "Enquiry sent successfully." });
}
