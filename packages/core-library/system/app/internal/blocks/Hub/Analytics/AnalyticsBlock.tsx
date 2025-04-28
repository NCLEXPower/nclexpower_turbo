/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box } from "@mui/material";
import { TabPanel, TabsDesktop } from "../../../../../../components";
import { contentBgColor, contentTopBox, getTabSx } from "./AnalyticsStyles";
import { analyticsTabs } from "./constants";

export const AnalyticsBlock: React.FC = ({}) => {
  return (
    <Box sx={{ width: "100%", paddingX: "20px" }}>
      <Box sx={{ mt: "50px", position: "relative" }}>
        <Box
          sx={{
            ...contentTopBox,
            bgcolor: contentBgColor.sales,
            color: "#154080",
            width: "315px",
          }}
        >
          Sales Analytics
        </Box>
        <Box
          sx={{
            ...contentTopBox,
            bgcolor: contentBgColor.users,
            color: "#13565A",
            width: "250px",
            left: "320px",
          }}
        >
          User Data Analytics
        </Box>
        <TabsDesktop
          tabs={analyticsTabs}
          indentIndex={2}
          tabsSx={{
            mb: 0,
            pl: "20px",
            "& .MuiTabs-indicator": {
              display: "none",
            },
          }}
          getTabSx={getTabSx}
        />
      </Box>

      {!!analyticsTabs.length &&
        analyticsTabs.map((tab, idx) => (
          <TabPanel key={tab.key} index={idx}>
            {tab.content}
          </TabPanel>
        ))}
    </Box>
  );
};
