import { Box, Typography } from "@mui/material";
import { useAtom } from "jotai";
import { SelectedConfirmationObj } from "../Dialog/DialogFormBlocks/inclusion/useAtomic";
import {
  ConfirmationTextfield,
  EnvironmentFormType,
} from "../Textfield/ConfirmationTextfield";
import { Button } from "./Button";
import { EvaIcon } from "../EvaIcon";
import { IconButton } from "./IconButton";
import { useFormContext } from "react-hook-form";

interface StatusButtonProps {
  onSubmit: (value: string) => void;
  data: string[] | undefined;
  Item: string;
  loading: boolean;
}

export const StatusButton = ({
  onSubmit,
  data,
  Item,
  loading,
}: StatusButtonProps) => {
  const [status, setStatus] = useAtom(SelectedConfirmationObj);
  const { reset } = useFormContext<EnvironmentFormType>();

  const isStatusIncluded = data && data.includes(Item);

  const handleTrigger = (Item: string) => {
    setStatus(Item);
    reset();
  };

  return status && status == Item ? (
    <Box sx={{ width: "70%", display: "flex", alignItems: "center" }}>
      <ConfirmationTextfield
        item={status}
        onSubmit={onSubmit}
        loading={loading}
      />
      <IconButton onClick={() => setStatus(null)} size="small">
        <EvaIcon
          id="close-icon"
          name="close-circle-outline"
          fill="#4B4B4B"
          className="w-[100%] h-[100%]"
          aria-label="Close Modal"
          ariaHidden
        />
      </IconButton>
    </Box>
  ) : (
    <Button
      variant="text"
      onClick={() => handleTrigger(Item)}
      disabled={loading}
      sx={{
        width: "50%",
        fontSize: "12px",
        padding: "10px",
        height: "50px",
        bgcolor: "#dedeec",
        borderRadius: "15px",
        backgroundColor: isStatusIncluded ? "#e5d995" : "#6aba6a",
        color: isStatusIncluded ? "#bfa40d" : "#115605",
      }}
    >
      <Typography fontWeight={600} fontSize="12px">
        {isStatusIncluded ? "Under Maintenance" : "Active"}
      </Typography>
    </Button>
  );
};
