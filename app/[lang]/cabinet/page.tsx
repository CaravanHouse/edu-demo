import { notFound } from "next/navigation";
import Cabinet from "@/components/Cabinet";
import { hasLocale } from "@/lib/i18n";
import { zukko } from "@/lib/school";

export default async function CabinetPage({ params }: PageProps<"/[lang]/cabinet">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <Cabinet lang={lang} school={zukko} />;
}
