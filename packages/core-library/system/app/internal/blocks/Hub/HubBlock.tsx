import { Alert, Card, ReactTable } from "../../../../../components";
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { DashboardCardType } from "./types";
import { useAnalytics } from "../../../../../hooks";

interface Props {
  cards: DashboardCardType[];
}

export const HubBlock: React.FC<Props> = ({ cards }) => {
  const { analyticsData } = useAnalytics();
  console.log("analyticsData", analyticsData);
  return (
    <div className="w-full bg-cover font-['Poppins'] bg-gradient-to-b">
      <Container>
        <Alert
          severity="info"
          title="Dashboard"
          description="You can visualize data trends with various charts and filter data by date or category for detailed analysis."
        />
        <div className="w-full flex gap-5 py-5 items-center justify-center  lg:flex-row md:flex-col sm:flex-col xs:flex-col">
          <span className="flex w-full gap-5 leading-4 ">
            {cards &&
              cards.map((card, index) => (
                <Card
                  sx={{
                    padding: 0,
                    bgcolor: card?.bgColor,
                    color: card?.textColor,
                    width: 0.25,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <div className="w-full h-fit flex items-center px-5 gap-5 ">
                    <p className="scale-125">{card?.icon}</p>
                    <Box sx={{ width: 0.77 }} className="flex flex-col">
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: ".87rem",
                          lineHeight: 1,
                        }}
                      >
                        {card?.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 600,
                          fontSize: "1.5rem",
                          lineHeight: 1,
                        }}
                      >
                        {card?.cardValue}
                      </Typography>
                    </Box>
                  </div>
                </Card>
              ))}
          </span>
        </div>
        <div className="flex w-full gap-5">
          <div className="w-2/3 flex flex-col gap-2 grow">
            <p className="w-full font-semibold bg-white rounded-md py-2 px-5 text-lg shadow-md text-slate-500">
              Overall Data
            </p>
            <ReactTable
              data={[]}
              columns={[]}
              initPageSize={5}
              isLoading={false}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
