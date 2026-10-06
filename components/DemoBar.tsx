import { getUI } from "@/content/ui";
import type { Locale } from "@/lib/i18n";
import { leadBotUrl, type School } from "@/lib/school";

// Плашка над сайтом: честно говорит, что это демо, и ведёт в бот заявок CaravanHouse IT (метка demo_edu или demo_<slug>)
export default function DemoBar({ lang, school }: { lang: Locale; school: School }) {
  const ui = getUI(lang);
  const text = school.personal ? ui.personal.bar.replace("{name}", school.name) : ui.demo.text;
  const cta = school.personal ? ui.personal.cta : ui.demo.cta;
  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1.5 px-4 py-2 text-center text-xs sm:text-sm">
        <span className="text-white/75">{text}</span>
        <a
          href={leadBotUrl(school)}
          target="_blank"
          rel="noopener noreferrer"
          className={school.personal ? "rounded-full bg-[#ffd27a] px-3.5 py-1 font-bold text-ink hover:bg-white" : "font-semibold text-[#ffd27a] underline-offset-4 hover:underline"}
        >
          {cta} →
        </a>
      </div>
    </div>
  );
}
