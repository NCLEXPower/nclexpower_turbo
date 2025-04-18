import { MCQ } from '@/components/blocks/RegularQuestions/MCQ/MCQ';
import React from 'react';
import { RegularQuestion } from '@/core/types/ssrData';
import { McqSsValidationType } from '@/core/schema/mcq/validation';
import { useAtom } from 'jotai';
import { McqSsValidationAtom } from '@/core/schema/useAtomic';
import { useBusinessQueryRegularSubmission } from '@/core/hooks/useRegularSubmission';
import { parseJSONtoString } from 'core-library/types';
import { useSessionStorage } from 'core-library/hooks';

export const MCQBlock: React.FC<RegularQuestion> = ({ choices, question, questionType }) => {
  const [mcqAtom, setMcqAtom] = useAtom(McqSsValidationAtom);
  const { submitAnswerAsync, itemselect } = useBusinessQueryRegularSubmission();
  const [getAccountId] = useSessionStorage<string | null>('accountId', null); // this is for uat test only

  const parsedChoices = parseJSONtoString(choices);
  async function handleSubmit(values: McqSsValidationType) {
    const data = {
      LNum: itemselect[0].lNum,
      CSItemsLNum: 0,
      answer: values.mcqss,
      multiAnswer: [0],
      QType: questionType,
      accountId: getAccountId ?? '',
    };
    setMcqAtom(values);
    await submitAnswerAsync({ ...data });
  }
  return <MCQ handleSubmit={handleSubmit} mcqAtom={mcqAtom} question={question} choices={parsedChoices} />;
};
