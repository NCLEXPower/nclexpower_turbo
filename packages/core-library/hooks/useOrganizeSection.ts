import { useMemo } from "react";

interface BowtieItemType {
  isAnswer: boolean;
  value: string;
  container: string;
}

export function useOrganizeSections(sections: BowtieItemType[][]) {
  return useMemo(() => {
    return sections.map((section) => ({
      correct: section.filter((item) => item.isAnswer),
      incorrect: section.filter((item) => !item.isAnswer),
    }));
  }, [sections]);
}
