"use client";

// Шапка и первый экран
import { ArrowRight, Menu, Phone, Sparkles, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { directionColor } from "@/content/data";
import { getUI } from "@/content/ui";
import { tr, type Locale } from "@/lib/i18n";
import { basePath, teacherOf } from "@/lib/school";
import LangSwitch from "./LangSwitch";
import Logo from "./Logo";
import { useSchool } from "./SchoolContext";
import { TrialButton } from "./Trial";

export function Header({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const school = useSchool();
  const base = basePath(school, lang);
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#courses", label: ui.nav.courses },
    ...(school.testCourse ? [{ href: "#test", label: ui.nav.test }] : []),
    { href: "#schedule", label: ui.nav.schedule },
    ...(school.teachers.length ? [{ href: "#teachers", label: ui.nav.teachers }] : []),
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Logo lang={lang} school={school} />
        <nav aria-label={ui.nav.courses} className="hidden lg:block">
          <ul className="flex gap-1 text-sm font-semibold">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-3 py-2 whitespace-nowrap hover:bg-brand-soft">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {school.phone ? (
            <a href={`tel:${school.phone.replace(/[^+\d]/g, "")}`} className="hidden items-center gap-2 text-sm font-semibold whitespace-nowrap 2xl:inline-flex">
              <Phone className="h-4 w-4 text-brand" />
              {school.phone}
            </a>
          ) : null}
          <Link href={`${base}/cabinet`} className="hidden h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-semibold whitespace-nowrap hover:border-brand/40 sm:inline-flex">
            <UserRound className="h-4 w-4 text-brand" />
            {ui.nav.cabinet}
          </Link>
          <div className="hidden sm:block">
            <LangSwitch lang={lang} label={ui.langLabel} path={school.personal ? `/p/${school.personal.slug}` : ""} />
          </div>
          <TrialButton className="hidden h-11 rounded-full bg-brand px-5 text-sm font-semibold whitespace-nowrap text-white shadow-lg shadow-brand/25 hover:bg-brand-dark md:inline-flex md:items-center">{ui.trial}</TrialButton>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={ui.nav.courses} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="border-t border-line bg-surface px-4 py-4 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href} className="border-b border-line last:border-0">
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3.5 text-lg font-semibold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <LangSwitch lang={lang} label={ui.langLabel} path={school.personal ? `/p/${school.personal.slug}` : ""} />
            <Link href={`${base}/cabinet`} className="inline-flex items-center gap-2 text-sm font-semibold">
              <UserRound className="h-4 w-4 text-brand" />
              {ui.nav.cabinet}
            </Link>
          </div>
          <TrialButton className="mt-4 h-12 w-full rounded-full bg-brand font-semibold text-white">{ui.trial}</TrialButton>
        </nav>
      ) : null}
    </header>
  );
}

export function Hero({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const t = ui.hero;
  const school = useSchool();
  const personal = Boolean(school.personal);
  // справа: у Zukko — ближайшие старты групп, у персонального демо — просто курсы центра (дат и мест мы не знаем)
  const soon = personal ? school.courses.slice(0, 3) : [...school.courses].sort((a, b) => a.startInDays - b.startInDays).slice(0, 3);
  const stats = personal ? ui.personal.stats.map((s) => ({ ...s, value: s.value.replace("{courses}", String(school.courses.length)) })) : t.stats;
  const badge = personal ? [school.name, school.district].filter(Boolean).join(" · ") : t.badge;
  // о персональном центре ничего не утверждаем — только перечисляем его курсы
  const subtitle = personal ? ui.personal.subtitle.replace("{courses}", school.courses.map((c) => tr(c.title, lang)).join(", ")) : t.subtitle;
  return (
    <section className="bg-notebook relative overflow-hidden">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:pt-16 lg:pb-24">
        <div className="animate-pop">
          <p className="inline-flex items-center gap-2 rounded-full bg-sun px-4 py-1.5 text-sm font-bold text-ink">
            <Sparkles className="h-4 w-4" />
            {badge}
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.1] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t.title} <span className="relative whitespace-nowrap text-brand">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrialButton className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-brand px-8 font-semibold text-white shadow-xl shadow-brand/30 hover:bg-brand-dark">
              {t.cta}
              <ArrowRight className="h-5 w-5" />
            </TrialButton>
            {school.testCourse ? (
              <a href="#test" className="inline-flex h-14 items-center justify-center rounded-full border-2 border-ink px-7 font-semibold hover:bg-ink hover:text-white">
                {t.test}
              </a>
            ) : null}
          </div>
          <dl className="mt-10 flex gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold sm:text-3xl">{s.value}</dd>
                <dd className="text-sm text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div aria-hidden="true" className="absolute -top-6 -right-4 h-24 w-24 rounded-full bg-sun" />
          <div className="relative rotate-1 rounded-[2rem] bg-ink p-5 text-white shadow-2xl sm:p-6">
            <p className="font-display text-sm font-bold text-sun">{personal ? ui.personal.cardTitle : t.card.title}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {soon.map((c) => (
                <li key={c.id} className="rounded-2xl bg-white/[0.07] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${directionColor[c.direction].bg} ${directionColor[c.direction].text}`}>{ui.courses.directions[c.direction]}</span>
                    {c.placeholder ? null : (
                      <span className="text-xs text-white/60">
                        {t.card.start} {c.startInDays} {t.card.days}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 font-semibold">{tr(c.title, lang)}</p>
                  {c.placeholder ? (
                    <TrialButton prefill={{ course: c.id }} className="mt-2 text-xs font-semibold text-sun hover:underline">
                      {ui.trial} →
                    </TrialButton>
                  ) : (
                    <>
                      <p className="text-xs text-white/60">{tr(teacherOf(school, c.teacher)?.name ?? { ru: "", uz: "" }, lang)}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <div className="h-1.5 flex-1 rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-sun" style={{ width: `${((c.seats - c.seatsLeft) / c.seats) * 100}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-sun">
                          {t.card.seats} {c.seatsLeft}
                        </span>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
