import type { Metadata } from "next";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { CtaBand } from "../components/CtaBand";
import { PageHero } from "../components/PageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { companySettings } from "../site-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact New Radhey Enterprises for quick pricing, global sourcing, import export, customs clearance, freight forwarding, and worldwide logistics support."
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        title="Contact Us"
        eyebrow="Contact"
        description="Contact us for quick pricing and end-to-end logistics assistance."
      />
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
          <form className="contact-form">
            <h3>Active & Ready to use Contact Form!</h3>
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" placeholder="Your phone number" />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="Your email address" />
            </label>
            <label>
              Requirement
              <textarea name="message" rows={5} placeholder="Tell us what you want to ship or source" />
            </label>
            <button className="button button--primary" type="button">
              Send Enquiry
            </button>
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
      <CtaBand />
      <SiteFooter />
    </main>
  );
}
