import { Box, Switch, Typography } from "@mui/material";
import { Button, EvaIcon } from "../../../../../../../../components";
import { blockSx, boxHeaderSx, titleSx } from "../SettingsStyles";
import { btnSx, switchSx } from "./passwordAndSecurityStyles";
import { passwordAndSecurityItems } from "./constants";

export const PasswordAndSecurityBlock = () => {
  return (
    <Box
      sx={{
        ...blockSx,
        flexGrow: 1,
        minWidth: {
          md: "600px",
        },
        height: {
          lg: "600px",
        },
      }}
    >
      <Box sx={boxHeaderSx}>
        <Typography
          component="h4"
          sx={{
            ...titleSx,
            fontSize: "20px",
          }}
        >
          Password & Security
        </Typography>
      </Box>
      <Box
        className="p-10 sm:px-20 flex flex-col justify-between gap-10"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingY: "50px",
          paddingX: {
            xs: "10px",
            sm: "50px",
          },
        }}
      >
        <Box
          component="ul"
          sx={{
            backgroundColor: "#FFF",
            borderRadius: "10px",
          }}
        >
          {passwordAndSecurityItems.length &&
            passwordAndSecurityItems.map((item) => (
              <Box
                key={item.id}
                component="li"
                sx={{
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  paddingY: "10px",
                  paddingX: "20px",
                  borderBottom: "1px solid #33333333",
                  ...(item.id === passwordAndSecurityItems.length && {
                    borderBottom: "none",
                  }),
                  ...(!item.icon && {
                    paddingLeft: "55px",
                  }),
                }}
              >
                {item.icon && <EvaIcon name={item.icon} />}
                <Box sx={{ marginRight: "auto" }}>
                  <Typography
                    sx={{
                      fontFamily: "'PT Sans','sans-serif'",
                      fontWeight: 700,
                      fontSize: "clamp(15px,4vw,20px)",
                    }}
                  >
                    {item.label}
                  </Typography>
                  {item.subLabel && (
                    <Typography
                      sx={{
                        fontFamily: "'PT Sans','sans-serif'",
                        fontSize: "clamp(12px,4vw,18px)",
                        color: "#333333B2",
                      }}
                    >
                      {item.subLabel}
                    </Typography>
                  )}
                </Box>

                {item.isBtn ? (
                  <Button
                    sx={{
                      ...btnSx,
                      ...(item.btnLabel === "Update" && {
                        backgroundColor: "#0F2A71",
                        color: "#FFF",
                      }),
                    }}
                  >
                    {item.btnLabel}
                  </Button>
                ) : (
                  <Box sx={{ width: "80px" }}>
                    <Switch sx={switchSx} />
                  </Box>
                )}
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
