/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

import React from "react";
import { useRouter } from "core-library";
import { Card, Typography } from "@mui/material";
import { useApi, useResolution } from "core-library/hooks";
import { EvaIcon } from "core-library/components";
import { NotFoundBlock } from "../NotFoundBlock/NotFoundBlock";

type Props = {
  reference: string;
};

export const OrderSummaryBlock: React.FC<Props> = ({ reference }) => {
  const router = useRouter();
  const { isMobile } = useResolution();
  const order = useApi(
    async (api) => await api.web.getOrderByReference(reference),
    [reference]
  );

  if (order.loading) return <p>Loading please wait...</p>;

  if (!order) {
    return <NotFoundBlock />;
  }

  return (
    <div className="w-full h-auto lg:h-screen relative flex flex-col justify-center items-center px-4">
      <div
        className={`${isMobile ? "w-full" : "w-2/3"} flex justify-start py-4`}
      >
        <div
          onClick={() => router.back()}
          className="relative w-[110px] justify-start cursor-pointer rounded-[15px] bg-white shadow-md flex items-start p-4 gap-2"
        >
          <EvaIcon fill="#0F2A71" name="arrow-back-outline" />
          <Typography sx={{ color: "#0F2A71" }}>Back</Typography>
        </div>
      </div>
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
                {order.result?.data.productName} (
                {order.result?.data.programTitle == 0 ? "RN" : "PN"})
              </Typography>
              <div>
                <Typography sx={{ fontFamily: "PT Sans Narrow" }}>
                  Duration:{" "}
                </Typography>
                <div className="text-[#0F2A71] font-semibold text-end">
                  {order.result?.data.programType == 0 ? (
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
                  ) : order.result?.data.programType == 1 ? (
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
                {order.result?.data.productDescription}
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
                {order.result?.data.pricing.price}.00{" "}
                {order.result?.data.pricing.currency}
              </Typography>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
