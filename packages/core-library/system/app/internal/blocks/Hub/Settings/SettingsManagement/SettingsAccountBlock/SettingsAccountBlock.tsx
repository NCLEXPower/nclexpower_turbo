import { Box, Typography } from "@mui/material";
import { sectionSx, subtitleSx, titleSx } from "../SettingsStyles";
import { PersonalInformationBlock } from "./PersonalInformationBlock";
import { GoogleBlock } from "./GoogleBlock";
import { DeleteAccountBlock } from "./DeleteAccountBlock";
import { useSensitiveInformation } from "../../../../../../../../hooks";

interface SettingAccountBlockProps {
  title: string;
  subtitle: string;
}

export const SettingsAccountBlock: React.FC<SettingAccountBlockProps> = ({
  title,
  subtitle,
}) => {
  const { customer } = useSensitiveInformation();

  return (
    <Box component="section" sx={sectionSx}>
      <Box className="flex flex-col mb-8">
        <Typography component="h3" sx={titleSx}>
          {title}
        </Typography>
        <Typography component="p" sx={subtitleSx}>
          {subtitle}
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
          gap: "20px",
        }}
      >
        <PersonalInformationBlock userInfo={customer} />
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
          <GoogleBlock />
          <DeleteAccountBlock />
        </Box>
      </Box>
    </Box>
  );
};
