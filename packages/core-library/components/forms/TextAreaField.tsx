import {
  TextareaAutosize,
  TextareaAutosizeProps,
  Grid,
  useTheme,
} from "@mui/material";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
} from "react-hook-form";
import { useResolution } from "../../hooks";
import { FieldError } from "./FieldError";

interface Props<T extends object> extends TextareaAutosizeProps {
  name: Path<T>;
  control: Control<T, object>;
  isLoading?: boolean;
  resizible?: boolean;
  "data-testid"?: string;
}

export const TextAreaField = <T extends FieldValues>({
  name,
  control,
  ...props
}: Props<T>) => (
  <Controller<T>
    name={name}
    control={control}
    render={({ formState: _, field, ...controllerProps }) => {
      const { ref, ...nonRefField } = field;
      return (
        <TextareaComponent {...controllerProps} {...props} {...nonRefField} />
      );
    }}
  />
);

interface ComponentProps<T extends object>
  extends Omit<Props<T>, "name" | "control"> {
  field?: ControllerRenderProps<T, Path<T>>;
  fieldState?: ControllerFieldState;
}

export const TextareaComponent = <T extends object>({
  field,
  fieldState,
  ...props
}: ComponentProps<T>) => {
  const theme = useTheme();
  const { isMobile } = useResolution();

  return (
    <Grid container spacing={2} direction="column">
      {fieldState?.error?.message && (
        <Grid item>
          <FieldError messageKey={fieldState.error.message} />
        </Grid>
      )}
      <Grid item>
        <TextareaAutosize
          data-testid={props["data-testid"]}
          style={{
            width: "100%",
            fontSize: theme.typography.body1.fontSize,
            padding: "12px 16px",
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.appColors.essential["800"],
            borderRadius: "5px",
            resize: "none",
          }}
          minRows={isMobile ? 10 : 5}
          {...props}
        />
      </Grid>
    </Grid>
  );
};
