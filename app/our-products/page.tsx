import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand } from "../components/CtaBand";
import { PageHero } from "../components/PageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { productPages, riceProducts } from "../site-data";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Explore agro products, rice, fresh vegetables, fresh fruits, dry fruits, spices, handicrafts, copper articles, furniture, garments, and more."
};

export default function OurProductsPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        title="Our Products"
        eyebrow="Products for global trade"
        description="A focused product range for import, export, sourcing, inspection, packaging, and worldwide shipment."
      />
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Agro Products</span>
            <h2>Premium product categories for worldwide export.</h2>
            <p>
              We source, inspect, package, and ship fresh produce, rice, dry
              fruits, and other trade products based on customer requirements.
            </p>
          </div>
          <div className="old-product-grid">
            {productPages.map((product) => (
              <Link className="old-product-card" href={`/${product.slug}`} key={product.slug}>
                <div>
                  <Image src={product.heroImage} alt={product.title} fill sizes="(max-width: 700px) 50vw, 25vw" />
                </div>
                <h3>{product.title}</h3>
              </Link>
            ))}
            <Link className="old-product-card" href="/rice">
              <div>
                <Image src="/images/rice-1121-steam.webp" alt="Rice" fill sizes="(max-width: 700px) 50vw, 25vw" />
              </div>
              <h3>Rice</h3>
            </Link>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Rice export products</span>
            <h2>Popular rice varieties available for sourcing and export.</h2>
          </div>
          <div className="product-strip">
            {riceProducts.slice(0, 4).map((group) => (
              <Link className="product-strip__item" href="/rice" key={group.category}>
                <Image src={group.image} alt={group.category} fill sizes="(max-width: 900px) 50vw, 25vw" />
                <span>{group.category}</span>
              </Link>
            ))}
          </div>
          <div className="center-action">
            <Link className="button button--primary" href="/rice">
              View Rice Details
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
      <SiteFooter />
    </main>
  );
}
