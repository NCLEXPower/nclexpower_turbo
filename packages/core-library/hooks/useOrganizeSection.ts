import { useMemo } from "react";
import { BowtieItemType } from "../system/app/internal/types";

export function useOrganizeSections(sections: BowtieItemType[][]) {
  return useMemo(() => {
    return sections.map((section) => ({
      correct: section.filter((item) => item.isAnswer),
      incorrect: section.filter((item) => !item.isAnswer),
    }));
  }, [sections]);
}
