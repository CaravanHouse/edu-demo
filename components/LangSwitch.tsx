import Link from "next/link";
import { locales, type Locale } from "@/lib/i18n";

// path — часть адреса после языка, чтобы переключение не уводило со страницы (например, /p/<slug>)
export default function LangSwitch({ lang, label, path = "" }: { lang: Locale; label: string; path?: string }) {
  return (
    <nav aria-label={label}>
      <ul className="flex rounded-full border border-line bg-surface p-0.5 text-xs font-bold">
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={`/${l}${path}`}
              aria-current={l === lang ? "true" : undefined}
              className={`flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 uppercase ${l === lang ? "bg-ink text-white" : "text-muted hover:text-ink"}`}
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
