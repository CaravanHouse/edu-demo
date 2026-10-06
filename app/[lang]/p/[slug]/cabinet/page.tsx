import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Cabinet from "@/components/Cabinet";
import { hasLocale } from "@/lib/i18n";
import { getProspect } from "@/lib/prospect";
import { personalSchool } from "@/lib/school";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { robots: { index: false, follow: false, nocache: true } };

export default async function PersonalCabinet({ params }: PageProps<"/[lang]/p/[slug]/cabinet">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const config = await getProspect(slug);
  if (!config) notFound();
  return <Cabinet lang={lang} school={personalSchool(config)} />;
}
