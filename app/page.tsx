import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock3,
  ExternalLink,
  FileCheck2,
  Globe2,
  PackageCheck,
  Phone,
  SearchCheck,
  Ship,
  Star,
  Truck
} from "lucide-react";
import { CtaBand } from "./components/CtaBand";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { companySettings, homePage, serviceSummaries } from "./site-data";

const serviceIcons = [Ship, Globe2, FileCheck2];
const whyIcons = [SearchCheck, PackageCheck, Truck, Clock3];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: companySettings.name,
    url: "https://newradheyenterprises.com",
    logo: `https://newradheyenterprises.com${companySettings.logo}`,
    image: "https://newradheyenterprises.com/images/port.webp",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Opp. St. No. 1, Mohalla Kishanpura, Near Geeta Bhawan Chowk",
      addressLocality: "Moga",
      addressRegion: "Punjab",
      postalCode: "142001",
      addressCountry: "IN"
    },
    telephone: companySettings.phonePrimary,
    email: companySettings.email,
    areaServed: "Worldwide",
    description:
      "Import export, global sourcing, freight forwarding, customs documentation, and worldwide delivery services."
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader />

      <section className="hero" id="home">
        <div className="container hero__grid">
          <div className="hero__content hero__content--animated">
            <span className="eyebrow hero-anim hero-anim--1">
              {homePage.hero.eyebrow}
            </span>
            <h1 className="hero-anim hero-anim--2">
              Leading Platform for{" "}
              <span className="hero__title-accent">International</span>{" "}
              Import‑Export Solutions
            </h1>
            <p className="hero-anim hero-anim--3">
              Your trusted partner in global shipping, freight forwarding, and
              sourcing from China &amp; India — with customs clearance and
              worldwide delivery.
            </p>
            <div className="hero__actions hero-anim hero-anim--4">
              <Link className="button button--primary" href="/contact-us">
                Get A Quote
                <ArrowRight size={19} aria-hidden="true" />
              </Link>
              <Link className="button button--ghost" href="/services">
                Explore Services
              </Link>
            </div>
            <div className="hero__trust hero-anim hero-anim--5">
              <span>
                <CheckCircle2 size={17} aria-hidden="true" />
                Customs Support
              </span>
              <span>
                <CheckCircle2 size={17} aria-hidden="true" />
                China &amp; India Sourcing
              </span>
              <span>
                <CheckCircle2 size={17} aria-hidden="true" />
                200+ Countries
              </span>
            </div>
          </div>

          <div className="hero__media hero-anim hero-anim--2">
            <Image
              src={homePage.hero.image}
              alt="International port and logistics operation"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <div className="hero__media-overlay" aria-hidden="true" />
            <div className="quote-card">
              <span>Request Estimate</span>
              <strong>Tell us origin, destination, and cargo type.</strong>
              <a href={`tel:${companySettings.phonePrimary.replace(/\s/g, "")}`}>
                <Phone size={17} aria-hidden="true" />
                Call {companySettings.phonePrimary}
              </a>
            </div>
            <div className="hero__badge">
              <strong>5+</strong>
              <span>Years of Global Trade</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section" aria-label="Company highlights">
        <div className="container stats-grid">
          {homePage.stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section about" id="about">
        <div className="container split">
          <div className="image-stack">
            <Image
              src="/images/box-with-men.webp"
              alt="Cargo boxes prepared for international shipment"
              width={796}
              height={948}
              sizes="(max-width: 900px) 100vw, 44vw"
            />
            <div className="experience-badge">
              <strong>5+</strong>
              <span>Years helping businesses trade globally</span>
            </div>
          </div>
          <div className="section-copy">
            <span className="eyebrow">Welcome to New Radhey Enterprises</span>
            <h2>Your Trusted Partner in Global Import & Export</h2>
            <p>{homePage.about}</p>
            <div className="feature-list">
              {[
                "Affordable Pricing",
                "On-Time Deliveries",
                "Vendor sourcing from China and India",
                "Customs clearance support"
              ].map((item) => (
                <span key={item}>
                  <CheckCircle2 size={18} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>
            <Link className="button button--primary" href="/about-us">
              Read More
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">What We Provide</span>
            <h2>Our Popular Logistics Services</h2>
            <p>
              Start with one shipment or build a complete import export workflow
              with sourcing, compliance, and delivery support.
            </p>
          </div>
          <div className="service-grid">
            {serviceSummaries.slice(0, 3).map((service, index) => {
              const Icon = serviceIcons[index] || Ship;
              return (
                <article className="service-card" key={service.title}>
                  <div className="service-card__image">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  </div>
                  <div className="service-card__body">
                    <span className="icon-box">
                      <Icon size={24} aria-hidden="true" />
                    </span>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <Link href={`/${service.slug}`}>
                      Read more
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section sourcing" id="sourcing">
        <div className="container sourcing__grid">
          <div className="section-copy">
            <span className="eyebrow">Sourcing support</span>
            <h2>From supplier search to shipping, keep the full chain organized.</h2>
            <p>
              Importing becomes easier when one team keeps supplier details,
              inspection, consolidation, documents, and movement connected.
            </p>
          </div>
          <div className="sourcing-list">
            {[
              "Vendor sourcing from China and India",
              "Product price negotiation",
              "Quality inspection coordination",
              "Packaging and consolidation",
              "Door-to-port and port-to-door delivery",
              "Shipment status updates"
            ].map((item) => (
              <div key={item}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section why">
        <div className="container">
          <div className="section-heading section-heading--left">
            <span className="eyebrow">Why Choose Us</span>
            <h2>Today&apos;s fast-paced world needs efficient logistics.</h2>
          </div>
          <div className="why-grid">
            {homePage.whyChoose.map((item, index) => {
              const Icon = whyIcons[index] || PackageCheck;
              return (
                <article className="why-card" key={item.title}>
                  <span className="icon-box icon-box--light">
                    <Icon size={23} aria-hidden="true" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section projects" id="projects">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Our Works</span>
            <h2>Our Recent Completed Projects Showcase</h2>
          </div>
          <div className="project-grid">
            {[
              { title: "Container Freight", image: "/images/project-3.webp" },
              { title: "Air Cargo Handling", image: "/images/project-4.webp" },
              { title: "Export Packaging", image: "/images/project-8.webp" },
              { title: "Sourcing Dispatch", image: "/images/export-container.webp" }
            ].map((project) => (
              <article className="project-card" key={project.title}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                />
                <div>
                  <span>{project.title}</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google Reviews ── */}
      <section className="section google-reviews-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Google Reviews</span>
            <h2>What Our Customers Are Saying</h2>
            <p>
              Trusted by importers, exporters and businesses worldwide.
              See what our clients say about New Radhey Enterprises.
            </p>
          </div>

          {/* Rating summary card */}
          <div className="gr-summary">
            <div className="gr-summary__score">
              <strong>4.9</strong>
              <div className="gr-summary__stars" aria-label="4.9 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={22} fill="#fbbc04" color="#fbbc04" aria-hidden="true" />
                ))}
              </div>
              <span>Based on Google Reviews</span>
            </div>
            <div className="gr-summary__brand">
              <svg width="72" height="24" viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
                <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
                <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
                <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
                <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
                <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
                <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
              </svg>
            </div>
            <a
              href="https://maps.app.goo.gl/j5YTAkByYj9UUuwi8"
              target="_blank"
              rel="noopener noreferrer"
              className="button button--ghost gr-summary__cta"
            >
              View All Reviews
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Individual review cards */}
          <div className="gr-cards">
            {[
              {
                name: "Lovepreet Singh",
                date: "a month ago",
                stars: 5,
                text: "I sent furniture to my relatives in Canada, and it arrived on time. The service was very good and the price was excellent."
              },
              {
                name: "Shilpa",
                date: "2 months ago",
                stars: 5,
                text: "We have been using New Radhey Enterprises for shipments from India to Europe. Their 24/7 customer support and real-time tracking make the whole process smooth and transparent."
              },
              {
                name: "Priya Mehta",
                date: "3 months ago",
                stars: 5,
                text: "They provided clear updates at every step, from packaging to delivery. It is rare to find such dedication in international logistics today."
              }
            ].map((review) => (
              <article className="gr-card" key={review.name}>
                <div className="gr-card__top">
                  <div className="gr-card__avatar">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{review.name}</strong>
                    <span>{review.date}</span>
                  </div>
                  <svg className="gr-card__logo" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div className="gr-card__stars" aria-label={`${review.stars} stars`}>
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="#fbbc04" color="#fbbc04" aria-hidden="true" />
                  ))}
                </div>
                <p className="gr-card__text">&ldquo;{review.text}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq">
        <div className="container faq__grid">
          <div className="faq__media">
            <Image
              src="/images/export-container.webp"
              alt="Export containers ready for freight forwarding"
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
            />
          </div>
          <div>
            <span className="eyebrow">Frequently Asked Question</span>
            <h2>Do You Have Any Question? Find Answer Here</h2>
            <div className="faq-list">
              {homePage.faqs.map((faq, index) => (
                <details key={faq.question} open={index === 0} className="home-faq-item">
                  <summary>
                    <span>{faq.question}</span>
                    <ChevronDown size={20} className="faq-chevron" aria-hidden="true" />
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </main>
  );
}
