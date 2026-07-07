import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://newradheyenterprises.com"),
  title: {
    default: "New Radhey Enterprises | Import Export and Global Sourcing",
    template: "%s | New Radhey Enterprises"
  },
  description:
    "New Radhey Enterprises provides import export solutions, international freight, customs paperwork, product sourcing, and worldwide logistics from India and China.",
  keywords: [
    "New Radhey Enterprises",
    "import export company India",
    "global sourcing",
    "international freight forwarding",
    "customs clearance",
    "shipping from India",
    "sourcing from China"
  ],
  openGraph: {
    title: "New Radhey Enterprises",
    description:
      "Reliable import export, sourcing, freight forwarding, and documentation support for global trade.",
    url: "https://newradheyenterprises.com",
    siteName: "New Radhey Enterprises",
    images: [
      {
        url: "/images/new-radhey-enterprises-logo.png",
        width: 800,
        height: 258,
        alt: "New Radhey Enterprises logo"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
