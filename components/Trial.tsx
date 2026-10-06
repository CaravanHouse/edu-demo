"use client";

import { Check, X } from "lucide-react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { days, slots } from "@/content/data";
import { getUI } from "@/content/ui";
import { tr, type Locale } from "@/lib/i18n";
import type { Group } from "@/lib/school";
import { useSchool } from "./SchoolContext";

type Prefill = { course?: string; group?: number };
const TrialContext = createContext<(p?: Prefill) => void>(() => {});
export const useTrial = () => useContext(TrialContext);

/** Окно «Пробный урок» доступно из курсов, теста и расписания */
export default function TrialProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  const [prefill, setPrefill] = useState<Prefill | null>(null);
  return (
    <TrialContext.Provider value={(p = {}) => setPrefill(p)}>
      {children}
      {prefill ? <TrialModal lang={lang} prefill={prefill} onClose={() => setPrefill(null)} /> : null}
    </TrialContext.Provider>
  );
}

export function TrialButton({ prefill, className, children }: { prefill?: Prefill; className?: string; children: ReactNode }) {
  const open = useTrial();
  return (
    <button type="button" onClick={() => open(prefill)} className={className}>
      {children}
    </button>
  );
}

const groupLabel = (g: Group | undefined, lang: Locale) => (g ? `${tr(days[g.day], lang)} ${slots[g.slot]} · ${g.room}` : "");

function TrialModal({ lang, prefill, onClose }: { lang: Locale; prefill: Prefill; onClose: () => void }) {
  const ui = getUI(lang);
  const t = ui.modal;
  const { courses, groups } = useSchool();
  const [course, setCourse] = useState(prefill.course ?? (prefill.group !== undefined ? groups[prefill.group].course : courses[0].id));
  const courseGroups = groups.map((g, i) => ({ ...g, i })).filter((g) => g.course === course);
  const [group, setGroup] = useState<number>(prefill.group ?? courseGroups[0]?.i ?? 0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [forWhom, setForWhom] = useState(0);
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const submit = () => {
    if (name.trim().length < 2 || phone.replace(/\D/g, "").length < 12) return setError(true);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 sm:items-center sm:p-6" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="trial-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-pop max-h-[92dvh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-surface p-6 shadow-2xl sm:rounded-[2rem] sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="trial-title" className="font-display text-xl font-bold">
            {done ? t.successTitle : t.title}
          </h2>
          <button type="button" onClick={onClose} aria-label={t.close} className="rounded-full p-2 text-muted hover:bg-bg">
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="mt-6 text-center">
            <span className="animate-pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white">
              <Check className="h-8 w-8" strokeWidth={3} />
            </span>
            <p className="mt-4 font-semibold">
              {tr((courses.find((c) => c.id === course) ?? courses[0]).title, lang)} · {groupLabel(groups[group], lang)}
            </p>
            <p className="mt-3 text-sm text-muted">{t.successText}</p>
            <button type="button" onClick={onClose} className="mt-6 h-12 w-full rounded-full bg-ink font-semibold text-white">
              {t.close}
            </button>
          </div>
        ) : (
          <div className="mt-5 grid gap-4">
            <label className="grid gap-1.5 text-sm font-semibold">
              {t.course}
              <select
                value={course}
                onChange={(e) => {
                  setCourse(e.target.value);
                  setGroup(groups.findIndex((g) => g.course === e.target.value));
                }}
                className="input cursor-pointer"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {tr(c.title, lang)}
                  </option>
                ))}
              </select>
            </label>
            <fieldset>
              <legend className="text-sm font-semibold">{t.group}</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {courseGroups.map((g) => (
                  <button
                    key={g.i}
                    type="button"
                    aria-pressed={group === g.i}
                    onClick={() => setGroup(g.i)}
                    className={`rounded-full border px-3.5 py-2 text-sm font-semibold ${group === g.i ? "border-brand bg-brand text-white" : "border-line hover:border-brand/50"}`}
                  >
                    {groupLabel(g, lang)}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">{t.age}</legend>
              <div className="mt-2 flex gap-2">
                {t.ages.map((a, i) => (
                  <button key={a} type="button" aria-pressed={forWhom === i} onClick={() => setForWhom(i)} className={`flex-1 rounded-xl border py-2.5 text-sm font-semibold ${forWhom === i ? "border-ink bg-ink text-white" : "border-line"}`}>
                    {a}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="grid gap-1.5 text-sm font-semibold">
              {t.name}
              <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className="input" />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold">
              {t.phone}
              <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" className="input" />
            </label>
            {error ? <p className="text-sm text-brand">{t.required}</p> : null}
            <button type="button" onClick={submit} className="h-12 rounded-full bg-brand font-semibold text-white shadow-lg shadow-brand/25 hover:bg-brand-dark">
              {t.send}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
