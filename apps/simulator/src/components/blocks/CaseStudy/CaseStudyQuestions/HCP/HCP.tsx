import { SsrData } from '@/core/types/ssrData';
import React from 'react';
import { AnswerProps, QuestionaireProps, SsrAnswerTabsProps, SsrQuestionaireContentProps } from '@/core/types/ssrData';
import NearMeIcon from '@mui/icons-material/NearMe';
import { Paper, Grid } from '@mui/material';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HCPValidationType, RowSchema } from '@/core/schema/hcp/validation';
import { useFormSubmissionBindingHooks } from 'core-library/hooks/index';
import { Highlighter } from '@/components/blocks/CaseStudy/CaseStudyQuestions/HCP/HCPComponent/HCPHighlighter';
import { useValidationError } from '@/core/utils/useValidationError';
import { useToolbarSettings } from '@/core/context/ToolbarSettingsContext';
import { ParsedHtml } from 'core-library/components';

interface Props extends SsrData {
  handleSubmit: (values: HCPValidationType) => void;
  hcpAtom: HCPValidationType | undefined;
}

export const HCP: React.FC<Props> = ({ questionaire, answer, handleSubmit, hcpAtom }) => {
  const form = useForm<HCPValidationType>({
    mode: 'all',
    resolver: zodResolver(RowSchema),
  });

  const { control } = form;

  const formState = useFormState({ control: control });
  const { textZoomStyle } = useToolbarSettings();
  const ErrorMessage = useValidationError({
    fieldName: 'hcp',
    formState: formState,
  });

  useFormSubmissionBindingHooks({
    key: 'HCP',
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [hcpAtom],
  });

  return (
    <div className="p-2 py-2 h-full ">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <div className="h-full w-full p-4">
            {questionaire?.length > 0 &&
              questionaire.map((questionItem: QuestionaireProps, questionIndex) => (
                <div key={questionIndex} className="w-full">
                  <div className="w-full text-sm mb-4 pr-5 pt-4">
                    <p>{questionItem.question}</p>
                  </div>
                  <div className="w-full">
                    {questionItem.tabs?.length > 0 &&
                      questionItem.tabs.map((tab, tabIndex) => (
                        <React.Fragment key={tabIndex}>
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
                            <div key={tabIndex} className=" h-[45vh] flex w-full gap-2">
                              <p
                                style={{
                                  display: typeof tab.content !== 'string' ? 'none' : 'block',
                                }}
                                className="font-semibold min-w-[50px]"
                              >
                                {tab.tabsId} :
                              </p>
                              <div className="leading-6 text-sm">
                                {typeof tab.content === 'string' ? (
                                  <>{tab.content}</>
                                ) : (
                                  <>
                                    {tab.content?.length > 0 &&
                                      tab.content.map((contentItem: SsrQuestionaireContentProps, contentItemIdx) => (
                                        <React.Fragment key={contentItemIdx}>
                                          <p className="min-w-[50px] inline-block">
                                            <span>
                                              <strong>{contentItem.contentId}</strong>
                                            </span>
                                            : {contentItem.content}
                                          </p>
                                          <br />
                                        </React.Fragment>
                                      ))}
                                  </>
                                )}
                              </div>
                            </div>
                          </Paper>
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <div className="h-full w-full p-5">
            {answer &&
              answer.length > 0 &&
              answer.map((answerItem: AnswerProps, answerIdx) => (
                <React.Fragment key={answerIdx}>
                  <div key={answerItem.answerId} className="w-full text-sm mb-4 pr-5 pt-4" style={textZoomStyle}>
                    <p className="flex">
                      <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                      <ParsedHtml html={answerItem.answerInstruction} />
                    </p>
                  </div>
                  <Paper elevation={3} className="p-5 overflow-auto flex flex-col gap-5">
                    <div className="w-full h-fit text-sm">
                      {answerItem.tabs?.length > 0 &&
                        answerItem.tabs.map((ansTabs: SsrAnswerTabsProps, ansTabsIdx) => (
                          <div key={ansTabsIdx} style={textZoomStyle}>
                            <p>
                              <strong style={textZoomStyle}>{ansTabs.tabsId}</strong>
                            </p>
                            <br />
                            <Highlighter name={'hcp'} control={control} content={ansTabs.content} />
                          </div>
                        ))}
                    </div>
                    <ErrorMessage />
                  </Paper>
                </React.Fragment>
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
