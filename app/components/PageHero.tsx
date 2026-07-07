import Link from "next/link";
import { ChevronRight } from "lucide-react";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  description?: string;
};

export function PageHero({ title, eyebrow = "New Radhey Enterprises", description }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <ChevronRight size={16} aria-hidden="true" />
          <span>{title}</span>
        </nav>
      </div>
    </section>
  );
}
