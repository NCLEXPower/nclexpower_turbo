import { Box, SxProps, Typography } from "@mui/material";
import { blockSx, boxHeaderSx, titleSx } from "../SettingsStyles";
import { Button } from "../../../../../../../../components";

const pNCard: SxProps = {
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  borderRadius: "15px",
  padding: {
    xs: "15px",
    sm: "25px",
  },
  minHeight: {
    xs: "150px",
    sm: "200px",
    lg: "250px",
  },
  minWidth: {
    xs: "320px",
    sm: "500px",
  },
  maxWidth: "600px",
};

export const SubscriptionPlanBlock = () => {
  return (
    <Box sx={blockSx}>
      <Box sx={boxHeaderSx}>
        <Typography
          component="h4"
          sx={{
            ...titleSx,
            fontSize: "20px",
          }}
        >
          Subscription Plan
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          padding: {
            xs: "10px",
            lg: "50px",
          },
        }}
      >
        <Box
          sx={{
            ...pNCard,
            border: "2px solid #084A4E",
            backgroundColor: "#FFF",
          }}
        >
          <Box className="flex justify-between items-center whitespace-nowrap">
            <Typography
              variant="h4"
              sx={{
                display: "inline-flex",
                gap: "10px",
                alignItems: "center",
                fontFamily: "'Poppins','PT Sans','sans-serif'",
                fontSize: "clamp(30px, 2vw, 48px)",
                color: "#333333",
                fontWeight: 700,
              }}
            >
              PN |
              <Typography
                sx={{
                  color: "#333333B2",
                  fontFamily: "'PT Sans','sans-serif'",
                  fontSize: "clamp(14px, 2vw, 24px)",
                }}
              >
                Practical Nurse
              </Typography>
            </Typography>

            <Typography
              sx={{
                display: "inline-flex",
                fontFamily: "'PT Sans','sans-serif'",
                fontSize: "clamp(14px, 2vw, 24px)",
                fontWeight: 700,
              }}
            >
              $180/
              <Typography
                sx={{
                  color: "#232323",
                  fontSize: "clamp(14px, 2vw, 24px)",
                  fontWeight: 500,
                }}
              >
                days
              </Typography>
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "'PT Sans','sans-serif'",
              fontSize: "clamp(15px, 2vw, 20px)",
              fontWeight: 400,
            }}
          >
            8 Days (Fast Track)
          </Typography>
          <Button
            sx={{
              marginTop: "auto",
              maxWidth: {
                xs: "170px",
                sm: "200px",
              },
              minHeight: {
                xs: "35px",
                sm: "45px",
              },
              backgroundColor: "#084A4E",
              borderRadius: "10px",
              boxShadow: "none",
              fontSize: "clamp(15px, 2vw, 20px)",
              fontWeight: 700,
              color: "#FFF",
              fontFamily: "'PT Sans','sans-serif'",
            }}
          >
            Cancel Subscription
          </Button>
        </Box>
        <Box
          sx={{
            ...pNCard,
            backgroundColor: "#084A4E",
            color: "#FFF",
          }}
        >
          <Box className="flex justify-between items-center nowrap">
            <Typography
              variant="h4"
              sx={{
                display: "inline-flex",
                gap: "10px",
                alignItems: "center",
                fontFamily: "'Poppins','PT Sans','sans-serif'",
                fontSize: "clamp(30px, 2vw, 48px)",
                color: "#FFF",
                fontWeight: 700,
              }}
            >
              PN |
              <Typography
                sx={{
                  color: "#FFFFFFCC",
                  fontFamily: "'PT Sans','sans-serif'",
                  fontSize: "clamp(14px, 2vw, 24px)",
                }}
              >
                Practical Nurse
              </Typography>
            </Typography>

            <Typography
              sx={{
                display: "inline-flex",
                fontFamily: "'PT Sans','sans-serif'",
                fontSize: "clamp(14px, 2vw, 24px)",
                fontWeight: 700,
              }}
            >
              $230/
              <Typography
                sx={{
                  color: "#FFFFFFCC",
                  fontSize: "clamp(14px, 2vw, 24px)",
                  fontWeight: 500,
                }}
              >
                days
              </Typography>
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: "'PT Sans','sans-serif'",
              fontSize: "clamp(15px, 2vw, 20px)",
              fontWeight: 400,
            }}
          >
            23 Days (Standard)
          </Typography>
          <Box
            sx={{
              marginTop: "auto",
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Button
              sx={{
                maxWidth: {
                  xs: "80px",
                  sm: "110px",
                },
                minHeight: {
                  xs: "35px",
                  sm: "45px",
                },
                backgroundColor: "#FFF",
                borderRadius: "10px",
                boxShadow: "none",
                fontSize: "clamp(15px, 2vw, 20px)",
                fontWeight: 700,
                color: "#084A4E",
                fontFamily: "'PT Sans','sans-serif'",
              }}
            >
              Upgrade
            </Button>
            <Typography
              sx={{
                fontFamily: "'PT Sans','sans-serif'",
                fontWeight: 400,
                fontSize: "clamp(12px, 2vw, 20px)",
              }}
            >
              Learn more about this plan
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
