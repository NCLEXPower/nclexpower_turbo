import { Box } from "@mui/material";
import React from "react";
import { BillingSummaryMock } from "../../../../core/constant/BillingSummaryMock/BillingSummaryMock";
import { ReactTable } from "core-library/components";

interface Props {}

const columns = [
    {
      id: "orderId",
      header: 'Order ID',
      accessorKey: 'orderId',
      enablePinning: true,
    },
    {
      id: 'dateTime',
      header: 'Date/Time',
      accessorKey: 'dateTime',
    },
    {
      id: 'payment',
      header: 'Payment',
      accessorKey: 'payment',
    }
  ]

  const mockData = [
    { id: 1, orderId: 'RN23-7854865', dateTime: '08-15-2024 09:04:30', payment: 'Credit/Debit (Stripe)' },
    // { id: 2, orderId: 'RN23-7854864', dateTime: '08-15-2024 09:04:30', payment: 'Credit/Debit (Stripe)' },
    // { id: 3, orderId: 'RN23-7854863', dateTime: '08-15-2024 09:04:30', payment: 'Credit/Debit (Stripe)' },
    // { id: 4, orderId: 'RN23-7854862', dateTime: '08-15-2024 09:04:30', payment: 'Credit/Debit (Stripe)' },
  ];

export const BillingSummaryBlock: React.FC<Props> = ({}) => {

  const handleSelectedRows = () => {

  }
  return (
    <section className="bg-hubBackground">
      <Box className="p-8 w-full">
        <Box className="flex flex-col lg:flex-row gap-4 justify-between">

          <Box className="flex flex-col w-full h-auto bg-white rounded-[16px] drop-shadow-md">
            <h4 className="h-[46px] flex items-center px-6 rounded-t-[16px] w-full text-white font-ptSansNarrow text-[20px] bg-gradient-to-r from-[#0F2A71] to-[#181E2F]">
              Order History
            </h4>
            <Box className="p-6">
              <ReactTable
                data={mockData}
                columns={columns}
                isLoading={false}
                initPageSize={5}
              />
            </Box>
          </Box>

          <Box className="flex flex-col gap-4 w-[363px]">
            <Box className="w-full p-6 rounded-[16px] bg-gradient-to-r from-[#0F2A71] to-[#181E2F] drop-shadow-md">
              <h4 className="text-white font-ptSans font-bold text-[32px] mb-4">
                RN23-7854865
              </h4>

              <Box className="flex flex-col gap-2">
                <h4 className="text-white font-regular font-ptSansNarrow text-[18px]">
                  Name: <span className="ml-2">Albert Rivera </span>
                </h4>

                <h4 className="text-white font-regular font-ptSansNarrow text-[18px]">
                  Email: <span className="ml-2">arjon9397@gmail.com</span>
                </h4>
              </Box>
            </Box>

            <Box className="w-full p-6 flex flex-col bg-white rounded-[16px] drop-shadow-md">
              <h4 className="text-center font-ptSansNarrow text-[20px] font-bold text-black mb-4">
                Order Details
              </h4>

              {!BillingSummaryMock || BillingSummaryMock.length < 0 ? (
                <h4 className="text-center text-black font-ptSansNarrow font-regular">
                  No orders at this moment.
                </h4>
              ) : (
                <Box className="flex flex-col gap-2">
                  {BillingSummaryMock.map((item) => {
                    const { id, title, description } = item;
                    return (
                      <Box key={id}>
                        <h4 className="text-[#6C6C6C] font-ptSansNarrow font-regular text-[18px]">
                          {title}:
                        </h4>
                        <h4 className="text-black font-ptSansNarrow font-regular text-[18px] text-right">
                          {description}
                        </h4>
                      </Box>
                    );
                  })}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </section>
  );
};
