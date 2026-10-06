import "server-only";

// Конфиги персональных демо хранятся в приватном Vercel Blob (store caravanhouse-edu-prospects), а не в этом публичном репозитории.
// Пишет их скрипт из приватного репозитория CaravanHouse/sales: edu/<slug>/config.json и edu/<slug>/logo.<ext>.
// Доступ — по BLOB_READ_WRITE_TOKEN из переменных окружения Vercel.
import { get, list } from "@vercel/blob";
import { cache } from "react";
import { locales, type Locale } from "@/lib/i18n";
import { isSlug, type ProspectConfig } from "@/lib/school";

const str = (v: unknown, max = 120) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : undefined);

/** Конфиг центра по slug или null, если такого нет (или хранилище недоступно) */
export const getProspect = cache(async (slug: string): Promise<ProspectConfig | null> => {
  if (!isSlug(slug) || !process.env.BLOB_READ_WRITE_TOKEN) return null;
  try {
    const res = await get(`edu/${slug}/config.json`, { access: "private" });
    if (!res || res.statusCode !== 200) return null;
    const raw = JSON.parse(await new Response(res.stream).text()) as Record<string, unknown>;
    const lang = locales.includes(raw.lang as Locale) ? (raw.lang as Locale) : "ru";
    const courses = Array.isArray(raw.courses) ? raw.courses.map((c) => str(c, 60)).filter((c): c is string => Boolean(c)) : [];
    const name = str(raw.name, 80);
    if (!name || !courses.length) return null;
    return {
      slug,
      name,
      lang,
      courses,
      district: str(raw.district, 60),
      color: str(raw.color, 7),
      logo: str(raw.logo, 80),
      phone: str(raw.phone, 30),
      instagram: str(raw.instagram, 60),
      telegram: str(raw.telegram, 60),
    };
  } catch (err) {
    console.error(`[prospect] ${slug}:`, err instanceof Error ? err.message : err);
    return null;
  }
});

/** Логотип центра: поток и тип файла или null */
export async function getProspectLogo(slug: string) {
  const config = await getProspect(slug);
  if (!config?.logo) return null;
  const { blobs } = await list({ prefix: `edu/${slug}/logo` });
  const blob = blobs[0];
  if (!blob) return null;
  const res = await get(blob.pathname, { access: "private" });
  return res?.statusCode === 200 ? { stream: res.stream, contentType: res.blob.contentType || "image/png" } : null;
}
