// Данные вымышленного учебного центра Zukko Academy. Всё на двух языках.
import type { L } from "@/lib/i18n";

export type Direction = "english" | "it" | "school" | "exams";
export type Format = "offline" | "online";
export type Level = "A1" | "A2" | "B1" | "B2" | "C1";

export const directionColor: Record<Direction, { bg: string; text: string; dot: string }> = {
  english: { bg: "bg-fuchsia-100", text: "text-fuchsia-800", dot: "bg-fuchsia-500" },
  it: { bg: "bg-amber-100", text: "text-amber-800", dot: "bg-amber-500" },
  school: { bg: "bg-emerald-100", text: "text-emerald-800", dot: "bg-emerald-500" },
  exams: { bg: "bg-rose-100", text: "text-rose-800", dot: "bg-rose-500" },
};

export interface Teacher {
  id: string;
  name: L;
  subject: L;
  badge: L;
  years: number;
}

export const teachers: Teacher[] = [
  { id: "t1", name: { ru: "Камила Рахимова", uz: "Kamila Rahimova" }, subject: { ru: "Английский, IELTS", uz: "Ingliz tili, IELTS" }, badge: { ru: "IELTS 8.5", uz: "IELTS 8.5" }, years: 9 },
  { id: "t2", name: { ru: "Джеймс Картер", uz: "Jeyms Karter" }, subject: { ru: "Разговорный английский", uz: "Soʻzlashuv ingliz tili" }, badge: { ru: "Носитель языка", uz: "Til sohibi" }, years: 12 },
  { id: "t3", name: { ru: "Улугбек Носиров", uz: "Ulugʻbek Nosirov" }, subject: { ru: "Python и веб-разработка", uz: "Python va veb-dasturlash" }, badge: { ru: "Senior-разработчик", uz: "Senior dasturchi" }, years: 8 },
  { id: "t4", name: { ru: "Дина Ким", uz: "Dina Kim" }, subject: { ru: "UI/UX-дизайн", uz: "UI/UX dizayn" }, badge: { ru: "Продуктовый дизайнер", uz: "Mahsulot dizayneri" }, years: 6 },
  { id: "t5", name: { ru: "Шахзод Алимов", uz: "Shahzod Alimov" }, subject: { ru: "Математика", uz: "Matematika" }, badge: { ru: "Призёр олимпиад", uz: "Olimpiada sovrindori" }, years: 11 },
  { id: "t6", name: { ru: "Мохира Тошева", uz: "Mohira Tosheva" }, subject: { ru: "Английский для детей", uz: "Bolalar uchun ingliz tili" }, badge: { ru: "CELTA", uz: "CELTA" }, years: 7 },
  { id: "t7", name: { ru: "Акмаль Юлдашев", uz: "Akmal Yoʻldoshev" }, subject: { ru: "SAT Math, абитуриентам", uz: "SAT Math, abituriyentlarga" }, badge: { ru: "SAT 800 / 800", uz: "SAT 800 / 800" }, years: 5 },
  { id: "t8", name: { ru: "Нилуфар Каримова", uz: "Nilufar Karimova" }, subject: { ru: "Frontend и JavaScript", uz: "Frontend va JavaScript" }, badge: { ru: "Тимлид", uz: "Timlid" }, years: 7 },
];

export interface Course {
  id: string;
  direction: Direction;
  title: L;
  short: L;
  level: L;
  months: number;
  perWeek: number;
  price: number;
  formats: Format[];
  age: L;
  teacher: string;
  seatsLeft: number;
  seats: number;
  startInDays: number;
  outcome: L;
  hit?: boolean;
  /** курс из персонального демо: знаем только название, остальное не показываем */
  placeholder?: boolean;
}

