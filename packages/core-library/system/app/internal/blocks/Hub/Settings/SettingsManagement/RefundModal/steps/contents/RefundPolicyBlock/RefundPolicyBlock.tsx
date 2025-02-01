import { Box, Typography } from "@mui/material";
import { textSx } from "../../../../SettingsStyles";
import { policies } from "../../../constants";
import { Button, EvaIcon } from "../../../../../../../../../../../components";
import { PolicyGrid } from "./RefundPolicyGrid";
import { btnSx } from "../../../RefundModalStyles";

interface RefundPolicyBlockProps {
  next: () => void;
  closeModal: () => void;
  nextStep(values: {}): void;
}

export const RefundPolicyBlock: React.FC<RefundPolicyBlockProps> = ({
  next,
  nextStep,
  closeModal,
}) => {
  const nextPage = () => {
    nextStep({});
    next();
  };

  return (
    <Box data-testid="policy-block">
      <Typography
        component="h3"
        sx={{ ...textSx, fontWeight: 700, fontSize: "38px" }}
      >
        Refund Policy
      </Typography>
      <Box
        component="ul"
        sx={{
          padding: {
            xs: "10px",
            sm: "20px",
          },
        }}
        className="space-y-10"
      >
        {!!policies.length &&
          policies.map((item, i) => (
            <Box key={i} component="li">
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Box sx={{ paddingTop: "3px" }}>
                  <EvaIcon name="arrow-right" width={20} height={20} />
                </Box>

                <Typography sx={{ fontSize: "clamp(15px,2vw,20px)" }}>
                  {item.value}
                </Typography>
              </Box>
              {item.hasTable && (
                <Box
                  sx={{
                    overflow: "auto",
                    marginLeft: {
                      xs: 0,
                      sm: "30px",
                    },
                    marginTop: "40px",
                  }}
                >
                  <PolicyGrid />
                </Box>
              )}
            </Box>
          ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={closeModal}
          variant="outlined"
          sx={{
            ...btnSx,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={nextPage}
          sx={{
            ...btnSx,
            border: "none",
            minWidth: "230px",
            bgcolor: "#FF0000",
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};
