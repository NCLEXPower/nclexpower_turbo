/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React from "react";
import { useDecryptOrder } from "core-library/core/utils/useDecryptOrder";
import { useExecuteToast } from "core-library/contexts";
import { useRouter } from "core-library";
import { Card, Typography } from "@mui/material";
import { useResolution } from "core-library/hooks";

type Props = {};

export const OrderSummaryBlock: React.FC<Props> = () => {
  const router = useRouter();
  const orderDetail = useDecryptOrder();
  const { isMobile } = useResolution();

  if (!orderDetail) {
    /* can cause flicker */
    router.replace("/");
    return;
  }

  return orderDetail ? (
    <div className="w-full flex justify-center items-center px-4">
      <Card
        sx={{
          maxWidth: "645px",
          minWidth: isMobile ? "100%" : "350px",
          width: "66.67%",
          padding: "10px 2.5rem",
          borderRadius: "20px",
          border: "1px solid #E5E5E5",
          fontFamily: "PT Sans",
          height: "fit-content",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="p-3">
          <p className="pt-sans-bold text-4xl mb-5 ">Order Summary</p>
          <p className="pt-sans-narrow-regular text-lg text-darkGray">
            Thank you for your order! Below are the details of your selected
            plan and the total price you will be charged. Please review all the
            information before confirming your purchase.
          </p>
        </div>
        <div>
          <div className="gap-2 flex flex-col">
            <div className="flex flex-col gap-2 border border-zinc-300 rounded-md p-6">
              <Typography
                sx={{
                  fontFamily: "PT Sans Narrow",
                }}
              >
                Plan name:
              </Typography>
              <Typography
                sx={{
                  fontFamily: "PT Sans Narrow",
                  fontWeight: 600,
                  textAlign: "end",
                  color: "#0F2A71",
                }}
              >
                {orderDetail.productName} (
                {orderDetail.programTitle == 0 ? "RN" : "PN"})
              </Typography>
              <div>
                <Typography sx={{ fontFamily: "PT Sans Narrow" }}>
                  Duration:{" "}
                </Typography>
                <div className="text-[#0F2A71] font-semibold text-end">
                  {orderDetail.programType == 0 ? (
                    <Typography
                      sx={{
                        fontFamily: "PT Sans Narrow",
                        fontWeight: 600,
                        textAlign: "end",
                        color: "#0F2A71",
                      }}
                    >
                      {" "}
                      23 Days (Standard)
                    </Typography>
                  ) : orderDetail.programType == 1 ? (
                    <Typography
                      sx={{
                        fontFamily: "PT Sans Narrow",
                        fontWeight: 600,
                        textAlign: "end",
                        color: "#0F2A71",
                      }}
                    >
                      {" "}
                      8 Days (Fast Track)
                    </Typography>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 border border-zinc-300 rounded-md p-6">
              <Typography sx={{ fontFamily: "PT Sans Narrow" }}>
                Description :{" "}
              </Typography>
              <Typography sx={{ fontFamily: "PT Sans Narrow" }}>
                {orderDetail.productDescription}
              </Typography>
            </div>
          </div>

          <div className="p-2 my-6 flex flex-col gap-3">
            <div className=" flex justify-between">
              <Typography
                sx={{ fontFamily: "PT Sans Narrow", fontWeight: 800 }}
              >
                Total Amount:
              </Typography>
              <Typography
                sx={{ fontFamily: "PT Sans Narrow", fontWeight: 800 }}
              >
                {orderDetail.amount}.00 {orderDetail.currency}
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ) : null;
};
