import { Box } from "@mui/material";
import { billingSummaryColumns } from "../../../../core/constant/BillingSummaryMock/BillingSummaryMock";
import { DataGrid } from "core-library/components";
import { OrderSummaryBlock, OrderDetailsBlock } from "./index";
import { useGetBillingSummary } from "../../../../core/hooks/useGetBillingSummary";

const tableStyle = {
  border: "0.2px solid #B0BEC5",
  boxShadow: "0px 10px 60px 0px rgba(226, 236, 249, 0.50)",
  borderRadius: "8px",
  overflow: "hidden",
  marginX: "auto",
  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },
  ".MuiDataGrid-cell": {
    cursor: "pointer",
  },
  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
  "& .super-app-theme--header": {
    background: "rgba(24, 30, 47, 0.95)",
    outline: "none !important",
    color: "#ffffff",
  },
  "@media (max-width: 1024px)": {
    maxWidth: "700px",
  },
  "@media (max-width: 768px)": {
    maxWidth: "310px",
  },
};

export const BillingSummaryBlock = () => {
  const { isLoading, selectedData, setSelectedData, data } = useGetBillingSummary();
  
  return (
    <section className="bg-hubBackground">
      <Box className="px-4 md:px-8 py-8 lg:py-16 w-full">
        <Box className="flex flex-col lg:flex-row gap-4 justify-center">
          <Box className="flex flex-col md:w-full lg:w-auto h-auto bg-white rounded-[16px] drop-shadow-md md:mx-auto lg:mx-0">
            <h4 className="h-[46px] flex items-center px-6 rounded-t-[16px] w-full text-white font-ptSansNarrow text-[20px] bg-gradient-to-r from-[#0F2A71] to-[#181E2F]">
              Order History
            </h4>
            <Box className="p-6">
              <Box className="w-full max-w-[1100px] overflow-x-auto">
                <DataGrid
                  columns={billingSummaryColumns.map((col) => ({
                    ...col,
                    flex: undefined,
                    width: col.flex ? 200 : undefined,
                    headerClassName: "super-app-theme--header",
                  }))}
                  rows={data ?? []}
                  initPageSize={5}
                  isLoading={isLoading}
                  autoHeight
                  onRowClick={(params) => setSelectedData(params.row)}
                  sx={tableStyle}
                />
              </Box>
            </Box>
          </Box>

          <Box className="flex flex-col md:flex-row lg:flex-col gap-4 w-auto lg:w-[323px]">
            <OrderSummaryBlock selectedRow={selectedData} />

            <OrderDetailsBlock selectedRow={selectedData} />
          </Box>
        </Box>
      </Box>
    </section>
  );
};