export const courses: Course[] = [
  { id: "gen", direction: "english", title: { ru: "General English", uz: "General English" }, short: { ru: "Английский с нуля до B2 в мини-группах до 8 человек", uz: "8 kishigacha mini guruhlarda noldan B2 gacha ingliz tili" }, level: { ru: "A1–B2", uz: "A1–B2" }, months: 4, perWeek: 3, price: 590000, formats: ["offline", "online"], age: { ru: "от 14 лет", uz: "14 yoshdan" }, teacher: "t1", seatsLeft: 3, seats: 8, startInDays: 5, outcome: { ru: "Следующий уровень за 4 месяца", uz: "4 oyda keyingi daraja" }, hit: true },
  { id: "ielts", direction: "exams", title: { ru: "IELTS Intensive", uz: "IELTS Intensive" }, short: { ru: "Подготовка к IELTS 7.0+: пробные экзамены каждую неделю", uz: "IELTS 7.0+ ga tayyorgarlik: har hafta sinov imtihonlari" }, level: { ru: "от B1", uz: "B1 dan" }, months: 3, perWeek: 4, price: 890000, formats: ["offline"], age: { ru: "от 16 лет", uz: "16 yoshdan" }, teacher: "t1", seatsLeft: 2, seats: 10, startInDays: 9, outcome: { ru: "Средний рост +1.0 балла", uz: "Oʻrtacha +1.0 ball oʻsish" }, hit: true },
  { id: "speak", direction: "english", title: { ru: "Speaking Club", uz: "Speaking Club" }, short: { ru: "Только разговор с носителем языка — по вечерам", uz: "Faqat til sohibi bilan suhbat — kechqurunlari" }, level: { ru: "от A2", uz: "A2 dan" }, months: 2, perWeek: 2, price: 450000, formats: ["offline", "online"], age: { ru: "от 16 лет", uz: "16 yoshdan" }, teacher: "t2", seatsLeft: 6, seats: 12, startInDays: 2, outcome: { ru: "Свободная речь без страха", uz: "Qoʻrquvsiz erkin nutq" } },
  { id: "kids", direction: "english", title: { ru: "English for Kids", uz: "English for Kids" }, short: { ru: "Игровой английский для детей 7–11 лет", uz: "7–11 yoshli bolalar uchun oʻyin tarzidagi ingliz tili" }, level: { ru: "Starter", uz: "Starter" }, months: 9, perWeek: 2, price: 420000, formats: ["offline"], age: { ru: "7–11 лет", uz: "7–11 yosh" }, teacher: "t6", seatsLeft: 4, seats: 8, startInDays: 12, outcome: { ru: "Ребёнок говорит на простые темы", uz: "Bola oddiy mavzularda gapiradi" } },
  { id: "python", direction: "it", title: { ru: "Python-разработчик", uz: "Python dasturchi" }, short: { ru: "От основ до Telegram-бота и веб-сервиса в портфолио", uz: "Asoslardan Telegram-bot va veb-xizmatgacha — portfolioda" }, level: { ru: "с нуля", uz: "noldan" }, months: 6, perWeek: 3, price: 950000, formats: ["offline", "online"], age: { ru: "от 15 лет", uz: "15 yoshdan" }, teacher: "t3", seatsLeft: 5, seats: 14, startInDays: 7, outcome: { ru: "3 проекта в портфолио", uz: "Portfolioda 3 ta loyiha" }, hit: true },
  { id: "front", direction: "it", title: { ru: "Frontend: HTML, CSS, JavaScript", uz: "Frontend: HTML, CSS, JavaScript" }, short: { ru: "Вёрстка и интерактивные сайты, финал — свой проект", uz: "Sahifalash va interaktiv saytlar, yakunda — oʻz loyihangiz" }, level: { ru: "с нуля", uz: "noldan" }, months: 5, perWeek: 3, price: 890000, formats: ["online"], age: { ru: "от 14 лет", uz: "14 yoshdan" }, teacher: "t8", seatsLeft: 7, seats: 16, startInDays: 14, outcome: { ru: "Сайт-портфолио онлайн", uz: "Onlayn portfolio sayt" } },
  { id: "design", direction: "it", title: { ru: "UI/UX-дизайн в Figma", uz: "Figmada UI/UX dizayn" }, short: { ru: "Интерфейсы приложений и сайтов, работа с реальными брифами", uz: "Ilova va sayt interfeyslari, real brif bilan ishlash" }, level: { ru: "с нуля", uz: "noldan" }, months: 4, perWeek: 2, price: 790000, formats: ["offline", "online"], age: { ru: "от 15 лет", uz: "15 yoshdan" }, teacher: "t4", seatsLeft: 1, seats: 10, startInDays: 4, outcome: { ru: "Кейс для портфолио", uz: "Portfolio uchun keys" } },
  { id: "math", direction: "school", title: { ru: "Математика 5–9 класс", uz: "Matematika 5–9-sinf" }, short: { ru: "Подтянуть оценки и полюбить математику", uz: "Baholarni koʻtarish va matematikani sevish" }, level: { ru: "5–9 класс", uz: "5–9-sinf" }, months: 9, perWeek: 2, price: 390000, formats: ["offline"], age: { ru: "10–15 лет", uz: "10–15 yosh" }, teacher: "t5", seatsLeft: 3, seats: 8, startInDays: 6, outcome: { ru: "Уверенная «пятёрка»", uz: "Ishonchli «besh»" } },
  { id: "sat", direction: "exams", title: { ru: "SAT Math", uz: "SAT Math" }, short: { ru: "Для поступления в зарубежные вузы", uz: "Xorijiy oliygohlarga kirish uchun" }, level: { ru: "старшеклассникам", uz: "yuqori sinflar" }, months: 3, perWeek: 3, price: 850000, formats: ["offline", "online"], age: { ru: "15–18 лет", uz: "15–18 yosh" }, teacher: "t7", seatsLeft: 4, seats: 10, startInDays: 10, outcome: { ru: "Цель — 750+", uz: "Maqsad — 750+" } },
];

export const days: L[] = [
  { ru: "Пн", uz: "Du" },
  { ru: "Вт", uz: "Se" },
  { ru: "Ср", uz: "Ch" },
  { ru: "Чт", uz: "Pa" },
  { ru: "Пт", uz: "Ju" },
  { ru: "Сб", uz: "Sh" },
];
export const slots = ["09:00", "11:00", "14:00", "16:00", "18:00", "19:30"];

