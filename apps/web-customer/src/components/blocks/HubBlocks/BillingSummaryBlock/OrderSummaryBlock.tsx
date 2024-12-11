import { Box } from "@mui/material";
import { useSensitiveInformation } from "core-library/hooks";
import React from "react";
import { billingOwner } from "../../../../core/constant/BillingSummaryMock/BillingSummaryMock"; // remove this comment once useSensitiveInformation for wc is working
interface OrderSummaryProps {
    selectedRow: Record<string, any> | null
};

export const OrderSummaryBlock: React.FC<OrderSummaryProps> = ({ selectedRow }) => {
    // Use this hook once fixed.
    const { customer } = useSensitiveInformation();

    return (
      <Box className="w-full p-6 rounded-[16px] bg-gradient-to-r from-[#0F2A71] to-[#181E2F] drop-shadow-md">
        <h4 className="text-white font-ptSans font-bold text-[32px] mb-4">
          {selectedRow ? selectedRow.orderId : "Select Order"}
        </h4>
        <Box className="flex flex-col gap-2">
          <h4 className="text-white font-regular font-ptSansNarrow text-[18px]">
            Name: <span className="ml-2">{billingOwner.name}</span>
          </h4>
          <h4 className="text-white font-regular font-ptSansNarrow text-[18px]">
            Email: <span className="ml-2">{billingOwner.email}</span>
          </h4>
        </Box>
      </Box>
    );
};