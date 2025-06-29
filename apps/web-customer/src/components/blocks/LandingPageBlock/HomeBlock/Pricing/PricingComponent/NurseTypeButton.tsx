import { PriceButtonDetails } from "@/constants/constants";
import { Box, Typography } from "@mui/material";

/**
 *
 * @description - Please improve this code as before's design. thanks
 */
export const NurseTypeButton: React.FC<{
  item: (typeof PriceButtonDetails)[0];
  isSelected: boolean;
  onClick: () => void;
}> = ({ item, isSelected, onClick }) => {
  const bgColor = isSelected
    ? item.value === 1
      ? "#08474b"
      : "#0c225c"
    : "#9a9a9a";

  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        height: 80,
        width: 288,
        bgcolor: bgColor,
        color: "white",
        py: 5,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        px: 5,
        gap: 2,
        textAlign: "left",
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      aria-label={`Filter by ${item.label}`}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, fontFamily: "Poppins", color: "white" }}
      >
        {item.acronym} |
      </Typography>
      <Typography
        variant="h6"
        sx={{ fontFamily: "PT Sans Narrow", color: "white" }}
      >
        {item.label}
      </Typography>
    </Box>
  );
};
