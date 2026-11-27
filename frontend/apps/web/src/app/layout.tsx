import type { Metadata } from "next";
import { Suspense } from "react";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { ToastProvider } from "@/components/ui/toast";
import { siteConfig } from "@/config/site";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const rogenz = localFont({
  src: [
    {
      path: "../fonts/rogenz/Rogenz.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/rogenz/Rogenz.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/rogenz/Rogenz.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-rogenz",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Tournament Management Software & City Circuit`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: `${siteConfig.name} | ${siteConfig.headline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/hero/hero-smash.jpg",
        width: 1200,
        height: 630,
        alt: "Gelavu Tournament SaaS Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/images/hero/hero-smash.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": siteConfig.name,
        "applicationCategory": "SportsApplication",
        "operatingSystem": "Web, iOS, Android",
        "description": siteConfig.description,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR",
        },
      },
      {
        "@type": "SportsOrganization",
        "name": siteConfig.name,
        "url": siteConfig.url,
        "sport": "Badminton",
        "description": siteConfig.description,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": siteConfig.city,
          "addressCountry": "IN",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${rogenz.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-navy text-white">
        <ToastProvider>
          <div className="flex min-h-screen flex-col bg-navy">
            <Suspense fallback={<div className="h-16 w-full" />}>
              <Navbar />
            </Suspense>
            <main className="flex-1">{children}</main>
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
