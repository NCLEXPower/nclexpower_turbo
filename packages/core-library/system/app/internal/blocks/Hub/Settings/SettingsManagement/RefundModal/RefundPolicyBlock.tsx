import { Box, Grid, Typography } from "@mui/material";
import { textSx } from "../SettingsStyles";
import { gridData, policies, policyConditions } from "./constants";
import { Button, EvaIcon } from "../../../../../../../../components";
import { btnSx, gridBoxSx } from "./RefundModalStyles";

const PolicyGrid = () => {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        bgcolor: "#0F2A710D",
      }}
    >
      <Grid item xs={6} md={3}>
        <Box>
          <Box
            sx={{
              ...gridBoxSx,
              height: { xs: "110px", sm: "90px" },
              textAlign: "center",
            }}
          >
            <Typography sx={{ ...textSx, fontWeight: 700, width: "100%" }}>
              Time Period After Purchase
            </Typography>
          </Box>
          {gridData &&
            !!gridData.length &&
            gridData.map((data, i) => (
              <Box key={i} sx={gridBoxSx}>
                <Box>
                  <EvaIcon name="arrow-right" width={20} height={20} />
                </Box>

                <Typography sx={{ fontSize: "clamp(15px,4vw,20px)" }}>
                  {data.timePeriod}
                </Typography>
              </Box>
            ))}
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <Box>
          <Box
            sx={{
              ...gridBoxSx,
              textAlign: "center",
              width: "100%",
              borderRight: "none",
              height: { xs: "110px", sm: "90px" },
            }}
          >
            <Typography sx={{ ...textSx, width: "100%", fontWeight: 700 }}>
              Refunded Amount
            </Typography>
          </Box>
          {gridData &&
            !!gridData.length &&
            gridData.map((data, i) => (
              <Box
                key={i}
                sx={{
                  ...gridBoxSx,
                  borderRight: "none",
                }}
              >
                <Box>
                  <EvaIcon name="arrow-right" width={20} height={20} />
                </Box>

                <Typography sx={{ fontSize: "clamp(15px,4vw,20px)" }}>
                  {data.amount}
                </Typography>
              </Box>
            ))}
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              ...gridBoxSx,
              borderRight: "none",
              textAlign: "center",
              borderLeft: {
                xs: "none",
                md: "2px solid #0F2A714D",
              },
            }}
          >
            <Typography sx={{ ...textSx, fontWeight: 700, width: "100%" }}>
              Notes and Conditions
            </Typography>
          </Box>
          <Box
            component="ul"
            sx={{
              borderBottom: "2px solid #0F2A714D",
              borderLeft: {
                xs: "none",
                md: "2px solid #0F2A714D",
              },
              padding: "20px 40px",
              paddingBottom: 0,
              flexGrow: 1,
            }}
          >
            {policyConditions &&
              !!policyConditions.length &&
              policyConditions.map((item, i) => (
                <Box
                  key={i}
                  component="li"
                  sx={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <Box sx={{ paddingTop: "3px" }}>
                    <EvaIcon name="arrow-right" width={20} height={20} />
                  </Box>

                  <Typography>{item}</Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

interface RefundPolicyBlockProps {
  closeModal: () => void;
  nextPage: () => void;
}

export const RefundPolicyBlock: React.FC<RefundPolicyBlockProps> = ({
  closeModal,
  nextPage,
}) => {
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
