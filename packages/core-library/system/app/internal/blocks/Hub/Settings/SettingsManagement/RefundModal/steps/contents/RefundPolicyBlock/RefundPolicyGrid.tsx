import { Box, Grid, Typography } from "@mui/material";
import { gridBoxSx } from "../../../RefundModalStyles";
import { textSx } from "../../../../SettingsStyles";
import { gridData, policyConditions } from "../../../constants";
import { EvaIcon } from "../../../../../../../../../../../components";

interface Props {
  forTNC?: boolean;
}

export const PolicyGrid: React.FC<Props> = ({ forTNC = false }) => {
  console.log(forTNC);
  return (
    <Grid
      container
      sx={{
        width: "100%",
        minWidth: forTNC ? "630px" : "",
        bgcolor: "#0F2A710D",
      }}
    >
      <Grid item xs={forTNC ? 3 : 6} md={3}>
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

                <Typography sx={{ fontSize: "clamp(15px,4vw,18px)" }}>
                  {data.timePeriod}
                </Typography>
              </Box>
            ))}
        </Box>
      </Grid>
      <Grid item xs={forTNC ? 3 : 6} md={3}>
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

                <Typography sx={{ fontSize: "clamp(15px,4vw,18px)" }}>
                  {data.amount}
                </Typography>
              </Box>
            ))}
        </Box>
      </Grid>
      <Grid item xs={forTNC ? 6 : 12} md={6}>
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
              height: { xs: "110px", sm: "90px" },
              borderLeft: {
                xs: forTNC ? "2px solid #0F2A714D" : "none",
                md: "2px solid #0F2A714D",
                lg: "2px solid #0F2A714D",
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
                xs: forTNC ? "2px solid #0F2A714D" : "none",
                md: "2px solid #0F2A714D",
                lg: "2px solid #0F2A714D",
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
