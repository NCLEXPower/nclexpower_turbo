/**

Property of the NCLEX Power.
Reuse as a whole or in part is prohibited without permission.
Created by the Software Strategy & Development Division
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
    <div
      className=""
    >
      <Card
        sx={{
          width: "100%",
          borderRadius: {
            xs: "clamp(1px,4.4vw,20px)",
            md: "clamp(1px,2vw,40px)",
            lg: "clamp(1px,1.2vw,40px)",
          },
          border: "1px solid #E5E5E5",
          fontFamily: "PT Sans",
          height: "fit-content",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="p-5 p-md-4 lg:p-[clamp(1px,2.083331vw,80px]">
          <div className="">
            <h3 className="font-Poppins font-bold text-[clamp(1px,5.5814vw,26px)] md:text-[clamp(1px,2.15054vw,60px)] lg:text-[clamp(1px,1.5625vw,60px)] mb-3 mb-md-2">
              Order Summary
            </h3>
            <p className="font-ptSans font-regular text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.56403vw,40px)] lg:text-[clamp(1px,1.041665vw,40px)] text-darkGray pb-3">
              Thank you for your order! Below are the details of your selected
              plan and the total price you will be charged. Please review all the
              information before confirming your purchase.
            </p>
          </div>
          <div>
            <div className="flex flex-col">
              <div className="flex mb-3 mb-md-2 flex-col border border-zinc-300 rounded-md p-4">
                <div className="text-[clamp(1px,3.72092vw,16px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)] font-ptSans font-normal">
                  Plan name:
                </div>
                <div className="text-[clamp(1px,3.72092vw,16px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)] font-ptSans font-bold text-[#0F2A71] text-right">
                  {orderDetail.productName} (
                  {orderDetail.programTitle == 0 ? "RN" : "PN"})
                </div>
                <div>
                  <div className="text-[clamp(1px,3.72092vw,16px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)] font-ptSans font-normal">
                    Duration:
                  </div>
                  <div className="text-[#0F2A71] font-semibold text-end">
                    {orderDetail.programType == 0 ? (
                      <div className="text-[clamp(1px,3.72092vw,16px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)] font-ptSans font-bold text-[#0F2A71] text-right">
                        23 Days (Standard)
                      </div>
                    ) : orderDetail.programType == 1 ? (
                      <div className="text-[clamp(1px,3.72092vw,16px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)] font-ptSans font-normal">
                        8 Days (Fast Track)
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 border border-zinc-300 rounded-md p-4">
                <div className="text-[clamp(1px,3.72092vw,16px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)] font-ptSans font-normal">
                  Description :
                </div>
                <div className="text-[clamp(1px,3.72092vw,16px)] md:text-[clamp(1px,1.36852vw,36px)] lg:text-[clamp(1px,0.9375vw,36px)] font-ptSans font-normal">
                  {orderDetail.productDescription}
                </div>
              </div>
            </div>

            <div className="mt-5  flex flex-col gap-3">
              <div className=" flex justify-between">
                <div className="text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.56403vw,40px)] lg:text-[clamp(1px,1.041665vw,40px)] font-ptSans font-bold">
                  Total Amount:
                </div>
                <div className="text-[clamp(1px,4.18604vw,18px)] md:text-[clamp(1px,1.56403vw,40px)] lg:text-[clamp(1px,1.041665vw,40px)] font-ptSans font-bold">
                  {orderDetail.amount}.00 {orderDetail.currency}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ) : null;
};
