"use client";

import { FormEvent, useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "../lib/use-site-settings";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  message: ""
};

export function ContactSection() {
  const companySettings = useSiteSettings();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function updateField(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok && response.status !== 202) {
      setStatus("error");
      setMessage(data.message || "Unable to send enquiry. Please try again.");
      return;
    }

    setStatus("success");
    setMessage(data.message || "Thank you. Your enquiry has been sent.");
    setForm(initialForm);
  }

  return (
    <>
      <section className="section">
        <div className="container contact-grid">
          <div className="contact-panel">
            <span className="eyebrow">Get in touch with us</span>
            <h2>Let&apos;s get your shipment moving.</h2>
            <p>
              Share your cargo type, origin, destination, quantity, and timeline.
              Our team will guide you with the best import-export or sourcing solution.
            </p>
            <div className="contact-list">
              <span>
                <MapPin size={22} aria-hidden="true" />
                {companySettings.address}
              </span>
              <a href={`tel:${companySettings.phonePrimary.replace(/\s/g, "")}`}>
                <Phone size={22} aria-hidden="true" />
                {companySettings.phonePrimary}
              </a>
              <a href={`tel:${companySettings.phoneSecondary.replace(/\s/g, "")}`}>
                <Phone size={22} aria-hidden="true" />
                {companySettings.phoneSecondary}
              </a>
              <a href={`mailto:${companySettings.email}`}>
                <Mail size={22} aria-hidden="true" />
                {companySettings.email}
              </a>
            </div>
            <div className="contact-social">
              <a href={companySettings.social.facebook} aria-label="Facebook">
                <Facebook size={20} aria-hidden="true" />
              </a>
              <a href={companySettings.social.instagram} aria-label="Instagram">
                <Instagram size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          <form className="contact-form" onSubmit={submitForm}>
            <h3>Send an enquiry</h3>
            <label>
              Name
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
              />
            </label>
            <label>
              Phone
              <input
                type="tel"
                name="phone"
                placeholder="Your phone number"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
              />
            </label>
            <label>
              Requirement
              <textarea
                name="message"
                rows={5}
                placeholder="Tell us what you want to ship or source"
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                required
              />
            </label>
            <button className="button button--primary" type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Enquiry"}
            </button>
            {message ? (
              <p className={`form-status form-status--${status === "error" ? "error" : "success"}`}>
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </section>

      <section className="map-section">
        <iframe
          title="New Radhey Enterprises location map"
          src={companySettings.mapIframe}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
