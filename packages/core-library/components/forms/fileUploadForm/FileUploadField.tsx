import { ErrorOutline } from "@mui/icons-material";
import { Stack, SxProps, Typography } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldPathValue,
  FieldValues,
  Path,
  UnpackNestedValue,
} from "react-hook-form";
import { DragAndDropTarget } from "./DragAndDropTarget";
import { FileUploadProgress } from "./FileUploadProgress";
import { FileUploadButton } from "../../Button/FileUploadButton";

interface Props<T extends object> {
  name: Path<T>;
  control: Control<T>;
  acceptTypes?: string[];
  defaultValue?: UnpackNestedValue<FieldPathValue<T, FieldPath<T>>>;
  dragLabel?: string;
  dragActiveLabel?: string;
  isLoading?: boolean;
  isUploading?: boolean;
  isRemoving?: boolean;
  fileOnUploadName?: string;
  uploadErrors?: string[];
  preUploadErrors?: string[];
  onUpload?(files: FileList | null): void;
  triggerLabel?: string;
  sx?: SxProps;
}

interface ComponentProps<T extends object>
  extends Omit<Props<T>, "name" | "control" | "defaultValue"> {
  field?: ControllerRenderProps<T, Path<T>>;
  fieldState?: ControllerFieldState;
}

export const FileUploadField = <T extends FieldValues>({
  name,
  control,
  defaultValue,
  ...props
}: Props<T>) => (
  <DndProvider backend={HTML5Backend}>
    <Controller<T>
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ formState, ...controllerProps }) => (
        <FileUploadFieldComponent {...controllerProps} {...props} />
      )}
    />
  </DndProvider>
);

export const FileUploadFieldComponent = <T extends object>({
  field,
  fieldState,
  acceptTypes,
  isLoading,
  isUploading,
  isRemoving,
  uploadErrors,
  preUploadErrors,
  dragLabel,
  dragActiveLabel,
  fileOnUploadName,
  onUpload,
  triggerLabel,
  sx,
}: ComponentProps<T>) => {
  const fileList = Array.from((field?.value as unknown as FileList) || []);
  const priorityErrors = [
    fieldState?.error?.message,
    ...(preUploadErrors || []),
  ].filter(Boolean);
  const secondaryErrors = [...(uploadErrors || [])].filter(Boolean);
  const errors = priorityErrors.length
    ? (priorityErrors as string[])
    : secondaryErrors;

  return (
    <Stack spacing={4}>
      <DragAndDropTarget
        id={`${field?.name}-container`}
        dragActiveLabel={dragActiveLabel}
        dragLabel={dragLabel}
        onDrop={
          isLoading || isUploading || isRemoving ? undefined : handleFilesUpload
        }
        isLoading={isLoading}
        uploadButton={
          <FileUploadButton
            name={field?.name || "file"}
            acceptTypes={acceptTypes}
            isDisabled={isLoading || isUploading || isRemoving}
            onUpload={handleFilesUpload}
            text={triggerLabel || "Select File"}
            sx={sx}
          />
        }
      >
        {isUploading && fileOnUploadName && !errors.length && (
          <FileUploadProgress title={fileOnUploadName} />
        )}
        {!!errors.length && (
          <Stack>
            {errors.map((error, index) => (
              <Stack
                key={index}
                direction="row"
                alignItems="flex-start"
                spacing={1}
                color="error.main"
                px={12}
              >
                <ErrorOutline />
                <Typography
                  component="label"
                  htmlFor={field?.name}
                  display="flex"
                >
                  {error ?? "[[label_name]]"}
                </Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </DragAndDropTarget>
    </Stack>
  );

  function handleFilesUpload(files: FileList | null) {
    field?.onChange?.([...fileList, ...Array.from(files || [])]);
    onUpload?.(files);
  }
};
