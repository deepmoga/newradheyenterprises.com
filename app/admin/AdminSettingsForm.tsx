"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { LogOut, Mail, Save, Settings, ShieldCheck } from "lucide-react";

type AdminSettings = Record<string, string>;

const blankSettings: AdminSettings = {
  name: "",
  tagline: "",
  logo: "",
  footerLogo: "",
  favicon: "",
  phonePrimary: "",
  phoneSecondary: "",
  phoneLegacy: "",
  email: "",
  address: "",
  location: "",
  mapIframe: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  whatsapp: "",
  smtpHost: "smtp.gmail.com",
  smtpPort: "587",
  smtpSecure: "false",
  smtpUser: "",
  smtpPass: "",
  smtpFrom: "",
  adminEmail: ""
};

export function AdminSettingsForm() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [settings, setSettings] = useState(blankSettings);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadSettings() {
    const response = await fetch("/api/admin/settings", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    setSettings({ ...blankSettings, ...data.settings });
  }

  useEffect(() => {
    fetch("/api/admin/me", { cache: "no-store" })
      .then((response) => {
        setAuthenticated(response.ok);
        return response.ok ? loadSettings() : undefined;
      })
      .finally(() => setChecking(false));
  }, []);

  function updateField(field: string, value: string) {
    setError("");
    setStatus("");
    setSettings((current) => ({ ...current, [field]: value }));
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.message || "Login failed.");
      return;
    }

    setAuthenticated(true);
    setPassword("");
    await loadSettings();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setSettings(blankSettings);
  }

  async function saveSettings() {
    setSaving(true);
    setError("");
    setStatus("");

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ settings })
    });
    const data = await response.json().catch(() => ({}));
    setSaving(false);

    if (!response.ok) {
      setError(data.message || "Unable to save settings.");
      return;
    }

    setSettings({ ...blankSettings, ...data.settings });
    setStatus("Settings saved successfully.");
  }

  if (checking) {
    return (
      <div className="admin-screen">
        <div className="admin-card admin-card--narrow">Loading admin panel...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="admin-screen">
        <form className="admin-login-card" onSubmit={login}>
          <div className="admin-login-card__icon">
            <ShieldCheck size={28} aria-hidden="true" />
          </div>
          <span className="eyebrow">Secure access</span>
          <h1>Admin Login</h1>
          <p>Login to update website settings, contact details, social links, and mail delivery.</p>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
            />
          </label>
          {error ? <p className="form-status form-status--error">{error}</p> : null}
          <button className="button button--primary" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          {settings.logo ? (
            <Image src={settings.logo} alt="New Radhey Enterprises" width={260} height={90} />
          ) : null}
          <span>Admin Panel</span>
        </div>
        <a href="#brand">
          <Settings size={18} aria-hidden="true" />
          Website Settings
        </a>
        <a href="#mail">
          <Mail size={18} aria-hidden="true" />
          Mail Settings
        </a>
        <button type="button" onClick={logout}>
          <LogOut size={18} aria-hidden="true" />
          Logout
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-main__head">
          <div>
            <span className="eyebrow">New Radhey Enterprises</span>
            <h1>Website Settings</h1>
            <p>Update important brand, contact, social, map, and mail settings from one place.</p>
          </div>
          <button className="button button--primary" type="button" onClick={saveSettings} disabled={saving}>
            <Save size={18} aria-hidden="true" />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>

        {status ? <p className="form-status form-status--success">{status}</p> : null}
        {error ? <p className="form-status form-status--error">{error}</p> : null}

        <section className="admin-card" id="brand">
          <h2>Brand Assets</h2>
          <div className="admin-grid">
            <label>
              Website Name
              <input value={settings.name} onChange={(event) => updateField("name", event.target.value)} />
            </label>
            <label>
              Tagline
              <input value={settings.tagline} onChange={(event) => updateField("tagline", event.target.value)} />
            </label>
            <label>
              Header Logo URL
              <input value={settings.logo} onChange={(event) => updateField("logo", event.target.value)} />
            </label>
            <label>
              Footer Logo URL
              <input value={settings.footerLogo} onChange={(event) => updateField("footerLogo", event.target.value)} />
            </label>
            <label>
              Favicon URL
              <input value={settings.favicon} onChange={(event) => updateField("favicon", event.target.value)} />
            </label>
          </div>
        </section>

        <section className="admin-card">
          <h2>Contact Details</h2>
          <div className="admin-grid">
            <label>
              Phone No. 1
              <input value={settings.phonePrimary} onChange={(event) => updateField("phonePrimary", event.target.value)} />
            </label>
            <label>
              Phone No. 2
              <input value={settings.phoneSecondary} onChange={(event) => updateField("phoneSecondary", event.target.value)} />
            </label>
            <label>
              Email
              <input value={settings.email} onChange={(event) => updateField("email", event.target.value)} />
            </label>
            <label>
              Location Short Text
              <input value={settings.location} onChange={(event) => updateField("location", event.target.value)} />
            </label>
            <label className="admin-grid__wide">
              Address
              <textarea value={settings.address} rows={3} onChange={(event) => updateField("address", event.target.value)} />
            </label>
            <label className="admin-grid__wide">
              Map iframe URL
              <input value={settings.mapIframe} onChange={(event) => updateField("mapIframe", event.target.value)} />
            </label>
          </div>
        </section>

        <section className="admin-card">
          <h2>Social Links</h2>
          <div className="admin-grid">
            <label>
              Facebook
              <input value={settings.facebook} onChange={(event) => updateField("facebook", event.target.value)} />
            </label>
            <label>
              Instagram
              <input value={settings.instagram} onChange={(event) => updateField("instagram", event.target.value)} />
            </label>
            <label>
              LinkedIn
              <input value={settings.linkedin} onChange={(event) => updateField("linkedin", event.target.value)} />
            </label>
            <label>
              WhatsApp
              <input value={settings.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} />
            </label>
          </div>
        </section>

        <section className="admin-card" id="mail">
          <h2>Mail Settings</h2>
          <div className="admin-grid">
            <label>
              SMTP Host
              <input value={settings.smtpHost} onChange={(event) => updateField("smtpHost", event.target.value)} />
            </label>
            <label>
              SMTP Port
              <input value={settings.smtpPort} onChange={(event) => updateField("smtpPort", event.target.value)} />
            </label>
            <label>
              Secure SMTP
              <select value={settings.smtpSecure} onChange={(event) => updateField("smtpSecure", event.target.value)}>
                <option value="false">No, use TLS on port 587</option>
                <option value="true">Yes, SSL on port 465</option>
              </select>
            </label>
            <label>
              SMTP Username
              <input value={settings.smtpUser} onChange={(event) => updateField("smtpUser", event.target.value)} />
            </label>
            <label>
              SMTP Password
              <input
                type="password"
                value={settings.smtpPass}
                onChange={(event) => updateField("smtpPass", event.target.value)}
                placeholder="Leave blank to keep current password"
              />
            </label>
            <label>
              From Email
              <input value={settings.smtpFrom} onChange={(event) => updateField("smtpFrom", event.target.value)} />
            </label>
            <label>
              Admin Receiver Email
              <input value={settings.adminEmail} onChange={(event) => updateField("adminEmail", event.target.value)} />
            </label>
          </div>
        </section>
      </main>
    </div>
  );
}
