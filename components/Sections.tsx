"use client";

import { ArrowRight, CalendarDays, Clock, MonitorPlay, RotateCcw, Users } from "lucide-react";
import { useState } from "react";
import { days, directionColor, levelByScore, levelTest, slots, type Direction, type Format } from "@/content/data";
import { getUI } from "@/content/ui";
import { sum, tr, type Locale } from "@/lib/i18n";
import { courseOf, teacherOf } from "@/lib/school";
import { useSchool } from "./SchoolContext";
import { TrialButton } from "./Trial";

const initials = (name: string) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

function Heading({ eyebrow, title, subtitle, id, light }: { eyebrow: string; title: string; subtitle?: string; id: string; light?: boolean }) {
  return (
    <div>
      <p className={`text-sm font-bold uppercase tracking-[0.16em] ${light ? "text-sun" : "text-brand"}`}>{eyebrow}</p>
      <h2 id={id} className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle ? <p className={`mt-3 max-w-2xl ${light ? "text-white/70" : "text-muted"}`}>{subtitle}</p> : null}
    </div>
  );
}

export function Courses({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const t = ui.courses;
  const school = useSchool();
  const [direction, setDirection] = useState<Direction | "all">("all");
  const [format, setFormat] = useState<Format | "all">("all");
  // вкладки — только те направления, которые есть у центра
  const directions = (["english", "it", "school", "exams"] as const).filter((d) => school.courses.some((c) => c.direction === d));
  const list = school.courses.filter((c) => (direction === "all" || c.direction === direction) && (format === "all" || c.placeholder || c.formats.includes(format)));

  return (
    <section id="courses" aria-labelledby="courses-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading id="courses-title" eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div role="tablist" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            {(["all", ...directions] as const).map((d) => (
              <button
                key={d}
                role="tab"
                aria-selected={direction === d}
                onClick={() => setDirection(d)}
                className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${direction === d ? "bg-ink text-white" : "bg-surface hover:bg-brand-soft"}`}
              >
                {d === "all" ? t.all : t.directions[d]}
              </button>
            ))}
          </div>
          <div role="group" className={`flex self-start rounded-full bg-surface p-1 text-sm font-semibold ${school.personal ? "hidden" : ""}`}>
            {(["all", "offline", "online"] as const).map((f) => (
              <button key={f} type="button" aria-pressed={format === f} onClick={() => setFormat(f)} className={`rounded-full px-4 py-2 ${format === f ? "bg-brand text-white" : "text-muted"}`}>
                {f === "all" ? t.anyFormat : t.formats[f]}
              </button>
            ))}
          </div>
        </div>

        {list.length ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {list.map((c) => {
              const teacher = teacherOf(school, c.teacher);
              const color = directionColor[c.direction];
              // курс персонального демо: знаем только название — показываем, где будет описание
              if (c.placeholder || !teacher) {
                return (
                  <li key={c.id} className="flex flex-col rounded-[1.75rem] border border-line bg-surface p-6">
                    <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${color.bg} ${color.text}`}>{t.directions[c.direction]}</span>
                    <h3 className="mt-4 font-display text-xl font-bold">{tr(c.title, lang)}</h3>
                    <p className="mt-3 rounded-2xl border border-dashed border-line px-4 py-3 text-sm text-muted">{ui.personal.courseNote}</p>
                    <div className="mt-auto pt-6">
                      <TrialButton prefill={{ course: c.id }} className="h-11 w-full rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-brand">
                        {t.book}
                      </TrialButton>
                    </div>
                  </li>
                );
              }
              return (
                <li key={c.id} className="relative flex flex-col rounded-[1.75rem] border border-line bg-surface p-6 transition-shadow hover:shadow-xl">
                  {c.hit ? <span className="absolute -top-3 right-6 rounded-full bg-sun px-3 py-1 text-xs font-bold">{t.hit}</span> : null}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${color.bg} ${color.text}`}>{t.directions[c.direction]}</span>
                    <span className="rounded-full bg-bg px-3 py-1 text-xs font-semibold text-muted">{tr(c.level, lang)}</span>
                    {c.formats.map((f) => (
                      <span key={f} className="inline-flex items-center gap-1 rounded-full bg-bg px-3 py-1 text-xs font-semibold text-muted">
                        {f === "online" ? <MonitorPlay className="h-3 w-3" /> : <Users className="h-3 w-3" />}
                        {t.formats[f]}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold">{tr(c.title, lang)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{tr(c.short, lang)}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-brand" />
                      {c.months} {t.months}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-brand" />
                      {c.perWeek} {t.perWeek}
                    </div>
                  </dl>
                  <div className="mt-5 flex items-center gap-3 rounded-2xl bg-bg p-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-sm font-bold text-brand">{initials(tr(teacher.name, lang))}</span>
                    <span className="min-w-0 text-sm">
                      <span className="block text-xs text-subtle">{t.teacher}</span>
                      <span className="block truncate font-semibold">{tr(teacher.name, lang)}</span>
                    </span>
                  </div>
                  <div className="mt-5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className={c.seatsLeft <= 2 ? "text-brand" : "text-muted"}>
                        {t.seatsLeft} {c.seatsLeft}
                      </span>
                      <span className="text-muted">
                        {t.startIn} {c.startInDays} {t.days}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-bg">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${((c.seats - c.seatsLeft) / c.seats) * 100}%` }} />
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                    <p className="font-display text-lg font-bold">
                      {sum(c.price)} <span className="font-sans text-xs font-semibold text-muted">{ui.perMonth}</span>
                    </p>
                    <TrialButton prefill={{ course: c.id }} className="h-11 shrink-0 rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-brand">
                      {t.book}
                    </TrialButton>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-10 rounded-3xl border border-dashed border-line p-10 text-center text-muted">{t.empty}</p>
        )}
      </div>
    </section>
  );
}

