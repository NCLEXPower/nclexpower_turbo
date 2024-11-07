/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { TabOption, TabPanel, TabsDesktop } from "../../../../../../components";
import { PNSale, AllSale, RNSale } from "./index";

export const SalesManagementBlock: React.FC = ({}) => {
  const tabs = useMemo<Array<TabOption>>(
    () => [
      {
        key: "All",
        content: <AllSale />,
      },
      {
        key: "RN",
        content: <RNSale />,
      },
      {
        key: "PN",
        content: <PNSale />,
      },
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ ml: { xs: 4, sm: 4, md: 0 } }}>
        <TabsDesktop
          tabs={tabs}
          sx={{
            borderRadius: "20px 20px 0px 0px",
            color: "#182038",
            height: 10,

            "&.Mui-selected": {
              color: "white",
              background: "linear-gradient(to right, #181E2F, #0F2A71)",
            },
            borderBottom: "2px solid #182038",
          }}
        />
      </Box>
      {tabs.map((tab, idx) => (
        <TabPanel index={idx}>{tab.content}</TabPanel>
      ))}
    </Box>
  );
};
