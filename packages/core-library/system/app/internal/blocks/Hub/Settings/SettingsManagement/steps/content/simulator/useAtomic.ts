import { atom } from "jotai";
import {
  ContainedCaseStudyQuestionType,
  ContainedRegularQuestionType,
} from "./types";

export const CreateRegularAtom = atom<ContainedRegularQuestionType | undefined>(
  undefined
);

export const CreateCaseStudyAtom = atom<
  ContainedCaseStudyQuestionType | undefined
>(undefined);

export const MCQColumnAtom = atom(3);
export const MCQRowAtom = atom(3);
