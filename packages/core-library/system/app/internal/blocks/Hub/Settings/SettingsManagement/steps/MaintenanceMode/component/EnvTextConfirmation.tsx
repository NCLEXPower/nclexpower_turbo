/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box } from "@mui/material";
import {
  Button,
  ControlledTextField,
} from "../../../../../../../../../../components";
import { EnvironmentItem } from "../../../types";
import { useFormContext } from "react-hook-form";

interface Props {
  Env: EnvironmentItem;
  onSubmit: (value: any) => void;
}
export type EnvironmentFormType = {
  [key: string]: string;
};

export const EnvTextConfirmation = ({ Env, onSubmit }: Props) => {
  const textToType = `${Env.label.toUpperCase()} Environment`;
  const { control, handleSubmit, watch } =
    useFormContext<EnvironmentFormType>();

  const watchedValue = watch(`confirmationText_${Env.id}`);

  return (
    <Box sx={{ display: "flex", width: "100%", alignItems: "center", gap: 2 }}>
      <ControlledTextField
        name={`confirmationText_${Env.id}`}
        control={control}
        placeholder={`Type ${textToType}`}
        className="shadow-sm shadow-zinc-200"
        sx={{ borderRadius: "10px", height: "45px" }}
      />
      <Button
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
        Commence Maintenance
      </Button>
    </Box>
  );
};
