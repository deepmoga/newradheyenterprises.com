import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ship } from "lucide-react";

type ServiceCardProps = {
  title: string;
  slug: string;
  description: string;
  image: string;
};

export function ServiceCard({ title, slug, description, image }: ServiceCardProps) {
  return (
    <article className="service-card">
      <div className="service-card__image">
        <Image src={image} alt={title} fill sizes="(max-width: 900px) 100vw, 33vw" />
      </div>
      <div className="service-card__body">
        <span className="icon-box">
          <Ship size={24} aria-hidden="true" />
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link href={`/${slug}`}>
          Read more
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
