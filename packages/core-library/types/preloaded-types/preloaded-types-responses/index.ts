import react from "react";

export type Header = {
  headerContentId: string;
  timeRemaining: any;
  duration: any;
  lNum: string;
  qId: number;
  accountId: string;
};

// get-all-content payload
export type QuestionContentsPayload = {
  tabId: string;
  qId: number;
  LNum: string;
  QLNum: string;
};

export type ParsedChoices = {
  Label?: string;
  Element?: React.ReactNode;
  Value: number | boolean;
  XValue: number;
};

type ChoicesItem = {
  Id: string;
  choices: string;
  numOfChoices: number;
};

export type AnswerUIItem = {
  answeringId: string;
  qId: number;
  answerType: string;
  answerInstruction: string;
  rows: string;
  columns: string;
  notes: string;
};

type QuestionTypeItem = {
  qlNum: string;
  qType: string;
  qTypeDesc: string;
};

export type QuestionContentsResponse = {
  choices: ChoicesItem[];
  answerUI: AnswerUIItem[];
  questionType: QuestionTypeItem[];
};
