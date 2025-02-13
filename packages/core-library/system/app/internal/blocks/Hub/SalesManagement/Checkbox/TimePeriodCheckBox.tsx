import { Box, Typography } from "@mui/material";
import { timePeriod } from "../constants";
import { PeriodType } from "../../../../../../../hooks/usePeriodTime";
import { Checkbox } from "../../../../../../../components";

interface Props {
  selectedPeriod: PeriodType;
  handlePeriodChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TimePeriodCheckboxes: React.FC<Props> = ({
  selectedPeriod,
  handlePeriodChange,
}) => {
  console.log(selectedPeriod);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontWeight: "bold",
          marginLeft: "30px",
          marginRight: "10px",
        }}
      >
        Time Period:
      </Typography>
      {timePeriod.map((label) => (
        <Checkbox
          key={label}
          label={label}
          value={label.toLowerCase()}
          onChange={handlePeriodChange}
          checked={selectedPeriod === label.toLowerCase()}
        />
      ))}
    </Box>
  );
};
