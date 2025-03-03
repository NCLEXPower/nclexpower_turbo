import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Divider,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddIcon from "@mui/icons-material/Add";
import { SupportTextArea } from "./SupportTextArea";
import { IssueDescriptionBox } from "./IssueDescriptionBox";
import { IssueImageUploader } from "./IssueImageUploader";
import { IssueStatusDropdown } from "./IssueStatusDropdown";

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
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

  const handleSubmit = () => {
    if (context?.reference) {
      onStatusChange(context.reference, selectedStatus);
    }
    onClose();
  };

  if (!modal.isOpen || !modal.context) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "550px",
        bgcolor: "#F2F2F2",
        color: "#3B0086",
        p: 8,
        pr: 12,
        boxShadow: 8,
        borderRadius: "8px",
        overflow: "hidden",
        "& > *": { mb: 1 },
      }}
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
          sx={{
            width: 20,
            height: 20,
            border: "3px solid #3B0086",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            outline: "none !important",
            "&:focus, &:focus-visible, &:focus-within": {
              outline: "none !important",
              boxShadow: "none",
            },
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
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
          <Typography variant="body2" sx={{ fontFamily: '"PT Sans Narrow", sans-serif' }}>
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

      <IssueDescriptionBox description={modal.context?.description} />

      <Box display="flex" alignItems="center" my={2} >
        <Divider sx={{ flexGrow: 1, borderColor: "#3B0086", borderBottomWidth: 1, borderBottomStyle: "solid" }} />
        <Typography variant="h6" sx={{ mx: 2, my:"12px", color: "#3B0086", fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 700 }}>
          Support's Section
        </Typography>
        <Divider sx={{ flexGrow: 1, borderColor: "#3B0086", borderBottomWidth: 1, borderBottomStyle: "solid" }} />
      </Box>

      <IssueImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ fontFamily: '"PT Sans Narrow", sans-serif', fontWeight: 700 }}>
            Support's Notes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <SupportTextArea placeholder="Enter notes..." />
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#3B0086",
              color: "#FFFFFF",
              width: "130px",
              height: "45px",
              minHeight: "45px",
              padding: "0px 8px",
              fontSize: "16px",
              fontWeight: 500,
              fontFamily: '"PT Sans Narrow", sans-serif',
              textTransform: "none",
              borderRadius: "6px",
              transition: "background-color 0.3s ease",
              "&:focus, &:focus-visible, &:focus-within": {
                outline: "none !important",
                boxShadow: "none !important",
              },
              "&:hover": {
                backgroundColor: "#31006E",
              },
            }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}