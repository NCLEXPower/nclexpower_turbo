import { Box } from "@mui/material";
import React from "react";

interface OrderDetailsProps {
    selectedRow: Record<string, any> | null
};

const orderDetailTitles = ["dateTime", "payment", "receiptNumber", "purchase", "amount", "validity", "promo"];

export const OrderDetailsBlock: React.FC<OrderDetailsProps> = ({ selectedRow }) => (
    <Box className="w-full p-6 flex flex-col bg-white rounded-[16px] drop-shadow-md">
      <h4 className="text-center font-ptSansNarrow text-[20px] font-bold text-black mb-4">
        Order Details
      </h4>
      {selectedRow ? (
        <Box className="flex flex-col gap-2">
          {orderDetailTitles.map(
            (key) => (
              <React.Fragment key={key}>
                <h4 className="text-[#6C6C6C] font-ptSansNarrow font-regular text-[18px]">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </h4>
                <h4 className="text-black font-ptSansNarrow font-regular text-[18px] text-right">
                  {selectedRow[key] || "-"}
                </h4>
              </React.Fragment>
            )
          )}
        </Box>
      ) : (
        <h4 className="text-center text-black font-ptSansNarrow font-regular">
          No order selected.
        </h4>
      )}
    </Box>
  );