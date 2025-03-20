import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography, Divider, SelectChangeEvent } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ImageUploader, Button, IconButton } from "../../../../../../components";
import { SupportTextArea } from "./SupportTextArea";
import { IssueDescriptionBox } from "./IssueDescriptionBox";
import { IssueStatusDropdown } from "./IssueStatusDropdown";
import { UpdateStatusParams } from "../../../../../../api/types";
import { useApiCallback } from "../../../../../../hooks";
import { useExecuteToast } from "../../../../../../contexts";
import { submitButtonStyle, modalContainerStyle, iconButtonStyle } from "./style";

interface IssueDetailsModalProps {
  modal: {
    isOpen: boolean;
    context?: { email: string; reference: string; description: string; dateCreated: string; status: string };
  };
  onClose: () => void;
  onStatusChange: (reference: string, newStatus: string) => void;
}

export const IssueDetailsModal: React.FC<IssueDetailsModalProps> = ({ modal, onClose, onStatusChange }) => {
  const { isOpen, context } = modal;
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const notesRef = useRef<HTMLTextAreaElement>(null);
  const { showToast } = useExecuteToast();
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !context) return null;

  const statusMapping: Record<string, 0 | 1 | 2> = {
    "To Be Reviewed": 0,
    "In Review": 1,
    "Resolved": 2,
  };

  const updateStatusCb = useApiCallback((api, params: UpdateStatusParams) =>
    api.webbackoffice.updateStatus(params)
  );

  useEffect(() => {
    if (context?.status) {
      setSelectedStatus(context.status);
    }
  }, [context?.status]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
    }
  }, [isOpen]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = async () => {
    const currentNotes = notesRef.current?.value || ""; 
    const statusNumber = statusMapping[selectedStatus];
  
    if (!context?.reference) {
      showToast("Reference number is missing.", "error");
      return;
    }

    if (typeof statusNumber === 'undefined') {
      showToast("Please select a valid status.", "error");
      return;
    }
  
    try {
      updateStatusCb.loading;

      const imageProof = selectedImage ? selectedImage : undefined;

      const payload: UpdateStatusParams = {
        Notes: currentNotes,
        RefNo: context.reference,
        UpdateStatus: statusNumber,
        Proof: imageProof
      };
  
      await updateStatusCb.execute(payload);  
      onStatusChange(context.reference, selectedStatus);
      onClose();
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
            <span style={{ marginLeft: "40px", fontSize: "12px", fontFamily: '"Poppins", sans-serif' }}>[{context?.email}]</span>
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
                statusOptions={["To Be Reviewed", "In Review", "Resolved"]}
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
          [{context?.dateCreated}]
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
        <Typography variant="h6" sx={{ mx: 2, my:"12px", color: "#3B0086", fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 700 }}>
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
            key="support-text-area"
            data-testid="support-text-area"
            placeholder="Enter notes..."
            defaultValue=""
            ref={notesRef}
          />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            loading={isLoading}
            sx={submitButtonStyle}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}