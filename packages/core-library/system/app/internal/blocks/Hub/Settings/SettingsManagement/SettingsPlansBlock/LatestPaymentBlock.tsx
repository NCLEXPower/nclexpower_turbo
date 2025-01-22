import { Box, Typography } from "@mui/material";
import { blockSx, boxHeaderSx, titleSx } from "../SettingsStyles";
import Image from "next/image";
import { latestPaymentItems } from "./constants";
import { LatestPaymentItem, Payment } from "../types";

interface LatestPaymentBlockProps {
  latestPayment: Payment;
}

export const LatestPaymentBlock: React.FC<LatestPaymentBlockProps> = ({
  latestPayment,
}) => {
  const { paymentDate, planType, cardUsed, totalPayment } = latestPayment;

  const labelToValueMap: Record<LatestPaymentItem["label"], string> = {
    "Payment Date": paymentDate,
    "Type of Plan": planType,
    "Card Used to Pay": cardUsed,
    "Total Payment": `$${totalPayment.toFixed(2)}`,
  };

  const items = latestPaymentItems.map((item) => ({
    ...item,
    value: labelToValueMap[item.label] || "",
  }));

  return (
    <Box
      className="flex flex-col"
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
          Latest Payment
        </Typography>
      </Box>
      <Box
        sx={{
          paddingX: {
            xs: "10px",
            sm: "40px",
          },
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <ul>
          {items.length &&
            items.map((item) => (
              <li key={item.id}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                    paddingY: "10px",
                    minHeight: "80px",
                    borderBottom: "2px solid #0F2A7133",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "'PT Sans','sans-serif'",
                      fontWeight: 700,
                      fontSize: {
                        xs: "15px",
                        sm: "20px",
                      },
                      color: "#3333334D",
                    }}
                  >
                    {item.label}
                  </Typography>
                  <div className="flex items-center gap-2">
                    {item.icon && (
                      <Image
                        src={item.icon}
                        alt="visa icon"
                        width={56}
                        height={40}
                      />
                    )}
                    <Typography
                      sx={{
                        fontFamily: "'PT Sans','sans-serif'",
                        fontWeight: 700,
                        fontSize: {
                          xs: "15px",
                          sm: "20px",
                        },
                        color: "#333333",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.value}
                    </Typography>
                  </div>
                </Box>
              </li>
            ))}
        </ul>
      </Box>
    </Box>
  );
};
