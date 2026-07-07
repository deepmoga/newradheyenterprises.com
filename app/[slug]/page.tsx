import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ChevronDown, Phone } from "lucide-react";
import { CtaBand } from "../components/CtaBand";
import { PageHero } from "../components/PageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { companySettings, productPages, serviceDetails, serviceSummaries } from "../site-data";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...serviceDetails.map((service) => ({ slug: service.slug })),
    ...productPages.map((product) => ({ slug: product.slug }))
  ];
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceDetails.find((item) => item.slug === slug);
  const product = productPages.find((item) => item.slug === slug);

  if (!service && !product) {
    return {};
  }

  return {
    title: service?.title ?? product?.title,
    description: service?.subtitle ?? product?.intro[0]
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceDetails.find((item) => item.slug === slug);
  const product = productPages.find((item) => item.slug === slug);

  if (!service && !product) {
    notFound();
  }

  if (product) {
    return (
      <main>
        <SiteHeader />
        <PageHero title={product.title} eyebrow="Our Products" />

        <section className="section">
          <div className="container product-detail">
            <div className="product-detail__intro">
              <div className="product-detail__image">
                <Image src={product.heroImage} alt={product.title} fill sizes="(max-width: 900px) 100vw, 45vw" />
              </div>
              <div className="section-copy">
                <span className="eyebrow">{product.title}</span>
                <h2>{product.title}</h2>
                {product.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="old-product-grid">
              {product.products.map((item) => (
                <article className="old-product-card" key={item.name}>
                  <div>
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 700px) 50vw, 25vw" />
                  </div>
                  <h3>{item.name}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
        <SiteFooter />
      </main>
    );
  }

  if (!service) {
    notFound();
  }

  return (
    <main>
      <SiteHeader />
      <PageHero title={service.title} eyebrow="Services" description={service.subtitle} />

      <section className="section">
        <div className="container service-detail-layout">
          <article className="service-detail">
            {/* Hero image */}
            <div className="service-detail__image">
              <Image src={service.image} alt={service.title} fill sizes="(max-width: 980px) 100vw, 65vw" priority />
            </div>

            {/* Intro */}
            <h2 className="service-detail__title">{service.title}</h2>
            {service.intro.map((paragraph) => (
              <p key={paragraph} className="service-detail__intro-p">{paragraph}</p>
            ))}

            {/* Key highlights grid */}
            <div className="service-detail__highlights">
              {service.bullets.map((item) => (
                <span key={item} className="service-detail__highlight-item">
                  <CheckCircle2 size={18} aria-hidden="true" />
                  {item}
                </span>
              ))}
            </div>

            {/* Detail sections */}
            {service.sections.map((section) => (
              <div className="service-detail__section" key={section.title}>
                <h3 className="service-detail__section-title">{section.title}</h3>
                {section.body ? <p>{section.body}</p> : null}
                <ul className="service-detail__list">
                  {section.items.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={16} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Process */}
            <div className="service-detail__section">
              <h3 className="service-detail__section-title">How Our Process Works</h3>
              <div className="process-list">
                {service.process.map((step, index) => (
                  <div key={step}>
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="service-detail__section">
              <h3 className="service-detail__section-title">Frequently Asked Questions</h3>
              <div className="faq-list">
                {service.faqs.map((faq, index) => (
                  <details key={faq.question} open={index === 0} className="service-faq-item">
                    <summary>
                      <span>{faq.question}</span>
                      <ChevronDown size={20} className="faq-chevron" aria-hidden="true" />
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </article>

          <aside className="service-sidebar">
            <div className="sidebar-card">
              <h3>Our Services</h3>
              {serviceSummaries.map((item) => (
                <Link
                  className={item.slug === service.slug ? "active" : ""}
                  href={`/${item.slug}`}
                  key={item.slug}
                >
                  {item.title}
                  <ArrowRight size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div className="sidebar-card sidebar-card--dark">
              <h3>More Information</h3>
              <p>{companySettings.address}</p>
              <a href={`tel:${companySettings.phonePrimary.replace(/\s/g, "")}`}>
                <Phone size={17} aria-hidden="true" />
                {companySettings.phonePrimary}
              </a>
              <a href={`tel:${companySettings.phoneSecondary.replace(/\s/g, "")}`}>
                <Phone size={17} aria-hidden="true" />
                {companySettings.phoneSecondary}
              </a>
              <Link className="button button--primary" href="/contact-us">
                Get A Quote
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand />
      <SiteFooter />
    </main>
  );
}
