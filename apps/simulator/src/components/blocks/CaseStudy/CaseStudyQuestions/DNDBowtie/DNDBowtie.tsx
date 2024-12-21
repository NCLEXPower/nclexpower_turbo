import React, { useEffect, useState } from 'react';
import NearMeIcon from '@mui/icons-material/NearMe';
import { Grid, Paper, Typography } from '@mui/material';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DNDBowtieValidationType, RowSchema } from '@/core/schema/dndbowtie/validation';
import { DraggableCard } from './DNDBowtieComponent/DraggableCard';
import { DroppableContainer } from './DNDBowtieComponent/Droppable';
import { ItemTypesKeys, itemTypes } from '@/core/constant/dndStateConstant';
import {
  dndObjectValueProps,
  QuestionaireProps,
  AnswerProps,
  choicesListProps,
  DropContainerType,
} from '@/core/types/ssrData';
import { useFormSubmissionBindingHooks } from 'core-library/hooks';
import { useToolbarSettings } from '@/core/context/ToolbarSettingsContext';
import { ParsedHtml } from 'core-library/components';

export type DroppedValueType = Record<string, dndObjectValueProps[]>;

type Props = {
  questionaire: QuestionaireProps[];
  answer: AnswerProps[];
  handleSubmit: (values: DNDBowtieValidationType) => void;
  dndBowtieAtom: DNDBowtieValidationType | undefined;
  dropContainer: DropContainerType;
  droppedValue: DroppedValueType;
  dropAnswer: (container: string, item: dndObjectValueProps) => void;
  handleRemove: (containerName: string, value: dndObjectValueProps) => void;
  answerLists: choicesListProps[];
};

export const DNDBowtie: React.FC<Props> = ({ questionaire, answer, ...rest }) => {
  const { dropContainer, droppedValue, dropAnswer, handleRemove, answerLists, handleSubmit, dndBowtieAtom } = rest;

  const form = useForm<DNDBowtieValidationType>({
    mode: 'all',
    resolver: zodResolver(RowSchema),
  });
  const { textZoomStyle } = useToolbarSettings();
  const { control, setValue } = form;
  const formState = useFormState({ control: control });
  const { dndbowtie: dndbowtieError } = formState.errors;

  useFormSubmissionBindingHooks({
    key: 'DNDBowtie',
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [dndBowtieAtom],
  });

  useEffect(() => {
    setValue('dndbowtie', droppedValue);
  }, [droppedValue]);

  const renderDroppableContainer = () => {
    const itemKeys = Object.keys(itemTypes) as ItemTypesKeys[];
    return (
      <div className="flex justify-evenly items-center gap-2">
        {itemKeys.map((keys, index) => (
          <div className="flex flex-col gap-4" key={index}>
            {dropContainer.map((items, index) => (
              <>
                {items.accepts[0] === itemTypes[keys] && (
                  <div>
                    <DroppableContainer
                      accept={items.accepts}
                      errorMessage={dndbowtieError && dndbowtieError[items.container]?.message}
                      text={items.text}
                      onDrop={(item: dndObjectValueProps) => dropAnswer(items.container, item)}
                      droppedValue={droppedValue[items.container]}
                      handleRemove={() => handleRemove(items.container, droppedValue[items.container][0])}
                      bg={items.background}
                      key={index}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-2 py-2 overflow-y-auto">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 3 }}>
        <Grid item xs={12} sm={12} md={5.5}>
          <div className="h-full w-full p-4">
            {questionaire &&
              questionaire.map((questionItem: QuestionaireProps) => (
                <div key={questionItem.qId} className="w-full">
                  <div className="w-full text-sm mb-4 pr-5 pt-4">
                    <p>{questionItem.question}</p>
                  </div>
                  <div className="w-full">
                    {questionItem.tabs &&
                      questionItem.tabs.map(tab => (
                        <>
                          <div className="flex gap-1">
                            <div
                              key={tab.tabsId}
                              className="bg-white w-fit px-5 py-1 rounded-t-md text-sm font-semibold flex items-center mb-[-3px]"
                            >
                              <p>{tab.tabsTitle}</p>
                            </div>
                          </div>
                          <Paper
                            elevation={3}
                            className="p-5 overflow-auto flex flex-col gap-5"
                            style={{ maxHeight: '70vh' }}
                          >
                            <div key={tab.tabsId} className=" h-[45vh] flex w-full gap-2">
                              <p className="font-semibold min-w-[50px]">{tab.tabsId} :</p>
                              <div className="leading-6 text-sm">{typeof tab.content === 'string' && tab.content}</div>
                            </div>
                          </Paper>
                        </>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6.5}>
          <div className="h-full w-full p-5 ">
            {answer &&
              answer.map((answerItem: AnswerProps) => (
                <>
                  <div key={answerItem.answerId} className="w-full text-sm mb-4 pr-5 pt-4">
                    <p className="flex" style={textZoomStyle}>
                      <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                      <ParsedHtml html={answerItem.answerInstruction} />
                    </p>
                  </div>
                  <div className="flex gap-5 flex-col">
                    {renderDroppableContainer()}
                    <div className="flex justify-evenly items-start">
                      <div className="flex ">
                        {answerItem.choicesListKey.map((listKey: any, index: number) => (
                          <div key={index} className="min-w-[180px] bg-[#E6F2FF]">
                            <Typography
                              variant="subtitle1"
                              sx={{ color: '#1f1f1f', textAlign: 'center', padding: '8px' }}
                            >
                              {listKey}
                            </Typography>
                            <div className="flex flex-col gap-2 p-2">
                              {answerLists[listKey] &&
                                answerLists[listKey].map((item: dndObjectValueProps) => (
                                  <DraggableCard key={item.id} answer={item} type={item.container} icon={false} />
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full text-sm mb-4 pr-5 pt-4 flex gap-1">
                    <p style={textZoomStyle}>{answerItem.note === '' ? '' : 'Note:'}</p>
                    <p style={textZoomStyle}>{answerItem.note}</p>
                  </div>
                </>
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
