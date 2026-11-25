export const HOST_STEPS = [
  { title: "Create your account", text: "Sign up and choose Host. It takes a few minutes." },
  { title: "Get verified", text: "Share your ID, PAN, payout bank account and proof of your venue or club. We review it so players can trust every organiser." },
  { title: "Create your tournament", text: "Set the categories, rules, slots, entry fee, dates and venue. Pay the listing fee for your slot size." },
  { title: "We review and publish", text: "Once approved, your tournament goes live for players near you." },
  { title: "Players register and pay", text: "Everyone pays online, so you never chase money. Watch confirmed players appear live." },
  { title: "Set up your event", text: "Generate fixtures and invite your own umpires by email." },
  { title: "Run the day", text: "Your umpires score live. Results, brackets and winner posters update automatically." },
  { title: "Get paid", text: "After a 48-hour complaint window, you receive 100% of the entry fees within 5 working days." },
] as const;

export const LISTING_TIERS = [
  { label: "Up to 60 players", price: "₹499" },
  { label: "61 to 120 players", price: "₹999" },
  { label: "121 to 250 players", price: "₹1,499" },
  { label: "Over 250 players", price: "Custom quote" },
] as const;

export const FEATURED = {
  price: "₹1,499",
  points: [
    "Featured spot on the home page and top of the list",
    "One email to opted-in players in your city",
    "Ready-made poster and share kit",
    "Priority in search results",
  ],
} as const;

export const WHO_DOES_WHAT = {
  gelavu: [
    "Your tournament page and registrations",
    "Online payments and refunds",
    "Fixtures and live scoring tools",
    "Email updates to your players",
    "Results and winner posters",
    "Support for payment questions",
  ],
  host: [
    "The venue, courts and shuttles",
    "Your umpires and officials",
    "Rules and fair play on the day",
    "Prize money and presentation",
    "Safety and first aid",
    "Permissions and taxes for your event",
  ],
} as const;

export const HOST_FAQ = [
  {
    q: "Who pays the entry fee, and who gets it?",
    a: "Players pay the entry fee plus a small Gelavu fee online. You receive 100% of the entry fees. The Gelavu fee is paid only by players.",
  },
  {
    q: "When do I get my money?",
    a: "After your tournament ends and a 48-hour complaint window passes with no open dispute, you are paid within 5 working days.",
  },
  {
    q: "Who pays the prize money and venue costs?",
    a: "You do, from your own funds on the day. You receive the entry fees after the event, so plan your costs before you list.",
  },
  {
    q: "Who provides umpires?",
    a: "You do. Umpires are appointed and managed by you. Gelavu gives you the scoring tools and an email invite link for each umpire, but we do not recruit, train or certify umpires.",
  },
  {
    q: "Can I accept cash or walk-ins on the day?",
    a: "Every player pays through Gelavu, including walk-ins, who can pay in the app on the day. This keeps payments safe and refunds simple.",
  },
  {
    q: "What if I have to cancel?",
    a: "Every registered player is refunded in full, including the Gelavu fee. Your listing fee is not refunded once a tournament is published.",
  },
  {
    q: "What do I need to become a host?",
    a: "Your ID, PAN, a bank account for payouts and proof of your venue or club. We review every host before they can publish.",
  },
] as const;
