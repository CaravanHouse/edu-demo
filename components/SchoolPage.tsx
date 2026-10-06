import DemoBar from "@/components/DemoBar";
import Footer from "@/components/Footer";
import { Courses, LevelTest, Schedule, Teachers } from "@/components/Sections";
import { Header, Hero } from "@/components/Top";
import TrialProvider from "@/components/Trial";
import type { Locale } from "@/lib/i18n";
import { brandStyle, type School } from "@/lib/school";
import { SchoolProvider } from "./SchoolContext";

// Главная учебного центра — общая для Zukko Academy и персональных демо
export default function SchoolPage({ lang, school }: { lang: Locale; school: School }) {
  return (
    <SchoolProvider school={school}>
      <div style={brandStyle(school.color)}>
        <TrialProvider lang={lang}>
          <DemoBar lang={lang} school={school} />
          <Header lang={lang} />
          <main>
            <Hero lang={lang} />
            <Courses lang={lang} />
            <LevelTest lang={lang} />
            <Schedule lang={lang} />
            <Teachers lang={lang} />
          </main>
          <Footer lang={lang} school={school} />
        </TrialProvider>
      </div>
    </SchoolProvider>
  );
}
