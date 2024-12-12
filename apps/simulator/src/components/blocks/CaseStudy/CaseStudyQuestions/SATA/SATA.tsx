import { Checkbox, Grid } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import React, { useState } from 'react';
import { AnswerProps, SsrAnswerTabsProps, QuestionaireProps } from '@/core/types/ssrData';
import { useErrorHandler } from '@/core/utils/useErrorhandler';
import { useFormSubmissionBindingHooks } from 'core-library/hooks';
import { CaseStudySATAValidationType, CsSATASchema } from '@/core/schema/CSSata/validation';
import { CaseStudySataAtom } from '@/core/schema/useAtomic';
import { ControlledCheckbox } from '@/components/Checkbox';
import { FormProvider, useFieldArray, useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useToolbarSettings } from '@/core/context/ToolbarSettingsContext';
import { ParsedHtml } from 'core-library/components';

type Props = {
  questionaire: QuestionaireProps[];
  csSataAtom: CaseStudySATAValidationType | undefined;
  handleSubmit: (values: CaseStudySATAValidationType) => void;
};

export const SATA: React.FC<Props> = ({ questionaire, handleSubmit, csSataAtom }) => {
  const ParsedChoices = questionaire ? questionaire[0].answer[0].rows : null;

  const [activeTab, setActiveTab] = useState<number>(0);

  const form = useForm<CaseStudySATAValidationType>({
    mode: 'all',
    resolver: zodResolver(CsSATASchema),
    defaultValues: {
      csSata: ParsedChoices,
    },
  });

  const { control } = form;

  const { fields } = useFieldArray({
    name: 'csSata',
    control,
  });

  const formState = useFormState({ control: control });
  const { textZoomStyle } = useToolbarSettings();
  const { ErrorMessageHandler } = useErrorHandler({
    isValid: form.formState.isValid,
    errorMessage: 'At least one item must be selected',
  });

  useFormSubmissionBindingHooks({
    key: 'SATA',
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [csSataAtom],
  });

  return (
    <div className=" h-full ">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={6} md={6}>
          <div className="w-full h-full p-5">
            <div className="w-full text-sm mb-4 pr-5">
              {questionaire?.length > 0 &&
                questionaire.map((questionItem: QuestionaireProps, index: number) => (
                  <div key={index} className="w-full text-sm mb-4 pr-5">
                    <p className="flex">
                      <ParsedHtml html={questionItem.question} />
                    </p>
                  </div>
                ))}
            </div>
            <div className="w-full h-full ">
              <div className="flex gap-1">
                {questionaire?.length > 0 &&
                  questionaire.map(
                    (questionItem: QuestionaireProps) =>
                      questionItem?.tabs?.length > 0 &&
                      questionItem.tabs.map((tab: any, index: number) => (
                        <div
                          key={tab.tabId}
                          className={` px-5 py-1 rounded-t-md text-sm font-semibold flex items-center cursor-pointer hover:bg-slate-100 ${
                            activeTab === index ? ' underline bg-white ' : 'bg-slate-200'
                          }`}
                          onClick={() => setActiveTab(index)}
                        >
                          <p>{tab.tabsTitle}</p>
                        </div>
                      )),
                  )}
              </div>
              <div className="rounded-b-md rounded-r-md h-5/6 max-h-[500px] p-5 overflow-y-auto flex flex-col gap-5 shadow-lg bg-white">
                <div className="flex flex-col gap-y-4">
                  {questionaire?.length > 0 &&
                    questionaire.map(
                      (questionItem: any) =>
                        questionItem?.tabs?.length > 0 &&
                        questionItem.tabs.map((tab: SsrAnswerTabsProps, tabIndex: number) => (
                          <div key={tab.tabsId} style={{ display: activeTab === tabIndex ? 'block' : 'none' }}>
                            {tab.contentUI === 'Table' ? (
                              <p>TABLE DISPLAY</p>
                            ) : (
                              <div className="flex w-full gap-2">
                                <p className="font-semibold min-w-[50px]">{tab.tabsId} :</p>
                                <div className="leading-6 text-sm">{tab.content}</div>
                              </div>
                            )}
                          </div>
                        )),
                    )}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <div className="h-full w-full p-5 font-sans tracking-tight">
            {questionaire?.length > 0 &&
              questionaire.map((questionItem: QuestionaireProps, questionIndex: number) => (
                <div key={questionIndex}>
                  <ol className="w-full text-sm mb-4 pr-5 ">
                    <li>
                      {questionItem.answer &&
                        questionItem.answer.map((answerItem, answerIndex: number) => (
                          <div className="w-full text-sm mb-4 pr-5">
                            <p className="flex" key={answerIndex} style={textZoomStyle}>
                              <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" style={textZoomStyle} />
                              <ParsedHtml html={answerItem.answerInstruction} />
                            </p>
                          </div>
                        ))}
                    </li>
                  </ol>
                  <div
                    className="w-full h-fit shadow-lg px-10 py-5 text-sm flex flex-col gap-2 rounded-md bg-white"
                    style={textZoomStyle}
                  >
                    {fields &&
                      fields.map((choices: any, index: number) => (
                        <div className="flex items-center" key={index}>
                          <span>{index + 1} . </span>
                          <span>
                            <ControlledCheckbox
                              control={control}
                              name={`csSata.${index}.value`}
                              label={choices.label}
                              style={textZoomStyle}
                            />
                          </span>
                        </div>
                      ))}
                    <ErrorMessageHandler />
                  </div>
                </div>
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
