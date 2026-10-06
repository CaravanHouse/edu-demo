import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SchoolPage from "@/components/SchoolPage";
import { hasLocale } from "@/lib/i18n";
import { getProspect } from "@/lib/prospect";
import { personalSchool } from "@/lib/school";

// Персональное демо для конкретного центра: /ru/p/<slug>. Страницы собираются при первом открытии и кешируются на 5 минут
export const dynamicParams = true;
export const revalidate = 300;
export const generateStaticParams = async () => [];

export async function generateMetadata({ params }: PageProps<"/[lang]/p/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const config = await getProspect(slug);
  return {
    title: config ? `${config.name} — демо сайта от CaravanHouse IT` : "CaravanHouse IT",
    // персональные демо никогда не индексируются и не попадают в sitemap
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  };
}

export default async function PersonalPage({ params }: PageProps<"/[lang]/p/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const config = await getProspect(slug);
  if (!config) notFound();
  return <SchoolPage lang={lang} school={personalSchool(config)} />;
}
