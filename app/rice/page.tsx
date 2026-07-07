import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "../components/CtaBand";
import { PageHero } from "../components/PageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { riceProducts } from "../site-data";

export const metadata: Metadata = {
  title: "Rice",
  description:
    "Basmati and long grain rice varieties including 1121, 1718, 1509, 1401, PR11, broken white rice, Pusa, traditional basmati, brown rice, and IR64."
};

export default function RicePage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        title="Rice"
        eyebrow="Our Products"
        description="Premium basmati, long grain, parboiled, steamed, raw, broken, brown, and specialty rice varieties for export."
      />
      <section className="section">
        <div className="container old-rice-layout">
          {riceProducts.map((group) => (
            <section className="old-rice-section" key={group.category}>
              <h2>{group.category}</h2>
              <div className="old-product-grid old-product-grid--rice">
                {group.items.map((item) => (
                  <article className="old-product-card old-rice-card" key={item.name}>
                    <div>
                      <Image src={group.image} alt={item.name} fill sizes="(max-width: 700px) 50vw, 25vw" />
                    </div>
                    <div className="old-rice-card__body">
                      <h3>{item.name}</h3>
                      <dl>
                        <dt>Grade</dt>
                        <dd>{item.grade}</dd>
                        <dt>Colour</dt>
                        <dd>{item.colour}</dd>
                        <dt>Average Length</dt>
                        <dd>{item.length}</dd>
                        <dt>Sortex</dt>
                        <dd>{item.sortex}</dd>
                      </dl>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      <CtaBand />
      <SiteFooter />
    </main>
  );
}
