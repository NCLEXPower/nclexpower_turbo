// /**
// Property of the Arxon Solutions, LLC.
// Reuse as a whole or in part is prohibited without permission.
// Created by the Software Strategy & Development Division
// */

import { useState } from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  ImageUploader,
  Button,
  IconButton,
  DialogBox,
  TextAreaField,
  ControlledSelectField,
} from "../../../../../../components";
import {
  submitButtonStyle,
  iconButtonStyle,
  TextAreaStyle,
  badgeBgColor,
  DescriptionBoxStyle,
} from "./styles/style";
import { Ticket } from "./IssueTrackingManagementBlock";
import { formatDate } from "../../../../../../core";
import { StatusBadge } from "./StatusBadge";
import { FormProvider, useForm } from "react-hook-form";
import { getStatusLabel } from "../../../../../../utils/statusHelpers";

interface IssueDetailsModalProps {
  open: boolean;
  onClose: () => void;
  data?: Ticket;
  // onStatusChange: (reference: string, newStatus: number) => void;
}

export const IssueDetailsModal: React.FC<IssueDetailsModalProps> = ({
  open,
  onClose,
  // onStatusChange,
  data,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const form = useForm();

  // const updateReportStatusCb = useApiCallback((api, args: FormData) =>
  //   api.webbackoffice.updateStatus(args)
  // );

  const options = [0, 1, 2].map((status) => ({
    label: <StatusBadge status={status} />,
    value: status,
  }));

  const handleStatusChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedStatus(parseInt(event.target.value));
  };

  const handleSubmit = async () => {
    // ** Update Issue Ticket Here ** //
    // const currentNotes = notes;
    // if (!data?.reference) {
    //   showToast("Reference number is missing.", "error");
    //   return;
    // }
    // const statusNumber = selectedStatus;
    // if (typeof statusNumber === "undefined") {
    //   showToast("Please select a valid status.", "error");
    //   return;
    // }
    // const formObject: Record<string, FormDataEntryValue> = {
    //   Notes: currentNotes,
    //   RefNo: data?.reference,
    //   UpdateStatus: statusNumber.toString(),
    // };
    // if (selectedImage) {
    //   formObject.Proof = selectedImage;
    // }
    // try {
    //   updateReportStatusCb.loading;
    //   const form = createFormData(formObject);
    //   const result = await updateReportStatusCb.execute(form);
    //   if (result) {
    //     showToast("Issue status updated successfully.", "success");
    //     onStatusChange(data?.reference, selectedStatus);
    //     onClose();
    //   } else {
    //     showToast("Failed to update issue status. Please try again.", "error");
    //   }
    // } catch (error) {
    //   showToast("Failed to update issue status. Please try again.", "error");
    // }
  };

  return (
    <DialogBox
      headerStyle={{
        display: "none",
      }}
      isOverflowing={false}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "8px",
          overflow: "hidden",
          padding: "24px",
          maxWidth: "560px",
          m: 0,
        },

        "& .MuiInputBase-root": {
          maxHeight: "30px",
          borderRadius: "8px",
          p: 0,
        },
        "& .MuiSelect-select": {
          height: "30px",
          borderRadius: "8px",
          p: 0,
          ...(badgeBgColor[getStatusLabel(selectedStatus)] ?? "transparent"),
        },

        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },

        "& .MuiDialogContent-root": {
          p: 0,
        },
      }}
      handleClose={onClose}
      open={open}
      hideCloseButton
    >
      <FormProvider {...form}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="h2"
            color="inherit"
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: '"PT Sans Narrow", sans-serif',
            }}
          >
            <strong>Reference #</strong>
            <span
              style={{
                color: "inherit",
                fontSize: "16px",
                fontFamily: '"Poppins", sans-serif',
                marginLeft: "8px",
              }}
            >
              {data?.reference}
            </span>
          </Typography>
          <IconButton onClick={onClose} sx={iconButtonStyle}>
            <CloseOutlinedIcon
              sx={{
                fontSize: 14,
                stroke: "#3B0086",
                strokeWidth: 2,
              }}
            />
          </IconButton>
        </Grid>

        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={6}>
            <Typography
              data-testid="issue-email"
              variant="body2"
              sx={{ fontFamily: '"PT Sans Narrow", sans-serif' }}
            >
              <strong>Email:</strong>
              <span
                style={{
                  marginLeft: "20px",
                  fontSize: "12px",
                  fontFamily: '"Poppins", sans-serif',
                }}
              >
                {data?.email}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                <Typography
                  variant="body2"
                  color="inherit"
                  sx={{
                    fontFamily: '"PT Sans Narrow", sans-serif',
                    fontWeight: 700,
                  }}
                >
                  Status:
                </Typography>
              </Grid>
              <Grid item sx={{ ml: 2 }}>
                <ControlledSelectField
                  control={form.control}
                  name=""
                  value={selectedStatus.toString()}
                  options={options}
                  onChange={handleStatusChange}
                  data-test={"issue-status-dropdown"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          sx={{ fontFamily: '"PT Sans Narrow", sans-serif' }}
        >
          <strong>Date Created:</strong>
          <span
            style={{
              marginLeft: "5px",
              fontFamily: '"Poppins", sans-serif',
              fontSize: "12px",
            }}
          >
            {formatDate(
              data?.dateCreated ? new Date(data.dateCreated) : "",
              "MMMM d, yyyy"
            )}
          </span>
        </Typography>
        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{
            fontFamily: '"PT Sans Narrow", sans-serif',
            mt: "12px",
            fontWeight: 700,
          }}
        >
          Description
        </Typography>

        <Box sx={DescriptionBoxStyle}>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "transparent",
              color: "#3B0086",
              fontSize: "12px",
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            {data?.description ?? "No description available."}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" my={2}>
          <Divider
            sx={{
              flexGrow: 1,
              borderColor: "#3B0086",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
            }}
          />
          <Typography
            variant="h6"
            sx={{
              mx: 2,
              my: "12px",
              color: "#3B0086",
              fontFamily: '"PT Sans Narrow", sans-serif',
              fontWeight: 700,
            }}
          >
            Support's Section
          </Typography>
          <Divider
            sx={{
              flexGrow: 1,
              borderColor: "#3B0086",
              borderBottomWidth: 1,
              borderBottomStyle: "solid",
            }}
          />
        </Box>

        <ImageUploader
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              sx={{
                fontFamily: '"PT Sans Narrow", sans-serif',
                fontWeight: 700,
              }}
            >
              Support's Notes
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextAreaField
              control={form.control}
              name=""
              placeholder="Enter notes..."
              style={{
                ...TextAreaStyle,
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              onClick={form.handleSubmit(handleSubmit)}
              variant="contained"
              loading={false}
              sx={submitButtonStyle}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormProvider>
    </DialogBox>
  );
};
