import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import mysql from "mysql2/promise";
import { companySettings } from "../site-data";

type DbRow = Record<string, string | number | null>;

export type PublicSiteSettings = {
  name: string;
  tagline: string;
  logo: string;
  footerLogo: string;
  favicon: string;
  phonePrimary: string;
  phoneSecondary: string;
  phoneLegacy: string;
  email: string;
  address: string;
  location: string;
  mapIframe: string;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    whatsapp: string;
  };
};

export type AdminSettings = Record<string, string>;

const publicKeys = [
  "name",
  "tagline",
  "logo",
  "footerLogo",
  "favicon",
  "phonePrimary",
  "phoneSecondary",
  "phoneLegacy",
  "email",
  "address",
  "location",
  "mapIframe",
  "facebook",
  "instagram",
  "linkedin",
  "whatsapp"
];

export const editableSettingKeys = [
  ...publicKeys,
  "smtpHost",
  "smtpPort",
  "smtpSecure",
  "smtpUser",
  "smtpPass",
  "smtpFrom",
  "adminEmail"
];

let pool: mysql.Pool | null = null;
let schemaReady = false;

function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "",
      waitForConnections: true,
      connectionLimit: 10
    });
  }

  return pool;
}

function defaultSettings(): AdminSettings {
  return {
    name: companySettings.name,
    tagline: companySettings.tagline,
    logo: companySettings.logo,
    footerLogo: companySettings.footerLogo,
    favicon: companySettings.favicon,
    phonePrimary: companySettings.phonePrimary,
    phoneSecondary: companySettings.phoneSecondary,
    phoneLegacy: companySettings.phoneLegacy,
    email: companySettings.email,
    address: companySettings.address,
    location: companySettings.location,
    mapIframe: companySettings.mapIframe,
    facebook: companySettings.social.facebook,
    instagram: companySettings.social.instagram,
    linkedin: companySettings.social.linkedin,
    whatsapp: companySettings.social.whatsapp,
    smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
    smtpPort: process.env.SMTP_PORT || "587",
    smtpSecure: process.env.SMTP_SECURE || "false",
    smtpUser: process.env.SMTP_USER || "",
    smtpPass: process.env.SMTP_PASS || "",
    smtpFrom: process.env.SMTP_FROM || process.env.SMTP_USER || companySettings.email,
    adminEmail: process.env.ADMIN_MAIL || process.env.ADMIN_EMAIL || companySettings.email
  };
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const provided = scryptSync(password, salt, 64);
  return expected.length === provided.length && timingSafeEqual(expected, provided);
}

export async function ensureDatabase() {
  if (schemaReady) return;

  const db = getPool();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS site_settings (
      setting_key VARCHAR(80) PRIMARY KEY,
      setting_value TEXT NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(190) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(190) NOT NULL,
      phone VARCHAR(80) NOT NULL,
      email VARCHAR(190) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const defaults = defaultSettings();
  for (const key of editableSettingKeys) {
    await db.execute(
      "INSERT IGNORE INTO site_settings (setting_key, setting_value) VALUES (?, ?)",
      [key, defaults[key] || ""]
    );
  }

  const adminEmail = process.env.ADMIN_EMAIL || defaults.adminEmail;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const [rows] = await db.execute<mysql.RowDataPacket[]>(
      "SELECT id FROM admin_users WHERE email = ? LIMIT 1",
      [adminEmail]
    );

    if (rows.length === 0) {
      await db.execute(
        "INSERT INTO admin_users (email, password_hash) VALUES (?, ?)",
        [adminEmail, hashPassword(adminPassword)]
      );
    }
  }

  schemaReady = true;
}

export async function getAdminUser(email: string) {
  await ensureDatabase();
  const [rows] = await getPool().execute<mysql.RowDataPacket[]>(
    "SELECT email, password_hash AS passwordHash FROM admin_users WHERE email = ? LIMIT 1",
    [email]
  );

  return rows[0] as { email: string; passwordHash: string } | undefined;
}

export async function getRawSettings() {
  await ensureDatabase();
  const [rows] = await getPool().execute<mysql.RowDataPacket[]>(
    "SELECT setting_key, setting_value FROM site_settings"
  );
  const settings = defaultSettings();

  for (const row of rows as DbRow[]) {
    if (typeof row.setting_key === "string") {
      settings[row.setting_key] = String(row.setting_value || "");
    }
  }

  return settings;
}

export async function getPublicSettings(): Promise<PublicSiteSettings> {
  try {
    const settings = await getRawSettings();
    return {
      name: settings.name,
      tagline: settings.tagline,
      logo: settings.logo,
      footerLogo: settings.footerLogo,
      favicon: settings.favicon,
      phonePrimary: settings.phonePrimary,
      phoneSecondary: settings.phoneSecondary,
      phoneLegacy: settings.phoneLegacy,
      email: settings.email,
      address: settings.address,
      location: settings.location,
      mapIframe: settings.mapIframe,
      social: {
        facebook: settings.facebook,
        instagram: settings.instagram,
        linkedin: settings.linkedin,
        whatsapp: settings.whatsapp
      }
    };
  } catch {
    return companySettings;
  }
}

export async function getAdminSettings() {
  const settings = await getRawSettings();
  return {
    ...settings,
    smtpPass: ""
  };
}

export async function updateSettings(values: AdminSettings) {
  await ensureDatabase();
  const db = getPool();

  for (const key of editableSettingKeys) {
    if (!(key in values)) continue;
    if (key === "smtpPass" && !values[key]) continue;

    await db.execute(
      `INSERT INTO site_settings (setting_key, setting_value)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
      [key, String(values[key] || "")]
    );
  }
}

export async function saveContactMessage(input: {
  name: string;
  phone: string;
  email: string;
  message: string;
}) {
  await ensureDatabase();
  await getPool().execute(
    "INSERT INTO contact_messages (name, phone, email, message) VALUES (?, ?, ?, ?)",
    [input.name, input.phone, input.email, input.message]
  );
}
