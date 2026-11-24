import Link from "next/link";
import { CalendarDays, IndianRupee, User, Users, UsersRound } from "lucide-react";

const TILES = [
  { label: "Singles", hint: "Play solo", href: "/tournaments?category=singles", icon: User },
  { label: "Doubles", hint: "Bring a partner", href: "/tournaments?category=doubles", icon: Users },
  { label: "Mixed", hint: "Team up", href: "/tournaments?category=mixed", icon: UsersRound },
  { label: "This weekend", hint: "Happening soon", href: "/tournaments?when=weekend", icon: CalendarDays },
  { label: "Under ₹500", hint: "Easy on the pocket", href: "/tournaments?maxFee=500", icon: IndianRupee },
] as const;

export function CategoryTiles() {
  return (
    <nav aria-label="Browse by type" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {TILES.map(({ label, hint, href, icon: Icon }) => (
        <Link
          key={label}
          href={href}
          className="group flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 transition hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-paper text-ink transition group-hover:bg-ink group-hover:text-lime">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-ink">{label}</span>
            <span className="block truncate text-xs text-muted">{hint}</span>
          </span>
        </Link>
      ))}
    </nav>
  );
}
