"use client";

import { createContext, useContext, type ReactNode } from "react";
import { zukko, type School } from "@/lib/school";

// Какой центр показывает страница: Zukko Academy или персональное демо (см. lib/school.ts)
const SchoolContext = createContext<School>(zukko);

export function SchoolProvider({ school, children }: { school: School; children: ReactNode }) {
  return <SchoolContext.Provider value={school}>{children}</SchoolContext.Provider>;
}

export const useSchool = () => useContext(SchoolContext);
