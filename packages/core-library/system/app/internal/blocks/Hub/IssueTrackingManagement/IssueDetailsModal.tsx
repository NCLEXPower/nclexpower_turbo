import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Divider } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ImageUploader, Button, IconButton } from "../../../../../../components";
import { createFormData } from "../../../../../../utils/createFormData";
import { SupportTextArea } from "./SupportTextArea";
import { IssueDescriptionBox } from "./IssueDescriptionBox";
import { IssueStatusDropdown } from "./IssueStatusDropdown";
import { useApiCallback } from "../../../../../../hooks";
import { useExecuteToast } from "../../../../../../contexts";
import { submitButtonStyle, modalContainerStyle, iconButtonStyle } from "./style";
import { formatDate } from "./utils/formatDate";

interface IssueContext {
  email: string;
  reference: string;
  description: string;
  dateCreated: string;
  status: number;
}

interface IssueModal {
  isOpen: boolean;
  context?: IssueContext;
}

interface IssueDetailsModalProps {
  modal: IssueModal;
  onClose: () => void;
  onStatusChange: (reference: string, newStatus: number) => void;
}

export const IssueDetailsModal: React.FC<IssueDetailsModalProps> = ({ modal, onClose, onStatusChange }) => {
  const { isOpen, context } = modal;
  const [selectedStatus, setSelectedStatus] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { showToast } = useExecuteToast();
  const [notes, setNotes] = useState("");

  if (!isOpen || !context) return null;

  const updateStatusCb = useApiCallback((api, args: FormData) =>
    api.webbackoffice.updateStatus(args)
  );

  useEffect(() => {
    if (context?.status) {
      setSelectedStatus(context.status);
    }
    if (!isOpen) {
      setSelectedImage(null);
    }
  }, [context?.status, isOpen]);

  const handleSubmit = async () => {
    const currentNotes = notes;

    if (!context?.reference) {
      showToast("Reference number is missing.", "error");
      return;
    }

    const statusNumber = selectedStatus;
    if (typeof statusNumber === 'undefined') {
      showToast("Please select a valid status.", "error");
      return;
    }

    const formObject: Record<string, FormDataEntryValue> = {
      Notes: currentNotes,
      RefNo: context.reference,
      UpdateStatus: statusNumber.toString(),
    };

    if (selectedImage) {
      formObject.Proof = selectedImage;
    }

    try {
      updateStatusCb.loading;

      const form = createFormData(formObject);
      const result = await updateStatusCb.execute(form);

      if (result) {
        showToast("Issue status updated successfully.", "success");
        onStatusChange(context.reference, selectedStatus);
        onClose();
      } else {
        showToast("Failed to update issue status. Please try again.", "error");
      }
    } catch (error) {
      showToast("Failed to update issue status. Please try again.", "error");
    }
  };

  return (
    <Box
      sx={modalContainerStyle}
    >
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
              marginLeft: "8px"
            }}
          >
            [{context?.reference}]
          </span>
        </Typography>
        <IconButton
          onClick={onClose}
          sx={iconButtonStyle}
        >
          <CloseOutlinedIcon
            sx={{
              fontSize: 14,
              stroke: "#3B0086",
              strokeWidth: 2,
            }}
          />
        </IconButton>
      </Grid>

      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography data-testid="issue-email" variant="body2" sx={{ fontFamily: '"PT Sans Narrow", sans-serif' }}>
            <strong>Email:</strong>
            <span style={{ marginLeft: "20px", fontSize: "12px", fontFamily: '"Poppins", sans-serif' }}>[{context?.email}]</span>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Grid container spacing={1} alignItems="center" justifyContent="center">
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
              <IssueStatusDropdown
                data-testid="issue-status-dropdown"
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                statusOptions={[0, 1, 2]}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Typography
        variant="body2"
        sx={{ fontFamily: '"PT Sans Narrow", sans-serif', }}
      >
        <strong>Date Created:</strong>
        <span
          style={{
            marginLeft: "5px",
            fontFamily: '"Poppins", sans-serif',
            fontSize: "12px"
          }}
        >
          [{formatDate(context?.dateCreated)}]
        </span>
      </Typography>
      <Typography
        variant="body2"
        fontWeight="bold"
        sx={{
          fontFamily: '"PT Sans Narrow", sans-serif',
          mt: "12px",
          fontWeight: 700
        }}
      >
        Description
      </Typography>

      <IssueDescriptionBox data-testid="issue-description-box" description={modal.context?.description} />

      <Box display="flex" alignItems="center" my={2} >
        <Divider sx={{ flexGrow: 1, borderColor: "#3B0086", borderBottomWidth: 1, borderBottomStyle: "solid" }} />
        <Typography variant="h6" sx={{ mx: 2, my: "12px", color: "#3B0086", fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 700 }}>
          Support's Section
        </Typography>
        <Divider sx={{ flexGrow: 1, borderColor: "#3B0086", borderBottomWidth: 1, borderBottomStyle: "solid" }} />
      </Box>

      <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 700 }}>
            Support's Notes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SupportTextArea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            data-testid="support-text-area"
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            loading={false}
            sx={submitButtonStyle}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}