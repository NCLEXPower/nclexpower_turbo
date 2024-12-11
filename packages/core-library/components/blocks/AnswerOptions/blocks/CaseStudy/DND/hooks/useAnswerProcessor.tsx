import React, { useEffect } from 'react'
import { ContainedCaseStudyQuestionType, DNDAnswerOptionType } from '../../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types'
import { useFieldArray, useFormContext } from 'react-hook-form';
import { DndAnswerType } from '../type';

type Params = {
    extractedValue: string[],
    questionIndex: number,
    dndAnswer: DndAnswerType[]
    optionList: DNDAnswerOptionType[]
}

export const useAnswerProcessor = ({ extractedValue, questionIndex, dndAnswer, optionList }: Params) => {
    const { setValue, control } = useFormContext<ContainedCaseStudyQuestionType>()
    const { remove } = useFieldArray<ContainedCaseStudyQuestionType>({ name: `questionnaires.${questionIndex}.dndAnswer`, control: control })

    useEffect(() => {
        extractedValue.map((item, index) => {
            setValue(`questionnaires.${questionIndex}.dndAnswer.${index}.fieldKey`, item)
            setValue(`questionnaires.${questionIndex}.dndAnswer.${index}.indexPos`, index)
        });

        if (extractedValue.length !== dndAnswer.length) {
            remove(dndAnswer.length - 1)
        }
    }, [extractedValue]);

    useEffect(() => {
        setValue(`questionnaires.${questionIndex}.answers`, optionList)
    }, [optionList])
}
