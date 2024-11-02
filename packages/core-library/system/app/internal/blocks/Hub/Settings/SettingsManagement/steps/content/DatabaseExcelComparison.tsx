import {
  Card,
  InformationTitle,
  FileUploadField,
  Button,
  ProgressBar,
  DataGrid,
  Alert,
} from "../../../../../../../../../components";
import React, { useEffect, useState } from "react";
import { fileValidationErrors, uploadFormSchema } from "../../validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Chip, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { UploadFormType } from "../../types";
import { useApiCallback, useColumns } from "../../../../../../../../../hooks";
import { ExcelRowRegularQuestion } from "../../../../../../../../../core";
import { useDialogContext } from "../../../../../../../../../contexts";
import {
  DiscrepanciesResponse,
  FileUploadParams,
} from "../../../../../../../../../api/types";

interface Props {
  fileType?: string[];
  defaultValues?: UploadFormType;
  removing?: boolean;
  uploadErrors?: string[];
  nextStep(values: Partial<UploadFormType>): void;
  previousStep(): void;
  values: Partial<UploadFormType>;
  onFileAdded?(file: File): void;
}

const RegularQuestionDBComparisonAnalytics: React.FC<DiscrepanciesResponse> = ({
  discrepancies,
}) => {
  const [loading, setLoading] = useState(true); //this loading can be pass from automation parent component
  const { columns } = useColumns({
    columns: [
      {
        field: "missingIn",
        headerName: "Missing In",
        sortable: true,
        width: 150,
        renderCell: (params) => {
          if (params.row.missingIn === "DB") {
            return (
              <Chip
                label="Database"
                variant="filled"
                size="small"
                color="error"
              />
            );
          }
          return (
            <Chip label="Excel" variant="filled" size="small" color="success" />
          );
        },
      },
      {
        field: "qLNum",
        headerName: "Question LNum",
        sortable: true,
        width: 50,
      },
      {
        field: "question",
        headerName: "Question",
        sortable: true,
        width: 300,
      },
      {
        field: "choice_1",
        headerName: "Choice 1",
        sortable: true,
        width: 150,
      },
      {
        field: "choice_2",
        headerName: "Choice 2",
        sortable: true,
        width: 150,
      },
      {
        field: "choice_3",
        headerName: "Choice 3",
        sortable: true,
        width: 150,
      },
      {
        field: "choice_4",
        headerName: "Choice 4",
        sortable: true,
        width: 150,
      },
      {
        field: "choice_5",
        headerName: "Choice 5",
        sortable: true,
        width: 150,
      },
      {
        field: "choice_6",
        headerName: "Choice 6",
        sortable: true,
        width: 150,
      },
      {
        field: "correct",
        headerName: "Correct Answer",
        sortable: true,
        width: 150,
      },
      {
        field: "rationale",
        headerName: "Rationale",
        sortable: true,
        width: 300,
      },
      {
        field: "cogLNum",
        headerName: "Cognitive LNum",
        sortable: true,
        width: 150,
      },
      {
        field: "cnCateg",
        headerName: "CN Category",
        sortable: true,
        width: 150,
      },
      {
        field: "integPLNum",
        headerName: "Integration PLNum",
        sortable: true,
        width: 150,
      },
      {
        field: "contentLNum",
        headerName: "Content LNum",
        sortable: true,
        width: 150,
      },
    ],
  });
  const dataWithId = discrepancies.map((row) => ({
    ...row.record,
    id: row.record.qid,
    missingIn: row.missingIn,
  }));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Box>
      <InformationTitle
        text="Automation | Regular Question Database & Excel Analytics "
        lineWidth={6}
        lineHeight={35}
        lineColor="#6A5ACD"
        borderRadius={2}
        containerProps={{ mb: 5 }}
        textProps={{ color: "text.primary", fontWeight: "bold" }}
      />
      <DataGrid
        columns={columns}
        rows={dataWithId}
        initPageSize={10}
        isLoading={loading}
      />
    </Box>
  );
};

