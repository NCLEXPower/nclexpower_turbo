import {
  TextareaAutosize,
  TextareaAutosizeProps,
  Grid,
  useTheme,
  Typography,
  FormHelperText,
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
  label?: string | JSX.Element | null;
  isLoading?: boolean;
  resizible?: boolean;
  style?: React.CSSProperties;
  "data-testid"?: string;
}

export const TextAreaField = <T extends FieldValues>({
  name,
  control,
  label,
  ...props
}: Props<T>) => (
  <Controller<T>
    name={name}
    control={control}
    render={({ formState: _, field, fieldState, ...controllerProps }) => {
      const { ref, ...nonRefField } = field;
      return (
        <Grid container spacing={1} direction="column">
          <Grid item>
            {fieldState?.error?.message ? (
              <FormHelperText error>{fieldState.error.message}</FormHelperText>
            ) : (
              label !== null && (
                <Typography
                  component="label"
                  htmlFor={field?.name}
                  display="flex"
                >
                  {label ?? ""}
                </Typography>
              )
            )}
          </Grid>
          <Grid item>
            <TextareaComponent
              {...controllerProps}
              {...props}
              {...nonRefField}
              fieldState={fieldState}
            />
          </Grid>
        </Grid>
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
  style,
  ...props
}: ComponentProps<T>) => {
  const theme = useTheme();
  const { isMobile } = useResolution();
  const hasError = !!fieldState?.error;

  return (
    <TextareaAutosize
      data-testid={props["data-testid"]}
      style={{
        width: "100%",
        fontSize: theme.typography.body1.fontSize,
        padding: "12px 16px",
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.appColors.essential["800"] ?? "",
        borderRadius: "5px",
        resize: "none",
        borderColor: hasError ? theme.palette.error.main : undefined,
        ...style,
      }}
      minRows={isMobile ? 10 : 5}
      {...props}
    />
  );
};
