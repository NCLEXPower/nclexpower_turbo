import { Box, Stack, Typography } from "@mui/material";
import { Button, TextField } from "../../../../../../../../../components";

interface RemoveSectionProps {
  closeModal: () => void;
  sectionId: string;
  sectionTitle: string;
  onSubmit: (sectionId: string) => void;
  isLoading: boolean;
}

export const RemoveSection: React.FC<RemoveSectionProps> = ({
  closeModal,
  sectionTitle,
  sectionId,
  onSubmit,
  isLoading,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "#D40000",
          px: 4,
          py: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontSize: "18px",
            color: "white",
          }}
        >
          Delete Section Data
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          mt: 4,
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontFamily: "'PT Sans Narrow', sans-serif",
            fontSize: "18px",
            color: "#393939",
            textAlign: "center",
          }}
        >
          Are you sure you want to delete this section data? <br /> [
          {sectionTitle}]
        </Typography>
        <Box sx={{ px: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          <Stack direction="row" spacing={4} mt={4}>
            <Button
              sx={{
                background: "#B0B0B0",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#3090dc",
                },
              }}
              fullWidth
              variant="contained"
              loading={isLoading}
              onClick={() => onSubmit(sectionId)}
            >
              Delete
            </Button>
            <Button
              sx={{
                background: "#D40000",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#000000",
                  color: "#ffffff",
                },
              }}
              fullWidth
              variant="contained"
              onClick={closeModal}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
