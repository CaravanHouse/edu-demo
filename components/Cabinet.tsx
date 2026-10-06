import { Award, CalendarClock, Check, CreditCard } from "lucide-react";
import Link from "next/link";
import DemoBar from "./DemoBar";
import Logo from "./Logo";
import { days, directionColor, slots, student } from "@/content/data";
import { getUI } from "@/content/ui";
import { sum, tr, type Locale } from "@/lib/i18n";
import { basePath, brandStyle, courseOf, teacherOf, type School } from "@/lib/school";

// Личный кабинет демо-ученика: статичные данные, вход не нужен. Используется и в обычном, и в персональном демо
function Ring({ value, color }: { value: number; color: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 80 80" className="h-20 w-20 shrink-0 -rotate-90" aria-hidden="true">
      <circle cx="40" cy="40" r={r} fill="none" stroke="#f3e8f1" strokeWidth="8" />
      <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${(value / 100) * c} ${c}`} />
    </svg>
  );
}

export default function Cabinet({ lang, school }: { lang: Locale; school: School }) {
  const ui = getUI(lang);
  // у персонального демо в кабинете курсы центра, задания — общие
  const studentCourses = school.personal
    ? school.courses.slice(0, 2).map((c, i) => ({ ...student.courses[i % student.courses.length], course: c.id }))
    : student.courses;
  const homework = school.personal
    ? student.homework.map((hw, i) => {
        const c = studentCourses[i % studentCourses.length];
        return { ...hw, course: c.course, title: { ru: `${ui.personal.homework} ${7 - i}`, uz: `${7 - i}-${ui.personal.homework.toLowerCase()}` } };
      })
    : student.homework;
  const t = ui.cabinet;
  const statusTone = { todo: "bg-sun text-ink", review: "bg-brand-soft text-brand-dark", done: "bg-emerald-100 text-emerald-800" };
  const ringColor = { english: "#c026d3", it: "#f59e0b", school: "#10b981", exams: "#f43f5e" };

  return (
    <div style={brandStyle(school.color)}>
      <DemoBar lang={lang} school={school} />
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo lang={lang} school={school} />
          <Link href={basePath(school, lang)} className="text-sm font-semibold text-brand hover:underline">
            {t.back}
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <p className="inline-flex rounded-full bg-sun px-3 py-1 text-xs font-bold">{t.demo}</p>
        <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">
          {t.hello}, {tr(student.name, lang)} 👋
        </h1>
        <p className="mt-2 max-w-2xl text-muted">{t.subtitle}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {studentCourses.map((sc) => {
            const course = courseOf(school, sc.course);
            const teacher = teacherOf(school, course.teacher);
            return (
              <section key={sc.course} className="rounded-[1.75rem] bg-surface p-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <Ring value={sc.progress} color={ringColor[course.direction]} />
                    <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold">{sc.progress}%</span>
                  </div>
                  <div className="min-w-0">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${directionColor[course.direction].bg} ${directionColor[course.direction].text}`}>{ui.courses.directions[course.direction]}</span>
                    <h2 className="mt-2 font-display text-lg font-bold">{tr(course.title, lang)}</h2>
                    {teacher ? <p className="text-sm text-muted">{tr(teacher.name, lang)}</p> : null}
                  </div>
                </div>
                <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-2xl bg-bg p-3">
                    <dt className="text-xs text-muted">{t.progress}</dt>
                    <dd className="font-bold">
                      {sc.lessonsDone}/{sc.lessonsTotal}
                    </dd>
                  </div>
                  <div className="rounded-2xl bg-bg p-3">
                    <dt className="text-xs text-muted">{t.attendance}</dt>
                    <dd className="font-bold">{sc.attendance}%</dd>
                  </div>
                  <div className="rounded-2xl bg-bg p-3">
                    <dt className="text-xs text-muted">{t.next}</dt>
                    <dd className="font-bold">
                      {tr(days[sc.nextLesson.day], lang)} {slots[sc.nextLesson.slot]}
                    </dd>
                  </div>
                </dl>
              </section>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-[1.75rem] bg-surface p-6">
            <h2 className="font-display text-lg font-bold">{t.homework}</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {homework.map((hw) => (
                <li key={hw.title.ru} className="flex items-start gap-3 rounded-2xl border border-line p-4">
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${hw.status === "done" ? "bg-emerald-500 text-white" : "border-2 border-line"}`}>
                    {hw.status === "done" ? <Check className="h-4 w-4" strokeWidth={3} /> : null}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{tr(hw.title, lang)}</p>
                    <p className="text-xs text-muted">
                      {tr(courseOf(school, hw.course).title, lang)} · {hw.dueInDays === 0 ? t.due.today : hw.dueInDays === 1 ? t.due.tomorrow : t.due.past}
                      {"grade" in hw && hw.grade ? ` · ${hw.grade}` : ""}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${statusTone[hw.status]}`}>{t.statuses[hw.status]}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-col gap-4">
            <section className="rounded-[1.75rem] bg-surface p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <CalendarClock className="h-5 w-5 text-brand" />
                {t.calendar}
              </h2>
              <div className="mt-4 grid grid-cols-6 gap-1.5 text-center text-[10px] font-semibold text-subtle" aria-hidden="true">
                {days.map((d) => (
                  <span key={d.ru}>{tr(d, lang)}</span>
                ))}
              </div>
              <div className="mt-1.5 grid grid-cols-6 gap-1.5" role="img" aria-label={t.calendar}>
                {student.attendance.map((a, i) => (
                  <span key={i} className={`aspect-square rounded-lg ${a === 1 ? "bg-brand" : a === 0 ? "bg-rose-300" : "bg-bg"}`} />
                ))}
              </div>
            </section>
            <section className="rounded-[1.75rem] bg-surface p-6">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <CreditCard className="h-5 w-5 text-brand" />
                {t.payments}
              </h2>
              <ul className="mt-3 flex flex-col">
                {student.payments.map((p) => (
                  <li key={p.month.ru} className="flex items-center justify-between gap-3 border-b border-line py-3 last:border-0">
                    <span className="text-sm">
                      <span className="font-semibold">{tr(p.month, lang)}</span>
                      <span className="block text-xs text-muted">
                        {sum(p.amount)} {ui.currency}
                      </span>
                    </span>
                    {p.paid ? (
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">{t.paid}</span>
                    ) : (
                      <span className="rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white">{t.pay}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
            <section className="flex items-center gap-4 rounded-[1.75rem] bg-ink p-6 text-white">
              <Award className="h-10 w-10 shrink-0 text-sun" />
              <p className="font-display font-bold">{t.certificate}</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
