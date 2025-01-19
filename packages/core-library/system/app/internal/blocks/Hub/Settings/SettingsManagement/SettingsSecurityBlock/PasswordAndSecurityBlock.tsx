import { Box, Switch, SxProps, Typography } from "@mui/material";
import { Button, EvaIcon } from "../../../../../../../../components";
import { blockSx, boxHeaderSx, titleSx } from "../SettingsStyles";

type PasswordAndSecurityItem = {
  id: number;
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  isBtn?: boolean;
  btnLabel?: string;
};

const btnSx: SxProps = {
  minWidth: "95px",
  minHeight: "40px",
  borderRadius: "5px",
  padding: 0,
  fontSize: "20px",
  fontWeight: 700,
  backgroundColor: "#FFF",
  boxShadow: "none",
  border: "1px solid #0F2A71",
  color: "#0F2A71",
};

const switchSx: SxProps = {
  width: 60,
  height: 30,
  padding: 0,
  marginX: "auto",
  borderRadius: "50px",
  "& .MuiSwitch-track": {
    width: 60,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#ccc",
    opacity: 1,
  },
  "& .MuiSwitch-thumb": {
    width: 30,
    height: 30,
  },
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 0,
    top: "50%",
    transform: "translateY(-50%)",
    "&.Mui-checked": {
      transform: "translateY(-50%) translateX(30px)",
    },
  },
};

const passwordAndSecurityItems: PasswordAndSecurityItem[] = [
  {
    id: 1,
    label: "Change Password",
    icon: <EvaIcon name="lock-outline" />,
    isBtn: true,
    btnLabel: "Update",
  },
  {
    id: 2,
    label: "Two-Factor Authentication",
    icon: <EvaIcon name="shield-outline" />,
    isBtn: false,
  },
  {
    id: 3,
    label: "Authentication App",
    subLabel: "Google auth app",
    isBtn: true,
    btnLabel: "Setup",
  },
  {
    id: 4,
    label: "Primary Email",
    subLabel: "E-mail used to send notifications",
    isBtn: true,
    btnLabel: "Setup",
  },
];

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
          {passwordAndSecurityItems.map((item) => (
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
              {item.icon && item.icon}
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
