import React from 'react';
import { MrsnValidationType, RowSchema } from '@/core/schema/mrsn/validation';
import NearMeIcon from '@mui/icons-material/NearMe';
import { OptionType, SsrData, SsrQuestionaireContentProps } from '@/core/types/ssrData';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid, Paper } from '@mui/material';
import { useFormSubmissionBindingHooks } from 'core-library/hooks/index';
import { FormProvider, useFieldArray, useForm, useFormState } from 'react-hook-form';
import { ControlledCheckbox } from '@/components/Checkbox';
import { useErrorHandler } from '@/core/utils/useErrorhandler';
import { useToolbarSettings } from '@/core/context/ToolbarSettingsContext';
import { ParsedHtml } from 'core-library/components';

interface Props extends SsrData {
  handleSubmit: (values: MrsnValidationType) => void;
  mrsnAtom: MrsnValidationType | undefined;
  ParsedChoices: OptionType[];
}

export const MRSN: React.FC<Props> = ({ questionaire, answer, handleSubmit, mrsnAtom, ParsedChoices }) => {
  const form = useForm<MrsnValidationType>({
    mode: 'all',
    resolver: zodResolver(RowSchema),
    defaultValues: {
      mrsn: ParsedChoices,
    },
  });

  const { control } = form;

  const { fields } = useFieldArray({
    name: 'mrsn',
    control,
  });

  const formState = useFormState({ control: control });
  const { textZoomStyle } = useToolbarSettings();
  const { ErrorMessageHandler } = useErrorHandler({
    isValid: form.formState.isValid,
    errorMessage: 'At least one item must be selected',
  });
  useFormSubmissionBindingHooks({
    key: 'MRSN',
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [mrsnAtom],
  });

  return (
    <div className="p-2 py-2 h-full">
      <FormProvider {...form}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={6} md={6}>
            <div className="h-full w-full p-4">
              {questionaire &&
                questionaire.map(questionItem => (
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
                              <div key={tab.tabsId} className=" h-[45vh] flex w-full gap-2" style={textZoomStyle}>
                                <p className="font-semibold min-w-[50px]" style={textZoomStyle}>
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
                                              </span>{' '}
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
                          </>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <div className="h-full w-full p-5">
              {answer &&
                answer.map(answerItem => (
                  <>
                    <div key={answerItem.answerId} className="w-full text-sm mb-4 pr-5 pt-4" style={textZoomStyle}>
                      <p className="flex">
                        <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                        <ParsedHtml html={answerItem.answerInstruction} />
                      </p>
                    </div>
                    <Paper elevation={3} className="p-5 overflow-auto flex flex-col gap-5">
                      <div className="w-full h-fit text-sm" style={textZoomStyle}>
                        {fields?.length > 0 &&
                          fields.map((choices, idx: number) => (
                            <ol className="flex items-center">
                              <ControlledCheckbox control={control} name={`mrsn.${idx}.value`} label={choices.label} />
                            </ol>
                          ))}
                        <ErrorMessageHandler />
                      </div>
                    </Paper>
                    <div className="w-full text-sm mb-4 pr-5 pt-4 flex gap-1">
                      <p style={textZoomStyle}>{answerItem.note === '' ? '' : 'Note:'}</p>
                      <p style={textZoomStyle}>{answerItem.note}</p>
                    </div>
                  </>
                ))}
            </div>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
};
