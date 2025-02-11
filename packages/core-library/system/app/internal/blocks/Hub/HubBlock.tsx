import { Box } from "@mui/material";
import { Alert, Tabs } from "../../../../../components";
import { analyticsContents } from "./AnalyticsBlocks/constants";

export const HubBlock = () => {
  return (
    <Box
      sx={{
        width: "100%",
        paddingX: "20px",

        "& p.MuiTypography-root": {
          fontFamily: "PT Sans",
        },
      }}
    >
      <Alert
        severity="info"
        title="Dashboard"
        description="You can visualize data trends with various charts and filter data by date or category for detailed analysis."
      />
      <div className="relative px-5 font-['Poppin'] mt-16">
        <div className="absolute w-[270px] h-[78px] bg-[#2A61AC2B] left-[20px] top-3 pl-5 pt-1 font-bold text-[20px] text-[#154080] rounded-t-xl">
          Sales Analytics
        </div>
        <div className="absolute w-[220px] h-[78px] bg-[#0C808730] left-[300px] top-3 pl-5 pt-1 font-bold text-[20px] text-[#154080] rounded-t-xl">
          User Data Analytics
        </div>
        <Tabs
          tabsItem={analyticsContents}
          customStyle={{
            background: "linear-gradient(to right, #0F2A71 0%, #181E2F 100%)",
          }}
          tabBtnSx={{
            borderRadius: "16px 16px 0 0",
            minWidth: "80px",
            bgcolor: "white",
          }}
          btnSpacing={0.5}
          separateIndex={2}
          indentBtn={3.5}
          contentPaddingTop={0}
        />
      </div>
    </Box>
  );
};
