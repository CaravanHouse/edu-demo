import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { basePath, initials, type School } from "@/lib/school";

// Логотип: у Zukko — свой знак; у персонального демо — логотип центра или инициалы на фирменном цвете
export default function Logo({ lang, school, light = false }: { lang: Locale; school: School; light?: boolean }) {
  const text = light ? "text-white" : "text-ink";
  if (school.personal) {
    return (
      <Link href={basePath(school, lang)} className={`inline-flex min-w-0 max-w-[60vw] items-center gap-2.5 rounded-lg font-display text-base font-bold tracking-tight sm:text-lg lg:max-w-[22rem] ${text}`}>
        {school.personal.hasLogo ? (
          // eslint-disable-next-line @next/next/no-img-element -- логотип отдаётся из приватного хранилища через /api, без оптимизации
          <img src={`/api/p/${school.personal.slug}/logo`} alt="" className="h-9 w-9 shrink-0 rounded-xl bg-white object-contain" />
        ) : (
          <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-sm text-white">
            {initials(school.name)}
          </span>
        )}
        <span className="truncate">{school.name}</span>
      </Link>
    );
  }
  return (
    <Link href={`/${lang}`} className={`inline-flex items-center gap-2 rounded-lg font-display text-lg font-bold tracking-tight ${text}`}>
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
