// Логотип центра из приватного хранилища — отдаём через сайт, прямой ссылки на хранилище нет
import { getProspectLogo } from "@/lib/prospect";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const logo = await getProspectLogo(slug);
  if (!logo) return new Response("Not found", { status: 404 });
  return new Response(logo.stream, {
    headers: { "Content-Type": logo.contentType, "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400", "X-Robots-Tag": "noindex" },
  });
}
