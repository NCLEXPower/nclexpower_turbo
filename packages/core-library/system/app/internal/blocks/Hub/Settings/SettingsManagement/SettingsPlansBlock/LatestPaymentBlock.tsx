import { Box, Typography } from "@mui/material";
import { blockSx, boxHeaderSx, titleSx } from "../SettingsStyles";

type LatestPaymentItem = {
  id: number;
  label: string;
  value: string;
  icon?: React.ReactSVGElement;
};

const latestPaymentItems: LatestPaymentItem[] = [
  {
    id: 1,
    label: "Payment Date",
    value: "December 05, 2024",
  },
  {
    id: 2,
    label: "Type of Plan",
    value: "Practical Nurse - 8 days(Fast Track)",
  },
  {
    id: 3,
    label: "Card Used to Pay",
    value: "December 05, 2024",
    icon: undefined,
  },
  {
    id: 4,
    label: "Total Payment",
    value: "$180.00",
  },
];

export const LatestPaymentBlock = () => {
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
          {latestPaymentItems.map((item) => (
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
                <div className="flex items-center">
                  {item.icon && item.icon}
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
