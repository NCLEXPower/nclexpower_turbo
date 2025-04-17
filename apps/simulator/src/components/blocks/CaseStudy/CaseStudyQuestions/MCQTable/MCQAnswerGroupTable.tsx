import { MCQGValidationType, mcqGSchema } from '@/core/schema/mcqGroup/validation';
import { AnswerProps } from '@/core/types/ssrData';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useFormSubmissionBindingHooks } from 'core-library/hooks/index';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ControlledCheckbox } from '@/components/Checkbox';
import { ControlledTableRadioButton } from '@/components/TableRadioButton';
import { FormHelperText } from '@/components/FormHelperText';
import NearMeIcon from '@mui/icons-material/NearMe';
import { MCQCSProps } from './MCQCSComponents/MCQCS';
import { useToolbarSettings } from '@/core/context/ToolbarSettingsContext';
import { ParsedHtml } from 'core-library/components';

type RenderButtonsProps = {
  row?: MCQGValidationType | any;
  rowIndex?: number;
  chKey?: string;
  chKeys?: string[];
  handleChange?: ChangeHandler;
};

export type DataProps = {
  rowIndex: number | any;
  chKey: string;
  chKeys: string[];
};

type ChangeHandler = (onChange: (value: boolean) => void, data: DataProps) => void;

export const MCQAnswerGroupTable: React.FC<MCQCSProps> = ({ questionaire, answer, handleSubmit, mcqGAtom }) => {
  const rows = answer && answer?.length > 0 ? answer[0].rows : [];
  const form = useForm<MCQGValidationType>({
    mode: 'all',
    resolver: zodResolver(mcqGSchema),
    defaultValues: {
      mcqGroup: rows,
    },
  });
  const { control, formState, setValue } = form;
  const { fields } = useFieldArray({ control, name: 'mcqGroup' });
  const { textZoomStyle } = useToolbarSettings();
  const handleChange: ChangeHandler = (onChange, data) => {
    const { rowIndex, chKey, chKeys } = data;
    if (!chKey) {
      console.error('selectedKey is undefined');
      return;
    }
    chKeys.forEach(key => {
      const selectedKey: any = `mcqGroup.${rowIndex}.${key}`;
      setValue(selectedKey, key === chKey);
    });
    onChange(true);
  };

  useFormSubmissionBindingHooks({
    key: 'MCQGroup',
    isValid: formState.isValid,
    isDirty: formState.isDirty,
    cb: () => form.handleSubmit(handleSubmit)(),
    initDependencies: [mcqGAtom],
  });

  const RenderCheckboxes = ({ row, rowIndex }: RenderButtonsProps) => {
    if (!row || rowIndex === undefined) {
      return null;
    }
    const chKeys = Object.keys(row).filter(key => key.startsWith('ch'));
    return (
      <>
        {chKeys.map((chKey, chIndex) => {
          const selectedKey: any = `mcqGroup.${rowIndex}.${chKey}`;
          return (
            <TableCell align="center" className="border border-[#D4D7DA]">
              <ControlledCheckbox control={control} name={selectedKey} />
            </TableCell>
          );
        })}
      </>
    );
  };

  const RenderRadioButtons = ({ row, rowIndex }: RenderButtonsProps) => {
    const chKeys = Object.keys(row).filter(key => key.startsWith('ch'));
    return (
      <>
        {chKeys.map((chKey, chIndex) => {
          const selectedKey: any = `mcqGroup.${rowIndex}.${chKey}`;
          return (
            <TableCell align="center" key={chIndex} className="border border-[#D4D7DA] ">
              <ControlledTableRadioButton
                control={control}
                name={selectedKey}
                handleChange={handleChange}
                data={{ rowIndex, chKey, chKeys }}
              />
            </TableCell>
          );
        })}
      </>
    );
  };

  return (
    <Grid>
      <div className="h-full w-full font-sans">
        <FormProvider {...form}>
          {questionaire
            ? questionaire.length > 0 &&
              questionaire.map((answerItem, answerIndex: number) => (
                <div key={answerIndex} className="w-full">
                  <div className="w-full text-sm mb-4 pr-5">
                    <div className="w-full text-sm mb-4 pr-5">
                      <p className="flex" key={answerIndex}>
                        <NearMeIcon className="h-6 rotate-45 text-[#86BCEA] mr-2 pb-1" />
                        {answerItem.answer
                          ? answerItem.answer.length > 0 &&
                            answerItem.answer.map((answerItem: AnswerProps) => (
                              <ParsedHtml html={answerItem.answerInstruction} />
                            ))
                          : null}
                      </p>
                    </div>
                  </div>
                  <div className="w-full">
                    <Paper elevation={3}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              {answerItem.answer
                                ? answerItem.answer.length > 0 &&
                                  answerItem.answer.map(
                                    (answerContainer: AnswerProps) =>
                                      answerContainer.columns &&
                                      answerContainer.columns.map((columnName: any, index: number) => (
                                        <TableCell
                                          key={index}
                                          align="center"
                                          className="text-sm bg-[#E6F2FF] font-semibold border border-[#D4D7DA]"
                                          style={textZoomStyle}
                                          sx={{ width: '80px' }}
                                        >
                                          {columnName}
                                        </TableCell>
                                      )),
                                  )
                                : null}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {fields.length > 0 &&
                              fields.map((row, index) => (
                                <TableRow key={index}>
                                  <TableCell
                                    align="left"
                                    className="border border-[#D4D7DA] px-4 py-2 w-40 "
                                    style={textZoomStyle}
                                  >
                                    {row.rowTitle}
                                  </TableCell>
                                  {questionaire
                                    ? questionaire.length > 0 &&
                                      questionaire.map(tableItem =>
                                        tableItem.QType === 'MCQNoGroup' ? (
                                          <RenderRadioButtons row={row} rowIndex={index} />
                                        ) : (
                                          <RenderCheckboxes row={row} rowIndex={index} />
                                        ),
                                      )
                                    : null}
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                    {((formState.errors.mcqGroup && !formState.isValid) ||
                      (formState.isDirty && !formState.isValid)) && (
                      <div className="mt-2">
                        <FormHelperText error={true}>Each row should have at least one selected value</FormHelperText>
                      </div>
                    )}
                    <div className="w-full text-sm mb-4 pr-5 pt-4 flex gap-1">
                      <p style={textZoomStyle}>Note:</p>
                      <p>
                        {answerItem.answer
                          ? answerItem.answer.length > 0 &&
                            answerItem.answer.map((answerItem: AnswerProps) => answerItem.note)
                          : null}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </FormProvider>
      </div>
    </Grid>
  );
};
