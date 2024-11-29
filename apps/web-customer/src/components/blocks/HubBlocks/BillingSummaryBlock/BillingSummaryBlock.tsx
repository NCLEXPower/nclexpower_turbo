import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { billlingSummaryMockData as data} from "../../../../core/constant/BillingSummaryMock/BillingSummaryMock"; // remove once real data fetching is applied
import { DataGrid } from "core-library/components";

import { OrderSummaryBlock, OrderDetailsBlock } from "./index";

const columns = [
  {
    field: "orderId",
    sortable: false,
    headerName: "Order ID",
    flex: 1,
    maxWidth: 450,
  },
  {
    field: "dateTime",
    sortable: false,
    headerName: "Date/Time",
    flex: 1,
    maxWidth: 450,
  },
  {
    field: "payment",
    sortable: false,
    headerName: "Payment",
    flex: 1,
    maxWidth: 450,
  },
  {
    field: "purchase",
    sortable: false,
    headerName: "Purchase",
    flex: 1,
    maxWidth: 450,
  },
];

const tableStyle = {
  border: "0.2px solid #B0BEC5",
  boxShadow: "0px 10px 60px 0px rgba(226, 236, 249, 0.50)",
  borderRadius: "8px",
  overflow: "hidden",
  '.MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  ".MuiDataGrid-cell": {
    cursor: "pointer"
  },
  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  '& .super-app-theme--header': {
     background: "rgba(24, 30, 47, 0.95)",
     outline: "none !important",
     color: "#ffffff"
 },
};

export const BillingSummaryBlock = () => {
  // Uncomment this once the api has been created for fetching the billing summary:
  // const { data, isLoading } = businessQueryGetBillingSummary(['getBillingSummary']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(
    null
  );

  useEffect(() => {
    if(data.length === 1) {
      setSelectedRow(data[0])
    }
  }, [data])

  return (
    <section className="bg-hubBackground">
      <Box className="px-8 py-16 w-full">
        <Box className="flex flex-col lg:flex-row gap-4 justify-center">
          <Box className="flex flex-col w-auto h-auto bg-white rounded-[16px] drop-shadow-md">
            <h4 className="h-[46px] flex items-center px-6 rounded-t-[16px] w-full text-white font-ptSansNarrow text-[20px] bg-gradient-to-r from-[#0F2A71] to-[#181E2F]">
              Order History
            </h4>
            <Box className="p-6">
              <Box className="w-full max-w-[1100px] overflow-x-auto">
                <DataGrid
                  columns={columns.map((col) => ({
                    ...col,
                    flex: undefined,
                    width: col.flex ? 200 : undefined,
                    headerClassName: 'super-app-theme--header'
                  }))}
                  rows={data ?? []}
                  initPageSize={5}
                  isLoading={isLoading}
                  autoHeight
                  onRowClick={(params) => setSelectedRow(params.row)}
                  sx={tableStyle}
                />
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-col gap-4 w-[323px]">
            <OrderSummaryBlock selectedRow={selectedRow} />

            <OrderDetailsBlock selectedRow={selectedRow} />
          </Box>
        </Box>
      </Box>
    </section>
  );
};
