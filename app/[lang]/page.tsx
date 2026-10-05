import { notFound } from "next/navigation";
import DemoBar from "@/components/DemoBar";
import Footer from "@/components/Footer";
import { Courses, LevelTest, Schedule, Teachers } from "@/components/Sections";
import { Header, Hero } from "@/components/Top";
import TrialProvider from "@/components/Trial";
import { hasLocale } from "@/lib/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <TrialProvider lang={lang}>
      <DemoBar lang={lang} />
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <Courses lang={lang} />
        <LevelTest lang={lang} />
        <Schedule lang={lang} />
        <Teachers lang={lang} />
      </main>
      <Footer lang={lang} />
    </TrialProvider>
  );
}
