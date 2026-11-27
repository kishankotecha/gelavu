import React from "react";
import type { Metadata } from "next";
import { getTournamentCards } from "@/data/tournaments";
import { TournamentsCatalog } from "@/features/tournaments/TournamentsCatalog";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Badminton Tournaments (2026) - Verified Draws & Live Court Scoring | Gelavu",
  description:
    "Find and register for verified weekend badminton tournaments in Bengaluru, Mumbai, Delhi NCR, Hyderabad and across India. 100% UPI escrow protection, live umpire scoring, and official city circuit Elo ratings.",
  keywords: [
    "badminton tournaments near me",
    "weekend badminton tournament registration",
    "badminton tournament Bengaluru",
    "badminton tournament Mumbai",
    "badminton tournament Delhi",
    "badminton singles tournament",
    "badminton doubles partner finder",
    "badminton tournament prize money India",
    "UPI escrow tournament registration",
    "amateur badminton circuit rankings",
  ],
  openGraph: {
    title: "Badminton Tournaments (2026) - Verified Draws & Live Scoring | Gelavu",
    description:
      "Compete in verified amateur & pro-am badminton tournaments. Instant UPI entry, guaranteed 2+ matches, live digital scoring, and official city circuit rankings.",
    url: `${siteConfig.url}/tournaments`,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/og-tournaments.jpg`,
        width: 1200,
        height: 630,
        alt: "Gelavu Competitive Badminton Tournaments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Badminton Tournaments (2026) - Verified Draws & Live Scoring | Gelavu",
    description:
      "Find weekend tournaments, enter by UPI in seconds, and play with live mobile umpire scoring & city Elo ratings.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tournaments`,
  },
};

export default async function TournamentsPage() {
  const allCards = await getTournamentCards();

  // Structured Data (JSON-LD) for ItemList of SportsEvents + FAQPage for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Upcoming Badminton Tournaments in India",
        description: "Official schedule of sanctioned amateur and pro-am badminton tournaments on Gelavu.",
        numberOfItems: allCards.length,
        itemListElement: allCards.slice(0, 10).map((t, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "SportsEvent",
            name: t.title,
            sport: "Badminton",
            url: `${siteConfig.url}/tournaments/${t.slug}`,
            description: `${t.series} tournament at ${t.venueLabel}. Guaranteed ${t.format} matches with official circuit Elo rating.`,
            location: {
              "@type": "Place",
              name: t.venueLabel,
              address: {
                "@type": "PostalAddress",
                addressLocality: t.city || "Bengaluru",
                addressCountry: "IN",
              },
            },
            offers: {
              "@type": "Offer",
              price: t.fee,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              validFrom: "2026-01-01",
            },
            organizer: {
              "@type": "Organization",
              name: t.hostName,
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How does Gelavu's 100% UPI Escrow Protection work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "When you enter a tournament, your registration fee is held securely in escrow until the tournament successfully begins. If the event is cancelled or postponed, you receive an immediate, 100% automated refund.",
            },
          },
          {
            "@type": "Question",
            name: "Can I enter a doubles tournament without a partner?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes! Gelavu provides an automated Partner Pool. You can enter solo and get paired with another player of matching skill tier, or browse players currently seeking a partner.",
            },
          },
          {
            "@type": "Question",
            name: "How many matches am I guaranteed to play?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Unlike traditional 1-and-done knockout tournaments, all Gelavu events guarantee every player at least two to three competitive matches through compass draws, plate brackets, or round-robin stages.",
            },
          },
          {
            "@type": "Question",
            name: "How are match scores and city circuit Elo ratings updated?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Every court has a designated official or umpire updating scores live on the Gelavu mobile scoring console. Scores are locked, verified, and your city ranking updates in real time.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="w-full bg-[#FAF6F0] min-h-screen py-8 sm:py-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TournamentsCatalog initialTournaments={allCards} />
        </div>
      </main>
    </>
  );
}
