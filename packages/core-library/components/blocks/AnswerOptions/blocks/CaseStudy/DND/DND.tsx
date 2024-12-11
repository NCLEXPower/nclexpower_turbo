import React, { useMemo } from 'react'
import { ContainedCaseStudyQuestionType } from '../../../../../../system/app/internal/blocks/Hub/Settings/SettingsManagement/steps/content/simulator/types';
import { useForm, useFormContext, useWatch } from 'react-hook-form';
import { extractValues } from '../DDC/extractValues';
import { Box, Typography } from '@mui/material';
import { GenericSelectField } from '../../../../../Textfield/GenericSelectField';
import { Card } from '../../../../../Card/Card';
import { useDndOptions } from './hooks/useDndOptions';
import { CreateDndOptionSchema, CreateDndOptionType } from './validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '../../../../../forms/TextField';
import { Button } from '../../../../../Button/Button';
import { DNDOptionList } from './components/DNDOptionList';
import { useAnswerProcessor } from './hooks/useAnswerProcessor';
import { createOptionList } from './utils/createOptionList';

type DNDPropsType = {
    questionIndex: number
}

export const DND: React.FC<DNDPropsType> = ({ questionIndex }) => {
    const { getValues, control, watch } = useFormContext<ContainedCaseStudyQuestionType>();
    const { formId, questionnaires } = getValues();
    const { createDndOption, optionList, deleteDndOption } = useDndOptions(questionIndex, formId ?? "")
    const { control: createDndControl, handleSubmit: handleSubmitOption, reset: resetOptionField } = useForm<CreateDndOptionType>({
        resolver: yupResolver(CreateDndOptionSchema),
        criteriaMode: 'all',
        mode: 'all'
    })
    const dndAnswer = watch(`questionnaires.${questionIndex}.dndAnswer`) ?? [];
    const extractedValue = useMemo(() => {
        if (!questionnaires) return [];
        const itemStem = questionnaires[questionIndex].itemStem;
        return extractValues(itemStem ?? "");
    }, [questionnaires[questionIndex].itemStem]);

    const handleAddNewOption = (values: CreateDndOptionType) => {
        createDndOption(values.option)
        resetOptionField()
    }

    useAnswerProcessor({
        dndAnswer: dndAnswer,
        extractedValue: extractedValue,
        optionList: optionList,
        questionIndex: questionIndex
    })

    return (
        <Box>
            <Box sx={{ p: 5 }}>
                <Typography variant='body2' fontWeight={600} color={"#525252"}>Answer Fields : </Typography>
                {extractedValue.length > 0 && extractedValue.map((value, index) => (
                    <Box key={index} sx={{
                        my: 2,
                        backgroundColor: '#0C225C',
                        boxShadow: 2,
                        width: 1,
                        borderRadius: "10px",
                        overflow: 'hidden'
                    }}>
                        <Typography
                            sx={{ fontSize: "12px" }}
                            p={2}
                            fontWeight={600}
                            textAlign="center"
                            color="white"
                            textTransform="capitalize">
                            {value}
                        </Typography>
                        <Box sx={{ backgroundColor: '#fff', borderRadius: "5px 5px 0 0", p: 3 }}>
                            <GenericSelectField
                                options={createOptionList(index, optionList, dndAnswer)}
                                control={control}
                                name={`questionnaires.${questionIndex}.dndAnswer.${index}.answerId`} />
                        </Box>
                    </Box>
                ))}
            </Box>
            <Card sx={{ minHeight: "400px", overflow: 'auto', px: 2 }}>
                <Typography variant='body2' fontWeight={600} color={"#525252"}>Answer Fields Option : </Typography>
                <Box display="flex" alignItems="flex-end" gap={2}>
                    <TextField name='option' control={createDndControl} />
                    <Button onClick={handleSubmitOption(handleAddNewOption)}> Add</Button>
                </Box>
                <Typography color="#6c757d" variant='caption' >
                    Add options to populate the dropdown for answer selection fields
                </Typography>
                <DNDOptionList deleteDndOption={deleteDndOption} optionList={optionList} />
            </Card>
        </Box>
    )
}
