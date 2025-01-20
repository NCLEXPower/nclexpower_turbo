import React from "react";
import { QuestionnaireItem } from "../../../../../../../../../../../../../types";
import { HighlighterEditor } from "../../../../../../../../../../../../../../../../components/CustomExtension/highlighter-inputs/PhraseHighlighter";

type Props = {
  questionData: QuestionnaireItem;
};

export const HCPQuestion: React.FC<Props> = ({ questionData }) => {
  const { hcpContent } = questionData;

  return <HighlighterEditor value={hcpContent} contentEditable={false} />;
};
