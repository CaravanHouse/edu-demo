// Данные учебного центра, которые показывает сайт: вымышленная Zukko Academy или персональное демо для реального центра.
// Персональное демо собирается из конфига (лежит в приватном хранилище Vercel Blob, см. lib/prospect.ts).
import { courses as zukkoCourses, groups as zukkoGroups, teachers as zukkoTeachers, type Course, type Direction, type Teacher } from "@/content/data";
import type { L, Locale } from "@/lib/i18n";

export interface Group {
  course: string;
  day: number;
  slot: number;
  room: string;
}

/** Конфиг персонального демо — его пишет скрипт из репозитория sales (prospects.csv → edu/<slug>/config.json) */
export interface ProspectConfig {
  slug: string;
  name: string;
  district?: string;
  lang: Locale;
  courses: string[];
  color?: string;
  logo?: string; // имя файла логотипа в хранилище; нет — показываем инициалы
  phone?: string;
  instagram?: string;
  telegram?: string;
}

export interface School {
  /** null — обычное демо Zukko Academy */
  personal: { slug: string; hasLogo: boolean } | null;
  name: string;
  district?: string;
  phone?: string;
  color?: string;
  courses: Course[];
  groups: Group[];
  teachers: Teacher[];
  /** Курс, который рекомендует тест уровня английского; null — теста нет (в центре нет английского) */
  testCourse: string | null;
}

export const zukko: School = {
  personal: null,
  name: "Zukko",
  courses: zukkoCourses,
  groups: zukkoGroups,
  teachers: zukkoTeachers,
  testCourse: "gen",
};

const SLUG = /^[a-z0-9-]{1,40}$/;
export const isSlug = (value: string) => SLUG.test(value);

// Направление курса по названию — только чтобы раскрасить карточку и расписание
function guessDirection(name: string): Direction {
  const n = name.toLowerCase();
  if (/ielts|sat|cefr|toefl|dtm|imtihon|экзам|абитур|abituriyent|milliy sertifikat/.test(n)) return "exams";
  if (/python|frontend|backend|java|web|it\b|programm|програм|dasturlash|дизайн|design|figma|комп|kompyuter|robot|scratch|1c/.test(n)) return "it";
  if (/english|англ|ingliz|kids|speaking|grammar|nemis|немец|корей|koreys|турец|turk|араб|arab|рус|rus tili|китай|xitoy|tili|язык/.test(n)) return "english";
  return "school";
}

const ENGLISH = /english|англ|ingliz|ielts|toefl|speaking|kids|cefr/i;

/** Персональное демо: только то, что знаем о центре (название, курсы, цвет, контакты). Цен, преподавателей и цифр не выдумываем. */
export function personalSchool(config: ProspectConfig): School {
  const courses: Course[] = config.courses.slice(0, 12).map((title, i) => {
    const t: L = { ru: title, uz: title };
    return {
      id: `c${i + 1}`,
      direction: guessDirection(title),
      title: t,
      short: { ru: "", uz: "" },
      level: { ru: "", uz: "" },
      months: 0,
      perWeek: 0,
      price: 0,
      formats: [],
      age: { ru: "", uz: "" },
      teacher: "",
      seatsLeft: 0,
      seats: 0,
      startInDays: 0,
      outcome: { ru: "", uz: "" },
      placeholder: true,
    };
  });
  // Пример расписания: курсы центра по очереди раскладываем по сетке, по 2–3 занятия в неделю
  const cells: [number, number][] = [];
  for (let slot = 2; slot < 6; slot++) for (let day = 0; day < 6; day++) cells.push([day, slot]);
  const groups: Group[] = [];
  courses.forEach((course, i) => {
    const lessons = i % 2 ? 2 : 3;
    for (let k = 0; k < lessons && cells.length; k++) {
      const [day, slot] = cells.splice((i * 5 + k * 7) % cells.length, 1)[0];
      groups.push({ course: course.id, day, slot, room: String(101 + i) });
    }
  });
  const english = courses.find((c) => ENGLISH.test(c.title.ru));
  return {
    personal: { slug: config.slug, hasLogo: Boolean(config.logo) },
    name: config.name,
    district: config.district,
    phone: config.phone,
    color: config.color,
    courses,
    groups,
    teachers: [],
    testCourse: english?.id ?? null,
  };
}

export const courseOf = (school: School, id: string) => school.courses.find((c) => c.id === id) ?? school.courses[0];
export const teacherOf = (school: School, id: string) => school.teachers.find((t) => t.id === id);

/** Базовый путь страниц центра: /ru или /ru/p/<slug> */
export const basePath = (school: School, lang: Locale) => (school.personal ? `/${lang}/p/${school.personal.slug}` : `/${lang}`);

/** Ссылка на бот заявок CaravanHouse с меткой: demo_edu для общего демо, demo_<slug> для персонального */
export const leadBotUrl = (school: School) => `https://t.me/CaravanHousebot?start=${school.personal ? `demo_${school.personal.slug}` : "demo_edu"}`;

/** Цвет центра → переменные темы. Слишком светлый цвет затемняем, чтобы белый текст на кнопках читался */
export function brandStyle(color?: string): Record<string, string> | undefined {
  if (!color || !/^#[0-9a-f]{6}$/i.test(color)) return undefined;
  const n = parseInt(color.slice(1), 16);
  const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  const base = lum > 0.62 ? `color-mix(in oklab, ${color} 62%, black)` : color;
  return {
    "--color-brand": base,
    "--color-brand-dark": `color-mix(in oklab, ${base} 80%, black)`,
    "--color-brand-soft": `color-mix(in oklab, ${color} 13%, white)`,
  };
}

export const initials = (name: string) =>
  name
    .replace(/[«»"'“”]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
