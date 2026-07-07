import type { Metadata } from "next";
import { CtaBand } from "../components/CtaBand";
import { PageHero } from "../components/PageHero";
import { ServiceCard } from "../components/ServiceCard";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { serviceSummaries } from "../site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore global shipping, import export, freight forwarding, container booking, customs paperwork, food trade, vendor sourcing, and construction material sourcing services."
};

export default function ServicesPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        title="Services"
        eyebrow="What We Provide"
        description="Our popular logistics, sourcing, documentation, customs, and worldwide delivery services."
      />
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Our Popular Logistics Services</span>
            <h2>Complete trade support from sourcing to delivery.</h2>
            <p>
              Choose one focused service or combine multiple services into a full
              import-export workflow handled by one team.
            </p>
          </div>
          <div className="service-grid service-grid--wide">
            {serviceSummaries.map((service) => (
              <ServiceCard key={service.slug} {...service} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
      <SiteFooter />
    </main>
  );
}
