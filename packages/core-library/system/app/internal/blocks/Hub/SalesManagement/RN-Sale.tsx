/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import {
  Box,
  FormControlLabel,
  FormGroup,
  Typography,
  Checkbox,
} from "@mui/material";
import { DynamicChart } from "../../../../../../components";
import { useState } from "react";
import { RNSalesMockData } from "./SalesManagementData";

type PeriodType = keyof typeof RNSalesMockData;

export const RNSale: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("all");
  const [data, setData] = useState(RNSalesMockData.all);

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const period = event.target.value as PeriodType;
    setSelectedPeriod(period);
    setData(RNSalesMockData[period]);
  };

  const formatRevenue = (value: number) => {
    const kValue = value / 1000;
    return `$${kValue.toFixed(0)}k`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: 'PT Sans Narrow", sans-serif',
        p: { xs: 2, sm: 4, md: 0 },
      }}
    >
      <Box
        sx={{
          pb: 5,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          columnGap: { xs: 2, sm: 5 },
          fontFamily: 'PT Sans Narrow", sans-serif',
          flexWrap: "wrap",
        }}
      >
        <Typography sx={{ color: "#9A9A9A" }}>Time Period:</Typography>
        <FormGroup row sx={{ color: "#333333" }}>
          {["All", "Today", "Weekly", "Monthly", "YTD"].map((period) => (
            <FormControlLabel
              key={period}
              control={
                <Checkbox
                  checked={selectedPeriod === period.toLowerCase()}
                  onChange={handlePeriodChange}
                  value={period.toLowerCase()}
                />
              }
              label={period}
            />
          ))}
        </FormGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          columnGap: 5,
          height: "auto",
          width: "100%",
          pb: 5,
          flexDirection: { xs: "column", sm: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            backgroundColor: "#2A61AC",
            color: "white",
            borderRadius: "20px 20px 10px 10px",
            height: "100%",
            width: { xs: "100%", sm: "100%", md: "34%" },
            mb: { xs: 2, sm: 2 },
            padding: 5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontFamily: 'PT Sans Narrow", sans-serif',
            }}
          >
            RN Total Sales
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "white",
              fontSize: 90,
              fontWeight: 400,
              fontFamily: 'PT Sans Narrow", sans-serif',
            }}
          >
            {`$${data.RNTotalSales}k`}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#00173F",
            color: "white",
            borderRadius: "20px 20px 10px 10px",
            height: "100%",
            width: { xs: "100%", sm: "100%", md: "33%" },
            mb: { xs: 2, sm: 2 },
            padding: 5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontFamily: 'PT Sans Narrow", sans-serif',
            }}
          >
            23 days (standard)
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "white",
              fontSize: 90,
              fontWeight: 400,
              fontFamily: 'PT Sans Narrow", sans-serif',
            }}
          >
            {`$${data.StandardTotalSales}k`}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "#0F2A71",
            color: "white",
            borderRadius: "20px 20px 10px 10px",
            height: "100%",
            width: { xs: "100%", sm: "100%", md: "33%" },
            padding: 5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontFamily: 'PT Sans Narrow", sans-serif',
            }}
          >
            8 days (Fast Track)
          </Typography>

          <Typography
            sx={{
              textAlign: "center",
              color: "white",
              fontSize: 90,
              fontWeight: 400,
              fontFamily: 'PT Sans Narrow", sans-serif',
            }}
          >
            {`$${data.FastTrackTotalSales}k`}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          columnGap: 5,
          height: "auto",
          width: "100%",
          color: "#6C6C6CB0",
          mb: 6,
          flexDirection: { xs: "column", md: "row" },
          rowGap: { xs: 2, md: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#E6EAF2",
            width: { xs: "100%", md: "60%" },
            borderRadius: "20px 20px 10px 10px",
            padding: 5,
          }}
        >
          <Typography
            sx={{
              color: "#6C6C6CB0",
            }}
          >
            Products Durations
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "30%",
                justifyContent: "space-around",
              }}
            >
              {data.ProductsDuration.map((item, index) => (
                <Box
                  key={index}
                  display="flex"
                  alignItems="center"
                  sx={{ mb: { xs: 1, sm: 0 } }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: item.color,
                      marginRight: 4,
                    }}
                  />
                  <Typography sx={{ fontWeight: 700 }}>{item.label}</Typography>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                background: "white",
                borderRadius: "20px 20px 10px 10px",
                height: "auto",
                width: "auto",
              }}
            >
              <DynamicChart
                type="Line"
                dataSet={data.lineData}
                width={500}
                height={300}
                options={{
                  xDataKey: "month",
                  yAxisMin: 0,
                  yAxisMax: 100000,
                  lineSeries: [
                    {
                      dataKey: "standard",
                      label: "",
                      color: "#181E2F",
                    },
                    {
                      dataKey: "fastTrack",
                      label: "",
                      color: "#2A61AC",
                    },
                  ],
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#E6EAF2",
            width: { xs: "100%", md: "40%" },
            borderRadius: "20px 20px 10px 10px",
            padding: 5,
          }}
        >
          <Typography
            sx={{
              color: "#6C6C6CB0",
              pb: 5,
            }}
          >
            Repeat Sales
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              flexDirection: { xs: "column", sm: "row", md: "column" },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                pb: 5,
              }}
            >
              {data.RepeatSales.map((item, index) => (
                <Box key={index} display="flex" alignItems="center ">
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: item.color,
                      marginRight: 4,
                    }}
                  />
                  <Typography sx={{ fontWeight: 700 }}>{item.label}</Typography>
                </Box>
              ))}
            </Box>
            <Box>
              <DynamicChart
                type="Gauge"
                width={200}
                height={220}
                dataSet={data.RepeatSales}
                options={{
                  gaugeSegments: data.RepeatSales,
                  colors: ["#1EA537", "#C12C2F", "#e0e0e0"],
                  gaugeTotal: 100,
                  innerRadius: 70,
                  outerRadius: 100,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#FFFFFF",
          borderRadius: "12px",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
          padding: 10,
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "100%", md: "50%" },
          }}
        >
          <Typography sx={{ color: "#9E9E9E", fontWeight: 400, pb: 5 }}>
            Demographic/Location
          </Typography>
          <Box>
            {data.barData.length > 0 && (
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  sx={{
                    padding: "8px 0",
                    fontWeight: 700,
                  }}
                >
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "#00173F",
                      fontWeight: 700,
                      fontFamily: 'PT Sans Narrow", sans-serif',
                    }}
                  >
                    Country
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      color: "#00173F",
                      fontWeight: 700,
                      fontFamily: 'PT Sans Narrow", sans-serif',
                    }}
                  >
                    Total Revenue
                  </Typography>
                </Box>

                {data.barData.map((item, index) => (
                  <Box
                    key={index}
                    display="flex"
                    justifyContent="space-around"
                    sx={{
                      padding: "8px 0",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#00173F",
                        fontWeight: 700,
                        fontFamily: 'PT Sans Narrow", sans-serif',
                      }}
                    >
                      {index + 1}. {item.country}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        textAlign: "right",
                        color: "#00173F",
                        fontWeight: 700,
                        fontFamily: 'PT Sans Narrow", sans-serif',
                      }}
                    >
                      {formatRevenue(item.TotalRevenue)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DynamicChart
            type="Bar"
            dataSet={data.barData}
            width={800}
            height={450}
            options={{
              xDataKey: "country",
              yDataKey: "TotalRevenue",
              maxRevenue: 100000,
              yAxisMax: 100,
              colors: ["#2A61AC"],
              borderRadius: 6,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
