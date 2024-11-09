/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, FormControlLabel, FormGroup, Typography } from "@mui/material";
import {
  AllSalesMockData,
  AllbarChartOptions,
  RepeatsalesGaugeOptions,
  AllgaugeChartOptions,
} from "./SalesManagementData";
import { Chart, Checkbox } from "../../../../../../components";
import { usePeriodTime, useResolution } from "../../../../../../hooks";

export const AllSale: React.FC = () => {
  const { selectedPeriod, data, handlePeriodChange, formatRevenue } =
    usePeriodTime({
      Data: AllSalesMockData,
      defaultPeriod: "all",
    });
  const { isMobile } = useResolution();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: 'PT Sans Narrow", sans-serif',
        p: { xs: 4, sm: 4, md: 0 },
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
              sx={{ paddingLeft: 5 }}
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
            backgroundColor: "#0F2A71",
            color: "white",
            borderRadius: "20px 20px 10px 10px",
            height: "100%",
            width: { xs: "100%", sm: "100%", md: "34%" },
            padding: 5,
            mb: { xs: 2, sm: 2 },
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontFamily: 'PT Sans Narrow", sans-serif',
            }}
          >
            Product Total Sales
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
            {`$${data.ProductTotalSales}k`}
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: "#2A61AC",
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
            backgroundColor: "#0C8087",
            color: "white",
            borderRadius: "20px 20px 10px 10px",
            height: "100%",
            width: { xs: "100%", sm: "100%", md: "33%" },
            mb: { xs: 2, sm: 0 },
            padding: 5,
          }}
        >
          <Typography
            sx={{
              fontWeight: 400,
              fontFamily: 'PT Sans Narrow", sans-serif',
            }}
          >
            PN Total Sales
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
            {`$${data.PNTotalSales}k`}
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
            width: { xs: "100%", md: "50%" },
            borderRadius: "20px 20px 10px 10px",
            padding: 5,
          }}
        >
          <Typography
            sx={{
              color: "#6C6C6CB0",
              pb: { xs: 3 },
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
                height: "35%",
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
            <Box>
              <Chart
                type="Gauge"
                width={200}
                height={220}
                dataSet={data.ProductsDuration}
                options={AllgaugeChartOptions}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#E6EAF2",
            width: { xs: "100%", md: "50%" },
            borderRadius: "20px 20px 10px 10px",
            padding: 5,
          }}
        >
          <Typography
            sx={{
              color: "#6C6C6CB0",
              pb: { xs: 3 },
            }}
          >
            Repeat Sales
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
                height: "35%",
                justifyContent: "space-around",
              }}
            >
              {data.RepeatSales.map((item, index) => (
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
            <Box>
              <Chart
                type="Gauge"
                width={200}
                height={220}
                dataSet={data.RepeatSales}
                options={RepeatsalesGaugeOptions}
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
          flexDirection: { xs: "column", md: "row" },
          borderRadius: "12px",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
          padding: 10,
          gap: 15,
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
            display: "flex",
            justifyContent: "center",
            mt: { xs: 4, md: 0 },
          }}
        >
          <Chart
            type="Bar"
            dataSet={data.barData}
            width={isMobile ? 400 : 800}
            height={isMobile ? 300 : 450}
            options={AllbarChartOptions}
          />
        </Box>
      </Box>
    </Box>
  );
};
