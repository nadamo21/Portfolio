import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { site } from "@/lib/site";
import "./globals.css";

const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap", preload: false });
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  weight: ["400", "600"],
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

const title = `${site.name} — ${site.role} · Power BI, SQL & Python`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}, ${site.role}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.name,
  keywords: [
    "Nada Mohamed",
    "Data Analyst",
    "Power BI developer",
    "Business Intelligence",
    "SQL",
    "DAX",
    "Data Visualization",
    "Loyalty analytics",
    "Alexandria",
    "Egypt",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${site.name} — ${site.role}`,
    title,
    description: site.description,
    locale: "en_US",
    firstName: "Nada",
    lastName: "Mohamed",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e14" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.fullName,
  jobTitle: site.role,
  url: site.url,
  image: `${site.url}/images/nada.jpg`,
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Alexandria", addressCountry: "EG" },
  worksFor: { "@type": "Organization", name: "Loynova" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Alexandria University" },
  hasOccupation: [
    { "@type": "Occupation", name: "Data Analyst" },
    { "@type": "Occupation", name: "Tech content creator" },
  ],
  knowsAbout: ["Data Analysis", "Business Intelligence", "Power BI", "DAX", "SQL", "Python", "Data Visualization"],
  knowsLanguage: ["ar", "en"],
  sameAs: [site.links.linkedin, site.links.upwork, site.links.khamsat, site.links.instagram, site.links.tiktok],
};

// Runs before paint so the saved or system theme never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${grotesk.variable} ${inter.variable} ${jetbrains.variable} ${plexArabic.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Nav />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
