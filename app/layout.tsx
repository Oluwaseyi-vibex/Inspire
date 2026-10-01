import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import { CinematicFooter } from "@/components/ui/cinematic-footer";
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://inspirenigerianchild.org"),
  title: {
    default: "Inspire Nigeria Child Project",
    template: "%s | Inspire Nigeria Child",
  },
  description:
    "Empowering children in the Niger Delta through quality education and impactful learning experiences. Join the 19th Inspired Niger Delta Schools Conference, Nov 11–14, 2026 in Yenagoa.",
  keywords: [
    "Niger Delta schools conference",
    "Inspire Nigeria Child",
    "Yenagoa conference 2026",
    "Nigerian children education",
    "values re-orientation",
  ],
  icons: {
    icon: "/inspire-fav-icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Inspire Nigeria Child",
    title: "Inspire Nigeria Child Project",
    description:
      "Values Re-orientation: the hope for a better Nigeria. 45,000+ students, 700+ schools, 9 states — Grand Converge in Yenagoa, Nov 11–14, 2026.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inspire Nigeria Child Project",
    description:
      "Values Re-orientation: the hope for a better Nigeria. Grand Converge in Yenagoa, Nov 11–14, 2026.",
  },
};

const CONFERENCE_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Inspire Nigeria Child Project",
      url: "https://inspirenigerianchild.org",
      logo: "https://inspirenigerianchild.org/logo-black.png",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+234-903-782-8213",
          contactType: "general",
          areaServed: "NG",
        },
      ],
      sameAs: [
        "https://www.facebook.com/people/Inspire-Nigeria-Child-official/100079960248113/",
        "https://instagram.com/inspirenigeriachild",
      ],
    },
    {
      "@type": "Event",
      name: "19th Inspired Niger Delta Schools Conference",
      description:
        "Values Re-orientation: the hope for a better Nigeria. Grand Converge of finalists from 700+ schools across the nine Niger Delta states.",
      startDate: "2026-11-11T10:00:00+01:00",
      endDate: "2026-11-14T18:00:00+01:00",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "Yenagoa",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Yenagoa",
          addressRegion: "Bayelsa State",
          addressCountry: "NG",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Inspire Nigeria Child Project",
        url: "https://inspirenigerianchild.org",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col space-y-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(CONFERENCE_JSON_LD) }}
        />
        <Navbar />
        {children}
        <CinematicFooter />
      </body>
    </html>
  );
}
