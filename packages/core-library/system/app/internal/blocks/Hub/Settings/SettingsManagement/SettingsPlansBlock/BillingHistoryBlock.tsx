import { Box, Typography } from "@mui/material";
import { blockSx, boxHeaderSx, titleSx } from "../SettingsStyles";
import { Button } from "../../../../../../../../components";
import { billingHistoryItems, billingHistoryItemsHeader } from "./constants";
import { BillingHistoryItem } from "../types";

interface BillingHistoryBlockProps {
  items: BillingHistoryItem[];
}

export const BillingHistoryBlock: React.FC<BillingHistoryBlockProps> = ({
  items,
}) => {
  return (
    <Box
      sx={{
        ...blockSx,
        flexGrow: 1,
        minHeight: "500px",
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
          Billing History
        </Typography>
      </Box>
      <Box
        sx={{
          paddingTop: "50px",
          paddingX: {
            xs: "10px",
            sm: "40px",
          },
        }}
      >
        <Box
          sx={{
            display: "fex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            backgroundColor: "#0F2A711A",
            paddingX: {
              xs: "10px",
              sm: "20px",
            },
          }}
        >
          {billingHistoryItemsHeader.length &&
            billingHistoryItemsHeader.map((item) => (
              <Typography
                key={item}
                sx={{
                  fontSize: {
                    xs: "15px",
                    sm: "20px",
                  },
                  fontWeight: "700",
                  color: "#33333380",
                  fontFamily: "'PT Sans','sans-serif'",
                }}
              >
                {item}
              </Typography>
            ))}
        </Box>
        <Box component="ul">
          {items.length &&
            items.map((item) => (
              <Box
                component="li"
                key={item.orderId}
                className="flex justify-between items-center h-16 border-b border-b-[#0F2A71/10]"
                sx={{
                  display: "fex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "60px",
                  borderBottom: "2px solid #0F2A711A",
                  paddingX: {
                    xs: "10px",
                    sm: "20px",
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'PT Sans','sans-serif'",
                    fontWeight: 400,
                    fontSize: {
                      xs: "12px",
                      sm: "18px",
                    },
                  }}
                >
                  {item.orderId}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'PT Sans','sans-serif'",
                    fontWeight: 400,
                    fontSize: {
                      xs: "12px",
                      sm: "18px",
                    },
                  }}
                >
                  {item.date}
                </Typography>
                <div className="flex items-center justify-center">
                  <Button
                    sx={{
                      minHeight: "30px",
                      minWidth: "65px",
                      padding: 0,
                      borderRadius: "4px",
                      backgroundColor: "#0F2A71",
                      boxShadow: "none",
                      fontFamily: "'PT Sans','sans-serif'",
                      fontSize: "16px",
                      color: "#FFF",
                      fontWeight: 700,
                    }}
                  >
                    View
                  </Button>
                </div>
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