/** Группы в расписании: [курс, день 0–5, слот 0–5, кабинет/онлайн] */
export const groups: { course: string; day: number; slot: number; room: string }[] = [
  { course: "gen", day: 0, slot: 4, room: "201" },
  { course: "gen", day: 2, slot: 4, room: "201" },
  { course: "gen", day: 4, slot: 4, room: "201" },
  { course: "ielts", day: 0, slot: 5, room: "305" },
  { course: "ielts", day: 1, slot: 5, room: "305" },
  { course: "ielts", day: 3, slot: 5, room: "305" },
  { course: "ielts", day: 5, slot: 1, room: "305" },
  { course: "speak", day: 1, slot: 4, room: "Lounge" },
  { course: "speak", day: 3, slot: 4, room: "Lounge" },
  { course: "kids", day: 1, slot: 3, room: "102" },
  { course: "kids", day: 3, slot: 3, room: "102" },
  { course: "python", day: 0, slot: 3, room: "IT-1" },
  { course: "python", day: 2, slot: 3, room: "IT-1" },
  { course: "python", day: 4, slot: 3, room: "IT-1" },
  { course: "front", day: 1, slot: 1, room: "Zoom" },
  { course: "front", day: 3, slot: 1, room: "Zoom" },
  { course: "front", day: 5, slot: 2, room: "Zoom" },
  { course: "design", day: 2, slot: 5, room: "IT-2" },
  { course: "design", day: 5, slot: 3, room: "IT-2" },
  { course: "math", day: 0, slot: 2, room: "104" },
  { course: "math", day: 3, slot: 2, room: "104" },
  { course: "sat", day: 1, slot: 2, room: "305" },
  { course: "sat", day: 4, slot: 2, room: "305" },
  { course: "sat", day: 5, slot: 0, room: "305" },
];

/** Мини-тест уровня английского: правильный ответ — индекс в options */
export const levelTest: { q: string; options: string[]; answer: number }[] = [
  { q: "She ___ to work by bus every day.", options: ["go", "goes", "going", "gone"], answer: 1 },
  { q: "I have lived here ___ 2019.", options: ["for", "since", "from", "at"], answer: 1 },
  { q: "If I ___ more time, I would learn Spanish.", options: ["have", "will have", "had", "would have"], answer: 2 },
  { q: "The report ___ by the manager yesterday.", options: ["was written", "wrote", "has written", "is writing"], answer: 0 },
  { q: "Hardly ___ the meeting started when the lights went out.", options: ["the", "did", "had", "was"], answer: 2 },
  { q: "He suggested ___ a taxi to the airport.", options: ["to take", "taking", "take", "took"], answer: 1 },
];

export const levelByScore: { min: number; level: Level; course: string }[] = [
  { min: 6, level: "C1", course: "ielts" },
  { min: 5, level: "B2", course: "ielts" },
  { min: 4, level: "B1", course: "speak" },
  { min: 2, level: "A2", course: "gen" },
  { min: 0, level: "A1", course: "gen" },
];

export const courseById = (id: string) => courses.find((c) => c.id === id)!;
export const teacherById = (id: string) => teachers.find((t) => t.id === id)!;

// Личный кабинет демо-ученика
export const student = {
  name: { ru: "Азиз", uz: "Aziz" },
  courses: [
    { course: "gen", progress: 68, lessonsDone: 34, lessonsTotal: 50, attendance: 94, nextLesson: { day: 2, slot: 4 } },
    { course: "python", progress: 41, lessonsDone: 30, lessonsTotal: 72, attendance: 88, nextLesson: { day: 0, slot: 3 } },
  ],
  homework: [
    { title: { ru: "Unit 7: Present Perfect — упражнения 1–6", uz: "Unit 7: Present Perfect — 1–6-mashqlar" }, course: "gen", status: "todo" as const, dueInDays: 1 },
    { title: { ru: "Бот-напоминалка на Python: обработка команд", uz: "Python’da eslatma-bot: buyruqlarni qayta ishlash" }, course: "python", status: "review" as const, dueInDays: 0 },
    { title: { ru: "Эссе: My favourite place in Tashkent", uz: "Insho: My favourite place in Tashkent" }, course: "gen", status: "done" as const, dueInDays: -3, grade: "9/10" },
    { title: { ru: "Циклы и списки: 10 задач", uz: "Tsikllar va roʻyxatlar: 10 ta masala" }, course: "python", status: "done" as const, dueInDays: -5, grade: "10/10" },
  ],
  payments: [
    { month: { ru: "Октябрь", uz: "Oktabr" }, amount: 1540000, paid: true },
    { month: { ru: "Сентябрь", uz: "Sentabr" }, amount: 1540000, paid: true },
    { month: { ru: "Ноябрь", uz: "Noyabr" }, amount: 1540000, paid: false },
  ],
  // посещаемость за последние 4 недели: 1 — был, 0 — пропуск, null — занятия не было
  attendance: [1, null, 1, null, 1, null, 1, null, 0, null, 1, null, 1, null, 1, null, 1, null, 1, null, 1, null, 1, null] as (1 | 0 | null)[],
};
