import React, { useCallback } from 'react'
import { DndAnswerType } from '../../../../../../../../../../../../../../../../components/blocks/AnswerOptions/blocks/CaseStudy/DND/type';
import { Box, FormControl, Typography } from '@mui/material';
import { AnswerOptionsType, ParsedHtml, PlainSelectField } from '../../../../../../../../../../../../../../../../components';
import { DNDAnswerOptionType, DNDAnswersType } from '../../../../../../types';
import { QuestionnaireItem } from '../../../../../../../../../../../../../types';
import { questionType } from '../../../../../../../../../constants/constants';

type Props = {
    questionData: QuestionnaireItem
}

export const DNDQuestion: React.FC<Props> = ({ questionData }) => {
    const { itemStem, dndAnswer } = questionData


    const renderContentWithDropdowns = useCallback(
        (itemStem: string, dndAnswers: DndAnswerType[]) => {
            if (!itemStem) {
                return <Typography>No content available</Typography>;
            }
            const parts = itemStem.split(/\[\[(.*?)\]\]/);

            console.log(parts);

            return parts.map((part, index) => {
                const answerOptions = questionData.answers as DNDAnswerOptionType[];
                const answer = dndAnswers.find((ans) => ans.fieldKey === part);
                const answerLabel = answerOptions.find((ans) => ans.value === answer?.answerId)?.label;

                if (answer) {
                    return (
                        <Typography key={index} component="span">
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    padding: '4px 8px',
                                    backgroundColor: '#f9f7ed',
                                    borderRadius: '4px',
                                    display: 'inline-block',
                                    minWidth: "100px"
                                }}
                            >
                                {answerLabel}
                            </span>
                        </Typography>
                    );
                }

                return (
                    <Typography key={index} component="span">
                        <ParsedHtml html={part} />
                    </Typography>
                );
            });
        },
        []
    );


    console.log(questionData)

    return (
        <div>{renderContentWithDropdowns(itemStem, dndAnswer ?? [])}</div>
    )
}
