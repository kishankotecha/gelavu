import type { Metadata } from "next";
import { RankingsDirectory } from "@/features/rankings/RankingsDirectory";

export const metadata: Metadata = {
  title: "City Circuit Badminton Rankings & Official Elo Leaderboard (2026) | Gelavu",
  description:
    "Explore real-time amateur badminton rankings, player ratings, tournament match records, and official city circuit leaderboards across Bengaluru, Mumbai, Delhi NCR, and Hyderabad. Powered by Gelavu Circuit Elo.",
  keywords: [
    "badminton rankings",
    "badminton leaderboard",
    "amateur badminton elo rating",
    "city circuit rankings",
    "badminton tournament standings",
    "Bengaluru badminton player rankings",
    "Mumbai badminton leaderboard",
    "Gelavu badminton",
  ],
  openGraph: {
    title: "City Circuit Badminton Rankings & Official Leaderboard | Gelavu",
    description:
      "Real-time amateur badminton rankings, player ratings, tournament match records, and official city circuit leaderboards.",
    url: "https://gelavu.com/rankings",
    siteName: "Gelavu",
    locale: "en_IN",
    type: "website",
  },
  alternates: {
    canonical: "https://gelavu.com/rankings",
  },
};

export default function RankingsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SportsOrganization",
        name: "Gelavu Badminton Circuit",
        url: "https://gelavu.com/rankings",
        logo: "https://gelavu.com/logo.png",
        sport: "Badminton",
        description:
          "Official ranking and tournament circuit for competitive amateur badminton players across India.",
      },
      {
        "@type": "ItemList",
        name: "Gelavu City Circuit Top Ranked Athletes",
        description: "Official leaderboard rankings based on verified tournament match performance and Elo rating.",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Arjun Mehta",
            description: "Seed #1 · Men's Singles · Elo Rating 1,842 · Koramangala, Bengaluru",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Rohan Deshmukh",
            description: "Seed #2 · Men's Singles · Elo Rating 1,795 · Andheri West, Mumbai",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Kavya S. Rao",
            description: "Seed #3 · Women's Singles · Elo Rating 1,740 · Indiranagar, Bengaluru",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Vikram Malhotra",
            description: "Seed #4 · Men's Singles · Elo Rating 1,712 · Cyber City, Gurgaon",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Pooja Reddy",
            description: "Seed #5 · Women's Singles · Elo Rating 1,688 · Gachibowli, Hyderabad",
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
      <RankingsDirectory />
    </>
  );
}
