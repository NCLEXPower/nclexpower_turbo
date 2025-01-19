import { Box, Typography } from "@mui/material";
import { blockSx, boxHeaderSx, textSx, titleSx } from "../SettingsStyles";
import { EvaIcon } from "../../../../../../../../components";

interface ThisDeviceBlockProps {
  device: string;
  location: string;
  icon: React.ReactNode;
}
export const ThisDeviceBlock: React.FC<ThisDeviceBlockProps> = ({
  device,
  location,
  icon,
}) => {
  return (
    <Box
      sx={{
        ...blockSx,
        flexGrow: 1,
        "@media (min-width: 1200px)": {
          flexGrow: 0,
          width: "410px",
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
          This Device
        </Typography>
      </Box>
      <Box sx={{ padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            gap: "20px",
            minHeight: "90px",
            paddingY: "10px",
            marginBottom: "20px",
            borderBottom: "1px solid #0F2A7180",
          }}
        >
          <Box>{icon}</Box>
          <Box sx={{ marginRight: "auto" }}>
            <Typography
              sx={{
                ...textSx,
                fontWeight: 700,
                marginBottom: "10px",
              }}
            >
              {device}
            </Typography>
            <Typography
              sx={{
                ...textSx,
                fontSize: "16px",
                fontWeight: 500,
                color: "#3333334D",
              }}
            >
              {location} • Online
            </Typography>
          </Box>
          <EvaIcon name="more-vertical" style={{ alignSelf: "center" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <EvaIcon name="alert-triangle-outline" fill="#FF3333" />
          <Typography sx={{ ...textSx, color: "#FF3333", fontWeight: 700 }}>
            Terminate all other sessions
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
