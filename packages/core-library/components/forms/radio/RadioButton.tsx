import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { RadioProps } from '@mui/material/Radio';
import { Radio } from './Radio';

interface Props extends RadioProps {
    value: FormControlLabelProps['value'];
    label: FormControlLabelProps['label'];
    withBorder?: boolean;
}

export const RadioButton: React.FC<Props> = ({ value, label, id, withBorder = false, ...props }) => (
    <FormControlLabel 
        sx={
            withBorder
                ? {
                    alignItems: 'flex-start',
                    '&.MuiFormControlLabel-root': {
                        px: 6,
                        backgroundColor: 'essential.500',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        mx: 0,
                        my: 0,
                        py: 2,
                        '&:not(:last-of-type)': { mb: 2 },
                        '& .MuiFormControlLabel-label': { ml: 2, pt: 3 }
                    },
                }
                : {
                    alignItems: 'flex-start',

                    '& .MuiButtonBase-root': { ml: 2, p: 0, '&:not(:last-of-type)': { mb: 2 } },
                    '& .MuiFormControlLabel-label': { mt: '3px', mb: 0, padding: 0, '&:last-of-type': { ml: 4 } },
                    '&:not(:last-of-type)': { mb: 4 }
                }
        }
        id={id}
        data-testid={id}
        value={value}
        control={<Radio {...props} />}
        label={label}
    />
)