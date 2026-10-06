import { notFound } from "next/navigation";
import SchoolPage from "@/components/SchoolPage";
import { hasLocale } from "@/lib/i18n";
import { zukko } from "@/lib/school";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <SchoolPage lang={lang} school={zukko} />;
}
