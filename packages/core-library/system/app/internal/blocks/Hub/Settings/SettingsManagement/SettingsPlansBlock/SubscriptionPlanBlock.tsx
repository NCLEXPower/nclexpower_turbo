import { Box, Typography } from "@mui/material";
import { blockSx, boxHeaderSx, titleSx } from "../SettingsStyles";
import { Button, EvaIcon } from "../../../../../../../../components";
import { buttonSx, pNCard } from "./subscriptionPlanStyles";
import { plans } from "./constants";

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
        {plans.length &&
          plans.map((plan, index) => {
            const {
              abbr,
              planName,
              planType,
              duration,
              price,
              currency,
              registered,
            } = plan;

            return (
              <Box
                key={index}
                sx={{
                  ...pNCard,
                  ...(registered
                    ? {
                        border: "2px solid #084A4E",
                        backgroundColor: "#FFF",
                        position: "relative",
                      }
                    : {
                        color: "#FFF",
                      }),
                }}
              >
                {registered && (
                  <>
                    <div className="absolute h-6 w-6 bg-white -right-3 -top-2 rounded-full" />
                    <Box
                      sx={{
                        position: "absolute",
                        right: "-20px",
                        top: "-15px",
                      }}
                    >
                      <EvaIcon
                        name="checkmark-circle-2"
                        fill="#084A4E"
                        width={40}
                        height={40}
                        style={{ zIndex: 1 }}
                      />
                    </Box>
                  </>
                )}
                <Box className="flex justify-between items-center whitespace-nowrap">
                  <Typography
                    variant="h4"
                    sx={{
                      display: "inline-flex",
                      gap: "10px",
                      alignItems: "center",
                      fontFamily: "'Poppins','PT Sans','sans-serif'",
                      fontSize: "clamp(30px, 2vw, 48px)",
                      color: registered ? "#333333" : "#FFF",
                      fontWeight: 700,
                    }}
                  >
                    {abbr} |
                    <Typography
                      sx={{
                        color: registered ? "#333333B2" : "#FFFFFFCC",
                        fontFamily: "'PT Sans','sans-serif'",
                        fontSize: "clamp(14px, 2vw, 24px)",
                      }}
                    >
                      {planName}
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
                    {currency}
                    {price.toString()}/
                    <Typography
                      sx={{
                        color: registered ? "#232323" : "#FFFFFFCC",
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
                  {duration.toString()} Days ({planType})
                </Typography>
                {registered ? (
                  <Button
                    sx={{
                      ...buttonSx,
                      marginTop: "auto",
                      maxWidth: {
                        xs: "170px",
                        sm: "200px",
                      },
                      backgroundColor: "#084A4E",
                      color: "#FFF",
                    }}
                  >
                    Cancel Subscription
                  </Button>
                ) : (
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
                        ...buttonSx,
                        maxWidth: {
                          xs: "80px",
                          sm: "110px",
                        },
                        backgroundColor: "#FFF",
                        color: "#084A4E",
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
                )}
              </Box>
            );
          })}
      </Box>
    </Box>
  );
};
