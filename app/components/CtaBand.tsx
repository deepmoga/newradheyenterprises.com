import Link from "next/link";
import { Headphones } from "lucide-react";

export function CtaBand() {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <span className="eyebrow">Start your shipment</span>
          <h2>Need a quote for import, export, or sourcing?</h2>
        </div>
        <Link className="button button--dark" href="/contact-us">
          <Headphones size={19} aria-hidden="true" />
          Talk to Team
        </Link>
      </div>
    </section>
  );
}
