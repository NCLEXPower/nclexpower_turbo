/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box } from "@mui/material";
import { Button, TextField } from "..";
import { useFormContext } from "react-hook-form";

interface Props {
  item: string;
  onSubmit: (value: any) => void;
  loading?: boolean;
}
export type EnvironmentFormType = {
  [key: string]: string;
};

export const ConfirmationTextfield = ({ item, onSubmit, loading }: Props) => {
  const textToType = `${item.toUpperCase()}`;
  const { control, handleSubmit, watch } =
    useFormContext<EnvironmentFormType>();

  const watchedValue = watch(`confirmationText_${item}`);

  return (
    <Box sx={{ display: "flex", width: "100%", alignItems: "center", gap: 2 }}>
      <TextField
        name={`confirmationText_${item}`}
        control={control}
        placeholder={`Type ${textToType}`}
        sx={{ borderRadius: "10px", height: "45px" }}
      />
      <Button
        loading={loading}
        onClick={handleSubmit(onSubmit)}
        disabled={watchedValue !== textToType}
        sx={{
          fontSize: "12px",
          lineHeight: "15px",
          minHeight: "30px",
          height: "45px",
          paddingY: 0,
          paddingX: 5,
          borderRadius: "10px",
        }}
      >
        Commence
      </Button>
    </Box>
  );
};
