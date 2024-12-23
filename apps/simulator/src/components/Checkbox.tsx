import { Stack, FormControlLabel, Checkbox as MuiCheckbox, CheckboxProps, Typography } from '@mui/material';
import { useToolbarSettings } from '@/core/context/ToolbarSettingsContext';
import { Controller, FieldValues } from 'react-hook-form';
import { ControlledField } from 'core-library/types';
import { FormHelperText } from '.';

type Props = CheckboxProps & {
  label?: string;
  helperText?: string;
  error?: boolean;
  showErrorMessage?: boolean;
};

export const Checkbox: React.FC<Props> = ({ label, helperText, error, showErrorMessage = true, ...rest }) => {
  const { textZoomStyle } = useToolbarSettings();

  return (
    <Stack gap={1}>
      <FormControlLabel
        sx={{
          color: theme => (error ? theme.palette.error.main : 'CurrentColor'),
        }}
        control={<MuiCheckbox {...rest} />}
        label={
          <Typography variant="caption" style={textZoomStyle}>
            {label}
          </Typography>
        }
      />
      {helperText && showErrorMessage && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </Stack>
  );
};

type ControlledCheckboxProps<T extends FieldValues> = ControlledField<T> & Props;

export function ControlledCheckbox<T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...rest
}: ControlledCheckboxProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Checkbox
          onChange={onChange}
          onBlur={onBlur}
          checked={value ?? false}
          error={Boolean(error?.message)}
          helperText={error?.message}
          {...rest}
        />
      )}
    />
  );
}
