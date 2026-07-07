import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Eye, Target } from "lucide-react";
import { CtaBand } from "../components/CtaBand";
import { PageHero } from "../components/PageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { aboutPage, homePage } from "../site-data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about New Radhey Enterprises, an international logistics, import export, freight forwarding, customs clearance, and global sourcing company."
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        title={aboutPage.title}
        eyebrow={aboutPage.eyebrow}
        description={aboutPage.heading}
      />

      <section className="section">
        <div className="container split">
          <div className="image-stack">
            <Image
              src={aboutPage.image}
              alt="New Radhey Enterprises cargo team"
              width={796}
              height={948}
              sizes="(max-width: 900px) 100vw, 44vw"
            />
            <div className="experience-badge">
              <strong>5+</strong>
              <span>Years of global trade support</span>
            </div>
          </div>
          <div className="section-copy">
            <span className="eyebrow">About Company</span>
            <h2>{aboutPage.heading}</h2>
            {aboutPage.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="feature-list">
              {["Freight forwarding", "Import export services", "Customs clearance", "Supply chain management"].map(
                (item) => (
                  <span key={item}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container stats-grid">
          {homePage.stats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container mission-grid">
          <article className="mission-card">
            <span className="icon-box">
              <Eye size={24} aria-hidden="true" />
            </span>
            <h2>Our Vision</h2>
            <p>{aboutPage.vision}</p>
          </article>
          <article className="mission-card">
            <span className="icon-box">
              <Target size={24} aria-hidden="true" />
            </span>
            <h2>Our Mission</h2>
            <p>{aboutPage.mission}</p>
          </article>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </main>
  );
}
