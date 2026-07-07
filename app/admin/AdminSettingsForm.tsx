"use client";

import { useEffect, useState } from "react";
import { companySettings } from "../site-data";

const defaultSettings = {
  logo: companySettings.logo,
  footerLogo: companySettings.footerLogo,
  favicon: companySettings.favicon,
  phonePrimary: companySettings.phonePrimary,
  phoneSecondary: companySettings.phoneSecondary,
  email: companySettings.email,
  address: companySettings.address,
  mapIframe: companySettings.mapIframe,
  facebook: companySettings.social.facebook,
  instagram: companySettings.social.instagram,
  linkedin: companySettings.social.linkedin,
  whatsapp: companySettings.social.whatsapp
};

export function AdminSettingsForm() {
  const [settings, setSettings] = useState(defaultSettings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem("new-radhey-admin-settings");
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function updateField(field: keyof typeof defaultSettings, value: string) {
    setSaved(false);
    setSettings((current) => ({ ...current, [field]: value }));
  }

  function saveSettings() {
    window.localStorage.setItem("new-radhey-admin-settings", JSON.stringify(settings));
    setSaved(true);
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel__heading">
        <span className="eyebrow">Admin Panel</span>
        <h1>Website Settings</h1>
        <p>
          This screen is ready for the requested editable fields. It currently
          stores drafts in this browser; when MySQL credentials are provided,
          these same fields can be connected to database-backed API routes.
        </p>
      </div>

      <div className="admin-form">
        <section>
          <h2>Brand Assets</h2>
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
        </section>

        <section>
          <h2>Contact Details</h2>
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
            Address
            <textarea value={settings.address} rows={4} onChange={(event) => updateField("address", event.target.value)} />
          </label>
          <label>
            Map iframe URL
            <input value={settings.mapIframe} onChange={(event) => updateField("mapIframe", event.target.value)} />
          </label>
        </section>

        <section>
          <h2>Social Media Links</h2>
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
        </section>
      </div>

      <button className="button button--primary admin-save" type="button" onClick={saveSettings}>
        Save Draft Settings
      </button>
      {saved ? <p className="admin-saved">Saved in browser draft storage.</p> : null}
    </div>
  );
}
