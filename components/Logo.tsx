import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function Logo({ lang, light = false }: { lang: Locale; light?: boolean }) {
  return (
    <Link href={`/${lang}`} className={`inline-flex items-center gap-2 rounded-lg font-display text-lg font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="#c026d3" />
        <path d="M12 14h16L13 27h15" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="29" cy="11" r="3" fill="#facc15" />
      </svg>
      <span>
        Zukko<span className="text-brand">.</span>
      </span>
    </Link>
  );
}
