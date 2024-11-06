/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React, { useMemo } from "react";
import { Box } from "@mui/material";
import { TabOption, TabPanel, TabsDesktop } from "../../../../../../components";
import { AllSale } from "./All-Sale";
import { RNSale } from "./RN-Sale";
import { PNSale } from "./PN-Sale";

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
      <Box
        sx={{
          borderBottom: "2px solid #182038",
          width: "18.7%",
          position: "relative",
          top: "48px",
        }}
      ></Box>
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
        }}
      />

      {tabs.map((tab, idx) => (
        <TabPanel index={idx}>{tab.content}</TabPanel>
      ))}
    </Box>
  );
};
