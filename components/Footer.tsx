import Link from "next/link";
import { getUI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import Logo from "./Logo";

export default function Footer({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-sm">
          <Logo lang={lang} light />
          <p className="mt-3 text-sm text-white/60">{ui.footer.about}</p>
        </div>
        <div className="flex flex-col gap-2 text-sm md:items-end">
          <Link href={`/${lang}/cabinet`} className="font-semibold hover:underline">
            {ui.nav.cabinet} →
          </Link>
          <a href="https://caravanhouse.uz" className="font-semibold text-[#ffd27a] hover:underline">
            {ui.footer.made} →
          </a>
        </div>
      </div>
    </footer>
  );
}
