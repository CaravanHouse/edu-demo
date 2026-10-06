// Конфиг персонального демо в JSON — для демо-бота записи на пробный урок (тот же центр по ?start=<slug>).
// Отдаём только то, что и так видно на странице демо.
import { getProspect } from "@/lib/prospect";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const config = await getProspect(slug);
  if (!config) return Response.json({ error: "not_found" }, { status: 404 });
  const { name, lang, courses, district, color, phone } = config;
  return Response.json(
    { slug, name, lang, courses, district, color, phone, hasLogo: Boolean(config.logo) },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600", "X-Robots-Tag": "noindex, nofollow" } }
  );
}