const AutomationDBExcelChecker = ({
  fileType,
  defaultValues,
  removing,
  uploadErrors,
  nextStep,
  onFileAdded,
}: Props) => {
  const { openDialog } = useDialogContext();
  const validationSchema = uploadFormSchema();
  const form = useForm<UploadFormType>({
    resolver: yupResolver(validationSchema),
    criteriaMode: "all",
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: { ...validationSchema.getDefault(), ...defaultValues },
  });
  const compareCb = useApiCallback(
    async (api, args: FileUploadParams) =>
      await api.webbackoffice.automationUploadDocuments(args)
  );
  const [preUploadErrors, setPreUploadErrors] = useState<string[]>([]);
  const [fileOnUpload, setFileOnUpload] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<ExcelRowRegularQuestion[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [sqAnalytics, setSqAnalytics] = useState<
    DiscrepanciesResponse | number
  >();

  useEffect(() => {
    form.reset({ ...defaultValues });
  }, [defaultValues, uploadErrors?.length]);

  const isDiscrepanciesResponse = (
    data: any
  ): data is DiscrepanciesResponse => {
    return (data as DiscrepanciesResponse)?.discrepancies !== undefined;
  };
  return (
    <Box>
      <FileUploadField
        name="files"
        control={form.control}
        acceptTypes={fileType}
        isLoading={compareCb.loading}
        isUploading={uploading}
        isRemoving={removing}
        uploadErrors={uploadErrors}
        preUploadErrors={preUploadErrors}
        fileOnUploadName={fileOnUpload?.name}
        dragActiveLabel={fileOnUpload?.name ?? "Drag and Drop a file"}
        dragLabel={fileOnUpload?.name ?? "Drag and Drop a file"}
        onUpload={handleUpload}
      />
      {compareCb.loading && <ProgressBar isLoading={compareCb.loading} />}
      {csvData.length > 0 && (
        <Button onClick={handlePreviewExcelData} variant="text" size="small">
          Preview excel data
        </Button>
      )}
      <Button
        sx={{
          mt: 2,
          mb: 5,
          width: "100%",
          cursor:
            compareCb.loading || csvData.length === 0
              ? "not-allowed"
              : "pointer",
        }}
        onClick={form.handleSubmit(handleNext)}
        loading={compareCb.loading}
        disabled={compareCb.loading || csvData.length === 0}
      >
        Compare
      </Button>
      {typeof sqAnalytics === "number" && sqAnalytics === 200 && (
        <Alert
          severity="success"
          title="Excel & Database Match!"
          description="No discrepancy detected on the selected file and current database records"
        />
      )}
      {isDiscrepanciesResponse(sqAnalytics) &&
        sqAnalytics.discrepancies.length > 0 && (
          <RegularQuestionDBComparisonAnalytics
            discrepancies={sqAnalytics.discrepancies}
          />
        )}
    </Box>
  );

  function handlePreviewExcelData() {
    openDialog(
      "automation-db-comparison",
      "Regular Source Question Excel Data Preview",
      csvData,
      "xl"
    );
  }

  function handleUpload(fileList: FileList | null) {
    setUploading(true);
    setFileOnUpload(null);
    setPreUploadErrors([]);
    const newFiles = Array.from(fileList || []);
    try {
      if (newFiles?.length !== 1) {
        throw Error();
      }

      const file = newFiles[0];
      const validFileTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      if (!validFileTypes.includes(file.type)) {
        throw new Error("Please upload a valid Excel file.");
      }

      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          workbook.SheetNames.forEach(() => {
            const worksheet = workbook.Sheets["tbl_SourceQues"];
            const result = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const columns: (keyof ExcelRowRegularQuestion)[] =
              result.length > 0
                ? (result[0] as (keyof ExcelRowRegularQuestion)[])
                : [];
            result.shift();

            const formattedData = result.map((row: any) => {
              const rowData: Partial<ExcelRowRegularQuestion> = {};
              columns.forEach((columnName, index) => {
                rowData[columnName] = row[index];
              });
              return rowData as ExcelRowRegularQuestion;
            });
            setCsvData(formattedData);
            openDialog(
              "automation-db-comparison",
              "Regular Source Question Excel Data Preview",
              formattedData,
              "xl"
            );
            setUploading(false);
          });
        }
      };
      reader.readAsBinaryString(file);

      const files = form.getValues("files");
      validationSchema.validateSync({
        files: [...files.slice(0, -newFiles.length), ...newFiles],
      });
      handleSuccessfulFileUpload(newFiles[0]);
    } catch (error) {
      handleFailedFilesUpload(newFiles);
    }
  }

  function handleSuccessfulFileUpload(file: File) {
    form.clearErrors();
    setPreUploadErrors([]);
    onFileAdded?.(file);
    setFileOnUpload(file);
  }

  async function handleNext(values: UploadFormType) {
    const result = await compareCb.execute({ file: values.files[0] });
    if (typeof result.data === "number") {
      setSqAnalytics(result.data);
    } else {
      setSqAnalytics(result.data);
    }
    nextStep({ files: values.files });
  }

  function handleFailedFilesUpload(failedFiles: File[]) {
    // @ts-ignore-next-line
    const files = form.getValues("files");
    if (failedFiles.length > 1) {
      form.clearErrors();
      setPreUploadErrors([fileValidationErrors("upload").multipleFiles]);
    }
    const indexesToRemove = failedFiles.map((failedFile) =>
      files.findLastIndex((file) => file.name === failedFile.name)
    );
    const filteredFiles = files.filter(
      (_, idx) => !indexesToRemove.includes(idx)
    );
    form.setValue("files", filteredFiles);
  }
};

export const DatabaseExcelComparison: React.FC<Props> = ({
  nextStep,
  previousStep,
  values,
  fileType,
  defaultValues,
  removing,
  uploadErrors,
}) => {
  return (
    <Box>
      <Card sx={{ mt: 5, p: 5 }}>
        <Button
          onClick={previousStep}
          variant="text"
          size="small"
          sx={{ mb: 5 }}
        >
          Back
        </Button>
        <Card sx={{ p: 5 }}>
          <InformationTitle
            text="Automation | Regular Question Database & Excel Discrepancy Checker "
            lineWidth={6}
            lineHeight={35}
            lineColor="#6A5ACD"
            borderRadius={2}
            containerProps={{ mb: 5 }}
            textProps={{ color: "text.primary", fontWeight: "bold" }}
          />
          <AutomationDBExcelChecker
            fileType={fileType}
            defaultValues={defaultValues}
            removing={removing}
            uploadErrors={uploadErrors}
            nextStep={nextStep}
            previousStep={previousStep}
            values={values}
          />
        </Card>
      </Card>
    </Box>
  );
};