export function LevelTest({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const t = ui.test;
  const school = useSchool();
  const [step, setStep] = useState(-1); // -1 — старт, длина — результат
  const [answers, setAnswers] = useState<number[]>([]);
  const score = answers.filter((a, i) => a === levelTest[i].answer).length;
  const level = levelByScore.find((l) => score >= l.min)!;
  // у персонального демо рекомендуем английский курс центра
  const result = { level: level.level, course: school.personal ? (school.testCourse ?? level.course) : level.course };
  if (!school.testCourse) return null;

  const choose = (option: number) => {
    setAnswers([...answers, option]);
    setStep(step + 1);
  };

  return (
    <section id="test" aria-labelledby="test-title" className="bg-ink py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Heading id="test-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} light />
        <div className="rounded-[2rem] bg-surface p-6 text-ink sm:p-8">
          {step === -1 ? (
            <div className="text-center">
              <p className="font-display text-5xl font-bold text-brand">A1 → C1</p>
              <button type="button" onClick={() => setStep(0)} className="mt-6 inline-flex h-14 items-center gap-2 rounded-full bg-brand px-8 font-semibold text-white hover:bg-brand-dark">
                {t.start}
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          ) : step < levelTest.length ? (
            <div key={step} className="animate-pop">
              <div className="flex items-center justify-between text-sm font-semibold text-muted">
                <span>
                  {t.question} {step + 1} {t.of} {levelTest.length}
                </span>
                <span className="flex gap-1">
                  {levelTest.map((_, i) => (
                    <span key={i} className={`h-1.5 w-6 rounded-full ${i <= step ? "bg-brand" : "bg-line"}`} />
                  ))}
                </span>
              </div>
              <p className="mt-6 font-display text-xl font-bold sm:text-2xl">{levelTest[step].q}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {levelTest[step].options.map((o, i) => (
                  <button key={o} type="button" onClick={() => choose(i)} className="h-14 rounded-2xl border-2 border-line font-semibold transition-colors hover:border-brand hover:bg-brand-soft">
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-pop text-center">
              <p className="text-sm font-semibold text-muted">{t.resultTitle}</p>
              <p className="font-display text-7xl font-bold text-brand">{result.level}</p>
              <p className="mt-3 text-muted">
                {score} / {levelTest.length} {t.resultText}
              </p>
              <p className="mt-1 font-display text-lg font-bold">{tr(courseOf(school, result.course).title, lang)}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <TrialButton prefill={{ course: result.course }} className="h-12 rounded-full bg-brand px-6 font-semibold text-white hover:bg-brand-dark">
                  {t.book}
                </TrialButton>
                <button
                  type="button"
                  onClick={() => {
                    setAnswers([]);
                    setStep(0);
                  }}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line px-6 font-semibold hover:bg-bg"
                >
                  <RotateCcw className="h-4 w-4" />
                  {t.again}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Schedule({ lang }: { lang: Locale }) {
  const ui = getUI(lang);
  const t = ui.schedule;
  const school = useSchool();
  const [direction, setDirection] = useState<Direction | "all">("all");
  const directions = (["english", "it", "school", "exams"] as const).filter((d) => school.courses.some((c) => c.direction === d));
  return (
    <section id="schedule" aria-labelledby="schedule-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <Heading id="schedule-title" eyebrow={t.eyebrow} title={t.title} subtitle={school.personal ? `${t.subtitle} ${ui.personal.scheduleNote}` : t.subtitle} />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            {(["all", ...directions] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={direction === d}
                onClick={() => setDirection(d)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${direction === d ? "bg-ink text-white" : "bg-surface"}`}
              >
                {d !== "all" ? <span className={`h-2 w-2 rounded-full ${directionColor[d].dot}`} /> : null}
                {d === "all" ? ui.courses.all : ui.courses.directions[d]}
              </button>
            ))}
          </div>
        </div>

        {/* Таблица листается по горизонтали на телефоне */}
        <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          <div className="grid min-w-[760px] grid-cols-[4.5rem_repeat(6,1fr)] gap-1.5 rounded-[1.75rem] bg-surface p-3">
            <div />
            {days.map((d) => (
              <div key={d.ru} className="py-2 text-center font-display text-sm font-bold">
                {tr(d, lang)}
              </div>
            ))}
            {slots.map((slot, s) => (
              <div key={slot} className="contents">
                <div className="flex items-center justify-center text-xs font-semibold text-muted">{slot}</div>
                {days.map((_, d) => {
                  const index = school.groups.findIndex((g) => g.day === d && g.slot === s);
                  const g = school.groups[index];
                  const course = g ? courseOf(school, g.course) : null;
                  const visible = course && (direction === "all" || course.direction === direction);
                  return (
                    <div key={d} className="min-h-[4.5rem]">
                      {g && course && visible ? (
                        <TrialButton
                          prefill={{ group: index }}
                          className={`flex h-full w-full flex-col justify-between rounded-xl p-2 text-left transition-transform hover:-translate-y-0.5 hover:shadow-md ${directionColor[course.direction].bg}`}
                        >
                          <span className={`text-xs leading-tight font-bold ${directionColor[course.direction].text}`}>{tr(course.title, lang)}</span>
                          <span className="text-[10px] text-muted">
                            {g.room === "Zoom" ? "Online · Zoom" : `${t.room} ${g.room}`}
                          </span>
                        </TrialButton>
                      ) : (
                        <div className="h-full rounded-xl bg-bg/70" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Teachers({ lang }: { lang: Locale }) {
  const t = getUI(lang).teachers;
  const { teachers } = useSchool();
  const tones = ["bg-fuchsia-200", "bg-amber-200", "bg-emerald-200", "bg-rose-200"];
  // в персональном демо преподавателей центра мы не знаем — блок не показываем
  if (!teachers.length) return null;
  return (
    <section id="teachers" aria-labelledby="teachers-title" className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading id="teachers-title" eyebrow={t.eyebrow} title={t.title} />
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {teachers.map((teacher, i) => (
            <li key={teacher.id} className="rounded-[1.75rem] bg-bg p-5">
              <span className={`flex aspect-square w-full items-center justify-center rounded-2xl font-display text-4xl font-bold text-ink/80 ${tones[i % tones.length]}`}>
                {initials(tr(teacher.name, lang))}
              </span>
              <h3 className="mt-4 font-bold">{tr(teacher.name, lang)}</h3>
              <p className="text-sm text-muted">{tr(teacher.subject, lang)}</p>
              <p className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full bg-sun px-2.5 py-1">{tr(teacher.badge, lang)}</span>
                <span className="rounded-full bg-surface px-2.5 py-1 text-muted">
                  {teacher.years} {t.years}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
