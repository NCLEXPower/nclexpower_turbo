import { Box, Typography } from "@mui/material";
import { sectionSx, subtitleSx, titleSx } from "../SettingsStyles";
import { PasswordAndSecurityBlock } from "./PasswordAndSecurityBlock";
import { ThisDeviceBlock } from "./ThisDeviceBlock";
import { ActiveSessionsBlock } from "./ActiveSessionsBlock";
import { EvaIcon } from "../../../../../../../../components";
import { ActiveSession } from "../types";

const thisDeviceMockData: Omit<ActiveSession, "lastActive"> = {
  device: "Macbook Pro",
  location: "Manila, Philippines",
  icon: <EvaIcon name="monitor-outline" />,
};

const activeSessionsMockData: ActiveSession[] = [
  {
    device: "iPhone 11",
    location: "Manila, Philippines",
    lastActive: "2 hours ago",
    icon: <EvaIcon name="smartphone-outline" />,
  },
  {
    device: "Samsung A30",
    location: "Paombong, Philippines",
    lastActive: "09/11/24",
    icon: <EvaIcon name="smartphone-outline" />,
  },
];

interface SettingsSecurityBlockProps {
  title: string;
  subtitle: string;
}

export const SettingsSecurityBlock: React.FC<SettingsSecurityBlockProps> = ({
  title,
  subtitle,
}) => {
  return (
    <Box component="section" sx={sectionSx}>
      <Box className="flex flex-col mb-8">
        <Typography variant="h3" sx={titleSx}>
          {title}
        </Typography>
        <Typography sx={subtitleSx}>{subtitle}</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        <PasswordAndSecurityBlock />
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
              lg: "column",
            },
            justifyContent: "space-between",
            gap: "20px",
          }}
        >
          <ThisDeviceBlock thisDeviceData={thisDeviceMockData} />
          <ActiveSessionsBlock activeSession={activeSessionsMockData} />
        </Box>
      </Box>
    </Box>
  );
};
