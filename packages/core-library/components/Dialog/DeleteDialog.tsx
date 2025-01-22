import React, { useCallback, useState } from "react";
import { Typography } from "@mui/material";
import { DialogBox } from "./DialogBox";
import { Button, InputField } from "../";

type DeleteDialogProps = {
  handleClose: () => void;
  handleDelete: () => Promise<void>;
  expectedInput: string;
  title?: string;
  description?: string;
  loading?: boolean;
  isOpen: boolean;
};

export const DeleteDialog = ({
  handleClose,
  handleDelete,
  expectedInput,
  title = "Confirm Deletion",
  description = "Are you sure you want to delete this item? This action cannot be undone and this will permanently delete the item.",
  loading = false,
  isOpen,
}: DeleteDialogProps) => {
  const [confirmationText, setConfirmationText] = useState<string>("");

  const handleConfirmChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmationText(e.target.value);
    },
    []
  );

  const handleDeleteClick = useCallback(async () => {
    await handleDelete();
    handleClose();
  }, [handleDelete, handleClose]);

  const disableConfirmButton = confirmationText !== expectedInput;

  return (
    <React.Fragment>
      <DialogBox
        handleClose={handleClose}
        maxWidth="sm"
        open={isOpen}
        hideCloseButton
        sx={{
          height: "auto",
          borderRadius: 4,
        }}
        isOverflowing={false}
        header={title}
        headerStyle={{
          background: "#B21E35",
          color: "#F3F3F3",
          textAlign: "start",
          pt: 5,
          pb: 5,
        }}
      >
        <div className="flex flex-col gap-2">
          <Typography
            sx={{
              fontFamily: "PT Sans Narrow",
              py: 4,
              color: "#343a40",
              fontSize: "1.3rem",
            }}
          >
            {description}
          </Typography>
          <Typography
            sx={{
              fontFamily: "PT Sans Narrow",
              fontSize: "1.2rem",
              color: "#343a40",
            }}
          >
            Please type <strong>{expectedInput}</strong> to confirm deletion.
          </Typography>
          <InputField
            containerProps={{ sx: { width: "100%" } }}
            value={confirmationText}
            onChange={handleConfirmChange}
            placeholder="Type here"
            sx={{
              borderRadius: "5px",
              width: "100%",
              backgroundColor: "#FFFFFF",
              border: disableConfirmButton
                ? "1px solid #B21E35"
                : "1px solid #80ed99",
            }}
            inputProps={{
              style: {
                padding: 15,
                borderRadius: "3px",
                fontFamily: "PT Sans Narrow",
                fontSize: "1.2rem",
              },
              "aria-label": "Type confirmation text",
            }}
          />
          {disableConfirmButton && (
            <Typography
              color="error"
              sx={{
                mt: 1,
                fontSize: "0.9rem"
              }}
            >
              The text must match <strong>{expectedInput}</strong>.
            </Typography>
          )}
        </div>
        <div className="flex justify-end gap-2 py-4">
          <Button
            sx={{
              py: 2,
              fontFamily: "PT Sans Narrow",
              fontWeight: "bold",
              backgroundColor: "transparent",
              border: "1px solid #ced4da",
              color: "#030303",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "transparent",
                border: "1px solid #ced4da",
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              py: 2,
              fontFamily: "PT Sans Narrow",
              fontWeight: "bold",
              backgroundColor: "#B21E35",
              color: "#fff",
              borderRadius: "6px",
              "&:hover": {
                backgroundColor: "#B21E35",
                opacity: 0.9,
              },
            }}
            disabled={disableConfirmButton || loading}
            loading={loading}
            onClick={handleDeleteClick}
          >
            Confirm
          </Button>
        </div>
      </DialogBox>
    </React.Fragment>
  );
};