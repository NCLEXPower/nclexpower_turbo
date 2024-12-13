import React from 'react';
import { Paper, Grid } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import { QuestionaireProps, AnswerProps } from '@/core/types/ssrData';
import { ControlledSelectField, ParsedHtml } from 'core-library/components';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormSubmissionBindingHooks } from 'core-library/hooks';
import { DDClozeValidationType, DDClozeSchema } from '@/core/schema/ddcloze/validation';
import { useToolbarSettings } from '@/core/context/ToolbarSettingsContext';

export type DDClozeProps = {
  questionaire: QuestionaireProps[];
  answer: AnswerProps[];
  ddcAtom: DDClozeValidationType | undefined;
  handleSubmit: (values: DDClozeValidationType) => void;
};

export const DDCloze: React.FC<DDClozeProps> = ({ questionaire, answer, handleSubmit, ddcAtom }) => {
  const form = useForm<DDClozeValidationType>({
    mode: 'all',
    resolver: zodResolver(DDClozeSchema),
  });

  const { control } = form;
  const { textZoomStyle } = useToolbarSettings();
  const formState = useFormState({ control: control });

  useFormSubmissionBindingHooks({
    key: 'DDC',
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [ddcAtom],
  });

  return (
    <div className="p-2 py-2 h-full">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <div className="h-full w-full p-4">
            {questionaire.length > 0 &&
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

        {answer.length > 0 &&
          answer.map((answerItem: AnswerProps) => (
            <Grid item xs={12} sm={6} md={6} key={answerItem.answerId}>
              <div className="h-full w-full p-5">
                <div className="w-full text-sm mb-4 pr-5 pt-4">
                  <p className="flex items-center" style={textZoomStyle}>
                    <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                    <ParsedHtml html={answerItem.answerInstruction} />
                  </p>
                </div>
                <Paper elevation={3} className="p-5 overflow-auto flex flex-col gap-5">
                  <div className="w-full h-fit text-sm p-1">
                    {answerItem.DDCAnswer.split(/\[\[selectFieldKey:(\w+)\]\]/g).map((part, index) => {
                      const key = part.trim();
                      const options = answerItem.selectField[key] || [];
                      return (
                        <div
                          className="inline-block min-w-[150px] my-0 mx-[10px] align-top mt-3"
                          key={index}
                          style={textZoomStyle}
                        >
                          {index % 2 === 0 ? (
                            <span>
                              <ParsedHtml html={part} />
                            </span>
                          ) : (
                            <>
                              <ControlledSelectField
                                variant="standard"
                                control={control}
                                name={key}
                                options={options}
                                size="small"
                                sx={{
                                  minWidth: '150px',
                                  height: '35px',
                                  color: 'gray',
                                  margin: '-5px 0 0 5px',
                                  textAlign: 'center',
                                }}
                              />
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </Paper>
                <div className="w-full text-sm mb-4 pr-5 pt-4 flex gap-1">
                  <p style={textZoomStyle}>{answerItem.note === '' ? '' : 'Note:'}</p>
                  <p style={textZoomStyle}>{answerItem.note}</p>
                </div>
              </div>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};
