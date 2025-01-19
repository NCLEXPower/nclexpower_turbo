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
