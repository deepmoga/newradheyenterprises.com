import type { Metadata } from "next";
import { CtaBand } from "../components/CtaBand";
import { PageHero } from "../components/PageHero";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { ContactSection } from "./ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact New Radhey Enterprises for quick pricing, global sourcing, import export, customs clearance, freight forwarding, and worldwide logistics support."
};

export default function ContactPage() {
  return (
    <main>
      <SiteHeader />
      <PageHero
        title="Contact Us"
        eyebrow="Contact"
        description="Contact us for quick pricing and end-to-end logistics assistance."
      />
      <ContactSection />
      <CtaBand />
      <SiteFooter />
    </main>
  );
}
