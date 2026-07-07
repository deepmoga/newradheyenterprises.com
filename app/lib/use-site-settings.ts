"use client";

import { useEffect, useState } from "react";
import { companySettings } from "../site-data";
import type { PublicSiteSettings } from "./database";

export function useSiteSettings() {
  const [settings, setSettings] = useState<PublicSiteSettings>(companySettings);

  useEffect(() => {
    let active = true;

    fetch("/api/public-settings", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (active && data?.settings) {
          setSettings(data.settings);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, []);

  return settings;
}
