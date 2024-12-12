import { QuestionaireProps, AnswerProps, FieldsType } from '@/core/types/ssrData';
import React from 'react';
import NearMeIcon from '@mui/icons-material/NearMe';
import { TableComponent } from './Table';
import { ControlledSelectField, ParsedHtml } from 'core-library/components';
import { DDTableSchema, DDTableValidationType } from '@/core/schema/ddtable/validation';
import { useForm, useFormState } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormSubmissionBindingHooks } from 'core-library/hooks';
import { Paper, Grid } from '@mui/material';
import { getMapItems } from '@/core/utils/contents';
import { useToolbarSettings } from '@/core/context/ToolbarSettingsContext';

export type DDTProps = {
  questionaire: QuestionaireProps[];
  answer: AnswerProps[];
  ddtAtom: DDTableValidationType | undefined;
  handleSubmit: (values: DDTableValidationType) => void;
};

export const DDTable: React.FC<DDTProps> = ({ questionaire, answer, ddtAtom, handleSubmit }) => {
  const { columnName, selectFieldKey, selectField } = getMapItems(answer);

  const form = useForm<DDTableValidationType>({
    mode: 'all',
    resolver: zodResolver(DDTableSchema),
  });
  const { textZoomStyle } = useToolbarSettings();
  const { control } = form;
  const formState = useFormState({ control });

  const renderControlledSelectField = (key: string, fields: FieldsType) => (
    <ControlledSelectField
      label="Select"
      control={control}
      name={key}
      size="small"
      options={fields[key]}
      sx={{
        minWidth: '250px',
        color: 'gray',
      }}
    />
  );

  useFormSubmissionBindingHooks({
    key: 'DDT',
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [ddtAtom],
  });

  return (
    <div className="p-2 py-2 h-full">
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
                        <div key={tab.tabsId}>
                          <div className="flex gap-1">
                            <div className="bg-white w-fit px-5 py-1 rounded-t-md text-sm font-semibold flex items-center mb-[-3px]">
                              <p>{tab.tabsTitle}</p>
                            </div>
                          </div>
                          <Paper
                            elevation={3}
                            className="p-5 overflow-auto flex flex-col gap-5"
                            style={{ maxHeight: '70vh' }}
                          >
                            <div className="h-[45vh] flex w-full gap-2">
                              <p className="font-semibold min-w-[50px]">{tab.tabsId} :</p>
                              <div className="leading-6 text-sm">{typeof tab.content === 'string' && tab.content}</div>
                            </div>
                          </Paper>
                        </div>
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
                <div key={answerItem.answerId}>
                  <div className="w-full text-sm mb-4 pr-5 pt-4">
                    <p className="flex" style={textZoomStyle}>
                      <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                      <ParsedHtml html={answerItem.answerInstruction} />
                    </p>
                  </div>
                  <TableComponent
                    columns={columnName}
                    selectFieldKeys={selectFieldKey}
                    selectFieldOptions={selectField}
                    selectFieldComponent={renderControlledSelectField}
                  />
                  <div className="w-full text-sm mb-4 pr-5 pt-4 flex gap-1">
                    <p style={textZoomStyle}>{answerItem.note === '' ? '' : 'Note:'}</p>
                    <p style={textZoomStyle}>{answerItem.note}</p>
                  </div>
                </div>
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
