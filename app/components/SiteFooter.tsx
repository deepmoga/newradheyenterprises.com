"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { useSiteSettings } from "../lib/use-site-settings";
import { productPages, serviceSummaries } from "../site-data";

const footerColumns = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Services", href: "/services" },
      { label: "Rice", href: "/rice" },
      { label: "Contact Us", href: "/contact-us" }
    ]
  },
  {
    title: "Core Services",
    links: serviceSummaries.slice(0, 5).map((service) => ({
      label: service.title,
      href: `/${service.slug}`
    }))
  },
  {
    title: "Products",
    links: [
      ...productPages.map((product) => ({
        label: product.title,
        href: `/${product.slug}`
      })),
      { label: "Rice", href: "/rice" },
      { label: "All Products", href: "/our-products" }
    ]
  }
];

/* ─── Inline SVG brand icons ─── */
function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export function SiteFooter() {
  const companySettings = useSiteSettings();
  const socialLinks = [
    {
      href: companySettings.social.facebook,
      label: "Facebook",
      className: "social-icon social-icon--facebook",
      icon: <FacebookIcon />
    },
    {
      href: companySettings.social.instagram,
      label: "Instagram",
      className: "social-icon social-icon--instagram",
      icon: <InstagramIcon />
    },
    {
      href: companySettings.social.linkedin,
      label: "LinkedIn",
      className: "social-icon social-icon--linkedin",
      icon: <LinkedInIcon />
    },
    {
      href: companySettings.email ? `mailto:${companySettings.email}` : "",
      label: "Email",
      className: "social-icon social-icon--email",
      icon: <Mail size={18} aria-hidden="true" />
    },
    {
      href: companySettings.social.whatsapp,
      label: "WhatsApp",
      className: "social-icon social-icon--whatsapp",
      icon: <WhatsAppIcon />
    }
  ].filter((link) => link.href.trim().length > 0);

  return (
    <footer className="footer">
      <div className="container footer__logo-wrap">
        <Link className="footer__logo-card" href="/" aria-label="New Radhey Enterprises home">
          <Image
            src={companySettings.footerLogo}
            alt="New Radhey Enterprises"
            width={800}
            height={258}
            className="footer-logo"
          />
        </Link>
      </div>

      <div className="container footer__grid">
        {footerColumns.map((column) => (
          <div className="footer__column" key={column.title}>
            <h3>{column.title}</h3>
            <span className="footer__heading-line" aria-hidden="true" />
            {column.links.map((link) => (
              <Link className="footer__link" href={link.href} key={link.label}>
                <ChevronRight size={18} aria-hidden="true" />
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="footer__column footer__contact">
          <h3>Contact Details</h3>
          <span className="footer__heading-line" aria-hidden="true" />
          <a href={`mailto:${companySettings.email}`}>
            <Mail size={18} aria-hidden="true" />
            {companySettings.email}
          </a>
          <a href={`tel:${companySettings.phonePrimary.replace(/\s/g, "")}`}>
            <Phone size={18} aria-hidden="true" />
            {companySettings.phonePrimary}
          </a>
          <a href={`tel:${companySettings.phoneSecondary.replace(/\s/g, "")}`}>
            <Phone size={18} aria-hidden="true" />
            {companySettings.phoneSecondary}
          </a>
          <span>
            <MapPin size={18} aria-hidden="true" />
            {companySettings.address}
          </span>
        </div>
      </div>

      {/* ── Social icons bar ── */}
      {socialLinks.length > 0 ? (
        <div className="container footer__social-wrap">
          <div className="footer__social" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                href={link.href}
                aria-label={link.label}
                className={link.className}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                key={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>Copyright &copy; 2026 New Radhey Enterprises. All rights reserved.</span>
          <span className="footer__bottom-divider" aria-hidden="true">|</span>
          <span>
            Made with{" "}
            <span className="footer__heart" aria-label="love">&#10084;&#65039;</span>{" "}
            by{" "}
            <a
              href="https://officialdigitalmarketing.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__credit-link"
            >
              Official Digital Marketing
            </a>
          </span>
        </div>
      </div>

      {companySettings.social.whatsapp ? (
        <a className="whatsapp-float" href={companySettings.social.whatsapp} aria-label="Chat on WhatsApp" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon />
        </a>
      ) : null}
    </footer>
  );
}
